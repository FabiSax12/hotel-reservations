"use client";

import { useI18n } from "@/locales";
import { PageHeader } from "@/shared/components/PageHeader";
import { useReservationsView } from "../../../hooks/useReservationsView";
import { ReservationsFilters } from "../../filters/ReservationsFilters/ReservationsFilters";
import { EmptyState } from "../EmptyState/EmptyState";
import { ReservationsPagination } from "../ReservationsPagination/ReservationsPagination";
import { ReservationsTable } from "../ReservationsTable/ReservationsTable";
import type { ReservationsViewProps } from "./ReservationsView.interface";
import { CARD_STYLES, RESERVATIONS_PAGE_STYLES } from "./ReservationsView.styles";

export const ReservationsView = ({
  reservations,
  rooms,
  initialPage = 1,
}: ReservationsViewProps) => {
  const { t } = useI18n();
  const {
    filters,
    setFilters,
    statusCounts,
    filtered,
    paginated,
    page,
    totalPages,
    pageSize,
    hasResults,
    handlePageChange,
  } = useReservationsView(reservations, initialPage);

  return (
    <main className={RESERVATIONS_PAGE_STYLES.wrapper}>
      <PageHeader.Root>
        <PageHeader.Heading>
          <PageHeader.Title>
            {t.RESERVATIONS.PAGE.TITLE_PREFIX}{" "}
            <PageHeader.TitleHighlight>
              {t.RESERVATIONS.PAGE.TITLE_ACCENT}
            </PageHeader.TitleHighlight>
          </PageHeader.Title>
          <PageHeader.Description>
            {t.RESERVATIONS.PAGE.DESCRIPTION}{" "}
            <PageHeader.DescriptionHighlight>{reservations.length}</PageHeader.DescriptionHighlight>
          </PageHeader.Description>
        </PageHeader.Heading>
        <PageHeader.Stats>
          <PageHeader.StatCard
            label={t.RESERVATIONS.STATS.PENDING_LABEL}
            value={statusCounts.pending}
            note={t.RESERVATIONS.STATS.PENDING_NOTE}
          />
          <PageHeader.StatCard
            label={t.RESERVATIONS.STATS.APPROVED_LABEL}
            value={statusCounts.approved}
            note={t.RESERVATIONS.STATS.APPROVED_NOTE}
          />
          <PageHeader.StatCard
            label={t.RESERVATIONS.STATS.TOTAL_LABEL}
            value={reservations.length}
            note={t.RESERVATIONS.STATS.TOTAL_NOTE}
          />
        </PageHeader.Stats>
      </PageHeader.Root>

      <div className={CARD_STYLES.bodySmall}>
        <ReservationsFilters
          filters={filters}
          onFiltersChange={setFilters}
          totalCount={reservations.length}
          filteredCount={filtered.length}
          statusCounts={statusCounts}
          rooms={rooms}
        />
      </div>

      <div className={CARD_STYLES.bodyWithOverflow}>
        {hasResults ? <ReservationsTable reservations={paginated} /> : <EmptyState />}
        {hasResults && totalPages > 1 && (
          <ReservationsPagination
            page={page}
            totalPages={totalPages}
            totalItems={filtered.length}
            pageSize={pageSize}
            onPageChange={handlePageChange}
          />
        )}
      </div>
    </main>
  );
};
