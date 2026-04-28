export const ROOM_CATEGORIES = ["Standard", "Deluxe", "Suite"] as const;

export type RoomCategory = (typeof ROOM_CATEGORIES)[number];

export const DEFAULT_ROOM_STATE = true;

// Room capacity defaults
export const DEFAULT_ADULTS = 2;
export const DEFAULT_KIDS = 0;

// Room capacity limits
export const MAX_ADULTS = 10;
export const MAX_KIDS = 10;

// Mock Service Constants
export const MOCK_SERVICE_DELAYS = {
  GET_ALL: 800,
  GET_BY_ID: 800,
  CREATE: 1200,
  UPDATE: 1000,
  TOGGLE: 500,
} as const;

// Theme Constants (Natural Premium)
export const THEME_COLORS = {
  PRIMARY: "oklch(62.04% 0.195 224.67)", // Emerald
  SURFACE: "white",
  LABEL: "oklch(55.55% 0 0)", // gray-500
  SUBTLE: "oklch(96.11% 0 0)", // gray-50
} as const;

export const THEME_INTERACTIONS = {
  ACTIVE_SCALE: "0.98",
  TRANSITION_DURATION: "300ms",
} as const;
