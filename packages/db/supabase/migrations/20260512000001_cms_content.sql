CREATE TABLE IF NOT EXISTS public.cms_content (
  id         uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  locale     text        NOT NULL CHECK (locale IN ('es', 'en')),
  section    text        NOT NULL CHECK (section IN ('hero', 'about')),
  content    jsonb       NOT NULL DEFAULT '{}',
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (locale, section)
);

ALTER TABLE public.cms_content ENABLE ROW LEVEL SECURITY;

CREATE POLICY "cms_content_read_public"
  ON public.cms_content FOR SELECT
  USING (true);

INSERT INTO storage.buckets (id, name, public)
VALUES ('cms-images', 'cms-images', true)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "cms_images_read_public"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'cms-images');
