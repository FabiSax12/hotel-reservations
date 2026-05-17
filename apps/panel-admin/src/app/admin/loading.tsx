"use client";

import { Spinner } from "@heroui/react";
import { useI18n } from "@/locales";

const RESERVATIONS_LOADING_STYLES = {
  wrapper: "flex flex-col items-center justify-center min-h-96",
  label: "text-neutral-600 font-medium"
} as const;

export default function Loading() {
  const { t } = useI18n();

  return (
    <div className={RESERVATIONS_LOADING_STYLES.wrapper} aria-busy="true">
      <Spinner />
      <p className={RESERVATIONS_LOADING_STYLES.label}>{t.COMMON.STATUS.LOADING}</p>
    </div>
  );
}
