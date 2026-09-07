-- Phase 3: editable SEO metadata for category landing pages.
alter table public.categories add column if not exists seo_title text;
alter table public.categories add column if not exists meta_description text;

comment on column public.categories.seo_title is 'Optional search title; aim for roughly 50-60 characters.';
comment on column public.categories.meta_description is 'Optional search description; aim for roughly 140-160 characters.';
