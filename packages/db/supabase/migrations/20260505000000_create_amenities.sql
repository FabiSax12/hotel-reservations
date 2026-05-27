-- Create amenities table
CREATE TABLE IF NOT EXISTS public.amenities (
    id UUID PRIMARY KEY DEFAULT crypto.random_uuid(),
    name TEXT NOT NULL UNIQUE,
    icon TEXT, -- Name of the icon (e.g., from Lucide)
    description TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create room_amenities pivot table
CREATE TABLE IF NOT EXISTS public.room_amenities (
    room_id UUID REFERENCES public.rooms(id) ON DELETE CASCADE,
    amenity_id UUID REFERENCES public.amenities(id) ON DELETE CASCADE,
    PRIMARY KEY (room_id, amenity_id),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.amenities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.room_amenities ENABLE ROW LEVEL SECURITY;

-- Policies for amenities
CREATE POLICY "Amenities are viewable by everyone" ON public.amenities
    FOR SELECT USING (true);

CREATE POLICY "Amenities are manageable by admins only" ON public.amenities
    USING (auth.jwt() ->> 'role' = 'admin');

-- Policies for room_amenities
CREATE POLICY "Room amenities are viewable by everyone" ON public.room_amenities
    FOR SELECT USING (true);

CREATE POLICY "Room amenities are manageable by admins only" ON public.room_amenities
    USING (auth.jwt() ->> 'role' = 'admin');
