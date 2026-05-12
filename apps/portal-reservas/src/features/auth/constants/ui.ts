/**
 * @file ui.ts — UI-related constants for the auth feature.
 */
 
export const INPUT_TYPES = {
  TEXT: "text",
  PASSWORD: "password",
  EMAIL: "email",
  HIDDEN: "hidden",
  BUTTON: "button",
  SUBMIT: "submit",
} as const;
 
export const AUTOCOMPLETE = {
  EMAIL: "email",
  CURRENT_PASSWORD: "current-password",
} as const;
 
export const BUTTON_UI = {
  VARIANT_GHOST: "ghost",
  SIZE_SM: "sm",
} as const;
 
export const ARIA_ROLES = {
  ALERT: "alert",
} as const;
 
export const OAUTH_PROVIDERS = {
  GOOGLE: "google",
} as const;