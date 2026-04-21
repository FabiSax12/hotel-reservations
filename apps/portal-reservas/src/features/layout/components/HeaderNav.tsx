/**
 * @file HeaderNav.tsx — Navigation controls in the right side of the header.
 */

"use client";

import Link from "next/link";
import { ROUTES } from "@/config/routes";
import { useI18n } from "@/locales";
import { UI_CONSTANTS } from "../../../shared/constants/ui";
import { HEADER_STYLES as S } from "../../../theme/layout.theme";

import { useAuthSession } from "../../auth/hooks/useAuthSession";

export function HeaderNav() {
  const { t } = useI18n();
  const { user, isLoading } = useAuthSession();

  return (
    <div className={S.nav}>
      <button className={`${S.helpBtn} hidden sm:block`}>{UI_CONSTANTS.HEADER.HELP}</button>
      
      {isLoading ? (
        <div className="w-24 h-10 animate-pulse bg-neutral-200 rounded-full hidden sm:block" />
      ) : user ? (
        <span className="text-sm font-medium text-neutral-800 px-4">
          {user.user_metadata?.full_name || user.email}
        </span>
      ) : (
        <Link href={ROUTES.AUTH.LOGIN} className={S.loginBtn}>
          {t.AUTH.LOGIN.TITLE}
        </Link>
      )}
    </div>
  );
}
