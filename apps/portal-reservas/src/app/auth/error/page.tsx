"use client";

import Link from "next/link";
import { Button } from "@heroui/react";
import { ROUTES } from "@/config/routes";
import { useI18n } from "@/locales";
import { AUTH_ERROR_STYLES as S } from "./page.styles";
import type { AuthErrorPageProps } from "./page.interface";

export default function AuthErrorPage({
  searchParams,
}: AuthErrorPageProps) {
  const { t } = useI18n();
  const error = searchParams?.error || "unknown_error";
  const description = searchParams?.error_description || t.AUTH.ERRORS.UNKNOWN_ERROR;

  return (
    <div className={S.root}>
      <div className={S.card}>
        <h1 className={S.title}>{t.AUTH.ERRORS.AUTH_ERROR_TITLE}</h1>
        <p className={S.description}>{description}</p>
        
        <div className={S.codeWrapper}>
          <p className={S.codeText}>
            <strong>{t.AUTH.ERRORS.AUTH_ERROR_CODE}</strong> {error}
          </p>
        </div>

        <Button
          render={(props: any) => <Link {...props} href={ROUTES.AUTH.LOGIN} />}
          variant="primary"
          className={S.button}
        >
          {t.AUTH.ERRORS.BACK_TO_LOGIN}
        </Button>
      </div>
    </div>
  );
}
