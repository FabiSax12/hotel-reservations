"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useI18n } from "@/locales";
import { LAYOUT } from "@/features/landing/layout/constants/styles";
import { ROUTES } from "@/config/routes";
import { EXPO_OUT } from "@/features/landing/constants/animations";

const NAV_LINKS: { key: "HOME" | "ABOUT" | "ROOMS" | "CONTACT"; href: string }[] = [
  { key: "HOME", href: ROUTES.HOME },
  { key: "ABOUT", href: ROUTES.ANCHORS.ABOUT },
  { key: "ROOMS", href: ROUTES.ANCHORS.ROOMS },
  { key: "CONTACT", href: ROUTES.ANCHORS.CONTACT },
];

export function LandingNav() {
  const { t } = useI18n();
  const { scrollY } = useScroll();

  const backdropOpacity = useTransform(scrollY, [0, 80], [0, 1]);
  const borderOpacity = useTransform(scrollY, [60, 120], [0, 0.15]);

  return (
    <header className={LAYOUT.NAV_WRAPPER}>
      <motion.div
        className={LAYOUT.NAV_BACKDROP}
        style={{ opacity: backdropOpacity }}
      />
      <motion.div
        className={LAYOUT.NAV_BORDER}
        style={{ opacity: borderOpacity }}
      />
      <nav className={LAYOUT.NAV_INNER} aria-label="Main navigation">
        <motion.a
          href={ROUTES.HOME}
          className={LAYOUT.NAV_LOGO}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EXPO_OUT }}
          aria-label={t.COMMON.LAYOUT.HOTEL_NAME}
        >
          {t.COMMON.LAYOUT.HOTEL_NAME}
        </motion.a>

        <motion.ul
          className={LAYOUT.NAV_LINKS}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: EXPO_OUT }}
        >
          {NAV_LINKS.map(({ key, href }) => (
            <li key={key}>
              <a href={href} className={LAYOUT.NAV_LINK}>
                {t.COMMON.NAV[key]}
              </a>
            </li>
          ))}
        </motion.ul>

        <motion.a
          href={ROUTES.PORTAL}
          className={LAYOUT.NAV_CTA}
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
