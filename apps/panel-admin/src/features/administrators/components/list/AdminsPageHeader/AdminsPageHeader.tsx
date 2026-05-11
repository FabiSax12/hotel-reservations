"use client";

import { useI18n } from "@/locales";
import { AdminsStatCard } from "../../shared/AdminsStatCard/AdminsStatCard";
import { ADMINS_PAGE_HEADER_STYLES as S } from "./AdminsPageHeader.styles";
import type { AdminsPageHeaderProps } from "./AdminsPageHeader.interfaces";

export const AdminsPageHeader = ({ totalCount }: AdminsPageHeaderProps) => {
  const { t } = useI18n();

  return (
    <div className={S.layout}>
      <div className={S.leftColumn}>
        <h1 className={S.title}>
          {t.ADMINISTRATORS.PAGE.TITLE_PREFIX}{" "}
          <span className={S.titleAccent}>{t.ADMINISTRATORS.PAGE.TITLE_ACCENT}</span>
        </h1>
        <p className={S.subtitle}>{t.ADMINISTRATORS.PAGE.SUBTITLE}</p>
      </div>
      <div className={S.statRow}>
        <AdminsStatCard totalCount={totalCount} />
      </div>
    </div>
  );
};
