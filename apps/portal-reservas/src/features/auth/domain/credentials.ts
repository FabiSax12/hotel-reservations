import type { AuthTexts } from "../i18n/authTexts.type";

export type LoginErrorKey = keyof AuthTexts["ERRORS"];
export type LoginActionState = { error: LoginErrorKey } | null;

const EMAIL_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
const MIN_PASSWORD_LENGTH = 8;

export const createEmailValidator =
  (errorMessage: string) =>
  (value: string): string | null =>
    EMAIL_REGEX.test(value) ? null : errorMessage;

export const createPasswordValidator =
  (errorMessage: string) =>
  (value: string): string | null =>
    value.length >= MIN_PASSWORD_LENGTH ? null : errorMessage;
