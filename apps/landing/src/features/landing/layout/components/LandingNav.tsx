"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useI18n } from "@/locales";
import { EXPO_OUT } from "@/features/landing/constants/animations";

const NAV_LINKS_KEYS = ["HOME", "ABOUT", "ROOMS", "CONTACT"] as const;

export function LandingNav() {
  const { t } = useI18n();
  const { scrollY } = useScroll();

  const backdropOpacity = useTransform(scrollY, [0, 80], [0, 1]);
  const borderOpacity = useTransform(scrollY, [60, 120], [0, 0.15]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <motion.div
        className="absolute inset-0 bg-forest-950"
        style={{ opacity: backdropOpacity }}
      />
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-px bg-stone-100"
        style={{ opacity: borderOpacity }}
      />
      <nav className="relative max-w-[1440px] mx-auto px-6 lg:px-16 h-[72px] flex items-center justify-between">
        <motion.a
          href="#"
          className="font-serif text-xl tracking-[0.35em] uppercase text-stone-50 hover:text-gold-400 transition-colors duration-300"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EXPO_OUT }}
        >
          {t.COMMON.LAYOUT.HOTEL_NAME}
        </motion.a>

        <motion.ul
          className="hidden lg:flex items-center gap-10"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: EXPO_OUT }}
        >
          {NAV_LINKS_KEYS.map((key) => (
            <li key={key}>
              <a
                href="#"
                className="text-xs tracking-[0.25em] uppercase text-stone-400 hover:text-stone-100 transition-colors duration-300"
              >
                {t.COMMON.NAV[key]}
              </a>
            </li>
          ))}
        </motion.ul>

        <motion.a
          href="#"
          className="hidden lg:inline-flex items-center px-6 py-3 border border-gold-500/60 text-gold-400 text-xs tracking-[0.25em] uppercase transition-all duration-500 hover:bg-gold-500 hover:text-forest-950 hover:border-gold-500"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: EXPO_OUT }}
        >
          {t.COMMON.ACTIONS.BOOK_NOW}
        </motion.a>
      </nav>
    </header>
  );
}
