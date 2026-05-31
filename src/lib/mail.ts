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
  // Strip any CR/LF so a name can never inject email headers.
  const cleanName = name.replace(/[\r\n]+/g, " ").trim() || "there";
  const subject =
    cleanName === "there"
      ? "Thank you for reaching out!"
      : `Thank you for reaching out, ${cleanName}!`;

  // A real, per-message timestamp (a) reassures the sender we received it and
  // (b) keeps every email unique, so Gmail never folds it into "trimmed content".
  const received = new Date().toLocaleString("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "Asia/Kolkata",
  });

  const links = [
    { label: "LinkedIn", url: profile.linkedin },
    { label: "GitHub", url: profile.github },
    ...profile.products.map((p) => ({ label: p.name, url: p.url })),
  ];

  const text = `Hi ${cleanName},

Thank you for getting in touch through my website — I genuinely appreciate you taking the time to write to me.

I've received your message and will personally read it and get back to you within 24 hours (often sooner). If it's urgent, you can simply reply to this email.

Your message was received on ${received} (IST).

While you wait, feel free to explore my work:
${links.map((l) => `- ${l.label}: ${l.url}`).join("\n")}

Warm regards,
${profile.name}
.NET Developer & Product Builder
${profile.email}`;

  const linksHtml = links
    .map(
      (l) =>
        `<a href="${l.url}" style="color: #475569; text-decoration: none; font-weight: 600;">${escapeHtml(l.label)}</a>`
    )
    .join(' <span style="color: #CBD5E1;">·</span> ');

  const html = `
  <div style="font-family: Arial, Helvetica, sans-serif; max-width: 520px; margin: 0 auto; color: #0F172A; border: 1px solid #E2E8F0;">
    <div style="height: 4px; background: linear-gradient(90deg, #1E293B, #475569, #64748B);"></div>
    <div style="padding: 30px 26px;">
      <h2 style="margin: 0 0 16px; font-size: 19px; color: #0F172A;">Thank you for reaching out! 🙏</h2>
      <p style="margin: 0 0 14px; line-height: 1.6; color: #334155;">Hi ${escapeHtml(cleanName)},</p>
      <p style="margin: 0 0 14px; line-height: 1.6; color: #334155;">
        Thank you for getting in touch through my website — I genuinely appreciate you taking the time to write to me.
      </p>
      <p style="margin: 0 0 16px; line-height: 1.6; color: #334155;">
        I've received your message and will personally read it and get back to you
        <strong>within 24 hours</strong> (often sooner). If it's urgent, you can simply
        reply to this email.
      </p>
      <p style="margin: 0 0 20px; padding: 10px 14px; background: #F1F5F9; border-left: 3px solid #475569; font-size: 13px; color: #475569;">
        &#10003; Your message was received on ${escapeHtml(received)} (IST).
      </p>
      <p style="margin: 0 0 8px; line-height: 1.6; color: #334155;">
        While you wait, feel free to explore my work:
      </p>
      <p style="margin: 0 0 24px; line-height: 1.8;">${linksHtml}</p>
      <div style="border-top: 1px solid #E2E8F0; padding-top: 16px;">
        <p style="margin: 0 0 2px; font-weight: 700; color: #0F172A;">${escapeHtml(profile.name)}</p>
        <p style="margin: 0 0 2px; font-size: 13px; color: #64748B;">.NET Developer &amp; Product Builder</p>
        <p style="margin: 0; font-size: 13px;"><a href="mailto:${profile.email}" style="color: #475569; text-decoration: none;">${escapeHtml(profile.email)}</a></p>
      </div>
    </div>
  </div>`;

  await transporter.sendMail({
    from,
    to,
    replyTo: process.env.SMTP_USER,
    subject,
    text,
    html,
  });
}
