/**
 * @file useRoomFilters.ts — Orchestrator hook for US-DM-03 sort & filter state.
 *
 * Owns the local filter/sort UI state and applies the pure-domain pipeline
 * (filter -> sort) to produce the final visible-room array. Filter attribute
 * panel options are derived dynamically from the rooms currently in scope,
 * satisfying AC #3 (automatic attribute extraction).
 *
 * Pipeline:
 *   destination-filtered rooms (input)
 *     -> applyRoomFilters(filters)
 *     -> sortRooms(sort)
 *     -> visibleRooms (output)
 *
 * The grouping into packages (US-DM-04) runs downstream on `visibleRooms`,
 * so packages are formed from the already-filtered set.
 */

"use client";

import { useCallback, useMemo, useState } from "react";
import { createEmptyRoomFilters, DEFAULT_ROOM_SORT } from "../constants/rooms-filters.constants";
import { extractFilterAttributes } from "../domain/filter-attributes";
import { applyRoomFilters, hasActiveFilters } from "../domain/filters";
import { sortRooms } from "../domain/sorting";
import type { Room, RoomFilters, RoomSortOption } from "../domain/types";

export interface UseRoomFiltersResult {
  attributes: ReturnType<typeof extractFilterAttributes>;
  filters: RoomFilters;
  setFilters: (next: RoomFilters) => void;
  sort: RoomSortOption;
  setSort: (next: RoomSortOption) => void;
  reset: () => void;
  visibleRooms: Room[];
  isFiltered: boolean;
}

export function useRoomFilters(rooms: readonly Room[]): UseRoomFiltersResult {
  const [filters, setFilters] = useState<RoomFilters>(createEmptyRoomFilters);
  const [sort, setSort] = useState<RoomSortOption>(DEFAULT_ROOM_SORT);

  const attributes = useMemo(() => extractFilterAttributes(rooms), [rooms]);

  const visibleRooms = useMemo(
    () => sortRooms(applyRoomFilters(rooms, filters), sort),
    [rooms, filters, sort],
  );

  const reset = useCallback(() => {
    setFilters(createEmptyRoomFilters());
  }, []);

  const isFiltered = hasActiveFilters(filters);

  return { attributes, filters, setFilters, sort, setSort, reset, visibleRooms, isFiltered };
}
