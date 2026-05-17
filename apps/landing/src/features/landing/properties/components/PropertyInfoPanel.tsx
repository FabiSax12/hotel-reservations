"use client";

import { motion } from "framer-motion";
import { EXPO_OUT } from "@/features/landing/constants/animations";
import { PROPERTIES } from "@/features/landing/properties/constants/styles";
import type { PropertyItemTexts } from "@/features/landing/properties/i18n/propertiesTexts.type";

interface PropertyInfoPanelProps {
  texts: PropertyItemTexts;
}

export function PropertyInfoPanel({ texts }: PropertyInfoPanelProps) {
  return (
    <div className={PROPERTIES.INFO}>
      <motion.p
        className={PROPERTIES.INFO_LOCATION}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.15, ease: EXPO_OUT }}
      >
        {texts.LOCATION}
      </motion.p>

      <div className={PROPERTIES.INFO_HEADLINE_WRAPPER}>
        <motion.h3
          className={PROPERTIES.INFO_NAME}
          initial={{ y: "100%" }}
          animate={{ y: "0%" }}
          transition={{ duration: 0.9, delay: 0.2, ease: EXPO_OUT }}
        >
          {texts.NAME}
        </motion.h3>
      </div>

      <motion.p
        className={PROPERTIES.INFO_TAGLINE}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.35, ease: EXPO_OUT }}
      >
        {texts.TAGLINE}
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
        {texts.DESCRIPTION}
      </motion.p>

      <motion.ul
        className={PROPERTIES.INFO_FEATURES}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.55, ease: EXPO_OUT }}
      >
        {[texts.FEATURE_1, texts.FEATURE_2, texts.FEATURE_3].map((f) => (
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
        <p className={PROPERTIES.INFO_PRICE_LABEL}>{texts.PRICE_LABEL}</p>
        <p className={PROPERTIES.INFO_PRICE}>{texts.PRICE}</p>
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
        {texts.CTA}
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
      </motion.a>
    </div>
  );
}
