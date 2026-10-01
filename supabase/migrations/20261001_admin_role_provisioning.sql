-- Admin privileges must come from trusted Supabase App Metadata, never public sign-up metadata.

create or replace function public.handle_new_auth_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $function$
begin
  insert into public.users (id, email, full_name, role, created_at)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'name', ''),
    case
      when coalesce(new.raw_app_meta_data->>'role', '') in ('admin', 'administrator') then 'admin'
      when coalesce(new.raw_user_meta_data->>'role', 'seeker') = 'employer' then 'employer'
      else 'seeker'
    end,
    now()
  )
  on conflict (id) do nothing;
  return new;
end;
$function$;

create or replace function public.sync_trusted_admin_role_to_profile()
returns trigger
language plpgsql
security definer
set search_path = public
as $function$
begin
  if coalesce(new.raw_app_meta_data->>'role', '') in ('admin', 'administrator') then
    update public.users set role = 'admin' where id = new.id;
  elsif tg_op = 'UPDATE'
    and coalesce(old.raw_app_meta_data->>'role', '') in ('admin', 'administrator') then
    update public.users
    set role = case
      when coalesce(new.raw_user_meta_data->>'role', '') = 'employer' then 'employer'
      else 'seeker'
    end
    where id = new.id;
  end if;
  return new;
end;
$function$;

drop trigger if exists sync_trusted_admin_role_to_profile on auth.users;
create trigger sync_trusted_admin_role_to_profile
after insert or update of raw_app_meta_data on auth.users
for each row execute function public.sync_trusted_admin_role_to_profile();

drop policy if exists users_insert_own on public.users;
create policy users_insert_own
on public.users for insert
to authenticated
with check (
  auth.uid() = id
  and (
    role in ('seeker', 'jobseeker', 'employer')
    or public.is_admin_user(auth.uid())
  )
);
