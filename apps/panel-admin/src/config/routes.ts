export const ROUTES = Object.freeze({
  ADMIN: Object.freeze({
    LOGIN: "/admin/login",
    DASHBOARD: "/admin/dashboard",
    RESERVATIONS: "/admin/reservations",
    ACTIVATE: "/admin/activate",
  } as const),
} as const);
