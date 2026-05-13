-- Migration: Fix admin invitation flow
-- Add user_id column to link pending_invitations with auth.users
-- Update get_admins() function to filter out inactive users
-- Update handle_invitation_accepted() trigger to match on user_id first

-- Step 1: Add user_id column
alter table public.pending_invitations
  add column user_id uuid not null;

-- Step 2: Backfill existing rows matching by email
update public.pending_invitations
set user_id = au.id
from auth.users au
where pending_invitations.email = au.email
  and pending_invitations.user_id is null;

-- Step 3: Update get_admins() function
create or replace function public.get_admins()
returns table (
  id          uuid,
  email       text,
  full_name   text,
  is_active   boolean,
  role        text,
  created_at  timestamptz
)
language sql
security definer
set search_path = ''
as $$
  select
    u.id,
    u.email::text,
    p.full_name,
    p.is_active,
    ur.role,
    u.created_at
  from auth.users u
  join public.user_roles as ur on u.id = ur.user_id
  left join public.profiles p on u.id = p.id
  where ur.role = 'admin'
    and u.last_sign_in_at is not null
  order by u.email;
$$;

-- Step 4: Update handle_invitation_accepted() trigger
-- Match on user_id first, fallback to email if user_id is NULL
create or replace function public.handle_invitation_accepted()
  returns trigger language plpgsql security definer set search_path = ''
as $$
begin
  -- First try to match by user_id
  update public.pending_invitations
  set status = 'accepted', accepted_at = now()
  where user_id = new.id and status = 'pending';

  -- If no rows were updated, fallback to email match
  if not found then
    update public.pending_invitations
    set status = 'accepted', accepted_at = now()
    where email = new.email and status = 'pending';
  end if;

  return new;
end;
$$;
