"use client";

import { memo } from "react";
import {
  CARD_STYLES,
  PAGE_HEADER_STYLES,
  STAT_CARD_STYLES,
} from "@/features/rooms/components/list/RoomsPageHeader/RoomsPageHeader.styles";
import { useI18n } from "@/locales";
import type { RoomsPageHeaderProps } from "./RoomsPageHeader.interface";

export const RoomsPageHeader = memo(({ totalCount, statusCounts }: RoomsPageHeaderProps) => {
  const { t } = useI18n();
  const texts = t.ROOMS.LIST;

  return (
    <div className={CARD_STYLES.body}>
      <div className={PAGE_HEADER_STYLES.layout}>
        <div className={PAGE_HEADER_STYLES.leftColumn}>
          <h1 className={PAGE_HEADER_STYLES.title}>
            {texts.PAGE_TITLE}{" "}
            <span className={PAGE_HEADER_STYLES.titleAccent}>{texts.PAGE_TITLE_ACCENT}</span>
          </h1>
          <p className={PAGE_HEADER_STYLES.subtitle}>{texts.PAGE_DESCRIPTION}</p>
        </div>

        <div className={STAT_CARD_STYLES.row}>
          <div className={STAT_CARD_STYLES.card}>
            <p className={STAT_CARD_STYLES.label}>{texts.STATS.AVAILABLE_LABEL}</p>
            <p className={STAT_CARD_STYLES.value}>{statusCounts.available}</p>
            <p className={STAT_CARD_STYLES.note}>{texts.STATS.AVAILABLE_NOTE}</p>
          </div>
          <div className={STAT_CARD_STYLES.card}>
            <p className={STAT_CARD_STYLES.label}>{texts.STATS.UNAVAILABLE_LABEL}</p>
            <p className={STAT_CARD_STYLES.value}>{statusCounts.unavailable}</p>
            <p className={STAT_CARD_STYLES.note}>{texts.STATS.UNAVAILABLE_NOTE}</p>
          </div>
          <div className={STAT_CARD_STYLES.card}>
            <p className={STAT_CARD_STYLES.label}>{texts.STATS.TOTAL_LABEL}</p>
            <p className={STAT_CARD_STYLES.value}>{totalCount}</p>
            <p className={STAT_CARD_STYLES.note}>{texts.STATS.TOTAL_NOTE}</p>
          </div>
        </div>
      </div>
    </div>
  );
});
