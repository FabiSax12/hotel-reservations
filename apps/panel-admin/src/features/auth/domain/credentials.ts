import { EMAIL_REGEX } from "../constants/emailRules";
import type { LOGIN_FORM_ERROR_KEYS } from "../constants/loginFormErrorKeys";

export type LoginErrorKey = keyof typeof LOGIN_FORM_ERROR_KEYS;
export type LoginActionState = { error: LoginErrorKey } | null;

export const createEmailValidator =
  (errorMessage: string) =>
  (value: string): string | null =>
    EMAIL_REGEX.test(value) ? null : errorMessage;
