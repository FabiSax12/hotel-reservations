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

import { deduplicatePackages, generateAllPackages } from "./grouping.helpers";
import type { Room, RoomPackage } from "./types";

export { groupRoomsByType } from "./grouping.helpers";

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
export function groupRoomsIntoPackages(rooms: readonly Room[], guestCount: number): GroupedRoom[] {
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
  const individuals: Room[] = eligible.filter((r) => r.capacity >= guestCount);

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
