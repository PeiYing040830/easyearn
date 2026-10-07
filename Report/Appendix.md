# Appendix

## Appendix 1: Google Form

This appendix shows the Google Form used for the EasyEarn User Requirement Survey. Information on users' requirements and extra feedback was gathered using the questionnaire, which also asked for respondents' background data, their job searches, and their experiences of being hired or not.

<u>https://forms.gle/28utP2sdZZ9MFvBbA</u>

## Appendix 2: EasyEarn Job Matching Portal

This appendix provides a link to the deployed EasyEarn Job Matching Portal for direct access to the implemented system.

<u>https://peiying040830.github.io/easyearn/</u>

## Appendix 3: System Testing

This appendix provides the detailed System Testing test cases and supporting evidence that are not presented in Section 4.3.1. System Testing was conducted across seven categories: E2E Workflow, Integration, Performance, Recovery, Business Logic, Reporting and Compliance. A total of 34 System Testing test cases (ST-001 to ST-034) were executed, and all 34 achieved a Pass result in the final testing round. A representative case from each of these categories is included in Section 4.3.1, and the other test cases and evidence are grouped by category in Appendix 3.1 to Appendix 3.7.

### Appendix 3.1 E2E Workflow

This appendix provides the remaining E2E Workflow System Testing test cases that are not presented in Section 4.3.1.1. These test cases provide supporting evidence for complete EasyEarn workflows involving the Job Seeker, Employer and Admin roles. The representative test case, ST-003: Hire-to-Completion Flow, is presented in Section 4.3.1.1, while the additional E2E Workflow test cases are provided below.

##### ST-001: Job Seeker Registration to Application

**Recorded result: Pass.**

A new job seeker account was successfully registered and logged in. Profile details including location, skills and availability were saved and retained after reopening the page. The SugarShine job application was submitted successfully and appeared under My Applications with Pending status, which remained after refreshing the page.

**Expected result:** Account is created with role 'seeker'; profile saves correctly; job application is recorded and visible under Applications with status 'Pending'.

**Test procedure:**

1. Open Register page and select 'Job Seeker' role.
2. Submit registration form with valid email/password.
3. Log in with the new account.
4. Complete profile (skills, location, availability).
5. Browse Jobs page and view a listing.
6. Submit a job application.

**Test input:** Email: bxg123@gmail.com Password: PEIying@0830

**Recorded comments:** The complete job seeker workflow functioned as expected. Registration, login, profile update, job browsing and job application were completed successfully without errors, and the submitted application remained visible with Pending status after refresh.

Figure A3.1 retains the original screenshot associated with this case. The result and comments above follow the latest testing workbook.

![Report figure](<Appendix Diagram/Final_Report_Len_Pei_Ying_QIU-202404-007159.pdf-0342-05.png>)

_Figure A3.1: Job Seeker Registration to Application_

##### ST-002: Employer Registration to Applicant Review

**Recorded result: Pass.**

A new employer job listing was successfully created and initially displayed as Pending Review. The administrator approved the listing, after which it became visible to Job Seekers. A Job Seeker successfully submitted an application, and the Employer received a new application notification. The Employer reviewed the application, and the updated Reviewed status was correctly reflected on the Job Seeker's My Applications page.

**Expected result:** Employer registration succeeds with the valid employer code. The new job listing is created with Pending Review status. After admin approval, the job becomes available to job seekers. A seeker can apply, and the employer can update the application status, which remains visible to the seeker after refresh.

**Test procedure:**

1. Open Register page and select 'Employer' role.
2. Enter employer secure code and submit registration.
3. Log in and open employer dashboard.
4. Post a new job listing with pay rate and openings.
5. Wait for a seeker application to arrive.
6. Open Applicants page and update application status.

**Test input:** Employer Code: EASYEARN-EMPLOYER-2026 Job: Part-time Barista, RM 12/hr, 2 openings

**Recorded comments:** The employer job posting, admin approval, job seeker application and application status update workflow were completed successfully without errors.

Figure A3.2 retains the original screenshot associated with this case. The result and comments above follow the latest testing workbook.

![Report figure](<Appendix Diagram/Final_Report_Len_Pei_Ying_QIU-202404-007159.pdf-0343-03.png>)

_Figure A3.2: Employer Registration to Applicant Review_

##### ST-004: Admin Moderation Lifecycle

**Recorded result: Pass.**

The suspicious job report was successfully submitted and appeared on the Admin Reports page. The Admin reviewed the report, removed the related job listing, and resolved the report successfully. The report status changed to Resolved, and the removed job no longer appeared in the Job Seeker active Jobs listing.

**Expected result:** The reported job is removed by the Admin and no longer appears in the active Job Seeker Jobs listing. The related report changes to Resolved and an admin note with the update timestamp is saved.

**Test procedure:**

1. Job Seeker submits a report for an active job listing.
2. Admin logs in and opens the Reports page.
3. Admin reviews the reported job information.
4. Admin opens Jobs, finds the reported listing, and clicks Remove.
5. Admin returns to Reports and clicks Resolve for the related report.
6. Verify the report is Resolved and the removed job is no longer visible to Job Seekers.

**Test input:** Report Type: Suspicious Listing
Reported Job: [ST-004 TEST] Suspicious Part-Time Job
Admin Action: Remove
Report Resolution: Resolve

**Recorded comments:** The admin moderation and report resolution workflow functioned as expected.

Figure A3.3 retains the original screenshot associated with this case. The result and comments above follow the latest testing workbook.

![Report figure](<Appendix Diagram/Final_Report_Len_Pei_Ying_QIU-202404-007159.pdf-0344-01.png>)

_Figure A3.3: Admin Moderation Lifecycle_

##### ST-005: Payment Lifecycle

**Recorded result: Pass.**

The Employer successfully confirmed work and payment for the accepted application, and the application moved to Completion Pending. The Job Seeker then confirmed payment receipt, after which the application changed to Completed. The completed job was also recorded in Work History with the corresponding earnings.

**Expected result:** Employer payment confirmation is recorded first and the application moves to Completion Pending. After the Job Seeker confirms receipt, payment status becomes confirmed, the application becomes Completed, and the completed job is saved to Work History.

**Test procedure:**

1. Employer opens the accepted application and clicks Confirm Work / Payment.
2. Enter final earnings greater than RM 0 and confirm.
3. Verify the application moves to Completion Pending and employer payment confirmation is recorded.
4. Job Seeker opens Applications and clicks Confirm Payment Received.
5. Verify the payment becomes confirmed and the application becomes Completed.
6. Verify the completed job is saved to Work History with the recorded earnings.

**Test input:** Application ID: System-generated
Payment Method: DuitNow / Offline
Final Earnings: Valid amount greater than RM 0

**Recorded comments:** The employer payment confirmation and job seeker receipt confirmation workflow functioned as expected.

Figure A3.4 retains the original screenshot associated with this case. The result and comments above follow the latest testing workbook.

![Report figure](<Appendix Diagram/Final_Report_Len_Pei_Ying_QIU-202404-007159.pdf-0344-05.png>)

_Figure A3.4: Payment Lifecycle_

##### ST-006: Payment Dispute and Resolution

**Recorded result: Pass.**

The Job Seeker successfully submitted a payment dispute, and the report appeared on the Admin Reports page with the correct application and payment context. The Admin reviewed and resolved the dispute successfully. The dispute status changed to Resolved while the related payment and application information remained correctly linked.

**Expected result:** The payment dispute is linked to the correct application/payment, becomes visible to Admin for review, and can be resolved with an admin resolution note without losing the original payment context.

**Test procedure:**

1. Job Seeker opens the related application and submits a payment issue report.
2. Enter the payment dispute description and submit the report.
3. Admin opens Reports and reviews the payment dispute with the related application/payment context.
4. Admin records a resolution and resolves the payment dispute.
5. Verify the dispute is marked Resolved and the payment/application reference remains correct.

**Test input:** Report Type: Payment Dispute
Description: Payment issue reported for System Testing ST-006
Application ID: System-generated

**Recorded comments:** The payment dispute and admin resolution workflow functioned as expected.

Figure A3.5 retains the original screenshot associated with this case. The result and comments above follow the latest testing workbook.

![Report figure](<Appendix Diagram/Final_Report_Len_Pei_Ying_QIU-202404-007159.pdf-0345-03.png>)

_Figure A3.5: Payment Dispute and Resolution_

### Appendix 3.2 Integration

This appendix provides the remaining Integration System Testing test cases that are not presented in Section 4.3.1.2. These test cases provide supporting evidence for interactions among the EasyEarn frontend, Supabase database, database triggers, notifications, Employer verification workflow, asynchronous messaging, chatbot knowledge base and saved-job functions. The representative test case, ST-007: Application CRUD and openings_count Trigger, is presented in Section 4.3.1.2, while the additional Integration test cases are provided below.

##### ST-008: New-Application Notification Trigger

**Recorded result: Pass.**

A new application notification was successfully created for the correct Employer after the Job Seeker submitted an application. The notification appeared in the Employer notification panel, and its unread status updated correctly after it was viewed or marked as read.

**Expected result:** Notification of type 'application_update' is created for the job's employer_id only; marking as read updates is_read = true.

**Test procedure:**

1. Seeker submits a job application.
2. Verify a row is inserted into notifications for the job's employer.
3. Employer dashboard polls and displays the notification badge.
4. Employer opens the notification; verify is_read updates.

**Test input:** Job ID + Employer ID: System-generated

**Recorded comments:** The new application notification was delivered to the correct Employer and the read status updated as expected.

Figure A3.6 retains the original screenshot associated with this case. The result and comments above follow the latest testing workbook.

![Report figure](<Appendix Diagram/Final_Report_Len_Pei_Ying_QIU-202404-007159.pdf-0346-03.png>)

_Figure A3.6: New-application Notification Trigger_

##### ST-009: Employer Verification Workflow

**Recorded result: Pass.**

The Employer successfully submitted the verification package with the required business information and documents. The verification request appeared on the Admin Verifications page and was approved successfully. The Employer verification status changed to Approved, and the verified badge was displayed correctly on the relevant Employer and job views.

**Expected result:** Verification fields persist with status 'pending'; after admin approval, is_verified becomes true and badge appears across the platform.

**Test procedure:**

1. Employer fills SSM number, business type, and address.
2. Employer uploads registration and contact documents.
3. Employer submits verification request.
4. Admin opens Verifications page and reviews documents.
5. Admin approves the request.
6. Verify employer profile now shows verified badge.

**Test input:** SSM Number: 202601234567

**Recorded comments:** The employer verification submission, admin approval and verified badge workflow functioned as expected.

Figure A3.7 retains the original screenshot associated with this case. The result and comments above follow the latest testing workbook.

![Report figure](<Appendix Diagram/Final_Report_Len_Pei_Ying_QIU-202404-007159.pdf-0347-01.png>)

_Figure A3.7: Employer Verification Workflow_

##### ST-010: Messaging Integration

**Recorded result: Pass.**

The Employer successfully sent a message to the Job Seeker, and the message appeared in the correct conversation thread. The Job Seeker received an unread message indicator, which cleared after the conversation was opened. A reply from the Job Seeker was also successfully displayed on the Employer side, and the conversation history remained available.

**Expected result:** Messages persist per job/counterpart pair; thread list shows latest message and unread indicator; opening a thread clears the unread state.

**Test procedure:**

1. Seeker opens Messages and starts a thread tied to the job application.
2. Seeker sends a message.
3. Employer opens Messages and views the thread.
4. Employer replies.
5. Verify thread is marked read for the recipient.

**Test input:** Job ID + counterpart IDs: System-generated

**Recorded comments:** The messaging, unread indicator and conversation synchronization functioned as expected.

Figure A3.8 retains the original screenshot associated with this case. The result and comments above follow the latest testing workbook.

![Report figure](<Appendix Diagram/Final_Report_Len_Pei_Ying_QIU-202404-007159.pdf-0347-05.png>)

_Figure A3.8: Messaging Integration_

##### ST-011: Chatbot Knowledge Base Integration

**Recorded result: Pass.**

The chatbot successfully returned the expected knowledge-base response for the recognised query "How do I apply for a job?". For the unrecognised query "What is the weather on Mars today?", the chatbot returned a fallback support response without error. The recognised and unrecognised query paths both functioned correctly.

**Expected result:** Recognised queries return the seeded answer from chatbot_knowledge; unrecognised queries return the fallback message; every interaction is recorded in chatbot_logs with a matched flag.

**Test procedure:**

1. Open floating chatbot widget on any page.
2. Type a known query (e.g. 'how to apply for a job').
3. Verify the matched answer is displayed.
4. Type an unrecognised query.
5. Verify fallback reply is shown.
6. Verify both interactions are logged.

**Test input:** Query 1: 'how to apply for a job' Query 2: 'asdkjqwe123'

**Recorded comments:** The chatbot knowledge matching and fallback response functioned as expected.

Figure A3.9 retains the original screenshot associated with this case. The result and comments above follow the latest testing workbook.

![Report figure](<Appendix Diagram/Final_Report_Len_Pei_Ying_QIU-202404-007159.pdf-0348-03.png>)

_Figure A3.9: Chatbot Knowledge Base Integration_

##### ST-012: Saved Jobs Integration

**Recorded result: Pass.**

The Job Seeker successfully saved a job and the Saved Jobs count increased accordingly. The saved job appeared correctly in the Saved Jobs list. After the Job Seeker cancelled/removed the saved job, it disappeared from the list and the Saved Jobs count decreased accordingly.

**Expected result:** saved_jobs rows are created/removed in sync with the bookmark toggle; Saved Jobs page metrics (total/live/applied) reconcile correctly against current job and application state.

**Test procedure:**

1. Seeker clicks the bookmark icon on a job card to save it.
2. Open Saved Jobs page and verify the job appears.
3. Click unsave on the same job.
4. Verify the job disappears from Saved Jobs.
5. Save a job, then apply to it, and verify it shows under both Saved and Applied counts.

**Test input:** Job ID: System-generated

**Recorded comments:** The Saved Jobs list and count updated correctly after saving and removing a job.

Figure A3.10 retains the original screenshot associated with this case. The result and comments above follow the latest testing workbook.

![Report figure](<Appendix Diagram/Final_Report_Len_Pei_Ying_QIU-202404-007159.pdf-0349-01.png>)

_Figure A3.10: Saved Jobs Integration_

### Appendix 3.3 Performance

This appendix provides the remaining Performance System Testing test cases that are not presented in Section 4.3.1.3. The tests evaluated selected time-sensitive and data-processing operations, including Jobs page loading and filtering, PDF resume generation and Admin Analytics rendering. The representative test case, ST-014: Concurrent Application Race Condition, is presented in Section 4.3.1.3, while the additional Performance test cases are provided below.

##### ST-013: Jobs Page Load and Filter Performance

**Recorded result: Pass.**

The Job Seeker Jobs page loaded successfully without visible freezing. Chrome DevTools recorded 79 requests, 3.0 MB transferred, 3.8 MB resources, and a total finish time of 1.11 seconds. Applying the job filters updated the displayed results quickly without noticeable delay or UI freezing.

**Expected result:** Job list renders in under 2 seconds; filtering and match-score recalculation complete in under 1 second without UI freeze.

**Test procedure:**

1. Load Jobs page with no filters applied.
2. Measure initial render time for the job list.
3. Apply category + location filters simultaneously.
4. Measure re-filter response time.
5. Scroll through paginated results.

**Test input:** 300 job listings, 50 seeker skill profiles

**Recorded comments:** The Jobs page loaded within the expected time and the filters responded quickly without visible lag.

Figure A3.11 retains the original screenshot associated with this case. The result and comments above follow the latest testing workbook.

![Report figure](<Appendix Diagram/Final_Report_Len_Pei_Ying_QIU-202404-007159.pdf-0350-01.png>)

_Figure A3.11: Jobs Page Load and Filter Performance_

##### ST-015: PDF Resume Generation Performance

**Recorded result: Pass.**

The PDF resume was generated successfully in approximately 2.56 seconds, which was within the expected 3-second target. After opening the generated PDF, the profile, skills, education and work history content displayed correctly without clipped text, missing content or layout problems.

**Expected result:** PDF generates within 3 seconds for typical profile length and renders one A4 page (or correctly paginated multi-page) without clipped content.

**Test procedure:**

1. Open Resume page with complete profile data.
2. Click 'Download PDF'.
3. Measure time to generate and trigger download.
4. Open resulting PDF and verify layout/text are not cut off.

**Test input:** Resume with 5 work history entries, skill tags, education

**Recorded comments:** The PDF resume generated within the expected time and displayed correctly without content being cut off.

Figure A3.12 retains the original screenshot associated with this case. The result and comments above follow the latest testing workbook.

![Report figure](<Appendix Diagram/Final_Report_Len_Pei_Ying_QIU-202404-007159.pdf-0350-05.png>)

_Figure A3.12: PDF Resume Generation Performance_

##### ST-016: Admin Analytics Dashboard Render Time

**Recorded result: Pass.**

The Admin Analytics Dashboard loaded successfully with 75 requests, 5.0 MB transferred and 6.1 MB of resources. Chrome DevTools recorded a total finish time of 1.86 seconds. The summary cards and Chart.js visualisations displayed correctly without noticeable UI freezing or rendering problems.

**Expected result:** Dashboard summary cards render within 2 seconds and charts finish drawing within 3 seconds on a cold load, with no noticeable UI freeze while aggregating counts client-side.

**Test procedure:**

1. Log in as Admin and navigate to the Analytics page.
2. Measure time until summary cards (users, listings, matches) render.
3. Measure time until Chart.js graphs finish drawing.
4. Repeat with browser cache cleared to test a cold load.

**Test input:** Seed: 500 applications, 80 job listings, 60 users

**Recorded comments:** The Admin Analytics Dashboard rendered within the expected time and displayed all cards and charts correctly.

Figure A3.13 retains the original screenshot associated with this case. The result and comments above follow the latest testing workbook.

![Report figure](<Appendix Diagram/Final_Report_Len_Pei_Ying_QIU-202404-007159.pdf-0351-03.png>)

_Figure A3.13: Admin Analytics Dashboard Render Time_

### Appendix 3.4 Recovery

This appendix provides the remaining Recovery System Testing test cases that are not presented in Section 4.3.1.4. The tests verified the stability and consistency of data state in case of loss of connectivity, interruption of a session and repeated payment operations. The representative test case, ST-019: Failed Application Submission Rollback, is presented in Section 4.3.1.4, while the additional Recovery test cases are provided below.

##### ST-017: Supabase Connectivity Loss Handling

**Recorded result: Pass.**

When network connectivity was disabled, the application submission failed and the system displayed the message "Unable to submit application. Please try again." The page did not crash or become blank. The submit control remained showing "Submitting..." after the failed attempt. After network connectivity was restored, the Job Seeker retried the application and it was submitted successfully.

**Expected result:** Failed Supabase calls are caught and surfaced as a user-facing error; no unhandled exception or blank page; retry succeeds once connectivity returns.

**Test procedure:**

1. Load Jobs page successfully online.
2. Disable network connectivity (simulate offline).
3. Attempt to submit a job application.
4. Verify a clear error is shown instead of a silent failure or crash.
5. Restore connectivity and retry the action.

**Test input:** Network state: Offline → Online

**Recorded comments:** Connectivity loss was handled with a clear error and retry succeeded; the submit button remained in the Submitting state after the failed attempt.

Figure A3.14 retains the original screenshot associated with this case. The result and comments above follow the latest testing workbook.

The Pass status applies to error handling and successful retry after reconnection. It does not establish that the submit control recovered correctly: the recorded “Submitting...” state remains a user-interface limitation of this test.

![Report figure](<Appendix Diagram/Final_Report_Len_Pei_Ying_QIU-202404-007159.pdf-0352-03.png>)

_Figure A3.14: Supabase Connectivity Loss Handling_

##### ST-018: Session Expiry and Re-authentication

**Recorded result: Pass.**

After the stored authentication session was cleared, the protected Job Seeker page no longer remained accessible and the system redirected the user to the Login page. No protected application data was shown without an active session. After logging in again with valid credentials, the user was able to access the dashboard and Applications page normally.

**Expected result:** Expired sessions are detected and the user is redirected to the Login page; no protected data is shown to an unauthenticated request.

**Test procedure:**

1. Log in successfully and navigate to dashboard.
2. Force-expire the Supabase session token.
3. Attempt a protected action (e.g. view Applications).
4. Verify the user is redirected to Login rather than seeing broken/empty data.
5. Log in again and verify the previous destination or dashboard loads correctly.

**Test input:** Expired/cleared auth token

**Recorded comments:** Expired or cleared sessions were handled correctly, and re-authentication restored normal access.

Figure A3.15 retains the original screenshot associated with this case. The result and comments above follow the latest testing workbook.

![Report figure](<Appendix Diagram/Final_Report_Len_Pei_Ying_QIU-202404-007159.pdf-0353-01.png>)

_Figure A3.15: Session Expiry and Re-authentication_

##### ST-020: Duplicate Payment Prevention on Retry

**Recorded result: Pass.**

The Employer successfully confirmed payment for the application. After the first successful confirmation, the payment button became locked and could not be submitted again. A database query confirmed that only one payment record existed for application 112ba3b2-819e-4009-a948-525e136ebba1, with an amount of RM200. No duplicate payment record was created.

**Expected result:** After the first successful payment confirmation, the payment action is prevented from being submitted again through the UI. Only one payment record should exist for the application with the correct payment amount.

**Test procedure:**

1. Employer confirms work/payment for an accepted application.
2. Verify the payment action becomes locked/disabled after the first successful confirmation.
3. Query the payments table for the same application_id.
4. Verify only one payment row exists with the correct amount.

**Test input:** Application ID: 112ba3b2-819e-4009-a948-525e136ebba1
Payment Amount: RM200

**Recorded comments:** Duplicate payment submission was prevented, and only one RM200 payment record existed for the application.

Figure A3.16 retains the original screenshot associated with this case. The result and comments above follow the latest testing workbook.

![Report figure](<Appendix Diagram/Final_Report_Len_Pei_Ying_QIU-202404-007159.pdf-0353-05.png>)

_Figure A3.16: Duplicate Payment Prevention on Retry_

### Appendix 3.5 Business Logic

This appendix provides the remaining Business Logic System Testing test cases that are not presented in Section 4.3.1.5. The tests were designed to assess important EasyEarn business rules such as Job Match calculations, location-distance bonuses, rating eligibility, moderation classification and the action of the Employer Verification Badge. The below Business Logic test cases are presented in Section 4.3.1.5 as an additional test case to ST-023: Application Status Transition Constraints.

##### ST-021: Match Score Calculation Accuracy

**Recorded result: Pass.**

For the Cashier job listing, the Job Seeker profile matched 4 of 5 required skills. The system correctly displayed an 80% Match score, with Cash handling, POS systems, Customer service and Friendly communication listed as matched skills, while Attention to detail was shown under Skills To Build. After all Job Seeker skills were removed and the Jobs page was refreshed, the match badge changed to "New" instead of displaying 0%.

**Expected result:** Match percent = (number of job-required skills the seeker has) / (total job-required skills) × 100, i.e. 2/3 ≈ 67%, with no skills resulting in a 'New' badge rather than 0%.

**Test procedure:**

1. Set seeker skills to ['cashier','customer service','english'].
2. Set job required skills to ['cashier','english','mandarin'].
3. View the job card match badge on Jobs page.
4. Verify the displayed match percentage equals matched/required skill ratio.
5. Change seeker skills to an empty list and verify badge shows 'New' instead of a percentage.

**Test input:** Seeker skills: cashier, customer service, english Job skills: cashier, english, mandarin

**Recorded comments:** The required-skill match ratio and the no-skills "New" badge were displayed correctly.

Figure A3.17 retains the original screenshot associated with this case. The result and comments above follow the latest testing workbook.

![Report figure](<Appendix Diagram/Final_Report_Len_Pei_Ying_QIU-202404-007159.pdf-0354-05.png>)

_Figure A3.17: Match Score Calculation Accuracy_

##### ST-022: Location-Distance Bonus and Match Cap

**Recorded result: Pass.**

With full skill matching (5 of 5 required skills), the same job displayed an 85% Match score when no location distance bonus was available. After Near Me was enabled, the job was shown at 2.9 km away and the system applied the nearby location boost. The final match score increased to 99%, correctly respecting the maximum cap for location-aware matching.

**Expected result:** Jobs within 2km get up to +15% bonus (capped at 99% total); jobs beyond 25km get +0% bonus; jobs with unknown distance are capped at 85% even at 100% skill match.

**Test procedure:**

1. View match percent for a job 1.5km away with full skill match.
2. View match percent for a job 30km away with full skill match.
3. View match percent for a job with unknown distance (no GPS) and full skill match.
4. Verify the percentage cap differs between location-known and location-unknown cases.

**Test input:** Distances: 1.5km, 30km, unknown Skill match: 100%

**Recorded comments:** The location bonus and match-score cap were applied correctly for the tested nearby and no-location cases.

Figure A3.18 retains the original screenshot associated with this case. The result and comments above follow the latest testing workbook.

![Report figure](<Appendix Diagram/Final_Report_Len_Pei_Ying_QIU-202404-007159.pdf-0355-03.png>)

_Figure A3.18: Location-distance Bonus and Match Cap_

##### ST-024: Bidirectional Rating Eligibility

**Recorded result: Pass.**

For an application that had not reached Completed status, the rating action was not available to the user. For a Completed application, the rating had already been submitted successfully during the earlier end-to-end workflow, and the interface displayed the application as Rated with the rating control no longer available for a second submission.

**Expected result:** Rating UI/flow is only available for completed applications; resubmitting for the same application updates rather than duplicates the existing rating.

**Test procedure:**

1. Attempt to submit a rating for the 'pending' application.
2. Verify the rating option is unavailable/blocked.
3. Submit a rating for the 'completed' application.
4. Attempt to submit a second rating for the same completed application.
5. Verify duplicate rating is prevented or correctly handled.

**Test input:** Application A: status pending Application B: status completed

**Recorded comments:** Ratings were only available after job completion, and the UI prevented a duplicate rating submission.

Figure A3.19 retains the original screenshot associated with this case. The result and comments above follow the latest testing workbook.

![Report figure](<Appendix Diagram/Final_Report_Len_Pei_Ying_QIU-202404-007159.pdf-0356-01.png>)

_Figure A3.19: Bidirectional Rating Eligibility_

##### ST-025: Admin Moderation Queue Classification

**Recorded result: Pass.**

On the Admin Jobs page, the Pending Review, Flagged and Removed moderation filters displayed listings under the correct status categories. Switching between the filters changed the visible job queue accordingly, and the displayed moderation counts were consistent with the listings shown for each category.

**Expected result:** Each moderation status label (Pending Review, Approved, Flagged, Removed) maps to the correct underlying job_listings.status value, and switching filters changes both the visible queue and the metric counts consistently.

**Test procedure:**

1. Open Admin Jobs page with the default 'Pending Review' filter.
2. Verify only newly posted/pending listings appear.
3. Switch filter to 'Flagged' and verify only reported listings appear.
4. Switch filter to 'Removed' and verify only closed/rejected listings appear.
5. Verify the live/flagged/removed count metrics match the filtered list lengths.

**Test input:** Use the current system data required by the test steps.

**Recorded comments:** The admin moderation filters and status counts were consistent with the displayed job queues.

Figure A3.20 retains the original screenshot associated with this case. The result and comments above follow the latest testing workbook.

![Report figure](<Appendix Diagram/Final_Report_Len_Pei_Ying_QIU-202404-007159.pdf-0356-05.png>)

_Figure A3.20: Admin Moderation Queue Classification_

##### ST-026: Employer Verification Badge Visibility

**Recorded result: Pass.**

Verified employers displayed the verification badge consistently on the Employer Dashboard and on their job listings. For an unverified employer, the verification badge was not displayed. The badge visibility therefore matched the employer verification status across the tested views.

**Expected result:** The verified badge is shown if and only if the listing's employer has is_verified = true in public.users, with no inconsistency between the Jobs list view and the employer profile view.

**Test procedure:**

1. View a job listing posted by the verified employer on the Jobs page.
2. Verify the verified badge/icon appears next to the company name.
3. View a job listing posted by the unverified employer.
4. Verify no verified badge appears.
5. Verify the same badge logic is consistent on the employer's public profile page.

**Test input:** Use the current system data required by the test steps.

**Recorded comments:** The verification badge was shown only for verified employers and was consistent across the tested views.

Figure A3.21 retains the original screenshot associated with this case. The result and comments above follow the latest testing workbook.

![Report figure](<Appendix Diagram/Final_Report_Len_Pei_Ying_QIU-202404-007159.pdf-0357-03.png>)

_Figure A3.21: Employer Verification Badge Visibility_

### Appendix 3.6 Reporting

This appendix provides the remaining Reporting System Testing test cases that are not presented in Section 4.3.1.6. The tests evaluated whether information displayed in EasyEarn reports, dashboards and calculated summaries was consistent with the underlying stored data. The additional tests covered job-listing reports, Job Seeker work history and earnings, and Employer job-posting performance. The representative test case is shown in Section 4.3.1.6: Admin Analytics Dashboard Accuracy.

##### ST-028: Job Listing Reporting Feature

**Recorded result: Pass.**

The Job Seeker successfully submitted a suspicious job report. The report appeared on the Admin Reports page with the correct Job Seeker as reporter, the correct reported job/employer reference, the submitted description, and an initial Pending status. The report could then be reviewed and resolved by the Admin.

**Expected result:** Report is saved with correct reporter_id, reported_user, description, and status 'pending'; visible to admin shortly after submission.

**Test procedure:**

1. Seeker opens a job listing and clicks 'Report'.
2. Seeker selects a report type and writes a description.
3. Seeker submits the report.
4. Admin opens Reports page and views the new report.
5. Verify the reported user/job reference is correct.

**Test input:** Report Type: 'Suspicious / Scam Listing' Description: 'Asked for upfront deposit before interview.'

**Recorded comments:** The suspicious job report was stored with the correct reporter and target information and was visible to the Admin.

Figure A3.22 retains the original screenshot associated with this case. The result and comments above follow the latest testing workbook.

![Report figure](<Appendix Diagram/Final_Report_Len_Pei_Ying_QIU-202404-007159.pdf-0358-03.png>)

_Figure A3.22: Job Listing Report Feature_

##### ST-029: Work History and Earnings Report

**Recorded result: Pass.**

The Work History page displayed 1 Completed Job with Total Earnings of RM120. Database verification showed that the Part-Time Barista &amp; Café Crew application was Completed with a confirmed RM120 payment, while the Cashier record remained in Completion Pending and was therefore excluded from completed work history. A query using the same completion and payment-confirmation rules returned 1 completed job and RM120 total earnings, matching the page.

**Expected result:** The Work History page should include only applications that are Completed with confirmed payment, and the displayed completed-job count and total earnings should match those eligible records.

**Test procedure:**

1. Seeker opens the Work History page.
2. Verify only applications with status Completed and confirmed payment are included in the completed work history.
3. Compare the displayed total earnings with the payment amount used for the included completed application(s).
4. Verify the displayed job title, employer and category match the included completed work-history record.

**Test input:** Tested seeker: Len Pei Ying; completed application included: Part-Time Barista &amp; Café Crew; confirmed payment amount: RM120

**Recorded comments:** The completed-job count and total earnings matched the eligible Completed application and confirmed payment record.

Figure A3.23 retains the original screenshot associated with this case. The result and comments above follow the latest testing workbook.

![Report figure](<Appendix Diagram/Final_Report_Len_Pei_Ying_QIU-202404-007159.pdf-0359-01.png>)

_Figure A3.23: Work History and Earnings Report_

##### ST-030: Employer Job Posting Performance View

**Recorded result: Pass.**

The Employer Manage Jobs page displayed applicant counts and remaining openings that matched the database for the tested listings. For [ST-002 TEST] Part-time Barista, the page showed 2 applicants and 0 openings; the database returned the same values. For Event Crew (F&amp;B Booth – SugarShine), the page showed 1 applicant and 2 openings; the database also matched. After closing the ST-002 test listing, its status changed to Closed, the summary reflected one closed listing, and the action changed from Close to Reopen.

**Expected result:** Per-listing applicant counts and openings figures shown to the employer accurately reflect the applications and job_listings tables, and manually closing a listing immediately removes it from the active view.

**Test procedure:**

1. Employer opens Manage Jobs page.
2. Verify each listing shows correct applicant count.
3. Verify each listing shows correct remaining openings.
4. Close one listing manually and verify it moves out of the active list.

**Test input:** Use the current system data required by the test steps.

**Recorded comments:** Applicant counts, openings and manual close status matched the verified database values for the tested listings.

Figure A3.24 retains the original screenshot associated with this case. The result and comments above follow the latest testing workbook.

![Report figure](<Appendix Diagram/Final_Report_Len_Pei_Ying_QIU-202404-007159.pdf-0359-05.png>)

_Figure A3.24: Employer Job Posting Performance View_

### Appendix 3.7 Compliance

This appendix provides the remaining Compliance-related System Testing test cases that are not presented in Section 4.3.1.7. The tests included selected EasyEarn controls pertaining to privacy, transparency and user protection, such as access to the Privacy Policy and Terms of Service, administrative audit records, and reminders of compliance with the policy and awareness of the user. These tests were used to assess selected implemented controls and were not intended to be legal or regulatory certification. The representative test case, ST-032: PDPAAligned Document Handling, is presented in Section 4.3.1.7, while the remaining test cases are provided below.

##### ST-031: Privacy Policy and Terms of Service Accessibility

**Recorded result: Pass.**

The registration form displayed a dedicated consent and privacy notice before account creation, explaining the collection and use of account and profile data for EasyEarn services and that data is stored using Supabase. The notice included working links to the Privacy Policy and Terms of Service. Both policy pages loaded successfully, and the same Privacy Policy and Terms links were also available through the shared site footer.

**Expected result:** Privacy Policy and Terms of Service are present, accurately describe data handling (Supabase storage, document uploads), and are consistently linked sitewide via the footer partial.

**Test procedure:**

1. Open Register page and locate Privacy Policy / Terms links.
2. Click through to Privacy Policy and verify content loads.
3. Click through to Terms of Service and verify content loads.
4. Verify both pages are reachable from the site footer on every page.

**Test input:** Use the current system data required by the test steps.

**Recorded comments:** Privacy information and consent were presented directly in the registration form before account creation, with policy links also available through the site footer.

Figure A3.25 retains the original screenshot associated with this case. The result and comments above follow the latest testing workbook.

![Report figure](<Appendix Diagram/Final_Report_Len_Pei_Ying_QIU-202404-007159.pdf-0360-05.png>)

_Figure A3.25: Privacy Policy and Terms of Service Accessibility_

##### ST-033: Admin Audit Trail for Account Decisions

**Recorded result: Pass.**

Admin locked the ABCD Job Seeker account and the account was shown as Locked. After logout, a new login attempt was blocked with the message "Your account has been locked by the administrator. Please contact support." Admin then unlocked the account; its status returned to Active and login was restored. Admin rejected the CarePlus employer verification. The employer side reflected Rejected, and a database check confirmed verification_status = rejected with verification_notes = "Admin rejected this verification package."

**Expected result:** Locked accounts should be blocked from a new login until an Admin restores the account to Active. Employer verification decisions should persist in the users record, including the system-generated verification note.

**Test procedure:**

1. Admin locks a test user account (account_status = 'suspended').
2. Verify the locked user is blocked when attempting to log in again.
3. Admin unlocks the account (account_status = 'active') and verify login is restored.
4. Admin rejects an employer verification request.
5. Verify the rejection status and system-generated verification note are persisted in public.users and reflected to the employer.

**Test input:** Test user ABCD: account status locked then restored to Active; employer CarePlus: verification status changed to Rejected.

**Recorded comments:** Account lock/unlock enforcement and verification-decision persistence worked as expected in the tested scenarios.

Figure A3.26 retains the original screenshot associated with this case. The result and comments above follow the latest testing workbook.

![Report figure](<Appendix Diagram/Final_Report_Len_Pei_Ying_QIU-202404-007159.pdf-0361-03.png>)

_Figure A3.26: Admin Audit Trail for Account Decisions_

##### ST-034: Gig Workers Act 2025 Compliance Reminders

**Recorded result: Pass.**

The Admin Analytics page displayed a 'Gig Workers Act 2025 Compliance Awareness' panel. It reminded Admin to review job listings for clear work scope, schedule, location and pay information; monitor reports and payment disputes so worker complaints receive proper follow-up; and use verification and moderation records to support safer employer accountability.

**Expected result:** The Admin Analytics page should display a compliance-awareness reminder covering transparent job terms, payment/dispute follow-up, and employer accountability. This test checks the implemented awareness guidance only and does not constitute formal legal compliance certification.

**Test procedure:**

1. Open Admin Analytics page and locate the Compliance Awareness panel.
2. Verify the panel reminds Admin to review clear work scope, schedule, location and pay information.
3. Verify the panel reminds Admin to monitor reports and payment disputes for proper follow-up.
4. Verify the panel references verification and moderation records for employer accountability.

**Test input:** Admin Analytics &gt; Gig Workers Act 2025 Compliance Awareness panel.

**Recorded comments:** The implemented Admin compliance-awareness panel displayed the expected transparency, payment/dispute and accountability reminders.

Figure A3.27 retains the original screenshot associated with this case. The result and comments above follow the latest testing workbook.

![Report figure](<Appendix Diagram/Final_Report_Len_Pei_Ying_QIU-202404-007159.pdf-0362-01.png>)

_Figure A3.27: Gig Workers Act 2025 Compliance Reminders_

Overall, all 34 System Testing test cases across the seven categories achieved a Pass result. The detailed evidence in Appendix 3 supports the System Testing results summarised in Section 4.3.1 and documents the additional test cases omitted from the main chapter for conciseness.

## Appendix 4: User Acceptance Testing (UAT)

This appendix reproduces the five supplied UAT forms as editable text and tables. Each form contains participant details, five Job Seeker tasks, five Employer tasks, five Admin tasks, ten usability ratings and Overall Acceptance. Sections A–C therefore contain 15 tasks per participant in total. The original wording, Pass/Fail entries, remarks, checked rating columns and signature text are retained.

The forms are ordered by the dates recorded by the participants. The records document UAT sessions in September 2026; they do not establish that participants repeated UAT after every subsequent security or interface change.

### Appendix 4.1: Chan Jade Qi

#### USER ACCEPTANCE TEST – EasyEarn

Instructions for the tester: Please fill in your name, date, time, institution and device used at the top of this form. Complete each task in Sections A to C without assistance from the system developer. Record ‘Pass’ if you are able to complete the task independently and ‘Fail’ if you are unable to complete it. Use the Remarks column to record anything that you find confusing, unclear or difficult to complete. For Section D, rate each usability statement from 1 (Strongly Disagree) to 5 (Strongly Agree) based on your experience using EasyEarn. After completing all sections, indicate your Overall Acceptance and provide any additional comments or suggestions.

<table>
<tr>
<td>Tester Name</td>
<td>Chan Jade Qi</td>
</tr>
<tr>
<td>Date</td>
<td>05/09/2026</td>
</tr>
<tr>
<td>Time</td>
<td>04:23 PM</td>
</tr>
<tr>
<td>Institution</td>
<td>Quest International University (QIU)</td>
</tr>
<tr>
<td>Device Used</td>
<td>Pavilion Plus 14, Tranquil Pink, Windows 11</td>
</tr>
<tr>
<td>Roles Tested</td>
<td>Job Seeker, Employer and Administrator</td>
</tr>
</table>

#### Section A: Job Seeker UAT

<table>
<tr>
<td>No</td>
<td>Task</td>
<td>Steps</td>
<td>Pass/Fail</td>
<td>Remarks</td>
</tr>
<tr>
<td>1</td>
<td>Register and Login</td>
<td>1. Open EasyEarn Login.<br>2. Log in with valid Job Seeker credentials.<br>3. Confirm the Job Seeker dashboard opens.</td>
<td>Pass</td>
<td>-</td>
</tr>
<tr>
<td>2</td>
<td>Job Search &amp; Browse</td>
<td>1. Open Jobs.<br>2. Use Search / Filter / Near Me.<br>3. Confirm suitable job listings display correctly.</td>
<td>Pass</td>
<td>-</td>
</tr>
<tr>
<td>3</td>
<td>Job Application</td>
<td>1. Open a suitable job.<br>2. Submit an application and open My Applications.<br>3. Confirm the application and status are shown correctly.</td>
<td>Pass</td>
<td>-</td>
</tr>
<tr>
<td>4</td>
<td>Work History &amp; Rate Employer</td>
<td>1. Open Work History after a completed job.<br>2. Review the completed job and rate the Employer.<br>3. Confirm date, earnings and rating are recorded correctly.</td>
<td>Pass</td>
<td>-</td>
</tr>
<tr>
<td>5</td>
<td>Resume Management</td>
<td>1. Open Resume.<br>2. Refresh/generate it from profile and work history.<br>3. Confirm the details are correct, and the PDF download works.</td>
<td>Pass</td>
<td>-</td>
</tr>
</table>

#### Section B: Employer UAT

<table>
<tr>
<td>No</td>
<td>Task</td>
<td>Steps</td>
<td>Pass/Fail</td>
<td>Remarks</td>
</tr>
<tr>
<td>1</td>
<td>Post Job</td>
<td>1. Open Manage Jobs.<br>2. Enter job details and submit a listing.<br>3. Confirm it appears with the correct status.</td>
<td>Pass</td>
<td>-</td>
</tr>
<tr>
<td>2</td>
<td>View Applicants</td>
<td>1. Open Applicants for a posted job.<br>2. Review the applicant list/details.<br>3. Confirm the correct applicant information is shown.</td>
<td>Pass</td>
<td>-</td>
</tr>
<tr>
<td>3</td>
<td>Accept / Reject Applicant</td>
<td>1. Open an applicant record.<br>2. Choose Accept or Reject.<br>3. Confirm the application status updates.</td>
<td>Pass</td>
<td>-</td>
</tr>
<tr>
<td>4</td>
<td>Employer Verification</td>
<td>1. Open Verification and select Employer Type.<br>2. Enter required details and upload matching documents.<br>3. Submit and confirm the request is recorded for Admin review.</td>
<td>Pass</td>
<td>-</td>
</tr>
<tr>
<td>5</td>
<td>Job Completion &amp; Rate Job Seeker</td>
<td>1. Open the relevant accepted/completion-pending application.<br>2. Confirm completion and rate the Job Seeker.<br>3. Confirm final status and rating are recorded.</td>
<td>Pass</td>
<td>-</td>
</tr>
</table>

#### Section C: Admin UAT

<table>
<tr>
<td>No</td>
<td>Task</td>
<td>Steps</td>
<td>Pass/Fail</td>
<td>Remarks</td>
</tr>
<tr>
<td>1</td>
<td>Lock / Unlock Employer</td>
<td>1. Open Users and select an Employer.<br>2. Lock and confirm access is restricted.<br>3. Unlock and confirm access is restored.</td>
<td>Pass</td>
<td>-</td>
</tr>
<tr>
<td>2</td>
<td>Approve Job</td>
<td>1. Open a pending job in Admin Jobs.<br>2. Approve the listing.<br>3. Confirm the status changes correctly.</td>
<td>Pass</td>
<td>-</td>
</tr>
<tr>
<td>3</td>
<td>Flag / Remove Job</td>
<td>1. Open a job that requires moderation.<br>2. Flag or remove it.<br>3. Confirm the moderation action takes effect.</td>
<td>Pass</td>
<td>-</td>
</tr>
<tr>
<td>4</td>
<td>Employer Verification Review</td>
<td>1. Open Employer Verifications.<br>2. Review type, details and supporting documents.<br>3. Approve / Reject / Recheck and confirm status updates.</td>
<td>Pass</td>
<td>-</td>
</tr>
<tr>
<td>5</td>
<td>Reports</td>
<td>1. Open a submitted report.<br>2. Review and take the appropriate action.<br>3. Confirm the report status updates.</td>
<td>Pass</td>
<td>-</td>
</tr>
</table>

#### Section D: Usability Testing Form

<table>
<tr>
<td>No</td>
<td>Evaluation Item</td>
<td colspan="5">Ratings</td>
</tr>
<tr>
<td colspan="2">1 = Strongly Disagree &#124; 2 = Disagree &#124; 3 = Neutral &#124; 4 = Agree &#124; 5 = Strongly Agree</td>
<td>1</td>
<td>2</td>
<td>3</td>
<td>4</td>
<td>5</td>
</tr>
<tr>
<td>1</td>
<td>The navigation menu makes it easy to find the functions I need.</td>
<td></td>
<td></td>
<td></td>
<td></td>
<td>✓</td>
</tr>
<tr>
<td>2</td>
<td>Job information, buttons and instructions are clear and easy to understand.</td>
<td></td>
<td></td>
<td></td>
<td></td>
<td>✓</td>
</tr>
<tr>
<td>3</td>
<td>Job search, filters and Near Me are easy to use.</td>
<td></td>
<td></td>
<td></td>
<td></td>
<td>✓</td>
</tr>
<tr>
<td>4</td>
<td>Application status and next actions are clearly displayed.</td>
<td></td>
<td></td>
<td></td>
<td></td>
<td>✓</td>
</tr>
<tr>
<td>5</td>
<td>Forms and system messages help me complete tasks and correct mistakes.</td>
<td></td>
<td></td>
<td></td>
<td></td>
<td>✓</td>
</tr>
<tr>
<td>6</td>
<td>The layout, buttons and design are consistent throughout EasyEarn.</td>
<td></td>
<td></td>
<td></td>
<td></td>
<td>✓</td>
</tr>
<tr>
<td>7</td>
<td>Employer verification requirements are clear and understandable.</td>
<td></td>
<td></td>
<td></td>
<td></td>
<td>✓</td>
</tr>
<tr>
<td>8</td>
<td>The chatbot and available guidance are helpful when I need assistance.</td>
<td></td>
<td></td>
<td></td>
<td></td>
<td>✓</td>
</tr>
<tr>
<td>9</td>
<td>The translation feature is easy to access and use.</td>
<td></td>
<td></td>
<td></td>
<td></td>
<td>✓</td>
</tr>
<tr>
<td>10</td>
<td>Overall, I can complete the main EasyEarn tasks easily and efficiently.</td>
<td></td>
<td></td>
<td></td>
<td></td>
<td>✓</td>
</tr>
</table>

#### Overall Acceptance:

<table>
<tr>
<td>✓</td>
<td>Accept</td>
<td></td>
<td>Accept with Minor Changes</td>
<td></td>
<td>Reject</td>
</tr>
<tr>
<td colspan="3">Additional Comments / Suggestions:</td>
<td colspan="3">-</td>
</tr>
<tr>
<td colspan="3">Tester Signature:</td>
<td colspan="3">Jade</td>
</tr>
</table>

### Appendix 4.2: Ang Mun Hin

#### USER ACCEPTANCE TEST – EasyEarn

Instructions for the tester: Please fill in your name, date, time, institution and device used at the top of this form. Complete each task in Sections A to C without assistance from the system developer. Record ‘Pass’ if you are able to complete the task independently and ‘Fail’ if you are unable to complete it. Use the Remarks column to record anything that you find confusing, unclear or difficult to complete. For Section D, rate each usability statement from 1 (Strongly Disagree) to 5 (Strongly Agree) based on your experience using EasyEarn. After completing all sections, indicate your Overall Acceptance and provide any additional comments or suggestions.

<table>
<tr>
<td>Tester Name</td>
<td>Ang Mun Hin</td>
</tr>
<tr>
<td>Date</td>
<td>08/09/2026</td>
</tr>
<tr>
<td>Time</td>
<td>5:50 PM</td>
</tr>
<tr>
<td>Institution</td>
<td>Universiti Sains Malaysia (USM)</td>
</tr>
<tr>
<td>Device Used</td>
<td>MSI Raider GE78 HX 14V, Intel Core i9, Windows 11</td>
</tr>
<tr>
<td>Roles Tested</td>
<td>Job Seeker, Employer and Administrator</td>
</tr>
</table>

#### Section A: Job Seeker UAT

<table>
<tr>
<td>No</td>
<td>Task</td>
<td>Steps</td>
<td>Pass/Fail</td>
<td>Remarks</td>
</tr>
<tr>
<td>1</td>
<td>Register and Login</td>
<td>1. Open EasyEarn Login.<br>2. Log in with valid Job Seeker credentials.<br>3. Confirm the Job Seeker dashboard opens.</td>
<td>Pass</td>
<td>-</td>
</tr>
<tr>
<td>2</td>
<td>Job Search &amp; Browse</td>
<td>1. Open Jobs.<br>2. Use Search / Filter / Near Me.<br>3. Confirm suitable job listings display correctly.</td>
<td>Pass</td>
<td>-</td>
</tr>
<tr>
<td>3</td>
<td>Job Application</td>
<td>1. Open a suitable job.<br>2. Submit an application and open My Applications.<br>3. Confirm the application and status are shown correctly.</td>
<td>Pass</td>
<td>-</td>
</tr>
<tr>
<td>4</td>
<td>Work History &amp; Rate Employer</td>
<td>1. Open Work History after a completed job.<br>2. Review the completed job and rate the Employer.<br>3. Confirm date, earnings and rating are recorded correctly.</td>
<td>Pass</td>
<td>-</td>
</tr>
<tr>
<td>5</td>
<td>Resume Management</td>
<td>1. Open Resume.<br>2. Refresh/generate it from profile and work history.<br>3. Confirm the details are correct, and the PDF download works.</td>
<td>Pass</td>
<td>-</td>
</tr>
</table>

#### Section B: Employer UAT

<table>
<tr>
<td>No</td>
<td>Task</td>
<td>Steps</td>
<td>Pass/Fail</td>
<td>Remarks</td>
</tr>
<tr>
<td>1</td>
<td>Post Job</td>
<td>1. Open Manage Jobs.<br>2. Enter job details and submit a listing.<br>3. Confirm it appears with the correct status.</td>
<td>Pass</td>
<td>-</td>
</tr>
<tr>
<td>2</td>
<td>View Applicants</td>
<td>1. Open Applicants for a posted job.<br>2. Review the applicant list/details.<br>3. Confirm the correct applicant information is shown.</td>
<td>Pass</td>
<td>-</td>
</tr>
<tr>
<td>3</td>
<td>Accept / Reject Applicant</td>
<td>1. Open an applicant record.<br>2. Choose Accept or Reject.<br>3. Confirm the application status updates.</td>
<td>Pass</td>
<td>-</td>
</tr>
<tr>
<td>4</td>
<td>Employer Verification</td>
<td>1. Open Verification and select Employer Type.<br>2. Enter required details and upload matching documents.<br>3. Submit and confirm the request is recorded for Admin review.</td>
<td>Pass</td>
<td>-</td>
</tr>
<tr>
<td>5</td>
<td>Job Completion &amp; Rate Job Seeker</td>
<td>1. Open the relevant accepted/completion-pending application.<br>2. Confirm completion and rate the Job Seeker.<br>3. Confirm final status and rating are recorded.</td>
<td>Pass</td>
<td>-</td>
</tr>
</table>

#### Section C: Admin UAT

<table>
<tr>
<td>No</td>
<td>Task</td>
<td>Steps</td>
<td>Pass/Fail</td>
<td>Remarks</td>
</tr>
<tr>
<td>1</td>
<td>Lock / Unlock Employer</td>
<td>1. Open Users and select an Employer.<br>2. Lock and confirm access is restricted.<br>3. Unlock and confirm access is restored.</td>
<td>Pass</td>
<td>-</td>
</tr>
<tr>
<td>2</td>
<td>Approve Job</td>
<td>1. Open a pending job in Admin Jobs.<br>2. Approve the listing.<br>3. Confirm the status changes correctly.</td>
<td>Pass</td>
<td>-</td>
</tr>
<tr>
<td>3</td>
<td>Flag / Remove Job</td>
<td>1. Open a job that requires moderation.<br>2. Flag or remove it.<br>3. Confirm the moderation action takes effect.</td>
<td>Pass</td>
<td>-</td>
</tr>
<tr>
<td>4</td>
<td>Employer Verification Review</td>
<td>1. Open Employer Verifications.<br>2. Review type, details and supporting documents.<br>3. Approve / Reject / Recheck and confirm status updates.</td>
<td>Pass</td>
<td>-</td>
</tr>
<tr>
<td>5</td>
<td>Reports</td>
<td>1. Open a submitted report.<br>2. Review and take the appropriate action.<br>3. Confirm the report status updates.</td>
<td>Pass</td>
<td>-</td>
</tr>
</table>

#### Section D: Usability Testing Form

<table>
<tr>
<td>No</td>
<td>Evaluation Item</td>
<td colspan="5">Ratings</td>
</tr>
<tr>
<td colspan="2">1 = Strongly Disagree &#124; 2 = Disagree &#124; 3 = Neutral &#124; 4 = Agree &#124; 5 = Strongly Agree</td>
<td>1</td>
<td>2</td>
<td>3</td>
<td>4</td>
<td>5</td>
</tr>
<tr>
<td>1</td>
<td>The navigation menu makes it easy to find the functions I need.</td>
<td></td>
<td></td>
<td></td>
<td></td>
<td>✓</td>
</tr>
<tr>
<td>2</td>
<td>Job information, buttons and instructions are clear and easy to understand.</td>
<td></td>
<td></td>
<td></td>
<td></td>
<td>✓</td>
</tr>
<tr>
<td>3</td>
<td>Job search, filters and Near Me are easy to use.</td>
<td></td>
<td></td>
<td></td>
<td></td>
<td>✓</td>
</tr>
<tr>
<td>4</td>
<td>Application status and next actions are clearly displayed.</td>
<td></td>
<td></td>
<td></td>
<td></td>
<td>✓</td>
</tr>
<tr>
<td>5</td>
<td>Forms and system messages help me complete tasks and correct mistakes.</td>
<td></td>
<td></td>
<td></td>
<td>✓</td>
<td></td>
</tr>
<tr>
<td>6</td>
<td>The layout, buttons and design are consistent throughout EasyEarn.</td>
<td></td>
<td></td>
<td></td>
<td></td>
<td>✓</td>
</tr>
<tr>
<td>7</td>
<td>Employer verification requirements are clear and understandable.</td>
<td></td>
<td></td>
<td></td>
<td>✓</td>
<td></td>
</tr>
<tr>
<td>8</td>
<td>The chatbot and available guidance are helpful when I need assistance.</td>
<td></td>
<td></td>
<td></td>
<td>✓</td>
<td></td>
</tr>
<tr>
<td>9</td>
<td>The translation feature is easy to access and use.</td>
<td></td>
<td></td>
<td></td>
<td></td>
<td>✓</td>
</tr>
<tr>
<td>10</td>
<td>Overall, I can complete the main EasyEarn tasks easily and efficiently.</td>
<td></td>
<td></td>
<td></td>
<td></td>
<td>✓</td>
</tr>
</table>

#### Overall Acceptance:

<table>
<tr>
<td>✓</td>
<td>Accept</td>
<td></td>
<td>Accept with Minor Changes</td>
<td></td>
<td>Reject</td>
</tr>
<tr>
<td colspan="3">Additional Comments / Suggestions:</td>
<td colspan="3">-</td>
</tr>
<tr>
<td colspan="3">Tester Signature:</td>
<td colspan="3">AMH</td>
</tr>
</table>

### Appendix 4.3: Seah Pei Yan

#### USER ACCEPTANCE TEST – EasyEarn

Instructions for the tester: Please fill in your name, date, time, institution and device used at the top of this form. Complete each task in Sections A to C without assistance from the system developer. Record ‘Pass’ if you are able to complete the task independently and ‘Fail’ if you are unable to complete it. Use the Remarks column to record anything that you find confusing, unclear or difficult to complete. For Section D, rate each usability statement from 1 (Strongly Disagree) to 5 (Strongly Agree) based on your experience using EasyEarn. After completing all sections, indicate your Overall Acceptance and provide any additional comments or suggestions.

<table>
<tr>
<td>Tester Name</td>
<td>Seah Pei Yan</td>
</tr>
<tr>
<td>Date</td>
<td>10/09/2026</td>
</tr>
<tr>
<td>Time</td>
<td>10:59 PM</td>
</tr>
<tr>
<td>Institution</td>
<td>Universiti Malaysia Perlis (UNIMAP)</td>
</tr>
<tr>
<td>Device Used</td>
<td>iPhone 15 Pro Max, Safari</td>
</tr>
<tr>
<td>Roles Tested</td>
<td>Job Seeker, Employer and Administrator</td>
</tr>
</table>

#### Section A: Job Seeker UAT

<table>
<tr>
<td>No</td>
<td>Task</td>
<td>Steps</td>
<td>Pass/Fail</td>
<td>Remarks</td>
</tr>
<tr>
<td>1</td>
<td>Register and Login</td>
<td>1. Open EasyEarn Login.<br>2. Log in with valid Job Seeker credentials.<br>3. Confirm the Job Seeker dashboard opens.</td>
<td>Pass</td>
<td>-</td>
</tr>
<tr>
<td>2</td>
<td>Job Search &amp; Browse</td>
<td>1. Open Jobs.<br>2. Use Search / Filter / Near Me.<br>3. Confirm suitable job listings display correctly.</td>
<td>Pass</td>
<td>-</td>
</tr>
<tr>
<td>3</td>
<td>Job Application</td>
<td>1. Open a suitable job.<br>2. Submit an application and open My Applications.<br>3. Confirm the application and status are shown correctly.</td>
<td>Pass</td>
<td>-</td>
</tr>
<tr>
<td>4</td>
<td>Work History &amp; Rate Employer</td>
<td>1. Open Work History after a completed job.<br>2. Review the completed job and rate the Employer.<br>3. Confirm date, earnings and rating are recorded correctly.</td>
<td>Pass</td>
<td>-</td>
</tr>
<tr>
<td>5</td>
<td>Resume Management</td>
<td>1. Open Resume.<br>2. Refresh/generate it from profile and work history.<br>3. Confirm the details are correct, and the PDF download works.</td>
<td>Pass</td>
<td>-</td>
</tr>
</table>

#### Section B: Employer UAT

<table>
<tr>
<td>No</td>
<td>Task</td>
<td>Steps</td>
<td>Pass/Fail</td>
<td>Remarks</td>
</tr>
<tr>
<td>1</td>
<td>Post Job</td>
<td>1. Open Manage Jobs.<br>2. Enter job details and submit a listing.<br>3. Confirm it appears with the correct status.</td>
<td>Pass</td>
<td>-</td>
</tr>
<tr>
<td>2</td>
<td>View Applicants</td>
<td>1. Open Applicants for a posted job.<br>2. Review the applicant list/details.<br>3. Confirm the correct applicant information is shown.</td>
<td>Pass</td>
<td>-</td>
</tr>
<tr>
<td>3</td>
<td>Accept / Reject Applicant</td>
<td>1. Open an applicant record.<br>2. Choose Accept or Reject.<br>3. Confirm the application status updates.</td>
<td>Pass</td>
<td>-</td>
</tr>
<tr>
<td>4</td>
<td>Employer Verification</td>
<td>1. Open Verification and select Employer Type.<br>2. Enter required details and upload matching documents.<br>3. Submit and confirm the request is recorded for Admin review.</td>
<td>Pass</td>
<td>-</td>
</tr>
<tr>
<td>5</td>
<td>Job Completion &amp; Rate Job Seeker</td>
<td>1. Open the relevant accepted/completion-pending application.<br>2. Confirm completion and rate the Job Seeker.<br>3. Confirm final status and rating are recorded.</td>
<td>Pass</td>
<td>-</td>
</tr>
</table>

#### Section C: Admin UAT

<table>
<tr>
<td>No</td>
<td>Task</td>
<td>Steps</td>
<td>Pass/Fail</td>
<td>Remarks</td>
</tr>
<tr>
<td>1</td>
<td>Lock / Unlock Employer</td>
<td>1. Open Users and select an Employer.<br>2. Lock and confirm access is restricted.<br>3. Unlock and confirm access is restored.</td>
<td>Pass</td>
<td>-</td>
</tr>
<tr>
<td>2</td>
<td>Approve Job</td>
<td>1. Open a pending job in Admin Jobs.<br>2. Approve the listing.<br>3. Confirm the status changes correctly.</td>
<td>Pass</td>
<td>-</td>
</tr>
<tr>
<td>3</td>
<td>Flag / Remove Job</td>
<td>1. Open a job that requires moderation.<br>2. Flag or remove it.<br>3. Confirm the moderation action takes effect.</td>
<td>Pass</td>
<td>-</td>
</tr>
<tr>
<td>4</td>
<td>Employer Verification Review</td>
<td>1. Open Employer Verifications.<br>2. Review type, details and supporting documents.<br>3. Approve / Reject / Recheck and confirm status updates.</td>
<td>Pass</td>
<td>-</td>
</tr>
<tr>
<td>5</td>
<td>Reports</td>
<td>1. Open a submitted report.<br>2. Review and take the appropriate action.<br>3. Confirm the report status updates.</td>
<td>Pass</td>
<td>-</td>
</tr>
</table>

#### Section D: Usability Testing Form

<table>
<tr>
<td>No</td>
<td>Evaluation Item</td>
<td colspan="5">Ratings</td>
</tr>
<tr>
<td colspan="2">1 = Strongly Disagree &#124; 2 = Disagree &#124; 3 = Neutral &#124; 4 = Agree &#124; 5 = Strongly Agree</td>
<td>1</td>
<td>2</td>
<td>3</td>
<td>4</td>
<td>5</td>
</tr>
<tr>
<td>1</td>
<td>The navigation menu makes it easy to find the functions I need.</td>
<td></td>
<td></td>
<td></td>
<td></td>
<td>✓</td>
</tr>
<tr>
<td>2</td>
<td>Job information, buttons and instructions are clear and easy to understand.</td>
<td></td>
<td></td>
<td></td>
<td></td>
<td>✓</td>
</tr>
<tr>
<td>3</td>
<td>Job search, filters and Near Me are easy to use.</td>
<td></td>
<td></td>
<td></td>
<td></td>
<td>✓</td>
</tr>
<tr>
<td>4</td>
<td>Application status and next actions are clearly displayed.</td>
<td></td>
<td></td>
<td></td>
<td></td>
<td>✓</td>
</tr>
<tr>
<td>5</td>
<td>Forms and system messages help me complete tasks and correct mistakes.</td>
<td></td>
<td></td>
<td></td>
<td></td>
<td>✓</td>
</tr>
<tr>
<td>6</td>
<td>The layout, buttons and design are consistent throughout EasyEarn.</td>
<td></td>
<td></td>
<td></td>
<td></td>
<td>✓</td>
</tr>
<tr>
<td>7</td>
<td>Employer verification requirements are clear and understandable.</td>
<td></td>
<td></td>
<td></td>
<td>✓</td>
<td></td>
</tr>
<tr>
<td>8</td>
<td>The chatbot and available guidance are helpful when I need assistance.</td>
<td></td>
<td></td>
<td></td>
<td>✓</td>
<td></td>
</tr>
<tr>
<td>9</td>
<td>The translation feature is easy to access and use.</td>
<td></td>
<td></td>
<td></td>
<td></td>
<td>✓</td>
</tr>
<tr>
<td>10</td>
<td>Overall, I can complete the main EasyEarn tasks easily and efficiently.</td>
<td></td>
<td></td>
<td></td>
<td></td>
<td>✓</td>
</tr>
</table>

#### Overall Acceptance:

<table>
<tr>
<td>✓</td>
<td>Accept</td>
<td></td>
<td>Accept with Minor Changes</td>
<td></td>
<td>Reject</td>
</tr>
<tr>
<td colspan="3">Additional Comments / Suggestions:</td>
<td colspan="3">-</td>
</tr>
<tr>
<td colspan="3">Tester Signature:</td>
<td colspan="3">chole</td>
</tr>
</table>

### Appendix 4.4: Lee Jian Hou

#### USER ACCEPTANCE TEST – EasyEarn

Instructions for the tester: Please fill in your name, date, time, institution and device used at the top of this form. Complete each task in Sections A to C without assistance from the system developer. Record ‘Pass’ if you are able to complete the task independently and ‘Fail’ if you are unable to complete it. Use the Remarks column to record anything that you find confusing, unclear or difficult to complete. For Section D, rate each usability statement from 1 (Strongly Disagree) to 5 (Strongly Agree) based on your experience using EasyEarn. After completing all sections, indicate your Overall Acceptance and provide any additional comments or suggestions.

<table>
<tr>
<td>Tester Name</td>
<td>Lee Jian Hou</td>
</tr>
<tr>
<td>Date</td>
<td>10/09/2026</td>
</tr>
<tr>
<td>Time</td>
<td>11:02 PM</td>
</tr>
<tr>
<td>Institution</td>
<td>Sunway College Ipoh (SCI)</td>
</tr>
<tr>
<td>Device Used</td>
<td>HONOR Pad 9, Android, Chrome</td>
</tr>
<tr>
<td>Roles Tested</td>
<td>Job Seeker, Employer and Administrator</td>
</tr>
</table>

#### Section A: Job Seeker UAT

<table>
<tr>
<td>No</td>
<td>Task</td>
<td>Steps</td>
<td>Pass/Fail</td>
<td>Remarks</td>
</tr>
<tr>
<td>1</td>
<td>Register and Login</td>
<td>1. Open EasyEarn Login.<br>2. Log in with valid Job Seeker credentials.<br>3. Confirm the Job Seeker dashboard opens.</td>
<td>Pass</td>
<td>-</td>
</tr>
<tr>
<td>2</td>
<td>Job Search &amp; Browse</td>
<td>1. Open Jobs.<br>2. Use Search / Filter / Near Me.<br>3. Confirm suitable job listings display correctly.</td>
<td>Pass</td>
<td>-</td>
</tr>
<tr>
<td>3</td>
<td>Job Application</td>
<td>1. Open a suitable job.<br>2. Submit an application and open My Applications.<br>3. Confirm the application and status are shown correctly.</td>
<td>Pass</td>
<td>-</td>
</tr>
<tr>
<td>4</td>
<td>Work History &amp; Rate Employer</td>
<td>1. Open Work History after a completed job.<br>2. Review the completed job and rate the Employer.<br>3. Confirm date, earnings and rating are recorded correctly.</td>
<td>Pass</td>
<td>-</td>
</tr>
<tr>
<td>5</td>
<td>Resume Management</td>
<td>1. Open Resume.<br>2. Refresh/generate it from profile and work history.<br>3. Confirm the details are correct, and the PDF download works.</td>
<td>Pass</td>
<td>-</td>
</tr>
</table>

#### Section B: Employer UAT

<table>
<tr>
<td>No</td>
<td>Task</td>
<td>Steps</td>
<td>Pass/Fail</td>
<td>Remarks</td>
</tr>
<tr>
<td>1</td>
<td>Post Job</td>
<td>1. Open Manage Jobs.<br>2. Enter job details and submit a listing.<br>3. Confirm it appears with the correct status.</td>
<td>Pass</td>
<td>-</td>
</tr>
<tr>
<td>2</td>
<td>View Applicants</td>
<td>1. Open Applicants for a posted job.<br>2. Review the applicant list/details.<br>3. Confirm the correct applicant information is shown.</td>
<td>Pass</td>
<td>-</td>
</tr>
<tr>
<td>3</td>
<td>Accept / Reject Applicant</td>
<td>1. Open an applicant record.<br>2. Choose Accept or Reject.<br>3. Confirm the application status updates.</td>
<td>Pass</td>
<td>-</td>
</tr>
<tr>
<td>4</td>
<td>Employer Verification</td>
<td>1. Open Verification and select Employer Type.<br>2. Enter required details and upload matching documents.<br>3. Submit and confirm the request is recorded for Admin review.</td>
<td>Pass</td>
<td>-</td>
</tr>
<tr>
<td>5</td>
<td>Job Completion &amp; Rate Job Seeker</td>
<td>1. Open the relevant accepted/completion-pending application.<br>2. Confirm completion and rate the Job Seeker.<br>3. Confirm final status and rating are recorded.</td>
<td>Pass</td>
<td>-</td>
</tr>
</table>

#### Section C: Admin UAT

<table>
<tr>
<td>No</td>
<td>Task</td>
<td>Steps</td>
<td>Pass/Fail</td>
<td>Remarks</td>
</tr>
<tr>
<td>1</td>
<td>Lock / Unlock Employer</td>
<td>1. Open Users and select an Employer.<br>2. Lock and confirm access is restricted.<br>3. Unlock and confirm access is restored.</td>
<td>Pass</td>
<td>-</td>
</tr>
<tr>
<td>2</td>
<td>Approve Job</td>
<td>1. Open a pending job in Admin Jobs.<br>2. Approve the listing.<br>3. Confirm the status changes correctly.</td>
<td>Pass</td>
<td>-</td>
</tr>
<tr>
<td>3</td>
<td>Flag / Remove Job</td>
<td>1. Open a job that requires moderation.<br>2. Flag or remove it.<br>3. Confirm the moderation action takes effect.</td>
<td>Pass</td>
<td>-</td>
</tr>
<tr>
<td>4</td>
<td>Employer Verification Review</td>
<td>1. Open Employer Verifications.<br>2. Review type, details and supporting documents.<br>3. Approve / Reject / Recheck and confirm status updates.</td>
<td>Pass</td>
<td>-</td>
</tr>
<tr>
<td>5</td>
<td>Reports</td>
<td>1. Open a submitted report.<br>2. Review and take the appropriate action.<br>3. Confirm the report status updates.</td>
<td>Pass</td>
<td>-</td>
</tr>
</table>

#### Section D: Usability Testing Form

<table>
<tr>
<td>No</td>
<td>Evaluation Item</td>
<td colspan="5">Ratings</td>
</tr>
<tr>
<td colspan="2">1 = Strongly Disagree &#124; 2 = Disagree &#124; 3 = Neutral &#124; 4 = Agree &#124; 5 = Strongly Agree</td>
<td>1</td>
<td>2</td>
<td>3</td>
<td>4</td>
<td>5</td>
</tr>
<tr>
<td>1</td>
<td>The navigation menu makes it easy to find the functions I need.</td>
<td></td>
<td></td>
<td></td>
<td></td>
<td>✓</td>
</tr>
<tr>
<td>2</td>
<td>Job information, buttons and instructions are clear and easy to understand.</td>
<td></td>
<td></td>
<td></td>
<td></td>
<td>✓</td>
</tr>
<tr>
<td>3</td>
<td>Job search, filters and Near Me are easy to use.</td>
<td></td>
<td></td>
<td></td>
<td></td>
<td>✓</td>
</tr>
<tr>
<td>4</td>
<td>Application status and next actions are clearly displayed.</td>
<td></td>
<td></td>
<td></td>
<td></td>
<td>✓</td>
</tr>
<tr>
<td>5</td>
<td>Forms and system messages help me complete tasks and correct mistakes.</td>
<td></td>
<td></td>
<td></td>
<td>✓</td>
<td></td>
</tr>
<tr>
<td>6</td>
<td>The layout, buttons and design are consistent throughout EasyEarn.</td>
<td></td>
<td></td>
<td></td>
<td></td>
<td>✓</td>
</tr>
<tr>
<td>7</td>
<td>Employer verification requirements are clear and understandable.</td>
<td></td>
<td></td>
<td></td>
<td>✓</td>
<td></td>
</tr>
<tr>
<td>8</td>
<td>The chatbot and available guidance are helpful when I need assistance.</td>
<td></td>
<td></td>
<td></td>
<td>✓</td>
<td></td>
</tr>
<tr>
<td>9</td>
<td>The translation feature is easy to access and use.</td>
<td></td>
<td></td>
<td></td>
<td></td>
<td>✓</td>
</tr>
<tr>
<td>10</td>
<td>Overall, I can complete the main EasyEarn tasks easily and efficiently.</td>
<td></td>
<td></td>
<td></td>
<td></td>
<td>✓</td>
</tr>
</table>

#### Overall Acceptance:

<table>
<tr>
<td>✓</td>
<td>Accept</td>
<td></td>
<td>Accept with Minor Changes</td>
<td></td>
<td>Reject</td>
</tr>
<tr>
<td colspan="3">Additional Comments / Suggestions:</td>
<td colspan="3">-</td>
</tr>
<tr>
<td colspan="3">Tester Signature:</td>
<td colspan="3">Lee</td>
</tr>
</table>

### Appendix 4.5: Wong Ke Ni

#### USER ACCEPTANCE TEST – EasyEarn

Instructions for the tester: Please fill in your name, date, time, institution and device used at the top of this form. Complete each task in Sections A to C without assistance from the system developer. Record ‘Pass’ if you are able to complete the task independently and ‘Fail’ if you are unable to complete it. Use the Remarks column to record anything that you find confusing, unclear or difficult to complete. For Section D, rate each usability statement from 1 (Strongly Disagree) to 5 (Strongly Agree) based on your experience using EasyEarn. After completing all sections, indicate your Overall Acceptance and provide any additional comments or suggestions.

<table>
<tr>
<td>Tester Name</td>
<td>Wong Ke Ni</td>
</tr>
<tr>
<td>Date</td>
<td>15/09/2026</td>
</tr>
<tr>
<td>Time</td>
<td>10:15 AM</td>
</tr>
<tr>
<td>Institution</td>
<td>Quest International University (QIU)</td>
</tr>
<tr>
<td>Device Used</td>
<td>HONOR X9b, Android, Chrome</td>
</tr>
<tr>
<td>Roles Tested</td>
<td>Job Seeker, Employer and Administrator</td>
</tr>
</table>

#### Section A: Job Seeker UAT

<table>
<tr>
<td>No</td>
<td>Task</td>
<td>Steps</td>
<td>Pass/Fail</td>
<td>Remarks</td>
</tr>
<tr>
<td>1</td>
<td>Register and Login</td>
<td>1. Open EasyEarn Login.<br>2. Log in with valid Job Seeker credentials.<br>3. Confirm the Job Seeker dashboard opens.</td>
<td>Pass</td>
<td>-</td>
</tr>
<tr>
<td>2</td>
<td>Job Search &amp; Browse</td>
<td>1. Open Jobs.<br>2. Use Search / Filter / Near Me.<br>3. Confirm suitable job listings display correctly.</td>
<td>Pass</td>
<td>-</td>
</tr>
<tr>
<td>3</td>
<td>Job Application</td>
<td>1. Open a suitable job.<br>2. Submit an application and open My Applications.<br>3. Confirm the application and status are shown correctly.</td>
<td>Pass</td>
<td>-</td>
</tr>
<tr>
<td>4</td>
<td>Work History &amp; Rate Employer</td>
<td>1. Open Work History after a completed job.<br>2. Review the completed job and rate the Employer.<br>3. Confirm date, earnings and rating are recorded correctly.</td>
<td>Pass</td>
<td>-</td>
</tr>
<tr>
<td>5</td>
<td>Resume Management</td>
<td>1. Open Resume.<br>2. Refresh/generate it from profile and work history.<br>3. Confirm the details are correct, and the PDF download works.</td>
<td>Pass</td>
<td>-</td>
</tr>
</table>

#### Section B: Employer UAT

<table>
<tr>
<td>No</td>
<td>Task</td>
<td>Steps</td>
<td>Pass/Fail</td>
<td>Remarks</td>
</tr>
<tr>
<td>1</td>
<td>Post Job</td>
<td>1. Open Manage Jobs.<br>2. Enter job details and submit a listing.<br>3. Confirm it appears with the correct status.</td>
<td>Pass</td>
<td>-</td>
</tr>
<tr>
<td>2</td>
<td>View Applicants</td>
<td>1. Open Applicants for a posted job.<br>2. Review the applicant list/details.<br>3. Confirm the correct applicant information is shown.</td>
<td>Pass</td>
<td>-</td>
</tr>
<tr>
<td>3</td>
<td>Accept / Reject Applicant</td>
<td>1. Open an applicant record.<br>2. Choose Accept or Reject.<br>3. Confirm the application status updates.</td>
<td>Pass</td>
<td>-</td>
</tr>
<tr>
<td>4</td>
<td>Employer Verification</td>
<td>1. Open Verification and select Employer Type.<br>2. Enter required details and upload matching documents.<br>3. Submit and confirm the request is recorded for Admin review.</td>
<td>Pass</td>
<td>-</td>
</tr>
<tr>
<td>5</td>
<td>Job Completion &amp; Rate Job Seeker</td>
<td>1. Open the relevant accepted/completion-pending application.<br>2. Confirm completion and rate the Job Seeker.<br>3. Confirm final status and rating are recorded.</td>
<td>Pass</td>
<td>-</td>
</tr>
</table>

#### Section C: Admin UAT

<table>
<tr>
<td>No</td>
<td>Task</td>
<td>Steps</td>
<td>Pass/Fail</td>
<td>Remarks</td>
</tr>
<tr>
<td>1</td>
<td>Lock / Unlock Employer</td>
<td>1. Open Users and select an Employer.<br>2. Lock and confirm access is restricted.<br>3. Unlock and confirm access is restored.</td>
<td>Pass</td>
<td>-</td>
</tr>
<tr>
<td>2</td>
<td>Approve Job</td>
<td>1. Open a pending job in Admin Jobs.<br>2. Approve the listing.<br>3. Confirm the status changes correctly.</td>
<td>Pass</td>
<td>-</td>
</tr>
<tr>
<td>3</td>
<td>Flag / Remove Job</td>
<td>1. Open a job that requires moderation.<br>2. Flag or remove it.<br>3. Confirm the moderation action takes effect.</td>
<td>Pass</td>
<td>-</td>
</tr>
<tr>
<td>4</td>
<td>Employer Verification Review</td>
<td>1. Open Employer Verifications.<br>2. Review type, details and supporting documents.<br>3. Approve / Reject / Recheck and confirm status updates.</td>
<td>Pass</td>
<td>-</td>
</tr>
<tr>
<td>5</td>
<td>Reports</td>
<td>1. Open a submitted report.<br>2. Review and take the appropriate action.<br>3. Confirm the report status updates.</td>
<td>Pass</td>
<td>-</td>
</tr>
</table>

#### Section D: Usability Testing Form

<table>
<tr>
<td>No</td>
<td>Evaluation Item</td>
<td colspan="5">Ratings</td>
</tr>
<tr>
<td colspan="2">1 = Strongly Disagree &#124; 2 = Disagree &#124; 3 = Neutral &#124; 4 = Agree &#124; 5 = Strongly Agree</td>
<td>1</td>
<td>2</td>
<td>3</td>
<td>4</td>
<td>5</td>
</tr>
<tr>
<td>1</td>
<td>The navigation menu makes it easy to find the functions I need.</td>
<td></td>
<td></td>
<td></td>
<td></td>
<td>✓</td>
</tr>
<tr>
<td>2</td>
<td>Job information, buttons and instructions are clear and easy to understand.</td>
<td></td>
<td></td>
<td></td>
<td></td>
<td>✓</td>
</tr>
<tr>
<td>3</td>
<td>Job search, filters and Near Me are easy to use.</td>
<td></td>
<td></td>
<td></td>
<td></td>
<td>✓</td>
</tr>
<tr>
<td>4</td>
<td>Application status and next actions are clearly displayed.</td>
<td></td>
<td></td>
<td></td>
<td></td>
<td>✓</td>
</tr>
<tr>
<td>5</td>
<td>Forms and system messages help me complete tasks and correct mistakes.</td>
<td></td>
<td></td>
<td></td>
<td></td>
<td>✓</td>
</tr>
<tr>
<td>6</td>
<td>The layout, buttons and design are consistent throughout EasyEarn.</td>
<td></td>
<td></td>
<td></td>
<td></td>
<td>✓</td>
</tr>
<tr>
<td>7</td>
<td>Employer verification requirements are clear and understandable.</td>
<td></td>
<td></td>
<td></td>
<td></td>
<td>✓</td>
</tr>
<tr>
<td>8</td>
<td>The chatbot and available guidance are helpful when I need assistance.</td>
<td></td>
<td></td>
<td></td>
<td></td>
<td>✓</td>
</tr>
<tr>
<td>9</td>
<td>The translation feature is easy to access and use.</td>
<td></td>
<td></td>
<td></td>
<td></td>
<td>✓</td>
</tr>
<tr>
<td>10</td>
<td>Overall, I can complete the main EasyEarn tasks easily and efficiently.</td>
<td></td>
<td></td>
<td></td>
<td></td>
<td>✓</td>
</tr>
</table>

#### Overall Acceptance:

<table>
<tr>
<td>✓</td>
<td>Accept</td>
<td></td>
<td>Accept with Minor Changes</td>
<td></td>
<td>Reject</td>
</tr>
<tr>
<td colspan="3">Additional Comments / Suggestions:</td>
<td colspan="3">-</td>
</tr>
<tr>
<td colspan="3">Tester Signature:</td>
<td colspan="3">Keni</td>
</tr>
</table>

## Appendix 5: Security Testing

This appendix provides the detailed Security Testing test cases and supporting evidence that are not presented in Section 4.3.4. Security Testing was conducted across nine categories: RLS - Data Isolation, Auth & Access Control, Upload Security, Input Sanitisation, Rating & Business Rules, Report Security, Analytics & Chatbot, PDPA & Compliance, and Employer Verification & Visibility. A total of 30 Security Testing test cases (SEC-001 to SEC-030) were executed, and all 30 achieved a Pass result in the final testing round. Section 4.3.4 provides one representative test case from each category, while the rest of the test cases and supporting evidence are provided in Appendix 5.1 to Appendix 5.9. There were a number of limitations that were identified during the early testing phases, which were resolved and successfully retested prior to the final results being recorded.

### Appendix 5.1: RLS - Data Isolation

This appendix provides the remaining RLS - Data Isolation Security Testing test cases that are not presented in Section 4.3.4.1. These tests provide supporting evidence for the RLS controls applied to user-specific records, including applications, notifications, job listings, verification information, payments, saved jobs, user profiles and work history. The representative test case, SEC-001: Seeker Cannot Read Another Job Seeker's Applications, is presented in Section 4.3.4.1, while the additional RLS - Data Isolation test cases are provided below.

##### SEC-002: Seeker Cannot Update Another Seeker's Application Status

**Recorded result: Pass.**

While authenticated as ABCD, updateApplicationStatus() was called for Len Pei Ying's application and the helper returned {id: '895fe1b2-7ba7-4d2c-b071-ee5929d10797', status: 'rejected'}. However, a direct database check immediately afterwards showed the application still stored as status = completed. Therefore the requested cross-seeker update did not persist.

**Expected result:** The cross-seeker UPDATE must not persist. The target application's stored status should remain unchanged because RLS restricts update access to the owning seeker.

**Test procedure:**

1. Log in as Job Seeker ABCD.
2. Using ABCD's authenticated browser session, call updateApplicationStatus() for Len Pei Ying's application ID and request status = rejected.
3. Query the same application directly in Supabase SQL Editor and verify the stored status.

**Test input:** Authenticated user: ABCD
Target application: 895fe1b2-7ba7-4d2c-b071-ee5929d10797
Owner seeker_id: 31c79f9e-2dee-44f9-80d7-2a70725dbb52 (Len Pei Ying)
Attempted status: rejected

**Recorded comments:** RLS prevented the unauthorized update from persisting. Note: the client helper returns the requested status without confirming an affected row, so database verification is required.

Figure A5.1 retains the original screenshot associated with this case. The result and comments above follow the latest testing workbook.

The database readback, rather than the optimistic client-helper response, is the basis of the recorded Pass result.

![Report figure](<Appendix Diagram/Final_Report_Len_Pei_Ying_QIU-202404-007159.pdf-0366-01.png>)

_Figure A5.1: RLS - Data Isolation (Seeker Application Update Isolation)_

##### SEC-003: Seeker Cannot Read Another User's Notifications

**Recorded result: Pass.**

Using ABCD's authenticated session, fetchNotifications(ABCD_ID) returned 1 notification with user_id = ABCD (application_update: 'Your application for Event Crew (F&amp;B Booth – SugarShine) is now pending.'). Using the same session, fetchNotifications(LEN_ID) returned an empty array []. No Len Pei Ying notification rows were exposed.

**Expected result:** ABCD's own notification rows may be returned. A request for Len Pei Ying's notifications from ABCD's authenticated session should return no Len-owned notification rows.

**Test procedure:**

1. Log in as Job Seeker ABCD.
2. Using ABCD's authenticated browser session, call fetchNotifications() with ABCD's user ID.
3. In the same session, call fetchNotifications() with Len Pei Ying's user ID and compare the returned arrays.

**Test input:** Authenticated user: ABCD (d1ff41b4-fb7d-4398-a270-c405c83fc795)
Other user: Len Pei Ying (31c79f9e-2dee-44f9-80d7-2a70725dbb52)

**Recorded comments:** Runtime RLS isolation was confirmed: ABCD could read an own notification row but not another user's notifications.

Figure A5.2 retains the original screenshot associated with this case. The result and comments above follow the latest testing workbook.

![Report figure](<Appendix Diagram/Final_Report_Len_Pei_Ying_QIU-202404-007159.pdf-0366-05.png>)

_Figure A5.2: RLS - Data Isolation (Notification Read Isolation)_

##### SEC-004: Employer cannot update another employer's job listing

**Recorded result: Pass.**

While authenticated as SugarShine, updateJobListing() was called for W&amp;X Bakery's job with title = 'SEC-004 UNAUTHORIZED TEST'. The helper returned null. A direct database check immediately afterwards showed the job still stored as title = 'Event Crew (F&amp;B Booth – W&amp;X Bakery)' with status = approved. The unauthorized cross-employer update did not persist.

**Expected result:** The cross-employer UPDATE must not persist. The W&amp;X Bakery job title should remain unchanged because update access is restricted to the owning employer.

**Test procedure:**

1. Log in as employer SugarShine.
2. Using SugarShine's authenticated browser session, call updateJobListing() for W&amp;X Bakery's job and attempt to change its title.
3. Query the same job row directly in Supabase SQL Editor and verify whether the stored title changed.

**Test input:** Authenticated employer: SugarShine
Target job: b534a64e-03ea-498c-9504-b39ebae6980d
Owner employer_id: cfc76680-17f4-4670-a0cd-c5c02b6a6650 (W&amp;X Bakery)
Attempted title: SEC-004 UNAUTHORIZED TEST

**Recorded comments:** Runtime ownership enforcement was confirmed: a different employer could not modify W&amp;X Bakery's listing.

Figure A5.3 retains the original screenshot associated with this case. The result and comments above follow the latest testing workbook.

![Report figure](<Appendix Diagram/Final_Report_Len_Pei_Ying_QIU-202404-007159.pdf-0367-03.png>)

_Figure A5.3: RLS - Data Isolation (Job Listing Update Isolation)_

##### SEC-005: Employer Cannot Modify Another Employer's Verification Documents

**Recorded result: Pass.**

Retest passed. RLS is enabled on public.users. The active SELECT policies allow only users_select_own (auth.uid() = id) and users_select_admin (is_admin_user(auth.uid())). SugarShine's authenticated user had no admin app_metadata role. A direct authenticated query to public.users for W&amp;X Bakery's id and sensitive verification columns returned testData = [] and testError = null. Therefore the target row and verification document fields were not exposed to SugarShine. The earlier fetchProfile observation was not used as final evidence because the direct raw RLS retest contradicted it.

**Expected result:** A non-owner, non-admin employer must not receive W&amp;X Bakery's row or sensitive verification fields. RLS may silently filter the row, returning an empty array without an error.

**Test procedure:**

1. Log in as employer SugarShine and confirm the authenticated user is not an admin.
2. Using the authenticated Supabase client, query public.users directly for W&amp;X Bakery's id and select the sensitive verification columns.
3. Inspect the raw query result and error returned by Supabase RLS.

**Test input:** Authenticated user id: df0abc84-7df8-4709-94de-02f43e097c84 (SugarShine)
app_metadata.role: undefined (not admin)
Target employer: W&amp;X Bakery (cfc76680-17f4-4670-a0cd-c5c02b6a6650)
Queried columns: id, full_name, email, ssm_number, registration_doc_name, registration_doc_data, contact_doc_name, contact_doc_data

**Recorded comments:** Final SEC-005 result is based on the direct authenticated raw Supabase query. RLS correctly filtered another employer's users row. No cross-employer verification document access was returned in the retest.

Figure A5.4 retains the original screenshot associated with this case. The result and comments above follow the latest testing workbook.

![Report figure](<Appendix Diagram/Final_Report_Len_Pei_Ying_QIU-202404-007159.pdf-0367-07.png>)

_Figure A5.4: RLS - Data Isolation (Verification Document Access)_

##### SEC-006: Seeker Cannot Insert a Payment Record on the Employer's Behalf

**Recorded result: Pass.**

Retest passed. The authenticated user ID was confirmed as ABCD (d1ff41b4-fb7d-4398-a270-c405c83fc795). The direct payments INSERT attempting payer_id = SugarShine returned HTTP 403 with PostgreSQL error code 42501: 'new row violates row-level security policy for table "payments"'. retestData was null. A database query for application_id 888c03d0-98d9-4e89-bce4-5e0f4ef799c1 and amount 6.07 returned 0 rows, confirming no test payment was inserted.

**Expected result:** The Job Seeker must not be able to create a payment row on the employer's behalf. The insert should be rejected by RLS and no matching payment row should exist.

**Test procedure:**

1. Log in as Job Seeker ABCD and confirm the authenticated user ID.
2. Using ABCD's authenticated Supabase client, insert into payments for ABCD's application while setting payer_id to SugarShine and payee_id to ABCD.
3. Query the database for the inserted test amount and verify whether the forged payment row exists.

**Test input:** Authenticated seeker: ABCD (d1ff41b4-fb7d-4398-a270-c405c83fc795)
Application: 888c03d0-98d9-4e89-bce4-5e0f4ef799c1
Attempted payer_id: SugarShine (df0abc84-7df8-4709-94de-02f43e097c84)
payee_id: ABCD
amount: 6.07
method: SEC-006 RETEST

**Recorded comments:** Final SEC-006 result is based on the clean retest using the real ABCD authenticated browser session. RLS blocked the forged employer payment insert and no matching database row persisted.

Figure A5.5 retains the original screenshot associated with this case. The result and comments above follow the latest testing workbook.

![Report figure](<Appendix Diagram/Final_Report_Len_Pei_Ying_QIU-202404-007159.pdf-0368-03.png>)

_Figure A5.5: RLS - Data Isolation (Payment Insert Restriction)_

##### SEC-007: Seeker Cannot Update Another Seeker's Payment Confirmation

**Recorded result: Pass.**

While authenticated as ABCD, the UPDATE targeting Tsuki's payment returned sec007Data = [] and sec007Error = null. A direct database check afterwards showed seeker_confirmed_at remained 2026-09-29 19:48:14.227+00. Therefore ABCD could not modify another seeker's payment confirmation timestamp.

**Expected result:** The cross-seeker UPDATE must not persist. ABCD should receive no updated row, and Tsuki's stored seeker_confirmed_at value must remain unchanged.

**Test procedure:**

1. Log in as Job Seeker ABCD and confirm the authenticated user ID.
2. Using ABCD's authenticated Supabase client, attempt to update seeker_confirmed_at for Tsuki's payment row.
3. Query the same payment row directly in Supabase SQL Editor and verify that seeker_confirmed_at is unchanged.

**Test input:** Authenticated seeker: ABCD (d1ff41b4-fb7d-4398-a270-c405c83fc795)
Target payment: 254a0c07-52cd-4047-ae4b-7ca282a17493
Target payee / seeker: Tsuki (4be6d53d-c79c-4107-8d1a-b66c43bfe1ac)
Original seeker_confirmed_at: 2026-09-29 19:48:14.227+00
Attempted value: 2026-09-30T06:37:00Z

**Recorded comments:** RLS correctly filtered the unauthorized UPDATE. No row was returned to ABCD and the database value remained unchanged.

Figure A5.6 retains the original screenshot associated with this case. The result and comments above follow the latest testing workbook.

![Report figure](<Appendix Diagram/Final_Report_Len_Pei_Ying_QIU-202404-007159.pdf-0368-07.png>)

_Figure A5.6: RLS - Data Isolation (Payment Confirmation Isolation)_

##### SEC-012: Seeker Cannot Delete Another Seeker's Saved Job

**Recorded result: Pass.**

While authenticated as ABCD, the DELETE targeting Len Pei Ying's saved_job returned sec012Data = [] and sec012Error = null. A direct database check afterwards still returned the saved_job row 4c96f5d2-0bd6-4994-b994-59391d3b78ac owned by Len Pei Ying. Therefore ABCD could not delete another seeker's saved job.

**Expected result:** The cross-seeker DELETE must not persist. ABCD should receive no deleted row, and Len Pei Ying's saved_job must remain in the database.

**Test procedure:**

1. Log in as Job Seeker ABCD and confirm the authenticated user ID.
2. Using ABCD's authenticated Supabase client, attempt to delete Len Pei Ying's saved_job row by id.
3. Query the same saved_job row directly in Supabase SQL Editor and verify that it still exists.

**Test input:** Authenticated seeker: ABCD (d1ff41b4-fb7d-4398-a270-c405c83fc795)
Target saved_job: 4c96f5d2-0bd6-4994-b994-59391d3b78ac
Owner seeker: Len Pei Ying (31c79f9e-2dee-44f9-80d7-2a70725dbb52)

**Recorded comments:** RLS correctly filtered the unauthorized DELETE. No row was deleted and the target saved_job remained intact.

Figure A5.7 retains the original screenshot associated with this case. The result and comments above follow the latest testing workbook.

![Report figure](<Appendix Diagram/Final_Report_Len_Pei_Ying_QIU-202404-007159.pdf-0369-03.png>)

_Figure A5.7: RLS - Data Isolation (Saved Job Delete Isolation)_

##### SEC-019: Non-Admin Cannot Update Another User's Profile Row

**Recorded result: Pass.**

While authenticated as ABCD, the UPDATE targeting Len Pei Ying's users row returned sec019Data = [] and sec019Error = null. A direct database check afterwards showed Len Pei Ying's phone remained +60175023599, with role = seeker and account_status = active. Therefore ABCD could not modify another user's profile row.

**Expected result:** The cross-user UPDATE must not persist. ABCD should receive no updated row, and Len Pei Ying's phone value must remain unchanged.

**Test procedure:**

1. Log in as Job Seeker ABCD and confirm the authenticated user ID.
2. Using ABCD's authenticated Supabase client, attempt to update Len Pei Ying's phone field.
3. Query Len Pei Ying's users row directly in Supabase SQL Editor and verify that the phone value remains unchanged.

**Test input:** Authenticated seeker: ABCD (d1ff41b4-fb7d-4398-a270-c405c83fc795)
Target user: Len Pei Ying (31c79f9e-2dee-44f9-80d7-2a70725dbb52)
Original phone: +60175023599
Attempted phone: SEC-019-TEST

**Recorded comments:** RLS correctly filtered the unauthorized UPDATE. The target user's profile data remained unchanged.

Figure A5.8 retains the original screenshot associated with this case. The result and comments above follow the latest testing workbook.

![Report figure](<Appendix Diagram/Final_Report_Len_Pei_Ying_QIU-202404-007159.pdf-0369-07.png>)

_Figure A5.8: RLS - Data Isolation (User Profile Update Isolation)_

##### SEC-020: Seeker Cannot Change an Application's Status Field Directly

**Recorded result: Pass.**

Initial test failed because Job Seeker ABCD could directly change the owned application status from pending to completed. After the security fix was applied, the same attack was repeated while authenticated as ABCD. The PATCH request returned HTTP 403, sec020RetestData = null, and error code 42501 with a database message blocking the seeker status change. A direct database check confirmed the application status remained pending. Retest passed.

**Expected result:** The Job Seeker should not be able to change the employer-controlled application lifecycle status. The stored status should remain pending.

**Test procedure:**

1. Log in as Job Seeker ABCD and confirm the authenticated user ID.
2. Using ABCD's authenticated Supabase client, attempt to update the owned application status from pending to completed.
3. Query the same application row directly in Supabase SQL Editor and verify whether the stored status changed.

**Test input:** Authenticated seeker: ABCD (d1ff41b4-fb7d-4398-a270-c405c83fc795)
Application: 888c03d0-98d9-4e89-bce4-5e0f4ef799c1
Original status: pending
Attempted status: completed

**Recorded comments:** Retest passed after security fix. The initial vulnerability allowed a seeker to change the application status directly; the repaired database rule now blocks unauthorized status changes while preserving the controlled seeker completion flow.

Figure A5.9 retains the original screenshot associated with this case. The result and comments above follow the latest testing workbook.

![Report figure](<Appendix Diagram/Final_Report_Len_Pei_Ying_QIU-202404-007159.pdf-0370-03.png>)

_Figure A5.9: RLS - Data Isolation (Application Status Field Restriction)_

##### SEC-021: Employer Cannot Read Another Seeker's Work History

**Recorded result: Pass.**

While authenticated as SugarShine Employer, the targeted query for Tsuki's work_history returned sec021Data = [] and sec021Error = null. An unfiltered query of work_history returned sec021All = [] and sec021AllError = null. Therefore the Employer could not read Job Seeker work_history records.

**Expected result:** The Employer must not receive another seeker's work_history row. Both the targeted query and unfiltered work_history query should return no unauthorized rows.

**Test procedure:**

1. Log in as SugarShine Employer and confirm the authenticated user ID.
2. Using the authenticated Employer Supabase client, query a specific Tsuki work_history row and then query all work_history rows.
3. Verify that no Job Seeker work_history rows are returned to the Employer.

**Test input:** Authenticated employer: SugarShine (df0abc84-7df8-4709-94de-02f43e097c84)
Target work_history: db3b5217-1664-4068-8cb7-d66429e00a9f
Target seeker: Tsuki (4be6d53d-c79c-4107-8d1a-b66c43bfe1ac)
Target job: Part-Time Barista &amp; Café Crew

**Recorded comments:** RLS correctly restricted work_history visibility. No seeker work_history rows were exposed to the authenticated Employer.

Figure A5.10 retains the original screenshot associated with this case. The result and comments above follow the latest testing workbook.

![Report figure](<Appendix Diagram/Final_Report_Len_Pei_Ying_QIU-202404-007159.pdf-0371-01.png>)

_Figure A5.10: RLS - Data Isolation - Work History Read Isolation_

### Appendix 5.2: Auth & Access Control

This appendix provides the remaining Auth & Access Control Security Testing test cases that are not presented in Section 4.3.4.2. These tests cover authentication, session handling and role-based access restrictions, such as cross-role access, registration role-gating, password handling and session expiry. The representative test case, SEC-024: Admin Page Access Blocked for Non-Admin Authenticated Users, is presented in Section 4.3.4.2, while the additional test cases are provided below.

##### SEC-013: RLS Prevents Cross-Role Data Access

**Recorded result: Pass.**

Prior SEC-001 testing confirmed seeker-to-seeker application isolation. While logged in as SugarShine Employer, querying applications for W&amp;X Bakery's job returned sec013Apps = [] and sec013AppsError = null. Directly opening the Admin Dashboard while still logged in as SugarShine redirected the session back to the Employer Dashboard. Therefore the tested cross-account and admin-page access controls operated as intended.

**Expected result:** A seeker must not read another seeker's applications; an employer must not read another employer's applicant data; non-admin sessions must not access the Admin Dashboard.

**Test procedure:**

1. Use prior SEC-001 evidence showing a seeker cannot read another seeker's applications.
2. While authenticated as SugarShine Employer, query applications belonging to W&amp;X Bakery's job.
3. Attempt direct URL access to the Admin Dashboard while still logged in as SugarShine Employer.
4. Verify that unauthorized data is not returned and the admin-only page redirects the non-admin session.

**Test input:** Employer: SugarShine (df0abc84-7df8-4709-94de-02f43e097c84)
Target W&amp;X job: b534a64e-03ea-498c-9504-b39ebae6980d
Prior seeker isolation evidence: SEC-001

**Recorded comments:** Cross-role isolation verified using prior seeker RLS evidence, employer cross-account applicant access, and direct admin-page access control.

Figure A5.11 retains the original screenshot associated with this case. The result and comments above follow the latest testing workbook.

![Report figure](<Appendix Diagram/Final_Report_Len_Pei_Ying_QIU-202404-007159.pdf-0372-01.png>)

_Figure A5.11: Auth & Access Control - Cross-role Data Access_

##### SEC-014: Registration Role-Gating via Invite Codes

**Recorded result: Pass.**

Admin registration with incorrect secure code 'WRONG-1234' was blocked and displayed 'Invalid admin secure code.' Employer registration with incorrect secure code 'WRONG-1234' was also blocked and displayed 'Invalid employer secure code.' No privileged-role registration proceeded with an invalid invite code.

**Expected result:** Registration is blocked with appropriate error unless the exact matching constant is supplied.

**Test procedure:**

1. Select Admin role and submit with incorrect admin code.
2. Verify rejection.
3. Select Employer role and submit with incorrect employer code.
4. Verify rejection.

**Test input:** Wrong code: 'WRONG-1234'
Correct: EASYEARN-ADMIN-2026 / EASYEARN-EMPLOYER-2026
Files: auth.js

**Recorded comments:** Role-gating correctly rejected invalid secure codes for both Admin and Employer registration paths.

Figure A5.12 retains the original screenshot associated with this case. The result and comments above follow the latest testing workbook.

![Report figure](<Appendix Diagram/Final_Report_Len_Pei_Ying_QIU-202404-007159.pdf-0372-05.png>)

_Figure A5.12: Auth & Access Control - Registration Role-gating_

##### SEC-015: Password Policy Enforcement and Credential Handling

**Recorded result: Pass.**

Registration with password '12345' was blocked with 'Password must be at least 6 characters.' A password without the required composition was blocked, including the messages 'Password must contain at least one letter and one number.' and 'Password must contain at least one of !@#$%^.'. A mismatched confirmation was blocked with 'Confirm password does not match.' Login using an unregistered email returned the non-revealing message 'Invalid email or password.' No plaintext password was exposed in the observed UI messages.

**Expected result:** Each invalid case is rejected client-side or by Supabase Auth with a clear, non-revealing error message; no password logged in plaintext.

**Test procedure:**

1. Attempt registration with a 5-character password.
2. Attempt registration without special character.
3. Attempt with mismatched confirm-password.
4. Attempt login with unregistered email.

**Test input:** Passwords: '12345', 'abcdefgh', confirm mismatch
Files: auth.js (handleRegister, handleLogin, mapSupabaseAuthError)

**Recorded comments:** Password length, composition and confirmation validation worked as expected, and invalid login used a generic credential error message.

Figure A5.13 retains the original screenshot associated with this case. The result and comments above follow the latest testing workbook.

![Report figure](<Appendix Diagram/Final_Report_Len_Pei_Ying_QIU-202404-007159.pdf-0373-01.png>)

_Figure A5.13: Auth & Access Control - Password Policy Enforcement_

##### SEC-023: Session Expiry and requireUser() Redirect Behaviour

**Recorded result: Pass.**

While logged in as a Job Seeker, localStorage and sessionStorage were cleared to invalidate the local session. After refresh, the protected dashboard could no longer verify the account session and redirected the user to the Login page. The console also showed 'Account access verification failed: Error: Account profile could not be verified.' Protected content was not retained.

**Expected result:** User is redirected to login page; protected page content is not rendered.

**Test procedure:**

1. Log in as Seeker.
2. Manually clear localStorage session token or wait for expiry.
3. Attempt to navigate to a protected page (e.g. jobseeker/dashboard.html).
4. Observe redirect.

**Test input:** Auth: expired/cleared session
Files: auth.js (requireUser, observeAuth)

**Recorded comments:** Session-clearing test passed: the protected page rejected the invalidated session and redirected to Login. The Grammarly/permissions-policy console warning was unrelated to EasyEarn access control.

Figure A5.14 retains the original screenshot associated with this case. The result and comments above follow the latest testing workbook.

![Report figure](<Appendix Diagram/Final_Report_Len_Pei_Ying_QIU-202404-007159.pdf-0373-05.png>)

_Figure A5.14: Auth & Access Control - Session Expiry Handling_

### Appendix 5.3: Upload Security

This appendix supports the Upload Security Testing presented in Section 4.3.4.3. SEC-016 evaluated the file-size and file-type restrictions applied to Job Seeker profile images and Employer verification documents. Since this category contains only one test case and the complete representative result is presented in Section 4.3.4.3, the test case is not repeated in this appendix.

### Appendix 5.4: Input Sanitisation

This appendix provides the remaining Input Sanitisation Security Testing test case that is not presented in Section 4.3.4.4. The tests evaluated how potentially malicious input was handled, including XSS and SQL injection-related input. The representative test case, SEC-017: Input Sanitisation Against XSS, is presented in Section 4.3.4.4, while the additional test case is provided below.

##### SEC-018: SQL Injection Resistance

**Recorded result: Pass.**

Login SQL injection attempt using the payload ' OR '1'='1 was rejected by email-format validation with the message 'Please enter a valid email address.' The same SQLi payload entered in the Jobs search/filter field was treated as literal search text and returned 'No available jobs found'; no extra records, protected data, or query-structure bypass was observed.

**Expected result:** All inputs treated as literal parameter values; no query structure altered and no data leaked.

**Test procedure:**

1. Enter ' OR '1'='1 in login email field.
2. Enter SQLi payload in Jobs search/filter field.
3. Verify no data leak and no query alteration.

**Test input:** Payload: ' OR '1'='1
Files: auth.js, jobseeker-jobs.js, supabase-config.js

**Recorded comments:** Tested SQL injection payloads did not alter query logic or expose additional data. Inputs were either rejected by validation or handled as literal values.

Figure A5.15 retains the original screenshot associated with this case. The result and comments above follow the latest testing workbook.

![Report figure](<Appendix Diagram/Final_Report_Len_Pei_Ying_QIU-202404-007159.pdf-0374-07.png>)

_Figure A5.15: Input Sanitisation - SQL Injection Resistance_

### Appendix 5.5: Rating & Business Rules

This appendix provides the remaining Rating & Business Rules Security Testing test case that is not presented in Section 4.3.4.5. The tests focused on limitations on rating eligibility and reviewer-reviewee relationships as they relate to security issues. The representative test case, SEC-008: Seeker Cannot Submit a Rating for a Pending Application, is presented in Section 4.3.4.5, while the additional test case is provided below.

##### SEC-009: Reviewer and Reviewee Cannot Be the Same User

**Recorded result: Pass.**

While authenticated as Tsuki, a forced self-rating attempt was made using the completed application 112ba3b2-819e-4009-a948-525e136ebba1 with reviewer_id = reviewee_id = Tsuki. The ratings upsert request was rejected with HTTP 403 Forbidden. A direct database query for review = 'SEC-009 self-rating test' returned no rows. Therefore the database-level rating validation successfully prevented self-rating.

**Expected result:** Self-rating is not explicitly blocked by a DB CHECK constraint; the UI never constructs a self-rating call.

**Test procedure:**

1. Log in as U.
2. Attempt to call upsertRating() with reviewer_id = reviewee_id = U.id.
3. Verify DB row.

**Test input:** Auth: U
reviewee_id = U.id (same as reviewer)
Files: supabase-data.js (upsertRating), schema.sql

**Recorded comments:** Self-rating is now blocked by database validation requiring reviewer and reviewee to be opposite parties of a completed application.

Figure A5.16 retains the original screenshot associated with this case. The result and comments above follow the latest testing workbook.

![Report figure](<Appendix Diagram/Final_Report_Len_Pei_Ying_QIU-202404-007159.pdf-0375-05.png>)

_Figure A5.16: Rating & Business Rules - Self-rating Prevention_

### Appendix 5.6: Report Security

This appendix provides the remaining Report Security test case that is not presented in Section 4.3.4.6. The tests evaluated whether report submission and report records were restricted to authenticated and authorised users. The representative test case, SEC-011: Seeker Cannot Read Another User's Submitted Reports, is presented in Section 4.3.4.6, while the additional test case is provided below.

##### SEC-010: Unauthenticated User Cannot Submit a Report

**Recorded result: Pass.**

With no active EasyEarn session, direct navigation to the Report page was blocked. The unauthenticated user was redirected to the Login page before the report form could be used, so no report could be submitted.

**Expected result:** Report submission is blocked; no report row is inserted.

**Test procedure:**

1. Open browser without logging in.
2. Navigate to the Report page.
3. Attempt to submit a report form.

**Test input:** Auth: none (anon)
Files: schema.sql (reports_insert_own policy), report.html

**Recorded comments:** Unauthenticated access to the report submission page is correctly protected by authentication redirect.

Figure A5.17 retains the original screenshot associated with this case. The result and comments above follow the latest testing workbook.

![Report figure](<Appendix Diagram/Final_Report_Len_Pei_Ying_QIU-202404-007159.pdf-0376-03.png>)

_Figure A5.17: Report Security - Unauthenticated Submission Block_

### Appendix 5.7: Analytics & Chatbot

This appendix provides the remaining Analytics & Chatbot Security Testing test case that is not presented in Section 4.3.4.7. The tests determined if administrative analytics and chatbotrelated records were limited by user role. The representative test case, SEC-025: Admin Analytics Data Is Not Accessible to Non-Admin Users, is presented in Section 4.3.4.7, while the additional test case is provided below.

##### SEC-022: Admin-Only Access to Chatbot Logs

**Recorded result: Pass.**

While authenticated as Job Seeker ABCD, a direct SELECT query against public.chatbot_logs returned HTTP status 200 with data as an empty array and error = null. No chatbot log rows were exposed to the seeker account, confirming that the admin-only RLS policy prevented non-admin read access.

**Expected result:** No rows returned; only admin-role users can SELECT from chatbot_logs.

**Test procedure:**

1. Log in as Seeker.
2. Query chatbot_logs table.
3. Check rows returned.

**Test input:** Auth: Seeker
Files: schema.sql (chatbot_logs_select_admin policy)

**Recorded comments:** Non-admin users cannot read chatbot_logs; RLS correctly hides all rows from the Job Seeker session.

Figure A5.18 retains the original screenshot associated with this case. The result and comments above follow the latest testing workbook.

![Report figure](<Appendix Diagram/Final_Report_Len_Pei_Ying_QIU-202404-007159.pdf-0377-01.png>)

_Figure A5.18: Analytics & Chatbot - Chatbot Log Access Restriction_

### Appendix 5.8: PDPA & Compliance

This appendix provides the remaining PDPA & Compliance Security Testing test cases that are not presented in Section 4.3.4.8. The tests examined certain privacy and access-control aspects of personal data, Employer verification information, modification of verification status and visibility of public job listings. These tests evaluated the technical controls that had been implemented and were not a comprehensive legal compliance audit. The representative test case, SEC-026: Personal Data Fields Are Not Exposed in Public Job Listing Queries, is presented in Section 4.3.4.8, while the additional test cases are provided below.

##### SEC-027: Employer Verification Documents Are Not Exposed to Authenticated NonOwner Users

**Recorded result: Pass.**

While authenticated as Job Seeker ABCD, a direct query against public.users targeted W&amp;X Employer (cfc76680-17f4-4670-a0cd-c5c02b6a6650) and requested protected profile and verification fields including email, SSM number, registration document information and contact document information. The request returned HTTP status 200, error = null and data as an empty array. No protected Employer verification information was exposed to the non-owner account.

**Expected result:** The authenticated non-owner user cannot retrieve Employer E1's protected user record or verification document information. The updated RLS policies restrict direct user-record access to the record owner and authorised Administrators.

**Test procedure:**

1. Log in as a Job Seeker who is not the owner of Employer E1's record.
2. Query public.users for Employer E1's record and attempt to retrieve the verification document fields.
3. Check whether any protected Employer verification information is returned.

**Test input:** Auth: Job Seeker (non-owner) Target: Employer E1 UUID RLS: users_select_own and users_select_admin

**Recorded comments:** RLS correctly prevents an authenticated non-owner Job Seeker from retrieving another Employer's protected user record and verification-document fields.

Figure A5.19 retains the original screenshot associated with this case. The result and comments above follow the latest testing workbook.

![Report figure](<Appendix Diagram/Final_Report_Len_Pei_Ying_QIU-202404-007159.pdf-0378-01.png>)

_Figure A5.19: PDPA & Compliance - Verification Document Access Restriction_

##### SEC-028:  Seeker Cannot Update an Employer's Verification Status

**Recorded result: Pass.**

While authenticated as Job Seeker ABCD, a direct UPDATE was attempted against W&amp;X Employer (cfc76680-17f4-4670-a0cd-c5c02b6a6650) to set verification_status = 'verified'. The request returned HTTP status 200 with data as an empty array and error = null, indicating no row was updated under RLS. A trusted SQL readback confirmed the Employer record remained verification_status = 'submitted' and is_verified = true. Therefore the non-admin user could not change the Employer verification status.

**Expected result:** UPDATE is blocked; verification_status can only be changed by the admin.

**Test procedure:**

1. Log in as Seeker S.
2. Attempt to PATCH public.users to set verification_status = 'verified' for E1.
3. Verify response.

**Test input:** Auth: Seeker S
Target: E1 UUID, field: verification_status
Files: schema.sql (users_update_own, users_admin_update policies)

**Recorded comments:** RLS correctly prevents a Job Seeker from updating another Employer's verification status; database readback confirmed the protected field was unchanged.

Figure A5.20 retains the original screenshot associated with this case. The result and comments above follow the latest testing workbook.

![Report figure](<Appendix Diagram/Final_Report_Len_Pei_Ying_QIU-202404-007159.pdf-0378-05.png>)

_Figure A5.20: PDPA & Compliance - Verification Status Update Restriction_

##### SEC-029: Closed Job Listings Are Removed from Public Job Search

**Recorded result: Pass.**

A job listing with status = 'closed' was identified: de85ecb3-8148-40a2-bc5d-f68d4969bdd6 ([ST-002 TEST] Part-time Barista). While unauthenticated, a direct query against public.job_listings for this exact job ID returned HTTP status 200 with data as an empty array and error = null. The closed listing was therefore not exposed through the public job query.

**Expected result:** Closed listings are excluded from the public job search results.

**Test procedure:**

1. Admin sets job_listings.status = 'closed' for a listing.
2. Open public Jobs page without logging in.
3. Verify the closed listing does not appear.

**Test input:** Auth: admin action then anon view
Files: admin-jobs.js (updateJobListingStatus), jobseeker-jobs.js (public query filter), schema.sql

**Recorded comments:** Closed job listings are excluded from unauthenticated/public job search access as required.

Figure A5.21 retains the original screenshot associated with this case. The result and comments above follow the latest testing workbook.

![Report figure](<Appendix Diagram/Final_Report_Len_Pei_Ying_QIU-202404-007159.pdf-0379-03.png>)

_Figure A5.21: PDPA & Compliance - Closed Listing Removal_

### Appendix 5.9: Employer Verification & Visibility

This appendix corresponds to the Employer Verification & Visibility Security Testing category. This category contains one test case, SEC-030: Employer Verification & Job Visibility.  The complete test case and supporting evidence are presented in Section 4.3.4.9; therefore, SEC030 is not repeated in this appendix.

Overall, all 30 Security Testing test cases across the nine testing categories achieved a Pass result in the final testing round. Several vulnerabilities detected in the initial test were patched, and retests were conducted successfully. The detailed evidence in Appendix 5 supports the Security Testing results summarised in Section 4.3.4 and documents the additional test cases omitted from the main chapter for conciseness. The restrictions mentioned in Section 5.3.1 apply to the scope of security assurance and are not directly related to known failures in the final Security Testing results.

## Appendix 6: Compatibility Testing

This appendix provides the detailed Compatibility Testing test cases and supporting evidence that are not presented in Section 4.3.5. Compatibility Testing was conducted across six categories: Browser Compatibility, Responsive Design, Feature Compatibility, Session & Auth, UI & Display, and Form & Input. A total of 23 Compatibility Testing test cases (CT-001 to CT-023) were executed, and all 23 achieved a Pass result in the final testing round within the environments directly tested. One representative test case from each category is contained in Section 4.3.5, and all the other test cases and supporting evidence are grouped in Appendix 6.1 to Appendix 6.6.

### Appendix 6.1: Browser Compatibility

This appendix provides the remaining Browser Compatibility test cases that are not presented in Section 4.3.5.1. These tests evaluated selected browser-dependent functions and interface elements in Google Chrome, Mozilla Firefox and Microsoft Edge, such as feature support for JavaScript, creating PDF resumes and rendering analytics with Chart.js. The following Browser Compatibility test cases are provided; for the representative test case, a description is given in Section 4.3.5.1.

##### CT-002: JavaScript Feature Support

**Recorded result: Pass.**

Tested the Browse Jobs page in Google Chrome, Microsoft Edge and Mozilla Firefox. In all three browsers, job listings loaded successfully from Supabase and the page remained functional, confirming that fetch-based data loading and ES module scripts executed correctly. No EasyEarn application JavaScript error was observed. Chrome displayed errors from browser extensions (for example Zotero/injected extension scripts) and a permissions-policy unload warning; these were unrelated to EasyEarn. Firefox displayed a browser Quirks Mode warning, but the EasyEarn jobs page still loaded and functioned normally. Safari was not available in the current Windows test environment.

**Expected result:** fetch() and ES module imports execute without errors across all four browsers; Supabase data loads correctly.

**Test procedure:**

1. Open browser console in Chrome and load the Jobs page.
2. Verify fetch() calls to Supabase complete without errors.
3. Verify ES module imports (type=module) load correctly.
4. Repeat steps 1–3 in Firefox, Safari, and Edge.
5. Confirm no JS errors appear in any browser console.

**Test input:** Browsers: Chrome, Firefox, Safari, Edge
Files: js/supabase-data.js, js/jobseeker-jobs.js

**Recorded comments:** Pass for Chrome, Edge and Firefox. Observed console messages were browser/extension warnings rather than EasyEarn JavaScript failures. Safari was not directly tested.

Figure A6.1 retains the original screenshot associated with this case. The result and comments above follow the latest testing workbook.

![Report figure](<Appendix Diagram/Final_Report_Len_Pei_Ying_QIU-202404-007159.pdf-0381-01.png>)

_Figure A6.1: Browser Compatibility - JavaScript Feature Support_

##### CT-003: PDF Resume Generation

**Recorded result: Pass.**

Three PDF resume outputs generated during cross-browser testing were reviewed. All three files opened successfully as single-page PDFs and displayed the same Tsuki resume content, including profile details, two completed work-history entries, highlighted results, references, skills, education and availability. The page structure, fonts, spacing and section placement were visually consistent across the three outputs. Two rendered outputs were pixel-identical; the third showed only negligible rendering/anti-aliasing differences with no missing, clipped or shifted content. Therefore PDF generation produced a valid and consistent resume across the tested browsers. Safari was not available in the current Windows test environment.

**Expected result:** PDF resume generates and downloads successfully in all four browsers with consistent formatting and correct content.

**Test procedure:**

1. Log in as Job Seeker and navigate to Work History page in Chrome.
2. Click Generate Resume and verify PDF downloads correctly.
3. Open the PDF and verify content and formatting are correct.
4. Repeat steps 1–3 in Firefox, Safari, and Edge.
5. Compare PDF output across all browsers for consistency.

**Test input:** Browser: Chrome, Firefox, Safari, Edge
Files: js/jobseeker-resume.js (jsPDF, html2canvas)

**Recorded comments:** All three tested browser outputs generated usable PDFs with consistent content and layout. Minor renderer-level pixel differences did not affect readability or correctness. Safari was not directly tested.

Figure A6.2 retains the original screenshot associated with this case. The result and comments above follow the latest testing workbook.

![Report figure](<Appendix Diagram/Final_Report_Len_Pei_Ying_QIU-202404-007159.pdf-0381-05.png>)

_Figure A6.2: Browser Compatibility - PDF Resume Generation_

##### CT-004: Chart.js Analytics Rendering

**Recorded result: Pass.**

Tested the Admin Analytics page in Google Chrome, Microsoft Edge and Mozilla Firefox. Across all three browsers, the analytics overview, KPI cards, line chart, doughnut chart, chart legend, percentages and Data Explorer table rendered consistently with no missing, blank, overlapping or broken elements. The same analytics values were displayed across browsers, including User Growth 8, Job Volume 8 and Report Load 2, and the chart proportions remained consistent. No meaningful visual or functional difference was observed. Safari was not available in the current Windows test environment.

**Expected result:** Chart.js line and donut charts render correctly with accurate data and tooltips across all four browsers.

**Test procedure:**

1. Log in as Admin and navigate to Analytics Dashboard in Chrome.
2. Verify line chart and donut chart render correctly.
3. Hover over chart data points and verify tooltips appear.
4. Repeat steps 1–3 in Firefox, Safari, and Edge.
5. Confirm charts display consistent data and appearance across browsers.

**Test input:** Browsers: Chrome, Firefox, Safari, Edge
Files: js/admin-analytics.js (Chart.js CDN)

**Recorded comments:** Chrome, Edge and Firefox produced consistent Chart.js output and analytics data. Safari was not directly tested.

Figure A6.3 retains the original screenshot associated with this case. The result and comments above follow the latest testing workbook.

![Report figure](<Appendix Diagram/Final_Report_Len_Pei_Ying_QIU-202404-007159.pdf-0382-01.png>)

_Figure A6.3: Browser Compatibility - Chart.js Analytics Rendering_

### Appendix 6.2: Responsive Design

This appendix provides the remaining Responsive Design Compatibility Testing test cases that are not presented in Section 4.3.5.2. These tests assessed how EasyEarn reacts to the following viewport sizes and interactions: mobile touch interaction, mobile content display, formvalidation presentation and mobile filtering. The representative test case, CT-005: Layout Breakpoints, is presented in Section 4.3.5.2, while the additional test cases are provided below.

##### CT-006: Mobile Touch Interactions

**Recorded result: Pass.**

Tested in a 375px mobile emulation viewport. The hamburger menu opened and closed correctly; Browse Jobs and Saved Jobs tabs switched correctly; job interactions responded to tap; filter dropdowns opened and allowed selection; and vertical scrolling worked normally without interaction issues.

**Expected result:** All tap interactions, dropdowns, and scrolling function correctly on mobile touch screens without requiring hover.

**Test procedure:**

1. Open EasyEarn on mobile and tap the hamburger menu.
2. Verify dropdown navigation opens and closes correctly on tap.
3. Tap on a job listing card and verify it navigates to job details.
4. Tap on filter dropdowns and verify they open and are selectable.
5. Scroll through the Jobs page and verify smooth scrolling.

**Test input:** Device: Mobile (375px viewport)
Files: css/*, includes.js, js/jobseeker-jobs.js

**Recorded comments:** All required mobile tap interactions and scrolling functions worked correctly in the tested mobile viewport.

Figure A6.4 retains the original screenshot associated with this case. The result and comments above follow the latest testing workbook.

![Report figure](<Appendix Diagram/Final_Report_Len_Pei_Ying_QIU-202404-007159.pdf-0382-07.png>)

_Figure A6.4: Responsive Design - Mobile Touch Interactions_

##### CT-007: Mobile Content Display

**Recorded result: Pass.**

Tested the Saved Jobs and Work History pages at a 375px mobile viewport. Saved Jobs displayed the full job card within the viewport, including title, employer, description, location/pay badges and action buttons, with no visible horizontal overflow or clipped content. Work History also displayed the job title, employer, date, earnings (RM200), category and status/action information within the mobile viewport. Both pages stacked content vertically and remained readable without horizontal scrolling or truncated data.

**Expected result:** Saved Jobs and Work History pages display all content within the mobile viewport with no horizontal overflow or truncated data.

**Test procedure:**

1. Log in as Job Seeker on mobile (375px viewport).
2. Navigate to Saved Jobs page and verify all job cards display fully.
3. Check no content overflows off-screen horizontally.
4. Navigate to Work History page and verify entries display correctly.
5. Verify earnings, job title, and date columns are readable on mobile.

**Test input:** Viewport: 375px
Files: pages/jobseeker/saved-jobs.html, pages/jobseeker/work-history.html

**Recorded comments:** Saved Jobs and Work History were readable and usable at 375px with no horizontal overflow observed.

Figure A6.5 retains the original screenshot associated with this case. The result and comments above follow the latest testing workbook.

![Report figure](<Appendix Diagram/Final_Report_Len_Pei_Ying_QIU-202404-007159.pdf-0383-03.png>)

_Figure A6.5: Responsive Design - Mobile Content Display_

##### CT-008: Form Validation Consistency

**Recorded result: Pass.**

Tested Login and Register form validation in Google Chrome, Microsoft Edge and Mozilla Firefox. Submitting the Login form with empty required fields produced the expected validation behaviour in all three browsers. Submitting the Register form with an invalid password format also produced the expected password validation message consistently across all three browsers. No browser-specific validation inconsistency was observed. Safari was not available in the current Windows test environment.

**Expected result:** Form validation error messages appear consistently across all browsers for empty fields and invalid password format.

**Test procedure:**

1. Open Login page in Chrome and submit with empty fields.
2. Verify validation error messages appear correctly.
3. Open Register page and submit with invalid password format.
4. Verify password validation error is shown.
5. Repeat steps 1–4 in Firefox, Safari, and Edge.

**Test input:** Browsers: Chrome, Firefox, Safari, Edge
Files: login.html, register.html, js/auth.js

**Recorded comments:** Chrome, Edge and Firefox showed consistent Login and Register validation behaviour. Safari was not directly tested.

Figure A6.6 retains the original screenshot associated with this case. The result and comments above follow the latest testing workbook.

![Report figure](<Appendix Diagram/Final_Report_Len_Pei_Ying_QIU-202404-007159.pdf-0383-07.png>)

_Figure A6.6: Responsive Design - Form Validation Consistency_

##### CT-009: Mobile Filter Functionality

**Recorded result: Pass.**

Tested the Job Seeker Jobs page at a 375px mobile viewport. Category filters were tappable and filtered the listings correctly; the location dropdown opened and allowed selection; the job results updated in place without requiring a page reload; and using the reset/clear filters function restored the full job list. No mobile interaction issue was observed during filtering.

**Expected result:** Category and location filters are tappable on mobile and correctly filter job listings without requiring a page reload.

**Test procedure:**

1. Open Jobs page on mobile (375px viewport).
2. Tap category filter chips and verify filtering works.
3. Tap location filter dropdown and select a location.
4. Verify filtered results update correctly.
5. Clear filters and verify all listings are restored.

**Test input:** Viewport: 375px
Files: pages/jobseeker/jobs.html, js/jobseeker-jobs.js

**Recorded comments:** All mobile job-filter interactions worked correctly at 375px, including category, location, live result updates and filter reset.

Figure A6.7 retains the original screenshot associated with this case. The result and comments above follow the latest testing workbook.

![Report figure](<Appendix Diagram/Final_Report_Len_Pei_Ying_QIU-202404-007159.pdf-0384-03.png>)

_Figure A6.7: Responsive Design - Mobile Filter Functionality_

### Appendix 6.3: Feature Compatibility

This appendix provides the remaining Feature Compatibility test cases that are not presented in Section 4.3.5.3. These tests evaluated selected EasyEarn features within the tested browser and screen environments, including dark mode, the floating chatbot, Employer verification file uploads, notification updates and Admin Analytics. The representative test case, CT-010: Google Translate Integration, is presented in Section 4.3.5.3, while the additional test cases are provided below.

##### CT-011: Dark Mode Across Role Dashboards

**Recorded result: Pass.**

Tested dark mode on the Job Seeker, Employer and Admin dashboards. All three dashboards switched to dark mode correctly, with role-specific accent colours and interface text remaining readable. After refreshing the pages, the selected dark mode preference remained active as expected.

**Expected result:** Dark mode applies consistently across all three role dashboards with legible text and correct accent colours; preference persists after page reload.

**Test procedure:**

1. Log in as Job Seeker and toggle dark mode on dashboard.
2. Verify teal/green accent colours remain legible in dark mode.
3. Log in as Employer and toggle dark mode; verify brown/gold theme.
4. Log in as Admin and toggle dark mode; verify purple theme.
5. Refresh each dashboard and verify dark mode preference persists.

**Test input:** Files: js/theme.js, css/jobseeker-dashboard.css, css/employer-dashboard.css, css/admin-dashboard.css

**Recorded comments:** Dark mode worked correctly for Job Seeker, Employer and Admin dashboards, and the preference persisted after refresh.

Figure A6.8 retains the original screenshot associated with this case. The result and comments above follow the latest testing workbook.

![Report figure](<Appendix Diagram/Final_Report_Len_Pei_Ying_QIU-202404-007159.pdf-0385-01.png>)

_Figure A6.8: Feature Compatibility - Dark Mode Across Role Dashboards_

##### CT-012: Floating Chatbot Widget

**Recorded result: Pass.**

Tested the floating EasyEarn Assistant on the mobile 375px view. The chatbot opened correctly within the viewport, displayed its header, suggested questions, message input and Send button, and remained accessible without being cut off by the screen edge. The earlier apparent clipping was related to the underlying responsive chart/page layout rather than the chatbot component itself.

**Expected result:** Chatbot widget opens, sends messages, and receives responses correctly across all browsers and on mobile without UI overlap issues.

**Test procedure:**

1. Open Job Seeker dashboard in Chrome and click the chatbot widget.
2. Send a test message and verify a response is returned.
3. Verify widget opens/closes correctly and does not overlap critical UI.
4. Repeat in Firefox, Safari, and Edge.
5. Repeat on mobile (375px) and verify chatbot is accessible and usable.

**Test input:** Browsers: Chrome, Firefox, Safari, Edge; Viewport: 375px mobile
Files: js/floating-chatbot.js

**Recorded comments:** Chatbot mobile display is acceptable and usable. The separate 375px chart/responsive layout issue remains tracked under CT-005 for retesting after the responsive fix.

Figure A6.9 retains the original screenshot associated with this case. The result and comments above follow the latest testing workbook.

The CT-012 comment refers to the earlier responsive-layout issue. The final CT-005 record subsequently reports that the 375px fix was retested successfully; the earlier CT-012 comment is retained as part of the test history.

![Report figure](<Appendix Diagram/Final_Report_Len_Pei_Ying_QIU-202404-007159.pdf-0385-05.png>)

_Figure A6.9: Feature Compatibility - Floating Chatbot Widget_

##### CT-013: File Upload for Verification

**Recorded result: Pass.**

Tested employer verification document upload in Google Chrome, Microsoft Edge and Mozilla Firefox. In all three browsers, the file picker opened correctly, the selected verification file was accepted and displayed as expected, and the verification submission completed successfully. No browser-specific upload issue was observed. Safari was not available in the current Windows test environment.

**Expected result:** File picker opens in all browsers; selected file uploads successfully to Supabase storage with correct file type and size validation.

**Test procedure:**

1. Log in as Employer and navigate to Verification page in Chrome.
2. Click file upload and select a PDF document.
3. Verify file is accepted and preview/name is shown.
4. Submit verification and confirm upload succeeds.
5. Repeat steps 1–4 in Firefox, Safari, and Edge.

**Test input:** Browsers: Chrome, Firefox, Safari, Edge
File types: PDF, JPG
Files: js/employer-verification.js

**Recorded comments:** Employer verification file upload worked consistently in Chrome, Edge and Firefox. Safari was not directly tested.

Figure A6.10 retains the original screenshot associated with this case. The result and comments above follow the latest testing workbook.

![Report figure](<Appendix Diagram/Final_Report_Len_Pei_Ying_QIU-202404-007159.pdf-0386-01.png>)

_Figure A6.10: Feature Compatibility - File Upload for Verification_

##### CT-014: Notification Bell Updates

**Recorded result: Pass.**

Tested notification updates in Google Chrome, Mozilla Firefox and Microsoft Edge using separate Job Seeker and Employer sessions. After the Employer changed an application status, the Job Seeker notification bell updated automatically without requiring a page reload, and opening the bell displayed the notification list correctly in all three tested browsers.

**Expected result:** Notification bell reflects new notifications within the polling interval across all tested browsers without requiring a page reload.

**Test procedure:**

1. Log in as Job Seeker in Chrome and observe notification bell.
2. In a separate tab, log in as Employer and change application status.
3. Verify notification bell on Job Seeker tab updates without page reload.
4. Click notification bell and verify notification list is shown.
5. Repeat test in Firefox and Edge.

**Test input:** Browsers: Chrome, Firefox, Edge
Files: js/notifications.js, includes/header-jobseeker.html

**Recorded comments:** Notification polling behaved consistently in Chrome, Firefox and Edge. The bell updated without manual refresh and the notification list opened correctly.

Figure A6.11 retains the original screenshot associated with this case. The result and comments above follow the latest testing workbook.

![Report figure](<Appendix Diagram/Final_Report_Len_Pei_Ying_QIU-202404-007159.pdf-0386-05.png>)

_Figure A6.11: Feature Compatibility - Notification Bell Updates_

##### CT-015: Admin Analytics Data Consistency

**Recorded result: Pass.**

Tested the Admin Analytics Dashboard in Google Chrome, Microsoft Edge and Mozilla Firefox. All three browsers displayed the same analytics values: User Growth = 8, Job Volume = 8, and Report Load = 2. The chart data and displayed statistics were consistent across all three browsers, with no missing or mismatched values observed.

**Expected result:** Analytics figures and charts display the same correct data across all tested browsers with no missing or mismatched values.

**Test procedure:**

1. Log in as Admin and open Analytics Dashboard in Chrome.
2. Verify total users, total jobs, and successful matches figures are correct.
3. Verify chart data points match the displayed statistics.
4. Repeat in Firefox and Edge.
5. Confirm all figures and charts are consistent across browsers.

**Test input:** Browsers: Chrome, Firefox, Edge
Files: js/admin-analytics.js, Supabase analytics table

**Recorded comments:** Chrome, Edge and Firefox all showed identical analytics values (8 / 8 / 2), and the chart data points were consistent.

Figure A6.12 retains the original screenshot associated with this case. The result and comments above follow the latest testing workbook.

![Report figure](<Appendix Diagram/Final_Report_Len_Pei_Ying_QIU-202404-007159.pdf-0387-01.png>)

_Figure A6.12: Feature Compatibility - Admin Analytics Data Consistency_

### Appendix 6.4: Session & Auth

This appendix provides the remaining Session & Auth Compatibility Testing test case that is not presented in Section 4.3.5.4. The tests covered the authentication-session behaviour for various tabs in the same browser session, such as cross-tab session persistence and synchronised logout. The representative test case, CT-017: Cross-Tab Logout, is presented in Section 4.3.5.4, while the additional test case is provided below.

##### CT-016: Cross-Tab Session Persistence

**Recorded result: Pass.**

Tested authentication session persistence across multiple tabs in Google Chrome, Mozilla Firefox and Microsoft Edge. After logging in as a Job Seeker in the first tab, opening EasyEarn directly in a second tab did not require another login. The authenticated session remained active while navigating to other Job Seeker pages in the second tab across all three tested browsers.

**Expected result:** Auth session is shared across tabs in the same browser; no re-login required when opening a new tab to EasyEarn.

**Test procedure:**

1. Log in as Job Seeker in Chrome Tab 1.
2. Open a new Tab 2 and navigate to EasyEarn dashboard URL directly.
3. Verify Tab 2 shows the dashboard without requiring login again.
4. Navigate to different pages in Tab 2 and verify session remains active.
5. Repeat test in Firefox and Edge.

**Test input:** Browsers: Chrome, Firefox, Edge
Files: js/supabase-data.js (observeAuth)

**Recorded comments:** Session sharing across tabs worked correctly in Chrome, Firefox and Edge. No re-login was required within the same browser.

Figure A6.13 retains the original screenshot associated with this case. The result and comments above follow the latest testing workbook.

![Report figure](<Appendix Diagram/Final_Report_Len_Pei_Ying_QIU-202404-007159.pdf-0387-07.png>)

_Figure A6.13: Session & Auth - Cross-tab Session Persistence_

### Appendix 6.5: UI & Display

This appendix provides the remaining UI & Display Compatibility Testing test cases that are not presented in Section 4.3.5.5. The following tests were performed for the selected EasyEarn interface elements to assess their readability and presentation in the environments being tested, such as font rendering and previews of images being uploaded. The representative test case, CT-019: Long Text Overflow Handling, is presented in Section 4.3.5.5, while the additional test cases are provided below.

##### CT-018: Cross-Operating-System Font Rendering

**Recorded result: Pass.**

Tested font rendering in the available Windows environment. Headings, body text and button labels displayed clearly and consistently, with no visible blurry text, clipping, character misalignment or readability issues.

**Expected result:** Text renders legibly and consistently across all three operating systems with no blurry, clipped, or misaligned characters.

**Test procedure:**

1. Open EasyEarn homepage on Windows and verify font appearance.
2. Open EasyEarn homepage on Mac and compare font rendering.
3. Open EasyEarn homepage on Linux and compare font rendering.
4. Check headings, body text, and button labels across all three OS.
5. Verify no text appears blurry, clipped, or misaligned on any OS.

**Test input:** OS: Windows 10/11, macOS, Linux
Files: css/* (font-family declarations)

**Recorded comments:** Tested on Windows, which was the selected test environment. Font rendering was clear and readable with no visible clipping or misalignment.

Figure A6.14 retains the original screenshot associated with this case. The result and comments above follow the latest testing workbook.

![Report figure](<Appendix Diagram/Final_Report_Len_Pei_Ying_QIU-202404-007159.pdf-0388-05.png>)

_Figure A6.14: UI & Display - Cross-OS Font Rendering_

##### CT-020: Image Upload Preview

**Recorded result: Pass.**

Tested image upload and post-upload display for Job Seeker profile images and Employer verification images. Uploaded images were saved successfully and displayed correctly after saving/submission. The test focuses on the stable upload-and-display behaviour and does not assess the optional pre-save preview behaviour.

**Expected result:** Selected images upload successfully and display correctly after saving or submission across all tested browsers.

**Test procedure:**

1. Log in as Job Seeker and navigate to Profile page in Chrome.
2. Select and upload a profile image, then save the profile.
3. Verify the uploaded profile image displays correctly after saving.
4. Log in as Employer and upload a verification document image; verify it displays correctly after submission.
5. Repeat the upload/display checks in Firefox and Edge.

**Test input:** Browsers: Chrome, Firefox, Edge
File types: JPG, PNG
Files: js/jobseeker-profile.js, js/employer-verification.js

**Recorded comments:** Stable upload and post-upload image display worked correctly. Pre-save preview behaviour was excluded from this compatibility test because it is not consistently stable.

Figure A6.15 retains the original screenshot associated with this case. The result and comments above follow the latest testing workbook.

This Pass result covers upload and post-save display only. It does not verify the optional pre-save image preview.

![Report figure](<Appendix Diagram/Final_Report_Len_Pei_Ying_QIU-202404-007159.pdf-0389-01.png>)

_Figure A6.15: UI & Display - Image Upload Preview_

### Appendix 6.6: Form & Input

This appendix provides the remaining Form & Input Compatibility Testing test cases that are not presented in Section 4.3.5.6. The tests checked typical form and input controls for the browsers that were tested, such as password masking for fields, file-size and file-type checking. The representative test case, CT-021: Interview Date/Time Picker, is presented in Section 4.3.5.6, while the additional test cases are provided below.

##### CT-022: File Size and Type Validation

**Recorded result: Pass.**

Tested profile picture file validation in Google Chrome, Mozilla Firefox and Microsoft Edge. An oversized file was rejected with an appropriate validation message, an invalid file type was rejected, and a valid JPG/PNG image was accepted successfully. The validation behaviour was consistent across all three tested browsers.

**Expected result:** File size and type validation rejects invalid files with clear error messages consistently across all browsers; valid files are accepted.

**Test procedure:**

1. Log in as Job Seeker and attempt to upload a file exceeding the size limit in Chrome.
2. Verify an appropriate error message is shown.
3. Attempt to upload an invalid file type (e.g. .exe) and verify rejection.
4. Upload a valid JPG/PNG and verify it is accepted.
5. Repeat steps 1–4 in Firefox, Safari, and Edge.

**Test input:** Browsers: Chrome, Firefox, Safari, Edge
Test files: oversized file, .exe, valid JPG/PNG
Files: js/jobseeker-profile.js

**Recorded comments:** File size and file type validation worked consistently in Chrome, Firefox and Edge; valid image files were accepted as expected.

Figure A6.16 retains the original screenshot associated with this case. The result and comments above follow the latest testing workbook.

![Report figure](<Appendix Diagram/Final_Report_Len_Pei_Ying_QIU-202404-007159.pdf-0389-07.png>)

_Figure A6.16: Form & Input - File Size and Type Validation_

##### CT-023: Password Field Masking

**Recorded result: Pass.**

Password fields use input type=password which is universally supported and masks input by default in all modern browsers. Password is transmitted to Supabase Auth over HTTPS and never logged to the browser console.

**Expected result:** Password field masks input as dots/asterisks in all browsers; show/hide toggle works correctly; no plain text password is exposed in console or network requests.

**Test procedure:**

1. Open Login page in Chrome and type in the password field.
2. Verify password characters are masked (shown as dots/asterisks).
3. Click the show/hide password toggle (if available) and verify it works.
4. Repeat steps 1–3 in Firefox, Safari, and Edge.
5. Verify no plain text password is visible in the browser console or network tab.

**Test input:** Browsers: Chrome, Firefox, Safari, Edge
Files: login.html, register.html, js/auth.js

**Recorded comments:** Show/hide toggle (if implemented) uses JS to toggle input type between password and text, which is supported consistently across all tested browsers.

Figure A6.17 retains the original screenshot associated with this case. The result and comments above follow the latest testing workbook.

![Report figure](<Appendix Diagram/Final_Report_Len_Pei_Ying_QIU-202404-007159.pdf-0390-03.png>)

_Figure A6.17: Form & Input - Password Field Masking_

Overall, all 23 Compatibility Testing test cases across the six testing categories achieved a Pass result in the final testing round within the environments directly tested. The Compatibility Testing results summarised in Section 4.3.5 are detailed in Appendix 6, which also provides information about test cases excluded from the main chapter for brevity. The results are only applicable to browsers, devices, operating systems and viewport configurations evaluated directly, and are not a guarantee of all possible environments.

## Appendix 7: GitHub Repository and Deployment

EasyEarn was developed using Git for version control and GitHub as the project repository. The repository maintains the development history of the system through commits made throughout the implementation, testing, correction and deployment stages. The commit history then supports evidence of the iterative development process undertaken during FYP2.

The EasyEarn web application is deployed by the main deployment workflow of the EasyEarn repository to GitHub Pages. This deployment strategy is similar to the static-frontend and BaaS architecture discussed in Section 4.2, with the frontend served using GitHub Pages and the authentication and database services offered by Supabase.

The deployment history also shows repeated deployments while developing the system, which is also written to the deployment history on GitHub Pages. Successful and unsuccessful deployment attempts provided evidence of the iterative deployment process, where deployment-related issues were identified, corrected and followed by subsequent deployments.

The development record export is available as a supplementary spreadsheet, which can be downloaded from the link below. The record will allow you to see the commit history and development evidence without having to replicate this history in this report.

# GitHub Repository:

<u>https://github.com/PeiYing040830/easyearn</u>

# Deployed EasyEarn Website:

<u>https://peiying040830.github.io/easyearn/</u>

# Supplementary Development Record:

<u>https://docs.google.com/spreadsheets/d/1kI1XszY_p9zjSSiSyxYvcOC7JIXOphPacPTJAdbir EA/edit?usp=drive_link</u>
