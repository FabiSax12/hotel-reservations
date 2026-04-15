"use server";

import type { AuthError } from "@hotel/core/auth";
import { signUp } from "@hotel/core/auth";
import { createSupabaseServerClient } from "@hotel/db";
import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";
import { ROUTES } from "@/config/routes";

const RegisterSchema = z
  .object({
    fullName: z.string().min(2),
    email: z.email(),
    password: z.string().min(8),
    confirmPassword: z.string(),
  })
  .refine((d) => d.password === d.confirmPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmPassword"],
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
    fullName: formData.get("fullName"),
    email: formData.get("email"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
  });

  if (!result.success) {
    return { success: false, fieldErrors: result.error.flatten().fieldErrors };
  }

  const { fullName, email, password } = result.data;

  const cookieStore = await cookies();
  const supabase = createSupabaseServerClient(cookieStore);
  const origin = (await headers()).get("origin") ?? "http://localhost:3001";
  const redirectUrl = `${origin}${ROUTES.AUTH.CALLBACK}`;

  try {
    await signUp({ full_name: fullName, email, password }, supabase, redirectUrl);
  } catch (err) {
    const authErr = err as AuthError;
    if (authErr.code === "EMAIL_ALREADY_REGISTERED") {
      return {
        success: false,
        error: "Si este email no está registrado, recibirás un correo de verificación.",
      };
    }
    console.error("Error during registration:", err);
    return { success: false, error: "Ocurrió un error inesperado. Intente nuevamente." };
  }

  redirect(ROUTES.AUTH.VERIFY_EMAIL);
}
