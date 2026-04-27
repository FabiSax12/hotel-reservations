"use client";

import { useI18n } from "@/locales";
import { FILTER_RESULTS_SUMMARY_STYLES as S } from "./FilterResultsSummary.styles";
import type { FilterResultsSummaryProps } from "./FilterResultsSummary.interface";

export const FilterResultsSummary = ({
  filteredCount,
  totalCount,
  isFiltered,
}: FilterResultsSummaryProps) => {
  const { t } = useI18n();

  if (!isFiltered) return null;

  return (
    <p className={S.resultsText}>
      <span className={S.resultsCount}>{filteredCount}</span>
      {` ${t.RESERVATIONS.FILTERS.RESULTS_OF} ${totalCount} ${t.RESERVATIONS.FILTERS.RESULTS_SUFFIX}`}
    </p>
  );
};
