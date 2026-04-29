create table if not exists public.archive_diaries (
  id uuid primary key default gen_random_uuid(),
  entry_date date not null default current_date,
  title text not null,
  content text not null default '',
  mood text not null default '',
  topic text not null default '',
  tags text[] not null default '{}',
  color text not null default 'gray',
  sort_order integer not null default 0,
  created_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_archive_diaries_entry_date
  on public.archive_diaries(entry_date desc);

create index if not exists idx_archive_diaries_updated_at
  on public.archive_diaries(updated_at desc);

create index if not exists idx_archive_diaries_tags
  on public.archive_diaries using gin(tags);

alter table public.archive_diaries enable row level security;

drop policy if exists "authenticated users can manage archive diaries" on public.archive_diaries;
create policy "authenticated users can manage archive diaries"
on public.archive_diaries for all
to authenticated
using (true)
with check (true);
