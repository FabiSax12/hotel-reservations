"use client";

import { Button } from "@heroui/react";
import { useI18n } from "@/locales";
import type { ClearFiltersButtonProps } from "./ClearFiltersButton.interface";
import { CLEAR_FILTERS_BUTTON_STYLES as S } from "./ClearFiltersButton.styles";

export const ClearFiltersButton = ({ isFiltered, onClear }: ClearFiltersButtonProps) => {
  const { t } = useI18n();

  return (
    <Button
      variant="ghost"
      size="sm"
      className={`${S.pill} ${S.pillInactive}`}
      isDisabled={!isFiltered}
      onPress={onClear}
    >
      {t.RESERVATIONS.FILTERS.CLEAR}
    </Button>
  );
};
