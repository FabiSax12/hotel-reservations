-- Migration: Create gallery tables for hotel photo gallery management
-- US-CH-06: Gestionar galería de fotos del hotel

-- Table: gallery_items (stores the image and basic info)
CREATE TABLE IF NOT EXISTS public.gallery_items (
  id         uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  image_url  text        NOT NULL,
  is_active  boolean     NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Table: gallery_content (stores localized title and description)
CREATE TABLE IF NOT EXISTS public.gallery_content (
  id              uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  gallery_item_id uuid        NOT NULL REFERENCES public.gallery_items(id) ON DELETE CASCADE,
  locale          text        NOT NULL CHECK (locale IN ('es', 'en')),
  title           text        NOT NULL DEFAULT '',
  description     text        NOT NULL DEFAULT '',
  updated_at      timestamptz NOT NULL DEFAULT now(),
  UNIQUE (gallery_item_id, locale)
);

-- Index for faster queries by locale
CREATE INDEX IF NOT EXISTS idx_gallery_content_locale ON public.gallery_content(locale);

-- Index for faster queries by gallery_item_id
CREATE INDEX IF NOT EXISTS idx_gallery_content_gallery_item_id ON public.gallery_content(gallery_item_id);

-- Enable RLS
ALTER TABLE public.gallery_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gallery_content ENABLE ROW LEVEL SECURITY;

-- RLS Policies for gallery_items
CREATE POLICY "Gallery items are viewable by everyone"
  ON public.gallery_items FOR SELECT
  USING (true);

CREATE POLICY "Gallery items are manageable by admins and owners"
  ON public.gallery_items
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.user_roles
      WHERE user_id = auth.uid() AND role IN ('admin', 'owner')
    )
  );

-- RLS Policies for gallery_content
CREATE POLICY "Gallery content is viewable by everyone"
  ON public.gallery_content FOR SELECT
  USING (true);

CREATE POLICY "Gallery content is manageable by admins and owners"
  ON public.gallery_content
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.user_roles
      WHERE user_id = auth.uid() AND role IN ('admin', 'owner')
    )
  );