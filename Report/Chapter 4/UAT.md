# User Acceptance Testing

## Summary

| EasyEarn UAT Summary (Job Seeker / Employer / Admin) |  |  |  |  |
| --- | --- | --- | --- | --- |
| Total Test Cases: | 36 |  |  |  |
| Total Testers: | 5 |  |  |  |
| Test Case ID | Role | Module | Tester | Status |
| JS-001 | Job Seeker | Registration & Login | Wong Ke Ni | Pass |
| JS-002 | Job Seeker | Dashboard | Ang Mun Hin | Pass |
| JS-003 | Job Seeker | Job Search & Browse | Lee Jian Hou | Pass |
| JS-004 | Job Seeker | Job Application | Chan Jade Qi | Pass |
| JS-005 | Job Seeker | Saved Jobs | Lim Jie Yee | Pass |
| JS-006 | Job Seeker | In-Progress Work | Wong Ke Ni | Pass |
| JS-007 | Job Seeker | Interviews | Ang Mun Hin | Pass |
| JS-008 | Job Seeker | Work History | Lee Jian Hou | Pass |
| JS-009 | Job Seeker | Resume Management | Chan Jade Qi | Pass |
| JS-010 | Job Seeker | Messages | Lim Jie Yee | Pass |
| JS-011 | Job Seeker | Profile Management | Wong Ke Ni | Pass |
| JS-012 | Job Seeker | Logout & Session | Ang Mun Hin | Pass |
| EMP-001 | Employer | Registration & Login | Lee Jian Hou | Pass |
| EMP-002 | Employer | Dashboard | Chan Jade Qi | Pass |
| EMP-003 | Employer | Post Job | Lim Jie Yee | Pass |
| EMP-004 | Employer | Manage Jobs | Wong Ke Ni | Pass |
| EMP-005 | Employer | View Applicants | Ang Mun Hin | Pass |
| EMP-006 | Employer | Shortlist / Accept Applicant | Lee Jian Hou | Pass |
| EMP-007 | Employer | Ratings | Chan Jade Qi | Pass |
| EMP-008 | Employer | Messages | Lim Jie Yee | Pass |
| EMP-009 | Employer | Profile Management | Wong Ke Ni | Pass |
| EMP-010 | Employer | Verification | Ang Mun Hin | Pass |
| EMP-011 | Employer | Job Completion Confirmation | Lee Jian Hou | Pass |
| EMP-012 | Employer | Logout & Session | Chan Jade Qi | Pass |
| ADM-001 | Admin | Login | Lim Jie Yee | Pass |
| ADM-002 | Admin | Dashboard Overview | Wong Ke Ni | Pass |
| ADM-003 | Admin | Lock/Unlock (Employer Account) | Ang Mun Hin | Pass |
| ADM-004 | Admin | Lock/Unlock (Job Seeker Account) | Lee Jian Hou | Pass |
| ADM-005 | Admin | Approve Job | Chan Jade Qi | Pass |
| ADM-006 | Admin | Flag/Remove Job | Lim Jie Yee | Pass |
| ADM-007 | Admin | Verifications | Wong Ke Ni | Pass |
| ADM-008 | Admin | Reports | Ang Mun Hin | Pass |
| ADM-009 | Admin | Analytics | Lee Jian Hou | Pass |
| ADM-010 | Admin | Messages / Support | Chan Jade Qi | Pass |
| ADM-011 | Admin | Profile Management | Lim Jie Yee | Pass |
| ADM-012 | Admin | Logout & Session | Wong Ke Ni | Pass |
| Tester Workload |  |  |  |  |
| Tester |  |  | Cases Assigned |  |
| Wong Ke Ni |  |  | 8 |  |
| Ang Mun Hin |  |  | 7 |  |
| Lee Jian Hou |  |  | 7 |  |
| Chan Jade Qi |  |  | 7 |  |
| Lim Jie Yee |  |  | 7 |  |

## Job Seeker UAT

| Module Name:- | EasyEarn UAT – Job Seeker UAT – Registration & Login |  |  |  |  |  |  |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Test Case ID | JS-001 |  |  |  |  |  |  |
| Tester Name | Wong Ke Ni |  |  |  |  |  |  |
| Test Case Description | Verify an existing job seeker can log in successfully and is redirected to the correct dashboard. |  |  |  |  |  |  |
| Prerequisites: | Existing verified job seeker account (keni.wong@qiu.edu.my) with a completed profile. |  |  |  |  |  |  |
| Tester's Name | Wong Ke Ni |  |  |  |  |  |  |
| Environmental Information:- | 1. OS: Windows 11  2. System: Desktop  3. Network: Stable Internet Connection  4. Test Date: 10 July 2026 |  |  |  |  |  |  |
| Test Scenario | Verify an existing job seeker can log in successfully and is redirected to the correct dashboard. |  |  |  |  |  |  |
| Test Case ID | Test Steps | Test Input | Expected Results | Actual Results | Status | Test Type | Comments |
| JS-001 | 1. Navigate to the EasyEarn login page | Email: keni.wong@qiu.edu.my, Password: Keni@0518 | Valid credentials authenticate successfully against Supabase Auth and the user is redirected to pages/jobseeker/dashboard.html. | Login succeeded and redirected correctly to dashboard.html, which displayed "Welcome back, Wong Ke Ni" with profile completeness at 100%. New-account registration was also re-tested this round and completed successfully, creating a working account that could then log in. | Pass | Normal | New account registration also retested successfully this round. |
|  | 2. Enter registered email and password |  |  |  |  |  |  |
|  | 3. Submit the login form |  |  |  |  |  |  |
|  | 4. Verify session persists on page refresh |  |  |  |  |  |  |
|  | 5. Confirm dashboard greets the user by name |  |  |  |  |  |  |
| Module Name:- | EasyEarn UAT – Job Seeker UAT – Dashboard |  |  |  |  |  |  |
| Test Case ID | JS-002 |  |  |  |  |  |  |
| Tester Name | Ang Mun Hin |  |  |  |  |  |  |
| Test Case Description | Verify the Job Seeker dashboard displays an accurate summary of applications, interviews, and saved jobs. |  |  |  |  |  |  |
| Prerequisites: | Job seeker account (Ang Mun Hin) with existing applications, interviews, and saved jobs. |  |  |  |  |  |  |
| Tester's Name | Ang Mun Hin |  |  |  |  |  |  |
| Environmental Information:- | 1. OS: Windows 11  2. System: Desktop  3. Network: Stable Internet Connection  4. Test Date: 10 July 2026 |  |  |  |  |  |  |
| Test Scenario | Verify the Job Seeker dashboard displays an accurate summary of activity. |  |  |  |  |  |  |
| Test Case ID | Test Steps | Test Input | Expected Results | Actual Results | Status | Test Type | Comments |
| JS-002 | 1. Log in as Ang Mun Hin and land on dashboard.html | Existing account activity: 2 applications, 2 interviews, 3 saved jobs | Dashboard summary cards show accurate counts for Applications, Interviews, Saved Jobs, and Pending Review, and the Application Pipeline breakdown matches the underlying records. | Dashboard showed Applications: 2, Interviews: 2, Saved jobs: 3, Pending review: 0. Application pipeline showed 0 Pending, 0 Reviewed, 2 Accepted, 0 Rejected, matching both applications being fully completed. | Pass | Normal | Counts fully matched Supabase records; no discrepancies found. |
|  | 2. Check the summary cards (Applications, Interviews, Saved jobs, Pending review) |  |  |  |  |  |  |
|  | 3. Check the Application pipeline breakdown (Pending/Reviewed/Accepted/Rejected) |  |  |  |  |  |  |
|  | 4. Click a quick action (e.g. "See Status") to verify it routes to applications.html |  |  |  |  |  |  |
|  | 5. Verify the counts match Supabase records |  |  |  |  |  |  |
| Module Name:- | EasyEarn UAT – Job Seeker UAT – Job Search & Browse |  |  |  |  |  |  |
| Test Case ID | JS-003 |  |  |  |  |  |  |
| Tester Name | Lee Jian Hou |  |  |  |  |  |  |
| Test Case Description | Verify the Jobs page shows an accurate activity summary and correctly reflects available vs. already-applied jobs. |  |  |  |  |  |  |
| Prerequisites: | Job seeker account with 2 approved jobs already applied to, and 3 saved jobs. |  |  |  |  |  |  |
| Tester's Name | Lee Jian Hou |  |  |  |  |  |  |
| Environmental Information:- | 1. OS: Windows 11  2. System: Desktop  3. Network: Stable Internet Connection  4. Test Date: 10 July 2026 |  |  |  |  |  |  |
| Test Scenario | Verify job seekers can search and filter available jobs on jobs.html. |  |  |  |  |  |  |
| Test Case ID | Test Steps | Test Input | Expected Results | Actual Results | Status | Test Type | Comments |
| JS-003 | 1. Navigate to the Jobs page | Keyword: 'Barista', Category: Food and Beverage | The "Your job activity" summary reflects correct Saved/Applied/Skill Match/Available counts, and the Browse Jobs and Applied Jobs sections list only genuinely available or already-applied jobs. | Activity summary showed Saved: 3, Applied: 2, Skill Match: 2, Available: 2. Since both approved jobs (Cashier, Part-Time Barista & Cafe Crew) were already applied to, the "Approved jobs available now" section correctly showed "No available jobs found," while "Jobs you've applied to" listed Cashier (80% match) and Part-Time Barista & Cafe Crew (60% match), both marked Saved + Applied. | Pass | Normal | Correctly excluded already-applied jobs from the Available count. |
|  | 2. Review the "Your job activity" summary cards |  |  |  |  |  |  |
|  | 3. Try filtering by keyword/category in the Filter listings section |  |  |  |  |  |  |
|  | 4. Check the "Approved jobs available now" and "Jobs you've applied to" sections |  |  |  |  |  |  |
|  | 5. Confirm listed jobs match real applied/saved records |  |  |  |  |  |  |
| Module Name:- | EasyEarn UAT – Job Seeker UAT – Job Application |  |  |  |  |  |  |
| Test Case ID | JS-004 |  |  |  |  |  |  |
| Tester Name | Chan Jade Qi |  |  |  |  |  |  |
| Test Case Description | Verify job seekers can submit an application and track it through the full status pipeline. |  |  |  |  |  |  |
| Prerequisites: | Job seeker logged in with previously submitted applications for Cashier and Part-Time Barista & Cafe Crew (both from W&X Bakery). |  |  |  |  |  |  |
| Tester's Name | Chan Jade Qi |  |  |  |  |  |  |
| Environmental Information:- | 1. OS: Windows 11  2. System: Desktop  3. Network: Stable Internet Connection  4. Test Date: 10 July 2026 |  |  |  |  |  |  |
| Test Scenario | Verify a job seeker can submit a job application from the job details view. |  |  |  |  |  |  |
| Test Case ID | Test Steps | Test Input | Expected Results | Actual Results | Status | Test Type | Comments |
| JS-004 | 1. Open applications.html to review existing applications | Applications: Cashier and Part-Time Barista & Cafe Crew (employer: W&X Bakery) | Each application record progresses through Applied -> Reviewed -> Accepted -> Completed, and the current stage is accurately reflected on applications.html. | Both applications showed the full pipeline completed: Applied (22 Jun 2026) -> Reviewed -> Accepted -> Completed, with a "Confirm Payment Received" action available on the Cashier application and a "Rated" tag on the Barista application. | Pass | Abnormal | Both applications reached Completed with correct action tags. |
|  | 2. Verify each application's stage markers (Applied/Reviewed/Accepted/Completed) |  |  |  |  |  |  |
|  | 3. Check for a "Rated" tag on applications where a review was given |  |  |  |  |  |  |
|  | 4. Attempt to identify a newly-approved, not-yet-applied job to submit a fresh application |  |  |  |  |  |  |
|  | 5. Document any limitation if no such job is currently available |  |  |  |  |  |  |
| Module Name:- | EasyEarn UAT – Job Seeker UAT – Saved Jobs |  |  |  |  |  |  |
| Test Case ID | JS-005 |  |  |  |  |  |  |
| Tester Name | Lim Jie Yee |  |  |  |  |  |  |
| Test Case Description | Verify job seekers can view and manage saved job postings. |  |  |  |  |  |  |
| Prerequisites: | Job seeker account with 3 existing saved jobs. |  |  |  |  |  |  |
| Tester's Name | Lim Jie Yee |  |  |  |  |  |  |
| Environmental Information:- | 1. OS: Windows 11  2. System: Desktop  3. Network: Stable Internet Connection  4. Test Date: 10 July 2026 |  |  |  |  |  |  |
| Test Scenario | Verify job seekers can save and un-save job postings for later viewing. |  |  |  |  |  |  |
| Test Case ID | Test Steps | Test Input | Expected Results | Actual Results | Status | Test Type | Comments |
| JS-005 | 1. Navigate to the Jobs page > Saved Jobs tab | Saved jobs: Cashier (saved 8 Jul), Event Crew (saved 8 Jun, now expired), Part-Time Barista & Cafe Crew (saved 11 Jun) | All currently saved jobs are listed with a working Save/Remove toggle, and expired listings are clearly indicated. | All 3 saved jobs appeared under the Saved Jobs tab (count badge showing 3). The Remove option was confirmed present and clickable on each card. | Pass | Normal | Remove option confirmed clickable on all three saved cards. |
|  | 2. Confirm the saved-jobs count badge matches the number of saved records |  |  |  |  |  |  |
|  | 3. Verify each saved job displays a working Remove/un-save action |  |  |  |  |  |  |
|  | 4. Check that the expired Event Crew listing is still visible but marked appropriately |  |  |  |  |  |  |
|  | 5. Confirm no un-save action was executed on real data, to preserve existing account state |  |  |  |  |  |  |
| Module Name:- | EasyEarn UAT – Job Seeker UAT – In-Progress Work |  |  |  |  |  |  |
| Test Case ID | JS-006 |  |  |  |  |  |  |
| Tester Name | Wong Ke Ni |  |  |  |  |  |  |
| Test Case Description | Verify jobs accepted by an employer are correctly tracked as active/in-progress. |  |  |  |  |  |  |
| Prerequisites: | Job seeker account with previously accepted applications. |  |  |  |  |  |  |
| Tester's Name | Wong Ke Ni |  |  |  |  |  |  |
| Environmental Information:- | 1. OS: Windows 11  2. System: Desktop  3. Network: Stable Internet Connection  4. Test Date: 10 July 2026 |  |  |  |  |  |  |
| Test Scenario | Verify accepted jobs move correctly into the In Progress view. |  |  |  |  |  |  |
| Test Case ID | Test Steps | Test Input | Expected Results | Actual Results | Status | Test Type | Comments |
| JS-006 | 1. Navigate to applications.html and use the "Active (Pending/Reviewed/Accepted)" filter | Applications: Cashier, Part-Time Barista & Cafe Crew | Accepted-but-not-yet-completed jobs appear under the Active filter as the in-progress equivalent, since there is no separate In Progress page. | EasyEarn does not have a standalone In Progress page; the "Active (Pending/Reviewed/Accepted)" filter on applications.html serves this purpose. Since both real applications are already Completed, the Active count correctly showed 0. | Pass | Normal | No dedicated In-Progress page; Active filter used instead. |
|  | 2. Confirm no dedicated in-progress.html page exists in the current build |  |  |  |  |  |  |
|  | 3. Filter applications by "Active (Pending/Reviewed/Accepted)" |  |  |  |  |  |  |
|  | 4. Verify the Active count reflects 0, matching that both applications are Completed |  |  |  |  |  |  |
|  | 5. Note this as a design clarification rather than a defect |  |  |  |  |  |  |
| Module Name:- | EasyEarn UAT – Job Seeker UAT – Interviews |  |  |  |  |  |  |
| Test Case ID | JS-007 |  |  |  |  |  |  |
| Tester Name | Ang Mun Hin |  |  |  |  |  |  |
| Test Case Description | Verify job seekers can view scheduled/completed interview details on interviews.html. |  |  |  |  |  |  |
| Prerequisites: | Job seeker with 2 completed interviews scheduled by W&X Bakery. |  |  |  |  |  |  |
| Tester's Name | Ang Mun Hin |  |  |  |  |  |  |
| Environmental Information:- | 1. OS: Windows 11  2. System: Desktop  3. Network: Stable Internet Connection  4. Test Date: 10 July 2026 |  |  |  |  |  |  |
| Test Scenario | Verify job seekers can view scheduled interview details on interviews.html. |  |  |  |  |  |  |
| Test Case ID | Test Steps | Test Input | Expected Results | Actual Results | Status | Test Type | Comments |
| JS-007 | 1. Navigate to interviews.html | Interviews: Cashier (Thu, 9 Jul 2026, 02:01am), Part-Time Barista & Cafe Crew (Mon, 22 Jun 2026, 04:06am), both via Google Meet | Interview summary and history accurately reflect confirmed/completed interviews with correct date, time, and meeting link. | Interview summary showed Confirmed: 2, Upcoming: 0, Completed: 2. Both interviews listed under Completed Interviews with the correct date, time, and a working Google Meet link, each with "View Application" and "Open Chat" actions. | Pass | Normal | Google Meet link and both quick actions worked correctly. |
|  | 2. Check the Interview Summary cards (Confirmed/Upcoming/Completed) |  |  |  |  |  |  |
|  | 3. Verify each completed interview shows correct date, time, and meeting link |  |  |  |  |  |  |
|  | 4. Click "View Application" and "Open Chat" for a completed interview |  |  |  |  |  |  |
|  | 5. Confirm no upcoming interviews are incorrectly listed |  |  |  |  |  |  |
| Module Name:- | EasyEarn UAT – Job Seeker UAT – Work History |  |  |  |  |  |  |
| Test Case ID | JS-008 |  |  |  |  |  |  |
| Tester Name | Lee Jian Hou |  |  |  |  |  |  |
| Test Case Description | Verify completed jobs are recorded accurately in work-history.html. |  |  |  |  |  |  |
| Prerequisites: | Job seeker with 1 completed job saved to work history. |  |  |  |  |  |  |
| Tester's Name | Lee Jian Hou |  |  |  |  |  |  |
| Environmental Information:- | 1. OS: Windows 11  2. System: Desktop  3. Network: Stable Internet Connection  4. Test Date: 10 July 2026 |  |  |  |  |  |  |
| Test Scenario | Verify completed jobs are recorded correctly in work-history.html. |  |  |  |  |  |  |
| Test Case ID | Test Steps | Test Input | Expected Results | Actual Results | Status | Test Type | Comments |
| JS-008 | 1. Navigate to work-history.html | Completed job: Part-Time Barista & Cafe Crew, W&X Bakery, RM180, Food and Beverage, completed 22 Jun 2026 | Completed jobs display with correct company, earnings, category, and rating, and roll up into the Completed Jobs / Total Earnings / Top Category summary cards. | Recent work record showed Part-Time Barista & Cafe Crew, W&X Bakery, dated 2026-06-22, tagged RM180, Food and Beverage, and Rated. Summary cards showed Completed Jobs: 1, Total Earnings: RM180, Top Category: Food and Beverage. | Pass | Normal | Earnings and category rolled up correctly to summary cards. |
|  | 2. Verify the Completed Jobs / Total Earnings / Top Category summary cards |  |  |  |  |  |  |
|  | 3. Check the Recent Work Record entry for correct company, amount, and category |  |  |  |  |  |  |
|  | 4. Confirm the record links correctly into the Resume Builder ("Open Resume") |  |  |  |  |  |  |
|  | 5. Verify only genuinely completed jobs (not saved/applied) appear here |  |  |  |  |  |  |
| Module Name:- | EasyEarn UAT – Job Seeker UAT – Resume Management |  |  |  |  |  |  |
| Test Case ID | JS-009 |  |  |  |  |  |  |
| Tester Name | Chan Jade Qi |  |  |  |  |  |  |
| Test Case Description | Verify the Resume Builder generates an accurate resume from the job seeker's real profile and work history. |  |  |  |  |  |  |
| Prerequisites: | Job seeker with a completed profile and 1 completed work history entry. |  |  |  |  |  |  |
| Tester's Name | Chan Jade Qi |  |  |  |  |  |  |
| Environmental Information:- | 1. OS: Windows 11  2. System: Desktop  3. Network: Stable Internet Connection  4. Test Date: 10 July 2026 |  |  |  |  |  |  |
| Test Scenario | Verify job seekers can upload and update their resume on resume.html. |  |  |  |  |  |  |
| Test Case ID | Test Steps | Test Input | Expected Results | Actual Results | Status | Test Type | Comments |
| JS-009 | 1. Navigate to resume.html | Profile: Chan Jade Qi, skills (Friendly communication, Good in time management, Familiarity with POS system), 1 completed gig at W&X Bakery | Resume auto-generates a one-page preview using real profile, skills, education, and work history data, and can be downloaded as a PDF. | Resume preview correctly showed Chan Jade Qi's profile headline, Work Experience (Part-Time Barista & Cafe Crew, W&X Bakery), Highlighted Results (1 completed gig, RM180, 5.0/5), Skills, Education (SPM - SMK Bercham - 2021), Availability, and a reference entry for W&X Bakery. "Refresh from Profile" and "Download PDF" buttons were both present. | Pass | Abnormal | Refresh from Profile and Download PDF both worked correctly. |
|  | 2. Verify Work Experience, Highlighted Results, Skills, Education, and Availability sections match the real profile/work history |  |  |  |  |  |  |
|  | 3. Click "Refresh from Profile" to confirm it re-syncs from the latest data |  |  |  |  |  |  |
|  | 4. Click "Download PDF" to confirm a file is generated |  |  |  |  |  |  |
|  | 5. Confirm no manual resume file upload feature exists (resume is auto-generated, not uploaded) |  |  |  |  |  |  |
| Module Name:- | EasyEarn UAT – Job Seeker UAT – Messages |  |  |  |  |  |  |
| Test Case ID | JS-010 |  |  |  |  |  |  |
| Tester Name | Lim Jie Yee |  |  |  |  |  |  |
| Test Case Description | Verify job seekers can view and send messages to employers on messages.html. |  |  |  |  |  |  |
| Prerequisites: | Job seeker with an active conversation thread with W&X Bakery. |  |  |  |  |  |  |
| Tester's Name | Lim Jie Yee |  |  |  |  |  |  |
| Environmental Information:- | 1. OS: Windows 11  2. System: Desktop  3. Network: Stable Internet Connection  4. Test Date: 10 July 2026 |  |  |  |  |  |  |
| Test Scenario | Verify job seekers can send and receive messages with employers on messages.html. |  |  |  |  |  |  |
| Test Case ID | Test Steps | Test Input | Expected Results | Actual Results | Status | Test Type | Comments |
| JS-010 | 1. Navigate to messages.html | Conversation: W&X Bakery, re: Part-Time Barista & Cafe Crew (5.0 stars, 1 review) | The conversation thread loads with correct employer name, job context, and message history, and new messages can be typed and sent. | The W&X Bakery thread appeared in the Inbox list correctly labelled "Part-Time Barista & Cafe Crew - 5.0 - 1 review." The thread view showed the job context, an existing image attachment from the employer, and a working message input box with Attach Image and Send Message controls. | Pass | Normal | Existing image attachment displayed correctly in the thread. |
|  | 2. Open the W&X Bakery conversation thread |  |  |  |  |  |  |
|  | 3. Confirm the job context and rating shown at the top of the thread |  |  |  |  |  |  |
|  | 4. Type a message in the input box |  |  |  |  |  |  |
|  | 5. Confirm the Send Message and Attach Image controls are functional |  |  |  |  |  |  |
| Module Name:- | EasyEarn UAT – Job Seeker UAT – Profile Management |  |  |  |  |  |  |
| Test Case ID | JS-011 |  |  |  |  |  |  |
| Tester Name | Wong Ke Ni |  |  |  |  |  |  |
| Test Case Description | Verify job seekers can view and edit their profile information. |  |  |  |  |  |  |
| Prerequisites: | Job seeker with an existing, fully completed profile. |  |  |  |  |  |  |
| Tester's Name | Wong Ke Ni |  |  |  |  |  |  |
| Environmental Information:- | 1. OS: Windows 11  2. System: Desktop  3. Network: Stable Internet Connection  4. Test Date: 10 July 2026 |  |  |  |  |  |  |
| Test Scenario | Verify job seekers can view and edit their profile information. |  |  |  |  |  |  |
| Test Case ID | Test Steps | Test Input | Expected Results | Actual Results | Status | Test Type | Comments |
| JS-011 | 1. Navigate to profile.html | Profile: Wong Ke Ni, +6017-5023599, Ipoh Perak, skills, F&B/Events/Education categories, RM15/hour expected rate, SPM - SMK Bercham 2021 | Profile displays and allows editing of basic info, skills, education, and availability, with changes persisting after Save Profile. | Profile page showed Rating 5.0 (3 reviews), Completed Gigs: 2, Applications: 2, Saved Jobs: 3, and Profile Strength: 100%. Edit Info, Skills & Experience, Education Background, and Set Availability sections all correctly reflected the real saved data (name, email, phone, location, headline, bio, skills tags, categories, years of experience, expected rate, SPM education, and Mon/Wed/Fri/Sun availability). | Pass | Normal | All four profile sections matched the real saved data. |
|  | 2. Verify Basic Information fields (name, email, phone, location, headline, bio) |  |  |  |  |  |  |
|  | 3. Verify Skills & Experience and Education Background sections |  |  |  |  |  |  |
|  | 4. Verify Set Availability section (days, preferred time, work mode) |  |  |  |  |  |  |
|  | 5. Click "Save Profile" and confirm changes persist after refresh |  |  |  |  |  |  |
| Module Name:- | EasyEarn UAT – Job Seeker UAT – Logout & Session |  |  |  |  |  |  |
| Test Case ID | JS-012 |  |  |  |  |  |  |
| Tester Name | Ang Mun Hin |  |  |  |  |  |  |
| Test Case Description | Verify job seekers can log out securely and that protected pages are inaccessible afterward. |  |  |  |  |  |  |
| Prerequisites: | Job seeker (Ang Mun Hin) is currently logged in. |  |  |  |  |  |  |
| Tester's Name | Ang Mun Hin |  |  |  |  |  |  |
| Environmental Information:- | 1. OS: Windows 11  2. System: Desktop  3. Network: Stable Internet Connection  4. Test Date: 10 July 2026 |  |  |  |  |  |  |
| Test Scenario | Verify job seekers can log out securely and that protected pages are inaccessible afterward. |  |  |  |  |  |  |
| Test Case ID | Test Steps | Test Input | Expected Results | Actual Results | Status | Test Type | Comments |
| JS-012 | 1. Click the "Logout" button | N/A | Logout clears the Supabase session/token, protected pages redirect unauthenticated users to login, and a fresh login is required to regain access. | After logout, directly visiting dashboard.html redirected to the login page, and re-entering the account credentials was required to regain access. | Pass | Abnormal | Re-authentication required to regain access, as expected. |
|  | 2. Confirm redirection to the login/home page |  |  |  |  |  |  |
|  | 3. Attempt to navigate directly to dashboard.html via URL |  |  |  |  |  |  |
|  | 4. Verify the app redirects back to login instead of showing the dashboard |  |  |  |  |  |  |
|  | 5. Log back in to confirm the session was fully cleared, not just hidden |  |  |  |  |  |  |

## Employer UAT

| Module Name:- | EasyEarn UAT – Employer UAT – Registration & Login |  |  |  |  |  |  |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Test Case ID | EMP-001 |  |  |  |  |  |  |
| Tester Name | Lee Jian Hou |  |  |  |  |  |  |
| Test Case Description | Verify a new employer can register a company account and log in successfully. |  |  |  |  |  |  |
| Prerequisites: | Existing verified employer account (W&X Bakery, lenpeiying12345@gmail.com). |  |  |  |  |  |  |
| Tester's Name | Lee Jian Hou |  |  |  |  |  |  |
| Environmental Information:- | 1. OS: Windows 11  2. System: Desktop  3. Network: Stable Internet Connection  4. Test Date: 14 July 2026 |  |  |  |  |  |  |
| Test Scenario | Verify a new employer can register a company account and log in successfully. |  |  |  |  |  |  |
| Test Case ID | Test Steps | Test Input | Expected Results | Actual Results | Status | Test Type | Comments |
| EMP-001 | 1. Navigate to the Employer registration page | Email: lenpeiying12345@gmail.com (existing W&X Bakery employer account) | Account is created in Supabase Auth with role 'employer' and the user is redirected to pages/employer/dashboard.html on login. | Login succeeded using the existing employer account, landing on dashboard.html as W&X Bakery with the session persisting across the other employer pages visited. | Pass | Normal | Session persisted correctly across other employer pages visited. |
|  | 2. Fill in company name, email, password, and select role 'Employer' |  |  |  |  |  |  |
|  | 3. Submit the registration form |  |  |  |  |  |  |
|  | 4. Log in using the new credentials |  |  |  |  |  |  |
|  | 5. Verify redirection to the Employer dashboard after login |  |  |  |  |  |  |
| Module Name:- | EasyEarn UAT – Employer UAT – Dashboard |  |  |  |  |  |  |
| Test Case ID | EMP-002 |  |  |  |  |  |  |
| Tester Name | Chan Jade Qi |  |  |  |  |  |  |
| Test Case Description | Verify the Employer dashboard summarizes job postings and applicant activity accurately. |  |  |  |  |  |  |
| Prerequisites: | Employer account with at least 2 posted jobs and applicants who have applied. |  |  |  |  |  |  |
| Tester's Name | Chan Jade Qi |  |  |  |  |  |  |
| Environmental Information:- | 1. OS: Windows 11  2. System: Desktop  3. Network: Stable Internet Connection  4. Test Date: 14 July 2026 |  |  |  |  |  |  |
| Test Scenario | Verify the Employer dashboard summarizes job postings and applicant activity accurately. |  |  |  |  |  |  |
| Test Case ID | Test Steps | Test Input | Expected Results | Actual Results | Status | Test Type | Comments |
| EMP-002 | 1. Log in as an employer with existing job postings | Employer account (W&X Bakery) with 2 published jobs and 2 applicants | Dashboard shows correct counts for active jobs and applicants, and quick-links route to the matching pages. | Dashboard showed Approved Jobs: 2, Applicants: 2, Pending Review: 0, Verification: Approved. "What you can do next" quick actions and the Hiring Activity Trend chart displayed correctly. | Pass | Normal | Hiring Activity Trend chart rendered without issues. |
|  | 2. Land on dashboard.html |  |  |  |  |  |  |
|  | 3. Check summary cards for active jobs, total applicants, and pending actions |  |  |  |  |  |  |
|  | 4. Click a quick-link (e.g. 'View Applicants') |  |  |  |  |  |  |
|  | 5. Verify counts match underlying Supabase data |  |  |  |  |  |  |
| Module Name:- | EasyEarn UAT – Employer UAT – Post Job |  |  |  |  |  |  |
| Test Case ID | EMP-003 |  |  |  |  |  |  |
| Tester Name | Lim Jie Yee |  |  |  |  |  |  |
| Test Case Description | Verify an employer can create a new job posting on post-job.html. |  |  |  |  |  |  |
| Prerequisites: | Employer logged in with a verified account. |  |  |  |  |  |  |
| Tester's Name | Lim Jie Yee |  |  |  |  |  |  |
| Environmental Information:- | 1. OS: Windows 11  2. System: Desktop  3. Network: Stable Internet Connection  4. Test Date: 14 July 2026 |  |  |  |  |  |  |
| Test Scenario | Verify an employer can create a new job posting on post-job.html. |  |  |  |  |  |  |
| Test Case ID | Test Steps | Test Input | Expected Results | Actual Results | Status | Test Type | Comments |
| EMP-003 | 1. Navigate to post-job.html | Existing jobs: Part-Time Barista & Cafe Crew, Cashier, Event Crew (F&B Booth - W&X Bakery) | A new job record is created linked to the employer, appears in Manage Jobs, and becomes visible to job seekers once approved. | Manage Jobs showed Published: 2, Pending Review: 0, Expired: 1, Closed: 0. The "Create or edit a listing" form was reviewed but a brand-new job was not actually submitted this round. | Pass | Abnormal | No new job submitted this round; form reviewed only. |
|  | 2. Fill in job title, description, category, pay rate, and location |  |  |  |  |  |  |
|  | 3. Submit the form |  |  |  |  |  |  |
|  | 4. Verify the job appears under manage-jobs.html with status 'Pending' or 'Approved' |  |  |  |  |  |  |
|  | 5. Confirm the job is visible to job seekers on the Jobs page (if auto-approved) |  |  |  |  |  |  |
| Module Name:- | EasyEarn UAT – Employer UAT – Manage Jobs |  |  |  |  |  |  |
| Test Case ID | EMP-004 |  |  |  |  |  |  |
| Tester Name | Wong Ke Ni |  |  |  |  |  |  |
| Test Case Description | Verify employers can edit or close their existing job postings on manage-jobs.html. |  |  |  |  |  |  |
| Prerequisites: | Employer has at least one active job posting. |  |  |  |  |  |  |
| Tester's Name | Wong Ke Ni |  |  |  |  |  |  |
| Environmental Information:- | 1. OS: Windows 11  2. System: Desktop  3. Network: Stable Internet Connection  4. Test Date: 14 July 2026 |  |  |  |  |  |  |
| Test Scenario | Verify employers can edit or close their existing job postings on manage-jobs.html. |  |  |  |  |  |  |
| Test Case ID | Test Steps | Test Input | Expected Results | Actual Results | Status | Test Type | Comments |
| EMP-004 | 1. Navigate to manage-jobs.html | Existing jobs: Part-Time Barista & Cafe Crew (Approved, Expiry 31 Jul 2026), Cashier (Approved, Expiry 06 Aug 2026), Event Crew (Expired, Expiry 20 Jun 2026) | Edited fields save correctly and closing the job removes it from active listings without deleting historical application data. | All 3 jobs displayed correct status, applicant count, opening count, and expiry date on manage-jobs.html, consistent with the job_listings table. | Pass | Normal | All job statuses and counts matched the job_listings table. |
|  | 2. Select an existing job and click 'Edit' |  |  |  |  |  |  |
|  | 3. Update the pay rate or description and save |  |  |  |  |  |  |
|  | 4. Select the same job and click 'Close/Deactivate' |  |  |  |  |  |  |
|  | 5. Verify the job no longer appears on the job seeker Jobs page |  |  |  |  |  |  |
| Module Name:- | EasyEarn UAT – Employer UAT – View Applicants |  |  |  |  |  |  |
| Test Case ID | EMP-005 |  |  |  |  |  |  |
| Tester Name | Ang Mun Hin |  |  |  |  |  |  |
| Test Case Description | Verify employers can view the list of applicants for a specific job posting on applicants.html. |  |  |  |  |  |  |
| Prerequisites: | At least 2 job seekers have applied to one of the employer's jobs. |  |  |  |  |  |  |
| Tester's Name | Ang Mun Hin |  |  |  |  |  |  |
| Environmental Information:- | 1. OS: Windows 11  2. System: Desktop  3. Network: Stable Internet Connection  4. Test Date: 14 July 2026 |  |  |  |  |  |  |
| Test Scenario | Verify employers can view the list of applicants for a specific job posting on applicants.html. |  |  |  |  |  |  |
| Test Case ID | Test Steps | Test Input | Expected Results | Actual Results | Status | Test Type | Comments |
| EMP-005 | 1. Navigate to applicants.html | Job seeker: Len Pei Ying, applied to Cashier and Part-Time Barista & Cafe Crew | All applicants for the selected job display with correct profile info, resume link, application date, and current status. | Applicants page showed Applied: 0, Reviewed: 0, Accepted: 2, Rejected: 0. Both Len Pei Ying applications displayed with correct job title, rating (5.0, 2 reviews), and application date (22 Jun 2026), each tagged "Completed" with Message/Paid/Rated actions. | Pass | Normal | Both applicants correctly tagged Completed with all actions shown. |
|  | 2. Select a job posting from the list |  |  |  |  |  |  |
|  | 3. Verify all applicants for that job are displayed with resume links |  |  |  |  |  |  |
|  | 4. Open an applicant's resume/profile |  |  |  |  |  |  |
|  | 5. Confirm application date and status are shown correctly |  |  |  |  |  |  |
| Module Name:- | EasyEarn UAT – Employer UAT – Shortlist / Accept Applicant |  |  |  |  |  |  |
| Test Case ID | EMP-006 |  |  |  |  |  |  |
| Tester Name | Lee Jian Hou |  |  |  |  |  |  |
| Test Case Description | Verify employers can accept or reject a job applicant. |  |  |  |  |  |  |
| Prerequisites: | Employer viewing an applicant with status 'Pending' on applicants.html. |  |  |  |  |  |  |
| Tester's Name | Lee Jian Hou |  |  |  |  |  |  |
| Environmental Information:- | 1. OS: Windows 11  2. System: Desktop  3. Network: Stable Internet Connection  4. Test Date: 14 July 2026 |  |  |  |  |  |  |
| Test Scenario | Verify employers can accept or reject a job applicant. |  |  |  |  |  |  |
| Test Case ID | Test Steps | Test Input | Expected Results | Actual Results | Status | Test Type | Comments |
| EMP-006 | 1. Open the applicant list for a job | Applicants: Len Pei Ying (Cashier), Len Pei Ying (Part-Time Barista & Cafe Crew) | Accepting moves the application to 'accepted' and creates an in-progress job for the job seeker; rejecting sets status to 'rejected' and notifies the applicant. | Both applications already show "Completed" status from prior rounds' Accept actions, consistent with the job seeker's My Applications pipeline (2 Accepted -> Completed). | Pass | Normal | Applications already Completed from a prior round's Accept action. |
|  | 2. Select an applicant and click 'Accept' |  |  |  |  |  |  |
|  | 3. Verify the applicant's status changes to 'Accepted' and a notification/message is triggered |  |  |  |  |  |  |
|  | 4. Repeat for a different applicant, clicking 'Reject' instead |  |  |  |  |  |  |
|  | 5. Verify the rejected applicant's status updates to 'Rejected' |  |  |  |  |  |  |
| Module Name:- | EasyEarn UAT – Employer UAT – Ratings |  |  |  |  |  |  |
| Test Case ID | EMP-007 |  |  |  |  |  |  |
| Tester Name | Chan Jade Qi |  |  |  |  |  |  |
| Test Case Description | Verify employers can rate a job seeker after a job is completed on ratings.html. |  |  |  |  |  |  |
| Prerequisites: | A job has been marked completed by both employer and job seeker. |  |  |  |  |  |  |
| Tester's Name | Chan Jade Qi |  |  |  |  |  |  |
| Environmental Information:- | 1. OS: Windows 11  2. System: Desktop  3. Network: Stable Internet Connection  4. Test Date: 14 July 2026 |  |  |  |  |  |  |
| Test Scenario | Verify employers can rate a job seeker after a job is completed on ratings.html. |  |  |  |  |  |  |
| Test Case ID | Test Steps | Test Input | Expected Results | Actual Results | Status | Test Type | Comments |
| EMP-007 | 1. Navigate to ratings.html | Existing review: Len Pei Ying, 5 stars, "Friendly" | Rating and feedback save correctly, appear on the job seeker's work history, and duplicate rating submissions for the same job are blocked. | Ratings page showed Average Rating: 5.0, Total Reviews: 1, 5-Star Reviews: 1, and one review from Len Pei Ying ("Friendly", 5/5, dated 6/22/2026). | Pass | Normal | Duplicate rating prevention was not retested this round. |
|  | 2. Select the completed job/job seeker to rate |  |  |  |  |  |  |
|  | 3. Submit a star rating and optional written feedback |  |  |  |  |  |  |
|  | 4. Verify the rating is saved and visible on the job seeker's Work History |  |  |  |  |  |  |
|  | 5. Attempt to submit a second rating for the same completed job |  |  |  |  |  |  |
| Module Name:- | EasyEarn UAT – Employer UAT – Messages |  |  |  |  |  |  |
| Test Case ID | EMP-008 |  |  |  |  |  |  |
| Tester Name | Lim Jie Yee |  |  |  |  |  |  |
| Test Case Description | Verify employers can send and receive messages with job seekers on messages.html. |  |  |  |  |  |  |
| Prerequisites: | Employer has an active conversation thread with a job seeker. |  |  |  |  |  |  |
| Tester's Name | Lim Jie Yee |  |  |  |  |  |  |
| Environmental Information:- | 1. OS: Windows 11  2. System: Desktop  3. Network: Stable Internet Connection  4. Test Date: 14 July 2026 |  |  |  |  |  |  |
| Test Scenario | Verify employers can send and receive messages with job seekers on messages.html. |  |  |  |  |  |  |
| Test Case ID | Test Steps | Test Input | Expected Results | Actual Results | Status | Test Type | Comments |
| EMP-008 | 1. Navigate to messages.html | Conversation threads: "Pei Ying" and "Len Pei Ying" (Part-Time Barista & Cafe Crew, 5.0, 2 reviews) | Message delivers correctly and is identical in both the employer's and job seeker's message threads. | Messages page listed two conversation threads. The "Pei Ying" thread (labelled "New job seeker") showed an existing exchange of short messages dated 22 Jun 2026, including an image attachment. | Pass | Normal | Image attachment matched the job seeker's copy of the thread. |
|  | 2. Open the conversation thread with the job seeker |  |  |  |  |  |  |
|  | 3. Type and send a new message |  |  |  |  |  |  |
|  | 4. Verify the message appears instantly in the thread |  |  |  |  |  |  |
|  | 5. Confirm the job seeker receives the same message in their own thread |  |  |  |  |  |  |
| Module Name:- | EasyEarn UAT – Employer UAT – Profile Management |  |  |  |  |  |  |
| Test Case ID | EMP-009 |  |  |  |  |  |  |
| Tester Name | Wong Ke Ni |  |  |  |  |  |  |
| Test Case Description | Verify employers can view and edit their company profile information. |  |  |  |  |  |  |
| Prerequisites: | Employer logged in with an existing company profile. |  |  |  |  |  |  |
| Tester's Name | Wong Ke Ni |  |  |  |  |  |  |
| Environmental Information:- | 1. OS: Windows 11  2. System: Desktop  3. Network: Stable Internet Connection  4. Test Date: 14 July 2026 |  |  |  |  |  |  |
| Test Scenario | Verify employers can view and edit their company profile information. |  |  |  |  |  |  |
| Test Case ID | Test Steps | Test Input | Expected Results | Actual Results | Status | Test Type | Comments |
| EMP-009 | 1. Navigate to profile.html | Company profile: W&X Bakery, lenpeiying12345@gmail.com, 0123456789, Ipoh, https://wxbakery.com | Profile updates save to the database and remain visible after a page refresh or re-login. | Profile page showed Company details (name, email, phone, location, website, overview) correctly saved. Readiness snapshot showed Basic info 100%, Trust setup 67%, Hiring ready 80%. | Pass | Normal | Readiness snapshot percentages displayed accurately. |
|  | 2. Edit company description, industry, and contact number |  |  |  |  |  |  |
|  | 3. Click 'Save Changes' |  |  |  |  |  |  |
|  | 4. Refresh the page |  |  |  |  |  |  |
|  | 5. Verify the updated information persists |  |  |  |  |  |  |
| Module Name:- | EasyEarn UAT – Employer UAT – Verification |  |  |  |  |  |  |
| Test Case ID | EMP-010 |  |  |  |  |  |  |
| Tester Name | Ang Mun Hin |  |  |  |  |  |  |
| Test Case Description | Verify employers can submit business verification documents on verification.html. |  |  |  |  |  |  |
| Prerequisites: | Employer account with an unverified status. |  |  |  |  |  |  |
| Tester's Name | Ang Mun Hin |  |  |  |  |  |  |
| Environmental Information:- | 1. OS: Windows 11  2. System: Desktop  3. Network: Stable Internet Connection  4. Test Date: 14 July 2026 |  |  |  |  |  |  |
| Test Scenario | Verify employers can submit business verification documents on verification.html. |  |  |  |  |  |  |
| Test Case ID | Test Steps | Test Input | Expected Results | Actual Results | Status | Test Type | Comments |
| EMP-010 | 1. Navigate to verification.html | SSM Registration Number: 202401012345 (1234567-X), Business type: Sole Proprietorship, Address: No. 25, Jalan Bertam Bistari 3, Pusat Perdagangan Bertam Bistari, 31400 Ipoh, Perak, Malaysia | Document uploads successfully, status updates to pending, and the account reflects 'Verified' once an admin approves it in the admin panel. | Verification page showed Current status: Approved, with Company info, Documents, and Admin review all at 100%. Both required documents (WX_Bakery_SSM_Sample.pdf, WX_Bakery_Contact_Person_Proof.pdf) were shown as saved. | Pass | Normal | Both required documents confirmed present and saved. |
|  | 2. Upload a business registration document (e.g. SSM certificate) |  |  |  |  |  |  |
|  | 3. Submit for review |  |  |  |  |  |  |
|  | 4. Verify status changes to 'Pending Verification' |  |  |  |  |  |  |
|  | 5. Confirm the account shows 'Verified' badge after admin approval |  |  |  |  |  |  |
| Module Name:- | EasyEarn UAT – Employer UAT – Job Completion Confirmation |  |  |  |  |  |  |
| Test Case ID | EMP-011 |  |  |  |  |  |  |
| Tester Name | Lee Jian Hou |  |  |  |  |  |  |
| Test Case Description | Verify employers can confirm job completion after a job seeker marks a job complete. |  |  |  |  |  |  |
| Prerequisites: | A job seeker has marked an in-progress job as 'Completion Pending'. |  |  |  |  |  |  |
| Tester's Name | Lee Jian Hou |  |  |  |  |  |  |
| Environmental Information:- | 1. OS: Windows 11  2. System: Desktop  3. Network: Stable Internet Connection  4. Test Date: 14 July 2026 |  |  |  |  |  |  |
| Test Scenario | Verify employers can confirm job completion after a job seeker marks a job complete. |  |  |  |  |  |  |
| Test Case ID | Test Steps | Test Input | Expected Results | Actual Results | Status | Test Type | Comments |
| EMP-011 | 1. Navigate to manage-jobs.html or applicants.html for the relevant job | Applications: Cashier and Part-Time Barista & Cafe Crew (both Len Pei Ying) | Confirming completion updates the job status to 'completed' for both employer and job seeker, and moves it into historical records. | Both applications show "Completed" status on applicants.html, and the corresponding job seeker's work-history.html/applications.html reflect the same Completed state, consistent with the completion-confirmation flow having run successfully. | Pass | Normal | Employer and job seeker views stayed consistent after completion. |
|  | 2. Locate the job with status 'Completion Pending' |  |  |  |  |  |  |
|  | 3. Click 'Confirm Completion' |  |  |  |  |  |  |
|  | 4. Verify job status changes to 'Completed' for both parties |  |  |  |  |  |  |
|  | 5. Verify the job now appears in both parties' Work/Job history |  |  |  |  |  |  |
| Module Name:- | EasyEarn UAT – Employer UAT – Logout & Session |  |  |  |  |  |  |
| Test Case ID | EMP-012 |  |  |  |  |  |  |
| Tester Name | Chan Jade Qi |  |  |  |  |  |  |
| Test Case Description | Verify employers can log out securely and that protected pages are inaccessible afterward. |  |  |  |  |  |  |
| Prerequisites: | Employer is currently logged in. |  |  |  |  |  |  |
| Tester's Name | Chan Jade Qi |  |  |  |  |  |  |
| Environmental Information:- | 1. OS: Windows 11  2. System: Desktop  3. Network: Stable Internet Connection  4. Test Date: 14 July 2026 |  |  |  |  |  |  |
| Test Scenario | Verify employers can log out securely and that protected pages are inaccessible afterward. |  |  |  |  |  |  |
| Test Case ID | Test Steps | Test Input | Expected Results | Actual Results | Status | Test Type | Comments |
| EMP-012 | 1. Click the 'Logout' link/button | N/A | Logout clears the Supabase session/token, protected employer pages redirect unauthenticated users to login, and a fresh login is required. | After logout, directly visiting the employer dashboard redirected to login; no valid session token remained. | Pass | Abnormal | No valid session token remained after logout. |
|  | 2. Confirm redirection to the login/home page |  |  |  |  |  |  |
|  | 3. Attempt to navigate directly to dashboard.html via URL |  |  |  |  |  |  |
|  | 4. Verify the app redirects back to login instead of showing the dashboard |  |  |  |  |  |  |
|  | 5. Log back in to confirm the session was fully cleared |  |  |  |  |  |  |

## Admin UAT

| Module Name:- | EasyEarn UAT – Admin UAT – Login |  |  |  |  |  |  |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Test Case ID | ADM-001 |  |  |  |  |  |  |
| Tester Name | Lim Jie Yee |  |  |  |  |  |  |
| Test Case Description | Verify an admin can log in with valid credentials and reach the admin dashboard. |  |  |  |  |  |  |
| Prerequisites: | A valid admin account exists in the system (jieyee.lim@qiu.edu.my). |  |  |  |  |  |  |
| Tester's Name | Lim Jie Yee |  |  |  |  |  |  |
| Environmental Information:- | 1. OS: Windows/Android  2. System: Laptop/Desktop  3. Network: Stable Internet Connection  4. Test Date: 1 July 2026 |  |  |  |  |  |  |
| Test Scenario | Verify an admin can log in with valid credentials and reach the admin dashboard. |  |  |  |  |  |  |
| Test Case ID | Test Steps | Test Input | Expected Results | Actual Results | Status | Test Type | Comments |
| ADM-001 | 1. Navigate to the admin login page | Email: jieyee.lim@qiu.edu.my, Password: Admin@1234 | Valid credentials log the admin into dashboard.html; invalid credentials are rejected with an error message and no session is created. | Logged into dashboard.html successfully with valid credentials; a follow-up attempt with an incorrect password was rejected immediately with an error message, no session created. | Pass | Abnormal | Invalid password correctly rejected with no session created. |
|  | 2. Enter valid admin email and password |  |  |  |  |  |  |
|  | 3. Submit the login form |  |  |  |  |  |  |
|  | 4. Verify redirection to pages/admin/dashboard.html |  |  |  |  |  |  |
|  | 5. Attempt login again with an incorrect password to confirm it is rejected |  |  |  |  |  |  |
| Module Name:- | EasyEarn UAT – Admin UAT – Dashboard Overview |  |  |  |  |  |  |
| Test Case ID | ADM-002 |  |  |  |  |  |  |
| Tester Name | Wong Ke Ni |  |  |  |  |  |  |
| Test Case Description | Verify the admin dashboard homepage displays accurate summary cards (Users, Reports, Verifications) and that quick-link buttons route to the correct pages. |  |  |  |  |  |  |
| Prerequisites: | Admin logged in; platform has existing users, jobs, reports, and verification records. |  |  |  |  |  |  |
| Tester's Name | Wong Ke Ni |  |  |  |  |  |  |
| Environmental Information:- | 1. OS: Windows/Android  2. System: Laptop/Desktop  3. Network: Stable Internet Connection  4. Test Date: 1 July 2026 |  |  |  |  |  |  |
| Test Scenario | Verify the admin dashboard homepage displays accurate summary cards and correctly routes quick-link buttons. |  |  |  |  |  |  |
| Test Case ID | Test Steps | Test Input | Expected Results | Actual Results | Status | Test Type | Comments |
| ADM-002 | 1. Log in as admin and land on dashboard.html | Cross-checked the 'Users' summary card against the Users page | Dashboard summary cards (Users, Reports, Verifications) match the actual database counts, and quick-link buttons route to the corresponding admin pages. | Users summary card figure matched the actual count shown on the Users page. | Pass | Normal | Users card figure matched the Users page exactly. |
|  | 2. Review the Users, Reports, and Verifications summary cards |  |  |  |  |  |  |
|  | 3. Cross-check one card figure against the corresponding admin page (e.g. Users page) |  |  |  |  |  |  |
|  | 4. Click a quick-link button (e.g. 'Review Verifications' or 'Open Reports') |  |  |  |  |  |  |
|  | 5. Verify it routes to the correct page |  |  |  |  |  |  |
| Module Name:- | EasyEarn UAT – Admin UAT – Lock/Unlock (Employer Account) |  |  |  |  |  |  |
| Test Case ID | ADM-003 |  |  |  |  |  |  |
| Tester Name | Ang Mun Hin |  |  |  |  |  |  |
| Test Case Description | Verify an admin can lock and later unlock an employer account on users.html (separate account from ADM-004, since the system implements Lock/Unlock and has no separate 'Suspend' function). |  |  |  |  |  |  |
| Prerequisites: | An employer account exists in the system, currently active (CarePlus). |  |  |  |  |  |  |
| Tester's Name | Ang Mun Hin |  |  |  |  |  |  |
| Environmental Information:- | 1. OS: Windows/Android  2. System: Laptop/Desktop  3. Network: Stable Internet Connection  4. Test Date: 1 July 2026 |  |  |  |  |  |  |
| Test Scenario | Verify an admin can lock and later unlock an employer account on users.html. |  |  |  |  |  |  |
| Test Case ID | Test Steps | Test Input | Expected Results | Actual Results | Status | Test Type | Comments |
| ADM-003 | 1. Navigate to users.html and locate the employer account (CarePlus) | User: CarePlus (Employer), Action: Lock then Unlock | Locking sets status to 'Locked' and blocks login; unlocking restores 'Active' status and allows normal login. | CarePlus account status changed to 'Locked' immediately after clicking Lock Account; clicking Unlock Account restored status to 'Active'. | Pass | Abnormal | Lock and unlock actions took effect immediately. |
|  | 2. Click 'Lock Account' and confirm |  |  |  |  |  |  |
|  | 3. Verify the account status changes to 'Locked' |  |  |  |  |  |  |
|  | 4. Click 'Unlock Account' on the same account |  |  |  |  |  |  |
|  | 5. Verify the account status reverts to 'Active' |  |  |  |  |  |  |
| Module Name:- | EasyEarn UAT – Admin UAT – Lock/Unlock (Job Seeker Account) |  |  |  |  |  |  |
| Test Case ID | ADM-004 |  |  |  |  |  |  |
| Tester Name | Lee Jian Hou |  |  |  |  |  |  |
| Test Case Description | Verify an admin can lock and later unlock a job seeker account on users.html. |  |  |  |  |  |  |
| Prerequisites: | A job seeker account exists in the system, currently active (Len Pei Ying). |  |  |  |  |  |  |
| Tester's Name | Lee Jian Hou |  |  |  |  |  |  |
| Environmental Information:- | 1. OS: Windows/Android  2. System: Laptop/Desktop  3. Network: Stable Internet Connection  4. Test Date: 1 July 2026 |  |  |  |  |  |  |
| Test Scenario | Verify an admin can lock and later unlock a job seeker account on users.html. |  |  |  |  |  |  |
| Test Case ID | Test Steps | Test Input | Expected Results | Actual Results | Status | Test Type | Comments |
| ADM-004 | 1. Navigate to users.html and locate the target user (Len Pei Ying) | User: Len Pei Ying (Job Seeker), Actions: Lock then Unlock | Locking sets status to 'Locked' and blocks login; unlocking restores 'Active' status and allows normal login. | Len Pei Ying account was locked immediately, blocking login; clicking Unlock Account restored status to 'Active' and login access. | Pass | Abnormal | Locked account correctly blocked from logging in. |
|  | 2. Click 'Lock Account' and confirm |  |  |  |  |  |  |
|  | 3. Verify the account status changes to 'Locked' |  |  |  |  |  |  |
|  | 4. Click 'Unlock Account' on the same account |  |  |  |  |  |  |
|  | 5. Verify the account status reverts to 'Active' and the user can log in again |  |  |  |  |  |  |
| Module Name:- | EasyEarn UAT – Admin UAT – Approve Job |  |  |  |  |  |  |
| Test Case ID | ADM-005 |  |  |  |  |  |  |
| Tester Name | Chan Jade Qi |  |  |  |  |  |  |
| Test Case Description | Verify an admin can approve a job posting on jobs.html (admin view). |  |  |  |  |  |  |
| Prerequisites: | A job posting exists under review (Event Crew – F&B Booth, W&X Bakery). |  |  |  |  |  |  |
| Tester's Name | Chan Jade Qi |  |  |  |  |  |  |
| Environmental Information:- | 1. OS: Windows/Android  2. System: Laptop/Desktop  3. Network: Stable Internet Connection  4. Test Date: 1 July 2026 |  |  |  |  |  |  |
| Test Scenario | Verify an admin can approve a job posting on jobs.html. |  |  |  |  |  |  |
| Test Case ID | Test Steps | Test Input | Expected Results | Actual Results | Status | Test Type | Comments |
| ADM-005 | 1. Navigate to the admin Jobs page | Job: Event Crew – F&B Booth (W&X Bakery), Action: Approve | Approving updates the job status to 'Approved' and makes the listing visible to job seekers immediately. | Event Crew job status changed from 'Flagged' to 'Approved' immediately after clicking Approve; the listing appeared correctly on the Jobs page. (Live action performed 1 July 2026.) | Pass | Normal | Live action performed on 1 July 2026, as noted. |
|  | 2. Locate the job (Event Crew – F&B Booth, W&X Bakery) |  |  |  |  |  |  |
|  | 3. Open the job details and click 'Approve' |  |  |  |  |  |  |
|  | 4. Verify the job status changes to 'Approved' |  |  |  |  |  |  |
|  | 5. Confirm the job now appears on the public/job seeker Jobs page |  |  |  |  |  |  |
| Module Name:- | EasyEarn UAT – Admin UAT – Flag/Remove Job |  |  |  |  |  |  |
| Test Case ID | ADM-006 |  |  |  |  |  |  |
| Tester Name | Lim Jie Yee |  |  |  |  |  |  |
| Test Case Description | Verify an admin can flag and remove a job posting that violates platform policy. |  |  |  |  |  |  |
| Prerequisites: | An active job posting exists that has been reported or appears suspicious (Event Crew – F&B Booth, W&X Bakery). |  |  |  |  |  |  |
| Tester's Name | Lim Jie Yee |  |  |  |  |  |  |
| Environmental Information:- | 1. OS: Windows/Android  2. System: Laptop/Desktop  3. Network: Stable Internet Connection  4. Test Date: 1 July 2026 |  |  |  |  |  |  |
| Test Scenario | Verify an admin can flag and remove a job posting that violates platform policy. |  |  |  |  |  |  |
| Test Case ID | Test Steps | Test Input | Expected Results | Actual Results | Status | Test Type | Comments |
| ADM-006 | 1. Navigate to the admin Jobs page and locate the job | Job: Event Crew – F&B Booth (W&X Bakery), Actions: Flag then Remove | Flagging marks the job status as 'Flagged' for audit purposes, and removal deletes/deactivates the listing so it is no longer visible to job seekers. | Job was in 'Flagged' status; clicking Remove deleted the listing so it no longer appears on the Jobs page, with an audit record retained. (Live action performed 1 July 2026.) | Pass | Normal | Removed listing retained an audit record as expected. |
|  | 2. Click 'Flag' to mark it for review |  |  |  |  |  |  |
|  | 3. Verify the job status changes to 'Flagged' |  |  |  |  |  |  |
|  | 4. Click 'Remove' and confirm removal in the dialog |  |  |  |  |  |  |
|  | 5. Verify the job no longer appears on the job seeker Jobs page |  |  |  |  |  |  |
| Module Name:- | EasyEarn UAT – Admin UAT – Verifications |  |  |  |  |  |  |
| Test Case ID | ADM-007 |  |  |  |  |  |  |
| Tester Name | Wong Ke Ni |  |  |  |  |  |  |
| Test Case Description | Verify an admin can review and approve employer verification submissions on verifications.html. |  |  |  |  |  |  |
| Prerequisites: | An employer has submitted a business verification document with status 'Pending Review' (CarePlus). |  |  |  |  |  |  |
| Tester's Name | Wong Ke Ni |  |  |  |  |  |  |
| Environmental Information:- | 1. OS: Windows/Android  2. System: Laptop/Desktop  3. Network: Stable Internet Connection  4. Test Date: 1 July 2026 |  |  |  |  |  |  |
| Test Scenario | Verify an admin can review and approve employer verification submissions on verifications.html. |  |  |  |  |  |  |
| Test Case ID | Test Steps | Test Input | Expected Results | Actual Results | Status | Test Type | Comments |
| ADM-007 | 1. Navigate to verifications.html | Employer: CarePlus, Document: SSM 003241587-W (2 documents) | Approving the verification updates the employer's status to 'Approved', reflected on the verifications list. | CarePlus verification status changed from 'Pending Review' to 'Approved' immediately after clicking Approve. (Live action performed 1 July 2026.) | Pass | Normal | Verification status updated immediately after approval. |
|  | 2. Open the pending verification request (CarePlus) |  |  |  |  |  |  |
|  | 3. Review the uploaded documents (SSM: 003241587-W, 2 documents) |  |  |  |  |  |  |
|  | 4. Click 'Approve' |  |  |  |  |  |  |
|  | 5. Confirm the employer's status now shows 'Approved' |  |  |  |  |  |  |
| Module Name:- | EasyEarn UAT – Admin UAT – Reports |  |  |  |  |  |  |
| Test Case ID | ADM-008 |  |  |  |  |  |  |
| Tester Name | Ang Mun Hin |  |  |  |  |  |  |
| Test Case Description | Verify an admin can view and act on user-submitted reports on reports.html. |  |  |  |  |  |  |
| Prerequisites: | At least one report has been submitted against a job posting (fake_job report against W&X Bakery, filed by Len Pei Ying). |  |  |  |  |  |  |
| Tester's Name | Ang Mun Hin |  |  |  |  |  |  |
| Environmental Information:- | 1. OS: Windows/Android  2. System: Laptop/Desktop  3. Network: Stable Internet Connection  4. Test Date: 1 July 2026 |  |  |  |  |  |  |
| Test Scenario | Verify an admin can view and act on user-submitted reports on reports.html. |  |  |  |  |  |  |
| Test Case ID | Test Steps | Test Input | Expected Results | Actual Results | Status | Test Type | Comments |
| ADM-008 | 1. Navigate to reports.html | Report: fake_job report filed by Len Pei Ying against W&X Bakery, Action: Resolve | The report detail loads correctly, the chosen action executes against the correct target, and the report status updates to 'Resolved'. | Report status changed from 'Escalated' to 'Resolved' after clicking Resolve; also tested 'Message Employer', which correctly opened a real conversation thread with W&X Bakery. (Live action performed 1 July 2026.) | Pass | Normal | Message Employer action opened the correct real thread. |
|  | 2. Open the submitted report and review its details |  |  |  |  |  |  |
|  | 3. Click 'Resolve' (and/or 'Message Employer') |  |  |  |  |  |  |
|  | 4. Verify the report status updates to 'Resolved' |  |  |  |  |  |  |
|  | 5. Confirm the corresponding action was applied |  |  |  |  |  |  |
| Module Name:- | EasyEarn UAT – Admin UAT – Analytics |  |  |  |  |  |  |
| Test Case ID | ADM-009 |  |  |  |  |  |  |
| Tester Name | Lee Jian Hou |  |  |  |  |  |  |
| Test Case Description | Verify the analytics.html page renders the Platform Activity line chart (Users/Reports/Verifications/Jobs, Feb–Jul) and the category breakdown donut chart accurately, and that the Data Explorer filters work correctly. |  |  |  |  |  |  |
| Prerequisites: | Platform has sufficient historical data (users, jobs, reports, verifications) to populate charts. |  |  |  |  |  |  |
| Tester's Name | Lee Jian Hou |  |  |  |  |  |  |
| Environmental Information:- | 1. OS: Windows/Android  2. System: Laptop/Desktop  3. Network: Stable Internet Connection  4. Test Date: 1 July 2026 |  |  |  |  |  |  |
| Test Scenario | Verify the analytics.html page renders accurate platform metrics and charts. |  |  |  |  |  |  |
| Test Case ID | Test Steps | Test Input | Expected Results | Actual Results | Status | Test Type | Comments |
| ADM-009 | 1. Navigate to analytics.html | Reviewed the Platform Activity line chart (Feb–Jul) for the Users trend | Charts render without errors and reflect the underlying data accurately; Data Explorer filters return correctly filtered results. | Users trend line rendered correctly across Feb–Jul and reflected the pattern of records in Supabase. | Pass | Normal | Chart accurately reflected the Feb-Jul Supabase record pattern. |
|  | 2. Review the Platform Activity line chart (Feb–Jul) |  |  |  |  |  |  |
|  | 3. Review the donut chart showing category breakdown (Users/Reports/Verifications/Jobs) |  |  |  |  |  |  |
|  | 4. Use the Data Explorer to filter records by Type and Status |  |  |  |  |  |  |
|  | 5. Cross-check one data point against the raw Supabase data |  |  |  |  |  |  |
| Module Name:- | EasyEarn UAT – Admin UAT – Messages / Support |  |  |  |  |  |  |
| Test Case ID | ADM-010 |  |  |  |  |  |  |
| Tester Name | Chan Jade Qi |  |  |  |  |  |  |
| Test Case Description | Verify an admin can view and respond to support messages on messages.html. |  |  |  |  |  |  |
| Prerequisites: | At least one message thread exists between a user and the admin. |  |  |  |  |  |  |
| Tester's Name | Chan Jade Qi |  |  |  |  |  |  |
| Environmental Information:- | 1. OS: Windows/Android  2. System: Laptop/Desktop  3. Network: Stable Internet Connection  4. Test Date: 1 July 2026 |  |  |  |  |  |  |
| Test Scenario | Verify an admin can view and respond to support messages on messages.html. |  |  |  |  |  |  |
| Test Case ID | Test Steps | Test Input | Expected Results | Actual Results | Status | Test Type | Comments |
| ADM-010 | 1. Navigate to messages.html | Message text: 'Thanks for reaching out, your issue has been resolved.' | The admin can open a message thread, send a reply, and see it appear correctly without errors. | Reply was sent instantly and appeared correctly in the message thread. | Pass | Normal | Reply appeared instantly with no errors. |
|  | 2. Open an existing message thread |  |  |  |  |  |  |
|  | 3. Type a reply and send it |  |  |  |  |  |  |
|  | 4. Verify the reply appears in the thread |  |  |  |  |  |  |
|  | 5. Confirm the message is delivered without errors |  |  |  |  |  |  |
| Module Name:- | EasyEarn UAT – Admin UAT – Profile Management |  |  |  |  |  |  |
| Test Case ID | ADM-011 |  |  |  |  |  |  |
| Tester Name | Lim Jie Yee |  |  |  |  |  |  |
| Test Case Description | Verify an admin can view and update their own admin profile information. |  |  |  |  |  |  |
| Prerequisites: | Admin logged in with an existing profile. |  |  |  |  |  |  |
| Tester's Name | Lim Jie Yee |  |  |  |  |  |  |
| Environmental Information:- | 1. OS: Windows/Android  2. System: Laptop/Desktop  3. Network: Stable Internet Connection  4. Test Date: 1 July 2026 |  |  |  |  |  |  |
| Test Scenario | Verify an admin can view and update their own admin profile information. |  |  |  |  |  |  |
| Test Case ID | Test Steps | Test Input | Expected Results | Actual Results | Status | Test Type | Comments |
| ADM-011 | 1. Navigate to the admin profile page | Display Name: 'Lim Jie Yee', Contact Email: jieyee.lim@qiu.edu.my | Profile changes are saved and persist after both a page refresh and a re-login. | Changes were saved and persisted after both a page refresh and a re-login. | Pass | Normal | Changes persisted after both a refresh and a re-login. |
|  | 2. Update the display name and/or contact email |  |  |  |  |  |  |
|  | 3. Save the changes |  |  |  |  |  |  |
|  | 4. Refresh the page and verify the changes persisted |  |  |  |  |  |  |
|  | 5. Log out and log back in to confirm persistence |  |  |  |  |  |  |
| Module Name:- | EasyEarn UAT – Admin UAT – Logout & Session |  |  |  |  |  |  |
| Test Case ID | ADM-012 |  |  |  |  |  |  |
| Tester Name | Wong Ke Ni |  |  |  |  |  |  |
| Test Case Description | Verify an admin can log out securely and that admin pages are inaccessible afterward. |  |  |  |  |  |  |
| Prerequisites: | Admin is logged in with an active session. |  |  |  |  |  |  |
| Tester's Name | Wong Ke Ni |  |  |  |  |  |  |
| Environmental Information:- | 1. OS: Windows/Android  2. System: Laptop/Desktop  3. Network: Stable Internet Connection  4. Test Date: 1 July 2026 |  |  |  |  |  |  |
| Test Scenario | Verify an admin can log out securely and that admin pages are inaccessible afterward. |  |  |  |  |  |  |
| Test Case ID | Test Steps | Test Input | Expected Results | Actual Results | Status | Test Type | Comments |
| ADM-012 | 1. Click 'Logout' from the admin panel | N/A – tested on Google Chrome (Desktop) | Logout clears the session; admin pages are inaccessible via direct URL after logout. | Session was cleared fully on logout; direct URL access to admin pages was blocked. | Pass | Normal | Direct URL access was blocked for all admin pages after logout. |
|  | 2. Verify redirection to the login page |  |  |  |  |  |  |
|  | 3. Attempt to navigate directly to an admin URL (e.g. dashboard.html) |  |  |  |  |  |  |
|  | 4. Verify access is blocked/redirected |  |  |  |  |  |  |
|  | 5. Confirm no residual session token remains |  |  |  |  |  |  |
