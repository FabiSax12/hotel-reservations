"use client";

import { Spinner } from "@heroui/react";
import { AUTH_STYLES, AUTH_BACKGROUND_IMAGE } from "@/features/auth/theme/auth.theme";
import { LOGIN_LOADING_STYLES } from "./loading.styles";
import { useI18n } from "@/locales";

export default function LoginLoading() {
  const { t } = useI18n();

  return (
    <main className={AUTH_STYLES.main}>
      <div className={AUTH_STYLES.background}>
        <div
          className={AUTH_STYLES.bgImage}
          style={{ backgroundImage: AUTH_BACKGROUND_IMAGE }}
        />
        <div className={AUTH_STYLES.bgOverlay} />
        <div className={AUTH_STYLES.bgGradient} />
      </div>
      <div className={LOGIN_LOADING_STYLES.spinnerWrapper}>
        <Spinner
          size="lg"
          className={LOGIN_LOADING_STYLES.spinner}
          aria-label={t.AUTH.LOGIN.LOADING}
        />
      </div>
    </main>
  );
}
