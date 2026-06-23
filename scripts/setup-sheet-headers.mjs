import { google } from "googleapis";
import { config } from "dotenv";
import { resolve } from "path";

config({ path: resolve(process.cwd(), ".env.local") });

const sheetId = process.env.GOOGLE_SHEET_ID;
const clientEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n");

const auth = new google.auth.JWT({
  email: clientEmail,
  key: privateKey,
  scopes: ["https://www.googleapis.com/auth/spreadsheets"],
});

const sheets = google.sheets({ version: "v4", auth });

// Step 1: insert a blank row at the very top (index 0)
await sheets.spreadsheets.batchUpdate({
  spreadsheetId: sheetId,
  requestBody: {
    requests: [
      {
        insertDimension: {
          range: { sheetId: 0, dimension: "ROWS", startIndex: 0, endIndex: 1 },
          inheritFromBefore: false,
        },
      },
    ],
  },
});

// Step 2: write headers into that new row 1
await sheets.spreadsheets.values.update({
  spreadsheetId: sheetId,
  range: "Sheet1!A1:H1",
  valueInputOption: "USER_ENTERED",
  requestBody: {
    values: [
      ["Timestamp", "Full Name", "Email", "Financial Challenge", "Current Behavior", "Motivation", "Referred By", "Referral Code"],
    ],
  },
});

console.log("Headers written successfully.");
