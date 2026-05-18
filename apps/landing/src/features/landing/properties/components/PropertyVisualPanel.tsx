"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import type { PropertyConfig } from "@/features/landing/properties/constants/properties-config";
import { PROPERTIES } from "@/features/landing/properties/constants/styles";
import { useI18n } from "@/locales";

interface PropertyVisualPanelProps {
  config: PropertyConfig;
}

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
        <div className={PROPERTIES.VISUAL_OVERLAY} style={{ background: config.visual.gradient }} />
        <div
          className={PROPERTIES.VISUAL_OVERLAY}
          style={{
            background: `radial-gradient(ellipse 70% 60% at 50% 30%, ${config.visual.ringsCenter}, transparent)`,
          }}
        />
        <div className={PROPERTIES.VISUAL_RINGS_WRAPPER}>
          {rings.map((ring, i) => (
            <motion.div
              key={i}
              className={PROPERTIES.VISUAL_RING}
              style={{ width: ring.size, height: ring.size, borderColor: config.visual.rings }}
              animate={{ rotate: i % 2 === 0 ? 360 : -360 }}
              transition={{
                duration: ring.duration,
                ease: "linear",
                repeat: Infinity,
                delay: ring.delay,
              }}
            />
          ))}
        </div>
        <div
          className={PROPERTIES.VISUAL_ACCENT}
          style={{
            background: `radial-gradient(circle at 50% 50%, ${config.visual.accentColor}, transparent 70%)`,
          }}
        />
      </div>
    </div>
  );
}
