"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { useI18n } from "@/locales";
import { GALLERY } from "@/features/landing/gallery/constants/styles";
import { GALLERY_CONFIG } from "@/features/landing/gallery/constants/gallery-config";
import { EXPO_OUT } from "@/features/landing/constants/animations";

const CARD_W = 310;
const CARD_H = 420;
const SPREAD = 255;
const ANGLE = 0;
const SCALE_STEP = 0.08;
const OPACITY_STEP = 0.22;
const AUTO_INTERVAL = 3800;
const VISIBLE_RANGE = 2;

function computeOffset(index: number, current: number, total: number): number {
  let offset = index - current;
  if (offset > total / 2) offset -= total;
  if (offset < -total / 2) offset += total;
  return offset;
}

export function GallerySection() {
  const { t } = useI18n();
  const gallery = t.LANDING.GALLERY;
  const [current, setCurrent] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const prefersReducedMotion = useReducedMotion() ?? false;
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-60px" });
  const total = GALLERY_CONFIG.length;

  useEffect(() => {
    if (prefersReducedMotion || isHovered) return;
    const timer = setInterval(() => setCurrent((c) => (c + 1) % total), AUTO_INTERVAL);
    return () => clearInterval(timer);
  }, [isHovered, prefersReducedMotion, total]);

  return (
    <section className={GALLERY.SECTION}>
      <div className={GALLERY.CONTAINER}>
        <motion.div
          ref={headerRef}
          className={GALLERY.HEADER}
          initial="hidden"
          animate={headerInView ? "visible" : "hidden"}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
        >
          <motion.span
            className={GALLERY.EYEBROW}
            variants={{
              hidden: { opacity: 0, y: 10 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EXPO_OUT } },
            }}
          >
            {gallery.EYEBROW}
          </motion.span>
          <div className="overflow-hidden">
            <motion.h2
              className={GALLERY.HEADLINE}
              initial={{ y: "100%" }}
              animate={headerInView ? { y: "0%" } : { y: "100%" }}
              transition={{ duration: 1, delay: 0.15, ease: EXPO_OUT }}
            >
              {gallery.HEADLINE}
            </motion.h2>
          </div>
          <motion.p
            className={GALLERY.SUBHEADLINE}
            variants={{
              hidden: { opacity: 0, y: 10 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.8, delay: 0.2, ease: EXPO_OUT } },
            }}
          >
            {gallery.SUBHEADLINE}
          </motion.p>
        </motion.div>
      </div>

      {/* 3D Fan Carousel — desktop */}
      <div
        className="hidden lg:block"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div
          className={GALLERY.STAGE}
          style={{ perspective: "1000px" }}
        >
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
                  style={{
                    width: CARD_W,
                    height: CARD_H,
                    zIndex: isVisible ? 10 - absOff : -1,
                    backfaceVisibility: "hidden",
                  }}
                  animate={
                    prefersReducedMotion
                      ? {
                          x: offset * SPREAD,
                          opacity: isVisible ? Math.max(0, 1 - absOff * OPACITY_STEP) : 0,
                        }
                      : {
                          x: offset * SPREAD,
                          rotateY: offset * ANGLE,
                          scale: 1 - absOff * SCALE_STEP,
                          opacity: isVisible ? Math.max(0, 1 - absOff * OPACITY_STEP) : 0,
                        }
                  }
                  transition={{ type: "spring", duration: 0.7, bounce: 0.06 }}
                  onClick={() => offset !== 0 && setCurrent(i)}
                  whileHover={offset !== 0 ? { scale: 1 - absOff * SCALE_STEP + 0.02 } : undefined}
                >
                  <div className="w-full h-full relative">
                    <Image
                      src={item.imageUrl}
                      alt={item.id}
                      fill
                      className="object-cover"
                      sizes="310px"
                    />
                    <div className="absolute inset-0" style={{ background: item.overlay }} />
                    <div
                      className="absolute inset-0 opacity-[0.035]"
                      style={{
                        background:
                          "repeating-linear-gradient(135deg, transparent, transparent 18px, white 18px, white 19px)",
                      }}
                    />
                    <div
                      className="absolute inset-x-0 bottom-0 h-[45%]"
                      style={{
                        background:
                          "linear-gradient(to top, oklch(8% 0.03 143 / 0.9), oklch(8% 0.03 143 / 0.4) 50%, transparent)",
                      }}
                    />
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

      {/* Horizontal swipe — mobile */}
      <div className="lg:hidden flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 -mx-6 px-6 scrollbar-none mt-2">
        {GALLERY_CONFIG.map((item, i) => {
          const texts = gallery[item.id];
          return (
            <div
              key={item.id}
              className="snap-start shrink-0 w-[74vw] rounded-xl overflow-hidden"
              style={{ height: "280px" }}
            >
              <div className="w-full h-full relative">
                <Image
                  src={item.imageUrl}
                  alt={item.id}
                  fill
                  className="object-cover"
                  sizes="74vw"
                />
                <div className="absolute inset-0" style={{ background: item.overlay }} />
                <div
                  className="absolute inset-x-0 bottom-0 h-2/5"
                  style={{ background: "linear-gradient(to top, oklch(8% 0.03 143 / 0.88), transparent)" }}
                />
                <div className="absolute inset-x-0 bottom-0 p-5 flex flex-col">
                  <div className="w-5 h-px bg-gold-500/60 mb-3" />
                  <p className="font-serif text-stone-50 text-lg leading-tight">{texts.TITLE}</p>
                  <p className="font-sans text-stone-300/70 text-[10px] tracking-[0.2em] uppercase mt-1">
                    {texts.SUBTITLE}
                  </p>
                </div>
                {i === current && (
                  <div className="absolute top-4 right-4 w-1.5 h-1.5 rounded-full bg-gold-500" />
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Navigation dots */}
      <div className={GALLERY.CONTROLS}>
        {GALLERY_CONFIG.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={i === current ? GALLERY.DOT_ACTIVE : GALLERY.DOT_INACTIVE}
            aria-label={`Imagen ${i + 1}`}
          />
        ))}
      </div>

      {/* Auto-advance progress */}
      {!prefersReducedMotion && (
        <div className="flex justify-center mt-4">
          <div className="w-20 h-px bg-forest-700 overflow-hidden rounded-full">
            {!isHovered && (
              <motion.div
                key={current}
                className="h-full bg-gold-500/40 origin-left"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: AUTO_INTERVAL / 1000, ease: "linear" }}
              />
            )}
          </div>
        </div>
      )}
    </section>
  );
}
