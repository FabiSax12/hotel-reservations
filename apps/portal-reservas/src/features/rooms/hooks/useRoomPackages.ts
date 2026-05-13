/**
 * @file useRoomPackages.ts — Hook for smart room grouping (US-DM-04).
 *
 * Bridges the pure grouping algorithm with the React component tree.
 * Runs the algorithm via `useMemo` for performance — only recalculates
 * when the room list or guest count changes.
 *
 * Data flow:
 *   search.guestCount → page.tsx → RoomsContext.guestCount → useRoomPackages → groupRoomsIntoPackages()
 */

"use client";

import { useMemo } from "react";
import type { Room, RoomPackage } from "../domain/types";
import type { GroupedRoom } from "../domain/grouping";
import { groupRoomsIntoPackages } from "../domain/grouping";

/**
 * Returns grouped rooms (individual + packages) based on guest count.
 * Memoized — only recomputes when rooms or guestCount change.
 *
 * @param rooms - Filtered room list for the selected destination.
 * @param guestCount - Total guests (adults + children) from search params.
 * @returns Mixed array of individual Room and RoomPackage objects, sorted by price.
 */
export function useRoomPackages(
  rooms: readonly Room[],
  guestCount: number,
): GroupedRoom[] {
  return useMemo(
    () => groupRoomsIntoPackages(rooms, guestCount),
    [rooms, guestCount],
  );
}

/**
 * Type guard to distinguish packages from individual rooms in the grouped list.
 * Used by RoomList to render either PackageCard or RoomCard.
 *
 * @param item - A GroupedRoom (either Room or RoomPackage).
 * @returns True if the item is a RoomPackage (has a "rooms" property).
 */
export function isRoomPackage(item: GroupedRoom): item is RoomPackage {
  return "rooms" in item;
}
