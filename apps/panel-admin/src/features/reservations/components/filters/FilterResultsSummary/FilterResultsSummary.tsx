"use client";

import { useI18n } from "@/locales";
import { FILTER_RESULTS_SUMMARY_STYLES as STYLES } from "./FilterResultsSummary.styles";
import type { FilterResultsSummaryProps } from "./FilterResultsSummary.interface";

export const FilterResultsSummary = ({
  filteredCount,
  totalCount,
  isFiltered,
}: FilterResultsSummaryProps) => {
  const { t } = useI18n();

  if (!isFiltered) return null;

  return (
    <p className={STYLES.resultsText}>
      <span className={STYLES.resultsCount}>{filteredCount}</span>
      {` ${t.RESERVATIONS.FILTERS.RESULTS_OF} ${totalCount} ${t.RESERVATIONS.FILTERS.RESULTS_SUFFIX}`}
    </p>
  );
};
