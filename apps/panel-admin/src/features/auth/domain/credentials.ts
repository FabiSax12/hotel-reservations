import { EMAIL_REGEX } from "../constants/emailRules";
import type { AuthTexts } from "../i18n/authTexts.type";

export type LoginErrorKey = keyof AuthTexts["ERRORS"];
export type LoginActionState = { error: LoginErrorKey } | null;

export const createEmailValidator =
  (errorMessage: string) =>
  (value: string): string | null =>
    EMAIL_REGEX.test(value) ? null : errorMessage;
