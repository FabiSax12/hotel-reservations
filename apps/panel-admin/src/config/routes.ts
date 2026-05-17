export const ROUTES = Object.freeze({
  ADMIN: Object.freeze({
    DASHBOARD: "/admin/dashboard",
    RESERVATIONS: "/admin/reservations",
    NEW: "/admin/reservations/new",
    ADMINS: "/admin/admins",
    INVITATIONS: "/admin/invitations",
  } as const),
  AUTH: Object.freeze({
    LOGIN: "/auth/login",
    ACTIVATE: "/auth/activate",
  }),
} as const);
