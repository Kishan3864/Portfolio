import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Kishan Patel | .NET Developer & Product Builder",
  description:
    "Portfolio of Kishan Patel — 6+ years experienced .NET Developer, Full Stack Engineer, and creator of FlexYPDF & MunafaLab. Available for freelancing.",
  keywords: [
    "Kishan Patel",
    ".NET Developer",
    "Full Stack Developer",
    "Freelancer",
    "FlexYPDF",
    "MunafaLab",
    "C#",
    "ASP.NET",
    "Portfolio",
  ],
  authors: [{ name: "Kishan Patel" }],
  openGraph: {
    title: "Kishan Patel | .NET Developer & Product Builder",
    description:
      "6+ years experienced .NET Developer, Full Stack Engineer, and creator of FlexYPDF & MunafaLab.",
    type: "website",
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
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col noise-bg">{children}</body>
    </html>
  );
}
