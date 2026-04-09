import { describe, expect, it } from "vitest";
import { validateEmail, validatePassword } from "./credentials";

describe("validateEmail", () => {
  it("returns null for a valid email", () => {
    expect(validateEmail("admin@hotel.com")).toBeNull();
  });

  it("returns an error string for an email without @", () => {
    expect(validateEmail("notanemail")).toBe("Please enter a valid email address");
  });

  it("returns an error string for an email without domain", () => {
    expect(validateEmail("admin@")).toBe("Please enter a valid email address");
  });

  it("returns an error string for an empty string", () => {
    expect(validateEmail("")).toBe("Please enter a valid email address");
  });
});

describe("validatePassword", () => {
  it("returns null for a password with 8 characters", () => {
    expect(validatePassword("12345678")).toBeNull();
  });

  it("returns null for a password longer than 8 characters", () => {
    expect(validatePassword("averylongpassword")).toBeNull();
  });

  it("returns an error string for a password shorter than 8 characters", () => {
    expect(validatePassword("1234567")).toBe("La contraseña debe tener al menos 8 caracteres");
  });

  it("returns an error string for an empty password", () => {
    expect(validatePassword("")).toBe("La contraseña debe tener al menos 8 caracteres");
  });
});
