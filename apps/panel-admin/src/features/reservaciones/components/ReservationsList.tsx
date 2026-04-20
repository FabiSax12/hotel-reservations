"use client";

import { useMemo, useState } from "react";
import { useI18n } from "@/locales";
import type { Reservation, ReservationStatus } from "../domain/reservation";
import type { ReservationFilters } from "../domain/reservation-filters";
import { DEFAULT_FILTERS } from "../domain/reservation-filters";
import { CARD, PAGE, PAGE_HEADER, STAT_CARD } from "../constants/styles";
import { EmptyState } from "./EmptyState";
import { ReservationsFilters } from "./ReservationsFilters";
import { ReservationsTable } from "./ReservationsTable";

interface ReservationsListProps {
  reservations: readonly Reservation[];
}

export const ReservationsList = ({ reservations }: ReservationsListProps) => {
  const { t } = useI18n();
  const [filters, setFilters] = useState<ReservationFilters>({ ...DEFAULT_FILTERS });

  const statusCounts = useMemo(() => {
    const counts: Record<ReservationStatus, number> = {
      pending: 0,
      approved: 0,
      cancelled: 0,
      completed: 0,
    };
    for (const r of reservations) counts[r.status]++;
    return counts;
  }, [reservations]);

  const filtered = useMemo(() => {
    return reservations.filter((r) => {
      if (filters.statuses.length > 0 && !filters.statuses.includes(r.status)) return false;
      if (filters.roomName !== "" && r.room.name !== filters.roomName) return false;
      if (filters.dateFrom !== "" && r.checkIn < filters.dateFrom) return false;
      if (filters.dateTo !== "" && r.checkIn > filters.dateTo) return false;
      return true;
    });
  }, [reservations, filters]);

  const pendingCount = statusCounts.pending;
  const approvedCount = statusCounts.approved;

  return (
    <main className={PAGE.WRAPPER}>
      {/* Card 1: Header + Stats */}
      <div className={CARD.BODY}>
        <div className={PAGE_HEADER.LAYOUT}>
          <div className={PAGE_HEADER.LEFT}>
            <h1 className={PAGE_HEADER.TITLE}>
              {t.RESERVATIONS.PAGE.TITLE_PREFIX}{" "}
              <span className={PAGE_HEADER.TITLE_ACCENT}>
                {t.RESERVATIONS.PAGE.TITLE_ACCENT}
              </span>
            </h1>
            <p className={PAGE_HEADER.SUBTITLE}>
              {t.RESERVATIONS.PAGE.DESCRIPTION}{" "}
              <span className={PAGE_HEADER.SUBTITLE_BOLD}>{reservations.length}</span>
            </p>
          </div>

          <div className={STAT_CARD.ROW}>
            <div className={STAT_CARD.WRAPPER}>
              <p className={STAT_CARD.LABEL}>{t.RESERVATIONS.STATS.PENDING_LABEL}</p>
              <p className={STAT_CARD.VALUE}>{pendingCount}</p>
              <p className={STAT_CARD.NOTE}>{t.RESERVATIONS.STATS.PENDING_NOTE}</p>
            </div>
            <div className={STAT_CARD.WRAPPER}>
              <p className={STAT_CARD.LABEL}>{t.RESERVATIONS.STATS.APPROVED_LABEL}</p>
              <p className={STAT_CARD.VALUE}>{approvedCount}</p>
              <p className={STAT_CARD.NOTE}>{t.RESERVATIONS.STATS.APPROVED_NOTE}</p>
            </div>
            <div className={STAT_CARD.WRAPPER}>
              <p className={STAT_CARD.LABEL}>{t.RESERVATIONS.STATS.TOTAL_LABEL}</p>
              <p className={STAT_CARD.VALUE}>{reservations.length}</p>
              <p className={STAT_CARD.NOTE}>{t.RESERVATIONS.STATS.TOTAL_NOTE}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Card 2: Filters */}
      <div className={CARD.BODY_SM}>
        <ReservationsFilters
          filters={filters}
          onFiltersChange={setFilters}
          totalCount={reservations.length}
          filteredCount={filtered.length}
          statusCounts={statusCounts}
        />
      </div>

      {/* Card 3: Table */}
      <div className={CARD.OVERFLOW}>
        {filtered.length === 0 ? (
          <EmptyState />
        ) : (
          <ReservationsTable reservations={filtered} />
        )}
      </div>
    </main>
  );
};
