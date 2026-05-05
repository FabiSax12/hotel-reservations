"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useI18n } from "@/locales";
import { HERO } from "@/features/landing/hero/constants/styles";
import { EXPO_OUT } from "@/features/landing/constants/animations";
import { WORDMARK_CHARS, CHAR_CONTAINER } from "@/features/landing/hero/constants/animations";

export function HeroLeftContent() {
  const { t } = useI18n();
  const hero = t.LANDING.HERO;
  const prefersReducedMotion = useReducedMotion() ?? false;

  const CHAR_ITEM = prefersReducedMotion
    ? { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.3 } } }
    : { hidden: { opacity: 0, y: 18, rotateX: 60 }, visible: { opacity: 1, y: 0, rotateX: 0, transition: { duration: 0.55, ease: EXPO_OUT } } };

  const STAGGER_CONTENT = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1, delayChildren: prefersReducedMotion ? 0.3 : 1.2 } },
  };

  const FADE_UP = prefersReducedMotion
    ? { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.4 } } }
    : { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: EXPO_OUT } } };

  return (
    <div className={HERO.LEFT}>
      <motion.span
        className={HERO.EYEBROW}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.1, ease: EXPO_OUT }}
      >
        {hero.EYEBROW}
      </motion.span>

      <motion.p className={HERO.WORDMARK} variants={CHAR_CONTAINER} initial="hidden" animate="visible" style={{ perspective: 600 }}>
        {WORDMARK_CHARS.map((char, i) => (
          <motion.span key={i} variants={CHAR_ITEM} style={{ display: "inline-block", transformOrigin: "bottom" }}>
            {char}
          </motion.span>
        ))}
      </motion.p>

      <h1 className={HERO.HEADLINE} aria-label={`${hero.HEADLINE_LINE1} ${hero.HEADLINE_LINE2}`}>
        <span className={HERO.HEADLINE_LINE_WRAPPER} style={{ lineHeight: "0.97" }}>
          <motion.span className={HERO.HEADLINE_LINE_ITALIC} initial={{ y: "110%" }} animate={{ y: "0%" }}
            transition={{ duration: 1.1, delay: prefersReducedMotion ? 0.1 : 0.65, ease: EXPO_OUT }}>
            {hero.HEADLINE_LINE1}
          </motion.span>
        </span>
        <span className={HERO.HEADLINE_LINE_WRAPPER} style={{ lineHeight: "0.97" }}>
          <motion.span className={HERO.HEADLINE_LINE} initial={{ y: "110%" }} animate={{ y: "0%" }}
            transition={{ duration: 1.1, delay: prefersReducedMotion ? 0.2 : 0.82, ease: EXPO_OUT }}>
            {hero.HEADLINE_LINE2}
          </motion.span>
        </span>
      </h1>

      <motion.div variants={STAGGER_CONTENT} initial="hidden" animate="visible" className={HERO.CONTENT_STAGGER}>
        <motion.p className={HERO.SUBHEADLINE} variants={FADE_UP}>{hero.SUBHEADLINE}</motion.p>

        <motion.div className={HERO.CTA_ROW} variants={FADE_UP}>
          <motion.a href="#" className={HERO.CTA_PRIMARY} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
            {hero.CTA_PRIMARY}
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </motion.a>
          <motion.a href="#" className={HERO.CTA_SECONDARY} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
            {hero.CTA_SECONDARY}
          </motion.a>
        </motion.div>

        <motion.div className={HERO.LOCATION_BAR} variants={FADE_UP}>
          <motion.div className={HERO.LOCATION_LINE} initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
            transition={{ duration: 1.2, delay: prefersReducedMotion ? 0.4 : 1.8, ease: EXPO_OUT }} style={{ originX: 0 }} />
          <span className={HERO.LOCATION_TEXT}>{hero.LOCATIONS}</span>
          <motion.div className={HERO.LOCATION_LINE} initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
            transition={{ duration: 1.2, delay: prefersReducedMotion ? 0.4 : 1.8, ease: EXPO_OUT }} style={{ originX: 1 }} />
        </motion.div>
      </motion.div>
    </div>
  );
}
