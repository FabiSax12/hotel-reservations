"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { MotionValue } from "framer-motion";
import { ABOUT } from "@/features/landing/about/constants/styles";
import { EXPO_OUT } from "@/features/landing/constants/animations";

const MOSAIC_ITEM = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: { opacity: 1, scale: 1, transition: { duration: 1.1, ease: EXPO_OUT } },
};

type MosaicPanelProps = {
  src: string;
  alt: string;
  sizes: string;
  overlays: string[];
  parallaxTransform: MotionValue<string>;
  minHeight: number;
  tall?: boolean;
};

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
      className={`${ABOUT.MOSAIC_ITEM} ${tall ? `${ABOUT.MOSAIC_TALL} row-span-2` : ""} overflow-hidden`}
      style={{ minHeight }}
    >
      <motion.div className="w-full h-full relative" style={{ transform: parallaxTransform }}>
        <Image src={src} alt={alt} fill className="object-cover" sizes={sizes} />
        {overlays.map((gradient, i) => (
          <div key={i} className="absolute inset-0" style={{ background: gradient }} />
        ))}
      </motion.div>
    </motion.div>
  );
}
