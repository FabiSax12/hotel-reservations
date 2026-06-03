"use client";
 
import Link from "next/link";
import { Button } from "@heroui/react";
import { ROUTES } from "@/config/routes";
import { useI18n } from "@/locales";
import { CALLBACK_SEARCH_PARAMS } from "@/features/auth/constants/callback-search-params";
import { SUPABASE_ERROR_CODES } from "@/features/auth/constants/supabaseErrors";
import { AUTH_ERROR_STYLES } from "./page.styles";
import type { AuthErrorContentProps } from "./page.interface";
 
export function AuthErrorContent({ searchParams }: AuthErrorContentProps) {
  const { t } = useI18n();
  
  const errorCode =
    searchParams?.[CALLBACK_SEARCH_PARAMS.ERROR] ||
    SUPABASE_ERROR_CODES.UNKNOWN_ERROR;
 
  const getTranslatedDescription = () => {
    const errorKey = errorCode.toString().toUpperCase() as keyof typeof t.AUTH.ERRORS;
    
    if (t.AUTH.ERRORS[errorKey]) {
      return t.AUTH.ERRORS[errorKey];
    }
 
    return (
      (searchParams?.[CALLBACK_SEARCH_PARAMS.ERROR_DESCRIPTION] as string) ||
      t.AUTH.ERRORS.UNKNOWN_ERROR
    );
  };
 
  return (
    <div className={AUTH_ERROR_STYLES.root}>
      <div className={AUTH_ERROR_STYLES.card}>
        <h1 className={AUTH_ERROR_STYLES.title}>{t.AUTH.ERRORS.AUTH_ERROR_TITLE}</h1>
        <p className={AUTH_ERROR_STYLES.description}>{getTranslatedDescription()}</p>

        <div className={AUTH_ERROR_STYLES.codeWrapper}>
          <p className={AUTH_ERROR_STYLES.codeText}>
            <strong>{t.AUTH.ERRORS.AUTH_ERROR_CODE}</strong> {errorCode}
          </p>
        </div>

        <Button
          render={(props: any) => <Link {...props} href={ROUTES.AUTH.LOGIN} />}
          variant={AUTH_ERROR_STYLES.buttonVariant}
          className={AUTH_ERROR_STYLES.button}
        >
          {t.AUTH.ERRORS.BACK_TO_LOGIN}
        </Button>
      </div>
    </div>
  );
}
