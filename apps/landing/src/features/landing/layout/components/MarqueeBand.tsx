"use client";

import { motion } from "framer-motion";
import { useI18n } from "@/locales";

const SEPARATOR = "✦";

export function MarqueeBand() {
  const { t } = useI18n();
  const items = t.COMMON.LAYOUT.MARQUEE_ITEMS;
  const withSeparators = items.flatMap((item) => [item, SEPARATOR]);
  const repeated = [...withSeparators, ...withSeparators];

  return (
    <div
      className="overflow-hidden bg-forest-950 border-y border-forest-900 py-4 select-none"
      aria-hidden="true"
    >
      <motion.div
        className="flex gap-10 whitespace-nowrap w-max"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 28, ease: "linear", repeat: Infinity }}
      >
        {repeated.map((item, i) => (
          <span
            key={i}
            className={
              item === SEPARATOR
                ? "text-gold-600 text-xs shrink-0"
                : "text-xs tracking-[0.3em] uppercase text-stone-600 font-sans shrink-0 hover:text-gold-500 transition-colors duration-300"
            }
          >
            {item}
          </span>
        ))}
      </motion.div>
    </div>
  );
}
