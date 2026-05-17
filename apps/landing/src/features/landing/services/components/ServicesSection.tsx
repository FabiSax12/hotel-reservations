"use client";

import { useReducedMotion } from "framer-motion";
import { SERVICES } from "@/features/landing/services/constants/styles";
import { ServicesCta } from "./ServicesCta";
import { ServicesGrid } from "./ServicesGrid";
import { ServicesHeader } from "./ServicesHeader";

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
