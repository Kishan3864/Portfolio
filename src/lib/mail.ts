import nodemailer, { type Transporter } from "nodemailer";
import { profile } from "@/lib/profile";

// SMTP transport built from env vars. Defaults target Gmail.
//   SMTP_USER / SMTP_PASS  -> your Gmail address + a Gmail App Password
//   SMTP_HOST (default smtp.gmail.com), SMTP_PORT (default 465)
//   MAIL_FROM (optional display name, defaults to "Kishan Patel <SMTP_USER>")
// If SMTP_USER/SMTP_PASS aren't set, email is skipped silently (the contact
// form still works and saves to the DB).
let cached: Transporter | null = null;

function getTransporter(): Transporter | null {
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  if (!user || !pass) return null;
  if (cached) return cached;

  const host = process.env.SMTP_HOST || "smtp.gmail.com";
  const port = Number(process.env.SMTP_PORT || 465);
  cached = nodemailer.createTransport({
    host,
    port,
    secure: port === 465, // implicit TLS on 465
    auth: { user, pass },
    connectionTimeout: 10_000,
    greetingTimeout: 10_000,
    socketTimeout: 15_000,
  });
  return cached;
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

// Automated thank-you / acknowledgement sent to whoever submits the form.
export async function sendThankYouEmail(to: string, name: string): Promise<void> {
  const transporter = getTransporter();
  if (!transporter) return; // not configured — skip

  const from = process.env.MAIL_FROM || `${profile.name} <${process.env.SMTP_USER}>`;
  const safeName = name.trim() || "there";

  const text = `Hi ${safeName},

Thank you for reaching out — I truly appreciate you taking the time to message me.

I've received your message and will personally get back to you shortly (usually within 24 hours).

Warm regards,
${profile.name}
.NET Developer & Product Builder`;

  const html = `
  <div style="font-family: Arial, Helvetica, sans-serif; max-width: 480px; margin: 0 auto; color: #0F172A; border: 1px solid #E2E8F0;">
    <div style="height: 4px; background: linear-gradient(90deg, #1E293B, #475569, #64748B);"></div>
    <div style="padding: 28px 24px;">
      <h2 style="margin: 0 0 14px; font-size: 18px;">Thank you for reaching out! 🙏</h2>
      <p style="margin: 0 0 14px; line-height: 1.6; color: #334155;">Hi ${escapeHtml(safeName)},</p>
      <p style="margin: 0 0 14px; line-height: 1.6; color: #334155;">
        Thank you for getting in touch — I truly appreciate you taking the time to message me.
      </p>
      <p style="margin: 0 0 14px; line-height: 1.6; color: #334155;">
        I've received your message and will personally get back to you
        <strong>shortly (usually within 24 hours)</strong>.
      </p>
      <p style="margin: 24px 0 4px; line-height: 1.4; color: #0F172A; font-weight: 600;">${escapeHtml(profile.name)}</p>
      <p style="margin: 0; font-size: 13px; color: #64748B;">.NET Developer &amp; Product Builder</p>
    </div>
    <div style="padding: 14px 24px; border-top: 1px solid #E2E8F0; font-size: 12px; color: #94A3B8;">
      This is an automated confirmation from kishanportfolio.tech
    </div>
  </div>`;

  await transporter.sendMail({
    from,
    to,
    replyTo: process.env.SMTP_USER,
    subject: "Thank you for reaching out!",
    text,
    html,
  });
}
