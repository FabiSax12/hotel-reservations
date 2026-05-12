/**
 * @file grouping.ts — Smart room grouping algorithm (US-DM-04).
 *
 * Pure function that takes a list of rooms and a guest count, and returns
 * a mixed list of individual rooms and room packages. Uses greedy bin-packing
 * with constraints to reject absurd splits.
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
 *
 * Algorithm:
 * 1. If guestCount <= 0 or rooms empty -> return rooms as-is.
 * 2. Filter rooms with capacity >= 1.
 * 3. Sort by capacity DESC, then price DESC (tie-break).
 * 4. For each room:
 *    a. If capacity >= guestCount -> emit as individual.
 *    b. Else -> build a package with greedy fill.
 * 5. Deduplicate identical packages (keep cheaper).
 * 6. Sort: individual rooms first, then packages by totalPricePerNight ASC.
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

  // Sort: capacity DESC, then price DESC
  const sorted = [...eligible].sort((a, b) => {
    if (b.capacity !== a.capacity) return b.capacity - a.capacity;
    return b.price - a.price;
  });

  const individuals: Room[] = [];
  const packages: RoomPackage[] = [];

  for (const room of sorted) {
    if (room.capacity >= guestCount) {
      individuals.push(room);
      continue;
    }

    const pkg = buildPackage(sorted, room, guestCount);
    if (pkg) {
      packages.push(pkg);
    }
  }

  // Deduplicate: if two packages cover the same room IDs, keep the cheaper one.
  const deduped = deduplicatePackages(packages);

  // Sort: individuals first (by price ASC), then packages by totalPricePerNight ASC
  const sortedIndividuals = [...individuals].sort((a, b) => a.price - b.price);
  const sortedPackages = [...deduped].sort(
    (a, b) => a.totalPricePerNight - b.totalPricePerNight,
  );

  return [...sortedIndividuals, ...sortedPackages];
}

/**
 * Attempts to build a package starting with `primaryRoom`, filling remaining
 * capacity with the smallest sufficient rooms. Returns null if no valid
 * package can be formed.
 *
 * Rooms already in the package are excluded from being reused as fill.
 */
function buildPackage(
  sortedRooms: readonly Room[],
  primaryRoom: Room,
  guestCount: number,
): RoomPackage | null {
  const { MAX_WASTE, MAX_ROOMS } = ROOM_GROUPING;

  const packageRooms: Room[] = [primaryRoom];
  const usedIds = new Set<string>([primaryRoom.id]);
  let remaining = guestCount - primaryRoom.capacity;

  while (remaining > 0) {
    if (packageRooms.length >= MAX_ROOMS) {
      return null; // Too many rooms
    }

    // Find the smallest room whose capacity <= remaining + MAX_WASTE,
    // excluding rooms already in this package.
    const candidate = findSmallestRoom(sortedRooms, remaining, MAX_WASTE, usedIds);
    if (!candidate) {
      return null; // No valid room found
    }

    packageRooms.push(candidate);
    usedIds.add(candidate.id);
    remaining -= candidate.capacity;
  }

  if (packageRooms.length < 2) {
    return null; // Not a package
  }

  // Sort by price DESC to find primary
  const byPrice = [...packageRooms].sort((a, b) => b.price - a.price);
  const primary = byPrice[0];
  const secondaries = byPrice.slice(1);

  const totalCapacity = packageRooms.reduce((sum, r) => sum + r.capacity, 0);
  const totalPricePerNight = packageRooms.reduce((sum, r) => sum + r.price, 0);
  const isHomogeneous = new Set(packageRooms.map((r) => r.type)).size === 1;
  const indicatorLabel = isHomogeneous
    ? `x${packageRooms.length}`
    : `+${packageRooms.length - 1}`;

  return {
    id: `pkg-${packageRooms.map((r) => r.id).join("-")}`,
    primaryRoom: primary,
    secondaryRooms: secondaries,
    totalCapacity,
    totalPricePerNight,
    isHomogeneous,
    indicatorLabel,
  };
}

/**
 * Finds the smallest room whose capacity does not exceed `remaining + maxWaste`,
 * excluding rooms whose IDs are in `excludeIds`.
 * Returns null if no eligible room is found.
 */
function findSmallestRoom(
  sortedRooms: readonly Room[],
  remaining: number,
  maxWaste: number,
  excludeIds: ReadonlySet<string>,
): Room | null {
  // sortedRooms is sorted by capacity DESC, so iterate in reverse for smallest first
  for (let i = sortedRooms.length - 1; i >= 0; i--) {
    const room = sortedRooms[i];
    if (
      !excludeIds.has(room.id) &&
      room.capacity <= remaining + maxWaste &&
      room.capacity >= 1
    ) {
      return room;
    }
  }
  return null;
}

/**
 * Groups secondary rooms by type, counting duplicates.
 * Returns an array of { type, room, count } for display purposes.
 */
export function groupSecondaryRooms(rooms: Room[]): Array<{ type: string; room: Room; count: number }> {
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
    const roomIds = [pkg.primaryRoom, ...pkg.secondaryRooms]
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
