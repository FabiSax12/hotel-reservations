/**
 * @file grouping.test.ts — Unit tests for the room grouping algorithm (US-DM-04).
 */

import { describe, expect, it } from "vitest";
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
    id,
    location: "Test",
    title: `Room ${id}`,
    type,
    price,
    capacity,
    inventory,
    beds: [{ type: "queen", count: 1 }],
    description: "",
    adminTip: "",
    image: "",
    images: [],
    amenities: [],
    availableDates: [],
    checkInTime: "15:00",
    checkOutTime: "11:00",
  };
}

describe("groupRoomsIntoPackages", () => {
  it("returns rooms as-is when guestCount is 0", () => {
    const rooms = [makeRoom("a", 2, 100)];
    expect(groupRoomsIntoPackages(rooms, 0)).toEqual(rooms);
  });

  it("returns individual room when it can accommodate all guests", () => {
    const rooms = [makeRoom("big", 6, 400), makeRoom("small", 2, 100)];
    const result = groupRoomsIntoPackages(rooms, 4);
    const individuals = result.filter((r) => !("rooms" in r));
    expect(individuals).toHaveLength(1);
    expect(individuals[0].id).toBe("big");
  });

  it("generates multiple valid packages for 6 guests", () => {
    const rooms = [
      makeRoom("std", 2, 145, "Standard", 8),
      makeRoom("suite", 2, 280, "Suite", 3),
      makeRoom("family", 5, 320, "Family", 2),
      makeRoom("villa", 4, 550, "Villa", 1),
    ];
    const result = groupRoomsIntoPackages(rooms, 6);
    const packages = result.filter((r) => "rooms" in r);
    expect(packages.length).toBeGreaterThanOrEqual(3);

    // Verify 3x Standard exists
    const has3Std = packages.some((p) => {
      if (!("rooms" in p)) return false;
      return p.rooms.length === 3 && p.rooms.every((r) => r.type === "Standard");
    });
    expect(has3Std).toBe(true);

    // Verify Standard + Villa exists
    const hasStdVilla = packages.some((p) => {
      if (!("rooms" in p)) return false;
      const types = p.rooms.map((r) => r.type);
      return types.includes("Standard") && types.includes("Villa");
    });
    expect(hasStdVilla).toBe(true);

    // Sorted by price
    for (let i = 1; i < packages.length; i++) {
      const prev = packages[i - 1],
        curr = packages[i];
      if ("rooms" in prev && "rooms" in curr) {
        expect(curr.totalPricePerNight).toBeGreaterThanOrEqual(prev.totalPricePerNight);
      }
    }
  });

  it("rejects absurd split exceeding MAX_WASTE", () => {
    const rooms = [makeRoom("std", 2, 100, "Standard", 5), makeRoom("villa", 8, 500, "Villa", 1)];
    const result = groupRoomsIntoPackages(rooms, 3);
    const packages = result.filter((r) => "rooms" in r);
    for (const pkg of packages) {
      if ("rooms" in pkg) {
        expect(pkg.rooms.some((r) => r.id === "villa")).toBe(false);
      }
    }
  });

  it("respects inventory limits", () => {
    const rooms = [makeRoom("std", 2, 100, "Standard", 2)];
    const result = groupRoomsIntoPackages(rooms, 6);
    const packages = result.filter((r) => "rooms" in r);
    for (const pkg of packages) {
      if ("rooms" in pkg) {
        expect(pkg.rooms.length).toBeLessThanOrEqual(2);
      }
    }
  });

  it("selects the most expensive room as first in rooms array", () => {
    const rooms = [
      makeRoom("cheap", 2, 80, "Standard", 5),
      makeRoom("expensive", 2, 200, "Suite", 5),
    ];
    const result = groupRoomsIntoPackages(rooms, 4);
    const pkg = result.find((r) => {
      if (!("rooms" in r)) return false;
      return (
        r.rooms.some((room) => room.id === "cheap") &&
        r.rooms.some((room) => room.id === "expensive")
      );
    });
    expect(pkg && "rooms" in pkg ? pkg.rooms[0].id : null).toBe("expensive");
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
