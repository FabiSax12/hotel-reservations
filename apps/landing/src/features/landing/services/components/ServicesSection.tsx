"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { useI18n } from "@/locales";
import { SERVICES } from "@/features/landing/services/constants/styles";
import { SERVICES_CONFIG } from "@/features/landing/services/constants/services-config";
import { EXPO_OUT } from "@/features/landing/constants/animations";
import { ServiceCard } from "./ServiceCard";

const HEADER_STAGGER = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const HEADER_ITEM = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: EXPO_OUT } },
};

export function ServicesSection() {
  const { t } = useI18n();
  const services = t.LANDING.SERVICES;
  const prefersReducedMotion = useReducedMotion() ?? false;

  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  const headerInView = useInView(headerRef, { once: true, margin: "-60px" });
  const gridInView = useInView(gridRef, { once: true, margin: "-40px" });
  const ctaInView = useInView(ctaRef, { once: true, margin: "-40px" });

  return (
    <section className={SERVICES.SECTION}>
      <div className={SERVICES.CONTAINER}>
        <motion.div
          ref={headerRef}
          className={SERVICES.HEADER}
          variants={HEADER_STAGGER}
          initial="hidden"
          animate={headerInView ? "visible" : "hidden"}
        >
          <motion.span className={SERVICES.EYEBROW} variants={HEADER_ITEM}>
            {services.EYEBROW}
          </motion.span>
          <div className="overflow-hidden">
            <motion.h2
              className={SERVICES.HEADLINE}
              initial={{ y: "100%" }}
              animate={headerInView ? { y: "0%" } : { y: "100%" }}
              transition={{ duration: 1, delay: 0.15, ease: EXPO_OUT }}
            >
              {services.HEADLINE}
            </motion.h2>
          </div>
          <motion.p className={SERVICES.SUBHEADLINE} variants={HEADER_ITEM}>
            {services.SUBHEADLINE}
          </motion.p>
        </motion.div>

        <div
          ref={gridRef}
          className="hidden lg:grid lg:grid-cols-4 gap-px bg-forest-800"
        >
          {SERVICES_CONFIG.map((service, index) => (
            <motion.div
              key={service.id}
              initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, clipPath: "inset(0 0 100% 0)" }}
              animate={
                gridInView
                  ? prefersReducedMotion
                    ? { opacity: 1 }
                    : { opacity: 1, clipPath: "inset(0 0 0% 0)" }
                  : prefersReducedMotion
                    ? { opacity: 0 }
                    : { opacity: 0, clipPath: "inset(0 0 100% 0)" }
              }
              transition={{ duration: prefersReducedMotion ? 0.4 : 0.75, delay: index * 0.06, ease: EXPO_OUT }}
            >
              <ServiceCard service={service} texts={services[service.id]} index={index} />
            </motion.div>
          ))}
        </div>

        <div className="lg:hidden flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 -mx-6 px-6 scrollbar-none">
          {SERVICES_CONFIG.map((service, index) => (
            <motion.div
              key={service.id}
              className="snap-start shrink-0 w-[76vw] bg-forest-900 border border-forest-800"
              initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, x: 30 }}
              animate={
                gridInView
                  ? prefersReducedMotion ? { opacity: 1 } : { opacity: 1, x: 0 }
                  : prefersReducedMotion ? { opacity: 0 } : { opacity: 0, x: 30 }
              }
              transition={{ duration: prefersReducedMotion ? 0.4 : 0.6, delay: index * 0.04, ease: EXPO_OUT }}
            >
              <ServiceCard service={service} texts={services[service.id]} index={index} />
            </motion.div>
          ))}
        </div>

        <motion.div
          ref={ctaRef}
          className={SERVICES.CTA_WRAPPER}
          initial={{ opacity: 0, y: 20 }}
          animate={ctaInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
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
      </div>
    </section>
  );
}
