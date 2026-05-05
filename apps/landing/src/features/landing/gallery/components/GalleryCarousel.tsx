"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { useI18n } from "@/locales";
import { GALLERY } from "@/features/landing/gallery/constants/styles";
import { GALLERY_CONFIG } from "@/features/landing/gallery/constants/gallery-config";
import { CARD_W, CARD_H, SPREAD, SCALE_STEP, OPACITY_STEP, VISIBLE_RANGE } from "@/features/landing/gallery/constants/carousel";

function computeOffset(index: number, current: number, total: number): number {
  let offset = index - current;
  if (offset > total / 2) offset -= total;
  if (offset < -total / 2) offset += total;
  return offset;
}

interface GalleryCarouselProps {
  current: number;
  onSelect: (i: number) => void;
  onHoverChange: (hovered: boolean) => void;
}

export function GalleryCarousel({ current, onSelect, onHoverChange }: GalleryCarouselProps) {
  const { t } = useI18n();
  const gallery = t.LANDING.GALLERY;
  const prefersReducedMotion = useReducedMotion() ?? false;
  const total = GALLERY_CONFIG.length;

  return (
    <div
      className={GALLERY.CAROUSEL_WRAPPER}
      onMouseEnter={() => onHoverChange(true)}
      onMouseLeave={() => onHoverChange(false)}
    >
      <div className={GALLERY.STAGE} style={{ perspective: "1000px" }}>
        <div className={GALLERY.STAGE_INNER}>
          {GALLERY_CONFIG.map((item, i) => {
            const offset = computeOffset(i, current, total);
            const absOff = Math.abs(offset);
            const isVisible = absOff <= VISIBLE_RANGE;
            const texts = gallery[item.id];

            return (
              <motion.div
                key={item.id}
                className={`${GALLERY.CARD}${offset !== 0 ? ` ${GALLERY.CARD_CLICKABLE}` : ""}`}
                style={{ width: CARD_W, height: CARD_H, zIndex: isVisible ? 10 - absOff : -1, backfaceVisibility: "hidden" }}
                animate={
                  prefersReducedMotion
                    ? { x: offset * SPREAD, opacity: isVisible ? Math.max(0, 1 - absOff * OPACITY_STEP) : 0 }
                    : { x: offset * SPREAD, scale: 1 - absOff * SCALE_STEP, opacity: isVisible ? Math.max(0, 1 - absOff * OPACITY_STEP) : 0 }
                }
                transition={{ type: "spring", duration: 0.7, bounce: 0.06 }}
                onClick={() => offset !== 0 && onSelect(i)}
                whileHover={offset !== 0 ? { scale: 1 - absOff * SCALE_STEP + 0.02 } : undefined}
              >
                <div className={GALLERY.CARD_INNER}>
                  <Image src={item.imageUrl} alt={item.id} fill className="object-cover" sizes="310px" />
                  <div className={GALLERY.CARD_OVERLAY} style={{ background: item.overlay }} />
                  <div className={GALLERY.CARD_OVERLAY_PATTERN}
                    style={{ background: "repeating-linear-gradient(135deg, transparent, transparent 18px, white 18px, white 19px)" }} />
                  <div className={GALLERY.CARD_GRADIENT_BOTTOM}
                    style={{ background: "linear-gradient(to top, oklch(8% 0.03 143 / 0.9), oklch(8% 0.03 143 / 0.4) 50%, transparent)" }} />
                  <div className={GALLERY.CARD_TEXT_AREA}>
                    <div className={GALLERY.CARD_ACCENT_LINE} />
                    <p className={GALLERY.CARD_TITLE}>{texts.TITLE}</p>
                    <p className={GALLERY.CARD_SUBTITLE}>{texts.SUBTITLE}</p>
                  </div>
                  <div className={GALLERY.CARD_DOT} />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
