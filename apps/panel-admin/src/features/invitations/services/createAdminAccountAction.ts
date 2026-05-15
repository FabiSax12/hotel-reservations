"use server";

import { createAdminAccount } from "@hotel/core/auth";
import { ENV } from "@/config/env";
import { ROUTES } from "@/config/routes";
import type { CreateAdminActionState } from "@/features/invitations/domain/adminInvite";

export async function createAdminAccountAction(
  _prevState: CreateAdminActionState,
  formData: FormData,
): Promise<CreateAdminActionState> {
  const email = ((formData.get("email") as string) ?? "").trim();
  const full_name = ((formData.get("name") as string) ?? "").trim();

  try {
    await createAdminAccount(
      email,
      full_name,
      `${ENV.NEXT_PUBLIC_BASE_URL}${ROUTES.AUTH.ACTIVATE}`,
    );
    return { success: true, email };
  } catch {
    return { error: "UNKNOWN_ERROR" };
  }
}
