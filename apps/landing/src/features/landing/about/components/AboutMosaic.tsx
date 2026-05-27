"use client";

import { motion, useInView, useMotionTemplate, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { STAGGER } from "@/features/landing/about/constants/animations";
import {
  MOSAIC_IMAGE_1,
  MOSAIC_IMAGE_2,
  MOSAIC_IMAGE_3,
  MOSAIC_OVERLAYS_1,
  MOSAIC_OVERLAYS_2,
  MOSAIC_OVERLAYS_3,
  MOSAIC_SIZES,
} from "@/features/landing/about/constants/mosaic";
import { ABOUT } from "@/features/landing/about/constants/styles";
import { useI18n } from "@/locales";
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
        src={about.MOSAIC_URL_1}
        alt={about.MOSAIC_ALT_1}
        sizes={MOSAIC_SIZES}
        overlays={MOSAIC_OVERLAYS_1}
        parallaxTransform={panel1Transform}
        minHeight={480}
        tall
      />
      <MosaicPanel
        src={about.MOSAIC_URL_2}
        alt={about.MOSAIC_ALT_2}
        sizes={MOSAIC_SIZES}
        overlays={MOSAIC_OVERLAYS_2}
        parallaxTransform={panel2Transform}
        minHeight={228}
      />
      <MosaicPanel
        src={about.MOSAIC_URL_3}
        alt={about.MOSAIC_ALT_3}
        sizes={MOSAIC_SIZES}
        overlays={MOSAIC_OVERLAYS_3}
        parallaxTransform={panel3Transform}
        minHeight={228}
      />
    </motion.div>
  );
}
