"use client";

import { useCallback, useMemo, useReducer } from "react";
import { ROOMS_FILTER_ACTIONS } from "@/features/rooms/reducers/roomsFilter/actions";
import {
  INITIAL_FILTER_STATE,
  type RoomsFilterState,
} from "@/features/rooms/reducers/roomsFilter/initial-state";
import { roomsFilterReducer } from "@/features/rooms/reducers/roomsFilter/reducer";
import { filterRooms } from "../../domain/filterRooms";
import type { RoomsFilterProviderProps } from "./RoomsFilterProvider.interface";
import { RoomsFilterContext } from "./roomsFilterContext";

export const RoomsFilterProvider = ({
  rooms,
  initialFilters,
  children,
}: RoomsFilterProviderProps) => {
  const buildInitialState = useCallback(
    (initial: Partial<RoomsFilterState>): RoomsFilterState => ({
      ...INITIAL_FILTER_STATE,
      ...initial,
    }),
    [],
  );

  const [state, dispatch] = useReducer(roomsFilterReducer, initialFilters ?? {}, buildInitialState);

  const filteredRooms = useMemo(() => filterRooms(rooms, state), [rooms, state]);

  const isFiltered = useMemo(
    () =>
      state.category !== null ||
      state.minCapacity !== null ||
      state.minPrice !== null ||
      state.maxPrice !== null ||
      state.available !== null,
    [state],
  );

  const clearFilters = useCallback(() => {
    dispatch({ type: ROOMS_FILTER_ACTIONS.CLEAR_FILTERS });
  }, []);

  const value = useMemo(
    () => ({
      state,
      dispatch,
      filteredRooms,
      isFiltered,
      resultCount: filteredRooms.length,
      totalCount: rooms.length,
      clearFilters,
    }),
    [state, filteredRooms, isFiltered, rooms.length, clearFilters],
  );

  return <RoomsFilterContext.Provider value={value}>{children}</RoomsFilterContext.Provider>;
};
