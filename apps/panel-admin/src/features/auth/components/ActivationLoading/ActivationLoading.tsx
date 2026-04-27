"use client";

import { useI18n } from "@/locales";
import { ACTIVATION_LOADING_STYLES as S } from "./ActivationLoading.styles";

export const ActivationLoading = () => {
  const { t } = useI18n();

  return (
    <main className={S.wrapper}>
      <p className={S.text} aria-live="polite">
        {t.AUTH.ACTIVATE.LOADING}
      </p>
    </main>
  );
};
