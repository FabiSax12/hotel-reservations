"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useMotionTemplate, useReducedMotion } from "framer-motion";
import { useI18n } from "@/locales";
import { HERO } from "@/features/landing/hero/constants/styles";
import { EXPO_OUT } from "@/features/landing/constants/animations";

const WORDMARK_CHARS = Array.from("ALTAVERDE");

const CHAR_CONTAINER = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.045, delayChildren: 0.25 } },
};

export function HeroSection() {
  const { t } = useI18n();
  const hero = t.LANDING.HERO;
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion() ?? false;

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const bgYValue = useTransform(scrollYProgress, [0, 1], ["0%", "28%"]);
  const contentYValue = useTransform(scrollYProgress, [0, 0.55], ["0%", "-14%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.45], [1, 0]);
  const visualScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  const bgTransform = useMotionTemplate`translateY(${bgYValue})`;
  const contentTransform = useMotionTemplate`translateY(${contentYValue})`;

  const CHAR_ITEM = prefersReducedMotion
    ? {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.3 } },
      }
    : {
        hidden: { opacity: 0, y: 18, rotateX: 60 },
        visible: { opacity: 1, y: 0, rotateX: 0, transition: { duration: 0.55, ease: EXPO_OUT } },
      };

  const STAGGER_CONTENT = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1, delayChildren: prefersReducedMotion ? 0.3 : 1.2 } },
  };

  const FADE_UP = prefersReducedMotion
    ? {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.4 } },
      }
    : {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: EXPO_OUT } },
      };

  return (
    <section ref={sectionRef} className={HERO.SECTION}>
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
        <svg
          className="absolute inset-0 w-full h-full opacity-[0.025]"
          xmlns="http://www.w3.org/2000/svg"
        >
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

            {/* Orbs — scattered across full hero */}
            <motion.div className="absolute w-2 h-2 rounded-full bg-gold-500"
              style={{ top: "12%", left: "8%" }}
              animate={{ opacity: [0.3, 0.9, 0.3], y: [0, -8, 0] }}
              transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div className="absolute w-1 h-1 rounded-full bg-gold-400"
              style={{ top: "6%", left: "22%" }}
              animate={{ opacity: [0.15, 0.7, 0.15], y: [0, -5, 0] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
            />
            <motion.div className="absolute w-1.5 h-1.5 rounded-full bg-gold-300"
              style={{ top: "22%", left: "4%" }}
              animate={{ opacity: [0.2, 0.8, 0.2], x: [0, 4, 0], y: [0, -6, 0] }}
              transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 1.4 }}
            />
            <motion.div className="absolute w-0.5 h-0.5 rounded-full bg-gold-400"
              style={{ top: "38%", left: "12%" }}
              animate={{ opacity: [0.1, 0.6, 0.1], y: [0, -4, 0] }}
              transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut", delay: 2.1 }}
            />
            <motion.div className="absolute w-1 h-1 rounded-full bg-gold-500"
              style={{ top: "55%", left: "6%" }}
              animate={{ opacity: [0.25, 0.75, 0.25], x: [0, 3, 0], y: [0, -7, 0] }}
              transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
            />
            <motion.div className="absolute w-1.5 h-1.5 rounded-full bg-gold-300"
              style={{ top: "72%", left: "18%" }}
              animate={{ opacity: [0.2, 0.65, 0.2], y: [0, -5, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1.9 }}
            />
            <motion.div className="absolute w-1 h-1 rounded-full bg-gold-400"
              style={{ top: "85%", left: "9%" }}
              animate={{ opacity: [0.15, 0.55, 0.15], x: [0, -3, 0], y: [0, -4, 0] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 2.7 }}
            />
            <motion.div className="absolute w-2 h-2 rounded-full bg-gold-500"
              style={{ top: "8%", left: "42%" }}
              animate={{ opacity: [0.2, 0.85, 0.2], y: [0, -9, 0] }}
              transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
            />
            <motion.div className="absolute w-0.5 h-0.5 rounded-full bg-gold-300"
              style={{ top: "30%", left: "36%" }}
              animate={{ opacity: [0.1, 0.5, 0.1], x: [0, 4, 0] }}
              transition={{ duration: 5.2, repeat: Infinity, ease: "easeInOut", delay: 1.1 }}
            />
            <motion.div className="absolute w-1 h-1 rounded-full bg-gold-400"
              style={{ top: "48%", left: "48%" }}
              animate={{ opacity: [0.15, 0.6, 0.15], y: [0, -6, 0] }}
              transition={{ duration: 4.0, repeat: Infinity, ease: "easeInOut", delay: 3.2 }}
            />
            <motion.div className="absolute w-1.5 h-1.5 rounded-full bg-gold-500"
              style={{ top: "68%", left: "38%" }}
              animate={{ opacity: [0.2, 0.7, 0.2], x: [0, -4, 0], y: [0, -5, 0] }}
              transition={{ duration: 3.6, repeat: Infinity, ease: "easeInOut", delay: 0.9 }}
            />
            <motion.div className="absolute w-1 h-1 rounded-full bg-gold-300"
              style={{ top: "88%", left: "44%" }}
              animate={{ opacity: [0.1, 0.5, 0.1], y: [0, -4, 0] }}
              transition={{ duration: 5.8, repeat: Infinity, ease: "easeInOut", delay: 2.4 }}
            />
            <motion.div className="absolute w-2 h-2 rounded-full bg-gold-400"
              style={{ top: "15%", right: "6%" }}
              animate={{ opacity: [0.25, 0.8, 0.25], y: [0, -8, 0] }}
              transition={{ duration: 3.9, repeat: Infinity, ease: "easeInOut", delay: 1.6 }}
            />
            <motion.div className="absolute w-1 h-1 rounded-full bg-gold-500"
              style={{ top: "32%", right: "4%" }}
              animate={{ opacity: [0.2, 0.75, 0.2], x: [0, -3, 0], y: [0, -6, 0] }}
              transition={{ duration: 4.7, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
            />
            <motion.div className="absolute w-0.5 h-0.5 rounded-full bg-gold-300"
              style={{ top: "62%", right: "8%" }}
              animate={{ opacity: [0.1, 0.55, 0.1], y: [0, -5, 0] }}
              transition={{ duration: 5.1, repeat: Infinity, ease: "easeInOut", delay: 2.9 }}
            />
            <motion.div className="absolute w-1.5 h-1.5 rounded-full bg-gold-400"
              style={{ top: "80%", right: "5%" }}
              animate={{ opacity: [0.2, 0.65, 0.2], x: [0, 3, 0], y: [0, -7, 0] }}
              transition={{ duration: 4.3, repeat: Infinity, ease: "easeInOut", delay: 1.2 }}
            />
          </>
        )}
      </motion.div>

      <div className={HERO.CONTAINER}>
        <motion.div
          className={HERO.CONTENT_WRAPPER}
          style={{
            transform: prefersReducedMotion ? undefined : contentTransform,
            opacity: contentOpacity,
          }}
        >
          <div className={HERO.LEFT}>
            <motion.span
              className={HERO.EYEBROW}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: EXPO_OUT }}
            >
              {hero.EYEBROW}
            </motion.span>

            <motion.p
              className={HERO.WORDMARK}
              variants={CHAR_CONTAINER}
              initial="hidden"
              animate="visible"
              style={{ perspective: 600 }}
            >
              {WORDMARK_CHARS.map((char, i) => (
                <motion.span
                  key={i}
                  variants={CHAR_ITEM}
                  style={{ display: "inline-block", transformOrigin: "bottom" }}
                >
                  {char}
                </motion.span>
              ))}
            </motion.p>

            <h1 className={HERO.HEADLINE} aria-label={`${hero.HEADLINE_LINE1} ${hero.HEADLINE_LINE2}`}>
              <span className="block overflow-hidden" style={{ lineHeight: "0.97" }}>
                <motion.span
                  className="block italic"
                  initial={{ y: "110%" }}
                  animate={{ y: "0%" }}
                  transition={{ duration: 1.1, delay: prefersReducedMotion ? 0.1 : 0.65, ease: EXPO_OUT }}
                >
                  {hero.HEADLINE_LINE1}
                </motion.span>
              </span>
              <span className="block overflow-hidden" style={{ lineHeight: "0.97" }}>
                <motion.span
                  className="block"
                  initial={{ y: "110%" }}
                  animate={{ y: "0%" }}
                  transition={{ duration: 1.1, delay: prefersReducedMotion ? 0.2 : 0.82, ease: EXPO_OUT }}
                >
                  {hero.HEADLINE_LINE2}
                </motion.span>
              </span>
            </h1>

            <motion.div
              variants={STAGGER_CONTENT}
              initial="hidden"
              animate="visible"
              className="flex flex-col gap-8"
            >
              <motion.p className={HERO.SUBHEADLINE} variants={FADE_UP}>
                {hero.SUBHEADLINE}
              </motion.p>

              <motion.div className={HERO.CTA_ROW} variants={FADE_UP}>
                <motion.a
                  href="#"
                  className={HERO.CTA_PRIMARY}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  {hero.CTA_PRIMARY}
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </motion.a>
                <motion.a
                  href="#"
                  className={HERO.CTA_SECONDARY}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  {hero.CTA_SECONDARY}
                </motion.a>
              </motion.div>

              <motion.div className={HERO.LOCATION_BAR} variants={FADE_UP}>
                <motion.div
                  className={HERO.LOCATION_LINE}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 1.2, delay: prefersReducedMotion ? 0.4 : 1.8, ease: EXPO_OUT }}
                  style={{ originX: 0 }}
                />
                <span className={HERO.LOCATION_TEXT}>{hero.LOCATIONS}</span>
                <motion.div
                  className={HERO.LOCATION_LINE}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 1.2, delay: prefersReducedMotion ? 0.4 : 1.8, ease: EXPO_OUT }}
                  style={{ originX: 1 }}
                />
              </motion.div>
            </motion.div>
          </div>

          <motion.div
            className={HERO.RIGHT}
            initial={
              prefersReducedMotion
                ? { opacity: 0 }
                : { opacity: 0, clipPath: "inset(0 0 100% 0)" }
            }
            animate={
              prefersReducedMotion
                ? { opacity: 1 }
                : { opacity: 1, clipPath: "inset(0 0 0% 0)" }
            }
            transition={{ duration: prefersReducedMotion ? 0.4 : 1.2, delay: 0.35, ease: EXPO_OUT }}
          >
            <div className={HERO.VISUAL_PANEL}>
              <motion.div className={HERO.VISUAL_INNER} style={{ scale: prefersReducedMotion ? 1 : visualScale }}>
                <Image
                  src="https://picsum.photos/seed/altaverde-hero/600/800"
                  alt="ALTAVERDE Resort"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 480px"
                  priority
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(160deg, oklch(28% 0.07 143 / 0.55) 0%, oklch(16% 0.05 143 / 0.45) 50%, oklch(11% 0.04 143 / 0.65) 100%)",
                  }}
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "radial-gradient(ellipse 70% 50% at 50% 20%, oklch(36% 0.08 143 / 0.5), transparent)",
                  }}
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "radial-gradient(ellipse 60% 40% at 30% 70%, oklch(67% 0.15 68 / 0.1), transparent)",
                  }}
                />
                <svg
                  className="absolute inset-0 w-full h-full opacity-10"
                  viewBox="0 0 400 533"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  preserveAspectRatio="xMidYMid slice"
                >
                  <circle cx="200" cy="200" r="120" stroke="oklch(67% 0.15 68)" strokeWidth="0.5" />
                  <circle cx="200" cy="200" r="80" stroke="oklch(67% 0.15 68)" strokeWidth="0.5" />
                  <circle cx="200" cy="200" r="40" stroke="oklch(67% 0.15 68)" strokeWidth="0.5" />
                  <line x1="80" y1="200" x2="320" y2="200" stroke="oklch(67% 0.15 68)" strokeWidth="0.5" />
                  <line x1="200" y1="80" x2="200" y2="320" stroke="oklch(67% 0.15 68)" strokeWidth="0.5" />
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
                      className="absolute top-8 right-8 w-2 h-2 rounded-full bg-gold-500"
                      animate={{ opacity: [0.4, 1, 0.4] }}
                      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    />
                    <motion.div
                      className="absolute top-20 right-20 w-1 h-1 rounded-full bg-gold-400"
                      animate={{ opacity: [0.2, 0.8, 0.2] }}
                      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                    />
                    <motion.div
                      className="absolute top-32 right-14 w-1.5 h-1.5 rounded-full bg-gold-300"
                      animate={{ opacity: [0.3, 0.9, 0.3] }}
                      transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                    />
                    <motion.div
                      className="absolute bottom-32 left-10 w-1 h-1 rounded-full bg-gold-400"
                      animate={{ opacity: [0.2, 0.7, 0.2], y: [0, -6, 0] }}
                      transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                    />
                  </>
                )}
              </motion.div>

              <div className={HERO.VISUAL_BADGE}>
                <p className={HERO.VISUAL_BADGE_TEXT}>Propiedad destacada</p>
                <p className={HERO.VISUAL_BADGE_TITLE}>Arenal Thermal Suites · La Fortuna</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        className={HERO.SCROLL_CUE}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: prefersReducedMotion ? 0.5 : 2.2, duration: 1 }}
      >
        <span className={HERO.SCROLL_TEXT}>{hero.SCROLL_CUE}</span>
        {!prefersReducedMotion && (
          <motion.div
            className={HERO.SCROLL_LINE}
            animate={{ scaleY: [0, 1, 0], originY: 0 }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          />
        )}
      </motion.div>
    </section>
  );
}
