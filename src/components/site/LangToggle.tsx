"use client";

import * as React from "react";
import { Check, ChevronDown, Globe } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { useLanguage } from "./LanguageProvider";
import { cn } from "@/lib/utils";
import { LANGUAGES } from "@/lib/i18n";

interface LangToggleProps {
  /** Render in "light" mode (for dark backgrounds). */
  light?: boolean;
  className?: string;
  /** Hide the native name and show only the short code (compact navbar). */
  compact?: boolean;
}

/**
 * Dropdown language selector — scales to any number of languages.
 * Reads the language list from `LANGUAGES` in src/lib/i18n.ts.
 */
export function LangToggle({ light = false, className, compact = true }: LangToggleProps) {
  const { lang, setLang } = useLanguage();
  const current = LANGUAGES.find((l) => l.code === lang) ?? LANGUAGES[0];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          aria-label={`Language: ${current.english}`}
          className={cn(
            "inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors",
            light
              ? "border-ivory/25 bg-ivory/10 text-ivory backdrop-blur hover:bg-ivory/20"
              : "border-charcoal/15 bg-sand/60 text-charcoal hover:border-charcoal/30",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
            className
          )}
        >
          <Globe className="size-3.5" aria-hidden />
          <span className={cn(compact && "max-w-[5rem] truncate")}>
            {compact ? current.short : current.native}
          </span>
          <ChevronDown className="size-3 opacity-60" aria-hidden />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="min-w-[11rem] bg-card border-stone/70 shadow-lg"
      >
        {LANGUAGES.map((opt) => {
          const active = opt.code === lang;
          return (
            <DropdownMenuItem
              key={opt.code}
              onSelect={() => setLang(opt.code)}
              className={cn(
                "flex cursor-pointer items-center justify-between gap-3 px-3 py-2 text-sm",
                active ? "text-tropical" : "text-charcoal"
              )}
            >
              <span className="flex flex-col">
                <span className="font-medium">{opt.native}</span>
                <span className="text-[0.65rem] text-muted-foreground">{opt.english}</span>
              </span>
              {active && <Check className="size-4 text-tropical" aria-hidden />}
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
