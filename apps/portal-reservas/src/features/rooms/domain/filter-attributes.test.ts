/**
 * @file filter-attributes.test.ts — Unit tests for the auto-derived
 * filter attribute extraction logic (US-DM-03 AC #3).
 */

import { describe, expect, it } from "vitest";
import { extractFilterAttributes } from "./filter-attributes";
import type { Room } from "./types";

const room = (overrides: Partial<Room>): Room =>
  ({
    id: "x",
    location: "Monteverde",
    title: "",
    type: "Standard",
    price: 100,
    capacity: 2,
    inventory: 1,
    beds: [],
    description: "",
    adminTip: "",
    image: "",
    images: [],
    amenities: [],
    availableDates: [],
    ...overrides,
  }) as Room;

describe("extractFilterAttributes", () => {
  it("returns empty options and zero bounds for an empty room list", () => {
    expect(extractFilterAttributes([])).toEqual({
      amenities: [],
      roomTypes: [],
      priceBounds: { min: 0, max: 0 },
    });
  });

  it("derives sorted unique amenities + types from the current rooms", () => {
    const rooms = [
      room({ id: "1", type: "Suite", amenities: ["WiFi", "AC"] }),
      room({ id: "2", type: "Standard", amenities: ["WiFi", "Jacuzzi"] }),
      room({ id: "3", type: "Suite", amenities: ["AC", "Terraza"] }),
    ];
    const attrs = extractFilterAttributes(rooms);
    expect(attrs.amenities).toEqual(["AC", "Jacuzzi", "Terraza", "WiFi"]);
    expect(attrs.roomTypes).toEqual(["Standard", "Suite"]);
  });

  it("derives price bounds from min/max price in the list", () => {
    const rooms = [
      room({ id: "1", price: 145 }),
      room({ id: "2", price: 550 }),
      room({ id: "3", price: 280 }),
    ];
    expect(extractFilterAttributes(rooms).priceBounds).toEqual({ min: 145, max: 550 });
  });

  it("collapses min/max when only one room exists", () => {
    expect(extractFilterAttributes([room({ price: 320 })]).priceBounds).toEqual({
      min: 320,
      max: 320,
    });
  });
});
