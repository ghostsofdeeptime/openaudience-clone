import { createHash } from "node:crypto";
import { NextRequest, NextResponse } from "next/server";

const RECIPIENT = "info@openaudience.com";
const ignoredFields = new Set([
  "gform_submit",
  "gform_unique_id",
  "state_4",
  "gform_target_page_number_4",
  "gform_source_page_number_4",
  "gform_field_values",
  "gform_submission_method",
  "gform_theme",
  "gform_style_settings",
  "gform_currency",
  "g-recaptcha-response",
]);

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
  })[character] ?? character);
}

export async function POST(request: NextRequest) {
  if ((Number(request.headers.get("content-length")) || 0) > 100_000) {
    return NextResponse.json({ error: "Submission too large." }, { status: 413 });
  }

  const form = await request.formData();
  const apiKey = process.env.RESEND_API_KEY;
  const captchaSecret = process.env.RECAPTCHA_SECRET_KEY;
  if (!apiKey || !captchaSecret) {
    return NextResponse.json({ error: "Contact delivery is not configured." }, { status: 503 });
  }

  const captchaResponse = String(form.get("g-recaptcha-response") ?? "");
  const verification = await fetch("https://www.google.com/recaptcha/api/siteverify", {
    method: "POST",
    headers: { "content-type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      secret: captchaSecret,
      response: captchaResponse,
      remoteip: request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "",
    }),
  });
  const captcha = (await verification.json()) as { success?: boolean };
  if (!captcha.success) {
    return NextResponse.json({ error: "CAPTCHA verification failed." }, { status: 400 });
  }

  const fields = [...form.entries()]
    .filter(([name, value]) => !ignoredFields.has(name) && typeof value === "string")
    .map(([name, value]) => [name, String(value).slice(0, 10_000)] as const);
  const plainText = fields.map(([name, value]) => `${name}: ${value}`).join("\n");
  const html = `<h1>New Open Audience website enquiry</h1><table>${fields
    .map(([name, value]) => `<tr><th align="left" valign="top">${escapeHtml(name)}</th><td>${escapeHtml(value).replaceAll("\n", "<br>")}</td></tr>`)
    .join("")}</table>`;
  const idempotencyKey = createHash("sha256")
    .update(`${new Date().toISOString().slice(0, 13)}:${request.headers.get("x-forwarded-for")}:${plainText}`)
    .digest("hex");

  const delivery = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      authorization: `Bearer ${apiKey}`,
      "content-type": "application/json",
      "idempotency-key": `contact-${idempotencyKey}`,
    },
    body: JSON.stringify({
      from: process.env.CONTACT_FROM_EMAIL ?? "Open Audience Website <website@openaudience.com>",
      to: [RECIPIENT],
      subject: "New website enquiry",
      html,
      text: plainText,
    }),
  });
  if (!delivery.ok) {
    return NextResponse.json({ error: "The message could not be delivered." }, { status: 502 });
  }

  return NextResponse.redirect(new URL("/contact/?sent=1", request.url), 303);
}
