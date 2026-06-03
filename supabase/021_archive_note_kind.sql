alter table public.archive_notes
  add column if not exists kind text not null default 'memo';

alter table public.archive_notes
  drop constraint if exists archive_notes_kind_check;

alter table public.archive_notes
  add constraint archive_notes_kind_check
  check (kind in ('memo', 'prompt'));

create index if not exists idx_archive_notes_kind_sort
  on public.archive_notes(kind, sort_order);
