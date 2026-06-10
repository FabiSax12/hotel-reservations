/**
 * @file availability.test.ts — Unit tests for availability math (US-DM-07).
 */

import { describe, expect, it } from "vitest";
import { addIsoDays, computeAvailableDates, isStayAvailable } from "./availability";

describe("addIsoDays", () => {
  it("adds days across a month boundary", () => {
    expect(addIsoDays("2026-01-30", 3)).toBe("2026-02-02");
  });
});

describe("computeAvailableDates", () => {
  it("excludes the nights of a reserved range (check-out exclusive)", () => {
    const result = computeAvailableDates(
      [{ checkIn: "2026-01-02", checkOut: "2026-01-04" }],
      "2026-01-01",
      5,
    );
    // 01-02 and 01-03 are occupied; 01-04 (check-out day) frees up again.
    expect(result).toEqual(["2026-01-01", "2026-01-04", "2026-01-05"]);
  });

  it("returns the whole window when nothing is reserved", () => {
    expect(computeAvailableDates([], "2026-01-01", 3)).toEqual([
      "2026-01-01",
      "2026-01-02",
      "2026-01-03",
    ]);
  });
});

describe("isStayAvailable", () => {
  const free = ["2026-01-01", "2026-01-02", "2026-01-03"];

  it("is true when every night of the stay is free", () => {
    expect(isStayAvailable(free, "2026-01-01", "2026-01-03")).toBe(true);
  });

  it("is false when any night is missing", () => {
    expect(isStayAvailable(free, "2026-01-01", "2026-01-05")).toBe(false);
  });

  it("is false for an empty or inverted range", () => {
    expect(isStayAvailable(free, "", "")).toBe(false);
    expect(isStayAvailable(free, "2026-01-03", "2026-01-01")).toBe(false);
  });
});
