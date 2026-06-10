/**
 * @file index.ts — Public API barrel for the room detail feature (US-DM-05).
 *
 * The right-docked room detail side panel:
 * - RoomDetailProvider / useRoomDetail: selection state for the panel.
 * - RoomDetailMount: renders the panel when a selection is active.
 * - RoomDetailPush: reflows the room list while the panel is open.
 */

export { RoomDetailMount } from "./components/RoomDetailMount";
export { RoomDetailPush } from "./components/RoomDetailPush";
export { SELECTION_KIND } from "./constants/room-detail.constants";
export { RoomDetailProvider, useRoomDetail } from "./context/RoomDetailContext";
export type { RoomDetailContextValue, RoomDetailSelection } from "./domain/types";
