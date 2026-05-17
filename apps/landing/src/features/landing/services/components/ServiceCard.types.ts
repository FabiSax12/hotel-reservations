import type { ServiceConfig } from "@/features/landing/services/constants/services-config";
import type { ServiceItemTexts } from "@/features/landing/services/i18n/servicesTexts.type";

export interface ServiceCardProps {
  service: ServiceConfig;
  texts: ServiceItemTexts;
  index: number;
}
