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

export type SidebarItem = {
  label: string;
  route: string;
  icon: LucideIcon;
  isPrimary?: boolean;
};

export type SidebarSection = {
  title: string;
  items: SidebarItem[];
};

export const SIDEBAR_SECTIONS: SidebarSection[] = [
  {
    title: "Administracion",
    items: [
      { label: "Dashboard", route: "/admin/dashboard", icon: LayoutDashboard, isPrimary: true },
      { label: "Administradores", route: "/admin/admins", icon: UserKey, isPrimary: true },
      // { label: "Lista Admins", route: "/admin/admins", icon: Users },
      // { label: "Añadir admin", route: "/admin/admins/new", icon: UserPlus },
      // { label: "Invitaciones", route: "/admin/invitations", icon: Mail },
      // { label: "Invitaciones - Revocar", route: "/admin/invitations/revoke", icon: MailX },
      // { label: "Invitaciones - Reenviar", route: "/admin/invitations/resend", icon: MailCheck },
    ],
  },
  {
    title: "Reservas",
    items: [
      { label: "Reservas", route: "/admin/reservations", icon: ClipboardList, isPrimary: true },
      // { label: "Reservas Portal", route: "/admin/portal-reservas", icon: Hotel },
      { label: "Clientes", route: "/admin/clients", icon: UserRound },
    ],
  },
  {
    title: "Inventario",
    items: [
      // { label: "Añadir Cuarto", route: "/admin/rooms/new", icon: BedSingle },
      { label: "Cuartos", route: "/admin/rooms", icon: BedDouble },
      // { label: "Cuarto Detalle", route: "/admin/rooms/:id", icon: DoorOpen },
    ],
  },
  {
    title: "Finanzas",
    items: [{ label: "Facturas", route: "/admin/invoices", icon: Receipt }],
  },
  {
    title: "CMS",
    items: [
      { label: "Contenido Landing Page (CMS)", route: "/admin/cms/landing", icon: LayoutPanelTop },
    ],
  },
];
