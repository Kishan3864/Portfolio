"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/BrandIcons";
import { profile } from "@/lib/profile";

const navLinks = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Journey", href: "#journey" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    let ticking = false;

    const update = () => {
      ticking = false;
      setScrolled(window.scrollY > 50);

      const sections = navLinks.map((l) => l.href.slice(1));
      for (const id of [...sections].reverse()) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top < 200) {
          setActiveSection(id);
          break;
        }
      }
    };

    // Coalesce scroll events into one rAF tick to avoid layout thrashing.
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "glass py-3"
            : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <motion.a
            href="#home"
            className="text-2xl font-bold gradient-text"
            whileHover={{ scale: 1.05 }}
          >
            {profile.initials}
          </motion.a>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <motion.a
                key={link.name}
                href={link.href}
                className={`relative text-sm tracking-wide transition-colors ${
                  activeSection === link.href.slice(1)
                    ? "text-[#4F46E5]"
                    : "text-slate-600 hover:text-slate-900"
                }`}
                whileHover={{ y: -2 }}
              >
                {link.name}
                {activeSection === link.href.slice(1) && (
                  <motion.div
                    layoutId="navIndicator"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#4F46E5] rounded-full"
                  />
                )}
              </motion.a>
            ))}
            <div className="flex items-center gap-3 pl-2 border-l border-slate-200">
              <motion.a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Kishan Patel on GitHub"
                whileHover={{ y: -2 }}
                className="text-slate-500 hover:text-slate-900 transition-colors"
              >
                <GithubIcon size={18} />
              </motion.a>
              <motion.a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Kishan Patel on LinkedIn"
                whileHover={{ y: -2 }}
                className="text-slate-500 hover:text-[#0A66C2] transition-colors"
              >
                <LinkedinIcon size={18} />
              </motion.a>
            </div>
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-5 py-2 rounded-full bg-gradient-to-r from-[#4F46E5] to-[#0D9488] text-white text-sm font-medium"
            >
              Hire Me
            </motion.a>
          </div>

          <button
            className="md:hidden text-slate-900"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25 }}
            className="fixed inset-0 z-40 bg-[#F4F6FB]/98 flex flex-col items-center justify-center gap-8"
          >
            {navLinks.map((link, i) => (
              <motion.a
                key={link.name}
                href={link.href}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="text-3xl font-bold text-slate-900 hover:text-[#4F46E5] transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                {link.name}
              </motion.a>
            ))}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: navLinks.length * 0.1 }}
              className="flex items-center gap-6 mt-6"
            >
              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Kishan Patel on GitHub"
                className="text-slate-600 hover:text-slate-900 transition-colors"
              >
                <GithubIcon size={26} />
              </a>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Kishan Patel on LinkedIn"
                className="text-slate-600 hover:text-[#0A66C2] transition-colors"
              >
                <LinkedinIcon size={26} />
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
