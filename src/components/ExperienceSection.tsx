"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  Building2,
  Calendar,
  CheckCircle2,
  Award,
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

export default function ExperienceSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="relative py-32 overflow-hidden">
      <div className="floating-orb w-72 h-72 bg-[#DB2777] -right-20 top-40" />

      <div className="max-w-6xl mx-auto px-6" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <span className="text-sm tracking-[0.3em] uppercase text-[#7C3AED] mb-4 block">
            Where I&apos;ve Worked
          </span>
          <h2 className="text-4xl md:text-6xl font-bold">
            Work <span className="gradient-text">Experience</span>
          </h2>
          <div className="glow-line max-w-xs mx-auto mt-6" />
        </motion.div>

        {/* Main Experience Card */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="glass rounded-3xl overflow-hidden"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-[#4F46E5]/10 to-[#0D9488]/10 p-8 md:p-12 border-b border-slate-200">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-[#4F46E5] to-[#0D9488] flex items-center justify-center shrink-0">
                  <Building2 size={28} className="text-white" />
                </div>
                <div>
                  <h3 className="text-2xl md:text-3xl font-bold text-slate-900">
                    .NET Developer
                  </h3>
                  <p className="text-slate-600 text-lg mt-1">
                    Full-Time Position
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2 text-slate-600">
                  <Calendar size={16} />
                  <span>6+ Years</span>
                </div>
                <span className="px-4 py-2 rounded-full bg-green-500/15 text-green-700 text-sm font-medium flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  Currently Working
                </span>
              </div>
            </div>
          </div>

          {/* Body */}
          <div className="p-8 md:p-12">
            <p className="text-slate-600 text-lg leading-relaxed mb-8">
              I&apos;ve been part of this company since the beginning of my career.
              Over 6 years, I&apos;ve grown from a junior developer to a seasoned
              professional, taking on increasing responsibilities and delivering
              high-impact projects. This long tenure reflects my dedication,
              growth, and the trust the organization places in me.
            </p>

            {/* Key Achievements */}
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-6">
                <Award size={20} className="text-[#4F46E5]" />
                <h4 className="text-xl font-bold text-slate-900">
                  Key Achievements & Responsibilities
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
                      className="text-[#0D9488] mt-0.5 shrink-0"
                    />
                    <span className="text-slate-700 text-sm">{item}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Tech Stack Used */}
            <div>
              <h4 className="text-lg font-bold text-slate-900 mb-4">
                Technologies Used
              </h4>
              <div className="flex flex-wrap gap-2">
                {techUsed.map((tech, i) => (
                  <motion.span
                    key={tech}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={inView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.3, delay: 0.8 + i * 0.05 }}
                    className="px-4 py-2 rounded-full glass text-sm text-slate-700"
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Side Projects Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16 grid md:grid-cols-2 gap-6"
        >
          <div className="glass rounded-2xl p-8 border-l-4 border-[#4F46E5]">
            <h4 className="text-xl font-bold text-slate-900 mb-2">FlexYPDF</h4>
            <p className="text-slate-500 text-sm mb-3">Personal Product</p>
            <p className="text-slate-600">
              Built an entire PDF management SaaS from scratch — handling
              architecture, development, deployment, and marketing single-handedly.
            </p>
          </div>
          <div className="glass rounded-2xl p-8 border-l-4 border-[#0D9488]">
            <h4 className="text-xl font-bold text-slate-900 mb-2">MunafaLab</h4>
            <p className="text-slate-500 text-sm mb-3">Personal Product</p>
            <p className="text-slate-600">
              Designed and developed a fintech analytics platform end-to-end,
              showcasing my ability to take ideas from concept to production.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
