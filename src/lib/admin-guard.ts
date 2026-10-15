import { redirect } from "next/navigation";
import { isAdmin } from "@/lib/admin-auth";

/** Server guard: redirects to /admin/login if not authenticated. */
export async function requireAdmin() {
  if (!(await isAdmin())) {
    redirect("/admin/login");
  }
}
