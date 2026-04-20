drop policy if exists "anon can read site settings" on public.site_settings;

create policy "anon can read site settings"
on public.site_settings
for select
to anon
using (true);
