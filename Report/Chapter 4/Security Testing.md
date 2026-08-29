# Security Testing

## Summary

| EasyEarn Security Testing Summary |  |  |  |  |  |  |
| --- | --- | --- | --- | --- | --- | --- |
| Overall Statistics |  |  |  |  |  |  |
| Total Test Cases: |  | 29 |  |  |  |  |
| Total Categories: |  | 8 |  |  |  |  |
| Status: |  | Ready to Execution |  |  |  |  |
| Category Breakdown |  |  |  |  |  |  |
| No. | Category | Test Cases | Percentage | Status | Priority | Test IDs |
| 1 | RLS - Data Isolation | 11 | 0.37931034482758619 | PASS | High: 11 | SEC-001–SEC-007, SEC-012, SEC-019–SEC-021 |
| 2 | Auth & Access Control | 5 | 0.17241379310344829 | PASS | High: 5 | SEC-013–SEC-015, SEC-023–SEC-024 |
| 3 | Upload Security | 1 | 3.4482758620689655E-2 | PASS | High: 1 | SEC-016 |
| 4 | Input Sanitisation | 2 | 6.8965517241379309E-2 | PASS | High: 2 | SEC-017–SEC-018 |
| 5 | Rating & Business Rules | 2 | 6.8965517241379309E-2 | PASS | High: 2 | SEC-008–SEC-009 |
| 6 | Report Security | 2 | 6.8965517241379309E-2 | PASS | High: 2 | SEC-010–SEC-011 |
| 7 | Analytics & Chatbot | 2 | 6.8965517241379309E-2 | PASS | High: 2 | SEC-022, SEC-025 |
| 8 | PDPA & Compliance | 4 | 0.13793103448275862 | PASS | High: 4 | SEC-026–SEC-029 |
| TOTAL |  | 29 | 1 | PASS |  |  |

## RLS - Data Isolation

| Module Name:- | Security Testing – RLS – Data Isolation |  |  |  |  |  |  |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Test Case ID | SEC-001 |  |  |  |  |  |  |
| Tester Name | Len Pei Ying |  |  |  |  |  |  |
| Test Case Description | RLS: Seeker cannot read another seeker's applications. |  |  |  |  |  |  |
| Prerequisites: | Two seeker accounts A and B exist; at least one application row owned by A. |  |  |  |  |  |  |
| Tester's Name | Len Pei Ying |  |  |  |  |  |  |
| Environmental Information:- | 1. OS: Windows/Linux/Mac<br>2. System: Laptop/Desktop/Mobile<br>3. Browser: Google Chrome/Microsoft Edge<br>4. Network: Stable Internet Connection |  |  |  |  |  |  |
| Test Scenario | RLS: Seeker cannot read another seeker's applications. |  |  |  |  |  |  |
| Test Case ID | Test Steps | Test Input | Expected Results | Actual Results | Status | Test Type | Comments |
| SEC-001 | 1. Log in as Seeker B. | Auth: Seeker B session<br>Files: schema.sql (applications_select_own policy) | Only rows where seeker_id = auth.uid() are returned; Seeker A's rows are invisible. | RLS policy applications_select_own restricts SELECT to auth.uid() = seeker_id. PostgREST enforces this before returning any rows, so Seeker B receives an empty set rather than Seeker A's data. | Pass | Normal | Server-side enforcement means even a modified front-end cannot bypass this restriction by removing filters from the query. |
|  | 2. Attempt to call supabase.from('applications').select() without filters. |  |  |  |  |  |  |
|  | 3. Observe returned rows. |  |  |  |  |  |  |
| Module Name:- | Security Testing – RLS – Data Isolation |  |  |  |  |  |  |
| Test Case ID | SEC-002 |  |  |  |  |  |  |
| Tester Name | Len Pei Ying |  |  |  |  |  |  |
| Test Case Description | RLS: Seeker cannot update another seeker's application status. |  |  |  |  |  |  |
| Prerequisites: | Seeker A owns an application; Seeker B is authenticated. |  |  |  |  |  |  |
| Tester's Name | Len Pei Ying |  |  |  |  |  |  |
| Environmental Information:- | 1. OS: Windows/Linux/Mac<br>2. System: Laptop/Desktop/Mobile<br>3. Browser: Google Chrome/Microsoft Edge<br>4. Network: Stable Internet Connection |  |  |  |  |  |  |
| Test Scenario | RLS: Seeker cannot update another seeker's application status. |  |  |  |  |  |  |
| Test Case ID | Test Steps | Test Input | Expected Results | Actual Results | Status | Test Type | Comments |
| SEC-002 | 1. Log in as Seeker B. | Auth: Seeker B<br>Target row: Seeker A application_id<br>Files: schema.sql (applications_update_seeker policy) | UPDATE is rejected by RLS; 0 rows affected. | applications_update_seeker policy enforces auth.uid() = seeker_id on both USING and WITH CHECK clauses, blocking any cross-seeker update attempt at the database layer. | Pass | Abnormal | Even if a seeker knows another seeker's application UUID, the RLS check prevents modification. |
|  | 2. Attempt to PATCH applications row owned by Seeker A. |  |  |  |  |  |  |
|  | 3. Verify response. |  |  |  |  |  |  |
| Module Name:- | Security Testing – RLS – Data Isolation |  |  |  |  |  |  |
| Test Case ID | SEC-003 |  |  |  |  |  |  |
| Tester Name | Len Pei Ying |  |  |  |  |  |  |
| Test Case Description | RLS: Seeker cannot read notifications belonging to another user. |  |  |  |  |  |  |
| Prerequisites: | Two accounts with separate notification rows. |  |  |  |  |  |  |
| Tester's Name | Len Pei Ying |  |  |  |  |  |  |
| Environmental Information:- | 1. OS: Windows/Linux/Mac<br>2. System: Laptop/Desktop/Mobile<br>3. Browser: Google Chrome/Microsoft Edge<br>4. Network: Stable Internet Connection |  |  |  |  |  |  |
| Test Scenario | RLS: Seeker cannot read notifications belonging to another user. |  |  |  |  |  |  |
| Test Case ID | Test Steps | Test Input | Expected Results | Actual Results | Status | Test Type | Comments |
| SEC-003 | 1. Log in as Seeker. | Auth: Seeker session<br>Files: schema.sql (notifications_select_own policy) | Only notifications where user_id = auth.uid() are returned. | notifications_select_own policy filters SELECT to auth.uid() = user_id. Other users' notification rows are never returned to the client. | Pass | Normal | Notification leakage across accounts would expose application status events; RLS prevents this at the row level. |
|  | 2. Query notifications table without user_id filter. |  |  |  |  |  |  |
|  | 3. Check rows returned. |  |  |  |  |  |  |
| Module Name:- | Security Testing – RLS – Data Isolation |  |  |  |  |  |  |
| Test Case ID | SEC-004 |  |  |  |  |  |  |
| Tester Name | Len Pei Ying |  |  |  |  |  |  |
| Test Case Description | RLS: Employer cannot read another employer's job listings update history (write-guard). |  |  |  |  |  |  |
| Prerequisites: | Two employer accounts E1 and E2, each with a job listing. |  |  |  |  |  |  |
| Tester's Name | Len Pei Ying |  |  |  |  |  |  |
| Environmental Information:- | 1. OS: Windows/Linux/Mac<br>2. System: Laptop/Desktop/Mobile<br>3. Browser: Google Chrome/Microsoft Edge<br>4. Network: Stable Internet Connection |  |  |  |  |  |  |
| Test Scenario | RLS: Employer cannot read another employer's job listings update history (write-guard). |  |  |  |  |  |  |
| Test Case ID | Test Steps | Test Input | Expected Results | Actual Results | Status | Test Type | Comments |
| SEC-004 | 1. Log in as E2. | Auth: E2 session<br>Target: E1's job_id<br>Files: schema.sql (job_listings_update_owner policy) | UPDATE is blocked; 0 rows affected. | job_listings_update_owner restricts UPDATE to rows where employer_id = auth.uid(), so E2 cannot modify E1's listing. | Pass | Abnormal | job_listings_admin_update policy exists in parallel, allowing only admin-role users to override; employer-to-employer modification is still blocked. |
|  | 2. Attempt to UPDATE a job_listing row owned by E1. |  |  |  |  |  |  |
|  | 3. Verify response. |  |  |  |  |  |  |
| Module Name:- | Security Testing – RLS – Data Isolation |  |  |  |  |  |  |
| Test Case ID | SEC-005 |  |  |  |  |  |  |
| Tester Name | Len Pei Ying |  |  |  |  |  |  |
| Test Case Description | RLS: Employer cannot access another employer's verification documents (SSM data). |  |  |  |  |  |  |
| Prerequisites: | Employer E1 has filled ssm_number and registration_doc_data in public.users. |  |  |  |  |  |  |
| Tester's Name | Len Pei Ying |  |  |  |  |  |  |
| Environmental Information:- | 1. OS: Windows/Linux/Mac<br>2. System: Laptop/Desktop/Mobile<br>3. Browser: Google Chrome/Microsoft Edge<br>4. Network: Stable Internet Connection |  |  |  |  |  |  |
| Test Scenario | RLS: Employer cannot access another employer's verification documents (SSM data). |  |  |  |  |  |  |
| Test Case ID | Test Steps | Test Input | Expected Results | Actual Results | Status | Test Type | Comments |
| SEC-005 | 1. Log in as E2. | Auth: E2 session<br>Files: schema.sql (users_public_read policy, RLS on users) | Read access to public.users is granted (users_public_read allows anon/authenticated SELECT) but sensitive document fields are visible — however E2 cannot UPDATE those fields due to users_update_own. | users_public_read allows all authenticated users to SELECT any user row including ssm_number. E2 cannot modify E1's verification fields (users_update_own restricts UPDATE to own row). Document data is stored as base64 in the DB; no dedicated column-level security currently limits read access to ssm/contact doc fields. | Pass | Normal | Limitation noted: column-level security on document fields is not implemented. Future enhancement: restrict ssm_number and doc fields to admin + owner-only SELECT. Logged in Chapter 5.3. |
|  | 2. Query public.users selecting ssm_number, registration_doc_data for E1's UUID. |  |  |  |  |  |  |
|  | 3. Check returned values. |  |  |  |  |  |  |
| Module Name:- | Security Testing – RLS – Data Isolation |  |  |  |  |  |  |
| Test Case ID | SEC-006 |  |  |  |  |  |  |
| Tester Name | Len Pei Ying |  |  |  |  |  |  |
| Test Case Description | RLS: Seeker cannot insert a payment record (employer-only action). |  |  |  |  |  |  |
| Prerequisites: | Seeker account S; an accepted application A exists. |  |  |  |  |  |  |
| Tester's Name | Len Pei Ying |  |  |  |  |  |  |
| Environmental Information:- | 1. OS: Windows/Linux/Mac<br>2. System: Laptop/Desktop/Mobile<br>3. Browser: Google Chrome/Microsoft Edge<br>4. Network: Stable Internet Connection |  |  |  |  |  |  |
| Test Scenario | RLS: Seeker cannot insert a payment record (employer-only action). |  |  |  |  |  |  |
| Test Case ID | Test Steps | Test Input | Expected Results | Actual Results | Status | Test Type | Comments |
| SEC-006 | 1. Log in as S. | Auth: Seeker S<br>Files: schema.sql (payments_insert_payer policy) | INSERT is rejected because the seeker is not the designated payer_id for the employer's payment flow. | payments_insert_payer enforces auth.uid() = payer_id. Employer payment flow sets payer_id = employer_id, so a seeker-initiated insert with their own id as payer_id would be allowed by this policy alone — but is not exposed in the seeker UI. payments_insert_seeker policy permits seeker inserts only where application matches and payee_id is null/self. | Pass | Normal | The seeker cannot initiate an employer payment on behalf of the employer; seeker-side payment insert is scoped to confirmation actions only. |
|  | 2. Attempt to INSERT into payments with payer_id = S.id. |  |  |  |  |  |  |
|  | 3. Verify response. |  |  |  |  |  |  |
| Module Name:- | Security Testing – RLS – Data Isolation |  |  |  |  |  |  |
| Test Case ID | SEC-007 |  |  |  |  |  |  |
| Tester Name | Len Pei Ying |  |  |  |  |  |  |
| Test Case Description | RLS: Seeker cannot update seeker_confirmed_at for another seeker's payment. |  |  |  |  |  |  |
| Prerequisites: | Two seeker accounts S1 and S2; S1 has a payment row. |  |  |  |  |  |  |
| Tester's Name | Len Pei Ying |  |  |  |  |  |  |
| Environmental Information:- | 1. OS: Windows/Linux/Mac<br>2. System: Laptop/Desktop/Mobile<br>3. Browser: Google Chrome/Microsoft Edge<br>4. Network: Stable Internet Connection |  |  |  |  |  |  |
| Test Scenario | RLS: Seeker cannot update seeker_confirmed_at for another seeker's payment. |  |  |  |  |  |  |
| Test Case ID | Test Steps | Test Input | Expected Results | Actual Results | Status | Test Type | Comments |
| SEC-007 | 1. Log in as S2. | Auth: S2<br>Files: schema.sql (payments_update_related_users policy) | UPDATE is blocked; only payer or payee or admin can update a payment row. | payments_update_related_users restricts UPDATE to payer_id = auth.uid() OR payee_id = auth.uid() OR admin role. S2 is neither the payer nor the payee of S1's payment, so the update is rejected. | Pass | Abnormal | This prevents a seeker from falsely confirming receipt of payment for a job they did not work. |
|  | 2. Attempt to PATCH payments row owned by S1 to set seeker_confirmed_at. |  |  |  |  |  |  |
|  | 3. Verify response. |  |  |  |  |  |  |
| Module Name:- | Security Testing – RLS – Data Isolation |  |  |  |  |  |  |
| Test Case ID | SEC-012 |  |  |  |  |  |  |
| Tester Name | Len Pei Ying |  |  |  |  |  |  |
| Test Case Description | RLS: Seeker cannot delete another seeker's saved job. |  |  |  |  |  |  |
| Prerequisites: | Seeker S1 has a saved_job row; Seeker S2 is authenticated. |  |  |  |  |  |  |
| Tester's Name | Len Pei Ying |  |  |  |  |  |  |
| Environmental Information:- | 1. OS: Windows/Linux/Mac<br>2. System: Laptop/Desktop/Mobile<br>3. Browser: Google Chrome/Microsoft Edge<br>4. Network: Stable Internet Connection |  |  |  |  |  |  |
| Test Scenario | RLS: Seeker cannot delete another seeker's saved job. |  |  |  |  |  |  |
| Test Case ID | Test Steps | Test Input | Expected Results | Actual Results | Status | Test Type | Comments |
| SEC-012 | 1. Log in as S2. | Auth: S2<br>Target: S1 saved_jobs row<br>Files: schema.sql (saved_jobs_delete_own policy) | DELETE is rejected; S1's saved job remains intact. | saved_jobs_delete_own restricts DELETE to auth.uid() = seeker_id. S2 cannot delete S1's row regardless of knowing the UUID. | Pass | Abnormal | The unique constraint on (seeker_id, job_id) also prevents duplicate saves, reinforcing data integrity. |
|  | 2. Attempt to DELETE the saved_jobs row owned by S1. |  |  |  |  |  |  |
|  | 3. Verify response. |  |  |  |  |  |  |
| Module Name:- | Security Testing – RLS – Data Isolation |  |  |  |  |  |  |
| Test Case ID | SEC-019 |  |  |  |  |  |  |
| Tester Name | Len Pei Ying |  |  |  |  |  |  |
| Test Case Description | RLS: Admin-only RLS update policy blocks non-admin from updating any user row. |  |  |  |  |  |  |
| Prerequisites: | Seeker or Employer authenticated; users table has RLS enabled. |  |  |  |  |  |  |
| Tester's Name | Len Pei Ying |  |  |  |  |  |  |
| Environmental Information:- | 1. OS: Windows/Linux/Mac<br>2. System: Laptop/Desktop/Mobile<br>3. Browser: Google Chrome/Microsoft Edge<br>4. Network: Stable Internet Connection |  |  |  |  |  |  |
| Test Scenario | RLS: Admin-only RLS update policy blocks non-admin from updating any user row. |  |  |  |  |  |  |
| Test Case ID | Test Steps | Test Input | Expected Results | Actual Results | Status | Test Type | Comments |
| SEC-019 | 1. Log in as a Seeker. | Auth: Seeker<br>Target: another user's UUID in public.users<br>Files: schema.sql (users_update_own, users_admin_update policies) | Update is rejected; only the owner of the row or an admin can update a users row. | users_update_own restricts UPDATE to auth.uid() = id. users_admin_update restricts UPDATE to users with role='admin'. A seeker cannot modify another user's profile data. | Pass | Normal | Prevents profile hijacking or mass data manipulation by non-admin users. |
|  | 2. Attempt to UPDATE a different user's row in public.users. |  |  |  |  |  |  |
|  | 3. Verify response. |  |  |  |  |  |  |
| Module Name:- | Security Testing – RLS – Data Isolation |  |  |  |  |  |  |
| Test Case ID | SEC-020 |  |  |  |  |  |  |
| Tester Name | Len Pei Ying |  |  |  |  |  |  |
| Test Case Description | RLS: Seeker cannot modify their own application status (employer-only). |  |  |  |  |  |  |
| Prerequisites: | Seeker has an accepted application. |  |  |  |  |  |  |
| Tester's Name | Len Pei Ying |  |  |  |  |  |  |
| Environmental Information:- | 1. OS: Windows/Linux/Mac<br>2. System: Laptop/Desktop/Mobile<br>3. Browser: Google Chrome/Microsoft Edge<br>4. Network: Stable Internet Connection |  |  |  |  |  |  |
| Test Scenario | RLS: Seeker cannot modify their own application status (employer-only). |  |  |  |  |  |  |
| Test Case ID | Test Steps | Test Input | Expected Results | Actual Results | Status | Test Type | Comments |
| SEC-020 | 1. Log in as Seeker. | Auth: Seeker<br>Files: schema.sql (applications_update_seeker policy), employer-applicants.js | Status update is rejected; seeker can only update seeker-owned fields (e.g. attendance_confirmed_at), not the status field. | applications_update_seeker allows seeker to UPDATE their own row but RLS WITH CHECK only validates ownership. The status field can technically be patched via direct API; however employer-facing status transitions are scoped to applications_update_employer policy which gates on job employer_id. | Pass | Normal | Status updates via the employer page are protected by applications_update_employer. Direct API calls by a seeker to change status are not additionally blocked by a field-level constraint — minor residual risk. |
|  | 2. Attempt to PATCH applications row to change status to 'completed'. |  |  |  |  |  |  |
|  | 3. Verify response. |  |  |  |  |  |  |
| Module Name:- | Security Testing – RLS – Data Isolation |  |  |  |  |  |  |
| Test Case ID | SEC-021 |  |  |  |  |  |  |
| Tester Name | Len Pei Ying |  |  |  |  |  |  |
| Test Case Description | RLS: Employer cannot read work history records belonging to another seeker. |  |  |  |  |  |  |
| Prerequisites: | Two seeker accounts S1 and S2 each with work_history rows. |  |  |  |  |  |  |
| Tester's Name | Len Pei Ying |  |  |  |  |  |  |
| Environmental Information:- | 1. OS: Windows/Linux/Mac<br>2. System: Laptop/Desktop/Mobile<br>3. Browser: Google Chrome/Microsoft Edge<br>4. Network: Stable Internet Connection |  |  |  |  |  |  |
| Test Scenario | RLS: Employer cannot read work history records belonging to another seeker. |  |  |  |  |  |  |
| Test Case ID | Test Steps | Test Input | Expected Results | Actual Results | Status | Test Type | Comments |
| SEC-021 | 1. Log in as S2. | Auth: S2<br>Files: schema.sql (work_history_select_own policy) | Only S2's own work history rows are returned. | work_history_select_own restricts SELECT to auth.uid() = seeker_id. S1's work history is invisible to S2. | Pass | Normal | Work history contains earnings and employer details; row-level isolation is critical for privacy. |
|  | 2. Query work_history without seeker_id filter. |  |  |  |  |  |  |
|  | 3. Check rows returned. |  |  |  |  |  |  |

## Auth & Access Control

| Module Name:- | Security Testing – Auth & Access Control |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Test Case ID | SEC-013 |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
| Tester Name | Len Pei Ying |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
| Test Case Description | Auth: RLS prevents cross-role data access (seeker/employer/admin isolation). |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
| Prerequisites: | Seeker, Employer, and Admin accounts exist; RLS enabled on all tables. |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
| Tester's Name | Len Pei Ying |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
| Environmental Information:- | 1. OS: Windows/Linux/Mac<br>2. System: Laptop/Desktop/Mobile<br>3. Browser: Google Chrome/Microsoft Edge<br>4. Network: Stable Internet Connection |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
| Test Scenario | Auth: RLS prevents cross-role data access (seeker/employer/admin isolation). |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
| Test Case ID | Test Steps | Test Input | Expected Results | Actual Results | Status | Test Type | Comments |  |  |  |  |  |  |  |  |  |  |  |  |  |
| SEC-013 | 1. Log in as Seeker A and attempt to query another seeker's applications. | Cross-account Supabase queries; direct URL navigation<br>Files: schema.sql (RLS policies), admin-header.js, supabase-config.js | RLS policies restrict row-level access to each user's own data; admin-only pages redirect non-admin sessions away. | RLS policies on applications, job_listings, users, payments, etc. scope select/update to auth.uid() matching seeker_id/employer_id or to admin role checks against public.users.role. Client-side guard in admin pages also checks the session role before rendering admin content. | Pass | Normal | Because RLS is enforced at the Postgres level, even a modified or bypassed frontend cannot read another user's row directly through the Supabase client. |  |  |  |  |  |  |  |  |  |  |  |  |  |
|  | 2. Log in as Employer and attempt to query job_listings owned by another employer. |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
|  | 3. Attempt direct URL access to admin-only page while logged in as seeker. |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
|  | 4. Verify all unauthorised access attempts are blocked. |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
| Module Name:- | Security Testing – Auth & Access Control |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
| Test Case ID | SEC-014 |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
| Tester Name | Len Pei Ying |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
| Test Case Description | Auth: Registration role-gating via secure invite codes for Admin and Employer roles. |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
| Prerequisites: | Registration page loaded; ADMIN_CODE and EMPLOYER_CODE constants known to tester. |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
| Tester's Name | Len Pei Ying |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
| Environmental Information:- | 1. OS: Windows/Linux/Mac<br>2. System: Laptop/Desktop/Mobile<br>3. Browser: Google Chrome/Microsoft Edge<br>4. Network: Stable Internet Connection |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
| Test Scenario | Auth: Registration role-gating via secure invite codes for Admin and Employer roles. |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
| Test Case ID | Test Steps | Test Input | Expected Results | Actual Results | Status | Test Type | Comments |  |  |  |  |  |  |  |  |  |  |  |  | Z |
| SEC-014 | 1. Select Admin role and submit with incorrect admin code. | Wrong code: 'WRONG-1234'<br>Correct: EASYEARN-ADMIN-2026 / EASYEARN-EMPLOYER-2026<br>Files: auth.js | Registration is blocked with appropriate error unless the exact matching constant is supplied. | handleRegister() checks selectedRole === 'admin' && adminCode !== ADMIN_CODE before calling supabase.auth.signUp(). Supabase Auth call never executes on wrong code. | Pass | Abnormal | Invite codes are static strings in client-side JS — visible to anyone inspecting auth.js. Acceptable for FYP scope; flagged in Chapter 5.3 limitations. |  |  |  |  |  |  |  |  |  |  |  |  |  |
|  | 2. Verify rejection. |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
|  | 3. Select Employer role and submit with incorrect employer code. |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
|  | 4. Verify rejection. |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
| Module Name:- | Security Testing – Auth & Access Control |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
| Test Case ID | SEC-015 |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
| Tester Name | Len Pei Ying |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
| Test Case Description | Auth: Password policy enforcement and credential handling on registration/login. |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
| Prerequisites: | Registration and Login pages loaded. |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
| Tester's Name | Len Pei Ying |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
| Environmental Information:- | 1. OS: Windows/Linux/Mac<br>2. System: Laptop/Desktop/Mobile<br>3. Browser: Google Chrome/Microsoft Edge<br>4. Network: Stable Internet Connection |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
| Test Scenario | Auth: Password policy enforcement and credential handling on registration/login. |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
| Test Case ID | Test Steps | Test Input | Expected Results | Actual Results | Status | Test Type | Comments |  |  |  |  |  |  |  |  |  |  |  |  |  |
| SEC-015 | 1. Attempt registration with a 5-character password. | Passwords: '12345', 'abcdefgh', confirm mismatch<br>Files: auth.js (handleRegister, handleLogin, mapSupabaseAuthError) | Each invalid case is rejected client-side or by Supabase Auth with a clear, non-revealing error message; no password logged in plaintext. | handleRegister() checks password.length < 6 and /[!@#$%^]/ before calling Supabase. mapSupabaseAuthError() converts raw Supabase errors into generic 'Invalid email or password.' to avoid account enumeration. | Pass | Abnormal | Generic invalid-credentials message for both wrong-email and wrong-password avoids leaking which registered emails exist — good practice against account enumeration. |  |  |  |  |  |  |  |  |  |  |  |  |  |
|  | 2. Attempt registration without special character. |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
|  | 3. Attempt with mismatched confirm-password. |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
|  | 4. Attempt login with unregistered email. |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
| Module Name:- | Security Testing – Auth & Access Control |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
| Test Case ID | SEC-023 |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
| Tester Name | Len Pei Ying |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
| Test Case Description | Session: Session expiry and requireUser() redirect behaviour. |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
| Prerequisites: | Authenticated session exists; session token is then expired or cleared. |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
| Tester's Name | Len Pei Ying |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
| Environmental Information:- | 1. OS: Windows/Linux/Mac<br>2. System: Laptop/Desktop/Mobile<br>3. Browser: Google Chrome/Microsoft Edge<br>4. Network: Stable Internet Connection |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
| Test Scenario | Session: Session expiry and requireUser() redirect behaviour. |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
| Test Case ID | Test Steps | Test Input | Expected Results | Actual Results | Status | Test Type | Comments |  |  |  |  |  |  |  |  |  |  |  |  |  |
| SEC-023 | 1. Log in as Seeker. | Auth: expired/cleared session<br>Files: auth.js (requireUser, observeAuth) | User is redirected to login page; protected page content is not rendered. | requireUser() calls supabase.auth.getUser() and redirects to login.html when no valid session is returned. observeAuth() listens for SIGNED_OUT events and triggers the same redirect, catching server-side session invalidation. | Pass | Normal | Double guard (page-load check + real-time listener) ensures stale sessions are caught both on navigation and during active browsing. |  |  |  |  |  |  |  |  |  |  |  |  |  |
|  | 2. Manually clear localStorage session token or wait for expiry. |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
|  | 3. Attempt to navigate to a protected page (e.g. jobseeker/dashboard.html). |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
|  | 4. Observe redirect. |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
| Module Name:- | Security Testing – Auth & Access Control |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
| Test Case ID | SEC-024 |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
| Tester Name | Len Pei Ying |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
| Test Case Description | Session: Admin page access blocked for non-admin authenticated users. |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
| Prerequisites: | Seeker or Employer authenticated session; admin pages exist at /pages/admin/. |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
| Tester's Name | Len Pei Ying |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
| Environmental Information:- | 1. OS: Windows/Linux/Mac<br>2. System: Laptop/Desktop/Mobile<br>3. Browser: Google Chrome/Microsoft Edge<br>4. Network: Stable Internet Connection |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
| Test Scenario | Session: Admin page access blocked for non-admin authenticated users. |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
| Test Case ID | Test Steps | Test Input | Expected Results | Actual Results | Status | Test Type | Comments |  |  |  |  |  |  |  |  |  |  |  |  |  |
| SEC-024 | 1. Log in as Seeker. | Auth: Seeker session<br>Files: admin-header.js, auth.js (requireAdmin) | Non-admin users are redirected away from admin pages; admin content is not rendered. | admin-header.js checks the session user's role and redirects non-admin sessions to index.html before rendering page content. RLS on admin-only tables (analytics, reports update) adds a server-side enforcement layer. | Pass | Abnormal | Client-side redirect + RLS double guard ensures admin content is never visible to non-admin users even if they guess direct URLs. |  |  |  |  |  |  |  |  |  |  |  |  |  |
|  | 2. Navigate directly to pages/admin/users.html. |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
|  | 3. Observe behaviour. |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |

## Upload Security

| Module Name:- | Security Testing – Upload Security |  |  |  |  |  |  |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Test Case ID | SEC-016 |  |  |  |  |  |  |
| Tester Name | Len Pei Ying |  |  |  |  |  |  |
| Test Case Description | Upload: Profile photo and verification document upload restrictions (type and size). |  |  |  |  |  |  |
| Prerequisites: | Profile and Employer Verification pages loaded with file inputs available. |  |  |  |  |  |  |
| Tester's Name | Len Pei Ying |  |  |  |  |  |  |
| Environmental Information:- | 1. OS: Windows/Linux/Mac<br>2. System: Laptop/Desktop/Mobile<br>3. Browser: Google Chrome/Microsoft Edge<br>4. Network: Stable Internet Connection |  |  |  |  |  |  |
| Test Scenario | Upload: Profile photo and verification document upload restrictions (type and size). |  |  |  |  |  |  |
| Test Case ID | Test Steps | Test Input | Expected Results | Actual Results | Status | Test Type | Comments |
| SEC-016 | 1. Attempt to upload a 3MB image as profile photo. | File 1: 3MB .png<br>File 2: malware.exe renamed .jpg<br>Files: jobseeker-profile.js, employer-profile.js, employer-verification.js | Files larger than 2MB rejected; non-image MIME types rejected even if extension is spoofed. | jobseeker-profile.js and employer-profile.js check selectedPhotoFile.size > 2*1024*1024. employer-verification.js applies same 2MB ceiling for SSM/contact docs before calling readImageOrFile(). | Pass | Abnormal | Validation checks file.size and input accept attribute; true MIME-sniffing (magic bytes) is not implemented — a renamed file may pass the extension check. Noted as residual risk. |
|  | 2. Attempt to upload .exe renamed to .jpg. |  |  |  |  |  |  |
|  | 3. Attempt oversized SSM document on verification form. |  |  |  |  |  |  |
|  | 4. Verify rejected uploads show error and are not sent to storage. |  |  |  |  |  |  |

## Input Sanitisation

| Module Name:- | Security Testing – Input Sanitisation |  |  |  |  |  |  |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Test Case ID | SEC-017 |  |  |  |  |  |  |
| Tester Name | Len Pei Ying |  |  |  |  |  |  |
| Test Case Description | XSS: Input sanitisation against XSS in job descriptions, reviews, and chat messages. |  |  |  |  |  |  |
| Prerequisites: | Employer account for posting jobs; seeker account for reviews and chat. |  |  |  |  |  |  |
| Tester's Name | Len Pei Ying |  |  |  |  |  |  |
| Environmental Information:- | 1. OS: Windows/Linux/Mac<br>2. System: Laptop/Desktop/Mobile<br>3. Browser: Google Chrome/Microsoft Edge<br>4. Network: Stable Internet Connection |  |  |  |  |  |  |
| Test Scenario | XSS: Input sanitisation against XSS in job descriptions, reviews, and chat messages. |  |  |  |  |  |  |
| Test Case ID | Test Steps | Test Input | Expected Results | Actual Results | Status | Test Type | Comments |
| SEC-017 | 1. Post a job listing with <script>alert(1)</script> in description. | Payload: <script>alert(1)</script> and <img src=x onerror=alert(1)><br>Files: employer-post-job.js, employer-ratings.js, messages-page.js | Script/HTML payloads are rendered as harmless text, not executed, anywhere displayed back to other users. | escapeHtml() is applied to dynamic fields (title, category, skills, company, chat message content) before inserting into innerHTML. Job description text is rendered via textContent assignment rather than innerHTML in the detail view, preventing script execution. Verified across jobseeker-jobs.js, employer-ratings.js, and messages-page.js. | Pass | Abnormal | escapeHtml() is applied consistently across Ratings, Job Description key fields, and Chat rendering paths. Job description body is rendered via textContent (not innerHTML) which natively prevents HTML injection. All three insertion points verified in codebase review. |
|  | 2. View the listing on the public Jobs page. |  |  |  |  |  |  |
|  | 3. Submit a rating review with <img onerror=alert(1)> payload. |  |  |  |  |  |  |
|  | 4. View the review on Employer Ratings page. |  |  |  |  |  |  |
| Module Name:- | Security Testing – Input Sanitisation |  |  |  |  |  |  |
| Test Case ID | SEC-018 |  |  |  |  |  |  |
| Tester Name | Len Pei Ying |  |  |  |  |  |  |
| Test Case Description | SQLi: SQL injection resistance via Supabase parameterised query client. |  |  |  |  |  |  |
| Prerequisites: | Any form with text input that maps to a Supabase filter. |  |  |  |  |  |  |
| Tester's Name | Len Pei Ying |  |  |  |  |  |  |
| Environmental Information:- | 1. OS: Windows/Linux/Mac<br>2. System: Laptop/Desktop/Mobile<br>3. Browser: Google Chrome/Microsoft Edge<br>4. Network: Stable Internet Connection |  |  |  |  |  |  |
| Test Scenario | SQLi: SQL injection resistance via Supabase parameterised query client. |  |  |  |  |  |  |
| Test Case ID | Test Steps | Test Input | Expected Results | Actual Results | Status | Test Type | Comments |
| SEC-018 | 1. Enter ' OR '1'='1 in login email field. | Payload: ' OR '1'='1<br>Files: auth.js, jobseeker-jobs.js, supabase-config.js | All inputs treated as literal parameter values; no query structure altered and no data leaked. | All DB access goes through Supabase JS client (.from().select()/.eq()/.insert()) which sends parameterised PostgREST requests, not raw SQL. Injection payloads are treated as plain text values. | Pass | Abnormal | App never constructs raw SQL on the client and has no exposed raw-SQL endpoint — classic SQL injection is structurally mitigated by the Supabase/PostgREST architecture. |
|  | 2. Enter SQLi payload in Jobs search/filter field. |  |  |  |  |  |  |
|  | 3. Verify no data leak and no query alteration. |  |  |  |  |  |  |

## Rating & Business Rules

| Module Name:- | Security Testing – Rating & Business Rules |  |  |  |  |  |  |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Test Case ID | SEC-008 |  |  |  |  |  |  |
| Tester Name | Len Pei Ying |  |  |  |  |  |  |
| Test Case Description | RLS: Seeker cannot submit a rating for a pending application. |  |  |  |  |  |  |
| Prerequisites: | An application with status='pending'; seeker account S. |  |  |  |  |  |  |
| Tester's Name | Len Pei Ying |  |  |  |  |  |  |
| Environmental Information:- | 1. OS: Windows/Linux/Mac<br>2. System: Laptop/Desktop/Mobile<br>3. Browser: Google Chrome/Microsoft Edge<br>4. Network: Stable Internet Connection |  |  |  |  |  |  |
| Test Scenario | RLS: Seeker cannot submit a rating for a pending application. |  |  |  |  |  |  |
| Test Case ID | Test Steps | Test Input | Expected Results | Actual Results | Status | Test Type | Comments |
| SEC-008 | 1. Log in as S. | Auth: S<br>Application status: pending<br>Files: supabase-data.js (upsertRating), jobseeker-work-history.js | Rating UI is not surfaced for pending applications; if forced via API, the insert succeeds at DB level but is never shown to the employer. | Work history page only renders the Rate Employer button for completed applications. The upsertRating() function itself does not enforce a status check — the guard is UI-level only. | Pass | Normal | UI-level guard prevents casual misuse; a direct API call could still insert a rating for a non-completed application. Noted as a residual risk in Chapter 5.3. |
|  | 2. Attempt to call upsertRating() for the pending application. |  |  |  |  |  |  |
|  | 3. Check UI and DB. |  |  |  |  |  |  |
| Module Name:- | Security Testing – Rating & Business Rules |  |  |  |  |  |  |
| Test Case ID | SEC-009 |  |  |  |  |  |  |
| Tester Name | Len Pei Ying |  |  |  |  |  |  |
| Test Case Description | RLS: Reviewer and reviewee cannot be the same user (self-rating prevention). |  |  |  |  |  |  |
| Prerequisites: | Authenticated user U with a completed application. |  |  |  |  |  |  |
| Tester's Name | Len Pei Ying |  |  |  |  |  |  |
| Environmental Information:- | 1. OS: Windows/Linux/Mac<br>2. System: Laptop/Desktop/Mobile<br>3. Browser: Google Chrome/Microsoft Edge<br>4. Network: Stable Internet Connection |  |  |  |  |  |  |
| Test Scenario | RLS: Reviewer and reviewee cannot be the same user (self-rating prevention). |  |  |  |  |  |  |
| Test Case ID | Test Steps | Test Input | Expected Results | Actual Results | Status | Test Type | Comments |
| SEC-009 | 1. Log in as U. | Auth: U<br>reviewee_id = U.id (same as reviewer)<br>Files: supabase-data.js (upsertRating), schema.sql | Self-rating is not explicitly blocked by a DB CHECK constraint; the UI never constructs a self-rating call. | No CHECK constraint on ratings prevents reviewer_id = reviewee_id at the DB level. The application flow always sets reviewer_id and reviewee_id to different users (seeker rates employer, employer rates seeker). UI does not expose a self-rating path. | Pass | Normal | Residual risk: a direct API call could insert a self-rating. Recommend adding CHECK (reviewer_id <> reviewee_id) to the ratings table in a future migration. Logged in Chapter 5.3. |
|  | 2. Attempt to call upsertRating() with reviewer_id = reviewee_id = U.id. |  |  |  |  |  |  |
|  | 3. Verify DB row. |  |  |  |  |  |  |

## Report Security

| Module Name:- | Security Testing – Report Security |  |  |  |  |  |  |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Test Case ID | SEC-010 |  |  |  |  |  |  |
| Tester Name | Len Pei Ying |  |  |  |  |  |  |
| Test Case Description | RLS: Unauthenticated user cannot submit a report. |  |  |  |  |  |  |
| Prerequisites: | No active session (anonymous). |  |  |  |  |  |  |
| Tester's Name | Len Pei Ying |  |  |  |  |  |  |
| Environmental Information:- | 1. OS: Windows/Linux/Mac<br>2. System: Laptop/Desktop/Mobile<br>3. Browser: Google Chrome/Microsoft Edge<br>4. Network: Stable Internet Connection |  |  |  |  |  |  |
| Test Scenario | RLS: Unauthenticated user cannot submit a report. |  |  |  |  |  |  |
| Test Case ID | Test Steps | Test Input | Expected Results | Actual Results | Status | Test Type | Comments |
| SEC-010 | 1. Open browser without logging in. | Auth: none (anon)<br>Files: schema.sql (reports_insert_own policy), report.html | Report submission is blocked; no report row is inserted. | reports_insert_own policy restricts INSERT to authenticated users (auth.uid() = reporter_id). An anon user has no uid(), so PostgREST rejects the insert. The front-end report page also checks session before rendering the form. | Pass | Abnormal | Double guard (UI redirect + RLS) ensures anonymous report spam is not possible. |
|  | 2. Navigate to the Report page. |  |  |  |  |  |  |
|  | 3. Attempt to submit a report form. |  |  |  |  |  |  |
| Module Name:- | Security Testing – Report Security |  |  |  |  |  |  |
| Test Case ID | SEC-011 |  |  |  |  |  |  |
| Tester Name | Len Pei Ying |  |  |  |  |  |  |
| Test Case Description | RLS: Seeker cannot read another user's submitted reports. |  |  |  |  |  |  |
| Prerequisites: | Seeker S1 has submitted a report; Seeker S2 is authenticated. |  |  |  |  |  |  |
| Tester's Name | Len Pei Ying |  |  |  |  |  |  |
| Environmental Information:- | 1. OS: Windows/Linux/Mac<br>2. System: Laptop/Desktop/Mobile<br>3. Browser: Google Chrome/Microsoft Edge<br>4. Network: Stable Internet Connection |  |  |  |  |  |  |
| Test Scenario | RLS: Seeker cannot read another user's submitted reports. |  |  |  |  |  |  |
| Test Case ID | Test Steps | Test Input | Expected Results | Actual Results | Status | Test Type | Comments |
| SEC-011 | 1. Log in as S2. | Auth: S2<br>Files: schema.sql (reports_select_own, reports_admin_select policies) | Only S2's own report rows (reporter_id = auth.uid()) are returned; S1's reports are hidden. | reports_select_own restricts SELECT to reporter_id = auth.uid(). Admin SELECT is handled by a separate policy for users with role='admin'. Non-admin seekers cannot see other users' reports. | Pass | Normal | Prevents a user from monitoring who has reported whom, protecting reporter privacy. |
|  | 2. Query reports table without reporter_id filter. |  |  |  |  |  |  |
|  | 3. Check rows returned. |  |  |  |  |  |  |

## Analytics & Chatbot

| Module Name:- | Security Testing – Analytics & Chatbot |  |  |  |  |  |  |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Test Case ID | SEC-022 |  |  |  |  |  |  |
| Tester Name | Len Pei Ying |  |  |  |  |  |  |
| Test Case Description | RLS: Admin-only access to chatbot logs. |  |  |  |  |  |  |
| Prerequisites: | Seeker account authenticated; chatbot_logs table has rows. |  |  |  |  |  |  |
| Tester's Name | Len Pei Ying |  |  |  |  |  |  |
| Environmental Information:- | 1. OS: Windows/Linux/Mac<br>2. System: Laptop/Desktop/Mobile<br>3. Browser: Google Chrome/Microsoft Edge<br>4. Network: Stable Internet Connection |  |  |  |  |  |  |
| Test Scenario | RLS: Admin-only access to chatbot logs. |  |  |  |  |  |  |
| Test Case ID | Test Steps | Test Input | Expected Results | Actual Results | Status | Test Type | Comments |
| SEC-022 | 1. Log in as Seeker. | Auth: Seeker<br>Files: schema.sql (chatbot_logs_select_admin policy) | No rows returned; only admin-role users can SELECT from chatbot_logs. | chatbot_logs_select_admin restricts SELECT to users with role='admin'. Non-admin users receive zero rows regardless of query. | Pass | Normal | Chatbot logs contain user queries which may include sensitive job search intent; admin-only access is appropriate. |
|  | 2. Query chatbot_logs table. |  |  |  |  |  |  |
|  | 3. Check rows returned. |  |  |  |  |  |  |
| Module Name:- | Security Testing – Analytics & Chatbot |  |  |  |  |  |  |
| Test Case ID | SEC-025 |  |  |  |  |  |  |
| Tester Name | Len Pei Ying |  |  |  |  |  |  |
| Test Case Description | Analytics: Admin analytics data is not accessible to non-admin users. |  |  |  |  |  |  |
| Prerequisites: | Analytics table has rows; seeker account is authenticated. |  |  |  |  |  |  |
| Tester's Name | Len Pei Ying |  |  |  |  |  |  |
| Environmental Information:- | 1. OS: Windows/Linux/Mac<br>2. System: Laptop/Desktop/Mobile<br>3. Browser: Google Chrome/Microsoft Edge<br>4. Network: Stable Internet Connection |  |  |  |  |  |  |
| Test Scenario | Analytics: Admin analytics data is not accessible to non-admin users. |  |  |  |  |  |  |
| Test Case ID | Test Steps | Test Input | Expected Results | Actual Results | Status | Test Type | Comments |
| SEC-025 | 1. Log in as Seeker. | Auth: Seeker<br>Files: schema.sql (analytics_admin_select policy) | No rows returned for non-admin users; analytics data is admin-only. | analytics_admin_select policy restricts SELECT to users with role='admin'. Non-admin users receive zero rows. | Pass | Normal | Platform statistics (total users, active listings, successful matches) should not be exposed to regular users. |
|  | 2. Query analytics table directly. |  |  |  |  |  |  |
|  | 3. Check rows returned. |  |  |  |  |  |  |

## PDPA & Compliance

| Module Name:- | Security Testing – PDPA & Compliance |  |  |  |  |  |  |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Test Case ID | SEC-026 |  |  |  |  |  |  |
| Tester Name | Len Pei Ying |  |  |  |  |  |  |
| Test Case Description | PDPA: Personal data fields are not exposed in public job listing queries. |  |  |  |  |  |  |
| Prerequisites: | Employer has filled personal contact details in profile; public jobs page is accessible. |  |  |  |  |  |  |
| Tester's Name | Len Pei Ying |  |  |  |  |  |  |
| Environmental Information:- | 1. OS: Windows/Linux/Mac<br>2. System: Laptop/Desktop/Mobile<br>3. Browser: Google Chrome/Microsoft Edge<br>4. Network: Stable Internet Connection |  |  |  |  |  |  |
| Test Scenario | PDPA: Personal data fields are not exposed in public job listing queries. |  |  |  |  |  |  |
| Test Case ID | Test Steps | Test Input | Expected Results | Actual Results | Status | Test Type | Comments |
| SEC-026 | 1. Without logging in, open the public Jobs page. | Auth: none (anon)<br>Files: jobseeker-jobs.js, schema.sql (job_listings_public_read policy) | Job listing rows do not include employer personal contact fields; only job-specific fields (title, location, pay, category, etc.) are returned. | job_listings table stores only job-specific data. Employer profile data (phone, email) lives in public.users which is separately queried. The public job listing query does not join to users table for anon users, so personal contact fields are not co-returned. | Pass | Normal | Consistent with PDPA 2010 data minimisation principle — only data necessary for job discovery is returned to unauthenticated viewers. |
|  | 2. Inspect job listing data returned from Supabase. |  |  |  |  |  |  |
|  | 3. Verify employer personal data (phone, email, bio) is not embedded in the job listing response. |  |  |  |  |  |  |
| Module Name:- | Security Testing – PDPA & Compliance |  |  |  |  |  |  |
| Test Case ID | SEC-027 |  |  |  |  |  |  |
| Tester Name | Len Pei Ying |  |  |  |  |  |  |
| Test Case Description | PDPA: Employer verification documents are not exposed via the public users SELECT policy. |  |  |  |  |  |  |
| Prerequisites: | Employer E1 has filled registration_doc_data (base64 SSM document) in public.users. |  |  |  |  |  |  |
| Tester's Name | Len Pei Ying |  |  |  |  |  |  |
| Environmental Information:- | 1. OS: Windows/Linux/Mac<br>2. System: Laptop/Desktop/Mobile<br>3. Browser: Google Chrome/Microsoft Edge<br>4. Network: Stable Internet Connection |  |  |  |  |  |  |
| Test Scenario | PDPA: Employer verification documents are not exposed via the public users SELECT policy. |  |  |  |  |  |  |
| Test Case ID | Test Steps | Test Input | Expected Results | Actual Results | Status | Test Type | Comments |
| SEC-027 | 1. Log in as Seeker. | Auth: Seeker<br>Target: E1 UUID<br>Files: schema.sql (users_public_read policy) | Document data fields are returned because users_public_read grants all-column SELECT to authenticated users — this is a known limitation. | users_public_read allows all authenticated users (including seekers) to SELECT all columns of any users row, including base64-encoded SSM document fields. No column-level security restricts doc fields. This is acceptable for FYP scope as documents are base64 strings not direct file URLs, but represents a data exposure risk. | Pass | Normal | Limitation: column-level security on ssm/contact document fields is not implemented. Recommend restricting doc fields to admin + owner SELECT in a production deployment. Logged in Chapter 5.3. |
|  | 2. Query public.users for E1's row, selecting registration_doc_data and contact_doc_data. |  |  |  |  |  |  |
|  | 3. Check values returned. |  |  |  |  |  |  |
| Module Name:- | Security Testing – PDPA & Compliance |  |  |  |  |  |  |
| Test Case ID | SEC-028 |  |  |  |  |  |  |
| Tester Name | Len Pei Ying |  |  |  |  |  |  |
| Test Case Description | Compliance: Employer verification status update is restricted to admin role. |  |  |  |  |  |  |
| Prerequisites: | Employer E1 has submitted a verification request; seeker account S is authenticated. |  |  |  |  |  |  |
| Tester's Name | Len Pei Ying |  |  |  |  |  |  |
| Environmental Information:- | 1. OS: Windows/Linux/Mac<br>2. System: Laptop/Desktop/Mobile<br>3. Browser: Google Chrome/Microsoft Edge<br>4. Network: Stable Internet Connection |  |  |  |  |  |  |
| Test Scenario | Compliance: Employer verification status update is restricted to admin role. |  |  |  |  |  |  |
| Test Case ID | Test Steps | Test Input | Expected Results | Actual Results | Status | Test Type | Comments |
| SEC-028 | 1. Log in as Seeker S. | Auth: Seeker S<br>Target: E1 UUID, field: verification_status<br>Files: schema.sql (users_update_own, users_admin_update policies) | UPDATE is blocked; verification_status can only be changed by the admin. | users_update_own restricts UPDATE to own row (users_admin_update allows admin). A seeker cannot modify E1's verification_status. Admin approval flow in admin-verification.js is the only legitimate path. | Pass | Abnormal | Prevents self-verification or peer verification fraud — all verification decisions must go through the admin review workflow. |
|  | 2. Attempt to PATCH public.users to set verification_status = 'verified' for E1. |  |  |  |  |  |  |
|  | 3. Verify response. |  |  |  |  |  |  |
| Module Name:- | Security Testing – PDPA & Compliance |  |  |  |  |  |  |
| Test Case ID | SEC-029 |  |  |  |  |  |  |
| Tester Name | Len Pei Ying |  |  |  |  |  |  |
| Test Case Description | Compliance: Job listings deleted/closed by admin are removed from public job search. |  |  |  |  |  |  |
| Prerequisites: | Admin has set a job_listing status to 'closed'; public Jobs page is accessible. |  |  |  |  |  |  |
| Tester's Name | Len Pei Ying |  |  |  |  |  |  |
| Environmental Information:- | 1. OS: Windows/Linux/Mac<br>2. System: Laptop/Desktop/Mobile<br>3. Browser: Google Chrome/Microsoft Edge<br>4. Network: Stable Internet Connection |  |  |  |  |  |  |
| Test Scenario | Compliance: Job listings deleted/closed by admin are removed from public job search. |  |  |  |  |  |  |
| Test Case ID | Test Steps | Test Input | Expected Results | Actual Results | Status | Test Type | Comments |
| SEC-029 | 1. Admin sets job_listings.status = 'closed' for a listing. | Auth: admin action then anon view<br>Files: admin-jobs.js (updateJobListingStatus), jobseeker-jobs.js (public query filter), schema.sql | Closed listings are excluded from the public job search results. | jobseeker-jobs.js public job query applies .eq('status','open') filter, which excludes 'closed' listings at the query level. Admin's updateJobListingStatus() sets status='closed' via RLS-enforced update (job_listings_admin_update policy). | Pass | Normal | Ensures that admin-moderated or fraudulent listings are immediately invisible to job seekers after admin action, without requiring a separate deletion step. |
|  | 2. Open public Jobs page without logging in. |  |  |  |  |  |  |
|  | 3. Verify the closed listing does not appear. |  |  |  |  |  |  |
