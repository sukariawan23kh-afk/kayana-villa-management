"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Reveal } from "./Reveal";
import { whatsappLink } from "@/lib/site";
import { useLanguage } from "./LanguageProvider";
import { useLiveSettings } from "@/lib/cms-hooks";

const FINAL_IMG =
  "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/533c3520eb9c.jpg";

export function FinalCTA() {
  const { t, lang } = useLanguage();
  const live = useLiveSettings();
  const waNumber = live?.whatsappNumber ?? "6281234567890";
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <Image
          src={FINAL_IMG}
          alt={
            lang === "id"
              ? "Villa Bali saat sunset — properti Anda layak mendapat manajemen profesional oleh KAYANA"
              : "Bali villa at sunset — your property deserves professional management by KAYANA"
          }
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-charcoal/75" />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/40 to-charcoal/60" />
      </div>

      <div className="mx-auto max-w-3xl px-5 py-24 text-center sm:px-8 sm:py-32 lg:py-40">
        <Reveal>
          <span className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.3em] text-bronze-light">
            <span className="h-px w-8 bg-bronze-light/60" aria-hidden />
            {t.finalCta.eyebrow}
            <span className="h-px w-8 bg-bronze-light/60" aria-hidden />
          </span>
        </Reveal>
        <Reveal delay={80}>
          <h2 className="mt-6 font-serif-display text-3xl font-medium leading-[1.1] text-ivory text-balance sm:text-5xl lg:text-6xl">
            {t.finalCta.title}
          </h2>
        </Reveal>
        <Reveal delay={160}>
          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-ivory/70 sm:text-lg">
            {t.finalCta.desc}
          </p>
        </Reveal>
        <Reveal delay={240}>
          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href="#contact"
              className="group inline-flex h-12 items-center justify-center gap-2 rounded-full bg-ivory px-7 text-sm font-medium text-charcoal transition-all hover:bg-bronze-light"
            >
              {t.finalCta.primaryCta}
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href={whatsappLink(t.whatsapp.prefillMessage, waNumber)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-ivory/35 px-7 text-sm font-medium text-ivory transition-colors hover:border-ivory hover:bg-ivory/10"
            >
              {t.finalCta.whatsappCta}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
