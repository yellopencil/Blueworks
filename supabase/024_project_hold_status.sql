-- Keep project workflow status and temporary hold state independent.

alter table public.projects
  add column if not exists is_on_hold boolean not null default false,
  add column if not exists hold_reason text not null default '',
  add column if not exists hold_started_at date,
  add column if not exists hold_review_date date;

create index if not exists idx_projects_on_hold
  on public.projects (is_on_hold, hold_review_date)
  where is_on_hold = true;

