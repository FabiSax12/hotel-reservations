/**
 * @file rooms-filters.constants.ts — Logic constants for the US-DM-03
 * dynamic sort & filter UI. Zero magic strings or numbers in components/hooks.
 */

import type { RoomFilters, RoomSortOption } from "../domain/types";

/** All sort options supported by the room listing (US-DM-03 AC #1). */
export const ROOM_SORT_OPTIONS = Object.freeze({
  /** Admin-defined featured ordering (default). */
  FEATURED: "FEATURED",
  /** Price ascending (cheapest first). */
  PRICE_ASC: "PRICE_ASC",
  /** Price descending (most expensive first). */
  PRICE_DESC: "PRICE_DESC",
} as const);

/** Ordered list of sort options for rendering the dropdown UI. */
export const ROOM_SORT_OPTIONS_ORDER = Object.freeze([
  ROOM_SORT_OPTIONS.FEATURED,
  ROOM_SORT_OPTIONS.PRICE_ASC,
  ROOM_SORT_OPTIONS.PRICE_DESC,
] as const);

/** Default sort applied on first render and after reset. */
export const DEFAULT_ROOM_SORT: RoomSortOption = ROOM_SORT_OPTIONS.FEATURED;

/** Step (USD) used by the price-range slider UI. */
export const PRICE_RANGE_STEP = 10;

/**
 * Empty filter state. Used as initial value and reset target.
 * Returned as a fresh object by `createEmptyRoomFilters` to avoid sharing
 * mutable references between consumers.
 */
export const createEmptyRoomFilters = (): RoomFilters => ({
  amenities: [],
  roomTypes: [],
  priceRange: null,
});
