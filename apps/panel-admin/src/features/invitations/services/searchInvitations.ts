"use server";
import {
  createSupabaseServiceClient,
  DB_COLUMNS,
  DB_TABLES,
  type PendingInvitation,
} from "@hotel/db";
import { sanitizeInvitationsSearch } from "@/features/invitations/utils/sanitizeSearch";
import { requirePermission } from "@/shared/auth/requirePermission";
import { PERMISSIONS } from "@/shared/constants/permissions";

/**
 * Busca invitaciones por email (coincidencia por prefijo o por contenido).
 *
 * J3-PAT-10 (J2-POC-10, A03:2021 - Injection): `search` se sanea con una allowlist
 * (`sanitizeInvitationsSearch`) antes de interpolarse en el filtro `.or()` de PostgREST, así que
 * ya no puede cerrar el patrón ni inyectar condiciones adicionales. Ver `fase-2-pocs.md` (J2-POC-10)
 * y `fase-3-parches.md` (J3-PAT-10) para el hallazgo original y el diff.
 */
export const searchInvitations = async (search: string): Promise<PendingInvitation[]> => {
  await requirePermission(PERMISSIONS.ADMINS.INVITE);
  const supabase = createSupabaseServiceClient();
  const safeSearch = sanitizeInvitationsSearch(search);
  const { data, error } = await supabase
    .from(DB_TABLES.PENDING_INVITATIONS)
    .select("*")
    .or(`email.ilike.${safeSearch}%,email.ilike.%${safeSearch}%`)
    .order(DB_COLUMNS.pending_invitations.created_at, { ascending: false });
  if (error) throw new Error(error.message);
  return data;
};
