import {
  fetchApplications,
  fetchJobs,
  fetchSavedJobsCount,
  fetchSavedJobIds,
  fetchProfile,
  fetchProfilesByIds,
  fetchRatingsForReviewees,
  createApplication,
  deleteApplication,
  createNotification,
  saveJob,
  removeSavedJob,
  normalizeArray,
  observeAuth,
  closeExpiredJobs
} from './supabase-data.js';

(function () {
  'use strict';

  const els = {
    keyword: document.getElementById('jobs-keyword'),
    category: document.getElementById('jobs-category'),
    location: document.getElementById('jobs-location'),
    type: document.getElementById('jobs-type'),
    searchBtn: document.getElementById('jobs-search-btn'),
    resetBtn: document.getElementById('jobs-reset-btn'),
    appliedResults: document.getElementById('jobs-applied-results'),
    results: document.getElementById('jobs-live-results'),
    savedCount: document.getElementById('jobs-saved-count'),
    savedNote: document.getElementById('jobs-saved-note'),
    appliedCount: document.getElementById('jobs-applied-count'),
    appliedNote: document.getElementById('jobs-applied-note'),
    matchedCount: document.getElementById('jobs-matched-count'),
    matchedNote: document.getElementById('jobs-matched-note'),
    approvedCount: document.getElementById('jobs-approved-count'),
    approvedNote: document.getElementById('jobs-approved-note')
  };

  let currentUser = null;
  let profile = null;
  let allJobs = [];
  let allJobsRaw = [];
  let applications = [];
  let savedJobsCount = 0;
  let savedJobIds = new Set();
  let employerRatingsById = new Map();
  let employerProfilesById = new Map();
  let jobsLoadError = null;

  // ── Location state ───────────────────────────────────────────────────────
  let userCoords = null;   // { lat, lng }
  let nearbyRadius = 10;   // km

  // ── Haversine distance ───────────────────────────────────────────────────
  function haversineKm(lat1, lng1, lat2, lng2) {
    const R = 6371;
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLng = (lng2 - lng1) * Math.PI / 180;
    const a = Math.sin(dLat / 2) ** 2
      + Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180)
      * Math.sin(dLng / 2) ** 2;
    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  }

  // ── Geocode via Nominatim ────────────────────────────────────────────────
  const geocodeCache = {};
  async function geocodeLocation(locationStr) {
    if (!locationStr) return null;
    const key = locationStr.toLowerCase().trim();
    if (geocodeCache[key] !== undefined) return geocodeCache[key];
    try {
      const q = encodeURIComponent(locationStr + ', Malaysia');
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${q}&format=json&limit=1`,
        { headers: { 'Accept-Language': 'en' } }
      );
      const data = await res.json();
      if (data && data[0]) {
        const coords = { lat: parseFloat(data[0].lat), lng: parseFloat(data[0].lon) };
        geocodeCache[key] = coords;
        return coords;
      }
    } catch (e) { console.warn('Geocode failed', locationStr, e); }
    geocodeCache[key] = null;
    return null;
  }

  function escapeHtml(value) {
    return String(value ?? '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function formatSaveJobError(error) {
    const detail = error?.message || error?.details || error?.hint || '';
    return detail
      ? `Unable to update saved jobs right now.\n\nSupabase: ${detail}`
      : 'Unable to update saved jobs right now. Please check Supabase policies for saved_jobs.';
  }

  function normalizeJob(job) {
    const employerProfile = employerProfilesById.get(job.employer_id || '') || null;
    const employerName = employerProfile?.companyName || employerProfile?.businessName || employerProfile?.name || '';

    return {
      id: job.id,
      employerId: job.employer_id || '',
      title: job.title || 'Untitled Job',
      company: job.company || job.company_name || job.employer_name || employerName || 'EasyEarn Employer',
      category: job.category || 'General',
      location: job.location || 'Location not specified',
      type: String(job.job_type || '').toLowerCase() || 'flexible',
      payText: job.pay_rate != null
        ? `RM${job.pay_rate}${job.pay_type ? ` / ${job.pay_type}` : ''}`
        : 'Pay not specified',
      openings: Number(job.openings_count ?? 1),
      description: job.description || 'No description provided.',
      status: String(job.status || '').toLowerCase(),
      verified: Boolean(job.verified || job.is_verified || job.employer_verified || employerProfile?.isVerified),
      skills: normalizeArray(job.skill_tags || job.skills)
    };
  }

  function formatEmployerRating(job) {
    const ratingSummary = employerRatingsById.get(job.employerId) || null;
    if (!ratingSummary || !ratingSummary.count) {
      return {
        badge: 'New employer',
        details: 'No employer ratings yet'
      };
    }

    const averageText = Number(ratingSummary.average).toFixed(1);
    const reviewLabel = ratingSummary.count === 1 ? 'review' : 'reviews';
    return {
      badge: `★ ${averageText}`,
      details: `${ratingSummary.count} ${reviewLabel}`
    };
  }

  function getApplicationForJob(jobId) {
    return applications.find((application) => application.job_id === jobId) || null;
  }

  function canCancelApplication(application) {
    const status = String(application?.status || 'pending').toLowerCase();
    return ['pending', 'reviewed'].includes(status);
  }

  function normalizeSkillKey(skill) {
    return String(skill || '')
      .trim()
      .toLowerCase()
      .replace(/&/g, ' and ')
      .replace(/[^a-z0-9]+/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  }

  const SKILL_STOP_WORDS = new Set([
    'and', 'the', 'for', 'with', 'skill', 'skills', 'system', 'systems',
    'certificate', 'certification', 'experience', 'basic', 'good'
  ]);

  const SKILL_KEYWORD_GROUPS = [
    ['cash handling', 'cashier', 'cash', 'payment', 'payments', 'transaction', 'transactions', 'e wallet', 'ewallet', 'pos'],
    ['pos systems', 'pos', 'point of sale', 'cash register', 'register'],
    ['customer service', 'customer', 'customers', 'service', 'serving', 'guest', 'greet', 'greeting'],
    ['friendly communication', 'communication', 'communicate', 'friendly', 'interpersonal', 'greet', 'greeting'],
    ['attention to detail', 'detail', 'details', 'accurate', 'accuracy', 'careful'],
    ['punctuality', 'punctual', 'on time', 'time management', 'reliable'],
    ['typhoid injection certificate', 'typhoid', 'injection', 'certificate', 'food handling certificate'],
    ['event support', 'event crew', 'event', 'crew', 'booth', 'usher'],
    ['f and b', 'f b', 'food and beverage', 'food', 'beverage', 'bakery', 'cafe'],
    ['packing', 'pack', 'packaging', 'arrange', 'stock'],
    ['sales', 'sell', 'selling', 'booth sales', 'retail'],
    ['barista', 'coffee', 'espresso', 'latte', 'cafe']
  ];

  function stemSkillToken(token) {
    let value = normalizeSkillKey(token);
    if (value.endsWith('ies') && value.length > 4) value = `${value.slice(0, -3)}y`;
    else if (value.endsWith('ing') && value.length > 5) value = value.slice(0, -3);
    else if (value.endsWith('ed') && value.length > 4) value = value.slice(0, -2);
    else if (value.endsWith('s') && value.length > 3) value = value.slice(0, -1);
    return value;
  }

  function tokenizeSkill(value) {
    return normalizeSkillKey(value)
      .split(' ')
      .map(stemSkillToken)
      .filter((token) => token.length > 2 && !SKILL_STOP_WORDS.has(token));
  }

  function getTokenSimilarity(a, b) {
    if (!a || !b) return 0;
    if (a === b) return 1;
    if (a.includes(b) || b.includes(a)) return 0.88;

    const maxLength = Math.max(a.length, b.length);
    if (maxLength < 4) return 0;

    const previous = Array.from({ length: b.length + 1 }, (_, index) => index);
    const current = Array.from({ length: b.length + 1 }, () => 0);

    for (let i = 1; i <= a.length; i += 1) {
      current[0] = i;
      for (let j = 1; j <= b.length; j += 1) {
        const cost = a[i - 1] === b[j - 1] ? 0 : 1;
        current[j] = Math.min(
          current[j - 1] + 1,
          previous[j] + 1,
          previous[j - 1] + cost
        );
      }
      for (let j = 0; j <= b.length; j += 1) previous[j] = current[j];
    }

    return 1 - (previous[b.length] / maxLength);
  }

  function getPhraseSimilarity(a, b) {
    const aTokens = tokenizeSkill(a);
    const bTokens = tokenizeSkill(b);
    if (!aTokens.length || !bTokens.length) return 0;

    const matched = aTokens.filter((aToken) => (
      bTokens.some((bToken) => getTokenSimilarity(aToken, bToken) >= 0.82)
    )).length;

    return matched / Math.max(aTokens.length, bTokens.length);
  }

  function getSkillKeywords(skill) {
    const key = normalizeSkillKey(skill);
    if (!key) return [];

    const keywords = new Set([key]);
    tokenizeSkill(key).forEach((token) => keywords.add(token));

    SKILL_KEYWORD_GROUPS.forEach((group) => {
      const normalizedGroup = group.map(normalizeSkillKey);
      if (normalizedGroup.some((term) => key.includes(term) || term.includes(key) || getPhraseSimilarity(key, term) >= 0.6)) {
        normalizedGroup.forEach((term) => keywords.add(term));
        normalizedGroup.flatMap(tokenizeSkill).forEach((token) => keywords.add(token));
      }
    });

    return [...keywords];
  }

  function skillMatchesText(skill, text) {
    const haystack = normalizeSkillKey(text);
    if (getSkillKeywords(skill).some((keyword) => haystack.includes(keyword))) return true;

    const haystackTokens = tokenizeSkill(haystack);
    const skillTokens = tokenizeSkill(skill);
    if (!skillTokens.length || !haystackTokens.length) return false;

    const matchedTokens = skillTokens.filter((skillToken) => (
      haystackTokens.some((textToken) => getTokenSimilarity(skillToken, textToken) >= 0.84)
    )).length;

    return matchedTokens / skillTokens.length >= 0.55;
  }

  function skillsMatch(skillA, skillB) {
    const aKeywords = getSkillKeywords(skillA);
    const bKeywords = getSkillKeywords(skillB);
    if (aKeywords.some((a) => bKeywords.some((b) => a === b || a.includes(b) || b.includes(a)))) {
      return true;
    }

    return getPhraseSimilarity(skillA, skillB) >= 0.45;
  }

  function getMatchedSkills(job, userSkills) {
    if (!userSkills.length) return [];
    const source = [
      job.title,
      job.company,
      job.category,
      job.location,
      job.description,
      ...job.skills
    ].join(' ');

    return userSkills.filter((skill) => skillMatchesText(skill, source));
  }

  function getMissingJobSkills(job, userSkills) {
    const skills = normalizeArray(job.skills);
    return skills.filter((jobSkill) => (
      !userSkills.some((userSkill) => skillsMatch(userSkill, jobSkill))
    ));
  }

  function getMatchedJobSkills(job, userSkills) {
    const skills = normalizeArray(job.skills);
    return skills.filter((jobSkill) => (
      userSkills.some((userSkill) => skillsMatch(userSkill, jobSkill))
    ));
  }

  function buildSkillTags(skills, className = '', emptyMsg = 'None yet') {
    return skills.length
      ? skills.map((skill) => `<span class="skill-tag ${className}">${escapeHtml(skill)}</span>`).join('')
      : `<span class="skill-tag is-muted">${emptyMsg}</span>`;
  }

  function buildJobDetails(job, userSkills = []) {
    const matchedSkills = getMatchedSkills(job, userSkills);
    const matchedJobSkills = getMatchedJobSkills(job, userSkills);
    // Always get ALL missing job skills so Skills To Build is always complete
    const missingSkills = getMissingJobSkills(job, userSkills);
    const jobSkills = normalizeArray(job.skills);
    const matchPercent = userSkills.length ? calculateMatchPercent(job, userSkills) : 0;
    const hasLocation = Number.isFinite(Number(job._distanceKm));
    const distanceBonus = calculateDistanceBonus(job);
    const matchSummary = userSkills.length
      ? `${matchedJobSkills.length} of ${jobSkills.length || 'the job'} required skill(s) match your profile.`
        + (hasLocation && distanceBonus > 0 ? ` 📍 Nearby location boost applied.` : '')
      : 'Add skills in your profile to get a personal match breakdown.';

    // Always show the panel if there are any job skills at all
    if (!jobSkills.length && !matchedSkills.length) return '';

    return `
      <div class="application-detail-panel" hidden>
        <div class="skill-match-panel">
          <div class="skill-match-header">
            <strong>${userSkills.length ? `${matchPercent}% Match` : 'Skill Match'}</strong>
            <span>${escapeHtml(matchSummary)}</span>
          </div>
          <div class="skill-match-grid">
            <div>
              <h4>Matched Skills</h4>
              <div class="application-detail-meta">
                ${buildSkillTags(matchedJobSkills, 'is-matched', 'No matches yet')}
              </div>
            </div>
            <div>
              <h4>Skills To Build</h4>
              <div class="application-detail-meta">
                ${missingSkills.length
                  ? buildSkillTags(missingSkills, 'is-missing')
                  : '<span class="skill-tag is-matched">All skills matched ✓</span>'}
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  function calculateMatchScore(job, userSkills) {
    if (!userSkills.length) return 0;
    const source = [
      job.title,
      job.company,
      job.category,
      job.location,
      job.description,
      ...job.skills
    ].join(' ');

    return userSkills.reduce((count, skill) => (
      skillMatchesText(skill, source) ? count + 1 : count
    ), 0);
  }

  function calculateDistanceBonus(job) {
    const distance = Number(job._distanceKm);
    // No GPS active or distance unknown → no location bonus
    if (!Number.isFinite(distance)) return 0;
    // Closer = bigger bonus to match percentage
    if (distance <= 2)  return 15;
    if (distance <= 5)  return 12;
    if (distance <= 10) return 8;
    if (distance <= 25) return 4;
    // Too far → no bonus (don't inflate percentage)
    return 0;
  }

  function calculateMatchPercent(job, userSkills, matchScore = calculateMatchScore(job, userSkills)) {
    if (!userSkills.length) return 0;
    const jobSkills = normalizeArray(job.skills);
    const distanceBonus = calculateDistanceBonus(job);

    let skillPercent;
    if (jobSkills.length > 0) {
      // Count how many of the JOB's required skills are matched by the user
      // This is consistent with what's displayed in the UI ("X of Y required skill(s)")
      const matchedJobSkillCount = getMatchedJobSkills(job, userSkills).length;
      skillPercent = (matchedJobSkillCount / jobSkills.length) * 100;
    } else {
      // No skill tags on job — fall back to user skill overlap score
      skillPercent = userSkills.length ? (matchScore / userSkills.length) * 100 : 0;
    }

    // With location nearby: can reach up to 99%
    // Without location: capped at 85% so percentage stays honest
    const cap = distanceBonus > 0 ? 99 : 85;
    return Math.min(cap, Math.round(skillPercent + distanceBonus));
  }

  function populateFilters(jobs) {
    const categories = [...new Set(jobs.map((job) => job.category).filter(Boolean))].sort();
    const locations = [...new Set(jobs.map((job) => job.location).filter(Boolean))].sort();

    els.category.innerHTML = ['<option value="">All categories</option>', ...categories.map((item) => `<option value="${escapeHtml(item)}">${escapeHtml(item)}</option>`)].join('');
    els.location.innerHTML = ['<option value="">All locations</option>', ...locations.map((item) => `<option value="${escapeHtml(item)}">${escapeHtml(item)}</option>`)].join('');
  }

  function getFilteredJobs() {
    const keyword = String(els.keyword.value || '').trim().toLowerCase();
    const category = String(els.category.value || '').trim().toLowerCase();
    const location = String(els.location.value || '').trim().toLowerCase();
    const type = String(els.type.value || '').trim().toLowerCase();
    const userSkills = normalizeArray(profile?.skills);

    return allJobs
      .map((job) => {
        const matchScore = calculateMatchScore(job, userSkills);
        return {
          ...job,
          matchScore,
          matchPercent: calculateMatchPercent(job, userSkills, matchScore)
        };
      })
      .filter((job) => {
        if (keyword) {
          const haystack = [job.title, job.company, job.category, job.location, job.description, ...job.skills].join(' ').toLowerCase();
          if (!haystack.includes(keyword)) return false;
        }
        if (category && job.category.toLowerCase() !== category) return false;
        if (location && job.location.toLowerCase() !== location) return false;
        if (type && job.type !== type) return false;
        return true;
      })
      .sort((a, b) => b.matchScore - a.matchScore || a.title.localeCompare(b.title));
  }

  // ── Async version that applies nearby filter when GPS is active ──────────
  async function getFilteredJobsWithDistance() {
    let jobs = getFilteredJobs();
    if (!userCoords) return jobs;

    const userSkills = normalizeArray(profile?.skills);
    const withDist = await Promise.all(jobs.map(async job => {
      const coords = await geocodeLocation(job.location);
      if (!coords) return { ...job, _distanceKm: null };
      const jobWithDistance = { ...job, _distanceKm: haversineKm(userCoords.lat, userCoords.lng, coords.lat, coords.lng) };
      return {
        ...jobWithDistance,
        matchPercent: calculateMatchPercent(jobWithDistance, userSkills, job.matchScore)
      };
    }));

    return withDist
      .filter(j => j._distanceKm != null && j._distanceKm <= nearbyRadius)
      .sort((a, b) => a._distanceKm - b._distanceKm);
  }

  function renderStats(jobs) {
    const matched = jobs.filter((job) => job.matchScore > 0).length;
    const approvedJobs = allJobs.filter((job) => job.status === 'approved').length;

    els.savedCount.textContent = String(savedJobsCount);
    els.savedNote.textContent = savedJobsCount ? `${savedJobsCount} saved job(s) ready.` : 'No saved jobs yet.';

    els.appliedCount.textContent = String(applications.length);
    els.appliedNote.textContent = applications.length ? `${applications.length} application(s) already submitted.` : 'No submitted applications yet.';

    els.matchedCount.textContent = String(matched);
    els.matchedNote.textContent = matched ? `${matched} job(s) match your current skills.` : 'No matching jobs found yet.';

    els.approvedCount.textContent = String(approvedJobs);
    if (approvedJobs) {
      els.approvedNote.textContent = `${approvedJobs} available job(s).`;
    } else if (applications.length) {
      els.approvedNote.textContent = 'No other available jobs are open right now. Track your submitted job in Applications.';
    } else {
      els.approvedNote.textContent = 'No available jobs yet.';
    }
  }

  function buildJobCard(job) {
    const application = getApplicationForJob(job.id);
    const alreadyApplied = Boolean(application);
    const canCancel = canCancelApplication(application);
    const isSaved = savedJobIds.has(job.id);
    const userSkills = normalizeArray(profile?.skills);
    const matchBadge = userSkills.length && job.matchScore ? `${Number(job.matchPercent) || calculateMatchPercent(job, userSkills)}% Match` : 'New';
    const employerRating = formatEmployerRating(job);
    const hasOpenings = Number(job.openings || 0) > 0;
    const detailsMarkup = buildJobDetails(job, userSkills);

    // Distance badge when GPS is active
    let distanceBadge = '';
    if (userCoords && job._distanceKm != null) {
      const d = job._distanceKm;
      const label = d < 1 ? `${Math.round(d * 1000)} m away` : `${d.toFixed(1)} km away`;
      distanceBadge = `<span class="status-pill" style="background:#dcfce7;color:#166534;border:1px solid #86efac;">📍 ${label}</span>`;
    }

    return `
      <article class="jobseeker-item recommendation-item jobs-result-card">
        <div class="job-meta-mini">
          <span class="status-pill reviewed">${escapeHtml(matchBadge)}</span>
          ${job.verified ? '<span class="status-pill verified-employer-pill">Verified Employer</span>' : ''}
          <span class="application-meta"><span>${escapeHtml(job.category)}</span></span>
          ${distanceBadge}
          ${alreadyApplied ? '<span class="status-pill accepted">Already Applied</span>' : ''}
        </div>
        <strong>${escapeHtml(job.title)}</strong>
        <p class="application-company">${escapeHtml(job.company)}</p>
        <div class="job-employer-rating">
          <span class="job-employer-rating-badge">${escapeHtml(employerRating.badge)}</span>
          <span class="job-employer-rating-text">${escapeHtml(employerRating.details)}</span>
        </div>
        <p class="job-description-text">${escapeHtml(job.description)}</p>
        <div class="application-meta">
          <span>${escapeHtml(job.location)}</span>
          <span>${escapeHtml(job.payText)}</span>
          <span>${escapeHtml(job.type)}</span>
          <span>${escapeHtml(`${job.openings} opening${job.openings > 1 ? 's' : ''}`)}</span>
        </div>
        ${detailsMarkup}
        <div class="jobs-card-actions">
          <button type="button" class="btn-outline interview-action-btn jobs-save-btn" data-job-id="${escapeHtml(job.id)}">${isSaved ? 'Saved' : 'Save Job'}</button>
          <button type="button" class="btn-primary interview-action-btn jobs-quick-apply-btn" data-job-id="${escapeHtml(job.id)}" ${(alreadyApplied || !hasOpenings) ? 'disabled' : ''}>${alreadyApplied ? 'Applied' : hasOpenings ? 'Apply' : 'Full'}</button>
          ${alreadyApplied && canCancel ? `<button type="button" class="btn-outline interview-action-btn jobs-cancel-apply-btn" data-application-id="${escapeHtml(application.id)}">Cancel Apply</button>` : ''}
          ${detailsMarkup ? `<button type="button" class="btn-outline interview-action-btn jobs-view-details-btn" data-job-id="${escapeHtml(job.id)}" aria-expanded="false">Match Skills</button>` : ''}
        </div>
      </article>
    `;
  }

  function renderJobs(jobs) {
    if (jobsLoadError) {
      const errorMarkup = `
        <article class="jobseeker-item recommendation-item jobs-result-card">
          <strong>Unable to load jobs right now</strong>
          <p class="application-company">${escapeHtml(jobsLoadError)}</p>
        </article>
      `;
      if (els.appliedResults) els.appliedResults.innerHTML = errorMarkup;
      els.results.innerHTML = errorMarkup;
      return;
    }

    const appliedJobs = jobs.filter((job) => applications.some((application) => application.job_id === job.id));
    const liveJobs = jobs.filter((job) => !applications.some((application) => application.job_id === job.id));

    if (els.appliedResults) {
      els.appliedResults.innerHTML = appliedJobs.length
        ? appliedJobs.map(buildJobCard).join('')
        : `
          <article class="jobseeker-item recommendation-item jobs-result-card">
            <strong>No applied jobs in this view</strong>
            <p class="application-company">Once you apply for a role, it will stay visible here for quick reference.</p>
          </article>
        `;
    }

    if (!liveJobs.length) {
      els.results.innerHTML = `
        <article class="jobseeker-item recommendation-item jobs-result-card">
          <strong>No available jobs found</strong>
          <p class="application-company">${applications.length
            ? 'There are no other available jobs to browse right now. Your existing applications stay listed above.'
            : 'Try changing your filters or wait for more jobs to be published.'}</p>
        </article>
      `;
      return;
    }

    els.results.innerHTML = liveJobs.map(buildJobCard).join('');
  }

  async function refreshView() {
    const jobs = await getFilteredJobsWithDistance();
    renderStats(jobs);
    renderJobs(jobs);
  }

  async function loadData(user) {
    const [profileResult, jobsResult, applicationsResult, savedCountResult, savedIdsResult] = await Promise.allSettled([
      fetchProfile(user.id, user),
      fetchJobs(),
      fetchApplications(user.id),
      fetchSavedJobsCount(user.id),
      fetchSavedJobIds(user.id)
    ]);

    profile = profileResult.status === 'fulfilled' ? profileResult.value : null;
    applications = applicationsResult.status === 'fulfilled' ? (applicationsResult.value || []) : [];
    savedJobsCount = savedCountResult.status === 'fulfilled' ? (savedCountResult.value || 0) : 0;
    savedJobIds = new Set(savedIdsResult.status === 'fulfilled' ? (savedIdsResult.value || []) : []);

    if (jobsResult.status === 'rejected') {
      const code = String(jobsResult.reason?.code || '');
      const message = String(jobsResult.reason?.message || 'Jobs query failed.');
      const lowered = message.toLowerCase();
      jobsLoadError = code === '42501' || lowered.includes('row-level security') || lowered.includes('policy')
        ? `Supabase is still blocking job_listings for this account. Please check the job_listings select policy.`
        : `Supabase jobs query failed: ${message}${code ? ` (code ${code})` : ''}`;
      allJobs = [];
      populateFilters([]);
      refreshView();
      return;
    }

    jobsLoadError = null;
    const jobsRaw = jobsResult.value || [];
    allJobsRaw = jobsRaw;
    const employerIds = Array.from(new Set((jobsRaw || []).map((job) => job.employer_id).filter(Boolean)));

    try {
      const employerProfiles = await fetchProfilesByIds(employerIds);
      employerProfilesById = employerProfiles.reduce((map, employerProfile) => {
        if (employerProfile.id) map.set(employerProfile.id, employerProfile);
        return map;
      }, new Map());
    } catch (error) {
      employerProfilesById = new Map();
      console.warn('Employer verification profiles load failed:', error);
    }

    try {
      const allRatings = await fetchRatingsForReviewees(employerIds);
      employerRatingsById = allRatings.reduce((map, rating) => {
        const key = rating.reviewee_id;
        if (!key) return map;
        const current = map.get(key) || { totalStars: 0, count: 0, average: 0 };
        current.totalStars += Number(rating.stars || 0);
        current.count += 1;
        current.average = current.count ? current.totalStars / current.count : 0;
        map.set(key, current);
        return map;
      }, new Map());
    } catch (error) {
      employerRatingsById = new Map();
      console.warn('Employer ratings load failed:', error);
    }

    const appliedJobIds = new Set(applications.map((application) => application.job_id).filter(Boolean));
    const now = new Date();
    allJobs = (jobsRaw || [])
      .filter((job) => {
        const status = String(job.status || '').toLowerCase();
        // Filter out expired jobs (unless the seeker already applied)
        if (job.expiry_date && !appliedJobIds.has(job.id)) {
          const expiry = new Date(job.expiry_date);
          if (!isNaN(expiry.getTime()) && expiry < now) return false;
        }
        return status === 'approved' || appliedJobIds.has(job.id);
      })
      .map(normalizeJob);

    populateFilters(allJobs);
    refreshView();
  }

  els.searchBtn?.addEventListener('click', refreshView);
  els.resetBtn?.addEventListener('click', () => {
    els.keyword.value = '';
    els.category.value = '';
    els.location.value = '';
    els.type.value = '';
    // Also clear GPS location on full reset
    userCoords = null;
    const locBar = document.getElementById('jobs-location-bar');
    if (locBar) locBar.style.display = 'none';
    refreshView();
  });

  // ── Geolocation UI ───────────────────────────────────────────────────────
  (function initLocationUI() {
    const btnLocate = document.getElementById('jobs-locate-btn');
    const locBar    = document.getElementById('jobs-location-bar');
    const locName   = document.getElementById('jobs-location-name');
    const radiusSel = document.getElementById('jobs-radius-select');
    const btnClear  = document.getElementById('jobs-clear-location');
    if (!btnLocate) return;

    btnLocate.addEventListener('click', () => {
      if (!navigator.geolocation) {
        alert('Geolocation is not supported by your browser.');
        return;
      }
      btnLocate.disabled = true;
      btnLocate.textContent = '⏳ Locating…';

      navigator.geolocation.getCurrentPosition(
        async (pos) => {
          userCoords = { lat: pos.coords.latitude, lng: pos.coords.longitude };
          btnLocate.textContent = '📍 Near Me';
          btnLocate.disabled = false;

          // Reverse geocode for readable name
          try {
            const res = await fetch(
              `https://nominatim.openstreetmap.org/reverse?lat=${userCoords.lat}&lon=${userCoords.lng}&format=json`,
              { headers: { 'Accept-Language': 'en' } }
            );
            const d = await res.json();
            const name = d.address?.suburb || d.address?.city_district
              || d.address?.city || d.address?.town || d.address?.county || 'your location';
            if (locName) locName.textContent = name;
          } catch { if (locName) locName.textContent = 'your location'; }

          if (locBar) { locBar.style.display = 'flex'; }
          refreshView();
        },
        (err) => {
          btnLocate.disabled = false;
          btnLocate.textContent = '📍 Near Me';
          const msgs = {
            1: 'Location permission denied. Please allow location access in browser settings.',
            2: 'Unable to detect your position. Check GPS or network.',
            3: 'Location request timed out. Please try again.',
          };
          alert(msgs[err.code] || 'Location error. Please try again.');
        },
        { timeout: 10000, maximumAge: 60000 }
      );
    });

    radiusSel?.addEventListener('change', () => {
      nearbyRadius = parseInt(radiusSel.value, 10);
      if (userCoords) refreshView();
    });

    btnClear?.addEventListener('click', () => {
      userCoords = null;
      if (locBar) locBar.style.display = 'none';
      refreshView();
    });
  })();

  async function handleJobCardClick(event) {
    const saveBtn = event.target.closest('.jobs-save-btn');
    const quickApplyBtn = event.target.closest('.jobs-quick-apply-btn');
    const cancelApplyBtn = event.target.closest('.jobs-cancel-apply-btn');
    const viewDetailsBtn = event.target.closest('.jobs-view-details-btn');

    if (viewDetailsBtn) {
      const card = viewDetailsBtn.closest('.jobs-result-card');
      const panel = card?.querySelector('.application-detail-panel');
      const desc = card?.querySelector('.job-description-text');
      if (!panel) return;

      const isOpen = viewDetailsBtn.getAttribute('aria-expanded') === 'true';
      viewDetailsBtn.setAttribute('aria-expanded', isOpen ? 'false' : 'true');
      viewDetailsBtn.textContent = isOpen ? 'Match Skills' : 'Hide Skills';
      panel.hidden = isOpen;
      if (desc) desc.classList.toggle('is-expanded', !isOpen);
      return;
    }

    if (cancelApplyBtn && currentUser) {
      const applicationId = cancelApplyBtn.dataset.applicationId;
      if (!applicationId) return;
      if (!confirm('Cancel this application?')) return;

      cancelApplyBtn.disabled = true;
      cancelApplyBtn.textContent = 'Cancelling...';

      try {
        await deleteApplication(applicationId, currentUser.id);
        applications = applications.filter((application) => application.id !== applicationId);
        refreshView();
      } catch (error) {
        console.error('Cancel application failed:', error);
        cancelApplyBtn.disabled = false;
        cancelApplyBtn.textContent = 'Cancel Apply';
        alert('Unable to cancel this application. Please check Supabase policies for applications.');
      }
      return;
    }

    if (saveBtn && currentUser) {
      const jobId = saveBtn.dataset.jobId;
      if (!jobId) return;

      const wasSaved = savedJobIds.has(jobId);
      saveBtn.disabled = true;
      saveBtn.textContent = wasSaved ? 'Removing...' : 'Saving...';

      try {
        if (wasSaved) {
          await removeSavedJob(currentUser.id, jobId);
          savedJobIds.delete(jobId);
        } else {
          await saveJob({
            seeker_id: currentUser.id,
            job_id: jobId
          });
          savedJobIds.add(jobId);
        }

        savedJobsCount = savedJobIds.size;
        refreshView();
      } catch (error) {
        console.error('Save job failed:', error);
        const code = String(error?.code || '');
        const message = String(error?.message || '').toLowerCase();
        if (code === '23505' || message.includes('duplicate') || message.includes('unique')) {
          savedJobIds.add(jobId);
          savedJobsCount = savedJobIds.size;
          refreshView();
        } else {
          saveBtn.disabled = false;
          saveBtn.textContent = wasSaved ? 'Saved' : 'Save Job';
          alert(formatSaveJobError(error));
        }
      }
      return;
    }

    if (!quickApplyBtn || !currentUser) return;

    const jobId = quickApplyBtn.dataset.jobId;
    if (!jobId) return;

    // Show apply modal
    showApplyModal(jobId, quickApplyBtn);
  }

  // ── Apply Modal ──────────────────────────────────────────────
  function showApplyModal(jobId, triggerBtn) {
    const existing = document.getElementById('apply-resume-modal');
    if (existing) existing.remove();

    const modal = document.createElement('div');
    modal.id = 'apply-resume-modal';
    modal.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,0.5);z-index:9999;display:flex;align-items:center;justify-content:center;padding:16px;';
    modal.innerHTML = `
      <div style="background:#fff;border-radius:16px;padding:28px;max-width:480px;width:100%;box-shadow:0 20px 60px rgba(0,0,0,0.2);">
        <h3 style="margin:0 0 6px;font-size:1.15rem;">Apply for this job</h3>
        <p style="color:#64748b;font-size:.9rem;margin:0 0 20px;">Attach your resume (optional). Supported: PDF, DOC, DOCX (max 5MB).</p>
        <label style="display:block;font-weight:600;font-size:.9rem;margin-bottom:8px;">Resume / CV</label>
        <div id="apply-drop-zone" style="border:2px dashed #5eead4;border-radius:10px;padding:24px;text-align:center;cursor:pointer;background:#f0fdfa;transition:background .2s;">
          <p style="margin:0;color:#16a34a;font-size:.9rem;">📄 Click to upload or drag & drop</p>
          <p id="apply-file-name" style="margin:6px 0 0;color:#94a3b8;font-size:.8rem;">No file selected</p>
          <input id="apply-file-input" type="file" accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document" style="display:none;">
        </div>
        <div style="display:flex;gap:10px;margin-top:20px;">
          <button id="apply-cancel-btn" type="button" style="flex:1;padding:10px;border:1.5px solid #e2e8f0;border-radius:8px;background:#fff;cursor:pointer;font-size:.95rem;">Cancel</button>
          <button id="apply-submit-btn" type="button" style="flex:2;padding:10px;border:none;border-radius:8px;background:#16a34a;color:#fff;cursor:pointer;font-weight:600;font-size:.95rem;">Submit Application</button>
        </div>
      </div>
    `;

    document.body.appendChild(modal);

    let resumeBase64 = null;
    let resumeFileName = null;

    const dropZone = document.getElementById('apply-drop-zone');
    const fileInput = document.getElementById('apply-file-input');
    const fileNameEl = document.getElementById('apply-file-name');
    const submitBtn = document.getElementById('apply-submit-btn');
    const cancelBtn = document.getElementById('apply-cancel-btn');

    function handleFile(file) {
      if (!file) return;
      if (file.size > 5 * 1024 * 1024) { alert('File too large. Max 5MB.'); return; }
      const reader = new FileReader();
      reader.onload = (e) => {
        resumeBase64 = e.target.result;
        resumeFileName = file.name;
        fileNameEl.textContent = `✅ ${file.name}`;
        fileNameEl.style.color = '#16a34a';
      };
      reader.readAsDataURL(file);
    }

    dropZone.addEventListener('click', () => fileInput.click());
    fileInput.addEventListener('change', () => handleFile(fileInput.files[0]));
    dropZone.addEventListener('dragover', (e) => { e.preventDefault(); dropZone.style.background = '#ede9fe'; });
    dropZone.addEventListener('dragleave', () => { dropZone.style.background = '#f0fdfa'; });
    dropZone.addEventListener('drop', (e) => { e.preventDefault(); dropZone.style.background = '#f0fdfa'; handleFile(e.dataTransfer.files[0]); });

    cancelBtn.addEventListener('click', () => modal.remove());
    modal.addEventListener('click', (e) => { if (e.target === modal) modal.remove(); });

    submitBtn.addEventListener('click', async () => {
      submitBtn.disabled = true;
      submitBtn.textContent = 'Submitting…';

      try {
        const newApp = await createApplication({
          job_id: jobId,
          user_id: currentUser.id,
          status: 'pending',
          resume_url: resumeBase64 || null
        });

        // Notify employer
        try {
          const jobRaw = allJobsRaw.find((j) => j.id === jobId);
          const appliedJob = allJobs.find((j) => j.id === jobId);
          const employerId = jobRaw?.employer_id || null;
          if (employerId) {
            const seekerName = profile?.name || currentUser.user_metadata?.name || 'A job seeker';
            await createNotification({
              user_id: employerId,
              type: 'new_job',
              message: `${seekerName} has applied for your job: "${appliedJob?.title || 'your job posting'}".`
            });
          }
        } catch (notifErr) {
          console.warn('Employer notification failed (non-fatal):', notifErr);
        }

        modal.remove();
        applications = await fetchApplications(currentUser.id);
        refreshView();
        window.location.href = 'applications.html';
      } catch (error) {
        console.error('Apply failed:', error);
        const code = String(error?.code || '');
        const message = String(error?.message || '').toLowerCase();
        if (code === '23505' || message.includes('duplicate')) {
          modal.remove();
          triggerBtn.textContent = 'Applied';
          triggerBtn.disabled = true;
        } else if (message.includes('no openings available')) {
          modal.remove();
          triggerBtn.textContent = 'Full';
          triggerBtn.disabled = true;
          alert('This job has no openings left.');
        } else {
          submitBtn.disabled = false;
          submitBtn.textContent = 'Submit Application';
          alert('Unable to submit application. Please try again.');
        }
      }
    });
  }

  els.results?.addEventListener('click', handleJobCardClick);
  els.appliedResults?.addEventListener('click', handleJobCardClick);

  closeExpiredJobs().catch(() => {});

  observeAuth(async (user) => {
    currentUser = user;

    if (!user) {
      window.location.href = '../../login.html';
      return;
    }

    try {
      await loadData(user);
    } catch (error) {
      console.error('Failed to load job seeker jobs page:', error);
      jobsLoadError = `Unexpected error while loading Jobs: ${String(error?.message || error)}`;
      els.results.innerHTML = `
        <article class="jobseeker-item recommendation-item jobs-result-card">
          <strong>Unable to load jobs right now</strong>
          <p class="application-company">${escapeHtml(jobsLoadError)}</p>
        </article>
      `;
    }
  });
})();
