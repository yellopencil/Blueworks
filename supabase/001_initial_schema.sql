-- Blueworks initial schema
-- Execute this in Supabase SQL Editor.

create extension if not exists "pgcrypto";

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  username text unique,
  name text not null,
  role_label text not null default '멤버',
  phone text not null default '',
  email text not null default '',
  notes text not null default '',
  can_manage_members boolean not null default false,
  is_owner boolean not null default false,
  approved boolean not null default false,
  last_login_at timestamptz,
  last_login_ip text not null default '',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.site_settings (
  id uuid primary key default gen_random_uuid(),
  title text not null default '',
  description text not null default '',
  favicon_path text not null default '',
  thumbnail_path text not null default '',
  meta_tags text not null default '',
  block_crawling boolean not null default false,
  created_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  client text not null default '',
  manager_name text not null default '',
  manager_phone text not null default '',
  status text not null default 'ready',
  progress_stage text not null default '',
  start_date date,
  due_date date,
  timeline text not null default '',
  notes text not null default '',
  imweb_id text not null default '',
  imweb_password text not null default '',
  contract_amount numeric(14, 2) not null default 0,
  payback_status text not null default 'none',
  payback_amount numeric(14, 2) not null default 0,
  payback_note text not null default '',
  kmong_fee numeric(14, 2) not null default 0,
  payment_method text not null default 'cash',
  tax_invoice text not null default '',
  package_type text not null default '',
  site_type text not null default '',
  language_count integer not null default 0,
  progress_order integer not null default 0,
  created_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.project_documents (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects(id) on delete cascade,
  document_type text not null default 'contract',
  file_name text not null,
  storage_path text not null,
  mime_type text not null default '',
  size_bytes bigint not null default 0,
  created_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now()
);

create table if not exists public.schedules (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  date date not null,
  notes text not null default '',
  project_id uuid references public.projects(id) on delete set null,
  created_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.worklogs (
  id uuid primary key default gen_random_uuid(),
  worklog_date date not null unique,
  notes text not null default '',
  created_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.worklog_tasks (
  id uuid primary key default gen_random_uuid(),
  worklog_id uuid not null references public.worklogs(id) on delete cascade,
  task_text text not null default '',
  done boolean not null default false,
  schedule_id uuid references public.schedules(id) on delete set null,
  auto boolean not null default false,
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.year_goals (
  id uuid primary key default gen_random_uuid(),
  year integer not null,
  half text not null check (half in ('first', 'second')),
  text text not null,
  done boolean not null default false,
  completed_at timestamptz,
  created_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.archive_note_categories (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  color text not null default 'gray',
  created_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now()
);

create table if not exists public.archive_notes (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  content text not null default '',
  color text not null default 'gray',
  category_id uuid references public.archive_note_categories(id) on delete set null,
  sort_order integer not null default 0,
  created_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.archive_code_categories (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  color text not null default 'gray',
  sort_order integer not null default 0,
  created_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.archive_codes (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  code text not null default '',
  description text not null default '',
  category_id uuid references public.archive_code_categories(id) on delete set null,
  sort_order integer not null default 0,
  created_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_projects_status on public.projects(status);
create index if not exists idx_projects_start_date on public.projects(start_date);
create index if not exists idx_schedules_date on public.schedules(date);
create index if not exists idx_year_goals_year_half on public.year_goals(year, half);
create index if not exists idx_archive_notes_sort_order on public.archive_notes(sort_order);
create index if not exists idx_archive_codes_sort_order on public.archive_codes(sort_order);

alter table public.profiles enable row level security;
alter table public.site_settings enable row level security;
alter table public.projects enable row level security;
alter table public.project_documents enable row level security;
alter table public.schedules enable row level security;
alter table public.worklogs enable row level security;
alter table public.worklog_tasks enable row level security;
alter table public.year_goals enable row level security;
alter table public.archive_note_categories enable row level security;
alter table public.archive_notes enable row level security;
alter table public.archive_code_categories enable row level security;
alter table public.archive_codes enable row level security;

-- Temporary starter policies.
-- These are intentionally broad so the front-end migration can begin.
-- Tighten these after the app is fully connected.

drop policy if exists "authenticated users can read profiles" on public.profiles;
create policy "authenticated users can read profiles"
on public.profiles for select
to authenticated
using (true);

drop policy if exists "authenticated users can manage own profile" on public.profiles;
create policy "authenticated users can manage own profile"
on public.profiles for all
to authenticated
using (auth.uid() = id)
with check (auth.uid() = id);

drop policy if exists "authenticated users can read site settings" on public.site_settings;
create policy "authenticated users can read site settings"
on public.site_settings for select
to authenticated
using (true);

drop policy if exists "authenticated users can manage site settings" on public.site_settings;
create policy "authenticated users can manage site settings"
on public.site_settings for all
to authenticated
using (true)
with check (true);

drop policy if exists "authenticated users can manage projects" on public.projects;
create policy "authenticated users can manage projects"
on public.projects for all
to authenticated
using (true)
with check (true);

drop policy if exists "authenticated users can manage project documents" on public.project_documents;
create policy "authenticated users can manage project documents"
on public.project_documents for all
to authenticated
using (true)
with check (true);

drop policy if exists "authenticated users can manage schedules" on public.schedules;
create policy "authenticated users can manage schedules"
on public.schedules for all
to authenticated
using (true)
with check (true);

drop policy if exists "authenticated users can manage worklogs" on public.worklogs;
create policy "authenticated users can manage worklogs"
on public.worklogs for all
to authenticated
using (true)
with check (true);

drop policy if exists "authenticated users can manage worklog tasks" on public.worklog_tasks;
create policy "authenticated users can manage worklog tasks"
on public.worklog_tasks for all
to authenticated
using (true)
with check (true);

drop policy if exists "authenticated users can manage year goals" on public.year_goals;
create policy "authenticated users can manage year goals"
on public.year_goals for all
to authenticated
using (true)
with check (true);

drop policy if exists "authenticated users can manage archive note categories" on public.archive_note_categories;
create policy "authenticated users can manage archive note categories"
on public.archive_note_categories for all
to authenticated
using (true)
with check (true);

drop policy if exists "authenticated users can manage archive notes" on public.archive_notes;
create policy "authenticated users can manage archive notes"
on public.archive_notes for all
to authenticated
using (true)
with check (true);

drop policy if exists "authenticated users can manage archive code categories" on public.archive_code_categories;
create policy "authenticated users can manage archive code categories"
on public.archive_code_categories for all
to authenticated
using (true)
with check (true);

drop policy if exists "authenticated users can manage archive codes" on public.archive_codes;
create policy "authenticated users can manage archive codes"
on public.archive_codes for all
to authenticated
using (true)
with check (true);
