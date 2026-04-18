"use client";

import { useI18n } from "@/locales";
import type { Reservacion } from "../domain/reservacion";
import { EmptyState } from "./EmptyState";
import { ReservacionesTable } from "./ReservacionesTable";

interface ReservacionesListProps {
  reservaciones: readonly Reservacion[];
}

export const ReservacionesList = ({ reservaciones }: ReservacionesListProps) => {
  const { t } = useI18n();
  return (
    <main className="min-h-screen bg-gray-50 p-4 sm:p-8">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">{t.RESERVACIONES.PAGE.TITLE}</h1>
        <p className="mt-1 text-sm text-gray-500">{t.RESERVACIONES.PAGE.DESCRIPTION}</p>
      </div>

      {reservaciones.length === 0 ? (
        <EmptyState />
      ) : (
        <ReservacionesTable reservaciones={reservaciones} />
      )}
    </main>
  );
};
