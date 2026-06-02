"use client";

import { Button } from "@heroui/react";
import { X } from "lucide-react";
import { useI18n } from "@/locales";
import type { ClearFiltersButtonProps } from "./ClearFiltersButton.interface";

export function ClearFiltersButton({ onPress }: ClearFiltersButtonProps) {
  const { t } = useI18n();
  const texts = t.ROOMS.LIST.FILTERS;

  return (
    <Button variant="tertiary" onPress={onPress}>
      <X className="size-4" />
      {texts.CLEAR_FILTERS}
    </Button>
  );
}
