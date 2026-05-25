import type { LucideIcon } from "lucide-react";
import {
  BellRing,
  Bird,
  Camera,
  Compass,
  Flower2,
  Helicopter,
  UtensilsCrossed,
  Waves,
} from "lucide-react";
import type { ServicesTexts } from "@/features/landing/services/i18n/servicesTexts.type";

export type ServiceId = keyof Pick<
  ServicesTexts,
  | "THERMAL"
  | "RESTAURANT"
  | "EXPEDITIONS"
  | "YOGA"
  | "PHOTOGRAPHY"
  | "TRANSFERS"
  | "SANCTUARY"
  | "BUTLER"
>;

export type ServiceConfig = {
  id: ServiceId;
  Icon: LucideIcon;
};

export const SERVICES_CONFIG: readonly ServiceConfig[] = Object.freeze([
  { id: "THERMAL", Icon: Waves },
  { id: "RESTAURANT", Icon: UtensilsCrossed },
  { id: "EXPEDITIONS", Icon: Compass },
  { id: "YOGA", Icon: Flower2 },
  { id: "PHOTOGRAPHY", Icon: Camera },
  { id: "TRANSFERS", Icon: Helicopter },
  { id: "SANCTUARY", Icon: Bird },
  { id: "BUTLER", Icon: BellRing },
] as const);
