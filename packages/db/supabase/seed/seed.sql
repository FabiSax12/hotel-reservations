-- Seed: Admin user for local development
-- Story: US-F-016 — Admin login
--
-- Creates a test admin in auth.users. The trigger handle_new_user()
-- automatically inserts the matching row in public.users with role 'staff'.
-- We then update the role to 'admin'.
--
-- Credentials: admin@hotel.local / Admin1234! (local dev only)
-- Usage: applied automatically by `supabase db reset`

do $$
declare
  v_user_id uuid := gen_random_uuid();
begin
  insert into auth.users (
    id,
    instance_id,
    email,
    encrypted_password,
    email_confirmed_at,
    raw_app_meta_data,
    raw_user_meta_data,
    created_at,
    updated_at,
    role,
    aud
  ) values (
    v_user_id,
    '00000000-0000-0000-0000-000000000000',
    'admin@hotel.local',
    crypt('Admin1234!', gen_salt('bf')),
    now(),
    '{"provider":"email","providers":["email"]}',
    '{}',
    now(),
    now(),
    'authenticated',
    'authenticated'
  )
  on conflict do nothing;

  -- Trigger handle_new_user() fires automatically and creates public.users row.
  -- Promote to admin.
  update public.users
  set role = 'admin'
  where email = 'admin@hotel.local';
end;
$$;
