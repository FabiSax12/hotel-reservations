import { useCallback, useMemo } from "react";
import type { RoomsFiltersProps } from "@/features/rooms/components/list/RoomsFilters/RoomsFilters.interface";
import type { RoomCategory } from "@/features/rooms/constants/info.constants";
import { useRoomsFilters } from "@/features/rooms/context/roomsFilter/useRoomsFilters";
import { ROOMS_FILTER_ACTIONS } from "@/features/rooms/reducers/roomsFilter/actions";
import type { Room } from "../domain/room.interface";

export function useRoomsContentHandlers(): {
  filtersProps: RoomsFiltersProps;
  filteredRooms: Room[];
} {
  const { state, filteredRooms, isFiltered, resultCount, totalCount, clearFilters, dispatch } =
    useRoomsFilters();

  const handleCategoryChange = useCallback(
    (category: RoomCategory | null) => {
      dispatch({ type: ROOMS_FILTER_ACTIONS.SET_CATEGORY, payload: category });
    },
    [dispatch],
  );

  const handleMinCapacityChange = useCallback(
    (capacity: number | null) => {
      dispatch({ type: ROOMS_FILTER_ACTIONS.SET_MIN_CAPACITY, payload: capacity });
    },
    [dispatch],
  );

  const handlePriceRangeChange = useCallback(
    (min: number | null, max: number | null) => {
      dispatch({ type: ROOMS_FILTER_ACTIONS.SET_PRICE_RANGE, payload: { min, max } });
    },
    [dispatch],
  );

  const handleAvailabilityChange = useCallback(
    (available: boolean | null) => {
      dispatch({ type: ROOMS_FILTER_ACTIONS.SET_AVAILABLE, payload: available });
    },
    [dispatch],
  );

  const filtersProps = useMemo(
    () => ({
      category: state.category,
      minCapacity: state.minCapacity,
      minPrice: state.minPrice,
      maxPrice: state.maxPrice,
      available: state.available,
      isFiltered,
      resultCount,
      totalCount,
      onCategoryChange: handleCategoryChange,
      onMinCapacityChange: handleMinCapacityChange,
      onPriceRangeChange: handlePriceRangeChange,
      onAvailabilityChange: handleAvailabilityChange,
      onClearFilters: clearFilters,
    }),
    [
      state,
      isFiltered,
      resultCount,
      totalCount,
      handleCategoryChange,
      handleMinCapacityChange,
      handlePriceRangeChange,
      handleAvailabilityChange,
      clearFilters,
    ],
  );

  return { filtersProps, filteredRooms };
}
