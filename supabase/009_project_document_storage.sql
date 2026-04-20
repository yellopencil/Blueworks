insert into storage.buckets (id, name, public)
values ('project-documents', 'project-documents', false)
on conflict (id) do nothing;

drop policy if exists "Authenticated can view project documents" on storage.objects;
create policy "Authenticated can view project documents"
on storage.objects
for select
to authenticated
using (bucket_id = 'project-documents');

drop policy if exists "Authenticated can upload project documents" on storage.objects;
create policy "Authenticated can upload project documents"
on storage.objects
for insert
to authenticated
with check (bucket_id = 'project-documents');

drop policy if exists "Authenticated can update project documents" on storage.objects;
create policy "Authenticated can update project documents"
on storage.objects
for update
to authenticated
using (bucket_id = 'project-documents')
with check (bucket_id = 'project-documents');

drop policy if exists "Authenticated can delete project documents" on storage.objects;
create policy "Authenticated can delete project documents"
on storage.objects
for delete
to authenticated
using (bucket_id = 'project-documents');
