import type { PermissionName } from "@hotel/db/types";

/**
 * Thrown when a user attempts an action they don't have permission for.
 */
export class PermissionDeniedError extends Error {
  readonly code = "PERMISSION_DENIED" as const;
  readonly permission: PermissionName | PermissionName[];

  constructor(permission: PermissionName | PermissionName[]) {
    const permStr = Array.isArray(permission) ? permission.join(", ") : permission;
    super(`Permission denied: ${permStr}`);
    this.name = "PermissionDeniedError";
    this.permission = permission;
  }
}

/**
 * Thrown when an unauthenticated user attempts a protected action.
 */
export class AuthenticationRequiredError extends Error {
  readonly code = "AUTHENTICATION_REQUIRED" as const;

  constructor() {
    super("Authentication required");
    this.name = "AuthenticationRequiredError";
  }
}

/**
 * Thrown when input validation fails.
 */
export class ValidationError extends Error {
  readonly code = "VALIDATION_ERROR" as const;
  readonly field: string | undefined;

  constructor(message: string, field?: string) {
    super(message);
    this.name = "ValidationError";
    this.field = field;
  }
}
