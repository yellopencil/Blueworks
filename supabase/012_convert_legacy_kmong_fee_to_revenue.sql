-- One-time migration for legacy kmong projects.
-- Legacy meaning:
--   kmong_fee = fee amount to subtract from contract amount
-- New meaning:
--   kmong_fee = actual kmong revenue amount
--
-- This migration:
-- 1. creates a small migration ledger if needed
-- 2. stores a backup snapshot of current kmong rows
-- 3. converts kmong_fee to (contract_amount - kmong_fee)
-- 4. marks the migration as applied so it cannot run twice by accident
--
-- IMPORTANT:
-- Run this only if your existing kmong rows still use the old "fee" meaning.
-- If you already created NEW kmong projects after the rule change, stop and review first.

create table if not exists public.manual_migrations (
  key text primary key,
  executed_at timestamptz not null default now()
);

do $$
begin
  if exists (
    select 1
    from public.manual_migrations
    where key = 'convert_legacy_kmong_fee_to_revenue_20260421'
  ) then
    raise exception 'Migration convert_legacy_kmong_fee_to_revenue_20260421 was already applied.';
  end if;
end $$;

create table if not exists public.kmong_legacy_fee_backup_20260421 as
select
  id,
  title,
  client,
  contract_amount,
  kmong_fee,
  payment_method,
  created_at,
  updated_at
from public.projects
where payment_method = 'kmong'
  and kmong_fee > 0;

update public.projects
set
  kmong_fee = greatest(contract_amount - kmong_fee, 0),
  updated_at = now()
where payment_method = 'kmong'
  and kmong_fee > 0;

insert into public.manual_migrations (key)
values ('convert_legacy_kmong_fee_to_revenue_20260421');

select
  id,
  title,
  client,
  contract_amount,
  kmong_fee as converted_kmong_revenue,
  payment_method,
  updated_at
from public.projects
where payment_method = 'kmong'
order by updated_at desc;
