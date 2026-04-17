import type { AuthTexts } from "@/features/auth/i18n/authTexts.type";

export enum AUTH_ERRORS {
  EMAIL_ALREADY_REGISTERED,
  UNKNOWN_ERROR,
}

export type AuthErrorKey = keyof AuthTexts["ERRORS"];
export type ValidationKey = keyof AuthTexts["VALIDATION"];

export const ERROR_KEYS: Record<AUTH_ERRORS, AuthErrorKey> = {
  [AUTH_ERRORS.EMAIL_ALREADY_REGISTERED]: "EMAIL_ALREADY_REGISTERED",
  [AUTH_ERRORS.UNKNOWN_ERROR]: "UNKNOWN_ERROR",
};
