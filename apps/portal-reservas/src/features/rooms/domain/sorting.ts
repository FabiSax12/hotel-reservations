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

/** A package counts as "featured" when any of its rooms is featured. */
const isGroupedFeatured = (item: GroupedRoom): boolean =>
  isPackage(item) ? item.rooms.some((r) => r.isFeatured) : item.isFeatured;

/**
 * Returns a new array of rooms sorted by the given option.
 * The input array is never mutated.
 *
 * Sort options:
 *  - `FEATURED`: admin-defined featured flag first, then by `id` ASC (stable).
 *  - `PRICE_ASC`: cheapest first, ties broken by `id` ASC.
 *  - `PRICE_DESC`: most expensive first, ties broken by `id` ASC.
 */
export const sortRooms = (rooms: readonly Room[], option: RoomSortOption): Room[] => {
  const copy = [...rooms];

  if (option === ROOM_SORT_OPTIONS.PRICE_ASC) {
    return copy.sort((a, b) => a.price - b.price || compareId(a, b));
  }

  if (option === ROOM_SORT_OPTIONS.PRICE_DESC) {
    return copy.sort((a, b) => b.price - a.price || compareId(a, b));
  }

  return copy.sort((a, b) => {
    if (a.isFeatured !== b.isFeatured) return a.isFeatured ? -1 : 1;
    return compareId(a, b);
  });
};

/**
 * Same semantics as `sortRooms`, but for the grouped result (individuals + packages).
 * Packages use `totalPricePerNight` as their effective price, and are considered
 * featured if any of their constituent rooms is featured.
 */
export const sortGroupedRooms = (
  items: readonly GroupedRoom[],
  option: RoomSortOption,
): GroupedRoom[] => {
  const copy = [...items];

  if (option === ROOM_SORT_OPTIONS.PRICE_ASC) {
    return copy.sort((a, b) => groupedPrice(a) - groupedPrice(b) || compareId(a, b));
  }

  if (option === ROOM_SORT_OPTIONS.PRICE_DESC) {
    return copy.sort((a, b) => groupedPrice(b) - groupedPrice(a) || compareId(a, b));
  }

  return copy.sort((a, b) => {
    const fa = isGroupedFeatured(a);
    const fb = isGroupedFeatured(b);
    if (fa !== fb) return fa ? -1 : 1;
    return groupedPrice(a) - groupedPrice(b);
  });
};
