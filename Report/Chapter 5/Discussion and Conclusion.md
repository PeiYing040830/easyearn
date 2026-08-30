# Chapter 5: Discussion and Conclusion

## 5.1 Introduction

This final chapter discusses the findings of the EasyEarn project in relation to the four research questions presented in Section 3.2.1 and the four research objectives outlined in Section 1.3. The findings are interpreted using the implementation, testing and output evidence presented in Chapter 4. Section 5.2 discusses how each research question was addressed and how the corresponding research objective was achieved. Limitations related to implementation, testing and residual security risks are discussed in Section 5.3. The practical, academic and technological contributions of EasyEarn are presented in Section 5.4, followed by future enhancements in Section 5.5. Section 5.6 concludes the chapter and the overall project.

## 5.2 Findings

The key findings of the EasyEarn project are discussed in relation to the four research questions and their corresponding research objectives. Each subsection explains how the relevant research question was addressed through the user requirement findings, system implementation and testing evidence presented in the previous chapters, and evaluates whether the corresponding research objective was achieved.

### 5.2.1 RQ1 and Objective 1: A Multi-User Job-Matching Platform

RQ1 aimed to identify the key requirements for a web-based job-matching platform that supports short-term, part-time and freelance employment between Job Seekers and Employers in Malaysia. Based on the user requirement findings and the identified system requirements, the main requirements included role-based access, job posting and application management, location and category-based job search and filtering, application status tracking, and user-support functions. These requirements formed the basis for the development of the main EasyEarn platform functions.

Objective 1 was achieved through the development of a multi-user web-based job-matching platform with separate role-based interfaces for Job Seekers, Employers and Admins. Job Seekers can browse and filter job listings, apply for jobs, track application status, save jobs and access the rule-based chatbot. Employers can create and manage job listings, review applicants and manage application progress. Admins are provided with platform management, user management, job moderation, reporting and analytics functions.

System Testing and UAT were used to evaluate the implementation. All 34 System Testing test cases were conducted across the E2E Workflow, Integration, Performance, Recovery, Business Logic, Reporting and Compliance categories. In addition, 36 UAT test cases were conducted by five testers using designated Job Seeker, Employer and Admin accounts with test data stored in Supabase.  The results indicated that the main role-based workflows could be completed successfully within the tested scenarios.

The findings therefore indicate that EasyEarn provides the essential functions required for structured short-term job matching between Job Seekers and Employers. This directly addresses Problem 1, Lack of a Specialised Short-Term Labour Platform in Smaller Towns; Problem 4, Inefficient Recruitment Process for Employers; and Problem 5, No Platform for Flexible Workers, as identified in Section 1.2.

Figure 5.1 summarises the key findings for RQ1 and Objective 1, including the main role-based functions of EasyEarn, the supporting System Testing and UAT evidence, and the three related problems addressed by the platform.

![Figure 1](Diagram/figure-01.png)

Figure 5.1: Summary of Findings for RQ1 and Objective 1

### 5.2.2 RQ2 and Objective 2: A Safety and Trust Verification System

RQ2 focused on the safety and trust aspects that can be included in EasyEarn to minimise the risk of fraudulent job postings and build trust between the Job Seeker and Employer. Employer verification and reporting/flagging, bidirectional ratings and reviews, and role-based access control and security controls are important features to support transparency and accountability for the platform.

The Employer Verification Badge, Report and Flag System, and Bidirectional Rating and Review System were used to accomplish Objective 2. These functions give users options to review completed work engagements, report any suspicious activity and find out which Employers have been verified by the platform.

Security Testing was performed to assess the safety and trust functions. Security Testing consisted of 29 test cases across eight categories. The results indicated that the tested authentication, access-control, reporting and privacy-related controls generally operated as expected within the defined scenarios. Several remaining security and privacy issues were also found, such as some restrictions on the controls in the database and data-access policies. The latter risks are further discussed in Section 5.3.1.

In general, the safety and trust-building practices adopted by EasyEarn put more structure into the user's accountability than in informal channels for job seeking. This answers Problem 2: Prevalence of Social Media Job Scams identified in Section 1.2.

The key findings for RQ2 and Objective 2 presented are summarised in Figure 5.2, which outlines EasyEarn's core security and trust capabilities, the accompanying Security Testing proofs, and their respective impacts on Problem 2 from the perspective of social media job scams.

![Figure 2](Diagram/figure-02.png)

Figure 5.2: Summary of Findings for RQ2 and Objective 2

### 5.2.3 RQ3 and Objective 3: A Verifiable Digital Work History

RQ3 focused on the use of a digital work history and the Auto-Generated Resume to document and present the completed work experience of gig workers. The results suggest that data gathered from completed jobs, skills and platform ratings can be utilised to build a structured work history and used to produce a downloadable PDF resume. This allows Job Seekers to have a more portable and structured resume of their experience on platforms.

Objective 3 was accomplished by implementing the Work History Dashboard and Auto-Generated Resume identified in Section 4.4.2. The Resume Builder extracts the content from the Job Seeker's profile, skill tags, work history and platform ratings from Supabase and outputs them into a formatted resume and downloadable PDF. The resume created, therefore, is based on information already recorded in the EasyEarn platform, and does not require that the Job Seeker re-enter the information.

The Work History Dashboard also offers a detailed history of the jobs Job Seekers have finished and some work details. When combined, the Work History Dashboard and Auto-Generated Resume offer a viable means of recording and presenting gig workers' work history more systematically.

This directly responds to Problem 3 in Section 1.2: Lack of Verifiable Work History for Gig Workers.

The key findings of the research query and research objective 3 are summarised in Figure 5.3, which includes the Work History Dashboard, Auto-Generated Resume, output evidence to show the work, and inputs to address the lack of verifiable work history for gig workers.

![Figure 3](Diagram/figure-03.png)

Figure 5.3: Summary of findings for Objective 3 and RQ 3

### 5.2.4 RQ4 and Objective 4: Multilingual Accessibility

RQ4 explored the possibility of EasyEarn being more accessible to users with different language preferences by using multilingual access. The results show that multilingual accessibility can be achieved by providing a translated version of EasyEarn on the Google Translate website service. This way, users who are using different languages can see the content on the pages displayed in their own language, rather than having to download different versions of each EasyEarn page that have been translated into the users' language.

Google Translate integrated into the EasyEarn platform achieved Objective 4. The translation function enables the website to be read in various languages such as Bahasa Melayu, Mandarin and Tamil, depending on the languages supported by the Google Translate service.

The multilingual feature was also tested in Compatibility Testing. Google Translate integration was tested in conjunction with the browsers, responsive design, feature compatibility and interface functions. Within the environments which were directly tested, all 23 Compatibility Testing test cases resulted in a Pass result. During the tested translation process, the translated page content, navigation and main interface elements were available.

The implementation thus offers a useful multilingual-access option for different language preferences of users. It directly addresses Problem 6, Language Barrier on Existing Platforms, in Section 1.2.

Figure 5.4 summarises the key findings for RQ4 and Objective 4, including the multilingual feature implemented in EasyEarn, the supporting Compatibility Testing evidence, and how the feature addresses Problem 6 related to language barriers on existing platforms.

![Figure 4](Diagram/figure-04.png)

Figure 5.4: Summary of findings for Objective 4 and RQ 4

## 5.3 Limitations

The four project objectives were met based on the findings presented in Section 5.2, but there were a number of limitations during the implementation and testing of EasyEarn. The limitations should be taken into account before the system is implemented in a wider production.

### 5.3.1 Residual Security Risks

While implementing EasyEarn, five residual security and privacy risks were found during Security Testing in Section 4.3.4. While the Security Testing test cases had the desired outcome in each test scenario, some more vulnerabilities were found that need to be resolved prior to broader production deployment.

The first residual risk is related to the `users_public_read` RLS policy. This policy does not currently restrict authenticated users from making SELECT operations on user records for selectable fields that have been related to SSM registration records or Employer verification documents (SEC-004, SEC-005 and SEC-027). While the `users_update_own` policy does not allow users to update another Employer's verification information, the current read policy is overly permissive since authenticated users who do not own the Employer may be able to access some fields of the verification document. This is a privacy concern that needs to be addressed before wider adoption of production.

The second residual risk is related to status updates of applications. Changes of status are restricted by the normal EasyEarn application workflow based on user roles and interface actions available. There is no separate field-level database constraint to stop unauthorised changes to application status via a direct request (SEC-020). The protection currently depends therefore on the application workflow and not on a specific rule at the database level for the application status field.

The third residual risk is one that relates to rating eligibility. The normal application flow for the rating function is that the application is only available after it reaches the Completed status (SEC-008). But this eligibility condition is not checked by an independently checkable database-level constraint. So, a direct request to the database may be able to circumvent the application-level restriction. Eligibility should also be enforced at the database level, too.

The fourth residual risk is related to self-rating prevention. There is no current CHECK constraint in the `ratings` table to make sure that `reviewer_id` and `reviewee_id` don't refer to the same user (SEC-009). While the normal EasyEarn interface does not allow users to rate themselves, the restriction is not imposed at the database level. Such a database constraint should therefore be added to the database so that the direct self-rating request is not able to be made.

The fifth residual risk is related to uploaded file validation. EasyEarn sets limits on profile pictures and Employer verification documents, such as a maximum size of 2MB (SEC-016) and limits on file type. The current implementation, however, doesn't offer full server-side MIME-type validation and depends primarily on the HTML accept attribute and the selected file.type checks. An existing client-side validation may then be ignored, and a renamed and/or misidentified file may pass through. Improved server-side file validation should be considered prior to greater production rollout.

The five remaining security risks found at Security Testing are: (1) an over-permissive public-read RLS policy, (2) no field-level database constraint to block updates to application status, (3) no database-level constraint to block rating eligibility, (4) no CHECK constraint to prevent self-rating, and (5) incomplete validation of profile pictures and Employer verification documents on the server.

The five residual security risks identified during Security Testing are summarised in Figure 5.5: an over-permissive RLS read policy, insufficient database-level controls for application status and rating eligibility, the absence of a self-rating CHECK constraint, and incomplete server-side file validation.

![Figure 5](Diagram/figure-05.png)

Figure 5.5: Limitation – Residual Security Risks

### 5.3.2 Testing Methodology Limitations

The project author performed Security Testing by manual analysis of the source code, RLS policies and some of the security test scenarios. Some combinations of vulnerabilities or attack patterns may not have been discovered in the 29 security test cases designed; the testing was not conducted by any independent penetration-testing team or a full security audit.

Usability Testing based on Nielsen's 10 Usability Heuristics (Nielsen, 1993) identified four minor or cosmetic issues across three heuristics. This evaluation was done by one evaluator, who was also the author of the project, which is one of the limitations of this evaluation. Multiple evaluators are recommended by Nielsen (1993), as it is possible that different evaluators will find different usability problems. Thus, the results are not meant to be definitive.

The UAT (Section 4.3.2) utilised five testers who performed 36 functional test cases in the Job Seeker, Employer and Admin roles using designated accounts and test data stored in Supabase. The UAT was successful in achieving the main role-specific workflows, but the number of testers involved was limited compared to the number of expected users in various underserved towns in Malaysia. Furthermore, the testers were selected based on availability rather than through a formal sampling procedure. However, larger-scale testing in the field and with users from various geographical regions would give further evidence on the usability and acceptance of the platform in real-life conditions.

Figure 5.6 summarises the main limitations of the testing methodology, including the absence of an independent security assessment, the use of a single evaluator for heuristic evaluation, and the limited number of UAT testers compared with the intended user population.

![Figure 6](Diagram/figure-06.png)

Figure 5.6: Limitation – Testing Methodology Limitations

### 5.3.3 Scope Limitations

The scope and constraints of the project outlined in Section 1.8.1 (Table 1.7) come with a few limitations. EasyEarn was developed over 26 weeks' academic time in two Final Year Project courses, and was carried out by one developer. In the absence of an independent peer review and cross-functional development team, requirements analysis, system design, development, testing and quality assurance were completed. This could have reduced the amount of independent validation and evaluation that was available in the development and evaluation stages.

EasyEarn also uses a static frontend and  architecture. The frontend is deployed using GitHub Pages; Supabase offers authentication, database services, RLS policies and some business logic in the database. There are also some controls on the client side, using JavaScript. This architecture significantly lowers the need for a dedicated application server, but there are still some potential security and privacy concerns that should be addressed before this is rolled out into production, which are discussed in Section 5.3.1.

The scope of implementation and evaluation was similarly limited by the system limitations found in Section 1.8.2 (Table 1.8). An integrated payment gateway and native mobile application were excluded from the implemented system due to the current project scope. As the current messaging function isn't a real-time one, the communication testing has been concentrated on the implemented asynchronous messaging feature and the rule-based chatbot. The accessibility and usability of EasyEarn pages translated using the Google Translate website service were assessed as part of Compatibility Testing, but no formal assessment of translation accuracy and native localisation was carried out.

EasyEarn's key scope limitations are outlined in Figure 5.7, including the 26-week academic time frame, single developer environment, architecture constraints, and areas excluded or limited such as payment gateway integration, native mobile application and limitations of asynchronous messaging.

![Figure 7](Diagram/figure-07.png)

Figure 5.7: Limitation – Scope Limitations

## 5.4 Contribution of the Project

This section looks at the other contributions of EasyEarn, in addition to the four project objectives outlined in Section 5.2. The contributions are evaluated from the viewpoints of practical usefulness for Job Seekers and Employers, academic/methodological usefulness as a Final Year Project, and technological usefulness in terms of architecture and technologies used in the system.

Contribution to Job Seekers and Employers

The following section summarises the practical benefits of the implementation and testing results presented in Chapter 4. There were 122 test cases conducted across System Testing, UAT, Security Testing and Compatibility Testing. The results indicated that the major EasyEarn functions worked as expected in the tested scenarios. EasyEarn thus offers a structured system that connects Job Seekers and Employers. However, the residual security and privacy risks listed in Section 5.3.1 highlight several remaining issues that need to be improved before wider production deployment.

The Work History Dashboard and Auto-Generated Resume are also a pragmatic solution for gig workers who have a digital work history. Work history, skills and platform ratings, saved in EasyEarn, can be reused to create a downloadable resume, enabling Job Seekers to more formally record and share their work history.

Academic and Methodological Contribution

EasyEarn documents a case study that applies a Hybrid Agile-Waterfall approach to a Final Year Project developed by a single developer. The project was a blend of formal planning and documentation and iterative development during the FYP. For the evaluation approach, as mentioned in Chapter 4, it used System Testing, UAT, Nielsen's 10 Usability Heuristics (Nielsen 1993), Security Testing and Compatibility Testing. Along with the restrictions listed in Sections 5.3.1 and 5.3.2, this is an example of how several testing methods can be implemented in the context of an academic information systems project, with limitations.

The findings can also be understood in the context of the TAM presented in Section 2.2.2, when interpreting the usability and acceptance of EasyEarn. The UAT and Usability Testing, however, were not formal assessments of constructs of the TAM (such as PEOU or PU). Thus, the outcomes should not be considered a formal TAM assessment.

Technological Contribution

EasyEarn is an example of a multi-role web application implemented using a  architecture with Supabase, GitHub Pages, Chart.js and jsPDF. Supabase provides authentication, database services and selected database-level business logic through RLS policies, while the frontend is deployed as a static website using GitHub Pages without the need for a dedicated application server.

The various contributions of EasyEarn are summarised in Figure 5.8, which outlines the practical value of EasyEarn to Job Seekers and Employers, the academic and methodological contribution of the Hybrid Agile-Waterfall approach and multiple testing methods, and the technological contribution of the implementation of a multi-role web application with a BaaS architecture.

![Figure 8](Diagram/figure-08.png)

Figure 5.8: Contribution of the Project

## 5.5 Future Enhancement

The six limitations and five risks to security in the system that were identified in Sections 1.8.2 and 5.3.1 are used as a basis for the future development of EasyEarn. Priority should be given to resolving the remaining security and privacy risks. This involves limiting access to sensitive Employer verification information, adding database-level constraints on application status changes and rating eligibility, ensuring that no one can self-rate and implementing stricter server-side MIME-type validation for uploaded files.

The platform might also be expanded with other features. Manual payment confirmation can be minimised by integrating payment, for instance, with DuitNow. The existing asynchronous messaging functionality could be improved with real-time messaging functionality by providing Supabase Realtime or another suitable real-time messaging service. A native iOS or Android application could also be developed to complement the existing responsive web design and provide mobile-specific capabilities such as push notifications and selected offline features.

A larger number of end users from the target underserved towns should be involved in the future evaluation. More extensive field testing would yield better evidence of usability and acceptance of EasyEarn in the field, since it was tried by just five testers during the UAT. To gain better coverage of potential usability problems, heuristic evaluation could be performed by three or five evaluators, as suggested by Nielsen (1993). Furthermore, the existing Google Translate website translation service may be replaced or expanded with a Google native translation API (Google Cloud Translation) and a formal identity verification service can be introduced into the Employer verification process. These improvements may help bring EasyEarn a step closer to broader production use.

The proposed EasyEarn Phase 2 Roadmap is summarised in Figure 5.9 and encompasses security hardening (including the addition of stronger access control mechanisms, database level constraints and server-side validation of uploaded files) as well as feature expansion (including the integration of payment systems, real-time messaging and a native mobile app) and expanded evaluation (larger scale UAT, multi-evaluator heuristic testing, formal identity verification and the integration of native translation API).

![Figure 9](Diagram/figure-09.png)

Figure 5.9: Future Enhancement

## 5.6 Conclusion

The EasyEarn project was to create an online platform for job matching between Job Seekers and Employers in under-serviced towns in Malaysia, such as Ipoh, Kangar, Alor Setar, Kuala Terengganu and Kota Bharu. The results from this study show that the four project objectives outlined in Section 1.3 were met. The findings from 122 test cases across System Testing, UAT, Security Testing and Compatibility Testing supported this, together with the Usability Testing findings presented in Chapter 4 and discussed in Section 5.2.

There are also certain restrictions in the project with regard to security, testing methodology and project scope as described in Section 5.3. These limitations reflect the constraints of a project developed by one developer within a 26-week academic period. Despite these limitations, the project offers practical, academic and technological contributions, as discussed in Section 5.4, while Section 5.5 presents future enhancements to address the remaining limitations.

EasyEarn as a whole demonstrates the feasibility of developing a job-matching website using an architecture within a single-developer academic project. The features implemented on the platform help overcome the problems of geographic access, employment trust, digital work history, and multilingual accessibility; the limitations identified with the platform will need to be overcome before it can be widely used in production. EasyEarn is thus a working academic prototype as well as a documented case study for future academic and applied computing projects in this field.
