import type { SidebarItem } from "./sidebarItem";
import type { SidebarSectionKey } from "./sidebarSectionKey";

export type SidebarSection = {
  sectionKey: SidebarSectionKey;
  items: SidebarItem[];
};
