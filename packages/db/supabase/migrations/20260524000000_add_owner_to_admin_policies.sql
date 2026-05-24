-- Migration: Add owner role to admin policies
-- Update get_admins() and RLS policies to treat 'owner' as admin-equivalent

-- Step 1: Update get_admins() to include owners
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
  ORDER BY u.email;
$$;

-- Step 2: Update RLS policy on profiles (formerly users)
-- Drop existing admin-only policy and recreate with owner support
DROP POLICY IF EXISTS "Admins can read other users" ON public.profiles;

CREATE POLICY "Admins can read other users"
  ON public.profiles
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.user_roles
      WHERE user_id = auth.uid() AND role IN ('admin', 'owner')
    )
  );

-- Step 3: Update RLS policies on pending_invitations
DROP POLICY IF EXISTS "Admins can read invitations" ON public.pending_invitations;
DROP POLICY IF EXISTS "Admins can create invitations" ON public.pending_invitations;
DROP POLICY IF EXISTS "Admins can update invitations" ON public.pending_invitations;

CREATE POLICY "Admins can read invitations"
  ON public.pending_invitations FOR SELECT TO authenticated
  USING (
    EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = auth.uid() AND role IN ('admin', 'owner'))
  );

CREATE POLICY "Admins can create invitations"
  ON public.pending_invitations FOR INSERT TO authenticated
  WITH CHECK (
    EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = auth.uid() AND role IN ('admin', 'owner'))
  );

CREATE POLICY "Admins can update invitations"
  ON public.pending_invitations FOR UPDATE TO authenticated
  USING (
    EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = auth.uid() AND role IN ('admin', 'owner'))
  );
