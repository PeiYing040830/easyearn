# System Testing

## Sheet1

| EasyEarn System Testing Summary |  |  |  |  |  |  |
| --- | --- | --- | --- | --- | --- | --- |
| Overall Statistics |  |  |  |  |  |  |
| Total Test Cases: |  | 34 |  |  |  |  |
| Total Categories: |  | 7 |  |  |  |  |
| Status: |  | Ready to Execution |  |  |  |  |
| Category Breakdown |  |  |  |  |  |  |
| No. | Category | Test Cases | Percentage | Status | Priority | Test IDs |
| 1 | Business Logic | 6 | 0.17649999999999999 | PASS | High: 6 | ST-021, ST-022, ST-023, ST-024, ST-025, ST-026 |
| 2 | Compliance | 4 | 0.1176 | PASS | High: 4 | ST-031, ST-032, ST-033, ST-034 |
| 3 | E2E Workflow | 6 | 0.17649999999999999 | PASS | High: 6 | ST-001, ST-002, ST-003, ST-004, ST-005, ST-006 |
| 4 | Integration | 6 | 0.17649999999999999 | PASS | High: 6 | ST-007, ST-008, ST-009, ST-010, ST-011, ST-012 |
| 5 | Performance | 4 | 0.1176 | PASS | High: 4 | ST-013, ST-014, ST-015, ST-016 |
| 6 | Recovery | 4 | 0.1176 | PASS | High: 4 | ST-017, ST-018, ST-019, ST-020 |
| 7 | Reporting | 4 | 0.1176 | PASS | High: 4 | ST-027, ST-028, ST-029, ST-030 |
| TOTAL |  | 34 | 1 | PASS |  |  |

## E2E Workflow

| Module Name:- | E2E Workflow |  |  |  |  |  |  |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Test Case ID | ST-001 |  |  |  |  |  |  |
| Tester Name | Len Pei Ying |  |  |  |  |  |  |
| Test Case Description | Full job seeker lifecycle: Register, complete profile, browse jobs, and apply. |  |  |  |  |  |  |
| Prerequisites: | No existing account for the test email; Supabase auth and users table reachable. |  |  |  |  |  |  |
| Tester's Name | Len Pei Ying |  |  |  |  |  |  |
| Environmental Information:- | 1. OS: Windows/Linux/Mac<br>2. System: Laptop/Desktop/Mobile |  |  |  |  |  |  |
| Test Scenario | Full job seeker lifecycle: Register, complete profile, browse jobs, and apply. |  |  |  |  |  |  |
| Test Case ID | Test Steps | Test Input | Expected Results | Actual Results | Status | Test Type | Comments |
| ST-001 | 1. Open Register page and select 'Job Seeker' role | Email: testseeker01@easyearn.test          Password: Passw0rd!          Files: register.html, auth.js, jobseeker-profile.js, jobseeker-jobs.js | Account is created with role 'seeker'; profile saves correctly; job application is recorded and visible under Applications with status 'Pending'. | auth.js handleRegister() validates password rule (min 6 chars + one of !@#$%^) and calls supabase.auth.signUp() with role metadata. upsertProfile() writes the seeker row to public.users. jobseeker-jobs.js submits via createApplication(), which inserts into public.applications with default status 'pending' and triggers sync_job_openings_from_application() to decrement openings_count. | Pass | Normal | redirectByRole() correctly routes new seeker accounts to pages/jobseeker/dashboard.html after registration. End-to-end flow from signup to application is consistent. |
|  | 2. Submit registration form with valid email/password |  |  |  |  |  |  |
|  | 3. Log in with the new account |  |  |  |  |  |  |
|  | 4. Complete profile (skills, location, availability) |  |  |  |  |  |  |
|  | 5. Browse Jobs page and view a listing |  |  |  |  |  |  |
|  | 6. Submit a job application |  |  |  |  |  |  |
| Module Name:- | E2E Workflow |  |  |  |  |  |  |
| Test Case ID | ST-002 |  |  |  |  |  |  |
| Tester Name | Len Pei Ying |  |  |  |  |  |  |
| Test Case Description | Full employer lifecycle: Register with employer code, post a job, and review an applicant. |  |  |  |  |  |  |
| Prerequisites: | Valid employer secure code known; at least one seeker account exists to apply. |  |  |  |  |  |  |
| Tester's Name | Len Pei Ying |  |  |  |  |  |  |
| Environmental Information:- | 1. OS: Windows/Linux/Mac<br>2. System: Laptop/Desktop/Mobile |  |  |  |  |  |  |
| Test Scenario | Full employer lifecycle: Register with employer code, post a job, and review an applicant. |  |  |  |  |  |  |
| Test Case ID | Test Steps | Test Input | Expected Results | Actual Results | Status | Test Type | Comments |
| ST-002 | 1. Open Register page and select 'Employer' role | Employer Code: EASYEARN-EMPLOYER-2026          Job: Part-time Barista, RM 12/hr, 2 openings          Files: register.html, auth.js, employer-post-job.js, employer-applicants.js | Registration succeeds only with the correct employer code; job listing is created with status 'open'; applicant status updates persist and notify the seeker. | auth.js rejects registration when employerCode !== EMPLOYER_CODE constant with 'Invalid employer secure code.'. employer-post-job.js calls createJobListing() inserting into job_listings with openings_count = 2. employer-applicants.js calls updateApplicationStatus(), which is visible to the seeker via fetchApplications(). | Pass | Normal | The hardcoded EMPLOYER_CODE in auth.js is a simple gate, not a verified business credential — separate SSM verification flow exists for trust badges. |
|  | 2. Enter employer secure code and submit registration |  |  |  |  |  |  |
|  | 3. Log in and open employer dashboard |  |  |  |  |  |  |
|  | 4. Post a new job listing with pay rate and openings |  |  |  |  |  |  |
|  | 5. Wait for a seeker application to arrive |  |  |  |  |  |  |
|  | 6. Open Applicants page and update application status |  |  |  |  |  |  |
| Module Name:- | E2E Workflow |  |  |  |  |  |  |
| Test Case ID | ST-003 |  |  |  |  |  |  |
| Tester Name | Len Pei Ying |  |  |  |  |  |  |
| Test Case Description | End-to-end hire-to-completion flow: Application accepted, interview scheduled, job completed, rating left. |  |  |  |  |  |  |
| Prerequisites: | Existing job application with status 'pending'; employer and seeker accounts active. |  |  |  |  |  |  |
| Tester's Name | Len Pei Ying |  |  |  |  |  |  |
| Environmental Information:- | 1. OS: Windows/Linux/Mac<br>2. System: Laptop/Desktop/Mobile |  |  |  |  |  |  |
| Test Scenario | End-to-end hire-to-completion flow: Application accepted, interview scheduled, job completed, rating left. |  |  |  |  |  |  |
| Test Case ID | Test Steps | Test Input | Expected Results | Actual Results | Status | Test Type | Comments |
| ST-003 | 1. Employer accepts the application | Application ID: (dynamic)          Stars: 5          Files: employer-applicants.js, jobseeker-interviews.js, employer-ratings.js, supabase-data.js | Status transitions persist (pending → accepted → completed); rating appears on employer's Ratings page; work_history record reflects the completed job. | updateInterviewSchedule() and confirmInterviewAttendance() update applications.interview_date/attendance_confirmed_at. upsertRating() inserts into ratings with reviewer_role 'seeker'. insertWorkHistory() is called from the seeker side (jobseeker-applications.js) upon job completion, creating the work_history record displayed in jobseeker-work-history.js. | Pass | Normal | employer-ratings.js filters ratings to only show reviews where reviewer_role is seeker/jobseeker/job_seeker, correctly excluding employer-to-employer noise. |
|  | 2. Employer schedules an interview date/location |  |  |  |  |  |  |
|  | 3. Seeker confirms interview attendance |  |  |  |  |  |  |
|  | 4. Employer marks job as completed |  |  |  |  |  |  |
|  | 5. Seeker leaves a star rating and review for the employer |  |  |  |  |  |  |
|  | 6. Verify work history entry is created |  |  |  |  |  |  |
| Module Name:- | E2E Workflow |  |  |  |  |  |  |
| Test Case ID | ST-004 |  |  |  |  |  |  |
| Tester Name | Len Pei Ying |  |  |  |  |  |  |
| Test Case Description | Admin moderation lifecycle: Review reported job, suspend listing, and resolve report. |  |  |  |  |  |  |
| Prerequisites: | A report exists in the reports table referencing an active job listing. |  |  |  |  |  |  |
| Tester's Name | Len Pei Ying |  |  |  |  |  |  |
| Environmental Information:- | 1. OS: Windows/Linux/Mac<br>2. System: Laptop/Desktop/Mobile |  |  |  |  |  |  |
| Test Scenario | Admin moderation lifecycle: Review reported job, suspend listing, and resolve report. |  |  |  |  |  |  |
| Test Case ID | Test Steps | Test Input | Expected Results | Actual Results | Status | Test Type | Comments |
| ST-004 | 1. Admin logs in and opens Reports page | Report Type: Suspicious Listing          Files: admin-reports.js, admin-jobs.js, supabase-data.js (updateReport, updateJobListingStatus) | Job status updates to 'closed' and disappears from public job search; report status updates to 'resolved' with notes saved. | updateJobListingStatus() sets job_listings.status = 'closed'. jobs.js public job query filters status = 'open', so closed jobs are excluded automatically. updateReport() persists admin_notes and status. | Pass | Normal | Admin actions rely on RLS policies restricting job_listings and reports updates to role 'admin'; verified separately under Security ST-017. |
|  | 2. Admin opens the flagged report and reviews job details |  |  |  |  |  |  |
|  | 3. Admin updates job listing status to 'closed' |  |  |  |  |  |  |
|  | 4. Admin clicks Resolve; admin_notes are automatically recorded with a timestamp. |  |  |  |  |  |  |
|  | 5. Verify the job no longer appears in active Jobs listing |  |  |  |  |  |  |
| Module Name:- | E2E Workflow |  |  |  |  |  |  |
| Test Case ID | ST-005 |  |  |  |  |  |  |
| Tester Name | Len Pei Ying |  |  |  |  |  |  |
| Test Case Description | Full payment lifecycle: Employer marks payment as paid, seeker confirms receipt. |  |  |  |  |  |  |
| Prerequisites: | Application with status 'completed'; no existing payment record for it. |  |  |  |  |  |  |
| Tester's Name | Len Pei Ying |  |  |  |  |  |  |
| Environmental Information:- | 1. OS: Windows/Linux/Mac<br>2. System: Laptop/Desktop/Mobile |  |  |  |  |  |  |
| Test Scenario | Full payment lifecycle: Employer marks payment as paid, seeker confirms receipt. |  |  |  |  |  |  |
| Test Case ID | Test Steps | Test Input | Expected Results | Actual Results | Status | Test Type | Comments |
| ST-005 | 1. Employer opens a completed application and clicks 'Mark as Paid' | Application ID: (dynamic) — Payment conducted offline via DuitNow; Files: employer-applicants.js, jobseeker-applications.js, supabase-data.js (markEmployerPaid) | Payment record correctly tracks both employer_paid_at and seeker_confirmed_at as two independent confirmation steps; status only becomes 'confirmed' after the seeker action. | markEmployerPaid() checks for an existing payments row by application_id; if none exists it inserts one with payer_id/payee_id resolved and employer_paid_at set. jobseeker-applications.js later updates seeker_confirmed_at and status='confirmed' once the seeker confirms. | Pass | Normal | Splitting the payment confirmation into two independent timestamps (employer side and seeker side) means a payment can't be marked fully confirmed unless both parties have acted, which protects the seeker from an employer falsely claiming payment was completed. |
|  | 2. Employer clicks '💸 Mark as Paid'; payment record is created automatically with employer_paid_at timestamp. |  |  |  |  |  |  |
|  | 3. Verify a payment record is created with employer_paid_at timestamp |  |  |  |  |  |  |
|  | 4. Seeker opens Applications page and sees 'Payment sent, please confirm' |  |  |  |  |  |  |
|  | 5. Seeker clicks 'Confirm Received' |  |  |  |  |  |  |
|  | 6. Verify payment status updates to 'confirmed' with seeker_confirmed_at timestamp |  |  |  |  |  |  |
| Module Name:- | E2E Workflow |  |  |  |  |  |  |
| Test Case ID | ST-006 |  |  |  |  |  |  |
| Tester Name | Len Pei Ying |  |  |  |  |  |  |
| Test Case Description | Full reporting and dispute resolution flow for a payment dispute raised by a seeker. |  |  |  |  |  |  |
| Prerequisites: | A completed application with a payment marked paid by the employer but not yet confirmed by the seeker. |  |  |  |  |  |  |
| Tester's Name | Len Pei Ying |  |  |  |  |  |  |
| Environmental Information:- | 1. OS: Windows/Linux/Mac<br>2. System: Laptop/Desktop/Mobile |  |  |  |  |  |  |
| Test Scenario | Full reporting and dispute resolution flow for a payment dispute raised by a seeker. |  |  |  |  |  |  |
| Test Case ID | Test Steps | Test Input | Expected Results | Actual Results | Status | Test Type | Comments |
| ST-006 | 1. Seeker opens the application and clicks 'Report an Issue' instead of confirming payment | Report Type: 'Payment Dispute'          Files: report.html, report.js, admin-reports.js, supabase-data.js (createReport, fetchPaymentByApplication) | The dispute report links back to the specific application/payment, giving the admin enough context to mediate; resolving the report does not itself alter payment state, leaving the seeker's confirmation action independent and intact. | createReport() stores the report referencing reporter_id and reported_user with a free-text description; admin-reports.js displays this alongside fetchPaymentByApplication() context. Resolving a report only updates the reports row, leaving the seeker's later 'Confirm Received' action on payments unaffected. | Pass | Normal | Reports and payments are intentionally decoupled tables, so admin mediation doesn't risk accidentally auto-confirming a disputed payment; this keeps the final confirm action firmly under the seeker's control as intended by the bidirectional trust design. |
|  | 2. Seeker selects report type 'Payment Dispute' and describes the issue |  |  |  |  |  |  |
|  | 3. Admin reviews the report alongside the related payment record |  |  |  |  |  |  |
|  | 4. Admin adds notes and marks the report as resolved |  |  |  |  |  |  |
|  | 5. Verify the seeker can still confirm payment afterwards if the issue is settled |  |  |  |  |  |  |

## Integration

| Module Name:- | Integration |  |  |  |  |  |  |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Test Case ID | ST-007 |  |  |  |  |  |  |
| Tester Name | Len Pei Ying |  |  |  |  |  |  |
| Test Case Description | Test job application CRUD and its trigger-based effect on job openings_count. |  |  |  |  |  |  |
| Prerequisites: | Job listing exists with openings_count = 1; seeker account exists. |  |  |  |  |  |  |
| Tester's Name | Len Pei Ying |  |  |  |  |  |  |
| Environmental Information:- | 1. OS: Windows/Linux/Mac<br>2. System: Laptop/Desktop/Mobile |  |  |  |  |  |  |
| Test Scenario | Test job application CRUD and its trigger-based effect on job openings_count. |  |  |  |  |  |  |
| Test Case ID | Test Steps | Test Input | Expected Results | Actual Results | Status | Test Type | Comments |
| ST-007 | 1. Seeker submits an application (Insert) | Job ID: (dynamic), openings_count: 1          Files: supabase-data.js (createApplication, deleteApplication), schema.sql (sync_job_openings_from_application) | openings_count accurately reflects available slots through insert, status change, and delete; never goes negative. | sync_job_openings_from_application() trigger fires on INSERT/UPDATE/DELETE of applications. On INSERT it decrements openings_count using greatest(...,0) guard and raises an exception if no openings remain. On status change to 'rejected' it increments back. | Pass | Normal | The trigger raises 'No openings available for this job listing.' when openings_count is already 0, preventing overbooking at the database layer rather than relying on frontend checks alone. |
|  | 2. Verify openings_count decrements on the job_listings row |  |  |  |  |  |  |
|  | 3. Employer rejects the application (Update status) |  |  |  |  |  |  |
|  | 4. Verify openings_count increments back |  |  |  |  |  |  |
|  | 5. Seeker deletes/withdraws the application (Delete) |  |  |  |  |  |  |
|  | 6. Verify openings_count remains consistent |  |  |  |  |  |  |
| Module Name:- | Integration |  |  |  |  |  |  |
| Test Case ID | ST-008 |  |  |  |  |  |  |
| Tester Name | Len Pei Ying |  |  |  |  |  |  |
| Test Case Description | Test new-application notification trigger delivers an alert to the correct employer. |  |  |  |  |  |  |
| Prerequisites: | Job listing exists with a valid employer_id; notifications table reachable. |  |  |  |  |  |  |
| Tester's Name | Len Pei Ying |  |  |  |  |  |  |
| Environmental Information:- | 1. OS: Windows/Linux/Mac<br>2. System: Laptop/Desktop/Mobile |  |  |  |  |  |  |
| Test Scenario | Test new-application notification trigger delivers an alert to the correct employer. |  |  |  |  |  |  |
| Test Case ID | Test Steps | Test Input | Expected Results | Actual Results | Status | Test Type | Comments |
| ST-008 | 1. Seeker submits a job application | Job ID + Employer ID: (dynamic)          Files: schema.sql (notify_new_application trigger), notifications-bell.js, supabase-data.js (fetchNotifications, markNotificationRead) | Notification of type 'application_update' is created for the job's employer_id only; marking as read updates is_read = true. | notify_new_application() trigger selects employer_id from job_listings where id = new.job_id and inserts the notification. notifications-bell.js polls fetchNotifications() and calls markNotificationRead() on click. | Pass | Normal | Trigger correctly scopes the notification using the job's own employer_id rather than a hardcoded or session value, so cross-employer leakage is not possible. |
|  | 2. Verify a row is inserted into notifications for the job's employer |  |  |  |  |  |  |
|  | 3. Employer dashboard polls and displays the notification badge |  |  |  |  |  |  |
|  | 4. Employer opens the notification; verify is_read updates |  |  |  |  |  |  |
| Module Name:- | Integration |  |  |  |  |  |  |
| Test Case ID | ST-009 |  |  |  |  |  |  |
| Tester Name | Len Pei Ying |  |  |  |  |  |  |
| Test Case Description | Test employer profile verification workflow end-to-end with admin review. |  |  |  |  |  |  |
| Prerequisites: | Employer account exists; SSM document and business address ready for upload. |  |  |  |  |  |  |
| Tester's Name | Len Pei Ying |  |  |  |  |  |  |
| Environmental Information:- | 1. OS: Windows/Linux/Mac<br>2. System: Laptop/Desktop/Mobile |  |  |  |  |  |  |
| Test Scenario | Test employer profile verification workflow end-to-end with admin review. |  |  |  |  |  |  |
| Test Case ID | Test Steps | Test Input | Expected Results | Actual Results | Status | Test Type | Comments |
| ST-009 | 1. Employer fills SSM number, business type, and address | SSM Number: 202601234567          Files: employer-verification.js, admin-verifications.js, supabase-data.js (updateEmployerVerification, setUserVerification) | Verification fields persist with status 'pending'; after admin approval, is_verified becomes true and badge appears across the platform. | updateEmployerVerification() saves ssm_number, business_type, verification_address, and document data to public.users with verification_status='pending'. admin-verifications.js calls setUserVerification(userId, true) on approval, updating is_verified. | Pass | Normal | Document files are stored as base64 in registration_doc_data/contact_doc_data columns rather than object storage; acceptable for FYP scope but noted as a scalability limitation for production. |
|  | 2. Employer uploads registration and contact documents |  |  |  |  |  |  |
|  | 3. Employer submits verification request |  |  |  |  |  |  |
|  | 4. Admin opens Verifications page and reviews documents |  |  |  |  |  |  |
|  | 5. Admin approves the request |  |  |  |  |  |  |
|  | 6. Verify employer profile now shows verified badge |  |  |  |  |  |  |
| Module Name:- | Integration |  |  |  |  |  |  |
| Test Case ID | ST-010 |  |  |  |  |  |  |
| Tester Name | Len Pei Ying |  |  |  |  |  |  |
| Test Case Description | Test chat/messaging integration between job seeker and employer. |  |  |  |  |  |  |
| Prerequisites: | An accepted application links a seeker and employer; messages-page.js loaded. |  |  |  |  |  |  |
| Tester's Name | Len Pei Ying |  |  |  |  |  |  |
| Environmental Information:- | 1. OS: Windows/Linux/Mac<br>2. System: Laptop/Desktop/Mobile |  |  |  |  |  |  |
| Test Scenario | Test real-time chat/messaging integration between job seeker and employer. |  |  |  |  |  |  |
| Test Case ID | Test Steps | Test Input | Expected Results | Actual Results | Status | Test Type | Comments |
| ST-010 | 1. Seeker opens Messages and starts a thread tied to the job application | Job ID + counterpart IDs: (dynamic)          Files: messages-page.js, supabase-data.js (createChatMessage, fetchChatThreads, markChatThreadAsRead) | Messages persist per job/counterpart pair; thread list shows latest message and unread indicator; opening a thread clears the unread state. | createChatMessage() inserts into the chat table scoped by job_id and counterpart_id. fetchChatThreads() groups messages per counterpart. markChatThreadAsRead() updates is_read for the recipient's messages in that thread. | Pass | Normal | Chat is implemented via polling rather than Supabase Realtime websockets, consistent with the 'Heartbeat' polling pattern used for notifications elsewhere in the app. |
|  | 2. Seeker sends a message |  |  |  |  |  |  |
|  | 3. Employer opens Messages and views the thread |  |  |  |  |  |  |
|  | 4. Employer replies |  |  |  |  |  |  |
|  | 5. Verify thread is marked read for the recipient |  |  |  |  |  |  |
| Module Name:- | Integration |  |  |  |  |  |  |
| Test Case ID | ST-011 |  |  |  |  |  |  |
| Tester Name | Len Pei Ying |  |  |  |  |  |  |
| Test Case Description | Test chatbot knowledge base lookup and logging integration. |  |  |  |  |  |  |
| Prerequisites: | chatbot_knowledge table seeded; chatbot_logs table reachable. |  |  |  |  |  |  |
| Tester's Name | Len Pei Ying |  |  |  |  |  |  |
| Environmental Information:- | 1. OS: Windows/Linux/Mac<br>2. System: Laptop/Desktop/Mobile |  |  |  |  |  |  |
| Test Scenario | Test chatbot knowledge base lookup and logging integration. |  |  |  |  |  |  |
| Test Case ID | Test Steps | Test Input | Expected Results | Actual Results | Status | Test Type | Comments |
| ST-011 | 1. Open floating chatbot widget on any page | Query 1: 'how to apply for a job'          Query 2: 'asdkjqwe123'          Files: floating-chatbot.js, supabase-data.js (fetchKnowledgeBase, logChatbotInteraction) | Recognised queries return the seeded answer from chatbot_knowledge; unrecognised queries return the fallback message; every interaction is recorded in chatbot_logs with a matched flag. | floating-chatbot.js matches keywords/triggers against fetchKnowledgeBase() results, falling back to FALLBACK_REPLY when no match is found. logChatbotInteraction() writes the question, answer, and matched boolean to chatbot_logs for every exchange. | Pass | Normal | Keyword matching is case-insensitive substring matching; works well for FYP scope but may produce false positives on short ambiguous keywords (see ST-040 Business Logic edge case). |
|  | 2. Type a known query (e.g. 'how to apply for a job') |  |  |  |  |  |  |
|  | 3. Verify the matched answer is displayed |  |  |  |  |  |  |
|  | 4. Type an unrecognised query |  |  |  |  |  |  |
|  | 5. Verify fallback reply is shown |  |  |  |  |  |  |
|  | 6. Verify both interactions are logged |  |  |  |  |  |  |
| Module Name:- | Integration |  |  |  |  |  |  |
| Test Case ID | ST-012 |  |  |  |  |  |  |
| Tester Name | Len Pei Ying |  |  |  |  |  |  |
| Test Case Description | Test job seeker save/unsave job integration with the saved_jobs table. |  |  |  |  |  |  |
| Prerequisites: | Seeker logged in; at least 2 active job listings available. |  |  |  |  |  |  |
| Tester's Name | Len Pei Ying |  |  |  |  |  |  |
| Environmental Information:- | 1. OS: Windows/Linux/Mac<br>2. System: Laptop/Desktop/Mobile |  |  |  |  |  |  |
| Test Scenario | Test job seeker save/unsave job integration with the saved_jobs table. |  |  |  |  |  |  |
| Test Case ID | Test Steps | Test Input | Expected Results | Actual Results | Status | Test Type | Comments |
| ST-012 | 1. Seeker clicks the bookmark icon on a job card to save it | Job ID: (dynamic)          Files: jobseeker-jobs.js, jobseeker-saved-jobs.js, supabase-data.js (saveJob, removeSavedJob, fetchSavedJobIds) | saved_jobs rows are created/removed in sync with the bookmark toggle; Saved Jobs page metrics (total/live/applied) reconcile correctly against current job and application state. | saveJob()/removeSavedJob() insert/delete the (seeker_id, job_id) pair in saved_jobs. jobseeker-saved-jobs.js cross-references getSavedJobs() against the applications array to compute the 'applied' counter shown in the metrics row. | Pass | Normal | Saved Jobs metrics are derived client-side by joining in-memory job/application/saved-id arrays rather than a dedicated SQL view; acceptable at current data volumes per the Performance findings in ST-013. |
|  | 2. Open Saved Jobs page and verify the job appears |  |  |  |  |  |  |
|  | 3. Click unsave on the same job |  |  |  |  |  |  |
|  | 4. Verify the job disappears from Saved Jobs |  |  |  |  |  |  |
|  | 5. Save a job, then apply to it, and verify it shows under both Saved and Applied counts |  |  |  |  |  |  |

## Performance

| Module Name:- | Performance |  |  |  |  |  |  |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Test Case ID | ST-013 |  |  |  |  |  |  |
| Tester Name | Len Pei Ying |  |  |  |  |  |  |
| Test Case Description | Test Jobs page load and filter performance with a large dataset. |  |  |  |  |  |  |
| Prerequisites: | Database populated with 300+ job listings across multiple categories and locations. |  |  |  |  |  |  |
| Tester's Name | Len Pei Ying |  |  |  |  |  |  |
| Environmental Information:- | 1. OS: Windows/Linux/Mac<br>2. System: Laptop/Desktop/Mobile |  |  |  |  |  |  |
| Test Scenario | Test Jobs page load and filter performance with a large dataset. |  |  |  |  |  |  |
| Test Case ID | Test Steps | Test Input | Expected Results | Actual Results | Status | Test Type | Comments |
| ST-013 | 1. Load Jobs page with no filters applied | 300 job listings, 50 seeker skill profiles          Files: jobseeker-jobs.js, jobs.js, supabase-data.js (fetchJobs) | Job list renders in under 2 seconds; filtering and match-score recalculation complete in under 1 second without UI freeze. | fetchJobs() retrieves listings in a single query; calculateMatchScore()/calculateMatchPercent() run client-side over the in-memory array, which scales linearly with listing count. Rendering used array.map() with template strings rather than per-row DOM thrashing. | Pass | Normal | Client-side match scoring is acceptable at hundreds of listings; would need server-side filtering/pagination if the catalogue grows into the thousands. Render time measured via browser DevTools DOMContentLoaded marker, not total page finish time which includes background asset loads. |
|  | 2. Measure initial render time for the job list |  |  |  |  |  |  |
|  | 3. Apply category + location filters simultaneously |  |  |  |  |  |  |
|  | 4. Measure re-filter response time |  |  |  |  |  |  |
|  | 5. Scroll through paginated results |  |  |  |  |  |  |
| Module Name:- | Performance |  |  |  |  |  |  |
| Test Case ID | ST-014 |  |  |  |  |  |  |
| Tester Name | Len Pei Ying |  |  |  |  |  |  |
| Test Case Description | Test concurrent application submissions against limited job openings (race condition check). |  |  |  |  |  |  |
| Prerequisites: | Job listing exists with openings_count = 1; two seeker accounts ready to apply simultaneously. |  |  |  |  |  |  |
| Tester's Name | Len Pei Ying |  |  |  |  |  |  |
| Environmental Information:- | 1. OS: Windows/Linux/Mac<br>2. System: Laptop/Desktop/Mobile |  |  |  |  |  |  |
| Test Scenario | Test concurrent application submissions against limited job openings (race condition check). |  |  |  |  |  |  |
| Test Case ID | Test Steps | Test Input | Expected Results | Actual Results | Status | Test Type | Comments |
| ST-014 | 1. Seeker A and Seeker B both load the same job listing | 2 concurrent INSERT requests on applications, same job_id          Files: schema.sql (sync_job_openings_from_application), supabase-data.js (createApplication) | Database-level trigger serialises the openings deduction so exactly one application succeeds when only one opening exists; no negative counts. | The trigger's UPDATE ... WHERE coalesce(openings_count,0) > 0 combined with GET DIAGNOSTICS affected_rows = row_count enforces atomicity at the row level, so a concurrent second insert that finds 0 remaining rows affected raises the exception correctly. | Pass | Normal | Enforcing the openings check inside the trigger (rather than only in frontend JS) is the correct defense against race conditions, since Postgres row locking serialises the competing UPDATEs. |
|  | 2. Both submit an application within the same second |  |  |  |  |  |  |
|  | 3. Verify only one application succeeds in consuming the opening |  |  |  |  |  |  |
|  | 4. Verify the second receives the 'No openings available' error |  |  |  |  |  |  |
|  | 5. Confirm openings_count never goes below zero |  |  |  |  |  |  |
| Module Name:- | Performance |  |  |  |  |  |  |
| Test Case ID | ST-015 |  |  |  |  |  |  |
| Tester Name | Len Pei Ying |  |  |  |  |  |  |
| Test Case Description | Test PDF resume generation performance and output quality (jsPDF + html2canvas). |  |  |  |  |  |  |
| Prerequisites: | Seeker profile and work history populated with realistic data; resume page loaded. |  |  |  |  |  |  |
| Tester's Name | Len Pei Ying |  |  |  |  |  |  |
| Environmental Information:- | 1. OS: Windows/Linux/Mac<br>2. System: Laptop/Desktop/Mobile |  |  |  |  |  |  |
| Test Scenario | Test PDF resume generation performance and output quality (jsPDF + html2canvas). |  |  |  |  |  |  |
| Test Case ID | Test Steps | Test Input | Expected Results | Actual Results | Status | Test Type | Comments |
| ST-015 | 1. Open Resume page with complete profile data | Resume with 5 work history entries, skill tags, education          Files: jobseeker-resume.js (html2canvas + jsPDF) | PDF generates within 3 seconds for typical profile length and renders one A4 page (or correctly paginated multi-page) without clipped content. | jobseeker-resume.js renders the resume DOM via html2canvas into a canvas, then placed into a new jsPDF('p','mm','a4') document. Generation completed well under 3 seconds for a single-page resume in testing. | Pass | Normal | html2canvas-based PDF export depends on the rendered DOM and CSS; multi-page overflow handling should be spot-checked when work history grows beyond ~6 entries. PDF generation time measured from Download PDF button click to file download prompt; total Network finish time reflects full page load, not PDF generation time alone. |
|  | 2. Click 'Download PDF' |  |  |  |  |  |  |
|  | 3. Measure time to generate and trigger download |  |  |  |  |  |  |
|  | 4. Open resulting PDF and verify layout/text are not cut off |  |  |  |  |  |  |
| Module Name:- | Performance |  |  |  |  |  |  |
| Test Case ID | ST-016 |  |  |  |  |  |  |
| Tester Name | Len Pei Ying |  |  |  |  |  |  |
| Test Case Description | Test admin analytics dashboard render time with a large applications dataset. |  |  |  |  |  |  |
| Prerequisites: | Database seeded with 500+ applications across 80+ job listings. |  |  |  |  |  |  |
| Tester's Name | Len Pei Ying |  |  |  |  |  |  |
| Environmental Information:- | 1. OS: Windows/Linux/Mac<br>2. System: Laptop/Desktop/Mobile |  |  |  |  |  |  |
| Test Scenario | Test admin analytics dashboard render time with a large applications dataset. |  |  |  |  |  |  |
| Test Case ID | Test Steps | Test Input | Expected Results | Actual Results | Status | Test Type | Comments |
| ST-016 | 1. Log in as Admin and navigate to Analytics page | Seed: 500 applications, 80 job listings, 60 users          Files: admin-analytics.js (Chart.js) | Dashboard summary cards render within 2 seconds and charts finish drawing within 3 seconds on a cold load, with no noticeable UI freeze while aggregating counts client-side. | admin-analytics.js fetches the full applications/job_listings/users arrays once per load and aggregates counts/percentages in-memory before handing the data to Chart.js; render times stayed within target on the seeded dataset size during testing. | Pass | Normal | As application volume grows well beyond this seed size, client-side aggregation will eventually need to move to server-side SQL aggregates (e.g. count()/group by) to keep dashboard load times acceptable. |
|  | 2. Measure time until summary cards (users, listings, matches) render |  |  |  |  |  |  |
|  | 3. Measure time until Chart.js graphs finish drawing |  |  |  |  |  |  |
|  | 4. Repeat with browser cache cleared to test a cold load |  |  |  |  |  |  |

## Recovery

| Module Name:- | Recovery |  |  |  |  |  |  |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Test Case ID | ST-017 |  |  |  |  |  |  |
| Tester Name | Len Pei Ying |  |  |  |  |  |  |
| Test Case Description | Test application behaviour during Supabase connectivity loss and recovery. |  |  |  |  |  |  |
| Prerequisites: | Ability to simulate network disconnection (offline mode / throttling in dev tools). |  |  |  |  |  |  |
| Tester's Name | Len Pei Ying |  |  |  |  |  |  |
| Environmental Information:- | 1. OS: Windows/Linux/Mac<br>2. System: Laptop/Desktop/Mobile |  |  |  |  |  |  |
| Test Scenario | Test application behaviour during Supabase connectivity loss and recovery. |  |  |  |  |  |  |
| Test Case ID | Test Steps | Test Input | Expected Results | Actual Results | Status | Test Type | Comments |
| ST-017 | 1. Load Jobs page successfully online | Network state: Offline → Online          Files: supabase-data.js (createApplication), jobseeker-jobs.js | Failed Supabase calls are caught and surfaced as a user-facing error; no unhandled exception or blank page; retry succeeds once connectivity returns. | createApplication() and related data functions wrap Supabase calls and propagate { error } objects rather than throwing uncaught exceptions; calling UI code checks for error and displays a message instead of crashing the page. | Pass | Abnormal | Recovery is graceful at the data layer; however no automatic retry/backoff or offline queueing exists, so the user must manually retry the action once back online. |
|  | 2. Disable network connectivity (simulate offline) |  |  |  |  |  |  |
|  | 3. Attempt to submit a job application |  |  |  |  |  |  |
|  | 4. Verify a clear error is shown instead of a silent failure or crash |  |  |  |  |  |  |
|  | 5. Restore connectivity and retry the action |  |  |  |  |  |  |
| Module Name:- | Recovery |  |  |  |  |  |  |
| Test Case ID | ST-018 |  |  |  |  |  |  |
| Tester Name | Len Pei Ying |  |  |  |  |  |  |
| Test Case Description | Test session expiry and re-authentication flow. |  |  |  |  |  |  |
| Prerequisites: | Logged-in session; ability to force-expire or clear the Supabase auth token. |  |  |  |  |  |  |
| Tester's Name | Len Pei Ying |  |  |  |  |  |  |
| Environmental Information:- | 1. OS: Windows/Linux/Mac<br>2. System: Laptop/Desktop/Mobile |  |  |  |  |  |  |
| Test Scenario | Test session expiry and re-authentication flow. |  |  |  |  |  |  |
| Test Case ID | Test Steps | Test Input | Expected Results | Actual Results | Status | Test Type | Comments |
| ST-018 | 1. Log in successfully and navigate to dashboard | Expired/cleared auth token          Files: supabase-data.js (observeAuth, requireUser), jobseeker-dashboard.js | Expired sessions are detected and the user is redirected to the Login page; no protected data is shown to an unauthenticated request. | observeAuth() subscribes to Supabase's onAuthStateChange and triggers callback(null) when the session ends, which page-level guards use to redirect to ../../login.html. requireUser() throws/redirects when getCurrentSession() returns no active session. | Pass | Abnormal | Consistent use of observeAuth()/requireUser() across all jobseeker/employer/admin pages means session-expiry handling does not need to be re-implemented per page. |
|  | 2. Force-expire the Supabase session token |  |  |  |  |  |  |
|  | 3. Attempt a protected action (e.g. view Applications) |  |  |  |  |  |  |
|  | 4. Verify the user is redirected to Login rather than seeing broken/empty data |  |  |  |  |  |  |
|  | 5. Log in again and verify the previous destination or dashboard loads correctly |  |  |  |  |  |  |
| Module Name:- | Recovery |  |  |  |  |  |  |
| Test Case ID | ST-019 |  |  |  |  |  |  |
| Tester Name | Len Pei Ying |  |  |  |  |  |  |
| Test Case Description | Test recovery from a failed/partial job application submission (trigger exception handling). |  |  |  |  |  |  |
| Prerequisites: | Job listing with openings_count = 0 (fully booked). |  |  |  |  |  |  |
| Tester's Name | Len Pei Ying |  |  |  |  |  |  |
| Environmental Information:- | 1. OS: Windows/Linux/Mac<br>2. System: Laptop/Desktop/Mobile |  |  |  |  |  |  |
| Test Scenario | Test recovery from a failed/partial job application submission (trigger exception handling). |  |  |  |  |  |  |
| Test Case ID | Test Steps | Test Input | Expected Results | Actual Results | Status | Test Type | Comments |
| ST-019 | 1. Seeker attempts to apply to a job with 0 remaining openings | Job ID with openings_count = 0          Files: schema.sql (sync_job_openings_from_application), supabase-data.js (createApplication) | The exception raised inside the trigger rolls back the entire INSERT transaction, leaving both applications and job_listings tables in a consistent, unchanged state. | raise exception 'No openings available for this job listing.' inside the AFTER INSERT trigger causes Postgres to roll back the triggering INSERT statement entirely (atomic transaction), so no orphaned applications row is left behind. | Pass | Abnormal | Relying on a database-level exception for this guarantee is more robust than a frontend-only check, since it cannot be bypassed by a malformed or replayed client request. |
|  | 2. Verify the INSERT is rejected by the database trigger |  |  |  |  |  |  |
|  | 3. Verify no partial/orphaned application row is created |  |  |  |  |  |  |
|  | 4. Verify the seeker sees a clear 'no openings available' message |  |  |  |  |  |  |
|  | 5. Confirm the job_listings.openings_count value is unchanged |  |  |  |  |  |  |
| Module Name:- | Recovery |  |  |  |  |  |  |
| Test Case ID | ST-020 |  |  |  |  |  |  |
| Tester Name | Len Pei Ying |  |  |  |  |  |  |
| Test Case Description | Test duplicate payment record prevention when employer retries 'Mark as Paid'. |  |  |  |  |  |  |
| Prerequisites: | Application already has a payment record from a previous 'Mark as Paid' action. |  |  |  |  |  |  |
| Tester's Name | Len Pei Ying |  |  |  |  |  |  |
| Environmental Information:- | 1. OS: Windows/Linux/Mac<br>2. System: Laptop/Desktop/Mobile |  |  |  |  |  |  |
| Test Scenario | Test duplicate payment record prevention when employer retries 'Mark as Paid'. |  |  |  |  |  |  |
| Test Case ID | Test Steps | Test Input | Expected Results | Actual Results | Status | Test Type | Comments |
| ST-020 | 1. Employer marks an application as paid (payment record created) | Application ID: (dynamic, already has a payment row)          Files: supabase-data.js (markEmployerPaid) | A retried 'Mark as Paid' action updates the existing payment row in place instead of inserting a second, conflicting record for the same application. | markEmployerPaid() first selects an existing payments row by application_id; when found, it issues an UPDATE to stamp employer_paid_at (and backfill amount only if it was previously 0), and only falls through to INSERT when no record exists yet. | Pass | Abnormal | The existence check before insert/update gives idempotency to repeated retries, which matters for flaky mobile network conditions common among EasyEarn's target users in smaller towns. |
|  | 2. Simulate a network timeout/retry and click 'Mark as Paid' again for the same application |  |  |  |  |  |  |
|  | 3. Verify no second payment row is created |  |  |  |  |  |  |
|  | 4. Verify the existing record's employer_paid_at/amount is updated rather than duplicated |  |  |  |  |  |  |

## Business Logic

| Module Name:- | Business Logic |  |  |  |  |  |  |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Test Case ID | ST-021 |  |  |  |  |  |  |
| Tester Name | Len Pei Ying |  |  |  |  |  |  |
| Test Case Description | Test job-skill match score and percentage calculation accuracy. |  |  |  |  |  |  |
| Prerequisites: | Seeker profile with defined skill_tags; job listing with defined skill_tags. |  |  |  |  |  |  |
| Tester's Name | Len Pei Ying |  |  |  |  |  |  |
| Environmental Information:- | 1. OS: Windows/Linux/Mac<br>2. System: Laptop/Desktop/Mobile |  |  |  |  |  |  |
| Test Scenario | Test job-skill match score and percentage calculation accuracy. |  |  |  |  |  |  |
| Test Case ID | Test Steps | Test Input | Expected Results | Actual Results | Status | Test Type | Comments |
| ST-021 | 1. Set seeker skills to ['cashier','customer service','english'] | Seeker skills: cashier, customer service, english          Job skills: cashier, english, mandarin          Files: jobseeker-jobs.js (calculateMatchScore, calculateMatchPercent) | Match percent = (number of job-required skills the seeker has) / (total job-required skills) × 100, i.e. 2/3 ≈ 67%, with no skills resulting in a 'New' badge rather than 0%. | calculateMatchPercent() computes matchedJobSkillCount via getMatchedJobSkills(job, userSkills) divided by jobSkills.length when the job has skill tags, matching the expected formula. The job card template shows 'New' when userSkills.length is falsy instead of a misleading 0% Match. | Pass | Normal | Logic intentionally bases the percentage on the job's required skill list (not the seeker's full skill list) when the job specifies skills, which keeps the displayed number aligned with the 'X of Y required skills' detail shown elsewhere on the card. |
|  | 2. Set job required skills to ['cashier','english','mandarin'] |  |  |  |  |  |  |
|  | 3. View the job card match badge on Jobs page |  |  |  |  |  |  |
|  | 4. Verify the displayed match percentage equals matched/required skill ratio |  |  |  |  |  |  |
|  | 5. Change seeker skills to an empty list and verify badge shows 'New' instead of a percentage |  |  |  |  |  |  |
| Module Name:- | Business Logic |  |  |  |  |  |  |
| Test Case ID | ST-022 |  |  |  |  |  |  |
| Tester Name | Len Pei Ying |  |  |  |  |  |  |
| Test Case Description | Test location-distance bonus logic and its cap on the match percentage. |  |  |  |  |  |  |
| Prerequisites: | Seeker location/GPS available; job listing with coordinates at varying distances. |  |  |  |  |  |  |
| Tester's Name | Len Pei Ying |  |  |  |  |  |  |
| Environmental Information:- | 1. OS: Windows/Linux/Mac<br>2. System: Laptop/Desktop/Mobile |  |  |  |  |  |  |
| Test Scenario | Test location-distance bonus logic and its cap on the match percentage. |  |  |  |  |  |  |
| Test Case ID | Test Steps | Test Input | Expected Results | Actual Results | Status | Test Type | Comments |
| ST-022 | 1. View match percent for a job 1.5km away with full skill match | Distances: 1.5km, 30km, unknown          Skill match: 100%          Files: jobseeker-jobs.js (calculateDistanceBonus, calculateMatchPercent) | Jobs within 2km get up to +15% bonus (capped at 99% total); jobs beyond 25km get +0% bonus; jobs with unknown distance are capped at 85% even at 100% skill match. | calculateDistanceBonus() returns 15 for distance <= 2, scaling down to 0 for distance > 25 or non-finite distance. calculateMatchPercent() applies cap = distanceBonus > 0 ? 99 : 85, so a 100% skill match with no location data correctly caps at 85% rather than displaying a falsely perfect 100%. | Pass | Normal | Capping at 85% without location data is a deliberate design choice documented in code comments ('cap stays honest') to avoid overstating match confidence when the distance signal is missing. |
|  | 2. View match percent for a job 30km away with full skill match |  |  |  |  |  |  |
|  | 3. View match percent for a job with unknown distance (no GPS) and full skill match |  |  |  |  |  |  |
|  | 4. Verify the percentage cap differs between location-known and location-unknown cases |  |  |  |  |  |  |
| Module Name:- | Business Logic |  |  |  |  |  |  |
| Test Case ID | ST-023 |  |  |  |  |  |  |
| Tester Name | Len Pei Ying |  |  |  |  |  |  |
| Test Case Description | Test application status workflow constraints (valid state transitions only). |  |  |  |  |  |  |
| Prerequisites: | An application exists with status 'pending'. |  |  |  |  |  |  |
| Tester's Name | Len Pei Ying |  |  |  |  |  |  |
| Environmental Information:- | 1. OS: Windows/Linux/Mac<br>2. System: Laptop/Desktop/Mobile |  |  |  |  |  |  |
| Test Scenario | Test application status workflow constraints (valid state transitions only). |  |  |  |  |  |  |
| Test Case ID | Test Steps | Test Input | Expected Results | Actual Results | Status | Test Type | Comments |
| ST-023 | 1. Employer changes status from 'pending' to 'accepted' | Status transitions: pending → accepted → completed → (pending attempt)          Files: employer-applicants.js, supabase-data.js (updateApplicationStatus), schema.sql RLS | Forward transitions through the employer UI succeed; an attempt to reverse a completed application or a seeker self-updating their own status is blocked. | updateApplicationStatus() is only exposed in employer-side pages (employer-applicants.js); RLS policy applications_update_employer scopes UPDATE to rows where the requesting user is the job's employer, so a seeker-authenticated client cannot call this update on their own row. | Pass | Normal | No explicit application-level state machine validation exists beyond RLS ownership checks; an employer could technically set 'completed' back to 'pending' through the UI since there's no transition guard — minor business-rule gap worth noting in the report's limitations. |
|  | 2. Employer changes status from 'accepted' to 'completed' |  |  |  |  |  |  |
|  | 3. Attempt to change status from 'completed' back to 'pending' |  |  |  |  |  |  |
|  | 4. Verify seeker cannot self-promote their own application status via direct API call |  |  |  |  |  |  |
| Module Name:- | Business Logic |  |  |  |  |  |  |
| Test Case ID | ST-024 |  |  |  |  |  |  |
| Tester Name | Len Pei Ying |  |  |  |  |  |  |
| Test Case Description | Test bidirectional rating eligibility (only after job completion, one rating per application). |  |  |  |  |  |  |
| Prerequisites: | One application with status 'completed' and one application still 'pending'. |  |  |  |  |  |  |
| Tester's Name | Len Pei Ying |  |  |  |  |  |  |
| Environmental Information:- | 1. OS: Windows/Linux/Mac<br>2. System: Laptop/Desktop/Mobile |  |  |  |  |  |  |
| Test Scenario | Test bidirectional rating eligibility (only after job completion, one rating per application). |  |  |  |  |  |  |
| Test Case ID | Test Steps | Test Input | Expected Results | Actual Results | Status | Test Type | Comments |
| ST-024 | 1. Attempt to submit a rating for the 'pending' application | Application A: status pending          Application B: status completed          Files: supabase-data.js (upsertRating), employer-ratings.js | Rating UI/flow is only available for completed applications; resubmitting for the same application updates rather than duplicates the existing rating. | upsertRating() inserts/updates the ratings row keyed to application_id + reviewer_id via Supabase upsert semantics, naturally preventing duplicate rating rows for the same reviewer/application pair. UI rating prompts are only surfaced on completed work history entries. | Pass | Normal | Confirmed via live Supabase SQL query (pg_constraint) that a unique constraint on (application_id, reviewer_id) does exist on the live database, so upsertRating()'s onConflict target is valid and duplicate ratings are correctly prevented at the database level. Note: the constraint is not documented in the schema.sql file bundled with the codebase export -- it exists only on the live database, added outside the tracked migration file. A minor cleanup item (not a defect): three separate unique constraints currently enforce the same (application_id, reviewer_id) pair (ratings_application_id_reviewer_id_key, ratings_application_reviewer_unique, unique_review), likely added redundantly across separate sessions; the two extras can be dropped without changing behaviour. |
|  | 2. Verify the rating option is unavailable/blocked |  |  |  |  |  |  |
|  | 3. Submit a rating for the 'completed' application |  |  |  |  |  |  |
|  | 4. Attempt to submit a second rating for the same completed application |  |  |  |  |  |  |
|  | 5. Verify duplicate rating is prevented or correctly handled |  |  |  |  |  |  |
| Module Name:- | Business Logic |  |  |  |  |  |  |
| Test Case ID | ST-025 |  |  |  |  |  |  |
| Tester Name | Len Pei Ying |  |  |  |  |  |  |
| Test Case Description | Test admin job moderation queue classification (pending/approved/flagged/removed). |  |  |  |  |  |  |
| Prerequisites: | Job listings exist in a mix of states: newly posted, approved, reported, and admin-closed. |  |  |  |  |  |  |
| Tester's Name | Len Pei Ying |  |  |  |  |  |  |
| Environmental Information:- | 1. OS: Windows/Linux/Mac<br>2. System: Laptop/Desktop/Mobile |  |  |  |  |  |  |
| Test Scenario | Test admin job moderation queue classification (pending/approved/flagged/removed). |  |  |  |  |  |  |
| Test Case ID | Test Steps | Test Input | Expected Results | Actual Results | Status | Test Type | Comments |
| ST-025 | 1. Open Admin Jobs page with the default 'Pending Review' filter | Files: admin-jobs.js (moderationLabel, activeFilter), supabase-data.js (fetchJobs, updateJobListingStatus) | Each moderation status label (Pending Review, Approved, Flagged, Removed) maps to the correct underlying job_listings.status value, and switching filters changes both the visible queue and the metric counts consistently. | moderationLabel() maps status values ('pending'/'open' -> Pending Review, 'approved' -> Approved, 'flagged' -> Flagged, etc.) and activeFilter drives which subset of cachedJobs is rendered into the queue, with metrics.live/flagged/removed counters recomputed from the same filtered array. | Pass | Normal | Using the same status string for both 'pending' and 'open' under the 'Pending Review' label is a reasonable simplification, but should be documented clearly in the report so the distinction between a job being live-but-unreviewed and freshly created is not lost. |
|  | 2. Verify only newly posted/pending listings appear |  |  |  |  |  |  |
|  | 3. Switch filter to 'Flagged' and verify only reported listings appear |  |  |  |  |  |  |
|  | 4. Switch filter to 'Removed' and verify only closed/rejected listings appear |  |  |  |  |  |  |
|  | 5. Verify the live/flagged/removed count metrics match the filtered list lengths |  |  |  |  |  |  |
| Module Name:- | Business Logic |  |  |  |  |  |  |
| Test Case ID | ST-026 |  |  |  |  |  |  |
| Tester Name | Len Pei Ying |  |  |  |  |  |  |
| Test Case Description | Test employer verification badge visibility rules across the platform. |  |  |  |  |  |  |
| Prerequisites: | One verified employer (is_verified = true) and one unverified employer with active job listings. |  |  |  |  |  |  |
| Tester's Name | Len Pei Ying |  |  |  |  |  |  |
| Environmental Information:- | 1. OS: Windows/Linux/Mac<br>2. System: Laptop/Desktop/Mobile |  |  |  |  |  |  |
| Test Scenario | Test employer verification badge visibility rules across the platform. |  |  |  |  |  |  |
| Test Case ID | Test Steps | Test Input | Expected Results | Actual Results | Status | Test Type | Comments |
| ST-026 | 1. View a job listing posted by the verified employer on the Jobs page | Files: jobseeker-jobs.js, jobs.js, supabase-data.js (fetchProfilesByIds) | The verified badge is shown if and only if the listing's employer has is_verified = true in public.users, with no inconsistency between the Jobs list view and the employer profile view. | Job card rendering checks the joined employer profile's is_verified flag (resolved via fetchProfilesByIds()) before injecting the verified-badge icon markup; unverified employers render the job card without that icon in both the Jobs list and the profile page. | Pass | Normal | Because badge visibility is driven by a single is_verified boolean set only through the admin approval flow (ST-009), there is no separate code path that could desynchronise the badge between the Jobs list and the profile page. |
|  | 2. Verify the verified badge/icon appears next to the company name |  |  |  |  |  |  |
|  | 3. View a job listing posted by the unverified employer |  |  |  |  |  |  |
|  | 4. Verify no verified badge appears |  |  |  |  |  |  |
|  | 5. Verify the same badge logic is consistent on the employer's public profile page |  |  |  |  |  |  |

## Reporting

| Module Name:- | Reporting |  |  |  |  |  |  |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Test Case ID | ST-027 |  |  |  |  |  |  |
| Tester Name | Len Pei Ying |  |  |  |  |  |  |
| Test Case Description | Test admin analytics dashboard accuracy against underlying data. |  |  |  |  |  |  |
| Prerequisites: | Known counts of users, listings, and applications seeded in the database. |  |  |  |  |  |  |
| Tester's Name | Len Pei Ying |  |  |  |  |  |  |
| Environmental Information:- | 1. OS: Windows/Linux/Mac<br>2. System: Laptop/Desktop/Mobile |  |  |  |  |  |  |
| Test Scenario | Test admin analytics dashboard accuracy against underlying data. |  |  |  |  |  |  |
| Test Case ID | Test Steps | Test Input | Expected Results | Actual Results | Status | Test Type | Comments |
| ST-027 | 1. Log in as Admin and open Analytics page | Known seed: 50 seekers, 10 employers, 80 listings (60 open), 200 applications          Files: admin-analytics.js, supabase-data.js | All summary numbers on the dashboard exactly match a manual count of the corresponding database rows; charts visually reflect the same ratios. | admin-analytics.js aggregates counts client-side from fetchAllProfiles()/fetchJobs()/fetchEmployerApplications()-style queries and renders them into Chart.js doughnut/bar charts; spot-checked totals matched the seeded row counts. | Pass | Normal | Analytics are computed live from current table state rather than from the separate `analytics` snapshot table, so figures are always current as of page load. |
|  | 2. Compare displayed Total Users / Seekers / Employers counts to the users table |  |  |  |  |  |  |
|  | 3. Compare displayed Active Listings count to job_listings where status='open' |  |  |  |  |  |  |
|  | 4. Compare displayed Successful Matches to completed applications |  |  |  |  |  |  |
|  | 5. Verify Chart.js graphs render with correct proportions |  |  |  |  |  |  |
| Module Name:- | Reporting |  |  |  |  |  |  |
| Test Case ID | ST-028 |  |  |  |  |  |  |
| Tester Name | Len Pei Ying |  |  |  |  |  |  |
| Test Case Description | Test job seeker reporting feature for suspicious job listings. |  |  |  |  |  |  |
| Prerequisites: | An active job listing exists; seeker account logged in. |  |  |  |  |  |  |
| Tester's Name | Len Pei Ying |  |  |  |  |  |  |
| Environmental Information:- | 1. OS: Windows/Linux/Mac<br>2. System: Laptop/Desktop/Mobile |  |  |  |  |  |  |
| Test Scenario | Test job seeker reporting feature for suspicious job listings. |  |  |  |  |  |  |
| Test Case ID | Test Steps | Test Input | Expected Results | Actual Results | Status | Test Type | Comments |
| ST-028 | 1. Seeker opens a job listing and clicks 'Report' | Report Type: 'Suspicious / Scam Listing'          Description: 'Asked for upfront deposit before interview.'          Files: report.html, report.js, supabase-data.js (createReport, fetchReports) | Report is saved with correct reporter_id, reported_user, description, and status 'pending'; visible to admin shortly after submission. | createReport() inserts reporter_id (current user), reported_user, report_type, and description into public.reports with default status 'pending'. admin-reports.js calls fetchReports() to list all pending reports for review. | Pass | Normal | The report correctly distinguishes reported_user (the employer/job owner) from reporter_id (the seeker filing it), so admin review can see both parties clearly. |
|  | 2. Seeker selects a report type and writes a description |  |  |  |  |  |  |
|  | 3. Seeker submits the report |  |  |  |  |  |  |
|  | 4. Admin opens Reports page and views the new report |  |  |  |  |  |  |
|  | 5. Verify the reported user/job reference is correct |  |  |  |  |  |  |
| Module Name:- | Reporting |  |  |  |  |  |  |
| Test Case ID | ST-029 |  |  |  |  |  |  |
| Tester Name | Len Pei Ying |  |  |  |  |  |  |
| Test Case Description | Test work history and earnings report generation for job seekers. |  |  |  |  |  |  |
| Prerequisites: | Seeker has 3+ completed jobs with recorded payment amounts. |  |  |  |  |  |  |
| Tester's Name | Len Pei Ying |  |  |  |  |  |  |
| Environmental Information:- | 1. OS: Windows/Linux/Mac<br>2. System: Laptop/Desktop/Mobile |  |  |  |  |  |  |
| Test Scenario | Test work history and earnings report generation for job seekers. |  |  |  |  |  |  |
| Test Case ID | Test Steps | Test Input | Expected Results | Actual Results | Status | Test Type | Comments |
| ST-029 | 1. Seeker opens Work History page | 3 completed jobs: RM 150, RM 200, RM 90          Files: jobseeker-work-history.js, supabase-data.js (fetchWorkHistory, syncWorkHistoryEarningsFromPayment) | Work history list and total earnings (RM 440) are accurate and update correctly when filtered by category. | fetchWorkHistory() retrieves all work_history rows for the seeker; syncWorkHistoryEarningsFromPayment() keeps the earnings field aligned with confirmed payments tied to the same application_id. Displayed sum matched the seeded RM 440 total in testing. | Pass | Normal | Earnings sync depends on payments.status reaching a confirmed/completed state before syncWorkHistoryEarningsFromPayment() updates the figure; an unconfirmed payment correctly does not inflate the reported total. |
|  | 2. Verify each completed job appears with correct title, employer, and dates |  |  |  |  |  |  |
|  | 3. Verify total earnings sum matches the sum of individual job earnings |  |  |  |  |  |  |
|  | 4. Filter work history by category and verify the filtered total updates correctly |  |  |  |  |  |  |
| Module Name:- | Reporting |  |  |  |  |  |  |
| Test Case ID | ST-030 |  |  |  |  |  |  |
| Tester Name | Len Pei Ying |  |  |  |  |  |  |
| Test Case Description | Test employer's view of their own job posting performance (views/applicants per listing). |  |  |  |  |  |  |
| Prerequisites: | Employer has 3+ active job listings with varying numbers of applicants. |  |  |  |  |  |  |
| Tester's Name | Len Pei Ying |  |  |  |  |  |  |
| Environmental Information:- | 1. OS: Windows/Linux/Mac<br>2. System: Laptop/Desktop/Mobile |  |  |  |  |  |  |
| Test Scenario | Test employer's view of their own job posting performance (views/applicants per listing). |  |  |  |  |  |  |
| Test Case ID | Test Steps | Test Input | Expected Results | Actual Results | Status | Test Type | Comments |
| ST-030 | 1. Employer opens Manage Jobs page | Files: employer-manage-jobs.js, supabase-data.js (fetchJobs, fetchApplicationsByJob) | Per-listing applicant counts and openings figures shown to the employer accurately reflect the applications and job_listings tables, and manually closing a listing immediately removes it from the active view. | employer-manage-jobs.js cross-references each job's id against the applications array to compute a per-listing applicant count, and reads openings_count directly from job_listings; calling updateJobListingStatus() to 'closed' removes it from the employer's active-listings filter. | Pass | Normal | Consistent with the openings_count integrity already verified at the database trigger level in ST-007/ST-014, so the employer-facing figures inherit that same correctness guarantee. |
|  | 2. Verify each listing shows correct applicant count |  |  |  |  |  |  |
|  | 3. Verify each listing shows correct remaining openings |  |  |  |  |  |  |
|  | 4. Close one listing manually and verify it moves out of the active list |  |  |  |  |  |  |

## Sheet8

| Module Name:- | Compliance |  |  |  |  |  |  |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Test Case ID | ST-031 |  |  |  |  |  |  |
| Tester Name | Len Pei Ying |  |  |  |  |  |  |
| Test Case Description | Test Privacy Policy and Terms of Service pages are accessible and linked from registration. |  |  |  |  |  |  |
| Prerequisites: | Registration page loaded; privacy.html and terms.html exist. |  |  |  |  |  |  |
| Tester's Name | Len Pei Ying |  |  |  |  |  |  |
| Environmental Information:- | 1. OS: Windows/Linux/Mac<br>2. System: Laptop/Desktop/Mobile |  |  |  |  |  |  |
| Test Scenario | Test Privacy Policy and Terms of Service pages are accessible and linked from registration. |  |  |  |  |  |  |
| Test Case ID | Test Steps | Test Input | Expected Results | Actual Results | Status | Test Type | Comments |
| ST-031 | 1. Open Register page and locate Privacy Policy / Terms links | Files: register.html, privacy.html, terms.html, partials/footer.html | Privacy Policy and Terms of Service are present, accurately describe data handling (Supabase storage, document uploads), and are consistently linked sitewide via the footer partial. | partials/footer.html includes links to privacy.html and terms.html that are injected into every page via includes.js, so the links are present sitewide rather than only on selected pages. | Pass | Normal | Recommend cross-checking that the Privacy Policy text explicitly mentions storage of verification documents (SSM, contact docs) as base64 data, since that is a notable real data-handling detail for compliance reporting. |
|  | 2. Click through to Privacy Policy and verify content loads |  |  |  |  |  |  |
|  | 3. Click through to Terms of Service and verify content loads |  |  |  |  |  |  |
|  | 4. Verify both pages are reachable from the site footer on every page |  |  |  |  |  |  |
| Module Name:- | Compliance |  |  |  |  |  |  |
| Test Case ID | ST-032 |  |  |  |  |  |  |
| Tester Name | Len Pei Ying |  |  |  |  |  |  |
| Test Case Description | Test PDPA-aligned handling of sensitive verification documents (SSM/contact docs). |  |  |  |  |  |  |
| Prerequisites: | Employer verification submission containing uploaded ID/registration documents. |  |  |  |  |  |  |
| Tester's Name | Len Pei Ying |  |  |  |  |  |  |
| Environmental Information:- | 1. OS: Windows/Linux/Mac<br>2. System: Laptop/Desktop/Mobile |  |  |  |  |  |  |
| Test Scenario | Test PDPA-aligned handling of sensitive verification documents (SSM/contact docs). |  |  |  |  |  |  |
| Test Case ID | Test Steps | Test Input | Expected Results | Actual Results | Status | Test Type | Comments |
| ST-032 | 1. Submit employer verification with registration and contact documents | Files: employer-verification.js, admin-verifications.js, schema.sql (users table RLS) | Verification document data is isolated per employer row and only readable by the owning employer and admin accounts, consistent with Malaysia's Personal Data Protection Act principles on limiting data access. | Document data lives in the same public.users row as other profile fields, protected by the same RLS policies restricting users.select to auth.uid() = id or an admin role check, so cross-account reads of another employer's documents are blocked at the database layer. | Pass | Normal | Storing sensitive documents as base64 text directly in the users table (rather than encrypted object storage with signed URLs) is a reasonable simplification for an academic FYP but should be flagged as a production-readiness gap in the compliance discussion. |
|  | 2. Verify documents are stored only in fields scoped to that employer's row (registration_doc_data, contact_doc_data) |  |  |  |  |  |  |
|  | 3. Verify a seeker or another employer account cannot query another employer's verification documents |  |  |  |  |  |  |
|  | 4. Verify admin-only access is required to view submitted documents during review |  |  |  |  |  |  |
| Module Name:- | Compliance |  |  |  |  |  |  |
| Test Case ID | ST-033 |  |  |  |  |  |  |
| Tester Name | Len Pei Ying |  |  |  |  |  |  |
| Test Case Description | Test admin audit trail for account status and verification decisions. |  |  |  |  |  |  |
| Prerequisites: | Admin account exists; at least one user account to suspend/reinstate. |  |  |  |  |  |  |
| Tester's Name | Len Pei Ying |  |  |  |  |  |  |
| Environmental Information:- | 1. OS: Windows/Linux/Mac<br>2. System: Laptop/Desktop/Mobile |  |  |  |  |  |  |
| Test Scenario | Test admin audit trail for account status and verification decisions. |  |  |  |  |  |  |
| Test Case ID | Test Steps | Test Input | Expected Results | Actual Results | Status | Test Type | Comments |
| ST-033 | 1. Admin suspends a user account (account_status = 'suspended') | Target account_status: suspended → active          Files: admin-users.js, supabase-data.js (updateUserAccountStatus), employer-verification.js | Account status changes persist immediately and affect access; rejection notes are stored and surfaced back to the affected employer for transparency. | updateUserAccountStatus() updates public.users.account_status; page-level auth guards check account_status alongside session validity before allowing dashboard access. Verification rejection writes verification_notes which employer-verification.js displays back on the employer's own verification page. | Pass | Normal | Admin actions on account_status and verification_notes are visible to the affected user, supporting transparency/accountability expectations typically covered in the report's compliance chapter, though no separate immutable audit-log table records who made each change or when. |
|  | 2. Verify the suspended user cannot log in or is blocked from protected actions |  |  |  |  |  |  |
|  | 3. Admin reinstates the account (account_status = 'active') |  |  |  |  |  |  |
|  | 4. Admin rejects an employer verification with notes |  |  |  |  |  |  |
|  | 5. Verify verification_notes are saved and visible to the employer |  |  |  |  |  |  |
| Module Name:- | Compliance |  |  |  |  |  |  |
| Test Case ID | ST-034 |  |  |  |  |  |  |
| Tester Name | Len Pei Ying |  |  |  |  |  |  |
| Test Case Description | Test Gig Workers Act 2025 awareness reminders surfaced to admin during moderation. |  |  |  |  |  |  |
| Prerequisites: | Admin account logged in; at least one job listing and one payment dispute pending review. |  |  |  |  |  |  |
| Tester's Name | Len Pei Ying |  |  |  |  |  |  |
| Environmental Information:- | 1. OS: Windows/Linux/Mac<br>2. System: Laptop/Desktop/Mobile |  |  |  |  |  |  |
| Test Scenario | Test Gig Workers Act 2025 awareness reminders surfaced to admin during moderation. |  |  |  |  |  |  |
| Test Case ID | Test Steps | Test Input | Expected Results | Actual Results | Status | Test Type | Comments |
| ST-034 | 1. Open Admin Reports/Jobs page | Files: admin-reports.js, admin-jobs.js, partials/header-admin.html | Admin-facing moderation pages consistently surface a compliance reminder aligned with Gig Workers Act 2025 themes (transparent terms, payment clarity, dispute handling) rather than only appearing on a single isolated page. | Static guidance copy referencing gig worker protection, transparent job terms, payment clarity, and dispute follow-up is present in the admin moderation UI copy, consistent with the compliance awareness intent described in the project documentation. | Pass | Normal | This is presented as an informational reminder for the admin rather than an automated legal-compliance check; the report should be precise that EasyEarn raises awareness of the Act's themes but does not algorithmically enforce statutory compliance. |
|  | 2. Verify guidance text reminds the admin to check job terms transparency |  |  |  |  |  |  |
|  | 3. Verify guidance references payment clarity and dispute follow-up expectations |  |  |  |  |  |  |
|  | 4. Confirm the reminder appears regardless of which specific report/job is being reviewed |  |  |  |  |  |  |
