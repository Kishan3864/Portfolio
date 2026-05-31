"use client";
import { motion, useInView } from "framer-motion";
import { useRef, useState, type FormEvent } from "react";
import {
  Mail,
  Send,
  Globe,
  ArrowUpRight,
  Sparkles,
  MessageSquare,
  User,
  FileText,
  ShieldCheck,
  Clock,
  Loader2,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/BrandIcons";
import { profile } from "@/lib/profile";

const connectLinks = [
  {
    name: "GitHub",
    url: profile.github,
    icon: <GithubIcon size={20} />,
    color: "#111827",
  },
  {
    name: "LinkedIn",
    url: profile.linkedin,
    icon: <LinkedinIcon size={20} />,
    color: "#334155",
  },
  {
    name: "Email",
    url: `mailto:${profile.email}`,
    icon: <Mail size={20} />,
    color: "#64748B",
  },
];

const productLinks = [
  {
    name: "FlexYPDF",
    url: "https://flexypdf.com",
    icon: <FileText size={20} />,
    color: "#475569",
  },
  {
    name: "MunafaLab",
    url: "https://munafalab.com",
    icon: <Globe size={20} />,
    color: "#475569",
  },
];

export default function ContactSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");
  const [feedback, setFeedback] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("sending");
    setFeedback("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formState),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.ok) {
        setStatus("success");
        setFeedback(
          "Thanks! Your message has been received — I'll get back to you within 24 hours."
        );
        setFormState({ name: "", email: "", message: "" });
      } else {
        setStatus("error");
        setFeedback(data.error || "Something went wrong. Please try again.");
      }
    } catch {
      setStatus("error");
      setFeedback(
        "Network error. Please try again, or email me directly."
      );
    }
  };

  return (
    <section id="contact" className="relative py-32 overflow-hidden">
      <div className="floating-orb w-96 h-96 bg-[#475569] -left-40 top-20" />
      <div className="floating-orb w-72 h-72 bg-[#475569] -right-20 bottom-20" />

      <div className="max-w-6xl mx-auto px-6" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <span className="text-sm tracking-[0.3em] uppercase text-[#475569] mb-4 block">
            Let&apos;s Connect
          </span>
          <h2 className="text-4xl md:text-6xl font-bold">
            Get in <span className="gradient-text">Touch</span>
          </h2>
          <p className="text-slate-600 mt-4 max-w-lg mx-auto">
            Ready to start your next project? Let&apos;s discuss how I can help you
            build something extraordinary.
          </p>
          <div className="glow-line max-w-xs mx-auto mt-6" />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left: Info */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">
                Let&apos;s Build Something Great Together
              </h3>
              <p className="text-slate-600 leading-relaxed">
                Whether you need a full-stack web application, an API system, a
                SaaS product, or consulting on your .NET project — I&apos;m here to
                help. With 6+ years of experience and a track record of
                building successful products, I bring both technical depth and
                business understanding to every project.
              </p>
            </div>

            {/* What I Offer */}
            <div className="space-y-4">
              {[
                {
                  title: "Custom Web Development",
                  desc: ".NET Core, React, Next.js applications",
                },
                {
                  title: "API Development & Integration",
                  desc: "RESTful APIs, microservices, third-party integrations",
                },
                {
                  title: "SaaS Product Development",
                  desc: "End-to-end product build with deployment & scaling",
                },
                {
                  title: "Technical Consulting",
                  desc: "Architecture review, performance optimization, code audit",
                },
              ].map((service, i) => (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }}
                  className="flex items-start gap-3 group"
                >
                  <Sparkles
                    size={16}
                    className="text-[#475569] mt-1 shrink-0"
                  />
                  <div>
                    <span className="text-slate-900 font-medium group-hover:text-[#475569] transition-colors">
                      {service.title}
                    </span>
                    <span className="text-slate-500 text-sm block">
                      {service.desc}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Connect with me — verifiable profiles + direct email */}
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-slate-400 mb-4">
                Connect With Me
              </p>
              <div className="flex flex-wrap gap-4">
                {connectLinks.map((link) => (
                  <motion.a
                    key={link.name}
                    href={link.url}
                    target={link.url.startsWith("mailto:") ? undefined : "_blank"}
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-2 px-5 py-3 rounded-full glass glass-hover text-slate-700"
                  >
                    <div style={{ color: link.color }}>{link.icon}</div>
                    {link.name}
                    <ArrowUpRight size={14} />
                  </motion.a>
                ))}
              </div>
            </div>

            {/* My Products */}
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-slate-400 mb-4">
                My Live Products
              </p>
              <div className="flex flex-wrap gap-4">
                {productLinks.map((link) => (
                  <motion.a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-2 px-5 py-3 rounded-full glass glass-hover text-slate-700"
                  >
                    <div style={{ color: link.color }}>{link.icon}</div>
                    {link.name}
                    <ArrowUpRight size={14} />
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right: Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="glass rounded-2xl p-8">
              <div className="flex items-center gap-3 mb-8">
                <MessageSquare size={20} className="text-[#475569]" />
                <h3 className="text-xl font-bold text-slate-900">
                  Send Me a Message
                </h3>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="text-sm text-slate-600 mb-2 block">
                    Your Name
                  </label>
                  <div className="relative">
                    <User
                      size={16}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
                    />
                    <input
                      type="text"
                      value={formState.name}
                      onChange={(e) =>
                        setFormState({ ...formState, name: e.target.value })
                      }
                      placeholder="John Doe"
                      className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-dark-700 border border-slate-200 text-slate-900 placeholder-gray-600 focus:border-[#475569] focus:outline-none transition-colors"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm text-slate-600 mb-2 block">
                    Your Email
                  </label>
                  <div className="relative">
                    <Mail
                      size={16}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
                    />
                    <input
                      type="email"
                      value={formState.email}
                      onChange={(e) =>
                        setFormState({ ...formState, email: e.target.value })
                      }
                      placeholder="john@example.com"
                      className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-dark-700 border border-slate-200 text-slate-900 placeholder-gray-600 focus:border-[#475569] focus:outline-none transition-colors"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm text-slate-600 mb-2 block">
                    Your Message
                  </label>
                  <textarea
                    value={formState.message}
                    onChange={(e) =>
                      setFormState({ ...formState, message: e.target.value })
                    }
                    placeholder="Tell me about your project..."
                    rows={5}
                    className="w-full px-4 py-3.5 rounded-xl bg-dark-700 border border-slate-200 text-slate-900 placeholder-gray-600 focus:border-[#475569] focus:outline-none transition-colors resize-none"
                    required
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={status === "sending"}
                  whileHover={
                    status === "sending"
                      ? undefined
                      : { scale: 1.02, boxShadow: "0 0 30px rgba(71, 85, 105, 0.4)" }
                  }
                  whileTap={status === "sending" ? undefined : { scale: 0.98 }}
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-[#475569] to-[#475569] text-white font-semibold text-lg flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {status === "sending" ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <Send size={18} />
                    </>
                  )}
                </motion.button>

                {/* Submission feedback */}
                {feedback && (
                  <div
                    role="status"
                    className={`flex items-start gap-2 text-sm rounded-xl px-4 py-3 ${
                      status === "success"
                        ? "bg-[#475569]/10 text-[#0D7a70]"
                        : "bg-[#64748B]/10 text-[#be1f63]"
                    }`}
                  >
                    {status === "success" ? (
                      <CheckCircle2 size={16} className="mt-0.5 shrink-0" />
                    ) : (
                      <AlertCircle size={16} className="mt-0.5 shrink-0" />
                    )}
                    <span>{feedback}</span>
                  </div>
                )}

                {/* Trust reassurance */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 pt-2 text-xs text-slate-500">
                  <span className="flex items-center gap-2">
                    <ShieldCheck size={14} className="text-[#475569]" />
                    Your details stay private — never shared or sold
                  </span>
                  <span className="flex items-center gap-2">
                    <Clock size={14} className="text-[#475569]" />
                    I personally reply within 24 hours
                  </span>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
