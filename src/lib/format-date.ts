/**
 * Deterministic date formatting helpers.
 *
 * Use a FIXED locale (en-CA = YYYY-MM-DD) and fixed options so that the
 * server-rendered date string is identical to the client-rendered one.
 * This avoids React hydration mismatches caused by locale/timezone drift
 * between the server and the visitor's browser.
 *
 * Only use locale-dependent formatting (toLocaleDateString without a fixed
 * locale) in pure client components that mount after hydration.
 */

const FIXED_LOCALE = "en-CA"; // yields YYYY-MM-DD style

/** e.g. "2026-01-15" — safe for SSR + hydration. */
export function formatDate(iso: string | Date): string {
  const d = typeof iso === "string" ? new Date(iso) : iso;
  if (Number.isNaN(d.getTime())) return "—";
  return d.toLocaleDateString(FIXED_LOCALE, {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
}

/** e.g. "2026-01-15 10:30" — safe for SSR + hydration (no seconds, fixed locale). */
export function formatDateTime(iso: string | Date): string {
  const d = typeof iso === "string" ? new Date(iso) : iso;
  if (Number.isNaN(d.getTime())) return "—";
  const date = d.toLocaleDateString(FIXED_LOCALE, {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  const time = d.toLocaleTimeString(FIXED_LOCALE, {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
  return `${date} ${time}`;
}
