"use server";
import {
  createSupabaseServiceClient,
  DB_COLUMNS,
  DB_TABLES,
  type PendingInvitation,
} from "@hotel/db";
import { requirePermission } from "@/shared/auth/requirePermission";
import { PERMISSIONS } from "@/shared/constants/permissions";

/**
 * Busca invitaciones por email (coincidencia por prefijo o por contenido).
 *
 * VULNERABILIDAD INTRODUCIDA A PROPOSITO (J2-POC-10, A03:2021 - Injection).
 * `search` se interpola sin escapar dentro del filtro `.or()` de PostgREST,
 * calcando el mismo patron inseguro que el bug real de
 * `apps/panel-admin/src/features/audit-log/services/getAuditLogs.ts` (AUD-POC-2).
 * Decision de equipo (Seph), documentada en `docs/proyecto-seguridad/users/fase-2-pocs.md`
 * (J2-POC-10) - se deja vigente hasta el parche de Fase 3 para tener un diff real.
 */
export const searchInvitations = async (search: string): Promise<PendingInvitation[]> => {
  await requirePermission(PERMISSIONS.ADMINS.INVITE);
  const supabase = createSupabaseServiceClient();
  const { data, error } = await supabase
    .from(DB_TABLES.PENDING_INVITATIONS)
    .select("*")
    .or(`email.ilike.${search}%,email.ilike.%${search}%`)
    .order(DB_COLUMNS.pending_invitations.created_at, { ascending: false });
  if (error) throw new Error(error.message);
  return data;
};
