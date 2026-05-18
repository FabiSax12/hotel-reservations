"use client";

import { Chip } from "@heroui/react";
import { useI18n } from "@/locales";
import { STATUS_COLOR } from "../../../constants/status-color";
import { STATUS_I18N_KEY } from "../../../constants/status-i18n";
import type { StatusBadgeProps } from "./StatusBadge.interface";

export const StatusBadge = ({ status, size = "sm" }: StatusBadgeProps) => {
  const { t } = useI18n();
  return (
    <Chip color={STATUS_COLOR[status]} variant="soft" size={size}>
      {t.RESERVATIONS.STATUS[STATUS_I18N_KEY[status]]}
    </Chip>
  );
};
