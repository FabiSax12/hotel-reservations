"use server";

import { inviteAdminByEmail } from "@hotel/core/auth";
import { ENV } from "@/config/env";
import { ROUTES } from "@/config/routes";

export const createAdminAccount = async (email: string): Promise<void> => {
  await inviteAdminByEmail(email, `${ENV.BASE_URL}${ROUTES.ADMIN.ACTIVATE}`);
};
