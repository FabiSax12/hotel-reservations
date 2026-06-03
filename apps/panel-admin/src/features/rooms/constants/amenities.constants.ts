import { THEME_COLORS } from "./info.constants";

export const PREDEFINED_AMENITY_IDS = {
  WIFI: "WIFI",
  AIR_CONDITIONING: "AIR_CONDITIONING",
  TV: "TV",
  MINI_BAR: "MINI_BAR",
  SAFE_BOX: "SAFE_BOX",
  DESK: "DESK",
  HAIR_DRYER: "HAIR_DRYER",
  BALCONY: "BALCONY",
  POOL: "POOL",
  GYM: "GYM",
} as const;

export const AMENITIES_THEME = {
  CARD_SELECTED: THEME_COLORS.PRIMARY,
  CARD_UNSELECTED: THEME_COLORS.SUBTLE,
  ICON_COLOR: THEME_COLORS.ACCENT,
} as const;

export const AMENITIES_VALIDATION = {
  MIN_SELECTION: 1,
  MAX_NAME_LENGTH: 25,
  MAX_DESC_LENGTH: 50,
} as const;

export const AMENITIES_CONFIG = {
  DEFAULT_ICON: "Sparkles",
  FALLBACK_ICON: "HelpCircle",
  CUSTOM_PREFIX: "custom-",
  CUSTOM_ICON_OPTIONS: [
    "Wifi",
    "Tv",
    "Coffee",
    "Bed",
    "Bath",
    "Dumbbell",
    "Waves",
    "Sparkles",
  ] as const,
} as const;

export const KEYBOARD_KEYS = {
  ENTER: "Enter",
  ESCAPE: "Escape",
} as const;

export const DEFAULT_ROOM_ID = "new-room-id";
