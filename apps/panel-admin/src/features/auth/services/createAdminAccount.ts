"use server";

import { inviteAdminByEmail } from "@hotel/core/auth";
import { createSupabaseServiceClient } from "@hotel/db";
import { ENV } from "@/config/env";
import { ROUTES } from "@/config/routes";

export const createAdminAccount = async (email: string): Promise<void> => {
  await inviteAdminByEmail(email, `${ENV.NEXT_PUBLIC_BASE_URL}${ROUTES.AUTH.ACTIVATE}`);

  const supabase = createSupabaseServiceClient();
  const { error } = await supabase.from("pending_invitations").insert({ email });

  if (error) {
    console.error("Failed to record invitation:", error.message);
  }
};
