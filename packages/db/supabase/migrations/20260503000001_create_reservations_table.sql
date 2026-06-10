CREATE SEQUENCE IF NOT EXISTS public.reservation_code_seq;

CREATE TABLE public.reservations (
  id              uuid          PRIMARY KEY DEFAULT gen_random_uuid(),
  code            text          UNIQUE NOT NULL
                                DEFAULT 'RES-' || LPAD(nextval('public.reservation_code_seq')::text, 3, '0'),

  -- Huésped: usuario registrado (cliente) o walk-in
  user_id         uuid          REFERENCES public.users(id) ON DELETE SET NULL,
  guest_name      text          NOT NULL,
  guest_email     text          NOT NULL,
  guest_phone     text          NOT NULL,

  -- Habitación
  room_id         uuid          NOT NULL REFERENCES public.rooms(id),

  -- Estadía
  check_in        date          NOT NULL,
  check_out       date          NOT NULL,
  adults          integer       NOT NULL DEFAULT 1 CHECK (adults >= 1),
  children        integer       NOT NULL DEFAULT 0 CHECK (children >= 0),
  pets            integer       NOT NULL DEFAULT 0 CHECK (pets >= 0),

  -- Snapshot del precio al momento de reservar
  price_per_night numeric(10,2) NOT NULL CHECK (price_per_night > 0),
  total_amount    numeric(10,2) NOT NULL CHECK (total_amount > 0),
  currency        text          NOT NULL DEFAULT 'USD',

  -- Estado
  status          text          NOT NULL DEFAULT 'pending'
                                CHECK (status IN ('pending', 'approved', 'cancelled', 'completed')),
  cancellation_reason text      CHECK (status <> 'cancelled' OR cancellation_reason IS NOT NULL),

  created_at      timestamptz   NOT NULL DEFAULT now(),
  updated_at      timestamptz   NOT NULL DEFAULT now(),

  CONSTRAINT check_out_after_check_in CHECK (check_out > check_in)
);

CREATE TRIGGER set_reservations_updated_at
  BEFORE UPDATE ON public.reservations
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

ALTER TABLE public.reservations ENABLE ROW LEVEL SECURITY;
