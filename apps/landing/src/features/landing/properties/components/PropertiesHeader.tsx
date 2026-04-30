"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useI18n } from "@/locales";
import { PROPERTIES } from "@/features/landing/properties/constants/styles";
import { EXPO_OUT } from "@/features/landing/constants/animations";

const STAGGER = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } };
const ITEM = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: EXPO_OUT } } };

export function PropertiesHeader() {
  const { t } = useI18n();
  const texts = t.LANDING.PROPERTIES;
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div ref={ref} className={PROPERTIES.HEADER} variants={STAGGER} initial="hidden" animate={inView ? "visible" : "hidden"}>
      <motion.span className={PROPERTIES.EYEBROW} variants={ITEM}>{texts.EYEBROW}</motion.span>
      <motion.h2 className={PROPERTIES.HEADLINE} variants={ITEM}>{texts.HEADLINE}</motion.h2>
      <motion.p className={PROPERTIES.SUBHEADLINE} variants={ITEM}>{texts.SUBHEADLINE}</motion.p>
    </motion.div>
  );
}
