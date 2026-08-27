import { NextResponse } from "next/server";
import {
  checkPassword,
  createSessionToken,
  SESSION_COOKIE,
  SESSION_MAX_AGE,
} from "@/lib/auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    body = {};
  }
  const password = String((body as Record<string, unknown>)?.password ?? "");

  if (!checkPassword(password)) {
    return NextResponse.json(
      { ok: false, error: "Incorrect password." },
      { status: 401 }
    );
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.set(SESSION_COOKIE, createSessionToken(), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: SESSION_MAX_AGE,
  });
  return res;
}
