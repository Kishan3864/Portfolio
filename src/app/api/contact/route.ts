import { pool } from "@/lib/db";
import { sendThankYouEmail } from "@/lib/mail";

// Runs on the Node.js runtime (pg needs Node APIs) and is never statically cached.
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  const data = (body ?? {}) as Record<string, unknown>;
  const name = String(data.name ?? "").trim();
  const email = String(data.email ?? "").trim();
  const message = String(data.message ?? "").trim();

  // Basic validation — keep it minimal but safe.
  if (!name || !email || !message) {
    return Response.json(
      { ok: false, error: "All fields are required." },
      { status: 400 }
    );
  }
  if (name.length > 120 || email.length > 200 || message.length > 5000) {
    return Response.json(
      { ok: false, error: "One of the fields is too long." },
      { status: 400 }
    );
  }
  if (!EMAIL_RE.test(email)) {
    return Response.json(
      { ok: false, error: "Please enter a valid email address." },
      { status: 400 }
    );
  }

  try {
    // Parameterized query — safe from SQL injection.
    await pool.query(
      "INSERT INTO contacts (name, email, message) VALUES ($1, $2, $3)",
      [name, email, message]
    );
  } catch (err) {
    console.error("[contact] insert failed:", err);
    return Response.json(
      {
        ok: false,
        error: "Could not send right now. Please try again or email me directly.",
      },
      { status: 500 }
    );
  }

  // Send the automatic thank-you reply to the visitor. Best-effort: never block
  // or fail the submission if email delivery has a problem (it's already saved).
  sendThankYouEmail(email, name).catch((err) =>
    console.error("[contact] thank-you email failed:", err)
  );

  return Response.json({ ok: true });
}
