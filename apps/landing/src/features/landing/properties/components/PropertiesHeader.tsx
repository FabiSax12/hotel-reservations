"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { HEADER_ITEM, HEADER_STAGGER } from "@/features/landing/properties/constants/animations";
import { PROPERTIES } from "@/features/landing/properties/constants/styles";
import { useI18n } from "@/locales";

export function PropertiesHeader() {
  const { t } = useI18n();
  const texts = t.LANDING.PROPERTIES;
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      className={PROPERTIES.HEADER}
      variants={HEADER_STAGGER}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
    >
      <motion.span className={PROPERTIES.EYEBROW} variants={HEADER_ITEM}>
        {texts.EYEBROW}
      </motion.span>
      <motion.h2 className={PROPERTIES.HEADLINE} variants={HEADER_ITEM}>
        {texts.HEADLINE}
      </motion.h2>
      <motion.p className={PROPERTIES.SUBHEADLINE} variants={HEADER_ITEM}>
        {texts.SUBHEADLINE}
      </motion.p>
    </motion.div>
  );
}
