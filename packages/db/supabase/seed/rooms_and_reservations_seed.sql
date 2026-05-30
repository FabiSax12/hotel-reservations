-- ============================================================
-- ROOMS  (las habitaciones ya existen con IDs auto-generados)
-- ============================================================

-- ============================================================
-- RESERVATIONS — 50 reservaciones 2026
-- Diseñadas para el panel de métricas:
--   • 2–4 reservaciones por semana para el gráfico semanal
--   • Mezcla de estados (completed, approved, cancelled, pending)
--   • Todas las habitaciones rotando para ocupación y ranking
--   • Pasado (ene–may 26): completed / cancelled
--   • Presente/futuro (may 27+): approved / pending
-- ============================================================
DELETE FROM public.reservations;

INSERT INTO public.reservations
  (room_id, guest_name, guest_email, guest_phone, check_in, check_out, adults, children, pets, price_per_night, total_amount, currency, status, cancellation_reason)
VALUES

  -- === SEMANA 1 (Jan 5–11) ===
  ((SELECT id FROM public.rooms WHERE name = 'Vista al Mar'),        'Ana García',          'ana.garcia@email.com',       '+506 8810-0101', '2026-01-05', '2026-01-08', 2, 0, 0,   85.00,   255.00, 'USD', 'completed', NULL),
  ((SELECT id FROM public.rooms WHERE name = 'Deluxe Premium'),      'Carlos Ruiz',         'carlos.ruiz@email.com',      '+506 8810-0102', '2026-01-06', '2026-01-10', 2, 1, 0,  180.00,   720.00, 'USD', 'completed', NULL),
  ((SELECT id FROM public.rooms WHERE name = 'Deluxe Garden'),       'María López',         'maria.lopez@email.com',      '+506 8810-0103', '2026-01-08', '2026-01-11', 1, 0, 0,  150.00,   450.00, 'USD', 'completed', NULL),

  -- === SEMANA 2 (Jan 12–18) ===
  ((SELECT id FROM public.rooms WHERE name = 'Estándar Montaña'),    'Jorge Soto',          'jorge.soto@email.com',       '+506 8810-0201', '2026-01-12', '2026-01-15', 2, 0, 0,   75.00,   225.00, 'USD', 'completed', NULL),
  ((SELECT id FROM public.rooms WHERE name = 'Suite Presidencial'),  'Fernanda Díaz',       'fernanda.diaz@email.com',    '+506 8810-0202', '2026-01-14', '2026-01-18', 2, 0, 0,  320.00,  1280.00, 'USD', 'completed', NULL),

  -- === SEMANA 3 (Jan 19–25) ===
  ((SELECT id FROM public.rooms WHERE name = 'Deluxe Premium'),      'Andrés Mora',         'andres.mora@email.com',      '+506 8810-0301', '2026-01-19', '2026-01-23', 2, 2, 0,  180.00,   720.00, 'USD', 'completed', NULL),
  ((SELECT id FROM public.rooms WHERE name = 'Vista al Mar'),        'Valentina Cruz',      'valentina.cruz@email.com',   '+506 8810-0302', '2026-01-20', '2026-01-22', 2, 0, 0,   85.00,   170.00, 'USD', 'completed', NULL),
  ((SELECT id FROM public.rooms WHERE name = 'Deluxe Garden'),       'Ricardo Vega',        'ricardo.vega@email.com',     '+506 8810-0303', '2026-01-22', '2026-01-26', 2, 1, 0,  150.00,   600.00, 'USD', 'cancelled', 'El huésped canceló por motivos personales'),

  -- === SEMANA 4 (Jan 26 – Feb 1) ===
  ((SELECT id FROM public.rooms WHERE name = 'Suite Presidencial'),  'Laura Herrera',       'laura.herrera@email.com',    '+506 8810-0401', '2026-01-26', '2026-01-30', 2, 0, 0,  320.00,  1280.00, 'USD', 'completed', NULL),
  ((SELECT id FROM public.rooms WHERE name = 'Estándar Montaña'),    'Diego Torres',        'diego.torres@email.com',     '+506 8810-0402', '2026-01-28', '2026-01-31', 1, 0, 0,   75.00,   225.00, 'USD', 'completed', NULL),
  ((SELECT id FROM public.rooms WHERE name = 'Deluxe Premium'),      'Paola Jiménez',       'paola.jimenez@email.com',    '+506 8810-0403', '2026-01-30', '2026-02-02', 2, 0, 1,  180.00,   540.00, 'USD', 'completed', NULL),

  -- === SEMANA 5 (Feb 2–8) ===
  ((SELECT id FROM public.rooms WHERE name = 'Vista al Mar'),        'Sebastián Araya',     'sebastian.araya@email.com',  '+506 8810-0501', '2026-02-02', '2026-02-05', 2, 0, 0,   85.00,   255.00, 'USD', 'completed', NULL),
  ((SELECT id FROM public.rooms WHERE name = 'Deluxe Garden'),       'Camila Ríos',         'camila.rios@email.com',      '+506 8810-0502', '2026-02-05', '2026-02-08', 2, 0, 0,  150.00,   450.00, 'USD', 'completed', NULL),

  -- === SEMANA 6 (Feb 9–15) ===
  ((SELECT id FROM public.rooms WHERE name = 'Deluxe Premium'),      'Marcos Solano',       'marcos.solano@email.com',    '+506 8810-0601', '2026-02-09', '2026-02-13', 2, 2, 0,  180.00,   720.00, 'USD', 'completed', NULL),
  ((SELECT id FROM public.rooms WHERE name = 'Suite Presidencial'),  'Isabella Peña',       'isabella.pena@email.com',    '+506 8810-0602', '2026-02-10', '2026-02-14', 2, 0, 0,  320.00,  1280.00, 'USD', 'completed', NULL),
  ((SELECT id FROM public.rooms WHERE name = 'Estándar Montaña'),    'Tomás Brenes',        'tomas.brenes@email.com',     '+506 8810-0603', '2026-02-12', '2026-02-14', 1, 0, 0,   75.00,   150.00, 'USD', 'cancelled', 'Cambio de planes de último momento'),

  -- === SEMANA 7 (Feb 16–22) ===
  ((SELECT id FROM public.rooms WHERE name = 'Deluxe Garden'),       'Natalia Campos',      'natalia.campos@email.com',   '+506 8810-0701', '2026-02-16', '2026-02-19', 2, 1, 0,  150.00,   450.00, 'USD', 'completed', NULL),
  ((SELECT id FROM public.rooms WHERE name = 'Vista al Mar'),        'Felipe Vargas',       'felipe.vargas@email.com',    '+506 8810-0702', '2026-02-18', '2026-02-21', 2, 0, 0,   85.00,   255.00, 'USD', 'completed', NULL),

  -- === SEMANA 8 (Feb 23 – Mar 1) ===
  ((SELECT id FROM public.rooms WHERE name = 'Suite Presidencial'),  'Lucía Fonseca',       'lucia.fonseca@email.com',    '+506 8810-0801', '2026-02-23', '2026-02-27', 2, 0, 0,  320.00,  1280.00, 'USD', 'completed', NULL),
  ((SELECT id FROM public.rooms WHERE name = 'Deluxe Premium'),      'Gabriel Mora',        'gabriel.mora@email.com',     '+506 8810-0802', '2026-02-25', '2026-03-01', 2, 1, 1,  180.00,   720.00, 'USD', 'completed', NULL),

  -- === SEMANA 9 (Mar 2–8) ===
  ((SELECT id FROM public.rooms WHERE name = 'Estándar Montaña'),    'Daniela Rojas',       'daniela.rojas@email.com',    '+506 8810-0901', '2026-03-02', '2026-03-05', 1, 0, 0,   75.00,   225.00, 'USD', 'completed', NULL),
  ((SELECT id FROM public.rooms WHERE name = 'Deluxe Garden'),       'Alejandro Cruz',      'alejandro.cruz@email.com',   '+506 8810-0902', '2026-03-04', '2026-03-07', 2, 0, 0,  150.00,   450.00, 'USD', 'completed', NULL),
  ((SELECT id FROM public.rooms WHERE name = 'Deluxe Premium'),      'Sofía Herrera',       'sofia.herrera@email.com',    '+506 8810-0903', '2026-03-05', '2026-03-09', 2, 3, 0,  180.00,   720.00, 'USD', 'completed', NULL),

  -- === SEMANA 10 (Mar 9–15) ===
  ((SELECT id FROM public.rooms WHERE name = 'Suite Presidencial'),  'Eduardo León',        'eduardo.leon@email.com',     '+506 8810-1001', '2026-03-09', '2026-03-13', 2, 0, 0,  320.00,  1280.00, 'USD', 'completed', NULL),
  ((SELECT id FROM public.rooms WHERE name = 'Vista al Mar'),        'Carmen Mora',         'carmen.mora@email.com',      '+506 8810-1002', '2026-03-11', '2026-03-14', 2, 0, 0,   85.00,   255.00, 'USD', 'completed', NULL),

  -- === SEMANA 11 (Mar 16–22) ===
  ((SELECT id FROM public.rooms WHERE name = 'Deluxe Garden'),       'Alberto Salas',       'alberto.salas@email.com',    '+506 8810-1101', '2026-03-16', '2026-03-20', 2, 2, 0,  150.00,   600.00, 'USD', 'completed', NULL),
  ((SELECT id FROM public.rooms WHERE name = 'Estándar Montaña'),    'Vanessa Cordero',     'vanessa.cordero@email.com',  '+506 8810-1102', '2026-03-18', '2026-03-21', 2, 0, 0,   75.00,   225.00, 'USD', 'completed', NULL),
  ((SELECT id FROM public.rooms WHERE name = 'Suite Presidencial'),  'Héctor Blanco',       'hector.blanco@email.com',    '+506 8810-1103', '2026-03-19', '2026-03-23', 2, 0, 0,  320.00,  1280.00, 'USD', 'cancelled', 'El huésped solicitó cancelación por enfermedad'),

  -- === SEMANA 12 (Mar 23–29) ===
  ((SELECT id FROM public.rooms WHERE name = 'Deluxe Premium'),      'Diana Salazar',       'diana.salazar@email.com',    '+506 8810-1201', '2026-03-23', '2026-03-26', 2, 0, 1,  180.00,   540.00, 'USD', 'completed', NULL),
  ((SELECT id FROM public.rooms WHERE name = 'Vista al Mar'),        'Manuel Ulate',        'manuel.ulate@email.com',     '+506 8810-1202', '2026-03-25', '2026-03-28', 1, 0, 0,   85.00,   255.00, 'USD', 'completed', NULL),

  -- === SEMANA 13 (Mar 30 – Apr 5) ===
  ((SELECT id FROM public.rooms WHERE name = 'Deluxe Garden'),       'Patricia Vega',       'patricia.vega@email.com',    '+506 8810-1301', '2026-03-30', '2026-04-03', 2, 0, 0,  150.00,   600.00, 'USD', 'completed', NULL),
  ((SELECT id FROM public.rooms WHERE name = 'Deluxe Premium'),      'Cristian Mora',       'cristian.mora@email.com',    '+506 8810-1302', '2026-04-01', '2026-04-05', 2, 2, 0,  180.00,   720.00, 'USD', 'completed', NULL),
  ((SELECT id FROM public.rooms WHERE name = 'Suite Presidencial'),  'Sandra Castillo',     'sandra.castillo@email.com',  '+506 8810-1303', '2026-04-02', '2026-04-06', 2, 0, 0,  320.00,  1280.00, 'USD', 'completed', NULL),

  -- === SEMANA 14 (Apr 6–12) ===
  ((SELECT id FROM public.rooms WHERE name = 'Estándar Montaña'),    'Mónica Quesada',      'monica.quesada@email.com',   '+506 8810-1401', '2026-04-06', '2026-04-09', 2, 0, 0,   75.00,   225.00, 'USD', 'completed', NULL),
  ((SELECT id FROM public.rooms WHERE name = 'Deluxe Garden'),       'Roberto Alvarado',    'roberto.alvarado@email.com', '+506 8810-1402', '2026-04-07', '2026-04-11', 2, 1, 0,  150.00,   600.00, 'USD', 'completed', NULL),

  -- === SEMANA 15 (Apr 13–19) ===
  ((SELECT id FROM public.rooms WHERE name = 'Vista al Mar'),        'Adriana Ramírez',     'adriana.ramirez@email.com',  '+506 8810-1501', '2026-04-13', '2026-04-16', 2, 0, 0,   85.00,   255.00, 'USD', 'completed', NULL),
  ((SELECT id FROM public.rooms WHERE name = 'Suite Presidencial'),  'Esteban Porras',      'esteban.porras@email.com',   '+506 8810-1502', '2026-04-14', '2026-04-18', 2, 0, 0,  320.00,  1280.00, 'USD', 'completed', NULL),
  ((SELECT id FROM public.rooms WHERE name = 'Deluxe Premium'),      'Valeria Monge',       'valeria.monge@email.com',    '+506 8810-1503', '2026-04-16', '2026-04-19', 2, 0, 1,  180.00,   540.00, 'USD', 'completed', NULL),

  -- === SEMANA 16 (Apr 20–26) ===
  ((SELECT id FROM public.rooms WHERE name = 'Estándar Montaña'),    'Javier Núñez',        'javier.nunez@email.com',     '+506 8810-1601', '2026-04-20', '2026-04-23', 2, 0, 0,   75.00,   225.00, 'USD', 'completed', NULL),
  ((SELECT id FROM public.rooms WHERE name = 'Deluxe Garden'),       'Carolina Hidalgo',    'carolina.hidalgo@email.com', '+506 8810-1602', '2026-04-22', '2026-04-25', 2, 1, 0,  150.00,   450.00, 'USD', 'approved',  NULL),

  -- === SEMANA 17 (Apr 27 – May 3) ===
  ((SELECT id FROM public.rooms WHERE name = 'Deluxe Premium'),      'Pablo Castro',        'pablo.castro@email.com',     '+506 8810-1701', '2026-04-27', '2026-05-01', 2, 2, 0,  180.00,   720.00, 'USD', 'completed', NULL),
  ((SELECT id FROM public.rooms WHERE name = 'Suite Presidencial'),  'Mariana Gutiérrez',   'mariana.gutierrez@email.com','+506 8810-1702', '2026-04-28', '2026-05-02', 2, 0, 0,  320.00,  1280.00, 'USD', 'approved',  NULL),

  -- === SEMANA 18 (May 4–10) ===
  ((SELECT id FROM public.rooms WHERE name = 'Vista al Mar'),        'Óscar Méndez',        'oscar.mendez@email.com',     '+506 8810-1801', '2026-05-04', '2026-05-07', 2, 0, 0,   85.00,   255.00, 'USD', 'approved',  NULL),
  ((SELECT id FROM public.rooms WHERE name = 'Deluxe Garden'),       'Teresa Fuentes',      'teresa.fuentes@email.com',   '+506 8810-1802', '2026-05-06', '2026-05-10', 2, 1, 0,  150.00,   600.00, 'USD', 'completed', NULL),

  -- === SEMANA 19 (May 11–17) ===
  ((SELECT id FROM public.rooms WHERE name = 'Estándar Montaña'),    'Ramón Solís',         'ramon.solis@email.com',      '+506 8810-1901', '2026-05-11', '2026-05-14', 1, 0, 0,   75.00,   225.00, 'USD', 'approved',  NULL),
  ((SELECT id FROM public.rooms WHERE name = 'Suite Presidencial'),  'Gloria Espinoza',     'gloria.espinoza@email.com',  '+506 8810-1902', '2026-05-13', '2026-05-17', 2, 0, 0,  320.00,  1280.00, 'USD', 'cancelled', 'Cancelación por emergencia familiar'),

  -- === SEMANA 20 (May 18–24) ===
  ((SELECT id FROM public.rooms WHERE name = 'Deluxe Premium'),      'Ernesto Lobo',        'ernesto.lobo@email.com',     '+506 8810-2001', '2026-05-18', '2026-05-21', 2, 0, 1,  180.00,   540.00, 'USD', 'approved',  NULL),
  ((SELECT id FROM public.rooms WHERE name = 'Vista al Mar'),        'Beatriz Cordero',     'beatriz.cordero@email.com',  '+506 8810-2002', '2026-05-20', '2026-05-23', 2, 0, 0,   85.00,   255.00, 'USD', 'approved',  NULL),

  -- === SEMANA 21 (May 25–31) — semana actual ===
  ((SELECT id FROM public.rooms WHERE name = 'Deluxe Garden'),       'Rodrigo Mora',        'rodrigo.mora@email.com',     '+506 8810-2101', '2026-05-25', '2026-05-28', 2, 0, 0,  150.00,   450.00, 'USD', 'approved',  NULL),
  ((SELECT id FROM public.rooms WHERE name = 'Suite Presidencial'),  'Simón Castro',        'simon.castro@email.com',     '+506 8810-2102', '2026-05-27', '2026-05-30', 2, 0, 0,  320.00,   960.00, 'USD', 'pending',   NULL),

  -- === SEMANAS FUTURAS (Jun–Jul) ===
  ((SELECT id FROM public.rooms WHERE name = 'Deluxe Premium'),      'Raquel Jiménez',      'raquel.jimenez@email.com',   '+506 8810-2201', '2026-06-01', '2026-06-05', 2, 2, 0,  180.00,   720.00, 'USD', 'pending',   NULL),
  ((SELECT id FROM public.rooms WHERE name = 'Estándar Montaña'),    'Nicolás Arias',       'nicolas.arias@email.com',    '+506 8810-2202', '2026-06-03', '2026-06-07', 1, 0, 0,   75.00,   300.00, 'USD', 'pending',   NULL),
  ((SELECT id FROM public.rooms WHERE name = 'Deluxe Garden'),       'Sofía Robles',        'sofia.robles@email.com',     '+506 8810-2301', '2026-06-15', '2026-06-19', 2, 0, 0,  150.00,   600.00, 'USD', 'pending',   NULL),
  ((SELECT id FROM public.rooms WHERE name = 'Suite Presidencial'),  'Mateo Sandoval',      'mateo.sandoval@email.com',   '+506 8810-2401', '2026-07-02', '2026-07-06', 2, 0, 0,  320.00,  1280.00, 'USD', 'pending',   NULL);
