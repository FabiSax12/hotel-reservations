/**
 * @file sorting.test.ts — Unit tests for US-DM-03 sort domain.
 */

import { describe, expect, it } from "vitest";
import { ROOM_SORT_OPTIONS } from "../constants/rooms-filters.constants";
import type { GroupedRoom } from "./grouping";
import { sortGroupedRooms, sortRooms } from "./sorting";
import type { Room, RoomPackage } from "./types";

const room = (id: string, price: number, isFeatured: boolean): Room =>
  ({
    id,
    location: "Monteverde",
    title: id,
    type: "Standard",
    price,
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
    isFeatured,
    checkInTime: "15:00",
    checkOutTime: "11:00",
  }) as Room;

describe("sortRooms", () => {
  const rooms: Room[] = [
    room("c", 200, false),
    room("a", 100, true),
    room("b", 300, false),
    room("d", 150, true),
  ];

  it("does not mutate the input array", () => {
    const original = rooms.slice();
    sortRooms(rooms, ROOM_SORT_OPTIONS.PRICE_ASC);
    expect(rooms).toEqual(original);
  });

  it("PRICE_ASC orders cheapest first, id-tiebreak", () => {
    expect(sortRooms(rooms, ROOM_SORT_OPTIONS.PRICE_ASC).map((r) => r.id)).toEqual([
      "a",
      "d",
      "c",
      "b",
    ]);
  });

  it("PRICE_DESC orders most expensive first", () => {
    expect(sortRooms(rooms, ROOM_SORT_OPTIONS.PRICE_DESC).map((r) => r.id)).toEqual([
      "b",
      "c",
      "d",
      "a",
    ]);
  });

  it("FEATURED puts featured first, then by id", () => {
    expect(sortRooms(rooms, ROOM_SORT_OPTIONS.FEATURED).map((r) => r.id)).toEqual([
      "a",
      "d",
      "b",
      "c",
    ]);
  });

  it("returns [] unchanged", () => {
    expect(sortRooms([], ROOM_SORT_OPTIONS.PRICE_ASC)).toEqual([]);
  });
});

describe("sortGroupedRooms", () => {
  const r1 = room("r1", 100, false);
  const r2 = room("r2", 200, true);
  const pkg: RoomPackage = {
    id: "pkg-1",
    rooms: [room("p-a", 150, false), room("p-b", 80, false)],
    totalCapacity: 4,
    totalPricePerNight: 230,
    isHomogeneous: false,
  };
  const featuredPkg: RoomPackage = {
    id: "pkg-feat",
    rooms: [room("p-c", 150, true), room("p-d", 80, false)],
    totalCapacity: 4,
    totalPricePerNight: 50,
    isHomogeneous: false,
  };
  const items: GroupedRoom[] = [r1, r2, pkg, featuredPkg];

  it("PRICE_ASC uses the package total price", () => {
    expect(sortGroupedRooms(items, ROOM_SORT_OPTIONS.PRICE_ASC).map((i) => i.id)).toEqual([
      "pkg-feat",
      "r1",
      "r2",
      "pkg-1",
    ]);
  });

  it("PRICE_DESC reverses by effective price", () => {
    expect(sortGroupedRooms(items, ROOM_SORT_OPTIONS.PRICE_DESC).map((i) => i.id)).toEqual([
      "pkg-1",
      "r2",
      "r1",
      "pkg-feat",
    ]);
  });

  it("FEATURED bubbles featured items (rooms or packages) to the top", () => {
    const result = sortGroupedRooms(items, ROOM_SORT_OPTIONS.FEATURED).map((i) => i.id);
    expect(result.slice(0, 2)).toEqual(expect.arrayContaining(["r2", "pkg-feat"]));
    expect(result.slice(2)).toEqual(expect.arrayContaining(["r1", "pkg-1"]));
  });
});
