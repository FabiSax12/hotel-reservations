-- Extend cms_content.section to allow new CMS sections (US-CH-04 CMS extension)
ALTER TABLE public.cms_content DROP CONSTRAINT IF EXISTS cms_content_section_check;

ALTER TABLE public.cms_content
  ADD CONSTRAINT cms_content_section_check
  CHECK (section IN ('hero', 'about', 'about-text', 'services', 'properties', 'gallery', 'testimonials'));
