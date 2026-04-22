alter table public.worklog_tasks
  add column if not exists source_task_id uuid,
  add column if not exists carried_from_date date;

create index if not exists idx_worklog_tasks_worklog_sort
  on public.worklog_tasks(worklog_id, sort_order);
