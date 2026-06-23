import { google } from "googleapis";
import { config } from "dotenv";
import { resolve } from "path";

config({ path: resolve(process.cwd(), ".env.local") });

const auth = new google.auth.JWT({
  email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
  key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
  scopes: ["https://www.googleapis.com/auth/spreadsheets"],
});

const sheets = google.sheets({ version: "v4", auth });

await sheets.spreadsheets.batchUpdate({
  spreadsheetId: process.env.GOOGLE_SHEET_ID,
  requestBody: {
    requests: [
      {
        autoResizeDimensions: {
          dimensions: { sheetId: 0, dimension: "COLUMNS", startIndex: 0, endIndex: 8 },
        },
      },
    ],
  },
});

console.log("All columns auto-resized.");
