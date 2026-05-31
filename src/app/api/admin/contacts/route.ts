import { NextResponse } from "next/server";
import { pool } from "@/lib/db";
import { isAuthenticated } from "@/lib/auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// List all contact submissions (newest first).
export async function GET() {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }
  const { rows } = await pool.query(
    "SELECT id, name, email, message, created_at FROM contacts ORDER BY created_at DESC"
  );
  return NextResponse.json({ ok: true, contacts: rows });
}

// Create a new contact entry manually from the admin panel.
export async function POST(request: Request) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }
  const body = (await request.json().catch(() => ({}))) as Record<string, unknown>;
  const name = String(body.name ?? "").trim();
  const email = String(body.email ?? "").trim();
  const message = String(body.message ?? "").trim();

  if (!name || !email || !message) {
    return NextResponse.json(
      { ok: false, error: "All fields are required." },
      { status: 400 }
    );
  }
  if (name.length > 120 || email.length > 200 || message.length > 5000) {
    return NextResponse.json(
      { ok: false, error: "One of the fields is too long." },
      { status: 400 }
    );
  }
  if (!EMAIL_RE.test(email)) {
    return NextResponse.json(
      { ok: false, error: "Please enter a valid email address." },
      { status: 400 }
    );
  }

  const { rows } = await pool.query(
    "INSERT INTO contacts (name, email, message) VALUES ($1, $2, $3) RETURNING id, name, email, message, created_at",
    [name, email, message]
  );
  return NextResponse.json({ ok: true, contact: rows[0] });
}
