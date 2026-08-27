"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  GraduationCap,
  Briefcase,
  Rocket,
  Code2,
  Star,
  TrendingUp,
  Layers,
} from "lucide-react";

const timelineData = [
  {
    year: "Early Days",
    title: "The Spark of Curiosity",
    description:
      "My journey began with a deep curiosity about technology and how software could shape the world. I immersed myself in learning programming fundamentals and explored different languages.",
    icon: <Star size={20} />,
    color: "#0e7466",
    side: "left" as const,
  },
  {
    year: "Education",
    title: "Building the Foundation",
    description:
      "Pursued formal education in Computer Science, mastering data structures, algorithms, and software engineering principles. This academic foundation became the bedrock of my career.",
    icon: <GraduationCap size={20} />,
    color: "#4338ca",
    side: "right" as const,
  },
  {
    year: "Career Start",
    title: "First Steps as a .NET Developer",
    description:
      "Landed my first role as a .NET Developer. Dove deep into the Microsoft ecosystem — C#, ASP.NET, SQL Server. Started building enterprise-grade web applications and APIs from day one.",
    icon: <Code2 size={20} />,
    color: "#c2410c",
    side: "left" as const,
  },
  {
    year: "Growth Phase",
    title: "Leveling Up — Senior Developer",
    description:
      "Over the years, I grew from a junior developer to a senior-level professional. Led projects, mentored team members, and mastered full-stack development with .NET Core, Azure, and modern frontend frameworks.",
    icon: <TrendingUp size={20} />,
    color: "#0e7466",
    side: "right" as const,
  },
  {
    year: "6+ Years",
    title: "Current Role — Still Going Strong",
    description:
      "Currently working as a seasoned .NET Developer at the same company that gave me my start. I've built everything from microservices to complex enterprise solutions. My expertise spans the entire SDLC.",
    icon: <Briefcase size={20} />,
    color: "#4338ca",
    side: "left" as const,
  },
  {
    year: "Product Era",
    title: "Building My Own Product Suite",
    description:
      "Launched FlexyPdf (140+ browser tools), MunafaLab (finance education), ScriptProof (PCI compliance monitoring), plus marketplaces, dashboards and calculators — 15+ live deployments running on my own VPS infrastructure.",
    icon: <Rocket size={20} />,
    color: "#be185d",
    side: "right" as const,
  },
  {
    year: "Now",
    title: "Freelancing & Client Work",
    description:
      "Shipping real client projects through my studio Nexbyte — event planners, restaurants, contractors and startups — while maintaining my full-time role and growing my own products. Ready to build yours next.",
    icon: <Layers size={20} />,
    color: "#c2410c",
    side: "left" as const,
  },
];

function TimelineItem({ item }: { item: (typeof timelineData)[0] }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <div
      ref={ref}
      className={`relative flex flex-col md:flex-row items-center gap-8 md:gap-0 ${
        item.side === "right" ? "md:flex-row-reverse" : ""
      }`}
    >
      {/* Content */}
      <motion.div
        initial={{ opacity: 0, x: item.side === "left" ? -80 : 80 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="w-full md:w-5/12"
      >
        <div
          className={`card card-hover p-6 ${
            item.side === "left" ? "md:rotate-[-0.6deg]" : "md:rotate-[0.6deg]"
          }`}
        >
          <span
            className="inline-block px-3 py-1 rounded-full font-mono text-[11px] font-bold uppercase tracking-wider mb-3 border-[1.5px] border-[#1c1917]"
            style={{ background: `${item.color}18`, color: item.color }}
          >
            {item.year}
          </span>
          <h3 className="font-[family-name:var(--font-fraunces)] text-xl font-bold text-[#1c1917] mb-3">
            {item.title}
          </h3>
          <p className="text-[#57534e] leading-relaxed text-[15px]">
            {item.description}
          </p>
        </div>
      </motion.div>

      {/* Center node */}
      <motion.div
        initial={{ scale: 0 }}
        animate={inView ? { scale: 1 } : {}}
        transition={{ duration: 0.5, delay: 0.1, type: "spring" }}
        className="relative z-10 grid place-items-center w-12 h-12 md:w-14 md:h-14 rounded-full md:mx-auto bg-[#fffdf7] border-2 border-[#1c1917] shadow-[3px_3px_0_rgba(28,25,23,0.85)]"
      >
        <div style={{ color: item.color }}>{item.icon}</div>
      </motion.div>

      {/* Empty space for alignment */}
      <div className="hidden md:block w-5/12" />
    </div>
  );
}

export default function JourneySection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="journey" className="relative py-28 overflow-hidden">
      <div className="blob-orb w-80 h-80 bg-[#ffd0ab] -left-40 top-1/3" />
      <div className="blob-orb w-60 h-60 bg-[#c8e6df] -right-20 bottom-1/4" />

      <div className="max-w-6xl mx-auto px-6" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-20"
        >
          <span className="section-label mb-4">My Life Story</span>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight">
            The <span className="italic text-[#c2410c] marker">journey</span> so far
          </h2>
          <p className="text-[#57534e] mt-4 max-w-lg text-lg">
            From a curious student to a seasoned developer and product builder —
            here&apos;s how my story unfolded.
          </p>
        </motion.div>

        <div className="relative">
          {/* Timeline center line — dashed ink, like a route on a map */}
          <div
            className="hidden md:block absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[2px]"
            style={{
              backgroundImage:
                "repeating-linear-gradient(180deg, #1c1917 0 8px, transparent 8px 16px)",
              opacity: 0.35,
            }}
          />
          <div
            className="md:hidden absolute left-6 top-0 bottom-0 w-[2px]"
            style={{
              backgroundImage:
                "repeating-linear-gradient(180deg, #1c1917 0 8px, transparent 8px 16px)",
              opacity: 0.35,
            }}
          />

          <div className="space-y-14 md:space-y-20">
            {timelineData.map((item) => (
              <TimelineItem key={item.title} item={item} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
