CREATE OR REPLACE FUNCTION public.set_admin_permissions(admin_id uuid)
RETURNS void
language plpgsql
security definer
set search_path = ''
as $$
DECLARE
    admin_record RECORD;
BEGIN
    -- Check if the admin already has permissions
    IF NOT EXISTS (
        SELECT 1
        FROM public.user_permissions up
        WHERE up.user_id = admin_id
    ) THEN
        -- Insert basic permissions for the admin
        INSERT INTO public.user_permissions (user_id, permission, granted_by)
        VALUES
            (admin_id, 'view:dashboard', null),
            (admin_id, 'reservations:view', null)
        ON CONFLICT (user_id, permission) DO NOTHING;
    END IF;
END $$;

-- Trigger function to assign permissions when a new admin role is added
CREATE OR REPLACE FUNCTION public.trg_assign_admin_permissions()
RETURNS trigger
language plpgsql
security definer
set search_path = ''
as $$
BEGIN
    IF NEW.role = 'admin' THEN
        PERFORM public.set_admin_permissions(NEW.user_id);
    END IF;
    RETURN NEW;
END $$;

-- Drop existing trigger if it exists
DROP TRIGGER IF EXISTS assign_admin_permissions ON public.user_roles;

-- Create trigger to assign permissions after inserting a new admin role
CREATE TRIGGER assign_admin_permissions
AFTER INSERT ON public.user_roles
FOR EACH ROW
EXECUTE FUNCTION public.trg_assign_admin_permissions();