-- Run in Supabase SQL Editor to let Admin Analytics save and show snapshots.
-- This is safe to run more than once.

create unique index if not exists analytics_recorded_at_key
on public.analytics(recorded_at);

drop policy if exists analytics_admin_select on public.analytics;
drop policy if exists analytics_admin_insert on public.analytics;
drop policy if exists analytics_admin_update on public.analytics;

create policy analytics_admin_select
on public.analytics for select
to authenticated
using (exists (select 1 from public.users u where u.id = auth.uid() and u.role = 'admin'));

create policy analytics_admin_insert
on public.analytics for insert
to authenticated
with check (exists (select 1 from public.users u where u.id = auth.uid() and u.role = 'admin'));

create policy analytics_admin_update
on public.analytics for update
to authenticated
using (exists (select 1 from public.users u where u.id = auth.uid() and u.role = 'admin'))
with check (exists (select 1 from public.users u where u.id = auth.uid() and u.role = 'admin'));

insert into public.analytics (
  recorded_at,
  total_users,
  total_seekers,
  total_employers,
  active_listings,
  total_apps,
  successful_matches
)
select
  current_date,
  (select count(*) from public.users),
  (select count(*) from public.users where lower(coalesce(role, '')) in ('seeker', 'jobseeker', 'job seeker')),
  (select count(*) from public.users where lower(coalesce(role, '')) = 'employer'),
  (select count(*) from public.job_listings where lower(coalesce(status, '')) in ('pending', 'open', 'approved')),
  (select count(*) from public.applications),
  (select count(*) from public.applications where lower(coalesce(status, '')) = 'completed')
on conflict (recorded_at) do update set
  total_users = excluded.total_users,
  total_seekers = excluded.total_seekers,
  total_employers = excluded.total_employers,
  active_listings = excluded.active_listings,
  total_apps = excluded.total_apps,
  successful_matches = excluded.successful_matches;
