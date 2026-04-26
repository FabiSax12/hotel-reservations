"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useI18n } from "@/locales";
import { ABOUT } from "@/features/landing/about/constants/styles";
import { EXPO_OUT } from "@/features/landing/constants/animations";

const STAGGER = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const REVEAL = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: EXPO_OUT } },
};

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
      className="flex flex-col"
    >
      <motion.span className={ABOUT.EYEBROW} variants={REVEAL}>
        {about.EYEBROW}
      </motion.span>
      <div className="overflow-hidden mb-8">
        <motion.h2
          className={ABOUT.HEADLINE.replace("mb-8", "")}
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
