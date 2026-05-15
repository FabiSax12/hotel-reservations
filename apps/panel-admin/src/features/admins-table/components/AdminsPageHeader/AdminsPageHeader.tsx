"use client";

import { useI18n } from "@/locales";
import { CARD_STYLES } from "../AdminsTableView/AdminsTableView.styles";
import type { AdminsPageHeaderProps } from "./AdminsPageHeader.interface";
import { PAGE_HEADER_STYLES, STAT_CARD_STYLES } from "./AdminsPageHeader.styles";

export const AdminsPageHeader = ({ totalCount, statusCounts }: AdminsPageHeaderProps) => {
  const { t } = useI18n();

  return (
    <div className={CARD_STYLES.body}>
      <div className={PAGE_HEADER_STYLES.layout}>
        <div className={PAGE_HEADER_STYLES.leftColumn}>
          <h1 className={PAGE_HEADER_STYLES.title}>
            {t.ADMINS.PAGE.TITLE_PREFIX}{" "}
            <span className={PAGE_HEADER_STYLES.titleAccent}>{t.ADMINS.PAGE.TITLE_ACCENT}</span>
          </h1>
          <p className={PAGE_HEADER_STYLES.subtitle}>
            {t.ADMINS.PAGE.DESCRIPTION}{" "}
            <span className={PAGE_HEADER_STYLES.subtitleHighlight}>{totalCount}</span>
          </p>
        </div>

        <div className={STAT_CARD_STYLES.row}>
          <div className={STAT_CARD_STYLES.card}>
            <p className={STAT_CARD_STYLES.label}>{t.ADMINS.STATS.ACTIVE_LABEL}</p>
            <p className={STAT_CARD_STYLES.value}>{statusCounts.active}</p>
            <p className={STAT_CARD_STYLES.note}>{t.ADMINS.STATS.ACTIVE_NOTE}</p>
          </div>
          <div className={STAT_CARD_STYLES.card}>
            <p className={STAT_CARD_STYLES.label}>{t.ADMINS.STATS.INACTIVE_LABEL}</p>
            <p className={STAT_CARD_STYLES.value}>{statusCounts.inactive}</p>
            <p className={STAT_CARD_STYLES.note}>{t.ADMINS.STATS.INACTIVE_NOTE}</p>
          </div>
          <div className={STAT_CARD_STYLES.card}>
            <p className={STAT_CARD_STYLES.label}>{t.ADMINS.STATS.TOTAL_LABEL}</p>
            <p className={STAT_CARD_STYLES.value}>{totalCount}</p>
            <p className={STAT_CARD_STYLES.note}>{t.ADMINS.STATS.TOTAL_NOTE}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
