import React from "react";
import * as LucideIcons from "lucide-react";
import { IconRendererProps } from "./IconRenderer.interface";
import { AMENITIES_CONFIG } from "@/features/rooms/constants/amenities.constants";

export const IconRenderer: React.FC<IconRendererProps> = ({ name, size = 24 }) => {
  const Icon = (LucideIcons as any)[name];
  if (!Icon) {
    const FallbackIcon = (LucideIcons as any)[AMENITIES_CONFIG.FALLBACK_ICON];
    return <FallbackIcon size={size} />;
  }
  return <Icon size={size} />;
};
