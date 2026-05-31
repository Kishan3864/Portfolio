// Minimal, dependency-free admin auth for the single owner (Kishan).
// A login password is checked against ADMIN_PASSWORD; on success an
// HMAC-signed, time-limited session token is stored in an HttpOnly cookie.
// No DB session table needed — the token verifies itself via the signature.
import { createHmac, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";

export const SESSION_COOKIE = "kp_admin";
export const SESSION_MAX_AGE = 60 * 60 * 12; // 12 hours, in seconds

function secret(): string {
  return process.env.ADMIN_SESSION_SECRET || "";
}

function sign(payload: string): string {
  return createHmac("sha256", secret()).update(payload).digest("base64url");
}

function safeEqual(a: string, b: string): boolean {
  const ab = Buffer.from(a);
  const bb = Buffer.from(b);
  if (ab.length !== bb.length) return false;
  return timingSafeEqual(ab, bb);
}

export function createSessionToken(): string {
  const exp = String(Date.now() + SESSION_MAX_AGE * 1000);
  return `${exp}.${sign(exp)}`;
}

function verifyToken(token: string | undefined): boolean {
  if (!token || !secret()) return false;
  const dot = token.lastIndexOf(".");
  if (dot <= 0) return false;
  const payload = token.slice(0, dot);
  const sig = token.slice(dot + 1);
  if (!safeEqual(sig, sign(payload))) return false;
  const exp = Number(payload);
  return Number.isFinite(exp) && Date.now() < exp;
}

// Constant-time password check against the configured admin password.
export function checkPassword(input: string): boolean {
  const expected = process.env.ADMIN_PASSWORD || "";
  if (!expected) return false; // never allow login if password isn't configured
  return safeEqual(input, expected);
}

// Read the session cookie (works in Server Components and Route Handlers).
export async function isAuthenticated(): Promise<boolean> {
  const store = await cookies();
  return verifyToken(store.get(SESSION_COOKIE)?.value);
}
