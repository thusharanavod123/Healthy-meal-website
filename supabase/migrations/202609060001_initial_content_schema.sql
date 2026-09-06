-- FreshTable content schema for Supabase/Postgres
create extension if not exists pgcrypto;

create type public.recipe_status as enum ('draft', 'published');

create table public.categories (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  slug text not null unique check (slug ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$'),
  description text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.recipes (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique check (slug ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$'),
  short_description text not null,
  body text,
  hero_image_url text,
  hero_image_alt text,
  author_id uuid references auth.users(id) on delete set null,
  author_name text not null,
  status public.recipe_status not null default 'draft',
  published_at timestamptz,
  prep_minutes smallint not null default 0 check (prep_minutes >= 0),
  cook_minutes smallint not null default 0 check (cook_minutes >= 0),
  servings smallint check (servings > 0),
  calories smallint check (calories >= 0),
  protein_grams numeric(7,2) check (protein_grams >= 0),
  carbs_grams numeric(7,2) check (carbs_grams >= 0),
  fat_grams numeric(7,2) check (fat_grams >= 0),
  helpful_tips text[] not null default '{}',
  seo_title text,
  meta_description text,
  canonical_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint published_has_date check (status = 'draft' or published_at is not null)
);

create table public.recipe_categories (
  recipe_id uuid not null references public.recipes(id) on delete cascade,
  category_id uuid not null references public.categories(id) on delete cascade,
  is_primary boolean not null default false,
  primary key (recipe_id, category_id)
);
create unique index one_primary_category_per_recipe on public.recipe_categories(recipe_id) where is_primary;

create table public.tags (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  slug text not null unique check (slug ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$'),
  created_at timestamptz not null default now()
);
create table public.recipe_tags (
  recipe_id uuid not null references public.recipes(id) on delete cascade,
  tag_id uuid not null references public.tags(id) on delete cascade,
  primary key (recipe_id, tag_id)
);

create table public.ingredients (
  id uuid primary key default gen_random_uuid(),
  recipe_id uuid not null references public.recipes(id) on delete cascade,
  section text,
  display_text text not null,
  sort_order smallint not null check (sort_order >= 0),
  unique (recipe_id, sort_order)
);
create table public.recipe_steps (
  id uuid primary key default gen_random_uuid(),
  recipe_id uuid not null references public.recipes(id) on delete cascade,
  section text,
  instruction text not null,
  image_url text,
  sort_order smallint not null check (sort_order >= 0),
  unique (recipe_id, sort_order)
);
create table public.recipe_faqs (
  id uuid primary key default gen_random_uuid(),
  recipe_id uuid not null references public.recipes(id) on delete cascade,
  question text not null,
  answer text not null,
  sort_order smallint not null check (sort_order >= 0),
  unique (recipe_id, sort_order)
);

create or replace function public.set_updated_at() returns trigger language plpgsql set search_path = '' as $$ begin new.updated_at = now(); return new; end; $$;
create trigger categories_updated_at before update on public.categories for each row execute function public.set_updated_at();
create trigger recipes_updated_at before update on public.recipes for each row execute function public.set_updated_at();

create index recipes_status_published_idx on public.recipes(status, published_at desc);
create index ingredients_recipe_idx on public.ingredients(recipe_id, sort_order);
create index recipe_steps_recipe_idx on public.recipe_steps(recipe_id, sort_order);
create index recipe_faqs_recipe_idx on public.recipe_faqs(recipe_id, sort_order);

alter table public.categories enable row level security;
alter table public.recipes enable row level security;
alter table public.recipe_categories enable row level security;
alter table public.tags enable row level security;
alter table public.recipe_tags enable row level security;
alter table public.ingredients enable row level security;
alter table public.recipe_steps enable row level security;
alter table public.recipe_faqs enable row level security;

create policy "Public reads categories" on public.categories for select using (true);
create policy "Public reads tags" on public.tags for select using (true);
create policy "Public reads published recipes" on public.recipes for select using (status = 'published');
create policy "Public reads published recipe categories" on public.recipe_categories for select using (exists (select 1 from public.recipes r where r.id = recipe_id and r.status = 'published'));
create policy "Public reads published recipe tags" on public.recipe_tags for select using (exists (select 1 from public.recipes r where r.id = recipe_id and r.status = 'published'));
create policy "Public reads published ingredients" on public.ingredients for select using (exists (select 1 from public.recipes r where r.id = recipe_id and r.status = 'published'));
create policy "Public reads published steps" on public.recipe_steps for select using (exists (select 1 from public.recipes r where r.id = recipe_id and r.status = 'published'));
create policy "Public reads published faqs" on public.recipe_faqs for select using (exists (select 1 from public.recipes r where r.id = recipe_id and r.status = 'published'));

-- Authenticated write policies should be added with role checks when admin auth is implemented.
