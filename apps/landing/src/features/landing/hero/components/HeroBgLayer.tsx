"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { MotionValue } from "framer-motion";
import { HERO } from "@/features/landing/hero/constants/styles";

type HeroBgLayerProps = {
  bgTransform: MotionValue<string>;
};

export function HeroBgLayer({ bgTransform }: HeroBgLayerProps) {
  const prefersReducedMotion = useReducedMotion() ?? false;

  return (
    <motion.div
      className={HERO.BG_LAYER}
      style={{ transform: prefersReducedMotion ? undefined : bgTransform }}
    >
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 70% at 75% 40%, oklch(22% 0.06 143), transparent 70%), radial-gradient(ellipse 50% 60% at 15% 80%, oklch(67% 0.15 68 / 0.07), transparent 60%), oklch(11% 0.04 143)",
        }}
      />
      <svg className="absolute inset-0 w-full h-full opacity-[0.025]" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
            <path d="M 60 0 L 0 0 0 60" fill="none" stroke="white" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>

      {!prefersReducedMotion && (
        <>
          <motion.div
            className="absolute top-1/4 right-[20%] w-[480px] h-[480px] rounded-full border border-gold-500/8"
            animate={{ rotate: 360 }}
            transition={{ duration: 90, ease: "linear", repeat: Infinity }}
          />
          <motion.div
            className="absolute top-1/4 right-[20%] w-[320px] h-[320px] rounded-full border border-gold-500/12"
            style={{ top: "calc(25% + 80px)", right: "calc(20% + 80px)" }}
            animate={{ rotate: -360 }}
            transition={{ duration: 60, ease: "linear", repeat: Infinity }}
          />

          <motion.div className="absolute w-2 h-2 rounded-full bg-gold-500" style={{ top: "12%", left: "8%" }}
            animate={{ opacity: [0.3, 0.9, 0.3], y: [0, -8, 0] }} transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }} />
          <motion.div className="absolute w-1 h-1 rounded-full bg-gold-400" style={{ top: "6%", left: "22%" }}
            animate={{ opacity: [0.15, 0.7, 0.15], y: [0, -5, 0] }} transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.8 }} />
          <motion.div className="absolute w-1.5 h-1.5 rounded-full bg-gold-300" style={{ top: "22%", left: "4%" }}
            animate={{ opacity: [0.2, 0.8, 0.2], x: [0, 4, 0], y: [0, -6, 0] }} transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 1.4 }} />
          <motion.div className="absolute w-0.5 h-0.5 rounded-full bg-gold-400" style={{ top: "38%", left: "12%" }}
            animate={{ opacity: [0.1, 0.6, 0.1], y: [0, -4, 0] }} transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut", delay: 2.1 }} />
          <motion.div className="absolute w-1 h-1 rounded-full bg-gold-500" style={{ top: "55%", left: "6%" }}
            animate={{ opacity: [0.25, 0.75, 0.25], x: [0, 3, 0], y: [0, -7, 0] }} transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut", delay: 0.3 }} />
          <motion.div className="absolute w-1.5 h-1.5 rounded-full bg-gold-300" style={{ top: "72%", left: "18%" }}
            animate={{ opacity: [0.2, 0.65, 0.2], y: [0, -5, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1.9 }} />
          <motion.div className="absolute w-1 h-1 rounded-full bg-gold-400" style={{ top: "85%", left: "9%" }}
            animate={{ opacity: [0.15, 0.55, 0.15], x: [0, -3, 0], y: [0, -4, 0] }} transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 2.7 }} />
          <motion.div className="absolute w-2 h-2 rounded-full bg-gold-500" style={{ top: "8%", left: "42%" }}
            animate={{ opacity: [0.2, 0.85, 0.2], y: [0, -9, 0] }} transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut", delay: 0.6 }} />
          <motion.div className="absolute w-0.5 h-0.5 rounded-full bg-gold-300" style={{ top: "30%", left: "36%" }}
            animate={{ opacity: [0.1, 0.5, 0.1], x: [0, 4, 0] }} transition={{ duration: 5.2, repeat: Infinity, ease: "easeInOut", delay: 1.1 }} />
          <motion.div className="absolute w-1 h-1 rounded-full bg-gold-400" style={{ top: "48%", left: "48%" }}
            animate={{ opacity: [0.15, 0.6, 0.15], y: [0, -6, 0] }} transition={{ duration: 4.0, repeat: Infinity, ease: "easeInOut", delay: 3.2 }} />
          <motion.div className="absolute w-1.5 h-1.5 rounded-full bg-gold-500" style={{ top: "68%", left: "38%" }}
            animate={{ opacity: [0.2, 0.7, 0.2], x: [0, -4, 0], y: [0, -5, 0] }} transition={{ duration: 3.6, repeat: Infinity, ease: "easeInOut", delay: 0.9 }} />
          <motion.div className="absolute w-1 h-1 rounded-full bg-gold-300" style={{ top: "88%", left: "44%" }}
            animate={{ opacity: [0.1, 0.5, 0.1], y: [0, -4, 0] }} transition={{ duration: 5.8, repeat: Infinity, ease: "easeInOut", delay: 2.4 }} />
          <motion.div className="absolute w-2 h-2 rounded-full bg-gold-400" style={{ top: "15%", right: "6%" }}
            animate={{ opacity: [0.25, 0.8, 0.25], y: [0, -8, 0] }} transition={{ duration: 3.9, repeat: Infinity, ease: "easeInOut", delay: 1.6 }} />
          <motion.div className="absolute w-1 h-1 rounded-full bg-gold-500" style={{ top: "32%", right: "4%" }}
            animate={{ opacity: [0.2, 0.75, 0.2], x: [0, -3, 0], y: [0, -6, 0] }} transition={{ duration: 4.7, repeat: Infinity, ease: "easeInOut", delay: 0.4 }} />
          <motion.div className="absolute w-0.5 h-0.5 rounded-full bg-gold-300" style={{ top: "62%", right: "8%" }}
            animate={{ opacity: [0.1, 0.55, 0.1], y: [0, -5, 0] }} transition={{ duration: 5.1, repeat: Infinity, ease: "easeInOut", delay: 2.9 }} />
          <motion.div className="absolute w-1.5 h-1.5 rounded-full bg-gold-400" style={{ top: "80%", right: "5%" }}
            animate={{ opacity: [0.2, 0.65, 0.2], x: [0, 3, 0], y: [0, -7, 0] }} transition={{ duration: 4.3, repeat: Infinity, ease: "easeInOut", delay: 1.2 }} />
        </>
      )}
    </motion.div>
  );
}
