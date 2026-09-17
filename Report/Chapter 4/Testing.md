## 4.3 Testing

Five complementary testing methods were used: System Testing (ST), User Acceptance Testing (UAT), Usability Testing, Security Testing (SEC), and Compatibility Testing (CT). The methods are used to assess various quality characteristics of EasyEarn, such as functional correctness, user acceptance, usability, security and cross-environment behaviour. System Testing is the testing that checks the end-to-end (E2E) functionality of EasyEarn.

### 4.3.1 System Testing

To test the end-to-end functionality of EasyEarn, seven categories of System Testing were performed, which included E2E Workflow, Integration, Performance, Recovery, Business Logic, Reporting and Compliance. There were a total of 34 System Test cases which were run and all were passed. The system was tested to ensure that the completed EasyEarn system and the connected components satisfy the defined functional and non-functional requirements in realistic use cases using System Testing. Security Testing and Compatibility Testing are treated separately (in Sections 4.3.4 and 4.3.5) since they test different aspects of the quality of the system. The seven System Testing categories are summarised in Figure 4.2. In this section, one representative test case is presented for each category of the System Testing test cases, while the other System Testing test cases and the supporting evidence are given in Appendix 3 [96].

![Figure 4.2 image 1](Diagram/figure-02.png)

Figure 4.2: EasyEarn System Testing Summary

#### 4.3.1.1 End-to-End Workflow

End-to-End (E2E) Workflow Testing is applied to verify whether a complete user process can be executed successfully from beginning to end across a collection of interacting workflows within a system, rather than testing each function separately. It helps d etermine whether the system behaves correctly throughout the entire user journey up to its expected completion or end state, including the interactions between related modules and stored data [96]. EasyEarn E2E Workflow Testing covered processes such as Job Seeker and Employer registration, job application, applicant management, job completion, payment confirmation and moderation. One representative E2E Workflow test case is presented below, while the remaining E2E Workflow test cases and supporting evidence are provided in Appendix 3.1.

ST-003: Hire-to-completion flow

This test includes all of the following: Job Application through to Job Acceptance, through to Job Completion, to Job Rating and to Job History. It validates that status for every application is kept in sync during the workflow and that a work history is c reated when the application is completed. The application moving forward through the interview and completion process and into the rating process and work history record is shown in Figure 4.3.

![Figure 4.3 image 1](Diagram/figure-03.png)

Figure 4.3: Hire-to-completion flow

#### 4.3.1.2 Integration

Integration Testing is used to check the interactions between the different modules, services and data-processing components of a system when they are integrated together. It targets interfaces and data exchanges between interconnected components to ensure failures due to faulty communication, data transfer, or system integration can be identified [96]. EasyEarn involved Integration Testing to confirm the interaction between the Frontend (JavaScript), Supabase database, database triggers, notifications, Employer Verification workflow, asynchronous messaging, and the chatbot knowledge base and saved-job functions. The following is one representative Integration test case, and the remaining Integration test cases and supporting evidence can be found in Appendix 3.2.

ST-007: Application CRUD and openings_count trigger

An application is created, updated, and deleted properly, and the necessary database function to update the job's openings count is called, not allowing the count to fall below zero. The application record is created, updated and deleted as shown in Figure 4.4, and the job's openings_count field updates correctly with each of these operations.

![Figure 4.4 image 1](Diagram/figure-04.png)

Figure 4.4: Application CRUD and openings_count trigger

#### 4.3.1.3 Performance

Performance testing was conducted to verify the system would perform correctly if it were subjected to data processing, user action or operations that would put an added strain on the system. It can aid in determining performance issues such as response time, processing behaviour and complex or time-sensitive situations [96]. EasyEarn job listing loading and filtering, multiple concurrent job applications, PDF resume generation and Admin Analytics Dashboard rendering were the areas of focus for EasyEarn in the Performance Testing area. The operations are chosen because they are used within the platform and are data intensive or time sensitive. The following example Performance test case is presented; the other Performance test cases and supporting evidence are contained in Appendix 3.3.

ST-014: Concurrent application race condition

Tests the case where multiple applications are submitted simultaneously to a job with exactly one remaining slot, and validates that the database trigger is satisfied by exactly one application. The following Figure 4.5 illustrates the simultaneous applications submitted to a job with one slot still available, in which the database trigger allows exactly one of these applications.

![Figure 4.5 image 1](Diagram/figure-05.png)

Figure 4.5: Concurrent Application Race Condition

#### 4.3.1.4 Recovery

Recovery Testing is used to evaluate a system's response to failures and/or interruptions, and its ability to return to a stable and consistent state without producing incorrect, incomplete, or inconsistent data. Some systems depend on external services, a uthentication sessions, and database transactions they use, and a failure during normal system operation might occur [96]. EasyEarn's Recovery Testing included application submission failure, application expiry, and Supabase connectivity failure. These tests were performed to see if the system can deal with such cases correctly and keep the data in the system consistent during testing. The following is one of the Recovery test cases and supporting evidence; Appendix 3.4 contains the other Recovery test cases with supporting evidence.

ST-019: Failed application submission rollback

This test ensures that if the application submission fails due to some error in the database, the transaction is rolled back and the system data does not change. As illustrated in Figure 4.6, the failure to submit an application does not leave incomplete or corrupted database information.

![Figure 4.6 image 1](Diagram/figure-06.png)

Figure 4.6: Failed Application Submission Rollback

#### 4.3.1.5 Business Logic

Business Logic Testing is performed to ensure that the rules and condition which govern the system's behavior are correctly coded. These rules specify the way that data is used within the system, what users can do and what the system will do if certain conditions are fulfilled. Business Logic Testing by EasyEarn included calculations for job-matching, location-distance bonuses, application status transitions, rating eligibility, moderation queue classification and Employer Verification Badge behaviour. These rules directly affect certain core EasyEarn functions and should work in harmony with how the system is intended to be used. The following represents one representative Business Logic test case; the other Business Logic test cases, as well as supporting evidence, are given in Appendix 3.5.

ST-023: Application Status Transition Constraints

Tests ensure that only valid forward status changes can be made through the employer UI, with a verifier that reversal of a completed application or seeker self-editing is not allowed. Figure 4.7 is the employer UI that can only accept valid forward changes in status, which prevents the seekers from changing status and editing their own applications.

![Figure 4.7 image 1](Diagram/figure-07.png)

Figure 4.7: Application Status Transition Constraints

#### 4.3.1.6 Reporting

Reporting Testing checks the information displayed in dashboards, generated reports, and calculated summary information against the information in the underlying system. Accurate reporting is significant because the information created is pertinent for Job Seekers, Employers and Admins to keep an eye on applications, work history, job performance and platform activities [96]. For EasyEarn, Reporting Testing took place on the Admin Analytics Dashboard, job listing reports, Job Seeker work history and earnings information, and Employer job posting performance information. The tests were conducted to verify the consistency of th e displayed values and the summary information with the corresponding information in the database. Below is one Reporting test case, and the other Reporting test cases and supporting evidence are detailed in Appendix 3.6.

ST-027: Admin analytics dashboard accuracy

Tests for each summary number on the dashboard to see that they are equal to the number of underlying database rows and that the proportions of the chart correspond to the proportions of the rows. Admin page numbers for analytics dashboard appear in the same proportion as the numbers in the database, as seen in Figure 4.8.

![Figure 4.8 image 1](Diagram/figure-08.png)

Figure 4.8: Admin Analytics Dashboard Accuracy

#### 4.3.1.7 Compliance

Compliance-related System Testing checks whether selected system functions operate in alignment with the privacy, transparency and user-protection considerations taken into account during the design of EasyEarn. EasyEarn includes tests for system features related to the PDPA 2010 and the Gig Workers Act 2025, such as access to privacy information, processing of Employer verification documents, administrative audit logs and compliance reminders. These tests are not intended to provide formal legal or regulatory certification o f the system implementation and behaviour, but are intended to confirm the implementation and behaviour of selected system controls related to compliance [17], [76], [96]. Below is one of the test cases in Compliance and Appendix 3.7 provides a listing of all Compliance test cases and evidence.

ST-032: PDPA-aligned document handling

This test evaluates the desired use of sensitive Employer verification documents, and which access control is applied to these documents. The purpose of EasyEarn is to limit access to the sensitive verification data by user roles. The new RLS policies determine access to Employer verification information by record ownership and the Administrator role. Unauthenticated users are not allowed to access the protected v erification information, and authenticated users who are not the owner of the Employer record are not allowed to access the protected verification information. As seen in Figure 4.9, access to the Employer verification information is denied as per the defined RLS policies, verifying that unauthorized users are not able to get the protected document information.

![Figure 4.9 image 1](Diagram/figure-09.png)

Figure 4.9: PDPA-aligned Document Handling

The 34 System Testing test cases have all passed. The findings show that the primary EasyEarn workflows, integrations, performance-related operations, recovery behaviour, business rules, reporting functions and selected compliance-related controls were performed as outlined in the test scenarios. The tests in particular showed that application workflows would run properly from one module to another, that database triggers would keep important system rules, that concurrent applications would be properly controlled, that failed transactions would not corrupt the stored data, and that the system-generated reports would accurately mirror the underlying state of the database. The complete set of System Testing cases and supporting evidence that are not presented in this section are provided in Appendix 3 [96].

### 4.3.2 User Acceptance Testing (UAT)

To help determine if EasyEarn fulfilled its expected functional needs for its three primary user groups, Job Seeker, Employer and Admin, UAT was performed. To simulate real system usage, the tests were conducted using designated user accounts and test data stored in Supabase. A total of 36 functional UAT test cases were created, comprising 12 test cases for each user role. Five testers participated in the UAT, with each assigned test case executed once by the respective tester. To test the cross-browser and device consistency, Compatibility Testing was carried out in Section 4.3.5. The distribution and outcomes of 36 test cases for UAT are summarised in Figure 4.10. This section includes one test case for each user role, and additional UAT test cases and evidence are included in Appendix 4.

![Figure 4.10 image 1](Diagram/figure-10.png)

![Figure 4.10 image 2](Diagram/figure-11.png)

Figure 4.10: Summary of UAT

#### 4.3.2.1 Job Seeker UAT

Job Seeker UAT determines if the primary functions offered to Job Seekers can be successfully performed by the user. A total of 12 test cases were created covering Registration and Login, Dashboard, Job Search and Browse, Job Application, Saved Jobs, In-Progress Work, Interviews, Work History, Resume Management, Messages, Profile Management, Logout and Session. All test cases were conducted using a designated Job Seeker account and test data stored in Supabase. The prefix â€œJSâ€ denotes the Job Seeker UAT test cases. The following Job Seeker UAT test case is presented and the remainder of the Job Seeker test cases and evidence are found in Appendix 4.1. JS-004: Job Application This test checks whether the Job Seeker can view submitted job applications and whether the displayed status and available actions are appropriate for each application stage. In the tested account, the Cashier application was in the Completion Pending stag e and displayed the â€œConfirm Payment Receivedâ€ action, while the Part-Time Barista & Cafe Crew application was in the Completed stage and displayed the â€œRatedâ€ status. Figure 4.11 shows the application status timeline and the corresponding actions available to the Job Seeker.

![Figure 4.11 image 1](Diagram/figure-12.png)

Figure 4.11: Job Seeker - Job Application Status and Completion Confirmation

#### 4.3.2.2 Employer UAT

Employer UAT helps verify that Employers' major functions can be accomplished with the system and that the system is able to furnish the desired information and controls during the recruitment process. In total, 12 test cases were created for Registration and Login, Dashboard, Post Job, Manage Jobs, View Applicants, Shortlist/Accept Applicant, Ratings, Messages, Profile Management, Verification, Job Completion Confirmation and Logout and Session. All test cases were conducted using a designated Employer account and test data stored in Supabase. The UAT test cases of Employers are identified with the prefix â€œEMPâ€. The following is one of the Employer test cases and evidence, with the remainder of the Employer test cases and evidence included in Appendix 4.2. EMP-005: View Applicants This test will check if the Employer will be able to see the applicants and get the proper Application, Job Seeker and information about the status. The tested Employer account showed two applications, one of which was completed with the right job title, r ating, review details, date of application and possible actions, and it was completed by the same Job Seeker. The Applicants page displays the completed applicant records and their status and action details as shown in Figure 4.12.

![Figure 4.12 image 1](Diagram/figure-13.png)

Figure 4.12: Employer - View Applicants

#### 4.3.2.3 Admin UAT

Admin UAT tests the success of the administrative tasks of EasyEarn for managing the platform, moderating and supporting its users. There are 12 test cases developed to cover Login, Dashboard Overview, Employer Account Lock/ Unlock, Job Seeker Account Lock/ Unlock, Approve Job, Flag/ Remove Job, Verifications, Reports, Analytics, Messages/ Support, Profile Management and Logout and Session. All test cases were conducted with an actual Admin account with all data in Supabase. The prefix â€œADMâ€ is used to identify the Admin UAT test cases. The following representative Admin UAT test case is shown; other Admin test cases and supporting evidence for these test cases are in Appendix 4.3. ADM-006: Flag/Remove Job This test checks if an Admin can mark and delete a bad job listing and keep the moderation information. This test succeeded in marking the tested job as â€œFlaggedâ€ and removing it from the Jobs page after performing its Remove action, as well as keeping its audit record. The flagged job listing, the removal from the public Jobs page and the flagged moderation record are illustrated in Figure 4.13.

![Figure 4.13 image 1](Diagram/figure-14.png)

Figure 4.13: Admin - Flag/Remove Job

All 36 UAT test cases were passed in all three job roles: Job Seeker, Employer and Admin. The results showed that EasyEarn's main workflows and functions could be accomplished with a real user and Supabase data. All UAT test cases and supporting evidence not included in this section are included in Appendix 4.

### 4.3.3 Usability Testing

Usability Testing was conducted using the heuristic evaluation method based on Nielsen's 10 Usability Heuristics [55]. Heuristic evaluation involves systematically reviewing a UI against established usability principles to identify usability problems and assess their severity, rather than relying solely on responses from end-user participants. The evaluation of EasyEarn was conducted by the author across three role-based interfaces: Job Seeker, Employer and Admin. During each evaluation, the deployed system and relevant source code were reviewed to support the findings. Each of Nielsen's 10 heuristics was assessed accord ing to whether the system met the heuristic requirements and, where a usability issue was identified, the issue was rated using Nielsen's 0 -4 severity scale, where 0 represents no usability problem, and 4 represents a usability catastrophe [55]. The overall heuristic evaluation results are presented in Table 4.5.

**Table 4.5: Heuristic Evaluation Results**

Heuristic Application in EasyEarn Severity Compliance Visibility of System Status Notification bell updates are made by periodic polling; the application status timeline shows status changes, and the Admin Dashboard shows updated application statistics on the platform. 2-Minor Partially Met Match Between System and the Real World Job categories, RM currency formatting and role-specific terminology (Job Seeker/Employer/Admin) are aligned with the context of the gig economy in Malaysia. 0-None Met User Control and Freedom Users can edit or delete job postings where permitted, log out at any time, remove saved jobs, and switch between the Login and Register tabs on the same page. 0-None Met Consistency and Standards The same theme is used throughout all pages in each role, using shared partials for header-*.html and footer.html that are themed in green/amber/purple/teal. 1-Cosmetic Partially Met Error Prevention Multiple job postings are rejected and a helpful message is displayed when they are duplicated, and fields with required information are not accepted. 0-None Met Recognition Rather Than Recall Role-specific navbar and dashboard summary cards help users not have to memorise the routes between sessions. 0-None Met Flexibility and Efficiency of Use Novice and frequent users are not overwhelmed by the amount of time they take to use the job search and category/location filters, the dark mode toggle, and the saved-jobs feature. 0-None Met Aesthetic and Minimalist Design Shared card layout maintains a clean and uncluttered appearance of public-facing and dashboard pages, with only relevant information appearing on each page, depending on the user role. 0-None Met Help Users Recognise, Diagnose, and Recover from Errors If the password is wrong or there are missing items in input forms, the error messages are displayed directly, clearly and offer suggestions for corrective action. 0-None Met Help and Documentation An in-context chatbot widget is provided on every page of the dashboard. Only FAQ keywords are covered, not free-form queries. 2-Minor Partially Met The evaluation resulted in problems with three out of the ten heuristics: Visibility of System Status (H1), Consistency and Standards (H4) and Help and Documentation (H10). The other seven heuristics were completely met; each had a 0 (not a usability probl em) severity rating. Each issue, its location, levels of severity and potential solution are outlined in Table 4.6, while all of the ten heuristics are cross-referenced with their related issues (or noted where they were not found) in Table 4.8.

**Table 4.6: Identified Usability Issues and Solutions**

No. Issue Heuristic Violated Location Severity Proposed Solution 1 Chatbot only works for keyword-based answer types for FAQ answers and not free-form natural language queries. H10-Help and Documentation Floating chatbot widget (all dashboard pages) 2-Minor Migrate to a Have a light backend that uses an intent-matching or Large Language Model (LLM) service to handle free-form questions (as detailed in Section 5.5). 2 The colour of the background behind the navbar is different to the background colour of the rest of the page. H4-Consistency and Standards Job Seeker and Admin dashboard navbars 1-Cosmetic Match the background colour token of the navbar to the page-level CSS variable for each role. 3 This is a bug where the two-column stat-card grid does not show up H4-Consistency and Standards The page you are at is called your 1-Cosmetic Make the 700px media query more specific, or below the breakpoint of 700px on the Applications page, since a wider media query is more specific, so it is being replaced. applications page. set the media queries in the following order: broader breakpoint, narrower breakpoint. 4 Notification bell uses a 30-second-polling mechanism instead of push notifications, causing an apparent delay when the status changes. H1-Visibility of System Status Notification bell (all roles) 2-Minor Use Supabase Realtime subscriptions instead of polling to send notification updates in real-time. During the HE, two of the usability issues found were deemed to have a greater impact on the user's experience than the other issues. These were explored in more depth and similarities and differences in the heuristic that was affected, the problem seen, level of severity, and impact on users were discussed. These two usability issues of greater impact are compared in Table 4.7.

**Table 4.7: Comparison for the Two Higher-Impact Issues**

Issue Before After (Proposed) Help and Documentation (H10, Issue 1) The user inputs words into the chatbot and the stored words in the database are known as the "seeds". If the user inputs words into the chatbot that match any one of the "seeds", a message will be returned to the user. If the user doesn't type any words that Chatbot comes with a lightweight layer of intent matching (or LLM-assisted response generation), which can capture free-form text and paraphrase the seeded answers, match any "seeds", no message will be returned to the user and the user will have to try again. not need an exact keyword match. Visibility of System Status (H1, Issue 4) notifications-bell.js will pull the server every 30 seconds (setInterval(refresh, 30000)); any change in status (Accepted, etc.) will only show up in the notification bell 30 seconds after the change actually occurs. The notification bell is subscribing to a Supabase Realtime channel, which eliminates the polling delay and status changes are pushed to the client and shown in the bell within about 1 second of when they occur. The usability problems identified as part of the heuristic evaluation were also categorised by the Nielsen heuristic; they had the effect of. This will give a summary of which usability principles were related to the issues that were observed and will help to summarise the areas that might need further improvement. Table 4.8 shows the heuristics and the usability issues identified in EasyEarn.

**Table 4.8: Heuristics and Issues Found**

Heuristic Issue(s) Found Notes H1-Visibility of System Status Issue 4 Notification bell status updates do not reflect the real-time status, with a maximum delay of 30 seconds. H2-Match Between System and the Real World None identified The terms and currency are always used in the context of the Malaysian gig economy. H3-User Control and Freedom None identified It is possible for users to edit, delete and reverse all actions as per all three roles. H4-Consistency and Standards Issues 2, 3 Both issues are cosmetic and confined to specific pages/viewports rather than systemic. H5-Error Prevention None identified Duplicate submission and required-field validation were confirmed to be working. H6-Recognition Rather Than Recall None identified Persistent navigation and dashboard summaries require less memory. H7-Flexibility and Efficiency of Use None identified The novice and frequent users are able to use filters, dark mode and saved jobs without issues. H8-Aesthetic and Minimalist Design None identified Shared card layout helps to maintain a clear page layout throughout all roles. H9-Help Users Recognise, Diagnose, and Recover from Errors None identified In all cases tested, there were clear and actionable inline error messages. H10-Help and Documentation Issue 1 The coverage of the chatbot is limited to keywords from the answers in the FAQ; see Section 5.3 and 5.5.

#### 4.3.3.1 Justification for Non-Violations

However, for seven heuristics where no issues were found, the following reasons justify a full grade of â€œMetâ€, and only a shallow pass is considered a lack of a finding. Match Between System and the Real World (H2) was judged fulfilled as all the UI labels, currency values, and status terms were verified against the conventions used in the Malaysian gig economy, such as RM formatting, role names, and job statuses for the three interfaces, with no generic or mistranslated terminology identified. The user is tested for User Control and Freedom by attempting to change the state of each of the available user actions, such as editing, deleting, logging out and unsaving a bookmarked job, and the user does not become trapped in an undesired state of the interface. Filters, dark mode, and the saved-jobs list reduced the number of steps for a returning user to perform the same task, such as finding a saved job, but did not increase the number of steps for a new user, so none of these affected Flexibility and Efficiency of Use (H7). For Aesthetic and Minimalist Design (H8), each dashboard page was reviewed for information that was not pertinen t to the task at hand. The shared card design was determined to only show information relevant to the role, and no other irrelevant information was found. The other four heuristics were less likely to be tricked into a seemingly legitimate way of doing things; for this reason, they are highlighted here. The remaining three heuristics (Error Prevention, Recognition Rather Than Recall, and Help Users Recognise, Diagnose, and Recover from Errors) were considered more directly: the error was elicited, and the system's response was verified to be correct; these are addressed in Table 4.8. Of the four issues found, two are minor, two are cosmetic in nature, and none are severe enough to impede task completion. The Help and Documentation issue (H10, severity 2) is a result of the fact that the chatbot is limited to using a set of FAQs for answers, and not free-form natural language queries, which is a known l imitation of the rule-based implementation and is detailed further as a limitation in Section 5.3, with a suggestion for an upgrade path in Section 5.5. The Notification bell issue (H1, severity 2) is caused by the 30-second polling interval in the notifications-bell.js file, and not by real-time push updates, such that status changes take up to 30 seconds before showing. It is proposed to migrate to Supabase Realtime subscriptions. The two Consistency and Standards issues are cosmetic only: navbar background colour on the Job Seeker and Admin dashboards are not aligned; and a CSS specificity conflict makes the Applications page's stat-card grid render incorrectly below the 700px breakpoint. The results of the heuristic evaluation confirm the results from the UAT (Section 4.3.2) in general. The UATs confirmed that the primary workflows of Job Seeker, Employer and Admin could be completed successfully and the heuristic evaluations determined th at there were a few minor interface issues that did not hinder the completion of the task. The notification delay and the responsive layout issues in particular were deemed to be issues that can be improved upon and not critical functional defects. The two types of testing thus yielded complementary results: UAT indicated that tasks required to be accomplished were completed successfully; heuristic evaluation pointed out usability issues that could be improved. A restriction of this evaluation is that it was conducted by a single evaluator who was also the system developer. So, the above four issues are indicative and not exhaustive. Multiple evaluators can help in heuristic evaluation since different evaluators might point out different kinds of usability problems [55]. The results of this evaluation should thus be viewed in conjunction with the UAT results in section 4.3.2, in which 36 functional test cases were run by five testers for the Job Seeker, Employer and Admin roles.

### 4.3.4 Security Testing

Security Testing was carried out to see how far the security controls put in place in EasyEarn are effective in securing user data, limiting access for unauthorised users and minimising common application-level security threats. The eight types of Security Testing conducted were: RLS-Data Isolation, Auth & Access Control, Upload Security, Input Sanitisation, Rating & Business Rules, Report Security, Analytics & Chatbot and PDPA & Compliance. A total of 29 Security Testing (SEC -001 to SEC -029) test cases were run. The testing was centred on the security measures taken via Supabase RLS, user authentication and access control, file upload validation, input handling, business rules and privacy access related to data. The eight Security Testing categories are summarised in Figure 4.14. The following is a description of one test case for each category; more of these are found in Appendix 5 [78], [96].

![Figure 4.14 image 1](Diagram/figure-15.png)

Figure 4.14: EasyEarn Security Testing Summary

#### 4.3.4.1 Row Level Security (RLS) - Data Isolation

RLS-Data Isolation Testing tests whether Supabase RLS policies are correctly limiting users to data they are allowed to access. These controls are crucial for EasyEarn, as they allow the storage of user-sensitive content like applications, notifications, payments, saved jobs, user profiles and work history in common database tables. The tests then test if unauthorised users can read, update or delete records of other users directly from the database or via normal application functions. A representative RLS-Data Isolation test case is given below; the other test cases and supporting evidence are provided in Appendix 5.1.

SEC-001: Seeker cannot read another seeker's applications

This test ensures that one Job Seeker is not able to access records of another Job Seeker's application. When using the application_select_own policy, the query is limited based on a user identifier of the authenticated user, and the query result excludes unauthorised application records. The test verifies that Seeker B is unable to obtain the application records of Seeker A by using the application query as shown in Figure 4.15.

![Figure 4.15 image 1](Diagram/figure-16.png)

Figure 4.15: RLS - Data Isolation (Seeker Application Read Isolation)

#### 4.3.4.2 Auth & Access Control

Auth & Access Control Testing is used to determine if EasyEarn properly authenticates users and denies access as per their assigned roles and session status. Tests include role-based page access, registration controls, handling of passwords, expired sessions and access to Admin-only functions. These controls are used to ensure that users do not have access to functions or information that is not authorised for their role. One example test case is included below; the other test cases and supporting evidence are included in Appendix 5.2.

SEC-024: Admin page access blocked for non-admin users

This test ensures that users who do not have the Admin role are not able to access pages that are only available for the Admin. It verifies the user's role for the authenticated user before showing administrative content and redirects non-admin sessions from restricted pages. Access controls are also applied at the database level to admin-only data. Figure 4.16 displays a non-admin session being redirected away from an admin page that was accessed directly in the URL.

![Figure 4.16 image 1](Diagram/figure-17.png)

Figure 4.16: Auth & Access Control - Admin Page Access Restriction

#### 4.3.4.3 Upload Security

Upload Security Testing is used to check if files uploaded via EasyEarn are tested by the file-type restriction and/or the file-size restriction that is applied. Testing is directed at user-uploaded files since inappropriate files can pose security threats if uploaded without adequate validation. The following is one representative Upload Security test case. Since this category contains only one test case, it is not repeated in Appendix 5.3.

SEC-016: Profile photo and verification document upload restrictions

This test ensures that EasyEarn adheres to the upload size and file-type limits set for profile images and Employer verification documents. The upload functions have a limit of 2 MB. The test also found that complete Multipurpose Internet Mail Extensions (MIME)-type validation is not currently implemented, and this is noted as an outstanding security risk for future improvement. In Figure 4.17, the image of a person with a large profile picture is not accepted for upload.

![Figure 4.17 image 1](Diagram/figure-18.png)

Figure 4.17: Upload Security - File Type and Size Restrictions

#### 4.3.4.4 Input Sanitisation

Input Sanitisation Testing is a technique that tests EasyEarn's handling of user input and requests to the database to prevent common injection attacks. Tests focus on Cross-Site Scripting (XSS) payload handling and SQL injection resistance, and analyse the display of dynamic content and how database requests are submitted through the Supabase JavaScript client and through PostgREST. The other test case and supporting evidence are given in Appendix 5.4.

SEC-017: Input sanitisation against XSS

This test verifies that script payloads submitted through the tested input fields are not executed when displayed. In the tested scenario, the submitted payload was displayed as non-executable content and did not run as JavaScript. This indicates that the tested input and output handling reduced the risk of XSS for the selected fields, as shown in Figure 4.18.

![Figure 4.18 image 1](Diagram/figure-19.png)

Figure 4.18: Input Sanitisation - XSS Prevention

#### 4.3.4.5 Rating & Business Rules

Rating & Business Rules Security Testing checks whether the restrictions applied to ratings and reviews prevent inappropriate or unauthorised rating activities. The tests cover rating eligibility after completed work and self-rating prevention. These rules are security-relevant because weaknesses could affect the reliability of trust and reputation data within the platform. Below is one representative test case and the rest of the evidence is in Appendix 5.5.

SEC-008: Seeker cannot submit a rating for a pending application

This test confirms that the rating function will not be displayed on the normal UI until an application is in the Completed status. The Rate Employer action will not be displayed when an application is pending. This is not fully implemented at the database level as of yet, and this is noted as a residual security risk in chapter 5.3.1. As shown in Figure 4.19, the button Rate Employer will only appear if the application is completed.

![Figure 4.19 image 1](Diagram/figure-20.png)

Figure 4.19: Rating & Business Rules - Rating Eligibility Guard

#### 4.3.4.6 Report Security

Report Security Testing looks at whether EasyEarn's reporting function prevents the reporting of, or access to, reports by unauthenticated or unauthorised users. The tests check if anonymous users can submit reports, and if users can view report records of other users. These controls are required due to the content of report records that might contain data about users, job postings and moderation tasks. The following is an example of a Report Security test case; the other test case and supporting evidence are given in Appendix 5.6.

SEC-011: Seeker cannot read another user's submitted reports

This test ensures that a Job Seeker is not able to access report records from another user. The reports_select_own policy ensures that only the user who logged in to the system is able to retrieve reports, and specific access is granted for authorised Admin users. The testing confirms that any report record that is not made by the Job Seeker is not returned. In Figure 4.20, only the user's own reports will be returned by the reports query.

![Figure 4.20 image 1](Diagram/figure-21.png)

Figure 4.20: Report Security - Report Read Isolation

#### 4.3.4.7 Analytics & Chatbot

Analytics & Chatbot Security Testing checks if access to any information related to the analytics of the Chatbot and any access to the chats is denied based on the role of the user. These records may include information that is only suitable for a platform-level account and would not be suitable for a Job Seeker or Employer account. The tests thus check whether the non-admin users can retrieve these records using the access-control policies configured in Supabase. The following is one of the Analytics & Chatbot test cases, with the other test case and supporting evidence included in Appendix 5.7.

SEC-025: Admin analytics data is not accessible to non-admin users

This test is to ensure that platform analytics data is only accessible to authorised Admin users. The analytics_admin_select policy is used to limit SELECT operations based on the Admin role. If a non-admin session tries to get analytics information, then no analytics information is returned. In Figure 4.21, a non-admin session is not receiving any analytics data.

![Figure 4.21 image 1](Diagram/figure-22.png)

Figure 4.21: Analytics & Chatbot - Analytics Access Restriction

#### 4.3.4.8 PDPA & Compliance

PDPA & Compliance Security Testing is used to assess certain data-handling and access-control procedures being used by EasyEarn from a privacy and personal-data protection perspective in line with the PDPA 2010. The tests are based on minimisation of data, access to Employer verification docs, limitations on changing status of verification, and the ability to see closed job postings. These tests are designed to evaluate certain technical controls that have been in place on EasyEarn and are not a formal legal compliance audit. Below is one representative PDPA & Compliance test case and Appendix 5.8 contains the remaining test cases and supporting evidence.

SEC-026: Personal data fields are not exposed in public job listing queries

This test confirms that queries for public job listings do not reveal unwanted personal data about the user from user records. The public listing query returns information relating to the job without making any connections with personal user data fields fo r anonymous users. This is in line with the principle of data minimisation, which aims to reduce data returned via publicly accessible job postings. As shown in Figure 4.22, the public job listing query only returns the job-specific fields, but no information about the employer.

![Figure 4.22 image 1](Diagram/figure-23.png)

Figure 4.22: PDPA & Compliance - Job Listing Data Minimisation

In total, 29 cases of Security Testing were run on the security controls deployed throughout EasyEarn's database access, authentication, file upload, input handling, rating, reporting, administrative information and handling of privacy-related data. The results indicated that many unauthorised operations were limited and data pertaining to certain roles were kept secure based on the scenarios tested. There were several remaining security concerns, however, such as partial MIME-type validation and some database-level business-rule validation. These are other risks which are discussed in detail in Chapter 5.3. 1. The full Security Testing cases and evidence that are not included in this section are included in Appendix 5.

### 4.3.5 Compatibility Testing

Compatibility Testing was performed to determine that EasyEarn runs effectively on the various browsers, screen resolutions, devices and interaction contexts. The categories of Compatibility Testing performed were: Browser Compatibility, Responsive Design, Feature Compatibility, Session & Auth, UI & Display and Form & Input. A total of 23 test cases (CT-001 to CT -023) were executed, and all test cases achieved a Pass result. The testing concentrated on browser-dependent functions, responsivity of the layout, platform features, logon behaviour, UI presentation and form controls. Figure 4.23 shows the six Compatibility Testing categories. The following is a single representative test case for each category; the other Compatibility Testing test cases and supporting evidence are contained in Appendix 6.

![Figure 4.23 image 1](Diagram/figure-24.png)

Figure 4.23: EasyEarn Compatibility Testing Summary

#### 4.3.5.1 Browser Compatibility

Browser Compatibility Testing checks the consistency of the primary browser-dependent functions and interface elements on EasyEarn across the browsers in the testing environment. The tests included the following: CSS layout rendering, JavaScript functions, PDF resume generation, and Chart.js analytics rendering, across the tested browsers, including Google Chrome, Mozilla Firefox, Microsoft Edge and Safari. One example Browser Compatibility test case is given below, and the other test cases and supporting evidence are supplied in Appendix 6.1.

CT-001: CSS layout rendering

This test checks if the main EasyEarn layout is correctly displayed in Google Chrome, Mozilla Firefox and Microsoft Edge. CSS Grid and Flexbox elements were also rendered without any broken layouts in the tested browsers, as were Lucide icons and role-specific visual elements. The home page layout looks the same across the browsers used for the tests, with no broken grid or flex elements visible, as in Figure 4.24.

![Figure 4.24 image 1](Diagram/figure-25.png)

Figure 4.24: Browser Compatibility - CSS Layout Rendering

#### 4.3.5.2 Responsive Design

Responsive Design Testing examines if EasyEarn's design, navigation and interactive features respond appropriately across desktop, tablet and mobile screen sizes, retaining usability and readability. These tests include layout breakpoints, mobile touch interaction, mobile content display, form validatio n presentation and mobile filtering functions. The following is one representative Responsive Design test case; the other test cases and supporting evidence are included in Appendix 6.2.

CT-005: Layout breakpoints

This test confirms that the Jobs page layout is correct for the desktop, tablet and mobile breakpoints. Job grid switches to single column layout as needed, with navigation becoming collapsible for mobile view, without horizontal scrolling. The Jobs page layout adapts to the desktop, tablet and mobile breakpoints as illustrated in Figure 4.25.

![Figure 4.25 image 1](Diagram/figure-26.png)

Figure 4.25: Responsive Design - Layout Breakpoints

#### 4.3.5.3 Feature Compatibility

For Feature Compatibility Testing, selected EasyEarn features are tested to see if they work consistently in the supported browsers and screen environments. The tested features include Google Translate Website Redirection, dark mode, the floating chatbot widget, Employer verification file uploads, notification updates and Admin analytics information. Below is one representative Feature Compatibility test case; the other test cases and evidence are found in Appendix 6.3.

CT-010: Google Translate Website Redirection

This test checks if the Google Translate Website Redirection can be turned on from EasyEarn and if the main page's content, navigation and UI remain accessible after translation. The tested translation process was successful for the feature. The EasyEarn website with Google Translate Website Redirection is presented in Figure 4.26.

![Figure 4.26 image 1](Diagram/figure-27.png)

Figure 4.26: Feature Compatibility - Google Translate Website Redirection

#### 4.3.5.4 Session & Auth

Session & Auth Compatibility Testing checks if the authentication-session behaviour is consistent in various browser tabs. Tests are concentrated on "session persistence" and "synchronised logout" to make sure that the authentication changes are taken care of appropriately between tabs, which share the same browser session. The following is one Session & Auth test case, and the other test case and the evidence are presented in Appendix 6.4.

CT-017: Cross-tab logout

This test checks if an authenticated session in a browser tab is also invalidated when logged out from the EasyEarn browser tab. Once the user logs out, the second tab sees the change in authentication state and sends the user back to the login page. After logging out in the first tab, a second tab will redirect to the login page as shown in Figure 4.27.

![Figure 4.27 image 1](Diagram/figure-28.png)

Figure 4.27: Session & Auth - Cross-tab Logout

#### 4.3.5.5 UI & Display

UI & Display Compatibility Testing determines if visual content is legible and accurately displayed in the browser and Operating System (OS) environments tested. The tests check font rendering, long text processing and image-upload previews for problems in compatibility with display. The following test case and supporting evidence represent one representative example of the UI & Display test cases; the other test cases and supporting evidence are contained in Appendix 6.5.

CT-019: Long text overflow handling

This test checks to ensure that the page layout will not be broken by long text content that remains inside the intended interface containers. Job cards and profile-related containers were given wrap and overflow control to be able to read longer content i n a given space. The following Figure 4.28 displays a job description that wraps correctly in the container.

![Figure 4.28 image 1](Diagram/figure-29.png)

Figure 4.28: UI & Display - Long Text Overflow Handling

#### 4.3.5.6 Form & Input

Form & Input Compatibility Testing checks to see if common form controls and input functions function the same way on the browsers of interest. These tests include things like interview date and time selection, file-size and file-type validation, and masking of password fields. The following is one representative Form & Input test case, with the other test cases and evidence included in Appendix 6.6.

CT-021: Interview date/time picker

This test checks if the interview date and time input works in Google Chrome, Mozilla Firefox and Microsoft Edge. The chosen date and time were successfully recorded and fed into the relevant interview scheduling function to be stored in the application re cord. To schedule an interview, use the date and time picker as illustrated in Figure 4.29.

![Figure 4.29 image 1](Diagram/figure-30.png)

Figure 4.29: Form & Input - Interview Date/Time Picker

The overall outcome of all 23 Compatibility Testing test cases was Pass with 6 Testing categories. The findings show that the core EasyEarn functions, responsive layouts, chosen platform features, authentication process, user-interface components and form controls were consistent across the direct test environments. The findings apply to the browser, device and operating-system environments that were directly tested. The remaining Compatibility Testing test cases and supporting evidence are found in Appendix 6.

### 4.3.6 Requirements Traceability and Verification Summary

To demonstrate the traceability between the system requirements defined in Chapter 3 and the evaluation evidence presented in this chapter, the functional and non-functional requirements of EasyEarn were mapped to the corresponding verification evidence. Requirements traceability provides a systematic relationship between software requirements, implementation and verification activities, ensuring that every specified requirement can be verified through appropriate evaluation evidence [21], [96]. The verification matrices depict the relationship between each requirement and the activities undertaken for System Testing, User Acceptance Testing (UAT), Security Testing, Usability Testing and Compatibility Testing. A requirement is reported as Verified only when direct evaluation evidence is available. Requirements that are supported by implementation or deployment evidence, or not formally evaluated in the scope of this Final Year Project, are identified accordingly to avoid overstating the evaluation results. The 18 functional requirements listed in Table 3.8 are summarised in Table 4.9 that maps each requirement to the testing activities and evaluation evidence. The functional requirements of the system are the services and behaviours the system must offer to its users [21]. The verification evidence identifiers refer to the corresponding test cases: ST (System Testing), JS/EMP/ADM (User Acceptance Testing), SEC (Security Testing), CT (Compatibility Testing), and HE (Heuristic Evaluation).

**Table 4.9: Functional Requirements Verification Summary**

Requirement Verification Evidence Status FR01-User Registration & Login JS-001, EMP -001, ADM-001, ST-001, SEC-014 Verified FR02-Role-Based Access Control SEC-013, SEC -024, JS-Verified FR03-Profile Setup JS-011 Verified FR04-Browse & Filter Job Listings JS-003, CT-009 Verified FR05-Apply for Jobs JS-004, ST-001 Verified FR06-Application Status Tracking JS-006, ST-003 Verified FR07-Save Jobs / Wishlist JS-005, ST-012 Verified FR08-Work History Dashboard JS-008, ST-029 Verified FR09-Auto-Generate Resume JS-009, ST-015, CT-003 Verified FR10-Post & Manage Job Listings EMP-003, ST-002 Verified FR11-Review & Manage Applicants EMP-005, ST-003 Verified FR12-Employer Verification Badge EMP-010, ST -009, SEC-Verified FR13-Bidirectional Rating & Review EMP-007, ST -024, SEC-Verified FR14-Report / Flag System ST-028, SEC-010 Verified FR15-User Management ADM-003 Verified FR16-Job Listing Moderation ADM-005, ST-025 Verified FR17-Google Translate Website Redirection CT-010 Verified FR18-Rule-Based Chatbot ST-011, CT-012 Verified All functional requirements were verified through System Testing, User Acceptance Testing (UAT), Security Testing and Compatibility Testing. A total of 34 System Testing test cases, 36 functional UAT test cases, 29 Security Testing test cases and 23 Compatibility Testing test cases provided evidence that the implemented system satisfied the specified functional requirements within the evaluated scope [96]. Table 4.10 shows how the non-functional requirements stipulated in Table 3.9 are mapped to the corresponding verification evidence. Non-functional requirements are the quality attributes and operational constraints that impact on the performance of the system, such as performance, security, usability, compatibility and maintainability [20].

**Table 4.10: Non-Functional Requirements Verification Summary**

Requirement Verification Evidence Status NFR01-Page Load Time ST-013 Verified NFR02-HTTPS Encryption SEC-001, SEC-014 Verified NFR03-RLS SEC-004-SEC-013 Verified NFR04-Session Management SEC-023, CT-016 Verified NFR05-Responsive Design CT-005-CT-009 Verified NFR06-Accessibility HE, UAT Evaluated NFR07-System Availability Deployment Architecture Not Formally Verified NFR08-Concurrent Users ST-014 Partially Verified NFR09-Code Modularity Section 4.2 Source Code Structure Implementation Verified NFR10-PDPA 2010 SEC-026-SEC-029 Verified (Selected Controls) NFR11-Browser Compatibility CT-001-CT-004 Verified NFR12-Deployment Independence Section 4.2.5 Deployment Implementation Verified The verification evidence presented in Tables 4.9 and 4.10 complements the detailed testing results discussed in Sections 4.3.1 to 4.3.5. The majority of non-functional requirements were assessed during formal testing activities and, in particular, through performance testing, security testing, usability testing and compatibility testing. However, NFR07 (System Availability) was not validated through long-term uptime monitoring, while NFR08 (Concurrent Users) was only partially verified through concurrent application testing (ST-014), as formal load or stress testing involving 100 concurren t users was outside the scope of this project. Furthermore, implementation-oriented requirements such as NFR09 (Code Modularity) and NFR12 (Deployment Independence) were supported through implementation and deployment evidence rather than dedicated execution-based test cases, as these characteristics are generally verified through software design and implementation instead of functional testing [20], [21].

## 4.4 Output Analysis

This section examines two representative outputs of EasyEarn: the Admin Analytics Dashboard and the Job Seeker Auto-Generated Resume. The outputs in this section illustrate the conversion of information stored and processed in EasyEarn into information useful to various users. The Admin Analytics Dashboard displays consolidated platform information to help Admins keep track of what's happening on the platform, while the Auto-Generated Resume generates a resume from a Job Seeker's profile and finished work into a downloadable Portable Document Format (PDF) resume. The following subsections describe the purpose, data sources and resulting output of each feature.

### 4.4.1 Admin Analytics Dashboard Output

Admins can use the Admin Analytics Dashboard to get a summary of what has happened on the platform, visualisations and detailed records. The dashboard displays user, jobs, reports and verification information. Selected platform statistics are presented as a visual chart to facilitate Admins in understanding platform activity and detecting changes in the information recorded more easily [51]. The dashboard accesses the tables on Supabase and performs the required operations on the client's side before presenting the calculated summaries and visualisations. Some analytics data is also kept in the analytics table as dated snapshots of the analytics data on the platform, so previous platform statistics can be stored as snapshots. This implementation is based on the static-frontend and BaaS paradigm used by EasyEarn, where the front end renders the retrieved data and performs calculations, while Supabase stores the data. The Dashboard also contains a Data Explorer which provides Admins with access to more detailed data and enables them to select just the information they want to view based on the criteria provided. There is also a Compliance Awareness panel to remind Admins about job information, reports, payment disputes and Employer verification records. These features enable Admins to access general user activity on the platform or individual records associated with admin/moderation activities. The Admin Analytics Dashboard thus turns the platform records in Supabase into an organised overview for administration. The Supabase analytics table containing the stored analytics records and historical snapshots is shown in Figure 4.30.

![Figure 4.30 image 1](Diagram/figure-31.png)

Figure 4.30: Supabase Analytics Table

### 4.4.2 Auto-Generated Resume Output

The Auto-Generated Resume function generates a PDF resume using information stored in the Job Seeker's EasyEarn profile and completed work history. The resume uses information such as the Job Seeker's profile summary, skills, education, availability and completed work history. This enables someone to reuse information that has already been documented in EasyEarn in a structured employment document th at does not require the Job Seeker to re-type the resume material. Firstly, the resume content is created within the browser with the information of the Job Seeker which he/she stored. The HTML2Canvas library is then used to capture the rendered resume, and this is then embedded into an A4-formatted PDF document using the jsPDF library [49], [93]. Therefore, the document produced will include the information that was available in the Job Seeker's profile and completed work record when the resume is generated. The generated resume includes profile information, skills, education, availability, and completed work experience. Completed engagement information can also be used to add supporting employment data like the role, completion dat e and platform rating, if applicable. This enables the Job Seeker to reuse their EasyEarn activity and augment their digital work history that can be used as part of their resume. The Auto-Generated Resume thus fulfils the purpose of the digital work history feature in the Job Seeker's platform provided by EasyEarn by converting the platform data of the Job Seeker to a portable employment document. Figure 4.31 shows an example of the PDF resume generated by EasyEarn.

![Figure 4.31 image 1](Diagram/figure-32.png)

Figure 4.31: Auto-Generated Resume Output (PDF)

## 4.5 Conclusion

This chapter presented the implementation, testing and representative system outputs of the EasyEarn Job Matching Portal. The implementation of the frontend, backend, database, imported packages and system deployment was discussed in section 4.2. EasyEarn is a multi-page web application built with HTML, CSS and JavaScript, with Supabase providing authentication, database services, RLS and selected database-level business logic. The system was deployed using a static-frontend and BaaS approach via GitHub Pages. Five complementary testing techniques were used to assess EasyEarn: System Testing, UAT, Usability Testing, Security Testing and Compatibility Testing, as presented in Section 4.3. System Testing comprised 34 test cases, with each one listed under one of the following categories: E2E Workflow, Integration, Performance, Recovery, Business Logic, Reporting and Compliance. The results of the tests indicated that major system workflows, integrations and system rules were in effect as per the defined test scenarios. UAT involved five testers who used designated user accounts and test data stored in Supabase for the Job Seeker, Employer and Admin roles across 36 functional test cases. The results indicated that the main role-based workflows could be completed successfully within the tested scenarios. Nielsen's 10 Usability Heuristics [55] were used for the Usability Testing. Four usability issues were identified across three heuristics, consisting of two minor issues and two cosmetic issues. These issues mainly concerned notification visibility, interface consistency and the coverage of help provided by the rule-based chatbot. Security Testing consisted of 29 test cases across eight categories. The testing showed that a variety of access-control, authentication, input-handling and privacy-related controls functioned as outlined in the test scenarios. There were several remaining security issues, such as incomplete server-side MIME-type validation and some business rules that are not fully enforced at the database level. There were 23 test cases in six categories-Browser Compatibility, Responsive Design, Feature Compatibility, Session & Auth, UI & Display, and Form & Input. The tested EasyEarn functions and interface components worked as expected in the tested environments, including browser testing conducted using Google Chrome, Mozilla Firefox, Microsoft Edge and Safari. The representative test cases or test evidence from System Testing, UAT, Security Testing and Compatibility Testing are presented in Section 4.3, and the remaining detailed test cases and supporting evidence are provided in Appendices 3 to 6, respectively. In Section 4.4, we introduced two representative system outputs: the Admin Analytics Dashboard and the Auto-Generated Resume. The Admin Analytics Dashboard transforms data on the platform stored in Supabase into summary data and visualisations for admin monitoring, while the Auto-Generated Resume generates a PDF resum e from a Job Seeker's profile and completed work data via html2canvas and jsPDF. The overall implementation and test results show that the key functions and workflows of the EasyEarn system are working as designed across the scenarios tested. Meanwhile, the usability, security and testing issues reported in this chapter indicate that a number of improvements are needed before the widespread production deployment. These results are elaborated upon in Chapter 5 and are related to the four research objectives.
