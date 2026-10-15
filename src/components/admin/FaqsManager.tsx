"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Plus, Pencil, Trash2, X, Loader2, ChevronUp, ChevronDown } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

interface Faq {
  id: string;
  questionEn: string;
  questionId: string;
  answerEn: string;
  answerId: string;
  order: number;
  published: boolean;
}

export function FaqsManager({ initialFaqs }: { initialFaqs: Faq[] }) {
  const router = useRouter();
  const [faqs, setFaqs] = React.useState(initialFaqs);
  const [editing, setEditing] = React.useState<Faq | "new" | null>(null);
  const [busy, setBusy] = React.useState(false);

  async function refresh() {
    const res = await fetch("/api/admin/faqs");
    const data = await res.json();
    if (data.ok) setFaqs(data.faqs);
  }

  async function move(f: Faq, dir: -1 | 1) {
    const sorted = [...faqs].sort((a, b) => a.order - b.order);
    const idx = sorted.findIndex((x) => x.id === f.id);
    const swap = sorted[idx + dir];
    if (!swap) return;
    setBusy(true);
    try {
      await Promise.all([
        fetch(`/api/admin/faqs/${f.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ order: swap.order }),
        }),
        fetch(`/api/admin/faqs/${swap.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ order: f.order }),
        }),
      ]);
      await refresh();
      router.refresh();
    } finally {
      setBusy(false);
    }
  }

  async function togglePublished(f: Faq) {
    setBusy(true);
    try {
      await fetch(`/api/admin/faqs/${f.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ published: !f.published }),
      });
      await refresh();
      router.refresh();
    } finally {
      setBusy(false);
    }
  }

  async function remove(f: Faq) {
    if (!confirm("Delete this FAQ?")) return;
    setBusy(true);
    try {
      await fetch(`/api/admin/faqs/${f.id}`, { method: "DELETE" });
      await refresh();
      toast.success("FAQ deleted");
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
            FAQ Management
          </h1>
          <p className="mt-1.5 text-sm text-muted-foreground">
            Bilingual questions &amp; answers shown in the FAQ section.
          </p>
        </div>
        <Button onClick={() => setEditing("new")} className="gap-2">
          <Plus className="size-4" /> Add FAQ
        </Button>
      </header>

      <ul className="flex flex-col gap-3">
        {faqs.map((f, i) => (
          <li key={f.id} className="rounded-2xl border border-stone/70 bg-card p-5">
            <div className="flex items-start gap-3">
              <div className="flex flex-col">
                <button
                  onClick={() => move(f, -1)}
                  disabled={busy || i === 0}
                  className="rounded p-0.5 text-muted-foreground hover:text-charcoal disabled:opacity-30"
                  aria-label="Move up"
                >
                  <ChevronUp className="size-4" />
                </button>
                <button
                  onClick={() => move(f, 1)}
                  disabled={busy || i === faqs.length - 1}
                  className="rounded p-0.5 text-muted-foreground hover:text-charcoal disabled:opacity-30"
                  aria-label="Move down"
                >
                  <ChevronDown className="size-4" />
                </button>
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-sans text-xs font-medium text-bronze">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="font-serif-display text-base font-medium text-charcoal">
                    {f.questionEn}
                  </h3>
                  {!f.published && (
                    <span className="rounded-full bg-sand px-2 py-0.5 text-[0.6rem] font-medium uppercase text-muted-foreground">
                      Draft
                    </span>
                  )}
                </div>
                <p className="mt-1 text-xs text-tropical/80">ID: {f.questionId}</p>
                <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
                  {f.answerEn}
                </p>
              </div>
              <div className="flex flex-shrink-0 flex-col gap-1.5">
                <Button size="sm" variant="outline" onClick={() => setEditing(f)} className="gap-1.5">
                  <Pencil className="size-3.5" /> Edit
                </Button>
                <div className="flex gap-1.5">
                  <button
                    onClick={() => togglePublished(f)}
                    disabled={busy}
                    className="flex-1 rounded-md border border-stone/70 px-2 py-1 text-xs text-muted-foreground hover:border-charcoal/30 hover:text-charcoal"
                  >
                    {f.published ? "Hide" : "Show"}
                  </button>
                  <button
                    onClick={() => remove(f)}
                    disabled={busy}
                    aria-label="Delete"
                    className="inline-flex size-7 items-center justify-center rounded-md border border-stone/70 text-muted-foreground hover:border-red-300 hover:bg-red-50 hover:text-red-600"
                  >
                    <Trash2 className="size-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>

      {editing && (
        <FaqEditor
          faq={editing === "new" ? null : editing}
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

function FaqEditor({
  faq,
  onClose,
  onSaved,
}: {
  faq: Faq | null;
  onClose: () => void;
  onSaved: () => void;
}) {
  const [form, setForm] = React.useState({
    questionEn: faq?.questionEn ?? "",
    questionId: faq?.questionId ?? "",
    answerEn: faq?.answerEn ?? "",
    answerId: faq?.answerId ?? "",
    published: faq?.published ?? true,
  });
  const [saving, setSaving] = React.useState(false);

  function set<K extends keyof typeof form>(key: K, value: (typeof form)[K]) {
    setForm((p) => ({ ...p, [key]: value }));
  }

  async function save(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      const url = faq ? `/api/admin/faqs/${faq.id}` : "/api/admin/faqs";
      const method = faq ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) throw new Error(data.error);
      toast.success(faq ? "FAQ updated" : "FAQ created");
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
            {faq ? "Edit FAQ" : "Add FAQ"}
          </h2>
          <button onClick={onClose} className="rounded-full p-1.5 text-muted-foreground hover:bg-sand hover:text-charcoal">
            <X className="size-4" />
          </button>
        </div>
        <form onSubmit={save} className="max-h-[70vh] space-y-4 overflow-y-auto p-6 slim-scroll">
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Question (English) *">
              <Input value={form.questionEn} onChange={(e) => set("questionEn", e.target.value)} required />
            </Field>
            <Field label="Question (Indonesian) *">
              <Input value={form.questionId} onChange={(e) => set("questionId", e.target.value)} required />
            </Field>
          </div>
          <Field label="Answer (English) *">
            <Textarea rows={4} value={form.answerEn} onChange={(e) => set("answerEn", e.target.value)} required />
          </Field>
          <Field label="Answer (Indonesian) *">
            <Textarea rows={4} value={form.answerId} onChange={(e) => set("answerId", e.target.value)} required />
          </Field>
          <label className="flex items-center gap-2.5">
            <Checkbox checked={form.published} onCheckedChange={(c) => set("published", !!c)} />
            <span className="text-sm text-charcoal">Published</span>
          </label>
          <div className="flex justify-end gap-3 border-t border-stone/70 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
            <Button type="submit" disabled={saving} className="gap-2">
              {saving ? <Loader2 className="size-4 animate-spin" /> : null}
              {faq ? "Save changes" : "Create FAQ"}
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
