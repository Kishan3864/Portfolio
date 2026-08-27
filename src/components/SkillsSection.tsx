"use client";
import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import {
  Database,
  Globe,
  Server,
  Smartphone,
  Cloud,
  Shield,
  Layers,
  Settings,
} from "lucide-react";

const skillCategories = [
  {
    name: "Backend",
    icon: <Server size={18} />,
    color: "#c2410c",
    skills: [
      { name: "C# / .NET", level: 95 },
      { name: "ASP.NET Core", level: 92 },
      { name: "Web API / REST", level: 90 },
      { name: "Entity Framework", level: 88 },
      { name: "LINQ", level: 90 },
      { name: "Microservices", level: 82 },
    ],
  },
  {
    name: "Frontend",
    icon: <Globe size={18} />,
    color: "#4338ca",
    skills: [
      { name: "HTML / CSS / JS", level: 90 },
      { name: "React.js", level: 80 },
      { name: "Next.js", level: 78 },
      { name: "Tailwind CSS", level: 85 },
      { name: "TypeScript", level: 78 },
      { name: "jQuery", level: 88 },
    ],
  },
  {
    name: "Database",
    icon: <Database size={18} />,
    color: "#0e7466",
    skills: [
      { name: "SQL Server", level: 92 },
      { name: "PostgreSQL", level: 78 },
      { name: "MongoDB", level: 72 },
      { name: "Redis", level: 70 },
      { name: "Stored Procedures", level: 90 },
      { name: "Database Design", level: 85 },
    ],
  },
  {
    name: "Cloud & DevOps",
    icon: <Cloud size={18} />,
    color: "#be185d",
    skills: [
      { name: "Azure", level: 80 },
      { name: "Docker", level: 75 },
      { name: "CI/CD Pipelines", level: 80 },
      { name: "Git / GitHub", level: 90 },
      { name: "Nginx / PM2 / VPS", level: 85 },
      { name: "Azure DevOps", level: 80 },
    ],
  },
];

const tools = [
  { name: "Visual Studio", icon: <Settings size={15} /> },
  { name: "VS Code", icon: <Settings size={15} /> },
  { name: "Postman", icon: <Globe size={15} /> },
  { name: "Azure Portal", icon: <Cloud size={15} /> },
  { name: "SQL Server Mgmt Studio", icon: <Database size={15} /> },
  { name: "Git", icon: <Layers size={15} /> },
  { name: "Docker Desktop", icon: <Smartphone size={15} /> },
  { name: "Swagger", icon: <Shield size={15} /> },
];

function SkillBar({
  name,
  level,
  color,
  delay,
  inView,
}: {
  name: string;
  level: number;
  color: string;
  delay: number;
  inView: boolean;
}) {
  return (
    <div className="mb-5">
      <div className="flex justify-between mb-1.5">
        <span className="text-sm font-semibold text-[#1c1917]">{name}</span>
        <span className="text-xs font-mono text-[#78716c]">{level}%</span>
      </div>
      <div className="h-3 rounded-full bg-[#efe9dc] border-[1.5px] border-[#1c1917] overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={inView ? { width: `${level}%` } : { width: 0 }}
          transition={{ duration: 1.2, delay, ease: "easeOut" }}
          className="h-full rounded-full"
          style={{
            background: `repeating-linear-gradient(-45deg, ${color} 0 8px, ${color}cc 8px 16px)`,
          }}
        />
      </div>
    </div>
  );
}

export default function SkillsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section id="skills" className="relative py-28 overflow-hidden">
      <div className="blob-orb w-72 h-72 bg-[#c8e6df] -right-20 top-20" />

      <div className="max-w-7xl mx-auto px-6" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <span className="section-label mb-4">What I Bring to the Table</span>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight">
            Skills &amp; <span className="italic text-[#c2410c] marker">expertise.</span>
          </h2>
          <p className="text-[#57534e] mt-4 max-w-lg text-lg">
            Over 6 years of hands-on experience across the full technology stack.
          </p>
        </motion.div>

        {/* Category Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-wrap gap-3 mb-10"
        >
          {skillCategories.map((cat, i) => {
            const isActive = activeTab === i;
            return (
              <button
                key={cat.name}
                onClick={() => setActiveTab(i)}
                className={`btn-shape relative flex items-center gap-2 px-6 py-3 text-sm font-bold border-[1.5px] border-[#1c1917] transition-all duration-300 ${
                  isActive
                    ? "text-[#fffdf7]"
                    : "bg-[#fffdf7] text-[#57534e] hover:text-[#1c1917] shadow-[2.5px_2.5px_0_rgba(28,25,23,0.85)] hover:-translate-x-[1px] hover:-translate-y-[1px]"
                }`}
                style={isActive ? { background: cat.color } : undefined}
              >
                {cat.icon}
                {cat.name}
              </button>
            );
          })}
        </motion.div>

        {/* Active Skills */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl card p-8"
        >
          <div className="grid md:grid-cols-2 gap-x-10">
            {skillCategories[activeTab].skills.map((skill, i) => (
              <SkillBar
                key={skill.name}
                name={skill.name}
                level={skill.level}
                color={skillCategories[activeTab].color}
                delay={i * 0.1}
                inView={true}
              />
            ))}
          </div>
        </motion.div>

        {/* Experience Overview */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-5"
        >
          {[
            { value: "C#", label: "Primary Language", color: "#c2410c" },
            { value: ".NET", label: "Core Framework", color: "#4338ca" },
            { value: "Azure", label: "Cloud Platform", color: "#0e7466" },
            { value: "Next.js", label: "Frontend Choice", color: "#be185d" },
          ].map((item, i) => (
            <motion.div
              key={item.label}
              whileHover={{ rotate: i % 2 ? 1.5 : -1.5 }}
              className="card card-hover p-6 text-center cursor-default"
            >
              <div
                className="font-[family-name:var(--font-fraunces)] text-2xl md:text-3xl font-bold mb-1"
                style={{ color: item.color }}
              >
                {item.value}
              </div>
              <div className="text-xs text-[#78716c]">{item.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Tools */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-16"
        >
          <h3 className="text-xl font-bold mb-8">
            Tools I use <span className="italic text-[#c2410c]">daily</span>
          </h3>
          <div className="flex flex-wrap gap-4">
            {tools.map((tool, i) => (
              <motion.div
                key={tool.name}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.4, delay: 0.9 + i * 0.06 }}
                whileHover={{ scale: 1.06, rotate: i % 2 ? 2 : -2 }}
                className="chip flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-[#1c1917] cursor-default"
              >
                <span className="text-[#c2410c]">{tool.icon}</span>
                {tool.name}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
