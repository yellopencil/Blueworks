-- Blueworks secure project and schedule policies
-- Execute this after login is working for authenticated users.

drop policy if exists "anon can read projects" on public.projects;
drop policy if exists "anon can manage projects" on public.projects;
drop policy if exists "anon can read schedules" on public.schedules;
drop policy if exists "anon can manage schedules" on public.schedules;

drop policy if exists "authenticated users can manage projects" on public.projects;
drop policy if exists "authenticated users can manage project documents" on public.project_documents;
drop policy if exists "authenticated users can manage schedules" on public.schedules;

create policy "authenticated users can manage projects"
on public.projects
for all
to authenticated
using (true)
with check (true);

create policy "authenticated users can manage project documents"
on public.project_documents
for all
to authenticated
using (true)
with check (true);

create policy "authenticated users can manage schedules"
on public.schedules
for all
to authenticated
using (true)
with check (true);
