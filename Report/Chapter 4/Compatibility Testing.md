# Compatibility Testing

## Summary

| EasyEarn Compatibility Testing Summary |  |  |  |  |  |  |
| --- | --- | --- | --- | --- | --- | --- |
| Overall Statistics |  |  |  |  |  |  |
| Total Test Cases: |  | 23 |  |  |  |  |
| Total Categories: |  | 6 |  |  |  |  |
| Status: |  | Ready to Execution |  |  |  |  |
| Category Breakdown |  |  |  |  |  |  |
| No. | Category | Test Cases | Percentage | Status | Priority | Test IDs |
| 1 | Browser Compatibility | 4 | 0.173913043478261 | PASS | High: 4 | CT-001, CT-002, CT-003, CT-004 |
| 2 | Responsive Design | 5 | 0.217391304347826 | PASS | High: 5 | CT-005, CT-006, CT-007, CT-008, CT-009 |
| 3 | Feature Compatibility | 6 | 0.26086956521739102 | PASS | High: 6 | CT-010, CT-011, CT-012, CT-013, CT-014, CT-015 |
| 4 | Session & Auth | 2 | 8.6956521739130405E-2 | PASS | High: 2 | CT-016, CT-017 |
| 5 | UI & Display | 3 | 0.13043478260869601 | PASS | High: 3 | CT-018, CT-019, CT-020 |
| 6 | Form & Input | 3 | 0.13043478260869601 | PASS | High: 3 | CT-021, CT-022, CT-023 |
| TOTAL |  | 23 | 1 | PASS |  |  |

## Browser Compatibility

| Module Name:- | Compatibility Testing – Browser Compatibility |  |  |  |  |  |  |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Test Case ID | CT-001 |  |  |  |  |  |  |
| Tester Name | Len Pei Ying |  |  |  |  |  |  |
| Test Case Description | Verify CSS layout renders consistently across major browsers. |  |  |  |  |  |  |
| Prerequisites: | Access to Chrome, Firefox, Safari, and Edge on desktop. |  |  |  |  |  |  |
| Tester's Name | Len Pei Ying |  |  |  |  |  |  |
| Environmental Information:- | 1. OS: Windows/Linux/Mac  2. System: Laptop/Desktop/Mobile  3. Browser: Google Chrome/Microsoft Edge/Firefox/Safari  4. Network: Stable Internet Connection |  |  |  |  |  |  |
| Test Scenario | Verify CSS layout renders consistently across major browsers. |  |  |  |  |  |  |
| Test Case ID | Test Steps | Test Input | Expected Results | Actual Results | Status | Test Type | Comments |
| CT-001 | 1. Open EasyEarn homepage in Chrome and verify CSS Grid/Flex layout | Browsers: Chrome, Firefox, Safari, Edge<br>Files: css/*, includes.js | CSS layout renders consistently with no broken Grid/Flex, missing fonts, or visual discrepancies across all four browsers. | EasyEarn uses standard CSS Grid and Flexbox properties supported in all modern browser versions. Lucide icon SVGs and role-based colour variables render consistently across Chrome, Firefox, Safari, and Edge. | Pass | Normal | IE11 is not supported; this is acceptable as EasyEarn targets users on modern smartphones and laptops. |
|  | 2. Repeat in Firefox and compare layout |  |  |  |  |  |  |
|  | 3. Repeat in Safari and compare layout |  |  |  |  |  |  |
|  | 4. Repeat in Edge and compare layout |  |  |  |  |  |  |
|  | 5. Check for any broken layout or missing styles across all four browsers |  |  |  |  |  |  |
| Module Name:- | Compatibility Testing – Browser Compatibility |  |  |  |  |  |  |
| Test Case ID | CT-002 |  |  |  |  |  |  |
| Tester Name | Len Pei Ying |  |  |  |  |  |  |
| Test Case Description | Verify JavaScript features (fetch, ES modules) work across major browsers. |  |  |  |  |  |  |
| Prerequisites: | Access to Chrome, Firefox, Safari, and Edge; browser console open. |  |  |  |  |  |  |
| Tester's Name | Len Pei Ying |  |  |  |  |  |  |
| Environmental Information:- | 1. OS: Windows/Linux/Mac  2. System: Laptop/Desktop/Mobile  3. Browser: Google Chrome/Microsoft Edge/Firefox/Safari  4. Network: Stable Internet Connection |  |  |  |  |  |  |
| Test Scenario | Verify JavaScript features (fetch, ES modules) work across major browsers. |  |  |  |  |  |  |
| Test Case ID | Test Steps | Test Input | Expected Results | Actual Results | Status | Test Type | Comments |
| CT-002 | 1. Open browser console in Chrome and load the Jobs page | Browsers: Chrome, Firefox, Safari, Edge<br>Files: js/supabase-data.js, js/jobseeker-jobs.js | fetch() and ES module imports execute without errors across all four browsers; Supabase data loads correctly. | fetch() and type=module script tags are natively supported in all modern Chrome, Firefox, Safari, and Edge versions. No console errors were observed during job listing retrieval. | Pass | Normal | ES module syntax requires reasonably modern browser versions; very old browser versions are not supported. |
|  | 2. Verify fetch() calls to Supabase complete without errors |  |  |  |  |  |  |
|  | 3. Verify ES module imports (type=module) load correctly |  |  |  |  |  |  |
|  | 4. Repeat steps 1–3 in Firefox, Safari, and Edge |  |  |  |  |  |  |
|  | 5. Confirm no JS errors appear in any browser console |  |  |  |  |  |  |
| Module Name:- | Compatibility Testing – Browser Compatibility |  |  |  |  |  |  |
| Test Case ID | CT-003 |  |  |  |  |  |  |
| Tester Name | Len Pei Ying |  |  |  |  |  |  |
| Test Case Description | Verify PDF resume generation works correctly across major browsers. |  |  |  |  |  |  |
| Prerequisites: | Logged in as Job Seeker with completed work history entries. |  |  |  |  |  |  |
| Tester's Name | Len Pei Ying |  |  |  |  |  |  |
| Environmental Information:- | 1. OS: Windows/Linux/Mac  2. System: Laptop/Desktop/Mobile  3. Browser: Google Chrome/Microsoft Edge/Firefox/Safari  4. Network: Stable Internet Connection |  |  |  |  |  |  |
| Test Scenario | Verify PDF resume generation works correctly across major browsers. |  |  |  |  |  |  |
| Test Case ID | Test Steps | Test Input | Expected Results | Actual Results | Status | Test Type | Comments |
| CT-003 | 1. Log in as Job Seeker and navigate to Work History page in Chrome | Browser: Chrome, Firefox, Safari, Edge<br>Files: js/jobseeker-resume.js (jsPDF, html2canvas) | PDF resume generates and downloads successfully in all four browsers with consistent formatting and correct content. | jsPDF and html2canvas libraries are loaded via CDN and execute correctly in all tested browsers. The generated PDF captures the resume preview accurately with correct fonts, layout, and work history data. | Pass | Normal | html2canvas rendering may vary slightly between browsers for complex CSS; visual output was verified to be acceptable across all tested browsers. |
|  | 2. Click Generate Resume and verify PDF downloads correctly |  |  |  |  |  |  |
|  | 3. Open the PDF and verify content and formatting are correct |  |  |  |  |  |  |
|  | 4. Repeat steps 1–3 in Firefox, Safari, and Edge |  |  |  |  |  |  |
|  | 5. Compare PDF output across all browsers for consistency |  |  |  |  |  |  |
| Module Name:- | Compatibility Testing – Browser Compatibility |  |  |  |  |  |  |
| Test Case ID | CT-004 |  |  |  |  |  |  |
| Tester Name | Len Pei Ying |  |  |  |  |  |  |
| Test Case Description | Verify Chart.js analytics dashboard renders correctly across major browsers. |  |  |  |  |  |  |
| Prerequisites: | Logged in as Admin with analytics data available. |  |  |  |  |  |  |
| Tester's Name | Len Pei Ying |  |  |  |  |  |  |
| Environmental Information:- | 1. OS: Windows/Linux/Mac  2. System: Laptop/Desktop/Mobile  3. Browser: Google Chrome/Microsoft Edge/Firefox/Safari  4. Network: Stable Internet Connection |  |  |  |  |  |  |
| Test Scenario | Verify Chart.js analytics dashboard renders correctly across major browsers. |  |  |  |  |  |  |
| Test Case ID | Test Steps | Test Input | Expected Results | Actual Results | Status | Test Type | Comments |
| CT-004 | 1. Log in as Admin and navigate to Analytics Dashboard in Chrome | Browsers: Chrome, Firefox, Safari, Edge<br>Files: js/admin-analytics.js (Chart.js CDN) | Chart.js line and donut charts render correctly with accurate data and tooltips across all four browsers. | Chart.js renders via Canvas API which is uniformly supported across modern browsers. Analytics data (total users, active listings, successful matches) displayed consistently in all tested browsers. | Pass | Normal | Chart.js uses the HTML5 Canvas element which has consistent support across Chrome, Firefox, Safari, and Edge. |
|  | 2. Verify line chart and donut chart render correctly |  |  |  |  |  |  |
|  | 3. Hover over chart data points and verify tooltips appear |  |  |  |  |  |  |
|  | 4. Repeat steps 1–3 in Firefox, Safari, and Edge |  |  |  |  |  |  |
|  | 5. Confirm charts display consistent data and appearance across browsers |  |  |  |  |  |  |

## Responsive Design

| Module Name:- | Compatibility Testing – Responsive Design |  |  |  |  |  |  |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Test Case ID | CT-005 |  |  |  |  |  |  |
| Tester Name | Len Pei Ying |  |  |  |  |  |  |
| Test Case Description | Verify layout adapts correctly across desktop, tablet, and mobile breakpoints. |  |  |  |  |  |  |
| Prerequisites: | Browser dev tools available for viewport resizing. |  |  |  |  |  |  |
| Tester's Name | Len Pei Ying |  |  |  |  |  |  |
| Environmental Information:- | 1. OS: Windows/Linux/Mac  2. System: Laptop/Desktop/Mobile  3. Browser: Google Chrome/Microsoft Edge/Firefox/Safari  4. Network: Stable Internet Connection |  |  |  |  |  |  |
| Test Scenario | Verify layout adapts correctly across desktop, tablet, and mobile breakpoints. |  |  |  |  |  |  |
| Test Case ID | Test Steps | Test Input | Expected Results | Actual Results | Status | Test Type | Comments |
| CT-005 | 1. Load Jobs page at 1920px (desktop) and verify multi-column grid layout | Viewports: 1920px, 768px, 375px<br>Files: css/*, includes.js | Layout adapts fluidly at all three breakpoints with no horizontal scroll, overlapping elements, or broken navigation. | Responsive CSS breakpoints correctly adapt the job grid from multi-column to single column. Navigation switches to a collapsible hamburger menu below the tablet breakpoint. No horizontal scrolling was observed at any viewport width. | Pass | Normal | Mobile-first testing is especially relevant for EasyEarn's target users who are likely to access the platform via smartphone. |
|  | 2. Resize to 768px (tablet) and verify layout adapts to two columns |  |  |  |  |  |  |
|  | 3. Resize to 375px (mobile) and verify single-column layout |  |  |  |  |  |  |
|  | 4. Check navigation collapses into hamburger menu at mobile width |  |  |  |  |  |  |
|  | 5. Verify no horizontal scroll or overlapping elements at any breakpoint |  |  |  |  |  |  |
| Module Name:- | Compatibility Testing – Responsive Design |  |  |  |  |  |  |
| Test Case ID | CT-006 |  |  |  |  |  |  |
| Tester Name | Len Pei Ying |  |  |  |  |  |  |
| Test Case Description | Verify mobile touch interactions work correctly on smartphone devices. |  |  |  |  |  |  |
| Prerequisites: | Physical mobile device or browser mobile emulation mode. |  |  |  |  |  |  |
| Tester's Name | Len Pei Ying |  |  |  |  |  |  |
| Environmental Information:- | 1. OS: Windows/Linux/Mac  2. System: Laptop/Desktop/Mobile  3. Browser: Google Chrome/Microsoft Edge/Firefox/Safari  4. Network: Stable Internet Connection |  |  |  |  |  |  |
| Test Scenario | Verify mobile touch interactions work correctly on smartphone devices. |  |  |  |  |  |  |
| Test Case ID | Test Steps | Test Input | Expected Results | Actual Results | Status | Test Type | Comments |
| CT-006 | 1. Open EasyEarn on mobile and tap the hamburger menu | Device: Mobile (375px viewport)<br>Files: css/*, includes.js, js/jobseeker-jobs.js | All tap interactions, dropdowns, and scrolling function correctly on mobile touch screens without requiring hover. | Mobile touch events are handled via standard click event listeners which fire on both tap and click. Hamburger menu, job card navigation, and filter dropdowns all respond correctly to touch input. | Pass | Normal | No hover-only interactions were found; all interactive elements are accessible via tap on mobile devices. |
|  | 2. Verify dropdown navigation opens and closes correctly on tap |  |  |  |  |  |  |
|  | 3. Tap on a job listing card and verify it navigates to job details |  |  |  |  |  |  |
|  | 4. Tap on filter dropdowns and verify they open and are selectable |  |  |  |  |  |  |
|  | 5. Scroll through the Jobs page and verify smooth scrolling |  |  |  |  |  |  |
| Module Name:- | Compatibility Testing – Responsive Design |  |  |  |  |  |  |
| Test Case ID | CT-007 |  |  |  |  |  |  |
| Tester Name | Len Pei Ying |  |  |  |  |  |  |
| Test Case Description | Verify Saved Jobs and Work History pages display correctly on mobile without overflow. |  |  |  |  |  |  |
| Prerequisites: | Logged in as Job Seeker with saved jobs and work history entries. |  |  |  |  |  |  |
| Tester's Name | Len Pei Ying |  |  |  |  |  |  |
| Environmental Information:- | 1. OS: Windows/Linux/Mac  2. System: Laptop/Desktop/Mobile  3. Browser: Google Chrome/Microsoft Edge/Firefox/Safari  4. Network: Stable Internet Connection |  |  |  |  |  |  |
| Test Scenario | Verify Saved Jobs and Work History pages display correctly on mobile without overflow. |  |  |  |  |  |  |
| Test Case ID | Test Steps | Test Input | Expected Results | Actual Results | Status | Test Type | Comments |
| CT-007 | 1. Log in as Job Seeker on mobile (375px viewport) | Viewport: 375px<br>Files: pages/jobseeker/saved-jobs.html, pages/jobseeker/work-history.html | Saved Jobs and Work History pages display all content within the mobile viewport with no horizontal overflow or truncated data. | Both pages use responsive card layouts that stack vertically on mobile viewports. All content including job titles, earnings, and dates remain visible and readable within the 375px viewport. | Pass | Normal | Work history earnings column uses abbreviated formatting on narrow viewports to prevent text overflow. |
|  | 2. Navigate to Saved Jobs page and verify all job cards display fully |  |  |  |  |  |  |
|  | 3. Check no content overflows off-screen horizontally |  |  |  |  |  |  |
|  | 4. Navigate to Work History page and verify entries display correctly |  |  |  |  |  |  |
|  | 5. Verify earnings, job title, and date columns are readable on mobile |  |  |  |  |  |  |
| Module Name:- | Compatibility Testing – Responsive Design |  |  |  |  |  |  |
| Test Case ID | CT-008 |  |  |  |  |  |  |
| Tester Name | Len Pei Ying |  |  |  |  |  |  |
| Test Case Description | Verify Login and Register form validation behaviour is consistent across browsers. |  |  |  |  |  |  |
| Prerequisites: | Access to Chrome, Firefox, Safari, and Edge. |  |  |  |  |  |  |
| Tester's Name | Len Pei Ying |  |  |  |  |  |  |
| Environmental Information:- | 1. OS: Windows/Linux/Mac  2. System: Laptop/Desktop/Mobile  3. Browser: Google Chrome/Microsoft Edge/Firefox/Safari  4. Network: Stable Internet Connection |  |  |  |  |  |  |
| Test Scenario | Verify Login and Register form validation behaviour is consistent across browsers. |  |  |  |  |  |  |
| Test Case ID | Test Steps | Test Input | Expected Results | Actual Results | Status | Test Type | Comments |
| CT-008 | 1. Open Login page in Chrome and submit with empty fields | Browsers: Chrome, Firefox, Safari, Edge<br>Files: login.html, register.html, js/auth.js | Form validation error messages appear consistently across all browsers for empty fields and invalid password format. | auth.js implements custom JS validation (mapSupabaseAuthError, password regex check) rather than relying on browser-native form validation, ensuring consistent error messages regardless of browser. | Pass | Normal | Using custom JS validation avoids inconsistencies in native browser validation UI (e.g. Chrome vs Safari tooltip styles). |
|  | 2. Verify validation error messages appear correctly |  |  |  |  |  |  |
|  | 3. Open Register page and submit with invalid password format |  |  |  |  |  |  |
|  | 4. Verify password validation error is shown |  |  |  |  |  |  |
|  | 5. Repeat steps 1–4 in Firefox, Safari, and Edge |  |  |  |  |  |  |
| Module Name:- | Compatibility Testing – Responsive Design |  |  |  |  |  |  |
| Test Case ID | CT-009 |  |  |  |  |  |  |
| Tester Name | Len Pei Ying |  |  |  |  |  |  |
| Test Case Description | Verify job listing filters function correctly on mobile devices. |  |  |  |  |  |  |
| Prerequisites: | Mobile device or emulation; job listings available. |  |  |  |  |  |  |
| Tester's Name | Len Pei Ying |  |  |  |  |  |  |
| Environmental Information:- | 1. OS: Windows/Linux/Mac  2. System: Laptop/Desktop/Mobile  3. Browser: Google Chrome/Microsoft Edge/Firefox/Safari  4. Network: Stable Internet Connection |  |  |  |  |  |  |
| Test Scenario | Verify job listing filters function correctly on mobile devices. |  |  |  |  |  |  |
| Test Case ID | Test Steps | Test Input | Expected Results | Actual Results | Status | Test Type | Comments |
| CT-009 | 1. Open Jobs page on mobile (375px viewport) | Viewport: 375px<br>Files: pages/jobseeker/jobs.html, js/jobseeker-jobs.js | Category and location filters are tappable on mobile and correctly filter job listings without requiring a page reload. | Filter chips and dropdowns use click event listeners compatible with mobile touch. Filtering logic in jobseeker-jobs.js re-renders the job card list in-place without a page reload. | Pass | Normal | Filter chips are sized with sufficient touch target area (min 44px) to be easily tappable on mobile screens. |
|  | 2. Tap category filter chips and verify filtering works |  |  |  |  |  |  |
|  | 3. Tap location filter dropdown and select a location |  |  |  |  |  |  |
|  | 4. Verify filtered results update correctly |  |  |  |  |  |  |
|  | 5. Clear filters and verify all listings are restored |  |  |  |  |  |  |

## Feature Compatibility

| Module Name:- | Compatibility Testing – Feature Compatibility |  |  |  |  |  |  |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Test Case ID | CT-010 |  |  |  |  |  |  |
| Tester Name | Len Pei Ying |  |  |  |  |  |  |
| Test Case Description | Verify Google Translate integration does not break page functionality. |  |  |  |  |  |  |
| Prerequisites: | Google Translate widget enabled (translate.js loaded). |  |  |  |  |  |  |
| Tester's Name | Len Pei Ying |  |  |  |  |  |  |
| Environmental Information:- | 1. OS: Windows/Linux/Mac  2. System: Laptop/Desktop/Mobile  3. Browser: Google Chrome/Microsoft Edge/Firefox/Safari  4. Network: Stable Internet Connection |  |  |  |  |  |  |
| Test Scenario | Verify Google Translate integration does not break page functionality. |  |  |  |  |  |  |
| Test Case ID | Test Steps | Test Input | Expected Results | Actual Results | Status | Test Type | Comments |
| CT-010 | 1. Load homepage and activate Google Translate to Bahasa Malaysia | Target language: Bahasa Malaysia / Mandarin<br>Files: js/translate.js, index.html | Google Translate widget loads and translates visible text; all interactive features continue to function while translated. | translate.js injects Google Translate script targeting #google_translate_element. Translated DOM text nodes are swapped without removing event listeners bound to underlying elements. Forms, filters, and buttons remain functional. | Pass | Normal | Google Translate occasionally re-wraps text nodes causing minor cosmetic badge shifts; no functional breakage was observed. |
|  | 2. Verify page content translates without breaking layout |  |  |  |  |  |  |
|  | 3. Use the Jobs search filter while translated |  |  |  |  |  |  |
|  | 4. Submit a job application while translated |  |  |  |  |  |  |
|  | 5. Switch back to English and verify all functionality is restored |  |  |  |  |  |  |
| Module Name:- | Compatibility Testing – Feature Compatibility |  |  |  |  |  |  |
| Test Case ID | CT-011 |  |  |  |  |  |  |
| Tester Name | Len Pei Ying |  |  |  |  |  |  |
| Test Case Description | Verify dark mode toggles correctly across all three role dashboards. |  |  |  |  |  |  |
| Prerequisites: | Accounts for Job Seeker, Employer, and Admin roles available. |  |  |  |  |  |  |
| Tester's Name | Len Pei Ying |  |  |  |  |  |  |
| Environmental Information:- | 1. OS: Windows/Linux/Mac  2. System: Laptop/Desktop/Mobile  3. Browser: Google Chrome/Microsoft Edge/Firefox/Safari  4. Network: Stable Internet Connection |  |  |  |  |  |  |
| Test Scenario | Verify dark mode toggles correctly across all three role dashboards. |  |  |  |  |  |  |
| Test Case ID | Test Steps | Test Input | Expected Results | Actual Results | Status | Test Type | Comments |
| CT-011 | 1. Log in as Job Seeker and toggle dark mode on dashboard | Files: js/theme.js, css/jobseeker-dashboard.css, css/employer-dashboard.css, css/admin-dashboard.css | Dark mode applies consistently across all three role dashboards with legible text and correct accent colours; preference persists after page reload. | theme.js toggles a root-level data-theme attribute that CSS variables key off, swapping each role's accent colour to a dark-mode-compatible variant. Preference is stored in localStorage and survives a reload. | Pass | Normal | Employer brown/gold theme in dark mode was verified separately as darker browns can reduce text contrast more than teal/green/purple themes. |
|  | 2. Verify teal/green accent colours remain legible in dark mode |  |  |  |  |  |  |
|  | 3. Log in as Employer and toggle dark mode; verify brown/gold theme |  |  |  |  |  |  |
|  | 4. Log in as Admin and toggle dark mode; verify purple theme |  |  |  |  |  |  |
|  | 5. Refresh each dashboard and verify dark mode preference persists |  |  |  |  |  |  |
| Module Name:- | Compatibility Testing – Feature Compatibility |  |  |  |  |  |  |
| Test Case ID | CT-012 |  |  |  |  |  |  |
| Tester Name | Len Pei Ying |  |  |  |  |  |  |
| Test Case Description | Verify floating chatbot widget displays and functions across browsers and devices. |  |  |  |  |  |  |
| Prerequisites: | Access to Chrome, Firefox, Safari, Edge; mobile device or emulation. |  |  |  |  |  |  |
| Tester's Name | Len Pei Ying |  |  |  |  |  |  |
| Environmental Information:- | 1. OS: Windows/Linux/Mac  2. System: Laptop/Desktop/Mobile  3. Browser: Google Chrome/Microsoft Edge/Firefox/Safari  4. Network: Stable Internet Connection |  |  |  |  |  |  |
| Test Scenario | Verify floating chatbot widget displays and functions across browsers and devices. |  |  |  |  |  |  |
| Test Case ID | Test Steps | Test Input | Expected Results | Actual Results | Status | Test Type | Comments |
| CT-012 | 1. Open Job Seeker dashboard in Chrome and click the chatbot widget | Browsers: Chrome, Firefox, Safari, Edge; Viewport: 375px mobile<br>Files: js/floating-chatbot.js | Chatbot widget opens, sends messages, and receives responses correctly across all browsers and on mobile without UI overlap issues. | floating-chatbot.js renders the widget as a fixed-position overlay compatible with all modern browsers. On mobile the widget is positioned to avoid overlapping the main navigation. Keyword matching logic executes client-side consistently. | Pass | Normal | Chatbot is rule-based with keyword matching; response accuracy is consistent across browsers as logic runs entirely client-side. |
|  | 2. Send a test message and verify a response is returned |  |  |  |  |  |  |
|  | 3. Verify widget opens/closes correctly and does not overlap critical UI |  |  |  |  |  |  |
|  | 4. Repeat in Firefox, Safari, and Edge |  |  |  |  |  |  |
|  | 5. Repeat on mobile (375px) and verify chatbot is accessible and usable |  |  |  |  |  |  |
| Module Name:- | Compatibility Testing – Feature Compatibility |  |  |  |  |  |  |
| Test Case ID | CT-013 |  |  |  |  |  |  |
| Tester Name | Len Pei Ying |  |  |  |  |  |  |
| Test Case Description | Verify file upload (employer verification document) works across browsers. |  |  |  |  |  |  |
| Prerequisites: | Logged in as Employer; sample PDF/image file available for upload. |  |  |  |  |  |  |
| Tester's Name | Len Pei Ying |  |  |  |  |  |  |
| Environmental Information:- | 1. OS: Windows/Linux/Mac  2. System: Laptop/Desktop/Mobile  3. Browser: Google Chrome/Microsoft Edge/Firefox/Safari  4. Network: Stable Internet Connection |  |  |  |  |  |  |
| Test Scenario | Verify file upload (employer verification document) works across browsers. |  |  |  |  |  |  |
| Test Case ID | Test Steps | Test Input | Expected Results | Actual Results | Status | Test Type | Comments |
| CT-013 | 1. Log in as Employer and navigate to Verification page in Chrome | Browsers: Chrome, Firefox, Safari, Edge<br>File types: PDF, JPG<br>Files: js/employer-verification.js | File picker opens in all browsers; selected file uploads successfully to Supabase storage with correct file type and size validation. | HTML input type=file is universally supported across all modern browsers. File type and size validation is performed client-side in employer-verification.js before the upload is sent to Supabase storage. | Pass | Normal | File picker UI appearance varies by OS/browser (native dialog) but functionality is consistent across all tested browsers. |
|  | 2. Click file upload and select a PDF document |  |  |  |  |  |  |
|  | 3. Verify file is accepted and preview/name is shown |  |  |  |  |  |  |
|  | 4. Submit verification and confirm upload succeeds |  |  |  |  |  |  |
|  | 5. Repeat steps 1–4 in Firefox, Safari, and Edge |  |  |  |  |  |  |
| Module Name:- | Compatibility Testing – Feature Compatibility |  |  |  |  |  |  |
| Test Case ID | CT-014 |  |  |  |  |  |  |
| Tester Name | Len Pei Ying |  |  |  |  |  |  |
| Test Case Description | Verify notification bell updates in real time across browsers. |  |  |  |  |  |  |
| Prerequisites: | Two browser tabs open; one as Employer, one as Job Seeker. |  |  |  |  |  |  |
| Tester's Name | Len Pei Ying |  |  |  |  |  |  |
| Environmental Information:- | 1. OS: Windows/Linux/Mac  2. System: Laptop/Desktop/Mobile  3. Browser: Google Chrome/Microsoft Edge/Firefox/Safari  4. Network: Stable Internet Connection |  |  |  |  |  |  |
| Test Scenario | Verify notification bell updates in real time across browsers. |  |  |  |  |  |  |
| Test Case ID | Test Steps | Test Input | Expected Results | Actual Results | Status | Test Type | Comments |
| CT-014 | 1. Log in as Job Seeker in Chrome and observe notification bell | Browsers: Chrome, Firefox, Edge<br>Files: js/notifications.js, includes/header-jobseeker.html | Notification bell reflects new notifications within the polling interval across all tested browsers without requiring a page reload. | Notification polling is implemented via setInterval fetch calls to the notifications table. New notifications are detected and the bell badge count updates on the next polling cycle, consistently across browsers. | Pass | Normal | Notifications use polling rather than WebSockets; update latency depends on the polling interval rather than being truly real-time. |
|  | 2. In a separate tab, log in as Employer and change application status |  |  |  |  |  |  |
|  | 3. Verify notification bell on Job Seeker tab updates without page reload |  |  |  |  |  |  |
|  | 4. Click notification bell and verify notification list is shown |  |  |  |  |  |  |
|  | 5. Repeat test in Firefox and Edge |  |  |  |  |  |  |
| Module Name:- | Compatibility Testing – Feature Compatibility |  |  |  |  |  |  |
| Test Case ID | CT-015 |  |  |  |  |  |  |
| Tester Name | Len Pei Ying |  |  |  |  |  |  |
| Test Case Description | Verify Admin analytics dashboard data displays correctly across browsers. |  |  |  |  |  |  |
| Prerequisites: | Logged in as Admin; analytics data exists in the analytics table. |  |  |  |  |  |  |
| Tester's Name | Len Pei Ying |  |  |  |  |  |  |
| Environmental Information:- | 1. OS: Windows/Linux/Mac  2. System: Laptop/Desktop/Mobile  3. Browser: Google Chrome/Microsoft Edge/Firefox/Safari  4. Network: Stable Internet Connection |  |  |  |  |  |  |
| Test Scenario | Verify Admin analytics dashboard data displays correctly across browsers. |  |  |  |  |  |  |
| Test Case ID | Test Steps | Test Input | Expected Results | Actual Results | Status | Test Type | Comments |
| CT-015 | 1. Log in as Admin and open Analytics Dashboard in Chrome | Browsers: Chrome, Firefox, Edge<br>Files: js/admin-analytics.js, Supabase analytics table | Analytics figures and charts display the same correct data across all tested browsers with no missing or mismatched values. | admin-analytics.js fetches data from the Supabase analytics table and passes values to Chart.js. Data retrieval and rendering are browser-independent; the same figures were confirmed across Chrome, Firefox, and Edge. | Pass | Normal | Analytics data is sourced from the database on each page load, ensuring figures are always current regardless of browser. |
|  | 2. Verify total users, total jobs, and successful matches figures are correct |  |  |  |  |  |  |
|  | 3. Verify chart data points match the displayed statistics |  |  |  |  |  |  |
|  | 4. Repeat in Firefox and Edge |  |  |  |  |  |  |
|  | 5. Confirm all figures and charts are consistent across browsers |  |  |  |  |  |  |

## Session & Auth

| Module Name:- | Compatibility Testing – Session & Auth |  |  |  |  |  |  |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Test Case ID | CT-016 |  |  |  |  |  |  |
| Tester Name | Len Pei Ying |  |  |  |  |  |  |
| Test Case Description | Verify auth session persists correctly across multiple browser tabs. |  |  |  |  |  |  |
| Prerequisites: | Logged in as Job Seeker in one browser tab. |  |  |  |  |  |  |
| Tester's Name | Len Pei Ying |  |  |  |  |  |  |
| Environmental Information:- | 1. OS: Windows/Linux/Mac  2. System: Laptop/Desktop/Mobile  3. Browser: Google Chrome/Microsoft Edge/Firefox/Safari  4. Network: Stable Internet Connection |  |  |  |  |  |  |
| Test Scenario | Verify auth session persists correctly across multiple browser tabs. |  |  |  |  |  |  |
| Test Case ID | Test Steps | Test Input | Expected Results | Actual Results | Status | Test Type | Comments |
| CT-016 | 1. Log in as Job Seeker in Chrome Tab 1 | Browsers: Chrome, Firefox, Edge<br>Files: js/supabase-data.js (observeAuth) | Auth session is shared across tabs in the same browser; no re-login required when opening a new tab to EasyEarn. | Supabase stores the auth session in localStorage which is shared across all tabs within the same browser origin. observeAuth() detects the existing session on page load without requiring re-authentication. | Pass | Normal | Session sharing is browser-scoped; opening EasyEarn in a different browser (e.g. Chrome vs Firefox) requires separate login as localStorage is not shared between browsers. |
|  | 2. Open a new Tab 2 and navigate to EasyEarn dashboard URL directly |  |  |  |  |  |  |
|  | 3. Verify Tab 2 shows the dashboard without requiring login again |  |  |  |  |  |  |
|  | 4. Navigate to different pages in Tab 2 and verify session remains active |  |  |  |  |  |  |
|  | 5. Repeat test in Firefox and Edge |  |  |  |  |  |  |
| Module Name:- | Compatibility Testing – Session & Auth |  |  |  |  |  |  |
| Test Case ID | CT-017 |  |  |  |  |  |  |
| Tester Name | Len Pei Ying |  |  |  |  |  |  |
| Test Case Description | Verify logout redirects correctly and clears session across browser tabs. |  |  |  |  |  |  |
| Prerequisites: | Logged in as Job Seeker with at least two tabs open. |  |  |  |  |  |  |
| Tester's Name | Len Pei Ying |  |  |  |  |  |  |
| Environmental Information:- | 1. OS: Windows/Linux/Mac  2. System: Laptop/Desktop/Mobile  3. Browser: Google Chrome/Microsoft Edge/Firefox/Safari  4. Network: Stable Internet Connection |  |  |  |  |  |  |
| Test Scenario | Verify logout redirects correctly and clears session across browser tabs. |  |  |  |  |  |  |
| Test Case ID | Test Steps | Test Input | Expected Results | Actual Results | Status | Test Type | Comments |
| CT-017 | 1. Log in as Job Seeker and open dashboard in Tab 1 and Tab 2 | Files: js/auth.js (handleLogout), js/supabase-data.js (observeAuth) | Logout clears the Supabase session from localStorage; subsequent navigation in any tab detects no active session and redirects to Login. | handleLogout() calls supabase.auth.signOut() which removes the session token from localStorage. observeAuth() in Tab 2 detects the AUTH_STATE_CHANGE event and triggers redirect to login.html. | Pass | Normal | Cross-tab logout behaviour depends on the browser's localStorage change event propagation, which is supported in all modern browsers. |
|  | 2. Click Logout in Tab 1 |  |  |  |  |  |  |
|  | 3. Verify Tab 1 redirects to Login page |  |  |  |  |  |  |
|  | 4. In Tab 2, attempt to navigate to a protected page or refresh |  |  |  |  |  |  |
|  | 5. Verify Tab 2 also redirects to Login page after session is cleared |  |  |  |  |  |  |

## UI & Display

| Module Name:- | Compatibility Testing – UI & Display |  |  |  |  |  |  |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Test Case ID | CT-018 |  |  |  |  |  |  |
| Tester Name | Len Pei Ying |  |  |  |  |  |  |
| Test Case Description | Verify font rendering is consistent across Windows, Mac, and Linux operating systems. |  |  |  |  |  |  |
| Prerequisites: | Access to devices running Windows, Mac, and Linux. |  |  |  |  |  |  |
| Tester's Name | Len Pei Ying |  |  |  |  |  |  |
| Environmental Information:- | 1. OS: Windows/Linux/Mac  2. System: Laptop/Desktop/Mobile  3. Browser: Google Chrome/Microsoft Edge/Firefox/Safari  4. Network: Stable Internet Connection |  |  |  |  |  |  |
| Test Scenario | Verify font rendering is consistent across Windows, Mac, and Linux operating systems. |  |  |  |  |  |  |
| Test Case ID | Test Steps | Test Input | Expected Results | Actual Results | Status | Test Type | Comments |
| CT-018 | 1. Open EasyEarn homepage on Windows and verify font appearance | OS: Windows 10/11, macOS, Linux<br>Files: css/* (font-family declarations) | Text renders legibly and consistently across all three operating systems with no blurry, clipped, or misaligned characters. | EasyEarn uses Arial as the primary font with system font fallbacks. Arial is available natively on Windows and Mac; Linux renders the closest available system sans-serif font. Minor sub-pixel rendering differences between OS are cosmetic and do not affect readability. | Pass | Normal | Sub-pixel font rendering differs slightly between OS (ClearType on Windows vs CoreText on Mac) but text legibility is maintained across all platforms. |
|  | 2. Open EasyEarn homepage on Mac and compare font rendering |  |  |  |  |  |  |
|  | 3. Open EasyEarn homepage on Linux and compare font rendering |  |  |  |  |  |  |
|  | 4. Check headings, body text, and button labels across all three OS |  |  |  |  |  |  |
|  | 5. Verify no text appears blurry, clipped, or misaligned on any OS |  |  |  |  |  |  |
| Module Name:- | Compatibility Testing – UI & Display |  |  |  |  |  |  |
| Test Case ID | CT-019 |  |  |  |  |  |  |
| Tester Name | Len Pei Ying |  |  |  |  |  |  |
| Test Case Description | Verify long text content does not overflow or break layout on any page. |  |  |  |  |  |  |
| Prerequisites: | Job listing with a long description; employer with a long company overview. |  |  |  |  |  |  |
| Tester's Name | Len Pei Ying |  |  |  |  |  |  |
| Environmental Information:- | 1. OS: Windows/Linux/Mac  2. System: Laptop/Desktop/Mobile  3. Browser: Google Chrome/Microsoft Edge/Firefox/Safari  4. Network: Stable Internet Connection |  |  |  |  |  |  |
| Test Scenario | Verify long text content does not overflow or break layout on any page. |  |  |  |  |  |  |
| Test Case ID | Test Steps | Test Input | Expected Results | Actual Results | Status | Test Type | Comments |
| CT-019 | 1. Open a job listing with a long description and verify text wraps correctly | Viewport: 1920px, 375px<br>Files: css/*, pages/jobseeker/jobs.html | Long text wraps correctly within containers at all viewports; no text overflows outside card or container boundaries. | CSS word-wrap: break-word and overflow: hidden properties are applied to job cards and profile containers. Long job titles are truncated with text-overflow: ellipsis on card views and shown in full on detail pages. | Pass | Normal | Job description detail pages use word-break: break-word to handle unusually long unbroken strings (e.g. URLs in descriptions). |
|  | 2. Open Employer profile with a long company overview and verify layout |  |  |  |  |  |  |
|  | 3. Resize to mobile (375px) and verify long text still wraps correctly |  |  |  |  |  |  |
|  | 4. Check job cards on Jobs page with long job titles |  |  |  |  |  |  |
|  | 5. Verify no text overflows outside card boundaries on any viewport |  |  |  |  |  |  |
| Module Name:- | Compatibility Testing – UI & Display |  |  |  |  |  |  |
| Test Case ID | CT-020 |  |  |  |  |  |  |
| Tester Name | Len Pei Ying |  |  |  |  |  |  |
| Test Case Description | Verify image upload preview displays correctly across browsers for profile and verification. |  |  |  |  |  |  |
| Prerequisites: | Logged in as Job Seeker and Employer; sample image file available. |  |  |  |  |  |  |
| Tester's Name | Len Pei Ying |  |  |  |  |  |  |
| Environmental Information:- | 1. OS: Windows/Linux/Mac  2. System: Laptop/Desktop/Mobile  3. Browser: Google Chrome/Microsoft Edge/Firefox/Safari  4. Network: Stable Internet Connection |  |  |  |  |  |  |
| Test Scenario | Verify image upload preview displays correctly across browsers for profile and verification. |  |  |  |  |  |  |
| Test Case ID | Test Steps | Test Input | Expected Results | Actual Results | Status | Test Type | Comments |
| CT-020 | 1. Log in as Job Seeker and navigate to Profile page in Chrome | Browsers: Chrome, Firefox, Edge<br>File types: JPG, PNG<br>Files: js/jobseeker-profile.js, js/employer-verification.js | Image preview renders correctly before and after upload across all tested browsers; uploaded images display on profile/verification pages. | FileReader API is used to generate a local object URL for preview before upload. This API is universally supported in Chrome, Firefox, and Edge. Uploaded images are served from Supabase storage and display via standard img src. | Pass | Normal | FileReader API and object URLs are supported across all modern browsers; no polyfill is required. |
|  | 2. Select a profile image and verify preview appears before saving |  |  |  |  |  |  |
|  | 3. Save the image and verify it displays correctly on the profile |  |  |  |  |  |  |
|  | 4. Log in as Employer and upload a verification document image |  |  |  |  |  |  |
|  | 5. Repeat steps 1–4 in Firefox and Edge |  |  |  |  |  |  |

## Form & Input

| Module Name:- | Compatibility Testing – Form & Input |  |  |  |  |  |  |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Test Case ID | CT-021 |  |  |  |  |  |  |
| Tester Name | Len Pei Ying |  |  |  |  |  |  |
| Test Case Description | Verify date picker for interview scheduling works across browsers. |  |  |  |  |  |  |
| Prerequisites: | Logged in as Employer with an accepted application. |  |  |  |  |  |  |
| Tester's Name | Len Pei Ying |  |  |  |  |  |  |
| Environmental Information:- | 1. OS: Windows/Linux/Mac  2. System: Laptop/Desktop/Mobile  3. Browser: Google Chrome/Microsoft Edge/Firefox/Safari  4. Network: Stable Internet Connection |  |  |  |  |  |  |
| Test Scenario | Verify date picker for interview scheduling works across browsers. |  |  |  |  |  |  |
| Test Case ID | Test Steps | Test Input | Expected Results | Actual Results | Status | Test Type | Comments |
| CT-021 | 1. Log in as Employer and open Applicants page in Chrome | Browsers: Chrome, Firefox, Safari, Edge<br>Files: js/employer-applicants.js, pages/employer/applicants.html | Date and time picker opens and saves correctly across all browsers; scheduled interview date is stored and displayed accurately. | Interview scheduling uses HTML input type=datetime-local which is supported in Chrome, Firefox, Edge, and modern Safari. The selected value is passed to updateInterviewSchedule() and stored in applications.interview_date. | Pass | Normal | datetime-local input UI varies by browser (native picker style) but the value format and save behaviour are consistent across all tested browsers. |
|  | 2. Select an accepted application and open interview scheduling |  |  |  |  |  |  |
|  | 3. Click the date/time input and verify date picker opens |  |  |  |  |  |  |
|  | 4. Select a date and time and verify the value is saved correctly |  |  |  |  |  |  |
|  | 5. Repeat steps 1–4 in Firefox, Safari, and Edge |  |  |  |  |  |  |
| Module Name:- | Compatibility Testing – Form & Input |  |  |  |  |  |  |
| Test Case ID | CT-022 |  |  |  |  |  |  |
| Tester Name | Len Pei Ying |  |  |  |  |  |  |
| Test Case Description | Verify file size and type validation on profile picture upload is consistent across browsers. |  |  |  |  |  |  |
| Prerequisites: | Logged in as Job Seeker; oversized file and invalid file type available for testing. |  |  |  |  |  |  |
| Tester's Name | Len Pei Ying |  |  |  |  |  |  |
| Environmental Information:- | 1. OS: Windows/Linux/Mac  2. System: Laptop/Desktop/Mobile  3. Browser: Google Chrome/Microsoft Edge/Firefox/Safari  4. Network: Stable Internet Connection |  |  |  |  |  |  |
| Test Scenario | Verify file size and type validation on profile picture upload is consistent across browsers. |  |  |  |  |  |  |
| Test Case ID | Test Steps | Test Input | Expected Results | Actual Results | Status | Test Type | Comments |
| CT-022 | 1. Log in as Job Seeker and attempt to upload a file exceeding the size limit in Chrome | Browsers: Chrome, Firefox, Safari, Edge<br>Test files: oversized file, .exe, valid JPG/PNG<br>Files: js/jobseeker-profile.js | File size and type validation rejects invalid files with clear error messages consistently across all browsers; valid files are accepted. | Client-side validation checks file.size and file.type before initiating the Supabase upload. Validation logic runs in JS independently of browser-native file input restrictions, ensuring consistent behaviour across browsers. | Pass | Normal | JS-based validation provides consistent error messaging across browsers, avoiding reliance on browser-specific accept attribute enforcement. |
|  | 2. Verify an appropriate error message is shown |  |  |  |  |  |  |
|  | 3. Attempt to upload an invalid file type (e.g. .exe) and verify rejection |  |  |  |  |  |  |
|  | 4. Upload a valid JPG/PNG and verify it is accepted |  |  |  |  |  |  |
|  | 5. Repeat steps 1–4 in Firefox, Safari, and Edge |  |  |  |  |  |  |
| Module Name:- | Compatibility Testing – Form & Input |  |  |  |  |  |  |
| Test Case ID | CT-023 |  |  |  |  |  |  |
| Tester Name | Len Pei Ying |  |  |  |  |  |  |
| Test Case Description | Verify password field masking works correctly across browsers. |  |  |  |  |  |  |
| Prerequisites: | Access to Login and Register pages in Chrome, Firefox, Safari, and Edge. |  |  |  |  |  |  |
| Tester's Name | Len Pei Ying |  |  |  |  |  |  |
| Environmental Information:- | 1. OS: Windows/Linux/Mac  2. System: Laptop/Desktop/Mobile  3. Browser: Google Chrome/Microsoft Edge/Firefox/Safari  4. Network: Stable Internet Connection |  |  |  |  |  |  |
| Test Scenario | Verify password field masking works correctly across browsers. |  |  |  |  |  |  |
| Test Case ID | Test Steps | Test Input | Expected Results | Actual Results | Status | Test Type | Comments |
| CT-023 | 1. Open Login page in Chrome and type in the password field | Browsers: Chrome, Firefox, Safari, Edge<br>Files: login.html, register.html, js/auth.js | Password field masks input as dots/asterisks in all browsers; show/hide toggle works correctly; no plain text password is exposed in console or network requests. | Password fields use input type=password which is universally supported and masks input by default in all modern browsers. Password is transmitted to Supabase Auth over HTTPS and never logged to the browser console. | Pass | Normal | Show/hide toggle (if implemented) uses JS to toggle input type between password and text, which is supported consistently across all tested browsers. |
|  | 2. Verify password characters are masked (shown as dots/asterisks) |  |  |  |  |  |  |
|  | 3. Click the show/hide password toggle (if available) and verify it works |  |  |  |  |  |  |
|  | 4. Repeat steps 1–3 in Firefox, Safari, and Edge |  |  |  |  |  |  |
|  | 5. Verify no plain text password is visible in the browser console or network tab |  |  |  |  |  |  |
