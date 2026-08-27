"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  Building2,
  Calendar,
  CheckCircle2,
  Award,
  ArrowUpRight,
} from "lucide-react";

const achievements = [
  "Built and maintained enterprise-level .NET applications serving thousands of users",
  "Designed scalable RESTful APIs and microservice architectures",
  "Managed end-to-end software development lifecycle (SDLC)",
  "Mentored junior developers and conducted code reviews",
  "Optimized database performance reducing query times by up to 60%",
  "Implemented CI/CD pipelines for automated deployment",
  "Collaborated with cross-functional teams to deliver projects on time",
  "Introduced modern development practices and clean architecture patterns",
];

const techUsed = [
  "C#", ".NET Core", "ASP.NET MVC", "Web API", "SQL Server",
  "Entity Framework", "Azure", "Docker", "Git", "JavaScript",
  "jQuery", "HTML/CSS", "Microservices", "REST APIs",
];

// Work beyond the day job — own products and the client studio.
const ventures = [
  {
    name: "FlexyPdf",
    kind: "SaaS Product",
    url: "https://flexypdf.com",
    color: "#4338ca",
    desc: "Built a 140+ tool, privacy-first utility platform from scratch — architecture, development, SEO, deployment and marketing, single-handedly.",
  },
  {
    name: "MunafaLab",
    kind: "Finance Publication",
    url: "https://munafalab.com",
    color: "#0e7466",
    desc: "Designed and grew an independent personal-finance education platform for Indian investors, with a newsletter and research-verified content.",
  },
  {
    name: "Nexbyte Studio",
    kind: "Client Work",
    url: "https://company.flexypdf.com",
    color: "#c2410c",
    desc: "My studio for client projects — event planners, restaurants, contractors and startups get end-to-end builds from one accountable engineer.",
  },
];

export default function ExperienceSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="relative py-28 overflow-hidden">
      <div className="blob-orb w-72 h-72 bg-[#ffd0ab] -right-20 top-40" />

      <div className="max-w-6xl mx-auto px-6" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <span className="section-label mb-4">Where I&apos;ve Worked</span>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight">
            Work <span className="italic text-[#c2410c] marker">experience.</span>
          </h2>
        </motion.div>

        {/* Main Experience Card */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="card overflow-hidden"
        >
          {/* Header */}
          <div className="bg-[#ffe1cb] p-8 md:p-10 border-b-[1.5px] border-[#1c1917]">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div className="flex items-start gap-4">
                <div className="grid place-items-center w-16 h-16 rounded-2xl bg-[#1c1917] text-[#fffdf7] border-[1.5px] border-[#1c1917] shadow-[3px_3px_0_#e4580b] shrink-0">
                  <Building2 size={28} />
                </div>
                <div>
                  <h3 className="text-2xl md:text-3xl font-bold text-[#1c1917]">
                    .NET Developer
                  </h3>
                  <p className="text-[#57534e] text-lg mt-1">Full-Time Position</p>
                </div>
              </div>
              <div className="flex items-center gap-4 flex-wrap">
                <div className="flex items-center gap-2 text-[#57534e] font-mono text-sm">
                  <Calendar size={15} />
                  <span>6+ Years</span>
                </div>
                <span className="chip px-4 py-2 text-sm font-bold text-[#15803d] flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#15803d] animate-pulse" />
                  Currently Working
                </span>
              </div>
            </div>
          </div>

          {/* Body */}
          <div className="p-8 md:p-10">
            <p className="text-[#57534e] text-lg leading-relaxed mb-8">
              I&apos;ve been part of this company since the beginning of my career.
              Over 6 years, I&apos;ve grown from a junior developer to a seasoned
              professional, taking on increasing responsibilities and delivering
              high-impact projects. This long tenure reflects my dedication,
              growth, and the trust the organization places in me.
            </p>

            {/* Key Achievements */}
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-6">
                <Award size={20} className="text-[#c2410c]" />
                <h4 className="text-xl font-bold">
                  Key Achievements &amp; Responsibilities
                </h4>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                {achievements.map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }}
                    className="flex items-start gap-3"
                  >
                    <CheckCircle2
                      size={18}
                      className="text-[#0e7466] mt-0.5 shrink-0"
                    />
                    <span className="text-[#44403c] text-sm">{item}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Tech Stack Used */}
            <div>
              <h4 className="text-lg font-bold mb-4">Technologies Used</h4>
              <div className="flex flex-wrap gap-2.5">
                {techUsed.map((tech, i) => (
                  <motion.span
                    key={tech}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={inView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.3, delay: 0.8 + i * 0.05 }}
                    className="px-3.5 py-1.5 rounded-full bg-[#f8f4ec] border-[1.5px] border-[#1c1917]/25 text-sm font-medium text-[#44403c]"
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Ventures beyond the day job */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-14 grid md:grid-cols-3 gap-6"
        >
          {ventures.map((v, i) => (
            <motion.a
              key={v.name}
              href={v.url}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ rotate: 0 }}
              className={`group card card-hover p-7 ${
                i % 2 ? "md:rotate-[0.8deg]" : "md:rotate-[-0.8deg]"
              }`}
              style={{ borderTop: `5px solid ${v.color}` }}
            >
              <div className="flex items-start justify-between">
                <h4 className="font-[family-name:var(--font-fraunces)] text-xl font-bold text-[#1c1917] mb-1.5">
                  {v.name}
                </h4>
                <ArrowUpRight
                  size={17}
                  className="text-[#a8a29e] transition-all duration-300 group-hover:text-[#1c1917] group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </div>
              <p
                className="font-mono text-xs font-bold uppercase tracking-wider mb-3"
                style={{ color: v.color }}
              >
                {v.kind}
              </p>
              <p className="text-[#57534e] text-sm leading-relaxed">{v.desc}</p>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
