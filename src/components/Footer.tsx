"use client";
import { motion } from "framer-motion";
import { Heart, ArrowUp, Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/BrandIcons";
import { profile } from "@/lib/profile";

const socials = [
  { name: "GitHub", url: profile.github, icon: <GithubIcon size={18} />, hover: "hover:text-slate-900" },
  { name: "LinkedIn", url: profile.linkedin, icon: <LinkedinIcon size={18} />, hover: "hover:text-[#0A66C2]" },
  { name: "Email", url: `mailto:${profile.email}`, icon: <Mail size={18} />, hover: "hover:text-[#DB2777]" },
];

export default function Footer() {
  return (
    <footer className="relative py-12 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2 text-slate-500 text-sm">
            <span>Built with</span>
            <Heart size={14} className="text-[#DB2777] animate-pulse" />
            <span>
              by{" "}
              <span className="text-slate-900 font-medium">{profile.name}</span>
            </span>
          </div>

          {/* Verifiable social profiles */}
          <div className="flex items-center gap-3">
            {socials.map((s) => (
              <motion.a
                key={s.name}
                href={s.url}
                target={s.url.startsWith("mailto:") ? undefined : "_blank"}
                rel="noopener noreferrer"
                aria-label={`${profile.name} on ${s.name}`}
                whileHover={{ scale: 1.1, y: -3 }}
                whileTap={{ scale: 0.9 }}
                className={`w-10 h-10 rounded-full glass flex items-center justify-center text-slate-600 transition-colors ${s.hover}`}
              >
                {s.icon}
              </motion.a>
            ))}
          </div>

          <div className="flex items-center gap-6 text-sm text-slate-500">
            {profile.products.map((p) => (
              <a
                key={p.name}
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#4F46E5] transition-colors"
              >
                {p.name}
              </a>
            ))}
          </div>

          <motion.button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            whileHover={{ scale: 1.1, y: -3 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Back to top"
            className="w-10 h-10 rounded-full glass flex items-center justify-center text-slate-600 hover:text-slate-900 transition-colors"
          >
            <ArrowUp size={18} />
          </motion.button>
        </div>

        <div className="glow-line mt-8" />

        <p className="text-center text-xs text-slate-400 mt-6">
          &copy; {new Date().getFullYear()} {profile.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
