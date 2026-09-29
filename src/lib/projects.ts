import type { ComponentType } from "react";
import {
  FileText,
  MapPin,
  Users,
  Rocket,
  Sparkles,
  Utensils,
  Heart,
} from "lucide-react";

// Every live deployment on the Hostinger VPS, verified against its real URL.
// One record per project so the Projects section, footer and metadata always
// agree on names, links and descriptions. Only projects that are actually live
// belong here — when one goes down it is removed, not left in as "In Development".

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
  status: "Live";
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

  // ---------- Platforms & dashboards ----------
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
    status: "Live",
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
    featured: true,
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
    featured: true,
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

// "FlexyPdf, Recruitment Suite and Upward"
function joinNames(names: string[]): string {
  if (names.length <= 1) return names.join("");
  return `${names.slice(0, -1).join(", ")} and ${names[names.length - 1]}`;
}

// Prose helpers so no section hardcodes a count or a project name — both
// follow the data above.
export const projectCountLabel = `${projects.length}+`;
export const flagshipNames = joinNames(featuredProjects.map((p) => p.name));

