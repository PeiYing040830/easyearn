-- Apply in Supabase SQL Editor. Existing payments are preserved.
begin;
drop policy if exists payments_insert_seeker on public.payments;
drop policy if exists payments_insert_payer on public.payments;
create policy payments_insert_payer
on public.payments for insert
to authenticated
with check (
  auth.uid() = payer_id
  and exists (
    select 1
    from public.applications a
    join public.job_listings j on j.id = a.job_id
    join public.users u on u.id = j.employer_id
    where a.id = payments.application_id
      and j.employer_id = auth.uid()
      and u.role = 'employer'
      and coalesce(u.account_status, 'active') = 'active'
      and a.seeker_id = payments.payee_id
      and a.deleted_at is null
      and j.deleted_at is null
  )
);

commit;
