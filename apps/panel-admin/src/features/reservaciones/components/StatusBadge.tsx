"use client";

import { Chip } from "@heroui/react";
import { useI18n } from "@/locales";
import type { EstadoReservacion } from "../domain/reservacion";

type ChipColor = "warning" | "success" | "danger" | "accent";

const ESTADO_COLOR: Record<EstadoReservacion, ChipColor> = Object.freeze({
  pendiente: "warning",
  aprobada: "success",
  cancelada: "danger",
  completada: "accent",
} as const);

const ESTADO_I18N_KEY: Record<EstadoReservacion, keyof { PENDIENTE: string; APROBADA: string; CANCELADA: string; COMPLETADA: string }> = Object.freeze({
  pendiente: "PENDIENTE",
  aprobada: "APROBADA",
  cancelada: "CANCELADA",
  completada: "COMPLETADA",
} as const);

interface StatusBadgeProps {
  estado: EstadoReservacion;
}

export const StatusBadge = ({ estado }: StatusBadgeProps) => {
  const { t } = useI18n();
  return (
    <Chip color={ESTADO_COLOR[estado]} variant="soft" size="sm">
      {t.RESERVACIONES.STATUS[ESTADO_I18N_KEY[estado]]}
    </Chip>
  );
};
