"use client";

import Link from "next/link";
import { ROUTES } from "@/config/routes";
import { useI18n } from "@/locales";
import { ACTIVATION_SUCCESS_STYLES as S } from "./ActivationSuccess.styles";

export const ActivationSuccess = () => {
  const { t } = useI18n();
  const { SUCCESS_TITLE, SUCCESS_MESSAGE, SUCCESS_LOGIN_LINK } = t.AUTH.ACTIVATE;

  return (
    <main className={S.wrapper}>
      <div className={S.card}>
        <div role="status" className={S.statusBanner}>
          <p className="font-semibold">{SUCCESS_TITLE}</p>
          <p>{SUCCESS_MESSAGE}</p>
        </div>
        <Link href={ROUTES.AUTH.LOGIN} className={S.loginLink}>
          {SUCCESS_LOGIN_LINK}
        </Link>
      </div>
    </main>
  );
};
