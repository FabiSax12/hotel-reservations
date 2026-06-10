/**
 * @file sorting.ts — Pure domain logic for room + grouped-room sorting (US-DM-03).
 *
 * Provides deterministic, side-effect-free sort helpers used by the listing
 * after filtering and after package grouping.
 *  - `sortRooms` sorts a flat array of Room.
 *  - `sortGroupedRooms` sorts the mixed list returned by the grouping
 *    algorithm (Room | RoomPackage), so packages and individuals stay in
 *    one consistent visual order.
 */

import { ROOM_SORT_OPTIONS } from "../constants/rooms-filters.constants";
import type { GroupedRoom } from "./grouping";
import type { Room, RoomPackage, RoomSortOption } from "./types";

const compareId = (a: { id: string }, b: { id: string }): number => a.id.localeCompare(b.id);

const isPackage = (item: GroupedRoom): item is RoomPackage => "rooms" in item;

/** Effective price for a grouped item (per-night for a room, total for a package). */
const groupedPrice = (item: GroupedRoom): number =>
  isPackage(item) ? item.totalPricePerNight : item.price;

/**
 * Returns a new array of rooms sorted by the given option.
 * The input array is never mutated. (FEATURED was removed in US-DM-07 — the DB
 * has no featured flag — so price ascending is the default.)
 *
 * Sort options:
 *  - `PRICE_ASC` (default): cheapest first, ties broken by `id` ASC.
 *  - `PRICE_DESC`: most expensive first, ties broken by `id` ASC.
 */
export const sortRooms = (rooms: readonly Room[], option: RoomSortOption): Room[] => {
  const copy = [...rooms];

  if (option === ROOM_SORT_OPTIONS.PRICE_DESC) {
    return copy.sort((a, b) => b.price - a.price || compareId(a, b));
  }

  return copy.sort((a, b) => a.price - b.price || compareId(a, b));
};

/**
 * Same semantics as `sortRooms`, but for the grouped result (individuals + packages).
 * Packages use `totalPricePerNight` as their effective price.
 */
export const sortGroupedRooms = (
  items: readonly GroupedRoom[],
  option: RoomSortOption,
): GroupedRoom[] => {
  const copy = [...items];

  if (option === ROOM_SORT_OPTIONS.PRICE_DESC) {
    return copy.sort((a, b) => groupedPrice(b) - groupedPrice(a) || compareId(a, b));
  }

  return copy.sort((a, b) => groupedPrice(a) - groupedPrice(b) || compareId(a, b));
};
