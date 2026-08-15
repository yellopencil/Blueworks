create table if not exists public.other_revenues (
  id uuid primary key default gen_random_uuid(),
  revenue_date date not null default current_date,
  category text not null,
  title text not null,
  amount numeric(14, 2) not null,
  notes text not null default '',
  created_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint other_revenues_category_check
    check (category in ('imweb_points', 'ebook', 'other')),
  constraint other_revenues_amount_check
    check (amount > 0)
);

create index if not exists idx_other_revenues_revenue_date
  on public.other_revenues(revenue_date desc);

create index if not exists idx_other_revenues_category
  on public.other_revenues(category);

create index if not exists idx_other_revenues_created_by
  on public.other_revenues(created_by);

alter table public.other_revenues enable row level security;

create schema if not exists private;

create or replace function private.current_user_is_approved()
returns boolean
language sql
security definer
stable
set search_path = ''
as $$
  select exists (
    select 1
    from public.profiles
    where id = (select auth.uid())
      and approved = true
      and coalesce(rejected, false) = false
  );
$$;

revoke all on function private.current_user_is_approved() from public;
grant usage on schema private to authenticated, service_role;
grant execute on function private.current_user_is_approved() to authenticated, service_role;

drop policy if exists "authenticated users can manage other revenues" on public.other_revenues;
create policy "authenticated users can manage other revenues"
on public.other_revenues
for all
to authenticated
using ((select private.current_user_is_approved()))
with check ((select private.current_user_is_approved()));

grant usage on schema public to authenticated, service_role;
revoke all on table public.other_revenues from anon;
grant select, insert, update, delete on table public.other_revenues to authenticated;
grant select, insert, update, delete on table public.other_revenues to service_role;
