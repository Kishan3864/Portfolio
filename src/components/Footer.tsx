"use client";
import { motion } from "framer-motion";
import { Heart, ArrowUp, Mail, ArrowUpRight } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/BrandIcons";
import { profile } from "@/lib/profile";
import { projects } from "@/lib/projects";

const socials = [
  { name: "GitHub", url: profile.github, icon: <GithubIcon size={18} /> },
  { name: "LinkedIn", url: profile.linkedin, icon: <LinkedinIcon size={18} /> },
  { name: "Email", url: `mailto:${profile.email}`, icon: <Mail size={18} /> },
];

const exploreLinks = [
  { name: "About", href: "#about" },
  { name: "Journey", href: "#journey" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#contact" },
];

const productLinks = projects
  .filter((p) => p.category === "product")
  .map((p) => ({ name: p.name, url: p.url }));

const clientLinks = projects
  .filter((p) => p.category === "client")
  .map((p) => ({ name: p.name, url: p.url }));

export default function Footer() {
  return (
    <footer className="relative bg-[#1c1917] text-[#d6d3d1] border-t-[3px] border-[#e4580b] overflow-hidden">
      {/* Big CTA band */}
      <div className="max-w-7xl mx-auto px-6 pt-16 pb-12 border-b border-[#fffdf7]/10">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
          <div>
            <p className="font-mono text-xs tracking-[0.32em] uppercase text-[#ff9d5c] mb-4">
              Next project?
            </p>
            <h2 className="font-[family-name:var(--font-fraunces)] text-4xl md:text-6xl font-bold text-[#fffdf7] tracking-tight">
              Let&apos;s work{" "}
              <span className="italic text-[#ff9d5c]">together.</span>
            </h2>
          </div>
          <a
            href="#contact"
            className="btn-shape-alt inline-flex items-center gap-2 px-8 py-4 bg-[#e4580b] text-[#fffdf7] font-bold text-lg border-[1.5px] border-[#fffdf7]/20 hover:bg-[#ff6a1f] hover:-translate-y-1 transition-all shrink-0 w-fit"
          >
            Start a Conversation
            <ArrowUpRight size={20} />
          </a>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Link columns */}
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr_1fr] mb-12">
          <div>
            <a href="#home" className="inline-flex items-center gap-2.5 mb-4">
              <span className="grid place-items-center w-9 h-9 rounded-lg bg-[#e4580b] text-[#fffdf7] text-sm font-extrabold">
                {profile.initials}
              </span>
              <span className="font-[family-name:var(--font-fraunces)] text-lg font-bold text-[#fffdf7]">
                Kishan <span className="italic text-[#ff9d5c]">Patel</span>
              </span>
            </a>
            <p className="text-sm text-[#a8a29e] leading-relaxed max-w-xs">
              .NET Developer &amp; Product Builder. {projects.length}+ live
              products, platforms and client websites — designed, built and
              operated end-to-end.
            </p>

            <div className="flex items-center gap-3 mt-6">
              {socials.map((s) => (
                <motion.a
                  key={s.name}
                  href={s.url}
                  target={s.url.startsWith("mailto:") ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  aria-label={`${profile.name} on ${s.name}`}
                  whileHover={{ y: -3, rotate: -4 }}
                  whileTap={{ scale: 0.9 }}
                  className="grid place-items-center w-10 h-10 rounded-full border border-[#fffdf7]/25 text-[#d6d3d1] hover:text-[#fffdf7] hover:border-[#e4580b] hover:bg-[#e4580b]/20 transition-colors"
                >
                  {s.icon}
                </motion.a>
              ))}
            </div>
          </div>

          <div>
            <p className="font-mono text-xs tracking-[0.28em] uppercase text-[#ff9d5c] mb-4">
              Explore
            </p>
            <ul className="space-y-2.5">
              {exploreLinks.map((l) => (
                <li key={l.name}>
                  <a
                    href={l.href}
                    className="text-sm text-[#a8a29e] hover:text-[#fffdf7] link-draw transition-colors"
                  >
                    {l.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-mono text-xs tracking-[0.28em] uppercase text-[#ff9d5c] mb-4">
              Products
            </p>
            <ul className="space-y-2.5">
              {productLinks.map((p) => (
                <li key={p.name}>
                  <a
                    href={p.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-[#a8a29e] hover:text-[#fffdf7] link-draw transition-colors"
                  >
                    {p.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-mono text-xs tracking-[0.28em] uppercase text-[#ff9d5c] mb-4">
              Client Work
            </p>
            <ul className="space-y-2.5">
              {clientLinks.map((p) => (
                <li key={p.name}>
                  <a
                    href={p.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-[#a8a29e] hover:text-[#fffdf7] link-draw transition-colors"
                  >
                    {p.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-[#fffdf7]/10">
          <div className="flex items-center gap-2 text-[#a8a29e] text-sm">
            <span>Built with</span>
            <Heart size={14} className="text-[#e4580b] animate-pulse" />
            <span>
              by{" "}
              <span className="text-[#fffdf7] font-medium">{profile.name}</span>
            </span>
          </div>

          <p className="text-xs text-[#78716c]">
            &copy; {new Date().getFullYear()} {profile.name}. All rights reserved.
          </p>

          <motion.button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Back to top"
            className="grid place-items-center w-10 h-10 rounded-full border border-[#fffdf7]/25 text-[#d6d3d1] hover:text-[#fffdf7] hover:border-[#e4580b] transition-colors"
          >
            <ArrowUp size={18} />
          </motion.button>
        </div>
      </div>
    </footer>
  );
}
