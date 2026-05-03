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

// Theme Constants (Natural Premium Emerald)
export const THEME_COLORS = {
  PRIMARY: "oklch(60.18% 0.147 158.46)", // Rich Emerald
  ACCENT: "oklch(45.18% 0.12 158.46)", // Darker Forest Green
  SURFACE: "oklch(99.41% 0.005 158.46)", // Soft Mint Surface
  LABEL: "oklch(55.55% 0.01 158.46)", // Subtle Sage Label
  SUBTLE: "oklch(96.11% 0.01 158.46)", // Light Sage Background
  BORDER: "oklch(90.11% 0.02 158.46)", // Border Sage
} as const;

export const THEME_INTERACTIONS = {
  ACTIVE_SCALE: "0.98",
  TRANSITION_DURATION: "300ms",
} as const;

export const ICON_SIZES = {
  MD: 18,
  SM: 16,
} as const;

// Si crece mucho meter las constantes especificadas directamente en cada feature