export const ROUTES = Object.freeze({
  HOME: "/",
  AUTH: Object.freeze({
    LOGIN: "/auth/login",
    REGISTER: "/auth/register",
    VERIFY_EMAIL: "/auth/verify-email",
    ERROR: "/auth/error",
    CALLBACK: "/auth/callback",
  } as const),
} as const);
