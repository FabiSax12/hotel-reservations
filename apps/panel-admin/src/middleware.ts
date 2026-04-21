import { createSupabaseServerClient } from "@hotel/db";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { ROUTES } from "@/config/routes";

export async function middleware(request: NextRequest) {
  const response = NextResponse.next({
    request: { headers: request.headers },
  });

  const supabase = createSupabaseServerClient({
    getAll: () => request.cookies.getAll(),
    set: (name, value, options) => response.cookies.set(name, value, options),
  });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const isLoginPage = request.nextUrl.pathname === ROUTES.ADMIN.LOGIN;
  const isActivatePage = request.nextUrl.pathname === ROUTES.ADMIN.ACTIVATE;

  if (!user && !isLoginPage && !isActivatePage) {
    return NextResponse.redirect(new URL(ROUTES.ADMIN.LOGIN, request.url));
  }

  return response;
}

export const config = {
  matcher: ["/admin/:path*"],
};
