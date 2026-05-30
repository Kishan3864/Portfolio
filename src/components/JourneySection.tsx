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
} from "lucide-react";

const timelineData = [
  {
    year: "Early Days",
    title: "The Spark of Curiosity",
    description:
      "My journey began with a deep curiosity about technology and how software could shape the world. I immersed myself in learning programming fundamentals and explored different languages.",
    icon: <Star size={20} />,
    color: "#FF6B6B",
    side: "left" as const,
  },
  {
    year: "Education",
    title: "Building the Foundation",
    description:
      "Pursued formal education in Computer Science, mastering data structures, algorithms, and software engineering principles. This academic foundation became the bedrock of my career.",
    icon: <GraduationCap size={20} />,
    color: "#6C63FF",
    side: "right" as const,
  },
  {
    year: "Career Start",
    title: "First Steps as a .NET Developer",
    description:
      "Landed my first role as a .NET Developer. Dove deep into the Microsoft ecosystem — C#, ASP.NET, SQL Server. Started building enterprise-grade web applications and APIs from day one.",
    icon: <Code2 size={20} />,
    color: "#00D4AA",
    side: "left" as const,
  },
  {
    year: "Growth Phase",
    title: "Leveling Up — Senior Developer",
    description:
      "Over the years, I grew from a junior developer to a senior-level professional. Led projects, mentored team members, and mastered full-stack development with .NET Core, Azure, and modern frontend frameworks.",
    icon: <TrendingUp size={20} />,
    color: "#4ECDC4",
    side: "right" as const,
  },
  {
    year: "6+ Years",
    title: "Current Role — Still Going Strong",
    description:
      "Currently working as a seasoned .NET Developer at the same company that gave me my start. I've built everything from microservices to complex enterprise solutions. My expertise spans the entire SDLC.",
    icon: <Briefcase size={20} />,
    color: "#6C63FF",
    side: "left" as const,
  },
  {
    year: "Side Hustle",
    title: "Building My Own Products",
    description:
      "Launched FlexYPDF (flexypdf.com) — a powerful PDF toolkit, and MunafaLab (munafalab.com) — a smart business analytics platform. Both are live products generating income and serving real users.",
    icon: <Rocket size={20} />,
    color: "#FF6B6B",
    side: "right" as const,
  },
  {
    year: "Now",
    title: "Freelancing & Beyond",
    description:
      "Expanding into freelancing while maintaining my full-time role and products. Ready to bring 6+ years of professional experience to help businesses worldwide build exceptional software.",
    icon: <Star size={20} />,
    color: "#00D4AA",
    side: "left" as const,
  },
];

function TimelineItem({
  item,
  index,
}: {
  item: (typeof timelineData)[0];
  index: number;
}) {
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
        <div className="glass rounded-2xl p-6 card-shine group hover:border-[#6C63FF]/30 transition-all duration-300">
          <span
            className="inline-block px-3 py-1 rounded-full text-xs font-semibold mb-3"
            style={{
              background: `${item.color}20`,
              color: item.color,
            }}
          >
            {item.year}
          </span>
          <h3 className="text-xl font-bold text-white mb-3 group-hover:gradient-text transition-colors">
            {item.title}
          </h3>
          <p className="text-gray-400 leading-relaxed">{item.description}</p>
        </div>
      </motion.div>

      {/* Center dot */}
      <motion.div
        initial={{ scale: 0 }}
        animate={inView ? { scale: 1 } : {}}
        transition={{ duration: 0.5, delay: 0.1, type: "spring" }}
        className="relative z-10 flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-full md:mx-auto"
        style={{ background: `${item.color}20`, border: `2px solid ${item.color}` }}
      >
        <div style={{ color: item.color }}>{item.icon}</div>
        <div
          className="absolute w-20 h-20 rounded-full animate-ping opacity-20"
          style={{ background: item.color }}
        />
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
    <section id="journey" className="relative py-32 overflow-hidden">
      <div className="floating-orb w-80 h-80 bg-[#00D4AA] -left-40 top-1/3" />
      <div className="floating-orb w-60 h-60 bg-[#FF6B6B] -right-20 bottom-1/4" />

      <div className="max-w-6xl mx-auto px-6" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <span className="text-sm tracking-[0.3em] uppercase text-[#00D4AA] mb-4 block">
            My Life Story
          </span>
          <h2 className="text-4xl md:text-6xl font-bold">
            The <span className="gradient-text">Journey</span>
          </h2>
          <p className="text-gray-400 mt-4 max-w-lg mx-auto">
            From a curious student to a seasoned developer and entrepreneur —
            here&apos;s how my story unfolded.
          </p>
          <div className="glow-line max-w-xs mx-auto mt-6" />
        </motion.div>

        <div className="relative">
          {/* Timeline center line */}
          <div className="hidden md:block timeline-line" />
          <div className="md:hidden absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-transparent via-[#6C63FF] to-transparent" />

          <div className="space-y-16 md:space-y-24">
            {timelineData.map((item, i) => (
              <TimelineItem key={item.title} item={item} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
