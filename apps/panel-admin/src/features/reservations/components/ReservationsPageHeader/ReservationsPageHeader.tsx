"use client";

import { useI18n } from "@/locales";
import { CARD_STYLES } from "../ReservationsView/ReservationsView.styles";
import { PAGE_HEADER_STYLES, STAT_CARD_STYLES } from "./ReservationsPageHeader.styles";
import type { ReservationsPageHeaderProps } from "./ReservationsPageHeader.interface";

export const ReservationsPageHeader = ({
  totalCount,
  statusCounts,
}: ReservationsPageHeaderProps) => {
  const { t } = useI18n();

  return (
    <div className={CARD_STYLES.body}>
      <div className={PAGE_HEADER_STYLES.layout}>
        <div className={PAGE_HEADER_STYLES.leftColumn}>
          <h1 className={PAGE_HEADER_STYLES.title}>
            {t.RESERVATIONS.PAGE.TITLE_PREFIX}{" "}
            <span className={PAGE_HEADER_STYLES.titleAccent}>
              {t.RESERVATIONS.PAGE.TITLE_ACCENT}
            </span>
          </h1>
          <p className={PAGE_HEADER_STYLES.subtitle}>
            {t.RESERVATIONS.PAGE.DESCRIPTION}{" "}
            <span className={PAGE_HEADER_STYLES.subtitleHighlight}>{totalCount}</span>
          </p>
        </div>

        <div className={STAT_CARD_STYLES.row}>
          <div className={STAT_CARD_STYLES.card}>
            <p className={STAT_CARD_STYLES.label}>{t.RESERVATIONS.STATS.PENDING_LABEL}</p>
            <p className={STAT_CARD_STYLES.value}>{statusCounts.pending}</p>
            <p className={STAT_CARD_STYLES.note}>{t.RESERVATIONS.STATS.PENDING_NOTE}</p>
          </div>
          <div className={STAT_CARD_STYLES.card}>
            <p className={STAT_CARD_STYLES.label}>{t.RESERVATIONS.STATS.APPROVED_LABEL}</p>
            <p className={STAT_CARD_STYLES.value}>{statusCounts.approved}</p>
            <p className={STAT_CARD_STYLES.note}>{t.RESERVATIONS.STATS.APPROVED_NOTE}</p>
          </div>
          <div className={STAT_CARD_STYLES.card}>
            <p className={STAT_CARD_STYLES.label}>{t.RESERVATIONS.STATS.TOTAL_LABEL}</p>
            <p className={STAT_CARD_STYLES.value}>{totalCount}</p>
            <p className={STAT_CARD_STYLES.note}>{t.RESERVATIONS.STATS.TOTAL_NOTE}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
