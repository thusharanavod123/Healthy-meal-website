-- Phase 2: approved admins, richer recipes, and image storage.
alter table public.recipes add column featured boolean not null default false;
alter table public.ingredients add column quantity text;
alter table public.ingredients add column unit text;
alter table public.ingredients add column name text;
alter table public.ingredients add column note text;

create table public.admin_users (
  user_id uuid primary key references auth.users(id) on delete cascade,
  display_name text,
  created_at timestamptz not null default now()
);
alter table public.admin_users enable row level security;

create or replace function public.is_admin(check_user uuid default auth.uid())
returns boolean language sql stable security definer set search_path = ''
as $$ select exists (select 1 from public.admin_users where user_id = check_user); $$;
revoke all on function public.is_admin(uuid) from public;
grant execute on function public.is_admin(uuid) to authenticated;

create policy "Admins read own approval" on public.admin_users for select to authenticated using (user_id = auth.uid());
create policy "Admins manage categories" on public.categories for all to authenticated using (public.is_admin()) with check (public.is_admin());
create policy "Admins manage recipes" on public.recipes for all to authenticated using (public.is_admin()) with check (public.is_admin());
create policy "Admins manage recipe categories" on public.recipe_categories for all to authenticated using (public.is_admin()) with check (public.is_admin());
create policy "Admins manage tags" on public.tags for all to authenticated using (public.is_admin()) with check (public.is_admin());
create policy "Admins manage recipe tags" on public.recipe_tags for all to authenticated using (public.is_admin()) with check (public.is_admin());
create policy "Admins manage ingredients" on public.ingredients for all to authenticated using (public.is_admin()) with check (public.is_admin());
create policy "Admins manage steps" on public.recipe_steps for all to authenticated using (public.is_admin()) with check (public.is_admin());
create policy "Admins manage faqs" on public.recipe_faqs for all to authenticated using (public.is_admin()) with check (public.is_admin());

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('recipe-images', 'recipe-images', true, 5242880, array['image/jpeg','image/png','image/webp','image/avif'])
on conflict (id) do update set public = excluded.public, file_size_limit = excluded.file_size_limit, allowed_mime_types = excluded.allowed_mime_types;
create policy "Public reads recipe images" on storage.objects for select using (bucket_id = 'recipe-images');
create policy "Admins upload recipe images" on storage.objects for insert to authenticated with check (bucket_id = 'recipe-images' and public.is_admin());
create policy "Admins update recipe images" on storage.objects for update to authenticated using (bucket_id = 'recipe-images' and public.is_admin()) with check (bucket_id = 'recipe-images' and public.is_admin());
create policy "Admins delete recipe images" on storage.objects for delete to authenticated using (bucket_id = 'recipe-images' and public.is_admin());
