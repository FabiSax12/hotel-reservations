CREATE TABLE public.system_settings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    setting_key VARCHAR NOT NULL UNIQUE,
    setting_value VARCHAR NOT NULL,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TRIGGER set_system_settings_updated_at
    BEFORE UPDATE ON public.system_settings
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_updated_at();

ALTER TABLE public.system_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "system_settings_admin_select"
    ON public.system_settings FOR SELECT
    TO authenticated
    USING (public.is_admin_or_owner());

CREATE POLICY "system_settings_admin_update"
    ON public.system_settings FOR UPDATE
    TO authenticated
    USING (public.is_admin_or_owner())
    WITH CHECK (public.is_admin_or_owner());

INSERT INTO public.system_settings (setting_key, setting_value)
VALUES ('booking_confirmation_mode', 'manual');
