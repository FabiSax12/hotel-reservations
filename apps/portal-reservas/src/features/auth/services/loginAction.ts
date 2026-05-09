"use server";

import { createSupabaseServerClient } from "@hotel/db";
import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import { ENV } from "@/config/env";
import { ROUTES } from "@/config/routes";
import { AUTH_ERRORS, ERROR_KEYS } from "../constants/errors";
import { LOGIN_FORM_FIELDS } from "../constants/loginFormFields";
import { SUPABASE_ERROR_CODES } from "../constants/supabaseErrors";
import type { LoginActionState } from "../domain/credentials";

export async function loginAction(
  _prevState: LoginActionState,
  formData: FormData,
): Promise<LoginActionState> {
  const email = formData.get(LOGIN_FORM_FIELDS.EMAIL) as string;
  const password = formData.get(LOGIN_FORM_FIELDS.PASSWORD) as string;
  const callbackUrl = formData.get(LOGIN_FORM_FIELDS.CALLBACK_URL) as string;

  const cookieStore = await cookies();
  const supabase = createSupabaseServerClient(cookieStore);

  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    if (error.code === SUPABASE_ERROR_CODES.EMAIL_NOT_CONFIRMED) {
      const origin = (await headers()).get("origin") ?? ENV.APP_URL;
      const redirectUrl = `${origin}${ROUTES.AUTH.CALLBACK}`;
      const response = await supabase.auth.resend({
        type: "signup",
        email: email,
        options: { emailRedirectTo: redirectUrl },
      });
      if (!response.error) redirect(ROUTES.AUTH.VERIFY_EMAIL);

      // Rate limit error: code=over_email_send_rate_limit, status=429
      if (response.error.code === "over_email_send_rate_limit") {
        return { error: ERROR_KEYS[AUTH_ERRORS.VERIFY_EMAIL_RATE_LIMIT] };
      }

      return { error: ERROR_KEYS[AUTH_ERRORS.UNKNOWN_ERROR] };
    }
    return { error: ERROR_KEYS[AUTH_ERRORS.INVALID_CREDENTIALS] };
  }

  redirect(callbackUrl || ROUTES.HOME);
}
