import { NextResponse } from "next/server";

type WaitlistPayload = {
  firstName?: string;
  email?: string;
  challenge?: string;
  behavior?: string;
  motivation?: string;
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

export async function POST(request: Request) {
  let body: WaitlistPayload;
  try {
    body = (await request.json()) as WaitlistPayload;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  const email = body.email?.trim().toLowerCase();
  const firstName = body.firstName?.trim();

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json(
      { ok: false, error: "A valid email is required." },
      { status: 400 },
    );
  }
  if (!firstName) {
    return NextResponse.json(
      { ok: false, error: "First name is required." },
      { status: 400 },
    );
  }

  // TODO: persist to your database / waitlist provider
  // Examples:
  //   await resend.emails.send({ ... })
  //   await loops.createContact({ email, firstName, source: "early-access" })
  //   await db.waitlist.create({ data: body })
  // For now we just log so the flow is testable.
  console.info("[waitlist] new signup", {
    email,
    firstName,
    challenge: body.challenge,
    behavior: body.behavior,
    motivation: body.motivation,
    receivedAt: new Date().toISOString(),
  });

  const referralCode = deriveReferralCode(email);

  return NextResponse.json({
    ok: true,
    referralCode,
    // Placeholder waitlist position. Replace with a real value from your DB.
    position: 100 + (djb2(email) % 900),
  });
}
