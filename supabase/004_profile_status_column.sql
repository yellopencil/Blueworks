-- Blueworks profile status patch
-- Execute this after 003_auth_profiles_bootstrap.sql

alter table public.profiles
  add column if not exists rejected boolean not null default false;
