/**
 * @file AmenityChipsFilter.tsx — Multi-select chips for the amenities filter.
 *
 * Renders one toggleable button per amenity present in the current room set
 * (auto-derived upstream by `extractFilterAttributes`).
 */

"use client";

import { useI18n } from "@/locales";
import { ROOM_FILTERS_BAR_STYLES as S } from "../../../../theme/rooms.theme";
import type { AmenityChipsFilterProps } from "../../domain/types";

export function AmenityChipsFilter({ options, selected, onToggle }: AmenityChipsFilterProps) {
  const { t } = useI18n();

  if (options.length === 0) return null;

  return (
    <fieldset className={S.groupBlock}>
      <legend className={S.groupTitle}>{t.ROOMS.FILTERS_AMENITIES_TITLE}</legend>
      <div className={S.chipsRow}>
        {options.map((amenity) => {
          const isSelected = selected.includes(amenity);
          return (
            <button
              key={amenity}
              type="button"
              className={S.chip(isSelected)}
              aria-pressed={isSelected}
              onClick={() => onToggle(amenity)}
            >
              {amenity}
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}
