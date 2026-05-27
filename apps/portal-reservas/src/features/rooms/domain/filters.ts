/**
 * @file filters.ts — Pure domain logic for room filtering.
 *
 * Contains filter functions decoupled from any UI framework.
 * Each function is pure (no side effects) and unit-tested in `filters.test.ts`.
 */

import { SEARCH_VALS } from "../../search/components/search-bar/constants/search.constants";
import type { Room, RoomFilters } from "./types";

/**
 * Filters a list of rooms by destination name.
 *
 * @param rooms - The full array of rooms to filter.
 * @param destination - The destination to match against `room.location`.
 *   If `null` or the special value `SEARCH_VALS.DESTINATION_ALL`, all rooms are returned unfiltered.
 * @returns A new array containing only the rooms whose `location` matches
 *   the given destination, or the entire array if no filter is applied.
 */
export const filterRoomsByDestination = (rooms: Room[], destination: string | null): Room[] => {
  if (!destination || destination === SEARCH_VALS.DESTINATION_ALL) {
    return rooms;
  }
  return rooms.filter((r) => r.location === destination);
};

/**
 * Applies the multi-attribute filter set (amenities, room types, price range)
 * defined by US-DM-03 to a room list. A room must satisfy **all** active
 * predicates to pass through (intra-amenity AND, intra-type OR, AND across groups).
 *
 *  - `amenities`: a room must contain **every** selected amenity.
 *  - `roomTypes`: a room's `type` must match **one** of the selected types.
 *  - `priceRange`: a room's `price` must lie within `[min, max]` (inclusive).
 *
 * Empty selections are no-ops (the predicate is skipped).
 *
 * @param rooms - The rooms to filter (already destination-filtered).
 * @param filters - The current `RoomFilters` selection.
 * @returns A new array of matching rooms (input array is not mutated).
 */
export const applyRoomFilters = (rooms: readonly Room[], filters: RoomFilters): Room[] => {
  return rooms.filter((room) => {
    if (filters.amenities.length > 0) {
      const hasAll = filters.amenities.every((a) => room.amenities.includes(a));
      if (!hasAll) return false;
    }

    if (filters.roomTypes.length > 0 && !filters.roomTypes.includes(room.type)) {
      return false;
    }

    if (filters.priceRange) {
      const { min, max } = filters.priceRange;
      if (room.price < min || room.price > max) return false;
    }

    return true;
  });
};

/**
 * @returns `true` when at least one filter group has an active selection.
 *   Used to enable the "reset" button and show an "active filters" badge.
 */
export const hasActiveFilters = (filters: RoomFilters): boolean => {
  return (
    filters.amenities.length > 0 || filters.roomTypes.length > 0 || filters.priceRange !== null
  );
};
