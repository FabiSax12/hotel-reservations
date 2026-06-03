/**
 * @file useRoomPackages.ts — Hook for smart room grouping (US-DM-04).
 *
 * Bridges the pure grouping algorithm with the React component tree.
 * Runs the algorithm via `useMemo` for performance — only recalculates
 * when the room list, guest count, or prioritized room changes.
 *
 * Data flow:
 *   search.guestCount → page.tsx → RoomsContext.guestCount → useRoomPackages → groupRoomsIntoPackages()
 *   roomCalendar.onSearch → page.tsx → RoomsContext.prioritizedRoomId → useRoomPackages → reorders
 */

"use client";

import { useMemo } from "react";
import type { GroupedRoom } from "../domain/grouping";
import { groupRoomsIntoPackages } from "../domain/grouping";
import type { Room, RoomPackage } from "../domain/types";

/**
 * Returns grouped rooms (individual + packages) based on guest count.
 * When `prioritizedRoomId` is set, the item containing that room is moved to index 0.
 * Memoized — only recomputes when rooms, guestCount, or prioritizedRoomId change.
 *
 * @param rooms - Filtered room list for the selected destination.
 * @param guestCount - Total guests (adults + children) from search params.
 * @param prioritizedRoomId - Room ID to show first, or null for default ordering.
 * @returns Mixed array of individual Room and RoomPackage objects, sorted by price (with priority first).
 */
export function useRoomPackages(
  rooms: readonly Room[],
  guestCount: number,
  prioritizedRoomId: string | null,
): GroupedRoom[] {
  return useMemo(() => {
    const grouped = groupRoomsIntoPackages(rooms, guestCount);

    if (!prioritizedRoomId) return grouped;

    const idx = grouped.findIndex((item) =>
      "rooms" in item
        ? item.rooms.some((r) => r.id === prioritizedRoomId)
        : item.id === prioritizedRoomId,
    );

    if (idx <= 0) return grouped;

    const prioritized = grouped[idx];
    return [prioritized, ...grouped.slice(0, idx), ...grouped.slice(idx + 1)];
  }, [rooms, guestCount, prioritizedRoomId]);
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
