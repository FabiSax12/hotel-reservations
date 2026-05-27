/**
 * @file filters.ts — Pure domain logic for room filtering.
 *
 * Contains filter functions decoupled from any UI framework.
 * Each function is pure (no side effects) and unit-tested in `filters.test.ts`.
 */

import { SEARCH_VALS } from "../../search/components/search-bar/constants/search.constants";
import type { Room } from "./types";

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
