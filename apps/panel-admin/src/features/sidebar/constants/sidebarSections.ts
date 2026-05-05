import {
  BedDouble,
  ClipboardList,
  LayoutDashboard,
  LayoutPanelTop,
  Receipt,
  UserKey,
  UserRound,
} from "lucide-react";
import { ROUTES } from "@/config/routes";
import type { SidebarSection } from "../types/sidebarSection";
import { LABEL_KEYS } from "./labelKeys";
import { SECTION_KEYS } from "./sectionKeys";

export const SIDEBAR_SECTIONS: SidebarSection[] = [
  {
    sectionKey: SECTION_KEYS.ADMINISTRATION,
    items: [
      {
        labelKey: LABEL_KEYS.DASHBOARD,
        route: ROUTES.ADMIN.DASHBOARD,
        icon: LayoutDashboard,
        isPrimary: true,
      },
      {
        labelKey: LABEL_KEYS.ADMINS,
        route: ROUTES.ADMIN.ADMINS,
        icon: UserKey,
        isPrimary: true,
      },
    ],
  },
  {
    sectionKey: SECTION_KEYS.RESERVATIONS,
    items: [
      {
        labelKey: LABEL_KEYS.RESERVATIONS,
        // TODO: Change when this route is created
        route: "/admin/reservations",
        icon: ClipboardList,
        isPrimary: true,
      },
      {
        labelKey: LABEL_KEYS.CLIENTS,
        // TODO: Change when this route is created
        route: "/admin/clients",
        icon: UserRound,
      },
    ],
  },
  {
    sectionKey: SECTION_KEYS.INVENTORY,
    items: [
      {
        labelKey: LABEL_KEYS.ROOMS,
        // TODO: Change when this route is created
        route: "/admin/rooms",
        icon: BedDouble,
      },
    ],
  },
  {
    sectionKey: SECTION_KEYS.FINANCE,
    items: [
      {
        labelKey: LABEL_KEYS.INVOICES,
        // TODO: Change when this route is created
        route: "/admin/invoices",
        icon: Receipt,
      },
    ],
  },
  {
    sectionKey: SECTION_KEYS.CMS,
    items: [
      {
        labelKey: LABEL_KEYS.CMS_LANDING,
        // TODO: Change when this route is created
        route: "/admin/cms/landing",
        icon: LayoutPanelTop,
      },
    ],
  },
];
