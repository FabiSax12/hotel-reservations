"use client";

import type { MotionValue } from "framer-motion";
import { motion } from "framer-motion";
import Image from "next/image";
import { MOSAIC_ITEM } from "@/features/landing/about/constants/animations";
import { ABOUT } from "@/features/landing/about/constants/styles";

interface MosaicPanelProps {
  src: string;
  alt: string;
  sizes: string;
  overlays: string[];
  parallaxTransform: MotionValue<string>;
  minHeight: number;
  tall?: boolean;
}

export function MosaicPanel({
  src,
  alt,
  sizes,
  overlays,
  parallaxTransform,
  minHeight,
  tall = false,
}: MosaicPanelProps) {
  return (
    <motion.div
      variants={MOSAIC_ITEM}
      className={`${ABOUT.MOSAIC_ITEM}${tall ? ` ${ABOUT.MOSAIC_TALL}` : ""}`}
      style={{ minHeight }}
    >
      <motion.div className={ABOUT.MOSAIC_INNER} style={{ transform: parallaxTransform }}>
        <Image src={src} alt={alt} fill className="object-cover" sizes={sizes} />
        {overlays.map((gradient, i) => (
          <div key={i} className={ABOUT.OVERLAY} style={{ background: gradient }} />
        ))}
      </motion.div>
    </motion.div>
  );
}
