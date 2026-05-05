import type { LucideIcon } from "lucide-react";
import type { SidebarItemKey } from "./sidebarItemKey";

export type SidebarItem = {
  labelKey: SidebarItemKey;
  route: string;
  icon: LucideIcon;
  isPrimary?: boolean;
};
