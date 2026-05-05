"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useI18n } from "@/locales";
import { SERVICES } from "@/features/landing/services/constants/styles";
import { SERVICES_CONFIG } from "@/features/landing/services/constants/services-config";
import { EXPO_OUT } from "@/features/landing/constants/animations";
import { ServiceCard } from "./ServiceCard";

type ServicesGridProps = {
  prefersReducedMotion: boolean;
};

export function ServicesGrid({ prefersReducedMotion }: ServicesGridProps) {
  const { t } = useI18n();
  const services = t.LANDING.SERVICES;
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <>
      <div ref={ref} className={SERVICES.GRID_DESKTOP}>
        {SERVICES_CONFIG.map((service, index) => (
          <motion.div
            key={service.id}
            initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, clipPath: "inset(0 0 100% 0)" }}
            animate={
              inView
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

      <div className={SERVICES.GRID_MOBILE}>
        {SERVICES_CONFIG.map((service, index) => (
          <motion.div
            key={service.id}
            className={SERVICES.GRID_MOBILE_CARD}
            initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, x: 30 }}
            animate={
              inView
                ? prefersReducedMotion ? { opacity: 1 } : { opacity: 1, x: 0 }
                : prefersReducedMotion ? { opacity: 0 } : { opacity: 0, x: 30 }
            }
            transition={{ duration: prefersReducedMotion ? 0.4 : 0.6, delay: index * 0.04, ease: EXPO_OUT }}
          >
            <ServiceCard service={service} texts={services[service.id]} index={index} />
          </motion.div>
        ))}
      </div>
    </>
  );
}
