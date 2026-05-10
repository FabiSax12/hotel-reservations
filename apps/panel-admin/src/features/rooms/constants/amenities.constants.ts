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

export const MOCK_AMENITIES = [
  { id: PREDEFINED_AMENITY_IDS.WIFI, name: "WiFi", icon: "Wifi", description: "High-speed internet access" },
  { id: PREDEFINED_AMENITY_IDS.AIR_CONDITIONING, name: "Aire Acondicionado", icon: "Wind", description: "Climate control for your comfort" },
  { id: PREDEFINED_AMENITY_IDS.TV, name: "TV", icon: "Tv", description: "Flat-screen TV with cable channels" },
  { id: PREDEFINED_AMENITY_IDS.MINI_BAR, name: "Mini Bar", icon: "Coffee", description: "Refreshments and snacks available" },
  { id: PREDEFINED_AMENITY_IDS.SAFE_BOX, name: "Caja Fuerte", icon: "ShieldCheck", description: "Secure storage for your valuables" },
  { id: PREDEFINED_AMENITY_IDS.DESK, name: "Escritorio", icon: "FileText", description: "Dedicated workspace" },
  { id: PREDEFINED_AMENITY_IDS.HAIR_DRYER, name: "Secador de Pelo", icon: "Scissors", description: "Available in the bathroom" },
  { id: PREDEFINED_AMENITY_IDS.BALCONY, name: "Balcón", icon: "Sun", description: "Private outdoor space" },
  { id: PREDEFINED_AMENITY_IDS.POOL, name: "Piscina", icon: "Waves", description: "Access to the hotel pool" },
  { id: PREDEFINED_AMENITY_IDS.GYM, name: "Gimnasio", icon: "Dumbbell", description: "Access to fitness center" },
];

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
  CUSTOM_ICON_OPTIONS: ["Wifi", "Tv", "Coffee", "Bed", "Bath", "Dumbbell", "Waves", "Sparkles"] as const,
} as const;

export const KEYBOARD_KEYS = {
  ENTER: "Enter",
  ESCAPE: "Escape",
} as const;

export const MOCK_AMENITIES_STORAGE_KEY = "hotel_room_amenities_mock";
export const DEFAULT_ROOM_ID = "new-room-id";
