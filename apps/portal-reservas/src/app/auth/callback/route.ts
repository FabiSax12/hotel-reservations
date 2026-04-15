import { createSupabaseServerClient } from "@hotel/db";
import { cookies } from "next/headers";
import { type NextRequest, NextResponse } from "next/server";
import { ROUTES } from "@/config/routes";

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");

  if (code) {
    const cookieStore = await cookies();
    const supabase = createSupabaseServerClient(cookieStore);
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      return NextResponse.redirect(new URL(ROUTES.HOME, origin));
    }
  }

  return NextResponse.redirect(new URL(ROUTES.AUTH.ERROR, origin));
}
