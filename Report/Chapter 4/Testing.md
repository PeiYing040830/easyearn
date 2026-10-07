## 4.3 Testing

Five complementary testing methods were used: System Testing, UAT, Usability Testing, Security Testing, and Compatibility Testing. The methods are used to assess various quality characteristics of EasyEarn, such as functional correctness, user acceptance, usability, security and cross-environment behaviour. System Testing is the testing that checks the E2E functionality of EasyEarn.

### 4.3.1 System Testing

The latest System Testing workbook records 34 cases. The category totals below are derived from the individual case records, rather than inferred from screenshots.

| Category | Recorded cases | Pass | Other results |
| --- | --- | --- | --- |
| E2E Workflow | 6 | 6 | 0 |
| Integration | 6 | 6 | 0 |
| Performance | 4 | 4 | 0 |
| Recovery | 4 | 4 | 0 |
| Business Logic | 6 | 6 | 0 |
| Reporting | 4 | 4 | 0 |
| Compliance | 4 | 4 | 0 |

System Testing was conducted to evaluate the completed EasyEarn system across seven categories: E2E Workflow, Integration, Performance, Recovery, Business Logic, Reporting and Compliance. 34 System Testing test cases (ST-001-ST-034) were run and all of the test cases passed. The tests focused on the core workflows, front-end-to-Supabase integration, performance, failure handling and business rules, reporting accuracy, and selected compliance system controls. Security Testing and Compatibility Testing were evaluated separately in Sections 4.3.4 and 4.3.5. Figure 4.2 summarises the seven System Testing categories. The following is a representative test case for each category; the other test cases and supporting evidence are given in Appendix 3 [96].

![Report figure](<Diagram/Final_Report_Len_Pei_Ying_QIU-202404-007159.pdf-0272-01.png>)

_Figure 4.2: EasyEarn System Testing Summary_

#### 4.3.1.1 End-to-End Workflow

E2E Workflow Testing tests the ability of a complete user workflow to complete successfully across interconnected sets of system functions [96]. In EasyEarn, the testing covered registration, job applications, applicant management, job completion, payment confirmation and moderation, with additional test cases and evidence provided in Appendix 3.1.

##### ST-003: Hire-to-Completion Flow

**Recorded result: Pass.**

The application successfully progressed through Reviewed, Interview, Accepted, Completion Pending and Completed. The Job Seeker confirmed interview attendance and payment receipt successfully. A 5-star rating and review were submitted for the Employer, and the completed job was added to the Job Seeker's Work History.

**Expected result:** Application status transitions correctly through Pending → Reviewed → Interview → Accepted → Completion Pending → Completed. Interview attendance is recorded successfully. After the Job Seeker confirms payment received, the completed job is added to Work History. The Job Seeker's rating and review are saved and displayed on the Employer's Ratings page.

**Test procedure:**

1. Employer marks the application as Reviewed.
2. Employer schedules an interview date and location.
3. Job Seeker confirms interview attendance.
4. Employer accepts the applicant after the interview.
5. Employer confirms work/payment, moving the application to Completion Pending.
6. Job Seeker confirms payment received, completing the application.
7. Job Seeker submits a star rating and review for the Employer.
8. Verify that the completed job appears in Work History.

**Test input:** Application ID: System-generated
Interview Date/Time: Valid future date/time
Interview Location: W&amp;X Bakery, Ipoh
Rating: 5 stars
Review: Great employer and smooth working experience.

**Recorded comments:** The complete hire-to-completion workflow functioned as expected across the Employer and Job Seeker modules.

Figure 4.3 retains the original screenshot associated with this case. The result and comments above follow the latest testing workbook.

![Report figure](<Diagram/Final_Report_Len_Pei_Ying_QIU-202404-007159.pdf-0273-01.png>)

_Figure 4.3: Hire-to-completion flow_

#### 4.3.1.2 Integration

Integration Testing determines if the system components that are connected communicate and work properly together [96]. EasyEarn testing covered interactions among the JavaScript frontend, Supabase database, triggers, notifications, Employer Verification, asynchronous messaging, chatbot knowledge and saved jobs, with additional evidence provided in Appendix 3.2.

##### ST-007: Application CRUD and openings_count trigger

**Recorded result: Pass.**

The job listing initially showed 1 available opening. After the Job Seeker submitted an application, the available opening decreased from 1 to 0. When the Job Seeker cancelled the application, the available opening returned from 0 to 1. The openings count remained consistent throughout the test and did not become negative.

**Expected result:** The available openings count decreases from 1 to 0 when the Job Seeker submits an application. After the Job Seeker cancels the application, the openings count returns from 0 to 1 and remains consistent without becoming negative.

**Test procedure:**

1. Verify the job listing shows 1 available opening before application.
2. Job Seeker submits an application for the job.
3. Verify the available opening decreases from 1 to 0.
4. Job Seeker cancels/withdraws the application.
5. Verify the available opening increases from 0 back to 1.
6. Verify the openings count remains consistent and does not become negative.

**Test input:** Job ID: System-generated
Initial openings_count: 1
Action: Apply, then Cancel Application

**Recorded comments:** The openings count was correctly synchronized with the Job Seeker application and cancellation actions.

Figure 4.4 retains the original screenshot associated with this case. The result and comments above follow the latest testing workbook.

![Report figure](<Diagram/Final_Report_Len_Pei_Ying_QIU-202404-007159.pdf-0274-01.png>)

_Figure 4.4: Application CRUD and openings_count trigger_

#### 4.3.1.3 Performance

Performance Testing evaluates system response and behaviour during selected time-sensitive or data-processing operations [96]. EasyEarn testing covered job-page loading and filtering, concurrent applications, PDF resume generation and Admin Analytics rendering, with additional evidence provided in Appendix 3.3.

##### ST-014: Concurrent Application Race Condition

**Recorded result: Pass.**

During the near-simultaneous application test for a job with one remaining opening, one Job Seeker was able to submit the application successfully. For the second Job Seeker, the Apply button changed to Full, preventing another application from being submitted after the final opening had been taken. No overbooking occurred.

**Expected result:** Database-level trigger serialises the openings deduction so exactly one application succeeds when only one opening exists; no negative counts.

**Test procedure:**

1. Seeker A and Seeker B both load the same job listing.
2. Both submit an application within the same second.
3. Verify only one application succeeds in consuming the opening.
4. Verify the second receives the 'No openings available' error.
5. Confirm openings_count never goes below zero.

**Test input:** 2 concurrent INSERT requests on applications, same job_id

**Recorded comments:** The system prevented a second application after the final available opening was taken.

Figure 4.5 retains the original screenshot associated with this case. The result and comments above follow the latest testing workbook.

![Report figure](<Diagram/Final_Report_Len_Pei_Ying_QIU-202404-007159.pdf-0275-01.png>)

_Figure 4.5: Concurrent Application Race Condition_

#### 4.3.1.4 Recovery

Recovery Testing checks the response of the system to failure and disruption without compromising stability and consistency of the data state [96]. The connectivity loss, sessionrelated interruptions and failed transactions were covered in EasyEarn testing, and further test cases and evidence were supplied in Appendix 3.4.

##### ST-019: Failed Application Submission Rollback

**Recorded result: Pass.**

A direct database insert was attempted for a job with openings_count = 0. The database trigger rejected the insert with the error "No openings available for this job listing." A verification query confirmed that no application record was created for the tested Job Seeker and job combination, and the job's openings_count remained unchanged at 0.

**Expected result:** The exception raised inside the trigger rolls back the entire INSERT transaction, leaving both applications and job_listings tables in a consistent, unchanged state.

**Test procedure:**

1. Seeker attempts to apply to a job with 0 remaining openings.
2. Verify the INSERT is rejected by the database trigger.
3. Verify no partial/orphaned application row is created.
4. Verify the seeker sees a clear 'no openings available' message.
5. Confirm the job_listings.openings_count value is unchanged.

**Test input:** Job ID with openings_count = 0

**Recorded comments:** The failed application was fully rolled back, leaving no partial record and keeping openings_count unchanged.

Figure 4.6 retains the original screenshot associated with this case. The result and comments above follow the latest testing workbook.

![Report figure](<Diagram/Final_Report_Len_Pei_Ying_QIU-202404-007159.pdf-0276-01.png>)

_Figure 4.6: Failed Application Submission Rollback_

#### 4.3.1.5 Business Logic

Business Logic Testing is used to determine if the rules that govern the behavior of a system are functioning as expected. For location bonuses, application-status transitions, and rating eligibility, EasyEarn testing was conducted on these features and the behaviour of the Employer Verification Badge during moderation was provided in Appendix 3.5.

##### ST-023: Application Status Transition Constraints

**Recorded result: Pass.**

The forward application workflow had already been completed successfully during ST-003. During this test, a Reviewed application could not be moved backward to an earlier status. For a Completed application, the Employer view no longer provided any status-transition control; only non-status actions such as Message, Paid and Rated remained. Therefore, the completed application could not be reversed through the Employer UI.

**Expected result:** The Employer UI allows the intended forward workflow while preventing reverse status changes. A Completed application cannot be changed back to an earlier application status through the UI.

**Test procedure:**

1. Employer moves an application forward through the permitted status workflow.
2. Verify a Reviewed application cannot be moved backward to an earlier status through the Employer UI.
3. Open a Completed application and check available status controls.
4. Verify no status control allows a Completed application to be reversed to Pending/Reviewed/Accepted.

**Test input:** Observed workflow: forward status changes through Employer UI; Reviewed cannot be reversed; Completed application

**Recorded comments:** The Employer UI enforced forward-only status progression and prevented completed applications from being reversed.

Figure 4.7 retains the original screenshot associated with this case. The result and comments above follow the latest testing workbook.

![Report figure](<Diagram/Final_Report_Len_Pei_Ying_QIU-202404-007159.pdf-0277-01.png>)

_Figure 4.7: Application Status Transition Constraints_

#### 4.3.1.6 Reporting

Reporting Testing determines if system-generated values and summaries match the data stored in the system [96]. EasyEarn testing covered Admin Analytics, job-listing reports, Job Seeker work history and earnings, and Employer job-performance information, with additional evidence provided in Appendix 3.6.

##### ST-027: Admin Analytics Dashboard Accuracy

**Recorded result: Pass.**

The Admin Analytics page displayed User Growth = 8, Job Volume = 5 and Report Load = 2. Supabase verification queries returned 8 active users, 5 active job listings, 2 report records and 1 approved employer verification. The chart displayed 50% User Growth, 31% Job Volume, 13% Report Load and 6% Verification Load, which matched the rounded proportions of the underlying values 8:5:2:1.

**Expected result:** The Analytics summary metrics must match the corresponding database counts. The distribution chart must reflect the same underlying values for users, jobs, reports and approved verifications.

**Test procedure:**

1. Log in as Admin and open the Analytics page.
2. Compare User Growth with the count of active user records in public.users.
3. Compare Job Volume with the count of active job listings in public.job_listings.
4. Compare Report Load with the count of report records in public.reports.
5. Compare Verification Load chart share with the number of approved employer verifications and verify the displayed chart proportions.

**Test input:** Observed dashboard: 8 users, 5 jobs, 2 reports; approved employer verifications: 1

**Recorded comments:** The analytics summary values and chart proportions matched the verified database counts.

Figure 4.8 retains the original screenshot associated with this case. The result and comments above follow the latest testing workbook.

![Report figure](<Diagram/Final_Report_Len_Pei_Ying_QIU-202404-007159.pdf-0278-01.png>)

_Figure 4.8: Admin Analytics Dashboard Accuracy_

#### 4.3.1.7 Compliance

Compliance-related System Testing consisted of the evaluation of selected EasyEarn controls related to privacy, transparency and user-protection aspects, such as privacy information access, handling of Employer verification documents, audit records, and compliance reminders [17], [76], [96]. These tests were for selected controls already implemented and were not legal or regulatory certification. Additional test cases and evidence are provided in Appendix 3.7.

##### ST-032: PDPA-Aligned Document Handling

**Recorded result: Pass.**

Employer verification documents were stored in each employer's own users record. W&amp;X Bakery and SugarShine each had their own registration and contact documents, while CarePlus had none submitted. A Job Seeker attempting to access the Employer verification area was redirected back to the Job Seeker section and could not view employer verification documents. Admin could access the Verifications area and review the submitted employer documents.

**Expected result:** Verification document data is stored in the relevant employer's users record; Job Seekers cannot access the Employer verification area, while Admin can review submitted verification documents.

**Test procedure:**

1. Submit employer verification with registration and contact documents.
2. Verify documents are stored only in fields scoped to that employer's row (registration_doc_data, contact_doc_data).
3. Verify a seeker or another employer account cannot query another employer's verification documents.
4. Verify admin-only access is required to view submitted documents during review.

**Test input:** Employer verification data stored in public.users; W&amp;X Bakery and SugarShine contain both registration and contact documents.

**Recorded comments:** Verification document access was restricted by role and record ownership in the tested scenarios.

Figure 4.9 retains the original screenshot associated with this case. The result and comments above follow the latest testing workbook.

![Report figure](<Diagram/Final_Report_Len_Pei_Ying_QIU-202404-007159.pdf-0279-01.png>)

_Figure 4.9: PDPA-aligned Document Handling_

Overall, all 34 System Testing test cases across the seven categories of E2E Workflow, Integration, Performance, Recovery, Business Logic, Reporting and Compliance achieved a Pass result. The tested EasyEarn workflows, system integrations, operations related to performance, recovery behaviour, business rules, reporting functions and selected compliancerelated controls functioned as designed in the scenarios evaluated. The remaining System Testing test cases and supporting evidence are provided in Appendix 3.

### 4.3.2 User Acceptance Testing (UAT)

User Acceptance Testing assessed whether five participants could complete the principal Job Seeker, Employer and Admin workflows. Each completed five tasks per role, giving 15 functional tasks per participant and 75 task executions overall. All 75 executions are marked Pass in the supplied forms. These are 15 distinct task definitions repeated by five participants, not 75 distinct test cases.

The forms record sessions between 5 and 15 September 2026. Table 4.5a identifies the participants, recorded devices and outcomes. All five selected Accept for Overall Acceptance. Their Additional Comments / Suggestions fields contain a dash; no substantive free-text suggestion is recorded there.

_Table 4.5a: UAT Participant and Execution Summary_

| Tester | Date recorded | Device recorded | Job Seeker | Employer | Admin | Overall acceptance |
| --- | --- | --- | --- | --- | --- | --- |
| Ang Mun Hin | 08/09/2026 | MSI Raider GE78 HX 14V, Intel Core i9, Windows 11 | 5/5 Pass | 5/5 Pass | 5/5 Pass | Accept |
| Chan Jade Qi | 05/09/2026 | Pavilion Plus 14, Tranquil Pink, Windows 11 | 5/5 Pass | 5/5 Pass | 5/5 Pass | Accept |
| Lee Jian Hou | 10/09/2026 | HONOR Pad 9, Android, Chrome | 5/5 Pass | 5/5 Pass | 5/5 Pass | Accept |
| Seah Pei Yan | 10/09/2026 | iPhone 15 Pro Max, Safari | 5/5 Pass | 5/5 Pass | 5/5 Pass | Accept |
| Wong Ke Ni | 15/09/2026 | HONOR X9b, Android, Chrome | 5/5 Pass | 5/5 Pass | 5/5 Pass | Accept |

The two Windows forms identify the laptop and operating system but do not identify a browser. The iPhone form explicitly records Safari; the HONOR Pad 9 and HONOR X9b forms explicitly record Android and Chrome. These UAT environments provide participant-level workflow evidence and do not replace the separate Compatibility Testing suite.

Figure 4.10 is the original UAT summary illustration. The current task totals are calculated from the forms reproduced in Appendix 4.

![Report figure](<Diagram/Final_Report_Len_Pei_Ying_QIU-202404-007159.pdf-0280-01.png>)

_Figure 4.10: Summary of User Acceptance Testing Results_

#### 4.3.2.1 Job Seeker UAT

All five participants completed the five Job Seeker tasks, producing 25 Pass records. The task labels below follow the current UAT forms.

| Task | Recorded outcome |
| --- | --- |
| Register and Login | 5 Pass / 0 Fail |
| Job Search &amp; Browse | 5 Pass / 0 Fail |
| Job Application | 5 Pass / 0 Fail |
| Work History &amp; Rate Employer | 5 Pass / 0 Fail |
| Resume Management | 5 Pass / 0 Fail |

Figure 4.11 retains the original representative illustration. Appendix 4 contains the complete current forms, including steps, remarks and participant details.

![Report figure](<Diagram/Final_Report_Len_Pei_Ying_QIU-202404-007159.pdf-0281-01.png>)

_Figure 4.11: Representative Job Seeker UAT Results_

#### 4.3.2.2 Employer UAT

All five participants completed the five Employer tasks, producing 25 Pass records. The task labels below follow the current UAT forms.

| Task | Recorded outcome |
| --- | --- |
| Post Job | 5 Pass / 0 Fail |
| View Applicants | 5 Pass / 0 Fail |
| Accept / Reject Applicant | 5 Pass / 0 Fail |
| Employer Verification | 5 Pass / 0 Fail |
| Job Completion &amp; Rate Job Seeker | 5 Pass / 0 Fail |

Figure 4.12 retains the original representative illustration. Appendix 4 contains the complete current forms, including steps, remarks and participant details.

![Report figure](<Diagram/Final_Report_Len_Pei_Ying_QIU-202404-007159.pdf-0282-01.png>)

_Figure 4.12: Representative Employer UAT Results_

#### 4.3.2.3 Admin UAT

All five participants completed the five Admin tasks, producing 25 Pass records. The task labels below follow the current UAT forms.

| Task | Recorded outcome |
| --- | --- |
| Lock / Unlock Employer | 5 Pass / 0 Fail |
| Approve Job | 5 Pass / 0 Fail |
| Flag / Remove Job | 5 Pass / 0 Fail |
| Employer Verification Review | 5 Pass / 0 Fail |
| Reports | 5 Pass / 0 Fail |

Figure 4.13 retains the original representative illustration. Appendix 4 contains the complete current forms, including steps, remarks and participant details.

![Report figure](<Diagram/Final_Report_Len_Pei_Ying_QIU-202404-007159.pdf-0283-01.png>)

_Figure 4.13: Representative Admin UAT Results_

The UAT results support successful completion of the selected workflows using the recorded accounts, tasks and devices. The five-person sample does not establish population-wide acceptance, independent security assurance or performance under concurrent load.

### 4.3.3 Usability Testing

Usability was evaluated through Section D of the five UAT forms and the previously documented heuristic evaluation. Section D contains ten statements rated from 1 (Strongly Disagree) to 5 (Strongly Agree). The questionnaire measures the participants’ recorded perceptions after completing the functional tasks; it is not a formal TAM validation or an accessibility conformance assessment.

The forms contain 50 ratings: 42 Strongly Agree responses and 8 Agree responses, with no scores of 1, 2 or 3. The weighted mean is (42 × 5 + 8 × 4) / 50 = 4.84/5. All five participants selected Accept for Overall Acceptance.

_Table 4.5: End-user Usability Questionnaire Results_

| No. | Evaluation item | Agree (4) | Strongly Agree (5) | Mean score |
| --- | --- | --- | --- | --- |
| 1 | The navigation menu makes it easy to find the functions I need. | 0 | 5 | 5.00 |
| 2 | Job information, buttons and instructions are clear and easy to understand. | 0 | 5 | 5.00 |
| 3 | Job search, filters and Near Me are easy to use. | 0 | 5 | 5.00 |
| 4 | Application status and next actions are clearly displayed. | 0 | 5 | 5.00 |
| 5 | Forms and system messages help me complete tasks and correct mistakes. | 2 | 3 | 4.60 |
| 6 | The layout, buttons and design are consistent throughout EasyEarn. | 0 | 5 | 5.00 |
| 7 | Employer verification requirements are clear and understandable. | 3 | 2 | 4.40 |
| 8 | The chatbot and available guidance are helpful when I need assistance. | 3 | 2 | 4.40 |
| 9 | The translation feature is easy to access and use. | 0 | 5 | 5.00 |
| 10 | Overall, I can complete the main EasyEarn tasks easily and efficiently. | 0 | 5 | 5.00 |
| Overall | 50 ratings | 8 | 42 | 4.84 |

_Table 4.5b: Usability Scores by Participant_

| Participant | Ratings | Score total / 50 | Mean / 5 |
| --- | --- | --- | --- |
| Ang Mun Hin | 10 | 47 | 4.70 |
| Chan Jade Qi | 10 | 50 | 5.00 |
| Lee Jian Hou | 10 | 47 | 4.70 |
| Seah Pei Yan | 10 | 48 | 4.80 |
| Wong Ke Ni | 10 | 50 | 5.00 |

Seven items received a mean score of 5.00. Forms and system messages scored 4.60; employer-verification clarity and chatbot guidance each scored 4.40. These relatively lower scores identify possible improvement areas, even though all recorded responses were positive. The questionnaire contains only five respondents, and the high scores should be interpreted within that sample.

The author’s separate heuristic evaluation identified four issues across Visibility of System Status, Consistency and Standards, and Help and Documentation. Its existing observations and severity classifications are retained in Tables 4.6–4.8 because the supplied files contain no replacement heuristic assessment. Passing functional or compatibility tests does not by itself demonstrate that every heuristic issue has been resolved.

_Table 4.6: Heuristic Evaluation Issues and Proposed Solutions_

|**No.**|<br>**Issue**|**Heuristic**<br>**Violated**|**Location**|**Severity**|**Proposed Solution**|
|---|---|---|---|---|---|
|**1**|The chatbot can only<br>handle a set of pre-|H10 - Help<br>and|Floating<br>chatbot|2 -<br>Minor|Implement<br>a<br>lightweight<br>intent-|
||defined<br>FAQ|Documentat|widget (all||matching service or|
||keywords, and free-|ion|dashboard||Large<br>Language|
||form<br>natural||pages)||Model (LLM)-as-a-|
||language<br>questions||||service tool to be|
||are not supported.||||used alongside the|
||||||existing<br>FAQ<br>knowledge base for<br>handling<br>free-form<br>questions.|
|**2**|The<br>navbar|H4 -|Job Seeker|1 -|Match the colour of|
||background colour is|Consistency|and Admin|Cosmetic|the<br>navbar|
||inconsistent with the|and|dashboard||background to the|
||page background on|Standards|navbars||page-level<br>colour|
||some<br>role<br>dashboards.||||token<br>or<br>CSS<br>variable.|
|**3**|Below 700px, the|H4 -|Job Seeker|1 -|Make<br>the<br>700px|
||Applications<br>page|Consistency|Applications|Cosmetic|media query more|
||stat-card grid does|and|page||specific, or order the|
||not appear as desired|Standards|||media<br>queries<br>to|
||due<br>to<br>a<br>CSS||||make the narrower|
||specificity issue.||||one<br>the<br>most<br>specific.|
|**4**|The notification bell|H1 -|Notification|2 -|Use<br>Supabase|
||is polling for 30|Visibility of|bell across|Minor|Realtime|
||seconds instead of|System|all roles||subscriptions instead|
||push-based|Status|||of periodic polling to|
||notification updates,||||ensure<br>that|

|which may cause the|notifications are sent|
|---|---|
|status change to be|to the client more|
|delayed.|quickly.|

The heuristic findings were evaluated in conjunction with the lower end-user ratings of Employer verification clarity and chatbot guidance. The result of the chatbot was similar to that of H10, and there was no distinct heuristic violation found for Employer verification clarity.

Among the four usability issues identified in Table 4.6, two were rated as minor and were considered to have a greater effect on UX than the two cosmetic issues. These were limited help and documentation support (H10) and delayed notification updates (H1). Table 4.7 compares the current implementation of these two issues with their proposed improvements.

_Table 4.7: Comparison for the Two Higher-Impact Issues_

|**Issue**|**Current Implementation**|**Proposed**|**Improve**|**ment**|
|---|---|---|---|---|
|**Help and**|The chatbot answers primarily based|Integrate|<br>light|<br>intent|
|**Documentation**|on set FAQ keywords. If a question is|matching|/LLM|response|
|**(H10)**|not similar to the stored keywords, it|handling|for free-for|m inputs and|
||may not get the desired answer.|preserve|the FAQ|knowledge|
|||base.|||
|**Visibility of**|The notification bell refreshes every|Use<br>|Supabase|Realtime|
|**System Status**|30 seconds, which can make it take a|subscripti|ons to push|notification|
|**(H1)**|bit longer for it to display the latest|updates|to the c|lient more|
||status changes.|promptly|.||

Table 4.7 presents the comparison between two higher-impact usability issues found in the heuristic evaluation: limited chatbot support under Help and Documentation (H10) and delayed notification updates under Visibility of System Status (H1). Both issues were rated as minor because they could affect the UX but did not prevent users from completing the main system tasks. All other usability problems were cosmetic and mainly were related to consistency and responsiveness of layout. To provide an overall summary of the heuristic evaluation, Table 4.8 maps all ten Nielsen heuristics to the issues identified in EasyEarn.

To provide an overall summary of the heuristic evaluation, Table 4.8 maps all ten Nielsen usability heuristics to the issues identified in EasyEarn. The table shows which heuristics were associated with usability issues and which were found to have no specific issue during the evaluation. This provides a consolidated view of the usability strengths and areas for improvement across the Job Seeker, Employer and Admin interfaces.

_Table 4.8: Heuristics and Issues Found_

|**Heuristic**|**Issue(s) Found**|**Notes**|
|---|---|---|
|H1 - Visibility of|Issue 4|Notification updates can take up to 30 seconds|
|System Status||since the notification bell operates on periodic<br>polling instead of push updates.|
|H2 - Match Between|None identified|Job categories, RM currency formatting, role|
|System and the Real||names and application status terms match the|
|World||setting of the gig work in Malaysia.|
|H3 - User Control and|None identified|Actions supported can be edited and deleted or|
|Freedom||reversed, as applicable to the user's role and the<br>state of the workflow.|
|H4 - Consistency and|Issues 2 and 3|There were two cosmetic consistency problems:|
|Standards||navbar background inconsistencies and a<br>responsive stat-card layout problem below the<br>700px breakpoint.|

|H5 - Error Prevention|None identified|Validation and duplicate-submission prevention|
|---|---|---|
|||for required field data was verified to be<br>working for the scenarios tested.|
|H6 - Recognition<br>Rather Than Recall|None identified|Persistent navigation, role-specific menus and<br>dashboard summaries minimize navigation path<br>and system state memory.|
|H7 - Flexibility and|None identified|Filters, dark mode and saved jobs offer shortcuts|
|Efficiency of Use||and repeated-use support, but don't stop novice<br>users from enjoying the same capabilities.|
|H8 - Aesthetic and|None identified|Common card layouts and specific content for|
|Minimalist Design||roles keep the interface system coherent and<br>form task-oriented groups.|
|H9 - Help Users|None identified|Clear and actionable error messages were|
|Recognise, Diagnose,<br>and Recover from<br>Errors||displayed for the tested invalid inputs and failed<br>actions.|
|H10 - Help and|Issue 1|The chatbot offers answers based on FAQs but|
|Documentation||can only match keywords and cannot handle<br>free-form natural language questions.|

Overall, usability issues were identified under three of the ten heuristics: Visibility of System Status (H1), Consistency and Standards (H4), and Help and Documentation (H10). The remaining seven heuristics did not show a specific usability issue during the evaluation. Identified issues were minimal in that they were cosmetic issues and did not hinder completion of the main EasyEarn tasks.

#### 4.3.3.1 Justification for Non-Violations

For the seven heuristics where no specific usability issue was identified, the “Met” assessment was based on direct review of the deployed EasyEarn interfaces and the tested system behaviour. Match Between System and the Real World (H2) was judged as met because job categories, the format of RM currency, user-role terminology and application-status labels were presented consistently in the context of gig-work in Malaysia. User Control and Freedom (H3) was found to be met as users were able to edit, delete, logout and remove saved jobs where permitted, based on their role and workflow state.

Required field Validation and Duplicate submission controls were tested and found to be functioning as expected, and Error Prevention H5 was therefore judged met. Recognition Rather Than Recall (H6) was supported by sustained navigation and role-specific menus and dashboard summaries, decreasing the need for users to remember paths or states in the system. Flexibility and Efficiency of Use (H7) was supported by functions such as filters, dark mode and saved jobs, which provided convenient access without preventing new users from completing the same tasks. Aesthetic and Minimalist Design (H8) was classified as met, as the common card designs and the content relevant to the task remained clearly visible and the function was kept in focus. Help Users Recognise, Diagnose, and Recover from Errors (H9) was also rated as met, as clear error messages in the form of actionable instructions were displayed for the tested incorrect inputs or failed actions.

Overall, four usability issues were identified across three heuristics: Visibility of System Status (H1), Consistency and Standards (H4), and Help and Documentation (H10). Two issues were rated as minor and two as cosmetic, with none preventing completion of the main EasyEarn tasks. The results were generally similar to the end-user usability questionnaire that gave a mean score of 4.84 out of 5.00 on 50 usability ratings.

A limitation of the heuristic evaluation is that it was conducted by a single evaluator who was also the system developer. Therefore, the identified issues may not represent all possible usability problems. The heuristic findings should be considered in conjunction with the UAT results that included 50 usability ratings and 75 functional task executions by 5 testers in the Job Seeker, Employer and Admin roles.

### 4.3.4 Security Testing

The latest Security Testing workbook records 30 cases. The category totals below are derived from the individual case records, rather than inferred from screenshots.

| Category | Recorded cases | Pass | Other results |
| --- | --- | --- | --- |
| RLS - Data Isolation | 11 | 11 | 0 |
| Auth &amp; Access Control | 5 | 5 | 0 |
| Upload Security | 1 | 1 | 0 |
| Input Sanitisation | 2 | 2 | 0 |
| Rating &amp; Business Rules | 2 | 2 | 0 |
| Report Security | 2 | 2 | 0 |
| Analytics &amp; Chatbot | 2 | 2 | 0 |
| PDPA &amp; Compliance | 4 | 4 | 0 |
| Employer Verification | 1 | 1 | 0 |

Security Testing was conducted to evaluate the security controls implemented in EasyEarn for protecting user data, restricting unauthorised access and reducing common application-level security risks [78], [96]. The testing was organised into nine categories: RLS - Data Isolation, Auth & Access Control, Upload Security, Input Sanitisation, Rating & Business Rules, Report Security, Analytics & Chatbot, PDPA & Compliance, and Employer Verification & Visibility. A total of 30 Security Testing test cases (SEC-001 to SEC-030) were executed, and all 30 test cases achieved a Pass result in the final testing round. The testing centred on Supabase RLS, authentication and RBAC, file-upload restrictions, handling of input, rating and reporting restrictions, access to administrative data, privacy-related restrictions, and Employer verification-based job visibility. Figure 4.14 summarises the nine Security Testing categories. In this section, one representative test case from each category is presented, with the other test cases and supporting evidence given in Appendix 5.

![Report figure](<Diagram/Final_Report_Len_Pei_Ying_QIU-202404-007159.pdf-0291-04.png>)

_Figure 4.14: EasyEarn Security Testing Summary_

#### 4.3.4.1 Row Level Security (RLS) - Data Isolation

RLS - Data Isolation Testing evaluated whether Supabase RLS controls restrict users to records they are authorised to access. EasyEarn testing covered applications, notifications, job listings, user profiles, work history and other user-related records, with additional test cases and evidence provided in Appendix 5.1.

##### SEC-001: Seeker Cannot Read Another Seeker's Applications

**Recorded result: Pass.**

While authenticated as ABCD, fetchApplications(ABCD_ID) returned exactly 1 application (id 888c03d0-98d9-4e89-bce4-5e0f4ef799c1, seeker_id = ABCD). Using the same authenticated session, fetchApplications(LEN_ID) returned an empty array []. Len Pei Ying's 4 application records were not exposed to ABCD.

**Expected result:** ABCD's own application is returned, while a query for Len Pei Ying's applications returns no rows. RLS must prevent cross-seeker application disclosure even when another seeker's ID is supplied by the client.

**Test procedure:**

1. Log in as Job Seeker ABCD.
2. Import the EasyEarn data module and call fetchApplications() using ABCD's own seeker ID.
3. In the same authenticated ABCD session, call fetchApplications() using Len Pei Ying's seeker ID.
4. Compare the returned arrays.

**Test input:** Authenticated user: ABCD (d1ff41b4-fb7d-4398-a270-c405c83fc795)
Other seeker: Len Pei Ying (31c79f9e-2dee-44f9-80d7-2a70725dbb52)

**Recorded comments:** Runtime RLS isolation was confirmed using ABCD's authenticated Supabase session: own row visible, another seeker's rows filtered out.

Figure 4.15 retains the original screenshot associated with this case. The result and comments above follow the latest testing workbook.

![Report figure](<Diagram/Final_Report_Len_Pei_Ying_QIU-202404-007159.pdf-0292-05.png>)

_Figure 4.15: RLS - Data Isolation (Seeker Application Read Isolation)_

#### 4.3.4.2 Auth & Access Control

Auth & Access Control Testing evaluated whether authentication, session and role-based restrictions prevent users from accessing functions or data outside their authorised role. The testing included registration controls, cross-role access, session handling, Admin-only functions, as well as some additional evidence in Appendix 5.2.

##### SEC-024: Admin Page Access Blocked for Non-Admin Users

**Recorded result: Pass.**

While authenticated as Job Seeker ABCD, direct navigation to the Admin Users page was blocked. The system redirected the non-admin session back to the Job Seeker Dashboard, and admin content was not displayed.

**Expected result:** Non-admin users are redirected away from admin pages; admin content is not rendered.

**Test procedure:**

1. Log in as Seeker.
2. Navigate directly to pages/admin/users.html.
3. Observe behaviour.

**Test input:** Auth: Seeker session
Files: admin-header.js, auth.js (requireAdmin)

**Recorded comments:** Non-admin direct URL access was correctly prevented by the admin access guard.

Figure 4.16 retains the original screenshot associated with this case. The result and comments above follow the latest testing workbook.

![Report figure](<Diagram/Final_Report_Len_Pei_Ying_QIU-202404-007159.pdf-0293-03.png>)

_Figure 4.16: Auth & Access Control - Admin Page Access Restriction_

#### 4.3.4.3 Upload Security

Upload Security Testing was used to assess the file-type and file-size limits for profile images and Employer verification documents. This category contains one test case, SEC-016, which is presented below.

##### SEC-016: Profile Photo and Verification Document Upload Restrictions

**Recorded result: Pass.**

Profile photo upload with an 11.46 MB PNG was rejected with 'Profile photo must be 2MB or smaller.' A plain-text file renamed with a .jpg extension was not saved and produced 'Unable to process the selected image.' An oversized Employer Verification document was rejected with 'Each file must be 2MB or smaller.' These tests confirm enforcement of file size limits and rejection of a non-image file disguised with an image extension.

**Expected result:** Files larger than 2MB rejected; non-image MIME types rejected even if extension is spoofed.

**Test procedure:**

1. Attempt to upload a 3MB image as profile photo.
2. Attempt to upload .exe renamed to .jpg.
3. Attempt oversized SSM document on verification form.
4. Verify rejected uploads show error and are not sent to storage.

**Test input:** File 1: 3MB .png
File 2: malware.exe renamed .jpg
Files: jobseeker-profile.js, employer-profile.js, employer-verification.js

**Recorded comments:** Upload controls correctly blocked oversized files and a spoofed non-image file. The tested invalid files were not accepted for storage.

Figure 4.17 retains the original screenshot associated with this case. The result and comments above follow the latest testing workbook.

![Report figure](<Diagram/Final_Report_Len_Pei_Ying_QIU-202404-007159.pdf-0294-01.png>)

_Figure 4.17: Upload Security - File Type and Size Restrictions_

#### 4.3.4.4 Input Sanitisation

Input Sanitisation Testing evaluated how EasyEarn handles potentially malicious user input, including Cross-Site Scripting (XSS) and SQL injection-related input. One representative test case is presented below, while the additional test case and evidence are provided in Appendix 5.4.

##### SEC-017: Input Sanitisation Against XSS

**Recorded result: Pass.**

XSS testing was completed across job descriptions, rating reviews, and chat messages using payloads such as &lt;script&gt;alert(1)&lt;/script&gt; and &lt;img src=x onerror=alert(1)&gt;. In the verified-employer W&amp;X Bakery retest, the job description payload was rendered as escaped text on the Job Seeker page and no alert executed. The same image/onerror payload was submitted in an employer rating review and in chat messages; no JavaScript alert executed on either side of the conversation. Normal functions such as viewing the job and applying remained available.

**Expected result:** Script/HTML payloads are rendered as harmless text, not executed, anywhere displayed back to other users.

**Test procedure:**

1. Post a job listing with &lt;script&gt;alert(1)&lt;/script&gt; in description.
2. View the listing on the public Jobs page.
3. Submit a rating review with &lt;img onerror=alert(1)&gt; payload.
4. View the review on Employer Ratings page.

**Test input:** Payload: &lt;script&gt;alert(1)&lt;/script&gt; and &lt;img src=x onerror=alert(1)&gt;
Files: employer-post-job.js, employer-ratings.js, messages-page.js

**Recorded comments:** Retest passed. User-controlled HTML/JavaScript payloads did not execute in the tested job description, rating review, or chat display paths. Job description content was shown as escaped text.

Figure 4.18 retains the original screenshot associated with this case. The result and comments above follow the latest testing workbook.

![Report figure](<Diagram/Final_Report_Len_Pei_Ying_QIU-202404-007159.pdf-0295-01.png>)

_Figure 4.18: Input Sanitisation - XSS Prevention_

#### 4.3.4.5 Rating & Business Rules

Rating & Business Rules Security Testing evaluated whether rating-related restrictions prevent invalid or unauthorised rating activities. The testing covered rating eligibility and self-rating prevention, with additional evidence provided in Appendix 5.5.

##### SEC-008: Seeker Cannot Submit a Rating for a Pending Application

**Recorded result: Pass.**

Initial test failed because Job Seeker ABCD could force a rating insert for a pending application and the rating was visible on the Employer Ratings page. After the database security fix, the same pending-application rating attempt was rejected with HTTP 403 and no new rating row was created; the Employer Ratings page no longer showed the pending test rating. Regression verification confirmed legitimate completed-application ratings remained available: Tsuki's completed applications 112ba3b2-819e-4009-a948-525e136ebba1 and 32ea3d8c-152d-4e74-897d-a5a5e1f32030 retained valid rating rows, including seeker-to-employer and employer-to-seeker ratings. Retest passed.

**Expected result:** Rating UI is not surfaced for pending applications; if forced via API, the insert succeeds at DB level but is never shown to the employer.

**Test procedure:**

1. Log in as S.
2. Attempt to call upsertRating() for the pending application.
3. Check UI and DB.

**Test input:** Auth: S
Application status: pending
Files: supabase-data.js (upsertRating), jobseeker-work-history.js

**Recorded comments:** Retest passed after database-level rating validation was added. Pending applications are now blocked from rating creation/visibility, while valid completed-application ratings continue to work.

Figure 4.19 retains the original screenshot associated with this case. The result and comments above follow the latest testing workbook.

![Report figure](<Diagram/Final_Report_Len_Pei_Ying_QIU-202404-007159.pdf-0296-01.png>)

_Figure 4.19: Rating & Business Rules - Rating Eligibility Guard_

#### 4.3.4.6 Report Security

Report Security Testing determined that report submission and report records are controlled only to authenticated and authorised users. Testing included unauthenticated report submission and cross-user report access; further evidence is included in Appendix 5.6.

##### SEC-011: Seeker Cannot Read Another User's Submitted Reports

**Recorded result: Pass.**

While authenticated as Job Seeker ABCD (user ID d1ff41b4-fb7d-4398-a270-c405c83fc795), a direct query to the reports table returned an empty array with no error. Known reports belonging to Tsuki (d43f9652-89ed-45af-b429-bf361646a11a) and Len (fcc3189e-0e67-40f8-b688-c79842ba481f) were not returned. This confirms that another seeker's submitted reports are hidden by RLS.

**Expected result:** Only S2's own report rows (reporter_id = auth.uid()) are returned; S1's reports are hidden.

**Test procedure:**

1. Log in as S2.
2. Query reports table without reporter_id filter.
3. Check rows returned.

**Test input:** Auth: S2
Files: schema.sql (reports_select_own, reports_admin_select policies)

**Recorded comments:** RLS correctly limits report visibility to the authenticated user's own reports; unrelated seeker reports were not exposed.

Figure 4.20 retains the original screenshot associated with this case. The result and comments above follow the latest testing workbook.

![Report figure](<Diagram/Final_Report_Len_Pei_Ying_QIU-202404-007159.pdf-0296-07.png>)

_Figure 4.20: Report Security - Report Read Isolation_

#### 4.3.4.7 Analytics & Chatbot

Analytics & Chatbot Security Testing examined whether analytics and chatbot data is limited by user role. The tests were focused on restricting non-admin users from accessing administrative analytics and chatbot log information, and further evidence is included in Appendix 5.7.

##### SEC-025: Admin Analytics Data is Not Accessible to Non-Admin Users

**Recorded result: Pass.**

While authenticated as Job Seeker ABCD, a direct SELECT query against public.analytics returned HTTP status 200 with data as an empty array and error = null. No analytics rows were exposed to the non-admin account, confirming that analytics data is restricted to admin users by RLS.

**Expected result:** No rows returned for non-admin users; analytics data is admin-only.

**Test procedure:**

1. Log in as Seeker.
2. Query analytics table directly.
3. Check rows returned.

**Test input:** Auth: Seeker
Files: schema.sql (analytics_admin_select policy)

**Recorded comments:** Admin analytics data is correctly hidden from non-admin users; the Job Seeker session could not read any analytics rows.

Figure 4.21 retains the original screenshot associated with this case. The result and comments above follow the latest testing workbook.

![Report figure](<Diagram/Final_Report_Len_Pei_Ying_QIU-202404-007159.pdf-0297-05.png>)

_Figure 4.21: Analytics & Chatbot - Analytics Access Restriction_

#### 4.3.4.8 PDPA & Compliance

PDPA & Compliance Security Testing evaluated selected EasyEarn privacy and access-control measures related to personal data, Employer verification information and job-listing visibility. These tests were for selected technical controls and were not part of a legal compliance audit. Additional test cases and evidence are provided in Appendix 5.8.

##### SEC-026: Personal Data Fields are Not Exposed in Public Job Listing Queries

**Recorded result: Pass.**

While unauthenticated, a direct SELECT * query on public.job_listings returned five public job rows. The returned objects contained job-specific fields only, including id, employer_id, title, description, category, location, job_type, pay_rate, pay_type, skill_tags, expiry_date, status, created_at, openings_count, deleted_at, approved_by and approved_at. No employer personal profile fields such as email, phone, bio, SSM number, registration document data or contact document data were included in the public job listing response.

**Expected result:** Job listing rows do not include employer personal contact fields; only job-specific fields (title, location, pay, category, etc.) are returned.

**Test procedure:**

1. Without logging in, open the public Jobs page.
2. Inspect job listing data returned from Supabase.
3. Verify employer personal data (phone, email, bio) is not embedded in the job listing response.

**Test input:** Auth: none (anon)
Files: jobseeker-jobs.js, schema.sql (job_listings_public_read policy)

**Recorded comments:** Public job listing queries expose job information only; employer personal/contact and verification-document fields are not embedded in the job listing response.

Figure 4.22 retains the original screenshot associated with this case. The result and comments above follow the latest testing workbook.

![Report figure](<Diagram/Final_Report_Len_Pei_Ying_QIU-202404-007159.pdf-0298-03.png>)

_Figure 4.22: PDPA & Compliance - Job Listing Data Minimisation_

#### 4.3.4.9 Employer Verification & Visibility

Employer Verification & Visibility Testing determined if public job visibility is appropriately limited based on the Employer's verification status. This category contains only one test case, SEC-030, which is presented in full below. Since there are no additional test cases in this category, SEC-030 is not repeated in Appendix 5.9.

##### SEC-030: Employer Verification & Job Visibility

**Recorded result: Pass.**

Initial test identified that an approved CarePlus job was publicly visible even though the employer had not passed verification. After adding the verified-employer database read gate, the CarePlus job remained available in the Employer Dashboard for management but disappeared from Public / Job Seeker Browse Jobs. The visibility rule was therefore corrected and the retest passed.

**Expected result:** An unverified employer may create and manage its own listing, but the job must not be publicly visible to Job Seekers until the employer is verified.

**Test procedure:**

1. Log in as unverified employer CarePlus and create/save a test job.
2. Admin approves the CarePlus job.
3. Open Public / Job Seeker Browse Jobs and verify the CarePlus job is not visible.
4. Return to CarePlus Employer Dashboard and verify the employer can still manage its own job.

**Test input:** Employer: CarePlus (unverified)
Initial observation: approved CarePlus job was visible to Job Seekers.
Fix: public job visibility requires job status = approved AND employer is_verified = true.

**Recorded comments:** Initial issue identified and resolved. Retest passed after security fix. Public visibility now requires both an approved job and a verified, active employer.

Figure 4.23 retains the original screenshot associated with this case. The result and comments above follow the latest testing workbook.

![Report figure](<Diagram/Final_Report_Len_Pei_Ying_QIU-202404-007159.pdf-0299-03.png>)

_Figure 4.23: Employer Verification and Job Visibility Restriction_

Overall, all 23 Compatibility Testing test cases across the six testing categories achieved a Pass result in the final testing round. In the directly tested environments, the platform features, authentication-session behaviour, the interface components and form controls performed as expected for the selected functions. The findings are limited to the browsers, devices, operating systems and viewport conditions that were directly tested. Other Security Testing test cases and supporting evidence are included in Appendix 5.

### 4.3.5 Compatibility Testing

The latest Compatibility Testing workbook records 23 cases. The category totals below are derived from the individual case records, rather than inferred from screenshots.

| Category | Recorded cases | Pass | Other results |
| --- | --- | --- | --- |
| Browser Compatibility | 4 | 4 | 0 |
| Responsive Design | 5 | 5 | 0 |
| Feature Compatibility | 6 | 6 | 0 |
| Session &amp; Auth | 2 | 2 | 0 |
| UI &amp; Display | 3 | 3 | 0 |
| Form &amp; Input | 3 | 3 | 0 |

Compatibility Testing was performed to determine if EasyEarn was consistent with the browsers, screen sizes, devices and interaction environments within the scope of the test. The testing categories were: Browser Compatibility, Responsive Design, Feature Compatibility, Session & Auth, UI & Display, Form & Input. A total of 23 Compatibility Testing test cases (CT-001 to CT-023) were executed, and all 23 achieved a Pass result in the final testing round. The tests included browser-dependent functionality, responsive layout, platform-dependent features, authentication-session functionality, presentation of the interface and form controls. Figure 4.24 summarises the six Compatibility Testing categories. One representative test case from each category is presented in this section, while the remaining test cases and supporting evidence are provided in Appendix 6.

![Report figure](<Diagram/Final_Report_Len_Pei_Ying_QIU-202404-007159.pdf-0300-03.png>)

_Figure 4.24: EasyEarn Compatibility Testing Summary_

#### 4.3.5.1 Browser Compatibility

Browser Compatibility Testing evaluated the consistency of selected browser-dependent EasyEarn functions and interface elements as they were tested in the directly tested desktop browsers. The testing covered CSS layout rendering, JavaScript functionality, PDF resume generation and Chart.js analytics rendering in Google Chrome, Mozilla Firefox and Microsoft Edge. Additional test cases and evidence are provided in Appendix 6.1.

##### CT-001: CSS Layout Rendering

**Recorded result: Pass.**

Tested the EasyEarn Browse Jobs page in Google Chrome, Microsoft Edge and Mozilla Firefox on the same Windows device. The navigation bar, search/filter controls, job-card grid, verification badges, Apply buttons, icons, spacing and overall layout rendered consistently across all three browsers. No overlap, missing controls, broken Grid/Flex layout or meaningful visual discrepancy was observed. Safari was not tested because it was not available in the current Windows test environment.

**Expected result:** CSS layout renders consistently with no broken Grid/Flex, missing fonts, or visual discrepancies across all four browsers.

**Test procedure:**

1. Open EasyEarn homepage in Chrome and verify CSS Grid/Flex layout.
2. Repeat in Firefox and compare layout.
3. Repeat in Safari and compare layout.
4. Repeat in Edge and compare layout.
5. Check for any broken layout or missing styles across all four browsers.

**Test input:** Browsers: Chrome, Firefox, Safari, Edge
Files: css/*, includes.js

**Recorded comments:** Chrome, Edge and Firefox showed consistent rendering. Safari was not available for direct testing in the current environment.

Figure 4.25 retains the original screenshot associated with this case. The result and comments above follow the latest testing workbook.

![Report figure](<Diagram/Final_Report_Len_Pei_Ying_QIU-202404-007159.pdf-0301-03.png>)

_Figure 4.25: Browser Compatibility - CSS Layout Rendering_

#### 4.3.5.2 Responsive Design

Responsive Design Testing determined if EasyEarn's layout, navigation and interactive components were responsive to desktop, tablet and mobile screen sizes. The testing included layout breakpoints, touch interactions, mobile content display, validation presentation and mobile filtering, and video evidence is attached in Appendix 6.2.

##### CT-005: Layout Breakpoints

**Recorded result: Pass.**

Retested the responsive layout after the 375px mobile fixes. The desktop (1920px), tablet (768px), and mobile (375px) views now adapt correctly. On mobile, navigation remains collapsed appropriately, dashboard and chart content fits within the viewport, charts stack vertically without being cut off, and no visible horizontal overflow or overlapping content was observed.

**Expected result:** Layout adapts fluidly at all three breakpoints with no horizontal scroll, overlapping elements, or broken navigation.

**Test procedure:**

1. Load Jobs page at 1920px (desktop) and verify multi-column grid layout.
2. Resize to 768px (tablet) and verify layout adapts to two columns.
3. Resize to 375px (mobile) and verify single-column layout.
4. Check navigation collapses into hamburger menu at mobile width.
5. Verify no horizontal scroll or overlapping elements at any breakpoint.

**Test input:** Viewports: 1920px, 768px, 375px
Files: css/*, includes.js

**Recorded comments:** 375px responsive issue was fixed and successfully retested. Desktop, tablet and mobile layouts now display correctly.

Figure 4.26 retains the original screenshot associated with this case. The result and comments above follow the latest testing workbook.

![Report figure](<Diagram/Final_Report_Len_Pei_Ying_QIU-202404-007159.pdf-0302-01.png>)

_Figure 4.26: Responsive Design - Layout Breakpoints_

#### 4.3.5.3 Feature Compatibility

Feature Compatibility Testing checked if the selected EasyEarn features functioned correctly across the browsers and screen resolutions tested. The tests covered Google Translate Integration, dark mode, the floating chatbot, Employer verification uploads, notification updates and Admin analytics, with additional evidence provided in Appendix 6.3.

##### CT-010: Google Translate Integration

**Recorded result: Pass.**

Tested Google Translate integration on EasyEarn by switching the interface to Bahasa Malaysia and Mandarin, using the Jobs search/filter functions while translated, and then switching the interface back to English. Visible page text translated successfully, the layout remained intact, search and filter controls continued to work, and switching back to English restored the original interface without functional issues.

**Expected result:** Google Translate widget loads and translates visible text; all interactive features continue to function while translated.

**Test procedure:**

1. Load homepage and activate Google Translate to Bahasa Malaysia.
2. Verify page content translates without breaking layout.
3. Use the Jobs search filter while translated.
4. Submit a job application while translated.
5. Switch back to English and verify all functionality is restored.

**Test input:** Target language: Bahasa Malaysia / Mandarin
Files: js/translate.js, index.html

**Recorded comments:** Bahasa Malaysia and Mandarin translation worked without breaking page layout or Jobs interactions. Returning to English also worked correctly.

Figure 4.27 retains the original screenshot associated with this case. The result and comments above follow the latest testing workbook.

![Report figure](<Diagram/Final_Report_Len_Pei_Ying_QIU-202404-007159.pdf-0302-07.png>)

_Figure 4.27: Feature Compatibility - Google Translate Integration_

#### 4.3.5.4 Session & Auth

Session & Auth Compatibility Testing checked if authentication-session behaviour was consistent across multiple tabs in the same browser session. Tests included cross tab session persistence and synchronised logout and there was additional evidence provided in Appendix 6.4.

##### CT-017: Cross-Tab Logout

**Recorded result: Pass.**

Tested logout behaviour with the same Job Seeker session open in multiple tabs. Logging out from one tab cleared the shared authentication session and caused the other open EasyEarn tab to be logged out as well. After the session was cleared, protected pages could no longer be accessed without signing in again.

**Expected result:** Logout clears the Supabase session from localStorage; subsequent navigation in any tab detects no active session and redirects to Login.

**Test procedure:**

1. Log in as Job Seeker and open dashboard in Tab 1 and Tab 2.
2. Click Logout in Tab 1.
3. Verify Tab 1 redirects to Login page.
4. In Tab 2, attempt to navigate to a protected page or refresh.
5. Verify Tab 2 also redirects to Login page after session is cleared.

**Test input:** Files: js/auth.js (handleLogout), js/supabase-data.js (observeAuth)

**Recorded comments:** Logout propagated across tabs correctly and cleared the shared browser session as expected.

Figure 4.28 retains the original screenshot associated with this case. The result and comments above follow the latest testing workbook.

![Report figure](<Diagram/Final_Report_Len_Pei_Ying_QIU-202404-007159.pdf-0303-05.png>)

_Figure 4.28: Session & Auth - Cross-tab Logout_

#### 4.3.5.5 UI & Display

UI & Display Compatibility Testing was used to determine the readability and proper display of the EasyEarn interface content in the test environments. Testing was conducted on font rendering, long text handling and image-upload preview, and some specifics are included in Appendix 6.5.

##### CT-019: Long Text Overflow Handling

**Recorded result: Pass.**

Tested long text content using an extended job title, long job description and long employer company overview. At the 375px mobile viewport, text wrapped correctly inside the form fields and page containers without horizontal overflow, clipping or breaking the layout. The same content was also considered safe for the wider desktop layout because the available container width is greater than on mobile.

**Expected result:** Long text wraps correctly within containers at all viewports; no text overflows outside card or container boundaries.

**Test procedure:**

1. Open a job listing with a long description and verify text wraps correctly.
2. Open Employer profile with a long company overview and verify layout.
3. Resize to mobile (375px) and verify long text still wraps correctly.
4. Check job cards on Jobs page with long job titles.
5. Verify no text overflows outside card boundaries on any viewport.

**Test input:** Viewport: 1920px, 375px
Files: css/*, pages/jobseeker/jobs.html

**Recorded comments:** Long job and employer profile text wrapped correctly at 375px with no visible overflow. Desktop layout provides more width, so no additional overflow issue was expected.

Figure 4.29 retains the original screenshot associated with this case. The result and comments above follow the latest testing workbook.

![Report figure](<Diagram/Final_Report_Len_Pei_Ying_QIU-202404-007159.pdf-0304-03.png>)

_Figure 4.29: UI & Display - Long Text Overflow Handling_

#### 4.3.5.6 Form & Input

Form & Input Compatibility Testing was used to determine if common EasyEarn form controls and functions responded in a consistent manner in the tested browsers. The tests included interview date and time selection, file-size and file-type validation, and password-field masking; additional evidence is included in Appendix 6.6.

##### CT-021: Interview date/time picker

**Recorded result: Pass.**

Tested interview date/time scheduling in Google Chrome, Mozilla Firefox and Microsoft Edge. The Employer could open an accepted application, use the date/time picker, select a valid interview date and time, save the schedule, and view the saved interview date/time correctly in all three tested browsers.

**Expected result:** Date and time picker opens and saves correctly across all browsers; scheduled interview date is stored and displayed accurately.

**Test procedure:**

1. Log in as Employer and open Applicants page in Chrome.
2. Select an accepted application and open interview scheduling.
3. Click the date/time input and verify date picker opens.
4. Select a date and time and verify the value is saved correctly.
5. Repeat steps 1–4 in Firefox, Safari, and Edge.

**Test input:** Browsers: Chrome, Firefox, Safari, Edge
Files: js/employer-applicants.js, pages/employer/applicants.html

**Recorded comments:** Interview scheduling worked consistently in Chrome, Firefox and Edge. Browser picker appearance differed slightly, but the selected date/time saved and displayed correctly.

Figure 4.30 retains the original screenshot associated with this case. The result and comments above follow the latest testing workbook.

![Report figure](<Diagram/Final_Report_Len_Pei_Ying_QIU-202404-007159.pdf-0305-01.png>)

_Figure 4.30: Form & Input - Interview Date/Time Picker_

Overall, all 23 Compatibility Testing test cases across the six testing categories achieved a Pass result in the final testing round. For the EasyEarn browser, the results indicated that the tested environments operated in a consistent manner for the tested functions and the features of the platform selected, the authentication-session behaviour, the interface components and form controls. The findings are limited to the browsers, devices, operating systems and viewport conditions that were directly tested. The remaining Compatibility Testing test cases and supporting evidence are provided in Appendix 6.

### 4.3.6 Requirements Traceability and Verification Summary

The updated records qualify the interpretation of verification: ST-017 records a submit-button state that did not reset after a network failure; CT-020 excludes pre-save image preview; CT-001–CT-004 do not directly test Safari in the formal compatibility suite. The iPhone UAT supplies separate Safari workflow evidence. SEC-002 confirms the outcome by database readback rather than the client-helper return value. These qualifications apply to the evidence mappings below.

To show the connection between the system requirements established in Chapter 3 and the evidence of evaluating the system in this chapter, the FRs and NFRs of EasyEarn were mapped to the evidence of the implementation and the verification of the system. Requirements traceability provides a systematic relationship between software requirements, implementation and evaluation activities [21], [96]. Tables 4.9 and 4.10 accordingly show the evidence used to assess each requirement and whether it is verified, partially verified, evaluated or supported in terms of implementation evidence in the scope of this FYP.

The 18 FRs defined in Table 3.8 are mapped to the corresponding System Testing, UAT, Security Testing and Compatibility Testing evidence in Table 4.9. As the final UAT was structured as 15 core functional tasks for the Job Seeker, Employer and Admin roles, rather than as numbered test cases, the relevant UAT task descriptions are provided directly as evidence for verification in the table.

_Table 4.9: Functional Requirements Verification Summary_

|**Requirement**|**Verification Evidence**|**Status**|
|---|---|---|
|**FR01 – User Registration**|UAT – Job Seeker Registration & Login; ST-001;|Verified|
|**& Login**|SEC-014; SEC-015||
|**FR02 – RBAC**|SEC-013; SEC-024; ST-018|Verified|
|**FR03 – Profile Setup**|ST-001|Verified|
|**FR04 – Browse & Filter**<br>**Job Listings**|UAT – Job Seeker Job Search & Browsing; ST-<br>013; CT-009|Verified|
|**FR05 – Apply for Jobs**|UAT – Job Seeker Job Application; ST-001; ST-<br>007|Verified|
|**FR06**<br>**–**<br>**Application**<br>**Status Tracking**|ST-003; ST-023|Verified|
|**FR07 – Save Jobs /**<br>**Wishlist**|ST-012|Verified|
|**FR08 – Work History**|UAT – Job Seeker Work History & Employer|Verified|
|**Dashboard**|Rating; ST-029||
|**FR09 – Auto-Generate**|UAT – Job Seeker Resume Management; ST-|Verified|
|**Resume**|015; CT-003||
|**FR10 – Post & Manage**<br>**Job Listings**|UAT – Employer Job Posting; ST-002; ST-030|Verified|
|**FR11**<br>**–**<br>**Review**<br>**&**|UAT – Employer Applicant Viewing and|Verified|
|**Manage Applicants**|Acceptance/Rejection; ST-003||
|**FR12**<br>**–**<br>**Employer**|UAT – Employer Verification; ST-009; ST-026;|Verified|
|**Verification Badge**|SEC-030||

|**FR13**<br>**–**<br>**Bidirectional**|UAT – Job Seeker Work History & Employer|Verified|
|---|---|---|
|**Rating & Review**|Rating; UAT – Employer Job Completion & Job<br>Seeker Rating; ST-024; SEC-008; SEC-009||
|**FR14 – Report / Flag**|UAT – Admin Job Flagging/Removal; UAT –|Verified|
|**System**|Admin Handling of Reports; ST-004; ST-028;<br>SEC-010; SEC-011||
|**FR15**<br>**–**<br>**User**|UAT – Admin Employer Account Lock/Unlock;|Verified|
|**Management**|ST-033||
|**FR16**<br>**–**<br>**Job**<br>**Listing**|UAT – Admin Job Approval; UAT – Admin Job|Verified|
|**Moderation**|Flagging/Removal; ST-004; ST-025||
|**FR17 – Google Translate**|CT-010|Verified|
|**Integration**|||
|**FR18**<br>**–**<br>**Rule-Based**|ST-011; CT-012|Verified|
|**Chatbot**|||

Direct evidence of evaluation of all 18 FRs was provided within the scope of testing defined. The verification evidence included 34 System Testing test cases, 75 UAT functional task executions completed by five testers, 30 Security Testing test cases and 23 Compatibility Testing test cases. The results demonstrate that the FRs implemented worked as expected in the scenarios and environments tested [96].

Table 4.10 shows how the NFRs stipulated in Table 3.9 are mapped to the corresponding verification evidence. NFRs are the quality attributes and operational constraints that impact the performance of the system, such as performance, security, usability, compatibility and maintainability [20].

_Table 4.10: Non-Functional Requirements Verification Summary_

|**Requirement**|**Verification Evidence**|**Status**|
|---|---|---|
|**NFR01 – Page Load Time**|ST-013; ST-016|Verified<br>(Selected<br>Pages)|
|**NFR02**<br>**–**<br>**HTTPS**|Section 4.2.5 System Deployment;|Implementation|
|**Encryption**|HTTPS implementation evidence|Verified|
|**NFR03 – RLS**|SEC-001–SEC-007;<br>SEC-012;<br>SEC-019–SEC-021|Verified|
|**NFR04**<br>**–**<br>**Session**<br>**Management**|ST-018; SEC-023; CT-016; CT-017|<sup>Verified</sup>|
|**NFR05**<br>**–**<br>**Responsive**|CT-005–CT-009;<br>UAT<br>device|Verified within Tested|
|**Design**|evidence|Devices|
|**NFR06 – Accessibility**|UAT<br>Usability<br>Questionnaire;<br>Heuristic Evaluation|Evaluated|
|**NFR07**<br>**–**<br>**System**<br>**Availability**|Section 4.2.5 System Deployment|Not Formally Verified|
|**NFR08**<br>**–**<br>**Concurrent**|ST-014|Partially Verified|
|**Users**|||
|**NFR09**<br>**–**<br>**Code**|Section 4.2.1 Frontend|Implementation|
|**Modularity**||Verified|
|**NFR10 – PDPA 2010**|SEC-026–SEC-029;<br>ST-031–ST-<br>033|Verified<br>(Selected<br>Controls)|
|**NFR11**<br>**–**<br>**Browser**|CT-001–CT-004;<br>UAT<br>–|Partially Verified|
|**Compatibility**|iPhone/Safari||
|**NFR12**<br>**–**<br>**Deployment**|Section 4.2.5 System Deployment;|Implementation|
|**Independence**|Appendix 7|Verified|

The detailed evaluation results discussed in Sections 4.3.1-4.3.5 are complemented by the verification evidence presented in Tables 4.9 and 4.10. Most NFRs were evaluated through performance, security, usability and compatibility testing. NFR07 (System Availability) was not formally verified because the project did not require monitoring of system availability over long periods of time; NFR08 (Concurrent Users) was partially verified by the concurrent application test in ST-014 instead of formal load or stress testing with 100 concurrent users. Partially verified was also NFR11 (Browser Compatibility), as the formal Compatibility Testing suite only covered Google Chrome, Mozilla Firefox and Microsoft Edge, with Safari covered via the iPhone UAT. The supporting evidence for NFR02 (HTTPS Encryption), NFR09 (Code Modularity) and NFR12 (Deployment Independence) was done mainly by implementing and deploying implementation evidence and not by dedicated test cases based on execution. These classifications are used to avoid overstating the verification results [20], [21], [96].
