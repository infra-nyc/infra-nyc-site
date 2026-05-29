import { NextResponse } from "next/server";
import { ZodError } from "zod";

import { jobsInterestSchema } from "@/lib/jobs-interest-schema";

export const runtime = "nodejs";

const SHEETS_URL = "https://sheets.googleapis.com/v4/spreadsheets";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const payload = jobsInterestSchema.parse(body);

    const timestamp = new Date().toISOString();
    const rolesStr = payload.selectedRoles
      .map((r) => `${r.company} — ${r.role}`)
      .join("; ");

    await saveToGoogleSheets({ ...payload, timestamp, rolesStr });

    return NextResponse.json({ ok: true });
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        {
          ok: false,
          message: "Please check the highlighted fields.",
          errors: error.flatten().fieldErrors,
        },
        { status: 400 },
      );
    }

    console.error("jobs-interest submission failed:", error);
    return NextResponse.json(
      { ok: false, message: "We could not submit your interest right now. Please try again." },
      { status: 500 },
    );
  }
}

async function saveToGoogleSheets(payload: {
  linkedin: string;
  email: string;
  note: string;
  timestamp: string;
  rolesStr: string;
}) {
  const token = await getGoogleAccessToken();
  const sheetId = process.env.GOOGLE_SHEET_ID;
  const tab = encodeURIComponent(process.env.JOBS_GOOGLE_SHEET_TAB ?? "Jobs");

  console.log(`[jobs-interest] sheetId=${sheetId} tab=${tab}`);

  if (!sheetId) throw new Error("GOOGLE_SHEET_ID is not configured.");

  const res = await fetch(
    `${SHEETS_URL}/${sheetId}/values/${tab}!A:E:append?valueInputOption=USER_ENTERED`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        values: [[
          payload.timestamp,
          payload.linkedin,
          payload.email,
          payload.rolesStr,
          payload.note,
        ]],
      }),
    },
  );

  const responseText = await res.text();
  console.log(`[jobs-interest] Sheets response (${res.status}): ${responseText}`);

  if (!res.ok) {
    throw new Error(`Google Sheets append failed (${res.status}) sheetId=${sheetId} tab=${tab}: ${responseText}`);
  }
}

async function getGoogleAccessToken(): Promise<string> {
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
  if (!privateKey) throw new Error("GOOGLE_PRIVATE_KEY is not configured.");

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

  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion,
    }),
  });

  if (!res.ok) throw new Error(`Google auth failed (${res.status})`);

  const data = (await res.json()) as { access_token?: string };
  if (!data.access_token) throw new Error("No access token returned from Google.");
  return data.access_token;
}

function pemToArrayBuffer(pem: string): ArrayBuffer {
  const base64 = pem
    .replace("-----BEGIN PRIVATE KEY-----", "")
    .replace("-----END PRIVATE KEY-----", "")
    .replace(/\s/g, "");
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return bytes.buffer;
}

function base64UrlEncode(input: string | ArrayBuffer): string {
  const bytes =
    typeof input === "string"
      ? new TextEncoder().encode(input)
      : new Uint8Array(input);
  let binary = "";
  bytes.forEach((b) => (binary += String.fromCharCode(b)));
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}


