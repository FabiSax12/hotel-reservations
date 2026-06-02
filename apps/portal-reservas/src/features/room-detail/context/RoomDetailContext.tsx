/**
 * @file RoomDetailContext.tsx — Shared state for the room detail side panel (US-DM-05).
 *
 * Lives ABOVE the room list, so a re-search triggered from the panel's own
 * availability calendar keeps the panel open and simply updates its content.
 *
 * Holds the current selection (a single room or a full package), an `isOpen`
 * flag that drives the open/close transition, and restores focus to the trigger
 * element when the panel closes.
 */

"use client";

import { createContext, useCallback, useContext, useRef, useState } from "react";
import type { Room, RoomPackage } from "@/features/rooms";
import { ROOM_DETAIL, SELECTION_KIND } from "../constants/room-detail.constants";
import type { RoomDetailContextValue, RoomDetailSelection } from "../domain/types";

const RoomDetailContext = createContext<RoomDetailContextValue | null>(null);

export function RoomDetailProvider({ children }: { children: React.ReactNode }) {
  const [selection, setSelection] = useState<RoomDetailSelection | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  // The element that opened the panel, so focus can return to it on close.
  const triggerRef = useRef<HTMLElement | null>(null);
  const exitTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const open = useCallback((next: RoomDetailSelection) => {
    if (exitTimer.current) {
      clearTimeout(exitTimer.current);
      exitTimer.current = null;
    }
    triggerRef.current = document.activeElement as HTMLElement | null;
    setSelection(next);
    setIsOpen(true);
  }, []);

  const openRoom = useCallback((room: Room) => open({ kind: SELECTION_KIND.ROOM, room }), [open]);
  const openPackage = useCallback(
    (pkg: RoomPackage) => open({ kind: SELECTION_KIND.PACKAGE, pkg }),
    [open],
  );

  const close = useCallback(() => {
    setIsOpen(false);
    // Defer unmount until the slide-out transition has finished.
    exitTimer.current = setTimeout(() => {
      setSelection(null);
      const trigger = triggerRef.current;
      if (trigger && document.body.contains(trigger)) trigger.focus();
      triggerRef.current = null;
    }, ROOM_DETAIL.EXIT_MS);
  }, []);

  const value: RoomDetailContextValue = { selection, isOpen, openRoom, openPackage, close };

  return <RoomDetailContext.Provider value={value}>{children}</RoomDetailContext.Provider>;
}

/** Consumes RoomDetailContext. Must be used inside a `<RoomDetailProvider>`. */
export function useRoomDetail(): RoomDetailContextValue {
  const ctx = useContext(RoomDetailContext);
  if (!ctx) {
    throw new Error(
      "useRoomDetail must be used inside a <RoomDetailProvider>. " +
        "Check that RoomDetailProvider wraps the rooms section in RoomsInnerPage.",
    );
  }
  return ctx;
}
