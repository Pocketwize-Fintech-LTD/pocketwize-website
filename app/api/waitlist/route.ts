import { google } from "googleapis";
import { NextResponse } from "next/server";

type WaitlistPayload = {
  fullName?: string;
  email?: string;
  challenge?: string;
  behavior?: string;
  motivation?: string;
  referredBy?: string;
};

function djb2(str: string) {
  let hash = 5381;
  for (let i = 0; i < str.length; i += 1) {
    hash = (hash * 33) ^ str.charCodeAt(i);
  } 
  return Math.abs(hash);
}

function deriveReferralCode(email: string) {
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"; 
  let n = djb2(email.toLowerCase());
  let code = "";
  for (let i = 0; i < 6; i += 1) {
    code += alphabet[n % alphabet.length];
    n = Math.floor(n / alphabet.length) || djb2(code);
  }
  return code;
}

async function appendToSheet(row: string[]) {
  const sheetId = process.env.GOOGLE_SHEET_ID;
  const clientEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n");

  if (!sheetId || !clientEmail || !privateKey) {
    console.warn("[waitlist] Google Sheets env vars not set — skipping sheet write");
    return;
  }

  const auth = new google.auth.JWT({
    email: clientEmail,
    key: privateKey,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  const sheets = google.sheets({ version: "v4", auth });
  await sheets.spreadsheets.values.append({
    spreadsheetId: sheetId,
    range: "Sheet1!A:H",
    valueInputOption: "USER_ENTERED",
    insertDataOption: "INSERT_ROWS",
    requestBody: { values: [row] },
  });
}

// Simple in-process rate limiter: max 3 submissions per IP per hour.
// Works on a single Vercel instance; good enough for a waitlist form.
const ipSubmissions = new Map<string, { count: number; resetAt: number }>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = ipSubmissions.get(ip);
  if (!entry || now > entry.resetAt) {
    ipSubmissions.set(ip, { count: 1, resetAt: now + 60 * 60 * 1000 });
    return false;
  }
  if (entry.count >= 3) return true;
  entry.count++;
  return false;
}

export async function POST(request: Request) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    request.headers.get("x-real-ip") ??
    "unknown";

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { ok: false, error: "Too many submissions. Please try again later." },
      { status: 429 },
    );
  }

  let body: WaitlistPayload;
  try {
    body = (await request.json()) as WaitlistPayload;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  const email = body.email?.trim().toLowerCase();
  const fullName = body.fullName?.trim();

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json(
      { ok: false, error: "A valid email is required." },
      { status: 400 },
    );
  }
  if (!fullName || fullName.length > 120) {
    return NextResponse.json(
      { ok: false, error: "Full name is required." },
      { status: 400 },
    );
  }

  const referralCode = deriveReferralCode(email);
  const position = 100 + (djb2(email) % 900);
  const submittedAt = new Date().toISOString();

  const truncate = (s: string | undefined, max: number) =>
    (s ?? "").slice(0, max);

  const row = [
    submittedAt,
    fullName,
    email,
    truncate(body.challenge,   500),
    truncate(body.behavior,    500),
    truncate(body.motivation,  500),
    truncate(body.referredBy,  100),
    referralCode,
  ];

  try {
    await appendToSheet(row);
  } catch (err) {
    console.error("[waitlist] failed to write to Google Sheet:", err);
    // Still return success to the user — don't block signups over a sheet write failure
  }

  console.info("[waitlist] new signup", { email, fullName, submittedAt });

  return NextResponse.json({ ok: true, referralCode, position });
}
