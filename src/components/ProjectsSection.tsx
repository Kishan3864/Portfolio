"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  ExternalLink,
  FileText,
  BarChart3,
  Sparkles,
  Globe,
  ArrowUpRight,
  Star,
} from "lucide-react";

const projects = [
  {
    title: "FlexYPDF",
    subtitle: "Powerful PDF Toolkit",
    url: "https://flexypdf.com",
    description:
      "A comprehensive PDF management platform that I built from scratch. FlexYPDF enables users to convert, merge, split, compress and manipulate PDF files with ease. Built with performance and user experience as top priorities.",
    features: [
      "PDF Conversion & Merging",
      "File Compression",
      "Cloud Processing",
      "User Dashboard",
      "API Integration",
    ],
    color: "#6C63FF",
    gradient: "from-[#6C63FF] to-[#4834d4]",
    icon: <FileText size={32} />,
    badge: "Live Product",
  },
  {
    title: "MunafaLab",
    subtitle: "Smart Business Analytics",
    url: "https://munafalab.com",
    description:
      "An intelligent business analytics and financial tracking platform. MunafaLab helps users track their investments, analyze market trends, and make data-driven decisions. A complete fintech solution built for the modern investor.",
    features: [
      "Real-time Analytics",
      "Investment Tracking",
      "Financial Reports",
      "Smart Dashboards",
      "Market Insights",
    ],
    color: "#00D4AA",
    gradient: "from-[#00D4AA] to-[#00b894]",
    icon: <BarChart3 size={32} />,
    badge: "Live Product",
  },
];

const otherWork = [
  {
    title: "Enterprise Web Applications",
    desc: "Built scalable web apps for enterprises using .NET Core, handling millions of requests",
    icon: <Globe size={20} />,
  },
  {
    title: "RESTful API Architecture",
    desc: "Designed and implemented robust API systems following best practices and clean architecture",
    icon: <Sparkles size={20} />,
  },
  {
    title: "Database Solutions",
    desc: "Optimized complex SQL Server databases, stored procedures, and data pipelines",
    icon: <Star size={20} />,
  },
];

export default function ProjectsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="projects" className="relative py-32 overflow-hidden">
      <div className="floating-orb w-80 h-80 bg-[#00D4AA] -left-20 top-1/4" />
      <div className="floating-orb w-60 h-60 bg-[#6C63FF] -right-20 bottom-1/3" />

      <div className="max-w-7xl mx-auto px-6" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <span className="text-sm tracking-[0.3em] uppercase text-[#6C63FF] mb-4 block">
            What I&apos;ve Built
          </span>
          <h2 className="text-4xl md:text-6xl font-bold">
            My <span className="gradient-text">Projects</span>
          </h2>
          <p className="text-gray-400 mt-4 max-w-lg mx-auto">
            Products I&apos;ve built from the ground up — live, running, and serving real users
          </p>
          <div className="glow-line max-w-xs mx-auto mt-6" />
        </motion.div>

        {/* Featured Projects */}
        <div className="space-y-16">
          {projects.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 60 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 + i * 0.2 }}
            >
              <div className="glass rounded-3xl overflow-hidden group">
                <div className="grid lg:grid-cols-2 gap-0">
                  {/* Preview */}
                  <div
                    className={`relative p-12 flex items-center justify-center bg-gradient-to-br ${project.gradient} min-h-[300px]`}
                  >
                    <div className="absolute inset-0 bg-black/20" />
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className="relative z-10 text-white"
                    >
                      <div className="w-24 h-24 rounded-2xl bg-white/10 backdrop-blur-xl flex items-center justify-center mb-4 mx-auto">
                        {project.icon}
                      </div>
                      <div className="text-center">
                        <h3 className="text-3xl font-bold">{project.title}</h3>
                        <p className="text-white/70 mt-1">
                          {project.subtitle}
                        </p>
                      </div>
                    </motion.div>

                    {/* Decorative circles */}
                    <div className="absolute top-6 right-6 w-20 h-20 rounded-full border border-white/10" />
                    <div className="absolute bottom-6 left-6 w-32 h-32 rounded-full border border-white/10" />
                    <div className="absolute top-1/2 left-1/4 w-8 h-8 rounded-full bg-white/10" />
                  </div>

                  {/* Details */}
                  <div className="p-8 lg:p-12 flex flex-col justify-center">
                    <div className="flex items-center gap-3 mb-4">
                      <span
                        className="px-3 py-1 rounded-full text-xs font-semibold"
                        style={{
                          background: `${project.color}20`,
                          color: project.color,
                        }}
                      >
                        {project.badge}
                      </span>
                      <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                    </div>

                    <p className="text-gray-400 leading-relaxed mb-6">
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-8">
                      {project.features.map((f) => (
                        <span
                          key={f}
                          className="px-3 py-1.5 rounded-full text-xs glass text-gray-300"
                        >
                          {f}
                        </span>
                      ))}
                    </div>

                    <motion.a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{
                        scale: 1.05,
                        boxShadow: `0 0 30px ${project.color}40`,
                      }}
                      whileTap={{ scale: 0.95 }}
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-white font-semibold w-fit"
                      style={{
                        background: `linear-gradient(135deg, ${project.color}, ${project.color}88)`,
                      }}
                    >
                      Visit Website
                      <ExternalLink size={16} />
                    </motion.a>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Other Work */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-24"
        >
          <h3 className="text-2xl font-bold text-white text-center mb-12">
            Other Professional Work
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            {otherWork.map((work, i) => (
              <motion.div
                key={work.title}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.9 + i * 0.15 }}
                whileHover={{ y: -8 }}
                className="glass rounded-2xl p-6 card-shine group cursor-default"
              >
                <div className="w-10 h-10 rounded-lg bg-[#6C63FF]/20 flex items-center justify-center text-[#6C63FF] mb-4 group-hover:scale-110 transition-transform">
                  {work.icon}
                </div>
                <h4 className="text-white font-semibold mb-2">{work.title}</h4>
                <p className="text-gray-400 text-sm">{work.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1 }}
          className="mt-20 text-center"
        >
          <div className="glass rounded-2xl p-10 max-w-2xl mx-auto">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Have a Project in Mind?
            </h3>
            <p className="text-gray-400 mb-8">
              I&apos;m ready to bring your ideas to life. Let&apos;s build something
              incredible together.
            </p>
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(108, 99, 255, 0.4)" }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-[#6C63FF] to-[#00D4AA] text-white font-semibold text-lg"
            >
              Let&apos;s Talk
              <ArrowUpRight size={20} />
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
