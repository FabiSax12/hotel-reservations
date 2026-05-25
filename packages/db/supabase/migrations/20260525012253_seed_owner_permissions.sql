-- Seed: assign all permissions to the owner user
-- This migration finds the user with role='owner' and inserts all permission enum values

CREATE OR REPLACE FUNCTION set_owner_permissions(user_id uuid) RETURNS void AS $$
DECLARE
    perm user_permission;
    all_permissions user_permission[] := ARRAY[
        'view:dashboard',
        'reservations:view',
        'reservations:edit',
        'reservations:delete',
        'admins:view',
        'admins:invite',
        'admins:disable',
        'admins:revoke',
        'cms:manage',
        'permissions:manage',
        'rooms:manage',
        'invoices:view',
        'clients:view'
    ];
BEGIN
    -- Insert all permissions for the owner, skipping duplicates
    FOREACH perm IN ARRAY all_permissions
    LOOP
        INSERT INTO public.user_permissions (user_id, permission, granted_by)
        VALUES (user_id, perm, null)
        ON CONFLICT (user_id, permission) DO NOTHING;
    END LOOP;
END $$ LANGUAGE plpgsql;

CREATE OR REPLACE TRIGGER assign_owner_permissions
AFTER INSERT ON public.user_roles
FOR EACH ROW
WHEN (NEW.role = 'owner')
EXECUTE FUNCTION set_owner_permissions(NEW.user_id);


-- Backfill existing UNIQUE owner permissions
DO $$
DECLARE
    owner_user_id uuid;
BEGIN
    SELECT id INTO owner_user_id FROM public.users WHERE role = 'owner' LIMIT 1;
    IF owner_user_id IS NOT NULL THEN
        PERFORM set_owner_permissions(owner_user_id);
    END IF;
END $$;
