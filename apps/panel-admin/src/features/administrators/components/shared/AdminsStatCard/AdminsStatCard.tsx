"use client";

import { useI18n } from "@/locales";
import { ADMINS_STAT_CARD_STYLES as S } from "./AdminsStatCard.styles";
import type { AdminsStatCardProps } from "./AdminsStatCard.interfaces";

export const AdminsStatCard = ({ totalCount }: AdminsStatCardProps) => {
  const { t } = useI18n();

  return (
    <div className={S.card}>
      <p className={S.label}>{t.ADMINISTRATORS.STAT.TOTAL_LABEL}</p>
      <p className={S.value}>{totalCount}</p>
      <p className={S.caption}>{t.ADMINISTRATORS.STAT.TOTAL_CAPTION}</p>
    </div>
  );
};
