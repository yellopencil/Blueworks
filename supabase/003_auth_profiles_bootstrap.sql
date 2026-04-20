-- Blueworks auth/profile bootstrap
-- Execute this after 001_initial_schema.sql and 002_project_sync_columns.sql

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  profile_count integer;
  initial_owner boolean;
begin
  select count(*) into profile_count from public.profiles;
  initial_owner := profile_count = 0;

  insert into public.profiles (
    id,
    username,
    name,
    role_label,
    phone,
    email,
    notes,
    can_manage_members,
    is_owner,
    approved,
    created_at,
    updated_at
  )
  values (
    new.id,
    coalesce(new.raw_user_meta_data ->> 'username', split_part(coalesce(new.email, ''), '@', 1), 'user'),
    coalesce(new.raw_user_meta_data ->> 'name', split_part(coalesce(new.email, ''), '@', 1), '새 멤버'),
    coalesce(new.raw_user_meta_data ->> 'role_label', case when initial_owner then '대표' else '멤버' end),
    coalesce(new.raw_user_meta_data ->> 'phone', ''),
    coalesce(new.email, ''),
    coalesce(new.raw_user_meta_data ->> 'notes', ''),
    initial_owner,
    initial_owner,
    initial_owner,
    now(),
    now()
  )
  on conflict (id) do update
  set
    email = excluded.email,
    updated_at = now();

  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row execute procedure public.handle_new_user();

drop policy if exists "authenticated users can manage own profile" on public.profiles;
create policy "authenticated users can manage own profile"
on public.profiles for update
to authenticated
using (auth.uid() = id)
with check (auth.uid() = id);

drop policy if exists "owners can manage all profiles" on public.profiles;
create policy "owners can manage all profiles"
on public.profiles for all
to authenticated
using (
  exists (
    select 1
    from public.profiles as owner_profile
    where owner_profile.id = auth.uid()
      and owner_profile.is_owner = true
  )
)
with check (
  exists (
    select 1
    from public.profiles as owner_profile
    where owner_profile.id = auth.uid()
      and owner_profile.is_owner = true
  )
);
