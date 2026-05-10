"use client";

import { useReducedMotion } from "framer-motion";
import { SERVICES } from "@/features/landing/services/constants/styles";
import { ServicesHeader } from "./ServicesHeader";
import { ServicesGrid } from "./ServicesGrid";
import { ServicesCta } from "./ServicesCta";

export function ServicesSection() {
  const prefersReducedMotion = useReducedMotion() ?? false;

  return (
    <section id="services" className={SERVICES.SECTION}>
      <div className={SERVICES.CONTAINER}>
        <ServicesHeader />
        <ServicesGrid prefersReducedMotion={prefersReducedMotion} />
        <ServicesCta />
      </div>
    </section>
  );
}
