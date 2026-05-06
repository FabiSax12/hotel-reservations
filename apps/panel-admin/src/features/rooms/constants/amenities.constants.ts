import { THEME_COLORS } from "./info.constants";

export const MOCK_AMENITIES = [
  { id: "1", name: "WiFi", icon: "Wifi", description: "High-speed internet access" },
  { id: "2", name: "Aire Acondicionado", icon: "Wind", description: "Climate control for your comfort" },
  { id: "3", name: "TV", icon: "Tv", description: "Flat-screen TV with cable channels" },
  { id: "4", name: "Mini Bar", icon: "Coffee", description: "Refreshments and snacks available" },
  { id: "5", name: "Caja Fuerte", icon: "ShieldCheck", description: "Secure storage for your valuables" },
  { id: "6", name: "Escritorio", icon: "FileText", description: "Dedicated workspace" },
  { id: "7", name: "Secador de Pelo", icon: "Scissors", description: "Available in the bathroom" },
  { id: "8", name: "Balcón", icon: "Sun", description: "Private outdoor space" },
  { id: "9", name: "Piscina", icon: "Waves", description: "Access to the hotel pool" },
  { id: "10", name: "Gimnasio", icon: "Dumbbell", description: "Access to fitness center" },
];

export const AMENITIES_THEME = {
  CARD_SELECTED: THEME_COLORS.PRIMARY,
  CARD_UNSELECTED: THEME_COLORS.SUBTLE,
  ICON_COLOR: THEME_COLORS.ACCENT,
} as const;

export const AMENITIES_VALIDATION = {
  MIN_SELECTION: 1,
} as const;

export const MOCK_AMENITIES_STORAGE_KEY = "hotel_room_amenities_mock";
export const DEFAULT_ROOM_ID = "new-room-id";
