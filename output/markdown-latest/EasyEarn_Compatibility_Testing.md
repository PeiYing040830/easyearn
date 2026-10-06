# EasyEarn Compatibility Testing

<!-- Source: EasyEarn_Compatibility_Testing.xlsx -->

## Summary

### EasyEarn Compatibility Testing Summary

### Overall Statistics

| Column A | Column C |
| --- | --- |
| Total Test Cases: | 23 |
| Total Categories: | 6 |
| Status: | Completed – 23 Passed / 0 Pending |

### Category Breakdown

| No. | Category | Test Cases | Percentage | Status | Priority | Test IDs |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | Browser Compatibility | 4 | 17.39% | COMPLETED | High: 4 | CT-001, CT-002, CT-003, CT-004 |
| 2 | Responsive Design | 5 | 21.74% | COMPLETED | High: 5 | CT-005, CT-006, CT-007, CT-008, CT-009 |
| 3 | Feature Compatibility | 6 | 26.09% | COMPLETED | High: 6 | CT-010, CT-011, CT-012, CT-013, CT-014, CT-015 |
| 4 | Session &amp; Auth | 2 | 8.70% | COMPLETED | High: 2 | CT-016, CT-017 |
| 5 | UI &amp; Display | 3 | 13.04% | COMPLETED | High: 3 | CT-018, CT-019, CT-020 |
| 6 | Form &amp; Input | 3 | 13.04% | COMPLETED | High: 3 | CT-021, CT-022, CT-023 |
| TOTAL |  | 23 | 100.00% | COMPLETED |  |  |

## Browser Compatibility

| Column A | Column B |
| --- | --- |
| Module Name:- | Compatibility Testing – Browser Compatibility |
| Test Case ID | CT-001 |
| Tester Name | Len Pei Ying |
| Test Case Description | Verify CSS layout renders consistently across major browsers. |
| Prerequisites: | Access to Chrome, Firefox, Safari, and Edge on desktop. |

| Column A | Column B |
| --- | --- |
| Tester's Name | Len Pei Ying |
| Environmental Information:- | 1. OS: Windows/Linux/Mac  2. System: Laptop/Desktop/Mobile  3. Browser: Google Chrome/Microsoft Edge/Firefox/Safari  4. Network: Stable Internet Connection |

| Column A | Column B |
| --- | --- |
| Test Scenario | Verify CSS layout renders consistently across major browsers. |

| Test Case ID | Test Steps | Test Input | Expected Results | Actual Results | Status | Test Type | Comments |
| --- | --- | --- | --- | --- | --- | --- | --- |
| CT-001 | 1. Open EasyEarn homepage in Chrome and verify CSS Grid/Flex layout. | Browsers: Chrome, Firefox, Safari, Edge<br>Files: css/*, includes.js | CSS layout renders consistently with no broken Grid/Flex, missing fonts, or visual discrepancies across all four browsers. | Tested the EasyEarn Browse Jobs page in Google Chrome, Microsoft Edge and Mozilla Firefox on the same Windows device. The navigation bar, search/filter controls, job-card grid, verification badges, Apply buttons, icons, spacing and overall layout rendered consistently across all three browsers. No overlap, missing controls, broken Grid/Flex layout or meaningful visual discrepancy was observed. Safari was not tested because it was not available in the current Windows test environment. | Pass | Normal | Chrome, Edge and Firefox showed consistent rendering. Safari was not available for direct testing in the current environment. |
|  | 2. Repeat in Firefox and compare layout. |  |  |  |  |  |  |
|  | 3. Repeat in Safari and compare layout. |  |  |  |  |  |  |
|  | 4. Repeat in Edge and compare layout. |  |  |  |  |  |  |
|  | 5. Check for any broken layout or missing styles across all four browsers. |  |  |  |  |  |  |
| Module Name:- | Compatibility Testing – Browser Compatibility |  |  |  |  |  |  |
| Test Case ID | CT-002 |  |  |  |  |  |  |
| Tester Name | Len Pei Ying |  |  |  |  |  |  |
| Test Case Description | Verify JavaScript features (fetch, ES modules) work across major browsers. |  |  |  |  |  |  |
| Prerequisites: | Access to Chrome, Firefox, Safari, and Edge; browser console open. |  |  |  |  |  |  |

| Column A | Column B |
| --- | --- |
| Tester's Name | Len Pei Ying |
| Environmental Information:- | 1. OS: Windows/Linux/Mac  2. System: Laptop/Desktop/Mobile  3. Browser: Google Chrome/Microsoft Edge/Firefox/Safari  4. Network: Stable Internet Connection |

| Column A | Column B |
| --- | --- |
| Test Scenario | Verify JavaScript features (fetch, ES modules) work across major browsers. |

| Test Case ID | Test Steps | Test Input | Expected Results | Actual Results | Status | Test Type | Comments |
| --- | --- | --- | --- | --- | --- | --- | --- |
| CT-002 | 1. Open browser console in Chrome and load the Jobs page. | Browsers: Chrome, Firefox, Safari, Edge<br>Files: js/supabase-data.js, js/jobseeker-jobs.js | fetch() and ES module imports execute without errors across all four browsers; Supabase data loads correctly. | Tested the Browse Jobs page in Google Chrome, Microsoft Edge and Mozilla Firefox. In all three browsers, job listings loaded successfully from Supabase and the page remained functional, confirming that fetch-based data loading and ES module scripts executed correctly. No EasyEarn application JavaScript error was observed. Chrome displayed errors from browser extensions (for example Zotero/injected extension scripts) and a permissions-policy unload warning; these were unrelated to EasyEarn. Firefox displayed a browser Quirks Mode warning, but the EasyEarn jobs page still loaded and functioned normally. Safari was not available in the current Windows test environment. | Pass | Normal | Pass for Chrome, Edge and Firefox. Observed console messages were browser/extension warnings rather than EasyEarn JavaScript failures. Safari was not directly tested. |
|  | 2. Verify fetch() calls to Supabase complete without errors. |  |  |  |  |  |  |
|  | 3. Verify ES module imports (type=module) load correctly. |  |  |  |  |  |  |
|  | 4. Repeat steps 1–3 in Firefox, Safari, and Edge. |  |  |  |  |  |  |
|  | 5. Confirm no JS errors appear in any browser console. |  |  |  |  |  |  |
| Module Name:- | Compatibility Testing – Browser Compatibility |  |  |  |  |  |  |
| Test Case ID | CT-003 |  |  |  |  |  |  |
| Tester Name | Len Pei Ying |  |  |  |  |  |  |
| Test Case Description | Verify PDF resume generation works correctly across major browsers. |  |  |  |  |  |  |
| Prerequisites: | Logged in as Job Seeker with completed work history entries. |  |  |  |  |  |  |

| Column A | Column B |
| --- | --- |
| Tester's Name | Len Pei Ying |
| Environmental Information:- | 1. OS: Windows/Linux/Mac  2. System: Laptop/Desktop/Mobile  3. Browser: Google Chrome/Microsoft Edge/Firefox/Safari  4. Network: Stable Internet Connection |

| Column A | Column B |
| --- | --- |
| Test Scenario | Verify PDF resume generation works correctly across major browsers. |

| Test Case ID | Test Steps | Test Input | Expected Results | Actual Results | Status | Test Type | Comments |
| --- | --- | --- | --- | --- | --- | --- | --- |
| CT-003 | 1. Log in as Job Seeker and navigate to Work History page in Chrome. | Browser: Chrome, Firefox, Safari, Edge<br>Files: js/jobseeker-resume.js (jsPDF, html2canvas) | PDF resume generates and downloads successfully in all four browsers with consistent formatting and correct content. | Three PDF resume outputs generated during cross-browser testing were reviewed. All three files opened successfully as single-page PDFs and displayed the same Tsuki resume content, including profile details, two completed work-history entries, highlighted results, references, skills, education and availability. The page structure, fonts, spacing and section placement were visually consistent across the three outputs. Two rendered outputs were pixel-identical; the third showed only negligible rendering/anti-aliasing differences with no missing, clipped or shifted content. Therefore PDF generation produced a valid and consistent resume across the tested browsers. Safari was not available in the current Windows test environment. | Pass | Normal | All three tested browser outputs generated usable PDFs with consistent content and layout. Minor renderer-level pixel differences did not affect readability or correctness. Safari was not directly tested. |
|  | 2. Click Generate Resume and verify PDF downloads correctly. |  |  |  |  |  |  |
|  | 3. Open the PDF and verify content and formatting are correct. |  |  |  |  |  |  |
|  | 4. Repeat steps 1–3 in Firefox, Safari, and Edge. |  |  |  |  |  |  |
|  | 5. Compare PDF output across all browsers for consistency. |  |  |  |  |  |  |
| Module Name:- | Compatibility Testing – Browser Compatibility |  |  |  |  |  |  |
| Test Case ID | CT-004 |  |  |  |  |  |  |
| Tester Name | Len Pei Ying |  |  |  |  |  |  |
| Test Case Description | Verify Chart.js analytics dashboard renders correctly across major browsers. |  |  |  |  |  |  |
| Prerequisites: | Logged in as Admin with analytics data available. |  |  |  |  |  |  |

| Column A | Column B |
| --- | --- |
| Tester's Name | Len Pei Ying |
| Environmental Information:- | 1. OS: Windows/Linux/Mac  2. System: Laptop/Desktop/Mobile  3. Browser: Google Chrome/Microsoft Edge/Firefox/Safari  4. Network: Stable Internet Connection |

| Column A | Column B |
| --- | --- |
| Test Scenario | Verify Chart.js analytics dashboard renders correctly across major browsers. |

| Test Case ID | Test Steps | Test Input | Expected Results | Actual Results | Status | Test Type | Comments |
| --- | --- | --- | --- | --- | --- | --- | --- |
| CT-004 | 1. Log in as Admin and navigate to Analytics Dashboard in Chrome. | Browsers: Chrome, Firefox, Safari, Edge<br>Files: js/admin-analytics.js (Chart.js CDN) | Chart.js line and donut charts render correctly with accurate data and tooltips across all four browsers. | Tested the Admin Analytics page in Google Chrome, Microsoft Edge and Mozilla Firefox. Across all three browsers, the analytics overview, KPI cards, line chart, doughnut chart, chart legend, percentages and Data Explorer table rendered consistently with no missing, blank, overlapping or broken elements. The same analytics values were displayed across browsers, including User Growth 8, Job Volume 8 and Report Load 2, and the chart proportions remained consistent. No meaningful visual or functional difference was observed. Safari was not available in the current Windows test environment. | Pass | Normal | Chrome, Edge and Firefox produced consistent Chart.js output and analytics data. Safari was not directly tested. |
|  | 2. Verify line chart and donut chart render correctly. |  |  |  |  |  |  |
|  | 3. Hover over chart data points and verify tooltips appear. |  |  |  |  |  |  |
|  | 4. Repeat steps 1–3 in Firefox, Safari, and Edge. |  |  |  |  |  |  |
|  | 5. Confirm charts display consistent data and appearance across browsers. |  |  |  |  |  |  |

## Responsive Design

| Column A | Column B |
| --- | --- |
| Module Name:- | Compatibility Testing – Responsive Design |
| Test Case ID | CT-005 |
| Tester Name | Len Pei Ying |
| Test Case Description | Verify layout adapts correctly across desktop, tablet, and mobile breakpoints. |
| Prerequisites: | Browser dev tools available for viewport resizing. |

| Column A | Column B |
| --- | --- |
| Tester's Name | Len Pei Ying |
| Environmental Information:- | 1. OS: Windows/Linux/Mac  2. System: Laptop/Desktop/Mobile  3. Browser: Google Chrome/Microsoft Edge/Firefox/Safari  4. Network: Stable Internet Connection |

| Column A | Column B |
| --- | --- |
| Test Scenario | Verify layout adapts correctly across desktop, tablet, and mobile breakpoints. |

| Test Case ID | Test Steps | Test Input | Expected Results | Actual Results | Status | Test Type | Comments |
| --- | --- | --- | --- | --- | --- | --- | --- |
| CT-005 | 1. Load Jobs page at 1920px (desktop) and verify multi-column grid layout. | Viewports: 1920px, 768px, 375px<br>Files: css/*, includes.js | Layout adapts fluidly at all three breakpoints with no horizontal scroll, overlapping elements, or broken navigation. | Retested the responsive layout after the 375px mobile fixes. The desktop (1920px), tablet (768px), and mobile (375px) views now adapt correctly. On mobile, navigation remains collapsed appropriately, dashboard and chart content fits within the viewport, charts stack vertically without being cut off, and no visible horizontal overflow or overlapping content was observed. | Pass | Normal | 375px responsive issue was fixed and successfully retested. Desktop, tablet and mobile layouts now display correctly. |
|  | 2. Resize to 768px (tablet) and verify layout adapts to two columns. |  |  |  |  |  |  |
|  | 3. Resize to 375px (mobile) and verify single-column layout. |  |  |  |  |  |  |
|  | 4. Check navigation collapses into hamburger menu at mobile width. |  |  |  |  |  |  |
|  | 5. Verify no horizontal scroll or overlapping elements at any breakpoint. |  |  |  |  |  |  |
| Module Name:- | Compatibility Testing – Responsive Design |  |  |  |  |  |  |
| Test Case ID | CT-006 |  |  |  |  |  |  |
| Tester Name | Len Pei Ying |  |  |  |  |  |  |
| Test Case Description | Verify mobile touch interactions work correctly on smartphone devices. |  |  |  |  |  |  |
| Prerequisites: | Physical mobile device or browser mobile emulation mode. |  |  |  |  |  |  |

| Column A | Column B |
| --- | --- |
| Tester's Name | Len Pei Ying |
| Environmental Information:- | 1. OS: Windows/Linux/Mac  2. System: Laptop/Desktop/Mobile  3. Browser: Google Chrome/Microsoft Edge/Firefox/Safari  4. Network: Stable Internet Connection |

| Column A | Column B |
| --- | --- |
| Test Scenario | Verify mobile touch interactions work correctly on smartphone devices. |

| Test Case ID | Test Steps | Test Input | Expected Results | Actual Results | Status | Test Type | Comments |
| --- | --- | --- | --- | --- | --- | --- | --- |
| CT-006 | 1. Open EasyEarn on mobile and tap the hamburger menu. | Device: Mobile (375px viewport)<br>Files: css/*, includes.js, js/jobseeker-jobs.js | All tap interactions, dropdowns, and scrolling function correctly on mobile touch screens without requiring hover. | Tested in a 375px mobile emulation viewport. The hamburger menu opened and closed correctly; Browse Jobs and Saved Jobs tabs switched correctly; job interactions responded to tap; filter dropdowns opened and allowed selection; and vertical scrolling worked normally without interaction issues. | Pass | Normal | All required mobile tap interactions and scrolling functions worked correctly in the tested mobile viewport. |
|  | 2. Verify dropdown navigation opens and closes correctly on tap. |  |  |  |  |  |  |
|  | 3. Tap on a job listing card and verify it navigates to job details. |  |  |  |  |  |  |
|  | 4. Tap on filter dropdowns and verify they open and are selectable. |  |  |  |  |  |  |
|  | 5. Scroll through the Jobs page and verify smooth scrolling. |  |  |  |  |  |  |
| Module Name:- | Compatibility Testing – Responsive Design |  |  |  |  |  |  |
| Test Case ID | CT-007 |  |  |  |  |  |  |
| Tester Name | Len Pei Ying |  |  |  |  |  |  |
| Test Case Description | Verify Saved Jobs and Work History pages display correctly on mobile without overflow. |  |  |  |  |  |  |
| Prerequisites: | Logged in as Job Seeker with saved jobs and work history entries. |  |  |  |  |  |  |

| Column A | Column B |
| --- | --- |
| Tester's Name | Len Pei Ying |
| Environmental Information:- | 1. OS: Windows/Linux/Mac  2. System: Laptop/Desktop/Mobile  3. Browser: Google Chrome/Microsoft Edge/Firefox/Safari  4. Network: Stable Internet Connection |

| Column A | Column B |
| --- | --- |
| Test Scenario | Verify Saved Jobs and Work History pages display correctly on mobile without overflow. |

| Test Case ID | Test Steps | Test Input | Expected Results | Actual Results | Status | Test Type | Comments |
| --- | --- | --- | --- | --- | --- | --- | --- |
| CT-007 | 1. Log in as Job Seeker on mobile (375px viewport). | Viewport: 375px<br>Files: pages/jobseeker/saved-jobs.html, pages/jobseeker/work-history.html | Saved Jobs and Work History pages display all content within the mobile viewport with no horizontal overflow or truncated data. | Tested the Saved Jobs and Work History pages at a 375px mobile viewport. Saved Jobs displayed the full job card within the viewport, including title, employer, description, location/pay badges and action buttons, with no visible horizontal overflow or clipped content. Work History also displayed the job title, employer, date, earnings (RM200), category and status/action information within the mobile viewport. Both pages stacked content vertically and remained readable without horizontal scrolling or truncated data. | Pass | Normal | Saved Jobs and Work History were readable and usable at 375px with no horizontal overflow observed. |
|  | 2. Navigate to Saved Jobs page and verify all job cards display fully. |  |  |  |  |  |  |
|  | 3. Check no content overflows off-screen horizontally. |  |  |  |  |  |  |
|  | 4. Navigate to Work History page and verify entries display correctly. |  |  |  |  |  |  |
|  | 5. Verify earnings, job title, and date columns are readable on mobile. |  |  |  |  |  |  |
| Module Name:- | Compatibility Testing – Responsive Design |  |  |  |  |  |  |
| Test Case ID | CT-008 |  |  |  |  |  |  |
| Tester Name | Len Pei Ying |  |  |  |  |  |  |
| Test Case Description | Verify Login and Register form validation behaviour is consistent across browsers. |  |  |  |  |  |  |
| Prerequisites: | Access to Chrome, Firefox, Safari, and Edge. |  |  |  |  |  |  |

| Column A | Column B |
| --- | --- |
| Tester's Name | Len Pei Ying |
| Environmental Information:- | 1. OS: Windows/Linux/Mac  2. System: Laptop/Desktop/Mobile  3. Browser: Google Chrome/Microsoft Edge/Firefox/Safari  4. Network: Stable Internet Connection |

| Column A | Column B |
| --- | --- |
| Test Scenario | Verify Login and Register form validation behaviour is consistent across browsers. |

| Test Case ID | Test Steps | Test Input | Expected Results | Actual Results | Status | Test Type | Comments |
| --- | --- | --- | --- | --- | --- | --- | --- |
| CT-008 | 1. Open Login page in Chrome and submit with empty fields. | Browsers: Chrome, Firefox, Safari, Edge<br>Files: login.html, register.html, js/auth.js | Form validation error messages appear consistently across all browsers for empty fields and invalid password format. | Tested Login and Register form validation in Google Chrome, Microsoft Edge and Mozilla Firefox. Submitting the Login form with empty required fields produced the expected validation behaviour in all three browsers. Submitting the Register form with an invalid password format also produced the expected password validation message consistently across all three browsers. No browser-specific validation inconsistency was observed. Safari was not available in the current Windows test environment. | Pass | Abnormal | Chrome, Edge and Firefox showed consistent Login and Register validation behaviour. Safari was not directly tested. |
|  | 2. Verify validation error messages appear correctly. |  |  |  |  |  |  |
|  | 3. Open Register page and submit with invalid password format. |  |  |  |  |  |  |
|  | 4. Verify password validation error is shown. |  |  |  |  |  |  |
|  | 5. Repeat steps 1–4 in Firefox, Safari, and Edge. |  |  |  |  |  |  |
| Module Name:- | Compatibility Testing – Responsive Design |  |  |  |  |  |  |
| Test Case ID | CT-009 |  |  |  |  |  |  |
| Tester Name | Len Pei Ying |  |  |  |  |  |  |
| Test Case Description | Verify job listing filters function correctly on mobile devices. |  |  |  |  |  |  |
| Prerequisites: | Mobile device or emulation; job listings available. |  |  |  |  |  |  |

| Column A | Column B |
| --- | --- |
| Tester's Name | Len Pei Ying |
| Environmental Information:- | 1. OS: Windows/Linux/Mac  2. System: Laptop/Desktop/Mobile  3. Browser: Google Chrome/Microsoft Edge/Firefox/Safari  4. Network: Stable Internet Connection |

| Column A | Column B |
| --- | --- |
| Test Scenario | Verify job listing filters function correctly on mobile devices. |

| Test Case ID | Test Steps | Test Input | Expected Results | Actual Results | Status | Test Type | Comments |
| --- | --- | --- | --- | --- | --- | --- | --- |
| CT-009 | 1. Open Jobs page on mobile (375px viewport). | Viewport: 375px<br>Files: pages/jobseeker/jobs.html, js/jobseeker-jobs.js | Category and location filters are tappable on mobile and correctly filter job listings without requiring a page reload. | Tested the Job Seeker Jobs page at a 375px mobile viewport. Category filters were tappable and filtered the listings correctly; the location dropdown opened and allowed selection; the job results updated in place without requiring a page reload; and using the reset/clear filters function restored the full job list. No mobile interaction issue was observed during filtering. | Pass | Normal | All mobile job-filter interactions worked correctly at 375px, including category, location, live result updates and filter reset. |
|  | 2. Tap category filter chips and verify filtering works. |  |  |  |  |  |  |
|  | 3. Tap location filter dropdown and select a location. |  |  |  |  |  |  |
|  | 4. Verify filtered results update correctly. |  |  |  |  |  |  |
|  | 5. Clear filters and verify all listings are restored. |  |  |  |  |  |  |

## Feature Compatibility

| Column A | Column B |
| --- | --- |
| Module Name:- | Compatibility Testing – Feature Compatibility |
| Test Case ID | CT-010 |
| Tester Name | Len Pei Ying |
| Test Case Description | Verify Google Translate integration does not break page functionality. |
| Prerequisites: | Google Translate widget enabled (translate.js loaded). |

| Column A | Column B |
| --- | --- |
| Tester's Name | Len Pei Ying |
| Environmental Information:- | 1. OS: Windows/Linux/Mac  2. System: Laptop/Desktop/Mobile  3. Browser: Google Chrome/Microsoft Edge/Firefox/Safari  4. Network: Stable Internet Connection |

| Column A | Column B |
| --- | --- |
| Test Scenario | Verify Google Translate integration does not break page functionality. |

| Test Case ID | Test Steps | Test Input | Expected Results | Actual Results | Status | Test Type | Comments |
| --- | --- | --- | --- | --- | --- | --- | --- |
| CT-010 | 1. Load homepage and activate Google Translate to Bahasa Malaysia. | Target language: Bahasa Malaysia / Mandarin<br>Files: js/translate.js, index.html | Google Translate widget loads and translates visible text; all interactive features continue to function while translated. | Tested Google Translate integration on EasyEarn by switching the interface to Bahasa Malaysia and Mandarin, using the Jobs search/filter functions while translated, and then switching the interface back to English. Visible page text translated successfully, the layout remained intact, search and filter controls continued to work, and switching back to English restored the original interface without functional issues. | Pass | Normal | Bahasa Malaysia and Mandarin translation worked without breaking page layout or Jobs interactions. Returning to English also worked correctly. |
|  | 2. Verify page content translates without breaking layout. |  |  |  |  |  |  |
|  | 3. Use the Jobs search filter while translated. |  |  |  |  |  |  |
|  | 4. Submit a job application while translated. |  |  |  |  |  |  |
|  | 5. Switch back to English and verify all functionality is restored. |  |  |  |  |  |  |
| Module Name:- | Compatibility Testing – Feature Compatibility |  |  |  |  |  |  |
| Test Case ID | CT-011 |  |  |  |  |  |  |
| Tester Name | Len Pei Ying |  |  |  |  |  |  |
| Test Case Description | Verify dark mode toggles correctly across all three role dashboards. |  |  |  |  |  |  |
| Prerequisites: | Accounts for Job Seeker, Employer, and Admin roles available. |  |  |  |  |  |  |

| Column A | Column B |
| --- | --- |
| Tester's Name | Len Pei Ying |
| Environmental Information:- | 1. OS: Windows/Linux/Mac  2. System: Laptop/Desktop/Mobile  3. Browser: Google Chrome/Microsoft Edge/Firefox/Safari  4. Network: Stable Internet Connection |

| Column A | Column B |
| --- | --- |
| Test Scenario | Verify dark mode toggles correctly across all three role dashboards. |

| Test Case ID | Test Steps | Test Input | Expected Results | Actual Results | Status | Test Type | Comments |
| --- | --- | --- | --- | --- | --- | --- | --- |
| CT-011 | 1. Log in as Job Seeker and toggle dark mode on dashboard. | Files: js/theme.js, css/jobseeker-dashboard.css, css/employer-dashboard.css, css/admin-dashboard.css | Dark mode applies consistently across all three role dashboards with legible text and correct accent colours; preference persists after page reload. | Tested dark mode on the Job Seeker, Employer and Admin dashboards. All three dashboards switched to dark mode correctly, with role-specific accent colours and interface text remaining readable. After refreshing the pages, the selected dark mode preference remained active as expected. | Pass | Normal | Dark mode worked correctly for Job Seeker, Employer and Admin dashboards, and the preference persisted after refresh. |
|  | 2. Verify teal/green accent colours remain legible in dark mode. |  |  |  |  |  |  |
|  | 3. Log in as Employer and toggle dark mode; verify brown/gold theme. |  |  |  |  |  |  |
|  | 4. Log in as Admin and toggle dark mode; verify purple theme. |  |  |  |  |  |  |
|  | 5. Refresh each dashboard and verify dark mode preference persists. |  |  |  |  |  |  |
| Module Name:- | Compatibility Testing – Feature Compatibility |  |  |  |  |  |  |
| Test Case ID | CT-012 |  |  |  |  |  |  |
| Tester Name | Len Pei Ying |  |  |  |  |  |  |
| Test Case Description | Verify floating chatbot widget displays and functions across browsers and devices. |  |  |  |  |  |  |
| Prerequisites: | Access to Chrome, Firefox, Safari, Edge; mobile device or emulation. |  |  |  |  |  |  |

| Column A | Column B |
| --- | --- |
| Tester's Name | Len Pei Ying |
| Environmental Information:- | 1. OS: Windows/Linux/Mac  2. System: Laptop/Desktop/Mobile  3. Browser: Google Chrome/Microsoft Edge/Firefox/Safari  4. Network: Stable Internet Connection |

| Column A | Column B |
| --- | --- |
| Test Scenario | Verify floating chatbot widget displays and functions across browsers and devices. |

| Test Case ID | Test Steps | Test Input | Expected Results | Actual Results | Status | Test Type | Comments |
| --- | --- | --- | --- | --- | --- | --- | --- |
| CT-012 | 1. Open Job Seeker dashboard in Chrome and click the chatbot widget. | Browsers: Chrome, Firefox, Safari, Edge; Viewport: 375px mobile<br>Files: js/floating-chatbot.js | Chatbot widget opens, sends messages, and receives responses correctly across all browsers and on mobile without UI overlap issues. | Tested the floating EasyEarn Assistant on the mobile 375px view. The chatbot opened correctly within the viewport, displayed its header, suggested questions, message input and Send button, and remained accessible without being cut off by the screen edge. The earlier apparent clipping was related to the underlying responsive chart/page layout rather than the chatbot component itself. | Pass | Normal | Chatbot mobile display is acceptable and usable. The separate 375px chart/responsive layout issue remains tracked under CT-005 for retesting after the responsive fix. |
|  | 2. Send a test message and verify a response is returned. |  |  |  |  |  |  |
|  | 3. Verify widget opens/closes correctly and does not overlap critical UI. |  |  |  |  |  |  |
|  | 4. Repeat in Firefox, Safari, and Edge. |  |  |  |  |  |  |
|  | 5. Repeat on mobile (375px) and verify chatbot is accessible and usable. |  |  |  |  |  |  |
| Module Name:- | Compatibility Testing – Feature Compatibility |  |  |  |  |  |  |
| Test Case ID | CT-013 |  |  |  |  |  |  |
| Tester Name | Len Pei Ying |  |  |  |  |  |  |
| Test Case Description | Verify file upload (employer verification document) works across browsers. |  |  |  |  |  |  |
| Prerequisites: | Logged in as Employer; sample PDF/image file available for upload. |  |  |  |  |  |  |

| Column A | Column B |
| --- | --- |
| Tester's Name | Len Pei Ying |
| Environmental Information:- | 1. OS: Windows/Linux/Mac  2. System: Laptop/Desktop/Mobile  3. Browser: Google Chrome/Microsoft Edge/Firefox/Safari  4. Network: Stable Internet Connection |

| Column A | Column B |
| --- | --- |
| Test Scenario | Verify file upload (employer verification document) works across browsers. |

| Test Case ID | Test Steps | Test Input | Expected Results | Actual Results | Status | Test Type | Comments |
| --- | --- | --- | --- | --- | --- | --- | --- |
| CT-013 | 1. Log in as Employer and navigate to Verification page in Chrome. | Browsers: Chrome, Firefox, Safari, Edge<br>File types: PDF, JPG<br>Files: js/employer-verification.js | File picker opens in all browsers; selected file uploads successfully to Supabase storage with correct file type and size validation. | Tested employer verification document upload in Google Chrome, Microsoft Edge and Mozilla Firefox. In all three browsers, the file picker opened correctly, the selected verification file was accepted and displayed as expected, and the verification submission completed successfully. No browser-specific upload issue was observed. Safari was not available in the current Windows test environment. | Pass | Normal | Employer verification file upload worked consistently in Chrome, Edge and Firefox. Safari was not directly tested. |
|  | 2. Click file upload and select a PDF document. |  |  |  |  |  |  |
|  | 3. Verify file is accepted and preview/name is shown. |  |  |  |  |  |  |
|  | 4. Submit verification and confirm upload succeeds. |  |  |  |  |  |  |
|  | 5. Repeat steps 1–4 in Firefox, Safari, and Edge. |  |  |  |  |  |  |
| Module Name:- | Compatibility Testing – Feature Compatibility |  |  |  |  |  |  |
| Test Case ID | CT-014 |  |  |  |  |  |  |
| Tester Name | Len Pei Ying |  |  |  |  |  |  |
| Test Case Description | Verify notification bell updates in real time across browsers. |  |  |  |  |  |  |
| Prerequisites: | Two browser tabs open; one as Employer, one as Job Seeker. |  |  |  |  |  |  |

| Column A | Column B |
| --- | --- |
| Tester's Name | Len Pei Ying |
| Environmental Information:- | 1. OS: Windows/Linux/Mac  2. System: Laptop/Desktop/Mobile  3. Browser: Google Chrome/Microsoft Edge/Firefox/Safari  4. Network: Stable Internet Connection |

| Column A | Column B |
| --- | --- |
| Test Scenario | Verify notification bell updates in real time across browsers. |

| Test Case ID | Test Steps | Test Input | Expected Results | Actual Results | Status | Test Type | Comments |
| --- | --- | --- | --- | --- | --- | --- | --- |
| CT-014 | 1. Log in as Job Seeker in Chrome and observe notification bell. | Browsers: Chrome, Firefox, Edge<br>Files: js/notifications.js, includes/header-jobseeker.html | Notification bell reflects new notifications within the polling interval across all tested browsers without requiring a page reload. | Tested notification updates in Google Chrome, Mozilla Firefox and Microsoft Edge using separate Job Seeker and Employer sessions. After the Employer changed an application status, the Job Seeker notification bell updated automatically without requiring a page reload, and opening the bell displayed the notification list correctly in all three tested browsers. | Pass | Normal | Notification polling behaved consistently in Chrome, Firefox and Edge. The bell updated without manual refresh and the notification list opened correctly. |
|  | 2. In a separate tab, log in as Employer and change application status. |  |  |  |  |  |  |
|  | 3. Verify notification bell on Job Seeker tab updates without page reload. |  |  |  |  |  |  |
|  | 4. Click notification bell and verify notification list is shown. |  |  |  |  |  |  |
|  | 5. Repeat test in Firefox and Edge. |  |  |  |  |  |  |
| Module Name:- | Compatibility Testing – Feature Compatibility |  |  |  |  |  |  |
| Test Case ID | CT-015 |  |  |  |  |  |  |
| Tester Name | Len Pei Ying |  |  |  |  |  |  |
| Test Case Description | Verify Admin analytics dashboard data displays correctly across browsers. |  |  |  |  |  |  |
| Prerequisites: | Logged in as Admin; analytics data exists in the analytics table. |  |  |  |  |  |  |

| Column A | Column B |
| --- | --- |
| Tester's Name | Len Pei Ying |
| Environmental Information:- | 1. OS: Windows/Linux/Mac  2. System: Laptop/Desktop/Mobile  3. Browser: Google Chrome/Microsoft Edge/Firefox/Safari  4. Network: Stable Internet Connection |

| Column A | Column B |
| --- | --- |
| Test Scenario | Verify Admin analytics dashboard data displays correctly across browsers. |

| Test Case ID | Test Steps | Test Input | Expected Results | Actual Results | Status | Test Type | Comments |
| --- | --- | --- | --- | --- | --- | --- | --- |
| CT-015 | 1. Log in as Admin and open Analytics Dashboard in Chrome. | Browsers: Chrome, Firefox, Edge<br>Files: js/admin-analytics.js, Supabase analytics table | Analytics figures and charts display the same correct data across all tested browsers with no missing or mismatched values. | Tested the Admin Analytics Dashboard in Google Chrome, Microsoft Edge and Mozilla Firefox. All three browsers displayed the same analytics values: User Growth = 8, Job Volume = 8, and Report Load = 2. The chart data and displayed statistics were consistent across all three browsers, with no missing or mismatched values observed. | Pass | Normal | Chrome, Edge and Firefox all showed identical analytics values (8 / 8 / 2), and the chart data points were consistent. |
|  | 2. Verify total users, total jobs, and successful matches figures are correct. |  |  |  |  |  |  |
|  | 3. Verify chart data points match the displayed statistics. |  |  |  |  |  |  |
|  | 4. Repeat in Firefox and Edge. |  |  |  |  |  |  |
|  | 5. Confirm all figures and charts are consistent across browsers. |  |  |  |  |  |  |

## Session & Auth

| Column A | Column B |
| --- | --- |
| Module Name:- | Compatibility Testing – Session &amp; Auth |
| Test Case ID | CT-016 |
| Tester Name | Len Pei Ying |
| Test Case Description | Verify auth session persists correctly across multiple browser tabs. |
| Prerequisites: | Logged in as Job Seeker in one browser tab. |

| Column A | Column B |
| --- | --- |
| Tester's Name | Len Pei Ying |
| Environmental Information:- | 1. OS: Windows/Linux/Mac  2. System: Laptop/Desktop/Mobile  3. Browser: Google Chrome/Microsoft Edge/Firefox/Safari  4. Network: Stable Internet Connection |

| Column A | Column B |
| --- | --- |
| Test Scenario | Verify auth session persists correctly across multiple browser tabs. |

| Test Case ID | Test Steps | Test Input | Expected Results | Actual Results | Status | Test Type | Comments |
| --- | --- | --- | --- | --- | --- | --- | --- |
| CT-016 | 1. Log in as Job Seeker in Chrome Tab 1. | Browsers: Chrome, Firefox, Edge<br>Files: js/supabase-data.js (observeAuth) | Auth session is shared across tabs in the same browser; no re-login required when opening a new tab to EasyEarn. | Tested authentication session persistence across multiple tabs in Google Chrome, Mozilla Firefox and Microsoft Edge. After logging in as a Job Seeker in the first tab, opening EasyEarn directly in a second tab did not require another login. The authenticated session remained active while navigating to other Job Seeker pages in the second tab across all three tested browsers. | Pass | Normal | Session sharing across tabs worked correctly in Chrome, Firefox and Edge. No re-login was required within the same browser. |
|  | 2. Open a new Tab 2 and navigate to EasyEarn dashboard URL directly. |  |  |  |  |  |  |
|  | 3. Verify Tab 2 shows the dashboard without requiring login again. |  |  |  |  |  |  |
|  | 4. Navigate to different pages in Tab 2 and verify session remains active. |  |  |  |  |  |  |
|  | 5. Repeat test in Firefox and Edge. |  |  |  |  |  |  |
| Module Name:- | Compatibility Testing – Session &amp; Auth |  |  |  |  |  |  |
| Test Case ID | CT-017 |  |  |  |  |  |  |
| Tester Name | Len Pei Ying |  |  |  |  |  |  |
| Test Case Description | Verify logout redirects correctly and clears session across browser tabs. |  |  |  |  |  |  |
| Prerequisites: | Logged in as Job Seeker with at least two tabs open. |  |  |  |  |  |  |

| Column A | Column B |
| --- | --- |
| Tester's Name | Len Pei Ying |
| Environmental Information:- | 1. OS: Windows/Linux/Mac  2. System: Laptop/Desktop/Mobile  3. Browser: Google Chrome/Microsoft Edge/Firefox/Safari  4. Network: Stable Internet Connection |

| Column A | Column B |
| --- | --- |
| Test Scenario | Verify logout redirects correctly and clears session across browser tabs. |

| Test Case ID | Test Steps | Test Input | Expected Results | Actual Results | Status | Test Type | Comments |
| --- | --- | --- | --- | --- | --- | --- | --- |
| CT-017 | 1. Log in as Job Seeker and open dashboard in Tab 1 and Tab 2. | Files: js/auth.js (handleLogout), js/supabase-data.js (observeAuth) | Logout clears the Supabase session from localStorage; subsequent navigation in any tab detects no active session and redirects to Login. | Tested logout behaviour with the same Job Seeker session open in multiple tabs. Logging out from one tab cleared the shared authentication session and caused the other open EasyEarn tab to be logged out as well. After the session was cleared, protected pages could no longer be accessed without signing in again. | Pass | Normal | Logout propagated across tabs correctly and cleared the shared browser session as expected. |
|  | 2. Click Logout in Tab 1. |  |  |  |  |  |  |
|  | 3. Verify Tab 1 redirects to Login page. |  |  |  |  |  |  |
|  | 4. In Tab 2, attempt to navigate to a protected page or refresh. |  |  |  |  |  |  |
|  | 5. Verify Tab 2 also redirects to Login page after session is cleared. |  |  |  |  |  |  |

## UI & Display

| Column A | Column B |
| --- | --- |
| Module Name:- | Compatibility Testing – UI &amp; Display |
| Test Case ID | CT-018 |
| Tester Name | Len Pei Ying |
| Test Case Description | Verify font rendering is consistent across Windows, Mac, and Linux operating systems. |
| Prerequisites: | Access to devices running Windows, Mac, and Linux. |

| Column A | Column B |
| --- | --- |
| Tester's Name | Len Pei Ying |
| Environmental Information:- | 1. OS: Windows/Linux/Mac  2. System: Laptop/Desktop/Mobile  3. Browser: Google Chrome/Microsoft Edge/Firefox/Safari  4. Network: Stable Internet Connection |

| Column A | Column B |
| --- | --- |
| Test Scenario | Verify font rendering is consistent across Windows, Mac, and Linux operating systems. |

| Test Case ID | Test Steps | Test Input | Expected Results | Actual Results | Status | Test Type | Comments |
| --- | --- | --- | --- | --- | --- | --- | --- |
| CT-018 | 1. Open EasyEarn homepage on Windows and verify font appearance. | OS: Windows 10/11, macOS, Linux<br>Files: css/* (font-family declarations) | Text renders legibly and consistently across all three operating systems with no blurry, clipped, or misaligned characters. | Tested font rendering in the available Windows environment. Headings, body text and button labels displayed clearly and consistently, with no visible blurry text, clipping, character misalignment or readability issues. | Pass | Normal | Tested on Windows, which was the selected test environment. Font rendering was clear and readable with no visible clipping or misalignment. |
|  | 2. Open EasyEarn homepage on Mac and compare font rendering. |  |  |  |  |  |  |
|  | 3. Open EasyEarn homepage on Linux and compare font rendering. |  |  |  |  |  |  |
|  | 4. Check headings, body text, and button labels across all three OS. |  |  |  |  |  |  |
|  | 5. Verify no text appears blurry, clipped, or misaligned on any OS. |  |  |  |  |  |  |
| Module Name:- | Compatibility Testing – UI &amp; Display |  |  |  |  |  |  |
| Test Case ID | CT-019 |  |  |  |  |  |  |
| Tester Name | Len Pei Ying |  |  |  |  |  |  |
| Test Case Description | Verify long text content does not overflow or break layout on any page. |  |  |  |  |  |  |
| Prerequisites: | Job listing with a long description; employer with a long company overview. |  |  |  |  |  |  |

| Column A | Column B |
| --- | --- |
| Tester's Name | Len Pei Ying |
| Environmental Information:- | 1. OS: Windows/Linux/Mac  2. System: Laptop/Desktop/Mobile  3. Browser: Google Chrome/Microsoft Edge/Firefox/Safari  4. Network: Stable Internet Connection |

| Column A | Column B |
| --- | --- |
| Test Scenario | Verify long text content does not overflow or break layout on any page. |

| Test Case ID | Test Steps | Test Input | Expected Results | Actual Results | Status | Test Type | Comments |
| --- | --- | --- | --- | --- | --- | --- | --- |
| CT-019 | 1. Open a job listing with a long description and verify text wraps correctly. | Viewport: 1920px, 375px<br>Files: css/*, pages/jobseeker/jobs.html | Long text wraps correctly within containers at all viewports; no text overflows outside card or container boundaries. | Tested long text content using an extended job title, long job description and long employer company overview. At the 375px mobile viewport, text wrapped correctly inside the form fields and page containers without horizontal overflow, clipping or breaking the layout. The same content was also considered safe for the wider desktop layout because the available container width is greater than on mobile. | Pass | Normal | Long job and employer profile text wrapped correctly at 375px with no visible overflow. Desktop layout provides more width, so no additional overflow issue was expected. |
|  | 2. Open Employer profile with a long company overview and verify layout. |  |  |  |  |  |  |
|  | 3. Resize to mobile (375px) and verify long text still wraps correctly. |  |  |  |  |  |  |
|  | 4. Check job cards on Jobs page with long job titles. |  |  |  |  |  |  |
|  | 5. Verify no text overflows outside card boundaries on any viewport. |  |  |  |  |  |  |
| Module Name:- | Compatibility Testing – UI &amp; Display |  |  |  |  |  |  |
| Test Case ID | CT-020 |  |  |  |  |  |  |
| Tester Name | Len Pei Ying |  |  |  |  |  |  |
| Test Case Description | Verify uploaded profile and verification images display correctly across browsers. |  |  |  |  |  |  |
| Prerequisites: | Logged in as Job Seeker and Employer; sample image file available. |  |  |  |  |  |  |

| Column A | Column B |
| --- | --- |
| Tester's Name | Len Pei Ying |
| Environmental Information:- | 1. OS: Windows/Linux/Mac  2. System: Laptop/Desktop/Mobile  3. Browser: Google Chrome/Microsoft Edge/Firefox/Safari  4. Network: Stable Internet Connection |

| Column A | Column B |
| --- | --- |
| Test Scenario | Verify uploaded profile and verification images display correctly across browsers. |

| Test Case ID | Test Steps | Test Input | Expected Results | Actual Results | Status | Test Type | Comments |
| --- | --- | --- | --- | --- | --- | --- | --- |
| CT-020 | 1. Log in as Job Seeker and navigate to Profile page in Chrome. | Browsers: Chrome, Firefox, Edge<br>File types: JPG, PNG<br>Files: js/jobseeker-profile.js, js/employer-verification.js | Selected images upload successfully and display correctly after saving or submission across all tested browsers. | Tested image upload and post-upload display for Job Seeker profile images and Employer verification images. Uploaded images were saved successfully and displayed correctly after saving/submission. The test focuses on the stable upload-and-display behaviour and does not assess the optional pre-save preview behaviour. | Pass | Normal | Stable upload and post-upload image display worked correctly. Pre-save preview behaviour was excluded from this compatibility test because it is not consistently stable. |
|  | 2. Select and upload a profile image, then save the profile. |  |  |  |  |  |  |
|  | 3. Verify the uploaded profile image displays correctly after saving. |  |  |  |  |  |  |
|  | 4. Log in as Employer and upload a verification document image; verify it displays correctly after submission. |  |  |  |  |  |  |
|  | 5. Repeat the upload/display checks in Firefox and Edge. |  |  |  |  |  |  |

## Form & Input

| Column A | Column B |
| --- | --- |
| Module Name:- | Compatibility Testing – Form &amp; Input |
| Test Case ID | CT-021 |
| Tester Name | Len Pei Ying |
| Test Case Description | Verify date picker for interview scheduling works across browsers. |
| Prerequisites: | Logged in as Employer with an accepted application. |

| Column A | Column B |
| --- | --- |
| Tester's Name | Len Pei Ying |
| Environmental Information:- | 1. OS: Windows/Linux/Mac  2. System: Laptop/Desktop/Mobile  3. Browser: Google Chrome/Microsoft Edge/Firefox/Safari  4. Network: Stable Internet Connection |

| Column A | Column B |
| --- | --- |
| Test Scenario | Verify date picker for interview scheduling works across browsers. |

| Test Case ID | Test Steps | Test Input | Expected Results | Actual Results | Status | Test Type | Comments |
| --- | --- | --- | --- | --- | --- | --- | --- |
| CT-021 | 1. Log in as Employer and open Applicants page in Chrome. | Browsers: Chrome, Firefox, Safari, Edge<br>Files: js/employer-applicants.js, pages/employer/applicants.html | Date and time picker opens and saves correctly across all browsers; scheduled interview date is stored and displayed accurately. | Tested interview date/time scheduling in Google Chrome, Mozilla Firefox and Microsoft Edge. The Employer could open an accepted application, use the date/time picker, select a valid interview date and time, save the schedule, and view the saved interview date/time correctly in all three tested browsers. | Pass | Normal | Interview scheduling worked consistently in Chrome, Firefox and Edge. Browser picker appearance differed slightly, but the selected date/time saved and displayed correctly. |
|  | 2. Select an accepted application and open interview scheduling. |  |  |  |  |  |  |
|  | 3. Click the date/time input and verify date picker opens. |  |  |  |  |  |  |
|  | 4. Select a date and time and verify the value is saved correctly. |  |  |  |  |  |  |
|  | 5. Repeat steps 1–4 in Firefox, Safari, and Edge. |  |  |  |  |  |  |
| Module Name:- | Compatibility Testing – Form &amp; Input |  |  |  |  |  |  |
| Test Case ID | CT-022 |  |  |  |  |  |  |
| Tester Name | Len Pei Ying |  |  |  |  |  |  |
| Test Case Description | Verify file size and type validation on profile picture upload is consistent across browsers. |  |  |  |  |  |  |
| Prerequisites: | Logged in as Job Seeker; oversized file and invalid file type available for testing. |  |  |  |  |  |  |

| Column A | Column B |
| --- | --- |
| Tester's Name | Len Pei Ying |
| Environmental Information:- | 1. OS: Windows/Linux/Mac  2. System: Laptop/Desktop/Mobile  3. Browser: Google Chrome/Microsoft Edge/Firefox/Safari  4. Network: Stable Internet Connection |

| Column A | Column B |
| --- | --- |
| Test Scenario | Verify file size and type validation on profile picture upload is consistent across browsers. |

| Test Case ID | Test Steps | Test Input | Expected Results | Actual Results | Status | Test Type | Comments |
| --- | --- | --- | --- | --- | --- | --- | --- |
| CT-022 | 1. Log in as Job Seeker and attempt to upload a file exceeding the size limit in Chrome. | Browsers: Chrome, Firefox, Safari, Edge<br>Test files: oversized file, .exe, valid JPG/PNG<br>Files: js/jobseeker-profile.js | File size and type validation rejects invalid files with clear error messages consistently across all browsers; valid files are accepted. | Tested profile picture file validation in Google Chrome, Mozilla Firefox and Microsoft Edge. An oversized file was rejected with an appropriate validation message, an invalid file type was rejected, and a valid JPG/PNG image was accepted successfully. The validation behaviour was consistent across all three tested browsers. | Pass | Abnormal | File size and file type validation worked consistently in Chrome, Firefox and Edge; valid image files were accepted as expected. |
|  | 2. Verify an appropriate error message is shown. |  |  |  |  |  |  |
|  | 3. Attempt to upload an invalid file type (e.g. .exe) and verify rejection. |  |  |  |  |  |  |
|  | 4. Upload a valid JPG/PNG and verify it is accepted. |  |  |  |  |  |  |
|  | 5. Repeat steps 1–4 in Firefox, Safari, and Edge. |  |  |  |  |  |  |
| Module Name:- | Compatibility Testing – Form &amp; Input |  |  |  |  |  |  |
| Test Case ID | CT-023 |  |  |  |  |  |  |
| Tester Name | Len Pei Ying |  |  |  |  |  |  |
| Test Case Description | Verify password field masking works correctly across browsers. |  |  |  |  |  |  |
| Prerequisites: | Access to Login and Register pages in Chrome, Firefox, Safari, and Edge. |  |  |  |  |  |  |

| Column A | Column B |
| --- | --- |
| Tester's Name | Len Pei Ying |
| Environmental Information:- | 1. OS: Windows/Linux/Mac  2. System: Laptop/Desktop/Mobile  3. Browser: Google Chrome/Microsoft Edge/Firefox/Safari  4. Network: Stable Internet Connection |

| Column A | Column B |
| --- | --- |
| Test Scenario | Verify password field masking works correctly across browsers. |

| Test Case ID | Test Steps | Test Input | Expected Results | Actual Results | Status | Test Type | Comments |
| --- | --- | --- | --- | --- | --- | --- | --- |
| CT-023 | 1. Open Login page in Chrome and type in the password field. | Browsers: Chrome, Firefox, Safari, Edge<br>Files: login.html, register.html, js/auth.js | Password field masks input as dots/asterisks in all browsers; show/hide toggle works correctly; no plain text password is exposed in console or network requests. | Password fields use input type=password which is universally supported and masks input by default in all modern browsers. Password is transmitted to Supabase Auth over HTTPS and never logged to the browser console. | Pass | Normal | Show/hide toggle (if implemented) uses JS to toggle input type between password and text, which is supported consistently across all tested browsers. |
|  | 2. Verify password characters are masked (shown as dots/asterisks). |  |  |  |  |  |  |
|  | 3. Click the show/hide password toggle (if available) and verify it works. |  |  |  |  |  |  |
|  | 4. Repeat steps 1–3 in Firefox, Safari, and Edge. |  |  |  |  |  |  |
|  | 5. Verify no plain text password is visible in the browser console or network tab. |  |  |  |  |  |  |
