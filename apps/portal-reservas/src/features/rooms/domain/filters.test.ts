/**
 * @file filters.test.ts — Unit tests for the room filtering domain logic.
 */

import { describe, expect, it } from "vitest";
import { SEARCH_VALS } from "../../search/components/search-bar/constants/search.constants";
import { createEmptyRoomFilters } from "../constants/rooms-filters.constants";
import {
  applyGroupedRoomFilters,
  applyRoomFilters,
  filterRoomsByDestination,
  hasActiveFilters,
} from "./filters";
import type { GroupedRoom } from "./grouping";
import type { Room, RoomPackage } from "./types";

const room = (overrides: Partial<Room>): Room =>
  ({
    id: "x",
    location: "Monteverde",
    title: "",
    type: "Standard",
    price: 100,
    capacity: 2,
    inventory: 1,
    sqft: 0,
    beds: [],
    description: "",
    adminTip: "",
    image: "",
    images: [],
    amenities: [],
    availableDates: [],
    isFeatured: false,
    ...overrides,
  }) as Room;

describe("filterRoomsByDestination", () => {
  const mockRooms = [
    { id: "1", location: "Monteverde" },
    { id: "2", location: "La Fortuna" },
    { id: "3", location: "Monteverde" },
  ] as Room[];

  it("returns all rooms when destination is null", () => {
    expect(filterRoomsByDestination(mockRooms, null).length).toBe(3);
  });

  it(`returns all rooms when destination is ${SEARCH_VALS.DESTINATION_ALL}`, () => {
    expect(filterRoomsByDestination(mockRooms, SEARCH_VALS.DESTINATION_ALL).length).toBe(3);
  });

  it("filters rooms by destination", () => {
    const result = filterRoomsByDestination(mockRooms, "Monteverde");
    expect(result.length).toBe(2);
    expect(result.every((r) => r.location === "Monteverde")).toBe(true);
  });
});

describe("applyRoomFilters", () => {
  const rooms = [
    room({ id: "a", type: "Standard", price: 100, amenities: ["WiFi", "AC"] }),
    room({ id: "b", type: "Suite", price: 200, amenities: ["WiFi", "Jacuzzi"] }),
    room({ id: "c", type: "Villa", price: 500, amenities: ["WiFi", "Piscina", "AC"] }),
  ];

  it("returns all rooms when no filter is active", () => {
    expect(applyRoomFilters(rooms, createEmptyRoomFilters())).toHaveLength(3);
  });

  it("requires all selected amenities to be present (AND semantics)", () => {
    const result = applyRoomFilters(rooms, {
      ...createEmptyRoomFilters(),
      amenities: ["WiFi", "AC"],
    });
    expect(result.map((r) => r.id)).toEqual(["a", "c"]);
  });

  it("matches any selected room type (OR semantics)", () => {
    const result = applyRoomFilters(rooms, {
      ...createEmptyRoomFilters(),
      roomTypes: ["Standard", "Villa"],
    });
    expect(result.map((r) => r.id)).toEqual(["a", "c"]);
  });

  it("filters by inclusive price range", () => {
    const result = applyRoomFilters(rooms, {
      ...createEmptyRoomFilters(),
      priceRange: { min: 150, max: 300 },
    });
    expect(result.map((r) => r.id)).toEqual(["b"]);
  });

  it("combines multiple groups with AND semantics", () => {
    const result = applyRoomFilters(rooms, {
      amenities: ["WiFi"],
      roomTypes: ["Villa", "Suite"],
      priceRange: { min: 300, max: 600 },
    });
    expect(result.map((r) => r.id)).toEqual(["c"]);
  });

  it("does not mutate the input array", () => {
    const original = rooms.slice();
    applyRoomFilters(rooms, { ...createEmptyRoomFilters(), amenities: ["WiFi"] });
    expect(rooms).toEqual(original);
  });
});

describe("applyGroupedRoomFilters", () => {
  const individualCheap = room({ id: "ind-cheap", price: 100 });
  const individualMid = room({ id: "ind-mid", price: 250 });
  const cheapPackage: RoomPackage = {
    id: "pkg-cheap",
    rooms: [room({ id: "pc-a", price: 100 }), room({ id: "pc-b", price: 150 })],
    totalCapacity: 4,
    totalPricePerNight: 250,
    isHomogeneous: false,
  };
  const expensivePackage: RoomPackage = {
    id: "pkg-expensive",
    // Each room <= 300 (would pass per-room filter), but total = 600 > 300.
    rooms: [room({ id: "pe-a", price: 300 }), room({ id: "pe-b", price: 300 })],
    totalCapacity: 4,
    totalPricePerNight: 600,
    isHomogeneous: true,
  };
  const items: GroupedRoom[] = [individualCheap, individualMid, cheapPackage, expensivePackage];

  it("returns all items when no price range is set", () => {
    expect(applyGroupedRoomFilters(items, createEmptyRoomFilters())).toHaveLength(4);
  });

  it("drops packages whose total exceeds the user's max price", () => {
    const result = applyGroupedRoomFilters(items, {
      ...createEmptyRoomFilters(),
      priceRange: { min: 0, max: 300 },
    });
    expect(result.map((i) => i.id)).toEqual(["ind-cheap", "ind-mid", "pkg-cheap"]);
  });

  it("drops packages whose total is below the user's min price", () => {
    const result = applyGroupedRoomFilters(items, {
      ...createEmptyRoomFilters(),
      priceRange: { min: 400, max: 1000 },
    });
    // Individuals pass through (handled upstream); only the expensive package qualifies here.
    expect(result.map((i) => i.id)).toEqual(["ind-cheap", "ind-mid", "pkg-expensive"]);
  });

  it("does not mutate the input array", () => {
    const original = items.slice();
    applyGroupedRoomFilters(items, {
      ...createEmptyRoomFilters(),
      priceRange: { min: 0, max: 300 },
    });
    expect(items).toEqual(original);
  });
});

describe("hasActiveFilters", () => {
  it("is false for the empty filter state", () => {
    expect(hasActiveFilters(createEmptyRoomFilters())).toBe(false);
  });

  it("is true when any group has a selection", () => {
    expect(hasActiveFilters({ ...createEmptyRoomFilters(), amenities: ["WiFi"] })).toBe(true);
    expect(hasActiveFilters({ ...createEmptyRoomFilters(), roomTypes: ["Suite"] })).toBe(true);
    expect(
      hasActiveFilters({ ...createEmptyRoomFilters(), priceRange: { min: 0, max: 100 } }),
    ).toBe(true);
  });
});
