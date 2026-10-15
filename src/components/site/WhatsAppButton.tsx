"use client";

import * as React from "react";
import { MessageCircle, X } from "lucide-react";
import { site, whatsappLink } from "@/lib/site";
import { cn } from "@/lib/utils";
import { useLanguage } from "./LanguageProvider";
import { useLiveSettings } from "@/lib/cms-hooks";

export function WhatsAppButton() {
  const { t } = useLanguage();
  const live = useLiveSettings();
  const [open, setOpen] = React.useState(false);
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const waNumber = live?.whatsappNumber ?? site.whatsappNumber;

  return (
    <div
      className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-3 sm:bottom-7 sm:right-7"
      aria-live="polite"
    >
      {/* Expandable label card */}
      {mounted && open && (
        <div className="animate-in fade-in slide-in-from-bottom-3 duration-300 max-w-[17rem]">
          <div className="rounded-2xl border border-stone/80 bg-card/95 p-4 shadow-[0_20px_50px_-20px_rgba(28,26,23,0.45)] backdrop-blur">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="font-serif-display text-base font-medium text-charcoal">
                  {t.whatsapp.cardTitle}
                </p>
                <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                  {t.whatsapp.cardDesc}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label={t.whatsapp.closeCard}
                className="rounded-full p-1 text-muted-foreground transition-colors hover:bg-sand hover:text-charcoal"
              >
                <X className="size-4" />
              </button>
            </div>
            <a
              href={whatsappLink(t.whatsapp.prefillMessage, waNumber)}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 flex w-full items-center justify-center gap-2 rounded-full bg-tropical px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-tropical-deep"
            >
              <MessageCircle className="size-4" />
              {t.whatsapp.startChat}
            </a>
          </div>
        </div>
      )}

      {/* Floating button */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={t.whatsapp.ariaLabel}
        className={cn(
          "group relative flex size-14 items-center justify-center rounded-full bg-tropical text-white shadow-[0_12px_32px_-10px_rgba(42,107,82,0.7)] transition-all duration-300 hover:bg-tropical-deep sm:size-[3.75rem]",
          !open && "wa-pulse"
        )}
      >
        {open ? (
          <X className="size-6" />
        ) : (
          <svg
            viewBox="0 0 32 32"
            fill="currentColor"
            aria-hidden
            className="size-7"
          >
            <path d="M16.04 4C9.96 4 5.02 8.94 5.02 15.02c0 2.12.56 4.1 1.54 5.82L4 28l7.34-1.92a11 11 0 0 0 4.7 1.06h.01c6.08 0 11.02-4.94 11.02-11.02C27.07 8.94 22.12 4 16.04 4zm6.46 15.62c-.27.76-1.6 1.46-2.2 1.5-.58.04-1.12.28-3.78-.78-3.18-1.26-5.18-4.52-5.34-4.74-.16-.22-1.28-1.7-1.28-3.24 0-1.54.8-2.3 1.08-2.62.28-.32.62-.4.82-.4l.6.01c.19.01.46-.07.72.55.27.64.92 2.2 1 2.36.08.16.13.34.02.56-.1.22-.16.34-.32.52-.16.18-.34.4-.48.54-.16.16-.33.34-.14.66.19.32.84 1.38 1.8 2.24 1.24 1.1 2.28 1.45 2.6 1.6.32.16.5.13.68-.08.18-.21.78-.92.99-1.24.21-.32.42-.27.7-.16.28.11 1.78.84 2.08.99.3.16.5.24.58.37.08.13.08.74-.19 1.5z" />
          </svg>
        )}
      </button>
    </div>
  );
}
