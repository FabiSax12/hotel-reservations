"use client";

import { Chip } from "@heroui/react";
import { useI18n } from "@/locales";
import type { ReservationStatus } from "../domain/reservation";
import { STATUS_COLOR } from "../constants/status-color";
import { STATUS_I18N_KEY } from "../constants/status-i18n";

interface StatusBadgeProps {
  status: ReservationStatus;
}

export const StatusBadge = ({ status }: StatusBadgeProps) => {
  const { t } = useI18n();
  return (
    <Chip color={STATUS_COLOR[status]} variant="soft" size="sm">
      {t.RESERVATIONS.STATUS[STATUS_I18N_KEY[status]]}
    </Chip>
  );
};
