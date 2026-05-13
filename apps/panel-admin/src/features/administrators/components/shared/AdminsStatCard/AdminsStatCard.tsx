"use client";

import { ADMINS_STAT_CARD_STYLES as STYLE } from "./AdminsStatCard.styles";
import type { AdminsStatCardProps } from "./AdminsStatCard.interfaces";

const CARD_CLASS: Record<string, string> = {
  default: STYLE.cardDefault,
  success: STYLE.cardSuccess,
  danger:  STYLE.cardDanger,
};

const VALUE_CLASS: Record<string, string> = {
  default: STYLE.valueDefault,
  success: STYLE.valueSuccess,
  danger:  STYLE.valueDanger,
};

export const AdminsStatCard = ({ label, value, caption, variant = "default" }: AdminsStatCardProps) => {
  return (
    <div className={`${STYLE.card} ${CARD_CLASS[variant]}`}>
      <p className={STYLE.label}>{label}</p>
      <p className={`${STYLE.value} ${VALUE_CLASS[variant]}`}>{value}</p>
      <p className={STYLE.caption}>{caption}</p>
    </div>
  );
};
