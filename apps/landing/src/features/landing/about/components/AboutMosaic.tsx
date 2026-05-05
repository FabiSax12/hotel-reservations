"use client";

import { useRef } from "react";
import { motion, useInView, useScroll, useTransform, useMotionTemplate } from "framer-motion";
import { useI18n } from "@/locales";
import { ABOUT } from "@/features/landing/about/constants/styles";
import { STAGGER } from "@/features/landing/about/constants/animations";
import { MOSAIC_SIZES } from "@/features/landing/about/constants/mosaic";
import { MosaicPanel } from "./MosaicPanel";

export function AboutMosaic() {
  const { t } = useI18n();
  const about = t.LANDING.ABOUT;
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });

  const panel1Y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
  const panel2Y = useTransform(scrollYProgress, [0, 1], ["6%", "-6%"]);
  const panel3Y = useTransform(scrollYProgress, [0, 1], ["-4%", "4%"]);

  const panel1Transform = useMotionTemplate`translateY(${panel1Y}) scale(1.12)`;
  const panel2Transform = useMotionTemplate`translateY(${panel2Y}) scale(1.1)`;
  const panel3Transform = useMotionTemplate`translateY(${panel3Y}) scale(1.1)`;

  return (
    <motion.div
      ref={ref}
      variants={STAGGER}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      className={ABOUT.MOSAIC}
    >
      <MosaicPanel
        src="https://picsum.photos/seed/about-forest/480/720"
        alt={about.MOSAIC_ALT_1}
        sizes={MOSAIC_SIZES}
        overlays={[
          "linear-gradient(170deg, oklch(28% 0.07 143 / 0.5) 0%, oklch(11% 0.04 143 / 0.65) 100%)",
          "radial-gradient(ellipse 80% 60% at 40% 30%, oklch(35% 0.08 143 / 0.5), transparent)",
        ]}
        parallaxTransform={panel1Transform}
        minHeight={480}
        tall
      />
      <MosaicPanel
        src="https://picsum.photos/seed/about-warm/480/340"
        alt={about.MOSAIC_ALT_2}
        sizes={MOSAIC_SIZES}
        overlays={[
          "linear-gradient(140deg, oklch(67% 0.15 68 / 0.35) 0%, oklch(16% 0.05 143 / 0.6) 100%)",
        ]}
        parallaxTransform={panel2Transform}
        minHeight={228}
      />
      <MosaicPanel
        src="https://picsum.photos/seed/about-stone/480/340"
        alt={about.MOSAIC_ALT_3}
        sizes={MOSAIC_SIZES}
        overlays={[
          "linear-gradient(200deg, oklch(94% 0.015 75 / 0.3) 0%, oklch(70% 0.03 75 / 0.5) 100%)",
        ]}
        parallaxTransform={panel3Transform}
        minHeight={228}
      />
    </motion.div>
  );
}
