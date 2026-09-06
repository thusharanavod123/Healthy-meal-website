# FreshTable

FreshTable is a mobile-first healthy recipe publishing system built with Next.js App Router, TypeScript, Tailwind CSS, shadcn/ui conventions, Supabase Auth/Postgres/Storage, and Vercel-friendly caching.

## Local setup

```powershell
npm install
Copy-Item .env.example .env.local
npm run dev
```

Required production variables:

```env
NEXT_PUBLIC_SITE_URL=https://your-domain.com
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
NEXT_PUBLIC_GA_MEASUREMENT_ID=
```

GA4 is optional and loads only when its ID is set. No service-role key is used by the app; authenticated operations are authorized by Row Level Security.

## Supabase setup

1. Create a Supabase project.
2. In Authentication → Providers, enable Email/Password. For a private admin system, turn off public email signup after creating the first account.
3. Apply migrations in order with `supabase db push`, or paste these files into the SQL editor in order:
   - `supabase/migrations/202609060001_initial_content_schema.sql`
   - `supabase/migrations/202609060002_phase2_admin_storage.sql`
4. The second migration creates the public `recipe-images` bucket, 5 MB/type restrictions, approved-admin table, helper function, and RLS policies.
5. Add the project URL and anon key to `.env.local` and Vercel.

### Create the first administrator

Create an email/password user in Authentication → Users → Add user, copy its UUID, then run:

```sql
insert into public.admin_users (user_id, display_name)
values ('PASTE_AUTH_USER_UUID', 'Your Name');
```

An authenticated user who is not in `admin_users` is signed out and denied access. Admin pages, mutations, uploads, and draft previews enforce authorization server-side.

### Seed recipes

Run `supabase/seed.sql` in the SQL editor after both migrations. It upserts the six original recipes and categories, so repeated runs do not create uncontrolled duplicates. With a linked local Supabase CLI project, `supabase db reset` applies migrations and the seed automatically.

## Testing the workflow

1. Start the app and visit `/admin/login`.
2. Sign in with the approved admin email/password.
3. Open Create recipe, enter the required fields, upload a JPEG/PNG/WebP/AVIF up to 5 MB, and save as Draft.
4. Use Preview from the dashboard. Opening preview signed out must redirect to login.
5. Edit it, change status to Published, and save. Confirm it appears on `/recipes`, its category, the homepage where appropriate, and `/sitemap.xml`.
6. Unpublish it and confirm its public URL returns 404 after revalidation.
7. Confirm that a category referenced by recipes cannot be deleted.

## Quality commands

```powershell
npm run typecheck
npm run lint
npm test
npm run build
```

## Operational notes

- Public queries are cached for one hour and tagged. Admin mutations immediately revalidate recipe, listing, category, homepage, and sitemap routes.
- Without Supabase variables, public pages retain original mock content for local design work. Supabase is the primary source whenever configured.
- Contact submissions have server validation, a honeypot, and a basic in-memory throttle. A durable rate limiter and delivery provider remain intentionally unconfigured.
- Add production and preview origins under Supabase Authentication → URL Configuration. Include `http://localhost:3000` for local development.
