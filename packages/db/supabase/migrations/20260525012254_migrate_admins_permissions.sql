-- Migrate existing admins to basic permissions
-- This migration finds all users with role='admin' who don't have permissions
-- and assigns them view:dashboard and reservations:view

DO $$
DECLARE
    admin_record RECORD;
BEGIN
    -- Loop through all admins without permissions
    FOR admin_record IN
        SELECT ur.user_id
        FROM public.user_roles ur
        WHERE ur.role = 'admin'
        AND NOT EXISTS (
            SELECT 1
            FROM public.user_permissions up
            WHERE up.user_id = ur.user_id
        )
    LOOP
        -- Insert basic permissions for each admin
        INSERT INTO public.user_permissions (user_id, permission, granted_by)
        VALUES
            (admin_record.user_id, 'view:dashboard', null),
            (admin_record.user_id, 'reservations:view', null)
        ON CONFLICT (user_id, permission) DO NOTHING;
    END LOOP;
END $$;
