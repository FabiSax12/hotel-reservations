"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { REVEAL, STAGGER } from "@/features/landing/about/constants/animations";
import { ABOUT } from "@/features/landing/about/constants/styles";
import { EXPO_OUT } from "@/features/landing/constants/animations";
import { useI18n } from "@/locales";

export function AboutTextPanel() {
  const { t } = useI18n();
  const about = t.LANDING.ABOUT;
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      variants={STAGGER}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      className={ABOUT.TEXT_PANEL}
    >
      <motion.span className={ABOUT.EYEBROW} variants={REVEAL}>
        {about.EYEBROW}
      </motion.span>
      <div className={ABOUT.HEADLINE_WRAPPER}>
        <motion.h2
          className={ABOUT.HEADLINE_NO_MB}
          initial={{ y: "100%" }}
          animate={inView ? { y: "0%" } : { y: "100%" }}
          transition={{ duration: 1, delay: 0.1, ease: EXPO_OUT }}
        >
          {about.HEADLINE}
        </motion.h2>
      </div>
      <motion.p className={ABOUT.BODY} variants={REVEAL}>
        {about.BODY}
      </motion.p>
      <motion.blockquote className={ABOUT.QUOTE_WRAPPER} variants={REVEAL}>
        <p className={ABOUT.QUOTE}>&ldquo;{about.QUOTE}&rdquo;</p>
        <cite className={ABOUT.QUOTE_ATTR}>{about.QUOTE_ATTRIBUTION}</cite>
      </motion.blockquote>
    </motion.div>
  );
}
