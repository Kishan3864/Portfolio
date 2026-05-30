"use client";
import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import {
  Mail,
  Send,
  Globe,
  ArrowUpRight,
  Sparkles,
  MessageSquare,
  User,
  FileText,
} from "lucide-react";

const socialLinks = [
  {
    name: "FlexYPDF",
    url: "https://flexypdf.com",
    icon: <FileText size={20} />,
    color: "#6C63FF",
  },
  {
    name: "MunafaLab",
    url: "https://munafalab.com",
    icon: <Globe size={20} />,
    color: "#00D4AA",
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

  return (
    <section id="contact" className="relative py-32 overflow-hidden">
      <div className="floating-orb w-96 h-96 bg-[#6C63FF] -left-40 top-20" />
      <div className="floating-orb w-72 h-72 bg-[#00D4AA] -right-20 bottom-20" />

      <div className="max-w-6xl mx-auto px-6" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <span className="text-sm tracking-[0.3em] uppercase text-[#00D4AA] mb-4 block">
            Let&apos;s Connect
          </span>
          <h2 className="text-4xl md:text-6xl font-bold">
            Get in <span className="gradient-text">Touch</span>
          </h2>
          <p className="text-gray-400 mt-4 max-w-lg mx-auto">
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
              <h3 className="text-2xl font-bold text-white mb-4">
                Let&apos;s Build Something Great Together
              </h3>
              <p className="text-gray-400 leading-relaxed">
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
                    className="text-[#6C63FF] mt-1 shrink-0"
                  />
                  <div>
                    <span className="text-white font-medium group-hover:text-[#6C63FF] transition-colors">
                      {service.title}
                    </span>
                    <span className="text-gray-500 text-sm block">
                      {service.desc}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* My Products */}
            <div className="flex flex-wrap gap-4 pt-4">
              {socialLinks.map((link) => (
                <motion.a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 px-5 py-3 rounded-full glass glass-hover text-gray-300"
                >
                  <div style={{ color: link.color }}>{link.icon}</div>
                  {link.name}
                  <ArrowUpRight size={14} />
                </motion.a>
              ))}
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
                <MessageSquare size={20} className="text-[#6C63FF]" />
                <h3 className="text-xl font-bold text-white">
                  Send Me a Message
                </h3>
              </div>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const mailtoLink = `mailto:kishan@devswifter.com?subject=Portfolio Inquiry from ${formState.name}&body=${encodeURIComponent(formState.message)}`;
                  window.location.href = mailtoLink;
                }}
                className="space-y-6"
              >
                <div>
                  <label className="text-sm text-gray-400 mb-2 block">
                    Your Name
                  </label>
                  <div className="relative">
                    <User
                      size={16}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
                    />
                    <input
                      type="text"
                      value={formState.name}
                      onChange={(e) =>
                        setFormState({ ...formState, name: e.target.value })
                      }
                      placeholder="John Doe"
                      className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-dark-700 border border-white/5 text-white placeholder-gray-600 focus:border-[#6C63FF] focus:outline-none transition-colors"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm text-gray-400 mb-2 block">
                    Your Email
                  </label>
                  <div className="relative">
                    <Mail
                      size={16}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
                    />
                    <input
                      type="email"
                      value={formState.email}
                      onChange={(e) =>
                        setFormState({ ...formState, email: e.target.value })
                      }
                      placeholder="john@example.com"
                      className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-dark-700 border border-white/5 text-white placeholder-gray-600 focus:border-[#6C63FF] focus:outline-none transition-colors"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm text-gray-400 mb-2 block">
                    Your Message
                  </label>
                  <textarea
                    value={formState.message}
                    onChange={(e) =>
                      setFormState({ ...formState, message: e.target.value })
                    }
                    placeholder="Tell me about your project..."
                    rows={5}
                    className="w-full px-4 py-3.5 rounded-xl bg-dark-700 border border-white/5 text-white placeholder-gray-600 focus:border-[#6C63FF] focus:outline-none transition-colors resize-none"
                    required
                  />
                </div>

                <motion.button
                  type="submit"
                  whileHover={{
                    scale: 1.02,
                    boxShadow: "0 0 30px rgba(108, 99, 255, 0.4)",
                  }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-[#6C63FF] to-[#00D4AA] text-white font-semibold text-lg flex items-center justify-center gap-2"
                >
                  Send Message
                  <Send size={18} />
                </motion.button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
