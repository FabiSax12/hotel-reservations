"use client";

import { motion } from "framer-motion";
import { useI18n } from "@/locales";
import { LAYOUT } from "@/features/landing/layout/constants/styles";
import { MARQUEE_SEPARATOR } from "@/features/landing/layout/constants/marquee";

export function MarqueeBand() {
  const { t } = useI18n();
  const items = t.COMMON.LAYOUT.MARQUEE_ITEMS;
  const withSeparators = items.flatMap((item) => [item, MARQUEE_SEPARATOR]);
  const repeated = [...withSeparators, ...withSeparators];

  return (
    <div className={LAYOUT.MARQUEE_WRAPPER} aria-hidden="true">
      <motion.div
        className={LAYOUT.MARQUEE_TRACK}
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 28, ease: "linear", repeat: Infinity }}
      >
        {repeated.map((item, i) => (
          <span
            key={i}
            className={item === MARQUEE_SEPARATOR ? LAYOUT.MARQUEE_SEPARATOR : LAYOUT.MARQUEE_ITEM}
          >
            {item}
          </span>
        ))}
      </motion.div>
    </div>
  );
}
