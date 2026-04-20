-- Blueworks project sync patch
-- Execute this after 001_initial_schema.sql

alter table public.projects
  add column if not exists project_type text not null default '',
  add column if not exists website_url text not null default '',
  add column if not exists languages jsonb not null default '[]'::jsonb,
  add column if not exists contracts_json jsonb not null default '[]'::jsonb;

create index if not exists idx_projects_project_type on public.projects(project_type);
