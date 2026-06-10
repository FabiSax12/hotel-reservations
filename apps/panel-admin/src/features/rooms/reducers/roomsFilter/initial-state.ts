import type { RoomCategory } from "../../constants/info.constants";

export interface RoomsFilterState {
  category: RoomCategory | null;
  minCapacity: number | null;
  minPrice: number | null;
  maxPrice: number | null;
  available: boolean | null;
}

export const INITIAL_FILTER_STATE: RoomsFilterState = Object.freeze({
  category: null,
  minCapacity: null,
  minPrice: null,
  maxPrice: null,
  available: null,
});
