// index page scripts
import { supabase } from './supabase-config.js';
import { fetchProfilesByIds } from './supabase-data.js';

(function () {
  'use strict';
  const slides = document.querySelectorAll('.hero-slide');
  if (!slides.length) return;

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) {
    slides.forEach((slide, idx) => slide.classList.toggle('active', idx === 0));
    return;
  }

  let activeIndex = 0;
  setInterval(() => {
    slides[activeIndex].classList.remove('active');
    activeIndex = (activeIndex + 1) % slides.length;
    slides[activeIndex].classList.add('active');
  }, 5000);
})();

async function queryLatestJobs(tableName) {
  const isLegacyJobsTable = tableName === 'jobs';
  const selectClause = isLegacyJobsTable
    ? 'id, title, job_title, location, city, salary, pay, rate, salary_range, schedule, employment_type, category, job_category, verified, is_verified, employer_verified, status, created_at'
    : 'id, employer_id, title, location, category, job_type, pay_rate, pay_type, status, created_at';

  const { data, error } = await supabase
    .from(tableName)
    .select(selectClause)
    .in('status', isLegacyJobsTable ? ['active', 'open', 'approved'] : ['open', 'approved', 'active'])
    .order('created_at', { ascending: false })
    .limit(6);

  if (error) throw error;

  const rows = data || [];
  const employerIds = Array.from(new Set(rows.map((job) => job.employer_id).filter(Boolean)));
  let verifiedEmployers = new Set();

  if (employerIds.length) {
    try {
      const profiles = await fetchProfilesByIds(employerIds);
      verifiedEmployers = new Set(profiles.filter((profile) => profile.isVerified).map((profile) => profile.id));
    } catch (profileError) {
      console.warn('Unable to load latest job verification badges:', profileError);
    }
  }

  return rows.map((job) => ({
    id: job.id || '',
    employerId: job.employer_id || '',
    title: job.title || job.job_title || 'Untitled Position',
    location: job.city || job.location || 'Malaysia',
    salary: job.salary
      || job.pay
      || job.rate
      || job.salary_range
      || (job.pay_rate ? `RM${job.pay_rate}/${job.pay_type || 'day'}` : '')
      || 'Negotiable',
    schedule: job.schedule || job.employment_type || job.job_type || 'Part-time',
    category: job.category || job.job_category || 'General',
    isVerified: Boolean(job.verified || job.is_verified || job.employer_verified || verifiedEmployers.has(job.employer_id))
  }));
}

async function fetchLatestJobs() {
  let lastError = null;

  for (const tableName of ['job_listings', 'jobs']) {
    try {
      const jobs = await queryLatestJobs(tableName);
      if (jobs.length > 0) return jobs;
    } catch (error) {
      lastError = error;
    }
  }

  if (lastError) throw lastError;
  return [];
}

async function loadLatestJobs() {
  const container = document.getElementById('jobs-preview-container');
  if (!container) return;

  try {
    const jobs = await fetchLatestJobs();

    if (!jobs.length) {
      container.innerHTML = '<p class="jobs-preview-status">No active jobs at the moment. Check back soon!</p>';
      return;
    }

    container.innerHTML = jobs.map((job) => {
      const badge = job.isVerified ? '<div class="verified-badge">Verified</div>' : '';

      return `
        <div class="job-card">
          ${badge}
          <h3>${escapeHtml(job.title)}</h3>
          <p>Location: ${escapeHtml(job.location)}</p>
          <p>Pay: ${escapeHtml(job.salary)}</p>
          <p>Schedule: ${escapeHtml(job.schedule)}</p>
          <p>Category: ${escapeHtml(job.category)}</p>
          <button class="btn-apply" onclick="location.href='register.html'">Apply</button>
        </div>`;
    }).join('');
  } catch (err) {
    console.error('Failed to load jobs:', err);
    container.innerHTML = '<p class="jobs-preview-status">Unable to load jobs right now. Please try again later.</p>';
  }
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

loadLatestJobs();
