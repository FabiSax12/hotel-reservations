"use server";

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
import { REGISTER_FIELDS } from "../constants/fields";

const RegisterSchema = z
  .object({
    fullName: z.string().min(2, "FULL_NAME_TOO_SHORT" satisfies ValidationKey),
    email: z.email("INVALID_EMAIL" satisfies ValidationKey),
    password: z.string().min(8, "PASSWORD_TOO_SHORT" satisfies ValidationKey),
    confirmPassword: z.string(),
  })
  .refine((d) => d.password === d.confirmPassword, {
    message: "PASSWORDS_DO_NOT_MATCH" satisfies ValidationKey,
    path: [REGISTER_FIELDS.CONFIRM_PASSWORD],
  });

export type ActionResult =
  | { success: false; fieldErrors: Partial<Record<string, ValidationKey[]>> }
  | { success: false; error: AuthErrorKey }
  | null;

export async function registerAction(
  _prevState: ActionResult,
  formData: FormData,
): Promise<ActionResult> {
  console.log("Register action called with:", {
    fullName: formData.get(REGISTER_FIELDS.FULL_NAME),
    email: formData.get(REGISTER_FIELDS.EMAIL),
    password: formData.get(REGISTER_FIELDS.PASSWORD) ? "******" : null,
    confirmPassword: formData.get(REGISTER_FIELDS.CONFIRM_PASSWORD) ? "******" : null,
  });

  const result = RegisterSchema.safeParse({
    fullName: formData.get(REGISTER_FIELDS.FULL_NAME),
    email: formData.get(REGISTER_FIELDS.EMAIL),
    password: formData.get(REGISTER_FIELDS.PASSWORD),
    confirmPassword: formData.get(REGISTER_FIELDS.CONFIRM_PASSWORD),
  });

  console.log("Validation result:", result);

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
    await signUp({ full_name: fullName, email, password }, supabase, redirectUrl);
  } catch (err) {
    const authErr = err as AuthError;
    if (authErr.code === "EMAIL_ALREADY_REGISTERED") {
      return { success: false, error: ERROR_KEYS[AUTH_ERRORS.EMAIL_ALREADY_REGISTERED] };
    }
    return { success: false, error: ERROR_KEYS[AUTH_ERRORS.UNKNOWN_ERROR] };
  }

  redirect(ROUTES.AUTH.VERIFY_EMAIL);
}
