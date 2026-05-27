import { describe, expect, it } from "vitest";
import { AUTH_ROLES } from "../config/constants";
import { hasRole, isAdminUser } from "./utils";

describe("hasRole", () => {
  it("returns false for null profile", () => {
    expect(hasRole(null, [AUTH_ROLES.ADMIN, AUTH_ROLES.OWNER])).toBe(false);
  });

  it("returns false for undefined role", () => {
    expect(hasRole({ role: undefined }, [AUTH_ROLES.ADMIN, AUTH_ROLES.OWNER])).toBe(false);
  });

  it("returns false for missing role property", () => {
    expect(hasRole({}, [AUTH_ROLES.ADMIN, AUTH_ROLES.OWNER])).toBe(false);
  });

  it("returns true for owner in [ADMIN, OWNER]", () => {
    expect(hasRole({ role: AUTH_ROLES.OWNER }, [AUTH_ROLES.ADMIN, AUTH_ROLES.OWNER])).toBe(true);
  });

  it("returns true for admin in [ADMIN, OWNER]", () => {
    expect(hasRole({ role: AUTH_ROLES.ADMIN }, [AUTH_ROLES.ADMIN, AUTH_ROLES.OWNER])).toBe(true);
  });

  it("returns false for client in [ADMIN, OWNER]", () => {
    expect(hasRole({ role: AUTH_ROLES.CLIENT }, [AUTH_ROLES.ADMIN, AUTH_ROLES.OWNER])).toBe(false);
  });

  it("returns false for uppercase OWNER", () => {
    expect(hasRole({ role: "OWNER" }, [AUTH_ROLES.ADMIN, AUTH_ROLES.OWNER])).toBe(false);
  });
});

describe("isAdminUser", () => {
  it("returns true for active owner", () => {
    expect(
      isAdminUser({ id: "1", email: "o@h.com", role: AUTH_ROLES.OWNER, is_active: true }),
    ).toBe(true);
  });

  it("returns true for active admin", () => {
    expect(
      isAdminUser({ id: "1", email: "a@h.com", role: AUTH_ROLES.ADMIN, is_active: true }),
    ).toBe(true);
  });

  it("returns false for inactive owner", () => {
    expect(
      isAdminUser({ id: "1", email: "o@h.com", role: AUTH_ROLES.OWNER, is_active: false }),
    ).toBe(false);
  });

  it("returns false for inactive admin", () => {
    expect(
      isAdminUser({ id: "1", email: "a@h.com", role: AUTH_ROLES.ADMIN, is_active: false }),
    ).toBe(false);
  });

  it("returns false for client", () => {
    expect(isAdminUser({ id: "1", full_name: "C", phone: null, created_at: "" })).toBe(false);
  });

  it("returns false for null profile", () => {
    expect(isAdminUser(null)).toBe(false);
  });
});
