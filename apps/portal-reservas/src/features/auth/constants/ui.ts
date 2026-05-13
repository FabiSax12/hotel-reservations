/**
 * @file ui.ts — UI-related constants for the auth feature.
 *
 * All magic strings for HTML input types, autocomplete values, button variants,
 * ARIA roles, and other UI attributes are centralized here.
 * Zero magic strings in component files.
 */

export const INPUT_TYPES = Object.freeze({
  TEXT: "text",
  PASSWORD: "password",
  EMAIL: "email",
  HIDDEN: "hidden",
  BUTTON: "button",
  SUBMIT: "submit",
} as const);

export const AUTOCOMPLETE = Object.freeze({
  EMAIL: "email",
  CURRENT_PASSWORD: "current-password",
  NEW_PASSWORD: "new-password",
  NAME: "name",
} as const);

export const BUTTON_UI = Object.freeze({
  VARIANT_GHOST: "ghost",
  VARIANT_PRIMARY: "primary",
  SIZE_SM: "sm",
} as const);

export const ARIA_ROLES = Object.freeze({
  ALERT: "alert",
} as const);

export const OAUTH_PROVIDERS = Object.freeze({
  GOOGLE: "google",
} as const);