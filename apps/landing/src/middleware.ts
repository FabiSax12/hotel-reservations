import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { resolveLocale } from "@/lib/resolveLocale";

export function middleware(request: NextRequest) {
  const locale = resolveLocale(request);

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-locale", locale);

  return NextResponse.next({ request: { headers: requestHeaders } });
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon\\.ico|api/).*)"],
};
