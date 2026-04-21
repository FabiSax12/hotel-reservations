import type { SupabaseServerClient } from "@hotel/db";
import { createSupabaseServerActionClient, createSupabaseServiceClient } from "@hotel/db";
import type { AdminUser } from "@hotel/db/types";
import type { ActivationErrorCode } from "./config/constants";
import { ACTIVATION_ERROR_CODES, AUTH_COLUMNS, AUTH_ROLES, AUTH_TABLE } from "./config/constants";

export type RegisterPayload = {
  email: string;
  password: string;
  full_name: string;
};

export type AuthError =
  | { code: "EMAIL_ALREADY_REGISTERED" }
  | { code: "UNKNOWN_ERROR"; message: string };

export async function signInWithPassword(email: string, password: string) {
  const supabase = createSupabaseServerActionClient();
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) throw new Error(error.message);
  return data;
}

export async function signOut() {
  const supabase = createSupabaseServerActionClient();
  const { error } = await supabase.auth.signOut();
  if (error) throw new Error(error.message);
}

export async function getSession() {
  const supabase = createSupabaseServerActionClient();
  const { data, error } = await supabase.auth.getSession();
  if (error) throw new Error(error.message);
  return data;
}

export async function signUp(
  payload: RegisterPayload,
  supabase: SupabaseServerClient,
  redirectUrl?: string,
): Promise<{ success: true }> {
  const { data, error } = await supabase.auth.signUp({
    email: payload.email,
    password: payload.password,
    options: {
      data: {
        full_name: payload.full_name,
        phone: null,
      },
      emailRedirectTo: redirectUrl,
    },
  });

  if (error) {
    if (error.code === "user_already_exists") {
      throw { code: "EMAIL_ALREADY_REGISTERED" } satisfies AuthError;
    }
    throw { code: "UNKNOWN_ERROR", message: error.message } satisfies AuthError;
  }

  const userId = data.user?.id;
  if (!userId) {
    throw { code: "UNKNOWN_ERROR", message: "User creation returned no ID" } satisfies AuthError;
  }

  if (!data.user?.identities || data.user.identities.length === 0) {
    throw { code: "EMAIL_ALREADY_REGISTERED" } satisfies AuthError;
  }

  return { success: true };
}

export async function inviteAdminByEmail(email: string, redirectTo: string): Promise<void> {
  const supabase = createSupabaseServiceClient();
  const { error } = await supabase.auth.admin.inviteUserByEmail(email, { redirectTo });
  if (error) throw new Error(error.message);
}

export type ActivationTokenResult =
  | { userId: string; email: string }
  | { error: ActivationErrorCode };

export async function verifyActivationToken(
  accessToken: string,
  refreshToken: string,
): Promise<ActivationTokenResult> {
  const supabase = createSupabaseServerActionClient();
  const { data, error } = await supabase.auth.setSession({
    access_token: accessToken,
    refresh_token: refreshToken,
  });

  if (error || !data.user) {
    return { error: ACTIVATION_ERROR_CODES.INVALID_TOKEN };
  }

  return { userId: data.user.id, email: data.user.email ?? "" };
}

export async function completeAdminActivation(
  accessToken: string,
  refreshToken: string,
  password: string,
): Promise<void> {
  const supabase = createSupabaseServerActionClient();

  const { data: sessionData, error: sessionError } = await supabase.auth.setSession({
    access_token: accessToken,
    refresh_token: refreshToken,
  });

  if (sessionError || !sessionData.user) {
    throw new Error("Invalid or expired activation token");
  }

  const { error: updateError } = await supabase.auth.updateUser({ password });
  if (updateError) throw new Error(updateError.message);

  const serviceClient = createSupabaseServiceClient();
  const { error: roleError } = await serviceClient
    .from(AUTH_TABLE)
    .update({ [AUTH_COLUMNS.ROLE]: AUTH_ROLES.ADMIN, [AUTH_COLUMNS.IS_ACTIVE]: true })
    .eq(AUTH_COLUMNS.ID, sessionData.user.id);

  if (roleError) throw new Error(roleError.message);
}

export async function verifyAdminRole(userId: string): Promise<AdminUser | null> {
  const supabase = createSupabaseServiceClient();

  const { data, error } = await supabase
    .from(AUTH_TABLE)
    .select(
      `${AUTH_COLUMNS.ID}, ${AUTH_COLUMNS.EMAIL}, ${AUTH_COLUMNS.ROLE}, ${AUTH_COLUMNS.IS_ACTIVE}`,
    )
    .eq(AUTH_COLUMNS.ID, userId)
    .single();

  if (error) throw new Error(error.message);

  if (data.role === AUTH_ROLES.ADMIN && data.is_active) {
    return data as AdminUser;
  }

  return null;
}
