-- Blueworks secure admin-only policies
-- Execute this after 005, 006, 007, and 008.

create or replace function public.current_user_is_owner()
returns boolean
language sql
security definer
stable
set search_path = public
as $$
  select exists (
    select 1
    from public.profiles
    where id = auth.uid()
      and is_owner = true
  );
$$;

revoke all on function public.current_user_is_owner() from public;
grant execute on function public.current_user_is_owner() to authenticated;

drop policy if exists "authenticated users can manage site settings" on public.site_settings;
drop policy if exists "owners can manage site settings" on public.site_settings;
drop policy if exists "authenticated users can read site settings" on public.site_settings;

create policy "authenticated users can read site settings"
on public.site_settings
for select
to authenticated
using (true);

create policy "owners can manage site settings"
on public.site_settings
for all
to authenticated
using (public.current_user_is_owner())
with check (public.current_user_is_owner());

drop policy if exists "Authenticated can upload site assets" on storage.objects;
drop policy if exists "Authenticated can update site assets" on storage.objects;
drop policy if exists "Authenticated can delete site assets" on storage.objects;

create policy "Owners can upload site assets"
on storage.objects
for insert
to authenticated
with check (
  bucket_id = 'site-assets'
  and public.current_user_is_owner()
);

create policy "Owners can update site assets"
on storage.objects
for update
to authenticated
using (
  bucket_id = 'site-assets'
  and public.current_user_is_owner()
)
with check (
  bucket_id = 'site-assets'
  and public.current_user_is_owner()
);

create policy "Owners can delete site assets"
on storage.objects
for delete
to authenticated
using (
  bucket_id = 'site-assets'
  and public.current_user_is_owner()
);
