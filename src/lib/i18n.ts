/**
 * Bilingual content for KAYANA Villa Management.
 * Two languages: English (en) and Indonesian (id).
 *
 * All user-facing copy lives here so a future CMS / admin dashboard can
 * manage translations without touching components. Icons and purely
 * structural data (indices, image URLs, chart values) stay in content.ts.
 */

export type Lang = "en" | "id" | "zh" | "ja" | "ko" | "ru";

/**
 * Metadata for each supported language — drives the dropdown menu.
 * Add a new language here + provide a (partial) translation object below.
 */
export interface LanguageMeta {
  code: Lang;
  /** Short code shown as the trigger (e.g. "EN"). */
  short: string;
  /** Native name shown in the dropdown list (e.g. "Bahasa Indonesia"). */
  native: string;
  /** English label for accessibility (e.g. "English"). */
  english: string;
}

export const LANGUAGES: LanguageMeta[] = [
  { code: "en", short: "EN", native: "English", english: "English" },
  { code: "id", short: "ID", native: "Bahasa Indonesia", english: "Indonesian" },
  { code: "zh", short: "中文", native: "简体中文", english: "Chinese (Simplified)" },
  { code: "ja", short: "日本語", native: "日本語", english: "Japanese" },
  { code: "ko", short: "한국어", native: "한국어", english: "Korean" },
  { code: "ru", short: "RU", native: "Русский", english: "Russian" },
];

export interface Translation {
  nav: {
    home: string;
    about: string;
    services: string;
    howWeWork: string;
    portfolio: string;
    booking: string;
    forOwners: string;
    insights: string;
    requestConsultation: string;
    closeMenu: string;
    openMenu: string;
    whatsapp: string;
  };
  langToggle: Record<string, string>;
  booking: {
    /** Card / portfolio button label. */
    bookNow: string;
    pricePerNight: string;
    perNight: string;
    maxGuests: string;
    guestsLabel: string;
    /** Modal titles & labels. */
    modalTitle: string;
    modalSubtitle: string;
    checkIn: string;
    checkOut: string;
    nights: string;
    totalLabel: string;
    summaryNote: string;
    guestName: string;
    guestEmail: string;
    guestPhone: string;
    guestsField: string;
    notes: string;
    notesPlaceholder: string;
    submit: string;
    submitting: string;
    /** Validation messages. */
    errDates: string;
    errGuests: string;
    errConflict: string;
    errGeneric: string;
    /** Success state. */
    successTitle: string;
    successBody: string;
    successNights: string;
    successTotal: string;
    successRef: string;
    successAnother: string;
    availabilityChecking: string;
    availabilityAvailable: string;
    availabilityUnavailable: string;
    requestPrice: string;
  };
  chatbot: {
    /** Floating button aria label. */
    open: string;
    close: string;
    /** Panel title + subtitle. */
    title: string;
    subtitle: string;
    /** Input + send. */
    placeholder: string;
    send: string;
    /** Status. */
    online: string;
    offline: string;
    typing: string;
    /** Quick suggestions (chips). */
    suggestion1: string;
    suggestion2: string;
    suggestion3: string;
    suggestion4: string;
    /** Error fallback. */
    error: string;
  };
  hero: {
    eyebrow: string;
    title1: string;
    title2: string;
    subtitle: string;
    supporting: string;
    ctaPrimary: string;
    ctaSecondary: string;
    trustNote: string;
    scroll: string;
  };
  trust: { title: string; text: string }[];
  about: {
    eyebrow: string;
    title: string;
    p1: string;
    p2: string;
    p3: string;
    pillars: string[];
    cta: string;
    statLabel: string;
    statText: string;
  };
  services: {
    eyebrow: string;
    title1: string;
    title2: string;
    description: string;
    learnMore: string;
    showLess: string;
    items: { title: string; description: string; features: string[] }[];
  };
  process: {
    eyebrow: string;
    title: string;
    description: string;
    items: { title: string; text: string }[];
  };
  revenue: {
    eyebrow: string;
    title: string;
    description: string;
    kpis: { label: string; abbr?: string; text: string }[];
    dashboard: {
      label: string;
      title: string;
      revenueLabel: string;
      revenueSub: string;
      indexedRevenue: string;
      occupancyLabel: string;
      occupancySub: string;
      channelsLabel: string;
      channelsSub: string;
      channelsCount: string;
      illustrative: string;
      rollingView: string;
    };
    disclaimer: string;
  };
  owners: {
    eyebrow: string;
    title1: string;
    title2: string;
    p1: string;
    p2: string;
    benefits: string[];
    cta: string;
    quote: string;
    quoteBy: string;
    quoteSub: string;
  };
  packages: {
    eyebrow: string;
    title: string;
    description: string;
    recommended: string;
    cta: string;
    note: string;
    items: { name: string; tagline: string; description: string; features: string[] }[];
  };
  portfolio: {
    eyebrow: string;
    title: string;
    description: string;
    listCta: string;
    note: string;
    villas: { name: string; location: string; type: string; description: string }[];
  };
  guests: {
    eyebrow: string;
    title: string;
    description: string;
    points: { title: string; text: string }[];
    cta: string;
  };
  why: {
    eyebrow: string;
    title: string;
    description: string;
    items: { title: string; text: string }[];
  };
  testimonials: {
    eyebrow: string;
    title: string;
    description: string;
    items: { quote: string; name: string; location: string }[];
    note: string;
  };
  insights: {
    eyebrow: string;
    title: string;
    description: string;
    suggestCta: string;
    read: string;
    comingSoon: string;
    note: string;
    items: { category: string; title: string; excerpt: string; read: string }[];
  };
  faq: {
    eyebrow: string;
    title: string;
    description: string;
    askCta: string;
    items: { q: string; a: string }[];
  };
  contact: {
    eyebrow: string;
    title: string;
    description: string;
    talkTitle: string;
    talkDesc: string;
    whatsapp: string;
    email: string;
    location: string;
    mobileWhatsapp: string;
    form: {
      fullName: string;
      whatsappNumber: string;
      email: string;
      villaName: string;
      villaLocation: string;
      bedrooms: string;
      bedroomSuffix: string;
      propertyStatus: string;
      managementState: string;
      objective: string;
      channels: string;
      message: string;
      submit: string;
      submitting: string;
      privacyNote: string;
      successTitle: string;
      successMsg: string;
      another: string;
      fullNamePh: string;
      whatsappPh: string;
      emailPh: string;
      villaNamePh: string;
      villaLocationPh: string;
      messagePh: string;
      select: string;
    };
    bedroomOptions: string[];
    statusOptions: string[];
    managementOptions: string[];
    objectiveOptions: string[];
    channelOptions: string[];
    toastSuccess: string;
    toastSuccessDesc: string;
    toastError: string;
    toastErrorDesc: string;
  };
  finalCta: {
    eyebrow: string;
    title: string;
    desc: string;
    primaryCta: string;
    whatsappCta: string;
  };
  footer: {
    brandDesc: string;
    nav: string;
    services: string;
    contact: string;
    privacy: string;
    terms: string;
    copyright: string;
    lastUpdated: string;
    servicesLinks: string[];
  };
  whatsapp: {
    cardTitle: string;
    cardDesc: string;
    startChat: string;
    ariaLabel: string;
    prefillMessage: string;
    closeCard: string;
  };
  privacyTitle: string;
  privacyIntro: string;
  privacySections: { h: string; p: string }[];
  termsTitle: string;
  termsIntro: string;
  termsSections: { h: string; p: string }[];
}

const en: Translation = {
  nav: {
    home: "Home",
    about: "About",
    services: "Services",
    howWeWork: "How We Work",
    portfolio: "Portfolio",
    booking: "Booking",
    forOwners: "For Owners",
    insights: "Insights",
    requestConsultation: "Request a Consultation",
    closeMenu: "Close menu",
    openMenu: "Open menu",
    whatsapp: "WhatsApp KAYANA",
  },
  langToggle: { en: "EN", id: "ID" },
  booking: {
    bookNow: "Book Now",
    pricePerNight: "Price",
    perNight: "/ night",
    maxGuests: "Max guests",
    guestsLabel: "Guests",
    modalTitle: "Book this villa",
    modalSubtitle: "Choose your dates and guest count. We'll hold your request pending confirmation.",
    checkIn: "Check-in",
    checkOut: "Check-out",
    nights: "nights",
    totalLabel: "Estimated total",
    summaryNote: "Final pricing is confirmed by our team after your request is received.",
    guestName: "Full name",
    guestEmail: "Email",
    guestPhone: "WhatsApp number",
    guestsField: "Guests",
    notes: "Notes (optional)",
    notesPlaceholder: "Special requests, arrival time, etc.",
    submit: "Request booking",
    submitting: "Sending...",
    errDates: "Please choose valid check-in and check-out dates.",
    errGuests: "Number of guests exceeds this villa's capacity.",
    errConflict: "Those dates are already booked. Please choose other dates.",
    errGeneric: "Something went wrong. Please try again.",
    successTitle: "Booking request received",
    successBody: "Thank you! Our team will review your request and confirm availability shortly via WhatsApp or email.",
    successNights: "Nights",
    successTotal: "Estimated total",
    successRef: "Reference",
    successAnother: "Make another booking",
    availabilityChecking: "Checking availability...",
    availabilityAvailable: "Available",
    availabilityUnavailable: "Booked",
    requestPrice: "Price on request",
  },
  chatbot: {
    open: "Open chat assistant",
    close: "Close chat assistant",
    title: "KAYANA Assistant",
    subtitle: "Online · 10 PM – 8 AM Bali time",
    placeholder: "Ask about villas, booking, owner services...",
    send: "Send",
    online: "Online",
    offline: "Offline",
    typing: "Typing...",
    suggestion1: "What villas are available?",
    suggestion2: "How do I book a villa?",
    suggestion3: "What services does KAYANA offer?",
    suggestion4: "I'm a villa owner — how can you help?",
    error: "Sorry, I couldn't connect. Please try again or contact us via WhatsApp.",
  },


  hero: {
    eyebrow: "Professional Villa Management • Bali",
    title1: "Your Villa.",
    title2: "Our Expertise.",
    subtitle:
      "Professional villa management designed to maximize your property's performance while delivering exceptional guest experiences.",
    supporting:
      "KAYANA provides end-to-end villa management solutions in Bali — from reservations and revenue optimization to housekeeping, maintenance, guest services, and owner reporting.",
    ctaPrimary: "Request a Consultation",
    ctaSecondary: "Explore Our Services",
    trustNote: "Bali, Indonesia • Responsive within business hours",
    scroll: "Scroll",
  },
  trust: [
    {
      title: "End-to-End Management",
      text: "Operations, reservations, guest experience and property care handled under one professional team.",
    },
    {
      title: "Revenue Focused",
      text: "Strategic pricing and distribution designed to improve villa performance and earning potential.",
    },
    {
      title: "Owner Transparency",
      text: "Clear reporting and visibility into your property's revenue, occupancy and operational status.",
    },
    {
      title: "Local Expertise",
      text: "Bali-based operational knowledge and trusted local networks across vendors and channels.",
    },
  ],
  about: {
    eyebrow: "About KAYANA",
    title: "More Than Management. We Protect the Value of Your Property.",
    p1: "KAYANA Villa Management is a Bali-based professional property management company dedicated to helping villa owners operate their properties efficiently, increase revenue potential, and deliver exceptional guest experiences.",
    p2: "Our approach combines hospitality expertise, operational discipline, revenue management, technology, and local knowledge.",
    p3: "We don't simply manage bookings. We manage the entire guest journey and the operational performance behind your property.",
    pillars: [
      "Hospitality expertise",
      "Operational discipline",
      "Revenue management",
      "Technology & reporting",
      "Local Bali knowledge",
    ],
    cta: "Discover KAYANA",
    statLabel: "End-to-End",
    statText:
      "We manage the entire guest journey and the operational performance behind your property.",
  },
  services: {
    eyebrow: "Villa Management Services",
    title1: "Everything Your Villa Needs.",
    title2: "Under One Management.",
    description:
      "A complete operational and commercial framework — designed so owners never have to coordinate multiple vendors, channels and service providers themselves.",
    learnMore: "Learn More",
    showLess: "Show less",
    items: [
      {
        title: "Revenue & Reservation Management",
        description:
          "A coordinated distribution and pricing strategy across every relevant channel, with disciplined reservation handling to protect your calendar.",
        features: [
          "Airbnb management",
          "Booking.com management",
          "Agoda management",
          "OTA distribution",
          "Direct booking",
          "Dynamic pricing",
          "Calendar management",
          "Reservation handling",
          "Double-booking prevention",
          "Revenue monitoring",
          "Occupancy optimization",
        ],
      },
      {
        title: "Guest Experience",
        description:
          "A warm, professionally managed guest journey — from first message to check-out — designed to lift reviews and repeat interest.",
        features: [
          "Pre-arrival communication",
          "Check-in coordination",
          "Guest orientation",
          "Guest support",
          "Check-out management",
          "Review management",
          "Guest issue resolution",
          "24/7 emergency coordination",
        ],
      },
      {
        title: "Housekeeping & Quality Control",
        description:
          "Consistent villa preparation and inspection standards so every arrival feels immaculate, with linen and amenities handled end-to-end.",
        features: [
          "Cleaning schedules",
          "Linen management",
          "Laundry coordination",
          "Villa preparation",
          "Inspection",
          "Quality control",
          "Deep cleaning",
          "Amenities management",
        ],
      },
      {
        title: "Maintenance & Property Care",
        description:
          "Preventive maintenance and reliable vendor coordination that protects your property's condition and long-term value.",
        features: [
          "Preventive maintenance",
          "AC maintenance",
          "Pool maintenance",
          "Garden maintenance",
          "Electrical/plumbing coordination",
          "Emergency response",
          "Vendor coordination",
          "Property inspections",
        ],
      },
      {
        title: "Marketing & Distribution",
        description:
          "Listing optimization, photography and a direct-booking strategy that positions your property to perform across channels.",
        features: [
          "Professional listing optimization",
          "OTA listing management",
          "Photography coordination",
          "Copywriting",
          "Promotional campaigns",
          "Direct booking strategy",
          "Social media support",
          "Review optimization",
        ],
      },
      {
        title: "Owner Reporting & Financial Control",
        description:
          "Structured, transparent reporting so you always understand how your property is performing financially and operationally.",
        features: [
          "Monthly owner reports",
          "Revenue reports",
          "Expense monitoring",
          "Management fee reporting",
          "Occupancy analysis",
          "Performance reports",
          "Operational expense tracking",
          "Transparent documentation",
        ],
      },
    ],
  },
  process: {
    eyebrow: "Our Management Process",
    title: "From Onboarding to Ongoing Performance.",
    description:
      "A structured path from first property assessment through continuous optimization — designed to protect value and improve performance over time.",
    items: [
      {
        title: "Property Assessment",
        text: "We inspect the villa, review its condition, inventory, amenities, operational readiness, and market positioning.",
      },
      {
        title: "Strategy & Onboarding",
        text: "We establish management standards, pricing strategy, operating procedures, and owner requirements.",
      },
      {
        title: "Listing & Distribution",
        text: "We optimize the property's online presence across relevant booking channels.",
      },
      {
        title: "Revenue Activation",
        text: "We implement pricing, availability, promotions, and distribution strategies.",
      },
      {
        title: "Daily Operations",
        text: "We coordinate reservations, guests, housekeeping, maintenance, and property readiness.",
      },
      {
        title: "Quality Control",
        text: "We conduct inspections and continuously monitor guest experience and operational standards.",
      },
      {
        title: "Performance Reporting",
        text: "Owners receive structured reports covering revenue, occupancy, expenses, and property performance.",
      },
      {
        title: "Continuous Optimization",
        text: "We continuously improve pricing, marketing, operations, and guest experience.",
      },
    ],
  },
  revenue: {
    eyebrow: "Revenue & Performance",
    title: "Management Built Around Performance.",
    description:
      "KAYANA combines market awareness, dynamic pricing, occupancy analysis, seasonal strategy, OTA performance, promotions and direct booking opportunities to help maximize the earning potential of each property.",
    kpis: [
      { label: "Occupancy", text: "Track booking performance across every channel." },
      { label: "ADR", abbr: "Average Daily Rate", text: "Monitor average daily rate and pricing effectiveness." },
      { label: "RevPAR", abbr: "Revenue Per Available Room", text: "Measure revenue performance relative to availability." },
      { label: "Revenue", text: "Track monthly and yearly performance trends." },
      { label: "Booking Sources", text: "Understand where reservations originate." },
      { label: "Guest Reviews", text: "Monitor guest satisfaction and review performance." },
    ],
    dashboard: {
      label: "Owner Dashboard",
      title: "Property Performance Overview",
      revenueLabel: "Revenue Trend",
      revenueSub: "Monthly performance",
      indexedRevenue: "Indexed revenue",
      occupancyLabel: "Occupancy Trend",
      occupancySub: "Booking performance",
      channelsLabel: "Booking Sources",
      channelsSub: "Channel mix",
      channelsCount: "Channels",
      illustrative: "Illustrative sample — not actual performance data",
      rollingView: "Rolling 6-month view • Illustrative",
    },
    disclaimer:
      "Performance figures shown are illustrative samples to demonstrate the reporting concept. KAYANA does not publish unverified performance numbers. Actual results depend on each property's characteristics, location, seasonality and market conditions.",
  },
  owners: {
    eyebrow: "For Villa Owners",
    title1: "You Own the Property.",
    title2: "We Handle the Complexity.",
    p1: "Owning a villa should not require you to manage every booking, guest message, cleaning schedule, maintenance issue, or pricing decision.",
    p2: "KAYANA takes care of the operational details so owners can focus on the bigger picture — while retaining full visibility into how their property is performing.",
    benefits: [
      "Professional operations",
      "Better guest experience",
      "Revenue optimization",
      "Reduced owner workload",
      "Transparent reporting",
      "Property protection",
      "Local operational support",
      "One professional management partner",
    ],
    cta: "Let's Discuss Your Villa",
    quote:
      "The best management is the kind you barely notice — your villa simply performs, guests arrive happy, and the details are handled.",
    quoteBy: "The KAYANA Standard",
    quoteSub: "Operational excellence, by design",
  },
  packages: {
    eyebrow: "Management Packages",
    title: "Management Solutions, Tailored to Your Goals.",
    description:
      "Three structured frameworks that scale with how much operational responsibility you'd like KAYANA to carry. Every proposal is customized after a property assessment.",
    recommended: "Recommended",
    cta: "Request a Management Proposal",
    note: "Management solutions are customized according to property size, location, operational requirements, and owner objectives. Pricing is provided in a tailored proposal following a property assessment.",
    items: [
      {
        name: "Essential Management",
        tagline: "For owners who need professional operational support.",
        description:
          "Core operational coverage that keeps your villa ready, clean and guest-ready with reservation coordination.",
        features: [
          "Reservation handling",
          "Guest check-in coordination",
          "Housekeeping scheduling",
          "Basic maintenance coordination",
          "Calendar management",
          "Owner communication",
        ],
      },
      {
        name: "Professional Management",
        tagline: "For owners looking for comprehensive villa management.",
        description:
          "A complete operational and revenue management approach designed to improve performance and guest experience.",
        features: [
          "Everything in Essential",
          "Dynamic pricing strategy",
          "Full OTA distribution",
          "Marketing & listing optimization",
          "Quality control inspections",
          "Monthly performance reporting",
          "24/7 guest support coordination",
        ],
      },
      {
        name: "Full Management",
        tagline: "For owners who want KAYANA to handle nearly the entire operation.",
        description:
          "End-to-end management of operations, revenue, marketing, maintenance and financial reporting.",
        features: [
          "Everything in Professional",
          "Preventive maintenance program",
          "Vendor & contract management",
          "Deep cleaning & amenity program",
          "Detailed financial reporting",
          "Dedicated account management",
          "Long-term property value care",
        ],
      },
    ],
  },
  portfolio: {
    eyebrow: "Our Properties",
    title: "A Portfolio of Professionally Managed Villas",
    description:
      "Each property in our care is held to the same operational and guest-experience standard. The selection below is representative of properties we manage.",
    listCta: "List Your Villa With Us",
    note: "Properties shown are representative of the type of villas KAYANA manages. The full managed portfolio is available on request, subject to owner confidentiality.",
    villas: [
      {
        name: "KAYANA Residence",
        location: "Umalas, Bali",
        type: "Private Pool Villa",
        description:
          "Contemporary tropical residence with open-plan living, lush gardens and a calm private pool.",
      },
      {
        name: "The Berawa Pavilion",
        location: "Berawa, Bali",
        type: "Pavilion Villa",
        description:
          "Light-filled pavilion living overlooking a sunlit pool, steps from Berawa's beach and cafés.",
      },
      {
        name: "Canggu Garden Villa",
        location: "Canggu, Bali",
        type: "Garden Villa",
        description:
          "Intimate two-bedroom villa wrapped in tropical greenery with a relaxed outdoor lounge.",
      },
      {
        name: "Seminyak Suite Villa",
        location: "Seminyak, Bali",
        type: "Luxury Villa",
        description:
          "Spacious five-bedroom retreat with designer interiors, infinity pool and sunset rooftop access.",
      },
      {
        name: "Pererenan Retreat",
        location: "Pererenan, Bali",
        type: "Retreat Villa",
        description:
          "Serene retreat villa blending warm timber, natural stone and an expansive outdoor pavilion.",
      },
      {
        name: "Ubud Riverside Villa",
        location: "Ubud, Bali",
        type: "Jungle Villa",
        description:
          "Riverside jungle villa with panoramic greenery, a curved infinity pool and quiet luxury interiors.",
      },
    ],
  },
  guests: {
    eyebrow: "For Guests",
    title: "Stay With Confidence",
    description:
      "When you book a KAYANA-managed villa, you're choosing a property held to a professional hospitality standard — not a listing left to chance.",
    points: [
      { title: "Professional Check-in", text: "Coordinated, warm arrivals — not key boxes left to chance." },
      { title: "Clean & Prepared Villa", text: "Every property inspected and ready before each arrival." },
      { title: "Fast Communication", text: "Responsive guest messaging across every channel." },
      { title: "Local Support", text: "On-the-ground team that knows Bali and your area." },
      { title: "Maintenance Assistance", text: "Issues resolved quickly through trusted local vendors." },
      { title: "Carefully Managed Stay", text: "A guest experience designed from start to finish." },
    ],
    cta: "Explore Our Villas",
  },
  why: {
    eyebrow: "Why KAYANA",
    title: "Why Property Owners Choose KAYANA",
    description:
      "We are positioned as a professional villa management and hospitality operations company — not a rental agency. Owners work with us because the details are handled.",
    items: [
      { title: "Local Expertise", text: "Deep understanding of Bali's hospitality environment, regulations and trusted vendor networks." },
      { title: "Professional Operations", text: "Structured standard operating procedures for daily villa operations and quality control." },
      { title: "Revenue Mindset", text: "Management decisions are directly connected to your property's performance." },
      { title: "Transparent Reporting", text: "Owners receive clear operational and financial information on a regular schedule." },
      { title: "Guest-Centric Service", text: "Guest satisfaction directly contributes to reviews, repeat bookings and property performance." },
      { title: "Long-Term Property Care", text: "We focus not only on today's booking, but also on maintaining the property's long-term value." },
    ],
  },
  testimonials: {
    eyebrow: "Owner Testimonials",
    title: "Trusted by Villa Owners Across Bali",
    description:
      "KAYANA publishes only verified owner testimonials — with explicit consent. The cards below are placeholders until real testimonials are collected and approved.",
    items: [
      {
        quote:
          "[Owner testimonial will be added here. When a verified owner testimonial is available, it will replace this placeholder — including the owner's name, property location, and a short account of their experience working with KAYANA.]",
        name: "Owner name",
        location: "Property location",
      },
      {
        quote:
          "[Owner testimonial will be added here. KAYANA does not publish fabricated reviews or unverified performance claims. Real testimonials appear once owners have agreed to share their experience.]",
        name: "Owner name",
        location: "Property location",
      },
      {
        quote:
          "[Owner testimonial will be added here. Each testimonial is published only with the owner's explicit consent, alongside their villa location and a brief summary of the management relationship.]",
        name: "Owner name",
        location: "Property location",
      },
    ],
    note: "Placeholder content shown above. KAYANA does not fabricate testimonials, reviews, occupancy rates, or performance figures.",
  },
  insights: {
    eyebrow: "Insights",
    title: "Notes on Villa Management & Performance",
    description:
      "Practical perspectives on operations, revenue and ownership — written for villa owners who want to understand what good management actually involves.",
    suggestCta: "Suggest a Topic",
    read: "Read",
    comingSoon: "Coming soon",
    note: "Articles are published as they are written and verified. KAYANA does not publish AI-generated or unreviewed content as finished articles.",
    items: [
      {
        category: "Revenue Management",
        title: "How Dynamic Pricing Shapes a Villa's Annual Performance",
        excerpt:
          "A look at how seasonal demand, local events and competitor behaviour inform a pricing strategy that protects both occupancy and rate.",
        read: "6 min read",
      },
      {
        category: "Operations",
        title: "The Turnover Standard: Why Preparation Beats Speed",
        excerpt:
          "Inside the inspection and preparation routine that separates a professionally managed villa from an ad-hoc rental.",
        read: "5 min read",
      },
      {
        category: "For Owners",
        title: "What to Expect in a Monthly Owner Report",
        excerpt:
          "Understanding the metrics that matter — and the ones that don't — when evaluating your villa's monthly performance.",
        read: "7 min read",
      },
    ],
  },
  faq: {
    eyebrow: "Frequently Asked Questions",
    title: "Answers for Villa Owners",
    description:
      "The questions owners most often ask before working with KAYANA. If yours isn't here, our team is happy to answer it directly.",
    askCta: "Ask a Question",
    items: [
      {
        q: "What does villa management include?",
        a: "KAYANA manages reservations, revenue and pricing, guest communication, housekeeping, maintenance coordination, property inspections and owner reporting — covering the full operational and commercial life of your villa.",
      },
      {
        q: "How does KAYANA manage Airbnb, Booking.com and Agoda?",
        a: "We operate your listings directly or as a co-host, optimizing content, pricing, availability and messaging across each channel while keeping calendars synchronized to prevent conflicts.",
      },
      {
        q: "How do you prevent double bookings?",
        a: "Through a synchronized calendar and channel manager approach. Availability is updated across all connected platforms in real time, with reservation handling procedures that add a human verification layer.",
      },
      {
        q: "How is villa pricing determined?",
        a: "Pricing is built from market research, seasonal demand, local events, comparable properties and your occupancy goals. We apply dynamic pricing and review it regularly rather than using a fixed rate year-round.",
      },
      {
        q: "How often will I receive owner reports?",
        a: "Owners receive structured monthly reports covering revenue, occupancy, expenses and operational status. Reporting scope and detail scale with the management package you select.",
      },
      {
        q: "Can I still use my villa personally?",
        a: "Yes. Your villa remains yours. We simply block the calendar for your personal use dates so they are never booked, and we coordinate preparation and reactivation around your visits.",
      },
      {
        q: "Who handles maintenance?",
        a: "Our operations team coordinates preventive and reactive maintenance with trusted local vendors — covering AC, pool, garden, electrical and plumbing — and oversees emergency response.",
      },
      {
        q: "Who handles guest communication?",
        a: "KAYANA manages guest communication across channels, from pre-arrival messages through check-in, on-site support and check-out, including review management and issue resolution.",
      },
      {
        q: "How are housekeeping and laundry managed?",
        a: "Through scheduled cleaning, linen and laundry coordination with quality inspections after each turnover, plus deep cleaning programs to keep the villa in premium condition.",
      },
      {
        q: "What happens in an emergency?",
        a: "We coordinate 24/7 emergency response for guests and the property. Our team assesses the situation, dispatches the appropriate vendor and keeps the owner informed of anything significant.",
      },
      {
        q: "How does the management fee work?",
        a: "Management solutions are customized to your property and goals. After an assessment, we prepare a transparent proposal covering scope, fee structure and reporting — with no obligation to proceed.",
      },
      {
        q: "Can KAYANA manage villas outside Bali?",
        a: "Our operational base and local networks are in Bali. If you have a property elsewhere, we are happy to discuss whether our model can be adapted to your situation.",
      },
      {
        q: "How do I start working with KAYANA?",
        a: "Begin by requesting a consultation through the contact form or WhatsApp. We'll learn about your property, assess it, and prepare a tailored management proposal for your review.",
      },
    ],
  },
  contact: {
    eyebrow: "Request a Consultation",
    title: "Let's Unlock the Potential of Your Villa.",
    description:
      "Tell us about your property and our team will prepare a management approach tailored to your goals.",
    talkTitle: "Talk to KAYANA directly",
    talkDesc:
      "Prefer to speak with someone now? Reach our team through any of the channels below — we typically respond within business hours.",
    whatsapp: "WhatsApp",
    email: "Email",
    location: "Location",
    mobileWhatsapp: "Chat With KAYANA on WhatsApp",
    form: {
      fullName: "Full Name",
      whatsappNumber: "WhatsApp Number",
      email: "Email",
      villaName: "Villa Name",
      villaLocation: "Villa Location",
      bedrooms: "Number of Bedrooms",
      bedroomSuffix: "bedroom",
      propertyStatus: "Property Status",
      managementState: "Current Management Situation",
      objective: "Owner's Main Objective",
      channels: "Current Booking Channels",
      message: "Message",
      submit: "Request a Consultation",
      submitting: "Sending...",
      privacyNote:
        "By submitting, you agree to be contacted by KAYANA Villa Management regarding your property. We respect your privacy and never share your information.",
      successTitle: "Thank you — request received",
      successMsg:
        "Your consultation request has been logged with our team. We'll reach out to discuss your villa and prepare a tailored management proposal.",
      another: "Submit another request",
      fullNamePh: "Your full name",
      whatsappPh: "+62 812 ...",
      emailPh: "you@email.com",
      villaNamePh: "e.g. Villa Kayana",
      villaLocationPh: "e.g. Canggu, Bali",
      messagePh:
        "Tell us anything that would help us prepare — your goals, concerns, or timeline.",
      select: "Select",
    },
    bedroomOptions: ["1", "2", "3", "4", "5", "6+"],
    statusOptions: [
      "Already operating",
      "Newly built / not yet listed",
      "Under construction",
      "Planning / not yet built",
    ],
    managementOptions: [
      "Self-managed",
      "Managed by another company",
      "Not yet operating",
    ],
    objectiveOptions: [
      "Increase revenue",
      "Reduce my workload",
      "Better guest experience",
      "Full hands-off management",
      "Improve operational quality",
      "Other",
    ],
    channelOptions: ["Airbnb", "Booking.com", "Agoda", "Direct website", "None yet"],
    toastSuccess: "Request received",
    toastSuccessDesc: "Our team will be in touch shortly.",
    toastError: "Could not send request",
    toastErrorDesc: "Please try again or message us on WhatsApp.",
  },
  finalCta: {
    eyebrow: "Your Property Deserves Professional Management",
    title:
      "Let's build better performance, better guest experiences, and better ownership.",
    desc: "Talk to KAYANA today. We'll assess your property, understand your goals, and prepare a management approach tailored to you.",
    primaryCta: "Talk to KAYANA",
    whatsappCta: "Message on WhatsApp",
  },
  footer: {
    brandDesc:
      "Professional Villa Management in Bali. We manage the operations, revenue and guest experience behind your property — so ownership stays rewarding.",
    nav: "Navigation",
    services: "Services",
    contact: "Contact",
    privacy: "Privacy Policy",
    terms: "Terms & Conditions",
    copyright: "© 2026 KAYANA Villa Management. All Rights Reserved.",
    lastUpdated: "Last updated: January 2026 • KAYANA Villa Management, Bali, Indonesia.",
    servicesLinks: [
      "Villa Management",
      "Revenue Management",
      "Reservation Management",
      "Housekeeping",
      "Maintenance",
      "Guest Experience",
      "Owner Reporting",
    ],
  },
  whatsapp: {
    cardTitle: "Chat With KAYANA",
    cardDesc:
      "Ask about professional management for your Bali villa. We typically respond during business hours.",
    startChat: "Start WhatsApp Chat",
    ariaLabel: "Chat with KAYANA on WhatsApp",
    prefillMessage:
      "Hello KAYANA Villa Management, I would like to discuss professional management for my villa in Bali.",
    closeCard: "Close chat card",
  },
  privacyTitle: "Privacy Policy",
  privacyIntro: "How KAYANA Villa Management collects, uses and protects your information.",
  privacySections: [
    { h: "1. Information We Collect", p: "When you request a consultation through our website, we collect the information you provide — including your full name, WhatsApp number, email, and any details you share about your property. We may also collect limited technical analytics about how the website is used." },
    { h: "2. How We Use Your Information", p: "We use your information to respond to your enquiry, prepare a tailored management proposal, and communicate with you about our services. We do not sell your personal information to third parties." },
    { h: "3. Information Sharing", p: "Your information is shared only with members of our team and trusted service providers who help us operate our business, and only where necessary. All parties are expected to handle your information confidentially." },
    { h: "4. Data Retention", p: "We retain consultation enquiries for as long as is necessary to respond to your request and for reasonable record-keeping. You may request deletion of your information at any time." },
    { h: "5. Cookies", p: "Our website may use essential cookies and basic analytics to improve performance and user experience. We do not use advertising cookies." },
    { h: "6. Your Rights", p: "You may request access to, correction of, or deletion of your personal information by contacting us using the details below." },
    { h: "7. Contact", p: "For privacy enquiries, contact us by email or WhatsApp using the details shown on this website." },
  ],
  termsTitle: "Terms & Conditions",
  termsIntro: "The terms that govern the use of this website and our services.",
  termsSections: [
    { h: "1. Services", p: "KAYANA Villa Management provides professional villa management services in Bali. The exact scope of services for any property is defined in a separate management agreement prepared after a property assessment and owner consultation." },
    { h: "2. No Guaranteed Results", p: "While KAYANA applies professional management practices designed to improve property performance, we do not guarantee specific occupancy rates, revenue figures, or review outcomes. Actual results depend on many factors including property characteristics, location, seasonality and market conditions." },
    { h: "3. Illustrative Content", p: "Any performance figures, dashboards or examples shown on this website are illustrative and do not represent actual results unless explicitly stated. Property images may be representative of the type of villas we manage." },
    { h: "4. Consultation Requests", p: "Submitting a consultation request does not create a binding management relationship. A formal engagement requires a signed management agreement between the owner and KAYANA." },
    { h: "5. Third-Party Channels", p: "References to Airbnb, Booking.com, Agoda and other platforms are for descriptive purposes. These platforms are operated by independent companies with their own terms and policies." },
    { h: "6. Limitation of Liability", p: "To the maximum extent permitted by law, KAYANA is not liable for indirect or consequential losses arising from the use of this website. Our liability in any management relationship is governed by the applicable management agreement." },
    { h: "7. Governing Law", p: "These terms are governed by the laws of the Republic of Indonesia. Any disputes are subject to the jurisdiction of the relevant courts in Bali, Indonesia." },
  ],
};

const id: Translation = {
  nav: {
    home: "Beranda",
    about: "Tentang",
    services: "Layanan",
    howWeWork: "Cara Kerja",
    portfolio: "Portofolio",
    booking: "Pemesanan",
    forOwners: "Untuk Pemilik",
    insights: "Insight",
    requestConsultation: "Minta Konsultasi",
    closeMenu: "Tutup menu",
    openMenu: "Buka menu",
    whatsapp: "WhatsApp KAYANA",
  },
  langToggle: { en: "EN", id: "ID" },
  booking: {
    bookNow: "Pesan Sekarang",
    pricePerNight: "Harga",
    perNight: "/ malam",
    maxGuests: "Maks tamu",
    guestsLabel: "Tamu",
    modalTitle: "Pesan villa ini",
    modalSubtitle: "Pilih tanggal dan jumlah tamu. Permintaan Anda akan kami tahan hingga dikonfirmasi.",
    checkIn: "Check-in",
    checkOut: "Check-out",
    nights: "malam",
    totalLabel: "Estimasi total",
    summaryNote: "Harga final dikonfirmasi oleh tim kami setelah permintaan Anda diterima.",
    guestName: "Nama lengkap",
    guestEmail: "Email",
    guestPhone: "Nomor WhatsApp",
    guestsField: "Tamu",
    notes: "Catatan (opsional)",
    notesPlaceholder: "Permintaan khusus, jam kedatangan, dll.",
    submit: "Kirim permintaan",
    submitting: "Mengirim...",
    errDates: "Mohon pilih tanggal check-in dan check-out yang valid.",
    errGuests: "Jumlah tamu melebihi kapasitas villa ini.",
    errConflict: "Tanggal tersebut sudah dipesan. Silakan pilih tanggal lain.",
    errGeneric: "Terjadi kesalahan. Silakan coba lagi.",
    successTitle: "Permintaan pemesanan diterima",
    successBody: "Terima kasih! Tim kami akan meninjau permintaan Anda dan mengonfirmasi ketersediaan segera via WhatsApp atau email.",
    successNights: "Malam",
    successTotal: "Estimasi total",
    successRef: "Nomor referensi",
    successAnother: "Buat pemesanan lain",
    availabilityChecking: "Memeriksa ketersediaan...",
    availabilityAvailable: "Tersedia",
    availabilityUnavailable: "Dipesan",
    requestPrice: "Harga sesuai permintaan",
  },
  chatbot: {
    open: "Buka asisten chat",
    close: "Tutup asisten chat",
    title: "Asisten KAYANA",
    subtitle: "Online · 22.00 – 08.00 waktu Bali",
    placeholder: "Tanya soal villa, booking, layanan pemilik...",
    send: "Kirim",
    online: "Online",
    offline: "Offline",
    typing: "Mengetik...",
    suggestion1: "Villa apa saja yang tersedia?",
    suggestion2: "Bagaimana cara booking villa?",
    suggestion3: "Layanan apa yang ditawarkan KAYANA?",
    suggestion4: "Saya pemilik villa — bagaimana Anda bisa membantu?",
    error: "Maaf, koneksi gagal. Silakan coba lagi atau hubungi kami via WhatsApp.",
  },


  hero: {
    eyebrow: "Manajemen Villa Profesional • Bali",
    title1: "Villa Anda.",
    title2: "Keahlian Kami.",
    subtitle:
      "Manajemen villa profesional yang dirancang untuk memaksimalkan kinerja properti Anda sekaligus memberikan pengalaman tamu yang luar biasa.",
    supporting:
      "KAYANA menyediakan solusi manajemen villa menyeluruh di Bali — mulai dari reservasi dan optimasi pendapatan hingga housekeeping, perawatan, layanan tamu, dan pelaporan untuk pemilik.",
    ctaPrimary: "Minta Konsultasi",
    ctaSecondary: "Jelajahi Layanan Kami",
    trustNote: "Bali, Indonesia • Merespons dalam jam kerja",
    scroll: "Gulir",
  },
  trust: [
    {
      title: "Manajemen Menyeluruh",
      text: "Operasional, reservasi, pengalaman tamu, dan perawatan properti ditangani oleh satu tim profesional.",
    },
    {
      title: "Berfokus pada Pendapatan",
      text: "Strategi harga dan distribusi yang dirancang untuk meningkatkan kinerja dan potensi pendapatan villa.",
    },
    {
      title: "Transparansi untuk Pemilik",
      text: "Pelaporan yang jelas serta visibilitas penuh terhadap pendapatan, okupansi, dan status operasional properti Anda.",
    },
    {
      title: "Keahlian Lokal",
      text: "Pengetahuan operasional berbasis Bali dan jaringan lokal terpercaya untuk vendor maupun saluran distribusi.",
    },
  ],
  about: {
    eyebrow: "Tentang KAYANA",
    title: "Lebih dari Sekadar Manajemen. Kami Menjaga Nilai Properti Anda.",
    p1: "KAYANA Villa Management adalah perusahaan manajemen properti profesional berbasis Bali yang berdedikasi membantu pemilik villa mengelola properti mereka secara efisien, meningkatkan potensi pendapatan, dan memberikan pengalaman tamu yang luar biasa.",
    p2: "Pendekatan kami memadukan keahlian perhotelan, kedisiplinan operasional, manajemen pendapatan, teknologi, dan pengetahuan lokal.",
    p3: "Kami tidak sekadar mengelola pemesanan. Kami mengelola seluruh perjalanan tamu dan kinerja operasional di balik properti Anda.",
    pillars: [
      "Keahlian perhotelan",
      "Kedisiplinan operasional",
      "Manajemen pendapatan",
      "Teknologi & pelaporan",
      "Pengetahuan lokal Bali",
    ],
    cta: "Kenali KAYANA",
    statLabel: "Menyeluruh",
    statText:
      "Kami mengelola seluruh perjalanan tamu dan kinerja operasional di balik properti Anda.",
  },
  services: {
    eyebrow: "Layanan Manajemen Villa",
    title1: "Semua yang Villa Anda Butuhkan.",
    title2: "Dalam Satu Manajemen.",
    description:
      "Kerangka operasional dan komersial yang lengkap — dirancang agar pemilik tidak perlu lagi mengoordinasikan banyak vendor, saluran, dan penyedia layanan secara terpisah.",
    learnMore: "Selengkapnya",
    showLess: "Sembunyikan",
    items: [
      {
        title: "Manajemen Pendapatan & Reservasi",
        description:
          "Strategi distribusi dan harga yang terkoordinasi di setiap saluran yang relevan, dengan penanganan reservasi yang disiplin untuk menjaga kalender Anda.",
        features: [
          "Manajemen Airbnb",
          "Manajemen Booking.com",
          "Manajemen Agoda",
          "Distribusi OTA",
          "Pemesanan langsung",
          "Harga dinamis",
          "Manajemen kalender",
          "Penanganan reservasi",
          "Pencegahan pemesanan ganda",
          "Pemantauan pendapatan",
          "Optimasi okupansi",
        ],
      },
      {
        title: "Pengalaman Tamu",
        description:
          "Perjalanan tamu yang dikelola secara profesional dan hangat — dari pesan pertama hingga check-out — dirancang untuk meningkatkan ulasan dan minat kembali.",
        features: [
          "Komunikasi pra-kedatangan",
          "Koordinasi check-in",
          "Orientasi tamu",
          "Dukungan tamu",
          "Manajemen check-out",
          "Manajemen ulasan",
          "Penyelesaian masalah tamu",
          "Koordinasi darurat 24/7",
        ],
      },
      {
        title: "Housekeeping & Pengendalian Mutu",
        description:
          "Standar persiapan dan inspeksi villa yang konsisten sehingga setiap kedatangan terasa sempurna, dengan linen dan amenitas ditangani menyeluruh.",
        features: [
          "Jadwal pembersihan",
          "Manajemen linen",
          "Koordinasi laundry",
          "Persiapan villa",
          "Inspeksi",
          "Pengendalian mutu",
          "Pembersihan menyeluruh",
          "Manajemen amenitas",
        ],
      },
      {
        title: "Perawatan & Pemeliharaan Properti",
        description:
          "Perawatan preventif dan koordinasi vendor yang andal untuk menjaga kondisi serta nilai jangka panjang properti Anda.",
        features: [
          "Perawatan preventif",
          "Perawatan AC",
          "Perawatan kolam",
          "Perawatan taman",
          "Koordinasi listrik/perpipaan",
          "Tanggapan darurat",
          "Koordinasi vendor",
          "Inspeksi properti",
        ],
      },
      {
        title: "Pemasaran & Distribusi",
        description:
          "Optimasi listing, fotografi, dan strategi pemesanan langsung yang menempatkan properti Anda untuk tampil optimal di berbagai saluran.",
        features: [
          "Optimasi listing profesional",
          "Manajemen listing OTA",
          "Koordinasi fotografi",
          "Penulisan copy",
          "Kampanye promosi",
          "Strategi pemesanan langsung",
          "Dukungan media sosial",
          "Optimasi ulasan",
        ],
      },
      {
        title: "Pelaporan Pemilik & Pengendalian Keuangan",
        description:
          "Pelaporan terstruktur dan transparan agar Anda selalu memahami kinerja properti secara finansial dan operasional.",
        features: [
          "Laporan pemilik bulanan",
          "Laporan pendapatan",
          "Pemantauan pengeluaran",
          "Pelaporan biaya manajemen",
          "Analisis okupansi",
          "Laporan kinerja",
          "Pelacakan biaya operasional",
          "Dokumentasi transparan",
        ],
      },
    ],
  },
  process: {
    eyebrow: "Proses Manajemen Kami",
    title: "Dari Onboarding hingga Kinerja Berkelanjutan.",
    description:
      "Alur yang terstruktur dari asesmen properti pertama hingga optimasi berkelanjutan — dirancang untuk menjaga nilai dan meningkatkan kinerja dari waktu ke waktu.",
    items: [
      {
        title: "Asesmen Properti",
        text: "Kami memeriksa villa, meninjau kondisi, inventaris, amenitas, kesiapan operasional, dan posisi pasarnya.",
      },
      {
        title: "Strategi & Onboarding",
        text: "Kami menetapkan standar manajemen, strategi harga, prosedur operasional, dan kebutuhan pemilik.",
      },
      {
        title: "Listing & Distribusi",
        text: "Kami mengoptimalkan kehadiran online properti di seluruh saluran pemesanan yang relevan.",
      },
      {
        title: "Aktivasi Pendapatan",
        text: "Kami menerapkan strategi harga, ketersediaan, promosi, dan distribusi.",
      },
      {
        title: "Operasional Harian",
        text: "Kami mengoordinasikan reservasi, tamu, housekeeping, perawatan, dan kesiapan properti.",
      },
      {
        title: "Pengendalian Mutu",
        text: "Kami melakukan inspeksi dan terus memantau pengalaman tamu serta standar operasional.",
      },
      {
        title: "Pelaporan Kinerja",
        text: "Pemilik menerima laporan terstruktur mencakup pendapatan, okupansi, pengeluaran, dan kinerja properti.",
      },
      {
        title: "Optimasi Berkelanjutan",
        text: "Kami terus menyempurnakan harga, pemasaran, operasional, dan pengalaman tamu.",
      },
    ],
  },
  revenue: {
    eyebrow: "Pendapatan & Kinerja",
    title: "Manajemen yang Dibangun di Sekitar Kinerja.",
    description:
      "KAYANA memadukan kesadaran pasar, harga dinamis, analisis okupansi, strategi musiman, kinerja OTA, promosi, dan peluang pemesanan langsung untuk memaksimalkan potensi pendapatan setiap properti.",
    kpis: [
      { label: "Okupansi", text: "Pantau kinerja pemesanan di setiap saluran." },
      { label: "ADR", abbr: "Average Daily Rate", text: "Pantau tarif harian rata-rata dan efektivitas harga." },
      { label: "RevPAR", abbr: "Pendapatan Per Kamar Tersedia", text: "Ukur kinerja pendapatan relatif terhadap ketersediaan." },
      { label: "Pendapatan", text: "Pantau tren kinerja bulanan dan tahunan." },
      { label: "Sumber Pemesanan", text: "Pahami asal-usul reservasi." },
      { label: "Ulasan Tamu", text: "Pantau kepuasan tamu dan kinerja ulasan." },
    ],
    dashboard: {
      label: "Dashboard Pemilik",
      title: "Ringkasan Kinerja Properti",
      revenueLabel: "Tren Pendapatan",
      revenueSub: "Kinerja bulanan",
      indexedRevenue: "Indeks pendapatan",
      occupancyLabel: "Tren Okupansi",
      occupancySub: "Kinerja pemesanan",
      channelsLabel: "Sumber Pemesanan",
      channelsSub: "Bauran saluran",
      channelsCount: "Saluran",
      illustrative: "Contoh ilustratif — bukan data kinerja aktual",
      rollingView: "Tampilan 6 bulan berjalan • Ilustratif",
    },
    disclaimer:
      "Angka kinerja yang ditampilkan adalah contoh ilustratif untuk mendemonstrasikan konsep pelaporan. KAYANA tidak mempublikasikan angka kinerja yang tidak terverifikasi. Hasil aktual bergantung pada karakteristik, lokasi, musim, dan kondisi pasar setiap properti.",
  },
  owners: {
    eyebrow: "Untuk Pemilik Villa",
    title1: "Properti Milik Anda.",
    title2: "Kami yang Urus Kerumitannya.",
    p1: "Memiliki villa seharusnya tidak membuat Anda harus mengelola setiap pemesanan, pesan tamu, jadwal pembersihan, masalah perawatan, atau keputusan harga.",
    p2: "KAYANA menangani detail-detail operasional sehingga pemilik dapat fokus pada gambaran besar — sambil tetap memiliki visibilitas penuh terhadap kinerja properti.",
    benefits: [
      "Operasional profesional",
      "Pengalaman tamu yang lebih baik",
      "Optimasi pendapatan",
      "Beban kerja pemilik berkurang",
      "Pelaporan transparan",
      "Perlindungan properti",
      "Dukungan operasional lokal",
      "Satu mitra manajemen profesional",
    ],
    cta: "Mari Bicara tentang Villa Anda",
    quote:
      "Manajemen terbaik adalah yang nyaris tak Anda sadari — villa Anda tampil optimal, tamu datang dengan senang, dan semua detail tertangani.",
    quoteBy: "Standar KAYANA",
    quoteSub: "Keunggulan operasional, by desain",
  },
  packages: {
    eyebrow: "Paket Manajemen",
    title: "Solusi Manajemen yang Disesuaikan dengan Tujuan Anda.",
    description:
      "Tiga kerangka terstruktur yang menyesuaikan diri dengan seberapa besar tanggung jawab operasional yang ingin Anda serahkan kepada KAYANA. Setiap proposal disesuaikan setelah asesmen properti.",
    recommended: "Direkomendasikan",
    cta: "Minta Proposal Manajemen",
    note: "Solusi manajemen disesuaikan berdasarkan ukuran, lokasi, kebutuhan operasional, dan tujuan pemilik properti. Harga diberikan dalam proposal khusus setelah asesmen properti.",
    items: [
      {
        name: "Manajemen Esensial",
        tagline: "Untuk pemilik yang membutuhkan dukungan operasional profesional.",
        description:
          "Cakupan operasional inti yang menjaga villa tetap siap, bersih, dan siap tamu dengan koordinasi reservasi.",
        features: [
          "Penanganan reservasi",
          "Koordinasi check-in tamu",
          "Penjadwalan housekeeping",
          "Koordinasi perawatan dasar",
          "Manajemen kalender",
          "Komunikasi pemilik",
        ],
      },
      {
        name: "Manajemen Profesional",
        tagline: "Untuk pemilik yang menginginkan manajemen villa yang menyeluruh.",
        description:
          "Pendekatan manajemen operasional dan pendapatan yang lengkap, dirancang untuk meningkatkan kinerja dan pengalaman tamu.",
        features: [
          "Semua di Esensial",
          "Strategi harga dinamis",
          "Distribusi OTA penuh",
          "Pemasaran & optimasi listing",
          "Inspeksi pengendalian mutu",
          "Pelaporan kinerja bulanan",
          "Koordinasi dukungan tamu 24/7",
        ],
      },
      {
        name: "Manajemen Penuh",
        tagline: "Untuk pemilik yang ingin KAYANA menangani hampir seluruh operasional.",
        description:
          "Manajemen menyeluruh atas operasional, pendapatan, pemasaran, perawatan, dan pelaporan keuangan.",
        features: [
          "Semua di Profesional",
          "Program perawatan preventif",
          "Manajemen vendor & kontrak",
          "Program pembersihan menyeluruh & amenitas",
          "Pelaporan keuangan rinci",
          "Manajemen akun khusus",
          "Perawatan nilai properti jangka panjang",
        ],
      },
    ],
  },
  portfolio: {
    eyebrow: "Properti Kami",
    title: "Portofolio Villa yang Dikelola Secara Profesional",
    description:
      "Setiap properti yang kami kelola dijunjung pada standar operasional dan pengalaman tamu yang sama. Pilihan di bawah merupakan representasi dari properti yang kami kelola.",
    listCta: "Daftarkan Villa Anda",
    note: "Properti yang ditampilkan merupakan representasi dari jenis villa yang dikelola KAYANA. Portofolio lengkap tersedia atas permintaan, dengan mempertimbangkan kerahasiaan pemilik.",
    villas: [
      {
        name: "KAYANA Residence",
        location: "Umalas, Bali",
        type: "Villa Kolam Pribadi",
        description:
          "Residensi tropis kontemporer dengan ruang hidup terbuka, taman rimbun, dan kolam pribadi yang tenang.",
      },
      {
        name: "The Berawa Pavilion",
        location: "Berawa, Bali",
        type: "Villa Paviliun",
        description:
          "Hidup paviliun yang penuh cahaya dengan view kolam bercahaya, berdekatan dengan pantai dan kafe Berawa.",
      },
      {
        name: "Canggu Garden Villa",
        location: "Canggu, Bali",
        type: "Villa Taman",
        description:
          "Villa dua kamar yang intim, dikelilingi hijaunya tropis dengan ruang luar yang santai.",
      },
      {
        name: "Seminyak Suite Villa",
        location: "Seminyak, Bali",
        type: "Villa Mewah",
        description:
          "Retret lima kamar yang luas dengan interior desainer, kolam infinity, dan akses atap sunset.",
      },
      {
        name: "Pererenan Retreat",
        location: "Pererenan, Bali",
        type: "Villa Retret",
        description:
          "Villa retret yang tenang, memadukan kayu hangat, batu alam, dan paviliun luar yang luas.",
      },
      {
        name: "Ubud Riverside Villa",
        location: "Ubud, Bali",
        type: "Villa Hutan",
        description:
          "Villa tepi sungai di hutan dengan hijaunya panorama, kolam infinity melengkung, dan interior kemewahan yang tenang.",
      },
    ],
  },
  guests: {
    eyebrow: "Untuk Tamu",
    title: "Menginap dengan Keyakinan",
    description:
      "Saat memesan villa yang dikelola KAYANA, Anda memilih properti dengan standar perhotelan profesional — bukan sekadar listing yang dibiarkan apa adanya.",
    points: [
      { title: "Check-in Profesional", text: "Kedatangan yang terkoordinasi dan hangat — bukan kotak kunci yang dibiarkan begitu saja." },
      { title: "Villa Bersih & Siap", text: "Setiap properti diinspeksi dan disiapkan sebelum kedatangan." },
      { title: "Komunikasi Cepat", text: "Pesan tamu yang responsif di setiap saluran." },
      { title: "Dukungan Lokal", text: "Tim di lapangan yang memahami Bali dan area Anda." },
      { title: "Bantuan Perawatan", text: "Masalah diselesaikan dengan cepat melalui vendor lokal terpercaya." },
      { title: "Menginap yang Dikelola dengan Baik", text: "Pengalaman tamu yang dirancang dari awal hingga akhir." },
    ],
    cta: "Jelajahi Villa Kami",
  },
  why: {
    eyebrow: "Mengapa KAYANA",
    title: "Mengapa Pemilik Properti Memilih KAYANA",
    description:
      "Kami diposisikan sebagai perusahaan manajemen villa dan operasional perhotelan profesional — bukan agen sewa. Pemilik bekerja dengan kami karena setiap detail tertangani.",
    items: [
      { title: "Keahlian Lokal", text: "Pemahaman mendalam tentang lingkungan perhotelan Bali, regulasi, dan jaringan vendor terpercaya." },
      { title: "Operasional Profesional", text: "Prosedur operasi standar yang terstruktur untuk operasional villa harian dan pengendalian mutu." },
      { title: "Mentalitas Pendapatan", text: "Keputusan manajemen terhubung langsung dengan kinerja properti Anda." },
      { title: "Pelaporan Transparan", text: "Pemilik menerima informasi operasional dan finansial yang jelas secara berkala." },
      { title: "Layanan Berpusat pada Tamu", text: "Kepuasan tamu berkontribusi langsung pada ulasan, pemesanan berulang, dan kinerja properti." },
      { title: "Perawatan Properti Jangka Panjang", text: "Kami tidak hanya fokus pada pemesanan hari ini, tetapi juga menjaga nilai properti dalam jangka panjang." },
    ],
  },
  testimonials: {
    eyebrow: "Testimoni Pemilik",
    title: "Dipercaya Pemilik Villa di Seluruh Bali",
    description:
      "KAYANA hanya mempublikasikan testimoni pemilik yang terverifikasi — dengan persetujuan eksplisit. Kartu di bawah merupakan placeholder hingga testimoni nyata dikumpulkan dan disetujui.",
    items: [
      {
        quote:
          "[Testimoni pemilik akan ditambahkan di sini. Saat testimoni pemilik yang terverifikasi tersedia, ia akan menggantikan placeholder ini — termasuk nama pemilik, lokasi properti, dan cerita singkat pengalaman bekerja dengan KAYANA.]",
        name: "Nama pemilik",
        location: "Lokasi properti",
      },
      {
        quote:
          "[Testimoni pemilik akan ditambahkan di sini. KAYANA tidak mempublikasikan ulasan fiktif atau klaim kinerja yang tidak terverifikasi. Testimoni nyata akan tampil setelah pemilik menyetujui untuk berbagi pengalaman mereka.]",
        name: "Nama pemilik",
        location: "Lokasi properti",
      },
      {
        quote:
          "[Testimoni pemilik akan ditambahkan di sini. Setiap testimoni dipublikasikan hanya dengan persetujuan eksplisit pemilik, beserta lokasi villa dan ringkasan singkat hubungan manajemen.]",
        name: "Nama pemilik",
        location: "Lokasi properti",
      },
    ],
    note: "Konten di atas adalah placeholder. KAYANA tidak mengarang testimoni, ulasan, angka okupansi, atau figur kinerja.",
  },
  insights: {
    eyebrow: "Insight",
    title: "Catatan tentang Manajemen & Kinerja Villa",
    description:
      "Perspektif praktis tentang operasional, pendapatan, dan kepemilikan — ditulis untuk pemilik villa yang ingin memahami apa yang sebenarnya dimaksud dengan manajemen yang baik.",
    suggestCta: "Sarankan Topik",
    read: "Baca",
    comingSoon: "Segera hadir",
    note: "Artikel dipublikasikan setelah ditulis dan diverifikasi. KAYANA tidak mempublikasikan konten yang dihasilkan AI atau belum ditinjau sebagai artikel selesai.",
    items: [
      {
        category: "Manajemen Pendapatan",
        title: "Bagaimana Harga Dinamis Membentuk Kinerja Tahunan Villa",
        excerpt:
          "Tinjauan bagaimana permintaan musiman, event lokal, dan perilaku kompetitor membentuk strategi harga yang menjaga okupansi sekaligus tarif.",
        read: "Baca 6 menit",
      },
      {
        category: "Operasional",
        title: "Standar Turnover: Mengapa Persiapan Lebih Utama daripada Kecepatan",
        excerpt:
          "Inti dari rutinitas inspeksi dan persiapan yang membedakan villa yang dikelola profesional dari sewa biasa.",
        read: "Baca 5 menit",
      },
      {
        category: "Untuk Pemilik",
        title: "Apa yang Diharapan dalam Laporan Pemilik Bulanan",
        excerpt:
          "Memahami metrik yang penting — dan yang tidak — saat mengevaluasi kinerja bulanan villa Anda.",
        read: "Baca 7 menit",
      },
    ],
  },
  faq: {
    eyebrow: "Pertanyaan yang Sering Diajukan",
    title: "Jawaban untuk Pemilik Villa",
    description:
      "Pertanyaan yang paling sering diajukan pemilik sebelum bekerja dengan KAYANA. Jika pertanyaan Anda tidak ada di sini, tim kami siap menjawabnya langsung.",
    askCta: "Ajukan Pertanyaan",
    items: [
      {
        q: "Apa saja yang termasuk dalam manajemen villa?",
        a: "KAYANA mengelola reservasi, pendapatan dan harga, komunikasi tamu, housekeeping, koordinasi perawatan, inspeksi properti, dan pelaporan pemilik — mencakup seluruh kehidupan operasional dan komersial villa Anda.",
      },
      {
        q: "Bagaimana KAYANA mengelola Airbnb, Booking.com, dan Agoda?",
        a: "Kami mengoperasikan listing Anda secara langsung atau sebagai co-host, mengoptimalkan konten, harga, ketersediaan, dan pesan di setiap saluran sambil menjaga kalender tetap tersinkronisasi untuk mencegah konflik.",
      },
      {
        q: "Bagaimana Anda mencegah pemesanan ganda?",
        a: "Melalui kalender yang tersinkronisasi dan pendekatan channel manager. Ketersediaan diperbarui di seluruh platform yang terhubung secara real-time, dengan prosedur penanganan reservasi yang menambah lapisan verifikasi manusia.",
      },
      {
        q: "Bagaimana harga villa ditentukan?",
        a: "Harga dibangun dari riset pasar, permintaan musiman, event lokal, properti pembanding, dan target okupansi Anda. Kami menerapkan harga dinamis dan meninjaunya secara berkala, bukan tarif tetap sepanjang tahun.",
      },
      {
        q: "Seberapa sering saya menerima laporan pemilik?",
        a: "Pemilik menerima laporan bulanan terstruktur mencakup pendapatan, okupansi, pengeluaran, dan status operasional. Cakupan dan detail pelaporan menyesuaikan paket manajemen yang Anda pilih.",
      },
      {
        q: "Apakah saya masih bisa menggunakan villa saya sendiri?",
        a: "Tentu. Villa tetap milik Anda. Kami hanya memblokir kalender pada tanggal penggunaan pribadi agar tidak dipesan, dan mengoordinasikan persiapan serta reaktivasi di sekitar kunjungan Anda.",
      },
      {
        q: "Siapa yang menangani perawatan?",
        a: "Tim operasional kami mengoordinasikan perawatan preventif dan reaktif dengan vendor lokal terpercaya — mencakup AC, kolam, taman, listrik, dan perpipaan — serta mengawasi tanggapan darurat.",
      },
      {
        q: "Siapa yang menangani komunikasi tamu?",
        a: "KAYANA mengelola komunikasi tamu di seluruh saluran, dari pesan pra-kedatangan hingga check-in, dukungan saat di lokasi, dan check-out, termasuk manajemen ulasan dan penyelesaian masalah.",
      },
      {
        q: "Bagaimana housekeeping dan laundry dikelola?",
        a: "Melalui jadwal pembersihan, koordinasi linen dan laundry dengan inspeksi mutu setiap pergantian, plus program pembersihan menyeluruh agar villa tetap dalam kondisi prima.",
      },
      {
        q: "Apa yang terjadi saat darurat?",
        a: "Kami mengoordinasikan tanggapan darurat 24/7 untuk tamu dan properti. Tim kami menilai situasi, mengirim vendor yang sesuai, dan terus memberi tahu pemilik untuk hal-hal penting.",
      },
      {
        q: "Bagaimana biaya manajemen bekerja?",
        a: "Solusi manajemen disesuaikan dengan properti dan tujuan Anda. Setelah asesmen, kami menyiapkan proposal transparan mencakup cakupan, struktur biaya, dan pelaporan — tanpa kewajiban untuk melanjutkan.",
      },
      {
        q: "Apakah KAYANA bisa mengelola villa di luar Bali?",
        a: "Basis operasional dan jaringan lokal kami berada di Bali. Jika Anda memiliki properti di tempat lain, kami senang membahas apakah model kami dapat disesuaikan dengan situasi Anda.",
      },
      {
        q: "Bagaimana saya mulai bekerja dengan KAYANA?",
        a: "Mulailah dengan meminta konsultasi melalui formulir kontak atau WhatsApp. Kami akan memahami properti Anda, mengasesmenya, dan menyiapkan proposal manajemen yang disesuaikan untuk Anda tinjau.",
      },
    ],
  },
  contact: {
    eyebrow: "Minta Konsultasi",
    title: "Mari Buka Potensi Villa Anda.",
    description:
      "Ceritakan properti Anda dan tim kami akan menyiapkan pendekatan manajemen yang disesuaikan dengan tujuan Anda.",
    talkTitle: "Bicara langsung dengan KAYANA",
    talkDesc:
      "Ingin langsung berbicara? Hubungi tim kami melalui salah satu saluran di bawah — kami biasanya merespons dalam jam kerja.",
    whatsapp: "WhatsApp",
    email: "Email",
    location: "Lokasi",
    mobileWhatsapp: "Chat KAYANA di WhatsApp",
    form: {
      fullName: "Nama Lengkap",
      whatsappNumber: "Nomor WhatsApp",
      email: "Email",
      villaName: "Nama Villa",
      villaLocation: "Lokasi Villa",
      bedrooms: "Jumlah Kamar Tidur",
      bedroomSuffix: "kamar",
      propertyStatus: "Status Properti",
      managementState: "Situasi Manajemen Saat Ini",
      objective: "Tujuan Utama Pemilik",
      channels: "Saluran Pemesanan Saat Ini",
      message: "Pesan",
      submit: "Minta Konsultasi",
      submitting: "Mengirim...",
      privacyNote:
        "Dengan mengirim, Anda setuju untuk dihubungi oleh KAYANA Villa Management terkait properti Anda. Kami menghormati privasi Anda dan tidak pernah membagikan informasi Anda.",
      successTitle: "Terima kasih — permintaan diterima",
      successMsg:
        "Permintaan konsultasi Anda telah dicatat oleh tim kami. Kami akan menghubungi Anda untuk membahas villa dan menyiapkan proposal manajemen yang disesuaikan.",
      another: "Kirim permintaan lain",
      fullNamePh: "Nama lengkap Anda",
      whatsappPh: "+62 812 ...",
      emailPh: "anda@email.com",
      villaNamePh: "mis. Villa Kayana",
      villaLocationPh: "mis. Canggu, Bali",
      messagePh:
        "Sampaikan apa pun yang membantu kami mempersiapkan diri — tujuan, kekhawatiran, atau jadwal Anda.",
      select: "Pilih",
    },
    bedroomOptions: ["1", "2", "3", "4", "5", "6+"],
    statusOptions: [
      "Sudah beroperasi",
      "Baru dibangun / belum terdaftar",
      "Dalam konstruksi",
      "Perencanaan / belum dibangun",
    ],
    managementOptions: [
      "Dikelola sendiri",
      "Dikelola perusahaan lain",
      "Belum beroperasi",
    ],
    objectiveOptions: [
      "Meningkatkan pendapatan",
      "Mengurangi beban kerja saya",
      "Pengalaman tamu yang lebih baik",
      "Manajemen tanpa pegangan penuh",
      "Meningkatkan kualitas operasional",
      "Lainnya",
    ],
    channelOptions: ["Airbnb", "Booking.com", "Agoda", "Situs langsung", "Belum ada"],
    toastSuccess: "Permintaan diterima",
    toastSuccessDesc: "Tim kami akan segera menghubungi Anda.",
    toastError: "Gagal mengirim permintaan",
    toastErrorDesc: "Silakan coba lagi atau hubungi kami via WhatsApp.",
  },
  finalCta: {
    eyebrow: "Properti Anda Layak Mendapat Manajemen Profesional",
    title:
      "Mari membangun kinerja yang lebih baik, pengalaman tamu yang lebih baik, dan kepemilikan yang lebih baik.",
    desc: "Bicara dengan KAYANA hari ini. Kami akan mengasesmen properti Anda, memahami tujuan Anda, dan menyiapkan pendekatan manajemen yang disesuaikan.",
    primaryCta: "Bicara dengan KAYANA",
    whatsappCta: "Pesan via WhatsApp",
  },
  footer: {
    brandDesc:
      "Manajemen Villa Profesional di Bali. Kami mengelola operasional, pendapatan, dan pengalaman tamu di balik properti Anda — agar kepemilikan tetap bermakna.",
    nav: "Navigasi",
    services: "Layanan",
    contact: "Kontak",
    privacy: "Kebijakan Privasi",
    terms: "Syarat & Ketentuan",
    copyright: "© 2026 KAYANA Villa Management. Seluruh Hak Dilindungi.",
    lastUpdated: "Terakhir diperbarui: Januari 2026 • KAYANA Villa Management, Bali, Indonesia.",
    servicesLinks: [
      "Manajemen Villa",
      "Manajemen Pendapatan",
      "Manajemen Reservasi",
      "Housekeeping",
      "Perawatan",
      "Pengalaman Tamu",
      "Pelaporan Pemilik",
    ],
  },
  whatsapp: {
    cardTitle: "Chat dengan KAYANA",
    cardDesc:
      "Tanyakan tentang manajemen profesional untuk villa Anda di Bali. Kami biasanya merespons dalam jam kerja.",
    startChat: "Mulai Chat WhatsApp",
    ariaLabel: "Chat dengan KAYANA di WhatsApp",
    prefillMessage:
      "Halo KAYANA Villa Management, saya ingin membahas manajemen profesional untuk villa saya di Bali.",
    closeCard: "Tutup kartu chat",
  },
  privacyTitle: "Kebijakan Privasi",
  privacyIntro: "Bagaimana KAYANA Villa Management mengumpulkan, menggunakan, dan melindungi informasi Anda.",
  privacySections: [
    { h: "1. Informasi yang Kami Kumpulkan", p: "Saat Anda meminta konsultasi melalui situs kami, kami mengumpulkan informasi yang Anda berikan — termasuk nama lengkap, nomor WhatsApp, email, dan detail properti yang Anda bagikan. Kami juga dapat mengumpulkan analitik teknis terbatas tentang penggunaan situs." },
    { h: "2. Bagaimana Kami Menggunakan Informasi Anda", p: "Kami menggunakan informasi Anda untuk merespons permintaan, menyiapkan proposal manajemen yang disesuaikan, dan berkomunikasi mengenai layanan kami. Kami tidak menjual informasi pribadi Anda ke pihak ketiga." },
    { h: "3. Berbagi Informasi", p: "Informasi Anda hanya dibagikan kepada anggota tim kami dan penyedia layanan terpercaya yang membantu operasional kami, dan hanya bila diperlukan. Semua pihak diharapkan menjaga kerahasiaan informasi Anda." },
    { h: "4. Penyimpanan Data", p: "Kami menyimpan permintaan konsultasi selama diperlukan untuk merespons Anda dan untuk pencatatan yang wajar. Anda dapat meminta penghapusan informasi Anda kapan saja." },
    { h: "5. Cookies", p: "Situs kami dapat menggunakan cookie esensial dan analitik dasar untuk meningkatkan kinerja dan pengalaman pengguna. Kami tidak menggunakan cookie iklan." },
    { h: "6. Hak Anda", p: "Anda dapat meminta akses, koreksi, atau penghapusan informasi pribadi Anda dengan menghubungi kami melalui detail di bawah." },
    { h: "7. Kontak", p: "Untuk pertanyaan privasi, hubungi kami melalui email atau WhatsApp menggunakan detail yang tertera di situs ini." },
  ],
  termsTitle: "Syarat & Ketentuan",
  termsIntro: "Ketentuan yang mengatur penggunaan situs ini dan layanan kami.",
  termsSections: [
    { h: "1. Layanan", p: "KAYANA Villa Management menyediakan layanan manajemen villa profesional di Bali. Ruang lingkup layanan untuk setiap properti didefinisikan dalam perjanjian manajemen terpisah yang disiapkan setelah asesmen properti dan konsultasi pemilik." },
    { h: "2. Tidak Ada Hasil yang Dijamin", p: "Meskipun KAYANA menerapkan praktik manajemen profesional untuk meningkatkan kinerja properti, kami tidak menjamin angka okupansi, pendapatan, atau hasil ulasan tertentu. Hasil aktual bergantung pada banyak faktor termasuk karakteristik properti, lokasi, musim, dan kondisi pasar." },
    { h: "3. Konten Ilustratif", p: "Angka kinerja, dashboard, atau contoh yang ditampilkan di situs ini bersifat ilustratif dan bukan hasil aktual kecuali dinyatakan secara eksplisit. Gambar properti mungkin merupakan representasi jenis villa yang kami kelola." },
    { h: "4. Permintaan Konsultasi", p: "Mengirim permintaan konsultasi tidak menciptakan hubungan manajemen yang mengikat. Keterlibatan resmi memerlukan perjanjian manajemen yang ditandatangani antara pemilik dan KAYANA." },
    { h: "5. Saluran Pihak Ketiga", p: "Penyebutan Airbnb, Booking.com, Agoda, dan platform lain hanya untuk tujuan deskriptif. Platform tersebut dioperasikan oleh perusahaan independen dengan syarat dan kebijakan mereka sendiri." },
    { h: "6. Batasan Tanggung Jawab", p: "Sejauh diizinkan oleh hukum, KAYANA tidak bertanggung jawab atas kerugian tidak langsung atau konsekuensial akibat penggunaan situs ini. Tanggung jawab kami dalam hubungan manajemen diatur oleh perjanjian manajemen yang berlaku." },
    { h: "7. Hukum yang Berlaku", p: "Ketentuan ini diatur oleh hukum Republik Indonesia. Setiap sengketa tunduk pada yurisdiksi pengadilan yang berwenang di Bali, Indonesia." },
  ],
};

const zh: Partial<Translation> = {
  nav: {
    home: "首页",
    about: "关于我们",
    services: "服务",
    howWeWork: "工作流程",
    portfolio: "案例",
    booking: "预订",
    forOwners: "业主专区",
    insights: "洞察",
    requestConsultation: "预约咨询",
    closeMenu: "关闭菜单",
    openMenu: "打开菜单",
    whatsapp: "WhatsApp 联系",
  },
  langToggle: { en: "EN", id: "ID", zh: "中文", ja: "日本語", ko: "한국어" },
  hero: {
    eyebrow: "专业别墅管理 · 巴厘岛",
    title1: "您的别墅。",
    title2: "我们来管理。",
    subtitle: "专业别墅管理服务,旨在最大化您的物业收益,同时为客人提供卓越的入住体验。",
    supporting: "KAYANA 提供巴厘岛一站式别墅管理解决方案 — 涵盖预订、收益优化、客房清洁、维护、客人服务及业主报告。",
    ctaPrimary: "预约咨询",
    ctaSecondary: "浏览我们的服务",
    trustNote: "印度尼西亚 巴厘岛 · 工作时间内响应",
    scroll: "滚动",
  },
  trust: [
    { title: "全流程管理", text: "运营、预订、客人体验与物业维护,由一支专业团队统一负责。" },
    { title: "以收益为导向", text: "通过策略性定价与分销,提升别墅的运营表现与收益潜力。" },
    { title: "业主透明度", text: "清晰 reporting,让您随时掌握物业的收益、入住率与运营状况。" },
    { title: "本地 expertise", text: "扎根巴厘岛的运营经验,以及值得信赖的本地供应商与渠道网络。" },
  ],
  about: {
    eyebrow: "关于 KAYANA",
    title: "不仅是管理。我们守护您物业的价值。",
    p1: "KAYANA Villa Management 是一家位于巴厘岛的专业物业管理公司,致力于帮助别墅业主高效运营物业、提升收益潜力,并为客人提供卓越的入住体验。",
    p2: "我们的方法融合了酒店业 expertise、运营纪律、收益管理、技术与本地知识。",
    p3: "我们不只是管理预订。我们管理完整的客人旅程,以及您物业背后的运营表现。",
    pillars: ["酒店业 expertise", "运营纪律", "收益管理", "技术与报告", "巴厘岛本地知识"],
    cta: "了解 KAYANA",
    statLabel: "全流程",
    statText: "我们管理完整的客人旅程,以及您物业背后的运营表现。",
  },
  services: {
    eyebrow: "别墅管理服务",
    title1: "您的别墅所需的一切。",
    title2: "一个团队,全部搞定。",
    description: "完整的运营与商业框架 — 让业主无需再自行协调多家供应商、渠道与服务商。",
    learnMore: "了解更多",
    showLess: "收起",
  },
  process: {
    eyebrow: "我们的管理流程",
    title: "从入驻到持续优化。",
    description: "从首次物业评估到持续优化的结构化路径 — 旨在保护价值并随时间提升表现。",
  },
  revenue: {
    eyebrow: "收益与表现",
    title: "以业绩为核心的管理。",
    description: "KAYANA 结合市场洞察、动态定价、入住率分析、季节性策略、OTA 表现、促销与直接预订机会,帮助每处物业实现收益最大化。",
  },
  owners: {
    eyebrow: "业主专区",
    title1: "物业归您所有。",
    title2: "复杂事务交给我们。",
    p1: "拥有别墅,不意味着您需要亲自处理每一笔预订、每一条客人消息、每一次清洁安排、每一个维护问题或每一个定价决策。",
    p2: "KAYANA 负责运营细节,让业主可以专注于更重要的全局 — 同时对物业表现保持完全可见。",
    benefits: ["专业运营", "更优的客人体验", "收益优化", "减轻业主负担", "透明 reporting", "物业保护", "本地运营支持", "一个专业的管理伙伴"],
    cta: "聊聊您的别墅",
    quote: "最好的管理是您几乎察觉不到的那种 — 别宫运转顺畅,客人满意抵达,细节都有人打理。",
    quoteBy: "KAYANA 标准",
    quoteSub: "以设计实现运营卓越",
  },
  packages: {
    eyebrow: "管理套餐",
    title: "根据您的目标定制的管理方案。",
    description: "三套结构化方案,可根据您希望 KAYANA 承担的运营职责多少灵活扩展。每个提案都在物业评估后定制。",
    recommended: "推荐",
    cta: "获取管理方案",
    note: "管理方案根据物业规模、位置、运营需求与业主目标定制。价格在物业评估后通过定制提案提供。",
  },
  portfolio: {
    eyebrow: "我们的物业",
    title: "专业管理的别墅作品集",
    description: "我们管理的每一处物业,都遵循统一的运营与客人体验标准。以下为您展示我们管理的代表性物业。",
    listCta: "登记您的别墅",
    note: "所示物业为 KAYANA 管理的别墅类型代表。完整作品集可应要求提供,并须遵守业主保密约定。",
  },
  guests: {
    eyebrow: "面向客人",
    title: "安心入住",
    description: "当您预订 KAYANA 管理的别墅,您选择的是一处符合专业酒店标准的物业 — 而非听天由命的 listing。",
    points: [
      { title: "专业入住", text: "协调周到的热情迎宾 — 而非随意的钥匙盒。" },
      { title: "清洁就绪的别墅", text: "每处物业在每次抵达前都经过检查与准备。" },
      { title: "快速沟通", text: "在每个渠道上及时回复客人消息。" },
      { title: "本地支持", text: "了解巴厘岛与您所在区域的本地团队。" },
      { title: "维护协助", text: "通过值得信赖的本地供应商快速解决问题。" },
      { title: "精心管理的入住", text: "从头到尾精心设计的客人体验。" },
    ],
    cta: "浏览我们的别墅",
  },
  why: {
    eyebrow: "为什么选择 KAYANA",
    title: "业主为什么选择 KAYANA",
    description: "我们定位为专业的别墅管理与酒店运营公司 — 而非租赁中介。业主选择我们,是因为每一个细节都得到了妥善处理。",
  },
  testimonials: {
    eyebrow: "业主评价",
    title: "巴厘岛业主的信赖之选",
    description: "KAYANA 仅发布经过验证的业主评价 — 并获得明确同意。以下卡片为占位符,待真实评价收集并审核后展示。",
    note: "以上为占位内容。KAYANA 不编造评价、入住率数字或业绩数据。",
  },
  insights: {
    eyebrow: "洞察",
    title: "别墅管理与表现的观察",
    description: "关于运营、收益与所有权的实用视角 — 为希望了解何为优质管理的别墅业主而写。",
    suggestCta: "建议一个话题",
    read: "阅读",
    comingSoon: "即将上线",
    note: "文章在撰写并审核后发布。KAYANA 不会将 AI 生成或未经审核的内容作为成品文章发布。",
  },
  faq: {
    eyebrow: "常见问题",
    title: "业主答疑",
    description: "业主在与 KAYANA 合作前最常问的问题。如果您的问题不在此列,我们的团队很乐意直接解答。",
    askCta: "提问",
  },
  contact: {
    eyebrow: "预约咨询",
    title: "让我们释放您别墅的潜力。",
    description: "告诉我们您的物业情况,我们的团队将为您准备一套量身定制的管理方案。",
    talkTitle: "直接与 KAYANA 沟通",
    talkDesc: "希望立即与人沟通?通过下方任一渠道联系我们的团队 — 我们通常在工作时间内响应。",
    whatsapp: "WhatsApp",
    email: "电子邮件",
    location: "地址",
    mobileWhatsapp: "在 WhatsApp 上与 KAYANA 聊天",
    form: {
      fullName: "姓名",
      whatsappNumber: "WhatsApp 号码",
      email: "电子邮件",
      villaName: "别墅名称",
      villaLocation: "别墅位置",
      bedrooms: "卧室数量",
      bedroomSuffix: "卧室",
      propertyStatus: "物业状态",
      managementState: "当前管理状况",
      objective: "业主主要目标",
      channels: "当前预订渠道",
      message: "留言",
      submit: "预约咨询",
      submitting: "发送中...",
      privacyNote: "提交即表示您同意 KAYANA Villa Management 就您的物业与您联系。我们尊重您的隐私,绝不分享您的信息。",
      successTitle: "感谢您 — 请求已收到",
      successMsg: "您的咨询请求已记录至我们的团队。我们将与您联系,讨论您的别墅并准备定制的管理方案。",
      another: "再提交一个请求",
      fullNamePh: "您的全名",
      whatsappPh: "+62 812 ...",
      emailPh: "you@email.com",
      villaNamePh: "例如 Villa Kayana",
      villaLocationPh: "例如 Canggu, Bali",
      messagePh: "请告诉我们任何有助于准备的信息 — 您的目标、顾虑或时间安排。",
      select: "请选择",
    },
    bedroomOptions: ["1", "2", "3", "4", "5", "6+"],
    statusOptions: ["已运营", "新建/尚未上架", "建设中", "规划/未建"],
    managementOptions: ["自行管理", "由其他公司管理", "尚未运营"],
    objectiveOptions: ["提升收益", "减轻我的负担", "更好的客人体验", "全托管", "提升运营质量", "其他"],
    channelOptions: ["Airbnb", "Booking.com", "Agoda", "自有网站", "暂无"],
    toastSuccess: "请求已收到",
    toastSuccessDesc: "我们的团队将尽快与您联系。",
    toastError: "无法发送请求",
    toastErrorDesc: "请重试或通过 WhatsApp 联系我们。",
  },
  finalCta: {
    eyebrow: "您的物业值得专业管理",
    title: "让我们一起打造更优的业绩、更佳的客人体验与更省心的所有权。",
    desc: "今天就与 KAYANA 交流。我们将评估您的物业、了解您的目标,并为您准备量身定制的管理方案。",
    primaryCta: "与 KAYANA 交流",
    whatsappCta: "在 WhatsApp 上留言",
  },
  footer: {
    brandDesc: "巴厘岛专业别墅管理。我们管理您物业背后的运营、收益与客人体验 — 让业主更省心。",
    nav: "导航",
    services: "服务",
    contact: "联系",
    privacy: "隐私政策",
    terms: "条款与条件",
    copyright: "© 2026 KAYANA Villa Management. 保留所有权利。",
    lastUpdated: "最后更新:2026 年 1 月 · KAYANA Villa Management,印度尼西亚巴厘岛。",
    servicesLinks: ["别墅管理", "收益管理", "预订管理", "客房清洁", "维护", "客人体验", "业主报告"],
  },
  whatsapp: {
    cardTitle: "与 KAYANA 聊天",
    cardDesc: "咨询您巴厘岛别墅的专业管理事宜。我们通常在工作时间内响应。",
    startChat: "开始 WhatsApp 对话",
    ariaLabel: "在 WhatsApp 上与 KAYANA 聊天",
    prefillMessage: "您好 KAYANA Villa Management,我想咨询我在巴厘岛的别墅的专业管理事宜。",
    closeCard: "关闭聊天卡片",
  },
};

const ja: Partial<Translation> = {
  nav: {
    home: "ホーム",
    about: "私たちについて",
    services: "サービス",
    howWeWork: "進め方",
    portfolio: "物件一覧",
    booking: "予約",
    forOwners: "オーナー様へ",
    insights: "インサイト",
    requestConsultation: "相談を依頼",
    closeMenu: "メニューを閉じる",
    openMenu: "メニューを開く",
    whatsapp: "WhatsAppでKAYANAへ",
  },
  langToggle: { en: "EN", id: "ID", zh: "中文", ja: "日本語", ko: "한국어" },
  hero: {
    eyebrow: "プロフェッショナルなヴィラ管理 · バリ",
    title1: "あなたのヴィラ。",
    title2: "私たちの専門性。",
    subtitle: "プロフェッショナルなヴィラ管理は、ゲスト体験を卓越させながら物件のパフォーマンスを最大化するために設計されています。",
    supporting: "KAYANAはバリでのヴィラ管理を一括提供 — 予約、収益最適化、ハウスキーピング、メンテナンス、ゲストサービス、オーナー報告まで。",
    ctaPrimary: "相談を依頼",
    ctaSecondary: "サービスを見る",
    trustNote: "インドネシア バリ · 営業時間内に対応",
    scroll: "スクロール",
  },
  trust: [
    { title: "一元管理", text: "運営、予約、ゲスト体験、物件管理を一つの専門チームにお任せ。" },
    { title: "収益重視", text: "戦略的な価格設定と販売チャネル戦略で、ヴィラのパフォーマンスと収益性を向上。" },
    { title: "オーナーへの透明性", text: "明確な報告と、収益・稼働率・運営状況の可視化。" },
    { title: "ローカルの専門知識", text: "バリを拠点とする運営ノウハウと、信頼できるローカルネットワーク。" },
  ],
  about: {
    eyebrow: "KAYANAについて",
    title: "管理以上のもの。あなたの物件の価値を守ります。",
    p1: "KAYANA Villa Managementはバリを拠点とするプロフェッショナルな物件管理会社です。ヴィラオーナーが物件を効率的に運営し、収益潜力を高め、卓越したゲスト体験を提供できるよう支援します。",
    p2: "私たちのアプローチは、ホスピタリティの専門性、運営の規律、収益管理、テクノロジー、ローカル知識を組み合わせています。",
    p3: "私たちは単に予約を管理しません。ゲストの旅全体と、物件の背後にある運営パフォーマンスを管理します。",
    pillars: ["ホスピタリティの専門性", "運営の規律", "収益管理", "テクノロジーと報告", "バリのローカル知識"],
    cta: "KAYANAを知る",
    statLabel: "一元管理",
    statText: "私たちはゲストの旅全体と、物件の背後にある運営パフォーマンスを管理します。",
  },
  services: {
    eyebrow: "ヴィラ管理サービス",
    title1: "ヴィラに必要なすべて。",
    title2: "一つの管理で。",
    description: "完全な運営とビジネスの枠組み — オーナーが複数のベンダーやチャネルと個別に調整する必要がないよう設計されています。",
    learnMore: "詳しく見る",
    showLess: "閉じる",
  },
  process: {
    eyebrow: "私たちの管理プロセス",
    title: "オンボーディングから継続的な最適化まで。",
    description: "最初の物件評価から継続的な最適化までの構造化された道のり — 価値を守り、パフォーマンスを向上させるために設計されています。",
  },
  revenue: {
    eyebrow: "収益とパフォーマンス",
    title: "パフォーマンスを中心とした管理。",
    description: "KAYANAは市場の把握、動的価格設定、稼働率分析、季節戦略、OTAパフォーマンス、プロモーション、直接予約の機会を組み合わせ、各物件の収益潜力を最大化します。",
  },
  owners: {
    eyebrow: "オーナー様へ",
    title1: "物件はあなたのもの。",
    title2: "複雑なことは私たちが。",
    p1: "ヴィラを所有することは、すべての予約、ゲストメッセージ、清掃スケジュール、メンテナンス、価格設定を自ら管理することを意味しません。",
    p2: "KAYANAが運営の細部を担うことで、オーナーはより大きな全体像に集中できます — 物件のパフォーマンスを完全に可視化しながら。",
    benefits: ["プロフェッショナルな運営", "より良いゲスト体験", "収益最適化", "オーナーの負担軽減", "透明な報告", "物件保護", "ローカル運営サポート", "一つの専門的な管理パートナー"],
    cta: "ヴィラについてご相談",
    quote: "最高の管理とは、ほとんど気づかれないものです — ヴィラは適切に機能し、ゲストは幸せに到着し、細部はすべて処理されています。",
    quoteBy: "KAYANAの基準",
    quoteSub: "設計による運営の卓越性",
  },
  packages: {
    eyebrow: "管理パッケージ",
    title: "あなたの目標に合わせた管理ソリューション。",
    description: "KAYANAに任せる運営責任の範囲に応じて拡張できる3つの構造化フレームワーク。各提案は物件評価後にカスタマイズされます。",
    recommended: "おすすめ",
    cta: "管理提案を依頼",
    note: "管理ソリューションは物件の規模、立地、運営要件、オーナーの目標に応じてカスタマイズされます。価格は物件評価後にカスタム提案でご提示します。",
  },
  portfolio: {
    eyebrow: "物件一覧",
    title: "プロフェッショナル管理のヴィラポートフォリオ",
    description: "私たちが管理するすべての物件は、同じ運営とゲスト体験の基準に従っています。以下は管理物件の代表的なご紹介です。",
    listCta: "ヴィラを登録",
    note: "掲載物件はKAYANAが管理するヴィラのタイプを代表するものです。完全なポートフォリオはオーナーの守秘義務に基づき、ご要望に応じてご提供します。",
  },
  guests: {
    eyebrow: "ゲストの方へ",
    title: "安心してご滞在",
    description: "KAYANA管理のヴィラをご予約いただくということは、プロフェッショナルなホスピタリティ基準を満たした物件を選ぶということです。",
    points: [
      { title: "プロフェッショナルなチェックイン", text: "調整された温かいお出迎え — 任せっぱなしのキーボックスではありません。" },
      { title: "清潔で準備されたヴィラ", text: "毎回の到着前に検査と準備が行われます。" },
      { title: "迅速なコミュニケーション", text: "すべてのチャネルで素早くゲストメッセージに対応。" },
      { title: "ローカルサポート", text: "バリとあなたのエリアを熟知した現地チーム。" },
      { title: "メンテナンス支援", text: "信頼できるローカルベンダーによる迅速な問題解決。" },
      { title: "丁寧に管理された滞在", text: "最初から最後まで設計されたゲスト体験。" },
    ],
    cta: "ヴィラを見る",
  },
  why: {
    eyebrow: "KAYANAを選ぶ理由",
    title: "オーナーがKAYANAを選ぶ理由",
    description: "私たちはプロフェッショナルなヴィラ管理・ホスピタリティ運営会社として位置付けられています — レンタル代理店ではありません。オーナーが私たちと働くのは、細部が処理されているからです。",
  },
  testimonials: {
    eyebrow: "オーナーの声",
    title: "バリのヴィラオーナーから信頼されています",
    description: "KAYANAは確認済みのオーナーの声のみを公開します — 明示的な同意のもとで。以下のカードは、実声を収集・承認するまでのプレースホルダーです。",
    note: "上記はプレースホルダー内容です。KAYANAは声、レビュー、稼働率、業績データを捏造しません。",
  },
  insights: {
    eyebrow: "インサイト",
    title: "ヴィラ管理とパフォーマンスに関するノート",
    description: "運営、収益、所有権に関する実用的な視点 — 良い管理とは何かを理解したいヴィラオーナーに向けて。",
    suggestCta: "トピックを提案",
    read: "読む",
    comingSoon: "近日公開",
    note: "記事は執筆・確認後に公開されます。KAYANAはAI生成や未確認のコンテンツを完成記事として公開しません。",
  },
  faq: {
    eyebrow: "よくある質問",
    title: "ヴィラオーナーへの回答",
    description: "KAYANAとのご契約前にオーナーからよく寄せられる質問です。ここになければ、私たちのチームが直接お答えします。",
    askCta: "質問する",
  },
  contact: {
    eyebrow: "相談を依頼",
    title: "ヴィラの可能性を引き出しましょう。",
    description: "あなたの物件についてお聞かせください。私たちのチームがあなたの目標に合わせた管理アプローチを準備します。",
    talkTitle: "KAYANAと直接お話しください",
    talkDesc: "今すぐ誰かとお話ししたいですか?以下のいずれかの方法でチームにご連絡ください — 営業時間内に対応します。",
    whatsapp: "WhatsApp",
    email: "メール",
    location: "所在地",
    mobileWhatsapp: "WhatsAppでKAYANAとチャット",
    form: {
      fullName: "氏名",
      whatsappNumber: "WhatsApp番号",
      email: "メールアドレス",
      villaName: "ヴィラ名",
      villaLocation: "ヴィラ所在地",
      bedrooms: "寝室数",
      bedroomSuffix: "寝室",
      propertyStatus: "物件ステータス",
      managementState: "現在の管理状況",
      objective: "オーナーの主な目標",
      channels: "現在の予約チャネル",
      message: "メッセージ",
      submit: "相談を依頼",
      submitting: "送信中...",
      privacyNote: "送信により、KAYANA Villa Managementがあなたの物件についてご連絡することに同意したことになります。私たちはあなたのプライバシーを尊重し、情報を共有しません。",
      successTitle: "ありがとうございます — リクエストを受け取りました",
      successMsg: "ご相談リクエストをチームが記録しました。ヴィラについてご連絡し、カスタマイズされた管理提案を準備します。",
      another: "もう一つリクエストを送信",
      fullNamePh: "フルネーム",
      whatsappPh: "+62 812 ...",
      emailPh: "you@email.com",
      villaNamePh: "例: Villa Kayana",
      villaLocationPh: "例: Canggu, Bali",
      messagePh: "準備に役立つ情報をお聞かせください — 目標、ご懸念、スケジュールなど。",
      select: "選択",
    },
    bedroomOptions: ["1", "2", "3", "4", "5", "6+"],
    statusOptions: ["運営中", "新築/未掲載", "建設中", "計画/未建設"],
    managementOptions: ["自主管理", "他社管理", "未運営"],
    objectiveOptions: ["収益向上", "負担軽減", "より良いゲスト体験", "完全一任", "運営品質向上", "その他"],
    channelOptions: ["Airbnb", "Booking.com", "Agoda", "自社サイト", "なし"],
    toastSuccess: "リクエストを受け取りました",
    toastSuccessDesc: "チームがまもなくご連絡します。",
    toastError: "リクエストを送信できません",
    toastErrorDesc: "再試行するか、WhatsAppでご連絡ください。",
  },
  finalCta: {
    eyebrow: "あなたの物件にはプロフェッショナルな管理を",
    title: "より良いパフォーマンス、より良いゲスト体験、より良いオーナーシップを一緒に築きましょう。",
    desc: "今日KAYANAにお話しください。物件を評価し、目標を理解し、あなただけの管理アプローチを準備します。",
    primaryCta: "KAYANAに問い合わせる",
    whatsappCta: "WhatsAppでメッセージ",
  },
  footer: {
    brandDesc: "バリでのプロフェッショナルなヴィラ管理。物件の背後にある運営、収益、ゲスト体験を管理し — オーナーシップを実りあるものに。",
    nav: "ナビゲーション",
    services: "サービス",
    contact: "お問い合わせ",
    privacy: "プライバシーポリシー",
    terms: "利用規約",
    copyright: "© 2026 KAYANA Villa Management. All Rights Reserved.",
    lastUpdated: "最終更新:2026年1月 · KAYANA Villa Management, インドネシア バリ。",
    servicesLinks: ["ヴィラ管理", "収益管理", "予約管理", "ハウスキーピング", "メンテナンス", "ゲスト体験", "オーナー報告"],
  },
  whatsapp: {
    cardTitle: "KAYANAとチャット",
    cardDesc: "バリのヴィラのプロフェッショナル管理についてお問い合わせください。営業時間内に対応します。",
    startChat: "WhatsAppチャットを開始",
    ariaLabel: "WhatsAppでKAYANAとチャット",
    prefillMessage: "KAYANA Villa Managementの皆様、バリにある私のヴィラのプロフェッショナル管理についてご相談したいと思います。",
    closeCard: "チャットカードを閉じる",
  },
};

const ko: Partial<Translation> = {
  nav: {
    home: "홈",
    about: "소개",
    services: "서비스",
    howWeWork: "업무 방식",
    portfolio: "포트폴리오",
    booking: "예약",
    forOwners: "오너 센터",
    insights: "인사이트",
    requestConsultation: "상담 요청",
    closeMenu: "메뉴 닫기",
    openMenu: "메뉴 열기",
    whatsapp: "WhatsApp로 KAYANA에",
  },
  langToggle: { en: "EN", id: "ID", zh: "中文", ja: "日本語", ko: "한국어" },
  hero: {
    eyebrow: "전문 빌라 관리 · 발리",
    title1: "당신의 빌라.",
    title2: "저희의 전문성.",
    subtitle: "전문 빌라 관리는 게스트 경험을 탁월하게 만들면서 자산의 성과를 극대화하도록 설계되었습니다.",
    supporting: "KAYANA는 발리의 엔드투엔드 빌라 관리 솔루션을 제공합니다 — 예약, 수익 최적화, 하우스키핑, 유지보수, 게스트 서비스, 오너 보고까지.",
    ctaPrimary: "상담 요청",
    ctaSecondary: "서비스 둘러보기",
    trustNote: "인도네시아 발리 · 업무 시간 내 응답",
    scroll: "스크롤",
  },
  trust: [
    { title: "통합 관리", text: "운영, 예약, 게스트 경험, 자산 관리를 한 전문 팀에서 통합 처리합니다." },
    { title: "수익 중심", text: "전략적 가격 책정과 배급으로 빌라의 성과와 수익 잠재력을 향상합니다." },
    { title: "오너 투명성", text: "명확한 보고와 자산의 수익, 가동률, 운영 상태에 대한 가시성을 제공합니다." },
    { title: "현지 전문성", text: "발리 기반 운영 노하우와 신뢰할 수 있는 현지 벤더·채널 네트워크." },
  ],
  about: {
    eyebrow: "KAYANA 소개",
    title: "관리 그 이상. 자산의 가치를 지킵니다.",
    p1: "KAYANA Villa Management는 발리 기반의 전문 자산 관리 회사로, 빌라 오너가 자산을 효율적으로 운영하고 수익 잠재력을 높이며 탁월한 게스트 경험을 제공할 수 있도록 돕습니다.",
    p2: "우리의 접근 방식은 호스피탈리티 전문성, 운영 규율, 수익 관리, 기술, 현지 지식을 결합합니다.",
    p3: "우리는 단순히 예약을 관리하지 않습니다. 게스트의 전체 여정과 자산 이면의 운영 성과를 관리합니다.",
    pillars: ["호스피탈리티 전문성", "운영 규율", "수익 관리", "기술과 보고", "발리 현지 지식"],
    cta: "KAYANA 알아보기",
    statLabel: "통합 관리",
    statText: "우리는 게스트의 전체 여정과 자산 이면의 운영 성과를 관리합니다.",
  },
  services: {
    eyebrow: "빌라 관리 서비스",
    title1: "빌라에 필요한 모든 것.",
    title2: "하나의 관리로.",
    description: "완전한 운영과 상업 프레임워크 — 오너가 여러 벤더, 채널, 서비스 제공자를 직접 조율할 필요가 없도록 설계되었습니다.",
    learnMore: "더 알아보기",
    showLess: "접기",
  },
  process: {
    eyebrow: "우리의 관리 프로세스",
    title: "온보딩부터 지속적 최적화까지.",
    description: "최초 자산 평가부터 지속적 최적화까지의 구조화된 경로 — 가치를 보호하고 시간이 지나도 성과를 향상하도록 설계되었습니다.",
  },
  revenue: {
    eyebrow: "수익과 성과",
    title: "성과 중심의 관리.",
    description: "KAYANA는 시장 통찰, 동적 가격 책정, 가동률 분석, 시즌 전략, OTA 성과, 프로모션, 직접 예약 기회를 결합해 각 자산의 수익 잠재력을 극대화합니다.",
  },
  owners: {
    eyebrow: "오너 센터",
    title1: "자산은 당신의 것.",
    title2: "복잡함은 저희가.",
    p1: "빌라를 소유한다고 해서 모든 예약, 게스트 메시지, 청소 일정, 유지보수, 가격 결정을 직접 관리해야 하는 것은 아닙니다.",
    p2: "KAYANA가 운영 세부 사항을 처리하여 오너는 더 큰 그림에 집중할 수 있습니다 — 자산 성과에 대한 완전한 가시성을 유지하면서요.",
    benefits: ["전문 운영", "더 나은 게스트 경험", "수익 최적화", "오너 부담 감소", "투명한 보고", "자산 보호", "현지 운영 지원", "하나의 전문 관리 파트너"],
    cta: "빌라에 대해 상담하기",
    quote: "최고의 관리는 거의 눈에 띄지 않는 관리입니다 — 빌라는 순조롭게 작동하고, 게스트는 행복하게 도착하며, 세부 사항은 모두 처리됩니다.",
    quoteBy: "KAYANA 기준",
    quoteSub: "설계에 의한 운영 우수성",
  },
  packages: {
    eyebrow: "관리 패키지",
    title: "목표에 맞춘 관리 솔루션.",
    description: "KAYANA에 맡기고 싶은 운영 책임의 범위에 따라 확장 가능한 세 가지 구조화된 프레임워크. 모든 제안은 자산 평가 후 맞춤화됩니다.",
    recommended: "추천",
    cta: "관리 제안 요청",
    note: "관리 솔루션은 자산 규모, 위치, 운영 요구사항, 오너 목표에 따라 맞춤화됩니다. 가격은 자산 평가 후 맞춤 제안으로 제공됩니다.",
  },
  portfolio: {
    eyebrow: "우리의 자산",
    title: "전문 관리 빌라 포트폴리오",
    description: "우리가 관리하는 모든 자산은 동일한 운영·게스트 경험 기준을 따릅니다. 아래는 관리 자산의 대표적인 소개입니다.",
    listCta: "빌라 등록",
    note: "표시된 자산은 KAYANA가 관리하는 빌라 유형의 대표입니다. 전체 포트폴리오는 오너 기밀 유지 조건에 따라 요청 시 제공됩니다.",
  },
  guests: {
    eyebrow: "게스트를 위해",
    title: "안심하고 머무르세요",
    description: "KAYANA가 관리하는 빌라를 예약한다는 것은 전문 호스피탈리티 기준을 갖춘 자산을 선택한다는 뜻입니다.",
    points: [
      { title: "전문 체크인", text: "조정된 따뜻한 환영 — 방치된 열쇠함이 아닙니다." },
      { title: "청결하고 준비된 빌라", text: "매 도착 전 검사와 준비가 이루어집니다." },
      { title: "빠른 소통", text: "모든 채널에서 게스트 메시지에 신속히 응답합니다." },
      { title: "현지 지원", text: "발리와 해당 지역을 아는 현지 팀." },
      { title: "유지보수 지원", text: "신뢰할 수 있는 현지 벤더를 통한 신속한 문제 해결." },
      { title: "정성껏 관리된 머무름", text: "처음부터 끝까지 설계된 게스트 경험." },
    ],
    cta: "빌라 둘러보기",
  },
  why: {
    eyebrow: "KAYANA를 선택하는 이유",
    title: "오너가 KAYANA를 선택하는 이유",
    description: "우리는 전문 빌라 관리·호스피탈리티 운영 회사로 자리매김하고 있습니다 — 렌탈 대리점이 아닙니다. 오너가 우리와 일하는 이유는 세부 사항이 처리되기 때문입니다.",
  },
  testimonials: {
    eyebrow: "오너 평가",
    title: "발리 빌라 오너의 신뢰",
    description: "KAYANA는 확인된 오너 평가만 게시합니다 — 명시적 동의와 함께. 아래 카드는 실제 평가가 수집·승인될 때까지의 자리표시자입니다.",
    note: "위 내용은 자리표시자입니다. KAYANA는 평가, 리뷰, 가동률, 성과 수치를 날조하지 않습니다.",
  },
  insights: {
    eyebrow: "인사이트",
    title: "빌라 관리와 성과에 대한 노트",
    description: "운영, 수익, 소유권에 대한 실용적 관점 — 좋은 관리가 무엇인지 이해하려는 빌라 오너를 위해 작성되었습니다.",
    suggestCta: "주제 제안",
    read: "읽기",
    comingSoon: "곧 출시",
    note: "기사는 작성·검토된 후 게시됩니다. KAYANA는 AI 생성 또는 검토되지 않은 콘텐츠를 완성 기사로 게시하지 않습니다.",
  },
  faq: {
    eyebrow: "자주 묻는 질문",
    title: "빌라 오너를 위한 답변",
    description: "KAYANA와 협업 전 오너가 가장 자주 묻는 질문입니다. 여기에 없다면 우리 팀이 직접 답변해 드립니다.",
    askCta: "질문하기",
  },
  contact: {
    eyebrow: "상담 요청",
    title: "빌라의 잠재력을 끌어내 보세요.",
    description: "자산에 대해 알려주시면, 팀이 목표에 맞춘 관리 접근 방식을 준비합니다.",
    talkTitle: "KAYANA와 직접 이야기하세요",
    talkDesc: "지금 누군가와 이야기하고 싶으신가요? 아래 채널 중 하나로 팀에 연락하세요 — 업무 시간 내에 응답합니다.",
    whatsapp: "WhatsApp",
    email: "이메일",
    location: "위치",
    mobileWhatsapp: "WhatsApp에서 KAYANA와 채팅",
    form: {
      fullName: "성함",
      whatsappNumber: "WhatsApp 번호",
      email: "이메일",
      villaName: "빌라 이름",
      villaLocation: "빌라 위치",
      bedrooms: "침실 수",
      bedroomSuffix: "침실",
      propertyStatus: "자산 상태",
      managementState: "현재 관리 상황",
      objective: "오너의 주요 목표",
      channels: "현재 예약 채널",
      message: "메시지",
      submit: "상담 요청",
      submitting: "전송 중...",
      privacyNote: "제출하면 KAYANA Villa Management가 귀하의 자산에 대해 연락하는 것에 동의하게 됩니다. 우리는 귀하의 개인정보를 존중하며 정보를 공유하지 않습니다.",
      successTitle: "감사합니다 — 요청이 접수되었습니다",
      successMsg: "상담 요청이 팀에 기록되었습니다. 빌라에 대해 논의하고 맞춤형 관리 제안을 준비하기 위해 연락드리겠습니다.",
      another: "다른 요청 제출",
      fullNamePh: "전체 성함",
      whatsappPh: "+62 812 ...",
      emailPh: "you@email.com",
      villaNamePh: "예: Villa Kayana",
      villaLocationPh: "예: Canggu, Bali",
      messagePh: "준비에 도움이 될 만한 정보를 알려주세요 — 목표, 우려, 일정 등.",
      select: "선택",
    },
    bedroomOptions: ["1", "2", "3", "4", "5", "6+"],
    statusOptions: ["운영 중", "신규 건축/미등록", "건설 중", "계획/미건축"],
    managementOptions: ["자체 관리", "타사 관리", "미운영"],
    objectiveOptions: ["수익 증대", "업무 부담 감소", "더 나은 게스트 경험", "완전 위탁", "운영 품질 향상", "기타"],
    channelOptions: ["Airbnb", "Booking.com", "Agoda", "직접 웹사이트", "아직 없음"],
    toastSuccess: "요청 접수됨",
    toastSuccessDesc: "팀이 곧 연락드리겠습니다.",
    toastError: "요청을 보낼 수 없습니다",
    toastErrorDesc: "다시 시도하거나 WhatsApp으로 연락해 주세요.",
  },
  finalCta: {
    eyebrow: "자산은 전문 관리를 받을 자격이 있습니다",
    title: "더 나은 성과, 더 나은 게스트 경험, 더 나은 소유권을 함께 만들어요.",
    desc: "오늘 KAYANA와 이야기하세요. 자산을 평가하고, 목표를 이해하며, 맞춤형 관리 접근을 준비합니다.",
    primaryCta: "KAYANA에 문의",
    whatsappCta: "WhatsApp로 메시지",
  },
  footer: {
    brandDesc: "발리의 전문 빌라 관리. 자산 이면의 운영, 수익, 게스트 경험을 관리합니다 — 소유권이 보람 있게.",
    nav: "네비게이션",
    services: "서비스",
    contact: "연락처",
    privacy: "개인정보처리방침",
    terms: "이용약관",
    copyright: "© 2026 KAYANA Villa Management. All Rights Reserved.",
    lastUpdated: "최종 업데이트: 2026년 1월 · KAYANA Villa Management, 인도네시아 발리.",
    servicesLinks: ["빌라 관리", "수익 관리", "예약 관리", "하우스키핑", "유지보수", "게스트 경험", "오너 보고"],
  },
  whatsapp: {
    cardTitle: "KAYANA와 채팅",
    cardDesc: "발리 빌라의 전문 관리에 대해 문의하세요. 업무 시간 내에 응답합니다.",
    startChat: "WhatsApp 채팅 시작",
    ariaLabel: "WhatsApp에서 KAYANA와 채팅",
    prefillMessage: "KAYANA Villa Management 담당자님, 발리에 있는 제 빌라의 전문 관리에 대해 상담하고 싶습니다.",
    closeCard: "채팅 카드 닫기",
  },
};

const ru: Partial<Translation> = {
  nav: {
    home: "Главная",
    about: "О нас",
    services: "Услуги",
    howWeWork: "Как мы работаем",
    portfolio: "Портфолио",
    booking: "Бронирование",
    forOwners: "Владельцам",
    insights: "Статьи",
    requestConsultation: "Запросить консультацию",
    closeMenu: "Закрыть меню",
    openMenu: "Открыть меню",
    whatsapp: "Написать в WhatsApp",
  },
  langToggle: { en: "EN", id: "ID", zh: "中文", ja: "日本語", ko: "한국어", ru: "RU" },
  hero: {
    eyebrow: "Профессиональное управление виллами · Бали",
    title1: "Ваша вилла.",
    title2: "Наша экспертиза.",
    subtitle: "Профессиональное управление виллами, созданное для максимизации доходности вашего объекта и обеспечения превосходного гостевого опыта.",
    supporting: "KAYANA предоставляет комплексные решения по управлению виллами на Бали — от бронирований и оптимизации доходов до уборки, обслуживания, работы с гостями и отчётности для владельцев.",
    ctaPrimary: "Запросить консультацию",
    ctaSecondary: "Посмотреть наши услуги",
    trustNote: "Бали, Индонезия · Отвечаем в рабочее время",
    scroll: "Листайте",
  },
  trust: [
    { title: "Комплексное управление", text: "Эксплуатация, бронирования, гостевой опыт и уход за объектом — в одних руках профессиональной команды." },
    { title: "Ориентация на доход", text: "Стратегическое ценообразование и дистрибуция для повышения эффективности и доходности виллы." },
    { title: "Прозрачность для владельца", text: "Понятная отчётность и полная видимость доходов, загрузки и операционного статуса объекта." },
    { title: "Местная экспертиза", text: "Операционные знания Бали и проверенная сеть местных подрядчиков и каналов продаж." },
  ],
  about: {
    eyebrow: "О KAYANA",
    title: "Больше, чем управление. Мы защищаем ценность вашей недвижимости.",
    p1: "KAYANA Villa Management — балийская компания профессионального управления недвижимостью, помогающая владельцам вилл эффективно управлять объектами, увеличивать доходность и обеспечивать превосходный гостевой опыт.",
    p2: "Наш подход объединяет экспертизу в гостеприимстве, операционную дисциплину, управление доходами, технологии и местное знание.",
    p3: "Мы не просто управляем бронированиями. Мы управляем всем путешествием гостя и операционной эффективностью вашего объекта.",
    pillars: ["Экспертиза в гостеприимстве", "Операционная дисциплина", "Управление доходами", "Технологии и отчётность", "Местное знание Бали"],
    cta: "Узнать о KAYANA",
    statLabel: "Под ключ",
    statText: "Мы управляем всем путешествием гостя и операционной эффективностью вашего объекта.",
  },
  services: {
    eyebrow: "Услуги по управлению виллами",
    title1: "Всё, что нужно вашей вилле.",
    title2: "В одном управлении.",
    description: "Полная операционная и коммерческая база — владельцам больше не нужно самостоятельно координировать множество подрядчиков, каналов и сервисов.",
    learnMore: "Подробнее",
    showLess: "Свернуть",
  },
  process: {
    eyebrow: "Наш процесс управления",
    title: "От подключения к постоянной оптимизации.",
    description: "Структурированный путь от первой оценки объекта до непрерывной оптимизации — для защиты стоимости и роста эффективности с течением времени.",
  },
  revenue: {
    eyebrow: "Доходы и эффективность",
    title: "Управление, ориентированное на результат.",
    description: "KAYANA объединяет понимание рынка, динамическое ценообразование, анализ загрузки, сезонные стратегии, эффективность OTA, акции и возможности прямых продаж для максимизации доходного потенциала каждого объекта.",
  },
  owners: {
    eyebrow: "Владельцам вилл",
    title1: "Объект — ваш.",
    title2: "Сложности — на нас.",
    p1: "Владение виллой не должно означать необходимость лично управлять каждым бронированием, сообщением гостя, графиком уборки, ремонтной задачей или решением по ценообразованию.",
    p2: "KAYANA берёт на себя операционные детали, чтобы владельцы могли сосредоточиться на большем — сохраняя при этом полную видимость эффективности своего объекта.",
    benefits: ["Профессиональные операции", "Лучший гостевой опыт", "Оптимизация доходов", "Снижение нагрузки на владельца", "Прозрачная отчётность", "Защита объекта", "Местная операционная поддержка", "Один профессиональный управляющий партнёр"],
    cta: "Обсудить вашу виллу",
    quote: "Лучшее управление — то, которое вы почти не замечаете: вилла работает исправно, гости приезжают довольными, а детали заботливо улажены.",
    quoteBy: "Стандарт KAYANA",
    quoteSub: "Операционное совершенство по замыслу",
  },
  packages: {
    eyebrow: "Пакеты управления",
    title: "Решения по управлению, адаптированные под ваши цели.",
    description: "Три структурированных пакета, масштабируемых в зависимости от объёма операционной ответственности, который вы хотите передать KAYANA. Каждое предложение индивидуально после оценки объекта.",
    recommended: "Рекомендуем",
    cta: "Запросить предложение",
    note: "Решения по управлению индивидуальны и зависят от размера, расположения, операционных требований и целей владельца. Стоимость предоставляется в индивидуальном предложении после оценки объекта.",
  },
  portfolio: {
    eyebrow: "Наши объекты",
    title: "Портфолио управляемых вилл",
    description: "Каждый объект в нашем управлении поддерживается на едином стандарте операций и гостевого опыта. Ниже — типичные представители нашего портфеля.",
    listCta: "Добавить свою виллу",
    note: "Показанные объекты представляют тип вилл, управляемых KAYANA. Полный портфель доступен по запросу с учётом конфиденциальности владельцев.",
  },
  guests: {
    eyebrow: "Гостям",
    title: "Оставайтесь с уверенностью",
    description: "Бронируя виллу под управлением KAYANA, вы выбираете объект, отвечающий профессиональному гостиничному стандарту — а не объявление, пущенное на самотёк.",
    points: [
      { title: "Профессиональный заезд", text: "Скоординированный тёплый приезд — а не оставленный на удачу ключевой ящик." },
      { title: "Чистая и готовая вилла", text: "Каждый объект проверяется и готовится перед каждым заездом." },
      { title: "Быстрая связь", text: "Оперативные ответы на сообщения гостей во всех каналах." },
      { title: "Местная поддержка", text: "Команда на местах, знающая Бали и ваш район." },
      { title: "Помощь с обслуживанием", text: "Быстрое решение проблем через проверенных местных подрядчиков." },
      { title: "Заботливо организованное пребывание", text: "Гостевой опыт, продуманный от начала до конца." },
    ],
    cta: "Посмотреть наши виллы",
  },
  why: {
    eyebrow: "Почему KAYANA",
    title: "Почему владельцы выбирают KAYANA",
    description: "Мы позиционируемся как профессиональная компания по управлению виллами и гостиничными операциями — а не как агентство аренды. Владельцы работают с нами, потому что все детали улажены.",
  },
  testimonials: {
    eyebrow: "Отзывы владельцев",
    title: "Доверие владельцев вилл на Бали",
    description: "KAYANA публикует только проверенные отзывы владельцев — с явного согласия. Карточки ниже — заглушки, пока реальные отзывы не собраны и не одобрены.",
    note: "Выше представлен контент-заглушка. KAYANA не фабрикует отзывы, рейтинги, данные загрузки или показатели эффективности.",
  },
  insights: {
    eyebrow: "Статьи",
    title: "Заметки об управлении виллами и эффективности",
    description: "Практические взгляды на операции, доходы и владение — для владельцев вилл, желающих понимать, что такое хорошее управление на самом деле.",
    suggestCta: "Предложить тему",
    read: "Читать",
    comingSoon: "Скоро",
    note: "Статьи публикуются по мере написания и проверки. KAYANA не выпускает сгенерированный ИИ или непроверенный контент как готовые статьи.",
  },
  faq: {
    eyebrow: "Частые вопросы",
    title: "Ответы для владельцев вилл",
    description: "Наиболее частые вопросы владельцев до начала работы с KAYANA. Если вашего вопроса нет — команда с радостью ответит напрямую.",
    askCta: "Задать вопрос",
  },
  contact: {
    eyebrow: "Запросить консультацию",
    title: "Раскроем потенциал вашей виллы.",
    description: "Расскажите об объекте, и наша команда подготовит подход к управлению, адаптированный под ваши цели.",
    talkTitle: "Свяжитесь с KAYANA напрямую",
    talkDesc: "Хотите поговорить прямо сейчас? Обратитесь к нашей команде через любой из каналов ниже — обычно отвечаем в рабочее время.",
    whatsapp: "WhatsApp",
    email: "Эл. почта",
    location: "Локация",
    mobileWhatsapp: "Чат с KAYANA в WhatsApp",
    form: {
      fullName: "Полное имя",
      whatsappNumber: "Номер WhatsApp",
      email: "Эл. почта",
      villaName: "Название виллы",
      villaLocation: "Расположение виллы",
      bedrooms: "Количество спален",
      bedroomSuffix: "спальня",
      propertyStatus: "Статус объекта",
      managementState: "Текущая ситуация с управлением",
      objective: "Главная цель владельца",
      channels: "Текущие каналы бронирования",
      message: "Сообщение",
      submit: "Запросить консультацию",
      submitting: "Отправка...",
      privacyNote: "Отправляя форму, вы соглашаетесь, что KAYANA Villa Management свяжется с вами по вашему объекту. Мы уважаем вашу конфиденциальность и не передаём ваши данные третьим лицам.",
      successTitle: "Спасибо — запрос принят",
      successMsg: "Ваш запрос на консультацию зафиксирован нашей командой. Мы свяжемся с вами, чтобы обсудить виллу и подготовить индивидуальное предложение по управлению.",
      another: "Отправить ещё один запрос",
      fullNamePh: "Ваше полное имя",
      whatsappPh: "+62 812 ...",
      emailPh: "you@email.com",
      villaNamePh: "напр. Villa Kayana",
      villaLocationPh: "напр. Canggu, Bali",
      messagePh: "Расскажите всё, что поможет нам подготовиться — цели, опасения или сроки.",
      select: "Выбрать",
    },
    bedroomOptions: ["1", "2", "3", "4", "5", "6+"],
    statusOptions: ["Уже эксплуатируется", "Новая / не размещена", "В стадии строительства", "Планирование / ещё не построена"],
    managementOptions: ["Самостоятельное управление", "Управляется другой компанией", "Пока не эксплуатируется"],
    objectiveOptions: ["Увеличить доход", "Снизить нагрузку", "Лучший гостевой опыт", "Полное управление под ключ", "Повысить качество операций", "Другое"],
    channelOptions: ["Airbnb", "Booking.com", "Agoda", "Свой сайт", "Пока нет"],
    toastSuccess: "Запрос принят",
    toastSuccessDesc: "Команда скоро свяжется с вами.",
    toastError: "Не удалось отправить запрос",
    toastErrorDesc: "Попробуйте снова или напишите нам в WhatsApp.",
  },
  finalCta: {
    eyebrow: "Ваш объект заслуживает профессионального управления",
    title: "Давайте вместе построим лучшие результаты, лучший гостевой опыт и лучшее владение.",
    desc: "Поговорите с KAYANA сегодня. Мы оценим ваш объект, поймём ваши цели и подготовим подход к управлению, созданный для вас.",
    primaryCta: "Поговорить с KAYANA",
    whatsappCta: "Написать в WhatsApp",
  },
  footer: {
    brandDesc: "Профессиональное управление виллами на Бали. Мы ведём операции, доходы и гостевой опыт вашего объекта — чтобы владение оставалось в удовольствие.",
    nav: "Навигация",
    services: "Услуги",
    contact: "Контакты",
    privacy: "Политика конфиденциальности",
    terms: "Условия использования",
    copyright: "© 2026 KAYANA Villa Management. Все права защищены.",
    lastUpdated: "Последнее обновление: январь 2026 · KAYANA Villa Management, Бали, Индонезия.",
    servicesLinks: ["Управление виллами", "Управление доходами", "Управление бронированиями", "Уборка", "Обслуживание", "Гостевой опыт", "Отчётность владельцам"],
  },
  whatsapp: {
    cardTitle: "Чат с KAYANA",
    cardDesc: "Спросите о профессиональном управлении вашей виллой на Бали. Обычно отвечаем в рабочее время.",
    startChat: "Начать чат в WhatsApp",
    ariaLabel: "Чат с KAYANA в WhatsApp",
    prefillMessage: "Здравствуйте, KAYANA Villa Management, я хотел бы обсудить профессиональное управление моей виллой на Бали.",
    closeCard: "Закрыть карточку чата",
  },
};

export const translations: Record<Lang, Translation | Partial<Translation>> = {
  en,
  id,
  zh,
  ja,
  ko,
  ru,
};

/** Default language for first-time visitors. */
export const defaultLang: Lang = "en";
