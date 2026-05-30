/**
 * @file index.ts — Barrel export for the rooms feature.
 */

export { RoomCard } from "./components/RoomCard";
// Components
export { RoomList } from "./components/RoomList";
export type { RoomsContextValue, SearchDates } from "./context/RoomsContext";
// Context
export { RoomsProvider, useRoomsContext } from "./context/RoomsContext";
export { filterRoomsByDestination } from "./domain/filters";
// Domain
export type { Room } from "./domain/types";
