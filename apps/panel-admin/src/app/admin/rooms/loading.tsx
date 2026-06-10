"use client";

import { Spinner } from "@heroui/react";
import { useI18n } from "@/locales";

const LOADING_STYLES = Object.freeze({
  wrapper: "flex flex-col items-center justify-center min-h-96",
  label: "text-neutral-600 font-medium",
} as const);

export default function Loading() {
  const { t } = useI18n();

  return (
    <div className={LOADING_STYLES.wrapper} aria-busy="true">
      <Spinner />
      <p className={LOADING_STYLES.label}>{t.COMMON.STATUS.LOADING}</p>
    </div>
  );
}
