/**
 * @file RoomFiltersBar.tsx — Top-level container for sort + expandable filters.
 *
 * Orchestrator for US-DM-03: composes the SortControl dropdown, the
 * expandable FiltersPanel, the active-filters badge and the reset button.
 *
 * The bar owns only its open/close UI state. All filter/sort state lives
 * upstream in `useRoomFilters` and is passed in via props (controlled).
 */

"use client";

import { useState } from "react";
import { useI18n } from "@/locales";
import { ROOM_FILTERS_BAR_STYLES as S } from "../../../theme/rooms.theme";
import { hasActiveFilters } from "../domain/filters";
import type { RoomFiltersBarProps } from "../domain/types";
import { FiltersPanel } from "./sub-components/FiltersPanel";
import { SortControl } from "./sub-components/SortControl";

export function RoomFiltersBar({
  attributes,
  filters,
  onFiltersChange,
  sort,
  onSortChange,
  onReset,
}: RoomFiltersBarProps) {
  const { t } = useI18n();
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  const isFiltered = hasActiveFilters(filters);
  const activeCount =
    filters.amenities.length + filters.roomTypes.length + (filters.priceRange ? 1 : 0);

  const handleToggle = () => setIsPanelOpen((prev) => !prev);
  const handleReset = () => {
    onReset();
  };

  return (
    <section className={S.bar} aria-label={t.ROOMS.FILTERS_TITLE}>
      <div className={S.topRow}>
        <div className={S.topRowLeft}>
          <button
            type="button"
            className={S.toggleBtn(isPanelOpen)}
            onClick={handleToggle}
            aria-expanded={isPanelOpen}
            aria-controls="rooms-filters-panel"
          >
            {isPanelOpen ? t.ROOMS.FILTERS_HIDE : t.ROOMS.FILTERS_SHOW}
            <span className={S.toggleIcon(isPanelOpen)} aria-hidden="true">
              ▾
            </span>
          </button>
          {isFiltered && (
            <span className={S.activeBadge}>
              {activeCount} {t.ROOMS.FILTERS_ACTIVE_BADGE}
            </span>
          )}
          <button type="button" className={S.resetBtn} onClick={handleReset} disabled={!isFiltered}>
            {t.ROOMS.FILTERS_RESET}
          </button>
        </div>
        <SortControl value={sort} onChange={onSortChange} />
      </div>

      <div id="rooms-filters-panel">
        <FiltersPanel
          attributes={attributes}
          filters={filters}
          onChange={onFiltersChange}
          onReset={handleReset}
          isOpen={isPanelOpen}
          onToggle={handleToggle}
        />
      </div>
    </section>
  );
}
