// J3-PAT-10 (J2-POC-10): allowlist para el término de búsqueda de `searchInvitations`.
// Mismo patrón que `sanitizeSearch` en
// `apps/panel-admin/src/features/audit-log/utils/sanitizeAuditLogParams.ts` (parche real de
// AUD-POC-2): todo lo que tiene significado dentro de un filtro `.or()` de PostgREST o un patrón
// LIKE (, ( ) " \ % :) se elimina, de forma que el valor ya no puede cerrar el patrón ni inyectar
// condiciones adicionales.
const SEARCH_DISALLOWED_CHARS = /[^\p{L}\p{N}\s@._+-]/gu;

export const INVITATIONS_SEARCH_MAX_LENGTH = 100;

export const sanitizeInvitationsSearch = (search: string): string => {
  return search.replace(SEARCH_DISALLOWED_CHARS, "").trim().slice(0, INVITATIONS_SEARCH_MAX_LENGTH);
};
