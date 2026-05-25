"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { EXPO_OUT } from "@/features/landing/constants/animations";
import { HEADER_ITEM } from "@/features/landing/services/constants/animations";
import { SERVICES } from "@/features/landing/services/constants/styles";
import { useI18n } from "@/locales";

export function ServicesHeader() {
  const { t } = useI18n();
  const services = t.LANDING.SERVICES;
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      className={SERVICES.HEADER}
      variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
    >
      <motion.span className={SERVICES.EYEBROW} variants={HEADER_ITEM}>
        {services.EYEBROW}
      </motion.span>
      <div className={SERVICES.HEADLINE_WRAPPER}>
        <motion.h2
          className={SERVICES.HEADLINE}
          initial={{ y: "100%" }}
          animate={inView ? { y: "0%" } : { y: "100%" }}
          transition={{ duration: 1, delay: 0.15, ease: EXPO_OUT }}
        >
          {services.HEADLINE}
        </motion.h2>
      </div>
      <motion.p className={SERVICES.SUBHEADLINE} variants={HEADER_ITEM}>
        {services.SUBHEADLINE}
      </motion.p>
    </motion.div>
  );
}
