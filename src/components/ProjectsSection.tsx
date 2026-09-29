"use client";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { ExternalLink, ArrowUpRight, Globe } from "lucide-react";
import {
  projects,
  featuredProjects,
  gridProjects,
  projectStats,
  categoryLabels,
  type Project,
  type ProjectCategory,
} from "@/lib/projects";

// Only categories that actually have projects get a filter tab.
const filters: Array<ProjectCategory | "all"> = [
  "all",
  ...(Object.keys(categoryLabels) as Array<ProjectCategory | "all">).filter(
    (c): c is ProjectCategory =>
      c !== "all" && projects.some((p) => p.category === c),
  ),
];

const statusStyles: Record<Project["status"], { bg: string; fg: string }> = {
  Live: { bg: "#dcfce7", fg: "#15803d" },
};

function StatusBadge({ status }: { status: Project["status"] }) {
  const s = statusStyles[status];
  return (
    <span
      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold border-[1.5px] border-[#1c1917]"
      style={{ background: s.bg, color: s.fg }}
    >
      <span
        className={`w-1.5 h-1.5 rounded-full ${status === "Live" ? "animate-pulse" : ""}`}
        style={{ background: s.fg }}
      />
      {status}
    </span>
  );
}

// Big showcase card for the flagship (featured) projects.

function FeaturedCard({ project, index, inView }: { project: Project; index: number; inView: boolean }) {
  const Icon = project.icon;
  return (
    <motion.a
      href={project.url}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 60, rotate: index % 2 ? 2 : -2 }}
      animate={inView ? { opacity: 1, y: 0, rotate: 0 } : {}}
      transition={{ duration: 0.8, delay: 0.2 + index * 0.15 }}
      className="group card card-hover p-8 flex flex-col relative overflow-hidden"
      style={{ borderTop: `6px solid ${project.accent}` }}
    >
      <div className="flex items-start justify-between mb-6">
        <div
          className="grid place-items-center w-14 h-14 rounded-2xl border-[1.5px] border-[#1c1917] transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-110"
          style={{ background: `${project.accent}15`, color: project.accent }}
        >
          <Icon size={26} />
        </div>
        <StatusBadge status={project.status} />
      </div>

      <h3 className="font-[family-name:var(--font-fraunces)] text-2xl font-bold text-[#1c1917] mb-1">
        {project.name}
      </h3>
      <p className="text-sm font-bold mb-4" style={{ color: project.accent }}>
        {project.tagline}
      </p>
      <p className="text-[#57534e] text-sm leading-relaxed mb-6 flex-1">
        {project.description}
      </p>

      <div className="flex flex-wrap gap-2 mb-6">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-[#f8f4ec] border-[1.5px] border-[#1c1917]/25 text-[#44403c]"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="flex items-center justify-between text-sm pt-4 border-t-[1.5px] border-dashed border-[#1c1917]/25">
        <span className="flex items-center gap-1.5 text-[#78716c] font-mono text-xs">
          <Globe size={13} />
          {project.host}
        </span>
        <span
          className="flex items-center gap-1 font-bold transition-transform duration-300 group-hover:translate-x-1"
          style={{ color: project.accent }}
        >
          Visit <ExternalLink size={14} />
        </span>
      </div>
    </motion.a>
  );
}

// Compact card for the filterable grid.
function GridCard({ project }: { project: Project }) {
  const Icon = project.icon;
  return (
    <motion.a
      layout
      href={project.url}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="group card card-hover p-6 flex flex-col"
    >
      <div className="flex items-start justify-between mb-4">
        <div
          className="grid place-items-center w-11 h-11 rounded-xl border-[1.5px] border-[#1c1917] transition-transform duration-500 group-hover:-rotate-6"
          style={{ background: `${project.accent}15`, color: project.accent }}
        >
          <Icon size={20} />
        </div>
        <StatusBadge status={project.status} />
      </div>

      <h4 className="font-[family-name:var(--font-fraunces)] text-lg font-bold text-[#1c1917] mb-1">
        {project.name}
      </h4>
      <p className="text-xs font-bold mb-3" style={{ color: project.accent }}>
        {project.tagline}
      </p>
      <p className="text-[#57534e] text-[13px] leading-relaxed mb-5 flex-1 line-clamp-3">
        {project.description}
      </p>

      <div className="flex items-center justify-between pt-3.5 border-t-[1.5px] border-dashed border-[#1c1917]/25">
        <span className="text-[11px] font-mono text-[#78716c] truncate pr-2">
          {project.host}
        </span>
        <ArrowUpRight
          size={16}
          className="shrink-0 text-[#a8a29e] transition-all duration-300 group-hover:text-[#1c1917] group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        />
      </div>
    </motion.a>
  );
}

export default function ProjectsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [activeFilter, setActiveFilter] = useState<ProjectCategory | "all">("all");

  const visible =
    activeFilter === "all"
      ? gridProjects
      : projects.filter((p) => p.category === activeFilter);

  const countFor = (f: ProjectCategory | "all") =>
    f === "all" ? projects.length : projects.filter((p) => p.category === f).length;

  return (
    <section id="projects" className="relative py-28 overflow-hidden">
      <div className="blob-orb w-80 h-80 bg-[#ffd0ab] -left-20 top-1/4" />
      <div className="blob-orb w-60 h-60 bg-[#c8e6df] -right-20 bottom-1/3" />

      <div className="max-w-7xl mx-auto px-6" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          <span className="section-label mb-4">What I&apos;ve Built</span>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight">
            Selected <span className="italic text-[#c2410c] marker">work.</span>
          </h2>
          <p className="text-[#57534e] mt-4 max-w-xl text-lg">
            {projectStats.total}+ live deployments — SaaS products, multi-role
            platforms and client websites, all designed, built and operated by me
            on my own infrastructure.
          </p>
        </motion.div>

        {/* Quick numbers */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="grid grid-cols-3 gap-4 max-w-2xl mb-16"
        >
          {[
            { value: projectStats.products, label: "SaaS Products" },
            { value: projectStats.platforms, label: "Platforms" },
            { value: projectStats.clients, label: "Client Builds" },
          ].map((s, i) => (
            <div
              key={s.label}
              className={`card py-4 text-center ${i === 1 ? "translate-y-2" : ""}`}
            >
              <div className="font-[family-name:var(--font-fraunces)] text-2xl md:text-3xl font-bold text-[#c2410c]">
                {s.value}
              </div>
              <div className="text-xs text-[#78716c] mt-1">{s.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Featured flagship products */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-7 mb-20">
          {featuredProjects.map((project, i) => (
            <FeaturedCard key={project.name} project={project} index={i} inView={inView} />
          ))}
        </div>

        {/* Filter tabs */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="flex flex-wrap gap-3 mb-12"
        >
          {filters.map((f) => {
            const isActive = activeFilter === f;
            return (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className={`btn-shape relative flex items-center gap-2 px-5 py-2.5 text-sm font-bold border-[1.5px] border-[#1c1917] transition-colors duration-300 ${
                  isActive
                    ? "text-[#fffdf7]"
                    : "bg-[#fffdf7] text-[#57534e] hover:text-[#1c1917] shadow-[2.5px_2.5px_0_rgba(28,25,23,0.85)]"
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="projectFilter"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    className="btn-shape absolute inset-0 bg-[#1c1917]"
                  />
                )}
                <span className="relative z-10">{categoryLabels[f]}</span>
                <span
                  className={`relative z-10 grid place-items-center min-w-5 h-5 px-1 rounded-full text-[10px] font-bold ${
                    isActive
                      ? "bg-[#e4580b] text-[#fffdf7]"
                      : "bg-[#f8f4ec] border border-[#1c1917]/30"
                  }`}
                >
                  {countFor(f)}
                </span>
              </button>
            );
          })}
        </motion.div>

        {/* Filterable grid — `layout` re-flows the survivors smoothly */}
        <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-3 gap-7">
          <AnimatePresence mode="popLayout">
            {visible.map((project) => (
              <GridCard key={project.name} project={project} />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-24"
        >
          <div className="card p-10 md:p-12 bg-[#ffe1cb] text-center max-w-3xl mx-auto rotate-[-0.5deg]">
            <h3 className="text-3xl md:text-4xl font-bold mb-4">
              Have a project in{" "}
              <span className="italic text-[#c2410c]">mind?</span>
            </h3>
            <p className="text-[#57534e] mb-8 text-lg">
              From a landing page to a full SaaS platform — I design, build,
              deploy and maintain the whole thing. Let&apos;s build yours next.
            </p>
            <a href="#contact" className="btn-ink px-8 py-4 text-lg">
              Let&apos;s Talk
              <ArrowUpRight size={20} />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
