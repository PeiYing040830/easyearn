# Chapter 4: Implementation

## 4.1 Introduction

The chapter gives the implementation and testing of EasyEarn, a web-based gig job-matching platform in the context of the gig economy in Malaysia. According to Malay Mail [5] citing MDEC's internal analysis, the size of Malaysia's gig economy was RM1.33 billion in Q3 2023, and it also recorded over 100,000 new participants and earners in the gig economy through gigeconomy platforms in the same period. This section describes the major technologies and decisions made for the frontend, backend, database, and third-party packages.

EasyEarn main implementation technologies and testing methods are summarised in Figure 4.1, which shows the frontend, Supabase backend services, the PostgreSQL database, third-party packages and the five different testing approaches applied to the system to examine it.

![Report figure](<Diagram/Final_Report_Len_Pei_Ying_QIU-202404-007159.pdf-0263-05.png>)

_Figure 4.1: Implementation and Testing Overview of EasyEarn_

## 4.2 Implementation

This section explains how EasyEarn is technically implemented in four aspects: Frontend, Backend, Database and Third-party Packages. EasyEarn uses a static frontend with a BaaS architecture. The frontend comprises HTML, CSS and JavaScript files served through GitHub Pages, while Supabase provides authentication, data persistence, access control and selected database-level business logic. This architecture minimises the need to have a dedicated application server and enables access-control rules to be implemented using Supabase RLS policies and database rules [18]. Section 4.2.1 explains the structure of the frontend and the page inventory; Section 4.2.2 describes the backend services and the security model; Section 4.2.3 describes the database schema and access-control policies; and Section 4.2.4 summarises the third-party packages used in the system.

### 4.2.1 Frontend

EasyEarn is a multi-page application organised into a set of public pages in the root directory (index.html, login.html, jobs.html) and three role-scoped directories (pages/jobseeker/, pages/employer/, pages/admin/). The page distribution is summarised in Table 4.1 below.

_Table 4.1: Page Distribution by role/section_

|**Section**|**Page Count**|**Representative Page**||**Paired CSS**|
|---|---|---|---|---|
|**Public / Auth**|16|index,<br>login,<br>register,|forgot-|css/landing.css,|
|||password, reset-password|, jobs,|css/style.css|
|||about, help, report, security|||
|**Job Seeker**|11|dashboard,<br>jobs,<br>appl|ications,|jobseeker-pages.css /|
|||saved-jobs,<br>interviews,|resume,|jobseeker-|
|||work-history, messages,<br>logout|profile,|dashboard.css|
|**Employer**|8|dashboard, post-job, mana<br>applicants, ratings, veri<br>messages, profile|ge-jobs,<br>fication,|employer-pages.css|

|||||**BIT 31**|**18 Final Year Project 2**|
|---|---|---|---|---|---|
|**Admin**|9|dashboard,|jobs,|users,|admin-pages.css|
|||verifications,|<br>reports,|chatbot-||
|||knowledge,<br>profile|analytics,|messages,||

The page count includes redirect and compatibility routes retained in the project structure, such as post-job.html and saved-jobs.html, although their main functionality has been consolidated into manage-jobs.html and the Saved Jobs tab of jobs.html, respectively.

The three colour themes (green for Job Seekers, amber for Employers and purple for Admins) are stored centrally in a single CSS file per role folder.  All pages are written using semantic HTML5 and assembled dynamically using a lightweight client-side includes system (js/includes.js), where a common header and footer are dynamically included in each page, without any server-side template engine; a pattern that is appropriate to a static host like GitHub Pages [50].

To implement interactivity, EasyEarn uses multiple vanilla JavaScript ECMAScript (ES) modules [48], including page-specific modules such as jobseeker-resume.js, employermanage-jobs.js and admin-analytics.js, together with shared modules for authentication, data access, notifications, themes, translation and chatbot functionality.

The Job Seeker Resume Builder uses four supporting libraries to extend page functionality over native browser APIs: Lucide [92] is used to provide lightweight Scalable Vector Graphics (SVG) icons on all the role dashboards; Chart.js [51] is used to render charts in selected dashboard and analytics views, including the Job Seeker Applications page, Employer Dashboard and Admin Analytics Dashboard and html2canvas [93] and jsPDF [49] to take a snapshot of the on-screen Document Object Model (DOM) of the on-screen resume and export it as an A4 PDF without a server round trip.

### 4.2.2 Backend

EasyEarn's backend is powered by Supabase, with no need to build a custom application server. Three back-end issues are addressed this way: authentication, data access, and server-enforced business logic.

## Authentication:

Supabase Auth provides email/password sign-up and login, and issues JWTs [94], which are stored in the browser and automatically refreshed as needed without user intervention. Each protected page subscribes to the Supabase onAuthStateChange event using observeAuth() (js/supabase-data.js), and redirects unauthenticated visitors to the login page before any protected UI is rendered.

## Data access:

Instead of sending raw Structured Query Language (SQL) from the client, database operations are performed through the Supabase JavaScript client. The client sends Hypertext Transfer Protocol (HTTP) requeststhrough PostgREST to the underlying PostgreSQL database, where applicable RLS policies are evaluated before data is returned or modified [95]. This reduces the need to construct raw SQL queries directly in client-side code and helps reduce SQL injection risks associated with manually constructed queries [78].

_Table 4.2: Layered Access Control in EasyEarn_

|**Layer**|**Mechanism**|**Purpose**|
|---|---|---|
|**Client-side**|Use role guards in page|Protects UI from unauthorised users|
||JavaScript<br>(e.g.||
||requireUser(), role checks<br>in admin-*.js)||
|**Network**|PostgREST over HTTPS,|Client requests are sent to Supabase/PostgREST|
||Supabase anon key|over HTTPS, while database operations remain<br>subject to the configured RLS policies|

|**Database**|RLS policies per table|Applies access rules when there are duplicate or<br>modified client requests|
|---|---|---|

## Server-enforced business logic:

Important business rules that should not rely only on client-side JavaScript are implemented using PostgreSQL trigger functions at the database level. This reduces reliance on client-side checks because the rules are applied at the database level when the relevant operations are performed. The two key examples are sync_job_openings_from_application(), which is activated on INSERT/UPDATE/DELETE to the applications table to ensure that the job_listings.openings_count field is up to date, no overbooking occurs, and notify_new_application(), which adds a row to the notifications table for the appropriate employer when an application is added to the applications table.

### 4.2.3 Database

The EasyEarn schema consists of 12 tables, summarised in Table 4.3: Key tables support softdelete via a deleted_at timestamp column, preserving referential integrity while allowing logical removal of records (e.g. a withdrawn job listing).

_Table 4.3: EasyEarn Database Tables and Purpose_

|**Table**|**Purpose**|
|---|---|
|**users**|Stores<br>information<br>about<br>the<br>user's<br>profile<br>and<br>role|
||(seeker/employer/admin) for each account.|
|**job_listings**|Job offers made by employers.|
|**applications**|Connects a person looking for a job to a job posting and tracks the|
||status of the job.|
|**notifications**|Built-in notifications based on system events.|
|**payments**|Completed application payment history.|

|**ratings**|Bidirectional<br>post-completion<br>ratings<br>and<br>reviews<br>between|
|---|---|
||Employers and Job Seekers.|
|**reports**|Safety reports (fraud, dispute, abuse) are checked by Admins.|
|**saved_jobs**|Job seeker bookmarks.|
|**work_history**|Completed job records created when the application is completed.|
|**chatbot_knowledge**|Keyword-response pairs used by the rule-based chatbot.|
|**chatbot_logs**|Logged chatbot interactions.|
|**analytics**|All platform statistics for the Admin dashboard.|

Each table has RLS configured and policies are set based on the type and sensitivity of the data. Access rules are based on the authenticated user's UUID (auth.uid()), on record ownership fields like employer_id or seeker_id, on Administrator role checks and where not sensitive to public read access. This way, UI access control is complemented with access control at the PostgreSQL database level.

The chatbot_knowledge table is accessible for reading by public and authenticated users, enabling chatbot support before logging in, but INSERT, UPDATE and DELETE are only allowed for authorised Administrators. These interactions with the chatbot can be saved in the chatbot_logs table and only Administrators have access to see the chatbot's logs for monitoring.

Unique constraints are used to prevent duplicate records. The applications (job_id, seeker_id) constraint makes sure that any Job Seeker does not apply for the same job more than once, and the ratings (application_id, reviewer_id) ensures that no reviewer rates the same application more than once.

### 4.2.4 Imported Packages

EasyEarn is an integration of the following library packages with the goal of facilitating development. The following are the libraries integrated in EasyEarn for easy development and summarised in Table 4.4. All client-side libraries are loaded from CDN links, without the need for a local build pipeline, as it is used during publishing to GitHub Pages.

_Table 4.4:  Imported Packages and Third-party Libraries Used in EasyEarn_

|**Package / Library**|**Version / Source**|**Purpose**|
|---|---|---|
|||BaaS client for authentication and|
|Supabase JavaScript|@supabase/supabase-|database access through Supabase and|
|Client|js(CDN)|PostgREST; database access remains<br>subject to configured RLS policies.|
|||Renders line and doughnut charts in|
|Chart.js|V4.x(CDN)|selected Job Seeker, Employer and<br>Admin dashboard and analytics views.|
|jsPDF|v2.x(CDN)|Job Seeker: Export (programmatic) to<br>PDF.|
|||The frame source which was used for|
|html2canvas|v1.x(CDN)|the exported resume (jsPDF) is a DOM-<br>to-canvas snapshot.|
|||Helpful, user-friendly, lightweight SVG|
|Lucide Icons|CDN|icon library that is implemented in all<br>role dashboards and in public pages.|
|||Redirects the existing EasyEarn page to|
|Google Translate|Google Translate|the Google Translate website translation|
|Website|Web Service|service, making it accessible in multiple<br>languages.|
|Google Fonts<br>(Manrope, DM Sans)|CDN|When using secondary UI typefaces:<br>Manrope on public & landing pages;<br>DM Sans on all role dashboards.|

Other services listed in Table 4.4 are the Supabase JavaScript Client [18], which is used to access Supabase from the client-side JavaScript, the Google Translate website translation service for multilingual access and Google Fonts for providing the Manrope and DM Sans typefaces employed across the site.

### 4.2.5 System Deployment

EasyEarn is published using the automatic build-and-deploy pipeline offered by GitHub Pages, which automatically rebuilds and republishes EasyEarn when changes are made to the main branch without needing a custom build/publish pipeline or manual release step. EasyEarn is built with a static-frontend, BaaS architecture, meaning that the HTML, CSS and JavaScript frontend is served from GitHub Pages, while Supabase serves managed backend services like authentication, database access, RLS and business logic at the database level. This design makes it possible to deploy the system without a specific application server.

There were some problems that were encountered in the deployment process that were not apparent when developing locally and only became apparent during deployment; these were related to paths. Shared partials are used in the site, including a common header and footer that are included from a shared file, js/includes.js (Section 4.2.1). The paths to these partials, logos and backgrounds are different for the depth of each page within the folder hierarchy, however. For instance, pages/jobseeker/dashboard.html has to have a different relative path from the top-level pages. Each page sets the EASYEARN_BASE_PATH global variable before the include file includes.js is loaded (such as '../../' for role-specific pages), so that they don't have to duplicate the logic for including the script. Then the script uses this base path to determine at runtime where the header, footer, logo and footer-link will be found. This partialloading approach allows the same common components to load properly across all system pages, even with varying folder depths.

The EasyEarn deployment history on Github shows successful and unsuccessful deployments across the development of EasyEarn. Potential deployment problems were resolved by future commits and successful deployments. This history shows that there were issues with deployment, which were monitored and acted upon throughout the iterative development process. The deployment history can be found in Appendix 7, Figure A7.1.

## 4.4 Output Analysis

This section shows two sample outputs that EasyEarn can produce: the Admin Analytics Dashboard and the Job Seeker Auto-Generated Resume. The outputs provide examples of how the data stored and processed in EasyEarn can be converted to information that can be useful to various system users. The Admin Analytics Dashboard provides a summary of platform information and visualisations for easy administration monitoring, and the Auto-Generated Resume makes a Job Seeker's profile information and completed work history available as a downloadable PDF. The following subsections describe the purpose, data sources and resulting output of each feature.

### 4.4.1 Admin Analytics Dashboard Output

The Admin Analytics Dashboard provides Admins with a consolidated overview of platform activity through summary statistics, visualisations and detailed records. The dashboard presents information related to users, job listings, reports and Employer verification. Selected statistics are presented visually through charts for interpretation and monitoring of activities on the platform [51].

The dashboard fetches actual data from Supabase and makes the necessary calculations on the client side before returning and rendering the summaries and visualisations. The analytics information that was selected may also be saved as a dated snapshot in the analytics table, so that previous platform statistics may be referenced. It is implemented following EasyEarn's static-frontend and BaaS architecture, where the data is stored in Supabase, while the front-end processes and displays the retrieved information.

Admins also have access to a Data Explorer on the dashboard to view even more detailed information, depending on the filters available. In addition, a Compliance Awareness panel provides reminders related to job information, reports, payment disputes and Employer verification records. These elements combine to make the platform information comprehensible as a structured management overview. Figure 4.31 shows the Supabase analytics table used to store analytics records and historical snapshots.

![Report figure](<Diagram/Final_Report_Len_Pei_Ying_QIU-202404-007159.pdf-0310-05.png>)

_Figure 4.31: Supabase Analytics Table_

### 4.4.2 Auto-Generated Resume Output

The Auto-Generated Resume function produces a PDF resume using information stored in the Job Seeker's EasyEarn profile and completed work history. The information for the resumes generated includes profile information, skills, education, availability, and completed work experience, so that the Job Seeker can use this information without having to re-enter it into EasyEarn.

The resume content is first rendered within the browser using the Job Seeker's stored information. The html2canvas library captures the rendered resume content and converts it to PDF document format with a size of A4, using jsPDF [49], [93]. The document will then show the profile and completed work information provided when the Resume was made.

Completed work records can provide supporting employment information such as the job role, completion details and available platform rating information. The Auto-Generated Resume transforms the Job Seeker data stored in EasyEarn into a portable employment document. Figure 4.32 shows an example of the PDF resume generated by EasyEarn.

![Report figure](<Diagram/Final_Report_Len_Pei_Ying_QIU-202404-007159.pdf-0312-01.png>)

_Figure 4.32: Auto-Generated Resume Output (PDF)_

## 4.5 Conclusion

The current source records contain 87 named technical test cases (34 system, 30 security and 23 compatibility) and 75 UAT task executions. These are separate evaluation units and are not combined into a single “test-case” total. All are recorded as Pass, subject to the scenario limits and observations described above. The five UAT forms provide 50 usability ratings with a mean of 4.84/5 and five Accept decisions.

This chapter presented the implementation, testing and representative outputs of the EasyEarn Job Matching Portal. Section 4.2 described the frontend, backend, database, imported packages and system deployment. EasyEarn is built as a multi-page web application with HTML, CSS, and JavaScript, with Supabase handling the authentication, database services, RLS, and some of the database logic. It was deployed using a static frontend and a BaaS approach via GitHub Pages.

Five complementary evaluation methods were conducted in Section 4.3: System Testing, UAT, Usability Testing, Security Testing and Compatibility Testing. All 34 System Testing test cases across seven categories achieved a Pass result. Five UAT testers completed 75 functional task executions across the Job Seeker, Employer and Admin roles, with all tested tasks completed successfully. The mean value of the end-user usability questionnaire was 4.84 out of a maximum of 5.00. In addition, the heuristic evaluation identified four usability issues across three of Nielsen's usability heuristics, consisting of two minor issues and two cosmetic issues.

Security Testing had 30 test cases in 9 categories, with all 30 passing the final testing round. Several deficiencies that were noted during the first testing were rectified and retested satisfactorily before the final results were obtained. Compatibility Testing included 23 test cases across six categories, all of which passed in the directly tested environments. The Compatibility Testing findings were therefore limited to the browsers, devices, operating systems and viewport conditions that were directly evaluated.

The FRs and NFRs were mapped to the respective testing and implementation evidence in Section 4.3.6 to show requirement traceability. All 18 FRs were found to be supported by direct evaluation evidence, and selected NFRs were identified as verified, partially verified, evaluated, implementation verified or not formally verified based on the available evidence and project scope.

The first system output shown in Section 4.4 was the Admin Analytics Dashboard and the second was the Auto-Generated Resume. The Admin Analytics Dashboard pulls data from the platform to produce a summary and visualisations for admin monitoring, and the AutoGenerated Resume converts a Job Seeker's profile and completed work history into a downloadable PDF document. Overall, the implementation and evaluation results give evidence that the main EasyEarn functions and workflows were functioning as intended within the scope that was evaluated. The findings, limitations, project contributions and future enhancements are discussed further in Chapter 5.
