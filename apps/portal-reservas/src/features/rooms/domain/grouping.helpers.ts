import { ROOM_GROUPING } from "../constants/rooms.constants";
import type { Room, RoomPackage } from "./types";

/**
 * Core backtracking algorithm. Enumerates all valid multisets of rooms
 * whose total capacity meets or exceeds guestCount with bounded waste.
 *
 * @param rooms - Eligible combinable rooms.
 * @param guestCount - Target guest count.
 * @returns All valid RoomPackage objects (may contain duplicates — dedup later).
 */
export function generateAllPackages(rooms: readonly Room[], guestCount: number): RoomPackage[] {
  const { MAX_WASTE, MAX_ROOMS } = ROOM_GROUPING;
  const packages: RoomPackage[] = [];

  function backtrack(current: Room[], startIndex: number, usedCounts: Map<string, number>) {
    const totalCapacity = current.reduce((s, r) => s + r.capacity, 0);

    if (totalCapacity >= guestCount) {
      const waste = totalCapacity - guestCount;
      if (waste <= MAX_WASTE && current.length >= 2) {
        const pkg = buildPackageFromRooms(current);
        if (pkg) packages.push(pkg);
      }
      if (current.length >= MAX_ROOMS) return;
    }

    if (current.length >= MAX_ROOMS) return;

    for (let i = startIndex; i < rooms.length; i++) {
      const room = rooms[i];
      const used = usedCounts.get(room.id) ?? 0;
      if (used >= room.inventory) continue;

      usedCounts.set(room.id, used + 1);
      current.push(room);
      backtrack(current, i, usedCounts);
      current.pop();
      usedCounts.set(room.id, used);
    }
  }

  backtrack([], 0, new Map());
  return packages;
}

/**
 * Builds a RoomPackage from a flat list of rooms.
 */
export function buildPackageFromRooms(rooms: Room[]): RoomPackage | null {
  if (rooms.length < 2) return null;

  const sorted = [...rooms].sort((a, b) => b.price - a.price);
  const totalCapacity = rooms.reduce((s, r) => s + r.capacity, 0);
  const totalPricePerNight = rooms.reduce((s, r) => s + r.price, 0);
  const isHomogeneous = new Set(rooms.map((r) => r.type)).size === 1;

  return {
    id: `pkg-${rooms
      .map((r) => r.id)
      .sort()
      .join("-")}`,
    rooms: sorted,
    totalCapacity,
    totalPricePerNight,
    isHomogeneous,
  };
}

/**
 * Groups a flat room list by type for display purposes.
 */
export function groupRoomsByType(
  rooms: Room[],
): Array<{ type: string; room: Room; count: number }> {
  const grouped = new Map<string, { room: Room; count: number }>();

  for (const room of rooms) {
    const existing = grouped.get(room.type);
    if (existing) {
      existing.count += 1;
    } else {
      grouped.set(room.type, { room, count: 1 });
    }
  }

  return Array.from(grouped.values()).map(({ room, count }) => ({
    type: room.type,
    room,
    count,
  }));
}

/**
 * Removes duplicate packages that contain the same set of room IDs.
 */
export function deduplicatePackages(packages: RoomPackage[]): RoomPackage[] {
  const seen = new Map<string, RoomPackage>();

  for (const pkg of packages) {
    const roomIds = pkg.rooms
      .map((r) => r.id)
      .sort()
      .join(",");

    const existing = seen.get(roomIds);
    if (!existing || pkg.totalPricePerNight < existing.totalPricePerNight) {
      seen.set(roomIds, pkg);
    }
  }

  return Array.from(seen.values());
}
