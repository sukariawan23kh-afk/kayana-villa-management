"use client";

import Image from "next/image";
import { Check } from "lucide-react";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";
import { CTA } from "./CTA";
import { useLanguage } from "./LanguageProvider";

const OWNER_IMG =
  "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/c50da3dfbf69.jpg";

export function OwnerSection() {
  const { t, lang } = useLanguage();
  return (
    <section
      id="owners"
      className="relative scroll-mt-24 overflow-hidden bg-charcoal py-20 text-ivory sm:py-28 lg:py-32"
    >
      {/* Background image with overlay */}
      <div className="absolute inset-0 -z-10">
        <Image
          src={OWNER_IMG}
          alt={
            lang === "id"
              ? "Ruang tamu villa elegan di Bali, merepresentasikan gaya hidup yang KAYANA bantu jaga"
              : "Elegant Bali villa living room, representing the lifestyle KAYANA helps owners preserve"
          }
          fill
          sizes="100vw"
          className="object-cover opacity-25"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal via-charcoal/85 to-charcoal/55" />
      </div>

      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="flex flex-col gap-6">
            <SectionHeading
              light
              align="left"
              eyebrow={t.owners.eyebrow}
              title={
                <>
                  {t.owners.title1}
                  <br />
                  {t.owners.title2}
                </>
              }
            />

            <Reveal delay={120}>
              <div className="space-y-4 text-base leading-relaxed text-ivory/70">
                <p>{t.owners.p1}</p>
                <p>{t.owners.p2}</p>
              </div>
            </Reveal>

            <Reveal delay={200}>
              <ul className="grid grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-2">
                {t.owners.benefits.map((b) => (
                  <li key={b} className="flex items-center gap-3 text-sm text-ivory/90">
                    <span className="inline-flex size-6 flex-shrink-0 items-center justify-center rounded-full bg-tropical/25 text-bronze-light">
                      <Check className="size-3.5" aria-hidden />
                    </span>
                    {b}
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={260}>
              <CTA href="#contact" variant="light">
                {t.owners.cta}
              </CTA>
            </Reveal>
          </div>

          {/* Decorative quote panel */}
          <Reveal delay={120} className="hidden lg:block">
            <div className="relative ml-auto max-w-md rounded-[1.5rem] border border-ivory/12 bg-ivory/[0.04] p-8 backdrop-blur-sm">
              <span className="font-serif-display text-6xl leading-none text-bronze-light/40">
                &ldquo;
              </span>
              <p className="-mt-4 font-serif-display text-2xl font-medium leading-snug text-ivory">
                {t.owners.quote}
              </p>
              <div className="mt-6 flex items-center gap-3 border-t border-ivory/12 pt-5">
                <span className="inline-flex size-10 items-center justify-center rounded-full bg-tropical/25 text-bronze-light">
                  <Check className="size-4" aria-hidden />
                </span>
                <div>
                  <p className="text-sm font-medium text-ivory">{t.owners.quoteBy}</p>
                  <p className="text-xs text-ivory/55">{t.owners.quoteSub}</p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
