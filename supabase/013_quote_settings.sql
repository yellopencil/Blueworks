create table if not exists public.quote_settings (
  id text primary key,
  agreement_html text not null default '',
  payment_lines_normal jsonb not null default '[]'::jsonb,
  payment_lines_kmong jsonb not null default '[]'::jsonb,
  row_preset jsonb not null default '[]'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.quote_settings enable row level security;

drop policy if exists "authenticated users can read quote settings" on public.quote_settings;
create policy "authenticated users can read quote settings"
on public.quote_settings
for select
to authenticated
using (true);

drop policy if exists "authenticated users can manage quote settings" on public.quote_settings;
create policy "authenticated users can manage quote settings"
on public.quote_settings
for all
to authenticated
using (true)
with check (true);

insert into public.quote_settings (
  id,
  agreement_html,
  payment_lines_normal,
  payment_lines_kmong
)
values (
  'global',
  '',
  '[]'::jsonb,
  '[]'::jsonb
)
on conflict (id) do nothing;
