"use client";

import { Input, Label, TextField } from "@heroui/react";
import { ROOM_FILTER_INPUTS } from "@/features/rooms/constants/room-filter-inputs";
import { useI18n } from "@/locales";
import type { PriceMaxFilterProps } from "./PriceMaxFilter.interface";
import { PRICE_MAX_FILTER_STYLES as STYLES } from "./PriceMaxFilter.styles";

export function PriceMaxFilter({ defaultValue, onChange }: PriceMaxFilterProps) {
  const { t } = useI18n();
  const texts = t.ROOMS.LIST.FILTERS;

  return (
    <div className={STYLES.wrapper}>
      <TextField className="w-27.5">
        <Label className={STYLES.label}>{texts.PRICE_MAX_LABEL}</Label>
        <Input
          type="number"
          min={ROOM_FILTER_INPUTS.PRICE_MIN}
          placeholder={texts.PRICE_MAX_PLACEHOLDER}
          defaultValue={defaultValue}
          onChange={onChange}
          aria-label={texts.PRICE_MAX_LABEL}
        />
      </TextField>
    </div>
  );
}
