"use client";

import { Input, Label, TextField } from "@heroui/react";
import { useI18n } from "@/locales";
import type { PriceMinFilterProps } from "./PriceMinFilter.interface";
import { PRICE_MIN_FILTER_STYLES as STYLES } from "./PriceMinFilter.styles";

export function PriceMinFilter({ defaultValue, onChange }: PriceMinFilterProps) {
  const { t } = useI18n();
  const texts = t.ROOMS.LIST.FILTERS;

  return (
    <div className={STYLES.wrapper}>
      <TextField className="w-27.5">
        <Label className={STYLES.label}>{texts.PRICE_MIN_LABEL}</Label>
        <Input
          type="number"
          min={1}
          placeholder={texts.PRICE_MIN_PLACEHOLDER}
          defaultValue={defaultValue}
          onChange={onChange}
          aria-label={texts.PRICE_MIN_LABEL}
        />
      </TextField>
    </div>
  );
}
