CREATE TYPE user_permission AS ENUM (
    'view:dashboard', -- Ver el dashboard con estadísticas
    'reservations:view', -- Ver lista de reservaciones
    'reservations:edit', -- Editar una reservación
    'reservations:delete', -- Eliminar/cancelar reservación
    'admins:view', -- Ver lista de administradores
    'admins:invite', -- Invitar nuevos administradores
    'admins:disable', -- Desactivar/reactivar cuentas de admins
    'admins:revoke', -- Revocar invitaciones pendientes
    'cms:manage', -- Editar contenido del CMS (landing page)
    'permissions:manage', -- Asignar/revocar permisos a otros admins
    'rooms:manage', -- Crear/editar/gestionar habitaciones
    'invoices:view', -- Ver facturas
    'clients:view' -- Ver lista de clientes
);

CREATE TABLE
    public.user_permissions (
        user_id uuid REFERENCES auth.users (id) ON DELETE CASCADE,
        permission user_permission NOT NULL,
        granted_by uuid REFERENCES auth.users (id) ON DELETE SET NULL,
        created_at timestamptz DEFAULT now(),
        PRIMARY KEY (user_id, permission),
        UNIQUE (user_id, permission)
    );

CREATE INDEX idx_user_permissions_user_id ON public.user_permissions (user_id);

-- RLS policies
-- Crear políticas Row-Level Security:
-- SELECT: usuarios autenticados pueden ver sus propios permisos; owner + permissions:manage pueden ver todos
-- INSERT: solo owner + admin con permissions:manage pueden insertar
-- DELETE: solo owner + admin con permissions:manage pueden eliminar
-- UPDATE: no necesario (se reemplazan con INSERT/DELETE)
-- Todas las políticas deben reconocer tanto role='owner' como role='admin'.
-- Habilitar RLS
ALTER TABLE public.user_permissions ENABLE ROW LEVEL SECURITY;

CREATE
OR REPLACE FUNCTION public.is_admin_or_owner () RETURNS boolean LANGUAGE sql SECURITY DEFINER
SET
    search_path = '' AS $$
    SELECT EXISTS (
        SELECT 1 FROM public.user_roles
        WHERE user_id = auth.uid() AND role IN ('admin', 'owner')
    );
$$;

CREATE
OR REPLACE FUNCTION public.has_permission (p_permission user_permission) RETURNS boolean LANGUAGE sql SECURITY DEFINER
SET
    search_path = '' AS $$
    SELECT EXISTS (
        SELECT 1 FROM public.user_permissions
        WHERE user_id = auth.uid() AND permission = p_permission
    );
$$;

-- Política para SELECT
CREATE POLICY select_permissions ON public.user_permissions FOR
SELECT
    USING (
        -- owner + permissions:manage pueden ver todos
        (
            public.is_admin_or_owner ()
            AND public.has_permission ('permissions:manage')
        )
        OR
        -- usuarios autenticados pueden ver sus propios permisos
        (
            auth.uid () IS NOT NULL
            AND user_id = auth.uid ()
        )
    );

-- Política para INSERT
CREATE POLICY insert_permissions ON public.user_permissions FOR INSERT
WITH
    CHECK (
        -- solo owner + admin con permissions:manage pueden insertar
        public.is_admin_or_owner ()
        AND public.has_permission ('permissions:manage')
    );

-- Política para DELETE
CREATE POLICY delete_permissions ON public.user_permissions FOR DELETE USING (
    -- solo owner + admin con permissions:manage pueden eliminar
    public.is_admin_or_owner ()
    AND public.has_permission ('permissions:manage')
);