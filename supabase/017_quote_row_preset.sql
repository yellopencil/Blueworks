alter table public.quote_settings
  add column if not exists row_preset jsonb not null default '[]'::jsonb;

update public.quote_settings
set row_preset = '[]'::jsonb
where row_preset is null;
