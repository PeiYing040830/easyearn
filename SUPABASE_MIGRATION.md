# EasyEarn Supabase Migration Notes

## New config entry

- Use [`js/supabase-config.js`](/c:/easyearn-web/js/supabase-config.js)
- Set:
  - `window.EASYEARN_SUPABASE_URL`
  - `window.EASYEARN_SUPABASE_ANON_KEY`
- Or configure them directly in code:
  - `easyearn.supabase.url`
  - `easyearn.supabase.anonKey`

## Migrated files

- [`js/auth.js`](/c:/easyearn-web/js/auth.js)
- [`js/jobseeker-dashboard.js`](/c:/easyearn-web/js/jobseeker-dashboard.js)
- [`js/jobseeker-header.js`](/c:/easyearn-web/js/jobseeker-header.js)
- [`js/jobseeker-profile.js`](/c:/easyearn-web/js/jobseeker-profile.js)
- [`js/jobseeker-resume.js`](/c:/easyearn-web/js/jobseeker-resume.js)
- [`js/jobseeker-work-history.js`](/c:/easyearn-web/js/jobseeker-work-history.js)
- [`js/employer-header.js`](/c:/easyearn-web/js/employer-header.js)
- [`js/admin-header.js`](/c:/easyearn-web/js/admin-header.js)
- [`js/chatbot.js`](/c:/easyearn-web/js/chatbot.js)
- [`js/floating-chatbot.js`](/c:/easyearn-web/js/floating-chatbot.js)
- [`js/seed-chatbot.js`](/c:/easyearn-web/js/seed-chatbot.js)
- [`js/supabase-config.js`](/c:/easyearn-web/js/supabase-config.js)
- [`js/supabase-data.js`](/c:/easyearn-web/js/supabase-data.js)

## Suggested migration order

1. Create Supabase tables and RLS policies
2. Connect employer profile and job posting CRUD
3. Connect admin moderation and analytics queries
4. Replace remaining static placeholder pages with live Supabase data
