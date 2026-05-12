"use client";

import { ClipboardList } from "lucide-react";
import { useI18n } from "@/locales";
import { EMPTY_STATE_STYLES as S } from "./EmptyState.styles";

export const EmptyState = () => {
  const { t } = useI18n();
  return (
    <div className={S.wrapper}>
      <ClipboardList className={S.icon} aria-hidden="true" />
      <p className={S.title}>{t.RESERVATIONS.EMPTY.TITLE}</p>
      <p className={S.description}>{t.RESERVATIONS.EMPTY.DESCRIPTION}</p>
    </div>
  );
};
