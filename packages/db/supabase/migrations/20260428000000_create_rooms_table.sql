-- Create rooms table
-- Category values must match ROOM_CATEGORIES in info.constants.ts: ['Standard', 'Deluxe', 'Suite']
-- Capacity/fee constraints must match Zod schema in RoomInfoForm.interface.ts
CREATE TABLE IF NOT EXISTS public.rooms (
    id               UUID           PRIMARY KEY DEFAULT gen_random_uuid(),
    name             TEXT           NOT NULL CHECK (char_length(name) >= 3),
    category         TEXT           NOT NULL CHECK (category IN ('Standard', 'Deluxe', 'Suite')),
    capacity_adults  INTEGER        NOT NULL CHECK (capacity_adults >= 1),
    capacity_kids    INTEGER        NOT NULL CHECK (capacity_kids >= 0),
    description      TEXT,
    regular_fee      NUMERIC(10, 2) NOT NULL CHECK (regular_fee >= 1),
    high_season_fee  NUMERIC(10, 2) NOT NULL CHECK (high_season_fee >= 1),
    is_active        BOOLEAN        NOT NULL DEFAULT true,
    is_pet_friendly  BOOLEAN        NOT NULL DEFAULT false,
    created_at       TIMESTAMPTZ    NOT NULL DEFAULT now(),
    updated_at       TIMESTAMPTZ    NOT NULL DEFAULT now()
);

-- Automatically keep updated_at in sync on every UPDATE
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_updated_at
    BEFORE UPDATE ON public.rooms
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_updated_at();

