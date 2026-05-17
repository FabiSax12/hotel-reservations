import {
  createSupabaseServerClient,
  createSupabaseServiceClient,
  DB_COLUMNS,
  DB_TABLES,
} from "@hotel/db";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { ROUTES } from "@/config/routes";
import { LOGIN_FORM_ERROR_KEYS } from "./features/auth/constants/loginFormErrorKeys";
import { LOGIN_FORM_SEARCH_PARAMS } from "./features/auth/constants/loginFormSearchParams";

export async function middleware(request: NextRequest) {
  const supabaseResponse = NextResponse.next({
    request,
  });

  const supabase = createSupabaseServerClient({
    getAll: () => request.cookies.getAll(),
    set: (name, value, options) => {
      request.cookies.set(name, value);
      supabaseResponse.cookies.set(name, value, options);
    },
  });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.redirect(new URL(ROUTES.AUTH.LOGIN, request.url));
  }

  // Check if the admin account has been deactivated
  const serviceClient = createSupabaseServiceClient();
  const { data: profile } = await serviceClient
    .from(DB_TABLES.PROFILES)
    .select(DB_COLUMNS.profiles.is_active)
    .eq("id", user.id)
    .single();

  if (profile && !profile.is_active) {
    const loginUrl = new URL(ROUTES.AUTH.LOGIN, request.url);
    loginUrl.searchParams.set(
      LOGIN_FORM_SEARCH_PARAMS.ERROR,
      LOGIN_FORM_ERROR_KEYS.ACCOUNT_DEACTIVATED,
    );
    return NextResponse.redirect(loginUrl);
  }

  return supabaseResponse;
}

export const config = {
  matcher: ["/admin/:path*"],
};
