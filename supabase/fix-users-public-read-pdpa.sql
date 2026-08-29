create or replace function public.is_admin_user(actor_id uuid)
returns boolean
language sql
security definer
stable
set search_path = public
as $function$
  select exists (
    select 1
    from public.users u
    where u.id = actor_id
      and u.role = 'admin'
  );
$function$;

drop view if exists public.public_profiles;
create view public.public_profiles
with (security_invoker = false)
as
select
  id,
  full_name,
  role,
  location,
  bio,
  profile_pic,
  is_verified,
  skill_tags,
  headline,
  business_type,
  website,
  company_overview,
  account_status,
  created_at
from public.users
where deleted_at is null
  and role = 'employer'
  and coalesce(account_status, 'active') = 'active';

grant select on public.public_profiles to anon, authenticated;

drop policy if exists users_public_read on public.users;
drop policy if exists users_select_admin on public.users;
drop policy if exists users_select_all_authenticated on public.users;
drop policy if exists users_select_applicant_for_employer on public.users;
drop policy if exists users_select_own on public.users;
drop policy if exists users_select_own_profile on public.users;

create policy users_select_own
on public.users for select
to authenticated
using (auth.uid() = id);

create policy users_select_admin
on public.users for select
to authenticated
using (public.is_admin_user(auth.uid()));

create policy users_select_applicant_for_employer
on public.users for select
to authenticated
using (
  role = 'seeker'
  and exists (
    select 1
    from public.applications a
    join public.job_listings j on j.id = a.job_id
    where a.seeker_id = users.id
      and j.employer_id = auth.uid()
  )
);

drop policy if exists users_admin_update on public.users;
create policy users_admin_update
on public.users for update
to authenticated
using (public.is_admin_user(auth.uid()))
with check (public.is_admin_user(auth.uid()));
