-- EasyEarn full Supabase rebuild script.
-- Built from the live Supabase snapshot exported on 2026-05-03.
-- Synced against the live database on 2026-06-27 to add unique constraints on
-- applications(job_id, seeker_id) and ratings(application_id, reviewer_id) that
-- existed live but were missing from this file, and to correct the saved_jobs
-- unique index name to match what is actually deployed.
--
-- Run this file on a fresh Supabase project, or on the current project only if you
-- want to repair missing tables/functions/policies. It drops removed cleanup
-- columns/tables that are no longer used by the app.

create extension if not exists "pgcrypto";

drop table if exists public.skill_tags;

-- ---------------------------------------------------------------------------
-- Tables
-- ---------------------------------------------------------------------------

create table if not exists public.analytics (
  id uuid primary key default gen_random_uuid(),
  recorded_at date default CURRENT_DATE,
  total_users integer default 0,
  total_seekers integer default 0,
  total_employers integer default 0,
  active_listings integer default 0,
  total_apps integer default 0,
  successful_matches integer default 0
);

create unique index if not exists analytics_recorded_at_key on public.analytics(recorded_at);

create table if not exists public.users (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  full_name text not null,
  role text not null,
  phone text,
  location text,
  bio text,
  profile_pic text,
  is_verified boolean default false,
  skill_tags text[],
  created_at timestamp with time zone default now(),
  business_type text,
  website text,
  company_overview text,
  ssm_number text,
  verification_status text,
  verification_address text,
  registration_doc_name text,
  registration_doc_data text,
  contact_doc_name text,
  contact_doc_data text,
  deleted_at timestamp without time zone,
  headline text,
  preferred_categories text[],
  experience_years integer,
  expected_rate text,
  availability_days text[],
  availability_time text,
  work_mode text,
  education jsonb,
  account_status text not null default 'active'::text,
  verification_notes text
);

create table if not exists public.job_listings (
  id uuid primary key default gen_random_uuid(),
  employer_id uuid,
  title text not null,
  description text,
  category text,
  location text not null,
  job_type text,
  pay_rate numeric,
  pay_type text,
  skill_tags text[],
  expiry_date date,
  status text default 'open'::text,
  created_at timestamp with time zone default now(),
  openings_count integer default 1,
  deleted_at timestamp without time zone,
  approved_by uuid,
  approved_at timestamp with time zone,
  constraint job_listings_openings_count_check check (openings_count >= 0)
);

create table if not exists public.applications (
  id uuid primary key default gen_random_uuid(),
  job_id uuid,
  seeker_id uuid,
  status text default 'pending'::text,
  resume_url text,
  applied_at timestamp with time zone default now(),
  interview_date timestamp with time zone,
  interview_notes text,
  interview_location text,
  deleted_at timestamp without time zone,
  attendance_confirmed_at timestamp with time zone
);

create table if not exists public.notifications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid,
  type text,
  message text,
  is_read boolean default false,
  created_at timestamp with time zone default now(),
  target_table text,
  target_id uuid,
  is_admin boolean default false,
  actor_id uuid
);

create table if not exists public.payments (
  id uuid primary key default gen_random_uuid(),
  application_id uuid,
  payer_id uuid,
  payee_id uuid,
  amount numeric not null,
  method text default 'DuitNow'::text,
  evidence_url text,
  status text default 'pending'::text,
  dispute_desc text,
  admin_resolution text,
  created_at timestamp with time zone default now(),
  payer_confirmed boolean default false,
  payee_confirmed boolean default false,
  confirmed_at timestamp with time zone,
  disputed_at timestamp with time zone,
  resolved_at timestamp with time zone,
  deleted_at timestamp without time zone,
  employer_paid_at timestamp with time zone,
  seeker_confirmed_at timestamp with time zone
);

create table if not exists public.ratings (
  id uuid primary key default gen_random_uuid(),
  application_id uuid,
  reviewer_id uuid,
  reviewee_id uuid,
  reviewer_role text,
  stars integer,
  review text,
  created_at timestamp with time zone default now()
);

create table if not exists public.reports (
  id uuid primary key default gen_random_uuid(),
  reporter_id uuid,
  reported_user uuid,
  report_type text,
  description text,
  status text default 'pending'::text,
  admin_notes text,
  created_at timestamp with time zone default now()
);

create table if not exists public.saved_jobs (
  id uuid primary key default gen_random_uuid(),
  seeker_id uuid,
  job_id uuid,
  saved_at timestamp with time zone default now()
);

create table if not exists public.work_history (
  id uuid primary key default gen_random_uuid(),
  seeker_id uuid,
  application_id uuid,
  job_title text not null,
  employer_name text,
  category text,
  start_date date,
  end_date date,
  earnings numeric,
  created_at timestamp with time zone default now()
);

create table if not exists public.chatbot_knowledge (
  id uuid primary key default gen_random_uuid(),
  question text not null,
  answer text not null,
  keywords text[],
  created_at timestamp with time zone default now(),
  category text,
  usage_count integer default 0
);

create table if not exists public.chatbot_logs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid,
  question text,
  answer text,
  matched boolean default false,
  confidence_score numeric,
  created_at timestamp with time zone default now()
);

-- Repair partially-created tables by adding any missing live columns.
alter table public.analytics add column if not exists recorded_at date default CURRENT_DATE;
alter table public.analytics add column if not exists total_users integer default 0;
alter table public.analytics add column if not exists total_seekers integer default 0;
alter table public.analytics add column if not exists total_employers integer default 0;
alter table public.analytics add column if not exists active_listings integer default 0;
alter table public.analytics add column if not exists total_apps integer default 0;
alter table public.analytics add column if not exists successful_matches integer default 0;
alter table public.analytics drop column if exists generated_by;

alter table public.users add column if not exists email text;
alter table public.users add column if not exists full_name text;
alter table public.users add column if not exists role text;
alter table public.users add column if not exists phone text;
alter table public.users add column if not exists location text;
alter table public.users add column if not exists bio text;
alter table public.users add column if not exists profile_pic text;
alter table public.users add column if not exists is_verified boolean default false;
alter table public.users add column if not exists skill_tags text[];
alter table public.users add column if not exists created_at timestamp with time zone default now();
alter table public.users add column if not exists business_type text;
alter table public.users add column if not exists website text;
alter table public.users add column if not exists company_overview text;
alter table public.users add column if not exists ssm_number text;
alter table public.users add column if not exists verification_status text;
alter table public.users alter column verification_status drop default;
alter table public.users add column if not exists verification_address text;
alter table public.users add column if not exists registration_doc_name text;
alter table public.users add column if not exists registration_doc_data text;
alter table public.users add column if not exists contact_doc_name text;
alter table public.users add column if not exists contact_doc_data text;
alter table public.users add column if not exists deleted_at timestamp without time zone;
alter table public.users add column if not exists headline text;
alter table public.users add column if not exists preferred_categories text[];
alter table public.users add column if not exists experience_years integer;
alter table public.users add column if not exists expected_rate text;
alter table public.users add column if not exists availability_days text[];
alter table public.users add column if not exists availability_time text;
alter table public.users add column if not exists work_mode text;
alter table public.users add column if not exists education jsonb;
alter table public.users alter column education drop default;
alter table public.users add column if not exists account_status text default 'active'::text;
alter table public.users add column if not exists verification_notes text;

alter table public.job_listings add column if not exists employer_id uuid;
alter table public.job_listings add column if not exists title text;
alter table public.job_listings add column if not exists description text;
alter table public.job_listings add column if not exists category text;
alter table public.job_listings add column if not exists location text;
alter table public.job_listings add column if not exists job_type text;
alter table public.job_listings add column if not exists pay_rate numeric;
alter table public.job_listings add column if not exists pay_type text;
alter table public.job_listings add column if not exists skill_tags text[];
alter table public.job_listings add column if not exists expiry_date date;
alter table public.job_listings add column if not exists status text default 'open'::text;
alter table public.job_listings add column if not exists created_at timestamp with time zone default now();
alter table public.job_listings add column if not exists openings_count integer default 1;
alter table public.job_listings add column if not exists deleted_at timestamp without time zone;
alter table public.job_listings add column if not exists approved_by uuid;
alter table public.job_listings add column if not exists approved_at timestamp with time zone;
alter table public.job_listings drop constraint if exists job_listings_openings_count_check;
alter table public.job_listings
add constraint job_listings_openings_count_check check (openings_count >= 0);

alter table public.applications add column if not exists job_id uuid;
alter table public.applications add column if not exists seeker_id uuid;
alter table public.applications add column if not exists status text default 'pending'::text;
alter table public.applications add column if not exists resume_url text;
alter table public.applications add column if not exists applied_at timestamp with time zone default now();
alter table public.applications add column if not exists interview_date timestamp with time zone;
alter table public.applications add column if not exists interview_notes text;
alter table public.applications add column if not exists interview_location text;
alter table public.applications add column if not exists deleted_at timestamp without time zone;
alter table public.applications add column if not exists attendance_confirmed_at timestamp with time zone;

alter table public.notifications add column if not exists user_id uuid;
alter table public.notifications add column if not exists type text;
alter table public.notifications add column if not exists message text;
alter table public.notifications add column if not exists is_read boolean default false;
alter table public.notifications add column if not exists created_at timestamp with time zone default now();
alter table public.notifications add column if not exists target_table text;
alter table public.notifications add column if not exists target_id uuid;
alter table public.notifications add column if not exists is_admin boolean default false;
alter table public.notifications add column if not exists actor_id uuid;

alter table public.payments add column if not exists application_id uuid;
alter table public.payments add column if not exists payer_id uuid;
alter table public.payments add column if not exists payee_id uuid;
alter table public.payments add column if not exists amount numeric;
alter table public.payments add column if not exists method text default 'DuitNow'::text;
alter table public.payments add column if not exists evidence_url text;
alter table public.payments add column if not exists status text default 'pending'::text;
alter table public.payments add column if not exists dispute_desc text;
alter table public.payments add column if not exists admin_resolution text;
alter table public.payments add column if not exists created_at timestamp with time zone default now();
alter table public.payments add column if not exists payer_confirmed boolean default false;
alter table public.payments add column if not exists payee_confirmed boolean default false;
alter table public.payments add column if not exists confirmed_at timestamp with time zone;
alter table public.payments add column if not exists disputed_at timestamp with time zone;
alter table public.payments add column if not exists resolved_at timestamp with time zone;
alter table public.payments add column if not exists deleted_at timestamp without time zone;
alter table public.payments add column if not exists employer_paid_at timestamp with time zone;
alter table public.payments add column if not exists seeker_confirmed_at timestamp with time zone;

alter table public.ratings add column if not exists application_id uuid;
alter table public.ratings add column if not exists reviewer_id uuid;
alter table public.ratings add column if not exists reviewee_id uuid;
alter table public.ratings add column if not exists reviewer_role text;
alter table public.ratings add column if not exists stars integer;
alter table public.ratings add column if not exists review text;
alter table public.ratings add column if not exists created_at timestamp with time zone default now();

alter table public.reports add column if not exists reporter_id uuid;
alter table public.reports add column if not exists reported_user uuid;
alter table public.reports add column if not exists report_type text;
alter table public.reports add column if not exists description text;
alter table public.reports add column if not exists status text default 'pending'::text;
alter table public.reports add column if not exists admin_notes text;
alter table public.reports add column if not exists created_at timestamp with time zone default now();

alter table public.saved_jobs add column if not exists seeker_id uuid;
alter table public.saved_jobs add column if not exists job_id uuid;
alter table public.saved_jobs add column if not exists saved_at timestamp with time zone default now();
alter table public.saved_jobs alter column seeker_id set not null;
alter table public.saved_jobs alter column job_id set not null;
create unique index if not exists saved_jobs_seeker_id_job_id_key
  on public.saved_jobs(seeker_id, job_id);

alter table public.work_history add column if not exists seeker_id uuid;
alter table public.work_history add column if not exists application_id uuid;
alter table public.work_history add column if not exists job_title text;
alter table public.work_history add column if not exists employer_name text;
alter table public.work_history add column if not exists category text;
alter table public.work_history add column if not exists start_date date;
alter table public.work_history add column if not exists end_date date;
alter table public.work_history add column if not exists earnings numeric;
alter table public.work_history add column if not exists created_at timestamp with time zone default now();

alter table public.chatbot_knowledge add column if not exists question text;
alter table public.chatbot_knowledge add column if not exists answer text;
alter table public.chatbot_knowledge add column if not exists keywords text[];
alter table public.chatbot_knowledge add column if not exists created_at timestamp with time zone default now();
alter table public.chatbot_knowledge add column if not exists category text;
alter table public.chatbot_knowledge add column if not exists usage_count integer default 0;
alter table public.chatbot_knowledge drop column if exists user_id;
alter table public.chatbot_knowledge drop column if exists matched;

alter table public.chatbot_logs add column if not exists user_id uuid;
alter table public.chatbot_logs add column if not exists question text;
alter table public.chatbot_logs add column if not exists answer text;
alter table public.chatbot_logs add column if not exists matched boolean default false;
alter table public.chatbot_logs add column if not exists confidence_score numeric;
alter table public.chatbot_logs add column if not exists created_at timestamp with time zone default now();

-- ---------------------------------------------------------------------------
-- Relationships
-- ---------------------------------------------------------------------------

do $$
begin
  alter table public.job_listings
    add constraint job_listings_employer_id_fkey
    foreign key (employer_id) references public.users(id) on delete set null not valid;
exception when duplicate_object then null;
end $$;

do $$
begin
  alter table public.job_listings
    add constraint job_listings_approved_by_fkey
    foreign key (approved_by) references public.users(id) on delete set null not valid;
exception when duplicate_object then null;
end $$;

do $$
begin
  alter table public.applications
    add constraint applications_job_id_fkey
    foreign key (job_id) references public.job_listings(id) on delete cascade not valid;
exception when duplicate_object then null;
end $$;

do $$
begin
  alter table public.applications
    add constraint applications_seeker_id_fkey
    foreign key (seeker_id) references public.users(id) on delete cascade not valid;
exception when duplicate_object then null;
end $$;
do $$
begin
  alter table public.applications
    add constraint applications_job_id_seeker_id_key
    unique (job_id, seeker_id);
exception when duplicate_object then null;
end $$;

do $$
begin
  alter table public.notifications
    add constraint notifications_user_id_fkey
    foreign key (user_id) references public.users(id) on delete cascade not valid;
exception when duplicate_object then null;
end $$;

do $$
begin
  alter table public.notifications
    add constraint notifications_actor_id_fkey
    foreign key (actor_id) references public.users(id) on delete set null not valid;
exception when duplicate_object then null;
end $$;

do $$
begin
  alter table public.payments
    add constraint payments_application_id_fkey
    foreign key (application_id) references public.applications(id) on delete set null not valid;
exception when duplicate_object then null;
end $$;

do $$
begin
  alter table public.payments
    add constraint payments_payer_id_fkey
    foreign key (payer_id) references public.users(id) on delete set null not valid;
exception when duplicate_object then null;
end $$;

do $$
begin
  alter table public.payments
    add constraint payments_payee_id_fkey
    foreign key (payee_id) references public.users(id) on delete set null not valid;
exception when duplicate_object then null;
end $$;

do $$
begin
  alter table public.ratings
    add constraint ratings_application_id_fkey
    foreign key (application_id) references public.applications(id) on delete cascade not valid;
exception when duplicate_object then null;
end $$;

do $$
begin
  alter table public.ratings
    add constraint ratings_reviewer_id_fkey
    foreign key (reviewer_id) references public.users(id) on delete set null not valid;
exception when duplicate_object then null;
end $$;

do $$
begin
  alter table public.ratings
    add constraint ratings_reviewee_id_fkey
    foreign key (reviewee_id) references public.users(id) on delete set null not valid;
exception when duplicate_object then null;
end $$;
do $$
begin
  alter table public.ratings
    add constraint ratings_application_id_reviewer_id_key
    unique (application_id, reviewer_id);
exception when duplicate_object then null;
end $$;

do $$
begin
  alter table public.reports
    add constraint reports_reporter_id_fkey
    foreign key (reporter_id) references public.users(id) on delete set null not valid;
exception when duplicate_object then null;
end $$;

do $$
begin
  alter table public.reports
    add constraint reports_reported_user_fkey
    foreign key (reported_user) references public.users(id) on delete set null not valid;
exception when duplicate_object then null;
end $$;

do $$
begin
  alter table public.saved_jobs
    add constraint saved_jobs_seeker_id_fkey
    foreign key (seeker_id) references public.users(id) on delete cascade not valid;
exception when duplicate_object then null;
end $$;

do $$
begin
  alter table public.saved_jobs
    add constraint saved_jobs_job_id_fkey
    foreign key (job_id) references public.job_listings(id) on delete cascade not valid;
exception when duplicate_object then null;
end $$;

do $$
begin
  alter table public.work_history
    add constraint work_history_seeker_id_fkey
    foreign key (seeker_id) references public.users(id) on delete cascade not valid;
exception when duplicate_object then null;
end $$;

do $$
begin
  alter table public.work_history
    add constraint work_history_application_id_fkey
    foreign key (application_id) references public.applications(id) on delete set null not valid;
exception when duplicate_object then null;
end $$;

do $$
begin
  alter table public.chatbot_logs
    add constraint chatbot_logs_user_id_fkey
    foreign key (user_id) references public.users(id) on delete set null not valid;
exception when duplicate_object then null;
end $$;

-- Helpful indexes
create index if not exists idx_applications_job_id on public.applications(job_id);
create index if not exists idx_applications_seeker_id on public.applications(seeker_id);
create index if not exists idx_job_listings_employer_id on public.job_listings(employer_id);
create index if not exists idx_notifications_user_id on public.notifications(user_id);
create index if not exists idx_payments_application_id on public.payments(application_id);
create index if not exists idx_saved_jobs_seeker_id on public.saved_jobs(seeker_id);
create index if not exists idx_work_history_seeker_id on public.work_history(seeker_id);
create index if not exists idx_chatbot_logs_user_id on public.chatbot_logs(user_id);

-- ---------------------------------------------------------------------------
-- Functions
-- ---------------------------------------------------------------------------

create or replace function public.notify_new_application()
returns trigger
language plpgsql
as $function$
begin
  insert into public.notifications (user_id, type, message)
  select employer_id, 'application_update', 'New application received'
  from public.job_listings
  where id = new.job_id;

  return new;
end;
$function$;


create or replace function public.handle_new_auth_user()
returns trigger
language plpgsql
security definer
set search_path to 'public'
as $function$
begin
  insert into public.users (id, email, full_name, role, created_at)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'full_name', ''),
    coalesce(new.raw_user_meta_data->>'role', 'seeker'),
    now()
  )
  on conflict (id) do nothing;
  return new;
end;
$function$;

create or replace function public.sync_job_openings_from_application()
returns trigger
language plpgsql
security definer
set search_path to 'public'
as $function$
declare
  affected_rows integer;
  old_uses_opening boolean;
  new_uses_opening boolean;
begin
  if tg_op = 'INSERT' then
    if new.deleted_at is not null or new.status = 'rejected' then
      return new;
    end if;

    update public.job_listings
    set openings_count = greatest(coalesce(openings_count, 0) - 1, 0)
    where id = new.job_id
      and coalesce(openings_count, 0) > 0;

    get diagnostics affected_rows = row_count;
    if affected_rows = 0 then
      raise exception 'No openings available for this job listing.';
    end if;

    return new;
  end if;

  if tg_op = 'UPDATE' then
    old_uses_opening := old.deleted_at is null and old.status is distinct from 'rejected';
    new_uses_opening := new.deleted_at is null and new.status is distinct from 'rejected';

    if old_uses_opening and not new_uses_opening then
      update public.job_listings
      set openings_count = coalesce(openings_count, 0) + 1
      where id = old.job_id;
    elsif not old_uses_opening and new_uses_opening then
      update public.job_listings
      set openings_count = greatest(coalesce(openings_count, 0) - 1, 0)
      where id = new.job_id
        and coalesce(openings_count, 0) > 0;

      get diagnostics affected_rows = row_count;
      if affected_rows = 0 then
        raise exception 'No openings available for this job listing.';
      end if;
    end if;

    return new;
  end if;

  if tg_op = 'DELETE' then
    if old.deleted_at is null and old.status is distinct from 'rejected' then
      update public.job_listings
      set openings_count = coalesce(openings_count, 0) + 1
      where id = old.job_id;
    end if;

    return old;
  end if;

  return null;
end;
$function$;

-- ---------------------------------------------------------------------------
-- Triggers
-- ---------------------------------------------------------------------------

drop trigger if exists sync_job_openings_after_application_delete on public.applications;
create trigger sync_job_openings_after_application_delete
after delete on public.applications
for each row execute function public.sync_job_openings_from_application();

drop trigger if exists sync_job_openings_after_application_insert on public.applications;
create trigger sync_job_openings_after_application_insert
after insert on public.applications
for each row execute function public.sync_job_openings_from_application();

drop trigger if exists sync_job_openings_after_application_update on public.applications;
create trigger sync_job_openings_after_application_update
after update of status, deleted_at on public.applications
for each row execute function public.sync_job_openings_from_application();

drop trigger if exists trg_new_application on public.applications;
create trigger trg_new_application
after insert on public.applications
for each row execute function public.notify_new_application();

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_auth_user();

-- ---------------------------------------------------------------------------
-- RLS
-- ---------------------------------------------------------------------------

alter table public.analytics enable row level security;
alter table public.applications enable row level security;
alter table public.chatbot_knowledge enable row level security;
alter table public.chatbot_logs enable row level security;

drop view if exists public.chatbot_log;
alter table public.job_listings enable row level security;
alter table public.notifications enable row level security;
alter table public.payments enable row level security;
alter table public.ratings enable row level security;
alter table public.reports enable row level security;
alter table public.saved_jobs enable row level security;
alter table public.users enable row level security;
alter table public.work_history enable row level security;

-- Drop old and duplicate live policies before creating the cleaned set.
drop policy if exists "Users can view own applications" on public.applications;
drop policy if exists admin_select_applications on public.applications;
drop policy if exists applications_delete_own on public.applications;
drop policy if exists applications_employer_select on public.applications;
drop policy if exists applications_insert_own on public.applications;
drop policy if exists applications_select_employer on public.applications;
drop policy if exists applications_select_own on public.applications;
drop policy if exists applications_update_employer on public.applications;
drop policy if exists applications_update_seeker on public.applications;
drop policy if exists admin_select_job_listings on public.job_listings;
drop policy if exists job_listings_admin_update on public.job_listings;
drop policy if exists job_listings_delete_owner on public.job_listings;
drop policy if exists job_listings_insert_employer on public.job_listings;
drop policy if exists job_listings_insert_own on public.job_listings;
drop policy if exists job_listings_public_read on public.job_listings;
drop policy if exists job_listings_select_all_authenticated on public.job_listings;
drop policy if exists job_listings_update_own on public.job_listings;
drop policy if exists job_listings_update_owner on public.job_listings;
drop policy if exists jobs_admin_update on public.job_listings;
drop policy if exists jobs_insert_employer on public.job_listings;
drop policy if exists jobs_public_read on public.job_listings;
drop policy if exists jobs_update_owner on public.job_listings;
drop policy if exists admin_insert_notifications on public.notifications;
drop policy if exists notifications_owner_select on public.notifications;
drop policy if exists notifications_owner_update on public.notifications;
drop policy if exists notifications_select_own on public.notifications;
drop policy if exists notifications_update_own on public.notifications;
drop policy if exists employer_insert_payments on public.payments;
drop policy if exists payments_admin_select on public.payments;
drop policy if exists payments_insert on public.payments;
drop policy if exists payments_related_users_select on public.payments;
drop policy if exists payments_related_users_update on public.payments;
drop policy if exists payments_seeker_insert on public.payments;
drop policy if exists payments_select on public.payments;
drop policy if exists payments_update on public.payments;
drop policy if exists users_select_payments on public.payments;
drop policy if exists users_update_payments on public.payments;
drop policy if exists ratings_insert_any on public.ratings;
drop policy if exists ratings_public_read on public.ratings;
drop policy if exists ratings_select_all on public.ratings;
drop policy if exists ratings_update_own on public.ratings;
drop policy if exists "Admins can read reports" on public.reports;
drop policy if exists "Admins can update reports" on public.reports;
drop policy if exists admin_insert_reports on public.reports;
drop policy if exists reports_admin_select on public.reports;
drop policy if exists reports_insert_own on public.reports;
drop policy if exists reports_select_own on public.reports;
drop policy if exists saved_jobs_delete_own on public.saved_jobs;
drop policy if exists saved_jobs_insert_own on public.saved_jobs;
drop policy if exists saved_jobs_select_own on public.saved_jobs;
drop policy if exists admin_update_users on public.users;
drop policy if exists profiles_select_own on public.users;
drop policy if exists users_admin_update on public.users;
drop policy if exists users_insert_own on public.users;
drop policy if exists users_public_read on public.users;
drop policy if exists users_select_admin on public.users;
drop policy if exists users_select_all_authenticated on public.users;
drop policy if exists users_select_own on public.users;
drop policy if exists users_select_own_profile on public.users;
drop policy if exists users_update_admin on public.users;
drop policy if exists users_update_own on public.users;
drop policy if exists "Seekers can insert own work history" on public.work_history;
drop policy if exists "Seekers can view own work history" on public.work_history;
drop policy if exists work_history_employer_insert on public.work_history;
drop policy if exists work_history_insert_own on public.work_history;
drop policy if exists work_history_select_own on public.work_history;
drop policy if exists applications_admin_select on public.applications;
drop policy if exists notifications_insert_authenticated on public.notifications;
drop policy if exists payments_insert_payer on public.payments;
drop policy if exists payments_insert_seeker on public.payments;
drop policy if exists payments_select_related_users on public.payments;
drop policy if exists payments_update_related_users on public.payments;
drop policy if exists ratings_insert_own on public.ratings;
drop policy if exists reports_admin_update on public.reports;
drop policy if exists chatbot_knowledge_public_read on public.chatbot_knowledge;
drop policy if exists chatbot_knowledge_insert_public_seed on public.chatbot_knowledge;
drop policy if exists chatbot_logs_insert_authenticated on public.chatbot_logs;
drop policy if exists chatbot_logs_select_admin on public.chatbot_logs;
drop policy if exists analytics_admin_select on public.analytics;
drop policy if exists analytics_admin_insert on public.analytics;
drop policy if exists analytics_admin_update on public.analytics;

-- Users
create policy users_public_read
on public.users for select
to anon, authenticated
using (true);

create policy users_insert_own
on public.users for insert
to authenticated
with check (auth.uid() = id);

create policy users_update_own
on public.users for update
to authenticated
using (auth.uid() = id)
with check (auth.uid() = id);

create policy users_admin_update
on public.users for update
to authenticated
using (exists (select 1 from public.users u where u.id = auth.uid() and u.role = 'admin'))
with check (exists (select 1 from public.users u where u.id = auth.uid() and u.role = 'admin'));

-- Job listings
create policy job_listings_public_read
on public.job_listings for select
to anon, authenticated
using (true);

create policy job_listings_insert_employer
on public.job_listings for insert
to authenticated
with check (auth.uid() = employer_id);

create policy job_listings_update_owner
on public.job_listings for update
to authenticated
using (auth.uid() = employer_id)
with check (auth.uid() = employer_id);

create policy job_listings_delete_owner
on public.job_listings for delete
to authenticated
using (auth.uid() = employer_id);

create policy job_listings_admin_update
on public.job_listings for update
to authenticated
using (exists (select 1 from public.users u where u.id = auth.uid() and u.role = 'admin'))
with check (exists (select 1 from public.users u where u.id = auth.uid() and u.role = 'admin'));

-- Applications
create policy applications_select_own
on public.applications for select
to authenticated
using (auth.uid() = seeker_id);

create policy applications_select_employer
on public.applications for select
to authenticated
using (exists (
  select 1 from public.job_listings j
  where j.id = applications.job_id and j.employer_id = auth.uid()
));

create policy applications_admin_select
on public.applications for select
to authenticated
using (exists (select 1 from public.users u where u.id = auth.uid() and u.role = 'admin'));

create policy applications_insert_own
on public.applications for insert
to authenticated
with check (auth.uid() = seeker_id);

create policy applications_update_seeker
on public.applications for update
to authenticated
using (auth.uid() = seeker_id)
with check (auth.uid() = seeker_id);

create policy applications_update_employer
on public.applications for update
to authenticated
using (exists (
  select 1 from public.job_listings j
  where j.id = applications.job_id and j.employer_id = auth.uid()
))
with check (exists (
  select 1 from public.job_listings j
  where j.id = applications.job_id and j.employer_id = auth.uid()
));

create policy applications_delete_own
on public.applications for delete
to authenticated
using (auth.uid() = seeker_id);

-- Notifications
create policy notifications_select_own
on public.notifications for select
to authenticated
using (auth.uid() = user_id);

create policy notifications_insert_authenticated
on public.notifications for insert
to authenticated
with check (auth.uid() is not null);

create policy notifications_update_own
on public.notifications for update
to authenticated
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

-- Payments
create policy payments_insert_payer
on public.payments for insert
to authenticated
with check (auth.uid() = payer_id);

create policy payments_insert_seeker
on public.payments for insert
to authenticated
with check (
  exists (
    select 1 from public.applications a
    where a.id = payments.application_id and a.seeker_id = auth.uid()
  )
  and (payee_id is null or payee_id = auth.uid())
);

create policy payments_select_related_users
on public.payments for select
to authenticated
using (
  auth.uid() = payer_id
  or auth.uid() = payee_id
  or exists (
    select 1
    from public.applications a
    join public.job_listings j on j.id = a.job_id
    where a.id = payments.application_id
      and (a.seeker_id = auth.uid() or j.employer_id = auth.uid())
  )
  or exists (select 1 from public.users u where u.id = auth.uid() and u.role = 'admin')
);

create policy payments_update_related_users
on public.payments for update
to authenticated
using (
  auth.uid() = payer_id
  or auth.uid() = payee_id
  or exists (select 1 from public.users u where u.id = auth.uid() and u.role = 'admin')
)
with check (
  auth.uid() = payer_id
  or auth.uid() = payee_id
  or exists (select 1 from public.users u where u.id = auth.uid() and u.role = 'admin')
);

-- Ratings
create policy ratings_public_read
on public.ratings for select
to anon, authenticated
using (true);

create policy ratings_insert_own
on public.ratings for insert
to authenticated
with check (auth.uid() = reviewer_id);

create policy ratings_update_own
on public.ratings for update
to authenticated
using (auth.uid() = reviewer_id)
with check (auth.uid() = reviewer_id);

-- Reports
create policy reports_select_own
on public.reports for select
to authenticated
using (auth.uid() = reporter_id);

create policy reports_insert_own
on public.reports for insert
to authenticated
with check (auth.uid() = reporter_id);

create policy reports_admin_select
on public.reports for select
to authenticated
using (exists (select 1 from public.users u where u.id = auth.uid() and u.role = 'admin'));

create policy reports_admin_update
on public.reports for update
to authenticated
using (exists (select 1 from public.users u where u.id = auth.uid() and u.role = 'admin'))
with check (exists (select 1 from public.users u where u.id = auth.uid() and u.role = 'admin'));

-- Saved jobs
create policy saved_jobs_select_own
on public.saved_jobs for select
to authenticated
using (auth.uid() = seeker_id);

create policy saved_jobs_insert_own
on public.saved_jobs for insert
to authenticated
with check (auth.uid() = seeker_id);

create policy saved_jobs_delete_own
on public.saved_jobs for delete
to authenticated
using (auth.uid() = seeker_id);

-- Work history
create policy work_history_select_own
on public.work_history for select
to authenticated
using (auth.uid() = seeker_id);

create policy work_history_insert_own
on public.work_history for insert
to authenticated
with check (auth.uid() = seeker_id);

create policy work_history_employer_insert
on public.work_history for insert
to authenticated
with check (
  auth.uid() = seeker_id
  or exists (
    select 1
    from public.applications a
    join public.job_listings j on j.id = a.job_id
    where a.id = work_history.application_id and j.employer_id = auth.uid()
  )
);

-- Chatbot
create policy chatbot_knowledge_public_read
on public.chatbot_knowledge for select
to anon, authenticated
using (true);

create policy chatbot_knowledge_insert_public_seed
on public.chatbot_knowledge for insert
to anon, authenticated
with check (true);

create policy chatbot_logs_insert_authenticated
on public.chatbot_logs for insert
to anon, authenticated
with check (true);

create policy chatbot_logs_select_admin
on public.chatbot_logs for select
to authenticated
using (exists (select 1 from public.users u where u.id = auth.uid() and u.role = 'admin'));

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

-- Chatbot knowledge seed
insert into public.chatbot_knowledge (question, keywords, answer, category)
select seed.question, seed.keywords, seed.answer, seed.category
from (
  values
    ('register', array['register', 'sign up', 'create account']::text[], 'Go to Register, choose Job Seeker or Employer, then complete your profile.', 'general'),
    ('login', array['login', 'log in', 'sign in']::text[], 'Click Login in the header and enter your registered email and password.', 'general'),
    ('forgot password', array['forgot password', 'reset password']::text[], 'Use the Forgot Password link on the login page to reset your password.', 'general'),
    ('job seeker', array['job seeker', 'jobseeker']::text[], 'Job Seeker accounts are for individuals looking for part-time or flexible jobs.', 'general'),
    ('employer', array['employer', 'hire', 'hiring']::text[], 'Employers can post jobs, review applications, and verify their company profile.', 'general'),
    ('post job', array['post job', 'create job']::text[], 'After login as Employer, go to Dashboard and click Post a Job.', 'general'),
    ('apply', array['apply', 'application', 'quick apply', 'upload resume', 'attach resume']::text[], 'Open a job listing, click Apply, then upload or attach your resume before submitting.', 'general'),
    ('application status', array['application status', 'status']::text[], 'You can track status (Pending, Reviewed, Accepted, Rejected) in your dashboard.', 'general'),
    ('verification', array['verification', 'verified']::text[], 'Verified employers have completed identity checks. Badges appear on listings.', 'general'),
    ('report', array['report', 'scam', 'suspicious']::text[], 'Use the Report page to flag suspicious listings for admin review.', 'general'),
    ('language', array['language', 'translate', 'translation']::text[], 'Use the Language dropdown in the header to translate the page.', 'general'),
    ('dark mode', array['dark mode', 'light mode', 'theme']::text[], 'Toggle dark/light mode using the sun/moon button in the header.', 'general'),
    ('resume', array['resume', 'cv', 'auto resume']::text[], 'Work history can be exported into a resume from your dashboard.', 'general'),
    ('work history', array['work history']::text[], 'Completed jobs are saved as work history for credibility and resume export.', 'general'),
    ('payment', array['payment', 'pay', 'salary']::text[], 'Pay details are listed in each job. Employers confirm pay terms before hiring.', 'general'),
    ('schedule', array['schedule', 'shift']::text[], 'Each listing shows schedule type: part-time, full-day, or flexible.', 'general'),
    ('location', array['location', 'city']::text[], 'Job listings include city or remote options to help you filter quickly.', 'general'),
    ('category', array['category', 'filter']::text[], 'Use the category chips to filter jobs by Events, F&B, Education, Delivery, etc.', 'general'),
    ('support', array['support', 'help']::text[], 'Visit Help Center for FAQs or contact support@easyearn.my.', 'general'),
    ('contact', array['contact', 'email']::text[], 'Support email: support@easyearn.my (Mon-Fri, 9am-6pm).', 'general'),
    ('profile', array['profile', 'edit profile']::text[], 'Update your profile in the dashboard to improve matching results.', 'general'),
    ('skills', array['skills', 'skill']::text[], 'Add skills to your profile so employers can match you to relevant jobs.', 'general'),
    ('availability', array['availability']::text[], 'Set your availability in your profile for better job matching.', 'general'),
    ('notifications', array['notifications']::text[], 'Enable notifications in your profile settings to receive job updates.', 'general'),
    ('account type', array['account type']::text[], 'You can choose Job Seeker or Employer during registration.', 'general'),
    ('delete account', array['delete account']::text[], 'Please contact support to request account deletion.', 'general'),
    ('privacy', array['privacy', 'pdpa']::text[], 'We comply with PDPA 2010 and secure data using HTTPS and role-based access.', 'general'),
    ('security', array['security', 'safe']::text[], 'We verify employers and allow reporting to reduce scams and improve trust.', 'general'),
    ('featured jobs', array['featured jobs']::text[], 'Featured jobs appear at the top based on verification and relevance.', 'general'),
    ('gig', array['gig', 'part-time']::text[], 'EasyEarn focuses on short-term, part-time, and flexible gig jobs.', 'general'),
    ('student', array['student']::text[], 'Students can find flexible shifts that fit class schedules.', 'general'),
    ('housewife', array['housewife', 'home']::text[], 'Flexible jobs are available for those looking for short shifts or remote work.', 'general'),
    ('remote', array['remote', 'online']::text[], 'Some roles are remote. Use filters to find online opportunities.', 'general'),
    ('employer verification', array['employer verification']::text[], 'Employers can request verification after completing company details.', 'general'),
    ('job listing', array['job listing']::text[], 'Each listing includes role, pay, schedule, location, and verified badge if available.', 'general'),
    ('dashboard', array['dashboard']::text[], 'The dashboard shows your profile, applications, and recommended jobs.', 'general'),
    ('recommended', array['recommended']::text[], 'Recommendations are based on your profile and activity.', 'general'),
    ('chatbot', array['chatbot']::text[], 'The chatbot provides quick guidance about features and next steps.', 'general'),
    ('report a scam', array['report a scam']::text[], 'Go to Report page and provide listing details for admin review.', 'general'),
    ('employer dashboard', array['employer dashboard']::text[], 'Employers can manage listings and review applicants from the dashboard.', 'general'),
    ('verification badge', array['verification badge']::text[], 'Verified badge means the employer passed identity and business checks.', 'general'),
    ('ratings', array['ratings']::text[], 'Ratings help both job seekers and employers build trust over time.', 'general'),
    ('availability schedule', array['availability schedule']::text[], 'Set your available days and hours to get better matches.', 'general'),
    ('application tips', array['application tips']::text[], 'Complete your profile and add work history to improve acceptance chances.', 'general'),
    ('job categories', array['job categories']::text[], 'Popular categories include Events, F&B, Education, Delivery, and Retail.', 'general'),
    ('hourly', array['hourly', 'daily']::text[], 'Listings show whether pay is hourly or daily. Confirm before accepting.', 'general'),
    ('contract', array['contract', 'short-term']::text[], 'EasyEarn supports short-term and contract roles for flexible work.', 'general'),
    ('support hours', array['support hours']::text[], 'Support is available Monday to Friday, 9am to 6pm.', 'general'),
    ('how it works', array['how it works']::text[], 'Create a profile, browse jobs, apply, and track your status.', 'general'),
    ('employer steps', array['employer steps']::text[], 'Register as Employer, verify your profile, post a job, and review applicants.', 'general'),
    ('job seeker steps', array['job seeker steps']::text[], 'Register, complete your profile, browse jobs, and apply by uploading your resume.', 'general'),
    ('verification time', array['verification time']::text[], 'Verification typically completes after admin review of submitted documents.', 'general'),
    ('how to find jobs', array['how to find jobs', 'find job', 'search job', 'browse jobs']::text[], 'Go to Jobs or your dashboard, then browse listings by category, location, pay, and schedule.', 'jobs'),
    ('how to apply for a job', array['how to apply', 'apply job', 'job application', 'quick apply', 'upload resume', 'attach resume']::text[], 'Open a job listing, click Apply, then upload or attach your resume before submitting. Make sure your profile details are complete before applying.', 'jobs'),
    ('can I apply without login', array['apply without login', 'guest apply', 'need login']::text[], 'You need to log in as a Job Seeker before applying so your application can be tracked.', 'jobs'),
    ('why cannot apply job', array['cannot apply', 'apply failed', 'unable to apply', 'application error']::text[], 'Check that you are logged in as a Job Seeker, your profile is complete, and the job is still open.', 'jobs'),
    ('how many jobs can I apply', array['how many jobs', 'multiple applications', 'apply many jobs']::text[], 'You can apply to multiple suitable jobs, but avoid applying to jobs you cannot attend.', 'jobs'),
    ('can I apply same job twice', array['same job twice', 'apply twice', 'duplicate application']::text[], 'No. If you already applied for a job, track its status in your applications page.', 'jobs'),
    ('where to see my applications', array['my applications', 'application list', 'track application']::text[], 'Go to your Job Seeker dashboard or Applications page to view all submitted applications.', 'jobs'),
    ('what does pending mean', array['pending', 'application pending']::text[], 'Pending means your application was submitted and is waiting for employer review.', 'jobs'),
    ('what does reviewed mean', array['reviewed', 'application reviewed']::text[], 'Reviewed means the employer has opened or checked your application.', 'jobs'),
    ('what does accepted mean', array['accepted', 'application accepted', 'hired']::text[], 'Accepted means the employer selected you for the job. Check the job details and next steps carefully.', 'jobs'),
    ('what does rejected mean', array['rejected', 'application rejected']::text[], 'Rejected means the employer did not select your application. You can continue applying to other jobs.', 'jobs'),
    ('can I cancel application', array['cancel application', 'withdraw application', 'delete application']::text[], 'Yes, open your Applications page and cancel or withdraw the application if it is still allowed.', 'jobs'),
    ('how to know job is real', array['real job', 'fake job', 'job legit', 'safe job']::text[], 'Check employer verification, job details, pay information, and report suspicious listings immediately.', 'jobs'),
    ('how to report fake job', array['report fake job', 'scam job', 'suspicious job']::text[], 'Use the Report page and include the job title, employer name, and reason for your report.', 'jobs'),
    ('what is verified employer', array['verified employer', 'verification badge', 'verified badge']::text[], 'A verified employer has completed platform verification. Verified badges help users identify safer listings.', 'jobs'),
    ('can I contact employer', array['contact employer', 'message employer', 'employer contact']::text[], 'If messaging or contact details are available, use the platform workflow and avoid sharing sensitive personal data too early.', 'jobs'),
    ('where is job location', array['job location', 'where is job', 'work location']::text[], 'The job location is shown inside each listing. Some jobs may be remote or online.', 'jobs'),
    ('how to filter by location', array['filter location', 'near me', 'jobs nearby']::text[], 'Use the location or city filter on the Jobs page to find nearby opportunities.', 'jobs'),
    ('how to filter by category', array['filter category', 'job category', 'type of job']::text[], 'Use category filters such as F&B, Retail, Events, Education, Delivery, or Remote.', 'jobs'),
    ('how to filter by salary', array['filter salary', 'pay filter', 'salary filter']::text[], 'Check each listing pay rate and use available filters to compare hourly or daily pay.', 'jobs'),
    ('what is hourly pay', array['hourly pay', 'per hour', 'hour rate']::text[], 'Hourly pay means you are paid based on the number of hours worked. Confirm the total hours before accepting.', 'jobs'),
    ('what is daily pay', array['daily pay', 'per day', 'day rate']::text[], 'Daily pay means you are paid a fixed amount for the workday or shift. Confirm shift hours first.', 'jobs'),
    ('when will I get paid', array['when paid', 'salary date', 'payment time', 'get paid']::text[], 'Payment timing depends on the employer and job terms. Always confirm pay date before starting work.', 'jobs'),
    ('who pays me', array['who pays', 'employer pay', 'platform pay']::text[], 'The job listing or employer should explain the payment arrangement. Confirm payment terms before accepting.', 'jobs'),
    ('is payment guaranteed', array['payment guaranteed', 'guaranteed pay', 'salary guaranteed']::text[], 'EasyEarn helps with safer job discovery, but always confirm employer payment terms and report disputes.', 'jobs'),
    ('what if employer does not pay', array['employer not pay', 'no payment', 'payment dispute']::text[], 'Collect evidence such as messages, job details, and work proof, then submit a report or payment dispute.', 'jobs'),
    ('can I negotiate salary', array['negotiate salary', 'increase pay', 'ask higher pay']::text[], 'You may discuss pay with the employer before accepting, but confirm the final terms clearly.', 'jobs'),
    ('what is part time job', array['part time', 'part-time job']::text[], 'A part-time job has shorter or flexible working hours compared with full-time employment.', 'jobs'),
    ('what is gig job', array['gig job', 'gig work', 'short term job']::text[], 'A gig job is usually short-term, flexible, or task-based work.', 'jobs'),
    ('what is remote job', array['remote job', 'online job', 'work from home']::text[], 'Remote jobs can be done online or from home. Check requirements and avoid suspicious offers.', 'jobs'),
    ('what job suitable for student', array['student job', 'job for student', 'student part time']::text[], 'Students often look for flexible jobs such as F&B, retail, tutoring, events, admin, or remote tasks.', 'jobs'),
    ('what job suitable for housewife', array['housewife job', 'home job', 'flexible job']::text[], 'Flexible, short-shift, remote, retail, tutoring, packing, or admin roles may be suitable depending on availability.', 'jobs'),
    ('what skills should I add', array['skills to add', 'profile skills', 'job skills']::text[], 'Add relevant skills such as communication, cashiering, customer service, teaching, delivery, cleaning, cooking, or admin.', 'jobs'),
    ('how to improve application chance', array['improve chance', 'get accepted', 'application tips']::text[], 'Complete your profile, add skills, include work history, apply early, and choose jobs matching your availability.', 'jobs'),
    ('why no employer response', array['no response', 'employer not reply', 'application no reply']::text[], 'Employers may take time to review applications. Continue applying and keep your profile updated.', 'jobs'),
    ('how long employer review takes', array['review time', 'how long review', 'application review']::text[], 'Review time depends on each employer. Some respond quickly, while others review after collecting applications.', 'jobs'),
    ('can I edit profile after applying', array['edit profile after apply', 'update profile application']::text[], 'Yes, you can update your profile anytime. Future employers will see your latest information.', 'jobs'),
    ('can employer see my profile', array['employer see profile', 'profile visible']::text[], 'Employers can view relevant profile and application information when you apply.', 'jobs'),
    ('do I need resume', array['need resume', 'cv required', 'resume required']::text[], 'Some jobs may not require a resume, but a complete profile and work history can improve your chances.', 'jobs'),
    ('how to create resume', array['create resume', 'generate resume', 'auto resume']::text[], 'Use your work history and profile details to generate or prepare a resume from your dashboard if available.', 'jobs'),
    ('what should I bring to work', array['bring to work', 'first day items', 'work preparation']::text[], 'Bring identification, required uniform or tools if mentioned, and confirm location, time, and contact person.', 'jobs'),
    ('what if I am late', array['late to work', 'cannot arrive on time']::text[], 'Inform the employer as early as possible and explain your situation professionally.', 'jobs'),
    ('what if I cannot attend job', array['cannot attend', 'miss work', 'unable to work']::text[], 'Contact the employer immediately and cancel through the platform if available. Avoid no-shows.', 'jobs'),
    ('can I change interview time', array['change interview', 'reschedule interview', 'interview time']::text[], 'Ask the employer politely to reschedule and confirm the new time clearly.', 'jobs'),
    ('where to see interview', array['my interview', 'interview schedule', 'interview page']::text[], 'Check your dashboard or interview/application details for scheduled interview information.', 'jobs'),
    ('what to ask before accepting', array['before accepting', 'questions before accept', 'confirm job']::text[], 'Confirm pay, working hours, location, tasks, dress code, payment date, and contact person before accepting.', 'jobs'),
    ('what is job status open', array['job open', 'open status']::text[], 'Open means the job is currently available for applications.', 'jobs'),
    ('what is job status closed', array['job closed', 'closed status']::text[], 'Closed means the employer is no longer accepting new applications.', 'jobs'),
    ('why job disappeared', array['job disappeared', 'job missing', 'cannot find job']::text[], 'A job may be closed, removed, expired, or under admin review. Try checking other listings.', 'jobs'),
    ('can I save job', array['save job', 'saved jobs', 'bookmark job']::text[], 'Yes, use Saved Jobs or the bookmark option if available so you can review the job later.', 'jobs'),
    ('where are saved jobs', array['where saved jobs', 'saved job list', 'bookmarked jobs']::text[], 'Go to your Saved Jobs page or dashboard to view bookmarked listings.', 'jobs'),
    ('how employer post job', array['employer post job', 'post a job', 'create listing']::text[], 'Employers can log in, open the employer dashboard, and submit a job listing with pay, schedule, location, and requirements.', 'jobs'),
    ('why job post pending', array['job post pending', 'listing pending', 'admin review job']::text[], 'A job post may be pending because it needs admin review or employer verification.', 'jobs'),
    ('how employer review applicants', array['review applicants', 'see applicants', 'manage applicants']::text[], 'Employers can open Manage Jobs or Applicants from the dashboard to review and update application status.', 'jobs'),
    ('how to accept applicant', array['accept applicant', 'hire applicant', 'select applicant']::text[], 'Employers can update an application status to Accepted from the applicant management page.', 'jobs'),
    ('how to reject applicant', array['reject applicant', 'decline applicant']::text[], 'Employers can update an application status to Rejected and continue reviewing other applicants.', 'jobs'),
    ('can employer edit job', array['edit job', 'update job listing', 'change job details']::text[], 'Employers can edit their own job listings if the platform allows editing for that listing status.', 'jobs'),
    ('can employer delete job', array['delete job', 'remove job listing', 'close job']::text[], 'Employers can close or remove job listings from the manage jobs page if permitted.', 'jobs'),
    ('why job needs verification', array['job verification', 'verify job', 'job approval']::text[], 'Verification and review help reduce fake listings and protect job seekers.', 'jobs'),
    ('what information in job post', array['job post information', 'listing details', 'job details']::text[], 'A good job post includes title, tasks, pay, schedule, location, requirements, employer details, and contact process.', 'jobs'),
    ('how to choose safe job', array['choose safe job', 'safe job tips', 'avoid scam']::text[], 'Prefer verified employers, clear pay terms, realistic requirements, and report jobs asking for upfront fees.', 'jobs'),
    ('should I pay deposit for job', array['pay deposit', 'job deposit', 'upfront fee']::text[], 'No. Be careful with any job asking for upfront payment, deposit, or bank transfer before work. Report it.', 'jobs'),
    ('is bank detail safe', array['bank details', 'share bank', 'payment details']::text[], 'Only share payment details when necessary and with trusted employers. Do not share passwords, OTPs, or full sensitive credentials.', 'jobs'),
    ('what if job asks for otp', array['otp', 'password', 'verification code']::text[], 'Never share OTPs, passwords, or login codes with anyone. Report the job or user immediately.', 'jobs'),
    ('how to rate employer', array['rate employer', 'employer rating', 'review employer']::text[], 'After completing work, use the rating feature if available to share feedback about the employer.', 'jobs'),
    ('how to get better recommendations', array['better recommendations', 'recommended jobs', 'job matching']::text[], 'Keep your skills, location, availability, and work history updated for better job recommendations.', 'jobs')
) as seed(question, keywords, answer, category)
where not exists (
  select 1
  from public.chatbot_knowledge existing
  where lower(existing.question) = lower(seed.question)
);