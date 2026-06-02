-- Seed: Local dev data
-- Creates owner, admin, sample rooms, reservations, and pending invitations.
--
-- Credentials (local dev only):
--   owner@hotel.local      / Owner1234!
--   admin@hotel.local      / Admin1234!
--   newadmin@hotel.local   / Invite1234!
--   manager@hotel.local    / Invite1234!
--
-- Usage: applied automatically by `supabase db reset`

do $$
declare
  v_owner_id   uuid := gen_random_uuid();
  v_admin_id   uuid := gen_random_uuid();
  v_invite1_id uuid := gen_random_uuid();
  v_invite2_id uuid := gen_random_uuid();

  v_room_estandar       uuid := gen_random_uuid();
  v_room_doble          uuid := gen_random_uuid();
  v_room_deluxe         uuid := gen_random_uuid();
  v_room_suite          uuid := gen_random_uuid();
  v_room_suite_familiar uuid := gen_random_uuid();
begin
  ------------------------------------------------------------------
  -- 1. OWNER + ADMIN — creados con contraseña, email confirmado
  --    handle_new_user() crea profiles + user_roles automáticamente
  --    usando raw_app_meta_data.role
  ------------------------------------------------------------------

  -- Owner
  insert into auth.users (
    id, instance_id, email, encrypted_password, email_confirmed_at,
    raw_app_meta_data, raw_user_meta_data, created_at, updated_at,
    role, aud, confirmation_token, recovery_token,
    email_change_token_new, email_change
  ) values (
    v_owner_id,
    '00000000-0000-0000-0000-000000000000',
    'owner@hotel.local',
    extensions.crypt('Owner1234!', extensions.gen_salt('bf')),
    now(),
    '{"provider":"email","providers":["email"],"role":"owner"}',
    '{"full_name":"Hotel Owner"}',
    now(), now(),
    'authenticated', 'authenticated',
    '', '', '', ''
  )
  on conflict do nothing;

  -- Admin
  insert into auth.users (
    id, instance_id, email, encrypted_password, email_confirmed_at,
    raw_app_meta_data, raw_user_meta_data, created_at, updated_at,
    role, aud, confirmation_token, recovery_token,
    email_change_token_new, email_change
  ) values (
    v_admin_id,
    '00000000-0000-0000-0000-000000000000',
    'admin@hotel.local',
    extensions.crypt('Admin1234!', extensions.gen_salt('bf')),
    now(),
    '{"provider":"email","providers":["email"],"role":"admin"}',
    '{"full_name":"Admin User"}',
    now(), now(),
    'authenticated', 'authenticated',
    '', '', '', ''
  )
  on conflict do nothing;

  ------------------------------------------------------------------
  -- 2. USUARIOS INVITADOS — simula el flujo de inviteUserByEmail
  --    Supabase crea el usuario en auth.users (unconfirmed),
  --    el trigger handle_new_user() crea profiles + user_roles,
  --    y LUEGO la app inserta en pending_invitations.
  --    Como pending_invitations no existía cuando el trigger corrió,
  --    la invitación queda en status 'pending'.
  ------------------------------------------------------------------

  -- Invitado 1: nuevo-admin
  insert into auth.users (
    id, instance_id, email, encrypted_password, email_confirmed_at,
    raw_app_meta_data, raw_user_meta_data, created_at, updated_at,
    role, aud, confirmation_token, recovery_token,
    email_change_token_new, email_change
  ) values (
    v_invite1_id,
    '00000000-0000-0000-0000-000000000000',
    'newadmin@hotel.local',
    extensions.crypt('Invite1234!', extensions.gen_salt('bf')),
    now(),
    '{"provider":"email","providers":["email"],"role":"admin"}',
    '{"full_name":"Nuevo Admin"}',
    now(), now(),
    'authenticated', 'authenticated',
    '', '', '', ''
  )
  on conflict do nothing;

  -- Invitado 2: manager
  insert into auth.users (
    id, instance_id, email, encrypted_password, email_confirmed_at,
    raw_app_meta_data, raw_user_meta_data, created_at, updated_at,
    role, aud, confirmation_token, recovery_token,
    email_change_token_new, email_change
  ) values (
    v_invite2_id,
    '00000000-0000-0000-0000-000000000000',
    'manager@hotel.local',
    extensions.crypt('Invite1234!', extensions.gen_salt('bf')),
    now(),
    '{"provider":"email","providers":["email"],"role":"admin"}',
    '{"full_name":"Manager"}',
    now(), now(),
    'authenticated', 'authenticated',
    '', '', '', ''
  )
  on conflict do nothing;

  ------------------------------------------------------------------
  -- 3. ROOMS
  ------------------------------------------------------------------

  insert into public.rooms (
    id, name, category, capacity_adults, capacity_kids,
    description, regular_fee, high_season_fee, is_pet_friendly
  ) values
    (v_room_estandar,       'Habitación Estándar',  'Standard', 2, 1,
     'Acogedora habitación estándar con vista al jardín.',   80.00,  120.00, false),
    (v_room_doble,          'Habitación Doble',     'Standard', 2, 2,
     'Amplia habitación con dos camas queen.',                95.00,  140.00, false),
    (v_room_deluxe,         'Habitación Deluxe',    'Deluxe',   2, 2,
     'Habitación deluxe con balcón y amenidades premium.',    150.00, 200.00, true),
    (v_room_suite,          'Suite Presidencial',   'Suite',    2, 1,
     'Suite de lujo con sala de estar y jacuzzi privado.',    250.00, 350.00, false),
    (v_room_suite_familiar, 'Suite Familiar',       'Suite',    4, 2,
     'Suite amplia ideal para familias, con cocina equipada.', 300.00, 420.00, true)
  on conflict do nothing;

  ------------------------------------------------------------------
  -- 4. RESERVATIONS
  ------------------------------------------------------------------

  -- Owner reserva Deluxe — aprobada, próxima
  insert into public.reservations (
    user_id, guest_name, guest_email, guest_phone,
    room_id, check_in, check_out,
    adults, children, price_per_night, total_amount, status
  ) values (
    v_owner_id,
    'Carlos Mendoza', 'carlos@example.com', '+52 555 123 4567',
    v_room_deluxe,
    current_date + 3, current_date + 6,
    2, 0, 150.00, 450.00, 'approved'
  );

  -- Admin reserva Estándar — pendiente
  insert into public.reservations (
    user_id, guest_name, guest_email, guest_phone,
    room_id, check_in, check_out,
    adults, children, price_per_night, total_amount, status
  ) values (
    v_admin_id,
    'María García', 'maria@example.com', '+52 555 987 6543',
    v_room_estandar,
    current_date + 5, current_date + 7,
    1, 0, 80.00, 160.00, 'pending'
  );

  -- Walk-in (sin user_id) en Suite Familiar — completada
  insert into public.reservations (
    guest_name, guest_email, guest_phone,
    room_id, check_in, check_out,
    adults, children, pets, price_per_night, total_amount, status
  ) values (
    'Familia Rodríguez', 'rodriguez@example.com', '+52 555 456 7890',
    v_room_suite_familiar,
    current_date - 7, current_date - 3,
    3, 2, 1, 300.00, 1200.00, 'completed'
  );

  -- Cancelada por el owner en Habitación Doble
  insert into public.reservations (
    user_id, guest_name, guest_email, guest_phone,
    room_id, check_in, check_out,
    adults, children, price_per_night, total_amount,
    status, cancellation_reason
  ) values (
    v_owner_id,
    'Luis Hernández', 'luis@example.com', '+52 555 111 2222',
    v_room_doble,
    current_date + 10, current_date + 12,
    1, 0, 95.00, 190.00,
    'cancelled', 'El huésped canceló por cambio de planes.'
  );

  ------------------------------------------------------------------
  -- 5. PENDING INVITATIONS — se insertan DESPUÉS de auth.users
  --    para que el trigger on_auth_user_accepted_invite no las
  --    marque como accepted al crearse el usuario.
  ------------------------------------------------------------------

  insert into public.pending_invitations (
    id, email, user_id, invited_by, status, expires_at
  ) values (
    gen_random_uuid(),
    'newadmin@hotel.local',
    v_invite1_id,
    v_owner_id,
    'pending',
    now() + interval '7 days'
  );

  insert into public.pending_invitations (
    id, email, user_id, invited_by, status, expires_at
  ) values (
    gen_random_uuid(),
    'manager@hotel.local',
    v_invite2_id,
    v_owner_id,
    'pending',
    now() + interval '7 days'
  );

end;
$$;
