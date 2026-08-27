"use client";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import { ArrowRight, ArrowDown, Sparkles } from "lucide-react";

const tools = ["C#", ".NET Core", "Next.js", "SQL Server", "Azure", "Docker"];

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  // CSS animations already honour prefers-reduced-motion; these JS-driven ones
  // have to opt in themselves, or the hero keeps sliding for people who asked
  // it not to. `initial` and `animate` stay identical either way, so the server
  // and the client always render the same markup — only the transition
  // collapses to zero, which lands the element on its final state.
  const reduce = useReducedMotion();
  const rise = (delay = 0, y = 24, duration = 0.7) => ({
    initial: { opacity: 0, y },
    animate: { opacity: 1, y: 0 },
    transition: reduce ? { duration: 0 } : { duration, delay },
  });

  // Scroll-linked parallax: copy and portrait leave the viewport at different
  // speeds, so the layers separate as the visitor scrolls.
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const copyY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const portraitY = useTransform(scrollYProgress, [0, 1], [0, -70]);
  const shapeScale = useTransform(scrollYProgress, [0, 1], [1, 1.18]);
  // Holds full opacity while the hero is still the thing on screen, then eases
  // out — never dimmed at rest.
  const fade = useTransform(scrollYProgress, [0.25, 0.9], [1, 0]);

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden pt-24 pb-14"
    >
      {/* Soft ambient light */}
      <div className="blob-orb w-[30rem] h-[30rem] bg-[#ffd0ab] -top-40 -right-32" />
      <div className="blob-orb w-96 h-96 bg-[#c8e6df] -bottom-40 -left-32" />
      {/* Calms the page's dot grid behind the hero so the copy sits on a clean
          wash, the way the reference layouts do. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(75%_65%_at_35%_45%,rgba(248,244,236,0.92),rgba(248,244,236,0.35)_60%,transparent_85%)]"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
        <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-14 lg:gap-8 items-center">
          {/* ---------------- Left: copy ---------------- */}
          <motion.div style={{ y: copyY, opacity: fade }} className="text-center lg:text-left">
            <motion.div {...rise(0, 14, 0.55)} className="mb-6">
              <span className="inline-flex items-center gap-2.5 rounded-full bg-white/80 border border-[#1c1917]/10 pl-3 pr-4 py-1.5 shadow-sm">
                <span className="relative flex w-2 h-2">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-[#15803d] opacity-60 animate-ping" />
                  <span className="relative inline-flex w-2 h-2 rounded-full bg-[#15803d]" />
                </span>
                <span className="font-mono text-[10.5px] tracking-[0.18em] uppercase text-[#44403c]">
                  Available for projects
                </span>
              </span>
            </motion.div>

            <motion.span
              {...rise(0.06, 16, 0.6)}
              className="inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.16em] uppercase text-[#c2410c]"
            >
              <Sparkles size={13} />
              Hello, I&rsquo;m
            </motion.span>

            <motion.h1
              {...rise(0.1)}
              className="mt-3 font-[family-name:var(--font-geist-sans)] text-5xl md:text-6xl xl:text-7xl font-extrabold tracking-tight text-[#1c1917] leading-[1.05]"
            >
              Kishan Patel
            </motion.h1>

            <motion.p
              {...rise(0.2)}
              className="mt-3 font-[family-name:var(--font-geist-sans)] text-2xl md:text-3xl font-bold text-[#e4580b]"
            >
              .NET Developer &amp; Product Builder
            </motion.p>

            <motion.p
              {...rise(0.3)}
              className="mt-5 text-[17px] leading-relaxed text-[#57534e] max-w-xl mx-auto lg:mx-0"
            >
              I build enterprise software by day and my own products by night —
              FlexyPdf, MunafaLab and ScriptProof among them. From first idea
              to a deployed, scaling product — end to end.
            </motion.p>

            {/* Buttons — primary carries the accent, secondary answers in ink */}
            <motion.div
              {...rise(0.4)}
              className="mt-9 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <a
                href="#projects"
                className="group inline-flex h-14 items-center justify-center gap-2.5 rounded-full bg-gradient-to-b from-[#f0641a] to-[#dd4f07] px-8 text-[15px] font-bold text-white shadow-[0_10px_26px_-8px_rgba(228,88,11,0.55),inset_0_1px_0_rgba(255,255,255,0.25)] hover:shadow-[0_16px_34px_-8px_rgba(228,88,11,0.65),inset_0_1px_0_rgba(255,255,255,0.25)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300"
              >
                View My Work
                <span className="grid place-items-center w-6 h-6 rounded-full bg-white/20 transition-transform duration-300 group-hover:translate-x-1">
                  <ArrowRight size={14} />
                </span>
              </a>
              <a
                href="#contact"
                className="inline-flex h-14 items-center justify-center gap-2 rounded-full border-[1.5px] border-[#1c1917] bg-[#fffdf7] px-8 text-[15px] font-bold text-[#1c1917] hover:bg-[#1c1917] hover:text-[#fffdf7] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300"
              >
                Let&rsquo;s Talk
              </a>
            </motion.div>

            {/* Tools I use */}
            <motion.div
              {...rise(0.55, 20)}
              className="mt-10"
            >
              <p className="font-mono text-[10px] tracking-[0.28em] uppercase text-[#78716c] mb-3">
                Tools I use
              </p>
              <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
                {tools.map((t) => (
                  <span
                    key={t}
                    className="rounded-full bg-white/70 border border-[#1c1917]/10 px-3.5 py-1.5 text-[12.5px] font-medium text-[#44403c] shadow-sm hover:border-[#e4580b]/40 hover:text-[#c2410c] transition-colors"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* ---------------- Right: portrait ---------------- */}
          {/* The classic break-out treatment, with NO fade anywhere so nothing
              can ever look smudged: the body renders inside a circle-shaped
              clip, so the photo's flat crop is concealed by the circle's own
              curve, while a second, pixel-identical copy of the image — masked
              to just the top stretch — lets the head rise above the circle. */}
          <motion.div style={{ y: portraitY }} className="relative flex justify-center">
            <motion.div
              {...rise(0.25, 30, 0.9)}
              className="relative w-[310px] sm:w-[370px] lg:w-[430px]"
            >
              <div className="relative w-full" style={{ aspectRatio: "1024 / 1231" }}>
                {/* Warm glow bleeding past the shape */}
                <div
                  aria-hidden
                  className="absolute left-1/2 -translate-x-1/2 bottom-4 w-[88%] aspect-square rounded-full bg-[#e4580b]/30 blur-3xl"
                />
                {/* Squircle echo outline behind the shape */}
                <div
                  aria-hidden
                  className="absolute left-1/2 -translate-x-1/2 -bottom-5 w-[126%] aspect-square rounded-[38%] border border-[#e4580b]/20 rotate-6"
                />
                {/* The squircle itself — deep peach with an inner rim light */}
                <motion.div
                  aria-hidden
                  style={{ scale: shapeScale }}
                  className="absolute left-1/2 -translate-x-1/2 bottom-0 w-[114%] aspect-square rounded-[38%] bg-[radial-gradient(circle_at_38%_26%,#ffe8d4,#ffcfa8_52%,#ffb37f_100%)] shadow-[inset_0_-24px_48px_rgba(228,88,11,0.22),inset_0_2px_18px_rgba(255,255,255,0.55)]"
                />

                {/* Body layer — tight crop (148% scale, anchored on the head),
                    clipped by a squircle that matches the backdrop exactly:
                    the figure's lower edge IS the shape's curve. */}
                <div className="absolute left-1/2 -translate-x-1/2 bottom-0 w-[114%] aspect-square rounded-[38%] overflow-hidden">
                  <Image
                    src="/kishan-hero.png"
                    alt="Kishan Patel"
                    width={1024}
                    height={1231}
                    priority
                    sizes="(max-width: 1024px) 550px, 640px"
                    className="absolute left-1/2 -translate-x-1/2 w-[129.8%] max-w-none h-auto select-none"
                    style={{ bottom: "-44.9%" }}
                  />
                </div>

                {/* Head layer — the same image at the same page position, kept
                    only for the top stretch so the head overlaps the shape.
                    The copies are pixel-identical where they overlap, so the
                    hand-off is invisible. */}
                <Image
                  src="/kishan-hero.png"
                  alt=""
                  aria-hidden
                  width={1024}
                  height={1231}
                  sizes="(max-width: 1024px) 550px, 640px"
                  className="absolute left-1/2 -translate-x-1/2 w-[148%] max-w-none h-auto select-none"
                  style={{
                    bottom: "-42.6%",
                    maskImage:
                      "linear-gradient(to bottom, #000 0%, #000 12.5%, transparent 21%)",
                    WebkitMaskImage:
                      "linear-gradient(to bottom, #000 0%, #000 12.5%, transparent 21%)",
                  }}
                />

                {/* Vector accents — starburst, plus-grid, squiggle */}
                <svg
                  aria-hidden
                  viewBox="0 0 40 40"
                  className="absolute -right-2 top-[10%] w-9 h-9 text-[#e4580b] animate-spin-slower"
                >
                  <path
                    fill="currentColor"
                    d="M20 0l3.2 12.6L36 9.4l-9.4 9.2L36 30.6l-12.8-3.2L20 40l-3.2-12.6L4 30.6l9.4-12L4 9.4l12.8 3.2z"
                    opacity="0.85"
                  />
                </svg>
                <svg
                  aria-hidden
                  viewBox="0 0 54 54"
                  className="absolute left-[1%] top-[20%] w-11 h-11 text-[#1c1917]/30 animate-float"
                >
                  {[0, 20, 40].flatMap((x) =>
                    [0, 20, 40].map((y) => (
                      <path
                        key={`${x}-${y}`}
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        d={`M${x + 7} ${y + 3}v8M${x + 3} ${y + 7}h8`}
                      />
                    ))
                  )}
                </svg>
                <svg
                  aria-hidden
                  viewBox="0 0 90 22"
                  className="absolute -left-6 bottom-[1%] w-20 text-[#e4580b]/70 animate-float-delayed"
                >
                  <path
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    d="M3 16c8-10 14-10 22 0s14 10 22 0 14-10 22 0 12 8 18 3"
                  />
                </svg>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll cue */}
      <motion.div
        style={{ opacity: fade }}
        className="absolute bottom-7 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 9, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center gap-2 text-[#78716c]"
        >
          <span className="font-mono text-[10px] tracking-[0.25em] uppercase">
            Scroll
          </span>
          <ArrowDown size={15} />
        </motion.div>
      </motion.div>
    </section>
  );
}
