/**
 * @file index.ts — Barrel export for the rooms feature.
 *
 * This is the single public API surface of the rooms feature.
 * Consumers import from "features/rooms" — never from internal paths.
 *
 * Exports:
 * - Components: RoomList, RoomCard, PackageCard
 * - Context: RoomsProvider, useRoomsContext, RoomsContextValue, SearchDates
 * - Domain types: Room, RoomPackage, GroupedRoom
 * - Domain functions: filterRoomsByDestination, groupRoomsIntoPackages, groupRoomsByType
 * - Hooks: useRoomPackages, isRoomPackage
 */

export { PackageCard } from "./components/PackageCard";
export { RoomCard } from "./components/RoomCard";
// Components — the visual layer. No business logic.
export { RoomList } from "./components/RoomList";
export type { RoomsContextValue, SearchDates } from "./context/RoomsContext";
// Context — shared state provider. Distributes room-related state without prop drilling.
export { RoomsProvider, useRoomsContext } from "./context/RoomsContext";
export { filterRoomsByDestination } from "./domain/filters";
export type { GroupedRoom } from "./domain/grouping";
export { groupRoomsByType, groupRoomsIntoPackages } from "./domain/grouping";
// Domain types and functions — pure TypeScript, no React.
export type { Room, RoomPackage } from "./domain/types";

// Hooks — React state orchestration. No JSX.
export { isRoomPackage, useRoomPackages } from "./hooks/useRoomPackages";
