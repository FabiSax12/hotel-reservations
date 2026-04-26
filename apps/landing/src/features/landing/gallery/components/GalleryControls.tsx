"use client";

import { motion } from "framer-motion";
import { useI18n } from "@/locales";
import { GALLERY } from "@/features/landing/gallery/constants/styles";

type GalleryControlsProps = {
  current: number;
  total: number;
  isHovered: boolean;
  prefersReducedMotion: boolean;
  autoInterval: number;
  onSelect: (i: number) => void;
};

export function GalleryControls({
  current, total, isHovered, prefersReducedMotion, autoInterval, onSelect,
}: GalleryControlsProps) {
  const { t } = useI18n();
  const dotLabel = t.LANDING.GALLERY.DOT_LABEL;

  return (
    <div className="flex flex-col items-center gap-4 mt-6">
      <div className={GALLERY.CONTROLS}>
        {Array.from({ length: total }).map((_, i) => (
          <button
            key={i}
            onClick={() => onSelect(i)}
            className={i === current ? GALLERY.DOT_ACTIVE : GALLERY.DOT_INACTIVE}
            aria-label={`${dotLabel} ${i + 1}`}
          />
        ))}
      </div>

      {!prefersReducedMotion && (
        <div className="w-20 h-px bg-forest-700 overflow-hidden rounded-full">
          {!isHovered && (
            <motion.div
              key={current}
              className="h-full bg-gold-500/40 origin-left"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: autoInterval / 1000, ease: "linear" }}
            />
          )}
        </div>
      )}
    </div>
  );
}
