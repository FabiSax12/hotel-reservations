"use client";

import { motion } from "framer-motion";
import { useI18n } from "@/locales";
import { PROPERTIES } from "@/features/landing/properties/constants/styles";

type PropertiesControlsProps = {
  current: number;
  total: number;
  isHovered: boolean;
  prefersReducedMotion: boolean;
  autoInterval: number;
  dragHint: string;
  onGoTo: (i: number) => void;
  onNavigate: (dir: number) => void;
};

export function PropertiesControls({
  current, total, isHovered, prefersReducedMotion,
  autoInterval, dragHint, onGoTo, onNavigate,
}: PropertiesControlsProps) {
  const { t } = useI18n();
  const texts = t.LANDING.PROPERTIES;

  return (
    <div className={PROPERTIES.CONTROLS}>
      <span className={PROPERTIES.DRAG_HINT}>{dragHint}</span>

      <div className="flex flex-col items-center gap-2.5">
        <div className={PROPERTIES.DOTS}>
          {Array.from({ length: total }).map((_, i) => (
            <button
              key={i}
              onClick={() => onGoTo(i)}
              className={i === current ? PROPERTIES.DOT_ACTIVE : PROPERTIES.DOT_INACTIVE}
              aria-label={`${texts.DOT_LABEL} ${i + 1}`}
            />
          ))}
        </div>
        {!prefersReducedMotion && (
          <div className="w-16 h-px bg-forest-700 overflow-hidden rounded-full">
            {!isHovered && (
              <motion.div
                key={current}
                className="h-full bg-gold-500/50 origin-left"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: autoInterval / 1000, ease: "linear" }}
              />
            )}
          </div>
        )}
      </div>

      <div className={PROPERTIES.NAV_ROW}>
        <button
          onClick={() => onNavigate(-1)}
          disabled={current === 0}
          className={`${PROPERTIES.NAV_BTN} disabled:opacity-30 disabled:cursor-not-allowed`}
          aria-label={texts.NAV_PREV}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          onClick={() => onNavigate(1)}
          disabled={current === total - 1}
          className={`${PROPERTIES.NAV_BTN} disabled:opacity-30 disabled:cursor-not-allowed`}
          aria-label={texts.NAV_NEXT}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
}
