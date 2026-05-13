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

// Components — the visual layer. No business logic.
export { RoomList } from "./components/RoomList";
export { RoomCard } from "./components/RoomCard";
export { PackageCard } from "./components/PackageCard";

// Context — shared state provider. Distributes room-related state without prop drilling.
export { RoomsProvider, useRoomsContext } from "./context/RoomsContext";
export type { RoomsContextValue, SearchDates } from "./context/RoomsContext";

// Domain types and functions — pure TypeScript, no React.
export type { Room, RoomPackage } from "./domain/types";
export { filterRoomsByDestination } from "./domain/filters";
export { groupRoomsIntoPackages, groupRoomsByType } from "./domain/grouping";
export type { GroupedRoom } from "./domain/grouping";

// Hooks — React state orchestration. No JSX.
export { useRoomPackages, isRoomPackage } from "./hooks/useRoomPackages";
