"use server";

import type { AuthError } from "@hotel/core/auth";
import { signUp } from "@hotel/core/auth";
import { createSupabaseServerClient } from "@hotel/db";
import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";
import { ENV } from "@/config/env";
import { ROUTES } from "@/config/routes";
import { AUTH_ERRORS, ERROR_MESSAGES } from "@/features/auth/constants/errors";
import { REGISTER_FIELDS } from "../constants/fields";

const RegisterSchema = z
  .object({
    fullName: z.string().min(2),
    email: z.email(),
    password: z.string().min(8),
    confirmPassword: z.string(),
  })
  .refine((d) => d.password === d.confirmPassword, {
    message: "Las contraseñas no coinciden",
    path: [REGISTER_FIELDS.CONFIRM_PASSWORD],
  });

export type ActionResult =
  | { success: false; fieldErrors: Partial<Record<string, string[]>> }
  | { success: false; error: string }
  | null;

export async function registerAction(
  _prevState: ActionResult,
  formData: FormData,
): Promise<ActionResult> {
  const result = RegisterSchema.safeParse({
    fullName: formData.get(REGISTER_FIELDS.FULL_NAME),
    email: formData.get(REGISTER_FIELDS.EMAIL),
    password: formData.get(REGISTER_FIELDS.PASSWORD),
    confirmPassword: formData.get(REGISTER_FIELDS.CONFIRM_PASSWORD),
  });

  if (!result.success) {
    return { success: false, fieldErrors: result.error.flatten().fieldErrors };
  }

  const { fullName, email, password } = result.data;

  const cookieStore = await cookies();
  const supabase = createSupabaseServerClient(cookieStore);
  const origin = (await headers()).get("origin") ?? ENV.APP_URL;
  const redirectUrl = `${origin}${ROUTES.AUTH.CALLBACK}`;

  try {
    await signUp({ full_name: fullName, email, password }, supabase, redirectUrl);
  } catch (err) {
    const authErr = err as AuthError;
    if (authErr.code === "EMAIL_ALREADY_REGISTERED") {
      return {
        success: false,
        error: ERROR_MESSAGES[AUTH_ERRORS.EMAIL_ALREADY_REGISTERED],
      };
    }
    return { success: false, error: ERROR_MESSAGES[AUTH_ERRORS.UNKNOWN_ERROR] };
  }

  redirect(ROUTES.AUTH.VERIFY_EMAIL);
}
