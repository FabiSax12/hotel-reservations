import { ROUTES } from "@/config/routes";

export const NAV_KEYS = ["HOME", "ABOUT", "ROOMS", "CONTACT"] as const;

export type NavKey = (typeof NAV_KEYS)[number];

export const NAV_HREFS: Record<NavKey, string> = {
  HOME: ROUTES.HOME,
  ABOUT: ROUTES.ANCHORS.ABOUT,
  ROOMS: ROUTES.ANCHORS.ROOMS,
  CONTACT: ROUTES.ANCHORS.CONTACT,
};

export const CURRENT_YEAR = new Date().getFullYear();
