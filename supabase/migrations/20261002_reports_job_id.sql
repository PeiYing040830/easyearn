-- Job reports store the referenced listing so admins can review and count reports.
alter table public.reports
  add column if not exists job_id uuid;

create index if not exists idx_reports_job_reporter_status
  on public.reports(job_id, reporter_id, status)
  where job_id is not null and reporter_id is not null;
