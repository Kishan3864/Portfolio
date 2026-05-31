"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";
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

// Stagger the bar's contents in on first paint.
const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06, delayChildren: 0.2 } },
};
const item: Variants = {
  hidden: { opacity: 0, y: -10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
};

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    let ticking = false;

    const update = () => {
      ticking = false;
      setScrolled(window.scrollY > 24);

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

  // Lock body scroll while the mobile menu is open.
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 90, damping: 18 }}
        className={`fixed top-0 inset-x-0 z-50 bg-white transition-shadow duration-500 ${
          scrolled
            ? "border-b border-slate-200 shadow-[0_8px_30px_-16px_rgba(15,23,42,0.4)]"
            : "border-b border-slate-100"
        }`}
      >
        {/* Top gradient hairline — the only color accent on the bar edge */}
        <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-[#475569] via-[#64748B] to-[#475569]" />

        <motion.nav
          variants={container}
          initial="hidden"
          animate="show"
          className="max-w-7xl mx-auto px-5 sm:px-6"
        >
          <div className="flex items-center justify-between h-16">
            {/* Brand */}
            <motion.a
              variants={item}
              href="#home"
              className="group flex items-center gap-2.5 shrink-0"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="relative grid place-items-center w-9 h-9 btn-gradient text-white text-sm font-extrabold tracking-tight">
                <span className="relative z-[2]">{profile.initials}</span>
              </span>
              <span className="hidden sm:flex flex-col leading-none">
                <span className="text-[15px] font-bold text-slate-900">
                  Kishan <span className="gradient-text">Patel</span>
                </span>
                <span className="text-[9.5px] tracking-[0.2em] uppercase text-slate-400 mt-0.5">
                  .NET · Product Builder
                </span>
              </span>
            </motion.a>

            {/* Desktop links */}
            <motion.div variants={item} className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => {
                const isActive = activeSection === link.href.slice(1);
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    className={`relative px-3.5 py-2 text-[13px] font-medium transition-colors duration-300 ${
                      isActive
                        ? "text-slate-900"
                        : "text-slate-500 hover:text-slate-900"
                    }`}
                  >
                    <span className={isActive ? "gradient-text font-semibold" : ""}>
                      {link.name}
                    </span>
                    {isActive && (
                      <motion.span
                        layoutId="navUnderline"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                        className="absolute left-2.5 right-2.5 -bottom-[2px] h-[2.5px] bg-gradient-to-r from-[#475569] via-[#64748B] to-[#475569]"
                      />
                    )}
                  </a>
                );
              })}
            </motion.div>

            {/* Right cluster */}
            <motion.div variants={item} className="flex items-center gap-1 sm:gap-1.5 shrink-0">
              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Kishan Patel on GitHub"
                className="hidden sm:grid place-items-center w-9 h-9 text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors"
              >
                <GithubIcon size={17} />
              </a>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Kishan Patel on LinkedIn"
                className="hidden sm:grid place-items-center w-9 h-9 text-slate-500 hover:text-[#334155] hover:bg-slate-100 transition-colors"
              >
                <LinkedinIcon size={17} />
              </a>

              <motion.a
                href="#contact"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="btn-gradient hidden sm:inline-flex items-center gap-1.5 px-5 py-2.5 ml-1 text-[13px] font-semibold"
              >
                <span>Hire Me</span>
                <ArrowUpRight size={15} className="relative z-[2]" />
              </motion.a>

              {/* Mobile toggle */}
              <button
                className="lg:hidden grid place-items-center w-10 h-10 text-slate-900 hover:bg-slate-100 transition-colors"
                onClick={() => setMobileOpen((v) => !v)}
                aria-label={mobileOpen ? "Close menu" : "Open menu"}
              >
                {mobileOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </motion.div>
          </div>
        </motion.nav>
      </motion.header>

      {/* Mobile overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 lg:hidden flex flex-col items-center justify-center gap-7 bg-white"
            style={{
              backgroundImage:
                "radial-gradient(rgba(71,85,105,0.16) 1.4px, transparent 1.5px), radial-gradient(60vw 60vw at 100% 0%, rgba(71,85,105,0.14), transparent 60%), radial-gradient(60vw 60vw at 0% 100%, rgba(100,116,139,0.12), transparent 60%)",
              backgroundSize: "30px 30px, 100% 100%, 100% 100%",
            }}
          >
            {navLinks.map((link, i) => {
              const isActive = activeSection === link.href.slice(1);
              return (
                <motion.a
                  key={link.name}
                  href={link.href}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 12 }}
                  transition={{ delay: 0.08 + i * 0.07 }}
                  onClick={() => setMobileOpen(false)}
                  className={`text-3xl font-bold transition-colors ${
                    isActive
                      ? "gradient-text"
                      : "text-slate-800 hover:text-[#475569]"
                  }`}
                >
                  {link.name}
                </motion.a>
              );
            })}

            <motion.a
              href="#contact"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.08 + navLinks.length * 0.07 }}
              onClick={() => setMobileOpen(false)}
              className="btn-gradient mt-2 inline-flex items-center gap-2 px-8 py-3.5 text-base font-semibold"
            >
              <span>Hire Me</span>
              <ArrowUpRight size={18} className="relative z-[2]" />
            </motion.a>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 + navLinks.length * 0.07 }}
              className="flex items-center gap-3 mt-4"
            >
              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Kishan Patel on GitHub"
                className="grid place-items-center w-12 h-12 border border-slate-200 text-slate-700 hover:text-slate-900 hover:border-[#475569]/40 transition-colors"
              >
                <GithubIcon size={22} />
              </a>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Kishan Patel on LinkedIn"
                className="grid place-items-center w-12 h-12 border border-slate-200 text-slate-700 hover:text-[#334155] hover:border-[#334155]/40 transition-colors"
              >
                <LinkedinIcon size={22} />
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
