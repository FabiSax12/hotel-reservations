"use server";

import { createAdminAccount } from "@hotel/core/auth";
import { ENV } from "@/config/env";
import { ROUTES } from "@/config/routes";

export const createAdminAccountAction = async (email: string): Promise<void> => {
  await createAdminAccount(email, `${ENV.NEXT_PUBLIC_BASE_URL}${ROUTES.AUTH.ACTIVATE}`);
};
