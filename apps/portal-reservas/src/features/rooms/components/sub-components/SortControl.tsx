/**
 * @file SortControl.tsx — Native select for the room listing sort option.
 *
 * Implements US-DM-03 AC #1: controls for "destacado", "precio asc",
 * "precio desc". Renders the options in `ROOM_SORT_OPTIONS_ORDER`, labels
 * driven by i18n. Theme-only styles.
 */

"use client";

import { useI18n } from "@/locales";
import { ROOM_FILTERS_BAR_STYLES as S } from "../../../../theme/rooms.theme";
import { ROOM_SORT_OPTIONS_ORDER } from "../../constants/rooms-filters.constants";
import type { RoomSortOption, SortControlProps } from "../../domain/types";

export function SortControl({ value, onChange }: SortControlProps) {
  const { t } = useI18n();

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(event.target.value as RoomSortOption);
  };

  const optionLabel = (option: RoomSortOption): string => {
    if (option === "PRICE_ASC") return t.ROOMS.SORT_PRICE_ASC;
    if (option === "PRICE_DESC") return t.ROOMS.SORT_PRICE_DESC;
    return t.ROOMS.SORT_FEATURED;
  };

  return (
    <div className={S.sortWrapper}>
      <label htmlFor="rooms-sort-select" className={S.sortLabel}>
        {t.ROOMS.SORT_LABEL}
      </label>
      <select
        id="rooms-sort-select"
        className={S.sortSelect}
        value={value}
        onChange={handleChange}
        aria-label={t.ROOMS.SORT_LABEL}
      >
        {ROOM_SORT_OPTIONS_ORDER.map((option) => (
          <option key={option} value={option}>
            {optionLabel(option)}
          </option>
        ))}
      </select>
    </div>
  );
}
