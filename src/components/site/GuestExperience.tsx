"use client";

import Image from "next/image";
import { KeyRound, Sparkles, MessageSquare, LifeBuoy, Wrench, HeartHandshake } from "lucide-react";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";
import { CTA } from "./CTA";
import { useLanguage } from "./LanguageProvider";

const GUEST_IMG =
  "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/e1cda6caa8f0.jpg";

const ICONS = [KeyRound, Sparkles, MessageSquare, LifeBuoy, Wrench, HeartHandshake];

export function GuestExperience() {
  const { t, lang } = useLanguage();
  return (
    <section
      id="guests"
      className="scroll-mt-24 bg-gradient-to-b from-sand/40 to-ivory py-20 sm:py-28 lg:py-32"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Image */}
          <Reveal>
            <div className="relative">
              <div className="relative aspect-[5/4] overflow-hidden rounded-[1.5rem]">
                <Image
                  src={GUEST_IMG}
                  alt={
                    lang === "id"
                      ? "Paviliun luar villa tropis tempat KAYANA memberikan pengalaman tamu yang dikelola dengan baik"
                      : "Tropical villa outdoor living pavilion where KAYANA delivers a carefully managed guest experience"
                  }
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover transition-transform duration-[1.2s] hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/35 to-transparent" />
              </div>
              <div className="pointer-events-none absolute -right-3 -bottom-3 -z-10 hidden h-24 w-24 rounded-br-[1.5rem] border-b-2 border-r-2 border-bronze/40 sm:block lg:-right-6 lg:-bottom-6" />
            </div>
          </Reveal>

          {/* Content */}
          <div className="flex flex-col gap-6">
            <SectionHeading
              align="left"
              eyebrow={t.guests.eyebrow}
              title={t.guests.title}
              description={t.guests.description}
            />

            <div className="grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2">
              {t.guests.points.map((g, i) => {
                const Icon = ICONS[i] ?? KeyRound;
                return (
                  <Reveal key={i} delay={i * 60}>
                    <div className="flex gap-3">
                      <span className="inline-flex size-10 flex-shrink-0 items-center justify-center rounded-xl border border-bronze/30 bg-sand/70 text-tropical">
                        <Icon className="size-5" aria-hidden />
                      </span>
                      <div>
                        <h3 className="font-serif-display text-base font-medium text-charcoal">
                          {g.title}
                        </h3>
                        <p className="mt-0.5 text-sm leading-relaxed text-muted-foreground">
                          {g.text}
                        </p>
                      </div>
                    </div>
                  </Reveal>
                );
              })}
            </div>

            <Reveal delay={120}>
              <CTA href="#portfolio" variant="solid">
                {t.guests.cta}
              </CTA>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
