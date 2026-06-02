"use client";

import type { MotionValue } from "framer-motion";
import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { BG_GRADIENT } from "@/features/landing/hero/constants/gradients";
import { HERO_ORBS } from "@/features/landing/hero/constants/orbs";
import { HERO } from "@/features/landing/hero/constants/styles";

const GRID_PATTERN_ID = "grid";
const GRID_CELL_SIZE = 60;
const GRID_PATH = "M 60 0 L 0 0 0 60";
const GRID_STROKE = "white";
const GRID_STROKE_WIDTH = 0.5;

interface HeroBgLayerProps {
  bgTransform: MotionValue<string>;
}

export function HeroBgLayer({ bgTransform }: HeroBgLayerProps) {
  const reducedMotion = useReducedMotion() ?? false;
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const prefersReducedMotion = mounted && reducedMotion;

  return (
    <motion.div
      className={HERO.BG_LAYER}
      style={{ transform: prefersReducedMotion ? undefined : bgTransform }}
    >
      <div className={HERO.BG_INNER} style={{ background: BG_GRADIENT }} />
      <svg className={HERO.BG_SVG} xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern
            id={GRID_PATTERN_ID}
            width={GRID_CELL_SIZE}
            height={GRID_CELL_SIZE}
            patternUnits="userSpaceOnUse"
          >
            <path
              d={GRID_PATH}
              fill="none"
              stroke={GRID_STROKE}
              strokeWidth={GRID_STROKE_WIDTH}
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#${GRID_PATTERN_ID})`} />
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
