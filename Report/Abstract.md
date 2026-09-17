# ABSTRACT

In Malaysia, the gig economy has expanded in size significantly with a greater need for flexible and short-term job opportunities. There are also fewer opportunities for organised gig platforms, however, in smaller towns like Ipoh, Kangar, Alor Setar, Kota Bharu and Kuala Terengganu for users to access to find structured gigs. Lack of access to formal job seeking methods may also lead to problems of employment trust, language accessibility, or lack of documentation of work experience. This report introduces a HyperText Markup Language (HTML), Cascading Style Sheets (CSS), JavaScript, and Supabase-based web app lication called EasyEarn, which aims to fill this service gap by offering a job-matching portal. It includes four key features: first, a multi-user job-matching portal and role-based dashboards with full Create, Read, Update, Delete (CRUD), second, a Safety and Trust Verification System with Employer Verification Badge, Report and Flag System, and Bidirectional Rating and Review System; third, a digital Work History Profile, with an Auto-Generate Resume feature using a JavaScript-based Portable Document Format (PDF) generation library, jsPDF; and fourth, multilingual access with Google Translate Website Redirection. The system is developed over 26 weeks in a Hybrid Agile-Waterfall model, with a structured planning phase in Final Year Project 1 (FYP1) and six iterative development sprints in Final Year Project 2 (FYP2). The study uses the Technology Acceptance Model (TAM) as a theoretical framework and a literature review of empirical studies on the gig economy in Malaysia. JobStreet, GoGet and Troopers are also reviewed for comparison purposes. The following are documented in the process of the research: Working prototype, system architecture, database design, functional and non-functional requirements.

# TABLE OF CONTENTS

ACKNOWLEDGEMENT i ABSTRACT ii PRELIMINARY PAGES TABLE OF CONTENTS iii LIST OF TABLES xiv LIST OF FIGURES xvi LIST OF ABBREVIATIONS xxiv CHAPTER 1

# Chapter 1: Project Introduction 1

## 1.1 Introduction 1

## 1.2 Problem Statement 2

## 1.3 Research Questions and Research Objectives 7

### 1.3.1 Research Questions 7

### 1.3.2 Research Objectives 8

## 1.4 Scope of Project 10

### 1.4.1 Project Coverage 10

### 1.4.2 Complete Features List 12

### 1.4.3 Excluded Features 14

### 1.4.4 Information Security and Policies 16

#### 1.4.4.1 Regulatory Framework 17

#### 1.4.4.2 Technical Security Measures 19

## 1.5 Significance of the Study 20

### 1.5.1 Benefits 20

### 1.5.2 Significance 22

## 1.6 Milestones and Deliverables 25

### 1.6.1 Work Breakdown Structure (WBS) 26

### 1.6.2 Project Schedule 27

### 1.6.3 Gantt Chart 28

### 1.6.4 Project Milestones 30

### 1.6.5 Sprint Breakdown and Deliverables 32

### 1.6.6 Final Deliverables 33

## 1.7 Thesis Overview 34

## 1.8 Constraints and Limitations 35

### 1.8.1 Project Constraints 36

### 1.8.2 System Limitations 39

## 1.9 Conclusion 43

CHAPTER 2

# Chapter 2: Literature Review 44

## 2.1 Introduction 44

## 2.2 Theoretical Framework 45

### 2.2.1 The Technology Acceptance Model (TAM) 46

### 2.2.2 Application of TAM to EasyEarn 48

### 2.2.3 Limitations of TAM and Supplementary Considerations 51

## 2.3 Empirical Review 53

### 2.3.1 The Gig Economy in Malaysia 53

### 2.3.2 Employment Fraud and the Risks of Informal Job-Seeking Channels 55

### 2.3.3 The Absence of Verifiable Work Histories for Gig Workers 57

### 2.3.4 Language Barriers and Digital Exclusion in Malaysian Gig Platforms 59

### 2.3.5 Flexible Work and Underserved Demographics 61

### 2.3.6 Inefficient SME Recruitment and Short-Term Hiring Challenges 63

### 2.3.7 Synthesis of Empirical Evidence 65

## 2.4 Review of Relevant Technologies 68

### 2.4.1 Web-Based Application Development 68

### 2.4.2 Client-Side PDF Generation via jsPDF 69

### 2.4.3 Data Visualisation via Chart.js 71

### 2.4.4 Multilingual Accessibility: Google Translate Website Redirection 72

## 2.5 Review of Selected Tools and Platforms 73

### 2.5.1 Supabase: Open-Source BaaS 74

### 2.5.2 GitHub Pages: Static Site Hosting 75

### 2.5.3 Canva: User Interface (UI)/ User Experience (UX) Wireframing and

Prototyping 76

## 2.6 Review of Similar Systems 76

### 2.6.1 Full-Time Employment Portals: JobStreet and RiceBowl 77

### 2.6.2 Task-Based Gig Platforms: GoGet and Troopers 78

### 2.6.3 International Gig Platforms: Fiverr, TaskRabbit, and Upwork 80

### 2.6.4 Comparison Feature Gap Analysis 81

### 2.6.5 Research Gap 83

## 2.7 Conceptual Framework 84

## 2.8 Conclusion 87

CHAPTER 3

# Chapter 3: Research Methodology 88

## 3.1 Introduction 88

## 3.2 Research Methodology 89

### 3.2.1 Alignment of Research Questions with Methodology 90

### 3.2.2 Research Approach 92

### 3.2.3 Research Design 94

### 3.2.4 Population and Sampling 95

### 3.2.5 Data Collection Method 97

### 3.2.6 Research Instrument: Questionnaire Design 98

### 3.2.7 Data Analysis 100

### 3.2.8 Validity, Reliability and Research Ethics 102

### 3.2.9 Summary of User Requirement Survey Findings 105

## 3.3 System Development Methodology 109

### 3.3.1 Hybrid Development Approach 109

### 3.3.2 Rationale for Adopting a Hybrid Development Approach 110

### 3.3.3 Waterfall Phase (FYP1, Weeks 1-8) 111

### 3.3.4 Agile Phase (FYP2, Weeks 9-20) 112

### 3.3.5 Hybrid Model Workflow 113

### 3.3.6 Sprint Structure 114

### 3.3.7 Sprint Management Practices 115

### 3.3.8 Risk Mitigation Through the Hybrid Approach 116

### 3.3.9 System Evaluation Methodology 117

## 3.4 Project Phases and Sprint Breakdown 118

## 3.5 Tools and Technologies 121

## 3.6 Planning 123

### 3.6.1 Risk Management 123

## 3.7 Hardware Requirements 126

## 3.8 Software Requirements 127

### 3.8.1 Functional Requirements 127

### 3.8.2 Non-Functional Requirements 130

### 3.8.3 Ethical and Legal Considerations 131

## 3.9 System Design 134

### 3.9.1 Framework 134

### 3.9.2 System Architecture 135

### 3.9.3 System Modules and Functionality 138

### 3.9.4 Database Design 141

### 3.9.5 Data Dictionary 143

3.9.5.1 users 143 3.9.5.2 job_listings 145 3.9.5.3 applications 146 3.9.5.4 payments 148 3.9.5.5 ratings 149 3.9.5.6 reports 150 3.9.5.7 saved_jobs 151 3.9.5.8 work_history 152 3.9.5.9 notifications 153 3.9.5.10 chatbot_knowledge 154 3.9.5.11 chatbot_logs 155 3.9.5.12 analytics 156

### 3.9.6 Use Case Diagram 157

### 3.9.7 System Flow 159

## 3.10 Wireframe 163

### 3.10.1 Landing Page (Index) 163

### 3.10.2 Registration Page 165

### 3.10.3 Login Page 167

### 3.10.4 Job Listing Page 168

### 3.10.5 Job Seeker Dashboard 169

### 3.10.6 Job Seeker Resume Builder 170

### 3.10.7 Employer Dashboard 172

### 3.10.8 Employer Manage Jobs 174

### 3.10.9 Employer Applicants 175

### 3.10.10 Admin Dashboard 177

### 3.10.11 Admin Job Listing Moderation 178

## 3.11 User Interface (UI) 179

### 3.11.1 Landing Page (Index) 180

### 3.11.2 About Us Page 183

### 3.11.3 Help Center Page 186

### 3.11.4 Browse Job Page 187

### 3.11.5 Report Page 188

### 3.11.6 Security Page 190

### 3.11.7 Chatbot Page 191

### 3.11.8 Google Translate Website 192

### 3.11.9 Registration Page 193

### 3.11.10 Login Page 194

### 3.11.11 Forgot Password Page 195

### 3.11.12 Password Reset Email 196

### 3.11.13 Logout Page 197

### 3.11.14 Job Seeker 197

#### 3.11.14.1 Job Seeker Dashboard 198

#### 3.11.14.2 Jobs Page 199

#### 3.11.14.3 My Application Page 202

##### 3.11.14.3.1 Report Employer 204

#### 3.11.14.4 Job Seeker Messages Page 205

#### 3.11.14.5 Interviews Page 206

#### 3.11.14.6 Work History Page 207

#### 3.11.14.7 Resume Page 209

#### 3.11.14.8 Job Seeker Profile Page 210

### 3.11.15 Employer 212

#### 3.11.15.1 Employer Dashboard 213

#### 3.11.15.2 Manage Jobs Page 214

#### 3.11.15.3 Applicants Page 216

#### 3.11.15.4 Employer Messages Page 217

#### 3.11.15.5 Verification Page 218

#### 3.11.15.6 Rating Page 219

#### 3.11.15.7 Employer Profile Page 220

### 3.11.16 Admin 221

#### 3.11.16.1 Admin Dashboard 222

#### 3.11.16.2 Admin Users Page 223

#### 3.11.16.3 Admin Jobs Page 224

#### 3.11.16.4 Admin Reports Page 226

#### 3.11.16.5 Admin Messages Page 227

#### 3.11.16.6 Admin Verifications Review Page 228

#### 3.11.16.7 Admin Chatbot Knowledge Management Page 229

#### 3.11.16.8 Admin Analytics Page 230

#### 3.11.16.9 Admin Profile Page 232

## 3.12 Conclusion 233

CHAPTER 4

# Chapter 4: Implementation 235

## 4.1 Introduction 235

## 4.2 Implementation 236

### 4.2.1 Frontend 236

### 4.2.2 Backend 237

### 4.2.3 Database 239

### 4.2.4 Imported Packages 240

### 4.2.5 System Deployment 242

## 4.3 Testing 243

### 4.3.1 System Testing 243

#### 4.3.1.1 End-to-End Workflow 244

#### 4.3.1.2 Integration 245

#### 4.3.1.3 Performance 246

#### 4.3.1.4 Recovery 247

#### 4.3.1.5 Business Logic 248

#### 4.3.1.6 Reporting 249

#### 4.3.1.7 Compliance 250

### 4.3.2 User Acceptance Testing (UAT) 251

#### 4.3.2.1 Job Seeker UAT 253

#### 4.3.2.2 Employer UAT 254

#### 4.3.2.3 Admin UAT 255

### 4.3.3 Usability Testing 257

#### 4.3.3.1 Justification for Non-Violations 262

### 4.3.4 Security Testing 264

#### 4.3.4.1 Row Level Security (RLS) - Data Isolation 265

#### 4.3.4.2 Auth & Access Control 266

#### 4.3.4.3 Upload Security 267

#### 4.3.4.4 Input Sanitisation 268

#### 4.3.4.5 Rating & Business Rules 269

#### 4.3.4.6 Report Security 270

#### 4.3.4.7 Analytics & Chatbot 271

#### 4.3.4.8 PDPA & Compliance 272

### 4.3.5 Compatibility Testing 273

#### 4.3.5.1 Browser Compatibility 274

#### 4.3.5.2 Responsive Design 275

#### 4.3.5.3 Feature Compatibility 276

#### 4.3.5.4 Session & Auth 277

#### 4.3.5.5 UI & Display 278

#### 4.3.5.6 Form & Input 279

### 4.3.6 Requirements Traceability and Verification Summary 280

## 4.4 Output Analysis 283

### 4.4.1 Admin Analytics Dashboard Output 283

### 4.4.2 Auto-Generated Resume Output 285

## 4.5 Conclusion 286

CHAPTER 5

# Chapter 5: Discussion and Conclusion 289

## 5.1 Introduction 289

## 5.2 Findings 289

### 5.2.1 RQ1 and Objective 1: A Multi-User Job-Matching Platform 290

### 5.2.2 RQ2 and Objective 2: A Safety and Trust Verification System 291

### 5.2.3 RQ3 and Objective 3: A Verifiable Digital Work History 293

### 5.2.4 RQ4 and Objective 4: Multilingual Accessibility 295

### 5.2.5 Overall Objective Achievement Summary 296

## 5.3 Limitations 297

### 5.3.1 Residual Security Risks 298

### 5.3.2 Testing Methodology Limitations 300

### 5.3.3 Scope Limitations 301

## 5.4 Contribution of the Project 303

## 5.5 Future Enhancement 305

## 5.6 Conclusion 307

References 309 Appendix 317 Appendix 1: Google Form 317 Appendix 2: EasyEarn Job Matching Portal 323 Appendix 3: System Testing 324 Appendix 3.1 E2E Workflow 324 Appendix 3.2 Integration 328 Appendix 3.3 Performance 331 Appendix 3.4 Recovery 334 Appendix 3.5 Business Logic 336 Appendix 3.6 Reporting 340 Appendix 3.7 Compliance 342 Appendix 4: User Acceptance Testing (UAT) 345 Appendix 4.1: Job Seeker UAT 346 Appendix 4.2: Employer UAT 353 Appendix 4.3: Admin UAT 361 Appendix 5: Security Testing 368 Appendix 5.1: RLS-Data Isolation 368 Appendix 5.2: Auth & Access Control 375 Appendix 5.3: Upload Security 378 Appendix 5.4: Input Sanitisation 378 Appendix 5.5: Rating & Business Rules 379 Appendix 5.6: Report Security 380 Appendix 5.7: Analytics & Chatbot 381 Appendix 5.8: PDPA & Compliance 382 Appendix 6: Compatibility Testing 384 Appendix 6.1: Browser Compatibility 385 Appendix 6.2: Responsive Design 387 Appendix 6.3: Feature Compatibility 390 Appendix 6.4: Session & Auth 393 Appendix 6.5: UI & Display 394 Appendix 6.6: Form & Input 396 Appendix 7: GitHub Repository and Deployment 397

# LIST OF TABLES

**Table 1.1: Core Features 12**

**Table 1.2: Optional Features 13**

**Table 1.3: Project Schedule Summary 27**

**Table 1.4: Project Milestones 31**

**Table 1.5: Sprint Breakdown and Deliverables 32**

**Table 1.6: Final Deliverables 33**

**Table 1.7: Summary of Constraints 37**

**Table 1.8: Summary of Limitations 41**

**Table 2.1: TAM Application to EasyEarn Features by User Group 49**

**Table 2.2: Synthesis of Empirical Evidence 66**

**Table 2.3: Feature Comparison of Job Platforms and EasyEarn 82**

**Table 2.4: EasyEarn Conceptual Framework 85**

**Table 3.1: Structure of the User Requirement Questionnaire 99**

**Table 3.2: Hybrid Model Workflow of EasyEarn 113**

**Table 3.3: Sprint Structure of EasyEarn 114**

**Table 3.4: Project Phases and Sprint Breakdown of EasyEarn 118**

**Table 3.5: Tools and Technologies of EasyEarn 122**

**Table 3.6: Risk Management 123**

**Table 3.7: Hardware Requirements 127**

**Table 3.8: Functional Requirements 128**

**Table 3.9: Non-Functional Requirements 130**

**Table 3.10: Data Dictionary - users 143**

**Table 3.11: Data Dictionary - job_listings 145**

**Table 3.12: Data Dictionary - applications 147**

**Table 3.13: Data Dictionary - payments 148**

**Table 3.14: Data Dictionary - ratings 150**

**Table 3.15: Data Dictionary - reports 151**

**Table 3.16: Data Dictionary - saved_jobs 152**

**Table 3.17: Data Dictionary - work_history 152**

**Table 3.18: Data Dictionary - notifications 153**

**Table 3.19: Data Dictionary - chatbot_knowledge 154**

**Table 3.20: Data Dictionary - chatbot_logs 155**

**Table 3.21: Data Dictionary - analytics 156**

**Table 4.1: Page Distribution by role/section 236**

**Table 4.2: Layered Access Control in EasyEarn 238**

**Table 4.3: EasyEarn Database Tables and Purpose 239**

**Table 4.4: Imported Packages and Third-party Libraries Used in EasyEarn 241**

**Table 4.5: Heuristic Evaluation Results 257**

**Table 4.6: Identified Usability Issues and Solutions 259**

**Table 4.7: Comparison for the Two Higher-Impact Issues 260**

**Table 4.8: Heuristics and Issues Found 261**

**Table 4.9: Functional Requirements Verification Summary 281**

**Table 4.10: Non-Functional Requirements Verification Summary 282**

**Table 5.1: Overall Project Objective Achievement Summary 296**

# LIST OF FIGURES


Figure 1.1: Overview of the Gig Economy and EasyEarn in Malaysia 2


Figure 1.2: Problem Statement of EasyEarn 6


Figure 1.3: Research Questions of EasyEarn 8


Figure 1.4: Objectives of EasyEarn 10


Figure 1.5: Project Coverage of EasyEarn 11


Figure 1.6: Features of EasyEarn 14


Figure 1.7: Excluded Features of EasyEarn 16


Figure 1.8: Regulatory Framework of EasyEarn 18


Figure 1.9: Technical Security Measures of EasyEarn 20


Figure 1.10: Benefits of EasyEarn 22


Figure 1.11: Significance of EasyEarn 25


Figure 1.12: Work Breakdown Structure (WBS) 26


Figure 1.13: Gantt Chart (1) 29


Figure 1.14: Gantt Chart (2) 29


Figure 1.15: Gantt Chart (3) 29


Figure 1.16: Gantt Chart (4) 30


Figure 1.17: Gantt Chart (5) 30


Figure 1.18: Thesis Overview of EasyEarn 35


Figure 1.19: Project Constraints of EasyEarn 38


Figure 1.20: System Limitations of EasyEarn 42


Figure 2.1: Literature Review Overview of EasyEarn 45


Figure 2.2: The Original Technology Acceptance Model (TAM) 47


Figure 2.3: Application of TAM 51


Figure 2.4: Limitations of TAM and Supplementary Considerations 52


Figure 2.5: Malaysia's Gig Economy Landscape 55


Figure 2.6: Risks of Informal Gig Channels and Solutions 57


Figure 2.7: The Absence of Verifiable Work Histories of Gig Workers 59


Figure 2.8: Language Accessibility 61


Figure 2.9: Flexible Work and Underserved Demographics 63


Figure 2.10: Inefficient SME Recruitment and Short-Term Hiring Challenges 65


Figure 2.11: Web-Based Application Development 69


Figure 2.12: Client-Side PDF Generation 70


Figure 2.13: Data Visualisation 71


Figure 2.14: Multilingual Accessibility 73


Figure 2.15: Review of Selected Tools and Platforms 74


Figure 2.16: Full-Time Employment Portals 78


Figure 2.17: Task-Based Gig Platform 79


Figure 2.18: International Gig Platform 81


Figure 2.19: EasyEarn Conceptual Framework 86


Figure 3.1: Research and System Development Methodology for EasyEarn 89


Figure 3.2: Alignment of Research Questions, Problems and Objectives 91


Figure 3.3: Research Approach Flow of the Study 93


Figure 3.4: Research Design of the Study 95


Figure 3.5: Population and Sampling Process of the Study 97


Figure 3.6: Data Analysis Process of the Study 102


Figure 3.7: Validity, Reliability and Research Ethics of the Study 104


Figure 3.8: Distribution of Respondents by Intended Platform Role 105


Figure 3.9: Difficulty in Finding Suitable Short-Term Jobs or Workers 106


Figure 3.10: Problems in Short-Term Job Search and Hiring 106


Figure 3.11: Importance Ratings of Proposed EasyEarn Features 108


Figure 3.12: Most Important Factor When Using a Short-Term Job Platform 108


Figure 3.13: Hybrid Agile-Waterfall Methodology Diagram 110


Figure 3.14: Visual Overview of Technology Stack 121


Figure 3.15: Risk Assessment Matrix 126


Figure 3.16: Ethical and Legal Considerations 134


Figure 3.17: System Architecture Diagram 137


Figure 3.18: System Module Diagram 138


Figure 3.19: Entity-Relationship Diagram (ERD) 142


Figure 3.20: Use Case Diagram 158


Figure 3.21: Full System Workflow 159


Figure 3.22: Job Seeker System Workflow 160


Figure 3.23: Employer System Workflow 161


Figure 3.24: Admin System Workflow 162


Figure 3.25: Wireframe for Landing Page (Index) 165


Figure 3.26: Wireframe for Registration Page 166


Figure 3.27: Wireframe for Login Page 167


Figure 3.28: Wireframe for Job Listing Page 169


Figure 3.29: Wireframe for Job Seeker Dashboard 170


Figure 3.30: Wireframe for Job Seeker Resume Builder (Auto-Generated) 172


Figure 3.31: Wireframe for Employer Dashboard 173


Figure 3.32: Wireframe for Employer Manage Jobs 175


Figure 3.33: Wireframe for Employer Applicants 176


Figure 3.34: Wireframe for Admin Dashboard 178


Figure 3.35: Wireframe for Admin Job Listing Moderation 179


Figure 3.36: Landing Page (Index) 183


Figure 3.37: About Us Page 185


Figure 3.38: Help Center Page 187


Figure 3.39: Browse Job Page 188


Figure 3.40: Report Page 189


Figure 3.41: Security Page 191


Figure 3.42: Chatbot Page 192


Figure 3.43: Google Translate Website 193


Figure 3.44: Registration Page 194


Figure 3.45: Login Page 195


Figure 3.46: Forgot Password Page 196


Figure 3.47: Password Reset Email 197


Figure 3.48: Logout Page 199


Figure 3.49: Job Seeker Dashboard 201


Figure 3.50: Jobs Page (Browse Jobs Tab) 202


Figure 3.51: Jobs Page (Saved Jobs Tab) 204


Figure 3.52: My Applications Page 204


Figure 3.53: Report Employer 205


Figure 3.54: Job Seeker Messages Page 207


Figure 3.55: Interviews Page 208


Figure 3.56: Work History Page 210


Figure 3.57: Resume Page 212


Figure 3.58: Job Seeker Profile Page 214


Figure 3.59: Employer Dashboard 215


Figure 3.60: Manage Jobs Page 217


Figure 3.61: Applicants Page 217


Figure 3.62: Employer Messages Page 218


Figure 3.63: Verification Page 219


Figure 3.64: Rating Page 220


Figure 3.65: Employer Profile Page 221


Figure 3.66: Admin Dashboard 223


Figure 3.67: Admin User Page 224


Figure 3.68: Admin Jobs Page 225


Figure 3.69: Admin Reports Page 226


Figure 3.70: Admin Messages Page 227


Figure 3.71: Admin Verifications Review Page 229


Figure 3.72: Admin Chatbot Knowledge Management Page 230


Figure 3.73: Admin Analytics Page 232


Figure 3.74: Admin Profile Page 233


Figure 4.1: Implementation and Testing Overview of EasyEarn 235


Figure 4.2: EasyEarn System Testing Summary 243


Figure 4.3: Hire-to-completion flow 244


Figure 4.4: Application CRUD and openings_count trigger 245


Figure 4.5: Concurrent Application Race Condition 246


Figure 4.6: Failed Application Submission Rollback 247


Figure 4.7: Application Status Transition Constraints 248


Figure 4.8: Admin Analytics Dashboard Accuracy 249


Figure 4.9: PDPA-aligned Document Handling 251


Figure 4.10: Summary of UAT 253


Figure 4.11: Job Seeker - Job Application Status and Completion Confirmation 254


Figure 4.12: Employer - View Applicants 255


Figure 4.13: Admin - Flag/Remove Job 256


Figure 4.14: EasyEarn Security Testing Summary 264


Figure 4.15: RLS - Data Isolation (Seeker Application Read Isolation) 265


Figure 4.16: Auth & Access Control - Admin Page Access Restriction 266


Figure 4.17: Upload Security - File Type and Size Restrictions 267


Figure 4.18: Input Sanitisation - XSS Prevention 268


Figure 4.19: Rating & Business Rules - Rating Eligibility Guard 269


Figure 4.20: Report Security - Report Read Isolation 270


Figure 4.21: Analytics & Chatbot - Analytics Access Restriction 271


Figure 4.22: PDPA & Compliance - Job Listing Data Minimisation 272


Figure 4.23: EasyEarn Compatibility Testing Summary 273


Figure 4.24: Browser Compatibility - CSS Layout Rendering 274


Figure 4.25: Responsive Design - Layout Breakpoints 275


Figure 4.26: Feature Compatibility - Google Translate Website Redirection 276


Figure 4.27: Session & Auth - Cross-tab Logout 277


Figure 4.28: UI & Display - Long Text Overflow Handling 278


Figure 4.29: Form & Input - Interview Date/Time Picker 279


Figure 4.30: Supabase Analytics Table 284


Figure 4.31: Auto-Generated Resume Output (PDF) 286


Figure 5.1: Overview of Chapter 5 Discussion and Conclusion 289


Figure 5.2: Summary of Findings for RQ1 and Objective 1 291


Figure 5.3: Summary of Findings for RQ2 and Objective 2 293


Figure 5.4: Summary of Findings for RQ3 and Objective 3 294


Figure 5.5: Summary of Findings for RQ4 and Objective 4 296


Figure 5.6: Limitation - Residual Security Risks 299


Figure 5.7: Limitation - Testing Methodology Limitations 301


Figure 5.8: Limitation - Scope Limitations 303


Figure 5.9: Contribution of the Project 305


Figure 5.10: Future Enhancement 307

![Figure A1.1: Figure 5.1: Overview of Chapter 5 Discussion and Conclusion 323](Appendix Diagram/figure-01.png)

Figure A1.1: Figure 5.1: Overview of Chapter 5 Discussion and Conclusion 323

![Figure A3.1: Job Seeker Registration to Application 325](Appendix Diagram/figure-01.png)

Figure A3.1: Job Seeker Registration to Application 325

![Figure A3.2: Employer Registration to Applicant Review 325](Appendix Diagram/figure-02.png)

Figure A3.2: Employer Registration to Applicant Review 325

![Figure A3.3: Admin Moderation Lifecycle 325](Appendix Diagram/figure-03.png)

Figure A3.3: Admin Moderation Lifecycle 325

![Figure A3.4: Payment Lifecycle 326](Appendix Diagram/figure-04.png)

Figure A3.4: Payment Lifecycle 326

![Figure A3.5: Payment Dispute and Resolution 326](Appendix Diagram/figure-05.png)

Figure A3.5: Payment Dispute and Resolution 326

![Figure A3.6: New-application Notification Trigger 327](Appendix Diagram/figure-06.png)

Figure A3.6: New-application Notification Trigger 327

![Figure A3.7: Employer Verification Workflow 328](Appendix Diagram/figure-07.png)

Figure A3.7: Employer Verification Workflow 328

![Figure A3.8: Messaging Integration 329](Appendix Diagram/figure-08.png)

Figure A3.8: Messaging Integration 329

![Figure A3.9: Chatbot Knowledge Base Integration 329](Appendix Diagram/figure-09.png)

Figure A3.9: Chatbot Knowledge Base Integration 329

![Figure A3.10: Saved Jobs Integration 330](Appendix Diagram/figure-10.png)

Figure A3.10: Saved Jobs Integration 330

![Figure A3.11: Jobs Page Load and Filter Performance 331](Appendix Diagram/figure-11.png)

Figure A3.11: Jobs Page Load and Filter Performance 331

![Figure A3.12: PDF Resume Generation Performance 332](Appendix Diagram/figure-12.png)

Figure A3.12: PDF Resume Generation Performance 332

![Figure A3.13: Admin Analytics Dashboard Render Time 332](Appendix Diagram/figure-13.png)

Figure A3.13: Admin Analytics Dashboard Render Time 332

![Figure A3.14: Supabase Connectivity Loss Handling 333](Appendix Diagram/figure-14.png)

Figure A3.14: Supabase Connectivity Loss Handling 333

![Figure A3.15: Session Expiry and Re-authentication 334](Appendix Diagram/figure-15.png)

Figure A3.15: Session Expiry and Re-authentication 334

![Figure A3.16: Duplicate Payment Prevention on Retry 335](Appendix Diagram/figure-16.png)

Figure A3.16: Duplicate Payment Prevention on Retry 335

![Figure A3.17: Match Score Calculation Accuracy 336](Appendix Diagram/figure-17.png)

Figure A3.17: Match Score Calculation Accuracy 336

![Figure A3.18: Location-distance Bonus and Match Cap 336](Appendix Diagram/figure-18.png)

Figure A3.18: Location-distance Bonus and Match Cap 336

![Figure A3.19: Bidirectional Rating Eligibility 337](Appendix Diagram/figure-19.png)

Figure A3.19: Bidirectional Rating Eligibility 337

![Figure A3.20: Admin Moderation Queue Classification 338](Appendix Diagram/figure-20.png)

Figure A3.20: Admin Moderation Queue Classification 338

![Figure A3.21: Employer Verification Badge Visibility 339](Appendix Diagram/figure-21.png)

Figure A3.21: Employer Verification Badge Visibility 339

![Figure A3.22: Job Listing Report Feature 340](Appendix Diagram/figure-22.png)

Figure A3.22: Job Listing Report Feature 340

![Figure A3.23: Work History and Earnings Report 340](Appendix Diagram/figure-23.png)

Figure A3.23: Work History and Earnings Report 340

![Figure A3.24: Employer Job Posting Performance View 341](Appendix Diagram/figure-24.png)

Figure A3.24: Employer Job Posting Performance View 341

![Figure A3.25: Privacy Policy and Terms of Service Accessibility 342](Appendix Diagram/figure-25.png)

Figure A3.25: Privacy Policy and Terms of Service Accessibility 342

![Figure A3.26: Admin Audit Trail for Account Decisions 343](Appendix Diagram/figure-26.png)

Figure A3.26: Admin Audit Trail for Account Decisions 343

![Figure A3.27: Gig Workers Act 2025 Compliance Reminders 345](Appendix Diagram/figure-27.png)

Figure A3.27: Gig Workers Act 2025 Compliance Reminders 345

![Figure A4.1: Job Seeker - Registration and Login 346](Appendix Diagram/figure-01.png)

Figure A4.1: Job Seeker - Registration and Login 346

![Figure A4.2: Job Seeker - Dashboard 346](Appendix Diagram/figure-02.png)

Figure A4.2: Job Seeker - Dashboard 346

![Figure A4.3: Job Seeker - Job Search and Browse 347](Appendix Diagram/figure-03.png)

Figure A4.3: Job Seeker - Job Search and Browse 347

![Figure A4.4: Job Seeker - Saved Jobs 347](Appendix Diagram/figure-04.png)

Figure A4.4: Job Seeker - Saved Jobs 347

![Figure A4.5: Job Seeker - In-Progress Work 348](Appendix Diagram/figure-05.png)

Figure A4.5: Job Seeker - In-Progress Work 348

![Figure A4.6: Job Seeker - Interviews 349](Appendix Diagram/figure-06.png)

Figure A4.6: Job Seeker - Interviews 349

![Figure A4.7: Job Seeker - Work History 349](Appendix Diagram/figure-07.png)

Figure A4.7: Job Seeker - Work History 349

![Figure A4.8: Job Seeker - Resume Management 350](Appendix Diagram/figure-08.png)

Figure A4.8: Job Seeker - Resume Management 350

![Figure A4.9: Job Seeker - Messages 351](Appendix Diagram/figure-09.png)

Figure A4.9: Job Seeker - Messages 351

![Figure A4.10: Job Seeker - Profile Management 351](Appendix Diagram/figure-10.png)

Figure A4.10: Job Seeker - Profile Management 351

![Figure A4.11: Job Seeker - Logout and Session 352](Appendix Diagram/figure-11.png)

Figure A4.11: Job Seeker - Logout and Session 352

![Figure A4.12: Employer - Registration and Login 353](Appendix Diagram/figure-12.png)

Figure A4.12: Employer - Registration and Login 353

![Figure A4.13: Employer - Dashboard 354](Appendix Diagram/figure-13.png)

Figure A4.13: Employer - Dashboard 354

![Figure A4.14: Employer - Post Job 354](Appendix Diagram/figure-14.png)

Figure A4.14: Employer - Post Job 354

![Figure A4.15: Employer - Manage Jobs 355](Appendix Diagram/figure-15.png)

Figure A4.15: Employer - Manage Jobs 355

![Figure A4.16: Employer - Shortlist/Accept Applicant 356](Appendix Diagram/figure-16.png)

Figure A4.16: Employer - Shortlist/Accept Applicant 356

![Figure A4.17: Employer - Ratings 356](Appendix Diagram/figure-17.png)

Figure A4.17: Employer - Ratings 356

![Figure A4.18: Employer - Messages 357](Appendix Diagram/figure-18.png)

Figure A4.18: Employer - Messages 357

![Figure A4.19: Employer - Profile Management 358](Appendix Diagram/figure-19.png)

Figure A4.19: Employer - Profile Management 358

![Figure A4.20: Employer - Verification 358](Appendix Diagram/figure-20.png)

Figure A4.20: Employer - Verification 358

![Figure A4.21: Employer - Job Completion Confirmation 359](Appendix Diagram/figure-21.png)

Figure A4.21: Employer - Job Completion Confirmation 359

![Figure A4.22: Employer - Logout and Session 359](Appendix Diagram/figure-22.png)

Figure A4.22: Employer - Logout and Session 359

![Figure A4.23: Admin - Login 360](Appendix Diagram/figure-23.png)

Figure A4.23: Admin - Login 360

![Figure A4.24: Admin - Dashboard Overview 361](Appendix Diagram/figure-24.png)

Figure A4.24: Admin - Dashboard Overview 361

![Figure A4.25: Admin - Lock/Unlock (Employer Account) 361](Appendix Diagram/figure-25.png)

Figure A4.25: Admin - Lock/Unlock (Employer Account) 361

![Figure A4.26: Admin - Lock/Unlock (Job Seeker Account) 362](Appendix Diagram/figure-26.png)

Figure A4.26: Admin - Lock/Unlock (Job Seeker Account) 362

![Figure A4.27: Admin - Approve Job 362](Appendix Diagram/figure-27.png)

Figure A4.27: Admin - Approve Job 362

![Figure A4.28: Admin - Verifications 363](Appendix Diagram/figure-28.png)

Figure A4.28: Admin - Verifications 363

![Figure A4.29: Admin - Reports 364](Appendix Diagram/figure-29.png)

Figure A4.29: Admin - Reports 364

![Figure A4.30: Admin - Analytics 364](Appendix Diagram/figure-30.png)

Figure A4.30: Admin - Analytics 364

![Figure A4.31: Admin - Messages/Support 365](Appendix Diagram/figure-31.png)

Figure A4.31: Admin - Messages/Support 365

![Figure A4.32: Admin - Profile Management 365](Appendix Diagram/figure-32.png)

Figure A4.32: Admin - Profile Management 365

![Figure A4.33: Admin - Logout and Session 367](Appendix Diagram/figure-33.png)

Figure A4.33: Admin - Logout and Session 367

![Figure A5.1: RLS - Data Isolation (Seeker Application Update Isolation) 369](Appendix Diagram/figure-01.png)

Figure A5.1: RLS - Data Isolation (Seeker Application Update Isolation) 369

![Figure A5.2: RLS - Data Isolation (Notification Read Isolation) 369](Appendix Diagram/figure-02.png)

Figure A5.2: RLS - Data Isolation (Notification Read Isolation) 369

![Figure A5.3: RLS - Data Isolation (Job Listing Update Isolation) 369](Appendix Diagram/figure-03.png)

Figure A5.3: RLS - Data Isolation (Job Listing Update Isolation) 369

![Figure A5.4: RLS - Data Isolation (Verification Document Access) 370](Appendix Diagram/figure-04.png)

Figure A5.4: RLS - Data Isolation (Verification Document Access) 370

![Figure A5.5: RLS - Data Isolation (Payment Insert Restriction) 370](Appendix Diagram/figure-05.png)

Figure A5.5: RLS - Data Isolation (Payment Insert Restriction) 370

![Figure A5.6: RLS - Data Isolation (Payment Confirmation Isolation) 371](Appendix Diagram/figure-06.png)

Figure A5.6: RLS - Data Isolation (Payment Confirmation Isolation) 371

![Figure A5.7: RLS - Data Isolation (Saved Job Delete Isolation) 372](Appendix Diagram/figure-07.png)

Figure A5.7: RLS - Data Isolation (Saved Job Delete Isolation) 372

![Figure A5.8: RLS - Data Isolation (User Profile Update Isolation) 372](Appendix Diagram/figure-08.png)

Figure A5.8: RLS - Data Isolation (User Profile Update Isolation) 372

![Figure A5.9: RLS - Data Isolation (Application Status Field Restriction) 373](Appendix Diagram/figure-09.png)

Figure A5.9: RLS - Data Isolation (Application Status Field Restriction) 373

![Figure A5.10: RLS - Data Isolation - Work History Read Isolation 374](Appendix Diagram/figure-10.png)

Figure A5.10: RLS - Data Isolation - Work History Read Isolation 374

![Figure A5.11: Auth & Access Control - Cross-role Data Access 375](Appendix Diagram/figure-11.png)

Figure A5.11: Auth & Access Control - Cross-role Data Access 375

![Figure A5.12: Auth & Access Control - Registration Role-gating 375](Appendix Diagram/figure-12.png)

Figure A5.12: Auth & Access Control - Registration Role-gating 375

![Figure A5.13: Auth & Access Control - Password Policy Enforcement 376](Appendix Diagram/figure-13.png)

Figure A5.13: Auth & Access Control - Password Policy Enforcement 376

![Figure A5.14: Auth & Access Control - Session Expiry Handling 377](Appendix Diagram/figure-14.png)

Figure A5.14: Auth & Access Control - Session Expiry Handling 377

![Figure A5.15: Input Sanitisation - SQL Injection Resistance 378](Appendix Diagram/figure-15.png)

Figure A5.15: Input Sanitisation - SQL Injection Resistance 378

![Figure A5.16: Rating & Business Rules - Self-rating Prevention 379](Appendix Diagram/figure-16.png)

Figure A5.16: Rating & Business Rules - Self-rating Prevention 379

![Figure A5.17: Report Security - Unauthenticated Submission Block 380](Appendix Diagram/figure-17.png)

Figure A5.17: Report Security - Unauthenticated Submission Block 380

![Figure A5.18: Analytics & Chatbot - Chatbot Log Access Restriction 381](Appendix Diagram/figure-18.png)

Figure A5.18: Analytics & Chatbot - Chatbot Log Access Restriction 381

![Figure A5.19: PDPA & Compliance - Verification Document Access Restriction 382](Appendix Diagram/figure-19.png)

Figure A5.19: PDPA & Compliance - Verification Document Access Restriction 382

![Figure A5.20: PDPA & Compliance - Verification Status Update Restriction 382](Appendix Diagram/figure-20.png)

Figure A5.20: PDPA & Compliance - Verification Status Update Restriction 382

![Figure A5.21: PDPA & Compliance - Closed Listing Removal 384](Appendix Diagram/figure-21.png)

Figure A5.21: PDPA & Compliance - Closed Listing Removal 384

![Figure A6.1: Browser Compatibility - JavaScript Feature Support 384](Appendix Diagram/figure-01.png)

Figure A6.1: Browser Compatibility - JavaScript Feature Support 384

![Figure A6.2: Browser Compatibility - PDF Resume Generation 385](Appendix Diagram/figure-02.png)

Figure A6.2: Browser Compatibility - PDF Resume Generation 385

![Figure A6.3: Browser Compatibility - Chart.js Analytics Rendering 385](Appendix Diagram/figure-03.png)

Figure A6.3: Browser Compatibility - Chart.js Analytics Rendering 385

![Figure A6.4: Responsive Design - Mobile Touch Interactions 386](Appendix Diagram/figure-04.png)

Figure A6.4: Responsive Design - Mobile Touch Interactions 386

![Figure A6.5: Responsive Design - Mobile Content Display 387](Appendix Diagram/figure-05.png)

Figure A6.5: Responsive Design - Mobile Content Display 387

![Figure A6.6: Responsive Design - Form Validation Consistency 388](Appendix Diagram/figure-06.png)

Figure A6.6: Responsive Design - Form Validation Consistency 388

![Figure A6.7: Responsive Design - Mobile Filter Functionality 388](Appendix Diagram/figure-07.png)

Figure A6.7: Responsive Design - Mobile Filter Functionality 388

![Figure A6.8: Feature Compatibility - Dark Mode Across Role Dashboards 389](Appendix Diagram/figure-08.png)

Figure A6.8: Feature Compatibility - Dark Mode Across Role Dashboards 389

![Figure A6.9: Feature Compatibility - Floating Chatbot Widget 390](Appendix Diagram/figure-09.png)

Figure A6.9: Feature Compatibility - Floating Chatbot Widget 390

![Figure A6.10: Feature Compatibility - File Upload for Verification 390](Appendix Diagram/figure-10.png)

Figure A6.10: Feature Compatibility - File Upload for Verification 390

![Figure A6.11: Feature Compatibility - Notification Bell Updates 391](Appendix Diagram/figure-11.png)

Figure A6.11: Feature Compatibility - Notification Bell Updates 391

![Figure A6.12: Feature Compatibility - Admin Analytics Data Consistency 392](Appendix Diagram/figure-12.png)

Figure A6.12: Feature Compatibility - Admin Analytics Data Consistency 392

![Figure A6.13: Session & Auth - Cross-tab Session Persistence 393](Appendix Diagram/figure-13.png)

Figure A6.13: Session & Auth - Cross-tab Session Persistence 393

![Figure A6.14: UI & Display - Cross-OS Font Rendering 394](Appendix Diagram/figure-14.png)

Figure A6.14: UI & Display - Cross-OS Font Rendering 394

![Figure A6.15: UI & Display - Image Upload Preview 394](Appendix Diagram/figure-15.png)

Figure A6.15: UI & Display - Image Upload Preview 394

![Figure A6.16: Form & Input - File Size and Type Validation 395](Appendix Diagram/figure-16.png)

Figure A6.16: Form & Input - File Size and Type Validation 395

![Figure A6.17: Form & Input - Password Field Masking 396](Appendix Diagram/figure-17.png)

Figure A6.17: Form & Input - Password Field Masking 396

![Figure A7.1: GitHub Pages Deployment Evidence 401](Appendix Diagram/figure-01.png)

Figure A7.1: GitHub Pages Deployment Evidence 401

# LIST OF ABBREVIATIONS

ADM Administrator AI Artificial Intelligence API Application Programming Interface BaaS Backend-as-a-Service BIT Bachelor of Information Technology BIU Behavioural Intention to Use CDN Content Delivery Network CRUD Create, Read, Update, Delete COVID-19 Coronavirus Disease 2019 CSS Cascading Style Sheets CT Compatibility Testing DOM Document Object Model EMP Employer EPF Employees Provident Fund ERD Entity-Relationship Diagram ES ECMAScript E2E End-to-End FAQ Frequently Asked Questions FK Foreign Key FR Functional Requirement FYP Final Year Project GB Gigabyte GHz Gigahertz HE Heuristic Evaluation HTML HyperText Markup Language HTTP Hypertext Transfer Protocol HTTPS Hypertext Transfer Protocol Secure ID Identifier IEC International Electrotechnical Commission IEEE Institute of Electrical and Electronics Engineers ILO International Labour Organisation ISO International Organization for Standardization ISTQB International Software Testing Qualifications Board JS JavaScript JSON JavaScript Object Notation JWT JSON Web Token KYB Know Your Business LLM Large Language Model MB Megabyte MDEC Malaysia Digital Economy Corporation MDN Mozilla Developer Network MIME Multipurpose Internet Mail Extensions MYR Malaysian Ringgit NFR Non-Functional Requirement OECD Organisation for Economic Co-operation and Development OWASP Open Web Application Security Project OS Operating System PDPA Personal Data Protection Act PDF Portable Document Format PEOU Perceived Ease of Use PERKESO Pertubuhan Keselamatan Sosial (Social Security Organisation) PK Primary Key PMI Project Management Institute PT Perceived Trust PU Perceived Usefulness QA Quality Assurance QR Quick Response RAM Random Access Memory RBAC Role-Based Access Control RLS Row Level Security RM Ringgit Malaysia SEC Security Testing SESS Self-Employment Social Security Scheme SME Small and Medium Enterprises xxvi SOCSO Social Security Organisation SQL Structured Query Language SSD Solid State Drive SSM Suruhanjaya Syarikat Malaysia (Companies Commission of Malaysia) ST System Testing SVG Scalable Vector Graphics TAM Technology Acceptance Model TBTAM Trust-Based Technology Acceptance Model TRA Theory of Reasoned Action UAT User Acceptance Testing UI User Interface UML Unified Modelling Language URL Uniform Resource Locator UNCDF United Nations Capital Development Fund UTAUT Unified Theory of Acceptance and Use of Technology UUID Universally Unique Identifier UX User Experience WBS Work Breakdown Structure XSS Cross-Site Scripting
