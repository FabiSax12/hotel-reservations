"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { motion, useMotionValue, animate, useInView, AnimatePresence, useReducedMotion } from "framer-motion";
import { useI18n } from "@/locales";
import { PROPERTIES } from "@/features/landing/properties/constants/styles";
import { PROPERTIES_CONFIG } from "@/features/landing/properties/constants/properties-config";
import { EXPO_OUT } from "@/features/landing/constants/animations";
import type { PropertyConfig } from "@/features/landing/properties/constants/properties-config";

const AUTO_INTERVAL = 5500;

const SLIDE_VARIANTS = {
  enter: (dir: number) => ({
    x: dir > 0 ? "55%" : "-55%",
    opacity: 0,
    scale: 0.94,
    filter: "blur(0px)",
    transition: { type: "spring" as const, duration: 0.72, bounce: 0.08 },
  }),
  center: {
    x: "0%",
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    transition: { type: "spring" as const, duration: 0.72, bounce: 0.08 },
  },
  exit: (dir: number) => ({
    x: dir < 0 ? "55%" : "-55%",
    opacity: 0,
    scale: 0.94,
    filter: "blur(8px)",
    transition: { type: "spring" as const, duration: 0.28, bounce: 0 },
  }),
};

const SLIDE_VARIANTS_REDUCED = {
  enter: (_dir: number) => ({ opacity: 0, transition: { duration: 0.2 } }),
  center: { opacity: 1, transition: { duration: 0.2 } },
  exit: (_dir: number) => ({ opacity: 0, transition: { duration: 0.12 } }),
};

const HEADER_STAGGER = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const HEADER_ITEM = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: EXPO_OUT } },
};

function PropertyVisualPanel({ config }: { config: PropertyConfig }) {
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
          alt={config.id}
          fill
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 50vw"
        />
        <div className="absolute inset-0" style={{ background: config.visual.gradient }} />
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(ellipse 70% 60% at 50% 30%, ${config.visual.rings.replace("0.15", "0.25")}, transparent)`,
          }}
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

export function PropertiesSection() {
  const { t } = useI18n();
  const texts = t.LANDING.PROPERTIES;
  const [[current, direction], setSlide] = useState<[number, number]>([0, 0]);
  const [isHovered, setIsHovered] = useState(false);
  const total = PROPERTIES_CONFIG.length;
  const prefersReducedMotion = useReducedMotion() ?? false;

  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-60px" });
  const dragX = useMotionValue(0);

  useEffect(() => {
    if (prefersReducedMotion || isHovered) return;
    const timer = setInterval(() => {
      setSlide(([curr]) => [(curr + 1) % total, 1]);
    }, AUTO_INTERVAL);
    return () => clearInterval(timer);
  }, [isHovered, prefersReducedMotion, total]);

  const navigate = (newDirection: number) => {
    const next = current + newDirection;
    if (next < 0 || next >= total) return;
    setSlide([next, newDirection]);
  };

  const goTo = (index: number) => {
    if (index === current) return;
    setSlide([index, index > current ? 1 : -1]);
  };

  const handleDragEnd = (_: unknown, info: { offset: { x: number }; velocity: { x: number } }) => {
    if (info.offset.x < -80 || info.velocity.x < -400) navigate(1);
    else if (info.offset.x > 80 || info.velocity.x > 400) navigate(-1);
    animate(dragX, 0, { type: "spring", stiffness: 400, damping: 40 });
  };

  const config = PROPERTIES_CONFIG[current];
  const propertyTexts = texts[config.id];
  const variants = prefersReducedMotion ? SLIDE_VARIANTS_REDUCED : SLIDE_VARIANTS;

  return (
    <section className={PROPERTIES.SECTION}>
      <div className={PROPERTIES.CONTAINER}>
        <motion.div
          ref={headerRef}
          className={PROPERTIES.HEADER}
          variants={HEADER_STAGGER}
          initial="hidden"
          animate={headerInView ? "visible" : "hidden"}
        >
          <motion.span className={PROPERTIES.EYEBROW} variants={HEADER_ITEM}>
            {texts.EYEBROW}
          </motion.span>
          <motion.h2 className={PROPERTIES.HEADLINE} variants={HEADER_ITEM}>
            {texts.HEADLINE}
          </motion.h2>
          <motion.p className={PROPERTIES.SUBHEADLINE} variants={HEADER_ITEM}>
            {texts.SUBHEADLINE}
          </motion.p>
        </motion.div>

        <div
          className={PROPERTIES.CAROUSEL_OUTER}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={current}
              className={PROPERTIES.SLIDE}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.12}
              onDragEnd={handleDragEnd}
              style={{ x: dragX }}
            >
              <div className={PROPERTIES.SLIDE_INNER}>
                <PropertyVisualPanel config={config} />

                <div className={PROPERTIES.INFO}>
                  <motion.p
                    className={PROPERTIES.INFO_LOCATION}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.15, ease: EXPO_OUT }}
                  >
                    {propertyTexts.LOCATION}
                  </motion.p>

                  <div className="overflow-hidden">
                    <motion.h3
                      className={PROPERTIES.INFO_NAME}
                      initial={{ y: "100%" }}
                      animate={{ y: "0%" }}
                      transition={{ duration: 0.9, delay: 0.2, ease: EXPO_OUT }}
                    >
                      {propertyTexts.NAME}
                    </motion.h3>
                  </div>

                  <motion.p
                    className={PROPERTIES.INFO_TAGLINE}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.35, ease: EXPO_OUT }}
                  >
                    {propertyTexts.TAGLINE}
                  </motion.p>

                  <motion.div
                    className={PROPERTIES.INFO_DIVIDER}
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.7, delay: 0.4, ease: EXPO_OUT }}
                    style={{ originX: 0 }}
                  />

                  <motion.p
                    className={PROPERTIES.INFO_DESC}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.45, ease: EXPO_OUT }}
                  >
                    {propertyTexts.DESCRIPTION}
                  </motion.p>

                  <motion.ul
                    className={PROPERTIES.INFO_FEATURES}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.7, delay: 0.55, ease: EXPO_OUT }}
                  >
                    {[propertyTexts.FEATURE_1, propertyTexts.FEATURE_2, propertyTexts.FEATURE_3].map((f) => (
                      <li key={f} className={PROPERTIES.INFO_FEATURE}>
                        <span className={PROPERTIES.INFO_FEATURE_DOT} />
                        {f}
                      </li>
                    ))}
                  </motion.ul>

                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.6, ease: EXPO_OUT }}
                  >
                    <p className={PROPERTIES.INFO_PRICE_LABEL}>{propertyTexts.PRICE_LABEL}</p>
                    <p className={PROPERTIES.INFO_PRICE}>{propertyTexts.PRICE}</p>
                  </motion.div>

                  <motion.a
                    href="#"
                    className={PROPERTIES.INFO_CTA}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.7, ease: EXPO_OUT }}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    {propertyTexts.CTA}
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </motion.a>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className={PROPERTIES.CONTROLS}>
          <span className={PROPERTIES.DRAG_HINT}>{texts.DRAG_HINT}</span>

          <div className="flex flex-col items-center gap-2.5">
            <div className={PROPERTIES.DOTS}>
              {PROPERTIES_CONFIG.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  className={i === current ? PROPERTIES.DOT_ACTIVE : PROPERTIES.DOT_INACTIVE}
                  aria-label={`Propiedad ${i + 1}`}
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
                    transition={{ duration: AUTO_INTERVAL / 1000, ease: "linear" }}
                  />
                )}
              </div>
            )}
          </div>

          <div className={PROPERTIES.NAV_ROW}>
            <button
              onClick={() => navigate(-1)}
              disabled={current === 0}
              className={`${PROPERTIES.NAV_BTN} disabled:opacity-30 disabled:cursor-not-allowed`}
              aria-label="Anterior"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={() => navigate(1)}
              disabled={current === total - 1}
              className={`${PROPERTIES.NAV_BTN} disabled:opacity-30 disabled:cursor-not-allowed`}
              aria-label="Siguiente"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
