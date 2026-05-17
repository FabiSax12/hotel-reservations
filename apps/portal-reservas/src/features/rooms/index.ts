/**
 * @file index.ts — Barrel export for the rooms feature.
 */

// Components
export { RoomList } from "./components/RoomList";
export { RoomCard } from "./components/RoomCard";

// Context
export { RoomsProvider, useRoomsContext } from "./context/RoomsContext";
export type { RoomsContextValue, SearchDates } from "./context/RoomsContext";

// Domain
export type { Room } from "./domain/types";
export { filterRoomsByDestination } from "./domain/filters";
