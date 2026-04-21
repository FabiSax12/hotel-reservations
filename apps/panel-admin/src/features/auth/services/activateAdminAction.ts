"use server";

import { completeAdminActivation } from "@hotel/core/auth";
import { redirect } from "next/navigation";
import { ROUTES } from "@/config/routes";
import { ACTIVATION_FORM_FIELDS } from "@/features/auth/constants/activationFormFields";
import type { ActivateAdminState } from "@/features/auth/domain/adminActivation";
import { ACTIVATION_ERRORS } from "@/features/auth/domain/adminActivation";

export async function activateAdminAction(
  _prevState: ActivateAdminState,
  formData: FormData,
): Promise<ActivateAdminState> {
  const accessToken = formData.get(ACTIVATION_FORM_FIELDS.ACCESS_TOKEN) as string;
  const refreshToken = formData.get(ACTIVATION_FORM_FIELDS.REFRESH_TOKEN) as string;
  const password = formData.get(ACTIVATION_FORM_FIELDS.PASSWORD) as string;
  const confirmPassword = formData.get(ACTIVATION_FORM_FIELDS.CONFIRM_PASSWORD) as string;

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
