/**
 * @file useRoomDetailToggle.ts — Toggles the room-detail side panel for a card.
 *
 * RoomCard and PackageCard share the same open/close behaviour: clicking the
 * card opens its detail panel; clicking again while it is the active selection
 * closes it. The only difference is the selection kind (room vs package), so the
 * behaviour lives here once instead of being inlined in each card orchestrator
 * (SRP — the cards render, the hook owns the toggle logic).
 */

"use client";

import type { RoomDetailSelection } from "@/features/room-detail";
import { SELECTION_KIND, useRoomDetail } from "@/features/room-detail";

/** Whether `selection` points at the same room/package as `target`. */
function isSameSelection(selection: RoomDetailSelection, target: RoomDetailSelection): boolean {
  if (selection.kind === SELECTION_KIND.ROOM && target.kind === SELECTION_KIND.ROOM) {
    return selection.room.id === target.room.id;
  }
  if (selection.kind === SELECTION_KIND.PACKAGE && target.kind === SELECTION_KIND.PACKAGE) {
    return selection.pkg.id === target.pkg.id;
  }
  return false;
}

/**
 * Returns whether `target` is the active panel selection and a handler that
 * toggles the panel for it (open when closed, close when it is already active).
 */
export function useRoomDetailToggle(target: RoomDetailSelection) {
  const { selection, isOpen, openRoom, openPackage, close } = useRoomDetail();

  const isActive = isOpen && selection != null && isSameSelection(selection, target);

  const handleOpenDetail = () => {
    if (isActive) {
      close();
      return;
    }
    if (target.kind === SELECTION_KIND.ROOM) openRoom(target.room);
    else openPackage(target.pkg);
  };

  return { isActive, handleOpenDetail };
}
