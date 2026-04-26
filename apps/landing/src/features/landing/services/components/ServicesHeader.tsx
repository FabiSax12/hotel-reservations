"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useI18n } from "@/locales";
import { SERVICES } from "@/features/landing/services/constants/styles";
import { EXPO_OUT } from "@/features/landing/constants/animations";

const ITEM = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: EXPO_OUT } },
};

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
      <motion.span className={SERVICES.EYEBROW} variants={ITEM}>
        {services.EYEBROW}
      </motion.span>
      <div className="overflow-hidden">
        <motion.h2
          className={SERVICES.HEADLINE}
          initial={{ y: "100%" }}
          animate={inView ? { y: "0%" } : { y: "100%" }}
          transition={{ duration: 1, delay: 0.15, ease: EXPO_OUT }}
        >
          {services.HEADLINE}
        </motion.h2>
      </div>
      <motion.p className={SERVICES.SUBHEADLINE} variants={ITEM}>
        {services.SUBHEADLINE}
      </motion.p>
    </motion.div>
  );
}
