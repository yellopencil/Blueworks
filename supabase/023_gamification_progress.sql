create table if not exists public.gamification_profiles (
  user_id uuid primary key references public.profiles(id) on delete cascade,
  total_xp integer not null default 0 check (total_xp >= 0),
  started_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.gamification_xp_events (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  event_key text not null,
  event_type text not null default 'worklog_task_completed'
    check (event_type = 'worklog_task_completed'),
  points integer not null default 10 check (points = 10),
  source_task_key text not null,
  source_date date not null,
  source_label text not null default '',
  created_at timestamptz not null default now(),
  unique (user_id, event_key)
);

alter table public.gamification_xp_events
  add column if not exists source_label text not null default '';

create index if not exists idx_gamification_xp_events_user_created
  on public.gamification_xp_events(user_id, created_at desc);

alter table public.gamification_profiles enable row level security;
alter table public.gamification_xp_events enable row level security;

create schema if not exists private;

create or replace function private.apply_gamification_xp_event()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.gamification_profiles (user_id, total_xp, started_at, updated_at)
  values (new.user_id, new.points, now(), now())
  on conflict (user_id) do update
  set total_xp = public.gamification_profiles.total_xp + excluded.total_xp,
      updated_at = now();
  return new;
end;
$$;

revoke all on function private.apply_gamification_xp_event() from public;

drop trigger if exists trg_apply_gamification_xp_event on public.gamification_xp_events;
create trigger trg_apply_gamification_xp_event
after insert on public.gamification_xp_events
for each row execute function private.apply_gamification_xp_event();

drop policy if exists "users can read their gamification profile" on public.gamification_profiles;
create policy "users can read their gamification profile"
on public.gamification_profiles
for select
to authenticated
using ((select auth.uid()) = user_id);

drop policy if exists "users can read their xp events" on public.gamification_xp_events;
create policy "users can read their xp events"
on public.gamification_xp_events
for select
to authenticated
using ((select auth.uid()) = user_id);

drop policy if exists "users can add their xp events" on public.gamification_xp_events;
create policy "users can add their xp events"
on public.gamification_xp_events
for insert
to authenticated
with check ((select auth.uid()) = user_id);

grant usage on schema public to authenticated, service_role;
revoke all on table public.gamification_profiles, public.gamification_xp_events from anon;
grant select on table public.gamification_profiles to authenticated;
grant select, insert on table public.gamification_xp_events to authenticated;
grant select, insert, update, delete on table public.gamification_profiles, public.gamification_xp_events to service_role;
