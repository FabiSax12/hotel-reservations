"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useI18n } from "@/locales";
import { TESTIMONIALS } from "@/features/landing/testimonials/constants/styles";
import { TESTIMONIALS_CONFIG } from "@/features/landing/testimonials/constants/testimonials-config";
import { TestimonialCard } from "./TestimonialCard";
import { CARD_VARIANTS, CARD_VARIANTS_REDUCED } from "@/features/landing/testimonials/constants/animations";
import type { TestimonialsGridProps } from "./TestimonialsGrid.types";

export function TestimonialsGrid({ prefersReducedMotion }: TestimonialsGridProps) {
  const { t } = useI18n();
  const testimonials = t.LANDING.TESTIMONIALS;
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const cardVariants = prefersReducedMotion ? CARD_VARIANTS_REDUCED : CARD_VARIANTS;

  return (
    <motion.div
      ref={ref}
      className={TESTIMONIALS.GRID}
      variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
    >
      {TESTIMONIALS_CONFIG.map((item) => (
        <motion.div key={item.id} variants={cardVariants}>
          <TestimonialCard texts={testimonials[item.id]} rating={item.rating} />
        </motion.div>
      ))}
    </motion.div>
  );
}
