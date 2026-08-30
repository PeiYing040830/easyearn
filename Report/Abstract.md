# ABSTRACT

The gig economy has grown substantially in Malaysia, accounting for 3.09 million (or 25.1 per cent) of the country's total workforce in 2024. Organised gig platforms, however, are clustered in the big cities and smaller towns like Ipoh, Kangar, Alor Setar, Kota Bharu and Kuala Terengganu are left relying on informal social media platforms, which put workers at risk of job scams, language barriers, and unverifiable work histories.

This report introduces a HyperText Markup Language (HTML), Cascading Style Sheets (CSS), JavaScript, and Supabase-based web application called EasyEarn, which aims to fill this service gap by offering a job-matching portal. It includes four key features: first, a multi-user job-matching portal and role-based dashboards with full Create, Read, Update, Delete (CRUD), second, a Safety and Trust Verification System with Employer Verification Badge, Report and Flag System, and Bidirectional Rating and Review System; third, a digital Work History Profile, with an Auto-Generate Resume feature using a JavaScript-based Portable Document Format (PDF) generation library, jsPDF; and fourth, multilingual access with Google Translate integration.

The system is developed over 26 weeks in a Hybrid Agile-Waterfall model, with a structured planning phase in Final Year Project 1 (FYP1) and six iterative development sprints in Final Year Project 2 (FYP2). The study uses the Technology Acceptance Model (TAM) as a theoretical framework and a literature review of empirical studies on the gig economy in Malaysia. JobStreet, GoGet and Troopers are also reviewed for comparison purposes. The following are documented in the process of the research: Working prototype, system architecture, database design, functional and non-functional requirements.

# LIST OF TABLES

| Table 1.1: Core Features | 9 |
| --- | --- |
| Table 1.2: Optional Features | 10 |
| Table 1.3: Project Schedule Summary | 24 |
| Table 1.4: Project Milestones | 27 |
| Table 1.5: Sprint Breakdown and Deliverables | 29 |
| Table 1.6: Final Deliverables | 30 |
| Table 1.7: Summary of Constraints | 34 |
| Table 1.8: Summary of Limitations | 38 |
| Table 2.1: TAM Application to EasyEarn Features by User Group | 45 |
| Table 2.2: Summary of Empirical Evidence | 61 |
| Table 2.3: Feature Comparison of Job Platforms and EasyEarn | 74 |
| Table 2.4: EasyEarn Conceptual Framework | 78 |
| Table 3.1: Structure of the User Requirement Questionnaire | 90 |
| Table 3.2: Hybrid Model Workflow of EasyEarn | 110 |
| Table 3.3: Sprint Structure of EasyEarn | 112 |
| Table 3.4: Project Phases and Sprint Breakdown of EasyEarn | 116 |
| Table 3.5: Tools and Technologies of EasyEarn | 120 |
| Table 3.6: Risk Management | 121 |
| Table 3.7: Hardware Requirements | 125 |
| Table 3.8: Functional Requirements | 126 |
| Table 3.9: Non-Functional Requirements | 128 |
| Table 3.10: Data Dictionary - users | 141 |
| Table 3.11: Data Dictionary - job_listings | 144 |
| Table 3.12: Data Dictionary - applications | 145 |
| Table 3.13: Data Dictionary - payments | 146 |
| Table 3.14: Data Dictionary - ratings | 148 |
| Table 3.15: Data Dictionary - reports | 149 |
| Table 3.16: Data Dictionary - saved_jobs | 150 |
| Table 3.17: Data Dictionary - work_history | 151 |
| Table 3.18: Data Dictionary - notifications | 152 |
| Table 3.19: Data Dictionary - chatbot_knowledge | 153 |
| Table 3.20: Data Dictionary - chatbot_logs | 154 |
| Table 3.21: Data Dictionary - analytics | 155 |
| Table 4.1: Page Distribution by role/section | 236 |
| Table 4.2: Layered Access Control in EasyEarn | 238 |
| Table 4.3: EasyEarn Database Tables and Purpose | 239 |
| Table 4.4: Imported Packages and Third-party Libraries Used in EasyEarn | 240 |
| Table 4.5: Heuristic Evaluation Results | 260 |
| Table 4.6: Identified Usability Issues and Solutions | 262 |
| Table 4.7: Comparison for the Two Higher-Impact Issues | 264 |
| Table 4.8: Heuristics and Issues Found | 265 |

# LIST OF FIGURES

| Figure 1.1: Problem Statement of EasyEarn | 5 |
| --- | --- |
| Figure 1.2: Objectives of EasyEarn | 7 |
| Figure 1.3: Project Coverage of EasyEarn | 8 |
| Figure 1.4: Features of EasyEarn | 11 |
| Figure 1.5: Excluded Features of EasyEarn | 13 |
| Figure 1.6: Regulatory Framework of EasyEarn | 15 |
| Figure 1.7: Technical Security Measures for EasyEarn | 17 |
| Figure 1.8: Benefits of EasyEarn | 19 |
| Figure 1.9: Significance of EasyEarn | 21 |
| Figure 1.10: Work Breakdown Structure (WBS) | 23 |
| Figure 1.11: Gantt Chart (1) | 26 |
| Figure 1.12: Gantt Chart (2) | 26 |
| Figure 1.13: Gantt Chart (3) | 26 |
| Figure 1.14: Gantt Chart (4) | 27 |
| Figure 1.15: Gantt Chart (5) | 27 |
| Figure 1.16: Project Constraints of EasyEarn | 35 |
| Figure 1.17: System Limitations of EasyEarn | 39 |
| Figure 2.1: The Original Technology Acceptance Model (TAM) | 43 |
| Figure 2.2: Application of TAM | 47 |
| Figure 2.3: Limitations of TAM and Supplementary Considerations | 48 |
| Figure 2.4: Malaysia's Gig Economy Landscape | 51 |
| Figure 2.5: Risks of Informal Gig Channels and Solutions | 53 |
| Figure 2.6: The Absence of Verifiable Work Histories of Gig Workers | 55 |
| Figure 2.7: Language Accessibility | 56 |
| Figure 2.8: Flexible Work and Underserved Demographics | 58 |
| Figure 2.9: Inefficient SME Recruitment and Short-Term Hiring Challenges | 60 |
| Figure 2.10: Web-Based Application Development | 64 |
| Figure 2.11: Client-Side PDF Generation | 65 |
| Figure 2.12: Data Visualisation | 66 |
| Figure 2.13: Multilingual Accessibility | 67 |
| Figure 2.14: Review of Selected Tools and Platforms | 68 |
| Figure 2.15: Full-Time Employment Portals | 72 |
| Figure 2.16: Task-Based Gig Platform | 73 |
| Figure 2.17: International Gig Platform | 74 |
| Figure 2.18: EasyEarn Conceptual Framework | 79 |
| Figure 3.1: Research Questions of EasyEarn | 83 |
| Figure 3.2: Research Approach Flow of the Study | 85 |
| Figure 3.3: Research Design of the Study | 86 |
| Figure 3.4: Population and Sampling Process of the Study | 88 |
| Figure 3.5: EasyEarn User Requirement Survey Questionnaire | 96 |
| Figure 3.6: Data Analysis Process of the Study | 99 |
| Figure 3.7: Validity, Reliability and Research Ethics of the Study | 101 |
| Figure 3.8: Distribution of Respondents by Intended Platform Role | 102 |
| Figure 3.9: Difficulty in Finding Suitable Short-Term Jobs or Workers | 103 |
| Figure 3.10: Problems in Short-Term Job Search and Hiring | 103 |
| Figure 3.11: Importance Ratings of Proposed EasyEarn Features | 104 |
| Figure 3.12: Most Important Factor When Using a Short-Term Job Platform | 105 |
| Figure 3.13: Hybrid Agile-Waterfall Methodology Diagram | 107 |
| Figure 3.14: Visual Overview of Technology Stack | 119 |
| Figure 3.15: Risk Assessment and Mitigation Plan | 124 |
| Figure 3.16: Ethical and Legal Considerations | 132 |
| Figure 3.17: System Architecture Diagram | 135 |
| Figure 3.18: System Module Diagram | 136 |
| Figure 3.19: Entity-Relationship Diagram (ERD) | 140 |
| Figure 3.20: Use Case Diagram | 157 |
| Figure 3.21: Full System Workflow | 159 |
| Figure 3.22: Job Seeker System Workflow | 160 |
| Figure 3.23: Employer System Workflow | 161 |
| Figure 3.24: Admin System Workflow | 162 |
| Figure 3.25: Wireframe for Landing Page (Index) | 165 |
| Figure 3.26: Wireframe for Registration Page | 166 |
| Figure 3.27: Wireframe for Login Page | 167 |
| Figure 3.28: Wireframe for Job Listing Page | 169 |
| Figure 3.29: Wireframe for Job Seeker Dashboard | 170 |
| Figure 3.30: Wireframe for Job Seeker Resume Builder (Auto-Generated) | 172 |
| Figure 3.31: Wireframe for Employer Dashboard | 173 |
| Figure 3.32: Wireframe for Employer Manage Jobs | 175 |
| Figure 3.33: Wireframe for Employer Applicants | 176 |
| Figure 3.34: Wireframe for Admin Dashboard | 178 |
| Figure 3.35: Wireframe for Admin Job Listing Moderation | 179 |
| Figure 3.36: Landing Page (Index) | 183 |
| Figure 3.37: About Us Page | 185 |
| Figure 3.38: Help Center Page | 187 |
| Figure 3.39: Browse Job Page | 188 |
| Figure 3.40: Report Page | 189 |
| Figure 3.41: Security Page | 191 |
| Figure 3.42: Chatbot Page | 192 |
| Figure 3.43: Google Translate Website | 193 |
| Figure 3.44: Registration Page | 194 |
| Figure 3.45: Login Page | 195 |
| Figure 3.46: Forgot Password Page | 196 |
| Figure 3.47: Password Reset Email | 196 |
| Figure 3.48: Logout Page | 197 |
| Figure 3.49: Job Seeker Dashboard | 199 |
| Figure 3.50: Jobs Page (Browse Jobs Tab) | 201 |
| Figure 3.51: Jobs Page (Saved Jobs Tab) | 202 |
| Figure 3.52: My Applications Page | 204 |
| Figure 3.53: Report Employer | 205 |
| Figure 3.54: Job Seeker Messages Page | 206 |
| Figure 3.55: Interviews Page | 207 |
| Figure 3.56: Work History Page | 209 |
| Figure 3.57: Resume Page | 210 |
| Figure 3.58: Job Seeker Profile Page | 212 |
| Figure 3.59: Employer Dashboard | 214 |
| Figure 3.60: Manage Jobs Page | 216 |
| Figure 3.61: Applicants Page | 217 |
| Figure 3.62: Employer Messages Page | 218 |
| Figure 3.63: Verification Page | 219 |
| Figure 3.64: Rating Page | 220 |
| Figure 3.65: Employer Profile Page | 221 |
| Figure 3.66: Admin Dashboard | 223 |
| Figure 3.67: Admin User Page | 224 |
| Figure 3.68: Admin Jobs Page | 225 |
| Figure 3.69: Admin Reports Page | 226 |
| Figure 3.70: Admin Messages Page | 227 |
| Figure 3.71: Admin Verifications Review Page | 229 |
| Figure 3.72: Admin Chatbot Knowledge Management Page | 230 |
| Figure 3.73: Admin Analytics Page | 232 |
| Figure 3.74: Admin Profile Page | 233 |
| Figure 4.1: GitHub Pages Deployment History | 246 |
| Figure 4.2: EasyEarn System Testing Summary | 247 |
| Figure 4.3: Hire-to-completion flow | 248 |
| Figure 4.4: Application CRUD and openings_count trigger | 249 |
| Figure 4.5: Concurrent Application Race Condition | 250 |
| Figure 4.6: Failed Application Submission Rollback | 251 |
| Figure 4.7: Application Status Transition Constraints | 252 |
| Figure 4.8: Admin Analytics Dashboard Accuracy | 253 |
| Figure 4.9: PDPA-aligned Document Handling | 254 |
| Figure 4.10: Summary of UAT | 256 |
| Figure 4.11: Job Seeker - Job Application | 257 |
| Figure 4.12: Employer - View Applicants | 258 |
| Figure 4.13: Admin - Flag/Remove Job | 259 |
| Figure 4.14: EasyEarn Security Testing Summary | 268 |
| Figure 4.15: RLS - Data Isolation (Seeker Application Read Isolation) | 269 |
| Figure 4.16: Auth & Access Control - Admin Page Access Restriction | 270 |
| Figure 4.17: Upload Security - File Type and Size Restrictions | 271 |
| Figure 4.18: Input Sanitisation - XSS Prevention | 272 |
| Figure 4.19: Rating & Business Rules - Rating Eligibility Guard | 273 |
| Figure 4.20: Report Security - Report Read Isolation | 274 |
| Figure 4.21: Analytics & Chatbot - Analytics Access Restriction | 275 |
| Figure 4.22: PDPA & Compliance - Job Listing Data Minimisation | 276 |
| Figure 4.23: EasyEarn Compatibility Testing Summary | 277 |
| Figure 4.24: Browser Compatibility - CSS Layout Rendering | 278 |
| Figure 4.25: Responsive Design - Layout Breakpoints | 279 |
| Figure 4.26: Feature Compatibility - Google Translate Integration | 280 |
| Figure 4.27: Session & Auth - Cross-tab Logout | 281 |
| Figure 4.28: UI & Display - Long Text Overflow Handling | 282 |
| Figure 4.29: Form & Input - Interview Date/Time Picker | 283 |
| Figure 4.30: Supabase Analytics Table | 285 |
| Figure 4.31: Auto-Generated Resume Output (PDF) | 287 |
| Figure 5.1: Summary of Findings for RQ1 and Objective 1 | 292 |
| Figure 5.2: Summary of Findings for RQ2 and Objective 2 | 293 |
| Figure 5.3: Summary of Findings for RQ3 and Objective 3 | 295 |
| Figure 5.4: Summary of Findings for RQ4 and Objective 4 | 296 |
| Figure 5.5: Limitation – Residual Security Risks | 299 |
| Figure 5.6: Limitation – Testing Methodology Limitations | 300 |
| Figure 5.7: Limitation – Scope Limitations | 302 |
| Figure 5.8: Contribution of the Project | 304 |
| Figure 5.9: Future Enhancement | 306 |
| Figure A3.1: Job Seeker Registration to Application | 316 |
| Figure A3.2: Employer Registration to Applicant Review | 317 |
| Figure A3.3: Admin Moderation Lifecycle | 317 |
| Figure A3.4: Payment Lifecycle | 318 |
| Figure A3.5: Payment Dispute and Resolution | 318 |
| Figure A3.6: New-application Notification Trigger | 319 |
| Figure A3.7: Employer Verification Workflow | 320 |
| Figure A3.8: Messaging Integration | 321 |
| Figure A3.9: Chatbot Knowledge Base Integration | 321 |
| Figure A3.10: Saved Jobs Integration | 322 |
| Figure A3.11: Jobs Page Load and Filter Performance | 323 |
| Figure A3.12: PDF Resume Generation Performance | 323 |
| Figure A3.13: Admin Analytics Dashboard Render Time | 324 |
| Figure A3.14: Supabase Connectivity Loss Handling | 325 |
| Figure A3.15: Session Expiry and Re-authentication | 326 |
| Figure A3.16: Duplicate Payment Prevention on Retry | 326 |
| Figure A3.17: Match Score Calculation Accuracy | 327 |
| Figure A3.18: Location-distance Bonus and Match Cap | 328 |
| Figure A3.19: Bidirectional Rating Eligibility | 329 |
| Figure A3.20: Admin Moderation Queue Classification | 330 |
| Figure A3.21: Employer Verification Badge Visibility | 331 |
| Figure A3.22: Job Listing Report Feature | 332 |
| Figure A3.23: Work History and Earnings Report | 332 |
| Figure A3.24: Employer Job Posting Performance View | 333 |
| Figure A3.25: Privacy Policy and Terms of Service Accessibility | 334 |
| Figure A3.26: Admin Audit Trail for Account Decisions | 335 |
| Figure A3.27: Gig Workers Act 2025 Compliance Reminders | 336 |
| Figure A4.1: Job Seeker - Registration and Login | 337 |
| Figure A4.2: Job Seeker - Dashboard | 338 |
| Figure A4.3: Job Seeker - Job Search and Browse | 339 |
| Figure A4.4: Job Seeker - Saved Jobs | 339 |
| Figure A4.5: Job Seeker - In-Progress Work | 340 |
| Figure A4.6: Job Seeker - Interviews | 341 |
| Figure A4.7: Job Seeker - Work History | 341 |
| Figure A4.8: Job Seeker - Resume Management | 342 |
| Figure A4.9: Job Seeker - Messages | 343 |
| Figure A4.10: Job Seeker - Profile Management | 343 |
| Figure A4.11: Job Seeker - Logout and Session | 344 |
| Figure A4.12: Employer - Registration and Login | 345 |
| Figure A4.13: Employer - Dashboard | 346 |
| Figure A4.14: Employer - Post Job | 346 |
| Figure A4.15: Employer - Manage Jobs | 347 |
| Figure A4.16: Employer - Shortlist/Accept Applicant | 348 |
| Figure A4.17: Employer - Ratings | 348 |
| Figure A4.18: Employer - Messages | 349 |
| Figure A4.19: Employer - Profile Management | 350 |
| Figure A4.20: Employer - Verification | 350 |
| Figure A4.21: Employer - Job Completion Confirmation | 351 |
| Figure A4.22: Employer - Logout and Session | 351 |
| Figure A4.23: Admin - Login | 352 |
| Figure A4.24: Admin - Dashboard Overview | 353 |
| Figure A4.25: Admin - Lock/Unlock (Employer Account) | 353 |
| Figure A4.26: Admin - Lock/Unlock (Job Seeker Account) | 354 |
| Figure A4.27: Admin - Approve Job | 354 |
| Figure A4.28: Admin - Verifications | 355 |
| Figure A4.29: Admin - Reports | 356 |
| Figure A4.30: Admin - Analytics | 356 |
| Figure A4.31: Admin - Messages/Support | 357 |
| Figure A4.32: Admin - Profile Management | 357 |
| Figure A4.33: Admin - Logout and Session | 358 |
| Figure A5.1: RLS - Data Isolation (Seeker Application Update Isolation) | 360 |
| Figure A5.2: RLS - Data Isolation (Notification Read Isolation) | 360 |
| Figure A5.3: RLS - Data Isolation (Job Listing Update Isolation) | 361 |
| Figure A5.4: RLS - Data Isolation (Verification Document Access) | 362 |
| Figure A5.5: RLS - Data Isolation (Payment Insert Restriction) | 362 |
| Figure A5.6: RLS - Data Isolation (Payment Confirmation Isolation) | 363 |
| Figure A5.7: RLS - Data Isolation (Saved Job Delete Isolation) | 364 |
| Figure A5.8: RLS - Data Isolation (User Profile Update Isolation) | 364 |
| Figure A5.9: RLS - Data Isolation (Application Status Field Restriction) | 365 |
| Figure A5.10: RLS - Data Isolation - Work History Read Isolation | 366 |
| Figure A5.11: Auth & Access Control - Cross-role Data Access | 367 |
| Figure A5.12: Auth & Access Control - Registration Role-gating | 367 |
| Figure A5.13: Auth & Access Control - Password Policy Enforcement | 368 |
| Figure A5.14: Auth & Access Control - Session Expiry Handling | 369 |
| Figure A5.15: Input Sanitisation - SQL Injection Resistance | 370 |
| Figure A5.16: Rating & Business Rules - Self-rating Prevention | 371 |
| Figure A5.17: Report Security - Unauthenticated Submission Block | 372 |
| Figure A5.18: Analytics & Chatbot - Chatbot Log Access Restriction | 373 |
| Figure A5.19: PDPA & Compliance - Verification Document Exposure | 374 |
| Figure A5.20: PDPA & Compliance - Verification Status Update Restriction | 374 |
| Figure A5.21: PDPA & Compliance - Closed Listing Removal | 375 |
| Figure A6.1: Browser Compatibility - JavaScript Feature Support | 376 |
| Figure A6.2: Browser Compatibility - PDF Resume Generation | 377 |
| Figure A6.3: Browser Compatibility - Chart.js Analytics Rendering | 377 |
| Figure A6.4: Responsive Design - Mobile Touch Interactions | 378 |
| Figure A6.5: Responsive Design - Mobile Content Display | 379 |
| Figure A6.6: Responsive Design - Form Validation Consistency | 380 |
| Figure A6.7: Responsive Design - Mobile Filter Functionality | 380 |
| Figure A6.8: Feature Compatibility - Dark Mode Across Role Dashboards | 381 |
| Figure A6.9: Feature Compatibility - Floating Chatbot Widget | 382 |
| Figure A6.10: Feature Compatibility - File Upload for Verification | 382 |
| Figure A6.11: Feature Compatibility - Notification Bell Updates | 383 |
| Figure A6.12: Feature Compatibility - Admin Analytics Data Consistency | 384 |
| Figure A6.13: Session & Auth - Cross-tab Session Persistence | 385 |
| Figure A6.14: UI & Display - Cross-OS Font Rendering | 386 |
| Figure A6.15: UI & Display - Image Upload Preview | 386 |
| Figure A6.16: Form & Input - File Size and Type Validation | 387 |
| Figure A6.17: Form & Input - Password Field Masking | 388 |

# LIST OF ABBREVIATIONS

| AI | Artificial Intelligence |
| --- | --- |
| API | Application Programming Interface |
| BaaS | Backend-as-a-Service |
| BIT | Bachelor of Information Technology |
| BIU | Behavioural Intention to Use |
| CDN | Content Delivery Network |
| CRUD | Create, Read, Update, Delete |
| COVID-19 | Coronavirus Disease 2019 |
| CSS | Cascading Style Sheets |
| CT | Compatibility Testing |
| DOM | Document Object Model |
| EPF | Employees Provident Fund |
| ERD | Entity-Relationship Diagram |
| ES | ECMAScript |
| E2E | End-to-End |
| FAQ | Frequently Asked Questions |
| FK | Foreign Key |
| FR | Functional Requirement |
| FYP | Final Year Project |
| GB | Gigabyte |
| GHz | Gigahertz |
| HTML | HyperText Markup Language |
| HTTP | Hypertext Transfer Protocol |
| HTTPS | Hypertext Transfer Protocol Secure |
| ID | Identifier |
| IEC | International Electrotechnical Commission |
| IEEE | Institute of Electrical and Electronics Engineers |
| ILO | International Labour Organisation |
| ISO | International Organization for Standardization |
| ISTQB | International Software Testing Qualifications Board |
| JS | JavaScript |
| JSON | JavaScript Object Notation |
| JWT | JSON Web Token |
| KYB | Know Your Business |
| LLM | Large Language Model |
| MB | Megabyte |
| MCMC | Malaysian Communications and Multimedia Commission |
| MDEC | Malaysia Digital Economy Corporation |
| MDN | Mozilla Developer Network |
| MIME | Multipurpose Internet Mail Extensions |
| MYR | Malaysian Ringgit |
| NFR | Non-Functional Requirement |
| OECD | Organisation for Economic Co-operation and Development |
| OWASP | Open Web Application Security Project |
| OS | Operating System |
| PDPA | Personal Data Protection Act |
| PDF | Portable Document Format |
| PEOU | Perceived Ease of Use |
| PERKESO | Pertubuhan Keselamatan Sosial (Social Security Organisation) |
| PK | Primary Key |
| PMI | Project Management Institute |
| PT | Perceived Trust |
| PU | Perceived Usefulness |
| QA | Quality Assurance |
| QR | Quick Response |
| RAM | Random Access Memory |
| RBAC | Role-Based Access Control |
| RLS | Row Level Security |
| RM | Ringgit Malaysia |
| SEC | Security Testing |
| SESS | Self-Employment Social Security Scheme |
| SME | Small and Medium Enterprises |
| SOCSO | Social Security Organisation |
| SQL | Structured Query Language |
| SSD | Solid State Drive |
| SSM | Suruhanjaya Syarikat Malaysia (Companies Commission of Malaysia) |
| ST | System Testing |
| SVG | Scalable Vector Graphics |
| TAM | Technology Acceptance Model |
| TBTAM | Trust-Based Technology Acceptance Model |
| TRA | Theory of Reasoned Action |
| UAT | User Acceptance Testing |
| UI | User Interface |
| UML | Unified Modelling Language |
| URL | Uniform Resource Locator |
| UNCDF | United Nations Capital Development Fund |
| UTAUT | Unified Theory of Acceptance and Use of Technology |
| UUID | Universally Unique Identifier |
| UX | User Experience |
| WBS | Work Breakdown Structure |
| XSS | Cross-Site Scripting |
