import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as SonnerToaster } from "@/components/ui/sonner";
import { site } from "@/lib/site";

const SITE_URL = site.url;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "KAYANA Villa Management | Professional Villa Management in Bali",
    template: "%s | KAYANA Villa Management",
  },
  description:
    "KAYANA Villa Management provides professional villa management in Bali — reservations, revenue optimization, housekeeping, maintenance, guest services and transparent owner reporting. Your Property. Our Expertise.",
  keywords: [
    "Villa Management Bali",
    "Bali Villa Management",
    "Villa Management Company Bali",
    "Property Management Bali",
    "Villa Property Management Bali",
    "Villa Management Services Bali",
    "Airbnb Villa Management Bali",
    "Holiday Rental Management Bali",
    "Luxury Villa Management Bali",
    "Bali property management company",
  ],
  authors: [{ name: "KAYANA Villa Management" }],
  creator: "KAYANA Villa Management",
  publisher: "KAYANA Villa Management",
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: "KAYANA Villa Management",
    title: "KAYANA Villa Management | Professional Villa Management in Bali",
    description:
      "Professional villa management designed to maximize your property's performance while delivering exceptional guest experiences. Your Property. Our Expertise.",
    images: [
      {
        url: site.ogImage,
        width: 1200,
        height: 630,
        alt: "KAYANA Villa Management — Professional Villa Management in Bali",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "KAYANA Villa Management | Professional Villa Management in Bali",
    description:
      "Professional villa management designed to maximize your property's performance while delivering exceptional guest experiences.",
    images: [site.ogImage],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  category: "business",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f9f6f0" },
    { media: "(prefers-color-scheme: dark)", color: "#1c1a17" },
  ],
  width: "device-width",
  initialScale: 1,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": `${SITE_URL}#organization`,
  name: "KAYANA Villa Management",
  alternateName: "KAYANA",
  description:
    "Professional villa management company in Bali offering end-to-end villa management services including reservations, revenue management, housekeeping, maintenance, guest experience and owner reporting.",
  url: SITE_URL,
  telephone: site.whatsappDisplay,
  email: site.email,
  areaServed: {
    "@type": "AdministrativeArea",
    name: "Bali, Indonesia",
  },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Bali",
    addressCountry: "ID",
  },
  slogan: "Your Property. Our Expertise.",
  knowsAbout: [
    "Villa Management",
    "Property Management",
    "Revenue Management",
    "Hospitality Operations",
    "Airbnb Management",
    "Booking.com Management",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Google Fonts — loaded via link for reliability across environments */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Inter:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased bg-background text-foreground font-sans">
        {children}
        <Toaster />
        <SonnerToaster />
      </body>
    </html>
  );
}
