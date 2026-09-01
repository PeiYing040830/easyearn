import { observeAuth, fetchProfile, createReport, notifyAdmins } from './supabase-data.js';

(function () {
  'use strict';

  let currentUser = null;
  let currentProfile = null;

  function initReportHeroSlides() {
    const slides = document.querySelectorAll('.report-hero-slide');
    if (!slides.length) return;
    let index = 0;

    setInterval(() => {
      slides[index].classList.remove('is-active');
      index = (index + 1) % slides.length;
      slides[index].classList.add('is-active');
    }, 5000);
  }

  function mapReportType(label) {
    const value = String(label || '').toLowerCase();
    if (value.includes('suspicious') || value.includes('fake')) return 'fake_job';
    if (value.includes('non-paying') || value.includes('payment') || value.includes('scam')) return 'scam';
    if (value.includes('harassment') || value.includes('abuse')) return 'harassment';
    return 'other';
  }

  function getField(id) {
    return document.getElementById(id);
  }

  function ensureStatusElement(form) {
    let el = form.querySelector('.report-submit-status');
    if (el) return el;

    el = document.createElement('p');
    el.className = 'form-note report-submit-status';
    form.appendChild(el);
    return el;
  }

  function setStatus(form, message, isError = false) {
    const el = ensureStatusElement(form);
    el.textContent = message;
    el.style.color = isError ? '#d14343' : '#1f8f46';
  }

  function isValidEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i.test(String(value || '').trim());
  }

  function isValidOptionalUrl(value) {
    if (!value) return true;
    try {
      const url = new URL(value.startsWith('http') ? value : `https://${value}`);
      return Boolean(url.hostname.includes('.'));
    } catch {
      return false;
    }
  }

  function isAllowedEvidenceFile(file) {
    if (!file) return true;
    const allowedTypes = ['application/pdf', 'image/png', 'image/jpeg', 'image/webp'];
    return allowedTypes.includes(file.type);
  }

  function buildDescription() {
    const role = getField('report-role')?.value?.trim() || 'Other';
    const link = getField('report-link')?.value?.trim() || '';
    const description = getField('report-desc')?.value?.trim() || '';
    const file = getField('report-file')?.files?.[0] || null;
    const evidenceLine = file ? `Evidence file: ${file.name}` : 'Evidence file: none';
    const linkLine = link ? `Reference link: ${link}` : 'Reference link: none';
    const roleLine = `Reporter role: ${role}`;

    return [roleLine, linkLine, evidenceLine, '', description].join('\n');
  }

  function validateForm() {
    const name = getField('report-name')?.value?.trim();
    const email = getField('report-email')?.value?.trim();
    const link = getField('report-link')?.value?.trim();
    const description = getField('report-desc')?.value?.trim();
    const file = getField('report-file')?.files?.[0] || null;

    if (!name || !email || !description) {
      return 'Please fill in name, email, and description.';
    }

    if (name.length < 2) {
      return 'Full name must be at least 2 characters.';
    }

    if (!isValidEmail(email)) {
      return 'Please enter a valid email address.';
    }

    if (!isValidOptionalUrl(link)) {
      return 'Please enter a valid listing or profile link.';
    }

    if (description.length < 20) {
      return 'Description must be at least 20 characters.';
    }

    if (file && file.size > 3 * 1024 * 1024) {
      return 'Evidence file must be 3MB or smaller.';
    }

    if (!isAllowedEvidenceFile(file)) {
      return 'Evidence must be a PDF, PNG, JPG, or WebP file.';
    }

    return '';
  }

  function setSubmitting(form, button, submitting) {
    button.disabled = submitting;
    button.textContent = submitting ? 'Submitting...' : 'Submit Report';
    form.classList.toggle('is-submitting', submitting);
  }

  function prefillProfile() {
    if (!currentUser) return;

    const nameInput = getField('report-name');
    const emailInput = getField('report-email');
    const roleSelect = getField('report-role');

    if (nameInput && !nameInput.value.trim()) {
      nameInput.value = currentProfile?.name || currentUser.user_metadata?.name || currentUser.email?.split('@')[0] || '';
    }

    if (emailInput && !emailInput.value.trim()) {
      emailInput.value = currentProfile?.email || currentUser.email || '';
    }

    if (roleSelect && !roleSelect.dataset.autofilled) {
      const role = currentProfile?.role || currentUser.user_metadata?.role || '';
      if (role === 'seeker') roleSelect.value = 'Job Seeker';
      if (role === 'employer') roleSelect.value = 'Employer';
      roleSelect.dataset.autofilled = 'true';
    }
  }

  function initReportForm() {
    const form = document.getElementById('report-form');
    if (!form) return;

    const submitButton = form.querySelector('button[type="submit"]');
    if (!submitButton) return;

    form.addEventListener('submit', async (event) => {
      event.preventDefault();

      const validationMessage = validateForm();
      if (validationMessage) {
        setStatus(form, validationMessage, true);
        return;
      }

      const fullName = getField('report-name').value.trim();
      const email = getField('report-email').value.trim();
      const reportType = mapReportType(getField('report-type')?.value);
      const fullDescription = [
        `Reporter name: ${fullName}`,
        `Reporter email: ${email}`,
        buildDescription()
      ].join('\n');

      setSubmitting(form, submitButton, true);

      try {
        const report = await createReport({
          reporter_id: currentUser?.id || null,
          reported_user: null,
          report_type: reportType,
          description: fullDescription,
          status: 'pending'
        });

        notifyAdmins({
          type: 'new_report',
          message: `New ${reportType.replace(/_/g, ' ')} report submitted by ${fullName}.`,
          target_table: 'reports',
          target_id: report?.id || null,
          actor_id: currentUser?.id || null
        }).catch((notifyError) => {
          console.warn('Admin report notification failed (non-fatal):', notifyError);
        });

        setStatus(form, 'Report submitted successfully. Admin can review it from the reports queue.');
        form.reset();
        prefillProfile();
      } catch (error) {
        console.error('Report submit failed:', error);
        setStatus(form, error?.message || 'Unable to submit report right now. Check Supabase reports insert policy.', true);
      } finally {
        setSubmitting(form, submitButton, false);
      }
    });
  }

  function boot() {
    initReportHeroSlides();
    initReportForm();

    observeAuth(async (user) => {
      currentUser = user;
      currentProfile = null;

      if (user) {
        try {
          currentProfile = await fetchProfile(user.id, user);
        } catch (error) {
          console.warn('Failed to prefill report form from profile:', error);
        }
      }

      prefillProfile();
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
