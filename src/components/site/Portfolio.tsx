"use client";

import * as React from "react";
import { BedDouble, MapPin, CalendarCheck } from "lucide-react";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";
import { CTA } from "./CTA";
import { useLanguage } from "./LanguageProvider";
import { useCmsContent } from "@/lib/cms-hooks";
import { BookingModal } from "./BookingModal";
import { VillaCarousel } from "./VillaCarousel";

interface PortfolioVilla {
  id: string;
  name: string;
  location: string;
  type: string;
  bedrooms: number;
  image: string;
  images: string[];
  description: string;
  pricePerNight: number | null;
  currency: string;
  maxGuests: number;
}

export function Portfolio() {
  const { t, lang } = useLanguage();
  const cms = useCmsContent();
  const [bookingVilla, setBookingVilla] = React.useState<PortfolioVilla | null>(null);

  // Use CMS villas if available; otherwise fall back to translated defaults.
  const allVillas: PortfolioVilla[] = (cms?.villas?.length
    ? cms.villas.map((v) => ({
        id: v.id,
        name: v.name,
        location: v.location,
        type: v.type,
        bedrooms: v.bedrooms,
        image: v.image,
        images: v.images?.map((img) => img.url).filter(Boolean) ?? [],
        description: lang === "id" ? v.descriptionId || v.descriptionEn : v.descriptionEn,
        pricePerNight: v.pricePerNight ?? null,
        currency: v.currency || "USD",
        maxGuests: v.maxGuests || 6,
      }))
    : t.portfolio.villas.map((v, i) => ({
        id: `default-${i}`,
        name: v.name,
        location: v.location,
        type: v.type,
        bedrooms: v.bedrooms,
        image: v.image,
        images: [],
        description: v.description,
        pricePerNight: null,
        currency: "USD",
        maxGuests: 6,
      }))
  );
  const villas = allVillas.filter((v) => v.image).slice(0, 6);

  const isId = lang === "id";

  return (
    <section
      id="portfolio"
      className="scroll-mt-24 bg-ivory py-20 sm:py-28 lg:py-32"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            align="left"
            eyebrow={t.portfolio.eyebrow}
            title={t.portfolio.title}
            description={t.portfolio.description}
          />
          <Reveal delay={120} className="hidden sm:block">
            <CTA href="#contact" variant="outline" withArrow={false}>
              {t.portfolio.listCta}
            </CTA>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3 lg:gap-6">
          {villas.map((villa, i) => (
            <Reveal key={`${villa.name}-${i}`} delay={(i % 3) * 90}>
              <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-stone/70 bg-card transition-all duration-500 hover:border-charcoal/20 hover:shadow-[0_30px_70px_-44px_rgba(28,26,23,0.55)]">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <VillaCarousel
                    images={[villa.image, ...villa.images]}
                    alt={`${villa.name} — ${villa.type} ${isId ? "di" : "in"} ${villa.location}`}
                  />
                  <span className="absolute left-4 top-4 z-20 rounded-full border border-ivory/30 bg-ivory/15 px-3 py-1 text-[0.65rem] font-medium uppercase tracking-[0.15em] text-ivory backdrop-blur-md">
                    {villa.type}
                  </span>
                  {/* Price badge */}
                  {villa.pricePerNight != null && (
                    <span className="absolute right-4 top-4 rounded-full bg-ivory/95 px-3 py-1 text-xs font-semibold text-charcoal shadow-sm backdrop-blur">
                      ${villa.pricePerNight}
                      <span className="ml-0.5 text-[0.6rem] font-normal text-muted-foreground">
                        {isId ? "/mlm" : "/nt"}
                      </span>
                    </span>
                  )}
                </div>

                <div className="flex flex-1 flex-col p-5 sm:p-6">
                  <div className="flex items-center justify-between gap-2 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1.5">
                      <MapPin className="size-3.5 text-tropical" aria-hidden />
                      {villa.location}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <BedDouble className="size-3.5 text-tropical" aria-hidden />
                      {villa.bedrooms}{" "}
                      {isId ? "kamar" : "Bedroom"}{villa.bedrooms > 1 && !isId ? "s" : ""}
                    </span>
                  </div>

                  <h3 className="mt-3 font-serif-display text-xl font-medium text-charcoal sm:text-2xl">
                    {villa.name}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                    {villa.description}
                  </p>

                  {/* Book Now button */}
                  <button
                    type="button"
                    onClick={() => setBookingVilla(villa)}
                    className="mt-5 inline-flex h-11 items-center justify-center gap-2 rounded-full bg-tropical text-sm font-medium text-white transition-all hover:bg-tropical-deep"
                  >
                    <CalendarCheck className="size-4" />
                    {t.booking.bookNow}
                  </button>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={120} className="mt-8">
          <p className="text-center text-xs italic leading-relaxed text-muted-foreground/80">
            {t.portfolio.note}
          </p>
        </Reveal>
      </div>

      {bookingVilla && (
        <BookingModal
          villa={bookingVilla}
          open={true}
          onClose={() => setBookingVilla(null)}
        />
      )}
    </section>
  );
}
