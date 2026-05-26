import { DB_ENUMS } from "@hotel/db";

export const PERMISSIONS = {
  ADMINS: {
    VIEW: DB_ENUMS.user_permission.admins_view,
    INVITE: DB_ENUMS.user_permission.admins_invite,
    REVOKE: DB_ENUMS.user_permission.admins_revoke,
    DISABLE: DB_ENUMS.user_permission.admins_disable,
  },
  ROOMS: {
    MANAGE: DB_ENUMS.user_permission.rooms_manage,
  },
  RESERVATIONS: {
    VIEW: DB_ENUMS.user_permission.reservations_view,
    EDIT: DB_ENUMS.user_permission.reservations_edit,
    DELETE: DB_ENUMS.user_permission.reservations_delete,
  },
  DASHBOARD: {
    VIEW: DB_ENUMS.user_permission.view_dashboard,
  },
  CMS: {
    MANAGE: DB_ENUMS.user_permission.cms_manage,
  },
  INVOICES: {
    VIEW: DB_ENUMS.user_permission.invoices_view,
  },
  CLIENTS: {
    VIEW: DB_ENUMS.user_permission.clients_view,
  },
  PERMISSIONS: {
    MANAGE: DB_ENUMS.user_permission.permissions_manage,
  },
};
