-- ============================================================
-- ROOMS
-- ============================================================
INSERT INTO public.rooms (id, name, category, capacity_adults, capacity_kids, description, regular_fee, high_season_fee, is_active, is_pet_friendly)
VALUES
  ('10000000-0000-0000-0000-000000000001', 'Habitación Estándar', 'Standard', 2, 0, 'Habitación cómoda con vista interior, ideal para estadías cortas.', 110.00, 135.00, true, false),
  ('10000000-0000-0000-0000-000000000002', 'Habitación Estándar', 'Standard', 2, 0, 'Habitación estándar en piso alto con buena iluminación natural.', 120.00, 145.00, true, false),
  ('10000000-0000-0000-0000-000000000003', 'Habitación Deluxe',   'Deluxe',   2, 1, 'Espaciosa habitación con vista al jardín y amenidades premium.',  180.00, 220.00, true, false),
  ('10000000-0000-0000-0000-000000000004', 'Habitación Deluxe',   'Deluxe',   2, 1, 'Habitación deluxe con balcón privado y vista al jardín.',         180.00, 220.00, true, false),
  ('10000000-0000-0000-0000-000000000005', 'Habitación Familiar', 'Deluxe',   2, 3, 'Amplia habitación familiar con zona de descanso para niños.',     230.00, 280.00, true, false),
  ('10000000-0000-0000-0000-000000000006', 'Suite Junior',        'Suite',    2, 2, 'Suite con sala de estar separada y vista panorámica al jardín.',  190.00, 240.00, true, true),
  ('10000000-0000-0000-0000-000000000007', 'Suite Ejecutiva',     'Suite',    2, 0, 'Suite de lujo con escritorio privado y vistas a la ciudad.',      300.00, 380.00, true, true),
  ('10000000-0000-0000-0000-000000000008', 'Suite Panorámica',    'Suite',    2, 2, 'Suite con ventanales de piso a techo y vista directa al mar.',    250.00, 320.00, true, false),
  ('10000000-0000-0000-0000-000000000009', 'Suite Presidencial',  'Suite',    2, 0, 'La suite más exclusiva del hotel con vista panorámica de 360°.',  500.00, 650.00, true, false)
ON CONFLICT (id) DO NOTHING;

-- ============================================================
-- RESERVATIONS  (code se genera automáticamente: RES-001 ...)
-- ============================================================
INSERT INTO public.reservations
  (room_id, guest_name, guest_email, guest_phone, check_in, check_out, adults, children, pets, price_per_night, total_amount, currency, status)
VALUES
  -- 1  María García — Suite Panorámica — pending
  ('10000000-0000-0000-0000-000000000008', 'María García',       'maria.garcia@email.com',    '+506 8800-0101', '2026-04-20', '2026-04-25', 2, 1, 0,  250.00,  1250.00, 'USD', 'pending'),
  -- 2  Carlos Rodríguez — Habitación Deluxe — approved
  ('10000000-0000-0000-0000-000000000004', 'Carlos Rodríguez',   'carlos.r@email.com',        '+506 8800-0201', '2026-04-18', '2026-04-21', 2, 0, 0,  180.00,   540.00, 'USD', 'approved'),
  -- 3  Ana Martínez — Habitación Estándar — completed
  ('10000000-0000-0000-0000-000000000001', 'Ana Martínez',       'ana.m@email.com',           '+506 8800-0301', '2026-04-10', '2026-04-12', 2, 0, 0,  110.00,   220.00, 'USD', 'completed'),
  -- 4  Luis Fernández — Suite Ejecutiva — approved
  ('10000000-0000-0000-0000-000000000007', 'Luis Fernández',     'lfernandez@email.com',      '+506 8800-0401', '2026-04-22', '2026-04-28', 1, 0, 0,  300.00,  1800.00, 'USD', 'approved'),
  -- 5  Sofia Vargas — Habitación Deluxe — cancelled
  ('10000000-0000-0000-0000-000000000003', 'Sofia Vargas',       'sofia.v@email.com',         '+506 8800-0501', '2026-04-15', '2026-04-17', 1, 0, 1,  180.00,   360.00, 'USD', 'cancelled'),
  -- 6  Diego Mora — Habitación Estándar — pending
  ('10000000-0000-0000-0000-000000000001', 'Diego Mora',         'diego.mora@email.com',      '+506 8800-0601', '2026-05-01', '2026-05-04', 2, 0, 0,  110.00,   330.00, 'USD', 'pending'),
  -- 7  Valeria Cruz — Suite Junior — pending
  ('10000000-0000-0000-0000-000000000006', 'Valeria Cruz',       'valeria.cruz@email.com',    '+506 8800-0701', '2026-05-03', '2026-05-07', 2, 2, 1,  190.00,   760.00, 'USD', 'pending'),
  -- 8  Andrés Salazar — Suite Presidencial — approved
  ('10000000-0000-0000-0000-000000000009', 'Andrés Salazar',     'andres.salazar@email.com',  '+506 8800-0801', '2026-04-30', '2026-05-05', 2, 0, 0,  500.00,  2500.00, 'USD', 'approved'),
  -- 9  Camila Porras — Habitación Familiar — completed
  ('10000000-0000-0000-0000-000000000005', 'Camila Porras',      'camila.porras@email.com',   '+506 8800-0901', '2026-04-26', '2026-04-29', 2, 2, 0,  230.00,   690.00, 'USD', 'completed'),
  -- 10 Jorge Herrera — Habitación Estándar — cancelled
  ('10000000-0000-0000-0000-000000000002', 'Jorge Herrera',      'jorge.herrera@email.com',   '+506 8800-1001', '2026-05-08', '2026-05-10', 1, 0, 0,  120.00,   240.00, 'USD', 'cancelled'),
  -- 11 Isabella Rojas — Suite Panorámica — pending
  ('10000000-0000-0000-0000-000000000008', 'Isabella Rojas',     'isabella.rojas@email.com',  '+506 8800-1101', '2026-05-12', '2026-05-16', 2, 1, 0,  250.00,  1000.00, 'USD', 'pending'),
  -- 12 Sebastián Quesada — Habitación Deluxe — approved
  ('10000000-0000-0000-0000-000000000003', 'Sebastián Quesada',  'sebastian.q@email.com',     '+506 8800-1201', '2026-05-14', '2026-05-17', 2, 0, 0,  180.00,   540.00, 'USD', 'approved'),
  -- 13 Gabriela Monge — Suite Ejecutiva — pending
  ('10000000-0000-0000-0000-000000000007', 'Gabriela Monge',     'gabriela.monge@email.com',  '+506 8800-1301', '2026-05-20', '2026-05-23', 1, 0, 1,  300.00,   900.00, 'USD', 'pending'),
  -- 14 Martín Solano — Habitación Familiar — approved
  ('10000000-0000-0000-0000-000000000005', 'Martín Solano',      'martin.solano@email.com',   '+506 8800-1401', '2026-05-25', '2026-05-30', 2, 3, 0,  230.00,  1150.00, 'USD', 'approved'),
  -- 15 Natalia Brenes — Suite Presidencial — completed
  ('10000000-0000-0000-0000-000000000009', 'Natalia Brenes',     'natalia.brenes@email.com',  '+506 8800-1501', '2026-06-01', '2026-06-05', 2, 0, 0,  500.00,  2000.00, 'USD', 'completed'),
  -- 16 Ricardo Mora — Habitación Estándar — pending
  ('10000000-0000-0000-0000-000000000001', 'Ricardo Mora',       'ricardo.mora@email.com',    '+506 8800-1601', '2026-06-10', '2026-06-12', 1, 0, 0,  110.00,   220.00, 'USD', 'pending'),
  -- 17 Fernanda Castro — Suite Junior — approved
  ('10000000-0000-0000-0000-000000000006', 'Fernanda Castro',    'fernanda.castro@email.com', '+506 8800-1701', '2026-06-08', '2026-06-12', 2, 1, 0,  190.00,   760.00, 'USD', 'approved'),
  -- 18 Pablo Jiménez — Habitación Deluxe — completed
  ('10000000-0000-0000-0000-000000000004', 'Pablo Jiménez',      'pablo.jimenez@email.com',   '+506 8800-1801', '2026-05-18', '2026-05-21', 2, 0, 0,  180.00,   540.00, 'USD', 'completed'),
  -- 19 Lucía Araya — Suite Panorámica — pending
  ('10000000-0000-0000-0000-000000000008', 'Lucía Araya',        'lucia.araya@email.com',     '+506 8800-1901', '2026-06-15', '2026-06-20', 2, 1, 0,  250.00,  1250.00, 'USD', 'pending'),
  -- 20 Tomás Fonseca — Habitación Familiar — approved
  ('10000000-0000-0000-0000-000000000005', 'Tomás Fonseca',      'tomas.fonseca@email.com',   '+506 8800-2001', '2026-06-20', '2026-06-25', 2, 2, 0,  230.00,  1150.00, 'USD', 'approved'),
  -- 21 Valentina Hidalgo — Suite Ejecutiva — cancelled
  ('10000000-0000-0000-0000-000000000007', 'Valentina Hidalgo',  'valentina.h@email.com',     '+506 8800-2101', '2026-06-01', '2026-06-04', 2, 0, 0,  300.00,   900.00, 'USD', 'cancelled'),
  -- 22 Emilio Cordero — Habitación Estándar — approved
  ('10000000-0000-0000-0000-000000000002', 'Emilio Cordero',     'emilio.cordero@email.com',  '+506 8800-2201', '2026-06-05', '2026-06-07', 2, 0, 0,  120.00,   240.00, 'USD', 'approved'),
  -- 23 Daniela Vega — Suite Presidencial — pending
  ('10000000-0000-0000-0000-000000000009', 'Daniela Vega',       'daniela.vega@email.com',    '+506 8800-2301', '2026-07-01', '2026-07-05', 2, 0, 0,  500.00,  2000.00, 'USD', 'pending'),
  -- 24 Adrián Campos — Habitación Deluxe — approved
  ('10000000-0000-0000-0000-000000000003', 'Adrián Campos',      'adrian.campos@email.com',   '+506 8800-2401', '2026-06-28', '2026-07-01', 2, 0, 0,  180.00,   540.00, 'USD', 'approved'),
  -- 25 Carolina Méndez — Suite Junior — pending
  ('10000000-0000-0000-0000-000000000006', 'Carolina Méndez',    'carolina.mendez@email.com', '+506 8800-2501', '2026-07-10', '2026-07-14', 2, 0, 1,  190.00,   760.00, 'USD', 'pending');

-- Razones de cancelación
UPDATE public.reservations SET cancellation_reason = 'El huésped canceló por motivos personales'   WHERE guest_email = 'sofia.v@email.com';
UPDATE public.reservations SET cancellation_reason = 'Cambio de planes del huésped'                WHERE guest_email = 'jorge.herrera@email.com';
UPDATE public.reservations SET cancellation_reason = 'El huésped solicitó cancelación por enfermedad' WHERE guest_email = 'valentina.h@email.com';
