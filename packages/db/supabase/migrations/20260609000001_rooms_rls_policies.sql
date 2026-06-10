-- Enable RLS for rooms table
-- NOTE: These tables already have RLS from earlier migrations:
--   - room_amenities, amenities (from 20260505000000_create_amenities.sql)
--   - room_schedules (from 20260517000000_create_room_schedules.sql)
--   - room_images (from 20260609000000_create_room_images_table.sql)
-- This migration adds RLS to the remaining table: rooms

-- === ROOMS TABLE ===
ALTER TABLE public.rooms ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Rooms are viewable by everyone" ON public.rooms
    FOR SELECT USING (true);

CREATE POLICY "Rooms are manageable by admins only" ON public.rooms
    USING (auth.jwt() ->> 'role' = 'admin');
