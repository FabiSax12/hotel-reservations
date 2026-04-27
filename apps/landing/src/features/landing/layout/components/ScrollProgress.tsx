"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import { LAYOUT } from "@/features/landing/layout/constants/styles";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 40 });

  return (
    <motion.div
      className={LAYOUT.SCROLL_PROGRESS}
      style={{ scaleX }}
    />
  );
}
