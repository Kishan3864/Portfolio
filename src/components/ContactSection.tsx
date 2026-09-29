"use client";
import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState, type FormEvent } from "react";
import {
  Mail,
  Send,
  ArrowUpRight,
  Sparkles,
  MessageSquare,
  User,
  Phone,
  Pencil,
  ShieldCheck,
  Clock,
  Loader2,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/BrandIcons";
import { profile } from "@/lib/profile";
import { featuredProjects, projectStats } from "@/lib/projects";
import {
  validateContact,
  COOLDOWN_SECONDS,
  type ContactErrors,
} from "@/lib/validation";

const connectLinks = [
  { name: "GitHub", url: profile.github, icon: <GithubIcon size={18} /> },
  { name: "LinkedIn", url: profile.linkedin, icon: <LinkedinIcon size={18} /> },
  { name: "Email", url: `mailto:${profile.email}`, icon: <Mail size={18} /> },
];

const COOLDOWN_KEY = "contact_cooldown_until";

// Local cooldown persistence for instant UI. The 15-minute limit itself is
// enforced by the server (per IP + email), so incognito or another device
// still gets blocked — this just shows the countdown without a round trip.
// Both helpers deal in an absolute "locked until" timestamp. Storage is only a
// cache so a reload stays locked before the server answers — the live deadline
// is held in memory, so the lock survives storage being unavailable entirely
// (private windows, blocked site data), which is the case that matters most.
function readCooldownUntil(): number {
  try {
    return Number(localStorage.getItem(COOLDOWN_KEY) || 0);
  } catch {
    return 0;
  }
}

function writeCooldownUntil(until: number) {
  try {
    localStorage.setItem(COOLDOWN_KEY, String(until));
  } catch {
    // storage unavailable (private mode etc.) — server still enforces it
  }
}

function secondsUntil(deadline: number): number {
  return Math.max(0, Math.ceil((deadline - Date.now()) / 1000));
}

// Underline fields: the rule under each row is the input's whole frame, and it
// lights orange on focus / red when the value is rejected.
const fieldRow =
  "flex items-center gap-3 border-b-[1.5px] pb-2.5 transition-colors";
const fieldInput =
  "w-full bg-transparent text-[#1c1917] placeholder-[#a8a29e] focus:outline-none";

function FieldLabel({ children }: { children: React.ReactNode }) {
  return (
    <label className="block font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-[#78716c] mb-2.5">
      {children}
    </label>
  );
}

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="flex items-start gap-1.5 text-[13px] font-medium text-[#b91c1c] mt-2">
      <AlertCircle size={14} className="mt-0.5 shrink-0" />
      {message}
    </p>
  );
}

export default function ContactSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [fieldErrors, setFieldErrors] = useState<ContactErrors>({});
  const [status, setStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");
  const [feedback, setFeedback] = useState("");
  const [cooldownLeft, setCooldownLeft] = useState(0);

  // The authoritative deadline for this tab. Never moves earlier, so a stale
  // storage value can't unlock a visitor the server still considers blocked.
  const deadlineRef = useRef(0);

  const lockUntil = (until: number) => {
    if (until <= deadlineRef.current) return;
    deadlineRef.current = until;
    writeCooldownUntil(until);
    setCooldownLeft(secondsUntil(until));
  };

  const startCooldown = (seconds: number) =>
    lockUntil(Date.now() + seconds * 1000);

  // Ask the SERVER whether this visitor is still on cooldown. localStorage is
  // empty in a new incognito window, so this is what keeps the button locked
  // there too — the limit is tracked per IP (and per email) in the database.
  const syncCooldownFromServer = async (email?: string) => {
    try {
      const qs = email ? `?email=${encodeURIComponent(email)}` : "";
      const res = await fetch(`/api/contact${qs}`, { cache: "no-store" });
      const data = await res.json().catch(() => ({}));
      const remaining = Number(data.retryAfterSeconds) || 0;
      if (remaining > 0) startCooldown(remaining);
    } catch {
      // offline or blocked — POST still enforces the limit
    }
  };

  // Restore the cached deadline, confirm it with the server, then tick down
  // from the in-memory deadline (not from storage).
  useEffect(() => {
    lockUntil(readCooldownUntil());
    void syncCooldownFromServer();
    const t = setInterval(
      () => setCooldownLeft(secondsUntil(deadlineRef.current)),
      1000
    );
    return () => clearInterval(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setField = (field: keyof typeof formState) => (value: string) => {
    setFormState((s) => ({ ...s, [field]: value }));
    // Clear the field's error as soon as the visitor edits it.
    setFieldErrors((e) => (e[field] ? { ...e, [field]: undefined } : e));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (cooldownLeft > 0 || status === "sending") return;

    // Client-side validation mirrors the server exactly (shared module).
    const { errors, values } = validateContact(formState);
    if (Object.values(errors).some(Boolean)) {
      setFieldErrors(errors);
      setStatus("error");
      setFeedback("Please fix the highlighted fields and try again.");
      return;
    }

    setFieldErrors({});
    setStatus("sending");
    setFeedback("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.ok) {
        setStatus("success");
        setFeedback(
          "Thanks! Your message has been received — I'll get back to you within 24 hours. A confirmation email is on its way."
        );
        setFormState({ name: "", email: "", phone: "", message: "" });
        startCooldown(Number(data.cooldownSeconds) || COOLDOWN_SECONDS);
      } else if (res.status === 429) {
        setStatus("error");
        setFeedback(data.error || "Please wait a few minutes before sending another message.");
        startCooldown(Number(data.retryAfterSeconds) || COOLDOWN_SECONDS);
      } else {
        setStatus("error");
        if (data.errors) setFieldErrors(data.errors as ContactErrors);
        setFeedback(data.error || "Something went wrong. Please try again.");
      }
    } catch {
      setStatus("error");
      setFeedback("Network error. Please try again, or email me directly.");
    }
  };

  const disabled = status === "sending" || cooldownLeft > 0;

  return (
    <section id="contact" className="relative py-28 overflow-hidden">
      <div className="blob-orb w-96 h-96 bg-[#ffd0ab] -left-40 top-20" />
      <div className="blob-orb w-72 h-72 bg-[#c8e6df] -right-20 bottom-20" />

      <div className="max-w-6xl mx-auto px-6" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <span className="section-label mb-4">Let&apos;s Connect</span>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight">
            Get in <span className="italic text-[#c2410c] marker">touch.</span>
          </h2>
          <p className="text-[#57534e] mt-4 max-w-lg text-lg">
            Ready to start your next project? Let&apos;s discuss how I can help
            you build something extraordinary.
          </p>
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
              <h3 className="text-2xl font-bold mb-4">
                Let&apos;s build something{" "}
                <span className="italic text-[#c2410c]">great</span> together
              </h3>
              <p className="text-[#57534e] leading-relaxed">
                Whether you need a full-stack web application, an API system, a
                SaaS product, or consulting on your .NET project — I&apos;m here
                to help. With 6+ years of experience and {projectStats.total}+
                live products of my own, I bring both technical depth and real product-shipping
                experience to every engagement.
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
                  title: "Business Websites",
                  desc: "Fast, SEO-ready sites for restaurants, contractors, studios & startups",
                },
              ].map((service, i) => (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }}
                  className="flex items-start gap-3 group"
                >
                  <Sparkles size={16} className="text-[#c2410c] mt-1 shrink-0" />
                  <div>
                    <span className="font-semibold text-[#1c1917] group-hover:text-[#c2410c] transition-colors">
                      {service.title}
                    </span>
                    <span className="text-[#78716c] text-sm block">
                      {service.desc}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Connect with me — verifiable profiles + direct email */}
            <div>
              <p className="section-label mb-4">Connect With Me</p>
              <div className="flex flex-wrap gap-4">
                {connectLinks.map((link) => (
                  <motion.a
                    key={link.name}
                    href={link.url}
                    target={link.url.startsWith("mailto:") ? undefined : "_blank"}
                    rel="noopener noreferrer"
                    whileHover={{ rotate: -2, scale: 1.04 }}
                    whileTap={{ scale: 0.95 }}
                    className="chip flex items-center gap-2 px-5 py-3 font-semibold text-[#1c1917]"
                  >
                    <span className="text-[#c2410c]">{link.icon}</span>
                    {link.name}
                    <ArrowUpRight size={14} />
                  </motion.a>
                ))}
              </div>
            </div>

            {/* My Products */}
            <div>
              <p className="section-label mb-4">My Live Products</p>
              <div className="flex flex-wrap gap-4">
                {featuredProjects.map((link) => (

                  <motion.a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ rotate: 2, scale: 1.04 }}
                    whileTap={{ scale: 0.95 }}
                    className="chip flex items-center gap-2 px-5 py-3 font-semibold text-[#1c1917]"
                  >
                    {link.name}
                    <ArrowUpRight size={14} />
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right: Contact Form — replaced entirely while the visitor is on
              cooldown, so no disabled form or countdown is on screen. */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {/* Deliberately a plain conditional, not AnimatePresence: with an
                exit animation the replacement can only mount once the form has
                finished animating out, so a stalled frame would leave the form
                on screen. The swap must never depend on an animation. */}
            {cooldownLeft > 0 ? (
                <motion.div
                  key="sent"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.35 }}
                  className="card p-10 text-center"
                >
                  <span className="grid place-items-center w-16 h-16 mx-auto mb-6 rounded-full bg-[#dcfce7] border-2 border-[#1c1917] shadow-[4px_4px_0_rgba(28,25,23,0.9)] text-[#15803d]">
                    <CheckCircle2 size={30} />
                  </span>
                  <h3 className="text-2xl font-bold mb-3">
                    {status === "success" ? (
                      <>
                        Message <span className="italic text-[#c2410c]">received.</span>
                      </>
                    ) : (
                      <>
                        Already <span className="italic text-[#c2410c]">in my inbox.</span>
                      </>
                    )}
                  </h3>
                  <p className="text-[#57534e] leading-relaxed mb-8 max-w-sm mx-auto">
                    Thanks for writing in — I read every message personally and
                    I&apos;ll reply within 24 hours. A confirmation email is on
                    its way to you.
                  </p>

                  <a
                    href={`mailto:${profile.email}`}
                    className="btn-outline px-7 py-3.5"
                  >
                    <Mail size={17} />
                    Email me directly
                  </a>

                  <p className="mt-8 pt-6 border-t-[1.5px] border-dashed border-[#1c1917]/25 text-xs text-[#78716c] flex items-center justify-center gap-2">
                    <ShieldCheck size={14} className="text-[#0e7466]" />
                    One message per 15 minutes — this keeps my inbox spam-free
                  </p>
                </motion.div>
              ) : (
                <motion.div
                  key="form"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.35 }}
                  className="relative"
                >
                  {/* Folder tab heading that sits on the card's top edge */}
                  <div className="btn-shape absolute -top-5 left-6 z-10 flex items-center gap-2 px-5 py-2.5 bg-[#1c1917] text-[#fffdf7] border-[1.5px] border-[#1c1917] shadow-[3px_3px_0_#e4580b]">
                    <MessageSquare size={16} />
                    <h3 className="text-sm font-bold text-[#fffdf7]">
                      Send me a message
                    </h3>
                  </div>

                  <div className="card px-8 pt-12 pb-8">
                    <form onSubmit={handleSubmit} className="space-y-7" noValidate>
                      <div>
                        <FieldLabel>Your Name</FieldLabel>
                        <div
                          className={`${fieldRow} ${
                            fieldErrors.name
                              ? "border-[#b91c1c]"
                              : "border-[#1c1917] focus-within:border-[#e4580b]"
                          }`}
                        >
                          <User size={16} className="shrink-0 text-[#a8a29e]" />
                          <input
                            type="text"
                            value={formState.name}
                            onChange={(e) => setField("name")(e.target.value)}
                            placeholder="John Doe"
                            aria-invalid={!!fieldErrors.name}
                            aria-describedby={fieldErrors.name ? "err-name" : undefined}
                            className={fieldInput}
                            required
                          />
                        </div>
                        <FieldError id="err-name" message={fieldErrors.name} />
                      </div>

                      <div>
                        <FieldLabel>Your Email</FieldLabel>
                        <div
                          className={`${fieldRow} ${
                            fieldErrors.email
                              ? "border-[#b91c1c]"
                              : "border-[#1c1917] focus-within:border-[#e4580b]"
                          }`}
                        >
                          <Mail size={16} className="shrink-0 text-[#a8a29e]" />
                          <input
                            type="email"
                            value={formState.email}
                            onChange={(e) => setField("email")(e.target.value)}
                            // Re-check on blur: catches someone who already wrote
                            // in from a different device using the same address.
                            onBlur={(e) => {
                              const v = e.target.value.trim().toLowerCase();
                              if (v.includes("@")) void syncCooldownFromServer(v);
                            }}
                            placeholder="john@gmail.com"
                            aria-invalid={!!fieldErrors.email}
                            aria-describedby={fieldErrors.email ? "err-email" : undefined}
                            className={fieldInput}
                            required
                          />
                        </div>
                        <FieldError id="err-email" message={fieldErrors.email} />
                      </div>

                      <div>
                        <FieldLabel>Your Phone Number</FieldLabel>
                        <div
                          className={`${fieldRow} ${
                            fieldErrors.phone
                              ? "border-[#b91c1c]"
                              : "border-[#1c1917] focus-within:border-[#e4580b]"
                          }`}
                        >
                          <Phone size={16} className="shrink-0 text-[#a8a29e]" />
                          <input
                            type="tel"
                            value={formState.phone}
                            onChange={(e) => setField("phone")(e.target.value)}
                            placeholder="+91 98765 43210"
                            aria-invalid={!!fieldErrors.phone}
                            aria-describedby={fieldErrors.phone ? "err-phone" : undefined}
                            className={fieldInput}
                            required
                          />
                        </div>
                        <FieldError id="err-phone" message={fieldErrors.phone} />
                      </div>

                      <div>
                        <FieldLabel>Your Message</FieldLabel>
                        <div
                          className={`${fieldRow} items-start ${
                            fieldErrors.message
                              ? "border-[#b91c1c]"
                              : "border-[#1c1917] focus-within:border-[#e4580b]"
                          }`}
                        >
                          <Pencil size={16} className="shrink-0 text-[#a8a29e] mt-1" />
                          <textarea
                            value={formState.message}
                            onChange={(e) => setField("message")(e.target.value)}
                            placeholder="Tell me about your project..."
                            rows={4}
                            aria-invalid={!!fieldErrors.message}
                            aria-describedby={
                              fieldErrors.message ? "err-message" : undefined
                            }
                            className={`${fieldInput} resize-none`}
                            required
                          />
                        </div>
                        <FieldError id="err-message" message={fieldErrors.message} />
                      </div>

                      <button
                        type="submit"
                        disabled={disabled}
                        className="btn-accent w-full py-4 text-lg disabled:opacity-60 disabled:cursor-not-allowed"
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
                      </button>

                      {/* Submission feedback */}
                      {feedback && status !== "success" && (
                        <div
                          role="status"
                          className="btn-shape flex items-start gap-2 text-sm font-medium px-4 py-3 border-[1.5px] border-[#1c1917] bg-[#fee2e2] text-[#991b1b]"
                        >
                          <AlertCircle size={16} className="mt-0.5 shrink-0" />
                          <span>{feedback}</span>
                        </div>
                      )}

                      {/* Trust reassurance */}
                      <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 pt-1 text-xs text-[#78716c]">
                        <span className="flex items-center gap-2">
                          <ShieldCheck size={14} className="text-[#0e7466]" />
                          Your details stay private — never shared or sold
                        </span>
                        <span className="flex items-center gap-2">
                          <Clock size={14} className="text-[#c2410c]" />
                          I personally reply within 24 hours
                        </span>
                      </div>
                    </form>
                  </div>
                </motion.div>
              )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
