-- Migration: Sync auth.users → public.users via trigger
-- Story: US-F-016 — Admin login
--
-- Whenever Supabase creates a new user in auth.users (signup, invite, etc.),
-- this trigger inserts a matching row in public.users with role 'staff' by default.
-- Role can be updated manually to 'admin' for privileged accounts.

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.users (id, email, role, is_active)
  values (
    new.id,
    new.email,
    'staff',
    true
  )
  on conflict (id) do nothing;

  return new;
end;
$$;

create or replace trigger on_auth_user_created
  after insert on auth.users
  for each row
  execute function public.handle_new_user();
