"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { useI18n } from "@/locales";
import { ABOUT } from "@/features/landing/about/constants/styles";
import { EXPO_OUT } from "@/features/landing/constants/animations";

type StatDisplay = { prefix: string; num: number; suffix: string };

function parseStatValue(value: string): StatDisplay {
  const match = value.match(/^([^\d]*)(\d+(?:\.\d+)?)(.*)$/);
  if (!match) return { prefix: "", num: 0, suffix: value };
  return { prefix: match[1], num: parseFloat(match[2]), suffix: match[3] };
}

function AnimatedStatValue({ value, isInView }: { value: string; isInView: boolean }) {
  const { prefix, num, suffix } = parseStatValue(value);
  const [display, setDisplay] = useState(0);
  const isDecimal = num % 1 !== 0;
  const prefersReducedMotion = useReducedMotion() ?? false;

  useEffect(() => {
    if (prefersReducedMotion) { setDisplay(num); return; }
    if (!isInView) return;
    const duration = 1800;
    const start = performance.now();
    const tick = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 4);
      setDisplay(eased * num);
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [isInView, num, prefersReducedMotion]);

  const formatted = isDecimal ? display.toFixed(1) : Math.round(display).toString();

  return <span>{prefix}{formatted}{suffix}</span>;
}

export function AboutStats() {
  const { t } = useI18n();
  const about = t.LANDING.ABOUT;
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  const stats = [about.STATS.SUITES, about.STATS.YEARS, about.STATS.GUESTS, about.STATS.RATING];

  return (
    <motion.div
      ref={ref}
      className={ABOUT.STATS}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.1 } },
      }}
    >
      {stats.map((stat) => (
        <motion.div
          key={stat.LABEL}
          className={ABOUT.STAT_ITEM}
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EXPO_OUT } },
          }}
        >
          <p className={ABOUT.STAT_VALUE}>
            <AnimatedStatValue value={stat.VALUE} isInView={inView} />
          </p>
          <p className={ABOUT.STAT_LABEL}>{stat.LABEL}</p>
        </motion.div>
      ))}
    </motion.div>
  );
}
