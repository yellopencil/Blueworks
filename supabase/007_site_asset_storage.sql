insert into storage.buckets (id, name, public)
values ('site-assets', 'site-assets', true)
on conflict (id) do nothing;

drop policy if exists "Public can view site assets" on storage.objects;
create policy "Public can view site assets"
on storage.objects
for select
using (bucket_id = 'site-assets');

drop policy if exists "Authenticated can upload site assets" on storage.objects;
create policy "Authenticated can upload site assets"
on storage.objects
for insert
to authenticated
with check (bucket_id = 'site-assets');

drop policy if exists "Authenticated can update site assets" on storage.objects;
create policy "Authenticated can update site assets"
on storage.objects
for update
to authenticated
using (bucket_id = 'site-assets')
with check (bucket_id = 'site-assets');

drop policy if exists "Authenticated can delete site assets" on storage.objects;
create policy "Authenticated can delete site assets"
on storage.objects
for delete
to authenticated
using (bucket_id = 'site-assets');
