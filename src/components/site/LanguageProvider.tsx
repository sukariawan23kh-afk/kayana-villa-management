"use client";

import * as React from "react";
import { translations, defaultLang, LANGUAGES, type Lang, type Translation } from "@/lib/i18n";

interface LanguageContextValue {
  lang: Lang;
  /** Full translation object — missing keys fall back to English automatically. */
  t: Translation;
  setLang: (lang: Lang) => void;
}

const LanguageContext = React.createContext<LanguageContextValue | null>(null);

const STORAGE_KEY = "kayana-lang";

/** All supported language codes, derived from the metadata. */
const VALID_LANGS = new Set<Lang>(LANGUAGES.map((l) => l.code));

function getInitialLang(): Lang {
  if (typeof window === "undefined") return defaultLang;
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY) as Lang | null;
    if (stored && VALID_LANGS.has(stored)) return stored;
    // Optional: auto-detect from browser language.
    const nav = navigator.language?.slice(0, 2).toLowerCase();
    if (nav && VALID_LANGS.has(nav as Lang)) return nav as Lang;
  } catch {
    /* ignore */
  }
  return defaultLang;
}

/**
 * Deep-merge a (partial) translation over the English base so every key
 * always resolves. Arrays are replaced if the overlay provides them,
 * otherwise the English array is kept.
 */
function mergeTranslations(overlay: Partial<Translation> | undefined): Translation {
  const base = translations.en as Translation;
  if (!overlay) return base;
  const out: any = Array.isArray(base) ? [...base] : { ...base };
  for (const key of Object.keys(overlay) as (keyof Translation)[]) {
    const baseVal = (base as any)[key];
    const overlayVal = (overlay as any)[key];
    if (overlayVal === undefined) continue;
    if (
      baseVal &&
      typeof baseVal === "object" &&
      !Array.isArray(baseVal) &&
      overlayVal &&
      typeof overlayVal === "object" &&
      !Array.isArray(overlayVal)
    ) {
      out[key] = { ...baseVal, ...overlayVal };
    } else {
      out[key] = overlayVal;
    }
  }
  return out as Translation;
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  // Start with defaultLang to avoid hydration mismatch; sync to localStorage in effect.
  const [lang, setLangState] = React.useState<Lang>(defaultLang);

  // Hydrate from localStorage / browser language after mount.
  React.useEffect(() => {
    const initial = getInitialLang();
    setLangState(initial);
  }, []);

  const setLang = React.useCallback((next: Lang) => {
    setLangState(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* ignore */
    }
    if (typeof document !== "undefined") {
      document.documentElement.lang = next;
    }
  }, []);

  // Merge the selected language over the English base so partial translations
  // always have a full object to read from.
  const t = React.useMemo<Translation>(
    () => mergeTranslations(translations[lang] as Partial<Translation> | undefined),
    [lang]
  );

  const value = React.useMemo<LanguageContextValue>(
    () => ({ lang, t, setLang }),
    [lang, t, setLang]
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = React.useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return ctx;
}
