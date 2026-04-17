export const LOCALES = Object.freeze({
  ES: "es",
  EN: "en",
} as const);

export type SupportedLocale = (typeof LOCALES)[keyof typeof LOCALES];
