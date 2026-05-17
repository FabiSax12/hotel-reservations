import { createSupabaseServerClient } from "@hotel/db";
import { cookies } from "next/headers";
import { type NextRequest, NextResponse } from "next/server";
import { ROUTES } from "@/config/routes";
import { CALLBACK_SEARCH_PARAMS } from "@/features/auth/constants/callback-search-params";

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get(CALLBACK_SEARCH_PARAMS.CODE);

  if (code) {
    const cookieStore = await cookies();
    const supabase = createSupabaseServerClient(cookieStore);
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      const callbackUrl = searchParams.get(CALLBACK_SEARCH_PARAMS.CALLBACK_URL) || ROUTES.HOME;
      return NextResponse.redirect(new URL(callbackUrl, origin));
    }
  }

  return NextResponse.redirect(new URL(ROUTES.AUTH.ERROR, origin));
}
