import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const SUPPORTED_LOCALES = ["es", "en"] as const;
type Locale = (typeof SUPPORTED_LOCALES)[number];

function resolveLocale(request: NextRequest): Locale {
  // 1. Cookie set explicitly by a locale switcher
  const cookie = request.cookies.get("locale")?.value;
  if (cookie && (SUPPORTED_LOCALES as readonly string[]).includes(cookie)) {
    return cookie as Locale;
  }

  // 2. Browser Accept-Language header
  const accept = request.headers.get("accept-language");
  if (accept) {
    const lang = accept.split(",")[0]?.split("-")[0]?.trim();
    if (lang && (SUPPORTED_LOCALES as readonly string[]).includes(lang)) {
      return lang as Locale;
    }
  }

  return "es";
}

export function middleware(request: NextRequest) {
  const locale = resolveLocale(request);

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-locale", locale);
  // Future: requestHeaders.set("x-hotel-id", resolveHotelFromDomain(request));

  return NextResponse.next({ request: { headers: requestHeaders } });
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon\\.ico|api/).*)"],
};
