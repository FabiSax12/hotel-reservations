"use client";
 
import { useEffect } from "react";
import { AUTH_STYLES as AS, AUTH_BACKGROUND_IMAGE } from "@/features/auth/theme/auth.theme";
import { Button } from "@heroui/react";
import { useI18n } from "@/locales";
import { LOGIN_ERROR_STYLES as S } from "./error.styles";
 
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
    <main className={AS.main}>
      <div className={AS.background}>
        <div 
          className={AS.bgImage} 
          style={{ backgroundImage: AUTH_BACKGROUND_IMAGE }} 
        />
        <div className={AS.bgOverlay} />
        <div className={AS.bgGradient} />
      </div>
 
      <div className={S.contentWrapper}>
        <h2 className={S.title}>
          {t.AUTH.ERRORS.ERROR_BOUNDARY_TITLE}
        </h2>
        
        <p className={S.description}>
          {error.message || t.AUTH.ERRORS.UNKNOWN_ERROR}
        </p>
 
        <Button
          onPress={() => reset()}
          className={S.button}
        >
          {t.AUTH.ERRORS.TRY_AGAIN}
        </Button>
      </div>
    </main>
  );
}
