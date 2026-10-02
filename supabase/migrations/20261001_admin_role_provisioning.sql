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
