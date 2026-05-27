-- Migration: Update RLS policies for amenities and room_amenities
-- Supporting both admin and owner roles via user_roles table

-- Drop existing policies
DROP POLICY IF EXISTS "Amenities are viewable by everyone" ON public.amenities;
DROP POLICY IF EXISTS "Amenities are manageable by admins only" ON public.amenities;
DROP POLICY IF EXISTS "Room amenities are viewable by everyone" ON public.room_amenities;
DROP POLICY IF EXISTS "Room amenities are manageable by admins only" ON public.room_amenities;

-- Policies for amenities
CREATE POLICY "Amenities are viewable by everyone" 
ON public.amenities FOR SELECT 
USING (true);

CREATE POLICY "Amenities are manageable by admins and owners" 
ON public.amenities 
TO authenticated
USING (
    EXISTS (
        SELECT 1 FROM public.user_roles
        WHERE user_id = auth.uid() AND role IN ('admin', 'owner')
    )
);

-- Policies for room_amenities
CREATE POLICY "Room amenities are viewable by everyone" 
ON public.room_amenities FOR SELECT 
USING (true);

CREATE POLICY "Room amenities are manageable by admins and owners" 
ON public.room_amenities 
TO authenticated
USING (
    EXISTS (
        SELECT 1 FROM public.user_roles
        WHERE user_id = auth.uid() AND role IN ('admin', 'owner')
    )
);
