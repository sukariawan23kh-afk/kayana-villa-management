/**
 * Root admin layout — minimal pass-through (no sidebar).
 * The sidebar lives in src/app/admin/(dashboard)/layout.tsx so the
 * /admin/login page renders standalone without the chrome.
 */
export default function AdminRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
