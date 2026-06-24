import {
  calcAverageRating,
  fetchApplications,
  fetchProfile,
  fetchRatings,
  fetchSavedJobsCount,
  getInitials,
  observeAuth,
  signOutUser,
  upsertProfile,
  upsertResume,
  fetchSkillTags,
  fetchWorkHistory,
  incrementSkillTagUsage
} from './supabase-data.js';

(function () {
  'use strict';

  // ── Skill Tag Picker ──────────────────────────────────────────────────────
  let allSkillTags = [];
  let selectedSkills = [];

  async function initSkillPicker(existingSkills = []) {
    selectedSkills = Array.isArray(existingSkills) ? [...existingSkills] : [];
    renderChips();
    updateHiddenInput();
    try { allSkillTags = await fetchSkillTags(); } catch (e) { allSkillTags = []; }
  }

  function renderChips() {
    const chipsEl = document.getElementById('skill-chips');
    if (!chipsEl) return;
    chipsEl.innerHTML = selectedSkills.map(skill => `
      <span style="display:inline-flex;align-items:center;gap:4px;background:#d1fae5;color:#065f46;padding:3px 10px;border-radius:99px;font-size:0.82rem;font-weight:600">
        ${skill}
        <button type="button" data-skill="${skill}" style="background:none;border:none;cursor:pointer;font-size:0.9rem;line-height:1;color:#065f46;padding:0 2px">×</button>
      </span>`).join('');
    chipsEl.querySelectorAll('button[data-skill]').forEach(btn => {
      btn.addEventListener('click', () => {
        selectedSkills = selectedSkills.filter(s => s !== btn.dataset.skill);
        renderChips();
        updateHiddenInput();
      });
    });
  }

  function updateHiddenInput() {
    const hiddenInput = document.getElementById('skills');
    if (hiddenInput) hiddenInput.value = selectedSkills.join(',');
  }

  function commitPendingSkillInput() {
    const searchInput = document.getElementById('skill-search');
    const suggestEl = document.getElementById('skill-suggestions');
    const pendingValue = searchInput?.value.trim() || '';
    if (!pendingValue) return;
    if (!selectedSkills.includes(pendingValue)) {
      selectedSkills.push(pendingValue);
      renderChips();
      updateHiddenInput();
    }
    if (searchInput) searchInput.value = '';
    if (suggestEl) suggestEl.style.display = 'none';
  }

  function showSuggestions(query) {
    const suggestEl = document.getElementById('skill-suggestions');
    if (!suggestEl) return;
    const q = query.toLowerCase().trim();
    const filtered = allSkillTags
      .filter(t => t.name.toLowerCase().includes(q) && !selectedSkills.includes(t.name))
      .slice(0, 8);
    if (!filtered.length || !q) { suggestEl.style.display = 'none'; return; }
    suggestEl.style.display = 'block';
    suggestEl.innerHTML = filtered.map(t => `
      <div data-tag="${t.name}" style="padding:0.5rem 1rem;cursor:pointer;font-size:0.875rem;border-bottom:1px solid #f3f4f6"
        onmouseover="this.style.background='#f0fdf4'" onmouseout="this.style.background='#fff'">
        ${t.name} <small style="color:#9ca3af">${t.category || ''}</small>
      </div>`).join('');
    suggestEl.querySelectorAll('[data-tag]').forEach(item => {
      item.addEventListener('mousedown', (e) => {
        e.preventDefault();
        const tag = item.dataset.tag;
        if (!selectedSkills.includes(tag)) { selectedSkills.push(tag); renderChips(); updateHiddenInput(); }
        const searchInput = document.getElementById('skill-search');
        if (searchInput) searchInput.value = '';
        suggestEl.style.display = 'none';
      });
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('skill-search');
    const suggestEl   = document.getElementById('skill-suggestions');
    if (searchInput) {
      searchInput.addEventListener('input', () => showSuggestions(searchInput.value));
      searchInput.addEventListener('blur', () => setTimeout(() => { if (suggestEl) suggestEl.style.display = 'none'; }, 200));
      searchInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          commitPendingSkillInput();
        }
      });
    }
    const pickerEl = document.getElementById('skill-tag-picker');
    if (pickerEl) pickerEl.addEventListener('click', () => searchInput?.focus());
  });
  // ── End Skill Tag Picker ──────────────────────────────────────────────────

  const form = document.getElementById('profile-form');
  const statusMessage = document.getElementById('profile-status-message');
  const photoUploadStatus = document.getElementById('photo-upload-status');
  const logoutBtn = document.getElementById('logout-btn');

  const fields = {
    name: document.getElementById('full-name'),
    email: document.getElementById('email'),
    phone: document.getElementById('phone'),
    location: document.getElementById('location'),
    headline: document.getElementById('headline'),
    bio: document.getElementById('bio'),
    photoFile: document.getElementById('photo-file'),
    skills: document.getElementById('skills'),
    preferredCategories: document.getElementById('preferred-categories'),
    experienceYears: document.getElementById('experience-years'),
    expectedRate: document.getElementById('expected-rate'),
    availabilityDays: Array.from(document.querySelectorAll('#availability-days input[type="checkbox"]')),
    availabilityTime: document.getElementById('availability-time'),
    workMode: document.getElementById('work-mode')
  };

  // ── Education Entries ──────────────────────────────────────────────────────
  let educationEntries = [];

  const EDUCATION_LEVELS = ['SPM', 'STPM', 'Diploma', 'Advanced Diploma', 'Bachelor\'s Degree', 'Master\'s Degree', 'PhD', 'Professional Certificate', 'Other'];

  function renderEducationEntries() {
    const container = document.getElementById('education-entries-container');
    if (!container) return;
    if (!educationEntries.length) {
      container.innerHTML = '<p style="color:#888;font-size:0.9rem;grid-column:1/-1">No qualifications added yet. Click "+ Add Qualification" below.</p>';
      return;
    }
    container.innerHTML = educationEntries.map((entry, idx) => `
      <div class="profile-field profile-field-full" style="border:1px solid #e5e7eb;border-radius:10px;padding:14px 16px;position:relative;margin-bottom:4px">
        <div style="display:grid;grid-template-columns:1fr 1fr auto;gap:10px;align-items:end">
          <label style="display:flex;flex-direction:column;gap:4px;font-size:0.85rem;font-weight:600;color:#374151">
            Level
            <select data-edu-idx="${idx}" data-edu-field="level" style="padding:7px 10px;border:1px solid #d1d5db;border-radius:7px;font-size:0.9rem">
              <option value="">Select level</option>
              ${EDUCATION_LEVELS.map(l => `<option value="${l}" ${entry.level === l ? 'selected' : ''}>${l}</option>`).join('')}
            </select>
          </label>
          <label style="display:flex;flex-direction:column;gap:4px;font-size:0.85rem;font-weight:600;color:#374151">
            Field of Study / School
            <input type="text" data-edu-idx="${idx}" data-edu-field="field" value="${entry.field || ''}" placeholder="e.g. Business Admin, SMK ABC" style="padding:7px 10px;border:1px solid #d1d5db;border-radius:7px;font-size:0.9rem">
          </label>
          <label style="display:flex;flex-direction:column;gap:4px;font-size:0.85rem;font-weight:600;color:#374151">
            Year
            <input type="text" data-edu-idx="${idx}" data-edu-field="year" value="${entry.year || ''}" placeholder="2023" style="padding:7px 10px;border:1px solid #d1d5db;border-radius:7px;font-size:0.9rem;width:80px">
          </label>
        </div>
        <button type="button" data-edu-remove="${idx}" style="position:absolute;top:10px;right:12px;background:none;border:none;cursor:pointer;color:#ef4444;font-size:1.1rem;line-height:1" title="Remove">✕</button>
      </div>
    `).join('');

    container.querySelectorAll('select[data-edu-field], input[data-edu-field]').forEach(el => {
      el.addEventListener('change', (e) => {
        const i = Number(e.target.dataset.eduIdx);
        const f = e.target.dataset.eduField;
        educationEntries[i][f] = e.target.value;
      });
      el.addEventListener('input', (e) => {
        const i = Number(e.target.dataset.eduIdx);
        const f = e.target.dataset.eduField;
        educationEntries[i][f] = e.target.value;
      });
    });
    container.querySelectorAll('button[data-edu-remove]').forEach(btn => {
      btn.addEventListener('click', () => {
        educationEntries.splice(Number(btn.dataset.eduRemove), 1);
        renderEducationEntries();
      });
    });
  }

  const addEduBtn = document.getElementById('add-education-btn');
  if (addEduBtn) {
    addEduBtn.addEventListener('click', () => {
      educationEntries.push({ level: '', field: '', year: '' });
      renderEducationEntries();
    });
  }
  renderEducationEntries();

  const previewEls = {
    avatar: document.getElementById('profile-avatar'),
    name: document.getElementById('profile-preview-name'),
    headline: document.getElementById('profile-preview-headline'),
    location: document.getElementById('profile-preview-location'),
    phone: document.getElementById('profile-preview-phone'),
    availability: document.getElementById('profile-preview-availability'),
    ratingValue: document.getElementById('profile-rating-value'),
    ratingNote: document.getElementById('profile-rating-note'),
    completedValue: document.getElementById('profile-completed-value'),
    completedNote: document.getElementById('profile-completed-note'),
    applicationsValue: document.getElementById('profile-applications-value'),
    applicationsNote: document.getElementById('profile-applications-note'),
    savedValue: document.getElementById('profile-saved-value'),
    savedNote: document.getElementById('profile-saved-note'),
    strengthValue: document.getElementById('profile-strength-value'),
    strengthBar: document.getElementById('profile-strength-bar'),
    checklist: document.getElementById('profile-checklist')
  };

  const saveButton = document.getElementById('save-profile-btn');

  let currentUser = null;
  let currentPhotoUrl = '';
  let selectedPhotoFile = null;
  let isSaving = false;

  function normalizeList(value) {
    return String(value || '')
      .split(',')
      .map((item) => item.trim())
      .filter(Boolean);
  }

  function setStatus(message, isError = false) {
    if (!statusMessage) return;
    statusMessage.textContent = message;
    statusMessage.style.color = isError ? '#be123c' : '';
  }

  function setPhotoStatus(message, state = '') {
    if (!photoUploadStatus) return;
    photoUploadStatus.textContent = message;
    photoUploadStatus.classList.remove('is-success', 'is-error');
    if (state === 'success') photoUploadStatus.classList.add('is-success');
    if (state === 'error') photoUploadStatus.classList.add('is-error');
  }

  function setSaveState(saving) {
    isSaving = saving;
    if (!saveButton) return;
    saveButton.disabled = saving;
    saveButton.textContent = saving ? 'Saving...' : 'Save Profile';
    saveButton.style.opacity = saving ? '0.7' : '';
  }

  function updateHeaderName(name, photoSrc = '') {
    const navName = document.getElementById('nav-user-name');
    const navBadge = document.getElementById('nav-user-badge');

    if (navName) navName.textContent = name || 'Job Seeker';
    if (!navBadge) return;

    if (photoSrc) {
      navBadge.classList.add('has-image');
      navBadge.style.backgroundImage = `url("${photoSrc}")`;
      navBadge.textContent = '';
      return;
    }

    navBadge.classList.remove('has-image');
    navBadge.style.backgroundImage = '';
    navBadge.textContent = getInitials(name || 'Job Seeker', 'JS');
  }

  function fillForm(user, data) {
    fields.name.value = data?.name || user.user_metadata?.name || '';
    fields.email.value = data?.email || user.email || '';
    fields.phone.value = data?.phone || '';
    fields.location.value = data?.location || '';
    fields.headline.value = data?.headline || '';
    fields.bio.value = data?.bio || '';
    const rawSkills = Array.isArray(data?.skills) ? data.skills : (data?.skills || '').split(',').map(s => s.trim()).filter(Boolean);
    initSkillPicker(rawSkills);
    fields.preferredCategories.value = Array.isArray(data?.preferredCategories) ? data.preferredCategories.join(', ') : (data?.preferredCategories || '');
    fields.experienceYears.value = data?.experienceYears ?? '';
    fields.expectedRate.value = data?.expectedRate || '';

    const savedDays = Array.isArray(data?.availabilityDays)
      ? data.availabilityDays
      : normalizeList(data?.availabilityDays);

    fields.availabilityDays.forEach((checkbox) => {
      checkbox.checked = savedDays.includes(checkbox.value);
    });

    fields.availabilityTime.value = data?.availabilityTime || '';
    fields.workMode.value = data?.workMode || '';
    currentPhotoUrl = data?.photoData || data?.photoUrl || '';

    // Load education entries
    educationEntries = Array.isArray(data?.education) ? data.education.map(e => ({ level: e.level || '', field: e.field || '', year: e.year || '' })) : [];
    renderEducationEntries();
  }

  function buildPreviewData() {
    const availabilityDays = fields.availabilityDays
      .filter((checkbox) => checkbox.checked)
      .map((checkbox) => checkbox.value);

    const availabilityParts = [availabilityDays.join(', '), fields.availabilityTime.value, fields.workMode.value]
      .filter(Boolean);

    return {
      name: fields.name.value.trim() || 'Job Seeker',
      headline: fields.headline.value.trim() || 'Add a short headline to introduce yourself to employers.',
      location: fields.location.value.trim() || 'Location not set',
      phone: fields.phone.value.trim() || 'Phone not set',
      availability: availabilityParts.join(' - ') || 'Availability not set'
    };
  }

  function renderAvatarImage(src) {
    if (!previewEls.avatar) return;

    if (!src) {
      previewEls.avatar.classList.remove('has-image');
      previewEls.avatar.style.backgroundImage = '';
      previewEls.avatar.textContent = getInitials(fields.name.value.trim() || 'Job Seeker', 'JS');
      return;
    }

    previewEls.avatar.classList.add('has-image');
    previewEls.avatar.style.backgroundImage = `url("${src}")`;
    previewEls.avatar.textContent = '';
  }

  function renderPreview() {
    const preview = buildPreviewData();
    if (previewEls.name) previewEls.name.textContent = preview.name;
    if (previewEls.headline) previewEls.headline.textContent = preview.headline;
    if (previewEls.location) previewEls.location.textContent = preview.location;
    if (previewEls.phone) previewEls.phone.textContent = preview.phone;
    if (previewEls.availability) previewEls.availability.textContent = preview.availability;

    if (!selectedPhotoFile && !currentPhotoUrl) {
      renderAvatarImage('');
    }
  }

  function renderCompleteness() {
    const savedSkillsCount = selectedSkills.length || normalizeList(fields.skills.value).length;
    const checks = [
      { label: 'Add basic information', done: Boolean(fields.name.value.trim() && fields.phone.value.trim() && fields.location.value.trim()) },
      { label: 'Add skills and categories', done: Boolean(savedSkillsCount && normalizeList(fields.preferredCategories.value).length) },
      { label: 'Set availability', done: Boolean(fields.availabilityDays.some((checkbox) => checkbox.checked) && fields.availabilityTime.value) }
    ];

    const percentage = Math.round((checks.filter((item) => item.done).length / checks.length) * 100);
    if (previewEls.strengthValue) previewEls.strengthValue.textContent = `${percentage}%`;
    if (previewEls.strengthBar) previewEls.strengthBar.style.width = `${percentage}%`;
    if (previewEls.checklist) {
      previewEls.checklist.innerHTML = checks
        .map((item) => `<li class="${item.done ? 'done' : ''}">${item.label}</li>`)
        .join('');
    }

  }

  function pluralize(count, singular, plural = `${singular}s`) {
    return `${count} ${count === 1 ? singular : plural}`;
  }

  function normalizeStatus(status) {
    return String(status || '').trim().toLowerCase();
  }

  function renderOverviewStats({ ratings = [], history = [], applications = [], savedCount = 0 } = {}) {
    const averageRating = calcAverageRating(ratings);
    const reviewCount = ratings.length;
    const activeApplications = applications.filter((item) => !['rejected', 'completed'].includes(normalizeStatus(item.status))).length;

    if (previewEls.ratingValue) previewEls.ratingValue.textContent = averageRating ? `${averageRating.toFixed(1)}` : 'N/A';
    if (previewEls.ratingNote) previewEls.ratingNote.textContent = reviewCount ? pluralize(reviewCount, 'review') : 'No reviews yet';

    if (previewEls.completedValue) previewEls.completedValue.textContent = String(history.length);
    if (previewEls.completedNote) previewEls.completedNote.textContent = history.length ? 'Resume-ready record' : 'Build your record';

    if (previewEls.applicationsValue) previewEls.applicationsValue.textContent = String(applications.length);
    if (previewEls.applicationsNote) {
      previewEls.applicationsNote.textContent = activeApplications
        ? `${pluralize(activeApplications, 'active application')}`
        : (applications.length ? 'All caught up' : 'No applications yet');
    }

    if (previewEls.savedValue) previewEls.savedValue.textContent = String(savedCount);
    if (previewEls.savedNote) previewEls.savedNote.textContent = savedCount ? 'Ready to apply later' : 'No saved jobs yet';
  }

  async function loadOverviewStats(userId) {
    renderOverviewStats();

    const [ratings, history, applications, savedCount] = await Promise.all([
      fetchRatings(userId).catch(() => []),
      fetchWorkHistory(userId).catch(() => []),
      fetchApplications(userId).catch(() => []),
      fetchSavedJobsCount(userId).catch(() => 0)
    ]);

    renderOverviewStats({ ratings, history, applications, savedCount });
  }

  function buildPayload() {
    return {
      name: fields.name.value.trim(),
      email: fields.email.value.trim(),
      phone: fields.phone.value.trim(),
      location: fields.location.value.trim(),
      headline: fields.headline.value.trim(),
      bio: fields.bio.value.trim(),
      photo_url: currentPhotoUrl,
      photo_data: currentPhotoUrl,
      skills: selectedSkills.length ? selectedSkills : normalizeList(fields.skills.value),
      preferred_categories: normalizeList(fields.preferredCategories.value),
      experience_years: fields.experienceYears.value ? Number(fields.experienceYears.value) : null,
      expected_rate: fields.expectedRate.value.trim(),
      availability_days: fields.availabilityDays.filter((checkbox) => checkbox.checked).map((checkbox) => checkbox.value),
      availability_time: fields.availabilityTime.value,
      work_mode: fields.workMode.value,
      education: educationEntries.filter(e => e.level || e.field),
      role: 'seeker',
      updated_at: new Date().toISOString()
    };
  }

  function buildResumeSnapshot(profileData) {
    const availability = [
      ...(profileData.availability_days || []),
      profileData.availability_time,
      profileData.work_mode
    ].filter(Boolean);

    return {
      id: currentUser.id,
      user_id: currentUser.id,
      name: profileData.name,
      email: profileData.email,
      phone: profileData.phone,
      location: profileData.location,
      headline: profileData.headline,
      bio: profileData.bio,
      photo_url: profileData.photo_url,
      photo_data: profileData.photo_data,
      skills: profileData.skills,
      preferred_categories: profileData.preferred_categories,
      experience_years: profileData.experience_years,
      expected_rate: profileData.expected_rate,
      availability,
      availability_days: profileData.availability_days,
      availability_time: profileData.availability_time,
      work_mode: profileData.work_mode,
      education: profileData.education || [],
      updated_at: profileData.updated_at
    };
  }

  function readImageFile(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(String(reader.result || ''));
      reader.onerror = () => reject(new Error('Unable to read the selected image.'));
      reader.readAsDataURL(file);
    });
  }

  function loadImageElement(src) {
    return new Promise((resolve, reject) => {
      const image = new Image();
      image.onload = () => resolve(image);
      image.onerror = () => reject(new Error('Unable to process the selected image.'));
      image.src = src;
    });
  }

  async function compressImageToDataUrl(file) {
    const source = await readImageFile(file);
    const image = await loadImageElement(source);
    const maxSide = 320;
    const scale = Math.min(1, maxSide / Math.max(image.width, image.height));
    const width = Math.max(1, Math.round(image.width * scale));
    const height = Math.max(1, Math.round(image.height * scale));

    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const context = canvas.getContext('2d');

    if (!context) throw new Error('Unable to prepare the selected image.');

    context.drawImage(image, 0, 0, width, height);

    let quality = 0.82;
    let output = canvas.toDataURL('image/jpeg', quality);
    while (output.length > 350000 && quality > 0.45) {
      quality -= 0.08;
      output = canvas.toDataURL('image/jpeg', quality);
    }

    if (output.length > 350000) {
      throw new Error('Photo is still too large after compression. Please choose a smaller image.');
    }

    return output;
  }

  async function savePhotoIfNeeded() {
    if (!selectedPhotoFile) return currentPhotoUrl;

    if (selectedPhotoFile.size > 2 * 1024 * 1024) {
      setPhotoStatus('Upload failed: file must be 2MB or smaller.', 'error');
      throw new Error('Profile photo must be 2MB or smaller.');
    }

    setPhotoStatus('Compressing photo...');
    currentPhotoUrl = await compressImageToDataUrl(selectedPhotoFile);
    selectedPhotoFile = null;
    if (fields.photoFile) fields.photoFile.value = '';
    setPhotoStatus('Photo saved successfully.', 'success');
    return currentPhotoUrl;
  }

  async function getLogoutPhotoSnapshot() {
    if (!selectedPhotoFile) return currentPhotoUrl;

    try {
      return await compressImageToDataUrl(selectedPhotoFile);
    } catch (error) {
      console.warn('Unable to prepare logout profile photo:', error);
      return currentPhotoUrl;
    }
  }

  function cacheLogoutSnapshot(name, photoSrc) {
    try {
      sessionStorage.setItem('ee_logout_name', name || 'Job Seeker');
      sessionStorage.setItem('ee_logout_photo', photoSrc || '');
    } catch (error) {
      console.warn('Unable to cache logout profile snapshot:', error);
    }
  }

  async function saveProfile() {
    if (!currentUser || isSaving) return;

    commitPendingSkillInput();
    renderCompleteness();

    if (!fields.name.value.trim()) {
      setStatus('Please enter your full name before saving.', true);
      fields.name.focus();
      return;
    }

    setSaveState(true);
    setStatus('Saving profile...');

    try {
      let photoWarning = '';
      try {
        await savePhotoIfNeeded();
      } catch (error) {
        console.error('Photo save failed:', error);
        photoWarning = error.message || 'Photo save failed.';
        setPhotoStatus(photoWarning, 'error');
      }

      const payload = buildPayload();
      const resumePayload = buildResumeSnapshot(payload);

      await Promise.all([
        upsertProfile(currentUser.id, payload),
        upsertResume(currentUser.id, resumePayload)
      ]);

      updateHeaderName(payload.name || 'Job Seeker', currentPhotoUrl);
      renderPreview();
      renderAvatarImage(currentPhotoUrl);
      renderCompleteness();

      if (photoWarning) {
        setStatus(`Profile saved, but photo was not saved. ${photoWarning}`);
        return;
      }

      setStatus('Profile saved successfully. Opening resume...');
      setTimeout(() => {
        window.location.href = 'resume.html';
      }, 900);
    } catch (error) {
      console.error('Failed to save profile:', error);
      setStatus('Something went wrong. Please refresh the page or try again later.', true);
    } finally {
      setSaveState(false);
    }
  }

  function registerEvents() {
    Object.values(fields).forEach((field) => {
      if (!field || Array.isArray(field)) return;
      field.addEventListener('input', () => {
        renderPreview();
        renderCompleteness();
      });
      field.addEventListener('change', () => {
        renderPreview();
        renderCompleteness();
      });
    });

    fields.availabilityDays.forEach((checkbox) => {
      checkbox.addEventListener('change', () => {
        renderPreview();
        renderCompleteness();
      });
    });

    if (fields.photoFile) {
      fields.photoFile.addEventListener('change', () => {
        const file = fields.photoFile.files?.[0] || null;
        selectedPhotoFile = file;

        if (!file) {
          renderAvatarImage(currentPhotoUrl);
          setPhotoStatus(currentPhotoUrl ? 'Current saved photo is active.' : 'No photo selected.');
          return;
        }

        const objectUrl = URL.createObjectURL(file);
        renderAvatarImage(objectUrl);
        setPhotoStatus(`Selected: ${file.name}`);
        setStatus('Photo selected. Save your profile to store it.');
      });
    }

    if (form) {
      form.addEventListener('submit', (event) => {
        event.preventDefault();
        saveProfile();
      });
    }
  }

  async function handleLogout() {
    const photoSrc = await getLogoutPhotoSnapshot();
    const displayName = fields.name?.value?.trim()
      || currentUser?.user_metadata?.name
      || currentUser?.email
      || 'Job Seeker';

    cacheLogoutSnapshot(displayName, photoSrc);
    await signOutUser();
    window.location.href = '../../logout.html';
  }

  if (logoutBtn) logoutBtn.addEventListener('click', handleLogout);
  document.addEventListener('click', (event) => {
    const button = event.target.closest('#nav-logout-btn');
    if (button) handleLogout();
  });

  observeAuth(async (user) => {
    if (!user) {
      window.location.href = '../../login.html';
      return;
    }

    currentUser = user;

    try {
      const profile = await fetchProfile(user.id, user);
      fillForm(user, profile);
      updateHeaderName(profile.name || user.user_metadata?.name || 'Job Seeker', currentPhotoUrl);
      renderPreview();
      renderAvatarImage(currentPhotoUrl);
      renderCompleteness();
      loadOverviewStats(user.id);
      setPhotoStatus(currentPhotoUrl ? 'Current saved photo is active.' : 'No photo selected.');
      setStatus('Profile loaded. You can edit and save your details now.');
    } catch (error) {
      console.error('Failed to load profile:', error);
      fillForm(user, {});
      renderPreview();
      renderAvatarImage('');
      renderCompleteness();
      loadOverviewStats(user.id);
      setPhotoStatus('No photo selected.');
      setStatus('Profile loaded with fallback values. Save once to initialize your data.', true);
    }
  });

  registerEvents();
})();
