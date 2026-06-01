"use client";

import { Label, SearchField } from "@heroui/react";
import { useI18n } from "@/locales";
import type { GuestSearchInputProps } from "./GuestSearchInput.interface";
import { GUEST_SEARCH_INPUT_STYLES as STYLES } from "./GuestSearchInput.styles";

export const GuestSearchInput = ({ value, onChange }: GuestSearchInputProps) => {
  const { t } = useI18n();
  const texts = t.RESERVATIONS.FILTERS;

  return (
    <SearchField value={value} onChange={onChange} aria-label={texts.ARIA_LABEL_GUEST_SEARCH}>
      <Label className="sr-only">{texts.ARIA_LABEL_GUEST_SEARCH}</Label>
      <SearchField.Group className={STYLES.group}>
        <SearchField.SearchIcon />
        <SearchField.Input className={STYLES.input} placeholder={texts.PLACEHOLDER_GUEST_SEARCH} />
        <SearchField.ClearButton />
      </SearchField.Group>
    </SearchField>
  );
};
