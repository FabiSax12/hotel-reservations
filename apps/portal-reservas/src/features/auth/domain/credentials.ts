/**
 * @file credentials.ts — Pure domain logic for credential validation.
 *
 * Factory functions that create validators returning `null` on success
 * or an error message string on failure. Used by login/register forms
 * for client-side validation before submission.
 *
 * No hooks, no JSX, no side effects — fully testable with Node.
 */

import type { AuthTexts } from "../i18n/authTexts.type";

/** Type for login error keys derived from the i18n AuthTexts type. */
export type LoginErrorKey = keyof AuthTexts["ERRORS"];

/** Return type for the login server action: null on success, error key on failure. */
export type LoginActionState = { error: LoginErrorKey } | null;

/** Standard email regex — matches user@domain.tld format. */
const EMAIL_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

/** Minimum password length enforced by the registration form. */
const MIN_PASSWORD_LENGTH = 8;

/**
 * Creates an email validator function.
 * Returns null if the email matches the regex, or the provided error message if not.
 *
 * @param errorMessage - The i18n error message to return on validation failure.
 * @returns A validator function: (value: string) => string | null.
 */
export const createEmailValidator =
  (errorMessage: string) =>
  (value: string): string | null =>
    EMAIL_REGEX.test(value) ? null : errorMessage;

/**
 * Creates a password validator function.
 * Returns null if the password meets the minimum length, or the error message if not.
 *
 * @param errorMessage - The i18n error message to return on validation failure.
 * @returns A validator function: (value: string) => string | null.
 */
export const createPasswordValidator =
  (errorMessage: string) =>
  (value: string): string | null =>
    value.trim().length >= MIN_PASSWORD_LENGTH ? null : errorMessage;
