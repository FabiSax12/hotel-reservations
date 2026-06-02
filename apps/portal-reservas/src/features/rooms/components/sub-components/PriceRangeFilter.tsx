/**
 * @file PriceRangeFilter.tsx — Min/max numeric inputs for the price range filter.
 *
 * Inputs are clamped to the dynamic price bounds derived from the current
 * room set. The component is fully controlled; the parent decides when the
 * filter is considered "active" by passing `value` (or null upstream).
 */

"use client";

import { useI18n } from "@/locales";
import { ROOM_FILTERS_BAR_STYLES as S } from "../../../../theme/rooms.theme";
import { PRICE_RANGE_STEP } from "../../constants/rooms-filters.constants";
import type { PriceRangeFilterProps } from "../../domain/types";

const parseNumeric = (raw: string, fallback: number): number => {
  const parsed = Number(raw);
  return Number.isFinite(parsed) ? parsed : fallback;
};

export function PriceRangeFilter({ bounds, value, onChange }: PriceRangeFilterProps) {
  const { t } = useI18n();

  const handleMinChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const next = Math.max(
      bounds.min,
      Math.min(value.max, parseNumeric(event.target.value, bounds.min)),
    );
    onChange({ min: next, max: value.max });
  };

  const handleMaxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const next = Math.min(
      bounds.max,
      Math.max(value.min, parseNumeric(event.target.value, bounds.max)),
    );
    onChange({ min: value.min, max: next });
  };

  return (
    <div className={S.groupBlock}>
      <p className={S.groupTitle}>{t.ROOMS.FILTERS_PRICE_RANGE_TITLE}</p>
      <div className={S.rangeRow}>
        <div className={S.rangeInputBlock}>
          <label htmlFor="filter-price-min" className={S.rangeInputLabel}>
            {t.ROOMS.FILTERS_PRICE_MIN_LABEL}
          </label>
          <input
            id="filter-price-min"
            type="number"
            inputMode="numeric"
            className={S.rangeInput}
            min={bounds.min}
            max={bounds.max}
            step={PRICE_RANGE_STEP}
            value={value.min}
            onChange={handleMinChange}
          />
        </div>
        <div className={S.rangeInputBlock}>
          <label htmlFor="filter-price-max" className={S.rangeInputLabel}>
            {t.ROOMS.FILTERS_PRICE_MAX_LABEL}
          </label>
          <input
            id="filter-price-max"
            type="number"
            inputMode="numeric"
            className={S.rangeInput}
            min={bounds.min}
            max={bounds.max}
            step={PRICE_RANGE_STEP}
            value={value.max}
            onChange={handleMaxChange}
          />
        </div>
      </div>
      <p className={S.rangeBounds}>
        {bounds.min} – {bounds.max} {t.ROOMS.CURRENCY}
      </p>
    </div>
  );
}
