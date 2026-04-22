"use client";

import { useI18n } from "@/locales";

export default function Loading() {
  const { t } = useI18n();

  return (
    <div className="flex flex-col items-center justify-center min-h-96" aria-busy="true" aria-label={t.COMMON.STATUS.LOADING}>
      <div className="w-10 h-10 border-4 border-neutral-300 border-t-neutral-900 rounded-full animate-spin mb-4"></div>
      <p className="text-neutral-600 font-medium">{t.COMMON.STATUS.LOADING}</p>
    </div>
  );
}
