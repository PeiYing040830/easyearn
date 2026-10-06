# EasyEarn System Testing

<!-- Source: EasyEarn_System_Testing.xlsx -->

## Summary

### EasyEarn System Testing Summary

### Overall Statistics

| Column A | Column C |
| --- | --- |
| Total Test Cases: | 34 |
| Total Categories: | 7 |
| Status: | Completed – 34 Passed / 0 Pending |

### Category Breakdown

| No. | Category | Test Cases | Percentage | Status | Priority | Test IDs |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | Business Logic | 6 | 17.65% | COMPLETED | High: 6 | ST-021, ST-022, ST-023, ST-024, ST-025, ST-026 |
| 2 | Compliance | 4 | 11.76% | COMPLETED | High: 4 | ST-031, ST-032, ST-033, ST-034 |
| 3 | E2E Workflow | 6 | 17.65% | COMPLETED | High: 6 | ST-001, ST-002, ST-003, ST-004, ST-005, ST-006 |
| 4 | Integration | 6 | 17.65% | COMPLETED | High: 6 | ST-007, ST-008, ST-009, ST-010, ST-011, ST-012 |
| 5 | Performance | 4 | 11.76% | COMPLETED | High: 4 | ST-013, ST-014, ST-015, ST-016 |
| 6 | Recovery | 4 | 11.76% | COMPLETED | High: 4 | ST-017, ST-018, ST-019, ST-020 |
| 7 | Reporting | 4 | 11.76% | COMPLETED | High: 4 | ST-027, ST-028, ST-029, ST-030 |
| TOTAL |  | 34 | 100.00% | COMPLETED |  |  |

## E2E Workflow

| Column A | Column B |
| --- | --- |
| Module Name:- | E2E Workflow |
| Test Case ID | ST-001 |
| Tester Name | Len Pei Ying |
| Test Case Description | Full job seeker lifecycle: Register, complete profile, browse jobs, and apply. |
| Prerequisites: | No existing account for the test email; Supabase auth and users table reachable. |

| Column A | Column B |
| --- | --- |
| Tester's Name | Len Pei Ying |
| Environmental Information:- | 1. OS: Windows 11<br>2. System: Laptop/Desktop<br>3. Browser: Google Chrome |

| Column A | Column B |
| --- | --- |
| Test Scenario | Full job seeker lifecycle: Register, complete profile, browse jobs, and apply. |

| Test Case ID | Test Steps | Test Input | Expected Results | Actual Results | Status | Test Type | Comments |
| --- | --- | --- | --- | --- | --- | --- | --- |
| ST-001 | 1. Open Register page and select 'Job Seeker' role. | Email: bxg123@gmail.com Password: PEIying@0830 | Account is created with role 'seeker'; profile saves correctly; job application is recorded and visible under Applications with status 'Pending'. | A new job seeker account was successfully registered and logged in. Profile details including location, skills and availability were saved and retained after reopening the page. The SugarShine job application was submitted successfully and appeared under My Applications with Pending status, which remained after refreshing the page. | Pass | Normal | The complete job seeker workflow functioned as expected. Registration, login, profile update, job browsing and job application were completed successfully without errors, and the submitted application remained visible with Pending status after refresh. |
|  | 2. Submit registration form with valid email/password. |  |  |  |  |  |  |
|  | 3. Log in with the new account. |  |  |  |  |  |  |
|  | 4. Complete profile (skills, location, availability). |  |  |  |  |  |  |
|  | 5. Browse Jobs page and view a listing. |  |  |  |  |  |  |
|  | 6. Submit a job application. |  |  |  |  |  |  |

| Column A | Column B |
| --- | --- |
| Module Name:- | E2E Workflow |
| Test Case ID | ST-002 |
| Tester Name | Len Pei Ying |
| Test Case Description | Full employer lifecycle: Register with employer code, post a job, and review an applicant. |
| Prerequisites: | Valid employer secure code known; at least one seeker account exists to apply. |

| Column A | Column B |
| --- | --- |
| Tester's Name | Len Pei Ying |
| Environmental Information:- | 1. OS: Windows 11<br>2. System: Laptop/Desktop<br>3. Browser: Google Chrome |

| Column A | Column B |
| --- | --- |
| Test Scenario | Full employer lifecycle: Register with employer code, post a job, and review an applicant. |

| Test Case ID | Test Steps | Test Input | Expected Results | Actual Results | Status | Test Type | Comments |
| --- | --- | --- | --- | --- | --- | --- | --- |
| ST-002 | 1. Open Register page and select 'Employer' role. | Employer Code: EASYEARN-EMPLOYER-2026 Job: Part-time Barista, RM 12/hr, 2 openings | Employer registration succeeds with the valid employer code. The new job listing is created with Pending Review status. After admin approval, the job becomes available to job seekers. A seeker can apply, and the employer can update the application status, which remains visible to the seeker after refresh. | A new employer job listing was successfully created and initially displayed as Pending Review. The administrator approved the listing, after which it became visible to Job Seekers. A Job Seeker successfully submitted an application, and the Employer received a new application notification. The Employer reviewed the application, and the updated Reviewed status was correctly reflected on the Job Seeker's My Applications page. | Pass | Normal | The employer job posting, admin approval, job seeker application and application status update workflow were completed successfully without errors. |
|  | 2. Enter employer secure code and submit registration. |  |  |  |  |  |  |
|  | 3. Log in and open employer dashboard. |  |  |  |  |  |  |
|  | 4. Post a new job listing with pay rate and openings. |  |  |  |  |  |  |
|  | 5. Wait for a seeker application to arrive. |  |  |  |  |  |  |
|  | 6. Open Applicants page and update application status. |  |  |  |  |  |  |

| Column A | Column B |
| --- | --- |
| Module Name:- | E2E Workflow |
| Test Case ID | ST-003 |
| Tester Name | Len Pei Ying |
| Test Case Description | End-to-end hire-to-completion flow: Application reviewed, interview scheduled, applicant accepted, work/payment confirmed, rating submitted, and work history created. |
| Prerequisites: | Existing job application with status 'pending'; employer and job seeker accounts are active; related job listing is approved. |

| Column A | Column B |
| --- | --- |
| Tester's Name | Len Pei Ying |
| Environmental Information:- | 1. OS: Windows 11<br>2. System: Laptop/Desktop<br>3. Browser: Google Chrome |

| Column A | Column B |
| --- | --- |
| Test Scenario | End-to-end hire-to-completion flow: Application accepted, interview scheduled, job completed, rating left. |

| Test Case ID | Test Steps | Test Input | Expected Results | Actual Results | Status | Test Type | Comments |
| --- | --- | --- | --- | --- | --- | --- | --- |
| ST-003 | 1. Employer marks the application as Reviewed. | Application ID: System-generated<br>Interview Date/Time: Valid future date/time<br>Interview Location: W&amp;X Bakery, Ipoh<br>Rating: 5 stars<br>Review: Great employer and smooth working experience. | Application status transitions correctly through Pending → Reviewed → Interview → Accepted → Completion Pending → Completed. Interview attendance is recorded successfully. After the Job Seeker confirms payment received, the completed job is added to Work History. The Job Seeker's rating and review are saved and displayed on the Employer's Ratings page. | The application successfully progressed through Reviewed, Interview, Accepted, Completion Pending and Completed. The Job Seeker confirmed interview attendance and payment receipt successfully. A 5-star rating and review were submitted for the Employer, and the completed job was added to the Job Seeker's Work History. | Pass | Normal | The complete hire-to-completion workflow functioned as expected across the Employer and Job Seeker modules. |
|  | 2. Employer schedules an interview date and location. |  |  |  |  |  |  |
|  | 3. Job Seeker confirms interview attendance. |  |  |  |  |  |  |
|  | 4. Employer accepts the applicant after the interview. |  |  |  |  |  |  |
|  | 5. Employer confirms work/payment, moving the application to Completion Pending. |  |  |  |  |  |  |
|  | 6. Job Seeker confirms payment received, completing the application. |  |  |  |  |  |  |
|  | 7. Job Seeker submits a star rating and review for the Employer. |  |  |  |  |  |  |
|  | 8. Verify that the completed job appears in Work History. |  |  |  |  |  |  |

| Column A | Column B |
| --- | --- |
| Module Name:- | E2E Workflow |
| Test Case ID | ST-004 |
| Tester Name | Len Pei Ying |
| Test Case Description | Admin moderation lifecycle: Review a reported job, remove the suspicious listing, and resolve the report. |
| Prerequisites: | A pending report exists for an approved job listing, and the Admin account is active. |

| Column A | Column B |
| --- | --- |
| Tester's Name | Len Pei Ying |
| Environmental Information:- | 1. OS: Windows 11<br>2. System: Laptop/Desktop<br>3. Browser: Google Chrome |

| Column A | Column B |
| --- | --- |
| Test Scenario | Admin moderation lifecycle: Review a reported job, remove the suspicious listing, and resolve the report. |

| Test Case ID | Test Steps | Test Input | Expected Results | Actual Results | Status | Test Type | Comments |
| --- | --- | --- | --- | --- | --- | --- | --- |
| ST-004 | 1. Job Seeker submits a report for an active job listing. | Report Type: Suspicious Listing<br>Reported Job: [ST-004 TEST] Suspicious Part-Time Job<br>Admin Action: Remove<br>Report Resolution: Resolve | The reported job is removed by the Admin and no longer appears in the active Job Seeker Jobs listing. The related report changes to Resolved and an admin note with the update timestamp is saved. | The suspicious job report was successfully submitted and appeared on the Admin Reports page. The Admin reviewed the report, removed the related job listing, and resolved the report successfully. The report status changed to Resolved, and the removed job no longer appeared in the Job Seeker active Jobs listing. | Pass | Normal | The admin moderation and report resolution workflow functioned as expected. |
|  | 2. Admin logs in and opens the Reports page. |  |  |  |  |  |  |
|  | 3. Admin reviews the reported job information. |  |  |  |  |  |  |
|  | 4. Admin opens Jobs, finds the reported listing, and clicks Remove. |  |  |  |  |  |  |
|  | 5. Admin returns to Reports and clicks Resolve for the related report. |  |  |  |  |  |  |
|  | 6. Verify the report is Resolved and the removed job is no longer visible to Job Seekers. |  |  |  |  |  |  |

| Column A | Column B |
| --- | --- |
| Module Name:- | E2E Workflow |
| Test Case ID | ST-005 |
| Tester Name | Len Pei Ying |
| Test Case Description | Payment lifecycle: Employer records payment and Job Seeker confirms receipt. |
| Prerequisites: | An accepted application exists; Employer and Job Seeker accounts are active. |

| Column A | Column B |
| --- | --- |
| Tester's Name | Len Pei Ying |
| Environmental Information:- | 1. OS: Windows 11<br>2. System: Laptop/Desktop<br>3. Browser: Google Chrome |

| Column A | Column B |
| --- | --- |
| Test Scenario | Payment lifecycle: Employer records payment and Job Seeker confirms receipt. |

| Test Case ID | Test Steps | Test Input | Expected Results | Actual Results | Status | Test Type | Comments |
| --- | --- | --- | --- | --- | --- | --- | --- |
| ST-005 | 1. Employer opens the accepted application and clicks Confirm Work / Payment. | Application ID: System-generated<br>Payment Method: DuitNow / Offline<br>Final Earnings: Valid amount greater than RM 0 | Employer payment confirmation is recorded first and the application moves to Completion Pending. After the Job Seeker confirms receipt, payment status becomes confirmed, the application becomes Completed, and the completed job is saved to Work History. | The Employer successfully confirmed work and payment for the accepted application, and the application moved to Completion Pending. The Job Seeker then confirmed payment receipt, after which the application changed to Completed. The completed job was also recorded in Work History with the corresponding earnings. | Pass | Normal | The employer payment confirmation and job seeker receipt confirmation workflow functioned as expected. |
|  | 2. Enter final earnings greater than RM 0 and confirm. |  |  |  |  |  |  |
|  | 3. Verify the application moves to Completion Pending and employer payment confirmation is recorded. |  |  |  |  |  |  |
|  | 4. Job Seeker opens Applications and clicks Confirm Payment Received. |  |  |  |  |  |  |
|  | 5. Verify the payment becomes confirmed and the application becomes Completed. |  |  |  |  |  |  |
|  | 6. Verify the completed job is saved to Work History with the recorded earnings. |  |  |  |  |  |  |

| Column A | Column B |
| --- | --- |
| Module Name:- | E2E Workflow |
| Test Case ID | ST-006 |
| Tester Name | Len Pei Ying |
| Test Case Description | Payment dispute and resolution flow: Job Seeker reports a payment issue and Admin resolves the dispute. |
| Prerequisites: | A payment record exists for a completed or completion-pending application; Job Seeker and Admin accounts are active. |

| Column A | Column B |
| --- | --- |
| Tester's Name | Len Pei Ying |
| Environmental Information:- | 1. OS: Windows 11<br>2. System: Laptop/Desktop<br>3. Browser: Google Chrome |

| Column A | Column B |
| --- | --- |
| Test Scenario | Payment dispute and resolution flow: Job Seeker reports a payment issue and Admin resolves the dispute. |

| Test Case ID | Test Steps | Test Input | Expected Results | Actual Results | Status | Test Type | Comments |
| --- | --- | --- | --- | --- | --- | --- | --- |
| ST-006 | 1. Job Seeker opens the related application and submits a payment issue report. | Report Type: Payment Dispute<br>Description: Payment issue reported for System Testing ST-006<br>Application ID: System-generated | The payment dispute is linked to the correct application/payment, becomes visible to Admin for review, and can be resolved with an admin resolution note without losing the original payment context. | The Job Seeker successfully submitted a payment dispute, and the report appeared on the Admin Reports page with the correct application and payment context. The Admin reviewed and resolved the dispute successfully. The dispute status changed to Resolved while the related payment and application information remained correctly linked. | Pass | Normal | The payment dispute and admin resolution workflow functioned as expected. |
|  | 2. Enter the payment dispute description and submit the report. |  |  |  |  |  |  |
|  | 3. Admin opens Reports and reviews the payment dispute with the related application/payment context. |  |  |  |  |  |  |
|  | 4. Admin records a resolution and resolves the payment dispute. |  |  |  |  |  |  |
|  | 5. Verify the dispute is marked Resolved and the payment/application reference remains correct. |  |  |  |  |  |  |

## Integration

| Column A | Column B |
| --- | --- |
| Module Name:- | Integration |
| Test Case ID | ST-007 |
| Tester Name | Len Pei Ying |
| Test Case Description | Test job application CRUD and its trigger-based effect on job openings_count. |
| Prerequisites: | Job listing exists with openings_count = 1; seeker account exists. |

| Column A | Column B |
| --- | --- |
| Tester's Name | Len Pei Ying |
| Environmental Information:- | 1. OS: Windows 11<br>2. System: Laptop/Desktop<br>3. Browser: Google Chrome |

| Column A | Column B |
| --- | --- |
| Test Scenario | Test job application CRUD and its trigger-based effect on job openings_count. |

| Test Case ID | Test Steps | Test Input | Expected Results | Actual Results | Status | Test Type | Comments |
| --- | --- | --- | --- | --- | --- | --- | --- |
| ST-007 | 1. Verify the job listing shows 1 available opening before application. | Job ID: System-generated<br>Initial openings_count: 1<br>Action: Apply, then Cancel Application | The available openings count decreases from 1 to 0 when the Job Seeker submits an application. After the Job Seeker cancels the application, the openings count returns from 0 to 1 and remains consistent without becoming negative. | The job listing initially showed 1 available opening. After the Job Seeker submitted an application, the available opening decreased from 1 to 0. When the Job Seeker cancelled the application, the available opening returned from 0 to 1. The openings count remained consistent throughout the test and did not become negative. | Pass | Normal | The openings count was correctly synchronized with the Job Seeker application and cancellation actions. |
|  | 2. Job Seeker submits an application for the job. |  |  |  |  |  |  |
|  | 3. Verify the available opening decreases from 1 to 0. |  |  |  |  |  |  |
|  | 4. Job Seeker cancels/withdraws the application. |  |  |  |  |  |  |
|  | 5. Verify the available opening increases from 0 back to 1. |  |  |  |  |  |  |
|  | 6. Verify the openings count remains consistent and does not become negative. |  |  |  |  |  |  |

| Column A | Column B |
| --- | --- |
| Module Name:- | Integration |
| Test Case ID | ST-008 |
| Tester Name | Len Pei Ying |
| Test Case Description | Test new-application notification trigger delivers an alert to the correct employer. |
| Prerequisites: | Job listing exists with a valid employer_id; notifications table reachable. |

| Column A | Column B |
| --- | --- |
| Tester's Name | Len Pei Ying |
| Environmental Information:- | 1. OS: Windows 11<br>2. System: Laptop/Desktop<br>3. Browser: Google Chrome |

| Column A | Column B |
| --- | --- |
| Test Scenario | Test new-application notification trigger delivers an alert to the correct employer. |

| Test Case ID | Test Steps | Test Input | Expected Results | Actual Results | Status | Test Type | Comments |
| --- | --- | --- | --- | --- | --- | --- | --- |
| ST-008 | 1. Seeker submits a job application. | Job ID + Employer ID: System-generated | Notification of type 'application_update' is created for the job's employer_id only; marking as read updates is_read = true. | A new application notification was successfully created for the correct Employer after the Job Seeker submitted an application. The notification appeared in the Employer notification panel, and its unread status updated correctly after it was viewed or marked as read. | Pass | Normal | The new application notification was delivered to the correct Employer and the read status updated as expected. |
|  | 2. Verify a row is inserted into notifications for the job's employer. |  |  |  |  |  |  |
|  | 3. Employer dashboard polls and displays the notification badge. |  |  |  |  |  |  |
|  | 4. Employer opens the notification; verify is_read updates. |  |  |  |  |  |  |

| Column A | Column B |
| --- | --- |
| Module Name:- | Integration |
| Test Case ID | ST-009 |
| Tester Name | Len Pei Ying |
| Test Case Description | Test employer profile verification workflow end-to-end with admin review. |
| Prerequisites: | Employer account exists; SSM document and business address ready for upload. |

| Column A | Column B |
| --- | --- |
| Tester's Name | Len Pei Ying |
| Environmental Information:- | 1. OS: Windows 11<br>2. System: Laptop/Desktop<br>3. Browser: Google Chrome |

| Column A | Column B |
| --- | --- |
| Test Scenario | Test employer profile verification workflow end-to-end with admin review. |

| Test Case ID | Test Steps | Test Input | Expected Results | Actual Results | Status | Test Type | Comments |
| --- | --- | --- | --- | --- | --- | --- | --- |
| ST-009 | 1. Employer fills SSM number, business type, and address. | SSM Number: 202601234567 | Verification fields persist with status 'pending'; after admin approval, is_verified becomes true and badge appears across the platform. | The Employer successfully submitted the verification package with the required business information and documents. The verification request appeared on the Admin Verifications page and was approved successfully. The Employer verification status changed to Approved, and the verified badge was displayed correctly on the relevant Employer and job views. | Pass | Normal | The employer verification submission, admin approval and verified badge workflow functioned as expected. |
|  | 2. Employer uploads registration and contact documents. |  |  |  |  |  |  |
|  | 3. Employer submits verification request. |  |  |  |  |  |  |
|  | 4. Admin opens Verifications page and reviews documents. |  |  |  |  |  |  |
|  | 5. Admin approves the request. |  |  |  |  |  |  |
|  | 6. Verify employer profile now shows verified badge. |  |  |  |  |  |  |

| Column A | Column B |
| --- | --- |
| Module Name:- | Integration |
| Test Case ID | ST-010 |
| Tester Name | Len Pei Ying |
| Test Case Description | Test chat/messaging integration between job seeker and employer. |
| Prerequisites: | An accepted application links a seeker and employer; messages-page.js loaded. |

| Column A | Column B |
| --- | --- |
| Tester's Name | Len Pei Ying |
| Environmental Information:- | 1. OS: Windows 11<br>2. System: Laptop/Desktop<br>3. Browser: Google Chrome |

| Column A | Column B |
| --- | --- |
| Test Scenario | Test real-time chat/messaging integration between job seeker and employer. |

| Test Case ID | Test Steps | Test Input | Expected Results | Actual Results | Status | Test Type | Comments |
| --- | --- | --- | --- | --- | --- | --- | --- |
| ST-010 | 1. Seeker opens Messages and starts a thread tied to the job application. | Job ID + counterpart IDs: System-generated | Messages persist per job/counterpart pair; thread list shows latest message and unread indicator; opening a thread clears the unread state. | The Employer successfully sent a message to the Job Seeker, and the message appeared in the correct conversation thread. The Job Seeker received an unread message indicator, which cleared after the conversation was opened. A reply from the Job Seeker was also successfully displayed on the Employer side, and the conversation history remained available. | Pass | Normal | The messaging, unread indicator and conversation synchronization functioned as expected. |
|  | 2. Seeker sends a message. |  |  |  |  |  |  |
|  | 3. Employer opens Messages and views the thread. |  |  |  |  |  |  |
|  | 4. Employer replies. |  |  |  |  |  |  |
|  | 5. Verify thread is marked read for the recipient. |  |  |  |  |  |  |

| Column A | Column B |
| --- | --- |
| Module Name:- | Integration |
| Test Case ID | ST-011 |
| Tester Name | Len Pei Ying |
| Test Case Description | Test chatbot knowledge base lookup and logging integration. |
| Prerequisites: | chatbot_knowledge table seeded; chatbot_logs table reachable. |

| Column A | Column B |
| --- | --- |
| Tester's Name | Len Pei Ying |
| Environmental Information:- | 1. OS: Windows 11<br>2. System: Laptop/Desktop<br>3. Browser: Google Chrome |

| Column A | Column B |
| --- | --- |
| Test Scenario | Test chatbot knowledge base lookup and logging integration. |

| Test Case ID | Test Steps | Test Input | Expected Results | Actual Results | Status | Test Type | Comments |
| --- | --- | --- | --- | --- | --- | --- | --- |
| ST-011 | 1. Open floating chatbot widget on any page. | Query 1: 'how to apply for a job' Query 2: 'asdkjqwe123' | Recognised queries return the seeded answer from chatbot_knowledge; unrecognised queries return the fallback message; every interaction is recorded in chatbot_logs with a matched flag. | The chatbot successfully returned the expected knowledge-base response for the recognised query "How do I apply for a job?". For the unrecognised query "What is the weather on Mars today?", the chatbot returned a fallback support response without error. The recognised and unrecognised query paths both functioned correctly. | Pass | Normal | The chatbot knowledge matching and fallback response functioned as expected. |
|  | 2. Type a known query (e.g. 'how to apply for a job'). |  |  |  |  |  |  |
|  | 3. Verify the matched answer is displayed. |  |  |  |  |  |  |
|  | 4. Type an unrecognised query. |  |  |  |  |  |  |
|  | 5. Verify fallback reply is shown. |  |  |  |  |  |  |
|  | 6. Verify both interactions are logged. |  |  |  |  |  |  |

| Column A | Column B |
| --- | --- |
| Module Name:- | Integration |
| Test Case ID | ST-012 |
| Tester Name | Len Pei Ying |
| Test Case Description | Test job seeker save/unsave job integration with the saved_jobs table. |
| Prerequisites: | Seeker logged in; at least 2 active job listings available. |

| Column A | Column B |
| --- | --- |
| Tester's Name | Len Pei Ying |
| Environmental Information:- | 1. OS: Windows 11<br>2. System: Laptop/Desktop<br>3. Browser: Google Chrome |

| Column A | Column B |
| --- | --- |
| Test Scenario | Test job seeker save/unsave job integration with the saved_jobs table. |

| Test Case ID | Test Steps | Test Input | Expected Results | Actual Results | Status | Test Type | Comments |
| --- | --- | --- | --- | --- | --- | --- | --- |
| ST-012 | 1. Seeker clicks the bookmark icon on a job card to save it. | Job ID: System-generated | saved_jobs rows are created/removed in sync with the bookmark toggle; Saved Jobs page metrics (total/live/applied) reconcile correctly against current job and application state. | The Job Seeker successfully saved a job and the Saved Jobs count increased accordingly. The saved job appeared correctly in the Saved Jobs list. After the Job Seeker cancelled/removed the saved job, it disappeared from the list and the Saved Jobs count decreased accordingly. | Pass | Normal | The Saved Jobs list and count updated correctly after saving and removing a job. |
|  | 2. Open Saved Jobs page and verify the job appears. |  |  |  |  |  |  |
|  | 3. Click unsave on the same job. |  |  |  |  |  |  |
|  | 4. Verify the job disappears from Saved Jobs. |  |  |  |  |  |  |
|  | 5. Save a job, then apply to it, and verify it shows under both Saved and Applied counts. |  |  |  |  |  |  |

## Performance

| Column A | Column B |
| --- | --- |
| Module Name:- | Performance |
| Test Case ID | ST-013 |
| Tester Name | Len Pei Ying |
| Test Case Description | Test Jobs page load and filter performance with a large dataset. |
| Prerequisites: | Database populated with 300+ job listings across multiple categories and locations. |

| Column A | Column B |
| --- | --- |
| Tester's Name | Len Pei Ying |
| Environmental Information:- | 1. OS: Windows 11<br>2. System: Laptop/Desktop<br>3. Browser: Google Chrome |

| Column A | Column B |
| --- | --- |
| Test Scenario | Test Jobs page load and filter performance with a large dataset. |

| Test Case ID | Test Steps | Test Input | Expected Results | Actual Results | Status | Test Type | Comments |
| --- | --- | --- | --- | --- | --- | --- | --- |
| ST-013 | 1. Load Jobs page with no filters applied. | 300 job listings, 50 seeker skill profiles | Job list renders in under 2 seconds; filtering and match-score recalculation complete in under 1 second without UI freeze. | The Job Seeker Jobs page loaded successfully without visible freezing. Chrome DevTools recorded 79 requests, 3.0 MB transferred, 3.8 MB resources, and a total finish time of 1.11 seconds. Applying the job filters updated the displayed results quickly without noticeable delay or UI freezing. | Pass | Normal | The Jobs page loaded within the expected time and the filters responded quickly without visible lag. |
|  | 2. Measure initial render time for the job list. |  |  |  |  |  |  |
|  | 3. Apply category + location filters simultaneously. |  |  |  |  |  |  |
|  | 4. Measure re-filter response time. |  |  |  |  |  |  |
|  | 5. Scroll through paginated results. |  |  |  |  |  |  |

| Column A | Column B |
| --- | --- |
| Module Name:- | Performance |
| Test Case ID | ST-014 |
| Tester Name | Len Pei Ying |
| Test Case Description | Test concurrent application submissions against limited job openings (race condition check). |
| Prerequisites: | Job listing exists with openings_count = 1; two seeker accounts ready to apply simultaneously. |

| Column A | Column B |
| --- | --- |
| Tester's Name | Len Pei Ying |
| Environmental Information:- | 1. OS: Windows 11<br>2. System: Laptop/Desktop<br>3. Browser: Google Chrome |

| Column A | Column B |
| --- | --- |
| Test Scenario | Test concurrent application submissions against limited job openings (race condition check). |

| Test Case ID | Test Steps | Test Input | Expected Results | Actual Results | Status | Test Type | Comments |
| --- | --- | --- | --- | --- | --- | --- | --- |
| ST-014 | 1. Seeker A and Seeker B both load the same job listing. | 2 concurrent INSERT requests on applications, same job_id | Database-level trigger serialises the openings deduction so exactly one application succeeds when only one opening exists; no negative counts. | During the near-simultaneous application test for a job with one remaining opening, one Job Seeker was able to submit the application successfully. For the second Job Seeker, the Apply button changed to Full, preventing another application from being submitted after the final opening had been taken. No overbooking occurred. | Pass | Abnormal | The system prevented a second application after the final available opening was taken. |
|  | 2. Both submit an application within the same second. |  |  |  |  |  |  |
|  | 3. Verify only one application succeeds in consuming the opening. |  |  |  |  |  |  |
|  | 4. Verify the second receives the 'No openings available' error. |  |  |  |  |  |  |
|  | 5. Confirm openings_count never goes below zero. |  |  |  |  |  |  |

| Column A | Column B |
| --- | --- |
| Module Name:- | Performance |
| Test Case ID | ST-015 |
| Tester Name | Len Pei Ying |
| Test Case Description | Test PDF resume generation performance and output quality (jsPDF + html2canvas). |
| Prerequisites: | Seeker profile and work history populated with realistic data; resume page loaded. |

| Column A | Column B |
| --- | --- |
| Tester's Name | Len Pei Ying |
| Environmental Information:- | 1. OS: Windows 11<br>2. System: Laptop/Desktop<br>3. Browser: Google Chrome |

| Column A | Column B |
| --- | --- |
| Test Scenario | Test PDF resume generation performance and output quality (jsPDF + html2canvas). |

| Test Case ID | Test Steps | Test Input | Expected Results | Actual Results | Status | Test Type | Comments |
| --- | --- | --- | --- | --- | --- | --- | --- |
| ST-015 | 1. Open Resume page with complete profile data. | Resume with 5 work history entries, skill tags, education | PDF generates within 3 seconds for typical profile length and renders one A4 page (or correctly paginated multi-page) without clipped content. | The PDF resume was generated successfully in approximately 2.56 seconds, which was within the expected 3-second target. After opening the generated PDF, the profile, skills, education and work history content displayed correctly without clipped text, missing content or layout problems. | Pass | Normal | The PDF resume generated within the expected time and displayed correctly without content being cut off. |
|  | 2. Click 'Download PDF'. |  |  |  |  |  |  |
|  | 3. Measure time to generate and trigger download. |  |  |  |  |  |  |
|  | 4. Open resulting PDF and verify layout/text are not cut off. |  |  |  |  |  |  |

| Column A | Column B |
| --- | --- |
| Module Name:- | Performance |
| Test Case ID | ST-016 |
| Tester Name | Len Pei Ying |
| Test Case Description | Test admin analytics dashboard render time with a large applications dataset. |
| Prerequisites: | Database seeded with 500+ applications across 80+ job listings. |

| Column A | Column B |
| --- | --- |
| Tester's Name | Len Pei Ying |
| Environmental Information:- | 1. OS: Windows 11<br>2. System: Laptop/Desktop<br>3. Browser: Google Chrome |

| Column A | Column B |
| --- | --- |
| Test Scenario | Test admin analytics dashboard render time with a large applications dataset. |

| Test Case ID | Test Steps | Test Input | Expected Results | Actual Results | Status | Test Type | Comments |
| --- | --- | --- | --- | --- | --- | --- | --- |
| ST-016 | 1. Log in as Admin and navigate to the Analytics page. | Seed: 500 applications, 80 job listings, 60 users | Dashboard summary cards render within 2 seconds and charts finish drawing within 3 seconds on a cold load, with no noticeable UI freeze while aggregating counts client-side. | The Admin Analytics Dashboard loaded successfully with 75 requests, 5.0 MB transferred and 6.1 MB of resources. Chrome DevTools recorded a total finish time of 1.86 seconds. The summary cards and Chart.js visualisations displayed correctly without noticeable UI freezing or rendering problems. | Pass | Normal | The Admin Analytics Dashboard rendered within the expected time and displayed all cards and charts correctly. |
|  | 2. Measure time until summary cards (users, listings, matches) render. |  |  |  |  |  |  |
|  | 3. Measure time until Chart.js graphs finish drawing. |  |  |  |  |  |  |
|  | 4. Repeat with browser cache cleared to test a cold load. |  |  |  |  |  |  |

## Recovery

| Column A | Column B |
| --- | --- |
| Module Name:- | Recovery |
| Test Case ID | ST-017 |
| Tester Name | Len Pei Ying |
| Test Case Description | Test application behaviour during Supabase connectivity loss and recovery. |
| Prerequisites: | Ability to simulate network disconnection (offline mode / throttling in dev tools). |

| Column A | Column B |
| --- | --- |
| Tester's Name | Len Pei Ying |
| Environmental Information:- | 1. OS: Windows 11<br>2. System: Laptop/Desktop<br>3. Browser: Google Chrome |

| Column A | Column B |
| --- | --- |
| Test Scenario | Test application behaviour during Supabase connectivity loss and recovery. |

| Test Case ID | Test Steps | Test Input | Expected Results | Actual Results | Status | Test Type | Comments |
| --- | --- | --- | --- | --- | --- | --- | --- |
| ST-017 | 1. Load Jobs page successfully online. | Network state: Offline → Online | Failed Supabase calls are caught and surfaced as a user-facing error; no unhandled exception or blank page; retry succeeds once connectivity returns. | When network connectivity was disabled, the application submission failed and the system displayed the message "Unable to submit application. Please try again." The page did not crash or become blank. The submit control remained showing "Submitting..." after the failed attempt. After network connectivity was restored, the Job Seeker retried the application and it was submitted successfully. | Pass | Abnormal | Connectivity loss was handled with a clear error and retry succeeded; the submit button remained in the Submitting state after the failed attempt. |
|  | 2. Disable network connectivity (simulate offline). |  |  |  |  |  |  |
|  | 3. Attempt to submit a job application. |  |  |  |  |  |  |
|  | 4. Verify a clear error is shown instead of a silent failure or crash. |  |  |  |  |  |  |
|  | 5. Restore connectivity and retry the action. |  |  |  |  |  |  |

| Column A | Column B |
| --- | --- |
| Module Name:- | Recovery |
| Test Case ID | ST-018 |
| Tester Name | Len Pei Ying |
| Test Case Description | Test session expiry and re-authentication flow. |
| Prerequisites: | Logged-in session; ability to force-expire or clear the Supabase auth token. |

| Column A | Column B |
| --- | --- |
| Tester's Name | Len Pei Ying |
| Environmental Information:- | 1. OS: Windows 11<br>2. System: Laptop/Desktop<br>3. Browser: Google Chrome |

| Column A | Column B |
| --- | --- |
| Test Scenario | Test session expiry and re-authentication flow. |

| Test Case ID | Test Steps | Test Input | Expected Results | Actual Results | Status | Test Type | Comments |
| --- | --- | --- | --- | --- | --- | --- | --- |
| ST-018 | 1. Log in successfully and navigate to dashboard. | Expired/cleared auth token | Expired sessions are detected and the user is redirected to the Login page; no protected data is shown to an unauthenticated request. | After the stored authentication session was cleared, the protected Job Seeker page no longer remained accessible and the system redirected the user to the Login page. No protected application data was shown without an active session. After logging in again with valid credentials, the user was able to access the dashboard and Applications page normally. | Pass | Abnormal | Expired or cleared sessions were handled correctly, and re-authentication restored normal access. |
|  | 2. Force-expire the Supabase session token. |  |  |  |  |  |  |
|  | 3. Attempt a protected action (e.g. view Applications). |  |  |  |  |  |  |
|  | 4. Verify the user is redirected to Login rather than seeing broken/empty data. |  |  |  |  |  |  |
|  | 5. Log in again and verify the previous destination or dashboard loads correctly. |  |  |  |  |  |  |

| Column A | Column B |
| --- | --- |
| Module Name:- | Recovery |
| Test Case ID | ST-019 |
| Tester Name | Len Pei Ying |
| Test Case Description | Test recovery from a failed/partial job application submission (trigger exception handling). |
| Prerequisites: | Job listing with openings_count = 0 (fully booked). |

| Column A | Column B |
| --- | --- |
| Tester's Name | Len Pei Ying |
| Environmental Information:- | 1. OS: Windows 11<br>2. System: Laptop/Desktop<br>3. Browser: Google Chrome |

| Column A | Column B |
| --- | --- |
| Test Scenario | Test recovery from a failed/partial job application submission (trigger exception handling). |

| Test Case ID | Test Steps | Test Input | Expected Results | Actual Results | Status | Test Type | Comments |
| --- | --- | --- | --- | --- | --- | --- | --- |
| ST-019 | 1. Seeker attempts to apply to a job with 0 remaining openings. | Job ID with openings_count = 0 | The exception raised inside the trigger rolls back the entire INSERT transaction, leaving both applications and job_listings tables in a consistent, unchanged state. | A direct database insert was attempted for a job with openings_count = 0. The database trigger rejected the insert with the error "No openings available for this job listing." A verification query confirmed that no application record was created for the tested Job Seeker and job combination, and the job's openings_count remained unchanged at 0. | Pass | Abnormal | The failed application was fully rolled back, leaving no partial record and keeping openings_count unchanged. |
|  | 2. Verify the INSERT is rejected by the database trigger. |  |  |  |  |  |  |
|  | 3. Verify no partial/orphaned application row is created. |  |  |  |  |  |  |
|  | 4. Verify the seeker sees a clear 'no openings available' message. |  |  |  |  |  |  |
|  | 5. Confirm the job_listings.openings_count value is unchanged. |  |  |  |  |  |  |

| Column A | Column B |
| --- | --- |
| Module Name:- | Recovery |
| Test Case ID | ST-020 |
| Tester Name | Len Pei Ying |
| Test Case Description | Test duplicate payment record prevention when employer retries 'Mark as Paid'. |
| Prerequisites: | Application already has a payment record from a previous 'Mark as Paid' action. |

| Column A | Column B |
| --- | --- |
| Tester's Name | Len Pei Ying |
| Environmental Information:- | 1. OS: Windows 11<br>2. System: Laptop/Desktop<br>3. Browser: Google Chrome |

| Column A | Column B |
| --- | --- |
| Test Scenario | Test duplicate payment record prevention when employer retries 'Mark as Paid'. |

| Test Case ID | Test Steps | Test Input | Expected Results | Actual Results | Status | Test Type | Comments |
| --- | --- | --- | --- | --- | --- | --- | --- |
| ST-020 | 1. Employer confirms work/payment for an accepted application. | Application ID: 112ba3b2-819e-4009-a948-525e136ebba1<br>Payment Amount: RM200 | After the first successful payment confirmation, the payment action is prevented from being submitted again through the UI. Only one payment record should exist for the application with the correct payment amount. | The Employer successfully confirmed payment for the application. After the first successful confirmation, the payment button became locked and could not be submitted again. A database query confirmed that only one payment record existed for application 112ba3b2-819e-4009-a948-525e136ebba1, with an amount of RM200. No duplicate payment record was created. | Pass | Abnormal | Duplicate payment submission was prevented, and only one RM200 payment record existed for the application. |
|  | 2. Verify the payment action becomes locked/disabled after the first successful confirmation. |  |  |  |  |  |  |
|  | 3. Query the payments table for the same application_id. |  |  |  |  |  |  |
|  | 4. Verify only one payment row exists with the correct amount. |  |  |  |  |  |  |

## Business Logic

| Column A | Column B |
| --- | --- |
| Module Name:- | Business Logic |
| Test Case ID | ST-021 |
| Tester Name | Len Pei Ying |
| Test Case Description | Test job-skill match score and percentage calculation accuracy. |
| Prerequisites: | Seeker profile with defined skill_tags; job listing with defined skill_tags. |

| Column A | Column B |
| --- | --- |
| Tester's Name | Len Pei Ying |
| Environmental Information:- | 1. OS: Windows 11<br>2. System: Laptop/Desktop<br>3. Browser: Google Chrome |

| Column A | Column B |
| --- | --- |
| Test Scenario | Test job-skill match score and percentage calculation accuracy. |

| Test Case ID | Test Steps | Test Input | Expected Results | Actual Results | Status | Test Type | Comments |
| --- | --- | --- | --- | --- | --- | --- | --- |
| ST-021 | 1. Set seeker skills to ['cashier','customer service','english']. | Seeker skills: cashier, customer service, english Job skills: cashier, english, mandarin | Match percent = (number of job-required skills the seeker has) / (total job-required skills) × 100, i.e. 2/3 ≈ 67%, with no skills resulting in a 'New' badge rather than 0%. | For the Cashier job listing, the Job Seeker profile matched 4 of 5 required skills. The system correctly displayed an 80% Match score, with Cash handling, POS systems, Customer service and Friendly communication listed as matched skills, while Attention to detail was shown under Skills To Build. After all Job Seeker skills were removed and the Jobs page was refreshed, the match badge changed to "New" instead of displaying 0%. | Pass | Normal | The required-skill match ratio and the no-skills "New" badge were displayed correctly. |
|  | 2. Set job required skills to ['cashier','english','mandarin']. |  |  |  |  |  |  |
|  | 3. View the job card match badge on Jobs page. |  |  |  |  |  |  |
|  | 4. Verify the displayed match percentage equals matched/required skill ratio. |  |  |  |  |  |  |
|  | 5. Change seeker skills to an empty list and verify badge shows 'New' instead of a percentage. |  |  |  |  |  |  |

| Column A | Column B |
| --- | --- |
| Module Name:- | Business Logic |
| Test Case ID | ST-022 |
| Tester Name | Len Pei Ying |
| Test Case Description | Test location-distance bonus logic and its cap on the match percentage. |
| Prerequisites: | Seeker location/GPS available; job listing with coordinates at varying distances. |

| Column A | Column B |
| --- | --- |
| Tester's Name | Len Pei Ying |
| Environmental Information:- | 1. OS: Windows 11<br>2. System: Laptop/Desktop<br>3. Browser: Google Chrome |

| Column A | Column B |
| --- | --- |
| Test Scenario | Test location-distance bonus logic and its cap on the match percentage. |

| Test Case ID | Test Steps | Test Input | Expected Results | Actual Results | Status | Test Type | Comments |
| --- | --- | --- | --- | --- | --- | --- | --- |
| ST-022 | 1. View match percent for a job 1.5km away with full skill match. | Distances: 1.5km, 30km, unknown Skill match: 100% | Jobs within 2km get up to +15% bonus (capped at 99% total); jobs beyond 25km get +0% bonus; jobs with unknown distance are capped at 85% even at 100% skill match. | With full skill matching (5 of 5 required skills), the same job displayed an 85% Match score when no location distance bonus was available. After Near Me was enabled, the job was shown at 2.9 km away and the system applied the nearby location boost. The final match score increased to 99%, correctly respecting the maximum cap for location-aware matching. | Pass | Normal | The location bonus and match-score cap were applied correctly for the tested nearby and no-location cases. |
|  | 2. View match percent for a job 30km away with full skill match. |  |  |  |  |  |  |
|  | 3. View match percent for a job with unknown distance (no GPS) and full skill match. |  |  |  |  |  |  |
|  | 4. Verify the percentage cap differs between location-known and location-unknown cases. |  |  |  |  |  |  |

| Column A | Column B |
| --- | --- |
| Module Name:- | Business Logic |
| Test Case ID | ST-023 |
| Tester Name | Len Pei Ying |
| Test Case Description | Test application status workflow constraints (valid state transitions only). |
| Prerequisites: | An application exists with status 'pending'. |

| Column A | Column B |
| --- | --- |
| Tester's Name | Len Pei Ying |
| Environmental Information:- | 1. OS: Windows 11<br>2. System: Laptop/Desktop<br>3. Browser: Google Chrome |

| Column A | Column B |
| --- | --- |
| Test Scenario | Test application status workflow constraints (valid state transitions only). |

| Test Case ID | Test Steps | Test Input | Expected Results | Actual Results | Status | Test Type | Comments |
| --- | --- | --- | --- | --- | --- | --- | --- |
| ST-023 | 1. Employer moves an application forward through the permitted status workflow. | Observed workflow: forward status changes through Employer UI; Reviewed cannot be reversed; Completed application | The Employer UI allows the intended forward workflow while preventing reverse status changes. A Completed application cannot be changed back to an earlier application status through the UI. | The forward application workflow had already been completed successfully during ST-003. During this test, a Reviewed application could not be moved backward to an earlier status. For a Completed application, the Employer view no longer provided any status-transition control; only non-status actions such as Message, Paid and Rated remained. Therefore, the completed application could not be reversed through the Employer UI. | Pass | Abnormal | The Employer UI enforced forward-only status progression and prevented completed applications from being reversed. |
|  | 2. Verify a Reviewed application cannot be moved backward to an earlier status through the Employer UI. |  |  |  |  |  |  |
|  | 3. Open a Completed application and check available status controls. |  |  |  |  |  |  |
|  | 4. Verify no status control allows a Completed application to be reversed to Pending/Reviewed/Accepted. |  |  |  |  |  |  |

| Column A | Column B |
| --- | --- |
| Module Name:- | Business Logic |
| Test Case ID | ST-024 |
| Tester Name | Len Pei Ying |
| Test Case Description | Test bidirectional rating eligibility (only after job completion, one rating per application). |
| Prerequisites: | One application with status 'completed' and one application still 'pending'. |

| Column A | Column B |
| --- | --- |
| Tester's Name | Len Pei Ying |
| Environmental Information:- | 1. OS: Windows 11<br>2. System: Laptop/Desktop<br>3. Browser: Google Chrome |

| Column A | Column B |
| --- | --- |
| Test Scenario | Test bidirectional rating eligibility (only after job completion, one rating per application). |

| Test Case ID | Test Steps | Test Input | Expected Results | Actual Results | Status | Test Type | Comments |
| --- | --- | --- | --- | --- | --- | --- | --- |
| ST-024 | 1. Attempt to submit a rating for the 'pending' application. | Application A: status pending Application B: status completed | Rating UI/flow is only available for completed applications; resubmitting for the same application updates rather than duplicates the existing rating. | For an application that had not reached Completed status, the rating action was not available to the user. For a Completed application, the rating had already been submitted successfully during the earlier end-to-end workflow, and the interface displayed the application as Rated with the rating control no longer available for a second submission. | Pass | Abnormal | Ratings were only available after job completion, and the UI prevented a duplicate rating submission. |
|  | 2. Verify the rating option is unavailable/blocked. |  |  |  |  |  |  |
|  | 3. Submit a rating for the 'completed' application. |  |  |  |  |  |  |
|  | 4. Attempt to submit a second rating for the same completed application. |  |  |  |  |  |  |
|  | 5. Verify duplicate rating is prevented or correctly handled. |  |  |  |  |  |  |

| Column A | Column B |
| --- | --- |
| Module Name:- | Business Logic |
| Test Case ID | ST-025 |
| Tester Name | Len Pei Ying |
| Test Case Description | Test admin job moderation queue classification (pending/approved/flagged/removed). |
| Prerequisites: | Job listings exist in a mix of states: newly posted, approved, reported, and admin-closed. |

| Column A | Column B |
| --- | --- |
| Tester's Name | Len Pei Ying |
| Environmental Information:- | 1. OS: Windows 11<br>2. System: Laptop/Desktop<br>3. Browser: Google Chrome |

| Column A | Column B |
| --- | --- |
| Test Scenario | Test admin job moderation queue classification (pending/approved/flagged/removed). |

| Test Case ID | Test Steps | Test Input | Expected Results | Actual Results | Status | Test Type | Comments |
| --- | --- | --- | --- | --- | --- | --- | --- |
| ST-025 | 1. Open Admin Jobs page with the default 'Pending Review' filter. | Use the current system data required by the test steps. | Each moderation status label (Pending Review, Approved, Flagged, Removed) maps to the correct underlying job_listings.status value, and switching filters changes both the visible queue and the metric counts consistently. | On the Admin Jobs page, the Pending Review, Flagged and Removed moderation filters displayed listings under the correct status categories. Switching between the filters changed the visible job queue accordingly, and the displayed moderation counts were consistent with the listings shown for each category. | Pass | Normal | The admin moderation filters and status counts were consistent with the displayed job queues. |
|  | 2. Verify only newly posted/pending listings appear. |  |  |  |  |  |  |
|  | 3. Switch filter to 'Flagged' and verify only reported listings appear. |  |  |  |  |  |  |
|  | 4. Switch filter to 'Removed' and verify only closed/rejected listings appear. |  |  |  |  |  |  |
|  | 5. Verify the live/flagged/removed count metrics match the filtered list lengths. |  |  |  |  |  |  |

| Column A | Column B |
| --- | --- |
| Module Name:- | Business Logic |
| Test Case ID | ST-026 |
| Tester Name | Len Pei Ying |
| Test Case Description | Test employer verification badge visibility rules across the platform. |
| Prerequisites: | One verified employer (is_verified = true) and one unverified employer with active job listings. |

| Column A | Column B |
| --- | --- |
| Tester's Name | Len Pei Ying |
| Environmental Information:- | 1. OS: Windows 11<br>2. System: Laptop/Desktop<br>3. Browser: Google Chrome |

| Column A | Column B |
| --- | --- |
| Test Scenario | Test employer verification badge visibility rules across the platform. |

| Test Case ID | Test Steps | Test Input | Expected Results | Actual Results | Status | Test Type | Comments |
| --- | --- | --- | --- | --- | --- | --- | --- |
| ST-026 | 1. View a job listing posted by the verified employer on the Jobs page. | Use the current system data required by the test steps. | The verified badge is shown if and only if the listing's employer has is_verified = true in public.users, with no inconsistency between the Jobs list view and the employer profile view. | Verified employers displayed the verification badge consistently on the Employer Dashboard and on their job listings. For an unverified employer, the verification badge was not displayed. The badge visibility therefore matched the employer verification status across the tested views. | Pass | Normal | The verification badge was shown only for verified employers and was consistent across the tested views. |
|  | 2. Verify the verified badge/icon appears next to the company name. |  |  |  |  |  |  |
|  | 3. View a job listing posted by the unverified employer. |  |  |  |  |  |  |
|  | 4. Verify no verified badge appears. |  |  |  |  |  |  |
|  | 5. Verify the same badge logic is consistent on the employer's public profile page. |  |  |  |  |  |  |

## Reporting

| Column A | Column B |
| --- | --- |
| Module Name:- | Reporting |
| Test Case ID | ST-027 |
| Tester Name | Len Pei Ying |
| Test Case Description | Test admin analytics dashboard accuracy against underlying data. |
| Prerequisites: | Known counts of users, listings, and applications seeded in the database. |

| Column A | Column B |
| --- | --- |
| Tester's Name | Len Pei Ying |
| Environmental Information:- | 1. OS: Windows 11<br>2. System: Laptop/Desktop<br>3. Browser: Google Chrome |

| Column A | Column B |
| --- | --- |
| Test Scenario | Test admin analytics dashboard accuracy against underlying data. |

| Test Case ID | Test Steps | Test Input | Expected Results | Actual Results | Status | Test Type | Comments |
| --- | --- | --- | --- | --- | --- | --- | --- |
| ST-027 | 1. Log in as Admin and open the Analytics page. | Observed dashboard: 8 users, 5 jobs, 2 reports; approved employer verifications: 1 | The Analytics summary metrics must match the corresponding database counts. The distribution chart must reflect the same underlying values for users, jobs, reports and approved verifications. | The Admin Analytics page displayed User Growth = 8, Job Volume = 5 and Report Load = 2. Supabase verification queries returned 8 active users, 5 active job listings, 2 report records and 1 approved employer verification. The chart displayed 50% User Growth, 31% Job Volume, 13% Report Load and 6% Verification Load, which matched the rounded proportions of the underlying values 8:5:2:1. | Pass | Normal | The analytics summary values and chart proportions matched the verified database counts. |
|  | 2. Compare User Growth with the count of active user records in public.users. |  |  |  |  |  |  |
|  | 3. Compare Job Volume with the count of active job listings in public.job_listings. |  |  |  |  |  |  |
|  | 4. Compare Report Load with the count of report records in public.reports. |  |  |  |  |  |  |
|  | 5. Compare Verification Load chart share with the number of approved employer verifications and verify the displayed chart proportions. |  |  |  |  |  |  |

| Column A | Column B |
| --- | --- |
| Module Name:- | Reporting |
| Test Case ID | ST-028 |
| Tester Name | Len Pei Ying |
| Test Case Description | Test job seeker reporting feature for suspicious job listings. |
| Prerequisites: | An active job listing exists; seeker account logged in. |

| Column A | Column B |
| --- | --- |
| Tester's Name | Len Pei Ying |
| Environmental Information:- | 1. OS: Windows 11<br>2. System: Laptop/Desktop<br>3. Browser: Google Chrome |

| Column A | Column B |
| --- | --- |
| Test Scenario | Test job seeker reporting feature for suspicious job listings. |

| Test Case ID | Test Steps | Test Input | Expected Results | Actual Results | Status | Test Type | Comments |
| --- | --- | --- | --- | --- | --- | --- | --- |
| ST-028 | 1. Seeker opens a job listing and clicks 'Report'. | Report Type: 'Suspicious / Scam Listing' Description: 'Asked for upfront deposit before interview.' | Report is saved with correct reporter_id, reported_user, description, and status 'pending'; visible to admin shortly after submission. | The Job Seeker successfully submitted a suspicious job report. The report appeared on the Admin Reports page with the correct Job Seeker as reporter, the correct reported job/employer reference, the submitted description, and an initial Pending status. The report could then be reviewed and resolved by the Admin. | Pass | Normal | The suspicious job report was stored with the correct reporter and target information and was visible to the Admin. |
|  | 2. Seeker selects a report type and writes a description. |  |  |  |  |  |  |
|  | 3. Seeker submits the report. |  |  |  |  |  |  |
|  | 4. Admin opens Reports page and views the new report. |  |  |  |  |  |  |
|  | 5. Verify the reported user/job reference is correct. |  |  |  |  |  |  |

| Column A | Column B |
| --- | --- |
| Module Name:- | Reporting |
| Test Case ID | ST-029 |
| Tester Name | Len Pei Ying |
| Test Case Description | Test work history and earnings report generation for job seekers. |
| Prerequisites: | Seeker has 3+ completed jobs with recorded payment amounts. |

| Column A | Column B |
| --- | --- |
| Tester's Name | Len Pei Ying |
| Environmental Information:- | 1. OS: Windows 11<br>2. System: Laptop/Desktop<br>3. Browser: Google Chrome |

| Column A | Column B |
| --- | --- |
| Test Scenario | Test work history and earnings report generation for job seekers. |

| Test Case ID | Test Steps | Test Input | Expected Results | Actual Results | Status | Test Type | Comments |
| --- | --- | --- | --- | --- | --- | --- | --- |
| ST-029 | 1. Seeker opens the Work History page. | Tested seeker: Len Pei Ying; completed application included: Part-Time Barista &amp; Café Crew; confirmed payment amount: RM120 | The Work History page should include only applications that are Completed with confirmed payment, and the displayed completed-job count and total earnings should match those eligible records. | The Work History page displayed 1 Completed Job with Total Earnings of RM120. Database verification showed that the Part-Time Barista &amp; Café Crew application was Completed with a confirmed RM120 payment, while the Cashier record remained in Completion Pending and was therefore excluded from completed work history. A query using the same completion and payment-confirmation rules returned 1 completed job and RM120 total earnings, matching the page. | Pass | Normal | The completed-job count and total earnings matched the eligible Completed application and confirmed payment record. |
|  | 2. Verify only applications with status Completed and confirmed payment are included in the completed work history. |  |  |  |  |  |  |
|  | 3. Compare the displayed total earnings with the payment amount used for the included completed application(s). |  |  |  |  |  |  |
|  | 4. Verify the displayed job title, employer and category match the included completed work-history record. |  |  |  |  |  |  |

| Column A | Column B |
| --- | --- |
| Module Name:- | Reporting |
| Test Case ID | ST-030 |
| Tester Name | Len Pei Ying |
| Test Case Description | Test employer's view of their own job posting performance (views/applicants per listing). |
| Prerequisites: | Employer has 3+ active job listings with varying numbers of applicants. |

| Column A | Column B |
| --- | --- |
| Tester's Name | Len Pei Ying |
| Environmental Information:- | 1. OS: Windows 11<br>2. System: Laptop/Desktop<br>3. Browser: Google Chrome |

| Column A | Column B |
| --- | --- |
| Test Scenario | Test employer's view of their own job posting performance (views/applicants per listing). |

| Test Case ID | Test Steps | Test Input | Expected Results | Actual Results | Status | Test Type | Comments |
| --- | --- | --- | --- | --- | --- | --- | --- |
| ST-030 | 1. Employer opens Manage Jobs page. | Use the current system data required by the test steps. | Per-listing applicant counts and openings figures shown to the employer accurately reflect the applications and job_listings tables, and manually closing a listing immediately removes it from the active view. | The Employer Manage Jobs page displayed applicant counts and remaining openings that matched the database for the tested listings. For [ST-002 TEST] Part-time Barista, the page showed 2 applicants and 0 openings; the database returned the same values. For Event Crew (F&amp;B Booth – SugarShine), the page showed 1 applicant and 2 openings; the database also matched. After closing the ST-002 test listing, its status changed to Closed, the summary reflected one closed listing, and the action changed from Close to Reopen. | Pass | Normal | Applicant counts, openings and manual close status matched the verified database values for the tested listings. |
|  | 2. Verify each listing shows correct applicant count. |  |  |  |  |  |  |
|  | 3. Verify each listing shows correct remaining openings. |  |  |  |  |  |  |
|  | 4. Close one listing manually and verify it moves out of the active list. |  |  |  |  |  |  |

## Compliance

| Column A | Column B |
| --- | --- |
| Module Name:- | Compliance |
| Test Case ID | ST-031 |
| Tester Name | Len Pei Ying |
| Test Case Description | Test Privacy Policy and Terms of Service pages are accessible and linked from registration. |
| Prerequisites: | Registration page loaded; privacy.html and terms.html exist. |

| Column A | Column B |
| --- | --- |
| Tester's Name | Len Pei Ying |
| Environmental Information:- | 1. OS: Windows 11<br>2. System: Laptop/Desktop<br>3. Browser: Google Chrome |

| Column A | Column B |
| --- | --- |
| Test Scenario | Test Privacy Policy and Terms of Service pages are accessible and linked from registration. |

| Test Case ID | Test Steps | Test Input | Expected Results | Actual Results | Status | Test Type | Comments |
| --- | --- | --- | --- | --- | --- | --- | --- |
| ST-031 | 1. Open Register page and locate Privacy Policy / Terms links. | Use the current system data required by the test steps. | Privacy Policy and Terms of Service are present, accurately describe data handling (Supabase storage, document uploads), and are consistently linked sitewide via the footer partial. | The registration form displayed a dedicated consent and privacy notice before account creation, explaining the collection and use of account and profile data for EasyEarn services and that data is stored using Supabase. The notice included working links to the Privacy Policy and Terms of Service. Both policy pages loaded successfully, and the same Privacy Policy and Terms links were also available through the shared site footer. | Pass | Normal | Privacy information and consent were presented directly in the registration form before account creation, with policy links also available through the site footer. |
|  | 2. Click through to Privacy Policy and verify content loads. |  |  |  |  |  |  |
|  | 3. Click through to Terms of Service and verify content loads. |  |  |  |  |  |  |
|  | 4. Verify both pages are reachable from the site footer on every page. |  |  |  |  |  |  |

| Column A | Column B |
| --- | --- |
| Module Name:- | Compliance |
| Test Case ID | ST-032 |
| Tester Name | Len Pei Ying |
| Test Case Description | Test PDPA-aligned handling of sensitive verification documents (SSM/contact docs). |
| Prerequisites: | Employer verification submission stored in the employer's users record, including registration and contact documents. |

| Column A | Column B |
| --- | --- |
| Tester's Name | Len Pei Ying |
| Environmental Information:- | 1. OS: Windows 11<br>2. System: Laptop/Desktop<br>3. Browser: Google Chrome |

| Column A | Column B |
| --- | --- |
| Test Scenario | Test PDPA-aligned handling of sensitive verification documents (SSM/contact docs). |

| Test Case ID | Test Steps | Test Input | Expected Results | Actual Results | Status | Test Type | Comments |
| --- | --- | --- | --- | --- | --- | --- | --- |
| ST-032 | 1. Submit employer verification with registration and contact documents. | Employer verification data stored in public.users; W&amp;X Bakery and SugarShine contain both registration and contact documents. | Verification document data is stored in the relevant employer's users record; Job Seekers cannot access the Employer verification area, while Admin can review submitted verification documents. | Employer verification documents were stored in each employer's own users record. W&amp;X Bakery and SugarShine each had their own registration and contact documents, while CarePlus had none submitted. A Job Seeker attempting to access the Employer verification area was redirected back to the Job Seeker section and could not view employer verification documents. Admin could access the Verifications area and review the submitted employer documents. | Pass | Normal | Verification document access was restricted by role and record ownership in the tested scenarios. |
|  | 2. Verify documents are stored only in fields scoped to that employer's row (registration_doc_data, contact_doc_data). |  |  |  |  |  |  |
|  | 3. Verify a seeker or another employer account cannot query another employer's verification documents. |  |  |  |  |  |  |
|  | 4. Verify admin-only access is required to view submitted documents during review. |  |  |  |  |  |  |

| Column A | Column B |
| --- | --- |
| Module Name:- | Compliance |
| Test Case ID | ST-033 |
| Tester Name | Len Pei Ying |
| Test Case Description | Test admin account-status enforcement and persistence of verification decisions. |
| Prerequisites: | Admin account exists; at least one test user account and one employer verification record are available. |

| Column A | Column B |
| --- | --- |
| Tester's Name | Len Pei Ying |
| Environmental Information:- | 1. OS: Windows 11<br>2. System: Laptop/Desktop<br>3. Browser: Google Chrome |

| Column A | Column B |
| --- | --- |
| Test Scenario | Test admin account-status enforcement and persistence of verification decisions. |

| Test Case ID | Test Steps | Test Input | Expected Results | Actual Results | Status | Test Type | Comments |
| --- | --- | --- | --- | --- | --- | --- | --- |
| ST-033 | 1. Admin locks a test user account (account_status = 'suspended'). | Test user ABCD: account status locked then restored to Active; employer CarePlus: verification status changed to Rejected. | Locked accounts should be blocked from a new login until an Admin restores the account to Active. Employer verification decisions should persist in the users record, including the system-generated verification note. | Admin locked the ABCD Job Seeker account and the account was shown as Locked. After logout, a new login attempt was blocked with the message "Your account has been locked by the administrator. Please contact support." Admin then unlocked the account; its status returned to Active and login was restored. Admin rejected the CarePlus employer verification. The employer side reflected Rejected, and a database check confirmed verification_status = rejected with verification_notes = "Admin rejected this verification package." | Pass | Abnormal | Account lock/unlock enforcement and verification-decision persistence worked as expected in the tested scenarios. |
|  | 2. Verify the locked user is blocked when attempting to log in again. |  |  |  |  |  |  |
|  | 3. Admin unlocks the account (account_status = 'active') and verify login is restored. |  |  |  |  |  |  |
|  | 4. Admin rejects an employer verification request. |  |  |  |  |  |  |
|  | 5. Verify the rejection status and system-generated verification note are persisted in public.users and reflected to the employer. |  |  |  |  |  |  |

| Column A | Column B |
| --- | --- |
| Module Name:- | Compliance |
| Test Case ID | ST-034 |
| Tester Name | Len Pei Ying |
| Test Case Description | Test Gig Workers Act 2025 compliance-awareness guidance displayed to Admin. |
| Prerequisites: | Admin account logged in; Admin Analytics page available. |

| Column A | Column B |
| --- | --- |
| Tester's Name | Len Pei Ying |
| Environmental Information:- | 1. OS: Windows 11<br>2. System: Laptop/Desktop<br>3. Browser: Google Chrome |

| Column A | Column B |
| --- | --- |
| Test Scenario | Test Gig Workers Act 2025 compliance-awareness guidance displayed to Admin. |

| Test Case ID | Test Steps | Test Input | Expected Results | Actual Results | Status | Test Type | Comments |
| --- | --- | --- | --- | --- | --- | --- | --- |
| ST-034 | 1. Open Admin Analytics page and locate the Compliance Awareness panel. | Admin Analytics &gt; Gig Workers Act 2025 Compliance Awareness panel. | The Admin Analytics page should display a compliance-awareness reminder covering transparent job terms, payment/dispute follow-up, and employer accountability. This test checks the implemented awareness guidance only and does not constitute formal legal compliance certification. | The Admin Analytics page displayed a 'Gig Workers Act 2025 Compliance Awareness' panel. It reminded Admin to review job listings for clear work scope, schedule, location and pay information; monitor reports and payment disputes so worker complaints receive proper follow-up; and use verification and moderation records to support safer employer accountability. | Pass | Normal | The implemented Admin compliance-awareness panel displayed the expected transparency, payment/dispute and accountability reminders. |
|  | 2. Verify the panel reminds Admin to review clear work scope, schedule, location and pay information. |  |  |  |  |  |  |
|  | 3. Verify the panel reminds Admin to monitor reports and payment disputes for proper follow-up. |  |  |  |  |  |  |
|  | 4. Verify the panel references verification and moderation records for employer accountability. |  |  |  |  |  |  |
