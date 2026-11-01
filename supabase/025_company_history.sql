create table if not exists public.company_history (
  id uuid primary key default gen_random_uuid(),
  event_date date not null default current_date,
  title text not null,
  description text not null default '',
  created_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_company_history_event_date
  on public.company_history(event_date desc, created_at desc);

alter table public.company_history enable row level security;

drop policy if exists "authenticated users can manage company history" on public.company_history;
create policy "authenticated users can manage company history"
on public.company_history
for all
to authenticated
using (true)
with check (true);

grant usage on schema public to authenticated, service_role;
revoke all on table public.company_history from anon;
revoke all on table public.company_history from authenticated;
grant select, insert, update, delete on table public.company_history to authenticated;
grant select, insert, update, delete on table public.company_history to service_role;
