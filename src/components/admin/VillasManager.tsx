"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Plus, Pencil, Trash2, X, Loader2, GripVertical, Star, Upload, ChevronUp, ChevronDown } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

interface Villa {
  id: string;
  name: string;
  location: string;
  bedrooms: number;
  type: string;
  descriptionEn: string;
  descriptionId: string;
  image: string;
  order: number;
  published: boolean;
  pricePerNight: number | null;
  currency: string;
  maxGuests: number;
  images?: Array<{ id: string; url: string; order: number }>;
}

export function VillasManager({ initialVillas }: { initialVillas: Villa[] }) {
  const router = useRouter();
  const [villas, setVillas] = React.useState(initialVillas);
  const [editing, setEditing] = React.useState<Villa | "new" | null>(null);
  const [busy, setBusy] = React.useState(false);

  async function refresh() {
    const res = await fetch("/api/admin/villas");
    const data = await res.json();
    if (data.ok) setVillas(data.villas);
  }

  async function togglePublished(v: Villa) {
    setBusy(true);
    try {
      const res = await fetch(`/api/admin/villas/${v.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ published: !v.published }),
      });
      if (!res.ok) throw new Error();
      await refresh();
      toast.success(v.published ? "Unpublished" : "Published");
    } catch {
      toast.error("Failed");
    } finally {
      setBusy(false);
    }
  }

  async function remove(v: Villa) {
    if (!confirm(`Delete "${v.name}"?`)) return;
    setBusy(true);
    try {
      const res = await fetch(`/api/admin/villas/${v.id}`, { method: "DELETE" });
      if (!res.ok) throw new Error();
      await refresh();
      toast.success("Villa deleted");
      router.refresh();
    } catch {
      toast.error("Failed to delete");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-tropical">
            Portfolio
          </p>
          <h1 className="mt-1 font-serif-display text-3xl font-medium text-charcoal">
            Managed Villas
          </h1>
          <p className="mt-1.5 text-sm text-muted-foreground">
            Add, edit and publish the villas shown on the public website.
          </p>
        </div>
        <Button onClick={() => setEditing("new")} className="gap-2">
          <Plus className="size-4" /> Add Villa
        </Button>
      </header>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {villas.map((v) => (
          <div
            key={v.id}
            className="group overflow-hidden rounded-2xl border border-stone/70 bg-card"
          >
            <div className="relative aspect-[4/3] overflow-hidden bg-sand">
              {v.image ? (
                 
                <img src={v.image} alt={v.name} className="h-full w-full object-cover" />
              ) : (
                <div className="flex h-full items-center justify-center text-xs text-muted-foreground">No image</div>
              )}
              {!v.published && (
                <span className="absolute left-2 top-2 rounded-full bg-charcoal/80 px-2 py-0.5 text-[0.6rem] font-medium uppercase text-ivory">
                  Draft
                </span>
              )}
            </div>
            <div className="p-4">
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <h3 className="truncate font-serif-display text-lg font-medium text-charcoal">
                    {v.name}
                  </h3>
                  <p className="truncate text-xs text-muted-foreground">
                    {v.location} · {v.bedrooms} beds · {v.type}
                  </p>
                </div>
                <span className="flex-shrink-0 text-xs text-muted-foreground">#{v.order}</span>
              </div>
              <div className="mt-3 flex items-center gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setEditing(v)}
                  className="gap-1.5"
                >
                  <Pencil className="size-3.5" /> Edit
                </Button>
                <button
                  onClick={() => togglePublished(v)}
                  disabled={busy}
                  className="inline-flex items-center gap-1.5 rounded-md border border-stone/70 px-2.5 py-1.5 text-xs font-medium text-muted-foreground hover:border-charcoal/30 hover:text-charcoal"
                >
                  <Star className={`size-3.5 ${v.published ? "fill-bronze text-bronze" : ""}`} />
                  {v.published ? "Live" : "Hidden"}
                </button>
                <button
                  onClick={() => remove(v)}
                  disabled={busy}
                  aria-label="Delete"
                  className="ml-auto inline-flex size-8 items-center justify-center rounded-md border border-stone/70 text-muted-foreground hover:border-red-300 hover:bg-red-50 hover:text-red-600"
                >
                  <Trash2 className="size-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {editing && (
        <VillaEditor
          villa={editing === "new" ? null : editing}
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

function VillaEditor({
  villa,
  onClose,
  onSaved,
}: {
  villa: Villa | null;
  onClose: () => void;
  onSaved: () => void;
}) {
  const [form, setForm] = React.useState({
    name: villa?.name ?? "",
    location: villa?.location ?? "",
    bedrooms: villa?.bedrooms ?? 3,
    type: villa?.type ?? "Private Pool Villa",
    descriptionEn: villa?.descriptionEn ?? "",
    descriptionId: villa?.descriptionId ?? "",
    image: villa?.image ?? "",
    order: villa?.order ?? 0,
    published: villa?.published ?? true,
    pricePerNight: villa?.pricePerNight ?? null,
    currency: villa?.currency ?? "USD",
    maxGuests: villa?.maxGuests ?? 6,
  });
  // Gallery images: array of URL strings (separate from the cover `image` field).
  const [galleryImages, setGalleryImages] = React.useState<string[]>(
    villa?.images?.map((img) => img.url) ?? []
  );
  const [uploading, setUploading] = React.useState(false);
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const [saving, setSaving] = React.useState(false);

  function set<K extends keyof typeof form>(key: K, value: (typeof form)[K]) {
    setForm((p) => ({ ...p, [key]: value }));
  }

  function addImageUrl() {
    setGalleryImages((prev) => [...prev, ""]);
  }

  function updateImageUrl(index: number, url: string) {
    setGalleryImages((prev) => prev.map((u, i) => (i === index ? url : u)));
  }

  function removeImage(index: number) {
    setGalleryImages((prev) => prev.filter((_, i) => i !== index));
  }

  function moveImage(index: number, dir: -1 | 1) {
    setGalleryImages((prev) => {
      const next = [...prev];
      const target = index + dir;
      if (target < 0 || target >= next.length) return prev;
      [next[index], next[target]] = [next[target], next[index]];
      return next;
    });
  }

  function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 4 * 1024 * 1024) {
      toast.error("Image too large (max 4MB). Use a smaller image or paste a URL.");
      e.target.value = "";
      return;
    }
    setUploading(true);
    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result as string;
      setGalleryImages((prev) => [...prev, dataUrl]);
      setUploading(false);
      toast.success("Image added to gallery");
      if (fileInputRef.current) fileInputRef.current.value = "";
    };
    reader.onerror = () => {
      setUploading(false);
      toast.error("Failed to read image file");
    };
    reader.readAsDataURL(file);
  }

  async function save(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      const url = villa ? `/api/admin/villas/${villa.id}` : "/api/admin/villas";
      const method = villa ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, images: galleryImages.filter((u) => u.trim()) }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) throw new Error(data.error || "Save failed");
      toast.success(villa ? "Villa updated" : "Villa created");
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
            {villa ? "Edit Villa" : "Add Villa"}
          </h2>
          <button onClick={onClose} className="rounded-full p-1.5 text-muted-foreground hover:bg-sand hover:text-charcoal">
            <X className="size-4" />
          </button>
        </div>
        <form onSubmit={save} className="max-h-[70vh] space-y-4 overflow-y-auto p-6 slim-scroll">
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Name *">
              <Input value={form.name} onChange={(e) => set("name", e.target.value)} required />
            </Field>
            <Field label="Location *">
              <Input value={form.location} onChange={(e) => set("location", e.target.value)} required placeholder="e.g. Canggu, Bali" />
            </Field>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            <Field label="Bedrooms">
              <Input type="number" min={0} value={form.bedrooms} onChange={(e) => set("bedrooms", Number(e.target.value))} />
            </Field>
            <Field label="Type">
              <Input value={form.type} onChange={(e) => set("type", e.target.value)} />
            </Field>
            <Field label="Order">
              <Input type="number" value={form.order} onChange={(e) => set("order", Number(e.target.value))} />
            </Field>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            <Field label="Price per night" hint="Leave empty = price on request">
              <Input
                type="number"
                min={0}
                step="any"
                value={form.pricePerNight ?? ""}
                onChange={(e) => set("pricePerNight", e.target.value === "" ? null : Number(e.target.value))}
                placeholder="e.g. 450"
              />
            </Field>
            <Field label="Currency">
              <Input value={form.currency} onChange={(e) => set("currency", e.target.value)} placeholder="USD" />
            </Field>
            <Field label="Max guests">
              <Input type="number" min={1} value={form.maxGuests} onChange={(e) => set("maxGuests", Number(e.target.value))} />
            </Field>
          </div>
          <Field label="Cover Image URL *" hint="Main image shown in card & booking modal">
            <Input value={form.image} onChange={(e) => set("image", e.target.value)} required placeholder="https://..." />
            {form.image && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={form.image} alt="preview" className="mt-2 h-32 w-full rounded-lg object-cover" />
            )}
          </Field>

          {/* Gallery Images (slideshow) */}
          <div className="rounded-xl border border-stone/70 p-4">
            <div className="mb-3 flex items-center justify-between">
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Gallery Images
                </p>
                <p className="text-[0.7rem] text-muted-foreground/70">
                  Additional photos for the villa slideshow (cover image is shown first automatically).
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={uploading}
                  className="inline-flex items-center gap-1.5 rounded-md bg-tropical px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-tropical-deep disabled:opacity-50"
                >
                  <Upload className="size-3.5" />
                  {uploading ? "Uploading..." : "Upload"}
                </button>
                <button
                  type="button"
                  onClick={addImageUrl}
                  className="inline-flex items-center gap-1.5 rounded-md border border-stone/70 px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:border-charcoal/30 hover:text-charcoal"
                >
                  <Plus className="size-3.5" />
                  Add URL
                </button>
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
              />
            </div>
            {galleryImages.length === 0 ? (
              <p className="py-4 text-center text-xs text-muted-foreground/60">
                No gallery images yet. Upload or paste URLs above.
              </p>
            ) : (
              <div className="flex flex-col gap-2">
                {galleryImages.map((url, i) => (
                  <div key={i} className="flex items-center gap-2 rounded-lg border border-stone/60 p-2">
                    <div className="flex flex-col gap-0.5">
                      <button
                        type="button"
                        onClick={() => moveImage(i, -1)}
                        disabled={i === 0}
                        className="rounded p-0.5 text-muted-foreground hover:text-charcoal disabled:opacity-30"
                        aria-label="Move up"
                      >
                        <ChevronUp className="size-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => moveImage(i, 1)}
                        disabled={i === galleryImages.length - 1}
                        className="rounded p-0.5 text-muted-foreground hover:text-charcoal disabled:opacity-30"
                        aria-label="Move down"
                      >
                        <ChevronDown className="size-3.5" />
                      </button>
                    </div>
                    {url ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={url} alt={`gallery ${i + 1}`} className="h-12 w-16 flex-shrink-0 rounded object-cover" />
                    ) : (
                      <div className="flex h-12 w-16 flex-shrink-0 items-center justify-center rounded bg-sand text-[0.6rem] text-muted-foreground">No img</div>
                    )}
                    <Input
                      value={url}
                      onChange={(e) => updateImageUrl(i, e.target.value)}
                      placeholder="https://... or data URL from upload"
                      className="h-9 flex-1 text-xs"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(i)}
                      className="inline-flex size-7 flex-shrink-0 items-center justify-center rounded-md border border-stone/70 text-muted-foreground transition-colors hover:border-red-300 hover:bg-red-50 hover:text-red-600"
                      aria-label="Remove image"
                    >
                      <Trash2 className="size-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Description (English)">
              <Textarea rows={3} value={form.descriptionEn} onChange={(e) => set("descriptionEn", e.target.value)} />
            </Field>
            <Field label="Description (Indonesian)">
              <Textarea rows={3} value={form.descriptionId} onChange={(e) => set("descriptionId", e.target.value)} />
            </Field>
          </div>
          <label className="flex items-center gap-2.5">
            <Checkbox checked={form.published} onCheckedChange={(c) => set("published", !!c)} />
            <span className="text-sm text-charcoal">Published (visible on website)</span>
          </label>
          <div className="flex justify-end gap-3 border-t border-stone/70 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
            <Button type="submit" disabled={saving} className="gap-2">
              {saving ? <Loader2 className="size-4 animate-spin" /> : null}
              {villa ? "Save changes" : "Create villa"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

function Field({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
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
