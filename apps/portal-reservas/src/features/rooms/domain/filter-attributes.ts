/**
 * @file filter-attributes.ts — Auto-derives the filter attribute panel
 * options (amenities, room types, price bounds) from the rooms currently
 * in scope. Implements US-DM-03 AC #3: filterable attributes must be
 * computed dynamically from the rooms in the current search.
 *
 * Pure function — no React, no hooks, no side effects.
 */

import type { NumericRange, Room, RoomFilterAttributes } from "./types";

const ZERO_BOUNDS: NumericRange = { min: 0, max: 0 };

/**
 * Builds the option lists used by the filter panel from a list of rooms.
 *
 * @param rooms - Rooms currently in scope (already filtered by destination).
 * @returns Sorted unique amenities + room types + the price bounds.
 *   When `rooms` is empty, returns empty lists and `{ min: 0, max: 0 }`.
 */
export const extractFilterAttributes = (rooms: readonly Room[]): RoomFilterAttributes => {
  if (rooms.length === 0) {
    return { amenities: [], roomTypes: [], priceBounds: ZERO_BOUNDS };
  }

  const amenitySet = new Set<string>();
  const typeSet = new Set<string>();
  let min = rooms[0].price;
  let max = rooms[0].price;

  for (const room of rooms) {
    for (const amenity of room.amenities) {
      amenitySet.add(amenity);
    }
    typeSet.add(room.type);
    if (room.price < min) min = room.price;
    if (room.price > max) max = room.price;
  }

  return {
    amenities: Array.from(amenitySet).sort((a, b) => a.localeCompare(b)),
    roomTypes: Array.from(typeSet).sort((a, b) => a.localeCompare(b)),
    priceBounds: { min, max },
  };
};
