alter table public.worklog_tasks
  add column if not exists task_status text not null default 'active';

do $$
begin
  if not exists (
    select 1
    from pg_constraint
    where conname = 'worklog_tasks_task_status_check'
      and conrelid = 'public.worklog_tasks'::regclass
  ) then
    alter table public.worklog_tasks
      add constraint worklog_tasks_task_status_check
      check (task_status in ('active', 'waiting'));
  end if;
end $$;

update public.worklog_tasks
set task_status = 'active'
where task_status is null
   or task_status not in ('active', 'waiting');
