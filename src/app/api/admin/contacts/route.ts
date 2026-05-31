import { NextResponse } from "next/server";
import { pool } from "@/lib/db";
import { isAuthenticated } from "@/lib/auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

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
