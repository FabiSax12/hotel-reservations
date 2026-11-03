-- Fase 3 remediation -- módulo Gestión de Usuarios (Joseph)
-- J3.1 / J3.3: J2-POC-6 (get_admins() over-exposed via PostgREST, zero auth)
--              J2-POC-9 (RLS de profiles/user_permissions no filtran por permiso real)

-- ---------------------------------------------------------------------------
-- J2-POC-6: get_admins() is SECURITY DEFINER with no explicit GRANT/REVOKE,
-- so it keeps Postgres' default EXECUTE grant to PUBLIC. It was callable via
-- POST /rest/v1/rpc/get_admins with only the public anon apikey, no session
-- of any kind, and returned the full admin roster (incl. the owner).
-- ---------------------------------------------------------------------------

REVOKE EXECUTE ON FUNCTION public.get_admins() FROM PUBLIC;
REVOKE EXECUTE ON FUNCTION public.get_admins() FROM anon;
GRANT EXECUTE ON FUNCTION public.get_admins() TO authenticated;

-- Defense in depth: even for an `authenticated` caller (any logged-in user,
-- not just admins/owners), require the same role check the Next.js guard
-- (requirePermission(ADMINS.VIEW)) already applies at the application layer,
-- so the DB function is no longer a way to bypass it.
--
-- auth.role() = 'service_role' lets the app's own trusted server-side calls
-- through (getUserPermissionsList() calls this RPC via the service-role
-- client -- auth.uid() is NULL for that key, so an auth.uid()-only check
-- would wrongly break the legitimate path; verified live, see fase-3-parches.md).
CREATE OR REPLACE FUNCTION public.get_admins()
RETURNS TABLE (
  id          uuid,
  email       text,
  full_name   text,
  is_active   boolean,
  role        text,
  created_at  timestamptz
)
LANGUAGE sql
SECURITY DEFINER
SET search_path = ''
AS $$
  SELECT
    u.id,
    u.email::text,
    p.full_name,
    p.is_active,
    ur.role,
    u.created_at
  FROM auth.users u
  JOIN public.user_roles AS ur ON u.id = ur.user_id
  LEFT JOIN public.profiles p ON u.id = p.id
  WHERE ur.role IN ('admin', 'owner')
    AND u.last_sign_in_at IS NOT NULL
    AND (auth.role() = 'service_role' OR public.is_admin_or_owner())
  ORDER BY u.email;
$$;

-- ---------------------------------------------------------------------------
-- J2-POC-9: "Admins can read other users" on public.profiles let ANY
-- authenticated account with role admin/owner read every profile row
-- directly via PostgREST, regardless of whether that account actually holds
-- admins:view. Same gap on public.user_permissions let a caller with only
-- permissions:manage (no admins:view) read every user's permission set.
-- Both bypassed requirePermission(ADMINS.VIEW), which only guards the
-- Next.js Server Action path, not PostgREST directly.
-- ---------------------------------------------------------------------------

DROP POLICY IF EXISTS "Admins can read other users" ON public.profiles;

CREATE POLICY "Admins can read other users"
  ON public.profiles
  FOR SELECT
  TO authenticated
  USING (
    auth.uid() = id
    OR (public.is_admin_or_owner() AND public.has_permission('admins:view'))
  );

DROP POLICY IF EXISTS select_permissions ON public.user_permissions;

CREATE POLICY select_permissions ON public.user_permissions FOR
SELECT
  USING (
    -- usuarios autenticados pueden ver sus propios permisos
    (auth.uid() IS NOT NULL AND user_id = auth.uid())
    OR
    -- owner / admin con admins:view o permissions:manage pueden ver todos
    -- (admins:view para listar, permissions:manage para gestionar permisos)
    (
      public.is_admin_or_owner()
      AND (
        public.has_permission('admins:view')
        OR public.has_permission('permissions:manage')
      )
    )
  );
