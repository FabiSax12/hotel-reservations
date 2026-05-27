"use client";

import { useMemo, useState } from "react";
import { DEFAULT_FILTERS } from "../constants/reservation-filters";
import type { Reservation } from "../domain/reservation";
import type { ReservationFilters } from "../domain/reservation-filters";
import { countReservationStatuses } from "../utils/count-reservation-statuses";
import { filterReservations } from "../utils/filter-reservations";

export function useReservationsFiltering(reservations: readonly Reservation[]) {
  const [filters, setFilters] = useState<ReservationFilters>({ ...DEFAULT_FILTERS });

  const statusCounts = useMemo(() => countReservationStatuses(reservations), [reservations]);

  const filtered = useMemo(
    () => filterReservations(reservations, filters),
    [reservations, filters],
  );

  return { filters, setFilters, statusCounts, filtered };
}
