-- Seed: Local dev data
-- Creates owner, admin, 3 sample rooms (complete with amenities & schedules), reservations, and pending invitations.
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

  v_room_deluxe     uuid := gen_random_uuid();
  v_room_suite      uuid := gen_random_uuid();
  v_room_standard   uuid := gen_random_uuid();

  -- Amenity IDs (generate UUIDs)
  v_wifi               uuid := gen_random_uuid();
  v_air_conditioning   uuid := gen_random_uuid();
  v_tv                 uuid := gen_random_uuid();
  v_mini_bar           uuid := gen_random_uuid();
  v_safe_box           uuid := gen_random_uuid();
  v_desk               uuid := gen_random_uuid();
  v_hair_dryer         uuid := gen_random_uuid();
  v_balcony            uuid := gen_random_uuid();
  v_pool               uuid := gen_random_uuid();
  v_gym                uuid := gen_random_uuid();

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
  -- 2. USUARIOS INVITADOS
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
  -- 3. PREDEFINED AMENITIES (10 items from PREDEFINED_AMENITY_IDS)
  ------------------------------------------------------------------

  insert into public.amenities (id, name, icon, description) values
    (v_wifi,              'WiFi',               'Wifi',       'Acceso a internet de alta velocidad'),
    (v_air_conditioning,  'Aire Acondicionado', 'Wind',       'Control de clima para su comodidad'),
    (v_tv,                'TV',                 'Tv',         'Televisión de pantalla plana con canales por cable'),
    (v_mini_bar,          'Mini Bar',           'Coffee',     'Refrescos y bocadillos disponibles'),
    (v_safe_box,          'Caja Fuerte',        'Lock',       'Almacenamiento seguro para sus objetos de valor'),
    (v_desk,              'Escritorio',         'Briefcase',  'Espacio de trabajo dedicado'),
    (v_hair_dryer,        'Secador de Pelo',    'Wind',       'Disponible en el baño'),
    (v_balcony,           'Balcón',             'Wind',       'Espacio privado al aire libre'),
    (v_pool,              'Piscina',            'Waves',      'Acceso a la piscina del hotel'),
    (v_gym,               'Gimnasio',           'Dumbbell',   'Acceso al gimnasio')
  on conflict do nothing;

  ------------------------------------------------------------------
  -- 4. THREE COMPLETE ROOMS with amenities
  ------------------------------------------------------------------

  -- Room 1: Deluxe con Balcón y Piscina
  insert into public.rooms (
    id, name, category, capacity_adults, capacity_kids,
    description, regular_fee, high_season_fee, is_pet_friendly
  ) values (
    v_room_deluxe,
    'Deluxe Premium',
    'Deluxe',
    2,
    2,
    'Habitación deluxe con vista a la ciudad, balcón privado y acceso a piscina. Todas las comodidades premium.',
    150.00,
    200.00,
    false
  ) on conflict do nothing;

  -- Room 1 amenities: WiFi, AC, TV, Desk, Balcony, Pool, Gym
  insert into public.room_amenities (room_id, amenity_id) values
    (v_room_deluxe, v_wifi),
    (v_room_deluxe, v_air_conditioning),
    (v_room_deluxe, v_tv),
    (v_room_deluxe, v_desk),
    (v_room_deluxe, v_balcony),
    (v_room_deluxe, v_pool),
    (v_room_deluxe, v_gym)
  on conflict do nothing;

  -- Room 1 schedules: Check-in 14:00-22:00, Check-out 06:00-14:00
  insert into public.room_schedules (room_id, schedule_type, time_slot) values
    (v_room_deluxe, 'check_in', '14:00'),
    (v_room_deluxe, 'check_in', '15:00'),
    (v_room_deluxe, 'check_in', '16:00'),
    (v_room_deluxe, 'check_in', '17:00'),
    (v_room_deluxe, 'check_in', '18:00'),
    (v_room_deluxe, 'check_in', '19:00'),
    (v_room_deluxe, 'check_in', '20:00'),
    (v_room_deluxe, 'check_in', '21:00'),
    (v_room_deluxe, 'check_in', '22:00'),
    (v_room_deluxe, 'check_out', '06:00'),
    (v_room_deluxe, 'check_out', '07:00'),
    (v_room_deluxe, 'check_out', '08:00'),
    (v_room_deluxe, 'check_out', '09:00'),
    (v_room_deluxe, 'check_out', '10:00'),
    (v_room_deluxe, 'check_out', '11:00'),
    (v_room_deluxe, 'check_out', '12:00'),
    (v_room_deluxe, 'check_out', '13:00'),
    (v_room_deluxe, 'check_out', '14:00')
  on conflict do nothing;

  -- Room 2: Suite Presidencial (Luxury)
  insert into public.rooms (
    id, name, category, capacity_adults, capacity_kids,
    description, regular_fee, high_season_fee, is_pet_friendly
  ) values (
    v_room_suite,
    'Suite Presidencial',
    'Suite',
    4,
    2,
    'Suite de lujo con dos dormitorios, sala de estar, comedor privado y jacuzzi. Servicio concierge incluido.',
    300.00,
    420.00,
    false
  ) on conflict do nothing;

  -- Room 2 amenities: WiFi, AC, TV, Mini Bar, Safe Box, Desk, Hair Dryer, Balcony, Pool, Gym
  insert into public.room_amenities (room_id, amenity_id) values
    (v_room_suite, v_wifi),
    (v_room_suite, v_air_conditioning),
    (v_room_suite, v_tv),
    (v_room_suite, v_mini_bar),
    (v_room_suite, v_safe_box),
    (v_room_suite, v_desk),
    (v_room_suite, v_hair_dryer),
    (v_room_suite, v_balcony),
    (v_room_suite, v_pool),
    (v_room_suite, v_gym)
  on conflict do nothing;

  -- Room 2 schedules: Check-in 14:00-22:00, Check-out 06:00-14:00
  insert into public.room_schedules (room_id, schedule_type, time_slot) values
    (v_room_suite, 'check_in', '14:00'),
    (v_room_suite, 'check_in', '15:00'),
    (v_room_suite, 'check_in', '16:00'),
    (v_room_suite, 'check_in', '17:00'),
    (v_room_suite, 'check_in', '18:00'),
    (v_room_suite, 'check_in', '19:00'),
    (v_room_suite, 'check_in', '20:00'),
    (v_room_suite, 'check_in', '21:00'),
    (v_room_suite, 'check_in', '22:00'),
    (v_room_suite, 'check_out', '06:00'),
    (v_room_suite, 'check_out', '07:00'),
    (v_room_suite, 'check_out', '08:00'),
    (v_room_suite, 'check_out', '09:00'),
    (v_room_suite, 'check_out', '10:00'),
    (v_room_suite, 'check_out', '11:00'),
    (v_room_suite, 'check_out', '12:00'),
    (v_room_suite, 'check_out', '13:00'),
    (v_room_suite, 'check_out', '14:00')
  on conflict do nothing;

  -- Room 3: Standard Economy
  insert into public.rooms (
    id, name, category, capacity_adults, capacity_kids,
    description, regular_fee, high_season_fee, is_pet_friendly
  ) values (
    v_room_standard,
    'Habitación Estándar',
    'Standard',
    2,
    1,
    'Habitación estándar acogedora con lo esencial. Perfecta para viajeros en busca de comodidad a buen precio.',
    75.00,
    110.00,
    false
  ) on conflict do nothing;

  -- Room 3 amenities: WiFi, AC, TV, Safe Box
  insert into public.room_amenities (room_id, amenity_id) values
    (v_room_standard, v_wifi),
    (v_room_standard, v_air_conditioning),
    (v_room_standard, v_tv),
    (v_room_standard, v_safe_box)
  on conflict do nothing;

  -- Room 3 schedules: Check-in 14:00-22:00, Check-out 06:00-14:00
  insert into public.room_schedules (room_id, schedule_type, time_slot) values
    (v_room_standard, 'check_in', '14:00'),
    (v_room_standard, 'check_in', '15:00'),
    (v_room_standard, 'check_in', '16:00'),
    (v_room_standard, 'check_in', '17:00'),
    (v_room_standard, 'check_in', '18:00'),
    (v_room_standard, 'check_in', '19:00'),
    (v_room_standard, 'check_in', '20:00'),
    (v_room_standard, 'check_in', '21:00'),
    (v_room_standard, 'check_in', '22:00'),
    (v_room_standard, 'check_out', '06:00'),
    (v_room_standard, 'check_out', '07:00'),
    (v_room_standard, 'check_out', '08:00'),
    (v_room_standard, 'check_out', '09:00'),
    (v_room_standard, 'check_out', '10:00'),
    (v_room_standard, 'check_out', '11:00'),
    (v_room_standard, 'check_out', '12:00'),
    (v_room_standard, 'check_out', '13:00'),
    (v_room_standard, 'check_out', '14:00')
  on conflict do nothing;

  ------------------------------------------------------------------
  -- 5. SAMPLE RESERVATIONS (next 30 days for testing)
  ------------------------------------------------------------------

  -- Deluxe: 3 reservations
  insert into public.reservations (
    user_id, guest_name, guest_email, guest_phone,
    room_id, check_in, check_out,
    adults, children, price_per_night, total_amount, status
  ) values
    (v_owner_id, 'Carlos Mendoza', 'carlos@example.com', '+506 8810-0101',
     v_room_deluxe, current_date + 3, current_date + 6, 2, 0, 150.00, 450.00, 'approved'),
    (v_admin_id, 'María García', 'maria@example.com', '+506 8810-0102',
     v_room_deluxe, current_date + 8, current_date + 10, 2, 1, 150.00, 300.00, 'pending'),
    (null, 'Familia Rossi', 'rossi@example.com', '+506 8810-0103',
     v_room_deluxe, current_date + 15, current_date + 18, 2, 2, 150.00, 450.00, 'pending');

  -- Suite: 3 reservations
  insert into public.reservations (
    user_id, guest_name, guest_email, guest_phone,
    room_id, check_in, check_out,
    adults, children, price_per_night, total_amount, status
  ) values
    (v_owner_id, 'Juan Pérez', 'juan@example.com', '+506 8810-0201',
     v_room_suite, current_date + 5, current_date + 9, 3, 1, 300.00, 1200.00, 'approved'),
    (v_admin_id, 'Patricia López', 'patricia@example.com', '+506 8810-0202',
     v_room_suite, current_date + 12, current_date + 15, 2, 0, 300.00, 900.00, 'pending'),
    (null, 'Empresa Tech Inc.', 'reservations@tech.com', '+506 8810-0203',
     v_room_suite, current_date + 20, current_date + 25, 4, 0, 300.00, 1500.00, 'pending');

  -- Standard: 3 reservations
  insert into public.reservations (
    user_id, guest_name, guest_email, guest_phone,
    room_id, check_in, check_out,
    adults, children, price_per_night, total_amount, status
  ) values
    (v_invite1_id, 'Diego Torres', 'diego@example.com', '+506 8810-0301',
     v_room_standard, current_date + 2, current_date + 4, 1, 0, 75.00, 150.00, 'approved'),
    (v_invite2_id, 'Lucía Fernández', 'lucia@example.com', '+506 8810-0302',
     v_room_standard, current_date + 7, current_date + 11, 2, 1, 75.00, 300.00, 'approved'),
    (null, 'Viajero Solitario', 'solo@example.com', '+506 8810-0303',
     v_room_standard, current_date + 18, current_date + 20, 1, 0, 75.00, 150.00, 'pending');

  ------------------------------------------------------------------
  -- 6. PENDING INVITATIONS
  ------------------------------------------------------------------

  insert into public.pending_invitations (
    id, email, user_id, invited_by, status, expires_at
  ) values
    (gen_random_uuid(),
     'newadmin@hotel.local',
     v_invite1_id,
     v_owner_id,
     'pending',
     now() + interval '7 days'),
    (gen_random_uuid(),
     'manager@hotel.local',
     v_invite2_id,
     v_owner_id,
     'pending',
     now() + interval '7 days');

end;
$$;
