"use server";

import { inviteAdminByEmail } from "@hotel/core/auth";
import { createSupabaseServiceClient, DB_COLUMNS, DB_ENUMS, DB_TABLES } from "@hotel/db";
import { ENV } from "@/config/env";
import { ROUTES } from "@/config/routes";
import type { CreateInvitationActionState } from "../domain/invitation.types";

export async function createInvitationAction(
  _prevState: CreateInvitationActionState,
  formData: FormData,
): Promise<CreateInvitationActionState> {
  const email = ((formData.get("email") as string) ?? "").trim().toLowerCase();

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { error: "INVALID_EMAIL" };
  }

  const supabase = createSupabaseServiceClient();

  const { data: existing, error: checkError } = await supabase
    .from(DB_TABLES.PENDING_INVITATIONS)
    .select(DB_COLUMNS.pending_invitations.id)
    .eq(DB_COLUMNS.pending_invitations.email, email)
    .eq(DB_COLUMNS.pending_invitations.status, DB_ENUMS.invitation_status.pending)
    .maybeSingle();

  if (checkError) return { error: "UNKNOWN_ERROR" };
  if (existing) return { error: "EMAIL_ALREADY_INVITED" };

  try {
    const invitedUser = await inviteAdminByEmail(
      email,
      `${ENV.NEXT_PUBLIC_BASE_URL}${ROUTES.AUTH.ACTIVATE}`,
    );

    const { error: insertError } = await supabase.from(DB_TABLES.PENDING_INVITATIONS).insert({
      email,
      user_id: invitedUser.id,
    });

    if (insertError) throw new Error(insertError.message);

    return { success: true, email };
  } catch {
    return { error: "UNKNOWN_ERROR" };
  }
}
