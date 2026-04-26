"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useI18n } from "@/locales";
import { PROPERTIES } from "@/features/landing/properties/constants/styles";
import type { PropertyConfig } from "@/features/landing/properties/constants/properties-config";

type PropertyVisualPanelProps = {
  config: PropertyConfig;
};

export function PropertyVisualPanel({ config }: PropertyVisualPanelProps) {
  const { t } = useI18n();
  const alt = t.LANDING.PROPERTIES[config.id].NAME;
  const rings = Array.from({ length: 3 }, (_, i) => ({
    size: 160 + i * 80,
    delay: i * 8,
    duration: 50 + i * 20,
  }));

  return (
    <div className={PROPERTIES.VISUAL}>
      <div className={PROPERTIES.VISUAL_INNER}>
        <Image
          src={config.visual.imageUrl}
          alt={alt}
          fill
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 50vw"
        />
        <div className="absolute inset-0" style={{ background: config.visual.gradient }} />
        <div
          className="absolute inset-0"
          style={{ background: `radial-gradient(ellipse 70% 60% at 50% 30%, ${config.visual.ringsCenter}, transparent)` }}
        />
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          {rings.map((ring, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full border"
              style={{ width: ring.size, height: ring.size, borderColor: config.visual.rings }}
              animate={{ rotate: i % 2 === 0 ? 360 : -360 }}
              transition={{ duration: ring.duration, ease: "linear", repeat: Infinity, delay: ring.delay }}
            />
          ))}
        </div>
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{ background: `radial-gradient(circle at 50% 50%, ${config.visual.accentColor}, transparent 70%)` }}
        />
      </div>
    </div>
  );
}
