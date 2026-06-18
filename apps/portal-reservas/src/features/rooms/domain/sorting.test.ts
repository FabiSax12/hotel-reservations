/**
 * @file sorting.test.ts — Unit tests for the room sort domain (US-DM-03 / US-DM-07).
 */

import { describe, expect, it } from "vitest";
import { ROOM_SORT_OPTIONS } from "../constants/rooms-filters.constants";
import type { GroupedRoom } from "./grouping";
import { sortGroupedRooms, sortRooms } from "./sorting";
import type { Room, RoomPackage } from "./types";

const room = (id: string, price: number): Room =>
  ({
    id,
    title: id,
    type: "Standard",
    price,
    capacity: 2,
    inventory: 1,
    description: "",
    amenities: [],
    availableDates: [],
  }) as Room;

describe("sortRooms", () => {
  const rooms: Room[] = [room("c", 200), room("a", 100), room("b", 300), room("d", 150)];

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

  it("returns [] unchanged", () => {
    expect(sortRooms([], ROOM_SORT_OPTIONS.PRICE_ASC)).toEqual([]);
  });
});

describe("sortGroupedRooms", () => {
  const r1 = room("r1", 100);
  const r2 = room("r2", 200);
  const pkg: RoomPackage = {
    id: "pkg-1",
    rooms: [room("p-a", 150), room("p-b", 80)],
    totalCapacity: 4,
    totalPricePerNight: 230,
    isHomogeneous: false,
  };
  const cheapPkg: RoomPackage = {
    id: "pkg-cheap",
    rooms: [room("p-c", 150), room("p-d", 80)],
    totalCapacity: 4,
    totalPricePerNight: 50,
    isHomogeneous: false,
  };
  const items: GroupedRoom[] = [r1, r2, pkg, cheapPkg];

  it("PRICE_ASC uses the package total price", () => {
    expect(sortGroupedRooms(items, ROOM_SORT_OPTIONS.PRICE_ASC).map((i) => i.id)).toEqual([
      "pkg-cheap",
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
      "pkg-cheap",
    ]);
  });
});
