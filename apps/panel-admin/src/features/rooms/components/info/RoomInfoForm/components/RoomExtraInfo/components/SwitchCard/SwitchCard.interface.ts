import type { LucideIcon } from "lucide-react";

export interface SwitchCardProps {
  isActive: boolean;
  onChange: (value: boolean) => void;
  label: string;
  activeText: string;
  inactiveText: string;
  icon: LucideIcon;
  ariaLabel: string;
}
