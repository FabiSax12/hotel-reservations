"use server";

import { completeAdminActivation } from "@hotel/core/auth";
import { redirect } from "next/navigation";
import { ROUTES } from "@/config/routes";
import type { ActivateAdminState } from "@/features/auth/domain/adminActivation";
import { ACTIVATION_ERRORS } from "@/features/auth/domain/adminActivation";

export async function activateAdminAction(
  _prevState: ActivateAdminState,
  formData: FormData,
): Promise<ActivateAdminState> {
  const accessToken = formData.get("access_token") as string;
  const refreshToken = formData.get("refresh_token") as string;
  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirm_password") as string;

  if (password !== confirmPassword) {
    return { error: ACTIVATION_ERRORS.PASSWORDS_DONT_MATCH };
  }

  try {
    await completeAdminActivation(accessToken, refreshToken, password);
  } catch {
    return { error: ACTIVATION_ERRORS.UNKNOWN_ERROR };
  }

  redirect(ROUTES.ADMIN.LOGIN);
}
