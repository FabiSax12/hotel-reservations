/**
 * @file grouping.test.ts — Unit tests for the room grouping algorithm (US-DM-04).
 */

import { describe, it, expect } from "vitest";
import { groupRoomsIntoPackages } from "./grouping";
import type { Room } from "./types";

function makeRoom(
  id: string,
  capacity: number,
  price: number,
  type = "Standard",
  inventory = 10,
): Room {
  return {
    id, location: "Test", title: `Room ${id}`, type, price, capacity, inventory,
    sqft: 50, description: "", adminTip: "", image: "", images: [], amenities: [], availableDates: [],
  };
}

describe("groupRoomsIntoPackages", () => {
  it("returns rooms as-is when guestCount is 0", () => {
    const rooms = [makeRoom("a", 2, 100)];
    expect(groupRoomsIntoPackages(rooms, 0)).toEqual(rooms);
  });

  it("returns individual room when it can accommodate all guests, plus packages from smaller rooms", () => {
    const rooms = [makeRoom("big", 6, 400), makeRoom("small", 2, 100)];
    const result = groupRoomsIntoPackages(rooms, 4);
    // big (cap 6) is individual, small+small (cap 4) is a package
    const individuals = result.filter((r) => !("primaryRoom" in r));
    expect(individuals).toHaveLength(1);
    expect(individuals[0].id).toBe("big");
    const packages = result.filter((r) => "primaryRoom" in r);
    expect(packages.length).toBeGreaterThanOrEqual(1);
  });

  it("generates multiple valid packages for 6 guests", () => {
    const rooms = [
      makeRoom("std", 2, 145, "Standard", 8),
      makeRoom("suite", 2, 280, "Suite", 3),
      makeRoom("family", 5, 320, "Family", 2),
      makeRoom("villa", 4, 550, "Villa", 1),
    ];
    const result = groupRoomsIntoPackages(rooms, 6);
    const packages = result.filter((r) => "primaryRoom" in r);
    expect(packages.length).toBeGreaterThanOrEqual(3);

    const has3Std = packages.some((p) => {
      if (!("primaryRoom" in p)) return false;
      const all = [p.primaryRoom, ...p.secondaryRooms];
      return all.length === 3 && all.every((r) => r.type === "Standard");
    });
    expect(has3Std).toBe(true);

    const hasStdVilla = packages.some((p) => {
      if (!("primaryRoom" in p)) return false;
      const types = [p.primaryRoom, ...p.secondaryRooms].map((r) => r.type);
      return types.includes("Standard") && types.includes("Villa");
    });
    expect(hasStdVilla).toBe(true);

    for (let i = 1; i < packages.length; i++) {
      const prev = packages[i - 1], curr = packages[i];
      if ("primaryRoom" in prev && "primaryRoom" in curr) {
        expect(curr.totalPricePerNight).toBeGreaterThanOrEqual(prev.totalPricePerNight);
      }
    }
  });

  it("rejects absurd split exceeding MAX_WASTE", () => {
    const rooms = [
      makeRoom("std", 2, 100, "Standard", 5),
      makeRoom("villa", 8, 500, "Villa", 1),
    ];
    const result = groupRoomsIntoPackages(rooms, 3);
    const packages = result.filter((r) => "primaryRoom" in r);
    for (const pkg of packages) {
      if ("primaryRoom" in pkg) {
        const all = [pkg.primaryRoom, ...pkg.secondaryRooms];
        expect(all.some((r) => r.id === "villa")).toBe(false);
      }
    }
  });

  it("respects inventory limits", () => {
    const rooms = [makeRoom("std", 2, 100, "Standard", 2)];
    const result = groupRoomsIntoPackages(rooms, 6);
    const packages = result.filter((r) => "primaryRoom" in r);
    for (const pkg of packages) {
      if ("primaryRoom" in pkg) {
        expect([pkg.primaryRoom, ...pkg.secondaryRooms].length).toBeLessThanOrEqual(2);
      }
    }
  });

  it("selects the most expensive room as primary", () => {
    const rooms = [
      makeRoom("cheap", 2, 80, "Standard", 5),
      makeRoom("expensive", 2, 200, "Suite", 5),
    ];
    const result = groupRoomsIntoPackages(rooms, 4);
    // Find the package that contains both cheap and expensive
    const pkg = result.find((r) => {
      if (!("primaryRoom" in r)) return false;
      const all = [r.primaryRoom, ...r.secondaryRooms];
      return all.some((room) => room.id === "cheap") && all.some((room) => room.id === "expensive");
    });
    expect(pkg && "primaryRoom" in pkg ? pkg.primaryRoom.id : null).toBe("expensive");
  });

  it("is deterministic", () => {
    const rooms = [
      makeRoom("std", 2, 100, "Standard", 5),
      makeRoom("suite", 2, 150, "Suite", 3),
      makeRoom("villa", 5, 300, "Villa", 2),
    ];
    expect(groupRoomsIntoPackages(rooms, 7)).toEqual(groupRoomsIntoPackages(rooms, 7));
  });
});
