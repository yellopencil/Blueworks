alter table public.quote_settings
  add column if not exists agreement_spacing text not null default 'normal';

update public.quote_settings
set agreement_spacing = 'normal'
where agreement_spacing is null
  or agreement_spacing not in ('compact', 'normal', 'relaxed');

do $$
begin
  if not exists (
    select 1
    from pg_constraint
    where conname = 'quote_settings_agreement_spacing_check'
  ) then
    alter table public.quote_settings
      add constraint quote_settings_agreement_spacing_check
      check (agreement_spacing in ('compact', 'normal', 'relaxed'));
  end if;
end $$;
