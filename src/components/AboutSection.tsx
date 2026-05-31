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
  Coffee,
  Rocket,
} from "lucide-react";

const highlights = [
  {
    icon: <Briefcase size={20} />,
    title: "Professional Developer",
    desc: "6+ years as a .NET Developer building enterprise-grade applications",
    color: "#475569",
  },
  {
    icon: <Rocket size={20} />,
    title: "Product Builder",
    desc: "Created FlexYPDF & MunafaLab — my own SaaS products for passive income",
    color: "#475569",
  },
  {
    icon: <Target size={20} />,
    title: "Freelancing Journey",
    desc: "Expanding into freelancing to help businesses build powerful digital solutions",
    color: "#64748B",
  },
  {
    icon: <Coffee size={20} />,
    title: "Lifelong Learner",
    desc: "Constantly exploring new technologies, frameworks, and business strategies",
    color: "#64748B",
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
  "Blockchain",
];

export default function AboutSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="relative py-32 overflow-hidden">
      <div className="floating-orb w-72 h-72 bg-[#475569] top-20 -right-20" />

      <div className="max-w-7xl mx-auto px-6" ref={ref}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <span className="text-sm tracking-[0.3em] uppercase text-[#475569] mb-4 block">
            Get to Know Me
          </span>
          <h2 className="text-4xl md:text-6xl font-bold">
            About <span className="gradient-text">Me</span>
          </h2>
          <div className="glow-line max-w-xs mx-auto mt-6" />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Photo + Info */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* Photo */}
            <div className="relative w-64 h-72 mx-auto lg:mx-0 mb-8">
              <div className="shaped absolute -inset-3 rounded-3xl bg-gradient-to-br from-[#475569] to-[#475569] animate-spin-slow opacity-30 blur-xl" />
              <div className="shaped relative w-full h-full rounded-3xl bg-white border border-[#475569]/15 overflow-hidden shadow-xl shadow-slate-400/10">
                <Image
                  src="/profile.png"
                  alt="Kishan Patel"
                  fill
                  sizes="256px"
                  className="object-cover object-top select-none"
                />
              </div>
              <div className="absolute -bottom-3 -right-3 px-4 py-2 rounded-full bg-gradient-to-r from-[#475569] to-[#475569] text-sm font-semibold text-white shadow-lg shadow-slate-400/30">
                <MapPin size={14} className="inline mr-1" /> India
              </div>
            </div>

            <p className="text-slate-600 text-lg leading-relaxed mb-6">
              I&apos;m <span className="text-slate-900 font-semibold">Kishan</span>, a passionate
              software developer with over{" "}
              <span className="text-[#475569] font-semibold">6 years of experience</span> in
              the .NET ecosystem. My journey started with curiosity about how
              software works, and it evolved into a career of building robust,
              scalable applications.
            </p>
            <p className="text-slate-600 text-lg leading-relaxed mb-6">
              Beyond my day job, I&apos;ve channeled my entrepreneurial spirit into
              building{" "}
              <span className="text-[#475569] font-semibold">two SaaS products</span> —
              FlexYPDF and MunafaLab — which serve as both my passion projects
              and income streams. Now, I&apos;m stepping into the freelancing world
              to help others bring their digital visions to life.
            </p>
            <p className="text-slate-600 text-lg leading-relaxed">
              I believe in writing clean code, solving real problems, and
              continuously pushing the boundaries of what&apos;s possible with
              technology.
            </p>
          </motion.div>

          {/* Right: Highlights */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-6"
          >
            {highlights.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.5 + i * 0.15 }}
                className="glass glass-hover rounded-xl p-6 card-shine group cursor-default"
              >
                <div className="flex items-start gap-4">
                  <div
                    className="p-3 rounded-lg"
                    style={{ background: `${item.color}20` }}
                  >
                    <div style={{ color: item.color }}>{item.icon}</div>
                  </div>
                  <div>
                    <h3 className="text-slate-900 font-semibold text-lg mb-1 group-hover:text-[#475569] transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-slate-600">{item.desc}</p>
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
            <Heart size={20} className="text-[#64748B]" />
            <h3 className="text-2xl font-bold text-slate-900">
              My Interests & Passions
            </h3>
          </div>
          <div className="flex flex-wrap gap-3">
            {interests.map((interest, i) => (
              <motion.span
                key={interest}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.4, delay: 0.9 + i * 0.08 }}
                whileHover={{
                  scale: 1.1,
                  boxShadow: "0 0 20px rgba(71, 85, 105, 0.3)",
                }}
                className="px-5 py-2.5 rounded-full glass glass-hover text-slate-700 text-sm cursor-default"
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
              icon: <Zap size={24} />,
              title: "What Drives Me",
              desc: "Building products that solve real problems and creating value through technology",
              color: "#475569",
            },
            {
              icon: <Target size={24} />,
              title: "My Goal",
              desc: "To become a world-class freelance developer while growing my own SaaS products",
              color: "#475569",
            },
            {
              icon: <Rocket size={24} />,
              title: "My Vision",
              desc: "Combining corporate experience with entrepreneurial mindset to deliver exceptional results",
              color: "#64748B",
            },
          ].map((fact) => (
            <div
              key={fact.title}
              className="glass rounded-xl p-6 text-center card-shine"
            >
              <div
                className="w-12 h-12 rounded-full mx-auto mb-4 flex items-center justify-center"
                style={{ background: `${fact.color}20` }}
              >
                <div style={{ color: fact.color }}>{fact.icon}</div>
              </div>
              <h4 className="text-slate-900 font-semibold mb-2">{fact.title}</h4>
              <p className="text-slate-600 text-sm">{fact.desc}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
