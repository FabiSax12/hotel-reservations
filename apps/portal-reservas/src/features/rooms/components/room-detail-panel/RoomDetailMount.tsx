/**
 * @file RoomDetailMount.tsx — Mounts the detail panel when a selection exists.
 *
 * Rendered once, high in the tree (above the room list), so a re-search that
 * remounts the list never unmounts the open panel.
 */

"use client";

import { useRoomDetail } from "./context/RoomDetailContext";
import { RoomDetailPanel } from "./sub-components/RoomDetailPanel";

export function RoomDetailMount() {
  const { selection, isOpen, close } = useRoomDetail();

  if (!selection) return null;

  return <RoomDetailPanel selection={selection} isOpen={isOpen} onClose={close} />;
}
