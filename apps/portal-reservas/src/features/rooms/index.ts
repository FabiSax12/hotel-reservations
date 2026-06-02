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
// Room detail side panel sub-feature (US-DM-05).
export {
  RoomDetailMount,
  RoomDetailProvider,
  RoomDetailPush,
  useRoomDetail,
} from "./components/room-detail-panel";
export { RoomCard } from "./components/RoomCard";
export { RoomFiltersBar } from "./components/RoomFiltersBar";
// Components — the visual layer. No business logic.
export { RoomList } from "./components/RoomList";
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

// Hooks — React state orchestration. No JSX.
export { useRoomFilters } from "./hooks/useRoomFilters";
export { isRoomPackage, useRoomPackages } from "./hooks/useRoomPackages";
