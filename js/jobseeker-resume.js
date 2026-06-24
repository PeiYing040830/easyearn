import {
  fetchProfile,
  fetchResume,
  fetchWorkHistory,
  fetchRatings,
  calcAverageRating,
  getInitials,
  observeAuth
} from './supabase-data.js';

(function () {
  'use strict';

  const els = {
    photo: document.getElementById('resume-photo'),
    name: document.getElementById('resume-name'),
    role: document.getElementById('resume-role'),
    email: document.getElementById('resume-email'),
    phone: document.getElementById('resume-phone'),
    location: document.getElementById('resume-location'),
    profile: document.getElementById('resume-profile-text'),
    skills: document.getElementById('resume-skills-list'),
    availability: document.getElementById('resume-availability-list'),
    workList: document.getElementById('resume-work-list'),
    gigs: document.getElementById('resume-stat-gigs'),
    earnings: document.getElementById('resume-stat-earnings'),
    rating: document.getElementById('resume-stat-rating'),
    education: document.getElementById('resume-education-list'),
    references: document.getElementById('resume-references-list'),
    downloadBtn: document.getElementById('resume-download-btn'),
    refreshBtn: document.getElementById('resume-refresh-btn')
  };

  const resumePaper = document.querySelector('.resume-paper');
  let activeUser = null;
  let refreshResumeData = null;

  function escapeHtml(value) {
    return String(value ?? '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function normalizeArray(value) {
    if (Array.isArray(value)) return value.filter(Boolean);
    if (typeof value === 'string' && value.trim()) {
      return value.split(',').map((item) => item.trim()).filter(Boolean);
    }
    return [];
  }

  function formatCurrency(value) {
    const amount = Number(value);
    if (!Number.isFinite(amount)) return 'RM0';
    return `RM${amount.toLocaleString('en-MY', { maximumFractionDigits: 0 })}`;
  }

  function updateHeaderName(name, photoSrc = '', attempt = 0) {
    const navName = document.getElementById('nav-user-name');
    const navBadge = document.getElementById('nav-user-badge');
    if (!navName || !navBadge) {
      if (attempt < 5) setTimeout(() => updateHeaderName(name, photoSrc, attempt + 1), 250);
      return;
    }

    navName.textContent = name || 'Job Seeker';
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

  function renderList(element, items, emptyText) {
    if (!element) return;
    if (!items.length) {
      element.innerHTML = `<li>${escapeHtml(emptyText)}</li>`;
      return;
    }
    element.innerHTML = items.map((item) => `<li>${escapeHtml(item)}</li>`).join('');
  }

  function renderPhoto(name, src) {
    if (!els.photo) return;
    if (src) {
      els.photo.classList.add('has-image');
      els.photo.style.backgroundImage = `url("${src}")`;
      els.photo.textContent = '';
      return;
    }
    els.photo.classList.remove('has-image');
    els.photo.style.backgroundImage = '';
    els.photo.textContent = getInitials(name, 'JS');
  }

  function mergeData(profile, resume) {
    if (!resume) return profile || {};
    return {
      ...(profile || {}),
      ...resume,
      photoData: resume.photo_data || resume.photoData || profile?.photoData || profile?.photoUrl || '',
      photoUrl: resume.photo_url || resume.photoUrl || profile?.photoUrl || '',
      skills: normalizeArray(resume.skills?.length ? resume.skills : profile?.skills),
      availabilityDays: normalizeArray(resume.availability_days ?? resume.availabilityDays ?? profile?.availabilityDays),
      preferredCategories: normalizeArray(resume.preferred_categories ?? resume.preferredCategories ?? profile?.preferredCategories)
    };
  }

  function renderProfile(user, data) {
    const name = data?.name || user.user_metadata?.name || user.email?.split('@')[0] || 'Job Seeker';
    const headline = data?.headline || 'Add your professional headline in profile.';
    const email = data?.email || user.email || 'Email not set';
    const phone = data?.phone || 'Phone not set';
    const location = data?.location || 'Location not set';
    const bio = data?.bio || 'Add a short bio in your profile so employers can quickly understand your strengths.';
    const photo = data?.photoData || data?.photoUrl || '';
    const skills = normalizeArray(data?.skills);
    const availability = [
      ...normalizeArray(data?.availability || data?.availabilityDays),
      data?.availabilityTime,
      data?.workMode
    ].filter(Boolean);

    renderPhoto(name, photo);
    if (els.name) els.name.textContent = name;
    if (els.role) els.role.textContent = headline;
    if (els.email) els.email.textContent = email;
    if (els.phone) els.phone.textContent = phone;
    if (els.location) els.location.textContent = location;
    if (els.profile) els.profile.textContent = bio;

    renderList(els.skills, skills, 'Add skills in your profile to populate this section.');
    renderList(els.availability, availability, 'Set your available days and work preferences in profile.');

    // Education
    const education = Array.isArray(data?.education) ? data.education.filter(e => e.level || e.field) : [];
    if (els.education) {
      if (!education.length) {
        els.education.innerHTML = '<li>Add your qualifications in profile.</li>';
      } else {
        els.education.innerHTML = education.map(e => {
          const parts = [e.level, e.field, e.year].filter(Boolean);
          return `<li>${escapeHtml(parts.join(' — '))}</li>`;
        }).join('');
      }
    }

    updateHeaderName(name, photo);
  }

  function renderWorkHistory(items) {
    if (!els.workList) return;

    if (!items.length) {
      els.workList.innerHTML = `
        <article class="resume-entry resume-empty-entry">
          <div class="resume-entry-head">
            <div>
              <h4>No work history yet</h4>
              <p>Complete a job to see your work history here.</p>
            </div>
          </div>
        </article>
      `;
      return;
    }

    els.workList.innerHTML = items.map((item) => `
      <article class="resume-entry">
        <div class="resume-entry-head">
          <div>
            <h4>${escapeHtml(item.title || item.jobTitle || 'Completed Job')}</h4>
            <p>${escapeHtml(item.company || 'Employer not set')}</p>
          </div>
          <span>${escapeHtml(item.period || item.completedOn || item.completedDate || 'Date not set')}</span>
        </div>
        <ul class="resume-bullet-list">
          ${(item.highlights || []).map((bullet) => `<li>${escapeHtml(bullet)}</li>`).join('') || '<li>Completed work recorded in EasyEarn work history.</li>'}
        </ul>
      </article>
    `).join('');

    // Build References from latest 3 employers
    if (els.references) {
      const seen = new Set();
      const refs = items
        .slice()
        .sort((a, b) => new Date(b.completedOn || b.completedDate || 0) - new Date(a.completedOn || a.completedDate || 0))
        .filter(item => {
          const key = (item.company || '').trim().toLowerCase();
          if (!key || seen.has(key)) return false;
          seen.add(key);
          return true;
        })
        .slice(0, 3);

      if (!refs.length) {
        els.references.innerHTML = '<p>Complete jobs to generate references from employers.</p>';
      } else {
        els.references.innerHTML = refs.map(item => `
          <div style="margin-bottom:10px">
            <strong style="display:block;font-size:0.88rem">${escapeHtml(item.company || 'Employer')}</strong>
            <span style="font-size:0.82rem;color:#555">${escapeHtml(item.title || item.jobTitle || 'Job')}</span>
            ${item.completedOn || item.completedDate ? `<span style="font-size:0.8rem;color:#888;display:block">${escapeHtml(item.completedOn || item.completedDate)}</span>` : ''}
            <span style="font-size:0.8rem;color:#888">Available upon request.</span>
          </div>
        `).join('');
      }
    }
  }

  function renderStats(items, ratingsData = []) {
    const totalEarnings = items.reduce((sum, item) => sum + Number(item.earnings || 0), 0);
    const avg = calcAverageRating(ratingsData);
    const averageRating = avg !== null ? `${avg.toFixed(1)}/5` : 'N/A';

    if (els.gigs) els.gigs.textContent = String(items.length);
    if (els.earnings) els.earnings.textContent = formatCurrency(totalEarnings);
    if (els.rating) els.rating.textContent = averageRating;
  }

  async function downloadPdf() {
    if (!resumePaper || !window.html2canvas || !window.jspdf?.jsPDF || !els.downloadBtn) {
      return;
    }

    const originalText = els.downloadBtn.textContent;
    els.downloadBtn.disabled = true;
    els.downloadBtn.textContent = 'Preparing PDF...';

    try {
      if (typeof refreshResumeData === 'function' && activeUser) {
        await refreshResumeData(true);
      }

      if (document.fonts?.ready) {
        await document.fonts.ready;
      }

      els.downloadBtn.textContent = 'Generating PDF...';

      const canvas = await window.html2canvas(resumePaper, {
        scale: 2,
        useCORS: true,
        backgroundColor: '#ffffff'
      });

      const imageData = canvas.toDataURL('image/png');
      const { jsPDF } = window.jspdf;
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const margin = 10;
      const usableWidth = pageWidth - margin * 2;
      const usableHeight = pageHeight - margin * 2;
      const imageWidth = usableWidth;
      const imageHeight = (canvas.height * imageWidth) / canvas.width;

      if (imageHeight <= usableHeight) {
        pdf.addImage(imageData, 'PNG', margin, margin, imageWidth, imageHeight, undefined, 'FAST');
      } else {
        const pageCanvas = document.createElement('canvas');
        const pageContext = pageCanvas.getContext('2d');
        const sliceHeightPx = Math.floor((usableHeight * canvas.width) / usableWidth);
        pageCanvas.width = canvas.width;
        pageCanvas.height = sliceHeightPx;

        let renderedHeight = 0;
        let firstPage = true;

        while (renderedHeight < canvas.height && pageContext) {
          pageContext.clearRect(0, 0, pageCanvas.width, pageCanvas.height);
          pageContext.fillStyle = '#ffffff';
          pageContext.fillRect(0, 0, pageCanvas.width, pageCanvas.height);
          pageContext.drawImage(
            canvas,
            0,
            renderedHeight,
            canvas.width,
            Math.min(sliceHeightPx, canvas.height - renderedHeight),
            0,
            0,
            canvas.width,
            Math.min(sliceHeightPx, canvas.height - renderedHeight)
          );

          const sliceData = pageCanvas.toDataURL('image/png');
          const sliceHeightMm = (Math.min(sliceHeightPx, canvas.height - renderedHeight) * imageWidth) / canvas.width;

          if (!firstPage) pdf.addPage();
          pdf.addImage(sliceData, 'PNG', margin, margin, imageWidth, sliceHeightMm, undefined, 'FAST');

          renderedHeight += sliceHeightPx;
          firstPage = false;
        }
      }

      const rawName = (els.name?.textContent || 'job-seeker-resume').trim();
      const safeName = rawName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '') || 'job-seeker-resume';
      pdf.save(`${safeName}-resume.pdf`);
    } catch (error) {
      console.error('Failed to generate PDF:', error);
      alert('PDF download failed. Please try again.');
    } finally {
      els.downloadBtn.disabled = false;
      els.downloadBtn.textContent = originalText;
    }
  }

  async function loadResumeData(user) {
    const [profile, history, ratingsData] = await Promise.all([
      fetchProfile(user.id, user),
      fetchWorkHistory(user.id),
      fetchRatings(user.id)
    ]);

    renderProfile(user, profile);
    renderWorkHistory(history);
    renderStats(history, ratingsData);
  }

  if (els.downloadBtn) {
    els.downloadBtn.disabled = true;
    els.downloadBtn.addEventListener('click', downloadPdf);
  }

  observeAuth(async (user) => {
    if (!user) {
      window.location.href = '../../login.html';
      return;
    }

    activeUser = user;

    const refresh = async (silent = false) => {
      try {
        await loadResumeData(user);
        if (els.downloadBtn) {
          els.downloadBtn.disabled = false;
        }
      } catch (error) {
        console.error('Failed to load resume data:', error);
        renderProfile(user, {});
        renderWorkHistory([]);
        renderStats([], []);
        if (!silent && els.downloadBtn) {
          els.downloadBtn.disabled = false;
        }
      }
    };

    refreshResumeData = refresh;

    if (els.refreshBtn && !els.refreshBtn.dataset.bound) {
      els.refreshBtn.dataset.bound = 'true';
      els.refreshBtn.addEventListener('click', async () => {
        const originalText = els.refreshBtn.textContent;
        els.refreshBtn.disabled = true;
        els.refreshBtn.textContent = 'Refreshing...';
        await refresh();
        els.refreshBtn.disabled = false;
        els.refreshBtn.textContent = originalText;
      });
    }

    await refresh();
  });
})();