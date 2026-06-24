-- Run in Supabase SQL Editor.
-- Keeps public.users in sync when a new Supabase Auth user is created.
-- Safe to run more than once.

create or replace function public.handle_new_auth_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.users (
    id,
    email,
    full_name,
    role,
    created_at,
    account_status,
    verification_status
  )
  values (
    new.id,
    coalesce(new.email, ''),
    coalesce(
      new.raw_user_meta_data->>'name',
      new.raw_user_meta_data->>'full_name',
      split_part(coalesce(new.email, 'EasyEarn User'), '@', 1)
    ),
    case
      when lower(coalesce(new.raw_user_meta_data->>'role', 'seeker')) = 'jobseeker' then 'seeker'
      else lower(coalesce(new.raw_user_meta_data->>'role', 'seeker'))
    end,
    coalesce(new.created_at, now()),
    'active',
    case
      when lower(coalesce(new.raw_user_meta_data->>'role', '')) = 'employer' then 'pending'
      else null
    end
  )
  on conflict (id) do update set
    email = excluded.email,
    full_name = coalesce(nullif(public.users.full_name, ''), excluded.full_name),
    role = coalesce(nullif(public.users.role, ''), excluded.role),
    account_status = coalesce(public.users.account_status, excluded.account_status),
    verification_status = coalesce(public.users.verification_status, excluded.verification_status);

  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;

create trigger on_auth_user_created
after insert on auth.users
for each row execute function public.handle_new_auth_user();

insert into public.users (
  id,
  email,
  full_name,
  role,
  created_at,
  account_status,
  verification_status
)
select
  au.id,
  coalesce(au.email, ''),
  coalesce(
    au.raw_user_meta_data->>'name',
    au.raw_user_meta_data->>'full_name',
    split_part(coalesce(au.email, 'EasyEarn User'), '@', 1)
  ),
  case
    when lower(coalesce(au.raw_user_meta_data->>'role', 'seeker')) = 'jobseeker' then 'seeker'
    else lower(coalesce(au.raw_user_meta_data->>'role', 'seeker'))
  end,
  coalesce(au.created_at, now()),
  'active',
  case
    when lower(coalesce(au.raw_user_meta_data->>'role', '')) = 'employer' then 'pending'
    else null
  end
from auth.users au
left join public.users pu on pu.id = au.id
where pu.id is null;
