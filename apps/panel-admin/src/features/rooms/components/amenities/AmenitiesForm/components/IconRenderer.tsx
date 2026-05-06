import React from "react";
import * as LucideIcons from "lucide-react";

interface IconRendererProps {
  name: string;
  size?: number;
}

export const IconRenderer: React.FC<IconRendererProps> = ({ name, size = 24 }) => {
  const Icon = (LucideIcons as any)[name];
  if (!Icon) return <LucideIcons.HelpCircle size={size} />;
  return <Icon size={size} />;
};
