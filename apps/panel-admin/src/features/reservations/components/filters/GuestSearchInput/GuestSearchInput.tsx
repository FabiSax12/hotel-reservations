"use client";

import { Label, SearchField } from "@heroui/react";
import { useI18n } from "@/locales";
import { GUEST_SEARCH_INPUT_STYLES as S } from "./GuestSearchInput.styles";
import type { GuestSearchInputProps } from "./GuestSearchInput.interface";

export const GuestSearchInput = ({ value, onChange }: GuestSearchInputProps) => {
  const { t } = useI18n();
  const texts = t.RESERVATIONS.FILTERS;

  return (
    <SearchField
      value={value}
      onChange={onChange}
      aria-label={texts.ARIA_LABEL_GUEST_SEARCH}
    >
      <Label className="sr-only">{texts.ARIA_LABEL_GUEST_SEARCH}</Label>
      <SearchField.Group className={S.group}>
        <SearchField.SearchIcon />
        <SearchField.Input
          className={S.input}
          placeholder={texts.PLACEHOLDER_GUEST_SEARCH}
        />
        <SearchField.ClearButton />
      </SearchField.Group>
    </SearchField>
  );
};
