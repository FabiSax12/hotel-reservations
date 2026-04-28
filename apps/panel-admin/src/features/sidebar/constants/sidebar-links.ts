import type { LucideIcon } from "lucide-react";
import {
  BedDouble,
  ClipboardList,
  LayoutDashboard,
  LayoutPanelTop,
  Receipt,
  UserKey,
  UserRound,
} from "lucide-react";
import type { SidebarTexts } from "../i18n/sidebar.type";

type SidebarSectionKey = keyof SidebarTexts["ROUTES_SECTIONS"]["SECTIONS"];
type SidebarItemKey = keyof SidebarTexts["ROUTES_SECTIONS"]["ITEMS"];

export type SidebarItem = {
  labelKey: SidebarItemKey;
  route: string;
  icon: LucideIcon;
  isPrimary?: boolean;
};

export type SidebarSection = {
  sectionKey: SidebarSectionKey;
  items: SidebarItem[];
};

export const SIDEBAR_SECTIONS: SidebarSection[] = [
  {
    sectionKey: "ADMINISTRATION",
    items: [
      {
        labelKey: "DASHBOARD",
        route: "/admin/dashboard",
        icon: LayoutDashboard,
        isPrimary: true,
      },
      {
        labelKey: "ADMINS",
        route: "/admin/admins",
        icon: UserKey,
        isPrimary: true,
      },
      // { label: "Lista Admins", route: "/admin/admins", icon: Users },
      // { label: "Añadir admin", route: "/admin/admins/new", icon: UserPlus },
      // { label: "Invitaciones", route: "/admin/invitations", icon: Mail },
      // { label: "Invitaciones - Revocar", route: "/admin/invitations/revoke", icon: MailX },
      // { label: "Invitaciones - Reenviar", route: "/admin/invitations/resend", icon: MailCheck },
    ],
  },
  {
    sectionKey: "RESERVATIONS",
    items: [
      {
        labelKey: "RESERVATIONS",
        route: "/admin/reservations",
        icon: ClipboardList,
        isPrimary: true,
      },
      // { label: "Reservas Portal", route: "/admin/portal-reservas", icon: Hotel },
      { labelKey: "CLIENTS", route: "/admin/clients", icon: UserRound },
    ],
  },
  {
    sectionKey: "INVENTORY",
    items: [
      // { label: "Añadir Cuarto", route: "/admin/rooms/new", icon: BedSingle },
      { labelKey: "ROOMS", route: "/admin/rooms", icon: BedDouble },
      // { label: "Cuarto Detalle", route: "/admin/rooms/:id", icon: DoorOpen },
    ],
  },
  {
    sectionKey: "FINANCE",
    items: [{ labelKey: "INVOICES", route: "/admin/invoices", icon: Receipt }],
  },
  {
    sectionKey: "CMS",
    items: [
      {
        labelKey: "CMS_LANDING",
        route: "/admin/cms/landing",
        icon: LayoutPanelTop,
      },
    ],
  },
];
