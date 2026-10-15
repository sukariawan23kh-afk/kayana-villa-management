"use client";

import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";

export function LogoutButton() {
  const router = useRouter();
  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }
  return (
    <button
      onClick={logout}
      className="inline-flex items-center gap-2 rounded-full border border-stone/70 px-3.5 py-2 text-xs font-medium text-muted-foreground transition-colors hover:border-charcoal/30 hover:text-charcoal"
    >
      <LogOut className="size-3.5" />
      Sign out
    </button>
  );
}
