-- Explicit Data API grants for Supabase public schema tables.
--
-- Supabase will stop exposing new public-schema tables to the Data API by
-- default. Keep explicit GRANT statements with every table-creation migration
-- so supabase-js/PostgREST access stays intentional.

grant usage on schema public to anon, authenticated, service_role;

-- Do not expose application data to logged-out visitors.
revoke all on table
  public.profiles,
  public.site_settings,
  public.projects,
  public.project_documents,
  public.schedules,
  public.worklogs,
  public.worklog_tasks,
  public.year_goals,
  public.archive_note_categories,
  public.archive_notes,
  public.archive_code_categories,
  public.archive_codes,
  public.quote_settings,
  public.quote_pdf_history,
  public.archive_diaries
from anon;

-- Tables used directly by the browser after login.
grant select, insert, update, delete on table
  public.profiles,
  public.site_settings,
  public.projects,
  public.project_documents,
  public.schedules,
  public.worklogs,
  public.worklog_tasks,
  public.year_goals,
  public.archive_note_categories,
  public.archive_notes,
  public.archive_code_categories,
  public.archive_codes,
  public.quote_settings,
  public.quote_pdf_history,
  public.archive_diaries
to authenticated;

-- Server-side API routes and maintenance jobs use the service role key.
grant select, insert, update, delete on table
  public.profiles,
  public.site_settings,
  public.projects,
  public.project_documents,
  public.schedules,
  public.worklogs,
  public.worklog_tasks,
  public.year_goals,
  public.archive_note_categories,
  public.archive_notes,
  public.archive_code_categories,
  public.archive_codes,
  public.quote_settings,
  public.quote_pdf_history,
  public.archive_diaries
to service_role;

-- Internal/manual migration tables should not be available to normal users.
do $$
begin
  if to_regclass('public.manual_migrations') is not null then
    revoke all on table public.manual_migrations from anon, authenticated;
    grant select, insert, update, delete on table public.manual_migrations to service_role;
  end if;

  if to_regclass('public.kmong_legacy_fee_backup_20260421') is not null then
    revoke all on table public.kmong_legacy_fee_backup_20260421 from anon, authenticated;
    grant select, insert, update, delete on table public.kmong_legacy_fee_backup_20260421 to service_role;
  end if;
end $$;
