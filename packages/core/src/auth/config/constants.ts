export const AUTH_ROLES = Object.freeze({
  ADMIN: "admin",
  OWNER: "owner",
  CLIENT: "client",
} as const);

export const ACTIVATION_ERROR_CODES = Object.freeze({
  INVALID_TOKEN: "INVALID_TOKEN",
  EXPIRED_TOKEN: "EXPIRED_TOKEN",
  INVALID_OR_EXPIRED_TOKEN: "INVALID_OR_EXPIRED_TOKEN",
} as const);

export type ActivationErrorCode =
  (typeof ACTIVATION_ERROR_CODES)[keyof typeof ACTIVATION_ERROR_CODES];

export type AuthRole = (typeof AUTH_ROLES)[keyof typeof AUTH_ROLES];

export const AUTH_TABLE = "profiles" as const;

export const AUTH_COLUMNS = Object.freeze({
  ID: "id",
  EMAIL: "email",
  ROLE: "role",
  IS_ACTIVE: "is_active",
} as const);
