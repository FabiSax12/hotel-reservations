-- Migration: Create public.users profile table
-- Story: US-F-016 — Admin login
--
-- Stores role and active state for users authenticated via auth.users.
-- The `verifyAdminRole` function queries this table to confirm admin access.

create table if not exists public.users (
  id         uuid        primary key references auth.users (id) on delete cascade,
  email      text        not null,
  role       text        not null default 'staff' check (role in ('admin', 'staff')),
  is_active  boolean     not null default true,
  created_at timestamptz not null default now()
);

-- Lock down by default. Service role bypasses RLS automatically.
-- Client-facing policies will be added in future stories as needed.
alter table public.users enable row level security;
