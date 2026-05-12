CREATE TYPE user_role AS ENUM ('owner', 'admin', 'client');

create table public.user_roles (
  user_id uuid primary key references auth.users(id) on delete cascade,
  role user_role not null
);

-- Política para que cada usuario lea su propio rol
alter table public.user_roles enable row level security;
create policy "Users can read own role"
on public.user_roles for select
to authenticated
using (user_id = auth.uid());

-- Ahora la política de admin en users no genera recursión
create policy "Admins can read other users"
on "public"."users"
to authenticated
using (
  exists (
    select 1 from public.user_roles
    where user_id = auth.uid() and role = 'admin'
  )
);


alter table public.users RENAME TO profiles;
alter table public.profiles DROP COLUMN email, DROP COLUMN role, DROP COLUMN created_at, DROP COLUMN activation_token, DROP COLUMN activation_token_expires_at;


alter table public.profiles ADD COLUMN full_name text;




create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer   -- necesario para acceder a auth.users y a las tablas públicas
set search_path = ''
as $$
begin
  -- Insertar perfil
  insert into public.profiles (id, full_name, is_active)
  values (
    new.id,
    coalesce(
      new.raw_user_meta_data ->> 'full_name',
      new.raw_user_meta_data ->> 'name',   -- Google OAuth puede venir como "name"
      null
    ),
    true
  );

  -- Insertar rol: prioriza app_metadata (invitación admin) sobre raw_user_meta_data,
  -- y si no hay nada, asigna 'user' por defecto
  insert into public.user_roles (id, role)
  values (
    new.id,
    coalesce(
      new.raw_app_meta_data ->> 'role',
      new.raw_user_meta_data ->> 'role',
      'client'
    )
  );

  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;

create trigger on_auth_user_created
  after insert on auth.users
  for each row
  execute function public.handle_new_user();



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
  order by u.email;
$$;