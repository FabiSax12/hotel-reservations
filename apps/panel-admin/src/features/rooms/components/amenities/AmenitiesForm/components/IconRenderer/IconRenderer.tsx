import * as LucideIcons from "lucide-react";
import type React from "react";
import { AMENITIES_CONFIG } from "@/features/rooms/constants/amenities.constants";
import type { IconRendererProps } from "./IconRenderer.interface";

export const IconRenderer: React.FC<IconRendererProps> = ({ name, size = 24 }) => {
  const Icon = (LucideIcons as any)[name];
  if (!Icon) {
    const FallbackIcon = (LucideIcons as any)[AMENITIES_CONFIG.FALLBACK_ICON];
    return <FallbackIcon size={size} />;
  }
  return <Icon size={size} />;
};
