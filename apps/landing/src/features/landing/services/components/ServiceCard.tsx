"use client";

import { motion } from "framer-motion";
import { SERVICES } from "@/features/landing/services/constants/styles";
import type { ServiceConfig } from "@/features/landing/services/constants/services-config";
import type { ServiceItemTexts } from "@/features/landing/services/i18n/servicesTexts.type";
import { EXPO_OUT } from "@/features/landing/constants/animations";

type ServiceCardProps = {
  service: ServiceConfig;
  texts: ServiceItemTexts;
  index: number;
};

const CARD_VARIANT = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay: i * 0.07, ease: EXPO_OUT },
  }),
};

export function ServiceCard({ service, texts, index }: ServiceCardProps) {
  const { Icon } = service;
  return (
    <motion.div
      className={SERVICES.CARD}
      variants={CARD_VARIANT}
      custom={index}
    >
      <Icon
        className={SERVICES.CARD_ICON}
        strokeWidth={1.5}
        aria-hidden="true"
      />
      <div className={SERVICES.CARD_ACCENT} />
      <h3 className={SERVICES.CARD_TITLE}>{texts.TITLE}</h3>
      <p className={SERVICES.CARD_DESC}>{texts.DESC}</p>
    </motion.div>
  );
}
