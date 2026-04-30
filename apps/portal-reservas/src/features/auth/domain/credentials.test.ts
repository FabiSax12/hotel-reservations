import { describe, expect, it } from "vitest";
import { createEmailValidator, createPasswordValidator } from "./credentials";

const EMAIL_ERROR = "invalid email";
const PASSWORD_ERROR = "password too short";

const validateEmail = createEmailValidator(EMAIL_ERROR);
const validatePassword = createPasswordValidator(PASSWORD_ERROR);

describe("createEmailValidator", () => {
  it("returns null for a valid email", () => {
    expect(validateEmail("user@example.com")).toBeNull();
  });

  it("returns the error message for an email without @", () => {
    expect(validateEmail("notanemail")).toBe(EMAIL_ERROR);
  });

  it("returns the error message for an email without domain", () => {
    expect(validateEmail("user@")).toBe(EMAIL_ERROR);
  });

  it("returns the error message for an empty string", () => {
    expect(validateEmail("")).toBe(EMAIL_ERROR);
  });
});

describe("createPasswordValidator", () => {
  it("returns null for a password with 8 characters", () => {
    expect(validatePassword("12345678")).toBeNull();
  });

  it("returns null for a password longer than 8 characters", () => {
    expect(validatePassword("averylongpassword")).toBeNull();
  });

  it("returns the error message for a password shorter than 8 characters", () => {
    expect(validatePassword("1234567")).toBe(PASSWORD_ERROR);
  });

  it("returns the error message for an empty password", () => {
    expect(validatePassword("")).toBe(PASSWORD_ERROR);
  });
});
