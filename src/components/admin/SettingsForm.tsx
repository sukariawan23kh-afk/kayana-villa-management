"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Loader2, Save, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type Setting = {
  whatsappNumber: string;
  whatsappDisplay: string;
  email: string;
  location: string;
  locationLabelEn: string;
  locationLabelId: string;
  instagram: string;
  facebook: string;
  linkedin: string;
} | null;

export function SettingsForm({ initial }: { initial: Setting }) {
  const router = useRouter();
  const [form, setForm] = React.useState({
    whatsappNumber: initial?.whatsappNumber ?? "",
    whatsappDisplay: initial?.whatsappDisplay ?? "",
    email: initial?.email ?? "",
    location: initial?.location ?? "",
    locationLabelEn: initial?.locationLabelEn ?? "",
    locationLabelId: initial?.locationLabelId ?? "",
    instagram: initial?.instagram ?? "",
    facebook: initial?.facebook ?? "",
    linkedin: initial?.linkedin ?? "",
  });
  const [saving, setSaving] = React.useState(false);
  const [saved, setSaved] = React.useState(false);

  function set<K extends keyof typeof form>(key: K, value: string) {
    setForm((p) => ({ ...p, [key]: value }));
    setSaved(false);
  }

  async function save(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch("/api/admin/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) throw new Error(data.error);
      toast.success("Settings saved");
      setSaved(true);
      router.refresh();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Save failed");
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={save} className="flex max-w-3xl flex-col gap-6">
      <header>
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-tropical">
          Configuration
        </p>
        <h1 className="mt-1 font-serif-display text-3xl font-medium text-charcoal">
          Site Settings
        </h1>
        <p className="mt-1.5 text-sm text-muted-foreground">
          Editable contact details, WhatsApp number and social links. Changes go live immediately on the public website.
        </p>
      </header>

      <section className="rounded-2xl border border-stone/70 bg-card p-6">
        <h2 className="mb-4 font-serif-display text-lg font-medium text-charcoal">
          Contact &amp; WhatsApp
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="WhatsApp Number (digits only)" hint="Used for wa.me links, e.g. 6281234567890">
            <Input value={form.whatsappNumber} onChange={(e) => set("whatsappNumber", e.target.value)} placeholder="6281234567890" />
          </Field>
          <Field label="WhatsApp Display" hint="Shown to users, e.g. +62 812 3456 7890">
            <Input value={form.whatsappDisplay} onChange={(e) => set("whatsappDisplay", e.target.value)} placeholder="+62 812 3456 7890" />
          </Field>
          <Field label="Email">
            <Input type="email" value={form.email} onChange={(e) => set("email", e.target.value)} placeholder="hello@kayanavilla.com" />
          </Field>
          <Field label="Location (display)">
            <Input value={form.location} onChange={(e) => set("location", e.target.value)} placeholder="Bali, Indonesia" />
          </Field>
        </div>
      </section>

      <section className="rounded-2xl border border-stone/70 bg-card p-6">
        <h2 className="mb-4 font-serif-display text-lg font-medium text-charcoal">
          Social Links
        </h2>
        <div className="grid gap-4 sm:grid-cols-3">
          <Field label="Instagram URL">
            <Input value={form.instagram} onChange={(e) => set("instagram", e.target.value)} placeholder="https://instagram.com/..." />
          </Field>
          <Field label="Facebook URL">
            <Input value={form.facebook} onChange={(e) => set("facebook", e.target.value)} placeholder="https://facebook.com/..." />
          </Field>
          <Field label="LinkedIn URL">
            <Input value={form.linkedin} onChange={(e) => set("linkedin", e.target.value)} placeholder="https://linkedin.com/..." />
          </Field>
        </div>
      </section>

      <div className="flex items-center gap-3">
        <Button type="submit" disabled={saving} className="gap-2">
          {saving ? <Loader2 className="size-4 animate-spin" /> : <Save className="size-4" />}
          Save settings
        </Button>
        {saved && (
          <span className="inline-flex items-center gap-1.5 text-sm text-tropical">
            <CheckCircle2 className="size-4" /> Saved &amp; live
          </span>
        )}
      </div>
    </form>
  );
}

function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <Label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
        {label}
      </Label>
      {children}
      {hint && <span className="text-[0.7rem] text-muted-foreground/70">{hint}</span>}
    </div>
  );
}
