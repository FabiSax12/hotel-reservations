export const ROUTES = Object.freeze({
  HOME: "/",
  ADMIN: Object.freeze({
    LOGIN: "/admin/login",
    DASHBOARD: "/admin/dashboard",
    RESERVATIONS: "/admin/reservations",
  } as const),
} as const);
