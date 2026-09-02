# EasyEarn User Manual

## 1. Introduction

EasyEarn is a web-based gig job matching portal for three user groups: Job Seekers, Employers, and Admins. The system is deployed through GitHub Pages and uses Supabase for authentication, profile records, job listings, applications, notifications, reports, verification data, ratings, payments, work history, chatbot knowledge, and analytics.

System URL:

`https://peiying040830.github.io/easyearn/`

This manual is written based on the implemented EasyEarn pages and navigation structure.

## 2. Main User Roles

| Role | Main Navigation | Main Functions |
| --- | --- | --- |
| Job Seeker | Dashboard, Jobs, Applications, Messages, Interviews, Work History, Resume, Profile | Browse jobs, apply for jobs, save jobs, track applications, message employers, manage interviews, record completed work, download resume, and update profile. |
| Employer | Dashboard, Manage Jobs, Applicants, Messages, Verification, Ratings, Profile | Create and manage job listings, review applicants, schedule interviews, confirm completed work, message job seekers, submit verification, rate job seekers, and update employer profile. |
| Admin | Dashboard, Users, Jobs, Reports, Messages, Verifications, Chatbot, Analytics, Profile | Monitor the platform, manage users, moderate jobs, review reports, review employer verification requests, manage chatbot knowledge, view analytics, message users, and update admin profile. |

## 3. Public Website Guide

### 3.1 Public Navigation

The public website header contains:

- `Home`
- `About`
- `Help`
- `Browse Jobs`
- `Report`
- `Security`
- `Login`
- `Get Started`

The `Get Started` button opens the Register tab on the Login / Register page.

### 3.2 Home Page

The Home page introduces EasyEarn and provides entry points for both Job Seekers and Employers.

Main buttons:

- `Find a Job`: opens the Register tab.
- `Post a Job`: opens the Register tab.
- `Browse Jobs`: opens the public job browsing page.
- `Join as Job Seeker`: opens the Register tab.
- `Join as Employer`: opens the Register tab.
- `Create Free Account`: opens the Register tab.

### 3.3 About Page

The About page explains the EasyEarn project purpose, target users, and platform concept. The `Create Account` button opens the Register tab.

### 3.4 Help Page

The Help page provides support options. Users can open the chatbot or go to the Report page to submit an issue.

### 3.5 Public Browse Jobs Page

The public `Browse Jobs` page allows visitors to view available jobs before logging in.

Users can:

1. Search by role, location, or keyword.
2. Filter job listings.
3. Use location detection to show nearby jobs.
4. Change the distance radius.
5. Clear the selected location filter.
6. Click `Apply`.

When a public visitor clicks `Apply`, the system sends the visitor to `login.html?tab=register` so they can create an account before applying.

### 3.6 Report Page

The public `Report` page is used to report suspicious listings, non-paying employers, fake profiles, harassment, abuse, or other issues.

The report form contains:

- Name
- Email
- Reporter role
- Report type
- Listing or employer profile link
- Description
- Evidence file

Report validation:

- Name, email, and description are required.
- Name must be at least 2 characters.
- Email must be valid.
- Description must be at least 20 characters.
- The optional reference link must be a valid URL.
- Evidence files must be PDF, PNG, JPG, JPEG, or WebP.
- Evidence files must be 3 MB or smaller.

After a report is submitted, Admin users can review it from the Admin `Reports` page. Admin users also receive a notification for new reports.

### 3.7 Security, Privacy, and Terms Pages

The `Security`, `Privacy`, and `Terms` pages provide information about system security, data handling, and terms of use.

## 4. Account Access

### 4.1 Register an Account

EasyEarn registration is handled inside the Login / Register page. The standalone `register.html` page redirects users to `login.html?tab=register`.

To register:

1. Open EasyEarn.
2. Click `Get Started`, `Find a Job`, `Post a Job`, `Join as Job Seeker`, `Join as Employer`, `Create Free Account`, or `Register here`.
3. The Register tab opens on the Login / Register page.
4. Enter `Full Name`.
5. Enter `Email`.
6. Enter `Password`.
7. Enter `Confirm Password`.
8. Select a role card: `Job Seeker`, `Employer`, or `Admin`.
9. If `Employer` is selected, enter the Employer Secure Code.
10. If `Admin` is selected, enter the Admin Secure Code.
11. Click `Create Account`.

Registration rules:

- Full name must be at least 2 characters.
- Email must use a valid email format.
- Password must be at least 6 characters.
- Password must contain at least one letter and one number.
- Password must contain at least one of these symbols: `!@#$%^`.
- Confirm password must match the password.
- Employer registration requires the correct Employer Secure Code.
- Admin registration requires the correct Admin Secure Code.

After registration, EasyEarn creates the Supabase Auth account and stores the user profile in the `users` table. If Supabase requires email confirmation, the user must confirm the email before logging in. If a session is created immediately, the system redirects the user based on the selected role.

### 4.2 Log In

To log in:

1. Click `Login`.
2. Enter the registered email.
3. Enter the password.
4. Click `Login`.

After login, EasyEarn checks the user's role from the profile record and redirects to:

- Job Seeker: `pages/jobseeker/dashboard.html`
- Employer: `pages/employer/dashboard.html`
- Admin: `pages/admin/dashboard.html`

### 4.3 Forgot Password

To reset a forgotten password:

1. Click `Forgot password?` on the Login tab.
2. Enter the account email.
3. Click `Send Reset Link`.
4. Open the reset link from the email.
5. Enter the new password.
6. Confirm the new password.
7. Click `Update Password`.

### 4.4 Log Out

To log out, click `Logout` in the role-based navigation bar. EasyEarn signs the user out and redirects away from protected pages.

## 5. Shared Logged-In Features

### 5.1 Header Tools

Job Seeker, Employer, and Admin pages include:

- Theme toggle
- Google Translate widget
- Notification bell
- User badge and display name
- Logout button
- Mobile hamburger menu

### 5.2 Notification Bell

The notification bell displays unread notifications for the logged-in user. Users can open the bell dropdown, review notifications, click a notification to mark it as read, or click `Mark all read`.

Notification examples:

| Event | Receiver |
| --- | --- |
| A Job Seeker applies for a job | Employer |
| A user receives a new message | Message receiver |
| A user submits a report | Admin |
| An Employer submits verification | Admin |

The bell refreshes periodically, so a new notification may appear after a short delay.

### 5.3 Theme Toggle

Click the theme button to switch between light mode and dark mode. The selected preference is stored in the browser.

### 5.4 Google Translate

Use the Google Translate widget in the header to translate page content into another language.

### 5.5 Chatbot

Most pages include a floating chatbot. Users can type questions about EasyEarn and receive rule-based answers from the chatbot knowledge base.

## 6. Job Seeker Guide

### 6.1 Job Seeker Dashboard

After logging in as a Job Seeker, the system opens the Job Seeker dashboard. The dashboard summarises the user's job search and application activity and provides shortcuts to important pages.

### 6.2 Jobs Page

The Job Seeker `Jobs` page is used to browse and apply for jobs.

Users can:

1. Search jobs by keyword.
2. Filter jobs by available controls.
3. Use location-based search.
4. Save jobs for later.
5. Apply for a job.

Saved jobs are viewed through the saved view in the Job Seeker jobs page. The old `saved-jobs.html` page redirects to `jobs.html?tab=saved`.

### 6.3 Applications Page

The `Applications` page displays the Job Seeker's application pipeline.

The page shows:

- In Review count
- Active count
- Completed count
- Rejected count
- Application activity chart
- Status filters
- Application list
- Completed jobs list

Users can filter applications by:

- All
- Active
- Rejected

Accepted jobs can be moved through completion-related actions. A completed job can be saved into Work History after the completion and payment flow is confirmed.

### 6.4 Messages Page

The `Messages` page allows the Job Seeker to communicate with Employers.

To send a message:

1. Open `Messages`.
2. Select a conversation from the thread list.
3. Type a message.
4. Click `Send Message`.

The send button is disabled until a conversation is selected.

### 6.5 Interviews Page

The `Interviews` page displays interview schedules created by Employers. Job Seekers can review the job title, employer, interview date, time, location, and notes when available.

### 6.6 Work History Page

The `Work History` page stores completed gig records.

Users can:

1. Review total completed jobs.
2. Review total earnings.
3. Review strongest job category.
4. Add or update a work record manually.
5. Open the Resume page.
6. Rate an Employer for completed work.

The work history form includes:

- Job title
- Company
- Category
- Location
- Completed date
- Earnings
- Rating
- Period
- Highlights

### 6.7 Resume Page

The `Resume` page generates a resume from the Job Seeker profile and completed work history.

Users can:

1. Click `Refresh from Profile`.
2. Review the generated resume preview.
3. Click `Download PDF`.

The resume includes profile information, contact details, skills, education, availability, work history, and selected work statistics.

### 6.8 Profile Page

The `Profile` page allows the Job Seeker to update personal and work-related details.

Profile fields include:

- Full name
- Email
- Phone
- Location
- Headline
- Bio
- Profile photo
- Skills
- Preferred categories
- Experience years
- Expected rate
- Education
- Availability days
- Availability time
- Work mode

Click `Save Profile` to store changes.

## 7. Employer Guide

### 7.1 Employer Dashboard

After logging in as an Employer, the system opens the Employer dashboard. The dashboard summarises job listings, applicant activity, verification status, and important next actions.

### 7.2 Manage Jobs Page

EasyEarn uses `Manage Jobs` as the main workspace for creating and managing job listings.

The page contains:

- Published jobs count
- Pending review jobs count
- Expired jobs count
- Closed jobs count
- Job form
- Publishing notes
- Employer job list

To create a job:

1. Open `Manage Jobs`.
2. Fill in the job title.
3. Select a category.
4. Select the state.
5. Enter the area or use the location auto-detect button.
6. Enter the pay rate.
7. Enter the number of openings.
8. Select the schedule.
9. Select the expiry date.
10. Add up to 5 required skills.
11. Enter the job description.
12. Click `Publish Job`.

The Employer can also click `Save Draft`. Existing listings can be edited from the job list.

### 7.3 Applicants Page

The `Applicants` page allows Employers to review Job Seekers who applied to their jobs.

Employers can:

1. View applicant details.
2. Review the applied job and application date.
3. Update the application status.
4. Schedule an interview.
5. Confirm completed work.
6. Rate the Job Seeker after completion.

Interview scheduling uses a modal with interview date, time, location, and notes. Completion confirmation uses a completion modal.

### 7.4 Messages Page

The `Messages` page allows Employers to communicate with Job Seekers.

To send a message:

1. Open `Messages`.
2. Select a conversation.
3. Type the message.
4. Click `Send Message`.

### 7.5 Verification Page

Employers use the `Verification` page to submit company verification information.

The verification form includes:

- SSM registration number
- Business type
- Registered business address
- Business registration document
- Contact proof document

Verification rules:

- SSM registration number is required and must be at least 6 characters.
- Business type is required.
- Registered business address is required and must be at least 10 characters.
- Both verification documents are required.
- Verification files must be PDF, PNG, JPG, JPEG, or WebP.
- Each verification file must be 2 MB or smaller.

After submission, the verification status changes to `Submitted`. Admin users receive a notification and can review the request from the Admin `Verifications` page.

### 7.6 Ratings Page

The `Ratings` page allows Employers to review rating information and submit ratings for completed Job Seekers when the workflow allows it.

### 7.7 Employer Profile Page

The `Profile` page allows Employers to update company and account details.

Typical profile information includes company name, contact details, location, website, business overview, and profile image. Click `Save Profile` to store changes.

## 8. Admin Guide

### 8.1 Admin Dashboard

After logging in as an Admin, the system opens the Admin dashboard. The dashboard shows platform metrics such as users, open reports or disputes, pending employer verifications, total jobs, and moderation summary information.

### 8.2 Users Page

The `Users` page allows Admins to review platform accounts.

Admins can:

1. View Job Seeker, Employer, and Admin counts.
2. Search users.
3. Filter users.
4. Review role, account status, and verification status.
5. Lock or unlock user accounts.

### 8.3 Jobs Page

The `Jobs` page is used for job listing moderation.

Admins can:

1. Review live, pending, flagged, and removed job listings.
2. Search job listings.
3. Filter by status.
4. Approve pending jobs.
5. Flag suspicious jobs.
6. Remove jobs from the demo view.

### 8.4 Reports Page

The `Reports` page is used to review safety reports and payment disputes.

The page shows:

- Open reports count
- Escalated reports count
- Resolved reports count
- Status filter
- Source filter
- Search box
- Report feed

Admins can:

1. Review Supabase reports.
2. Review payment disputes.
3. Resolve a report.
4. Escalate a report.
5. Message the reported user or Employer.
6. Send a warning to an Employer.
7. Lock or unlock an Employer account when needed.

New user-submitted reports create Admin notifications.

### 8.5 Messages Page

The Admin `Messages` page allows Admins to communicate with users for support, report follow-up, and moderation cases.

### 8.6 Verifications Page

The `Verifications` page is used to review Employer verification requests.

The page shows:

- Pending count
- Approved count
- Rejected count
- Status filter
- Search box
- Verification request queue

Admins can:

1. Review company and business details.
2. Check SSM number.
3. Check business type.
4. Check registered address.
5. Review uploaded document names and submitted verification data.
6. Click `Approve`.
7. Click `Request Recheck`.
8. Click `Reject`.

When Admin requests recheck or rejects a request, the system stores review notes for the Employer.

### 8.7 Chatbot Knowledge Page

The `Chatbot` page lets Admins manage the chatbot knowledge base.

Admins can:

1. Review existing knowledge entries.
2. Search knowledge entries.
3. Add a question and answer.
4. Edit an existing entry.
5. Delete an entry.
6. Refresh the knowledge list.

### 8.8 Analytics Page

The `Analytics` page displays platform-level statistics and charts.

Admins can:

1. View user, job, report, verification, and matching metrics.
2. Review visual charts.
3. Filter analytics records by type and status.
4. Search analytics records.
5. Save analytics snapshots when the page workflow performs the snapshot action.

### 8.9 Admin Profile Page

The `Profile` page allows Admins to update admin profile information, including profile image and contact-related display details.

## 9. Common Troubleshooting

### 9.1 Get Started Does Not Open Registration

The correct registration URL is:

`login.html?tab=register`

If the button opens an old cached page, refresh the browser or wait for the GitHub Pages deployment cache to update.

### 9.2 Cannot Register

Check that all required fields are filled in and that the password follows the required format. Employer and Admin registration also require the correct secure code.

### 9.3 Cannot Log In

Check the email and password. If the account requires email confirmation, confirm the email first. If the password is forgotten, use `Forgot password?`.

### 9.4 Redirected Away From a Page

EasyEarn uses role-based routing. A Job Seeker cannot access Employer or Admin pages, and an Employer cannot access Admin-only pages.

### 9.5 Job Application Does Not Submit

Make sure the user is logged in as a Job Seeker. The system prevents duplicate applications and also depends on available job openings.

### 9.6 Verification Upload Fails

Check the file type and file size. Verification files must be PDF, PNG, JPG, JPEG, or WebP and must be 2 MB or smaller.

### 9.7 Report Submission Fails

Check that name, email, and description are filled in. The description must be at least 20 characters. Evidence files must be 3 MB or smaller.

### 9.8 Notification Does Not Appear Immediately

The notification bell checks for updates periodically. Wait briefly or refresh the page.

## 10. Security and Privacy Notes

- Users should not share passwords, secure codes, or verification codes.
- Job Seekers should report suspicious job listings or unsafe behaviour.
- Employers should provide accurate company and verification information.
- Admins should handle reports, user details, and verification documents carefully.
- Users should upload only necessary supporting documents.
- Users should log out after using EasyEarn on a shared device.

## 11. Workflow Summary

### Job Seeker Workflow

1. Register through the Register tab.
2. Log in as Job Seeker.
3. Complete the profile.
4. Browse jobs.
5. Save or apply for jobs.
6. Track applications.
7. Message Employers.
8. Review interviews.
9. Complete accepted work.
10. Confirm completion or payment-related steps when shown.
11. Review Work History.
12. Generate and download resume.

### Employer Workflow

1. Register through the Register tab with Employer Secure Code.
2. Log in as Employer.
3. Complete the employer profile.
4. Submit employer verification.
5. Create or publish jobs from Manage Jobs.
6. Review applicants.
7. Schedule interviews.
8. Accept or reject applicants.
9. Confirm completed work.
10. Rate Job Seekers after completion.

### Admin Workflow

1. Register or log in as Admin with the required Admin access.
2. Monitor Dashboard and notifications.
3. Review Users.
4. Moderate Jobs.
5. Review Reports and payment disputes.
6. Review Employer Verifications.
7. Manage Chatbot knowledge.
8. Monitor Analytics.
9. Use Messages for support or moderation follow-up.
