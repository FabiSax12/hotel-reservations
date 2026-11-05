-- Fase 3 — Operaciones (OP-R05, OP-R07): defensa en la base de datos.
--
-- La validación principal vive en el servidor (reservation-rules.ts). Estas
-- restricciones son la última línea: también aplican al cliente service-role,
-- que salta la RLS pero no los triggers ni los CHECK.

-- OP-R05: máquina de estados de reservations.status.
--   pending  -> approved | cancelled
--   approved -> completed | cancelled
--   cancelled, completed: estados finales
create or replace function public.enforce_reservation_status_transition()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  if new.status is distinct from old.status and not (
    (old.status = 'pending'  and new.status in ('approved', 'cancelled')) or
    (old.status = 'approved' and new.status in ('completed', 'cancelled'))
  ) then
    raise exception 'invalid reservation status transition: % -> %', old.status, new.status
      using errcode = 'check_violation';
  end if;
  return new;
end;
$$;

drop trigger if exists reservations_status_transition on public.reservations;
create trigger reservations_status_transition
  before update of status on public.reservations
  for each row
  execute function public.enforce_reservation_status_transition();

-- OP-R07: booking_confirmation_mode solo admite los valores del enum BookingMode.
alter table public.system_settings
  drop constraint if exists system_settings_booking_mode_valid;
alter table public.system_settings
  add constraint system_settings_booking_mode_valid
  check (setting_key <> 'booking_confirmation_mode' or setting_value in ('manual', 'automatic'));
