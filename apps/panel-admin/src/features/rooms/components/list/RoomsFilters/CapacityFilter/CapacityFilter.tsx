"use client";

import { Input, Label, TextField } from "@heroui/react";
import { useI18n } from "@/locales";
import type { CapacityFilterProps } from "./CapacityFilter.interface";
import { CAPACITY_FILTER_STYLES as STYLES } from "./CapacityFilter.styles";

export function CapacityFilter({ defaultValue, onChange }: CapacityFilterProps) {
  const { t } = useI18n();
  const texts = t.ROOMS.LIST.FILTERS;

  return (
    <div className={STYLES.wrapper}>
      <TextField className="w-30">
        <Label className={STYLES.label}>{texts.CAPACITY_LABEL}</Label>
        <Input
          type="number"
          min={1}
          placeholder={texts.CAPACITY_PLACEHOLDER}
          defaultValue={defaultValue}
          onChange={onChange}
          aria-label={texts.CAPACITY_LABEL}
        />
      </TextField>
    </div>
  );
}
