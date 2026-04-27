"use server";

import type { CreateAdminActionState } from "@/features/auth/domain/adminInvite";
import { createAdminAccount } from "./createAdminAccount";

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
