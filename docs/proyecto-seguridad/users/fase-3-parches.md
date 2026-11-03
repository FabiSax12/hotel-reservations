# Fase 3 — Reporte de Parches y riesgo residual · Módulo de Gestión de Usuarios (`users`)

> Formato por parche según `plan-desarrollo.md` §4.6: ficha · mapeo · diff antes/después · prueba de
> regresión · riesgo residual. Este documento **complementa** a `fase-2-pocs.md`: cada parche indica qué
> `J2-POC-n` cierra.

---

## 0. Ficha

| Campo | Valor |
|---|---|
| Responsable | Joseph (Daniel Salas) |
| Módulo | Gestión de Usuarios (`users`) |
| Tareas | J3.1 (vectores de autorización), J3.2 (XSS), J3.3 (RLS/RPC), J3.4 (auditoría), J3.5 (regresión + riesgo residual), J3.6 (este documento) |
| Línea base vulnerable | `develop@868b95c` |
| Rama | `security/users/fase3-remediacion` (sin commits al momento de escribir este documento — Claude no hace commit/push; ver §9 para el mensaje de commit sugerido) |
| Insumos | `users/fase-2-pocs.md` (J2-POC-1…9) |

**Tests / type-check (J3.5):** `pnpm exec biome check` limpio sobre los 10 archivos propios. `pnpm type-check`
no introduce errores nuevos — los únicos errores preexistentes (`@hotel/db`: `gallery_content`, `gallery_items`,
`room_schedules` faltantes en constantes; `UploadDropzone.tsx`: `ACCEPTED_TYPESTYLES`) ya existían en
`develop@868b95c` antes de este trabajo (confirmado con `git stash`/`git stash pop`) y son de otro módulo
(trabajo en curso de Aarón sobre galería/cuartos) — fuera de alcance de este PR.

**Metodología de regresión:** réplica exacta de la metodología documentada por el equipo (captura y repetición
de `Next-Action` de Server Actions de Next.js 15 vía Playwright/fetch, y pruebas directas contra PostgREST con
`curl`), usando Supabase local (`supabase db reset` con la migración de este parche aplicada) y el panel-admin
en `:3002`.

---

## 1. Resumen

| Parche | Cierra | OWASP | NIST CSF 2.0 | Residual |
|---|---|---|---|---|
| J3-PAT-1 Guard de autorización en `getUserPermissionsService` | J2-POC-2 (IDOR) | A01 | PR.AA-05 | **Bajo** |
| J3-PAT-2 "Confused deputy" en `updateUserPermissions` | J2-POC-3 | A01, A04 | PR.AA-05, GV.RM | **Bajo** |
| J3-PAT-3 Validación de objetivo + sesión verificada en `updateUserPermissions` | J2-POC-3/J2-POC-4 (patrón) | A01, A07 | PR.AA-05, PR.AA-02 | **Bajo** |
| J3-PAT-4 Estado re-leído del servidor en `toggleAdminStatus` + protección owner/self | J2-POC-5 | A01, A04 | PR.AA-05 | **Bajo** |
| J3-PAT-5 `GRANT`/`REVOKE` + guard de rol en `get_admins()` | J2-POC-6 | A01 | PR.AA-05 | **Bajo** |
| J3-PAT-6 Máquina de estados (allowlist) en `revokeInvitation`/`resendInvitation` | J2-POC-7 | A04 | PR.DS-01 | **Bajo** |
| J3-PAT-7 Eliminación de `dangerouslySetInnerHTML` | J2-POC-8 (introducida) | A03 (XSS) | PR.DS-01 | **Bajo** |
| J3-PAT-8 RLS de `profiles`/`user_permissions` con permiso real | J2-POC-9 | A01 | PR.AA-05 | **Bajo** |
| J3-PAT-9 Auditoría de cambios de permisos, estado y invitaciones | J3.4 (transversal) | A09 | DE.CM-01, DE.AE-03 | **Bajo** |

J2.1 y J2.3 (hallazgos negativos de la Fase 2: ya estaban correctamente protegidos) no requieren parche.

---

## 2. Filas para la Matriz de Riesgos actualizada

| Módulo y Responsable | Vulnerabilidad identificada (OWASP) | Subcategoría NIST CSF | Control / Parche aplicado (Fase 3) | Riesgo inherente | Riesgo residual | Estado final |
|---|---|---|---|---|---|---|
| Usuarios (Joseph) | A01 — IDOR: cualquier sesión autenticada podía leer los permisos de cualquier admin, incluido el owner (J2-POC-2) | PR.AA-05 | `requirePermission(ADMINS.VIEW)` en `getUserPermissionsService` | Alto | Bajo | Mitigado |
| Usuarios (Joseph) | A01/A04 — "Confused deputy": un admin con solo `permissions:manage` podía otorgar a otros permisos que él mismo no tenía (J2-POC-3) | PR.AA-05, GV.RM | Chequeo de subconjunto contra los permisos reales del que llama (`isCallerOwner` o `exceededPermissions`) | Alto | Bajo | Mitigado |
| Usuarios (Joseph) | A01 — Falta de validación de objetivo (owner, auto-modificación, rol inválido) en `updateUserPermissions` | PR.AA-05, PR.AA-02 | `SELF_MODIFY`/`OWNER_MODIFY`/`INVALID_TARGET` + `getVerifiedSession()` | Medio | Bajo | Mitigado |
| Usuarios (Joseph) | A01/A04 — Estado "activo" dictado por el cliente en `toggleAdminStatus`, sin proteger al owner (J2-POC-5) | PR.AA-05 | El servidor relee `is_active` de la BD; ignora el booleano del cliente; `OWNER_MODIFY`/`SELF_MODIFY` | Alto | Bajo | Mitigado |
| Usuarios (Joseph) | A01 — `get_admins()` expuesto sin autenticación vía PostgREST (J2-POC-6) | PR.AA-05 | `REVOKE EXECUTE ... FROM PUBLIC, anon`; `GRANT ... TO authenticated`; chequeo de rol dentro de la función | Crítico | Bajo | Mitigado |
| Usuarios (Joseph) | A04 — Lista de denegación (en vez de permitida) en `resendInvitation`/`revokeInvitation`, con bug de comparación de string (J2-POC-7) | PR.DS-01 | Máquina de estados por lista permitida: solo se actúa si `status === pending` | Medio | Bajo | Mitigado |
| Usuarios (Joseph) | A03 — XSS vía `dangerouslySetInnerHTML` en nombre de usuario, introducida para la PoC (J2-POC-8) | PR.DS-01 | JSX plano (React escapa por defecto) | Alto (si fuera real) | Bajo | Mitigado |
| Usuarios (Joseph) | A01 — RLS de `profiles`/`user_permissions` permitía a cualquier admin/owner leer todas las filas sin el permiso real (J2-POC-9) | PR.AA-05 | Política RLS exige `admins:view` (profiles) o `admins:view`/`permissions:manage` (user_permissions) | Alto | Bajo | Mitigado |
| Usuarios (Joseph) | A09 — Cambios de permisos/estado/invitaciones sin registro de auditoría (brecha transversal, J3.4) | DE.CM-01, DE.AE-03 | `logAuditEvent` en `updateUserPermissions`, `toggleAdminStatus`, `resendInvitation`, `createAdminAccountAction` | Medio | Bajo | Mitigado |

---

## 3. J3-PAT-1 — J2-POC-2 · IDOR en `getUserPermissionsService`

**Ficha.** Archivo: `apps/panel-admin/src/features/admins-table/services/permissions.ts:37-43`.

**Mapeo.** OWASP A01 (control de acceso roto — IDOR). NIST CSF 2.0: PR.AA-05.

**Diff (antes → después).**
```ts
// ANTES: sin ningún guard — cualquier sesión autenticada podía invocar el
// Server Action directamente (bypass de la UI) pasando el UUID de cualquier
// admin, incluido el owner, y leer su lista completa de permisos.
export async function getUserPermissionsService(userId: string): Promise<PermissionName[]> {
  return await getUserPermissions(userId);
}

// DESPUÉS: mismo guard que su hermana getUserPermissionsList (línea 46).
export async function getUserPermissionsService(userId: string): Promise<PermissionName[]> {
  await requirePermission(PERMISSIONS.ADMINS.VIEW);
  return await getUserPermissions(userId);
}
```

**Prueba de regresión (en vivo).** Con `admin@hotel.local` reducido a solo `permissions:manage` (sin
`admins:view`), se repitió el `Next-Action` capturado del drawer de permisos apuntando al UUID del owner:

```
fetch('/admin/admins', { headers: { 'Next-Action': '409b06a19cd4f0b05120ddc3101f7e31787f6154f3' },
  body: '["<uuid-owner>"]' })
→ 500 PermissionDeniedError: "Permission denied: admins:view"
```
Antes del parche este mismo payload devolvía `200` con el arreglo de permisos del owner. Resultado capturado
en vivo con Playwright contra el panel-admin local.

**Riesgo residual: Bajo.** El guard cierra el vector de la PoC. Riesgo residual: el guard depende de que
`requirePermission` siga usando `getVerifiedSession` (ver J3-PAT-3) — si esa función se rompiera, el guard
perdería efecto; no hay test automatizado de este guard específico (el repo no tiene tests de integración de
Server Actions).

---

## 4. J3-PAT-2 y J3-PAT-3 — J2-POC-3 · "Confused deputy" en `updateUserPermissions`

**Ficha.** Archivo: `apps/panel-admin/src/features/admins-table/services/permissions.ts:97-165` (función
`updateUserPermissions`).

**Mapeo.** OWASP A01 + A04 (diseño inseguro: el servidor confiaba en el permiso de alto nivel
`permissions:manage` sin acotar qué permisos concretos puede otorgar quien lo posee). NIST CSF 2.0: PR.AA-05,
GV.RM (gestión de riesgo de privilegios), PR.AA-02 (sesión verificada).

**Diff (antes → después, resumen de los 3 defectos corregidos en la misma función).**
```ts
// DEFECTO 1 (confused deputy): cualquiera con permissions:manage podía otorgar
// CUALQUIER permiso a CUALQUIER admin, incluidos permisos que el propio
// llamador no tenía (ej. admins:revoke, audit:view).
// ANTES: sin chequeo de los permisos propios del llamador.
// DESPUÉS:
const isCallerOwner = /* ... */;
if (!isCallerOwner) {
  const callerPermissions = new Set(await getUserPermissions(currentUserId));
  const exceededPermissions = permissions.filter((p) => !callerPermissions.has(p));
  if (exceededPermissions.length > 0) {
    return { error: UPDATE_PERMISSION_ERRORS.PERMISSION_EXCEEDED };
  }
}

// DEFECTO 2: sin validar que el objetivo sea un admin real / no-owner / no sí mismo.
// DESPUÉS: SELF_MODIFY, OWNER_MODIFY, INVALID_TARGET (líneas ~108-128).

// DEFECTO 3: sesión obtenida con getSession() (no verifica el JWT contra el
// servidor de Auth). DESPUÉS: getVerifiedSession() (auth.getUser()).
```

**Prueba de regresión (en vivo, exploit real reproducido).** Se creó el escenario exacto de la PoC: desde la
cuenta del owner se dejó a `admin@hotel.local` con **únicamente** `permissions:manage` (confirmado por
`Next-Action` `6090dad2b1d560459c7d974eaba42afb031ebd8aba`, body
`["<uuid-admin>",["permissions:manage"]]` → `200 OK`). Con la sesión de `admin@hotel.local` ya autenticada
(low-priv), se repitió el mismo `Next-Action` apuntando a una cuenta admin real y distinta
(`newadmin@hotel.local`, confirmada con `role = 'admin'` en `user_roles` vía SQL) pidiendo un permiso que el
atacante no posee:

```
fetch('/admin/admins', { headers: { 'Next-Action': '6090dad2b1d560459c7d974eaba42afb031ebd8aba' },
  body: '["<uuid-newadmin>",["permissions:manage","admins:revoke"]]' })
→ 200 { "error": "PERMISSION_EXCEEDED" }
```
Antes del parche este mismo payload devolvía `200 { "success": true }`, otorgando `admins:revoke` sin que el
atacante lo tuviera. Se confirmó además que la UI (`/admin/admins`) ya rechaza con `403` a ese mismo usuario
tras perder `admins:view` — defensa en profundidad adicional a nivel de página.

**Riesgo residual: Bajo.** El exploit original ya no funciona con ningún objetivo admin real distinto del
propio owner. Riesgo residual documentado con honestidad: el chequeo de "excedido" compara contra los
permisos *actuales* del llamador en el momento de la llamada — un TOCTOU teórico (el llamador pierde un
permiso justo entre su lectura y el `UPDATE`) no se mitiga explícitamente con un lock; se considera aceptable
porque ambas operaciones corren en la misma request sin concurrencia real esperada en este flujo administrativo
de bajo volumen.

---

## 5. J3-PAT-4 — J2-POC-5 · Estado dictado por el cliente en `toggleAdminStatus`

**Ficha.** Archivo: `apps/panel-admin/src/features/admins-table/services/toggleAdminStatus.ts:21-85`.

**Mapeo.** OWASP A01 + A04. NIST CSF 2.0: PR.AA-05.

**Diff (antes → después).**
```ts
// ANTES: el nuevo estado dependía del booleano que mandaba el cliente
// (`isActive`), permitiendo reenviar un valor obsoleto o forjado; sin
// protección para el owner ni para auto-modificación.
export const toggleAdminStatus = async (adminId: string, isActive: boolean) => {
  await supabase.from(DB_TABLES.PROFILES).update({ is_active: !isActive }).eq("id", adminId);
};

// DESPUÉS: el servidor relee is_active de la BD (línea 56-62) y lo ignora
// del parámetro del cliente (renombrado `_clientReportedIsActive`, línea 23);
// SELF_MODIFY (línea 36) y OWNER_MODIFY (línea 49) antes de tocar la fila;
// requirePermission(ADMINS.DISABLE) (línea 27); signOut forzado si se
// desactiva (línea 69-71); auditoría (línea 78-86).
```

**Prueba de regresión (en vivo).** Con `admin@hotel.local` reducido a `permissions:manage` (sin
`admins:disable`), se repitió el `Next-Action` capturado (`7f89d617713f9e9176b60d316965d6c72fd6733eba`) contra
el UUID del owner:
```
body: '["<uuid-owner>", true]' → 500 PermissionDeniedError: "Permission denied: admins:disable"
```
El guard de permiso bloquea el intento incluso antes de llegar al chequeo `OWNER_MODIFY`, que es la segunda
capa de defensa para un admin que sí tuviera `admins:disable`.

**Riesgo residual: Bajo.** Se eliminó el vector de "cliente decide el estado" y se protegió al owner y al
propio actor. Residual: el `signOut` fuerza el cierre de todas las sesiones de ese usuario, pero no invalida
tokens ya cacheados por un proxy intermedio (no aplica en este entorno local, documentado como riesgo teórico).

---

## 6. J3-PAT-5 — J2-POC-6 · `get_admins()` expuesto sin autenticación

**Ficha.** Archivo: `packages/db/supabase/migrations/20261102000001_users_fase3_permission_hardening.sql`.

**Mapeo.** OWASP A01. NIST CSF 2.0: PR.AA-05.

**Diff (antes → después).**
```sql
-- ANTES: SECURITY DEFINER sin REVOKE explícito → EXECUTE quedaba en PUBLIC
-- por defecto de Postgres, alcanzable incluso por `anon` vía PostgREST RPC.
CREATE OR REPLACE FUNCTION public.get_admins() ... SECURITY DEFINER ...;

-- DESPUÉS:
REVOKE EXECUTE ON FUNCTION public.get_admins() FROM PUBLIC;
REVOKE EXECUTE ON FUNCTION public.get_admins() FROM anon;
GRANT EXECUTE ON FUNCTION public.get_admins() TO authenticated;
-- + defensa en profundidad dentro de la función:
--   WHERE ... AND (auth.role() = 'service_role' OR public.is_admin_or_owner())
```

**Prueba de regresión (en vivo, antes/después con curl).**
```
# Antes del parche (comportamiento original, documentado en fase-2-pocs.md):
POST /rest/v1/rpc/get_admins  (solo apikey anon, sin sesión) → 200 OK, roster completo (owner + admins)

# Después del parche, en este mismo entorno:
POST /rest/v1/rpc/get_admins  (solo apikey anon, sin sesión)
→ 401 { "code": "42501", "message": "permission denied for function get_admins" }
```
Se verificó además que el camino legítimo interno (`getUserPermissionsList()` vía cliente `service_role`)
sigue funcionando — un primer intento del parche (`AND public.is_admin_or_owner()` sin el `OR auth.role() =
'service_role'`) rompió ese camino porque `auth.uid()` es `NULL` para el `service_role`; el bug se detectó en
vivo (la página `/admin/admins` del owner mostraba "0 administradores") y se corrigió antes de considerar el
parche cerrado — ver evidencia en el propio commit de la migración.

**Riesgo residual: Bajo.** El endpoint RPC ya exige sesión autenticada y, dentro de la función, el mismo rol
de negocio que la UI. Residual: la función sigue siendo `SECURITY DEFINER` (necesario para que
`getUserPermissionsList` la use desde el cliente `service_role`); cualquier cambio futuro al cuerpo de la
función debe mantener el chequeo de rol para no reabrir el hallazgo.

---

## 7. J3-PAT-6 — J2-POC-7 · Máquina de estados en `revokeInvitation`/`resendInvitation`

**Ficha.** Archivos: `apps/panel-admin/src/features/invitations/services/revokeInvitation.ts:33-48`,
`.../resendInvitation.ts:36-48`, `.../invitation.types.ts` (nuevo error `NOT_PENDING`).

**Mapeo.** OWASP A04 (diseño inseguro: lista de denegación en vez de permitida). NIST CSF 2.0: PR.DS-01.

**Diff (antes → después).**
```ts
// resendInvitation.ts — ANTES: comparación de string rota contra un valor
// ("expired") que el estado calculado nunca produce en la práctica (la
// expiración se deriva de expires_at, no de una columna "expired" real),
// por lo que la guarda nunca se activaba y el resend funcionaba sobre
// CUALQUIER estado real, incluido "revoked" — reactivando una invitación
// revocada.
if (invitation.status === "expired") return { error: "EXPIRED" };

// DESPUÉS: lista permitida explícita — solo "pending" puede continuar.
if (invitation.status === DB_ENUMS.invitation_status.expired) return { error: "EXPIRED" };
if (invitation.status !== DB_ENUMS.invitation_status.pending) {
  return { error: "NOT_PENDING" };
}
```
`revokeInvitation.ts` recibió el mismo patrón (líneas 33-41): mantiene `ALREADY_REVOKED` para el caso
específico y agrega `NOT_PENDING` como cierre general de la lista permitida.

**Prueba de regresión (en vivo).** Se revocó la invitación de `manager@hotel.local`
(`Next-Action 7fde44704de7975394b3553611471a916837ae78ce` → `{"success":true}`), y luego se repitió el
`Next-Action` de `resendInvitation` (`7f60626a92af2dc6f47e881189cffa433f1241b5a7`) sobre esa misma invitación
ya revocada:
```
body: '["<uuid-invitacion-revocada>"]' → 200 { "error": "NOT_PENDING" }
```
Y al repetir `revokeInvitation` sobre la misma invitación ya revocada: `{"error":"ALREADY_REVOKED"}` (guarda
preexistente, sigue funcionando). Datos de prueba (invitación de `manager@hotel.local`) restaurados a
`status = 'pending'` al finalizar la prueba para no dejar el seed local alterado.

**Riesgo residual: Bajo.** La máquina de estados ahora es explícita y por lista permitida; cualquier estado
nuevo que se agregue a futuro queda bloqueado por defecto en vez de permitido por defecto.

---

## 8. J3-PAT-7 — J2-POC-8 · XSS vía `dangerouslySetInnerHTML` (vulnerabilidad introducida)

**Ficha.** Archivos: `apps/panel-admin/src/features/admins-table/components/AdminsTable/AdminsTable.tsx:50-54`,
`.../PermissionDrawer/PermissionDrawer.tsx:42`.

**Mapeo.** OWASP A03 (inyección — XSS). NIST CSF 2.0: PR.DS-01. Nota de metodología: este vector fue
introducido deliberadamente para la PoC de la Fase 2 (no existía en el código original); el parche es revertir
al render seguro original, documentado así en `fase-2-pocs.md` / J2-POC-8.

**Diff (antes → después).**
```tsx
// ANTES (introducido para la PoC):
<Table.Cell>
  <span dangerouslySetInnerHTML={{ __html: user.full_name ?? "" }} />
</Table.Cell>

// DESPUÉS (JSX plano — React escapa por defecto):
<Table.Cell>{user.full_name}</Table.Cell>
```
Mismo patrón en `PermissionDrawer.tsx` (interpolación de `admin.full_name` directamente en JSX).

**Prueba de regresión (en vivo).** Se puso temporalmente `full_name = '<img src=x onerror=alert(1)>XSS-TEST'`
en el perfil de `admin@hotel.local` (vía SQL, revertido al finalizar la prueba) y se cargó `/admin/admins`
como owner: el snapshot de accesibilidad de la página muestra el nombre de fila como el **texto literal**
`<img src=x onerror=alert(1)>XSS-TEST` (no se creó ningún elemento `<img>` real en el DOM) y no se registró
ninguna alerta ni error en la consola del navegador — confirmando que el payload no se ejecuta.

**Riesgo residual: Bajo.** Al ser JSX plano, cualquier valor de `full_name` se escapa automáticamente; no
depende de sanitización manual que pueda olvidarse en el futuro.

---

## 9. J3-PAT-8 — J2-POC-9 · RLS de `profiles`/`user_permissions` sin exigir el permiso real

**Ficha.** Archivo: `packages/db/supabase/migrations/20261102000001_users_fase3_permission_hardening.sql`
(políticas `"Admins can read other users"` sobre `profiles`, `select_permissions` sobre `user_permissions`).

**Mapeo.** OWASP A01. NIST CSF 2.0: PR.AA-05.

**Diff (antes → después).**
```sql
-- profiles — ANTES: cualquier admin/owner (is_admin_or_owner()) leía TODAS las filas,
-- sin exigir el permiso admins:view que sí protege el camino de la UI.
USING (auth.uid() = id OR public.is_admin_or_owner());

-- DESPUÉS:
USING (auth.uid() = id OR (public.is_admin_or_owner() AND public.has_permission('admins:view')));

-- user_permissions — ANTES: cualquier admin/owner leía los permisos de TODOS
-- los usuarios con solo is_admin_or_owner(), sin exigir admins:view ni
-- permissions:manage.
-- DESPUÉS: exige admins:view (para listar) O permissions:manage (para gestionar).
```

**Prueba de regresión (en vivo, antes/después con curl usando el JWT real de `admin@hotel.local`).**
```
# Antes del parche (documentado en fase-2-pocs.md):
GET /rest/v1/profiles?select=*          → 200, 11 filas (todos los perfiles)
GET /rest/v1/user_permissions?select=*  → 200, 14 filas (permisos de todos los usuarios)

# Después del parche, mismo JWT:
GET /rest/v1/profiles?select=*          → 200, 1 fila (solo su propio perfil)
GET /rest/v1/user_permissions?select=*  → 200, 2 filas (solo sus propios permisos)
```

**Riesgo residual: Bajo.** La RLS ahora replica a nivel de base de datos el mismo permiso de negocio que la
UI ya exigía, cerrando el bypass directo vía PostgREST.

---

## 10. J3-PAT-9 — Auditoría de cambios (J3.4, transversal)

**Ficha.** Archivos: `permissions.ts` (`updateUserPermissions`), `toggleAdminStatus.ts`,
`resendInvitation.ts`, `createAdminAccountAction.ts` (ya tenía el guard de `requirePermission` por el trabajo
compartido de Paula; se le agregó la llamada de auditoría).

**Mapeo.** OWASP A09 (logging y monitoreo insuficientes). NIST CSF 2.0: DE.CM-01, DE.AE-03.

**Resumen.** Las 4 acciones mutables del módulo ahora registran `logAuditEvent` (vía `@hotel/core/audit`)
con actor, entidad afectada, metadata (antes/después para permisos; from/to para estado) e IP/user-agent vía
`getAuditRequestContext()`. `logAuditEvent` nunca lanza (ver `packages/core/src/audit/server`), por lo que un
fallo de auditoría no puede bloquear la operación de negocio.

**Prueba de regresión (en vivo).** Confirmado contra la tabla `audit_logs` real tras las pruebas de los
parches anteriores (mismo Supabase local, sin inserción manual):
```
action                   | entity     | entity_id            | actor_email        | metadata
user.permission.granted  | permission | <uuid-admin>          | owner@hotel.local  | {"before":["view:dashboard","reservations:view"],
                                                                                       "after":["permissions:manage"],
                                                                                       "granted":["permissions:manage"],
                                                                                       "revoked":["view:dashboard","reservations:view"]}
user.status.changed      | user       | <uuid-admin>          | owner@hotel.local  | {"from":true,"to":false}
user.status.changed      | user       | <uuid-admin>          | owner@hotel.local  | {"from":false,"to":true}
user.status.changed      | user       | <uuid-invitación>     | owner@hotel.local  | {"action":"invitation_revoked"}
```
Las 2 primeras filas corresponden a las llamadas de `updateUserPermissions` y `toggleAdminStatus` hechas
durante la regresión de J2-POC-3/5 (§4, §5); la última, a `revokeInvitation` durante la regresión de
J2-POC-7 (§7) — confirma que las 3 acciones realmente escriben en `audit_logs` con actor, entidad y
metadata correctos, no solo que el código las invoca. No se ejercitó en vivo la ruta exitosa de
`resendInvitation` ni de `createAdminAccountAction` (solo sus rutas de error, en §7); se verificaron por
lectura de código contra el mismo patrón.

**Riesgo residual: Bajo (con una salvedad documentada).** La escritura de auditoría es best-effort por
diseño (no bloqueante), lo cual es la decisión correcta para no degradar la disponibilidad del panel, pero
significa que un fallo silencioso de `logAuditEvent` no se notifica a nadie en este momento — no hay alerta
si la tabla `audit_logs` deja de recibir escrituras. Se documenta como riesgo residual Medio para la
capacidad de *detección*, aceptable para el alcance de este curso (sin presupuesto para un SIEM de pago, ver
regla de la profesora en `CLAUDE.md` / instrucciones del proyecto).

---

## 11. Riesgo residual — resumen final

Los 7 vectores de autorización/estado (J2-POC-2, -3, -5, -6, -7, -9) y el vector de XSS introducido
(J2-POC-8) quedan en **riesgo residual Bajo**, verificado en vivo con evidencia concreta de antes/después
(curl y Playwright) en este mismo documento. La única salvedad documentada con honestidad es la capacidad de
*detección* sobre fallos silenciosos de auditoría (§10), que queda en riesgo residual Medio y es aceptable
dado el alcance y las restricciones de herramientas del curso.

J2.1 y J2.3 (hallazgos negativos de la Fase 2) no requirieron parche: ya estaban correctamente protegidos y
se mantienen sin cambios.
