"use client";

import { Quote } from "lucide-react";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";
import { useLanguage } from "./LanguageProvider";
import { useCmsContent } from "@/lib/cms-hooks";

export function Testimonials() {
  const { t, lang } = useLanguage();
  const cms = useCmsContent();
  const isId = lang === "id";

  // Use published CMS testimonials if available; otherwise show placeholder cards.
  const items =
    cms?.testimonials && cms.testimonials.length > 0
      ? cms.testimonials.map((it) => ({
          quote: isId ? it.quoteId || it.quoteEn : it.quoteEn,
          name: isId ? it.nameId || it.nameEn : it.nameEn,
          location: isId ? it.locationId || it.locationEn : it.locationEn,
        }))
      : t.testimonials.items;

  return (
    <section className="relative bg-charcoal py-20 text-ivory sm:py-28 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          light
          eyebrow={t.testimonials.eyebrow}
          title={t.testimonials.title}
          description={t.testimonials.description}
        />

        <div className="mt-14 grid gap-5 lg:mt-16 lg:grid-cols-3">
          {items.slice(0, 6).map((item, i) => (
            <Reveal key={i} delay={i * 100} className="h-full">
              <figure className="flex h-full flex-col rounded-[1.5rem] border border-ivory/12 bg-ivory/[0.04] p-7 backdrop-blur-sm transition-colors duration-400 hover:border-ivory/25 sm:p-8">
                <Quote className="size-7 text-bronze-light/60" aria-hidden />
                <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-ivory/75">
                  {item.quote}
                </blockquote>
                <figcaption className="mt-6 border-t border-ivory/12 pt-4">
                  <p className="font-serif-display text-base font-medium text-ivory">
                    {item.name}
                  </p>
                  <p className="text-xs text-ivory/55">{item.location}</p>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>

        <Reveal delay={120} className="mt-8">
          <p className="text-center text-xs italic leading-relaxed text-ivory/45">
            {t.testimonials.note}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
