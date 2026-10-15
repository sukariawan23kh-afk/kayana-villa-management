/**
 * Central site configuration.
 * All contact details, social links and global settings live here so a
 * future admin dashboard / CMS can manage them without touching components.
 */
export const site = {
  name: "KAYANA",
  fullName: "KAYANA Villa Management",
  tagline: "Professional Villa Management in Bali",
  positioning: "Your Property. Our Expertise.",
  shortDescription:
    "Professional villa management designed to maximize your property's performance while delivering exceptional guest experiences.",

  // Public URL used for canonical / OG metadata
  url: "https://kayana-villa-management.com",
  ogImage:
    "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/1d6e7e566ac4.jpg",

  location: "Bali, Indonesia",

  // Contact channels — replace with real numbers when available.
  // Loaded from environment variable when present, falls back to placeholder.
  whatsappNumber: process.env.KAYANA_WHATSAPP ?? "6281234567890",
  whatsappDisplay: process.env.KAYANA_WHATSAPP_DISPLAY ?? "+62 812 3456 7890",
  email: process.env.KAYANA_EMAIL ?? "hello@kayanavilla.com",

  social: {
    instagram: "https://instagram.com",
    facebook: "https://facebook.com",
    linkedin: "https://linkedin.com",
  },

  // Pre-filled WhatsApp message for the floating button & CTAs
  whatsappPrefillMessage:
    "Hello KAYANA Villa Management, I would like to discuss professional management for my villa in Bali.",
} as const;

/** Build a wa.me link with a pre-filled, URL-encoded message. */
export function whatsappLink(
  message: string = site.whatsappPrefillMessage,
  number: string = site.whatsappNumber
) {
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

/** Primary navigation anchors (single-page site). */
export const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "How We Work", href: "#process" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "For Owners", href: "#owners" },
  { label: "Insights", href: "#insights" },
] as const;
