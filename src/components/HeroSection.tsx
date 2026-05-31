"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import { ArrowDown, Code2, Sparkles, MapPin } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/BrandIcons";
import { profile } from "@/lib/profile";

const roles = [
  ".NET Developer",
  "Full Stack Engineer",
  "Freelancer",
  "Product Builder",
  "Tech Innovator",
];

export default function HeroSection() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = roles[roleIndex];
    const speed = isDeleting ? 40 : 80;

    if (!isDeleting && displayText === current) {
      setTimeout(() => setIsDeleting(true), 2000);
      return;
    }

    if (isDeleting && displayText === "") {
      setIsDeleting(false);
      setRoleIndex((prev) => (prev + 1) % roles.length);
      return;
    }

    const timer = setTimeout(() => {
      setDisplayText(
        isDeleting
          ? current.slice(0, displayText.length - 1)
          : current.slice(0, displayText.length + 1)
      );
    }, speed);

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, roleIndex]);

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden pt-28 pb-16"
    >
      {/* Animated orbs */}
      <div className="floating-orb w-96 h-96 bg-[#475569] -top-20 -left-20 animate-float" />
      <div className="floating-orb w-80 h-80 bg-[#475569] -bottom-20 -right-20 animate-float-delayed" />
      <div className="floating-orb w-64 h-64 bg-[#64748B] top-1/3 right-1/4 animate-float" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Text */}
          <div className="text-center lg:text-left order-2 lg:order-1">
            <motion.div
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="mb-6"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full gradient-ring text-sm text-slate-600 shadow-sm">
                <Sparkles size={14} className="text-[#475569]" />
                Available for Freelancing
                <span className="relative flex w-2 h-2">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-[#475569] opacity-60 animate-ping" />
                  <span className="relative inline-flex w-2 h-2 rounded-full bg-[#475569]" />
                </span>
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-5xl md:text-7xl font-bold leading-tight mb-6"
            >
              <span className="text-slate-900">Hi, I&apos;m </span>
              <span className="gradient-text">Kishan</span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl md:text-3xl font-light text-slate-600 mb-5 h-10 flex items-center justify-center lg:justify-start"
            >
              <Code2 className="inline mr-2 text-[#475569]" size={28} />
              <span className="text-slate-900 font-medium">{displayText}</span>
              <span className="inline-block w-0.5 h-7 bg-[#475569] ml-1 animate-pulse" />
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-lg text-slate-500 max-w-xl mx-auto lg:mx-0 mb-10"
            >
              6+ years of building enterprise solutions. Creator of{" "}
              <span className="text-[#475569] font-semibold">FlexYPDF</span> &{" "}
              <span className="text-[#475569] font-semibold">MunafaLab</span>.
              Turning ideas into powerful digital products.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <motion.a
                href="#projects"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-gradient inline-flex items-center justify-center px-8 py-4 rounded-full font-semibold text-lg"
              >
                <span>View My Work</span>
              </motion.a>
              <motion.a
                href="#about"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 rounded-full gradient-ring glass-hover text-slate-800 font-semibold text-lg"
              >
                Know More About Me
              </motion.a>
            </motion.div>

            {/* Verifiable profiles + trust line */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
              className="mt-8 flex flex-col sm:flex-row sm:items-center gap-4 justify-center lg:justify-start"
            >
              <div className="flex items-center gap-3">
                <motion.a
                  href={profile.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Kishan Patel on GitHub"
                  whileHover={{ scale: 1.1, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-11 h-11 rounded-full glass glass-hover flex items-center justify-center text-slate-700 hover:text-slate-900"
                >
                  <GithubIcon size={20} />
                </motion.a>
                <motion.a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Kishan Patel on LinkedIn"
                  whileHover={{ scale: 1.1, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-11 h-11 rounded-full glass glass-hover flex items-center justify-center text-slate-700 hover:text-[#334155]"
                >
                  <LinkedinIcon size={20} />
                </motion.a>
              </div>
              <span className="text-sm text-slate-500 flex items-center gap-1.5">
                <MapPin size={14} className="text-[#475569]" />
                Based in {profile.location} · Replies within 24 hours
              </span>
            </motion.div>
          </div>

          {/* Right: Photo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.3, ease: "easeOut" }}
            className="relative order-1 lg:order-2 flex justify-center"
          >
            <div className="relative w-[300px] h-[380px] sm:w-[360px] sm:h-[460px] lg:w-[420px] lg:h-[520px]">
              {/* Decorative floating accent dots */}
              <span className="absolute -top-2 right-12 w-3 h-3 rounded-full bg-gradient-to-br from-[#475569] to-[#64748B] shadow-lg shadow-slate-400/40 animate-float" />
              <span className="absolute bottom-24 -right-3 w-2 h-2 rounded-full bg-[#64748B] shadow-md shadow-slate-400/40 animate-float-delayed" />
              <span className="absolute top-28 -left-3 w-2.5 h-2.5 rounded-full bg-[#475569] shadow-md shadow-slate-400/40 animate-float" />

              {/* Soft gradient glow behind everything */}
              <div className="shaped absolute -inset-4 rounded-[42%_58%_58%_42%] bg-gradient-to-br from-[#475569] via-[#64748B] to-[#475569] opacity-50 blur-3xl animate-float-delayed" />

              {/* The gradient shape — acts as a thin frame around the photo */}
              <div className="shaped absolute inset-0 rounded-[42%_58%_58%_42%] bg-gradient-to-br from-[#475569] via-[#64748B] to-[#475569] shadow-2xl shadow-slate-400/30 animate-float-delayed" />

              {/* The photo — clipped to the same gradient shape so it sits inside it */}
              <div className="shaped group absolute inset-[6px] rounded-[42%_58%_58%_42%] overflow-hidden animate-float-delayed">
                <Image
                  src="/profile.png"
                  alt="Kishan Patel"
                  fill
                  priority
                  sizes="(max-width: 1024px) 360px, 420px"
                  className="object-cover object-center select-none grayscale-[70%] brightness-95 contrast-105 transition-all duration-700 ease-out group-hover:grayscale-0 group-hover:brightness-105 group-hover:contrast-100 group-hover:scale-105"
                />
                {/* Subtle color tint overlay that fades out on hover */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#475569]/20 to-[#475569]/20 mix-blend-overlay transition-opacity duration-700 group-hover:opacity-0" />
              </div>

              {/* Floating stat cards */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.6 }}
                className="absolute -left-2 bottom-10 gradient-ring shadow-xl rounded-2xl px-4 py-3 text-left"
              >
                <div className="text-2xl font-bold gradient-text">6+</div>
                <div className="text-xs text-slate-500">Years Experience</div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2, duration: 0.6 }}
                className="absolute -right-2 top-16 gradient-ring shadow-xl rounded-2xl px-4 py-3 text-left"
              >
                <div className="text-2xl font-bold gradient-text">2</div>
                <div className="text-xs text-slate-500">SaaS Products</div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {[
            { value: "6+", label: "Years Experience" },
            { value: "50+", label: "Projects Delivered" },
            { value: "2", label: "Products Built" },
            { value: "15+", label: "Technologies" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-3xl md:text-4xl font-bold gradient-text">
                {stat.value}
              </div>
              <div className="text-sm text-slate-500 mt-1">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center gap-2 text-slate-400"
        >
          <span className="text-xs tracking-widest uppercase">Scroll Down</span>
          <ArrowDown size={16} />
        </motion.div>
      </motion.div>
    </section>
  );
}
