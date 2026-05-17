"use client";

import type { MotionValue } from "framer-motion";
import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { EXPO_OUT } from "@/features/landing/constants/animations";
import {
  HERO_IMAGE_URL,
  VISUAL_OVERLAY_1,
  VISUAL_OVERLAY_2,
  VISUAL_OVERLAY_3,
} from "@/features/landing/hero/constants/gradients";
import { HERO } from "@/features/landing/hero/constants/styles";
import { useI18n } from "@/locales";

interface HeroVisualPanelProps {
  scale: MotionValue<number>;
}

export function HeroVisualPanel({ scale }: HeroVisualPanelProps) {
  const { t } = useI18n();
  const hero = t.LANDING.HERO;
  const prefersReducedMotion = useReducedMotion() ?? false;

  return (
    <motion.div
      className={HERO.RIGHT}
      initial={
        prefersReducedMotion ? { opacity: 0 } : { opacity: 0, clipPath: "inset(0 0 100% 0)" }
      }
      animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, clipPath: "inset(0 0 0% 0)" }}
      transition={{ duration: prefersReducedMotion ? 0.4 : 1.2, delay: 0.35, ease: EXPO_OUT }}
    >
      <div className={HERO.VISUAL_PANEL}>
        <motion.div
          className={HERO.VISUAL_INNER}
          style={{ scale: prefersReducedMotion ? 1 : scale }}
        >
          <Image
            src={HERO_IMAGE_URL}
            alt={hero.IMAGE_ALT}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 480px"
            priority
          />
          <div className={HERO.VISUAL_INNER} style={{ background: VISUAL_OVERLAY_1 }} />
          <div className={HERO.VISUAL_INNER} style={{ background: VISUAL_OVERLAY_2 }} />
          <div className={HERO.VISUAL_INNER} style={{ background: VISUAL_OVERLAY_3 }} />
          <svg
            className={HERO.VISUAL_SVG}
            viewBox="0 0 400 533"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="xMidYMid slice"
          >
            <circle cx="200" cy="200" r="120" stroke="oklch(67% 0.15 68)" strokeWidth="0.5" />
            <circle cx="200" cy="200" r="80" stroke="oklch(67% 0.15 68)" strokeWidth="0.5" />
            <circle cx="200" cy="200" r="40" stroke="oklch(67% 0.15 68)" strokeWidth="0.5" />
            <line
              x1="80"
              y1="200"
              x2="320"
              y2="200"
              stroke="oklch(67% 0.15 68)"
              strokeWidth="0.5"
            />
            <line
              x1="200"
              y1="80"
              x2="200"
              y2="320"
              stroke="oklch(67% 0.15 68)"
              strokeWidth="0.5"
            />
            <path
              d="M100 400 Q130 340 160 380 Q190 420 220 360 Q250 300 280 380 Q310 420 340 400"
              stroke="oklch(64% 0.09 143)"
              strokeWidth="1"
              fill="none"
            />
            <path
              d="M80 430 Q120 360 160 410 Q200 450 240 380 Q280 320 320 410 Q350 450 380 430"
              stroke="oklch(54% 0.1 143)"
              strokeWidth="1.5"
              fill="none"
            />
          </svg>
          {!prefersReducedMotion && (
            <>
              <motion.div
                className={HERO.VISUAL_ORB_1}
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.div
                className={HERO.VISUAL_ORB_2}
                animate={{ opacity: [0.2, 0.8, 0.2] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              />
              <motion.div
                className={HERO.VISUAL_ORB_3}
                animate={{ opacity: [0.3, 0.9, 0.3] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              />
              <motion.div
                className={HERO.VISUAL_ORB_4}
                animate={{ opacity: [0.2, 0.7, 0.2], y: [0, -6, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 2 }}
              />
            </>
          )}
        </motion.div>

        <div className={HERO.VISUAL_BADGE}>
          <p className={HERO.VISUAL_BADGE_TEXT}>{hero.FEATURED_LABEL}</p>
          <p className={HERO.VISUAL_BADGE_TITLE}>{hero.FEATURED_PROPERTY}</p>
        </div>
      </div>
    </motion.div>
  );
}
