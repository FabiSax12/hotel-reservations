"use client";

import { useI18n } from "@/locales";

export const ActivationLoading = () => {
  const { t } = useI18n();

  return (
    <main className="flex min-h-screen items-center justify-center">
      <p className="text-sm text-gray-500" aria-live="polite">
        {t.AUTH.ACTIVATE.LOADING}
      </p>
    </main>
  );
};
