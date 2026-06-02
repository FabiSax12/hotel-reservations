"use server";

/**
 * @file signUp-action.ts — Server Action for user registration.
 *
 * Called by RegisterForm via React 19's useActionState. Handles:
 * 1. Zod validation: name >= 2 chars, valid email, password >= 8 chars + criteria, passwords match.
 * 2. On validation failure: returns structured fieldErrors for per-field display.
 * 3. On success: delegates to @hotel/core's signUp() which creates the Supabase auth user.
 * 4. On auth error: maps EMAIL_ALREADY_REGISTERED to an i18n key.
 *
 * On success, redirects to the verify-email page.
 */

import type { AuthError } from "@hotel/core/auth";
import { signUp } from "@hotel/core/auth";
import { createSupabaseServerClient } from "@hotel/db";
import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";
import { ENV } from "@/config/env";
import { ROUTES } from "@/config/routes";
import type { AuthErrorKey, ValidationKey } from "@/features/auth/constants/errors";
import { AUTH_ERRORS, ERROR_KEYS } from "@/features/auth/constants/errors";
import { REGISTER_FORM_FIELDS } from "../constants/registerFormFields";
import { checkPasswordCriteria } from "../utils/checkPasswordCriteria";
import { isPasswordValid } from "../utils/isPasswordValid";

/**
 * Zod schema for registration form validation.
 * Each validation message is a typed i18n key (ValidationKey) for compile-time safety.
 */
const RegisterSchema = z
  .object({
    fullName: z.string().min(2, "FULL_NAME_TOO_SHORT" satisfies ValidationKey),
    email: z.email("INVALID_EMAIL" satisfies ValidationKey),
    password: z
      .string()
      .min(8, "PASSWORD_TOO_SHORT" satisfies ValidationKey)
      .refine((p) => isPasswordValid(checkPasswordCriteria(p)), {
        message: "PASSWORD_WEAK" satisfies ValidationKey,
      }),
    confirmPassword: z.string(),
  })
  // Cross-field validation: passwords must match.
  .refine((d) => d.password === d.confirmPassword, {
    message: "PASSWORDS_DO_NOT_MATCH" satisfies ValidationKey,
    path: [REGISTER_FORM_FIELDS.CONFIRM_PASSWORD],
  });

/**
 * Return type for the register action.
 * - fieldErrors: per-field validation errors (Zod)
 * - error: global auth-level error (e.g., EMAIL_ALREADY_REGISTERED)
 */
export type ActionResult =
  | { success: false; fieldErrors: Partial<Record<string, ValidationKey[]>> }
  | { success: false; error: AuthErrorKey }
  | null;

export async function registerAction(
  _prevState: ActionResult,
  formData: FormData,
): Promise<ActionResult> {
  // Validate form data against the Zod schema.
  const result = RegisterSchema.safeParse({
    fullName: formData.get(REGISTER_FORM_FIELDS.FULL_NAME),
    email: formData.get(REGISTER_FORM_FIELDS.EMAIL),
    password: formData.get(REGISTER_FORM_FIELDS.PASSWORD),
    confirmPassword: formData.get(REGISTER_FORM_FIELDS.CONFIRM_PASSWORD),
  });

  if (!result.success) {
    return {
      success: false,
      fieldErrors: result.error.flatten().fieldErrors as Partial<Record<string, ValidationKey[]>>,
    };
  }

  const { fullName, email, password } = result.data;

  const cookieStore = await cookies();
  const supabase = createSupabaseServerClient(cookieStore);
  const origin = (await headers()).get("origin") ?? ENV.APP_URL;
  const redirectUrl = `${origin}${ROUTES.AUTH.CALLBACK}`;

  try {
    // Delegate to @hotel/core's signUp — creates the Supabase auth user.
    await signUp({ full_name: fullName, email, password }, supabase, redirectUrl);
  } catch (err) {
    const authErr = err as AuthError;
    if (authErr.code === "EMAIL_ALREADY_REGISTERED") {
      return { success: false, error: ERROR_KEYS[AUTH_ERRORS.EMAIL_ALREADY_REGISTERED] };
    }
    return { success: false, error: ERROR_KEYS[AUTH_ERRORS.UNKNOWN_ERROR] };
  }

  // Success: redirect to verify-email page.
  redirect(ROUTES.AUTH.VERIFY_EMAIL);
}
