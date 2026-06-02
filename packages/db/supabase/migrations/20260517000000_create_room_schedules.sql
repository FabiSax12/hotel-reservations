-- Create room_schedules table
CREATE TABLE IF NOT EXISTS public.room_schedules (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    room_id UUID NOT NULL REFERENCES public.rooms(id) ON DELETE CASCADE,
    schedule_type TEXT NOT NULL CHECK (schedule_type IN ('check_in', 'check_out')),
    time_slot TIME NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.room_schedules ENABLE ROW LEVEL SECURITY;

-- Policies for room_schedules
CREATE POLICY "Room schedules are viewable by everyone" ON public.room_schedules
    FOR SELECT USING (true);

CREATE POLICY "Room schedules are manageable by admins only" ON public.room_schedules
    USING (auth.jwt() ->> 'role' = 'admin');
