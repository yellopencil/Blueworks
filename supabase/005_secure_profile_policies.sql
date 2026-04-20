-- Blueworks secure profile policies
-- Execute this after 003_auth_profiles_bootstrap.sql and 004_profile_status_column.sql.
-- Run this after the first owner account can log in successfully.

create or replace function public.current_user_can_manage_members()
returns boolean
language sql
security definer
stable
set search_path = public
as $$
  select exists (
    select 1
    from public.profiles
    where id = auth.uid()
      and (is_owner = true or can_manage_members = true)
  );
$$;

revoke all on function public.current_user_can_manage_members() from public;
grant execute on function public.current_user_can_manage_members() to authenticated;

drop policy if exists "authenticated users can manage profiles" on public.profiles;
drop policy if exists "authenticated users can manage own profile" on public.profiles;
drop policy if exists "owners can manage all profiles" on public.profiles;
drop policy if exists "authenticated users can read profiles" on public.profiles;

create policy "profiles self or manager read"
on public.profiles
for select
to authenticated
using (
  auth.uid() = id
  or public.current_user_can_manage_members()
);

create policy "profiles manager insert"
on public.profiles
for insert
to authenticated
with check (public.current_user_can_manage_members());

create policy "profiles manager update"
on public.profiles
for update
to authenticated
using (public.current_user_can_manage_members())
with check (public.current_user_can_manage_members());

create policy "profiles manager delete"
on public.profiles
for delete
to authenticated
using (public.current_user_can_manage_members());
