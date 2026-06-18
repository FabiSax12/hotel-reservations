/**
 * @file filters.ts — Pure domain logic for room filtering.
 *
 * Contains filter functions decoupled from any UI framework.
 * Each function is pure (no side effects) and unit-tested in `filters.test.ts`.
 */

import type { GroupedRoom } from "./grouping";
import type { Room, RoomFilters, RoomPackage } from "./types";

const isPackage = (item: GroupedRoom): item is RoomPackage => "rooms" in item;

/**
 * Returns the rooms shown for the chosen destination.
 *
 * US-DM-07: the `rooms` table has no location/region column, so per-sede
 * filtering cannot run yet. The destination still drives the search UX (phase
 * transitions, scroll lock), but every room in scope is returned regardless of
 * the selected sede. Restore the `room.location === destination` predicate once
 * a location column exists.
 *
 * @param rooms - The full array of rooms to filter.
 * @param _destination - Selected destination; currently ignored (see above).
 * @returns A new array with all input rooms (no destination filtering yet).
 */
export const filterRoomsByDestination = (rooms: Room[], _destination: string | null): Room[] => {
  return [...rooms];
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
 * Filters a grouped result list (individuals + packages) so package-level
 * aggregates also satisfy the active filter set. Use this AFTER
 * `groupRoomsIntoPackages` — individual rooms are already filtered upstream
 * by `applyRoomFilters`, but a package's `totalPricePerNight` (sum of its
 * rooms) can exceed the user's price ceiling even when each individual room
 * passed.
 *
 *  - `priceRange`: a package's `totalPricePerNight` must lie within
 *    `[min, max]` (inclusive). Individual rooms pass through untouched here
 *    (already validated upstream).
 *
 * Amenity and room-type filters are not re-applied here: those constraints
 * were enforced on the flat room list, so any package that survived grouping
 * is already composed solely of rooms matching them.
 *
 * @param items - Grouped result from `groupRoomsIntoPackages`.
 * @param filters - The current `RoomFilters` selection.
 * @returns A new array of grouped items satisfying the package-level checks.
 */
export const applyGroupedRoomFilters = (
  items: readonly GroupedRoom[],
  filters: RoomFilters,
): GroupedRoom[] => {
  if (!filters.priceRange) return [...items];

  const { min, max } = filters.priceRange;
  return items.filter((item) => {
    if (!isPackage(item)) return true;
    const total = item.totalPricePerNight;
    return total >= min && total <= max;
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
