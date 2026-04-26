"use client";

import { useState, useEffect } from "react";
import { motion, useMotionValue, animate, AnimatePresence, useReducedMotion } from "framer-motion";
import { useI18n } from "@/locales";
import { PROPERTIES } from "@/features/landing/properties/constants/styles";
import { PROPERTIES_CONFIG } from "@/features/landing/properties/constants/properties-config";
import { EXPO_OUT } from "@/features/landing/constants/animations";
import { PropertiesHeader } from "./PropertiesHeader";
import { PropertyVisualPanel } from "./PropertyVisualPanel";
import { PropertyInfoPanel } from "./PropertyInfoPanel";
import { PropertiesControls } from "./PropertiesControls";

const AUTO_INTERVAL = 5500;

const SLIDE_VARIANTS = {
  enter: (dir: number) => ({ x: dir > 0 ? "55%" : "-55%", opacity: 0, scale: 0.94, filter: "blur(0px)", transition: { type: "spring" as const, duration: 0.72, bounce: 0.08 } }),
  center: { x: "0%", opacity: 1, scale: 1, filter: "blur(0px)", transition: { type: "spring" as const, duration: 0.72, bounce: 0.08 } },
  exit: (dir: number) => ({ x: dir < 0 ? "55%" : "-55%", opacity: 0, scale: 0.94, filter: "blur(8px)", transition: { type: "spring" as const, duration: 0.28, bounce: 0 } }),
};

const SLIDE_VARIANTS_REDUCED = {
  enter: (_dir: number) => ({ opacity: 0, transition: { duration: 0.2 } }),
  center: { opacity: 1, transition: { duration: 0.2 } },
  exit: (_dir: number) => ({ opacity: 0, transition: { duration: 0.12 } }),
};

export function PropertiesSection() {
  const { t } = useI18n();
  const texts = t.LANDING.PROPERTIES;
  const [[current, direction], setSlide] = useState<[number, number]>([0, 0]);
  const [isHovered, setIsHovered] = useState(false);
  const total = PROPERTIES_CONFIG.length;
  const prefersReducedMotion = useReducedMotion() ?? false;
  const dragX = useMotionValue(0);

  useEffect(() => {
    if (prefersReducedMotion || isHovered) return;
    const timer = setInterval(() => {
      setSlide(([curr]) => [(curr + 1) % total, 1]);
    }, AUTO_INTERVAL);
    return () => clearInterval(timer);
  }, [isHovered, prefersReducedMotion, total]);

  const navigate = (dir: number) => {
    const next = current + dir;
    if (next < 0 || next >= total) return;
    setSlide([next, dir]);
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
  const variants = prefersReducedMotion ? SLIDE_VARIANTS_REDUCED : SLIDE_VARIANTS;

  return (
    <section className={PROPERTIES.SECTION}>
      <div className={PROPERTIES.CONTAINER}>
        <PropertiesHeader />

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
              transition={{ ease: EXPO_OUT }}
            >
              <div className={PROPERTIES.SLIDE_INNER}>
                <PropertyVisualPanel config={config} />
                <PropertyInfoPanel texts={texts[config.id]} />
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <PropertiesControls
          current={current}
          total={total}
          isHovered={isHovered}
          prefersReducedMotion={prefersReducedMotion}
          autoInterval={AUTO_INTERVAL}
          dragHint={texts.DRAG_HINT}
          onGoTo={goTo}
          onNavigate={navigate}
        />
      </div>
    </section>
  );
}
