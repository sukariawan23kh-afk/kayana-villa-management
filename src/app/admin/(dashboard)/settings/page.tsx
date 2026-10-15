import { db } from "@/lib/db";
import { requireAdmin } from "@/lib/admin-guard";
import { SettingsForm } from "@/components/admin/SettingsForm";

export const dynamic = "force-dynamic";

export default async function AdminSettingsPage() {
  await requireAdmin();
  const setting = await db.siteSetting.findUnique({ where: { id: "default" } });
  return <SettingsForm initial={setting} />;
}
