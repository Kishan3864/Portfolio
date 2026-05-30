"use client";
import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [enabled, setEnabled] = useState(false);

  // Motion values update WITHOUT triggering React re-renders.
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const dotX = useSpring(x, { damping: 30, stiffness: 500, mass: 0.3 });
  const dotY = useSpring(y, { damping: 30, stiffness: 500, mass: 0.3 });
  const ringX = useSpring(x, { damping: 20, stiffness: 200, mass: 0.5 });
  const ringY = useSpring(y, { damping: 20, stiffness: 200, mass: 0.5 });

  useEffect(() => {
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (isTouch || reduceMotion) return;

    setEnabled(true);

    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    window.addEventListener("mousemove", move, { passive: true });
    return () => window.removeEventListener("mousemove", move);
  }, [x, y]);

  if (!enabled) return null;

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 w-3 h-3 -ml-1.5 -mt-1.5 rounded-full bg-[#4F46E5] pointer-events-none z-[100]"
        style={{ x: dotX, y: dotY }}
      />
      <motion.div
        className="fixed top-0 left-0 w-9 h-9 -ml-[18px] -mt-[18px] rounded-full border border-[#4F46E5]/50 pointer-events-none z-[100]"
        style={{ x: ringX, y: ringY }}
      />
    </>
  );
}
