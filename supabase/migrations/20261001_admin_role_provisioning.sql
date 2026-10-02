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

update public.users profile
set role = 'admin'
from auth.users auth_user
where auth_user.id = profile.id
  and coalesce(auth_user.raw_app_meta_data->>'role', '') in ('admin', 'administrator');

-- Notify employers when an admin approves, rejects, or requests changes to verification.
create or replace function public.notify_employer_verification_result()
returns trigger
language plpgsql
security definer
set search_path = public
as $function$
declare
  notification_message text;
begin
  if new.role = 'employer' then
    if new.verification_status = 'approved' and new.is_verified is true then
      notification_message := 'Your employer verification has been approved.';
    elsif new.verification_status = 'rejected' then
      notification_message := 'Your employer verification was rejected. Please review the admin notes and resubmit if needed.';
    elsif new.verification_status = 'recheck' then
      notification_message := 'Your employer verification needs changes. Please review the admin notes and resubmit.';
    else
      notification_message := null;
    end if;
  end if;

  if new.role = 'employer'
     and notification_message is not null
     and (
       old.verification_status is distinct from new.verification_status
       or old.is_verified is distinct from new.is_verified
     ) then
    insert into public.notifications (
      user_id, type, message, is_read, target_table, target_id, is_admin, actor_id
    )
    values (
      new.id,
      'application_update',
      notification_message,
      false,
      'verifications',
      new.id,
      false,
      null
    );
  end if;

  return new;
end;
$function$;

drop trigger if exists trg_notify_employer_verification_approved on public.users;
drop trigger if exists trg_notify_employer_verification_result on public.users;
create trigger trg_notify_employer_verification_result
after update of verification_status, is_verified on public.users
for each row execute function public.notify_employer_verification_result();

-- Notify admins when employers submit new jobs for review.
create or replace function public.notify_admins_new_job_listing()
returns trigger
language plpgsql
security definer
set search_path = public
as $function$
begin
  if new.status in ('pending', 'submitted')
     and (tg_op = 'INSERT' or old.status is distinct from new.status) then
    insert into public.notifications (
      user_id, type, message, is_read, target_table, target_id, is_admin, actor_id
    )
    select
      admin.id,
      'application_update',
      coalesce(nullif(employer.full_name, ''), employer.email, 'An employer')
        || ' submitted "' || coalesce(new.title, 'Untitled job') || '" for admin review.',
      false,
      'jobs',
      new.id,
      true,
      new.employer_id
    from public.users admin
    left join public.users employer on employer.id = new.employer_id
    where admin.role in ('admin', 'administrator');
  end if;

  return new;
end;
$function$;

drop trigger if exists trg_notify_admins_new_job_listing on public.job_listings;
create trigger trg_notify_admins_new_job_listing
after insert or update of status on public.job_listings
for each row execute function public.notify_admins_new_job_listing();

-- Create Bell reminders for pending jobs that were already submitted before this trigger was installed.
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
      and existing.type = 'application_update'
      and existing.target_table = 'jobs'
      and existing.target_id = job.id
      and existing.is_admin is true
  );

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

-- Standardize all persistent Bell event types on application_update (chat messages use system).
-- This matches notifications_type_check on deployed projects and prevents admin_alert/new_report errors.

create or replace function public.notify_new_application()
returns trigger
language plpgsql
security definer
set search_path = public
as $function$
begin
  insert into public.notifications (
    user_id, type, message, is_read, target_table, target_id, is_admin, actor_id
  )
  select
    job.employer_id,
    'application_update',
    coalesce(nullif(seeker.full_name, ''), seeker.email, 'A job seeker')
      || ' applied for "' || coalesce(job.title, 'your job listing') || '".',
    false, 'applications', new.id, false, new.seeker_id
  from public.job_listings job
  left join public.users seeker on seeker.id = new.seeker_id
  where job.id = new.job_id and job.employer_id is not null;
  return new;
end;
$function$;

drop trigger if exists trg_new_application on public.applications;
create trigger trg_new_application after insert on public.applications
for each row execute function public.notify_new_application();

-- Give employers a persistent reminder for pending applications created before this migration.
insert into public.notifications (
  user_id, type, message, is_read, target_table, target_id, is_admin, actor_id
)
select
  job.employer_id,
  'application_update',
  coalesce(nullif(seeker.full_name, ''), seeker.email, 'A job seeker')
    || ' applied for "' || coalesce(job.title, 'your job listing') || '".',
  false,
  'applications',
  application.id,
  false,
  application.seeker_id
from public.applications application
join public.job_listings job on job.id = application.job_id
left join public.users seeker on seeker.id = application.seeker_id
where application.status = 'pending'
  and application.deleted_at is null
  and job.employer_id is not null
  and not exists (
    select 1 from public.notifications existing
    where existing.user_id = job.employer_id
      and existing.target_table = 'applications'
      and existing.target_id = application.id
  );

create or replace function public.notify_application_status_change()
returns trigger
language plpgsql
security definer
set search_path = public
as $function$
declare
  recipient_id uuid;
  notification_message text;
  job_employer_id uuid;
  job_title text;
begin
  if old.status is not distinct from new.status then return new; end if;
  select employer_id, title into job_employer_id, job_title
  from public.job_listings where id = new.job_id;

  if new.status = 'reviewed' then
    recipient_id := new.seeker_id;
    notification_message := 'The employer has reviewed your application for "' || coalesce(job_title, 'a job') || '".';
  elsif new.status = 'interview' then
    recipient_id := new.seeker_id;
    notification_message := 'You have an interview update for "' || coalesce(job_title, 'a job') || '". Check your Applications for details.';
  elsif new.status = 'accepted' then
    recipient_id := new.seeker_id;
    notification_message := 'Your application for "' || coalesce(job_title, 'a job') || '" was accepted.';
  elsif new.status = 'rejected' then
    recipient_id := new.seeker_id;
    notification_message := 'Your application for "' || coalesce(job_title, 'a job') || '" was not selected.';
  elsif new.status = 'completion_pending' then
    recipient_id := new.seeker_id;
    notification_message := 'The employer marked "' || coalesce(job_title, 'your job') || '" complete. Confirm the work and payment in Applications.';
  elsif new.status = 'completed' then
    recipient_id := job_employer_id;
    notification_message := 'The job seeker confirmed completion for "' || coalesce(job_title, 'your job') || '".';
  else
    return new;
  end if;

  if recipient_id is not null then
    insert into public.notifications (
      user_id, type, message, is_read, target_table, target_id, is_admin, actor_id
    ) values (
      recipient_id, 'application_update', notification_message, false,
      'applications', new.id, false,
      case when recipient_id = new.seeker_id then job_employer_id else new.seeker_id end
    );
  end if;
  return new;
end;
$function$;

drop trigger if exists trg_notify_application_status_change on public.applications;
create trigger trg_notify_application_status_change after update of status on public.applications
for each row execute function public.notify_application_status_change();

create or replace function public.notify_admins_new_verification()
returns trigger
language plpgsql
security definer
set search_path = public
as $function$
begin
  if new.role = 'employer'
     and new.verification_status = 'submitted'
     and (tg_op = 'INSERT' or old.verification_status is distinct from new.verification_status) then
    insert into public.notifications (
      user_id, type, message, is_read, target_table, target_id, is_admin, actor_id
    )
    select admin.id, 'application_update',
      coalesce(new.email, 'An employer') || ' submitted an employer verification request.',
      false, 'verifications', new.id, true, new.id
    from public.users admin where admin.role in ('admin', 'administrator');
  end if;
  return new;
end;
$function$;

drop trigger if exists trg_notify_admins_new_verification on public.users;
create trigger trg_notify_admins_new_verification after insert or update of verification_status on public.users
for each row execute function public.notify_admins_new_verification();

create or replace function public.notify_employer_job_moderation()
returns trigger
language plpgsql
security definer
set search_path = public
as $function$
declare notification_message text;
begin
  if old.status is not distinct from new.status then return new; end if;
  if new.status = 'approved' then
    notification_message := 'Your job listing "' || coalesce(new.title, 'Untitled job') || '" was approved and is ready for job seekers.';
  elsif new.status = 'flagged' then
    notification_message := 'Your job listing "' || coalesce(new.title, 'Untitled job') || '" was flagged for review. Please check Manage Jobs.';
  elsif new.status = 'removed' then
    notification_message := 'Your job listing "' || coalesce(new.title, 'Untitled job') || '" was removed after admin review.';
  elsif new.status = 'closed' then
    notification_message := 'Your job listing "' || coalesce(new.title, 'Untitled job') || '" was closed.';
  elsif new.status = 'expired' then
    notification_message := 'Your job listing "' || coalesce(new.title, 'Untitled job') || '" has expired.';
  else
    return new;
  end if;
  insert into public.notifications (
    user_id, type, message, is_read, target_table, target_id, is_admin, actor_id
  ) values (
    new.employer_id, 'application_update', notification_message, false,
    'jobs', new.id, false, auth.uid()
  );
  return new;
end;
$function$;

drop trigger if exists trg_notify_employer_job_moderation on public.job_listings;
create trigger trg_notify_employer_job_moderation after update of status on public.job_listings
for each row execute function public.notify_employer_job_moderation();

create or replace function public.notify_report_parties()
returns trigger
language plpgsql
security definer
set search_path = public
as $function$
declare report_label text; notification_message text;
begin
  report_label := replace(coalesce(new.report_type, 'other'), '_', ' ');
  if tg_op = 'INSERT' then
    insert into public.notifications (
      user_id, type, message, is_read, target_table, target_id, is_admin, actor_id
    )
    select admin.id, 'application_update', 'New ' || report_label || ' report is waiting for review.',
      false, 'reports', new.id, true, new.reporter_id
    from public.users admin where admin.role in ('admin', 'administrator');
    return new;
  end if;
  if old.status is distinct from new.status and new.reporter_id is not null then
    if new.status = 'resolved' then
      notification_message := 'Your ' || report_label || ' report has been resolved by the EasyEarn team.';
    elsif new.status = 'escalated' then
      notification_message := 'Your ' || report_label || ' report has been escalated for further review.';
    else
      notification_message := null;
    end if;
    if notification_message is not null then
      insert into public.notifications (
        user_id, type, message, is_read, target_table, target_id, is_admin, actor_id
      ) values (
        new.reporter_id, 'application_update', notification_message, false,
        'reports', new.id, false, auth.uid()
      );
    end if;
  end if;
  return new;
end;
$function$;

drop trigger if exists trg_notify_report_parties on public.reports;
create trigger trg_notify_report_parties after insert or update of status on public.reports
for each row execute function public.notify_report_parties();

create or replace function public.notify_payment_participants()
returns trigger
language plpgsql
security definer
set search_path = public
as $function$
declare notification_message text; target_user uuid;
begin
  if new.employer_paid_at is not null
     and (tg_op = 'INSERT' or old.employer_paid_at is null)
     and new.payee_id is not null then
    insert into public.notifications (
      user_id, type, message, is_read, target_table, target_id, is_admin, actor_id
    ) values (
      new.payee_id, 'application_update', 'Your employer marked the payment as paid. Please confirm receipt in Applications.',
      false, 'applications', new.application_id, false, new.payer_id
    );
  end if;
  if new.payee_confirmed is true
     and (tg_op = 'INSERT' or old.payee_confirmed is distinct from new.payee_confirmed)
     and new.payer_id is not null then
    insert into public.notifications (
      user_id, type, message, is_read, target_table, target_id, is_admin, actor_id
    ) values (
      new.payer_id, 'application_update', 'The job seeker confirmed receipt of payment.',
      false, 'applications', new.application_id, false, new.payee_id
    );
  end if;
  if new.status = 'disputed' and (tg_op = 'INSERT' or old.status is distinct from new.status)
     and new.payer_id is not null then
    insert into public.notifications (
      user_id, type, message, is_read, target_table, target_id, is_admin, actor_id
    ) values (
      new.payer_id, 'application_update', 'A payment dispute was raised for one of your job payments. Check your Applicants page.',
      false, 'applications', new.application_id, false, new.payee_id
    );
  end if;
  if new.status = 'resolved' and (tg_op = 'INSERT' or old.status is distinct from new.status) then
    notification_message := coalesce(nullif(new.admin_resolution, ''), 'The payment dispute has been resolved by an admin.');
    for target_user in
      select distinct party_id from unnest(array[new.payer_id, new.payee_id]) as party(party_id)
      where party_id is not null
    loop
      insert into public.notifications (
        user_id, type, message, is_read, target_table, target_id, is_admin, actor_id
      ) values (
        target_user, 'application_update', 'Payment dispute resolved: ' || notification_message,
        false, 'applications', new.application_id, false, auth.uid()
      );
    end loop;
  end if;
  return new;
end;
$function$;

drop trigger if exists trg_notify_payment_participants on public.payments;
create trigger trg_notify_payment_participants after insert or update of employer_paid_at, payee_confirmed, status on public.payments
for each row execute function public.notify_payment_participants();

create or replace function public.notify_rating_reviewee()
returns trigger
language plpgsql
security definer
set search_path = public
as $function$
begin
  insert into public.notifications (
    user_id, type, message, is_read, target_table, target_id, is_admin, actor_id
  ) values (
    new.reviewee_id, 'application_update', 'You received a ' || new.stars::text || '-star rating.' ||
      case when nullif(new.review, '') is not null then ' Open your profile to read the review.' else '' end,
    false, 'ratings', new.id, false, new.reviewer_id
  );
  return new;
end;
$function$;

drop trigger if exists trg_notify_rating_reviewee on public.ratings;
create trigger trg_notify_rating_reviewee after insert on public.ratings
for each row execute function public.notify_rating_reviewee();

-- Existing open reports should appear as Admin Bell reminders after installing the trigger.
insert into public.notifications (
  user_id, type, message, is_read, target_table, target_id, is_admin, actor_id
)
select admin.id, 'application_update',
  'New ' || replace(coalesce(report.report_type, 'other'), '_', ' ') || ' report is waiting for review.',
  false, 'reports', report.id, true, report.reporter_id
from public.reports report
cross join public.users admin
where lower(coalesce(report.status, 'open')) in ('pending', 'open', 'submitted', 'flagged', 'under_review')
  and admin.role in ('admin', 'administrator')
  and not exists (
    select 1 from public.notifications existing
    where existing.user_id = admin.id and existing.target_table = 'reports'
      and existing.target_id = report.id and existing.is_admin is true
  );

-- Existing employer verification submissions should also receive an Admin Bell reminder.
insert into public.notifications (
  user_id, type, message, is_read, target_table, target_id, is_admin, actor_id
)
select admin.id, 'application_update',
  coalesce(employer.email, 'An employer') || ' submitted an employer verification request.',
  false, 'verifications', employer.id, true, employer.id
from public.users employer
cross join public.users admin
where employer.role = 'employer'
  and employer.verification_status = 'submitted'
  and admin.role in ('admin', 'administrator')
  and not exists (
    select 1 from public.notifications existing
    where existing.user_id = admin.id and existing.target_table = 'verifications'
      and existing.target_id = employer.id and existing.is_admin is true
  );
-- Auto-flag approved job listings after reports from five distinct users.
-- Re-running this section is safe; duplicate reports from one reporter count once.
alter table public.reports add column if not exists job_id uuid;

create index if not exists idx_reports_job_reporter_status
  on public.reports(job_id, reporter_id, status)
  where job_id is not null and reporter_id is not null;

create or replace function public.flag_approved_job_after_report_threshold()
returns trigger
language plpgsql
security definer
set search_path = public
as $function$
declare
  prior_reporters integer;
  distinct_reporters integer;
  flagged_job_id uuid;
begin
  if new.job_id is null or new.reporter_id is null
     or lower(coalesce(new.status, 'open')) not in ('pending', 'open', 'submitted', 'flagged', 'under_review') then
    return new;
  end if;

  select count(distinct report.reporter_id)::integer
    into prior_reporters
  from public.reports report
  where report.job_id = new.job_id
    and report.id <> new.id
    and report.reporter_id is not null
    and lower(coalesce(report.status, 'open')) in ('pending', 'open', 'submitted', 'flagged', 'under_review');

  select count(distinct report.reporter_id)::integer
    into distinct_reporters
  from public.reports report
  where report.job_id = new.job_id
    and report.reporter_id is not null
    and lower(coalesce(report.status, 'open')) in ('pending', 'open', 'submitted', 'flagged', 'under_review');

  if prior_reporters < 5 and distinct_reporters >= 5 then
    update public.job_listings
       set status = 'flagged'
     where id = new.job_id and status = 'approved'
     returning id into flagged_job_id;

    if flagged_job_id is not null then
      insert into public.notifications (
        user_id, type, message, is_read, target_table, target_id, is_admin, actor_id
      )
      select admin.id, 'application_update',
        'A job was automatically flagged after reports from 5 different users. Please review the listing.',
        false, 'jobs', flagged_job_id, true, new.reporter_id
      from public.users admin
      where admin.role in ('admin', 'administrator');
    end if;
  end if;

  return new;
end;
$function$;

drop trigger if exists trg_flag_approved_job_after_report_threshold on public.reports;
create trigger trg_flag_approved_job_after_report_threshold
after insert on public.reports
for each row execute function public.flag_approved_job_after_report_threshold();
