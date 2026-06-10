import type { RoomsFilterState } from "../reducers/roomsFilter/initial-state";

const matchesCategory = (category: string | null) => (room: { category: string }) =>
  category === null || room.category === category;

const matchesMinCapacity =
  (minCapacity: number | null) => (room: { capacity_adults: number; capacity_kids: number }) =>
    minCapacity === null || room.capacity_adults + room.capacity_kids >= minCapacity;

const matchesMinPrice = (minPrice: number | null) => (room: { regular_fee: number }) =>
  minPrice === null || room.regular_fee >= minPrice;

const matchesMaxPrice = (maxPrice: number | null) => (room: { regular_fee: number }) =>
  maxPrice === null || room.regular_fee <= maxPrice;

const matchesAvailability = (available: boolean | null) => (room: { is_active: boolean }) =>
  available === null || room.is_active === available;

export function filterRooms<
  T extends {
    category: string;
    capacity_adults: number;
    capacity_kids: number;
    regular_fee: number;
    is_active: boolean;
  },
>(rooms: readonly T[], state: RoomsFilterState): T[] {
  return rooms
    .filter(matchesCategory(state.category))
    .filter(matchesMinCapacity(state.minCapacity))
    .filter(matchesMinPrice(state.minPrice))
    .filter(matchesMaxPrice(state.maxPrice))
    .filter(matchesAvailability(state.available));
}
