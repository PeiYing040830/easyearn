import { fetchProfile, observeAuth, updateEmployerVerification } from './supabase-data.js?v=20260611a';

(function () {
  'use strict';

  const form = document.getElementById('verification-form');
  const submitBtn = document.getElementById('verification-submit-btn');
  const submitStatusEl = document.getElementById('verification-submit-status');
  const statusTitleEl = document.getElementById('verification-status-title');
  const details = {
    ssmNumber: document.getElementById('verification-ssm-number'),
    businessType: document.getElementById('verification-business-type'),
    businessAddress: document.getElementById('verification-business-address')
  };

  const files = {
    registration: {
      input: document.getElementById('verification-registration-file'),
      status: document.getElementById('verification-registration-status')
    },
    contact: {
      input: document.getElementById('verification-contact-file'),
      status: document.getElementById('verification-contact-status')
    }
  };

  const tracks = {
    company: {
      bar: document.getElementById('verification-company-track'),
      value: document.getElementById('verification-company-value')
    },
    documents: {
      bar: document.getElementById('verification-doc-track'),
      value: document.getElementById('verification-doc-value')
    },
    review: {
      bar: document.getElementById('verification-review-track'),
      value: document.getElementById('verification-review-value')
    }
  };

  let currentUser = null;
  let selectedFiles = {
    registration: null,
    contact: null
  };
  let savedPackage = {
    status: 'pending',
    ssmNumber: '',
    businessType: '',
    businessAddress: '',
    registration: null,
    contact: null,
    reviewNotes: ''
  };

  function setSubmitStatus(message, type = '') {
    if (!submitStatusEl) return;
    submitStatusEl.textContent = message;
    submitStatusEl.classList.remove('is-success', 'is-error');
    if (type) submitStatusEl.classList.add(type);
  }

  function setFieldStatus(key, message, type = '') {
    const el = files[key]?.status;
    if (!el) return;
    el.textContent = message;
    el.classList.remove('is-success', 'is-error');
    if (type) el.classList.add(type);
  }

  function setBusy(button, busy) {
    if (!button) return;
    if (!button.dataset.defaultText) {
      button.dataset.defaultText = button.textContent;
    }
    button.disabled = busy;
    button.textContent = busy ? 'Submitting...' : button.dataset.defaultText;
  }

  function setMetric(metric, percentage) {
    const rounded = Math.max(0, Math.min(100, Math.round(percentage)));
    if (metric.bar) metric.bar.style.width = `${rounded}%`;
    if (metric.value) metric.value.textContent = `${rounded}%`;
  }

  function readImageOrFile(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(String(reader.result || ''));
      reader.onerror = () => reject(new Error('Unable to read the selected file.'));
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

  async function compressIfImage(file) {
    if (!file.type.startsWith('image/')) {
      return readImageOrFile(file);
    }

    const source = await readImageOrFile(file);
    const image = await loadImageElement(source);
    const maxSide = 1400;
    const scale = Math.min(1, maxSide / Math.max(image.width, image.height));
    const width = Math.max(1, Math.round(image.width * scale));
    const height = Math.max(1, Math.round(image.height * scale));

    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const context = canvas.getContext('2d');

    if (!context) throw new Error('Unable to prepare the selected image.');

    context.drawImage(image, 0, 0, width, height);

    let quality = 0.84;
    let output = canvas.toDataURL('image/jpeg', quality);
    while (output.length > 600000 && quality > 0.46) {
      quality -= 0.08;
      output = canvas.toDataURL('image/jpeg', quality);
    }

    if (output.length > 600000) {
      throw new Error('Image is too large after compression. Please choose a smaller file.');
    }

    return output;
  }

  function updateDashboard(profile = {}) {
    const hasCompanyProfile = Boolean(
      (profile.companyName || profile.businessName || profile.name) &&
      (profile.email || currentUser?.email) &&
      profile.location
    );

    const documentCount = [savedPackage.registration, savedPackage.contact]
      .filter(Boolean)
      .length;
    const hasVerificationDetails = Boolean(
      savedPackage.ssmNumber &&
      savedPackage.businessType &&
      savedPackage.businessAddress
    );

    setMetric(tracks.company, hasCompanyProfile ? (hasVerificationDetails ? 100 : 78) : 52);
    setMetric(tracks.documents, (documentCount / 2) * 100);
    const normalizedStatus = String(savedPackage.status || '').toLowerCase();
    const reviewProgress = normalizedStatus === 'approved'
      ? 100
      : normalizedStatus === 'rejected'
        ? 100
        : normalizedStatus === 'recheck'
          ? 55
          : normalizedStatus === 'submitted'
            ? 20
            : 0;

    setMetric(tracks.review, reviewProgress);

    if (statusTitleEl) {
      statusTitleEl.textContent = normalizedStatus === 'approved'
        ? 'Current status: Approved'
        : normalizedStatus === 'rejected'
          ? 'Current status: Rejected'
          : normalizedStatus === 'recheck'
            ? 'Current status: Needs Recheck'
            : normalizedStatus === 'submitted'
              ? 'Current status: Submitted'
              : 'Current status: Pending';
    }
  }

  function syncStatusWithProfile(profile = {}) {
    savedPackage.status = profile.isVerified ? 'approved' : (profile.verificationStatus || savedPackage.status || 'pending');
    savedPackage.ssmNumber = profile.ssmNumber || savedPackage.ssmNumber || '';
    savedPackage.businessType = profile.businessType || savedPackage.businessType || '';
    savedPackage.businessAddress = profile.verificationAddress || savedPackage.businessAddress || '';
    savedPackage.registration = profile.registrationDocData
      ? { name: profile.registrationDocName || 'registration-file', content: profile.registrationDocData }
      : savedPackage.registration;
    savedPackage.contact = profile.contactDocData
      ? { name: profile.contactDocName || 'contact-proof', content: profile.contactDocData }
      : savedPackage.contact;
    savedPackage.reviewNotes = profile.verificationNotes || '';

    if (details.ssmNumber) details.ssmNumber.value = savedPackage.ssmNumber;
    if (details.businessType) details.businessType.value = savedPackage.businessType;
    if (details.businessAddress) details.businessAddress.value = savedPackage.businessAddress;

    if (savedPackage.registration) setFieldStatus('registration', `Saved: ${savedPackage.registration.name}`, 'success');
    if (savedPackage.contact) setFieldStatus('contact', `Saved: ${savedPackage.contact.name}`, 'success');
  }

  async function prepareFile(key) {
    const file = selectedFiles[key];
    if (!file) return savedPackage[key];
    if (file.size > 2 * 1024 * 1024) {
      throw new Error('Each file must be 2MB or smaller.');
    }

    const dataUrl = await compressIfImage(file);
    const payload = {
      name: file.name,
      type: file.type || 'application/octet-stream',
      content: dataUrl,
      savedAt: new Date().toISOString()
    };
    savedPackage[key] = payload;
    selectedFiles[key] = null;
    if (files[key]?.input) files[key].input.value = '';
    setFieldStatus(key, `Saved: ${payload.name}`, 'success');
    return payload;
  }

  async function handleSubmit(event) {
    event.preventDefault();
    if (!currentUser) return;

    setBusy(submitBtn, true);
    setSubmitStatus('Saving verification package...');

    try {
      savedPackage.ssmNumber = details.ssmNumber?.value.trim() || '';
      savedPackage.businessType = details.businessType?.value || '';
      savedPackage.businessAddress = details.businessAddress?.value.trim() || '';

      if (!savedPackage.ssmNumber) {
        setSubmitStatus('Please enter the SSM registration number first.', 'is-error');
        details.ssmNumber?.focus();
        return;
      }

      if (!savedPackage.businessType) {
        setSubmitStatus('Please select the business type.', 'is-error');
        details.businessType?.focus();
        return;
      }

      if (!savedPackage.businessAddress) {
        setSubmitStatus('Please enter the registered business address.', 'is-error');
        details.businessAddress?.focus();
        return;
      }

      await prepareFile('registration');
      await prepareFile('contact');

      if (!savedPackage.registration || !savedPackage.contact) {
        setSubmitStatus('Please upload the business registration document and contact proof first.', 'is-error');
        return;
      }

      savedPackage.status = 'submitted';
      await updateEmployerVerification(currentUser.id, {
        ssmNumber: savedPackage.ssmNumber,
        businessType: savedPackage.businessType,
        verificationAddress: savedPackage.businessAddress,
        verificationStatus: savedPackage.status,
        verificationNotes: '',
        registrationDocName: savedPackage.registration?.name || '',
        registrationDocData: savedPackage.registration?.content || '',
        contactDocName: savedPackage.contact?.name || '',
        contactDocData: savedPackage.contact?.content || '',
        isVerified: false
      });
      const profile = await fetchProfile(currentUser.id, currentUser);
      updateDashboard(profile);
      setSubmitStatus('Verification package submitted successfully.', 'is-success');
    } catch (error) {
      console.error('Failed to save verification package:', error);
      setSubmitStatus(error?.message || 'Unable to save the verification package right now.', 'is-error');
    } finally {
      setBusy(submitBtn, false);
    }
  }

  function bindFileInputs() {
    Object.entries(files).forEach(([key, field]) => {
      field.input?.addEventListener('change', () => {
        const file = field.input.files?.[0] || null;
        selectedFiles[key] = file;

        if (!file) {
          setFieldStatus(key, savedPackage[key] ? `Saved: ${savedPackage[key].name}` : 'No file selected.');
          return;
        }

        setFieldStatus(key, `Selected: ${file.name}`);
      });
    });
  }

  observeAuth(async (user) => {
    currentUser = user;

    if (!user) {
      window.location.href = '../../login.html';
      return;
    }

    try {
      const profile = await fetchProfile(user.id, user);
      syncStatusWithProfile(profile);
      updateDashboard(profile);
      if (savedPackage.status === 'approved') {
        setSubmitStatus('Your employer verification has been approved.');
      } else if (savedPackage.status === 'rejected') {
        setSubmitStatus('Your verification was rejected. Update the package and resubmit if needed.');
      } else if (savedPackage.status === 'recheck') {
        setSubmitStatus(savedPackage.reviewNotes || 'Admin requested a recheck. Please update your package and submit again.');
      } else if (savedPackage.status === 'submitted') {
        setSubmitStatus('Verification package submitted successfully.');
      } else {
        setSubmitStatus('Upload your files first, then submit your verification package.');
      }
    } catch (error) {
      console.error('Failed to load verification profile context:', error);
      updateDashboard({});
    }
  });

  bindFileInputs();
  form?.addEventListener('submit', handleSubmit);
})();
