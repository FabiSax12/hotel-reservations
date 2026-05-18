import type { NextRequest } from "next/server";

const SUPPORTED_LOCALES = ["es", "en"] as const;
type Locale = (typeof SUPPORTED_LOCALES)[number];

export function resolveLocale(request: NextRequest): Locale {
  const cookie = request.cookies.get("locale")?.value;
  if (cookie && (SUPPORTED_LOCALES as readonly string[]).includes(cookie)) {
    return cookie as Locale;
  }

  const accept = request.headers.get("accept-language");
  if (accept) {
    const lang = accept.split(",")[0]?.split("-")[0]?.trim();
    if (lang && (SUPPORTED_LOCALES as readonly string[]).includes(lang)) {
      return lang as Locale;
    }
  }

  return "es";
}
