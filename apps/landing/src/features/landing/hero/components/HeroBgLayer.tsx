"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { MotionValue } from "framer-motion";
import { HERO } from "@/features/landing/hero/constants/styles";
import { HERO_ORBS } from "@/features/landing/hero/constants/orbs";

interface HeroBgLayerProps {
  bgTransform: MotionValue<string>;
}

export function HeroBgLayer({ bgTransform }: HeroBgLayerProps) {
  const prefersReducedMotion = useReducedMotion() ?? false;

  return (
    <motion.div
      className={HERO.BG_LAYER}
      style={{ transform: prefersReducedMotion ? undefined : bgTransform }}
    >
      <div
        className={HERO.BG_INNER}
        style={{
          background:
            "radial-gradient(ellipse 80% 70% at 75% 40%, oklch(22% 0.06 143), transparent 70%), radial-gradient(ellipse 50% 60% at 15% 80%, oklch(67% 0.15 68 / 0.07), transparent 60%), oklch(11% 0.04 143)",
        }}
      />
      <svg className={HERO.BG_SVG} xmlns="http://www.w3.org/2000/svg">
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
            className={HERO.RING_OUTER}
            animate={{ rotate: 360 }}
            transition={{ duration: 90, ease: "linear", repeat: Infinity }}
          />
          <motion.div
            className={HERO.RING_INNER}
            style={{ top: "calc(25% + 80px)", right: "calc(20% + 80px)" }}
            animate={{ rotate: -360 }}
            transition={{ duration: 60, ease: "linear", repeat: Infinity }}
          />

          {HERO_ORBS.map((orb, i) => (
            <motion.div
              key={i}
              className={`absolute ${orb.size} rounded-full ${orb.color}`}
              style={orb.style}
              animate={orb.animate}
              transition={orb.transition}
            />
          ))}
        </>
      )}
    </motion.div>
  );
}
