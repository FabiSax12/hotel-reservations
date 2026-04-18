"use client";

import { useI18n } from "@/locales";
import type { Reservation } from "../domain/reservation";
import { EmptyState } from "./EmptyState";
import { ReservationsTable } from "./ReservationsTable";

interface ReservationsListProps {
  reservations: readonly Reservation[];
}

export const ReservationsList = ({ reservations }: ReservationsListProps) => {
  const { t } = useI18n();
  return (
    <main className="min-h-screen bg-gray-50 p-4 sm:p-8">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">{t.RESERVATIONS.PAGE.TITLE}</h1>
        <p className="mt-1 text-sm text-gray-500">{t.RESERVATIONS.PAGE.DESCRIPTION}</p>
      </div>

      {reservations.length === 0 ? (
        <EmptyState />
      ) : (
        <ReservationsTable reservations={reservations} />
      )}
    </main>
  );
};
