"use server";

import { createSupabaseServerClient } from "@hotel/db";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ROUTES } from "@/config/routes";
import { LOGIN_FIELDS } from "../constants/fields";
import { SUPABASE_ERROR_CODES } from "../constants/supabaseErrors";
import { ERROR_KEYS, AUTH_ERRORS } from "../constants/errors";
import type { LoginActionState } from "../domain/credentials";

export async function loginAction(
  _prevState: LoginActionState,
  formData: FormData,
): Promise<LoginActionState> {
  const email = formData.get(LOGIN_FIELDS.EMAIL) as string;
  const password = formData.get(LOGIN_FIELDS.PASSWORD) as string;
  const callbackUrl = formData.get(LOGIN_FIELDS.CALLBACK_URL) as string;

  const cookieStore = await cookies();
  const supabase = createSupabaseServerClient(cookieStore);

  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    if (error.code === SUPABASE_ERROR_CODES.EMAIL_NOT_CONFIRMED) {
      return { error: ERROR_KEYS[AUTH_ERRORS.EMAIL_NOT_CONFIRMED] };
    }
    return { error: ERROR_KEYS[AUTH_ERRORS.INVALID_CREDENTIALS] };
  }

  redirect(callbackUrl || ROUTES.HOME);
}
