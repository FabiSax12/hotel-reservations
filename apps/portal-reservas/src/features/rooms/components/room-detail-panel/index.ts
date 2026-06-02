/**
 * @file index.ts — Barrel for the room detail panel sub-feature (US-DM-05).
 *
 * Public API:
 * - RoomDetailProvider / useRoomDetail: selection state for the panel.
 * - RoomDetailMount: renders the panel when a selection is active.
 * - RoomDetailPush: reflows the room list while the panel is open.
 */

export { RoomDetailProvider, useRoomDetail } from "./context/RoomDetailContext";
export { RoomDetailMount } from "./RoomDetailMount";
export { RoomDetailPush } from "./RoomDetailPush";
