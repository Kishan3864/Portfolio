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
    icon: <Server size={20} />,
    color: "#4F46E5",
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
    icon: <Globe size={20} />,
    color: "#0D9488",
    skills: [
      { name: "HTML / CSS / JS", level: 90 },
      { name: "React.js", level: 80 },
      { name: "Next.js", level: 75 },
      { name: "Tailwind CSS", level: 85 },
      { name: "TypeScript", level: 78 },
      { name: "jQuery", level: 88 },
    ],
  },
  {
    name: "Database",
    icon: <Database size={20} />,
    color: "#DB2777",
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
    icon: <Cloud size={20} />,
    color: "#7C3AED",
    skills: [
      { name: "Azure", level: 80 },
      { name: "Docker", level: 75 },
      { name: "CI/CD Pipelines", level: 78 },
      { name: "Git / GitHub", level: 90 },
      { name: "IIS", level: 85 },
      { name: "Azure DevOps", level: 80 },
    ],
  },
];

const tools = [
  { name: "Visual Studio", icon: <Settings size={16} /> },
  { name: "VS Code", icon: <Settings size={16} /> },
  { name: "Postman", icon: <Globe size={16} /> },
  { name: "Azure Portal", icon: <Cloud size={16} /> },
  { name: "SQL Server Mgmt Studio", icon: <Database size={16} /> },
  { name: "Git", icon: <Layers size={16} /> },
  { name: "Docker Desktop", icon: <Smartphone size={16} /> },
  { name: "Swagger", icon: <Shield size={16} /> },
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
    <div className="mb-4">
      <div className="flex justify-between mb-1.5">
        <span className="text-sm text-slate-700">{name}</span>
        <span className="text-xs text-slate-500">{level}%</span>
      </div>
      <div className="h-2 rounded-full bg-dark-600 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={inView ? { width: `${level}%` } : { width: 0 }}
          transition={{ duration: 1.2, delay, ease: "easeOut" }}
          className="h-full rounded-full"
          style={{
            background: `linear-gradient(90deg, ${color}, ${color}88)`,
            boxShadow: `0 0 10px ${color}40`,
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
    <section id="skills" className="relative py-32 overflow-hidden">
      <div className="floating-orb w-72 h-72 bg-[#4F46E5] -right-20 top-20" />

      <div className="max-w-7xl mx-auto px-6" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <span className="text-sm tracking-[0.3em] uppercase text-[#DB2777] mb-4 block">
            What I Bring to the Table
          </span>
          <h2 className="text-4xl md:text-6xl font-bold">
            My <span className="gradient-text">Skills</span> & Expertise
          </h2>
          <p className="text-slate-600 mt-4 max-w-lg mx-auto">
            Over 6 years of hands-on experience across the full technology stack
          </p>
          <div className="glow-line max-w-xs mx-auto mt-6" />
        </motion.div>

        {/* Category Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {skillCategories.map((cat, i) => (
            <motion.button
              key={cat.name}
              onClick={() => setActiveTab(i)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
                activeTab === i
                  ? "text-white"
                  : "glass text-slate-600 hover:text-slate-900"
              }`}
              style={
                activeTab === i
                  ? {
                      background: `linear-gradient(135deg, ${cat.color}, ${cat.color}88)`,
                      boxShadow: `0 0 20px ${cat.color}40`,
                    }
                  : {}
              }
            >
              {cat.icon}
              {cat.name}
            </motion.button>
          ))}
        </motion.div>

        {/* Active Skills */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto glass rounded-2xl p-8"
        >
          <div className="grid md:grid-cols-2 gap-x-8">
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
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {[
            { value: "C#", label: "Primary Language", color: "#4F46E5" },
            { value: ".NET", label: "Core Framework", color: "#0D9488" },
            { value: "Azure", label: "Cloud Platform", color: "#7C3AED" },
            { value: "React", label: "Frontend Choice", color: "#DB2777" },
          ].map((item) => (
            <motion.div
              key={item.label}
              whileHover={{ scale: 1.05, y: -5 }}
              className="glass rounded-xl p-6 text-center cursor-default"
            >
              <div
                className="text-2xl md:text-3xl font-bold mb-1"
                style={{ color: item.color }}
              >
                {item.value}
              </div>
              <div className="text-xs text-slate-500">{item.label}</div>
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
          <h3 className="text-center text-xl font-bold text-slate-900 mb-8">
            Tools & Technologies I Use Daily
          </h3>
          <div className="flex flex-wrap justify-center gap-3">
            {tools.map((tool, i) => (
              <motion.div
                key={tool.name}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.4, delay: 0.9 + i * 0.06 }}
                whileHover={{
                  scale: 1.1,
                  boxShadow: "0 0 15px rgba(79, 70, 229, 0.3)",
                }}
                className="flex items-center gap-2 px-4 py-2.5 rounded-full glass glass-hover text-slate-700 text-sm cursor-default"
              >
                {tool.icon}
                {tool.name}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
