"use client";

import {
  motion,
  useMotionTemplate,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { useRef } from "react";
import { HERO } from "@/features/landing/hero/constants/styles";
import { HeroBgLayer } from "./HeroBgLayer";
import { HeroLeftContent } from "./HeroLeftContent";
import { HeroScrollCue } from "./HeroScrollCue";
import { HeroVisualPanel } from "./HeroVisualPanel";

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion() ?? false;

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const bgYValue = useTransform(scrollYProgress, [0, 1], ["0%", "28%"]);
  const contentYValue = useTransform(scrollYProgress, [0, 0.55], ["0%", "-14%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.45], [1, 0]);
  const visualScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  const bgTransform = useMotionTemplate`translateY(${bgYValue})`;
  const contentTransform = useMotionTemplate`translateY(${contentYValue})`;

  return (
    <section ref={sectionRef} className={HERO.SECTION}>
      <HeroBgLayer bgTransform={bgTransform} />

      <div className={HERO.CONTAINER}>
        <motion.div
          className={HERO.CONTENT_WRAPPER}
          style={{
            transform: prefersReducedMotion ? undefined : contentTransform,
            opacity: contentOpacity,
          }}
        >
          <HeroLeftContent />
          <HeroVisualPanel scale={visualScale} />
        </motion.div>
      </div>

      <HeroScrollCue />
    </section>
  );
}
