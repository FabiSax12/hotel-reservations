import type { RoomCategory } from "@/features/rooms/constants/info.constants";
import type { RoomsFilterState } from "./initial-state";

export const ROOMS_FILTER_ACTIONS = Object.freeze({
  SET_CATEGORY: "SET_CATEGORY",
  SET_MIN_CAPACITY: "SET_MIN_CAPACITY",
  SET_PRICE_RANGE: "SET_PRICE_RANGE",
  SET_AVAILABLE: "SET_AVAILABLE",
  CLEAR_FILTERS: "CLEAR_FILTERS",
  SET_FILTERS: "SET_FILTERS",
} as const);

export type RoomsFilterAction =
  | { type: typeof ROOMS_FILTER_ACTIONS.SET_CATEGORY; payload: RoomCategory | null }
  | { type: typeof ROOMS_FILTER_ACTIONS.SET_MIN_CAPACITY; payload: number | null }
  | {
      type: typeof ROOMS_FILTER_ACTIONS.SET_PRICE_RANGE;
      payload: { min: number | null; max: number | null };
    }
  | { type: typeof ROOMS_FILTER_ACTIONS.SET_AVAILABLE; payload: boolean | null }
  | { type: typeof ROOMS_FILTER_ACTIONS.CLEAR_FILTERS }
  | { type: typeof ROOMS_FILTER_ACTIONS.SET_FILTERS; payload: Partial<RoomsFilterState> };
