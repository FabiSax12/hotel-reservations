"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { useI18n } from "@/locales";
import { GALLERY } from "@/features/landing/gallery/constants/styles";
import { GALLERY_CONFIG } from "@/features/landing/gallery/constants/gallery-config";

const CARD_W = 310;
const CARD_H = 420;
const SPREAD = 255;
const ANGLE = 0;
const SCALE_STEP = 0.08;
const OPACITY_STEP = 0.22;
const VISIBLE_RANGE = 2;

function computeOffset(index: number, current: number, total: number): number {
  let offset = index - current;
  if (offset > total / 2) offset -= total;
  if (offset < -total / 2) offset += total;
  return offset;
}

type GalleryCarouselProps = {
  current: number;
  onSelect: (i: number) => void;
  onHoverChange: (hovered: boolean) => void;
};

export function GalleryCarousel({ current, onSelect, onHoverChange }: GalleryCarouselProps) {
  const { t } = useI18n();
  const gallery = t.LANDING.GALLERY;
  const prefersReducedMotion = useReducedMotion() ?? false;
  const total = GALLERY_CONFIG.length;

  return (
    <div
      className="hidden lg:block"
      onMouseEnter={() => onHoverChange(true)}
      onMouseLeave={() => onHoverChange(false)}
    >
      <div className={GALLERY.STAGE} style={{ perspective: "1000px" }}>
        <div className="absolute inset-0 flex items-center justify-center">
          {GALLERY_CONFIG.map((item, i) => {
            const offset = computeOffset(i, current, total);
            const absOff = Math.abs(offset);
            const isVisible = absOff <= VISIBLE_RANGE;
            const texts = gallery[item.id];

            return (
              <motion.div
                key={item.id}
                className={`absolute rounded-2xl overflow-hidden select-none ${offset !== 0 ? "cursor-pointer" : ""}`}
                style={{ width: CARD_W, height: CARD_H, zIndex: isVisible ? 10 - absOff : -1, backfaceVisibility: "hidden" }}
                animate={
                  prefersReducedMotion
                    ? { x: offset * SPREAD, opacity: isVisible ? Math.max(0, 1 - absOff * OPACITY_STEP) : 0 }
                    : { x: offset * SPREAD, rotateY: offset * ANGLE, scale: 1 - absOff * SCALE_STEP, opacity: isVisible ? Math.max(0, 1 - absOff * OPACITY_STEP) : 0 }
                }
                transition={{ type: "spring", duration: 0.7, bounce: 0.06 }}
                onClick={() => offset !== 0 && onSelect(i)}
                whileHover={offset !== 0 ? { scale: 1 - absOff * SCALE_STEP + 0.02 } : undefined}
              >
                <div className="w-full h-full relative">
                  <Image src={item.imageUrl} alt={item.id} fill className="object-cover" sizes="310px" />
                  <div className="absolute inset-0" style={{ background: item.overlay }} />
                  <div className="absolute inset-0 opacity-[0.035]"
                    style={{ background: "repeating-linear-gradient(135deg, transparent, transparent 18px, white 18px, white 19px)" }} />
                  <div className="absolute inset-x-0 bottom-0 h-[45%]"
                    style={{ background: "linear-gradient(to top, oklch(8% 0.03 143 / 0.9), oklch(8% 0.03 143 / 0.4) 50%, transparent)" }} />
                  <div className="absolute inset-x-0 bottom-0 p-7 flex flex-col">
                    <div className="w-6 h-px bg-gold-500/60 mb-4" />
                    <p className={GALLERY.CARD_TITLE}>{texts.TITLE}</p>
                    <p className={GALLERY.CARD_SUBTITLE}>{texts.SUBTITLE}</p>
                  </div>
                  <div className="absolute top-5 right-5 w-1.5 h-1.5 rounded-full bg-gold-500/50" />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
