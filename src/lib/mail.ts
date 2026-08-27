import nodemailer, { type Transporter } from "nodemailer";
import { profile } from "@/lib/profile";

// SMTP transport built from env vars. Defaults target Gmail.
//   SMTP_USER / SMTP_PASS  -> your Gmail address + a Gmail App Password
//   SMTP_HOST (default smtp.gmail.com), SMTP_PORT (default 465)
//   MAIL_FROM (optional display name, defaults to "Kishan Patel <SMTP_USER>")
// If SMTP_USER/SMTP_PASS aren't set, email is skipped silently (the contact
// form still works and saves to the DB).
let cached: Transporter | null = null;

const PORTFOLIO_URL = "https://kishanportfolio.tech";

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

// Automated acknowledgement sent to whoever submits the form.
// Written to read like a short personal note, not a marketing blast —
// simple layout, one column, few links, plain-text alternative included.
// That combination is what keeps a personal Gmail sender out of spam.
export async function sendThankYouEmail(to: string, name: string): Promise<void> {
  const transporter = getTransporter();
  if (!transporter) return; // not configured — skip

  const from = process.env.MAIL_FROM || `${profile.name} <${process.env.SMTP_USER}>`;
  // Strip any CR/LF so a name can never inject email headers.
  const cleanName = name.replace(/[\r\n]+/g, " ").trim() || "there";
  const firstName = cleanName.split(" ")[0];
  const subject = `Message received — I'll reply within 24 hours`;

  // A real, per-message timestamp (a) reassures the sender we received it and
  // (b) keeps every email unique, so Gmail never folds it into "trimmed content".
  const received = new Date().toLocaleString("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "Asia/Kolkata",
  });

  const text = `Hi ${firstName},

This is a quick confirmation that your message reached me on ${received} (IST).

I read every message personally and I'll reply to you within 24 hours, usually much sooner. If anything is urgent, just reply to this email — it comes straight to my inbox.

Talk soon,

Kishan Patel
.NET Developer & Product Builder
India

Email: ${profile.email}
Portfolio: ${PORTFOLIO_URL}
LinkedIn: ${profile.linkedin}
GitHub: ${profile.github}

You are receiving this one-time confirmation because you contacted me through ${PORTFOLIO_URL}. No newsletters, no follow-up marketing.`;

  // Colors match the site's paper-and-ink branding. No external images —
  // the monogram is pure CSS, so nothing is blocked or flagged.
  const ink = "#1C1917";
  const orange = "#C2410C";
  const html = `
  <div style="background:#F8F4EC;padding:28px 14px;">
    <div style="font-family:Georgia,'Times New Roman',serif;max-width:560px;margin:0 auto;background:#FFFDF7;border:1px solid #E3DBC9;border-radius:12px;overflow:hidden;">
      <div style="height:5px;background:${orange};"></div>
      <div style="padding:32px 30px;color:${ink};">

        <p style="margin:0 0 18px;font-size:16px;line-height:1.7;">Hi ${escapeHtml(firstName)},</p>

        <p style="margin:0 0 18px;font-size:16px;line-height:1.7;">
          This is a quick confirmation that your message reached me. I read every
          message personally, and I&rsquo;ll reply to you <strong>within 24 hours</strong> &mdash;
          usually much sooner.
        </p>

        <p style="margin:0 0 22px;padding:12px 16px;background:#F8F4EC;border-left:3px solid ${orange};font-size:14px;color:#57534E;border-radius:0 8px 8px 0;">
          Received on ${escapeHtml(received)} (IST)
        </p>

        <p style="margin:0 0 28px;font-size:16px;line-height:1.7;">
          If anything is urgent, simply reply to this email &mdash; it comes straight
          to my personal inbox.
        </p>

        <p style="margin:0 0 26px;font-size:16px;">Talk soon,</p>

        <!-- Signature -->
        <table role="presentation" cellpadding="0" cellspacing="0" style="border-top:2px solid ${ink};padding-top:0;width:100%;">
          <tr>
            <td style="padding:20px 0 0;vertical-align:top;width:64px;">
              <div style="width:52px;height:52px;background:${ink};border-radius:10px;text-align:center;line-height:52px;color:#FFFDF7;font-family:Arial,Helvetica,sans-serif;font-size:19px;font-weight:bold;letter-spacing:1px;">KP</div>
            </td>
            <td style="padding:20px 0 0 14px;vertical-align:top;">
              <p style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:16px;font-weight:bold;color:${ink};">Kishan Patel</p>
              <p style="margin:2px 0 0;font-family:Arial,Helvetica,sans-serif;font-size:13px;color:#57534E;">.NET Developer &amp; Product Builder &middot; India</p>
              <p style="margin:8px 0 0;font-family:Arial,Helvetica,sans-serif;font-size:13px;">
                <a href="mailto:${profile.email}" style="color:${orange};text-decoration:none;font-weight:bold;">${escapeHtml(profile.email)}</a>
              </p>
              <p style="margin:8px 0 0;font-family:Arial,Helvetica,sans-serif;font-size:13px;">
                <a href="${PORTFOLIO_URL}" style="color:${ink};text-decoration:underline;">Portfolio</a>
                &nbsp;&middot;&nbsp;
                <a href="${profile.linkedin}" style="color:${ink};text-decoration:underline;">LinkedIn</a>
                &nbsp;&middot;&nbsp;
                <a href="${profile.github}" style="color:${ink};text-decoration:underline;">GitHub</a>
              </p>
            </td>
          </tr>
        </table>

      </div>
      <div style="padding:14px 30px;background:#F8F4EC;border-top:1px solid #E3DBC9;">
        <p style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:11.5px;line-height:1.6;color:#78716C;">
          You&rsquo;re receiving this one-time confirmation because you contacted me
          through kishanportfolio.tech. No newsletters, no marketing &mdash; just my reply.
        </p>
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
