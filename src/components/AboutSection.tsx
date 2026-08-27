"use client";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import {
  MapPin,
  Briefcase,
  Heart,
  Target,
  Zap,
  Server,
  Rocket,
} from "lucide-react";
import { projectStats } from "@/lib/projects";

const highlights = [
  {
    icon: <Briefcase size={20} />,
    title: "Professional Developer",
    desc: "6+ years as a .NET Developer building enterprise-grade applications",
    color: "#c2410c",
  },
  {
    icon: <Rocket size={20} />,
    title: "Product Builder",
    desc: `Creator of ${projectStats.total}+ live products — FlexyPdf, MunafaLab, ScriptProof and a whole suite of platforms`,
    color: "#0e7466",
  },
  {
    icon: <Server size={20} />,
    title: "Full-Stack Operator",
    desc: "I run my own VPS infrastructure — Nginx, PM2, CI/CD pipelines and DNS for every product I ship",
    color: "#4338ca",
  },
  {
    icon: <Target size={20} />,
    title: "Freelance Partner",
    desc: "Helping businesses ship real products — from event studios to electrical contractors to fintech tools",
    color: "#be185d",
  },
];

const interests = [
  "Software Architecture",
  "System Design",
  "Cloud Computing",
  "AI & Machine Learning",
  "Entrepreneurship",
  "Open Source",
  "UI/UX Design",
  "DevOps",
];

export default function AboutSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="relative py-28 overflow-hidden">
      <div className="blob-orb w-72 h-72 bg-[#ffd0ab] top-20 -right-20" />

      <div className="max-w-7xl mx-auto px-6" ref={ref}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <span className="section-label mb-4">Get to Know Me</span>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight">
            About <span className="italic text-[#c2410c] marker">me.</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left: Photo + Info */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* Photo */}
            <div className="relative w-64 h-72 mx-auto lg:mx-0 mb-10">
              <div className="absolute inset-0 translate-x-3 translate-y-3 rounded-[20px] bg-[#ffe1cb] border-[1.5px] border-[#1c1917]" />
              <div className="relative w-full h-full rounded-[20px] overflow-hidden border-2 border-[#1c1917] shadow-[6px_6px_0_rgba(28,25,23,0.9)] rotate-[-2deg] hover:rotate-0 transition-transform duration-500">
                <Image
                  src="/profile.png"
                  alt="Kishan Patel"
                  fill
                  sizes="256px"
                  className="object-cover object-top select-none"
                />
              </div>
              <div className="absolute -bottom-4 -right-2 sticker px-4 py-2 text-sm font-bold text-[#1c1917]">
                <MapPin size={14} className="text-[#c2410c]" /> India
              </div>
            </div>

            <p className="font-[family-name:var(--font-fraunces)] text-2xl text-[#1c1917] leading-snug mb-6">
              I turn ideas into <span className="italic text-[#c2410c]">real,
              shipped products</span> — not just demos.
            </p>
            <p className="text-[#57534e] text-lg leading-relaxed mb-5">
              I&apos;m <span className="font-semibold text-[#1c1917]">Kishan</span>,
              a software developer with over{" "}
              <span className="font-semibold text-[#1c1917] marker-soft">
                6 years of experience
              </span>{" "}
              in the .NET ecosystem. My journey started with curiosity about how
              software works, and it grew into a career of building robust,
              scalable applications.
            </p>
            <p className="text-[#57534e] text-lg leading-relaxed">
              Beyond the day job, I&apos;ve built an entire suite of{" "}
              <span className="font-semibold text-[#1c1917]">
                {projectStats.total}+ live products
              </span>{" "}
              — from FlexyPdf and MunafaLab to ScriptProof, B2B marketplaces,
              analytics dashboards and client websites — all running on
              infrastructure I manage myself.
            </p>
          </motion.div>

          {/* Right: Highlights */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-5"
          >
            {highlights.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.5 + i * 0.15 }}
                className="card card-hover p-6 group cursor-default"
              >
                <div className="flex items-start gap-4">
                  <div
                    className="grid place-items-center w-12 h-12 rounded-xl border-[1.5px] border-[#1c1917] shrink-0 transition-transform duration-500 group-hover:-rotate-6"
                    style={{ background: `${item.color}18`, color: item.color }}
                  >
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="font-[family-name:var(--font-fraunces)] text-lg font-bold text-[#1c1917] mb-1">
                      {item.title}
                    </h3>
                    <p className="text-[#57534e] text-[15px]">{item.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Interests */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-20"
        >
          <div className="flex items-center gap-3 mb-8">
            <Heart size={20} className="text-[#c2410c]" />
            <h3 className="text-2xl font-bold">Interests &amp; Passions</h3>
          </div>
          <div className="flex flex-wrap gap-4">
            {interests.map((interest, i) => (
              <motion.span
                key={interest}
                initial={{ opacity: 0, scale: 0.8, rotate: -4 }}
                animate={inView ? { opacity: 1, scale: 1, rotate: i % 2 ? 1.5 : -1.5 } : {}}
                transition={{ duration: 0.4, delay: 0.9 + i * 0.07 }}
                whileHover={{ rotate: 0, scale: 1.06 }}
                className="chip px-5 py-2.5 text-sm font-medium text-[#1c1917] cursor-default"
              >
                {interest}
              </motion.span>
            ))}
          </div>
        </motion.div>

        {/* Quick Facts */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1 }}
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {[
            {
              icon: <Zap size={22} />,
              title: "What Drives Me",
              desc: "Building products that solve real problems and creating value through technology",
              color: "#c2410c",
            },
            {
              icon: <Target size={22} />,
              title: "My Goal",
              desc: "To be the single engineer a business can trust with its entire product — design to deployment",
              color: "#0e7466",
            },
            {
              icon: <Rocket size={22} />,
              title: "My Vision",
              desc: "Combining corporate experience with an entrepreneurial mindset to deliver exceptional results",
              color: "#4338ca",
            },
          ].map((fact, i) => (
            <motion.div
              key={fact.title}
              whileHover={{ rotate: i % 2 ? 1 : -1 }}
              className="card card-hover p-7 text-center"
            >
              <div
                className="grid place-items-center w-12 h-12 rounded-full border-[1.5px] border-[#1c1917] mx-auto mb-4"
                style={{ background: `${fact.color}18`, color: fact.color }}
              >
                {fact.icon}
              </div>
              <h4 className="font-[family-name:var(--font-fraunces)] font-bold text-[#1c1917] mb-2 text-lg">
                {fact.title}
              </h4>
              <p className="text-[#57534e] text-sm leading-relaxed">{fact.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
