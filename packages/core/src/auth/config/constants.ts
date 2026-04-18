export const AUTH_ROLES = Object.freeze({
  ADMIN: "admin",
  CLIENT: "client",
} as const);

export type AuthRole = (typeof AUTH_ROLES)[keyof typeof AUTH_ROLES];

export const AUTH_TABLE = "users" as const;

export const AUTH_COLUMNS = Object.freeze({
  ID: "id",
  EMAIL: "email",
  ROLE: "role",
  IS_ACTIVE: "is_active",
} as const);
