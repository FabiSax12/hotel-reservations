import type { RoomCategory } from "@/features/rooms/constants/info.constants";
import { ROOM_CATEGORIES } from "@/features/rooms/constants/info.constants";

export const CATEGORY_CHIP_COLOR: Record<RoomCategory, "default" | "accent" | "warning"> = {
  [ROOM_CATEGORIES.STANDARD]: "default", // Standard
  [ROOM_CATEGORIES.DELUXE]: "accent", // Deluxe
  [ROOM_CATEGORIES.SUITE]: "warning", // Suite
} as const;
