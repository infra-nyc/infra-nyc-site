import type { ApplicationPayload } from "@/lib/apply-schema";

type StoredApplication = ApplicationPayload & {
  timestamp: string;
};

const AIRTABLE_URL = "https://api.airtable.com/v0";
const SHEETS_URL = "https://sheets.googleapis.com/v4/spreadsheets";

export async function saveApplication(payload: ApplicationPayload) {
  const application: StoredApplication = {
    ...payload,
    timestamp: new Date().toISOString(),
  };

  if (process.env.AIRTABLE_API_KEY && process.env.AIRTABLE_BASE_ID) {
    return saveToAirtable(application);
  }

  if (
    process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL &&
    process.env.GOOGLE_PRIVATE_KEY &&
    process.env.GOOGLE_SHEET_ID
  ) {
    return saveToGoogleSheets(application);
  }

  throw new Error(
    "Application backend is not configured. Add Airtable or Google Sheets environment variables.",
  );
}

async function saveToAirtable(application: StoredApplication) {
  const table = encodeURIComponent(process.env.AIRTABLE_TABLE_NAME ?? "Applications");
  const response = await fetch(
    `${AIRTABLE_URL}/${process.env.AIRTABLE_BASE_ID}/${table}`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.AIRTABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        records: [
          {
            fields: {
              Timestamp: application.timestamp,
              Name: application.name,
              Email: application.email,
              Company: application.company,
              Role: application.role,
              LinkedIn: application.linkedin,
              City: application.city,
              Interests: application.interests,
            },
          },
        ],
      }),
    },
  );

  if (!response.ok) {
    throw new Error(`Airtable save failed with status ${response.status}.`);
  }
}

async function saveToGoogleSheets(application: StoredApplication) {
  const token = await getGoogleAccessToken();
  const tab = encodeURIComponent(process.env.GOOGLE_SHEET_TAB ?? "Applications");
  const response = await fetch(
    `${SHEETS_URL}/${process.env.GOOGLE_SHEET_ID}/values/${tab}!A:H:append?valueInputOption=USER_ENTERED`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        values: [
          [
            application.timestamp,
            application.name,
            application.email,
            application.company,
            application.role,
            application.linkedin,
            application.city,
            application.interests,
          ],
        ],
      }),
    },
  );

  if (!response.ok) {
    throw new Error(`Google Sheets save failed with status ${response.status}.`);
  }
}

async function getGoogleAccessToken() {
  const now = Math.floor(Date.now() / 1000);
  const header = base64UrlEncode(JSON.stringify({ alg: "RS256", typ: "JWT" }));
  const claim = base64UrlEncode(
    JSON.stringify({
      iss: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      scope: "https://www.googleapis.com/auth/spreadsheets",
      aud: "https://oauth2.googleapis.com/token",
      exp: now + 3600,
      iat: now,
    }),
  );

  const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n");

  if (!privateKey) {
    throw new Error("Missing Google private key.");
  }

  const signatureInput = `${header}.${claim}`;
  const key = await crypto.subtle.importKey(
    "pkcs8",
    pemToArrayBuffer(privateKey),
    { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const signature = await crypto.subtle.sign(
    "RSASSA-PKCS1-v1_5",
    key,
    new TextEncoder().encode(signatureInput),
  );
  const assertion = `${signatureInput}.${base64UrlEncode(signature)}`;

  const response = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion,
    }),
  });

  if (!response.ok) {
    throw new Error(`Google auth failed with status ${response.status}.`);
  }

  const data = (await response.json()) as { access_token?: string };

  if (!data.access_token) {
    throw new Error("Google auth response did not include an access token.");
  }

  return data.access_token;
}

function pemToArrayBuffer(pem: string) {
  const base64 = pem
    .replace("-----BEGIN PRIVATE KEY-----", "")
    .replace("-----END PRIVATE KEY-----", "")
    .replace(/\s/g, "");
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);

  for (let index = 0; index < binary.length; index += 1) {
    bytes[index] = binary.charCodeAt(index);
  }

  return bytes.buffer;
}

function base64UrlEncode(input: string | ArrayBuffer) {
  const bytes =
    typeof input === "string"
      ? new TextEncoder().encode(input)
      : new Uint8Array(input);
  let binary = "";

  bytes.forEach((byte) => {
    binary += String.fromCharCode(byte);
  });

  return btoa(binary)
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/g, "");
}
