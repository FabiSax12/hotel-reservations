"use client";

import { Spinner } from "@heroui/react";
import { AUTH_STYLES as S, AUTH_BACKGROUND_IMAGE } from "@/features/auth/theme/auth.theme";
import { LOGIN_LOADING_STYLES as LS } from "./loading.styles";
import { useI18n } from "@/locales";

export default function LoginLoading() {
  const { t } = useI18n();

  return (
    <main className={S.main}>
      <div className={S.background}>
        <div 
          className={S.bgImage} 
          style={{ backgroundImage: AUTH_BACKGROUND_IMAGE }} 
        />
        <div className={S.bgOverlay} />
        <div className={S.bgGradient} />
      </div>
      <div className={LS.spinnerWrapper}>
        <Spinner 
          size="lg" 
          className={LS.spinner} 
          aria-label={t.AUTH.LOGIN.LOADING} 
        />
      </div>
    </main>
  );
}
