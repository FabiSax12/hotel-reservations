"use server";

import { AUDIT_ACTIONS, AUDIT_ENTITIES } from "@hotel/core/audit";
import { getAuditRequestContext, logAuditEvent } from "@hotel/core/audit/server";
import { createAdminAccount, getVerifiedSession } from "@hotel/core/auth";
import { createSupabaseServerClient } from "@hotel/db";
import { cookies } from "next/headers";
import { ENV } from "@/config/env";
import { ROUTES } from "@/config/routes";
import type { CreateAdminActionState } from "@/features/invitations/domain/adminInvite";
import { requirePermission } from "@/shared/auth/requirePermission";
import { PERMISSIONS } from "@/shared/constants/permissions";

export async function createAdminAccountAction(
  _prevState: CreateAdminActionState,
  formData: FormData,
): Promise<CreateAdminActionState> {
  // Server Actions are public endpoints: without this guard anyone could invite
  // (and, via promote_invited_admin, create) an admin (AUTH-POC-1 chain, P3.1).
  try {
    await requirePermission(PERMISSIONS.ADMINS.INVITE);
  } catch {
    return { error: "UNKNOWN_ERROR" };
  }

  const email = ((formData.get("email") as string) ?? "").trim();
  const full_name = ((formData.get("name") as string) ?? "").trim();

  // VULNERABILIDAD INTRODUCIDA A PROPOSITO (J2-POC-11, A08/A09 - Audit
  // Poisoning / Log Injection). Debug log temporal que imprime full_name/email
  // crudos a stdout, ANTES del saneamiento que logAuditEvent SI aplica mas
  // abajo (sanitizeAuditText/sanitizeAuditMetadata). Mismo patron real que
  // AUTH-POC-6 (loginAction.ts, modulo de Autenticacion) pero introducido a
  // proposito aqui, en Usuarios, para poder demostrarlo en este modulo. Ver
  // nota metodologica en users/fase-2-pocs.md (J2-POC-11) - se deja vigente
  // hasta el parche de Fase 3.
  console.log(`[invitations] creating admin account for ${full_name} <${email}>`);

  try {
    await createAdminAccount(
      email,
      `${ENV.NEXT_PUBLIC_BASE_URL}${ROUTES.AUTH.ACTIVATE}`,
      full_name,
    );

    // J3.4: audit who sent the invitation.
    const cookieStore = await cookies();
    const { user } = await getVerifiedSession(createSupabaseServerClient(cookieStore));
    const { ipAddress, userAgent } = await getAuditRequestContext();
    await logAuditEvent({
      actorId: user?.id ?? null,
      actorEmail: user?.email ?? null,
      action: AUDIT_ACTIONS.USER_INVITED,
      entity: AUDIT_ENTITIES.USER,
      entityId: null,
      metadata: { email, full_name },
      ipAddress,
      userAgent,
    });

    return { success: true, email };
  } catch {
    return { error: "UNKNOWN_ERROR" };
  }
}
