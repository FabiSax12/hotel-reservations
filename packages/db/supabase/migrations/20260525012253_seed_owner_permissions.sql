-- Seed: assign all permissions to the owner user
-- This migration finds the user with role='owner' and inserts all permission enum values

CREATE OR REPLACE FUNCTION public.set_owner_permissions(owner_id uuid)
RETURNS void
language plpgsql
security definer
set search_path = ''
as $$
BEGIN
    INSERT INTO public.user_permissions (user_id, permission, granted_by)
    VALUES
        (owner_id, 'view:dashboard', null),
        (owner_id, 'reservations:view', null),
        (owner_id, 'reservations:edit', null),
        (owner_id, 'reservations:delete', null),
        (owner_id, 'admins:view', null),
        (owner_id, 'admins:invite', null),
        (owner_id, 'admins:disable', null),
        (owner_id, 'admins:revoke', null),
        (owner_id, 'cms:manage', null),
        (owner_id, 'permissions:manage', null),
        (owner_id, 'rooms:manage', null),
        (owner_id, 'invoices:view', null),
        (owner_id, 'clients:view', null)
    ON CONFLICT (user_id, permission) DO NOTHING;
END $$;

CREATE OR REPLACE FUNCTION public.trg_assign_owner_permissions()
RETURNS trigger
language plpgsql
security definer
set search_path = ''
as $$
BEGIN
    IF NEW.role = 'owner' THEN
        PERFORM public.set_owner_permissions(NEW.user_id);
    END IF;

    RETURN NEW;
END $$;

DROP TRIGGER IF EXISTS assign_owner_permissions ON public.user_roles;

CREATE TRIGGER assign_owner_permissions
AFTER INSERT ON public.user_roles
FOR EACH ROW
EXECUTE FUNCTION trg_assign_owner_permissions();


-- Backfill existing UNIQUE owner permissions
DO $$
DECLARE
    owner_user_id uuid;
BEGIN
    SELECT ur.user_id
    INTO owner_user_id
    FROM public.user_roles as ur
    WHERE role = 'owner'
    LIMIT 1;

    IF owner_user_id IS NOT NULL THEN
        PERFORM set_owner_permissions(owner_user_id);
    END IF;
END $$;
