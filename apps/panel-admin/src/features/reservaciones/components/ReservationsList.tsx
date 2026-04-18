"use client";

import { useI18n } from "@/locales";
import type { Reservation } from "../domain/reservation";
import { PAGE } from "../constants/styles";
import { EmptyState } from "./EmptyState";
import { ReservationsTable } from "./ReservationsTable";

interface ReservationsListProps {
  reservations: readonly Reservation[];
}

export const ReservationsList = ({ reservations }: ReservationsListProps) => {
  const { t } = useI18n();
  return (
    <main className={PAGE.WRAPPER}>
      <div className={PAGE.HEADER}>
        <h1 className={PAGE.TITLE}>{t.RESERVATIONS.PAGE.TITLE}</h1>
        <p className={PAGE.DESCRIPTION}>{t.RESERVATIONS.PAGE.DESCRIPTION}</p>
      </div>

      {reservations.length === 0 ? (
        <EmptyState />
      ) : (
        <ReservationsTable reservations={reservations} />
      )}
    </main>
  );
};
