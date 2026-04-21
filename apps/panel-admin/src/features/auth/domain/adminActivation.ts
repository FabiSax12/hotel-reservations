import type { AuthTexts } from "../i18n/authTexts.type";

export type ActivateAdminErrorKey = keyof AuthTexts["ACTIVATE"]["ERRORS"];

export const ACTIVATION_ERRORS = Object.freeze({
  INVALID_TOKEN: "INVALID_TOKEN",
  EXPIRED_TOKEN: "EXPIRED_TOKEN",
  PASSWORDS_DONT_MATCH: "PASSWORDS_DONT_MATCH",
  UNKNOWN_ERROR: "UNKNOWN_ERROR",
  CONTACT_ADMIN: "CONTACT_ADMIN",
} as const satisfies Record<ActivateAdminErrorKey, ActivateAdminErrorKey>);

export type VerifyTokenState =
  | null
  | { success: true; email: string }
  | { error: ActivateAdminErrorKey };

export type ActivateAdminState =
  | null
  | { success: true }
  | { error: ActivateAdminErrorKey };

export const isVerifySuccess = (
  state: VerifyTokenState,
): state is { success: true; email: string } => state !== null && "success" in state;

export const isActivateSuccess = (
  state: ActivateAdminState,
): state is { success: true } => state !== null && "success" in state;
