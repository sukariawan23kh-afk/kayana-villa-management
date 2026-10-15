import type { LucideIcon } from "lucide-react";
import {
  TrendingUp,
  ConciergeBell,
  Sparkles,
  Wrench,
  Megaphone,
  ClipboardList,
  ShieldCheck,
  LineChart,
  Users,
  Building2,
  CalendarCheck,
  Banknote,
  MapPin,
  Star,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/* TRUST STRIP                                                        */
/* ------------------------------------------------------------------ */
export const trustPillars = [
  {
    icon: Building2,
    title: "End-to-End Management",
    text: "Operations, reservations, guest experience and property care handled under one professional team.",
  },
  {
    icon: LineChart,
    title: "Revenue Focused",
    text: "Strategic pricing and distribution designed to improve villa performance and earning potential.",
  },
  {
    icon: ShieldCheck,
    title: "Owner Transparency",
    text: "Clear reporting and visibility into your property's revenue, occupancy and operational status.",
  },
  {
    icon: MapPin,
    title: "Local Expertise",
    text: "Bali-based operational knowledge and trusted local networks across vendors and channels.",
  },
] as const;

/* ------------------------------------------------------------------ */
/* SERVICES                                                           */
/* ------------------------------------------------------------------ */
export interface Service {
  index: string;
  icon: LucideIcon;
  title: string;
  description: string;
  features: string[];
}

export const services: Service[] = [
  {
    index: "01",
    icon: TrendingUp,
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
    index: "02",
    icon: ConciergeBell,
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
    index: "03",
    icon: Sparkles,
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
    index: "04",
    icon: Wrench,
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
    index: "05",
    icon: Megaphone,
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
    index: "06",
    icon: ClipboardList,
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
];

/* ------------------------------------------------------------------ */
/* MANAGEMENT PROCESS                                                 */
/* ------------------------------------------------------------------ */
export interface ProcessStep {
  index: string;
  title: string;
  text: string;
}

export const processSteps: ProcessStep[] = [
  {
    index: "01",
    title: "Property Assessment",
    text: "We inspect the villa, review its condition, inventory, amenities, operational readiness, and market positioning.",
  },
  {
    index: "02",
    title: "Strategy & Onboarding",
    text: "We establish management standards, pricing strategy, operating procedures, and owner requirements.",
  },
  {
    index: "03",
    title: "Listing & Distribution",
    text: "We optimize the property's online presence across relevant booking channels.",
  },
  {
    index: "04",
    title: "Revenue Activation",
    text: "We implement pricing, availability, promotions, and distribution strategies.",
  },
  {
    index: "05",
    title: "Daily Operations",
    text: "We coordinate reservations, guests, housekeeping, maintenance, and property readiness.",
  },
  {
    index: "06",
    title: "Quality Control",
    text: "We conduct inspections and continuously monitor guest experience and operational standards.",
  },
  {
    index: "07",
    title: "Performance Reporting",
    text: "Owners receive structured reports covering revenue, occupancy, expenses, and property performance.",
  },
  {
    index: "08",
    title: "Continuous Optimization",
    text: "We continuously improve pricing, marketing, operations, and guest experience.",
  },
];

/* ------------------------------------------------------------------ */
/* REVENUE / KPI                                                      */
/* ------------------------------------------------------------------ */
export interface Kpi {
  icon: LucideIcon;
  label: string;
  abbr?: string;
  text: string;
}

export const kpis: Kpi[] = [
  {
    icon: CalendarCheck,
    label: "Occupancy",
    text: "Track booking performance across every channel.",
  },
  {
    icon: Banknote,
    label: "ADR",
    abbr: "Average Daily Rate",
    text: "Monitor average daily rate and pricing effectiveness.",
  },
  {
    icon: LineChart,
    label: "RevPAR",
    abbr: "Revenue Per Available Room",
    text: "Measure revenue performance relative to availability.",
  },
  {
    icon: TrendingUp,
    label: "Revenue",
    text: "Track monthly and yearly performance trends.",
  },
  {
    icon: Users,
    label: "Booking Sources",
    text: "Understand where reservations originate.",
  },
  {
    icon: Star,
    label: "Guest Reviews",
    text: "Monitor guest satisfaction and review performance.",
  },
];

/**
 * Illustrative dashboard data — clearly labeled as illustrative, not
 * real performance figures. Used only to demonstrate the reporting concept.
 */
export const dashboardSeries = {
  revenue: [
    { month: "Jan", value: 62 },
    { month: "Feb", value: 58 },
    { month: "Mar", value: 71 },
    { month: "Apr", value: 74 },
    { month: "May", value: 69 },
    { month: "Jun", value: 82 },
    { month: "Jul", value: 94 },
    { month: "Aug", value: 97 },
    { month: "Sep", value: 86 },
    { month: "Oct", value: 78 },
    { month: "Nov", value: 83 },
    { month: "Dec", value: 96 },
  ],
  sources: [
    { name: "Airbnb", value: 38, color: "var(--tropical)" },
    { name: "Booking.com", value: 31, color: "var(--bronze)" },
    { name: "Agoda", value: 14, color: "var(--tropical-deep)" },
    { name: "Direct", value: 12, color: "var(--bronze-light)" },
    { name: "Repeat", value: 5, color: "oklch(0.6 0.03 60)" },
  ],
};

/* ------------------------------------------------------------------ */
/* MANAGEMENT PACKAGES                                                */
/* ------------------------------------------------------------------ */
export interface Package {
  name: string;
  tagline: string;
  description: string;
  features: string[];
  featured?: boolean;
}

export const packages: Package[] = [
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
    featured: true,
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
];

/* ------------------------------------------------------------------ */
/* PORTFOLIO                                                          */
/* ------------------------------------------------------------------ */
export interface Villa {
  name: string;
  location: string;
  bedrooms: number;
  type: string;
  description: string;
  image: string;
  featured?: boolean;
}

/**
 * Placeholder properties — clearly labeled. Replace with the real managed
 * portfolio through the future CMS / admin dashboard.
 */
export const villas: Villa[] = [
  {
    name: "KAYANA Residence",
    location: "Umalas, Bali",
    bedrooms: 3,
    type: "Private Pool Villa",
    description:
      "Contemporary tropical residence with open-plan living, lush gardens and a calm private pool.",
    image:
      "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/cfb2b38ab9e4.jpg",
    featured: true,
  },
  {
    name: "The Berawa Pavilion",
    location: "Berawa, Bali",
    bedrooms: 4,
    type: "Pavilion Villa",
    description:
      "Light-filled pavilion living overlooking a sunlit pool, steps from Berawa's beach and cafés.",
    image:
      "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/54f183983d89.jpg",
  },
  {
    name: "Canggu Garden Villa",
    location: "Canggu, Bali",
    bedrooms: 2,
    type: "Garden Villa",
    description:
      "Intimate two-bedroom villa wrapped in tropical greenery with a relaxed outdoor lounge.",
    image:
      "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/1159ad5563fe.jpg",
  },
  {
    name: "Seminyak Suite Villa",
    location: "Seminyak, Bali",
    bedrooms: 5,
    type: "Luxury Villa",
    description:
      "Spacious five-bedroom retreat with designer interiors, infinity pool and sunset rooftop access.",
    image:
      "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/0c858682603b.jpg",
  },
  {
    name: "Pererenan Retreat",
    location: "Pererenan, Bali",
    bedrooms: 3,
    type: "Retreat Villa",
    description:
      "Serene retreat villa blending warm timber, natural stone and an expansive outdoor pavilion.",
    image:
      "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/0fa50c0f3aa3.jpg",
  },
  {
    name: "Ubud Riverside Villa",
    location: "Ubud, Bali",
    bedrooms: 4,
    type: "Jungle Villa",
    description:
      "Riverside jungle villa with panoramic greenery, a curved infinity pool and quiet luxury interiors.",
    image:
      "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/ff9df85e6919.jpg",
  },
];

/* ------------------------------------------------------------------ */
/* WHY KAYANA                                                         */
/* ------------------------------------------------------------------ */
export const whyKayana = [
  {
    title: "Local Expertise",
    text: "Deep understanding of Bali's hospitality environment, regulations and trusted vendor networks.",
  },
  {
    title: "Professional Operations",
    text: "Structured standard operating procedures for daily villa operations and quality control.",
  },
  {
    title: "Revenue Mindset",
    text: "Management decisions are directly connected to your property's performance.",
  },
  {
    title: "Transparent Reporting",
    text: "Owners receive clear operational and financial information on a regular schedule.",
  },
  {
    title: "Guest-Centric Service",
    text: "Guest satisfaction directly contributes to reviews, repeat bookings and property performance.",
  },
  {
    title: "Long-Term Property Care",
    text: "We focus not only on today's booking, but also on maintaining the property's long-term value.",
  },
] as const;

/* ------------------------------------------------------------------ */
/* OWNER BENEFITS                                                     */
/* ------------------------------------------------------------------ */
export const ownerBenefits = [
  "Professional operations",
  "Better guest experience",
  "Revenue optimization",
  "Reduced owner workload",
  "Transparent reporting",
  "Property protection",
  "Local operational support",
  "One professional management partner",
] as const;

/* ------------------------------------------------------------------ */
/* FAQ                                                                */
/* ------------------------------------------------------------------ */
export const faqs = [
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
];
