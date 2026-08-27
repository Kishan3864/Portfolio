import { pool } from "@/lib/db";
import { sendThankYouEmail } from "@/lib/mail";
import { validateContact, COOLDOWN_SECONDS } from "@/lib/validation";

// Runs on the Node.js runtime (pg needs Node APIs) and is never statically cached.
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// One-time, lazy schema upgrade so production migrates itself on first request
// (the original table had only name/email/message).
let schemaReady: Promise<void> | null = null;
function ensureSchema(): Promise<void> {
  if (!schemaReady) {
    schemaReady = (async () => {
      await pool.query(`ALTER TABLE contacts ADD COLUMN IF NOT EXISTS phone TEXT`);
      await pool.query(`ALTER TABLE contacts ADD COLUMN IF NOT EXISTS ip TEXT`);
    })().catch((err) => {
      schemaReady = null; // retry on the next request
      throw err;
    });
  }
  return schemaReady;
}

// Real client IP behind nginx. Falls back to null (email check still applies).
function clientIp(request: Request): string | null {
  const xff = request.headers.get("x-forwarded-for");
  if (xff) {
    const first = xff.split(",")[0]?.trim();
    if (first) return first.slice(0, 64);
  }
  const real = request.headers.get("x-real-ip");
  return real ? real.slice(0, 64) : null;
}

// How long this visitor must still wait, based on their IP and (optionally)
// the email they're about to use. Returns 0 when they may send.
async function remainingCooldown(
  ip: string | null,
  email: string | null
): Promise<number> {
  if (!ip && !email) return 0;
  const { rows } = await pool.query(
    `SELECT EXTRACT(EPOCH FROM (NOW() - created_at))::int AS elapsed
       FROM contacts
      WHERE created_at > NOW() - ($1 || ' seconds')::interval
        AND (($2::text IS NOT NULL AND lower(email) = $2)
          OR ($3::text IS NOT NULL AND ip = $3))
      ORDER BY created_at DESC
      LIMIT 1`,
    [COOLDOWN_SECONDS, email, ip]
  );
  if (rows.length === 0) return 0;
  return Math.max(0, COOLDOWN_SECONDS - Number(rows[0].elapsed));
}

// The form asks for this on load (and when the email field is filled) so the
// send button shows as locked in a new tab, an incognito window or another
// browser — the countdown lives on the server, not in localStorage.
export async function GET(request: Request) {
  const url = new URL(request.url);
  const emailParam = url.searchParams.get("email");
  const email =
    emailParam && emailParam.length <= 200
      ? emailParam.trim().toLowerCase()
      : null;

  try {
    await ensureSchema();
    const retryAfterSeconds = await remainingCooldown(clientIp(request), email);
    return Response.json(
      { ok: true, retryAfterSeconds, cooldownSeconds: COOLDOWN_SECONDS },
      { headers: { "Cache-Control": "no-store" } }
    );
  } catch (err) {
    console.error("[contact] cooldown check failed:", err);
    // Never block the form because the lookup failed — POST still enforces it.
    return Response.json(
      { ok: true, retryAfterSeconds: 0, cooldownSeconds: COOLDOWN_SECONDS },
      { headers: { "Cache-Control": "no-store" } }
    );
  }
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  const data = (body ?? {}) as Record<string, unknown>;
  const { errors, values } = validateContact({
    name: String(data.name ?? ""),
    email: String(data.email ?? ""),
    phone: String(data.phone ?? ""),
    message: String(data.message ?? ""),
  });

  const firstError = Object.values(errors)[0];
  if (firstError) {
    return Response.json({ ok: false, error: firstError, errors }, { status: 400 });
  }

  const ip = clientIp(request);

  try {
    await ensureSchema();

    // Server-side cooldown: one message per 15 minutes per IP OR per email.
    // Because it lives in the database, a new tab, incognito window or a
    // different device cannot get around it.
    const waitSeconds = await remainingCooldown(ip, values.email);

    if (waitSeconds > 0) {
      const retryAfterSeconds = Math.max(1, waitSeconds);
      const mins = Math.ceil(retryAfterSeconds / 60);
      return Response.json(
        {
          ok: false,
          error: `You've already sent a message recently. Please wait ${mins} minute${mins === 1 ? "" : "s"} before sending another.`,
          retryAfterSeconds,
        },
        { status: 429, headers: { "Retry-After": String(retryAfterSeconds) } }
      );
    }

    // Parameterized query — safe from SQL injection.
    await pool.query(
      "INSERT INTO contacts (name, email, phone, message, ip) VALUES ($1, $2, $3, $4, $5)",
      [values.name, values.email, values.phone, values.message, ip]
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
  sendThankYouEmail(values.email, values.name).catch((err) =>
    console.error("[contact] thank-you email failed:", err)
  );

  return Response.json({ ok: true, cooldownSeconds: COOLDOWN_SECONDS });
}
