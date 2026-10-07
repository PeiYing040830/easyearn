# Chapter 5: Discussion and Conclusion

## 5.1 Introduction

This final chapter discusses the findings of the EasyEarn project in relation to the four RQs presented in Section 1.3.1 and the four research objectives outlined in Section 1.3. The findings are interpreted using the implementation, testing and output evidence presented in Chapter 4. Section 5.2 discusses how each RQ was addressed and how the corresponding research objective was achieved. Limitations related to implementation, security assurance and testing are discussed in Section 5.3. The practical, academic and technological contributions of EasyEarn are presented in Section 5.4, followed by future enhancements in Section 5.5. Section 5.6 concludes the chapter and the overall project. Figure 5.1 outlines the discussion of the research findings, objective achievement, project limitations, contributions, future enhancements and overall project conclusion.

![Report figure](<Diagram/Final_Report_Len_Pei_Ying_QIU-202404-007159.pdf-0314-04.png>)

_Figure 5.1: Overview of Chapter 5 Discussion and Conclusion_

## 5.2 Findings

The key findings of the EasyEarn project are discussed in relation to the four RQs and their corresponding research objectives. Each subsection explains how the relevant RQ was addressed through the user requirement findings, system implementation and testing evidence presented in the previous chapters, and evaluates whether the corresponding research objective was achieved.

### 5.2.1 RQ1 and Objective 1: A Multi-User Job-Matching Platform

RQ1 aimed to identify the key requirements for a web-based job-matching platform that supports short-term, part-time and freelance employment between Job Seekers and Employers in Malaysia. Based on the user requirement findings and the identified system requirements, the main requirements included role-based access, job posting and application management, location and category-based job search and filtering, application status tracking, and usersupport functions. These requirements formed the basis for the development of the main EasyEarn platform functions.

Objective 1 was achieved through the development of a multi-user web-based jobmatching platform with separate role-based interfaces for Job Seekers, Employers and Admins. Job Seekers can browse and filter job listings, apply for jobs, track application status, save jobs and access the rule-based chatbot. Employers can create and manage job listings, review applicants and manage application progress. Admins are provided with platform management, user management, job moderation, reporting and analytics functions.

System Testing and UAT were used to evaluate the implementation. All 34 System Testing test cases were conducted across the E2E Workflow, Integration, Performance, Recovery, Business Logic, Reporting and Compliance categories. In addition, five UAT testers completed 75 functional task executions across the Job Seeker, Employer and Admin roles using designated accounts and test data stored in Supabase. All 75 task executions were completed successfully, indicating that the main role-based workflows could be completed within the tested scenarios

The findings therefore indicate that EasyEarn provides the essential functions required for structured short-term job matching between Job Seekers and Employers. This directly addresses Problem 1, Lack of a Specialised Short-Term Labour Platform in Smaller Towns; Problem 4, Inefficient Recruitment Process for Employers; and Problem 5, Limited Structured Access to Flexible Work Opportunities, as identified in Section 1.2.

Figure 5.2 summarises the key findings for RQ1 and Objective 1, including the main role-based functions of EasyEarn, the supporting System Testing and UAT evidence, and the three related problems addressed by the platform.

![Report figure](<Diagram/Final_Report_Len_Pei_Ying_QIU-202404-007159.pdf-0316-02.png>)

_Figure 5.2: Summary of Findings for RQ1 and Objective 1_

### 5.2.2 RQ2 and Objective 2: A Safety and Trust Verification System

RQ2 focused on the safety and trust aspects that can be included in EasyEarn to minimise the risk of fraudulent job postings and build trust between the Job Seeker and Employer. Employer verification and reporting/flagging, bidirectional ratings and reviews, and RBAC and security controls are important features to support transparency and accountability for the platform.

The Employer Verification Badge, Report and Flag System, and Bidirectional Rating and Review System were used to accomplish Objective 2. These functions give users options to review completed work engagements, report any suspicious activity and find out which Employers have been verified by the platform.

Security Testing was conducted to evaluate the implemented safety- and securityrelated controls. All 30 Security Testing test cases were performed on nine categories, and all 30 of them passed the final test rounds. Several weaknesses identified during the initial testing were corrected and successfully retested, including rating eligibility, unauthorised applicationstatus modification and the public visibility of jobs posted by unverified Employers. The final results showed that all the tested controls in authentication, access control, reporting, privacy and Employer verification were working as designed in the tested scenarios.

Overall, EasyEarn provides more structured accountability mechanisms than informal job-seeking channels. This answers Problem 2: Prevalence of Social Media Job Scams identified in Section 1.2.

Figure 5.3 summarises the key findings for RQ2 and Objective 2, including EasyEarn's main safety and trust features, the supporting Security Testing evidence, and how these functions address Problem 2 related to social media job scams.

![Report figure](<Diagram/Final_Report_Len_Pei_Ying_QIU-202404-007159.pdf-0318-01.png>)

_Figure 5.3: Summary of Findings for RQ2 and Objective 2_

### 5.2.3 RQ3 and Objective 3: A Verifiable Digital Work History

RQ3 focused on the use of a digital work history and the Auto-Generated Resume to document and present the completed work experience of gig workers. The results suggest that data gathered from completed jobs, skills and platform ratings can be utilised to build a structured work history and used to produce a downloadable PDF resume. This allows Job Seekers to have a more portable and structured resume of their experience on platforms.

Objective 3 was accomplished by implementing the Work History Dashboard and Auto-Generated Resume identified in Section 4.4.2. The Resume Builder extracts the content from the Job Seeker's profile, skill tags, work history and platform ratings from Supabase and outputs them into a formatted resume and downloadable PDF. The resume created, therefore, is based on information already recorded in the EasyEarn platform, and does not require that the Job Seeker re-enter the information.

The Work History Dashboard also offers a detailed history of the jobs Job Seekers have finished and some work details. When combined, the Work History Dashboard and AutoGenerated Resume offer a viable means of recording and presenting gig workers' work history more systematically.

This directly responds to Problem 3 in Section 1.2: Lack of Verifiable Work History for Gig Workers. The key findings for RQ3 and Objective 3 are summarised in Figure 5.4, which includes the Work History Dashboard, Auto-Generated Resume, output evidence to show the work, and inputs to address the lack of verifiable work history for gig workers.

![Report figure](<Diagram/Final_Report_Len_Pei_Ying_QIU-202404-007159.pdf-0319-03.png>)

_Figure 5.4: Summary of findings for RQ3 and Objective 3_

### 5.2.4 RQ4 and Objective 4: Multilingual Accessibility

RQ4 explored the possibility of EasyEarn being more accessible to users with different language preferences by using multilingual access. The results show that multilingual accessibility can be achieved by providing a translated version of EasyEarn on the Google Translate website service. This way, users who are using different languages can see the content on the pages displayed in their own language, rather than having to download different versions of each EasyEarn page that have been translated into the users' language.

The Google Translate Integration implemented in EasyEarn achieved Objective 4. The translation function enables the website to be read in various languages such as Bahasa Melayu, Mandarin and Tamil, depending on the languages supported by the Google Translate service.

The multilingual feature was evaluated through CT-010: Google Translate Integration as part of Compatibility Testing. The translation function was successfully activated during testing, and the content of the tested page, navigation and main interface elements were accessible. The broader Compatibility Testing suite achieved 23 Pass results across six categories within the directly tested environments.

The implementation thus offers a useful multilingual-access option for different language preferences of users. It directly addresses Problem 6, Language Barrier on Existing Platforms, in Section 1.2.

Figure 5.5 summarises the key findings for RQ4 and Objective 4, including the multilingual feature implemented in EasyEarn, the supporting Compatibility Testing evidence, and how the feature addresses Problem 6 related to language barriers on existing platforms.

![Report figure](<Diagram/Final_Report_Len_Pei_Ying_QIU-202404-007159.pdf-0321-01.png>)

_Figure 5.5: Summary of findings for RQ4 and Objective 4_

### 5.2.5 Overall Objective Achievement Summary

The findings presented in Sections 5.2.1 to 5.2.4 demonstrate the extent to which each research objective was achieved. The evidence of implementation, evaluation outcomes and overall achievement of each project objective are summarised in Table 5.1.

_Table 5.1: Overall Project Objective Achievement Summary_

|**Objective**|**Evidence**|**Result**|||**Status**|
|---|---|---|---|---|---|
||**Collected**|||||
|**Objective 1: Develop a**|34 System Testing|Core|workflows for|Job|Achieved|
|**multi-user web-based job-**|test cases; 75 UAT|Seeker,|<br>Employer|and||
|**matching platform with**|functional<br>task|Admin|were success|fully||
|**role-based**<br>**dashboards,**|executions; role-|comple|ted<br>within|the||
|**CRUD job management**|based|evaluat|ed scenarios.|||
|**and a rule-based chatbot.**|implementation|||||

|**Objective 2: Implement**|30<br>Security|The tested safety, trust and|Achieved|
|---|---|---|---|
|**trust and safety features to**|Testing test cases;|security-related<br>controls||
|**improve**<br>**platform**|Employer|operated as intended in the||
|**reliability.**|Verification<br>Badge; Report &<br>Flag<br>System;<br>Bidirectional<br>Rating & Review|final testing round after<br>identified weaknesses were<br>corrected and retested.||
|**Objective 3: Develop a**|Work<br>History|The completed work history|Achieved|
|**digital work history profile**|Dashboard, Auto-|was successfully converted||
|**with**<br>**automatic**<br>**PDF**<br>**resume generation.**|Generate Resume,<br>System Testing|into a downloadable PDF<br>resume.||
|**Objective**<br>**4:**<br>**Improve**|CT-010;<br>Google|Translation<br>functionality|Achieved|
|**multilingual**<br>**accessibility**|Translate|operated correctly in the||
|**through Google Translate**|Integration;|tested environments, and all||
|**integration.**|Compatibility<br>Testing|Compatibility Testing test<br>cases passed.||

Overall, the evaluation results indicate that all four project objectives were achieved within the scope of this FYP. The achievement of each objective was supported by implementation evidence together with the System Testing, UAT, Security Testing, Usability Testing and Compatibility Testing results presented in Chapter 4. The remaining limitations mainly relate to long-term operational evaluation and system scalability, which are discussed in Section 5.3.

## 5.3 Limitations

The four project objectives were met based on the findings presented in Section 5.2, but there were a number of limitations during the implementation and testing of EasyEarn. The limitations should be taken into account before the system is deployed more widely in a production environment.

### 5.3.1 Security Assurance Limitations

The latest security workbook distinguishes final outcomes from initial failures. SEC-008, SEC-020 and SEC-030 explicitly describe initial vulnerabilities followed by fixes and passing retests; SEC-005 and SEC-006 record clean authenticated-query retests. A final Pass therefore describes the verified retest scenario, not uninterrupted security throughout development. SEC-002 also records an optimistic helper response that required a trusted database readback to establish that an unauthorised update had not persisted.

All 30 Security Testing test cases passed in the final testing round after the issues found during the earlier testing were fixed and tested again. However, passing these test cases does not mean that EasyEarn is completely free from security risks. In this FYP, only selected areas have been tested, including authentication, access control, RLS, file upload, input handling, ratings, reporting, privacy and Employer verification.

The security evaluation was mainly carried out using manually prepared test cases and by checking the security controls implemented in the system. It was not an independent penetration test or a comprehensive security audit. Therefore, there may still be security risks that were not covered by the selected test cases, especially if the system code, database policies or third-party services are changed in the future.

Before EasyEarn is deployed more widely, further security testing should be carried out. This can involve independent security testing, periodic audits of Supabase RLS and database security features, scans for vulnerabilities and dependencies, and regression testing after security changes. The main constraint is thus not in the final Security Testing result, but in the scope of the security evaluation.

Figure 5.6 highlights the primary security testing and assurance weaknesses of EasyEarn, namely the narrow focus of the Security Testing scenarios, the lack of independent Security Testing and a formal security audit, and the requirement for ongoing testing and regression testing prior to the wider production deployment of EasyEarn.

![Report figure](<Diagram/Final_Report_Len_Pei_Ying_QIU-202404-007159.pdf-0324-01.png>)

_Figure 5.6: Limitation – Security Assurance Limitations_

### 5.3.2 Testing Methodology Limitations

The UAT forms record sessions on 5, 8, 10 and 15 September 2026. Some technical evidence refers to subsequent database states and retests; the files do not document a repeated UAT round after every later change. Accordingly, the UAT findings describe the recorded sessions rather than proving user acceptance of all later revisions. The Windows UAT forms do not specify browser versions or even a browser name, and the supplied records do not support a complete browser-version/device matrix.

The project author performed Security Testing by manual analysis of the source code, RLS policies and some of the security test scenarios. Some combinations of vulnerabilities or attack patterns may not have been discovered in the 30 Security Testing test cases; the testing was not conducted by any independent penetration-testing team or a full security audit.

Usability Testing based on Nielsen's 10 Usability Heuristics [55] identified four minor or cosmetic issues across three heuristics. This evaluation was done by one evaluator, who was also the author of the project, which is one of the limitations of this evaluation. Multiple evaluators are recommended by Nielsen [55] as it is possible that different evaluators will find different usability problems. Thus, the results are not meant to be definitive.

The UAT (Section 4.3.2) involved five testers who completed 75 functional task executions across the Job Seeker, Employer and Admin roles using designated accounts and test data stored in Supabase. The UAT was able to test the major workflows of a role, but the number of testers was low in relation to the total target user base within the selected underserved towns in Malaysia. In addition, the testers were not chosen through an official sampling process. A larger-scale field test including users of different geographical regions would thus offer more reliable evidence of the usability and acceptance of the platform in realworld contexts.

Figure 5.7 summarises the main limitations of the testing methodology, including the absence of an independent security assessment, the use of a single evaluator for heuristic evaluation, and the limited number of UAT testers compared with the intended user population.

![Report figure](<Diagram/Final_Report_Len_Pei_Ying_QIU-202404-007159.pdf-0325-03.png>)

_Figure 5.7: Limitation – Testing Methodology Limitations_

### 5.3.3 Scope Limitations

Two qualifications in the technical test records remain relevant. ST-017 records successful recovery and retry after reconnection, but the submit control remained in the “Submitting...” state after the failed attempt. CT-020 assesses upload and post-save image display and explicitly excludes optional pre-save preview because it was not consistently stable. The formal Compatibility Testing suite directly covers Chrome, Edge and Firefox in the available Windows environment; Safari evidence comes from an iPhone UAT form, while macOS and Linux are not directly verified by CT-018.

The scope and constraints of the project outlined in Section 1.8.1 (Table 1.7) come with a few limitations. EasyEarn was developed over 26 weeks' academic time in two FYP courses, and was carried out by one developer. In the absence of an independent peer review and crossfunctional development team, requirements analysis, system design, development, testing and QA activities were completed. This could have reduced the amount of independent validation and evaluation that was available in the development and evaluation stages.

EasyEarn also uses a static frontend and BaaS architecture. The frontend is deployed using GitHub Pages; Supabase offers authentication, database services, RLS policies and some business logic in the database. There are also some controls on the client side, using JavaScript. This architecture significantly lowers the need for a dedicated application server, but there are still some potential security and privacy concerns that should be addressed before this is rolled out into production, which are discussed in Section 5.3.1.

The scope of implementation and evaluation was similarly limited by the system limitations found in Section 1.8.2 (Table 1.8). An integrated payment gateway and native mobile application were excluded from the implemented system due to the current project scope. As the current messaging function isn't a real-time one, the communication testing has been concentrated on the implemented asynchronous messaging feature and the rule-based chatbot. The accessibility and usability of EasyEarn pages translated using the Google Translate website service were assessed as part of Compatibility Testing, but no formal assessment of translation accuracy and native localisation was carried out.

EasyEarn's key scope limitations are outlined in Figure 5.8, including the 26-week academic time frame, single developer environment, architecture constraints, and areas excluded or limited such as payment gateway integration, native mobile application and limitations of asynchronous messaging.

![Report figure](<Diagram/Final_Report_Len_Pei_Ying_QIU-202404-007159.pdf-0327-01.png>)

_Figure 5.8: Limitation – Scope Limitations_

## 5.4 Contribution of the Project

This section looks at the other contributions of EasyEarn, in addition to the four project objectives outlined in Section 5.2. The contributions are evaluated from the viewpoints of practical usefulness for Job Seekers and Employers, academic/methodological usefulness as a FYP, and technological usefulness in terms of architecture and technologies used in the system.

## Contribution to Job Seekers and Employers

The following section summarises the practical benefits of the implementation and evaluation results presented in Chapter 4. The evaluation included 34 System Testing test cases, 75 UAT functional task executions, 30 Security Testing test cases and 23 Compatibility Testing test cases, together with the end-user usability questionnaire and heuristic evaluation. The results showed that the main EasyEarn functions worked as expected in the scenarios considered. EasyEarn is thus offering a structured platform that helps to connect Job Seekers and Employers and assists with job searching, application management, hiring, verification, reporting, rating and work-history functions. However, the constraints mentioned in Section 5.3 should be taken into account prior to wider production deployment.

For the Job Seekers, the Work History Dashboard and Auto-Generated Resume also offer a practical benefit, as completed work history, skills and available platform ratings stored in EasyEarn can be used again in a downloadable PDF resume. This will allow Job Seekers to provide a more structured and portable record of their work history.

## Academic and Methodological Contribution

EasyEarn documents a case study that applies a Hybrid Agile-Waterfall approach to a FYP developed by a single developer. The project was a blend of formal planning and documentation and iterative development during the FYP. For the evaluation approach, as mentioned in Chapter 4, it used System Testing, UAT, Nielsen's 10 Usability Heuristics [55], Security Testing and Compatibility Testing. Along with the restrictions listed in Sections 5.3.1 and 5.3.2, this is an example of how several testing methods can be implemented in the context of an academic information systems project, with limitations.

The findings can also be understood in the context of the TAM presented in Section 2.2.2, when interpreting the usability and acceptance of EasyEarn. The UAT and Usability Testing, however, were not formal assessments of constructs of the TAM (such as PEOU or PU). Thus, the outcomes should not be considered a formal TAM assessment.

## Technological Contribution

EasyEarn is an example of a multi-role web application implemented using a BaaS architecture with Supabase, GitHub Pages, Chart.js and jsPDF. Supabase provides authentication, database services and selected database-level business logic through RLS policies, while the frontend is deployed as a static website using GitHub Pages without the need for a dedicated application server.

The various contributions of EasyEarn are summarised in Figure 5.9, which outlines the practical value of EasyEarn to Job Seekers and Employers, the academic and methodological contribution of the Hybrid Agile-Waterfall approach and multiple testing methods, and the technological contribution of the implementation of a multi-role web application with a BaaS architecture.

![Report figure](<Diagram/Final_Report_Len_Pei_Ying_QIU-202404-007159.pdf-0329-02.png>)

_Figure 5.9: Contribution of the Project_

## 5.5 Future Enhancement

Immediate follow-up work should reset the submission control after network failure and verify retry behaviour in a regression test, assess the pre-save image preview separately if it remains part of the interface, and repeat the affected UAT tasks after security or workflow changes. Compatibility coverage should also be expanded through directly recorded browser versions, Safari test cases and additional operating systems. These actions follow from ST-017, CT-020 and the documented environment and session limits rather than from an assumption that all possible behaviour was tested.

Future security enhancement should focus on strengthening security assurance beyond the test scenarios completed in this project. This can involve independent penetration testing, automated vulnerability and dependency checks, regular audit of Supabase RLS and databaselevel security measures, improved surveillance of security-sensitive activities, and testing for regression issues following system changes that impact security.

The platform might also be expanded with other features. Manual payment confirmation can be minimised by integrating payment, for instance, with DuitNow. The existing asynchronous messaging functionality could be improved with real-time messaging functionality by providing Supabase Realtime or another suitable real-time messaging service. A native iOS or Android application could also be developed to complement the existing responsive web design and provide mobile-specific capabilities such as push notifications and selected offline features.

More end users from the target underserved towns should be involved in future evaluation. More extensive field testing would yield better evidence of usability and acceptance of EasyEarn in the field, since it was tried by just five testers during the UAT. To gain better coverage of potential usability problems, heuristic evaluation could be performed by three or five evaluators, as suggested by Nielsen [55]. Furthermore, the existing Google Translate website translation service may be replaced or expanded with a Google Cloud Translation API, and a formal identity verification service can be introduced into the Employer verification process. These improvements may help bring EasyEarn a step closer to broader production use.

The proposed EasyEarn Future Enhancement Roadmap is summarised in Figure 5.10 and covers continued security assurance through independent security assessment, automated vulnerability and dependency scanning, periodic review of access-control mechanisms and regression testing; feature expansion through payment integration, real-time messaging and a native mobile application; and expanded evaluation through larger-scale UAT, multi-evaluator heuristic testing, formal identity verification and enhanced multilingual support.

![Report figure](<Diagram/Final_Report_Len_Pei_Ying_QIU-202404-007159.pdf-0331-01.png>)

_Figure 5.10: Future Enhancement_

## 5.6 Conclusion

The refreshed evidence supports a scoped conclusion: all 87 named technical cases and 75 UAT task executions are recorded as Pass, while 50 participant ratings produce a mean of 4.84/5 and all five participants select Accept. Recorded observations, excluded preview behaviour, limited environments and the timing of UAT constrain how broadly those outcomes can be generalised.

The EasyEarn project aimed to develop a web-based job-matching platform for Job Seekers and Employers, with particular consideration for underserved towns in Malaysia such as Ipoh, Kangar, Alor Setar, Kuala Terengganu and Kota Bharu. The findings indicate that the four project objectives outlined in Section 1.3 were achieved within the scope of this FYP. Supporting evaluation evidence included 34 System Testing test cases, 75 UAT functional task executions, 30 Security Testing test cases, 23 Compatibility Testing test cases, an end-user usability questionnaire and a heuristic evaluation.

The project also has limitations related to security assurance, testing methodology and implementation scope, as discussed in Section 5.3. These restrictions are a limitation of a system developed in a 26-week academic period by one developer. Nevertheless, EasyEarn provides practical, academic and technological contributions, while the future enhancements presented in Section 5.5 provide directions for further development and evaluation.

In summary, EasyEarn proves that it is possible to build a multi-role job matching web application, based on a static frontend and a BaaS architecture, in a single developer academic project. The functions implemented meet the project's identified needs within the scope of the project in relation to structured job access, platform trust, digital work history and multilingual accessibility. Further security assurance, more extensive user evaluation and productionoriented improvements would be needed for broader deployment.
