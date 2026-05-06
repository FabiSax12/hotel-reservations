"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useI18n } from "@/locales";
import { TESTIMONIALS } from "@/features/landing/testimonials/constants/styles";
import { EXPO_OUT } from "@/features/landing/constants/animations";
import { HEADER_ITEM } from "@/features/landing/testimonials/constants/animations";

export function TestimonialsHeader() {
  const { t } = useI18n();
  const testimonials = t.LANDING.TESTIMONIALS;
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      className={TESTIMONIALS.HEADER}
      variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
    >
      <motion.span className={TESTIMONIALS.EYEBROW} variants={HEADER_ITEM}>
        {testimonials.EYEBROW}
      </motion.span>
      <div className={TESTIMONIALS.HEADLINE_WRAPPER}>
        <motion.h2
          className={TESTIMONIALS.HEADLINE}
          initial={{ y: "100%" }}
          animate={inView ? { y: "0%" } : { y: "100%" }}
          transition={{ duration: 1, delay: 0.15, ease: EXPO_OUT }}
        >
          {testimonials.HEADLINE}
        </motion.h2>
      </div>
      <motion.p className={TESTIMONIALS.SUBHEADLINE} variants={HEADER_ITEM}>
        {testimonials.SUBHEADLINE}
      </motion.p>
    </motion.div>
  );
}
