"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { ArrowDown, Code2, Sparkles } from "lucide-react";

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
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Animated orbs */}
      <div className="floating-orb w-96 h-96 bg-[#6C63FF] -top-20 -left-20 animate-float" />
      <div className="floating-orb w-80 h-80 bg-[#00D4AA] -bottom-20 -right-20 animate-float-delayed" />
      <div className="floating-orb w-64 h-64 bg-[#FF6B6B] top-1/3 right-1/4 animate-float" />

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-6"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm text-gray-300 mb-8">
            <Sparkles size={14} className="text-[#00D4AA]" />
            Available for Freelancing
            <span className="w-2 h-2 rounded-full bg-[#00D4AA] animate-pulse" />
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-5xl md:text-7xl lg:text-8xl font-bold leading-tight mb-6"
        >
          <span className="text-white">Hi, I&apos;m </span>
          <span className="gradient-text">Kishan</span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-xl md:text-3xl font-light text-gray-400 mb-4 h-10"
        >
          <Code2 className="inline mr-2 text-[#6C63FF]" size={28} />
          <span className="text-white">{displayText}</span>
          <span className="inline-block w-0.5 h-7 bg-[#6C63FF] ml-1 animate-pulse" />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-lg md:text-xl text-gray-500 max-w-2xl mx-auto mb-10"
        >
          6+ years of building enterprise solutions. Creator of{" "}
          <span className="text-[#00D4AA]">FlexYPDF</span> &{" "}
          <span className="text-[#6C63FF]">MunafaLab</span>. Turning ideas
          into powerful digital products.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <motion.a
            href="#projects"
            whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(108, 99, 255, 0.4)" }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 rounded-full bg-gradient-to-r from-[#6C63FF] to-[#00D4AA] text-white font-semibold text-lg"
          >
            View My Work
          </motion.a>
          <motion.a
            href="#about"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 rounded-full glass glass-hover text-white font-semibold text-lg"
          >
            Know More About Me
          </motion.a>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6"
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
              <div className="text-sm text-gray-500 mt-1">{stat.label}</div>
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
          className="flex flex-col items-center gap-2 text-gray-500"
        >
          <span className="text-xs tracking-widest uppercase">Scroll Down</span>
          <ArrowDown size={16} />
        </motion.div>
      </motion.div>
    </section>
  );
}
