"use client";

import { useI18n } from "@/locales";
import type { ResultsSummaryProps } from "./ResultsSummary.interface";
import { RESULTS_SUMMARY_STYLES as STYLES } from "./ResultsSummary.styles";

export function ResultsSummary({ resultCount, totalCount }: ResultsSummaryProps) {
  const { t } = useI18n();
  const texts = t.ROOMS.LIST.FILTERS;

  return (
    <p className={STYLES.text}>
      <span className={STYLES.count}>{resultCount}</span>
      {` ${texts.RESULTS_OF} ${totalCount} ${texts.RESULTS_SUFFIX}`}
    </p>
  );
}
