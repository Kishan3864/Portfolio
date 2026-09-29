import type { Metadata } from "next";
import { Geist, Geist_Mono, Fraunces } from "next/font/google";
import "./globals.css";
import {
  featuredProjects,
  flagshipNames,
  projectCountLabel,
} from "@/lib/projects";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Editorial serif for headings — the voice of the paper-and-ink design.
const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

// Shared blurb — the count and the flagship names both follow the projects data.
const blurb = `6+ years experienced .NET Developer and Full Stack Engineer. Builder of ${projectCountLabel} live products & platforms including ${flagshipNames}.`;

export const metadata: Metadata = {
  title: "Kishan Patel | .NET Developer & Product Builder",
  description: `Portfolio of Kishan Patel — ${blurb} Available for freelancing.`,
  keywords: [
    "Kishan Patel",
    ".NET Developer",
    "Full Stack Developer",
    "Freelancer",
    ...featuredProjects.map((p) => p.name),
    "C#",
    "ASP.NET",
    "Next.js",
    "Portfolio",
  ],
  // Author link points to a real, verifiable LinkedIn profile.
  authors: [
    {
      name: "Kishan Patel",
      url: "https://www.linkedin.com/in/kishanwebdeveloper",
    },
  ],
  creator: "Kishan Patel",
  publisher: "Kishan Patel",
  category: "technology",
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  openGraph: {
    title: "Kishan Patel | .NET Developer & Product Builder",
    description: blurb,
    siteName: "Kishan Patel — Portfolio",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kishan Patel | .NET Developer & Product Builder",
    description: blurb,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${fraunces.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col paper-bg">{children}</body>
    </html>
  );
}
