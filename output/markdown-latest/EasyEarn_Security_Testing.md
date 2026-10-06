# EasyEarn Security Testing

<!-- Source: EasyEarn_Security_Testing.xlsx -->

## Summary

### EasyEarn Security Testing Summary

### Overall Statistics

| Column A | Column C |
| --- | --- |
| Total Test Cases: | 30 |
| Total Categories: | 9 |
| Status: | Completed – 30 Passed / 0 Pending |

### Category Breakdown

| No. | Category | Test Cases | Percentage | Status | Priority | Test IDs |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | RLS - Data Isolation | 11 | 36.67% | COMPLETED | High: 11 | SEC-001–SEC-007, SEC-012, SEC-019–SEC-021 |
| 2 | Auth &amp; Access Control | 5 | 16.67% | COMPLETED | High: 5 | SEC-013–SEC-015, SEC-023–SEC-024 |
| 3 | Upload Security | 1 | 3.33% | COMPLETED | High: 1 | SEC-016 |
| 4 | Input Sanitisation | 2 | 6.67% | COMPLETED | High: 2 | SEC-017–SEC-018 |
| 5 | Rating &amp; Business Rules | 2 | 6.67% | COMPLETED | High: 2 | SEC-008–SEC-009 |
| 6 | Report Security | 2 | 6.67% | COMPLETED | High: 2 | SEC-010–SEC-011 |
| 7 | Analytics &amp; Chatbot | 2 | 6.67% | COMPLETED | High: 2 | SEC-022, SEC-025 |
| 8 | PDPA &amp; Compliance | 4 | 13.33% | COMPLETED | High: 4 | SEC-026–SEC-029 |
| 9 | Employer Verification &amp; Visibility | 1 | 3.33% | COMPLETED | High: 1 | SEC-030 |
| TOTAL |  | 30 | 100.00% | COMPLETED |  |  |

## RLS - Data Isolation

| Column A | Column B |
| --- | --- |
| Module Name:- | Security Testing – RLS – Data Isolation |
| Test Case ID | SEC-001 |
| Tester Name | Len Pei Ying |
| Test Case Description | RLS: Seeker cannot read another Job Seeker's applications. |
| Prerequisites: | Two Job Seeker accounts exist. ABCD owns 1 application record; Len Pei Ying owns 4 application records. |

| Column A | Column B |
| --- | --- |
| Tester's Name | Len Pei Ying |
| Environmental Information:- | 1. OS: Windows/Linux/Mac<br>2. System: Laptop/Desktop/Mobile<br>3. Browser: Google Chrome/Microsoft Edge<br>4. Network: Stable Internet Connection |

| Column A | Column B |
| --- | --- |
| Test Scenario | Verify that authenticated Job Seeker ABCD can read only their own application and cannot retrieve Len Pei Ying's application records. |

| Test Case ID | Test Steps | Test Input | Expected Results | Actual Results | Status | Test Type | Comments |
| --- | --- | --- | --- | --- | --- | --- | --- |
| SEC-001 | 1. Log in as Job Seeker ABCD. | Authenticated user: ABCD (d1ff41b4-fb7d-4398-a270-c405c83fc795)<br>Other seeker: Len Pei Ying (31c79f9e-2dee-44f9-80d7-2a70725dbb52) | ABCD's own application is returned, while a query for Len Pei Ying's applications returns no rows. RLS must prevent cross-seeker application disclosure even when another seeker's ID is supplied by the client. | While authenticated as ABCD, fetchApplications(ABCD_ID) returned exactly 1 application (id 888c03d0-98d9-4e89-bce4-5e0f4ef799c1, seeker_id = ABCD). Using the same authenticated session, fetchApplications(LEN_ID) returned an empty array []. Len Pei Ying's 4 application records were not exposed to ABCD. | Pass | Abnormal | Runtime RLS isolation was confirmed using ABCD's authenticated Supabase session: own row visible, another seeker's rows filtered out. |
|  | 2. Import the EasyEarn data module and call fetchApplications() using ABCD's own seeker ID. |  |  |  |  |  |  |
|  | 3. In the same authenticated ABCD session, call fetchApplications() using Len Pei Ying's seeker ID. |  |  |  |  |  |  |
|  | 4. Compare the returned arrays. |  |  |  |  |  |  |

| Column A | Column B |
| --- | --- |
| Module Name:- | Security Testing – RLS – Data Isolation |
| Test Case ID | SEC-002 |
| Tester Name | Len Pei Ying |
| Test Case Description | RLS: Seeker cannot update another seeker's application status. |
| Prerequisites: | Seeker A owns an application; Seeker B is authenticated. |
|  | Seeker A (Len Pei Ying) owns the target application; Seeker B (ABCD) is authenticated. |
| Tester's Name | Len Pei Ying |
| Environmental Information:- | 1. OS: Windows/Linux/Mac<br>2. System: Laptop/Desktop/Mobile<br>3. Browser: Google Chrome/Microsoft Edge<br>4. Network: Stable Internet Connection |

| Column A | Column B |
| --- | --- |
| Test Scenario | Verify that authenticated Job Seeker ABCD cannot change the status of Len Pei Ying's application. |

| Test Case ID | Test Steps | Test Input | Expected Results | Actual Results | Status | Test Type | Comments |
| --- | --- | --- | --- | --- | --- | --- | --- |
| SEC-002 | 1. Log in as Job Seeker ABCD. | Authenticated user: ABCD<br>Target application: 895fe1b2-7ba7-4d2c-b071-ee5929d10797<br>Owner seeker_id: 31c79f9e-2dee-44f9-80d7-2a70725dbb52 (Len Pei Ying)<br>Attempted status: rejected | The cross-seeker UPDATE must not persist. The target application's stored status should remain unchanged because RLS restricts update access to the owning seeker. | While authenticated as ABCD, updateApplicationStatus() was called for Len Pei Ying's application and the helper returned {id: '895fe1b2-7ba7-4d2c-b071-ee5929d10797', status: 'rejected'}. However, a direct database check immediately afterwards showed the application still stored as status = completed. Therefore the requested cross-seeker update did not persist. | Pass | Abnormal | RLS prevented the unauthorized update from persisting. Note: the client helper returns the requested status without confirming an affected row, so database verification is required. |
|  | 2. Using ABCD's authenticated browser session, call updateApplicationStatus() for Len Pei Ying's application ID and request status = rejected. |  |  |  |  |  |  |
|  | 3. Query the same application directly in Supabase SQL Editor and verify the stored status. |  |  |  |  |  |  |
| Module Name:- | Security Testing – RLS – Data Isolation |  |  |  |  |  |  |
| Test Case ID | SEC-003 |  |  |  |  |  |  |
| Tester Name | Len Pei Ying |  |  |  |  |  |  |
| Test Case Description | RLS: Seeker cannot read notifications belonging to another user. |  |  |  |  |  |  |
| Prerequisites: | Two Job Seeker accounts exist with separate notification ownership. ABCD is authenticated; Len Pei Ying is a different Job Seeker. |  |  |  |  |  |  |

| Column A | Column B |
| --- | --- |
| Tester's Name | Len Pei Ying |
| Environmental Information:- | 1. OS: Windows/Linux/Mac<br>2. System: Laptop/Desktop/Mobile<br>3. Browser: Google Chrome/Microsoft Edge<br>4. Network: Stable Internet Connection |

| Column A | Column B |
| --- | --- |
| Test Scenario | Verify that authenticated Job Seeker ABCD can retrieve only ABCD's notifications and cannot retrieve Len Pei Ying's notification rows. |

| Test Case ID | Test Steps | Test Input | Expected Results | Actual Results | Status | Test Type | Comments |
| --- | --- | --- | --- | --- | --- | --- | --- |
| SEC-003 | 1. Log in as Job Seeker ABCD. | Authenticated user: ABCD (d1ff41b4-fb7d-4398-a270-c405c83fc795)<br>Other user: Len Pei Ying (31c79f9e-2dee-44f9-80d7-2a70725dbb52) | ABCD's own notification rows may be returned. A request for Len Pei Ying's notifications from ABCD's authenticated session should return no Len-owned notification rows. | Using ABCD's authenticated session, fetchNotifications(ABCD_ID) returned 1 notification with user_id = ABCD (application_update: 'Your application for Event Crew (F&amp;B Booth – SugarShine) is now pending.'). Using the same session, fetchNotifications(LEN_ID) returned an empty array []. No Len Pei Ying notification rows were exposed. | Pass | Normal | Runtime RLS isolation was confirmed: ABCD could read an own notification row but not another user's notifications. |
|  | 2. Using ABCD's authenticated browser session, call fetchNotifications() with ABCD's user ID. |  |  |  |  |  |  |
|  | 3. In the same session, call fetchNotifications() with Len Pei Ying's user ID and compare the returned arrays. |  |  |  |  |  |  |
| Module Name:- | Security Testing – RLS – Data Isolation |  |  |  |  |  |  |
| Test Case ID | SEC-004 |  |  |  |  |  |  |
| Tester Name | Len Pei Ying |  |  |  |  |  |  |
| Test Case Description | RLS: Employer cannot read another employer's job listings update history (write-guard). |  |  |  |  |  |  |
| Prerequisites: | Two employer accounts exist. W&amp;X Bakery owns the target job listing; SugarShine is authenticated as a different employer. |  |  |  |  |  |  |

| Column A | Column B |
| --- | --- |
| Tester's Name | Len Pei Ying |
| Environmental Information:- | 1. OS: Windows/Linux/Mac<br>2. System: Laptop/Desktop/Mobile<br>3. Browser: Google Chrome/Microsoft Edge<br>4. Network: Stable Internet Connection |

| Column A | Column B |
| --- | --- |
| Test Scenario | Verify that authenticated employer SugarShine cannot modify a job listing owned by W&amp;X Bakery. |

| Test Case ID | Test Steps | Test Input | Expected Results | Actual Results | Status | Test Type | Comments |
| --- | --- | --- | --- | --- | --- | --- | --- |
| SEC-004 | 1. Log in as employer SugarShine. | Authenticated employer: SugarShine<br>Target job: b534a64e-03ea-498c-9504-b39ebae6980d<br>Owner employer_id: cfc76680-17f4-4670-a0cd-c5c02b6a6650 (W&amp;X Bakery)<br>Attempted title: SEC-004 UNAUTHORIZED TEST | The cross-employer UPDATE must not persist. The W&amp;X Bakery job title should remain unchanged because update access is restricted to the owning employer. | While authenticated as SugarShine, updateJobListing() was called for W&amp;X Bakery's job with title = 'SEC-004 UNAUTHORIZED TEST'. The helper returned null. A direct database check immediately afterwards showed the job still stored as title = 'Event Crew (F&amp;B Booth – W&amp;X Bakery)' with status = approved. The unauthorized cross-employer update did not persist. | Pass | Abnormal | Runtime ownership enforcement was confirmed: a different employer could not modify W&amp;X Bakery's listing. |
|  | 2. Using SugarShine's authenticated browser session, call updateJobListing() for W&amp;X Bakery's job and attempt to change its title. |  |  |  |  |  |  |
|  | 3. Query the same job row directly in Supabase SQL Editor and verify whether the stored title changed. |  |  |  |  |  |  |
| Module Name:- | Security Testing – RLS – Data Isolation |  |  |  |  |  |  |
| Test Case ID | SEC-005 |  |  |  |  |  |  |
| Tester Name | Len Pei Ying |  |  |  |  |  |  |
| Test Case Description | RLS: Employer cannot access another employer's verification documents (SSM data). |  |  |  |  |  |  |
| Prerequisites: | Employer E1 (W&amp;X Bakery) has SSM and verification documents stored in public.users. Employer E2 (SugarShine) is authenticated. |  |  |  |  |  |  |

| Column A | Column B |
| --- | --- |
| Tester's Name | Len Pei Ying |
| Environmental Information:- | 1. OS: Windows/Linux/Mac<br>2. System: Laptop/Desktop/Mobile<br>3. Browser: Google Chrome/Microsoft Edge<br>4. Network: Stable Internet Connection |

| Column A | Column B |
| --- | --- |
| Test Scenario | Retest: verify directly whether authenticated employer SugarShine can read W&amp;X Bakery's sensitive verification columns from public.users. |

| Test Case ID | Test Steps | Test Input | Expected Results | Actual Results | Status | Test Type | Comments |
| --- | --- | --- | --- | --- | --- | --- | --- |
| SEC-005 | 1. Log in as employer SugarShine and confirm the authenticated user is not an admin. | Authenticated user id: df0abc84-7df8-4709-94de-02f43e097c84 (SugarShine)<br>app_metadata.role: undefined (not admin)<br>Target employer: W&amp;X Bakery (cfc76680-17f4-4670-a0cd-c5c02b6a6650)<br>Queried columns: id, full_name, email, ssm_number, registration_doc_name, registration_doc_data, contact_doc_name, contact_doc_data | A non-owner, non-admin employer must not receive W&amp;X Bakery's row or sensitive verification fields. RLS may silently filter the row, returning an empty array without an error. | Retest passed. RLS is enabled on public.users. The active SELECT policies allow only users_select_own (auth.uid() = id) and users_select_admin (is_admin_user(auth.uid())). SugarShine's authenticated user had no admin app_metadata role. A direct authenticated query to public.users for W&amp;X Bakery's id and sensitive verification columns returned testData = [] and testError = null. Therefore the target row and verification document fields were not exposed to SugarShine. The earlier fetchProfile observation was not used as final evidence because the direct raw RLS retest contradicted it. | Pass | Abnormal | Final SEC-005 result is based on the direct authenticated raw Supabase query. RLS correctly filtered another employer's users row. No cross-employer verification document access was returned in the retest. |
|  | 2. Using the authenticated Supabase client, query public.users directly for W&amp;X Bakery's id and select the sensitive verification columns. |  |  |  |  |  |  |
|  | 3. Inspect the raw query result and error returned by Supabase RLS. |  |  |  |  |  |  |
| Module Name:- | Security Testing – RLS – Data Isolation |  |  |  |  |  |  |
| Test Case ID | SEC-006 |  |  |  |  |  |  |
| Tester Name | Len Pei Ying |  |  |  |  |  |  |
| Test Case Description | RLS: Seeker cannot insert a payment record (employer-only action). |  |  |  |  |  |  |
| Prerequisites: | Job Seeker ABCD owns application 888c03d0-98d9-4e89-bce4-5e0f4ef799c1. The related job is owned by employer SugarShine. |  |  |  |  |  |  |

| Column A | Column B |
| --- | --- |
| Tester's Name | Len Pei Ying |
| Environmental Information:- | 1. OS: Windows/Linux/Mac<br>2. System: Laptop/Desktop/Mobile<br>3. Browser: Google Chrome/Microsoft Edge<br>4. Network: Stable Internet Connection |

| Column A | Column B |
| --- | --- |
| Test Scenario | Retest: verify that authenticated Job Seeker ABCD cannot insert a payment row that names SugarShine as payer_id. |

| Test Case ID | Test Steps | Test Input | Expected Results | Actual Results | Status | Test Type | Comments |
| --- | --- | --- | --- | --- | --- | --- | --- |
| SEC-006 | 1. Log in as Job Seeker ABCD and confirm the authenticated user ID. | Authenticated seeker: ABCD (d1ff41b4-fb7d-4398-a270-c405c83fc795)<br>Application: 888c03d0-98d9-4e89-bce4-5e0f4ef799c1<br>Attempted payer_id: SugarShine (df0abc84-7df8-4709-94de-02f43e097c84)<br>payee_id: ABCD<br>amount: 6.07<br>method: SEC-006 RETEST | The Job Seeker must not be able to create a payment row on the employer's behalf. The insert should be rejected by RLS and no matching payment row should exist. | Retest passed. The authenticated user ID was confirmed as ABCD (d1ff41b4-fb7d-4398-a270-c405c83fc795). The direct payments INSERT attempting payer_id = SugarShine returned HTTP 403 with PostgreSQL error code 42501: 'new row violates row-level security policy for table "payments"'. retestData was null. A database query for application_id 888c03d0-98d9-4e89-bce4-5e0f4ef799c1 and amount 6.07 returned 0 rows, confirming no test payment was inserted. | Pass | Abnormal | Final SEC-006 result is based on the clean retest using the real ABCD authenticated browser session. RLS blocked the forged employer payment insert and no matching database row persisted. |
|  | 2. Using ABCD's authenticated Supabase client, insert into payments for ABCD's application while setting payer_id to SugarShine and payee_id to ABCD. |  |  |  |  |  |  |
|  | 3. Query the database for the inserted test amount and verify whether the forged payment row exists. |  |  |  |  |  |  |
| Module Name:- | Security Testing – RLS – Data Isolation |  |  |  |  |  |  |
| Test Case ID | SEC-007 |  |  |  |  |  |  |
| Tester Name | Len Pei Ying |  |  |  |  |  |  |
| Test Case Description | RLS: Seeker cannot update seeker_confirmed_at for another seeker's payment. |  |  |  |  |  |  |
| Prerequisites: | Two seeker accounts exist. Tsuki owns the target payment row; ABCD is authenticated as a different Job Seeker. |  |  |  |  |  |  |

| Column A | Column B |
| --- | --- |
| Tester's Name | Len Pei Ying |
| Environmental Information:- | 1. OS: Windows/Linux/Mac<br>2. System: Laptop/Desktop/Mobile<br>3. Browser: Google Chrome/Microsoft Edge<br>4. Network: Stable Internet Connection |

| Column A | Column B |
| --- | --- |
| Test Scenario | Verify that authenticated Job Seeker ABCD cannot update seeker_confirmed_at on Tsuki's payment row. |

| Test Case ID | Test Steps | Test Input | Expected Results | Actual Results | Status | Test Type | Comments |
| --- | --- | --- | --- | --- | --- | --- | --- |
| SEC-007 | 1. Log in as Job Seeker ABCD and confirm the authenticated user ID. | Authenticated seeker: ABCD (d1ff41b4-fb7d-4398-a270-c405c83fc795)<br>Target payment: 254a0c07-52cd-4047-ae4b-7ca282a17493<br>Target payee / seeker: Tsuki (4be6d53d-c79c-4107-8d1a-b66c43bfe1ac)<br>Original seeker_confirmed_at: 2026-09-29 19:48:14.227+00<br>Attempted value: 2026-09-30T06:37:00Z | The cross-seeker UPDATE must not persist. ABCD should receive no updated row, and Tsuki's stored seeker_confirmed_at value must remain unchanged. | While authenticated as ABCD, the UPDATE targeting Tsuki's payment returned sec007Data = [] and sec007Error = null. A direct database check afterwards showed seeker_confirmed_at remained 2026-09-29 19:48:14.227+00. Therefore ABCD could not modify another seeker's payment confirmation timestamp. | Pass | Abnormal | RLS correctly filtered the unauthorized UPDATE. No row was returned to ABCD and the database value remained unchanged. |
|  | 2. Using ABCD's authenticated Supabase client, attempt to update seeker_confirmed_at for Tsuki's payment row. |  |  |  |  |  |  |
|  | 3. Query the same payment row directly in Supabase SQL Editor and verify that seeker_confirmed_at is unchanged. |  |  |  |  |  |  |
| Module Name:- | Security Testing – RLS – Data Isolation |  |  |  |  |  |  |
| Test Case ID | SEC-012 |  |  |  |  |  |  |
| Tester Name | Len Pei Ying |  |  |  |  |  |  |
| Test Case Description | RLS: Seeker cannot delete another seeker's saved job. |  |  |  |  |  |  |
| Prerequisites: | Seeker Len Pei Ying owns the target saved_job row; ABCD is authenticated as a different Job Seeker. |  |  |  |  |  |  |

| Column A | Column B |
| --- | --- |
| Tester's Name | Len Pei Ying |
| Environmental Information:- | 1. OS: Windows/Linux/Mac<br>2. System: Laptop/Desktop/Mobile<br>3. Browser: Google Chrome/Microsoft Edge<br>4. Network: Stable Internet Connection |

| Column A | Column B |
| --- | --- |
| Test Scenario | Verify that authenticated Job Seeker ABCD cannot delete a saved_job row owned by Len Pei Ying. |

| Test Case ID | Test Steps | Test Input | Expected Results | Actual Results | Status | Test Type | Comments |
| --- | --- | --- | --- | --- | --- | --- | --- |
| SEC-012 | 1. Log in as Job Seeker ABCD and confirm the authenticated user ID. | Authenticated seeker: ABCD (d1ff41b4-fb7d-4398-a270-c405c83fc795)<br>Target saved_job: 4c96f5d2-0bd6-4994-b994-59391d3b78ac<br>Owner seeker: Len Pei Ying (31c79f9e-2dee-44f9-80d7-2a70725dbb52) | The cross-seeker DELETE must not persist. ABCD should receive no deleted row, and Len Pei Ying's saved_job must remain in the database. | While authenticated as ABCD, the DELETE targeting Len Pei Ying's saved_job returned sec012Data = [] and sec012Error = null. A direct database check afterwards still returned the saved_job row 4c96f5d2-0bd6-4994-b994-59391d3b78ac owned by Len Pei Ying. Therefore ABCD could not delete another seeker's saved job. | Pass | Abnormal | RLS correctly filtered the unauthorized DELETE. No row was deleted and the target saved_job remained intact. |
|  | 2. Using ABCD's authenticated Supabase client, attempt to delete Len Pei Ying's saved_job row by id. |  |  |  |  |  |  |
|  | 3. Query the same saved_job row directly in Supabase SQL Editor and verify that it still exists. |  |  |  |  |  |  |
| Module Name:- | Security Testing – RLS – Data Isolation |  |  |  |  |  |  |
| Test Case ID | SEC-019 |  |  |  |  |  |  |
| Tester Name | Len Pei Ying |  |  |  |  |  |  |
| Test Case Description | RLS: Admin-only RLS update policy blocks non-admin from updating any user row. |  |  |  |  |  |  |
| Prerequisites: | Job Seeker ABCD is authenticated. Len Pei Ying is a different user with an existing users row. |  |  |  |  |  |  |

| Column A | Column B |
| --- | --- |
| Tester's Name | Len Pei Ying |
| Environmental Information:- | 1. OS: Windows/Linux/Mac<br>2. System: Laptop/Desktop/Mobile<br>3. Browser: Google Chrome/Microsoft Edge<br>4. Network: Stable Internet Connection |

| Column A | Column B |
| --- | --- |
| Test Scenario | Verify that authenticated Job Seeker ABCD cannot update another user's profile row in public.users. |

| Test Case ID | Test Steps | Test Input | Expected Results | Actual Results | Status | Test Type | Comments |
| --- | --- | --- | --- | --- | --- | --- | --- |
| SEC-019 | 1. Log in as Job Seeker ABCD and confirm the authenticated user ID. | Authenticated seeker: ABCD (d1ff41b4-fb7d-4398-a270-c405c83fc795)<br>Target user: Len Pei Ying (31c79f9e-2dee-44f9-80d7-2a70725dbb52)<br>Original phone: +60175023599<br>Attempted phone: SEC-019-TEST | The cross-user UPDATE must not persist. ABCD should receive no updated row, and Len Pei Ying's phone value must remain unchanged. | While authenticated as ABCD, the UPDATE targeting Len Pei Ying's users row returned sec019Data = [] and sec019Error = null. A direct database check afterwards showed Len Pei Ying's phone remained +60175023599, with role = seeker and account_status = active. Therefore ABCD could not modify another user's profile row. | Pass | Abnormal | RLS correctly filtered the unauthorized UPDATE. The target user's profile data remained unchanged. |
|  | 2. Using ABCD's authenticated Supabase client, attempt to update Len Pei Ying's phone field. |  |  |  |  |  |  |
|  | 3. Query Len Pei Ying's users row directly in Supabase SQL Editor and verify that the phone value remains unchanged. |  |  |  |  |  |  |
| Module Name:- | Security Testing – RLS – Data Isolation |  |  |  |  |  |  |
| Test Case ID | SEC-020 |  |  |  |  |  |  |
| Tester Name | Len Pei Ying |  |  |  |  |  |  |
| Test Case Description | RLS: Seeker cannot modify their own application status (employer-only). |  |  |  |  |  |  |
| Prerequisites: | Job Seeker ABCD owns application 888c03d0-98d9-4e89-bce4-5e0f4ef799c1. The application was initially in pending status. |  |  |  |  |  |  |

| Column A | Column B |
| --- | --- |
| Tester's Name | Len Pei Ying |
| Environmental Information:- | 1. OS: Windows/Linux/Mac<br>2. System: Laptop/Desktop/Mobile<br>3. Browser: Google Chrome/Microsoft Edge<br>4. Network: Stable Internet Connection |

| Column A | Column B |
| --- | --- |
| Test Scenario | Verify whether a Job Seeker can directly change the status of their own application to completed. |

| Test Case ID | Test Steps | Test Input | Expected Results | Actual Results | Status | Test Type | Comments |
| --- | --- | --- | --- | --- | --- | --- | --- |
| SEC-020 | 1. Log in as Job Seeker ABCD and confirm the authenticated user ID. | Authenticated seeker: ABCD (d1ff41b4-fb7d-4398-a270-c405c83fc795)<br>Application: 888c03d0-98d9-4e89-bce4-5e0f4ef799c1<br>Original status: pending<br>Attempted status: completed | The Job Seeker should not be able to change the employer-controlled application lifecycle status. The stored status should remain pending. | Initial test failed because Job Seeker ABCD could directly change the owned application status from pending to completed. After the security fix was applied, the same attack was repeated while authenticated as ABCD. The PATCH request returned HTTP 403, sec020RetestData = null, and error code 42501 with a database message blocking the seeker status change. A direct database check confirmed the application status remained pending. Retest passed. | Pass | Abnormal | Retest passed after security fix. The initial vulnerability allowed a seeker to change the application status directly; the repaired database rule now blocks unauthorized status changes while preserving the controlled seeker completion flow. |
|  | 2. Using ABCD's authenticated Supabase client, attempt to update the owned application status from pending to completed. |  |  |  |  |  |  |
|  | 3. Query the same application row directly in Supabase SQL Editor and verify whether the stored status changed. |  |  |  |  |  |  |
| Module Name:- | Security Testing – RLS – Data Isolation |  |  |  |  |  |  |
| Test Case ID | SEC-021 |  |  |  |  |  |  |
| Tester Name | Len Pei Ying |  |  |  |  |  |  |
| Test Case Description | RLS: Employer cannot read work history records belonging to another seeker. |  |  |  |  |  |  |
| Prerequisites: | Employer SugarShine is authenticated. Existing work_history rows belong to Job Seekers Tsuki and Len Pei Ying. |  |  |  |  |  |  |

| Column A | Column B |
| --- | --- |
| Tester's Name | Len Pei Ying |
| Environmental Information:- | 1. OS: Windows/Linux/Mac<br>2. System: Laptop/Desktop/Mobile<br>3. Browser: Google Chrome/Microsoft Edge<br>4. Network: Stable Internet Connection |

| Column A | Column B |
| --- | --- |
| Test Scenario | Verify that an authenticated Employer cannot read work_history records belonging to Job Seekers. |

| Test Case ID | Test Steps | Test Input | Expected Results | Actual Results | Status | Test Type | Comments |
| --- | --- | --- | --- | --- | --- | --- | --- |
| SEC-021 | 1. Log in as SugarShine Employer and confirm the authenticated user ID. | Authenticated employer: SugarShine (df0abc84-7df8-4709-94de-02f43e097c84)<br>Target work_history: db3b5217-1664-4068-8cb7-d66429e00a9f<br>Target seeker: Tsuki (4be6d53d-c79c-4107-8d1a-b66c43bfe1ac)<br>Target job: Part-Time Barista &amp; Café Crew | The Employer must not receive another seeker's work_history row. Both the targeted query and unfiltered work_history query should return no unauthorized rows. | While authenticated as SugarShine Employer, the targeted query for Tsuki's work_history returned sec021Data = [] and sec021Error = null. An unfiltered query of work_history returned sec021All = [] and sec021AllError = null. Therefore the Employer could not read Job Seeker work_history records. | Pass | Normal | RLS correctly restricted work_history visibility. No seeker work_history rows were exposed to the authenticated Employer. |
|  | 2. Using the authenticated Employer Supabase client, query a specific Tsuki work_history row and then query all work_history rows. |  |  |  |  |  |  |
|  | 3. Verify that no Job Seeker work_history rows are returned to the Employer. |  |  |  |  |  |  |

## Auth & Access Control

| Column A | Column B |
| --- | --- |
| Module Name:- | Security Testing – Auth &amp; Access Control |
| Test Case ID | SEC-013 |
| Tester Name | Len Pei Ying |
| Test Case Description | Auth: RLS prevents cross-role data access (seeker/employer/admin isolation). |
| Prerequisites: | Seeker, Employer, and Admin accounts exist; RLS is enabled. Prior SEC-001 evidence confirms cross-seeker application isolation. |

| Column A | Column B |
| --- | --- |
| Tester's Name | Len Pei Ying |
| Environmental Information:- | 1. OS: Windows/Linux/Mac<br>2. System: Laptop/Desktop/Mobile<br>3. Browser: Google Chrome/Microsoft Edge<br>4. Network: Stable Internet Connection |

| Column A | Column B |
| --- | --- |
| Test Scenario | Verify cross-role and cross-account access isolation for seeker, employer, and admin resources. |

| Test Case ID | Test Steps | Test Input | Expected Results | Actual Results | Status | Test Type | Comments |
| --- | --- | --- | --- | --- | --- | --- | --- |
| SEC-013 | 1. Use prior SEC-001 evidence showing a seeker cannot read another seeker's applications. | Employer: SugarShine (df0abc84-7df8-4709-94de-02f43e097c84)<br>Target W&amp;X job: b534a64e-03ea-498c-9504-b39ebae6980d<br>Prior seeker isolation evidence: SEC-001 | A seeker must not read another seeker's applications; an employer must not read another employer's applicant data; non-admin sessions must not access the Admin Dashboard. | Prior SEC-001 testing confirmed seeker-to-seeker application isolation. While logged in as SugarShine Employer, querying applications for W&amp;X Bakery's job returned sec013Apps = [] and sec013AppsError = null. Directly opening the Admin Dashboard while still logged in as SugarShine redirected the session back to the Employer Dashboard. Therefore the tested cross-account and admin-page access controls operated as intended. | Pass | Normal | Cross-role isolation verified using prior seeker RLS evidence, employer cross-account applicant access, and direct admin-page access control. |
|  | 2. While authenticated as SugarShine Employer, query applications belonging to W&amp;X Bakery's job. |  |  |  |  |  |  |
|  | 3. Attempt direct URL access to the Admin Dashboard while still logged in as SugarShine Employer. |  |  |  |  |  |  |
|  | 4. Verify that unauthorized data is not returned and the admin-only page redirects the non-admin session. |  |  |  |  |  |  |

| Column A | Column B |
| --- | --- |
| Module Name:- | Security Testing – Auth &amp; Access Control |
| Test Case ID | SEC-014 |
| Tester Name | Len Pei Ying |
| Test Case Description | Auth: Registration role-gating via secure invite codes for Admin and Employer roles. |
| Prerequisites: | Registration page loaded; ADMIN_CODE and EMPLOYER_CODE constants known to tester. |

| Column A | Column B |
| --- | --- |
| Tester's Name | Len Pei Ying |
| Environmental Information:- | 1. OS: Windows/Linux/Mac<br>2. System: Laptop/Desktop/Mobile<br>3. Browser: Google Chrome/Microsoft Edge<br>4. Network: Stable Internet Connection |

| Column A | Column B |
| --- | --- |
| Test Scenario | Auth: Registration role-gating via secure invite codes for Admin and Employer roles. |

| Test Case ID | Test Steps | Test Input | Expected Results | Actual Results | Status | Test Type | Comments | Z |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| SEC-014 | 1. Select Admin role and submit with incorrect admin code. | Wrong code: 'WRONG-1234'<br>Correct: EASYEARN-ADMIN-2026 / EASYEARN-EMPLOYER-2026<br>Files: auth.js | Registration is blocked with appropriate error unless the exact matching constant is supplied. | Admin registration with incorrect secure code 'WRONG-1234' was blocked and displayed 'Invalid admin secure code.' Employer registration with incorrect secure code 'WRONG-1234' was also blocked and displayed 'Invalid employer secure code.' No privileged-role registration proceeded with an invalid invite code. | Pass | Abnormal | Role-gating correctly rejected invalid secure codes for both Admin and Employer registration paths. |  |
|  | 2. Verify rejection. |  |  |  |  |  |  |  |
|  | 3. Select Employer role and submit with incorrect employer code. |  |  |  |  |  |  |  |
|  | 4. Verify rejection. |  |  |  |  |  |  |  |

| Column A | Column B |
| --- | --- |
| Module Name:- | Security Testing – Auth &amp; Access Control |
| Test Case ID | SEC-015 |
| Tester Name | Len Pei Ying |
| Test Case Description | Auth: Password policy enforcement and credential handling on registration/login. |
| Prerequisites: | Registration and Login pages loaded. |

| Column A | Column B |
| --- | --- |
| Tester's Name | Len Pei Ying |
| Environmental Information:- | 1. OS: Windows/Linux/Mac<br>2. System: Laptop/Desktop/Mobile<br>3. Browser: Google Chrome/Microsoft Edge<br>4. Network: Stable Internet Connection |

| Column A | Column B |
| --- | --- |
| Test Scenario | Auth: Password policy enforcement and credential handling on registration/login. |

| Test Case ID | Test Steps | Test Input | Expected Results | Actual Results | Status | Test Type | Comments |
| --- | --- | --- | --- | --- | --- | --- | --- |
| SEC-015 | 1. Attempt registration with a 5-character password. | Passwords: '12345', 'abcdefgh', confirm mismatch<br>Files: auth.js (handleRegister, handleLogin, mapSupabaseAuthError) | Each invalid case is rejected client-side or by Supabase Auth with a clear, non-revealing error message; no password logged in plaintext. | Registration with password '12345' was blocked with 'Password must be at least 6 characters.' A password without the required composition was blocked, including the messages 'Password must contain at least one letter and one number.' and 'Password must contain at least one of !@#$%^.'. A mismatched confirmation was blocked with 'Confirm password does not match.' Login using an unregistered email returned the non-revealing message 'Invalid email or password.' No plaintext password was exposed in the observed UI messages. | Pass | Abnormal | Password length, composition and confirmation validation worked as expected, and invalid login used a generic credential error message. |
|  | 2. Attempt registration without special character. |  |  |  |  |  |  |
|  | 3. Attempt with mismatched confirm-password. |  |  |  |  |  |  |
|  | 4. Attempt login with unregistered email. |  |  |  |  |  |  |

| Column A | Column B |
| --- | --- |
| Module Name:- | Security Testing – Auth &amp; Access Control |
| Test Case ID | SEC-023 |
| Tester Name | Len Pei Ying |
| Test Case Description | Session: Session expiry and requireUser() redirect behaviour. |
| Prerequisites: | Authenticated session exists; session token is then expired or cleared. |

| Column A | Column B |
| --- | --- |
| Tester's Name | Len Pei Ying |
| Environmental Information:- | 1. OS: Windows/Linux/Mac<br>2. System: Laptop/Desktop/Mobile<br>3. Browser: Google Chrome/Microsoft Edge<br>4. Network: Stable Internet Connection |

| Column A | Column B |
| --- | --- |
| Test Scenario | Session: Session expiry and requireUser() redirect behaviour. |

| Test Case ID | Test Steps | Test Input | Expected Results | Actual Results | Status | Test Type | Comments |
| --- | --- | --- | --- | --- | --- | --- | --- |
| SEC-023 | 1. Log in as Seeker. | Auth: expired/cleared session<br>Files: auth.js (requireUser, observeAuth) | User is redirected to login page; protected page content is not rendered. | While logged in as a Job Seeker, localStorage and sessionStorage were cleared to invalidate the local session. After refresh, the protected dashboard could no longer verify the account session and redirected the user to the Login page. The console also showed 'Account access verification failed: Error: Account profile could not be verified.' Protected content was not retained. | Pass | Normal | Session-clearing test passed: the protected page rejected the invalidated session and redirected to Login. The Grammarly/permissions-policy console warning was unrelated to EasyEarn access control. |
|  | 2. Manually clear localStorage session token or wait for expiry. |  |  |  |  |  |  |
|  | 3. Attempt to navigate to a protected page (e.g. jobseeker/dashboard.html). |  |  |  |  |  |  |
|  | 4. Observe redirect. |  |  |  |  |  |  |

| Column A | Column B |
| --- | --- |
| Module Name:- | Security Testing – Auth &amp; Access Control |
| Test Case ID | SEC-024 |
| Tester Name | Len Pei Ying |
| Test Case Description | Session: Admin page access blocked for non-admin authenticated users. |
| Prerequisites: | Seeker or Employer authenticated session; admin pages exist at /pages/admin/. |

| Column A | Column B |
| --- | --- |
| Tester's Name | Len Pei Ying |
| Environmental Information:- | 1. OS: Windows/Linux/Mac<br>2. System: Laptop/Desktop/Mobile<br>3. Browser: Google Chrome/Microsoft Edge<br>4. Network: Stable Internet Connection |

| Column A | Column B |
| --- | --- |
| Test Scenario | Session: Admin page access blocked for non-admin authenticated users. |

| Test Case ID | Test Steps | Test Input | Expected Results | Actual Results | Status | Test Type | Comments |
| --- | --- | --- | --- | --- | --- | --- | --- |
| SEC-024 | 1. Log in as Seeker. | Auth: Seeker session<br>Files: admin-header.js, auth.js (requireAdmin) | Non-admin users are redirected away from admin pages; admin content is not rendered. | While authenticated as Job Seeker ABCD, direct navigation to the Admin Users page was blocked. The system redirected the non-admin session back to the Job Seeker Dashboard, and admin content was not displayed. | Pass | Abnormal | Non-admin direct URL access was correctly prevented by the admin access guard. |
|  | 2. Navigate directly to pages/admin/users.html. |  |  |  |  |  |  |
|  | 3. Observe behaviour. |  |  |  |  |  |  |

## Upload Security

| Column A | Column B |
| --- | --- |
| Module Name:- | Security Testing – Upload Security |
| Test Case ID | SEC-016 |
| Tester Name | Len Pei Ying |
| Test Case Description | Upload: Profile photo and verification document upload restrictions (type and size). |
| Prerequisites: | Profile and Employer Verification pages loaded with file inputs available. |

| Column A | Column B |
| --- | --- |
| Tester's Name | Len Pei Ying |
| Environmental Information:- | 1. OS: Windows/Linux/Mac<br>2. System: Laptop/Desktop/Mobile<br>3. Browser: Google Chrome/Microsoft Edge<br>4. Network: Stable Internet Connection |

| Column A | Column B |
| --- | --- |
| Test Scenario | Upload: Profile photo and verification document upload restrictions (type and size). |

| Test Case ID | Test Steps | Test Input | Expected Results | Actual Results | Status | Test Type | Comments |
| --- | --- | --- | --- | --- | --- | --- | --- |
| SEC-016 | 1. Attempt to upload a 3MB image as profile photo. | File 1: 3MB .png<br>File 2: malware.exe renamed .jpg<br>Files: jobseeker-profile.js, employer-profile.js, employer-verification.js | Files larger than 2MB rejected; non-image MIME types rejected even if extension is spoofed. | Profile photo upload with an 11.46 MB PNG was rejected with 'Profile photo must be 2MB or smaller.' A plain-text file renamed with a .jpg extension was not saved and produced 'Unable to process the selected image.' An oversized Employer Verification document was rejected with 'Each file must be 2MB or smaller.' These tests confirm enforcement of file size limits and rejection of a non-image file disguised with an image extension. | Pass | Abnormal | Upload controls correctly blocked oversized files and a spoofed non-image file. The tested invalid files were not accepted for storage. |
|  | 2. Attempt to upload .exe renamed to .jpg. |  |  |  |  |  |  |
|  | 3. Attempt oversized SSM document on verification form. |  |  |  |  |  |  |
|  | 4. Verify rejected uploads show error and are not sent to storage. |  |  |  |  |  |  |

## Input Sanitisation

| Column A | Column B |
| --- | --- |
| Module Name:- | Security Testing – Input Sanitisation |
| Test Case ID | SEC-017 |
| Tester Name | Len Pei Ying |
| Test Case Description | XSS: Input sanitisation against XSS in job descriptions, reviews, and chat messages. |
| Prerequisites: | Employer account for posting jobs; seeker account for reviews and chat. |

| Column A | Column B |
| --- | --- |
| Tester's Name | Len Pei Ying |
| Environmental Information:- | 1. OS: Windows/Linux/Mac<br>2. System: Laptop/Desktop/Mobile<br>3. Browser: Google Chrome/Microsoft Edge<br>4. Network: Stable Internet Connection |

| Column A | Column B |
| --- | --- |
| Test Scenario | XSS: Input sanitisation against XSS in job descriptions, reviews, and chat messages. |

| Test Case ID | Test Steps | Test Input | Expected Results | Actual Results | Status | Test Type | Comments |
| --- | --- | --- | --- | --- | --- | --- | --- |
| SEC-017 | 1. Post a job listing with &lt;script&gt;alert(1)&lt;/script&gt; in description. | Payload: &lt;script&gt;alert(1)&lt;/script&gt; and &lt;img src=x onerror=alert(1)&gt;<br>Files: employer-post-job.js, employer-ratings.js, messages-page.js | Script/HTML payloads are rendered as harmless text, not executed, anywhere displayed back to other users. | XSS testing was completed across job descriptions, rating reviews, and chat messages using payloads such as &lt;script&gt;alert(1)&lt;/script&gt; and &lt;img src=x onerror=alert(1)&gt;. In the verified-employer W&amp;X Bakery retest, the job description payload was rendered as escaped text on the Job Seeker page and no alert executed. The same image/onerror payload was submitted in an employer rating review and in chat messages; no JavaScript alert executed on either side of the conversation. Normal functions such as viewing the job and applying remained available. | Pass | Abnormal | Retest passed. User-controlled HTML/JavaScript payloads did not execute in the tested job description, rating review, or chat display paths. Job description content was shown as escaped text. |
|  | 2. View the listing on the public Jobs page. |  |  |  |  |  |  |
|  | 3. Submit a rating review with &lt;img onerror=alert(1)&gt; payload. |  |  |  |  |  |  |
|  | 4. View the review on Employer Ratings page. |  |  |  |  |  |  |

| Column A | Column B |
| --- | --- |
| Module Name:- | Security Testing – Input Sanitisation |
| Test Case ID | SEC-018 |
| Tester Name | Len Pei Ying |
| Test Case Description | SQLi: SQL injection resistance via Supabase parameterised query client. |
| Prerequisites: | Any form with text input that maps to a Supabase filter. |

| Column A | Column B |
| --- | --- |
| Tester's Name | Len Pei Ying |
| Environmental Information:- | 1. OS: Windows/Linux/Mac<br>2. System: Laptop/Desktop/Mobile<br>3. Browser: Google Chrome/Microsoft Edge<br>4. Network: Stable Internet Connection |

| Column A | Column B |
| --- | --- |
| Test Scenario | SQLi: SQL injection resistance via Supabase parameterised query client. |

| Test Case ID | Test Steps | Test Input | Expected Results | Actual Results | Status | Test Type | Comments |
| --- | --- | --- | --- | --- | --- | --- | --- |
| SEC-018 | 1. Enter ' OR '1'='1 in login email field. | Payload: ' OR '1'='1<br>Files: auth.js, jobseeker-jobs.js, supabase-config.js | All inputs treated as literal parameter values; no query structure altered and no data leaked. | Login SQL injection attempt using the payload ' OR '1'='1 was rejected by email-format validation with the message 'Please enter a valid email address.' The same SQLi payload entered in the Jobs search/filter field was treated as literal search text and returned 'No available jobs found'; no extra records, protected data, or query-structure bypass was observed. | Pass | Abnormal | Tested SQL injection payloads did not alter query logic or expose additional data. Inputs were either rejected by validation or handled as literal values. |
|  | 2. Enter SQLi payload in Jobs search/filter field. |  |  |  |  |  |  |
|  | 3. Verify no data leak and no query alteration. |  |  |  |  |  |  |

## Rating & Business Rules

| Column A | Column B |
| --- | --- |
| Module Name:- | Security Testing – Rating &amp; Business Rules |
| Test Case ID | SEC-008 |
| Tester Name | Len Pei Ying |
| Test Case Description | RLS: Seeker cannot submit a rating for a pending application. |
| Prerequisites: | An application with status='pending'; seeker account S. |

| Column A | Column B |
| --- | --- |
| Tester's Name | Len Pei Ying |
| Environmental Information:- | 1. OS: Windows/Linux/Mac<br>2. System: Laptop/Desktop/Mobile<br>3. Browser: Google Chrome/Microsoft Edge<br>4. Network: Stable Internet Connection |

| Column A | Column B |
| --- | --- |
| Test Scenario | RLS: Seeker cannot submit a rating for a pending application. |

| Test Case ID | Test Steps | Test Input | Expected Results | Actual Results | Status | Test Type | Comments |
| --- | --- | --- | --- | --- | --- | --- | --- |
| SEC-008 | 1. Log in as S. | Auth: S<br>Application status: pending<br>Files: supabase-data.js (upsertRating), jobseeker-work-history.js | Rating UI is not surfaced for pending applications; if forced via API, the insert succeeds at DB level but is never shown to the employer. | Initial test failed because Job Seeker ABCD could force a rating insert for a pending application and the rating was visible on the Employer Ratings page. After the database security fix, the same pending-application rating attempt was rejected with HTTP 403 and no new rating row was created; the Employer Ratings page no longer showed the pending test rating. Regression verification confirmed legitimate completed-application ratings remained available: Tsuki's completed applications 112ba3b2-819e-4009-a948-525e136ebba1 and 32ea3d8c-152d-4e74-897d-a5a5e1f32030 retained valid rating rows, including seeker-to-employer and employer-to-seeker ratings. Retest passed. | Pass | Abnormal | Retest passed after database-level rating validation was added. Pending applications are now blocked from rating creation/visibility, while valid completed-application ratings continue to work. |
|  | 2. Attempt to call upsertRating() for the pending application. |  |  |  |  |  |  |
|  | 3. Check UI and DB. |  |  |  |  |  |  |
| Module Name:- | Security Testing – Rating &amp; Business Rules |  |  |  |  |  |  |
| Test Case ID | SEC-009 |  |  |  |  |  |  |
| Tester Name | Len Pei Ying |  |  |  |  |  |  |
| Test Case Description | RLS: Reviewer and reviewee cannot be the same user (self-rating prevention). |  |  |  |  |  |  |
| Prerequisites: | Authenticated user U with a completed application. |  |  |  |  |  |  |

| Column A | Column B |
| --- | --- |
| Tester's Name | Len Pei Ying |
| Environmental Information:- | 1. OS: Windows/Linux/Mac<br>2. System: Laptop/Desktop/Mobile<br>3. Browser: Google Chrome/Microsoft Edge<br>4. Network: Stable Internet Connection |

| Column A | Column B |
| --- | --- |
| Test Scenario | RLS: Reviewer and reviewee cannot be the same user (self-rating prevention). |

| Test Case ID | Test Steps | Test Input | Expected Results | Actual Results | Status | Test Type | Comments |
| --- | --- | --- | --- | --- | --- | --- | --- |
| SEC-009 | 1. Log in as U. | Auth: U<br>reviewee_id = U.id (same as reviewer)<br>Files: supabase-data.js (upsertRating), schema.sql | Self-rating is not explicitly blocked by a DB CHECK constraint; the UI never constructs a self-rating call. | While authenticated as Tsuki, a forced self-rating attempt was made using the completed application 112ba3b2-819e-4009-a948-525e136ebba1 with reviewer_id = reviewee_id = Tsuki. The ratings upsert request was rejected with HTTP 403 Forbidden. A direct database query for review = 'SEC-009 self-rating test' returned no rows. Therefore the database-level rating validation successfully prevented self-rating. | Pass | Abnormal | Self-rating is now blocked by database validation requiring reviewer and reviewee to be opposite parties of a completed application. |
|  | 2. Attempt to call upsertRating() with reviewer_id = reviewee_id = U.id. |  |  |  |  |  |  |
|  | 3. Verify DB row. |  |  |  |  |  |  |

## Report Security

| Column A | Column B |
| --- | --- |
| Module Name:- | Security Testing – Report Security |
| Test Case ID | SEC-010 |
| Tester Name | Len Pei Ying |
| Test Case Description | RLS: Unauthenticated user cannot submit a report. |
| Prerequisites: | No active session (anonymous). |

| Column A | Column B |
| --- | --- |
| Tester's Name | Len Pei Ying |
| Environmental Information:- | 1. OS: Windows/Linux/Mac<br>2. System: Laptop/Desktop/Mobile<br>3. Browser: Google Chrome/Microsoft Edge<br>4. Network: Stable Internet Connection |

| Column A | Column B |
| --- | --- |
| Test Scenario | RLS: Unauthenticated user cannot submit a report. |

| Test Case ID | Test Steps | Test Input | Expected Results | Actual Results | Status | Test Type | Comments |
| --- | --- | --- | --- | --- | --- | --- | --- |
| SEC-010 | 1. Open browser without logging in. | Auth: none (anon)<br>Files: schema.sql (reports_insert_own policy), report.html | Report submission is blocked; no report row is inserted. | With no active EasyEarn session, direct navigation to the Report page was blocked. The unauthenticated user was redirected to the Login page before the report form could be used, so no report could be submitted. | Pass | Abnormal | Unauthenticated access to the report submission page is correctly protected by authentication redirect. |
|  | 2. Navigate to the Report page. |  |  |  |  |  |  |
|  | 3. Attempt to submit a report form. |  |  |  |  |  |  |
| Module Name:- | Security Testing – Report Security |  |  |  |  |  |  |
| Test Case ID | SEC-011 |  |  |  |  |  |  |
| Tester Name | Len Pei Ying |  |  |  |  |  |  |
| Test Case Description | RLS: Seeker cannot read another user's submitted reports. |  |  |  |  |  |  |
| Prerequisites: | Seeker S1 has submitted a report; Seeker S2 is authenticated. |  |  |  |  |  |  |

| Column A | Column B |
| --- | --- |
| Tester's Name | Len Pei Ying |
| Environmental Information:- | 1. OS: Windows/Linux/Mac<br>2. System: Laptop/Desktop/Mobile<br>3. Browser: Google Chrome/Microsoft Edge<br>4. Network: Stable Internet Connection |

| Column A | Column B |
| --- | --- |
| Test Scenario | RLS: Seeker cannot read another user's submitted reports. |

| Test Case ID | Test Steps | Test Input | Expected Results | Actual Results | Status | Test Type | Comments |
| --- | --- | --- | --- | --- | --- | --- | --- |
| SEC-011 | 1. Log in as S2. | Auth: S2<br>Files: schema.sql (reports_select_own, reports_admin_select policies) | Only S2's own report rows (reporter_id = auth.uid()) are returned; S1's reports are hidden. | While authenticated as Job Seeker ABCD (user ID d1ff41b4-fb7d-4398-a270-c405c83fc795), a direct query to the reports table returned an empty array with no error. Known reports belonging to Tsuki (d43f9652-89ed-45af-b429-bf361646a11a) and Len (fcc3189e-0e67-40f8-b688-c79842ba481f) were not returned. This confirms that another seeker's submitted reports are hidden by RLS. | Pass | Normal | RLS correctly limits report visibility to the authenticated user's own reports; unrelated seeker reports were not exposed. |
|  | 2. Query reports table without reporter_id filter. |  |  |  |  |  |  |
|  | 3. Check rows returned. |  |  |  |  |  |  |

## Analytics & Chatbot

| Column A | Column B |
| --- | --- |
| Module Name:- | Security Testing – Analytics &amp; Chatbot |
| Test Case ID | SEC-022 |
| Tester Name | Len Pei Ying |
| Test Case Description | RLS: Admin-only access to chatbot logs. |
| Prerequisites: | Seeker account authenticated; chatbot_logs table has rows. |

| Column A | Column B |
| --- | --- |
| Tester's Name | Len Pei Ying |
| Environmental Information:- | 1. OS: Windows/Linux/Mac<br>2. System: Laptop/Desktop/Mobile<br>3. Browser: Google Chrome/Microsoft Edge<br>4. Network: Stable Internet Connection |

| Column A | Column B |
| --- | --- |
| Test Scenario | RLS: Admin-only access to chatbot logs. |

| Test Case ID | Test Steps | Test Input | Expected Results | Actual Results | Status | Test Type | Comments |
| --- | --- | --- | --- | --- | --- | --- | --- |
| SEC-022 | 1. Log in as Seeker. | Auth: Seeker<br>Files: schema.sql (chatbot_logs_select_admin policy) | No rows returned; only admin-role users can SELECT from chatbot_logs. | While authenticated as Job Seeker ABCD, a direct SELECT query against public.chatbot_logs returned HTTP status 200 with data as an empty array and error = null. No chatbot log rows were exposed to the seeker account, confirming that the admin-only RLS policy prevented non-admin read access. | Pass | Normal | Non-admin users cannot read chatbot_logs; RLS correctly hides all rows from the Job Seeker session. |
|  | 2. Query chatbot_logs table. |  |  |  |  |  |  |
|  | 3. Check rows returned. |  |  |  |  |  |  |
| Module Name:- | Security Testing – Analytics &amp; Chatbot |  |  |  |  |  |  |
| Test Case ID | SEC-025 |  |  |  |  |  |  |
| Tester Name | Len Pei Ying |  |  |  |  |  |  |
| Test Case Description | Analytics: Admin analytics data is not accessible to non-admin users. |  |  |  |  |  |  |
| Prerequisites: | Analytics table has rows; seeker account is authenticated. |  |  |  |  |  |  |

| Column A | Column B |
| --- | --- |
| Tester's Name | Len Pei Ying |
| Environmental Information:- | 1. OS: Windows/Linux/Mac<br>2. System: Laptop/Desktop/Mobile<br>3. Browser: Google Chrome/Microsoft Edge<br>4. Network: Stable Internet Connection |

| Column A | Column B |
| --- | --- |
| Test Scenario | Analytics: Admin analytics data is not accessible to non-admin users. |

| Test Case ID | Test Steps | Test Input | Expected Results | Actual Results | Status | Test Type | Comments |
| --- | --- | --- | --- | --- | --- | --- | --- |
| SEC-025 | 1. Log in as Seeker. | Auth: Seeker<br>Files: schema.sql (analytics_admin_select policy) | No rows returned for non-admin users; analytics data is admin-only. | While authenticated as Job Seeker ABCD, a direct SELECT query against public.analytics returned HTTP status 200 with data as an empty array and error = null. No analytics rows were exposed to the non-admin account, confirming that analytics data is restricted to admin users by RLS. | Pass | Normal | Admin analytics data is correctly hidden from non-admin users; the Job Seeker session could not read any analytics rows. |
|  | 2. Query analytics table directly. |  |  |  |  |  |  |
|  | 3. Check rows returned. |  |  |  |  |  |  |

## PDPA & Compliance

| Column A | Column B |
| --- | --- |
| Module Name:- | Security Testing – PDPA &amp; Compliance |
| Test Case ID | SEC-026 |
| Tester Name | Len Pei Ying |
| Test Case Description | PDPA: Personal data fields are not exposed in public job listing queries. |
| Prerequisites: | Employer has filled personal contact details in profile; public jobs page is accessible. |

| Column A | Column B |
| --- | --- |
| Tester's Name | Len Pei Ying |
| Environmental Information:- | 1. OS: Windows/Linux/Mac<br>2. System: Laptop/Desktop/Mobile<br>3. Browser: Google Chrome/Microsoft Edge<br>4. Network: Stable Internet Connection |

| Column A | Column B |
| --- | --- |
| Test Scenario | PDPA: Personal data fields are not exposed in public job listing queries. |

| Test Case ID | Test Steps | Test Input | Expected Results | Actual Results | Status | Test Type | Comments |
| --- | --- | --- | --- | --- | --- | --- | --- |
| SEC-026 | 1. Without logging in, open the public Jobs page. | Auth: none (anon)<br>Files: jobseeker-jobs.js, schema.sql (job_listings_public_read policy) | Job listing rows do not include employer personal contact fields; only job-specific fields (title, location, pay, category, etc.) are returned. | While unauthenticated, a direct SELECT * query on public.job_listings returned five public job rows. The returned objects contained job-specific fields only, including id, employer_id, title, description, category, location, job_type, pay_rate, pay_type, skill_tags, expiry_date, status, created_at, openings_count, deleted_at, approved_by and approved_at. No employer personal profile fields such as email, phone, bio, SSM number, registration document data or contact document data were included in the public job listing response. | Pass | Normal | Public job listing queries expose job information only; employer personal/contact and verification-document fields are not embedded in the job listing response. |
|  | 2. Inspect job listing data returned from Supabase. |  |  |  |  |  |  |
|  | 3. Verify employer personal data (phone, email, bio) is not embedded in the job listing response. |  |  |  |  |  |  |
| Module Name:- | Security Testing – PDPA &amp; Compliance |  |  |  |  |  |  |
| Test Case ID | SEC-027 |  |  |  |  |  |  |
| Tester Name | Len Pei Ying |  |  |  |  |  |  |
| Test Case Description | PDPA: Employer verification documents are not exposed to authenticated non-owner users. |  |  |  |  |  |  |
| Prerequisites: | Employer E1 has verification document data stored in public.users. A different authenticated Job Seeker account is available for the non-owner access test. |  |  |  |  |  |  |

| Column A | Column B |
| --- | --- |
| Tester's Name | Len Pei Ying |
| Environmental Information:- | 1. OS: Windows/Linux/Mac<br>2. System: Laptop/Desktop/Mobile<br>3. Browser: Google Chrome/Microsoft Edge<br>4. Network: Stable Internet Connection |

| Column A | Column B |
| --- | --- |
| Test Scenario | PDPA: Verify that an authenticated non-owner user cannot retrieve another Employer's verification document information. |

| Test Case ID | Test Steps | Test Input | Expected Results | Actual Results | Status | Test Type | Comments |
| --- | --- | --- | --- | --- | --- | --- | --- |
| SEC-027 | 1. Log in as a Job Seeker who is not the owner of Employer E1's record. | Auth: Job Seeker (non-owner) Target: Employer E1 UUID RLS: users_select_own and users_select_admin | The authenticated non-owner user cannot retrieve Employer E1's protected user record or verification document information. The updated RLS policies restrict direct user-record access to the record owner and authorised Administrators. | While authenticated as Job Seeker ABCD, a direct query against public.users targeted W&amp;X Employer (cfc76680-17f4-4670-a0cd-c5c02b6a6650) and requested protected profile and verification fields including email, SSM number, registration document information and contact document information. The request returned HTTP status 200, error = null and data as an empty array. No protected Employer verification information was exposed to the non-owner account. | Pass | Normal | RLS correctly prevents an authenticated non-owner Job Seeker from retrieving another Employer's protected user record and verification-document fields. |
|  | 2. Query public.users for Employer E1's record and attempt to retrieve the verification document fields. |  |  |  |  |  |  |
|  | 3. Check whether any protected Employer verification information is returned. |  |  |  |  |  |  |
| Module Name:- | Security Testing – PDPA &amp; Compliance |  |  |  |  |  |  |
| Test Case ID | SEC-028 |  |  |  |  |  |  |
| Tester Name | Len Pei Ying |  |  |  |  |  |  |
| Test Case Description | Compliance: Employer verification status update is restricted to admin role. |  |  |  |  |  |  |
| Prerequisites: | Employer E1 has submitted a verification request; seeker account S is authenticated. |  |  |  |  |  |  |

| Column A | Column B |
| --- | --- |
| Tester's Name | Len Pei Ying |
| Environmental Information:- | 1. OS: Windows/Linux/Mac<br>2. System: Laptop/Desktop/Mobile<br>3. Browser: Google Chrome/Microsoft Edge<br>4. Network: Stable Internet Connection |

| Column A | Column B |
| --- | --- |
| Test Scenario | Compliance: Employer verification status update is restricted to admin role. |

| Test Case ID | Test Steps | Test Input | Expected Results | Actual Results | Status | Test Type | Comments |
| --- | --- | --- | --- | --- | --- | --- | --- |
| SEC-028 | 1. Log in as Seeker S. | Auth: Seeker S<br>Target: E1 UUID, field: verification_status<br>Files: schema.sql (users_update_own, users_admin_update policies) | UPDATE is blocked; verification_status can only be changed by the admin. | While authenticated as Job Seeker ABCD, a direct UPDATE was attempted against W&amp;X Employer (cfc76680-17f4-4670-a0cd-c5c02b6a6650) to set verification_status = 'verified'. The request returned HTTP status 200 with data as an empty array and error = null, indicating no row was updated under RLS. A trusted SQL readback confirmed the Employer record remained verification_status = 'submitted' and is_verified = true. Therefore the non-admin user could not change the Employer verification status. | Pass | Abnormal | RLS correctly prevents a Job Seeker from updating another Employer's verification status; database readback confirmed the protected field was unchanged. |
|  | 2. Attempt to PATCH public.users to set verification_status = 'verified' for E1. |  |  |  |  |  |  |
|  | 3. Verify response. |  |  |  |  |  |  |
| Module Name:- | Security Testing – PDPA &amp; Compliance |  |  |  |  |  |  |
| Test Case ID | SEC-029 |  |  |  |  |  |  |
| Tester Name | Len Pei Ying |  |  |  |  |  |  |
| Test Case Description | Compliance: Job listings deleted/closed by admin are removed from public job search. |  |  |  |  |  |  |
| Prerequisites: | Admin has set a job_listing status to 'closed'; public Jobs page is accessible. |  |  |  |  |  |  |

| Column A | Column B |
| --- | --- |
| Tester's Name | Len Pei Ying |
| Environmental Information:- | 1. OS: Windows/Linux/Mac<br>2. System: Laptop/Desktop/Mobile<br>3. Browser: Google Chrome/Microsoft Edge<br>4. Network: Stable Internet Connection |

| Column A | Column B |
| --- | --- |
| Test Scenario | Compliance: Job listings deleted/closed by admin are removed from public job search. |

| Test Case ID | Test Steps | Test Input | Expected Results | Actual Results | Status | Test Type | Comments |
| --- | --- | --- | --- | --- | --- | --- | --- |
| SEC-029 | 1. Admin sets job_listings.status = 'closed' for a listing. | Auth: admin action then anon view<br>Files: admin-jobs.js (updateJobListingStatus), jobseeker-jobs.js (public query filter), schema.sql | Closed listings are excluded from the public job search results. | A job listing with status = 'closed' was identified: de85ecb3-8148-40a2-bc5d-f68d4969bdd6 ([ST-002 TEST] Part-time Barista). While unauthenticated, a direct query against public.job_listings for this exact job ID returned HTTP status 200 with data as an empty array and error = null. The closed listing was therefore not exposed through the public job query. | Pass | Normal | Closed job listings are excluded from unauthenticated/public job search access as required. |
|  | 2. Open public Jobs page without logging in. |  |  |  |  |  |  |
|  | 3. Verify the closed listing does not appear. |  |  |  |  |  |  |

## Employer Verification

| Column A | Column B |
| --- | --- |
| Module Name:- | Security Testing – Employer Verification &amp; Job Visibility |
| Test Case ID | SEC-030 |
| Tester Name | Len Pei Ying |
| Test Case Description | Employer Verification: Unverified employer's approved job must not be publicly visible to Job Seekers. |
| Prerequisites: | CarePlus employer exists with is_verified = false; employer can create a job and Admin can approve the listing. |

| Column A | Column B |
| --- | --- |
| Tester's Name | Len Pei Ying |
| Environmental Information:- | 1. OS: Windows/Linux/Mac<br>2. System: Laptop/Desktop/Mobile<br>3. Browser: Google Chrome/Microsoft Edge<br>4. Network: Stable Internet Connection |

| Column A | Column B |
| --- | --- |
| Test Scenario | Verify that an approved job from an unverified employer remains manageable by the employer but is hidden from Public / Job Seeker Browse Jobs. |

| Test Case ID | Test Steps | Test Input | Expected Results | Actual Results | Status | Test Type | Comments |
| --- | --- | --- | --- | --- | --- | --- | --- |
| SEC-030 | 1. Log in as unverified employer CarePlus and create/save a test job. | Employer: CarePlus (unverified)<br>Initial observation: approved CarePlus job was visible to Job Seekers.<br>Fix: public job visibility requires job status = approved AND employer is_verified = true. | An unverified employer may create and manage its own listing, but the job must not be publicly visible to Job Seekers until the employer is verified. | Initial test identified that an approved CarePlus job was publicly visible even though the employer had not passed verification. After adding the verified-employer database read gate, the CarePlus job remained available in the Employer Dashboard for management but disappeared from Public / Job Seeker Browse Jobs. The visibility rule was therefore corrected and the retest passed. | Pass | Abnormal | Initial issue identified and resolved. Retest passed after security fix. Public visibility now requires both an approved job and a verified, active employer. |
|  | 2. Admin approves the CarePlus job. |  |  |  |  |  |  |
|  | 3. Open Public / Job Seeker Browse Jobs and verify the CarePlus job is not visible. |  |  |  |  |  |  |
|  | 4. Return to CarePlus Employer Dashboard and verify the employer can still manage its own job. |  |  |  |  |  |  |

## Formula reference

Values above are the results saved in the source workbook; formulas are preserved below.

| Sheet | Cell | Formula | Saved value |
| --- | --- | --- | --- |
| Summary | D10 | C10/$C$4 | 36.67% |
| Summary | D11 | [shared formula] | 16.67% |
| Summary | D12 | [shared formula] | 3.33% |
| Summary | D13 | [shared formula] | 6.67% |
| Summary | D14 | [shared formula] | 6.67% |
| Summary | D15 | [shared formula] | 6.67% |
| Summary | D16 | [shared formula] | 6.67% |
| Summary | D17 | [shared formula] | 13.33% |
| Summary | D18 | [shared formula] | 3.33% |
| Summary | C19 | SUM(C10:C18) | 30 |
| Summary | D19 | SUM(D10:D18) | 100.00% |
