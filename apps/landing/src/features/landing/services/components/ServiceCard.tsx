"use client";

import { motion } from "framer-motion";
import { CARD_VARIANT } from "@/features/landing/services/constants/animations";
import { SERVICES } from "@/features/landing/services/constants/styles";
import type { ServiceCardProps } from "./ServiceCard.types";

export function ServiceCard({ service, texts, index }: ServiceCardProps) {
  const { Icon } = service;
  return (
    <motion.div className={SERVICES.CARD} variants={CARD_VARIANT} custom={index}>
      <Icon className={SERVICES.CARD_ICON} strokeWidth={1.5} aria-hidden="true" />
      <div className={SERVICES.CARD_ACCENT} />
      <h3 className={SERVICES.CARD_TITLE}>{texts.TITLE}</h3>
      <p className={SERVICES.CARD_DESC}>{texts.DESC}</p>
    </motion.div>
  );
}
