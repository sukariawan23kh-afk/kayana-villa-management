"use client";

import * as React from "react";
import { toast } from "sonner";
import { Mail, MapPin, MessageCircle, Send, CheckCircle2, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { site, whatsappLink } from "@/lib/site";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";
import { useLanguage } from "./LanguageProvider";
import { useLiveSettings } from "@/lib/cms-hooks";
import { cn } from "@/lib/utils";

export function Contact() {
  const { t, lang } = useLanguage();
  const live = useLiveSettings();
  const email = live?.email ?? site.email;
  const waNumber = live?.whatsappNumber ?? site.whatsappNumber;
  const waDisplay = live?.whatsappDisplay ?? site.whatsappDisplay;
  const [submitting, setSubmitting] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const [channels, setChannels] = React.useState<string[]>([]);

  function toggleChannel(value: string) {
    setChannels((prev) =>
      prev.includes(value) ? prev.filter((c) => c !== value) : [...prev, value]
    );
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    const form = e.currentTarget;
    const formData = new FormData(form);
    const payload = {
      fullName: String(formData.get("fullName") || ""),
      whatsappNumber: String(formData.get("whatsappNumber") || ""),
      email: String(formData.get("email") || ""),
      villaName: String(formData.get("villaName") || ""),
      villaLocation: String(formData.get("villaLocation") || ""),
      bedrooms: String(formData.get("bedrooms") || ""),
      propertyStatus: String(formData.get("propertyStatus") || ""),
      bookingChannels: channels,
      managementState: String(formData.get("managementState") || ""),
      objective: String(formData.get("objective") || ""),
      message: String(formData.get("message") || ""),
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        throw new Error(data.error || "Submission failed");
      }
      setSuccess(true);
      form.reset();
      setChannels([]);
      toast.success(t.contact.toastSuccess, { description: t.contact.toastSuccessDesc });
    } catch (err) {
      toast.error(t.contact.toastError, {
        description:
          err instanceof Error ? err.message : t.contact.toastErrorDesc,
      });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section
      id="contact"
      className="scroll-mt-24 bg-gradient-to-b from-sand/50 to-ivory py-20 sm:py-28 lg:py-32"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow={t.contact.eyebrow}
          title={t.contact.title}
          description={t.contact.description}
        />

        <div className="mt-14 grid gap-8 lg:mt-16 lg:grid-cols-[0.85fr_1.4fr] lg:gap-10">
          {/* Contact info */}
          <Reveal className="flex flex-col gap-4">
            <div className="flex flex-col gap-5 rounded-[1.5rem] border border-stone/70 bg-card p-7 sm:p-8">
              <h3 className="font-serif-display text-xl font-medium text-charcoal">
                {t.contact.talkTitle}
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {t.contact.talkDesc}
              </p>

              <ul className="flex flex-col gap-4">
                <li>
                  <a
                    href={whatsappLink(t.whatsapp.prefillMessage, waNumber)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-4 rounded-xl border border-stone/70 p-4 transition-colors hover:border-tropical/40 hover:bg-sand/60"
                  >
                    <span className="inline-flex size-11 items-center justify-center rounded-full bg-tropical/12 text-tropical">
                      <MessageCircle className="size-5" aria-hidden />
                    </span>
                    <span>
                      <span className="block text-xs uppercase tracking-wider text-muted-foreground">
                        {t.contact.whatsapp}
                      </span>
                      <span className="font-medium text-charcoal group-hover:text-tropical">
                        {waDisplay}
                      </span>
                    </span>
                  </a>
                </li>
                <li>
                  <a
                    href={`mailto:${email}`}
                    className="group flex items-center gap-4 rounded-xl border border-stone/70 p-4 transition-colors hover:border-tropical/40 hover:bg-sand/60"
                  >
                    <span className="inline-flex size-11 items-center justify-center rounded-full bg-tropical/12 text-tropical">
                      <Mail className="size-5" aria-hidden />
                    </span>
                    <span>
                      <span className="block text-xs uppercase tracking-wider text-muted-foreground">
                        {t.contact.email}
                      </span>
                      <span className="font-medium text-charcoal group-hover:text-tropical">
                        {email}
                      </span>
                    </span>
                  </a>
                </li>
                <li className="flex items-center gap-4 rounded-xl border border-stone/70 p-4">
                  <span className="inline-flex size-11 items-center justify-center rounded-full bg-tropical/12 text-tropical">
                    <MapPin className="size-5" aria-hidden />
                  </span>
                  <span>
                    <span className="block text-xs uppercase tracking-wider text-muted-foreground">
                      {t.contact.location}
                    </span>
                    <span className="font-medium text-charcoal">{live?.location ?? site.location}</span>
                  </span>
                </li>
              </ul>
            </div>

            {/* Mobile WhatsApp CTA */}
            <a
              href={whatsappLink(t.whatsapp.prefillMessage, waNumber)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-12 items-center justify-center gap-2 rounded-full bg-tropical text-sm font-medium text-white shadow-[0_14px_36px_-14px_rgba(42,107,82,0.7)] transition-colors hover:bg-tropical-deep lg:hidden"
            >
              <MessageCircle className="size-4" aria-hidden />
              {t.contact.mobileWhatsapp}
            </a>
          </Reveal>

          {/* Form */}
          <Reveal delay={100}>
            <div className="rounded-[1.5rem] border border-stone/70 bg-card p-6 shadow-[0_30px_80px_-60px_rgba(28,26,23,0.5)] sm:p-8 lg:p-10">
              {success ? (
                <div className="flex flex-col items-center justify-center gap-4 py-16 text-center">
                  <span className="inline-flex size-16 items-center justify-center rounded-full bg-tropical/12 text-tropical">
                    <CheckCircle2 className="size-8" aria-hidden />
                  </span>
                  <h3 className="font-serif-display text-2xl font-medium text-charcoal">
                    {t.contact.form.successTitle}
                  </h3>
                  <p className="max-w-md text-sm leading-relaxed text-muted-foreground">
                    {t.contact.form.successMsg}
                  </p>
                  <button
                    type="button"
                    onClick={() => setSuccess(false)}
                    className="mt-2 text-sm font-medium text-tropical hover:underline"
                  >
                    {t.contact.form.another}
                  </button>
                </div>
              ) : (
                <form onSubmit={onSubmit} className="flex flex-col gap-5">
                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field label={t.contact.form.fullName} required>
                      <Input name="fullName" required autoComplete="name" placeholder={t.contact.form.fullNamePh} />
                    </Field>
                    <Field label={t.contact.form.whatsappNumber} required>
                      <Input name="whatsappNumber" required type="tel" autoComplete="tel" placeholder={t.contact.form.whatsappPh} />
                    </Field>
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field label={t.contact.form.email} required>
                      <Input name="email" required type="email" autoComplete="email" placeholder={t.contact.form.emailPh} />
                    </Field>
                    <Field label={t.contact.form.villaName}>
                      <Input name="villaName" placeholder={t.contact.form.villaNamePh} />
                    </Field>
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field label={t.contact.form.villaLocation}>
                      <Input name="villaLocation" placeholder={t.contact.form.villaLocationPh} />
                    </Field>
                    <Field label={t.contact.form.bedrooms}>
                      <Select name="bedrooms">
                        <SelectTrigger className="h-11 w-full bg-background">
                          <SelectValue placeholder={t.contact.form.select} />
                        </SelectTrigger>
                        <SelectContent>
                          {t.contact.bedroomOptions.map((o) => (
                            <SelectItem key={o} value={o}>
                              {o} {t.contact.form.bedroomSuffix}{o !== "1" && (lang === "id" ? "" : "s")}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </Field>
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field label={t.contact.form.propertyStatus}>
                      <Select name="propertyStatus">
                        <SelectTrigger className="h-11 w-full bg-background">
                          <SelectValue placeholder={t.contact.form.select} />
                        </SelectTrigger>
                        <SelectContent>
                          {t.contact.statusOptions.map((o) => (
                            <SelectItem key={o} value={o}>
                              {o}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </Field>
                    <Field label={t.contact.form.managementState}>
                      <Select name="managementState">
                        <SelectTrigger className="h-11 w-full bg-background">
                          <SelectValue placeholder={t.contact.form.select} />
                        </SelectTrigger>
                        <SelectContent>
                          {t.contact.managementOptions.map((o) => (
                            <SelectItem key={o} value={o}>
                              {o}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </Field>
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field label={t.contact.form.objective}>
                      <Select name="objective">
                        <SelectTrigger className="h-11 w-full bg-background">
                          <SelectValue placeholder={t.contact.form.select} />
                        </SelectTrigger>
                        <SelectContent>
                          {t.contact.objectiveOptions.map((o) => (
                            <SelectItem key={o} value={o}>
                              {o}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </Field>
                  </div>

                  {/* Booking channels (multi) */}
                  <Field label={t.contact.form.channels}>
                    <div className="flex flex-wrap gap-2">
                      {t.contact.channelOptions.map((c) => {
                        const checked = channels.includes(c);
                        return (
                          <label
                            key={c}
                            className={cn(
                              "inline-flex cursor-pointer items-center gap-2 rounded-full border px-3.5 py-2 text-sm transition-colors",
                              checked
                                ? "border-tropical bg-tropical/10 text-tropical"
                                : "border-stone/80 text-muted-foreground hover:border-charcoal/30 hover:text-charcoal"
                            )}
                          >
                            <Checkbox
                              checked={checked}
                              onCheckedChange={() => toggleChannel(c)}
                              className="size-4"
                            />
                            {c}
                          </label>
                        );
                      })}
                    </div>
                  </Field>

                  <Field label={t.contact.form.message}>
                    <Textarea
                      name="message"
                      rows={4}
                      placeholder={t.contact.form.messagePh}
                    />
                  </Field>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="group inline-flex h-12 items-center justify-center gap-2 rounded-full bg-charcoal px-7 text-sm font-medium text-ivory shadow-[0_14px_36px_-14px_rgba(28,26,23,0.5)] transition-all hover:bg-tropical-deep disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="size-4 animate-spin" />
                        {t.contact.form.submitting}
                      </>
                    ) : (
                      <>
                        {t.contact.form.submit}
                        <Send className="size-4 transition-transform group-hover:translate-x-1" />
                      </>
                    )}
                  </button>

                  <p className="text-xs leading-relaxed text-muted-foreground/80">
                    {t.contact.form.privacyNote}
                  </p>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <Label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
        {label} {required && <span className="text-bronze">*</span>}
      </Label>
      {children}
    </div>
  );
}
