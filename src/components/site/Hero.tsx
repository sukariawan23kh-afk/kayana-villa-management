"use client";

import Image from "next/image";
import { ArrowDown, PhoneCall } from "lucide-react";
import { CTA } from "./CTA";
import { useLanguage } from "./LanguageProvider";

const HERO_IMG =
  "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/1d6e7e566ac4.jpg";

export function Hero() {
  const { t, lang } = useLanguage();
  return (
    <section
      id="home"
      className="relative flex min-h-[100svh] items-center overflow-hidden"
    >
      {/* Background image */}
      <div className="absolute inset-0 -z-10">
        <Image
          src={HERO_IMG}
          alt={
            lang === "id"
          ? "Villa mewah di Bali dengan kolam infinity saat sunset, dikelola secara profesional oleh KAYANA Villa Management"
              : "Luxury Bali villa with infinity pool at sunset, professionally managed by KAYANA Villa Management"
          }
          fill
          priority
          sizes="100vw"
          className="object-cover animate-slow-zoom"
        />
        {/* Cinematic gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal/55 via-charcoal/35 to-charcoal/85" />
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal/60 via-transparent to-transparent" />
      </div>

      <div className="mx-auto w-full max-w-7xl px-5 pb-24 pt-32 sm:px-8 sm:pt-36 lg:pb-28 lg:pt-40">
        <div className="max-w-3xl">
          {/* Trust eyebrow */}
          <div className="reveal is-visible flex items-center gap-3">
            <span className="h-px w-10 bg-bronze-light/70" aria-hidden />
            <span className="text-[0.7rem] font-medium uppercase tracking-[0.32em] text-bronze-light sm:text-xs">
              {t.hero.eyebrow}
            </span>
          </div>

          <h1 className="mt-6 font-serif-display text-[2.7rem] font-medium leading-[1.04] tracking-tight text-ivory text-balance sm:text-6xl lg:text-7xl">
            {t.hero.title1}
            <br />
            <span className="text-bronze-light">{t.hero.title2}</span>
          </h1>

          <p className="mt-6 max-w-xl text-pretty text-base leading-relaxed text-ivory/85 sm:text-lg lg:text-xl">
            {t.hero.subtitle}
          </p>

          <p className="mt-4 max-w-xl text-pretty text-sm leading-relaxed text-ivory/65 sm:text-base">
            {t.hero.supporting}
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            <CTA href="#contact" variant="light">
              {t.hero.ctaPrimary}
            </CTA>
            <CTA
              href="#services"
              variant="outline"
              withArrow={false}
              className="border-ivory/35 bg-transparent text-ivory hover:border-ivory hover:bg-ivory hover:text-charcoal"
            >
              {t.hero.ctaSecondary}
            </CTA>
          </div>

          {/* Quick contact reassurance */}
          <div className="mt-10 flex items-center gap-2 text-xs text-ivory/60">
            <PhoneCall className="size-3.5" aria-hidden />
            <span>{t.hero.trustNote}</span>
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <a
        href="#about"
        aria-label={t.hero.scroll}
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-ivory/60 transition-colors hover:text-ivory sm:flex"
      >
        <span className="text-[0.6rem] font-medium uppercase tracking-[0.3em]">
          {t.hero.scroll}
        </span>
        <span className="flex h-9 w-5 items-start justify-center rounded-full border border-ivory/40 p-1">
          <ArrowDown className="size-3 animate-bounce" />
        </span>
      </a>
    </section>
  );
}
