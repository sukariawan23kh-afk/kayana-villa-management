/**
 * Lightweight admin auth helpers.
 *
 * Uses a single shared password (from env ADMIN_PASSWORD, default
 * "kayana2026") and a signed cookie "kayana_admin" containing a simple
 * HMAC token. NOT enterprise-grade, but suitable for a small CMS admin
 * behind a single shared password.
 */
import { cookies } from "next/headers";

const COOKIE_NAME = "kayana_admin";
const TOKEN_TTL = 1000 * 60 * 60 * 24 * 7; // 7 days

export const ADMIN_PASSWORD =
  process.env.ADMIN_PASSWORD ?? "kayana2026";

const SECRET = process.env.ADMIN_SECRET ?? "kayana-cms-secret-local";

/** Constant-time-ish string comparison. */
function safeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

async function hmac(input: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(SECRET),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const sig = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(input));
  return Buffer.from(new Uint8Array(sig)).toString("base64url");
}

/** Create an admin session token: `exp.hmac(exp)`. */
export async function createSessionToken(): Promise<string> {
  const exp = Date.now() + TOKEN_TTL;
  const sig = await hmac(String(exp));
  return `${exp}.${sig}`;
}

/** Validate a session token. Returns true if valid and not expired. */
export async function verifySessionToken(token: string | undefined): Promise<boolean> {
  if (!token) return false;
  const parts = token.split(".");
  if (parts.length !== 2) return false;
  const expStr = parts[0];
  const sig = parts[1];
  const exp = Number(expStr);
  if (!Number.isFinite(exp) || exp < Date.now()) return false;
  const expected = await hmac(expStr);
  return safeEqual(sig, expected);
}

/** Check a password against the configured admin password. */
export function checkPassword(password: string): boolean {
  return safeEqual(password, ADMIN_PASSWORD);
}

/** Server-side: is the current request authenticated? */
export async function isAdmin(): Promise<boolean> {
  const store = await cookies();
  const token = store.get(COOKIE_NAME)?.value;
  return verifySessionToken(token);
}

export { COOKIE_NAME };
