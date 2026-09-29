"use client";
import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  // Rendered client-only (dynamic import with ssr: false), so the media
  // queries can be read during the first render instead of via an effect.
  const [enabled] = useState(
    () =>
      !window.matchMedia("(pointer: coarse)").matches &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );

  // Motion values update WITHOUT triggering React re-renders.
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const dotX = useSpring(x, { damping: 30, stiffness: 500, mass: 0.3 });
  const dotY = useSpring(y, { damping: 30, stiffness: 500, mass: 0.3 });
  const ringX = useSpring(x, { damping: 20, stiffness: 200, mass: 0.5 });
  const ringY = useSpring(y, { damping: 20, stiffness: 200, mass: 0.5 });

  useEffect(() => {
    if (!enabled) return;

    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    window.addEventListener("mousemove", move, { passive: true });
    return () => window.removeEventListener("mousemove", move);
  }, [enabled, x, y]);


  if (!enabled) return null;

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 w-3 h-3 -ml-1.5 -mt-1.5 rounded-full bg-[#e4580b] pointer-events-none z-[100]"
        style={{ x: dotX, y: dotY }}
      />
      <motion.div
        className="fixed top-0 left-0 w-9 h-9 -ml-[18px] -mt-[18px] rounded-full border-[1.5px] border-[#1c1917]/50 pointer-events-none z-[100]"
        style={{ x: ringX, y: ringY }}
      />
    </>
  );
}
