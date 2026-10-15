"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Plus, Pencil, Trash2, X, Loader2, Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

interface Testimonial {
  id: string;
  quoteEn: string;
  quoteId: string;
  nameEn: string;
  nameId: string;
  locationEn: string;
  locationId: string;
  published: boolean;
  order: number;
}

export function TestimonialsManager({
  initialTestimonials,
}: {
  initialTestimonials: Testimonial[];
}) {
  const router = useRouter();
  const [items, setItems] = React.useState(initialTestimonials);
  const [editing, setEditing] = React.useState<Testimonial | "new" | null>(null);
  const [busy, setBusy] = React.useState(false);

  async function refresh() {
    const res = await fetch("/api/admin/testimonials");
    const data = await res.json();
    if (data.ok) setItems(data.testimonials);
  }

  async function togglePublished(t: Testimonial) {
    setBusy(true);
    try {
      await fetch(`/api/admin/testimonials/${t.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ published: !t.published }),
      });
      await refresh();
      router.refresh();
      toast.success(t.published ? "Unpublished" : "Published");
    } finally {
      setBusy(false);
    }
  }

  async function remove(t: Testimonial) {
    if (!confirm("Delete this testimonial?")) return;
    setBusy(true);
    try {
      await fetch(`/api/admin/testimonials/${t.id}`, { method: "DELETE" });
      await refresh();
      toast.success("Deleted");
      router.refresh();
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-tropical">
            Content
          </p>
          <h1 className="mt-1 font-serif-display text-3xl font-medium text-charcoal">
            Testimonials
          </h1>
          <p className="mt-1.5 text-sm text-muted-foreground">
            Owner testimonials. Publish only verified ones with explicit consent.
          </p>
        </div>
        <Button onClick={() => setEditing("new")} className="gap-2">
          <Plus className="size-4" /> Add Testimonial
        </Button>
      </header>

      <div className="grid gap-4 lg:grid-cols-2">
        {items.map((t) => (
          <div
            key={t.id}
            className={`flex flex-col rounded-2xl border bg-card p-5 ${
              t.published ? "border-stone/70" : "border-dashed border-stone/70 opacity-70"
            }`}
          >
            <p className="flex-1 text-sm italic leading-relaxed text-charcoal/80">
              &ldquo;{t.quoteEn}&rdquo;
            </p>
            <div className="mt-4 border-t border-stone/70 pt-3">
              <p className="text-sm font-medium text-charcoal">{t.nameEn}</p>
              <p className="text-xs text-muted-foreground">{t.locationEn}</p>
            </div>
            <div className="mt-3 flex items-center gap-2">
              <Button size="sm" variant="outline" onClick={() => setEditing(t)} className="gap-1.5">
                <Pencil className="size-3.5" /> Edit
              </Button>
              <button
                onClick={() => togglePublished(t)}
                disabled={busy}
                className="inline-flex items-center gap-1.5 rounded-md border border-stone/70 px-2.5 py-1.5 text-xs font-medium text-muted-foreground hover:border-charcoal/30 hover:text-charcoal"
              >
                {t.published ? <Eye className="size-3.5" /> : <EyeOff className="size-3.5" />}
                {t.published ? "Live" : "Hidden"}
              </button>
              <button
                onClick={() => remove(t)}
                disabled={busy}
                aria-label="Delete"
                className="ml-auto inline-flex size-8 items-center justify-center rounded-md border border-stone/70 text-muted-foreground hover:border-red-300 hover:bg-red-50 hover:text-red-600"
              >
                <Trash2 className="size-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {editing && (
        <TestimonialEditor
          item={editing === "new" ? null : editing}
          onClose={() => setEditing(null)}
          onSaved={async () => {
            setEditing(null);
            await refresh();
            router.refresh();
          }}
        />
      )}
    </div>
  );
}

function TestimonialEditor({
  item,
  onClose,
  onSaved,
}: {
  item: Testimonial | null;
  onClose: () => void;
  onSaved: () => void;
}) {
  const [form, setForm] = React.useState({
    quoteEn: item?.quoteEn ?? "",
    quoteId: item?.quoteId ?? "",
    nameEn: item?.nameEn ?? "",
    nameId: item?.nameId ?? "",
    locationEn: item?.locationEn ?? "",
    locationId: item?.locationId ?? "",
    published: item?.published ?? false,
    order: item?.order ?? 0,
  });
  const [saving, setSaving] = React.useState(false);

  function set<K extends keyof typeof form>(key: K, value: (typeof form)[K]) {
    setForm((p) => ({ ...p, [key]: value }));
  }

  async function save(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      const url = item ? `/api/admin/testimonials/${item.id}` : "/api/admin/testimonials";
      const method = item ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) throw new Error(data.error);
      toast.success(item ? "Testimonial updated" : "Testimonial created");
      onSaved();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Save failed");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-charcoal/50 p-4 backdrop-blur-sm sm:items-center">
      <div className="my-auto w-full max-w-2xl rounded-2xl border border-stone/70 bg-card shadow-2xl">
        <div className="flex items-center justify-between border-b border-stone/70 px-6 py-4">
          <h2 className="font-serif-display text-xl font-medium text-charcoal">
            {item ? "Edit Testimonial" : "Add Testimonial"}
          </h2>
          <button onClick={onClose} className="rounded-full p-1.5 text-muted-foreground hover:bg-sand hover:text-charcoal">
            <X className="size-4" />
          </button>
        </div>
        <form onSubmit={save} className="max-h-[70vh] space-y-4 overflow-y-auto p-6 slim-scroll">
          <Field label="Quote (English) *">
            <Textarea rows={4} value={form.quoteEn} onChange={(e) => set("quoteEn", e.target.value)} required />
          </Field>
          <Field label="Quote (Indonesian) *">
            <Textarea rows={4} value={form.quoteId} onChange={(e) => set("quoteId", e.target.value)} required />
          </Field>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Owner name (EN)">
              <Input value={form.nameEn} onChange={(e) => set("nameEn", e.target.value)} />
            </Field>
            <Field label="Owner name (ID)">
              <Input value={form.nameId} onChange={(e) => set("nameId", e.target.value)} />
            </Field>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Location (EN)">
              <Input value={form.locationEn} onChange={(e) => set("locationEn", e.target.value)} />
            </Field>
            <Field label="Location (ID)">
              <Input value={form.locationId} onChange={(e) => set("locationId", e.target.value)} />
            </Field>
          </div>
          <label className="flex items-center gap-2.5">
            <Checkbox checked={form.published} onCheckedChange={(c) => set("published", !!c)} />
            <span className="text-sm text-charcoal">Published (only publish verified testimonials with owner consent)</span>
          </label>
          <div className="flex justify-end gap-3 border-t border-stone/70 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
            <Button type="submit" disabled={saving} className="gap-2">
              {saving ? <Loader2 className="size-4 animate-spin" /> : null}
              {item ? "Save changes" : "Create"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <Label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
        {label}
      </Label>
      {children}
    </div>
  );
}
