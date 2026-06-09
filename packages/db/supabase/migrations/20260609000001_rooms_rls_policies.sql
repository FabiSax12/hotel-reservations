-- Enable RLS for rooms and related tables
-- NOTE: room_amenities and amenities already have RLS from migration 20260505000000_create_amenities.sql
-- This migration adds RLS to: rooms, room_schedules, room_images

-- === ROOMS TABLE ===
ALTER TABLE public.rooms ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Rooms are viewable by everyone" ON public.rooms
    FOR SELECT USING (true);

CREATE POLICY "Rooms are manageable by admins only" ON public.rooms
    USING (auth.jwt() ->> 'role' = 'admin');

-- === ROOM_SCHEDULES TABLE ===
ALTER TABLE public.room_schedules ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Room schedules are viewable by everyone" ON public.room_schedules
    FOR SELECT USING (true);

CREATE POLICY "Room schedules are manageable by admins only" ON public.room_schedules
    USING (auth.jwt() ->> 'role' = 'admin');

-- === ROOM_IMAGES TABLE ===
ALTER TABLE public.room_images ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Room images are viewable by everyone" ON public.room_images
    FOR SELECT USING (true);

CREATE POLICY "Room images are manageable by admins only" ON public.room_images
    USING (auth.jwt() ->> 'role' = 'admin');
