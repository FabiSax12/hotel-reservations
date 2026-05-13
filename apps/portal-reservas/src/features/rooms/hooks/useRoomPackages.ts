/**
 * @file useRoomPackages.ts — Hook for smart room grouping (US-DM-04).
 *
 * Consumes `RoomsContext.guestCount` and the filtered room list,
 * runs the grouping algorithm via `useMemo`, and returns a mixed
 * list of individual rooms and room packages.
 */

"use client";

import { useMemo } from "react";
import type { Room, RoomPackage } from "../domain/types";
import type { GroupedRoom } from "../domain/grouping";
import { groupRoomsIntoPackages } from "../domain/grouping";

/**
 * Returns grouped rooms (individual + packages) based on guest count.
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

/** Type guard to check if a grouped item is a package. */
export function isRoomPackage(item: GroupedRoom): item is RoomPackage {
  return "rooms" in item;
}
