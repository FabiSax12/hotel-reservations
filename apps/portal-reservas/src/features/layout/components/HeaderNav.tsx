/**
 * @file HeaderNav.tsx — Navigation controls in the right side of the header.
 */

"use client";

import Link from "next/link";
import { ROUTES } from "@/config/routes";
import { useI18n } from "@/locales";
import { UI_CONSTANTS } from "../../../shared/constants/ui";
import { HEADER_STYLES as S } from "../../../theme/layout.theme";

export function HeaderNav() {
  const { t } = useI18n();

  return (
    <div className={S.nav}>
      <button className={`${S.helpBtn} hidden sm:block`}>{UI_CONSTANTS.HEADER.HELP}</button>
      
      <Link href={ROUTES.AUTH.LOGIN} className={S.loginBtn}>
        {t.AUTH.LOGIN.TITLE}
      </Link>
    </div>
  );
}
