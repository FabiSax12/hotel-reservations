"use client";

import { useReducedMotion } from "framer-motion";
import { TESTIMONIALS } from "@/features/landing/testimonials/constants/styles";
import { TestimonialsHeader } from "./TestimonialsHeader";
import { TestimonialsGrid } from "./TestimonialsGrid";

export function TestimonialsSection() {
  const prefersReducedMotion = useReducedMotion() ?? false;

  return (
    <section className={TESTIMONIALS.SECTION}>
      <div className={TESTIMONIALS.CONTAINER}>
        <TestimonialsHeader />
        <TestimonialsGrid prefersReducedMotion={prefersReducedMotion} />
      </div>
    </section>
  );
}
