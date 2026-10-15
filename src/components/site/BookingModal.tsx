"use client";

import * as React from "react";
import Image from "next/image";
import { X, Calendar as CalIcon, Users, Loader2, CheckCircle2, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useLanguage } from "./LanguageProvider";
import { cn } from "@/lib/utils";

interface BookingVilla {
  id: string;
  name: string;
  location: string;
  image: string;
  pricePerNight: number | null;
  currency: string;
  maxGuests: number;
}

interface BookingModalProps {
  villa: BookingVilla;
  open: boolean;
  onClose: () => void;
}

function todayStr() {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return d.toISOString().slice(0, 10);
}
function addDaysStr(base: string, days: number) {
  const d = new Date(base + "T12:00:00");
  d.setDate(d.getDate() + days);
  return d.toISOString().slice(0, 10);
}
function nightsBetween(checkIn: string, checkOut: string) {
  if (!checkIn || !checkOut) return 0;
  const a = new Date(checkIn + "T12:00:00").getTime();
  const b = new Date(checkOut + "T12:00:00").getTime();
  if (b <= a) return 0;
  return Math.round((b - a) / (1000 * 60 * 60 * 24));
}

export function BookingModal({ villa, open, onClose }: BookingModalProps) {
  const { t } = useLanguage();
  const today = todayStr();
  const [checkIn, setCheckIn] = React.useState(addDaysStr(today, 1));
  const [checkOut, setCheckOut] = React.useState(addDaysStr(today, 3));
  const [guests, setGuests] = React.useState(2);
  const [guestName, setGuestName] = React.useState("");
  const [guestEmail, setGuestEmail] = React.useState("");
  const [guestPhone, setGuestPhone] = React.useState("");
  const [notes, setNotes] = React.useState("");
  const [availability, setAvailability] = React.useState<null | "checking" | "available" | "unavailable">(null);
  const [submitting, setSubmitting] = React.useState(false);
  const [success, setSuccess] = React.useState<null | { ref: string; nights: number; total: number | null; currency: string }>(null);

  const nights = nightsBetween(checkIn, checkOut);
  const total = villa.pricePerNight ? villa.pricePerNight * nights : null;

  // Check availability when dates change (debounced).
  React.useEffect(() => {
    if (!open || !checkIn || !checkOut || nights <= 0) {
      setAvailability(null);
      return;
    }
    let active = true;
    setAvailability("checking");
    const id = setTimeout(async () => {
      try {
        const res = await fetch(
          `/api/public/availability?villaId=${villa.id}&checkIn=${checkIn}&checkOut=${checkOut}`
        );
        const data = await res.json();
        if (!active) return;
        setAvailability(data.ok && data.available ? "available" : "unavailable");
      } catch {
        if (active) setAvailability(null);
      }
    }, 350);
    return () => {
      active = false;
      clearTimeout(id);
    };
  }, [open, checkIn, checkOut, villa.id, nights]);

  // Lock body scroll while open.
  React.useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "";
      };
    }
  }, [open]);

  // Reset success state when reopening for a different villa.
  React.useEffect(() => {
    if (open) setSuccess(null);
  }, [open, villa.id]);

  if (!open) return null;

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (nights <= 0) {
      toast.error(t.booking.errDates);
      return;
    }
    if (guests > villa.maxGuests) {
      toast.error(t.booking.errGuests);
      return;
    }
    if (availability === "unavailable") {
      toast.error(t.booking.errConflict);
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch("/api/reservations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          villaId: villa.id,
          guestName,
          guestEmail,
          guestPhone,
          checkIn,
          checkOut,
          guests,
          notes: notes || undefined,
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        const msg = data.error || t.booking.errGeneric;
        toast.error(msg);
        if (res.status === 409) setAvailability("unavailable");
        return;
      }
      setSuccess({
        ref: data.reservation.id.slice(-8).toUpperCase(),
        nights: data.summary.nights,
        total: data.summary.totalAmount,
        currency: data.summary.currency,
      });
      toast.success(t.booking.successTitle);
    } catch {
      toast.error(t.booking.errGeneric);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-charcoal/55 p-3 backdrop-blur-sm sm:items-center sm:p-6"
      onClick={onClose}
    >
      <div
        className="my-auto w-full max-w-2xl overflow-hidden rounded-2xl border border-stone/70 bg-card shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with villa image */}
        <div className="relative h-36 sm:h-44">
          {villa.image ? (
            <Image
              src={villa.image}
              alt={villa.name}
              fill
              sizes="(max-width: 640px) 100vw, 640px"
              className="object-cover"
            />
          ) : null}
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/40 to-transparent" />
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="absolute right-3 top-3 inline-flex size-9 items-center justify-center rounded-full bg-ivory/90 text-charcoal transition-colors hover:bg-ivory"
          >
            <X className="size-5" />
          </button>
          <div className="absolute bottom-3 left-4 right-12">
            <h2 className="font-serif-display text-xl font-medium text-ivory sm:text-2xl">
              {villa.name}
            </h2>
            <p className="text-xs text-ivory/75">{villa.location}</p>
          </div>
        </div>

        {success ? (
          <SuccessPanel
            t={t}
            villa={villa}
            success={success}
            onClose={onClose}
            onAnother={() => setSuccess(null)}
          />
        ) : (
          <form onSubmit={onSubmit} className="max-h-[70vh] overflow-y-auto p-5 slim-scroll sm:p-6">
            {/* Price + capacity strip */}
            <div className="mb-5 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-stone/70 bg-sand/40 p-3.5">
              <div>
                <p className="text-[0.65rem] uppercase tracking-wider text-muted-foreground">
                  {t.booking.pricePerNight}
                </p>
                <p className="font-serif-display text-xl font-medium text-charcoal">
                  {villa.pricePerNight
                    ? `$${villa.pricePerNight} ${villa.currency}`
                    : t.booking.requestPrice}
                  <span className="text-xs font-normal text-muted-foreground">
                    {" "}
                    {t.booking.perNight}
                  </span>
                </p>
              </div>
              <div className="text-right">
                <p className="text-[0.65rem] uppercase tracking-wider text-muted-foreground">
                  {t.booking.maxGuests}
                </p>
                <p className="flex items-center gap-1 text-sm font-medium text-charcoal">
                  <Users className="size-4 text-tropical" />
                  {villa.maxGuests}
                </p>
              </div>
            </div>

            {/* Dates */}
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label={t.booking.checkIn}>
                <div className="relative">
                  <CalIcon className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-tropical" />
                  <Input
                    type="date"
                    value={checkIn}
                    min={today}
                    onChange={(e) => {
                      setCheckIn(e.target.value);
                      if (e.target.value && checkOut <= e.target.value) {
                        setCheckOut(addDaysStr(e.target.value, 2));
                      }
                    }}
                    required
                    className="pl-9"
                  />
                </div>
              </Field>
              <Field label={t.booking.checkOut}>
                <div className="relative">
                  <CalIcon className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-tropical" />
                  <Input
                    type="date"
                    value={checkOut}
                    min={checkIn ? addDaysStr(checkIn, 1) : today}
                    onChange={(e) => setCheckOut(e.target.value)}
                    required
                    className="pl-9"
                  />
                </div>
              </Field>
            </div>

            {/* Availability + price summary */}
            <div className="mt-3 flex flex-wrap items-center justify-between gap-3 rounded-xl bg-sand/30 p-3.5 text-sm">
              <div className="flex items-center gap-2">
                {availability === "checking" && (
                  <span className="flex items-center gap-1.5 text-muted-foreground">
                    <Loader2 className="size-4 animate-spin" />
                    {t.booking.availabilityChecking}
                  </span>
                )}
                {availability === "available" && (
                  <span className="flex items-center gap-1.5 text-tropical">
                    <CheckCircle2 className="size-4" />
                    {t.booking.availabilityAvailable}
                  </span>
                )}
                {availability === "unavailable" && (
                  <span className="flex items-center gap-1.5 text-red-600">
                    <X className="size-4" />
                    {t.booking.availabilityUnavailable}
                  </span>
                )}
              </div>
              <div className="text-right">
                {nights > 0 && total != null ? (
                  <span className="text-charcoal">
                    {nights} {t.booking.nights} ·{" "}
                    <span className="font-medium">
                      ${total.toLocaleString()} {villa.currency}
                    </span>
                  </span>
                ) : nights > 0 && total == null ? (
                  <span className="text-muted-foreground">{t.booking.summaryNote}</span>
                ) : null}
              </div>
            </div>

            {/* Guests */}
            <div className="mt-4">
              <Field label={t.booking.guestsField}>
                <div className="flex items-center gap-2">
                  <Users className="size-4 text-tropical" />
                  <Input
                    type="number"
                    min={1}
                    max={villa.maxGuests}
                    value={guests}
                    onChange={(e) => setGuests(Number(e.target.value) || 1)}
                    required
                    className="w-24"
                  />
                  <span className="text-xs text-muted-foreground">
                    {t.booking.maxGuests}: {villa.maxGuests}
                  </span>
                </div>
              </Field>
            </div>

            {/* Guest details */}
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <Field label={t.booking.guestName}>
                <Input
                  value={guestName}
                  onChange={(e) => setGuestName(e.target.value)}
                  required
                  autoComplete="name"
                />
              </Field>
              <Field label={t.booking.guestPhone}>
                <Input
                  value={guestPhone}
                  onChange={(e) => setGuestPhone(e.target.value)}
                  required
                  type="tel"
                  placeholder="+62 812 ..."
                />
              </Field>
            </div>
            <div className="mt-4">
              <Field label={t.booking.guestEmail}>
                <Input
                  value={guestEmail}
                  onChange={(e) => setGuestEmail(e.target.value)}
                  required
                  type="email"
                  autoComplete="email"
                />
              </Field>
            </div>
            <div className="mt-4">
              <Field label={t.booking.notes}>
                <Textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder={t.booking.notesPlaceholder}
                />
              </Field>
            </div>

            <p className="mt-3 text-xs italic text-muted-foreground/80">
              {t.booking.summaryNote}
            </p>

            <button
              type="submit"
              disabled={submitting || availability === "unavailable" || nights <= 0}
              className="mt-5 flex h-12 w-full items-center justify-center gap-2 rounded-full bg-tropical text-sm font-medium text-white shadow-[0_14px_36px_-14px_rgba(42,107,82,0.7)] transition-all hover:bg-tropical-deep disabled:cursor-not-allowed disabled:opacity-60"
            >
              {submitting ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  {t.booking.submitting}
                </>
              ) : (
                <>
                  <Sparkles className="size-4" />
                  {t.booking.submit}
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

function SuccessPanel({
  t,
  villa,
  success,
  onClose,
  onAnother,
}: {
  t: any;
  villa: BookingVilla;
  success: { ref: string; nights: number; total: number | null; currency: string };
  onClose: () => void;
  onAnother: () => void;
}) {
  return (
    <div className="flex flex-col items-center gap-4 p-7 text-center sm:p-9">
      <span className="inline-flex size-16 items-center justify-center rounded-full bg-tropical/12 text-tropical">
        <CheckCircle2 className="size-8" />
      </span>
      <h3 className="font-serif-display text-2xl font-medium text-charcoal">
        {t.booking.successTitle}
      </h3>
      <p className="max-w-md text-sm leading-relaxed text-muted-foreground">
        {t.booking.successBody}
      </p>
      <div className="w-full max-w-xs rounded-xl border border-stone/70 bg-sand/30 p-4 text-left text-sm">
        <div className="flex justify-between py-1">
          <span className="text-muted-foreground">{t.booking.successRef}</span>
          <span className="font-medium text-charcoal">#{success.ref}</span>
        </div>
        <div className="flex justify-between py-1">
          <span className="text-muted-foreground">{t.booking.successNights}</span>
          <span className="font-medium text-charcoal">{success.nights}</span>
        </div>
        {success.total != null && (
          <div className="flex justify-between py-1">
            <span className="text-muted-foreground">{t.booking.successTotal}</span>
            <span className="font-medium text-charcoal">
              ${success.total.toLocaleString()} {success.currency}
            </span>
          </div>
        )}
        <div className="flex justify-between border-t border-stone/70 pt-1.5">
          <span className="text-muted-foreground">{villa.name}</span>
        </div>
      </div>
      <div className="mt-2 flex gap-3">
        <button
          type="button"
          onClick={onAnother}
          className="inline-flex h-11 items-center justify-center rounded-full border border-charcoal/25 px-5 text-sm font-medium text-charcoal transition-colors hover:bg-charcoal hover:text-ivory"
        >
          {t.booking.successAnother}
        </button>
        <button
          type="button"
          onClick={onClose}
          className="inline-flex h-11 items-center justify-center rounded-full bg-tropical px-5 text-sm font-medium text-white transition-colors hover:bg-tropical-deep"
        >
          OK
        </button>
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
