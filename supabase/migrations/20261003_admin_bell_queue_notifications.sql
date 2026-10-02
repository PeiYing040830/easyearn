-- Keep Admin Bell notifications in sync with moderation queue items.
-- This is safe to rerun: existing reminders are not duplicated.

create or replace function public.notify_admins_new_report()
returns trigger
language plpgsql
security definer
set search_path = public
as $function$
begin
  if lower(coalesce(new.status, 'pending')) in ('pending', 'open', 'submitted', 'flagged', 'under_review') then
    insert into public.notifications (
      user_id, type, message, is_read, target_table, target_id, is_admin, actor_id
    )
    select
      admin.id,
      'application_update',
      'New ' || replace(coalesce(new.report_type, 'other'), '_', ' ') || ' report is waiting for review.',
      false,
      'reports',
      new.id,
      true,
      new.reporter_id
    from public.users admin
    where admin.role in ('admin', 'administrator')
      and not exists (
        select 1
        from public.notifications existing
        where existing.user_id = admin.id
          and existing.target_table = 'reports'
          and existing.target_id = new.id
          and existing.is_admin is true
      );
  end if;
  return new;
end;
$function$;

drop trigger if exists trg_notify_admins_new_report on public.reports;
create trigger trg_notify_admins_new_report
after insert on public.reports
for each row execute function public.notify_admins_new_report();

-- Backfill active reports already in the moderation queue.
insert into public.notifications (
  user_id, type, message, is_read, target_table, target_id, is_admin, actor_id
)
select
  admin.id,
  'application_update',
  'New ' || replace(coalesce(report.report_type, 'other'), '_', ' ') || ' report is waiting for review.',
  false,
  'reports',
  report.id,
  true,
  report.reporter_id
from public.reports report
cross join public.users admin
where lower(coalesce(report.status, 'pending')) in ('pending', 'open', 'submitted', 'flagged', 'under_review')
  and admin.role in ('admin', 'administrator')
  and not exists (
    select 1
    from public.notifications existing
    where existing.user_id = admin.id
      and existing.target_table = 'reports'
      and existing.target_id = report.id
      and existing.is_admin is true
  );

-- Backfill employer verification submissions still awaiting review.
insert into public.notifications (
  user_id, type, message, is_read, target_table, target_id, is_admin, actor_id
)
select
  admin.id,
  'application_update',
  coalesce(employer.email, 'An employer') || ' submitted an employer verification request.',
  false,
  'verifications',
  employer.id,
  true,
  employer.id
from public.users employer
cross join public.users admin
where employer.role = 'employer'
  and employer.verification_status = 'submitted'
  and admin.role in ('admin', 'administrator')
  and not exists (
    select 1
    from public.notifications existing
    where existing.user_id = admin.id
      and existing.target_table = 'verifications'
      and existing.target_id = employer.id
      and existing.is_admin is true
  );

-- Backfill pending, unexpired jobs that need admin review.
insert into public.notifications (
  user_id, type, message, is_read, target_table, target_id, is_admin, actor_id
)
select
  admin.id,
  'application_update',
  coalesce(nullif(employer.full_name, ''), employer.email, 'An employer')
    || ' submitted "' || coalesce(job.title, 'Untitled job') || '" for admin review.',
  false,
  'jobs',
  job.id,
  true,
  job.employer_id
from public.job_listings job
cross join public.users admin
left join public.users employer on employer.id = job.employer_id
where job.status in ('pending', 'submitted')
  and (job.expiry_date is null or job.expiry_date >= current_date)
  and admin.role in ('admin', 'administrator')
  and not exists (
    select 1
    from public.notifications existing
    where existing.user_id = admin.id
      and existing.target_table = 'jobs'
      and existing.target_id = job.id
      and existing.is_admin is true
  );
