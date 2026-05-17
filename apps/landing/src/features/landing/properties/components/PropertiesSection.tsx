"use client";

import { AnimatePresence, animate, motion, useMotionValue, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { EXPO_OUT } from "@/features/landing/constants/animations";
import {
  AUTO_INTERVAL,
  SLIDE_VARIANTS,
  SLIDE_VARIANTS_REDUCED,
} from "@/features/landing/properties/constants/animations";
import { PROPERTIES_CONFIG } from "@/features/landing/properties/constants/properties-config";
import { PROPERTIES } from "@/features/landing/properties/constants/styles";
import { useI18n } from "@/locales";
import { PropertiesControls } from "./PropertiesControls";
import { PropertiesHeader } from "./PropertiesHeader";
import { PropertyInfoPanel } from "./PropertyInfoPanel";
import { PropertyVisualPanel } from "./PropertyVisualPanel";

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
    <section id="rooms" className={PROPERTIES.SECTION}>
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
