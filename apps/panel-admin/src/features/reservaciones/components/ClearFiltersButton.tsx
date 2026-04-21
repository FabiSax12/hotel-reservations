"use client";

import { Button } from "@heroui/react";
import { useI18n } from "@/locales";
import { FILTER_BAR_STYLES as S } from "@/themes/reservations-filters.theme";

interface ClearFiltersButtonProps {
  isFiltered: boolean;
  onClear: () => void;
}

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
