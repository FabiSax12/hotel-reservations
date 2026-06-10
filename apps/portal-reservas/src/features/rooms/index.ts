/**
 * @file index.ts — Barrel export for the rooms feature.
 *
 * This is the single public API surface of the rooms feature.
 * Consumers import from "features/rooms" — never from internal paths.
 *
 * Exports:
 * - Components: RoomList, RoomCard, PackageCard, RoomFiltersBar
 * - Context: RoomsProvider, useRoomsContext, RoomsContextValue, SearchDates
 * - Domain types: Room, RoomPackage, GroupedRoom, RoomFilters, RoomFilterAttributes,
 *   RoomSortOption, NumericRange
 * - Domain functions: filterRoomsByDestination, applyRoomFilters, hasActiveFilters,
 *   groupRoomsIntoPackages, groupRoomsByType, sortRooms, sortGroupedRooms,
 *   extractFilterAttributes
 * - Constants: ROOM_SORT_OPTIONS, ROOM_SORT_OPTIONS_ORDER, DEFAULT_ROOM_SORT,
 *   createEmptyRoomFilters
 * - Hooks: useRoomPackages, isRoomPackage, useRoomFilters
 */

export { PackageCard } from "./components/PackageCard";
export { RoomCard } from "./components/RoomCard";
export { RoomFiltersBar } from "./components/RoomFiltersBar";
// Components — the visual layer. No business logic.
export { RoomList } from "./components/RoomList";
export { CTASpinner } from "./components/sub-components/CTASpinner";
// Shared building blocks reused by the room-detail feature (US-DM-05).
export { CtaIcon } from "./components/sub-components/CtaIcon";
export { RoomRangeCalendar } from "./components/sub-components/RoomRangeCalendar";
export { formatBedConfig, getAmenityIcon } from "./constants/amenity-icons.const";
export { ROOM_INVENTORY } from "./constants/rooms.constants";
export {
  createEmptyRoomFilters,
  DEFAULT_ROOM_SORT,
  ROOM_SORT_OPTIONS,
  ROOM_SORT_OPTIONS_ORDER,
} from "./constants/rooms-filters.constants";
export type { RoomsContextValue, SearchDates } from "./context/RoomsContext";
// Context — shared state provider. Distributes room-related state without prop drilling.
export { RoomsProvider, useRoomsContext } from "./context/RoomsContext";
export { extractFilterAttributes } from "./domain/filter-attributes";
export {
  applyGroupedRoomFilters,
  applyRoomFilters,
  filterRoomsByDestination,
  hasActiveFilters,
} from "./domain/filters";
export type { GroupedRoom } from "./domain/grouping";
export { groupRoomsByType, groupRoomsIntoPackages } from "./domain/grouping";
export { sortGroupedRooms, sortRooms } from "./domain/sorting";
// Domain types and functions — pure TypeScript, no React.
export type {
  NumericRange,
  Room,
  RoomFilterAttributes,
  RoomFilters,
  RoomPackage,
  RoomSortOption,
} from "./domain/types";
export { usePackageCardState } from "./hooks/usePackageCardState";
// Hooks — React state orchestration. No JSX.
export type { ReserveAction } from "./hooks/useReserveAction";
export { useReserveAction } from "./hooks/useReserveAction";
export { useRoomFilters } from "./hooks/useRoomFilters";
export { isRoomPackage, useRoomPackages } from "./hooks/useRoomPackages";
