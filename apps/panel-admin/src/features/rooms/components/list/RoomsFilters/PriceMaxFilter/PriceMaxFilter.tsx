"use client";

import { Input, Label, TextField } from "@heroui/react";
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
          min={1}
          placeholder={texts.PRICE_MAX_PLACEHOLDER}
          defaultValue={defaultValue}
          onChange={onChange}
          aria-label={texts.PRICE_MAX_LABEL}
        />
      </TextField>
    </div>
  );
}
