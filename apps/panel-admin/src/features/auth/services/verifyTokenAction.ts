"use server";

import { verifyActivationToken } from "@hotel/core/auth";
import type { VerifyTokenState } from "@/features/auth/domain/adminActivation";
import { ACTIVATION_ERRORS } from "@/features/auth/domain/adminActivation";

export async function verifyTokenAction(
  accessToken: string,
  refreshToken: string,
): Promise<VerifyTokenState> {
  try {
    const result = await verifyActivationToken(accessToken, refreshToken);
    if ("error" in result) return { error: result.error };
    return { success: true, email: result.email };
  } catch {
    return { error: ACTIVATION_ERRORS.UNKNOWN_ERROR };
  }
}
