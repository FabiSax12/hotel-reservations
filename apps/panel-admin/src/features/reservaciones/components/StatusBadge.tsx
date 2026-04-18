"use client";

import { Chip } from "@heroui/react";
import { useI18n } from "@/locales";
import type { ReservationStatus } from "../domain/reservation";

type ChipColor = "warning" | "success" | "danger" | "accent";

const STATUS_COLOR: Record<ReservationStatus, ChipColor> = Object.freeze({
  pending: "warning",
  approved: "success",
  cancelled: "danger",
  completed: "accent",
} as const);

const STATUS_I18N_KEY: Record<ReservationStatus, keyof { PENDING: string; APPROVED: string; CANCELLED: string; COMPLETED: string }> = Object.freeze({
  pending: "PENDING",
  approved: "APPROVED",
  cancelled: "CANCELLED",
  completed: "COMPLETED",
} as const);

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
