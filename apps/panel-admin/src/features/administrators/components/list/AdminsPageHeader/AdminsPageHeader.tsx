"use client";

import { useI18n } from "@/locales";
import { AdminsStatCard } from "../../shared/AdminsStatCard/AdminsStatCard";
import { ADMINS_PAGE_HEADER_STYLES as STYLE } from "./AdminsPageHeader.styles";
import type { AdminsPageHeaderProps } from "./AdminsPageHeader.interfaces";

export const AdminsPageHeader = ({ totalCount, activeCount, inactiveCount }: AdminsPageHeaderProps) => {
  const { t } = useI18n();

  return (
    <div className={STYLE.layout}>
      <div className={STYLE.leftColumn}>
        <h1 className={STYLE.title}>
          {t.ADMINISTRATORS.PAGE.TITLE_PREFIX}{" "}
          <span className={STYLE.titleAccent}>{t.ADMINISTRATORS.PAGE.TITLE_ACCENT}</span>
        </h1>
        <p className={STYLE.subtitle}>{t.ADMINISTRATORS.PAGE.SUBTITLE}</p>
      </div>
      <div className={STYLE.statRow}>
        <AdminsStatCard
          label={t.ADMINISTRATORS.STAT.TOTAL_LABEL}
          value={totalCount}
          caption={t.ADMINISTRATORS.STAT.TOTAL_CAPTION}
        />
        <AdminsStatCard
          label={t.ADMINISTRATORS.STAT.ACTIVE_LABEL}
          value={activeCount}
          caption={t.ADMINISTRATORS.STAT.ACTIVE_CAPTION}
          variant="success"
        />
        <AdminsStatCard
          label={t.ADMINISTRATORS.STAT.INACTIVE_LABEL}
          value={inactiveCount}
          caption={t.ADMINISTRATORS.STAT.INACTIVE_CAPTION}
          variant="danger"
        />
      </div>
    </div>
  );
};
