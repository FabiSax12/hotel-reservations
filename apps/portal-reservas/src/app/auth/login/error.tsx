"use client";
 
import { useEffect } from "react";
import { AUTH_STYLES, AUTH_BACKGROUND_IMAGE } from "@/features/auth/theme/auth.theme";
import { Button } from "@heroui/react";
import { useI18n } from "@/locales";
import { LOGIN_ERROR_STYLES } from "./error.styles";
 
export default function LoginError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const { t } = useI18n();
 
  useEffect(() => {
    console.error(error);
  }, [error]);
 
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

      <div className={LOGIN_ERROR_STYLES.contentWrapper}>
        <h2 className={LOGIN_ERROR_STYLES.title}>
          {t.AUTH.ERRORS.ERROR_BOUNDARY_TITLE}
        </h2>

        <p className={LOGIN_ERROR_STYLES.description}>
          {error.message || t.AUTH.ERRORS.UNKNOWN_ERROR}
        </p>

        <Button
          onPress={() => reset()}
          className={LOGIN_ERROR_STYLES.button}
        >
          {t.AUTH.ERRORS.TRY_AGAIN}
        </Button>
      </div>
    </main>
  );
}
