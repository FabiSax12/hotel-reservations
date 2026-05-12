"use server";

import type { CreateAdminActionState } from "@/features/invitations/domain/adminInvite";
import { createAdminAccount } from "../../auth/services/createAdminAccount";

export async function createAdminAccountAction(
  _prevState: CreateAdminActionState,
  formData: FormData,
): Promise<CreateAdminActionState> {
  const email = ((formData.get("email") as string) ?? "").trim();

  try {
    await createAdminAccount(email);
    return { success: true, email };
  } catch {
    return { error: "UNKNOWN_ERROR" };
  }
}
