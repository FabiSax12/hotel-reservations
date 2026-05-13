/**
 * @file grouping.ts — Smart room grouping algorithm (US-DM-04).
 *
 * Generates ALL valid room combinations (packages) that can accommodate
 * the guest count, then sorts them by total price. Individual rooms that
 * can accommodate all guests are also included.
 *
 * Algorithm: Backtracking enumeration with constraints.
 * - Enumerates all valid multisets of 2-4 rooms (respecting inventory).
 * - Filters by MAX_WASTE (max 2 excess capacity spots).
 * - Deduplicates packages with the same room IDs, keeping the cheaper one.
 *
 * Deterministic: same inputs always produce the same output.
 * No hooks, no JSX, no side effects, no fetch — fully testable with Node.
 *
 * @example
 * // For 6 guests with Standard(2), Suite(2), Family(5), Villa(4):
 * // Returns: [Standard+Standard+Standard, Standard+Villa, Suite+Villa, ...]
 * // Each sorted by total price ascending.
 */

import type { Room, RoomPackage } from "./types";
import { ROOM_GROUPING } from "../constants/rooms.constants";

/** A result item is either an individual Room or a RoomPackage. */
export type GroupedRoom = Room | RoomPackage;

/**
 * Main entry point. Groups rooms into packages when no single room can
 * accommodate all guests. Returns a sorted mix of individuals and packages.
 *
 * @param rooms - Available rooms (may include rooms from multiple destinations).
 * @param guestCount - Total guests (adults + children) to accommodate.
 * @returns Sorted array of GroupedRoom (individuals + packages), cheapest first.
 */
export function groupRoomsIntoPackages(
  rooms: readonly Room[],
  guestCount: number,
): GroupedRoom[] {
  // Guard: no guests or no rooms — return rooms as-is (no grouping needed).
  if (guestCount <= 0 || rooms.length === 0) {
    return [...rooms];
  }

  // Only rooms with capacity >= 1 are eligible for any grouping.
  const eligible = rooms.filter((r) => r.capacity >= 1);
  if (eligible.length === 0) {
    return [...rooms];
  }

  // Individual rooms: can accommodate all guests alone (no package needed).
  const individuals: Room[] = eligible
    .filter((r) => r.capacity >= guestCount);

  // Combinable rooms: capacity < guestCount, must be combined with others.
  const combinable = eligible.filter((r) => r.capacity < guestCount);

  // Generate all valid packages from combinable rooms via backtracking.
  const packages = generateAllPackages(combinable, guestCount);

  // Remove duplicate packages (same room IDs), keeping the cheaper variant.
  const deduped = deduplicatePackages(packages);

  // Merge individuals and packages, sort by total price ascending.
  // For individuals: total price = room.price.
  // For packages: total price = totalPricePerNight (sum of all rooms in package).
  const allResults: GroupedRoom[] = [...individuals, ...deduped];
  allResults.sort((a, b) => {
    const priceA = "rooms" in a ? a.totalPricePerNight : a.price;
    const priceB = "rooms" in b ? b.totalPricePerNight : b.price;
    return priceA - priceB;
  });

  return allResults;
}

/**
 * Core backtracking algorithm. Enumerates all valid multisets of rooms
 * whose total capacity meets or exceeds guestCount with bounded waste.
 *
 * How it works:
 * 1. Start with an empty combination.
 * 2. For each room type (from startIndex), try adding 1..inventory copies.
 * 3. When totalCapacity >= guestCount, check if waste <= MAX_WASTE and
 *    combination has at least 2 rooms → if so, record it as a valid package.
 * 4. Stop recursing when combination reaches MAX_ROOMS.
 *
 * @param rooms - Eligible combinable rooms.
 * @param guestCount - Target guest count.
 * @returns All valid RoomPackage objects (may contain duplicates — dedup later).
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

    // If we've met the guest count, check if this is a valid package.
    if (totalCapacity >= guestCount) {
      const waste = totalCapacity - guestCount;
      // Valid package: waste is acceptable AND at least 2 rooms.
      if (waste <= MAX_WASTE && current.length >= 2) {
        const pkg = buildPackageFromRooms(current);
        if (pkg) packages.push(pkg);
      }
      // No point adding more rooms if we're already at MAX_ROOMS.
      if (current.length >= MAX_ROOMS) return;
    }

    // Hard limit: no package exceeds MAX_ROOMS.
    if (current.length >= MAX_ROOMS) return;

    // Try adding each room type (starting from startIndex to avoid permutations).
    for (let i = startIndex; i < rooms.length; i++) {
      const room = rooms[i];
      const used = usedCounts.get(room.id) ?? 0;
      // Respect inventory: don't use more copies than available.
      if (used >= room.inventory) continue;

      // Add room to current combination.
      usedCounts.set(room.id, used + 1);
      current.push(room);
      // Recurse: startIndex=i allows reusing the same room type.
      backtrack(current, i, usedCounts);
      // Backtrack: remove the room and restore inventory count.
      current.pop();
      usedCounts.set(room.id, used);
    }
  }

  backtrack([], 0, new Map());
  return packages;
}

/**
 * Builds a RoomPackage from a flat list of rooms.
 * Rooms are sorted by price DESC — the first room is the most expensive (primary).
 *
 * @param rooms - At least 2 rooms to form a package.
 * @returns A RoomPackage with computed totals, or null if fewer than 2 rooms.
 */
function buildPackageFromRooms(rooms: Room[]): RoomPackage | null {
  if (rooms.length < 2) return null;

  // Sort by price DESC: most expensive room is the "primary" for display.
  const sorted = [...rooms].sort((a, b) => b.price - a.price);
  const totalCapacity = rooms.reduce((s, r) => s + r.capacity, 0);
  const totalPricePerNight = rooms.reduce((s, r) => s + r.price, 0);
  // Homogeneous: all rooms are the same type (e.g., 3x Standard).
  const isHomogeneous = new Set(rooms.map((r) => r.type)).size === 1;

  return {
    // Deterministic ID: sorted room IDs joined with dashes.
    id: `pkg-${rooms.map((r) => r.id).sort().join("-")}`,
    rooms: sorted,
    totalCapacity,
    totalPricePerNight,
    isHomogeneous,
  };
}

/**
 * Groups a flat room list by type for display purposes.
 * Used by PackageCard to show "Standard x3, Suite x1" summaries.
 *
 * @param rooms - Array of rooms to group.
 * @returns Array of { type, room (representative), count } objects.
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
 * Keeps the cheaper variant when duplicates exist.
 *
 * @param packages - Array of packages (may contain duplicates).
 * @returns Deduplicated array.
 */
function deduplicatePackages(packages: RoomPackage[]): RoomPackage[] {
  const seen = new Map<string, RoomPackage>();

  for (const pkg of packages) {
    // Create a canonical key from sorted room IDs.
    const roomIds = pkg.rooms
      .map((r) => r.id)
      .sort()
      .join(",");

    const existing = seen.get(roomIds);
    // Keep the cheaper package if a duplicate exists.
    if (!existing || pkg.totalPricePerNight < existing.totalPricePerNight) {
      seen.set(roomIds, pkg);
    }
  }

  return Array.from(seen.values());
}
