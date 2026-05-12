-- Migration: Create pending_invitations table
create type invitation_status as enum ('pending', 'accepted', 'revoked', 'expired');

create table public.pending_invitations (
  id              uuid              primary key default gen_random_uuid(),
  email           text              not null,
  invited_by      uuid              references auth.users(id) on delete set null,
  status          invitation_status not null default 'pending',
  expires_at      timestamptz       not null default (now() + interval '7 days'),
  created_at      timestamptz       not null default now(),
  accepted_at     timestamptz,
  revoked_at      timestamptz,
  revoked_by      uuid              references auth.users(id) on delete set null
);

alter table public.pending_invitations enable row level security;

create policy "Admins can read invitations"
  on public.pending_invitations for select to authenticated
  using (
    exists (select 1 from public.user_roles where user_id = auth.uid() and role = 'admin')
  );

create policy "Admins can create invitations"
  on public.pending_invitations for insert to authenticated
  with check (
    exists (select 1 from public.user_roles where user_id = auth.uid() and role = 'admin')
  );

create policy "Admins can update invitations"
  on public.pending_invitations for update to authenticated
  using (
    exists (select 1 from public.user_roles where user_id = auth.uid() and role = 'admin')
  );

create index idx_pending_invitations_email on public.pending_invitations (email) where status = 'pending';

-- Trigger: mark invitation as accepted when user appears in auth.users
create or replace function public.handle_invitation_accepted()
  returns trigger language plpgsql security definer set search_path = ''
as $$
begin
  update public.pending_invitations
  set status = 'accepted', accepted_at = now()
  where email = new.email and status = 'pending';
  return new;
end;
$$;

create trigger on_auth_user_accepted_invite
  after insert on auth.users
  for each row execute function public.handle_invitation_accepted();
