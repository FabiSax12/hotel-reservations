"use client";

import { useI18n } from "@/locales";
import type { ActivationTokenErrorProps } from "./ActivationTokenError.interface";
import { ACTIVATION_TOKEN_ERROR_STYLES as S } from "./ActivationTokenError.styles";

export const ActivationTokenError = ({ errorKey }: ActivationTokenErrorProps) => {
  const { t } = useI18n();
  const { ERRORS } = t.AUTH.ACTIVATE;

  return (
    <main className={S.wrapper}>
      <div className={S.card}>
        <div role="alert" className={S.errorContainer}>
          <p className={S.errorText}>{ERRORS[errorKey]}</p>
          <p className={S.contactText}>{ERRORS.CONTACT_ADMIN}</p>
        </div>
      </div>
    </main>
  );
};
