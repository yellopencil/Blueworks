alter table public.year_goals
  add column if not exists kind text not null default 'goal';

do $$
begin
  if not exists (
    select 1
    from pg_constraint
    where conname = 'year_goals_kind_check'
  ) then
    alter table public.year_goals
      add constraint year_goals_kind_check check (kind in ('goal', 'planned'));
  end if;
end $$;

update public.year_goals
set kind = 'goal'
where kind is null
   or kind not in ('goal', 'planned');

create index if not exists idx_year_goals_year_half_kind
  on public.year_goals(year, half, kind);
