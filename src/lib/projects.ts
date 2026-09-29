import type { ComponentType } from "react";
import {
  FileText,
  TrendingUp,
  ShieldCheck,
  Coins,
  Code2,
  Package,
  MapPin,
  Users,
  Rocket,
  Sparkles,
  Utensils,
  Zap,
  Heart,
} from "lucide-react";

// Every live deployment on the Hostinger VPS, verified against its real URL.
// One record per project so the Projects section, footer and metadata always
// agree on names, links and descriptions.

type IconType = ComponentType<{ size?: number | string; className?: string }>;

export type ProjectCategory = "product" | "platform" | "client";

export interface Project {
  name: string;
  tagline: string;
  url: string;
  host: string;
  description: string;
  tags: string[];
  category: ProjectCategory;
  icon: IconType;
  accent: string;
  status: "Live" | "In Development" | "Private Beta";
  featured?: boolean;
}

export const categoryLabels: Record<ProjectCategory | "all", string> = {
  all: "All Work",
  product: "SaaS Products",
  platform: "Platforms & Dashboards",
  client: "Client Websites",
};

export const projects: Project[] = [
  // ---------- Flagship SaaS products ----------
  {
    name: "FlexyPdf",
    tagline: "140+ free online PDF, image & developer tools",
    url: "https://flexypdf.com",
    host: "flexypdf.com",
    description:
      "A privacy-first toolbox of 140+ browser-based utilities — PDF editing, conversion, merging and compression, image tools with AI upscaling, code formatters, SEO helpers and calculators. Files are processed locally in the browser, with no uploads and no account required.",
    tags: ["Next.js", "Client-side Processing", "SEO", "140+ Tools"],
    category: "product",
    icon: FileText,
    accent: "#4338ca",
    status: "Live",
    featured: true,
  },
  {
    name: "MunafaLab",
    tagline: "Indian personal-finance research & education",
    url: "https://munafalab.com",
    host: "munafalab.com",
    description:
      "An independent finance publication for Indian retail investors — credit cards, mutual funds, gold, government schemes and tax saving, all verified against SEBI, RBI and AMFI primary sources, with a weekly newsletter and quarterly content refreshes.",
    tags: ["Content Platform", "Newsletter", "SEO", "Fintech"],
    category: "product",
    icon: TrendingUp,
    accent: "#0e7466",
    status: "Live",
    featured: true,
  },
  {
    name: "ScriptProof",
    tagline: "Payment-page script monitoring for PCI DSS",
    url: "https://pci.flexypdf.com",
    host: "pci.flexypdf.com",
    description:
      "A compliance SaaS that monitors checkout-page JavaScript and security headers, fingerprints every script with SHA-256, alerts on tampering and generates auditor-ready evidence packs for PCI DSS requirements 6.4.3 and 11.6.1.",
    tags: ["Security", "PCI DSS", "Monitoring", "SaaS"],
    category: "product",
    icon: ShieldCheck,
    accent: "#0e7490",
    status: "Live",
    featured: true,
  },
  {
    name: "Gold Rate Calculator",
    tagline: "Live 22K & 24K gold prices across India",
    url: "https://gold.flexypdf.com",
    host: "gold.flexypdf.com",
    description:
      "A real-time gold price tracker for Indian cities with a full jewellery cost calculator — purity from 10K to 24K, weight in grams, tola or troy ounces, wastage, making charges and GST, all computed instantly in the browser.",
    tags: ["Live Rates", "Calculator", "India", "Utility"],
    category: "product",
    icon: Coins,
    accent: "#b45309",
    status: "Live",
  },
  {
    name: "Nexbyte",
    tagline: "My software studio — web, SaaS & APIs end-to-end",
    url: "https://company.flexypdf.com",
    host: "company.flexypdf.com",
    description:
      "The studio behind all of this work. Nexbyte offers full-stack development, SaaS builds, API and database engineering, cloud deployment and consulting — every project engineered end-to-end by one senior developer.",
    tags: [".NET Core", "Next.js", "Azure", "Consulting"],
    category: "product",
    icon: Code2,
    accent: "#7c3aed",
    status: "Live",
  },

  // ---------- Platforms & dashboards ----------
  {
    name: "DropShip",
    tagline: "B2B marketplace connecting suppliers & dropshippers",
    url: "https://dropship.flexypdf.com",
    host: "dropship.flexypdf.com",
    description:
      "A three-sided B2B platform where suppliers list wholesale inventory, dropshippers import products into branded storefronts, and admins handle verification and disputes — with automated order, margin and payment tracking.",
    tags: ["Marketplace", "Multi-role", "E-commerce", "B2B"],
    category: "platform",
    icon: Package,
    accent: "#be185d",
    status: "In Development",
  },
  {
    name: "Leadpin",
    tagline: "Local business leads from Google Places",
    url: "https://map.flexypdf.com",
    host: "map.flexypdf.com",
    description:
      "A lead-generation platform that sources local business leads from Google Places, with search and filtering, lead export, team assignment and a two-tier admin/rep access model for sales teams.",
    tags: ["Google Places API", "Lead Gen", "Sales Teams"],
    category: "platform",
    icon: MapPin,
    accent: "#0369a1",
    status: "Private Beta",
  },
  {
    name: "Recruitment Suite",
    tagline: "Hiring & staffing platform with admin console",
    url: "https://recruitment.flexypdf.com",
    host: "recruitment.flexypdf.com",
    description:
      "A complete recruitment-agency platform — permanent hiring, 48-hour contract staffing, executive search and RPO — with a candidate network front-end and a separate admin console for managing the full hiring pipeline.",
    tags: ["HR Tech", "Admin Console", "Multi-tenant"],
    category: "platform",
    icon: Users,
    accent: "#1d4ed8",
    status: "Live",
  },
  {
    name: "Upward",
    tagline: "Career acceleration for tech professionals",
    url: "https://upward.flexypdf.com",
    host: "upward.flexypdf.com",
    description:
      "A career-coaching platform for ambitious tech professionals — resume and LinkedIn rewrites, 1-on-1 coaching, mock interviews and a structured 12-week placement process aimed at landing a signed offer in 2–4 months.",
    tags: ["Coaching", "Landing Page", "Conversion"],
    category: "platform",
    icon: Rocket,
    accent: "#be123c",
    status: "Live",
  },

  // ---------- Client websites ----------
  {
    name: "Empire Event",
    tagline: "Wedding & event planners — Surat, Gujarat",
    url: "https://empireevent.org",
    host: "empireevent.org",
    description:
      "Full digital presence for a real event-management studio: destination weddings across 40+ locations, corporate productions and milestone celebrations — backed by a custom event-ERP and API I built for their operations.",
    tags: ["Client Work", "Custom ERP", "Event API"],
    category: "client",
    icon: Sparkles,
    accent: "#a21caf",
    status: "Live",
  },
  {
    name: "Martin's Tavern",
    tagline: "Historic Georgetown restaurant — est. 1933",
    url: "https://martinstavern.flexypdf.com",
    host: "martinstavern.flexypdf.com",
    description:
      "A website build for Washington D.C.'s oldest family-owned restaurant — Resy reservations, full digital menus, a historical timeline (including JFK's proposal in Booth 3), private events and gallery.",
    tags: ["Restaurant", "Reservations", "Website Build"],
    category: "client",
    icon: Utensils,
    accent: "#92400e",
    status: "Live",
  },
  {
    name: "Nassif Electric",
    tagline: "Licensed electrical contractor — South Florida",
    url: "https://wallynassif.flexypdf.com",
    host: "wallynassif.flexypdf.com",
    description:
      "Business website for a Florida statewide-licensed electrical contractor operating since 1976 — residential, commercial and industrial services, project portfolio, and an online service-request pipeline.",
    tags: ["Contractor", "Lead Capture", "Website Build"],
    category: "client",
    icon: Zap,
    accent: "#c2410c",
    status: "Live",
  },
  {
    name: "Nassif 50th Anniversary",
    tagline: "Celebrating 50 years · 1976–2026",
    url: "https://anniversary.flexypdf.com",
    host: "anniversary.flexypdf.com",
    description:
      "A commemorative microsite marking 50 years of Wally Nassif Electrical Contracting — brand storytelling, milestone history and service highlights for the company's golden anniversary.",
    tags: ["Microsite", "Branding", "Storytelling"],
    category: "client",
    icon: Heart,
    accent: "#b91c1c",
    status: "Live",
  },
];

export const featuredProjects = projects.filter((p) => p.featured);
export const gridProjects = projects.filter((p) => !p.featured);

export const projectStats = {
  total: projects.length,
  live: projects.filter((p) => p.status === "Live").length,
  products: projects.filter((p) => p.category === "product").length,
  platforms: projects.filter((p) => p.category === "platform").length,
  clients: projects.filter((p) => p.category === "client").length,
};
