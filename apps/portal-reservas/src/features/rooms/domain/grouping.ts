/**
 * @file grouping.ts — Smart room grouping algorithm (US-DM-04).
 *
 * Generates ALL valid room combinations (packages) that can accommodate
 * the guest count, then sorts them by total price. Individual rooms that
 * can accommodate all guests are also included.
 *
 * Uses backtracking to enumerate all valid combinations with repetition
 * (respecting room inventory), then filters by MAX_WASTE and MAX_ROOMS.
 *
 * Deterministic: same inputs always produce the same output.
 * No hooks, no JSX, no side effects, no fetch.
 */

import type { Room, RoomPackage } from "./types";
import { ROOM_GROUPING } from "../constants/rooms.constants";

/** A result item is either an individual Room or a RoomPackage. */
export type GroupedRoom = Room | RoomPackage;

/**
 * Groups rooms into packages when no single room can accommodate all guests.
 * Generates ALL valid combinations, not just greedy fills.
 */
export function groupRoomsIntoPackages(
  rooms: readonly Room[],
  guestCount: number,
): GroupedRoom[] {
  if (guestCount <= 0 || rooms.length === 0) {
    return [...rooms];
  }

  const eligible = rooms.filter((r) => r.capacity >= 1);
  if (eligible.length === 0) {
    return [...rooms];
  }

  // Separate individual rooms (can accommodate all guests alone)
  const individuals: Room[] = eligible
    .filter((r) => r.capacity >= guestCount);

  // Rooms that need to be combined
  const combinable = eligible.filter((r) => r.capacity < guestCount);

  // Generate all valid packages from combinable rooms
  const packages = generateAllPackages(combinable, guestCount);

  // Deduplicate packages
  const deduped = deduplicatePackages(packages);

  // Merge individuals and packages, sort by total price
  // For individuals, total price = room.price
  // For packages, total price = totalPricePerNight
  const allResults: GroupedRoom[] = [...individuals, ...deduped];
  allResults.sort((a, b) => {
    const priceA = "rooms" in a ? a.totalPricePerNight : a.price;
    const priceB = "rooms" in b ? b.totalPricePerNight : b.price;
    return priceA - priceB;
  });

  return allResults;
}

/**
 * Generates all valid room combinations via backtracking.
 * Each combination is a multiset of rooms whose total capacity >= guestCount.
 */
function generateAllPackages(
  rooms: readonly Room[],
  guestCount: number,
): RoomPackage[] {
  const { MAX_WASTE, MAX_ROOMS } = ROOM_GROUPING;
  const packages: RoomPackage[] = [];

  function backtrack(
    current: Room[],
    startIndex: number,
    usedCounts: Map<string, number>,
  ) {
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
 * Rooms are sorted by price DESC — first room is the most expensive.
 */
function buildPackageFromRooms(rooms: Room[]): RoomPackage | null {
  if (rooms.length < 2) return null;

  const sorted = [...rooms].sort((a, b) => b.price - a.price);
  const totalCapacity = rooms.reduce((s, r) => s + r.capacity, 0);
  const totalPricePerNight = rooms.reduce((s, r) => s + r.price, 0);
  const isHomogeneous = new Set(rooms.map((r) => r.type)).size === 1;

  return {
    id: `pkg-${rooms.map((r) => r.id).sort().join("-")}`,
    rooms: sorted,
    totalCapacity,
    totalPricePerNight,
    isHomogeneous,
  };
}

/**
 * Groups rooms by type for display purposes.
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
 * Removes duplicate packages (same room IDs) keeping the cheaper one.
 */
function deduplicatePackages(packages: RoomPackage[]): RoomPackage[] {
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
