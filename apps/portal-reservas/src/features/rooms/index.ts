/**
 * @file index.ts — Barrel export for the rooms feature.
 */

// Components
export { RoomList } from "./components/RoomList";
export { RoomCard } from "./components/RoomCard";
export { PackageCard } from "./components/PackageCard";

// Context
export { RoomsProvider, useRoomsContext } from "./context/RoomsContext";
export type { RoomsContextValue, SearchDates } from "./context/RoomsContext";

// Domain
export type { Room, RoomPackage } from "./domain/types";
export { filterRoomsByDestination } from "./domain/filters";
export { groupRoomsIntoPackages, groupRoomsByType } from "./domain/grouping";
export type { GroupedRoom } from "./domain/grouping";

// Hooks
export { useRoomPackages, isRoomPackage } from "./hooks/useRoomPackages";
