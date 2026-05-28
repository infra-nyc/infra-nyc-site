import { NextResponse } from "next/server";
import { ZodError } from "zod";
import { Resend } from "resend";

import { jobsInterestSchema } from "@/lib/jobs-interest-schema";

export const runtime = "nodejs";

const RECIPIENT = "megan@infra.community";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const payload = jobsInterestSchema.parse(body);

    const timestamp = new Date().toISOString();
    const rolesText = payload.selectedRoles
      .map((r) => `  • ${r.company} — ${r.role}`)
      .join("\n");

    // Send email via Resend if configured
    const resendKey = process.env.RESEND_API_KEY;
    if (resendKey) {
      const resend = new Resend(resendKey);
      await resend.emails.send({
        from: process.env.RESEND_FROM_EMAIL ?? "jobs@infra.nyc",
        to: RECIPIENT,
        subject: `Jobs interest — ${payload.selectedRoles.map((r) => r.company).join(", ")}`,
        text: buildEmailText({ ...payload, timestamp, rolesText }),
        html: buildEmailHtml({ ...payload, timestamp, rolesText }),
      });
    } else {
      // Log to console in development when Resend is not configured
      console.log("[jobs-interest] Submission (Resend not configured):");
      console.log(buildEmailText({ ...payload, timestamp, rolesText }));
    }

    // Optionally store in Airtable if configured
    if (process.env.AIRTABLE_API_KEY && process.env.AIRTABLE_BASE_ID) {
      await saveToAirtable({ ...payload, timestamp });
    }

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

type EmailData = {
  linkedin: string;
  email: string;
  note: string;
  selectedRoles: { id: string; company: string; role: string }[];
  timestamp: string;
  rolesText: string;
};

function buildEmailText(d: EmailData): string {
  return `New jobs interest submission — infra.nyc
Submitted: ${d.timestamp}

ROLES OF INTEREST
${d.rolesText}

CONTACT
LinkedIn: ${d.linkedin}
Email:    ${d.email}

NOTE
${d.note}
`;
}

function buildEmailHtml(d: EmailData): string {
  const rolesHtml = d.selectedRoles
    .map(
      (r) =>
        `<li style="margin-bottom:4px;"><strong>${r.company}</strong> — ${r.role}</li>`,
    )
    .join("");

  return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;color:#1a1a1a;max-width:600px;margin:0 auto;padding:32px 24px;background:#fff;">
  <p style="font-size:11px;text-transform:uppercase;letter-spacing:0.12em;color:#999;margin-bottom:24px;">infra.nyc — jobs interest</p>

  <h2 style="font-size:18px;font-weight:600;margin:0 0 20px;">New interest submission</h2>

  <table style="width:100%;border-collapse:collapse;margin-bottom:24px;">
    <tr>
      <td style="padding:8px 0;border-bottom:1px solid #eee;font-size:13px;color:#666;width:100px;">Submitted</td>
      <td style="padding:8px 0;border-bottom:1px solid #eee;font-size:13px;">${d.timestamp}</td>
    </tr>
    <tr>
      <td style="padding:8px 0;border-bottom:1px solid #eee;font-size:13px;color:#666;">LinkedIn</td>
      <td style="padding:8px 0;border-bottom:1px solid #eee;font-size:13px;"><a href="${d.linkedin}" style="color:#1a1a1a;">${d.linkedin}</a></td>
    </tr>
    <tr>
      <td style="padding:8px 0;font-size:13px;color:#666;">Email</td>
      <td style="padding:8px 0;font-size:13px;"><a href="mailto:${d.email}" style="color:#1a1a1a;">${d.email}</a></td>
    </tr>
  </table>

  <div style="margin-bottom:24px;">
    <p style="font-size:11px;text-transform:uppercase;letter-spacing:0.12em;color:#999;margin-bottom:10px;">Roles of interest</p>
    <ul style="margin:0;padding-left:20px;font-size:13px;line-height:1.7;">${rolesHtml}</ul>
  </div>

  <div style="background:#f8f7f5;border-radius:8px;padding:16px 20px;">
    <p style="font-size:11px;text-transform:uppercase;letter-spacing:0.12em;color:#999;margin:0 0 8px;">Note</p>
    <p style="font-size:13px;line-height:1.7;margin:0;white-space:pre-wrap;">${d.note}</p>
  </div>
</body>
</html>`;
}

async function saveToAirtable(payload: {
  linkedin: string;
  email: string;
  note: string;
  selectedRoles: { id: string; company: string; role: string }[];
  timestamp: string;
}) {
  const table = encodeURIComponent(
    process.env.AIRTABLE_JOBS_TABLE_NAME ?? "Jobs Interest",
  );
  const rolesStr = payload.selectedRoles
    .map((r) => `${r.company} — ${r.role}`)
    .join("; ");

  const res = await fetch(
    `https://api.airtable.com/v0/${process.env.AIRTABLE_BASE_ID}/${table}`,
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
              Timestamp: payload.timestamp,
              LinkedIn: payload.linkedin,
              Email: payload.email,
              Roles: rolesStr,
              Note: payload.note,
            },
          },
        ],
      }),
    },
  );

  if (!res.ok) {
    // Non-fatal — log but don't fail the request
    console.error(`Airtable save failed: ${res.status}`);
  }
}
