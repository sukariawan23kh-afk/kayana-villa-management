"use client";

import * as React from "react";

export interface LiveSettings {
  whatsappNumber: string;
  whatsappDisplay: string;
  email: string;
  location: string;
  instagram: string;
  facebook: string;
  linkedin: string;
}

interface CmsContent {
  villas: Array<{
    id: string;
    name: string;
    location: string;
    bedrooms: number;
    type: string;
    descriptionEn: string;
    descriptionId: string;
    image: string;
    order: number;
    pricePerNight: number | null;
    currency: string;
    maxGuests: number;
    images: Array<{ id: string; url: string; order: number }>;
  }>;
  faqs: Array<{
    id: string;
    questionEn: string;
    questionId: string;
    answerEn: string;
    answerId: string;
    order: number;
  }>;
  testimonials: Array<{
    id: string;
    quoteEn: string;
    quoteId: string;
    nameEn: string;
    nameId: string;
    locationEn: string;
    locationId: string;
    order: number;
  }>;
}

/** Fetch live site settings from the public API (no auth). */
export function useLiveSettings(): LiveSettings | null {
  const [settings, setSettings] = React.useState<LiveSettings | null>(null);
  React.useEffect(() => {
    let active = true;
    fetch("/api/public/settings")
      .then((r) => r.json())
      .then((data) => {
        if (active && data.ok && data.setting) {
          setSettings({
            whatsappNumber: data.setting.whatsappNumber,
            whatsappDisplay: data.setting.whatsappDisplay,
            email: data.setting.email,
            location: data.setting.location,
            instagram: data.setting.instagram,
            facebook: data.setting.facebook,
            linkedin: data.setting.linkedin,
          });
        }
      })
      .catch(() => {});
    return () => {
      active = false;
    };
  }, []);
  return settings;
}

/** Fetch published CMS content (villas, faqs, testimonials). */
export function useCmsContent(): CmsContent | null {
  const [content, setContent] = React.useState<CmsContent | null>(null);
  React.useEffect(() => {
    let active = true;
    fetch("/api/public/content")
      .then((r) => r.json())
      .then((data) => {
        if (active && data.ok) {
          setContent(data);
        }
      })
      .catch(() => {});
    return () => {
      active = false;
    };
  }, []);
  return content;
}
