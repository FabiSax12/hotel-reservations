"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useI18n } from "@/locales";
import { SERVICES } from "@/features/landing/services/constants/styles";
import { EXPO_OUT } from "@/features/landing/constants/animations";

export function ServicesCta() {
  const { t } = useI18n();
  const services = t.LANDING.SERVICES;
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.div
      ref={ref}
      className={SERVICES.CTA_WRAPPER}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.9, ease: EXPO_OUT }}
    >
      <motion.a
        href="#"
        className={SERVICES.CTA_BUTTON}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
      >
        {services.CTA}
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
      </motion.a>
    </motion.div>
  );
}
