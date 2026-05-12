/**
 * @file grouping.test.ts — Unit tests for the room grouping algorithm (US-DM-04).
 *
 * Tests cover:
 *  - Edge cases: 0 guests, empty rooms, single room sufficient.
 *  - Homogeneous packages (same room type).
 *  - Heterogeneous packages (mixed room types).
 *  - MAX_WASTE rejection (absurd splits like 2+7 for 3 guests).
 *  - MAX_ROOMS rejection.
 *  - Deduplication of identical packages.
 *  - Sorting: individuals first, then packages by price ASC.
 */

import { describe, it, expect } from "vitest";
import { groupRoomsIntoPackages } from "./grouping";
import type { Room } from "./types";

/** Helper to create a minimal room stub. */
function makeRoom(
  id: string,
  capacity: number,
  price: number,
  type = "Standard",
): Room {
  return {
    id,
    location: "Test",
    title: `Room ${id}`,
    type,
    price,
    capacity,
    inventory: 1,
    sqft: 50,
    description: "",
    adminTip: "",
    image: "",
    images: [],
    amenities: [],
    availableDates: [],
  };
}

describe("groupRoomsIntoPackages", () => {
  // ─── Edge Cases ─────────────────────────────────────────────────────────────

  it("returns rooms as-is when guestCount is 0", () => {
    const rooms = [makeRoom("a", 2, 100)];
    const result = groupRoomsIntoPackages(rooms, 0);
    expect(result).toEqual(rooms);
  });

  it("returns rooms as-is when guestCount is negative", () => {
    const rooms = [makeRoom("a", 2, 100)];
    const result = groupRoomsIntoPackages(rooms, -1);
    expect(result).toEqual(rooms);
  });

  it("returns empty array when rooms is empty", () => {
    const result = groupRoomsIntoPackages([], 5);
    expect(result).toEqual([]);
  });

  it("returns rooms as-is when a single room can accommodate all guests", () => {
    const rooms = [makeRoom("a", 5, 200), makeRoom("b", 2, 100)];
    const result = groupRoomsIntoPackages(rooms, 4);
    // Room a (cap 5) >= 4, so it's individual. Room b (cap 2) cannot form
    // a valid package alone (no other room to pair with). Only room a returned.
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe("a");
  });

  // ─── Homogeneous Packages ───────────────────────────────────────────────────

  it("creates a homogeneous package of 2 identical rooms", () => {
    const rooms = [
      makeRoom("a", 2, 100, "Standard"),
      makeRoom("b", 2, 100, "Standard"),
    ];
    const result = groupRoomsIntoPackages(rooms, 4);
    expect(result).toHaveLength(1);
    const pkg = result[0];
    expect("primaryRoom" in pkg).toBe(true);
    if ("primaryRoom" in pkg) {
      expect(pkg.isHomogeneous).toBe(true);
      expect(pkg.indicatorLabel).toBe("x2");
      expect(pkg.totalPricePerNight).toBe(200);
      expect(pkg.totalCapacity).toBe(4);
    }
  });

  it("creates a homogeneous package of 3 identical rooms", () => {
    const rooms = [
      makeRoom("a", 2, 100, "Standard"),
      makeRoom("b", 2, 100, "Standard"),
      makeRoom("c", 2, 100, "Standard"),
    ];
    const result = groupRoomsIntoPackages(rooms, 6);
    expect(result).toHaveLength(1);
    const pkg = result[0];
    if ("primaryRoom" in pkg) {
      expect(pkg.isHomogeneous).toBe(true);
      expect(pkg.indicatorLabel).toBe("x3");
      expect(pkg.totalPricePerNight).toBe(300);
    }
  });

  // ─── Heterogeneous Packages ─────────────────────────────────────────────────

  it("creates a mixed package when room types differ", () => {
    const rooms = [
      makeRoom("a", 2, 100, "Standard"),
      makeRoom("b", 4, 250, "Suite"),
    ];
    const result = groupRoomsIntoPackages(rooms, 5);
    expect(result).toHaveLength(1);
    const pkg = result[0];
    if ("primaryRoom" in pkg) {
      expect(pkg.isHomogeneous).toBe(false);
      expect(pkg.indicatorLabel).toBe("+1");
      expect(pkg.primaryRoom.id).toBe("b"); // Most expensive = Suite
      expect(pkg.totalPricePerNight).toBe(350);
    }
  });

  // ─── MAX_WASTE Rejection (Absurd Splits) ────────────────────────────────────

  it("rejects absurd split: 3 guests should NOT get Standard(2) + Villa(8)", () => {
    const rooms = [
      makeRoom("std", 2, 100, "Standard"),
      makeRoom("villa", 8, 500, "Villa"),
    ];
    const result = groupRoomsIntoPackages(rooms, 3);
    // The Villa has capacity 8, remaining after Standard = 1 guest.
    // Villa(8) exceeds remaining(1) by 7 > MAX_WASTE(2), so it should be rejected.
    // No valid package can be formed (Standard alone doesn't cover 3 guests either).
    const packages = result.filter((r) => "primaryRoom" in r);
    // If any package exists, it must not contain the Villa
    for (const pkg of packages) {
      if ("primaryRoom" in pkg) {
        const allRooms = [pkg.primaryRoom, ...pkg.secondaryRooms];
        expect(allRooms.some((r) => r.id === "villa")).toBe(false);
      }
    }
  });

  it("accepts reasonable split: 3 guests can get Standard(2) + Standard(2)", () => {
    const rooms = [
      makeRoom("a", 2, 100, "Standard"),
      makeRoom("b", 2, 100, "Standard"),
    ];
    const result = groupRoomsIntoPackages(rooms, 3);
    expect(result).toHaveLength(1);
    const pkg = result[0];
    if ("primaryRoom" in pkg) {
      expect(pkg.totalCapacity).toBe(4); // 2+2 = 4, waste = 1 <= MAX_WASTE
      expect(pkg.isHomogeneous).toBe(true);
    }
  });

  // ─── MAX_ROOMS Rejection ────────────────────────────────────────────────────

  it("rejects packages that would exceed MAX_ROOMS (4)", () => {
    // Only 1-capacity rooms available, need 6 guests -> would need 6 rooms > 4
    const rooms = [makeRoom("a", 1, 50, "Standard")];
    const result = groupRoomsIntoPackages(rooms, 6);
    const packages = result.filter((r) => "primaryRoom" in r);
    expect(packages).toHaveLength(0);
  });

  // ─── Mixed Individuals + Packages ───────────────────────────────────────────

  it("returns individual rooms alongside packages when both are valid", () => {
    const rooms = [
      makeRoom("big", 6, 400, "Villa"),
      makeRoom("a", 2, 100, "Standard"),
      makeRoom("b", 2, 100, "Standard"),
    ];
    const result = groupRoomsIntoPackages(rooms, 4);
    // big(6) >= 4 -> individual
    // a+b -> package (2+2=4)
    const individuals = result.filter((r) => !("primaryRoom" in r));
    const packages = result.filter((r) => "primaryRoom" in r);
    expect(individuals).toHaveLength(1);
    expect(individuals[0].id).toBe("big");
    expect(packages.length).toBeGreaterThanOrEqual(1);
  });

  // ─── Sorting ────────────────────────────────────────────────────────────────

  it("sorts individuals before packages", () => {
    const rooms = [
      makeRoom("big", 6, 400, "Villa"),
      makeRoom("a", 2, 100, "Standard"),
    ];
    const result = groupRoomsIntoPackages(rooms, 4);
    let seenPackage = false;
    for (const item of result) {
      if ("primaryRoom" in item) {
        seenPackage = true;
      } else {
        expect(seenPackage).toBe(false); // Individual should come before packages
      }
    }
  });

  it("sorts packages by totalPricePerNight ascending", () => {
    const rooms = [
      makeRoom("a", 2, 100, "Standard"),
      makeRoom("b", 2, 150, "Suite"),
      makeRoom("c", 2, 120, "Deluxe"),
    ];
    const result = groupRoomsIntoPackages(rooms, 5);
    const packages = result.filter((r) => "primaryRoom" in r);
    for (let i = 1; i < packages.length; i++) {
      const prev = packages[i - 1];
      const curr = packages[i];
      if ("primaryRoom" in prev && "primaryRoom" in curr) {
        expect(curr.totalPricePerNight).toBeGreaterThanOrEqual(
          prev.totalPricePerNight,
        );
      }
    }
  });

  // ─── Primary Room Selection ─────────────────────────────────────────────────

  it("selects the most expensive room as primary", () => {
    const rooms = [
      makeRoom("cheap", 2, 80, "Standard"),
      makeRoom("expensive", 2, 200, "Suite"),
    ];
    const result = groupRoomsIntoPackages(rooms, 4);
    const pkg = result[0];
    if ("primaryRoom" in pkg) {
      expect(pkg.primaryRoom.id).toBe("expensive");
    }
  });

  // ─── Determinism ────────────────────────────────────────────────────────────

  it("produces the same result for the same inputs (deterministic)", () => {
    const rooms = [
      makeRoom("a", 2, 100, "Standard"),
      makeRoom("b", 3, 150, "Deluxe"),
      makeRoom("c", 5, 300, "Villa"),
    ];
    const result1 = groupRoomsIntoPackages(rooms, 7);
    const result2 = groupRoomsIntoPackages(rooms, 7);
    expect(result1).toEqual(result2);
  });
});
