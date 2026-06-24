import { seedKnowledgeBase } from './supabase-data.js';

const seedData = [
  { keywords: ['register', 'sign up', 'create account'], answer: 'Go to Register, choose Job Seeker or Employer, then complete your profile.' },
  { keywords: ['login', 'log in', 'sign in'], answer: 'Click Login in the header and enter your registered email and password.' },
  { keywords: ['forgot password', 'reset password'], answer: 'Use the Forgot Password link on the login page to reset your password.' },
  { keywords: ['job seeker', 'jobseeker'], answer: 'Job Seeker accounts are for individuals looking for part-time or flexible jobs.' },
  { keywords: ['employer', 'hire', 'hiring'], answer: 'Employers can post jobs, review applications, and verify their company profile.' },
  { keywords: ['post job', 'create job'], answer: 'After login as Employer, go to Dashboard and click Post a Job.' },
  { keywords: ['apply', 'application', 'quick apply', 'upload resume', 'attach resume'], answer: 'Open a job listing, click Apply, then upload or attach your resume before submitting.' },
  { keywords: ['application status', 'status'], answer: 'You can track status (Pending, Reviewed, Accepted, Rejected) in your dashboard.' },
  { keywords: ['verification', 'verified'], answer: 'Verified employers have completed identity checks. Badges appear on listings.' },
  { keywords: ['report', 'scam', 'suspicious'], answer: 'Use the Report page to flag suspicious listings for admin review.' },
  { keywords: ['language', 'translate', 'translation'], answer: 'Use the Language dropdown in the header to translate the page.' },
  { keywords: ['dark mode', 'light mode', 'theme'], answer: 'Toggle dark/light mode using the sun/moon button in the header.' },
  { keywords: ['resume', 'cv', 'auto resume'], answer: 'Work history can be exported into a resume from your dashboard.' },
  { keywords: ['work history'], answer: 'Completed jobs are saved as work history for credibility and resume export.' },
  { keywords: ['payment', 'pay', 'salary'], answer: 'Pay details are listed in each job. Employers confirm pay terms before hiring.' },
  { keywords: ['schedule', 'shift'], answer: 'Each listing shows schedule type: part-time, full-day, or flexible.' },
  { keywords: ['location', 'city'], answer: 'Job listings include city or remote options to help you filter quickly.' },
  { keywords: ['category', 'filter'], answer: 'Use the category chips to filter jobs by Events, F&B, Education, Delivery, etc.' },
  { keywords: ['support', 'help'], answer: 'Visit Help Center for FAQs or contact support@easyearn.my.' },
  { keywords: ['contact', 'email'], answer: 'Support email: support@easyearn.my (Mon-Fri, 9am-6pm).' },
  { keywords: ['profile', 'edit profile'], answer: 'Update your profile in the dashboard to improve matching results.' },
  { keywords: ['skills', 'skill'], answer: 'Add skills to your profile so employers can match you to relevant jobs.' },
  { keywords: ['availability'], answer: 'Set your availability in your profile for better job matching.' },
  { keywords: ['notifications'], answer: 'Enable notifications in your profile settings to receive job updates.' },
  { keywords: ['account type'], answer: 'You can choose Job Seeker or Employer during registration.' },
  { keywords: ['delete account'], answer: 'Please contact support to request account deletion.' },
  { keywords: ['privacy', 'pdpa'], answer: 'We comply with PDPA 2010 and secure data using HTTPS and role-based access.' },
  { keywords: ['security', 'safe'], answer: 'We verify employers and allow reporting to reduce scams and improve trust.' },
  { keywords: ['featured jobs'], answer: 'Featured jobs appear at the top based on verification and relevance.' },
  { keywords: ['gig', 'part-time'], answer: 'EasyEarn focuses on short-term, part-time, and flexible gig jobs.' },
  { keywords: ['student'], answer: 'Students can find flexible shifts that fit class schedules.' },
  { keywords: ['housewife', 'home'], answer: 'Flexible jobs are available for those looking for short shifts or remote work.' },
  { keywords: ['remote', 'online'], answer: 'Some roles are remote. Use filters to find online opportunities.' },
  { keywords: ['employer verification'], answer: 'Employers can request verification after completing company details.' },
  { keywords: ['job listing'], answer: 'Each listing includes role, pay, schedule, location, and verified badge if available.' },
  { keywords: ['dashboard'], answer: 'The dashboard shows your profile, applications, and recommended jobs.' },
  { keywords: ['recommended'], answer: 'Recommendations are based on your profile and activity.' },
  { keywords: ['chatbot'], answer: 'The chatbot provides quick guidance about features and next steps.' },
  { keywords: ['report a scam'], answer: 'Go to Report page and provide listing details for admin review.' },
  { keywords: ['employer dashboard'], answer: 'Employers can manage listings and review applicants from the dashboard.' },
  { keywords: ['verification badge'], answer: 'Verified badge means the employer passed identity and business checks.' },
  { keywords: ['ratings'], answer: 'Ratings help both job seekers and employers build trust over time.' },
  { keywords: ['availability schedule'], answer: 'Set your available days and hours to get better matches.' },
  { keywords: ['application tips'], answer: 'Complete your profile and add work history to improve acceptance chances.' },
  { keywords: ['job categories'], answer: 'Popular categories include Events, F&B, Education, Delivery, and Retail.' },
  { keywords: ['hourly', 'daily'], answer: 'Listings show whether pay is hourly or daily. Confirm before accepting.' },
  { keywords: ['contract', 'short-term'], answer: 'EasyEarn supports short-term and contract roles for flexible work.' },
  { keywords: ['support hours'], answer: 'Support is available Monday to Friday, 9am to 6pm.' },
  { keywords: ['how it works'], answer: 'Create a profile, browse jobs, apply, and track your status.' },
  { keywords: ['employer steps'], answer: 'Register as Employer, verify your profile, post a job, and review applicants.' },
  { keywords: ['job seeker steps'], answer: 'Register, complete your profile, browse jobs, and apply by uploading your resume.' },
  { keywords: ['verification time'], answer: 'Verification typically completes after admin review of submitted documents.' }
];

const logEl = document.getElementById('seed-log');
const seedBtn = document.getElementById('seed-btn');

function log(text) {
  if (!logEl) return;
  logEl.textContent += `\n${text}`;
}

async function seedChatbot() {
  if (seedBtn) seedBtn.disabled = true;
  log('Seeding started...');

  try {
    const rows = seedData.map((item) => ({
      question: item.keywords[0],
      ...item
    }));
    await seedKnowledgeBase(rows);
    rows.forEach((row) => log(`Saved ${row.id}`));
    log(`Done. ${rows.length}/${rows.length} saved.`);
  } catch (error) {
    log(`Seeding failed: ${error.message}`);
  } finally {
    if (seedBtn) seedBtn.disabled = false;
  }
}

if (seedBtn) {
  seedBtn.addEventListener('click', seedChatbot);
}
