"use client";

import { ClipboardList } from "lucide-react";
import { useI18n } from "@/locales";
import { EMPTY_STATE_STYLES as STYLES } from "./EmptyState.styles";

export const EmptyState = () => {
  const { t } = useI18n();
  return (
    <div className={STYLES.wrapper}>
      <ClipboardList className={STYLES.icon} aria-hidden="true" />
      <p className={STYLES.title}>{t.RESERVATIONS.EMPTY.TITLE}</p>
      <p className={STYLES.description}>{t.RESERVATIONS.EMPTY.DESCRIPTION}</p>
    </div>
  );
};
