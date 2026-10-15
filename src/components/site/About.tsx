"use client";

import Image from "next/image";
import { Check } from "lucide-react";
import { Reveal } from "./Reveal";
import { CTA } from "./CTA";
import { SectionHeading } from "./SectionHeading";
import { useLanguage } from "./LanguageProvider";

const ABOUT_IMG =
  "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/d300f48a4e6f.jpg";

export function About() {
  const { t, lang } = useLanguage();
  return (
    <section id="about" className="scroll-mt-24 bg-ivory py-20 sm:py-28 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Image */}
          <Reveal className="order-1">
            <div className="relative">
              <div className="relative aspect-[4/5] overflow-hidden rounded-[1.5rem] sm:aspect-[5/4] lg:aspect-[4/5]">
                <Image
                  src={ABOUT_IMG}
                  alt={
                    lang === "id"
                      ? "Eksterior villa kontemporer Bali dengan kolam, dikelola KAYANA"
                      : "Contemporary Bali villa exterior with pool, professionally managed by KAYANA"
                  }
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover transition-transform duration-[1.2s] hover:scale-105"
                />
              </div>
              {/* Floating stat card */}
              <div className="absolute -bottom-6 -right-2 hidden w-56 rounded-2xl border border-stone/70 bg-card/95 p-5 shadow-[0_24px_60px_-30px_rgba(28,26,23,0.5)] backdrop-blur sm:block lg:-right-8">
                <p className="font-serif-display text-3xl font-medium text-tropical">
                  {t.about.statLabel}
                </p>
                <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                  {t.about.statText}
                </p>
              </div>
              {/* Decorative frame */}
              <div className="pointer-events-none absolute -left-3 -top-3 -z-10 hidden h-24 w-24 rounded-tl-[1.5rem] border-l-2 border-t-2 border-bronze/40 sm:block lg:-left-6 lg:-top-6" />
            </div>
          </Reveal>

          {/* Text */}
          <div className="order-2 flex flex-col gap-6">
            <SectionHeading
              align="left"
              eyebrow={t.about.eyebrow}
              title={t.about.title}
            />

            <Reveal delay={120}>
              <div className="space-y-4 text-base leading-relaxed text-muted-foreground">
                <p>{t.about.p1}</p>
                <p>{t.about.p2}</p>
                <p className="font-serif-display text-lg text-charcoal">
                  {t.about.p3}
                </p>
              </div>
            </Reveal>

            <Reveal delay={200}>
              <ul className="grid grid-cols-1 gap-x-6 gap-y-2.5 sm:grid-cols-2">
                {t.about.pillars.map((p) => (
                  <li key={p} className="flex items-center gap-2.5 text-sm text-charcoal">
                    <span className="inline-flex size-5 items-center justify-center rounded-full bg-tropical/12 text-tropical">
                      <Check className="size-3" aria-hidden />
                    </span>
                    {p}
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={260}>
              <CTA href="#services" variant="outline">
                {t.about.cta}
              </CTA>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
