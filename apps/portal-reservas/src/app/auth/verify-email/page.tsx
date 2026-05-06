import type { Metadata } from "next";
import Link from "next/link";
import { ROUTES } from "@/config/routes";
import { AUTH_FORM_STYLES as S, VERIFY_EMAIL_STYLES as V } from "@/features/auth/theme/auth.theme";
import { defaultLocale, TRANSLATIONS } from "@/locales";

const t = TRANSLATIONS[defaultLocale];

export const metadata: Metadata = {
  title: t.AUTH.VERIFY_EMAIL.TITLE,
};

export default function VerifyEmailPage() {
  return (
    <div className={S.pageWrapper}>
      <div className={S.cardCentered}>
        <div className={V.iconWrapper} aria-hidden="true">
          ✉️
        </div>

        <h1 className={S.headingCentered}>{t.AUTH.VERIFY_EMAIL.TITLE}</h1>

        <p className={V.description}>{t.AUTH.VERIFY_EMAIL.DESCRIPTION}</p>

        <Link href={ROUTES.AUTH.LOGIN} className={V.link}>
          {t.AUTH.VERIFY_EMAIL.BACK_TO_LOGIN}
        </Link>
      </div>
    </div>
  );
}
