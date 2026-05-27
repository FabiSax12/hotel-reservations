/**
 * @file RoomTypeChipsFilter.tsx — Multi-select chips for the room-type filter.
 *
 * Renders one toggleable button per room type present in the current room set.
 */

"use client";

import { useI18n } from "@/locales";
import { ROOM_FILTERS_BAR_STYLES as S } from "../../../../theme/rooms.theme";
import type { RoomTypeChipsFilterProps } from "../../domain/types";

export function RoomTypeChipsFilter({ options, selected, onToggle }: RoomTypeChipsFilterProps) {
  const { t } = useI18n();

  if (options.length === 0) return null;

  return (
    <fieldset className={S.groupBlock}>
      <legend className={S.groupTitle}>{t.ROOMS.FILTERS_ROOM_TYPES_TITLE}</legend>
      <div className={S.chipsRow}>
        {options.map((type) => {
          const isSelected = selected.includes(type);
          return (
            <button
              key={type}
              type="button"
              className={S.chip(isSelected)}
              aria-pressed={isSelected}
              onClick={() => onToggle(type)}
            >
              {type}
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}
