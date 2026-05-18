"use client";

import { motion, useReducedMotion } from "framer-motion";
import { HERO } from "@/features/landing/hero/constants/styles";
import { useI18n } from "@/locales";

export function HeroScrollCue() {
  const { t } = useI18n();
  const prefersReducedMotion = useReducedMotion() ?? false;

  return (
    <motion.div
      className={HERO.SCROLL_CUE}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: prefersReducedMotion ? 0.5 : 2.2, duration: 1 }}
    >
      <span className={HERO.SCROLL_TEXT}>{t.LANDING.HERO.SCROLL_CUE}</span>
      {!prefersReducedMotion && (
        <motion.div
          className={HERO.SCROLL_LINE}
          animate={{ scaleY: [0, 1, 0], originY: 0 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        />
      )}
    </motion.div>
  );
}
