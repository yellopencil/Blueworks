create table if not exists public.quote_pdf_history (
  id text primary key,
  created_at timestamptz not null default now(),
  quote_date date,
  title text not null default '',
  client_company text not null default '',
  client_name text not null default '',
  client_phone text not null default '',
  total numeric(14, 2) not null default 0,
  doc_type text not null default 'estimate',
  doc_type_label text not null default '',
  filename text not null default '',
  search_text text not null default '',
  storage_path text not null unique,
  size_bytes bigint not null default 0,
  created_by uuid references public.profiles(id) on delete set null
);

create index if not exists idx_quote_pdf_history_created_at
  on public.quote_pdf_history(created_at desc);

create index if not exists idx_quote_pdf_history_search_text
  on public.quote_pdf_history(search_text);

alter table public.quote_pdf_history enable row level security;

drop policy if exists "authenticated users can read quote pdf history" on public.quote_pdf_history;
create policy "authenticated users can read quote pdf history"
on public.quote_pdf_history
for select
to authenticated
using (true);

drop policy if exists "authenticated users can insert quote pdf history" on public.quote_pdf_history;
create policy "authenticated users can insert quote pdf history"
on public.quote_pdf_history
for insert
to authenticated
with check (true);

drop policy if exists "authenticated users can delete quote pdf history" on public.quote_pdf_history;
create policy "authenticated users can delete quote pdf history"
on public.quote_pdf_history
for delete
to authenticated
using (true);

insert into storage.buckets (id, name, public)
values ('quote-pdf-history', 'quote-pdf-history', false)
on conflict (id) do nothing;

drop policy if exists "Authenticated can view quote pdf history" on storage.objects;
create policy "Authenticated can view quote pdf history"
on storage.objects
for select
to authenticated
using (bucket_id = 'quote-pdf-history');

drop policy if exists "Authenticated can upload quote pdf history" on storage.objects;
create policy "Authenticated can upload quote pdf history"
on storage.objects
for insert
to authenticated
with check (bucket_id = 'quote-pdf-history');

drop policy if exists "Authenticated can update quote pdf history" on storage.objects;
create policy "Authenticated can update quote pdf history"
on storage.objects
for update
to authenticated
using (bucket_id = 'quote-pdf-history')
with check (bucket_id = 'quote-pdf-history');

drop policy if exists "Authenticated can delete quote pdf history" on storage.objects;
create policy "Authenticated can delete quote pdf history"
on storage.objects
for delete
to authenticated
using (bucket_id = 'quote-pdf-history');
