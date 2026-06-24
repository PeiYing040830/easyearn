import { fetchProfile, getInitials, observeAuth, signOutUser } from './supabase-data.js';

(function () {
  'use strict';

  let currentUser = null;
  let logoutName = 'Employer';
  let logoutPhoto = '';

  function updateHeader(name, imageSrc = '') {
    const navName = document.getElementById('nav-user-name');
    const navBadge = document.getElementById('nav-user-badge');

    if (navName) navName.textContent = name || 'Employer';
    if (!navBadge) return;

    if (imageSrc) {
      navBadge.classList.add('has-image');
      navBadge.style.backgroundImage = `url("${imageSrc}")`;
      navBadge.textContent = '';
      return;
    }

    navBadge.classList.remove('has-image');
    navBadge.style.backgroundImage = '';
    navBadge.textContent = getInitials(name || 'Employer', 'EM');
  }

  function bindLogout() {
    const logoutBtn = document.getElementById('nav-logout-btn');
    if (!logoutBtn || logoutBtn.dataset.bound === 'true') return;

    logoutBtn.dataset.bound = 'true';
    logoutBtn.addEventListener('click', async () => {
      try {
        if (currentUser?.id) {
          const profile = await fetchProfile(currentUser.id, currentUser);
          logoutName = profile.companyName || profile.businessName || profile.name || currentUser.email || logoutName;
          logoutPhoto = profile.photoData || profile.photoUrl || logoutPhoto || '';
        }
        sessionStorage.setItem('ee_logout_name', logoutName || 'Employer');
        sessionStorage.setItem('ee_logout_photo', logoutPhoto || '');
      } catch (error) {
        console.warn('Unable to cache employer logout snapshot:', error);
      }

      await signOutUser();
      window.location.href = '../../logout.html';
    });
  }

  observeAuth(async (user) => {
    currentUser = user;
    bindLogout();

    if (!user) {
      updateHeader('Employer');
      return;
    }

    try {
      const profile = await fetchProfile(user.id, user);
      const profileRole = String(profile.role || user.user_metadata?.role || '').toLowerCase();

      if (profileRole && profileRole !== 'employer') {
        updateHeader('Employer');
        window.location.href =
          profileRole === 'admin'
            ? '../admin/dashboard.html'
            : '../jobseeker/dashboard.html';
        return;
      }

      const resolvedName = (() => {
          const baseName = profile.companyName || profile.businessName || profile.name || user.email || 'Employer';
          const status = String(profile.accountStatus || 'active').toLowerCase();
          if (status === 'suspended') return `${baseName} (Suspended)`;
          if (status === 'under_review') return `${baseName} (Under Review)`;
          return baseName;
        })();
      const resolvedPhoto = profile.photoData || profile.photoUrl || '';
      logoutName = resolvedName;
      logoutPhoto = resolvedPhoto;
      updateHeader(resolvedName, resolvedPhoto);
      try {
        sessionStorage.setItem('ee_logout_name', resolvedName);
        sessionStorage.setItem('ee_logout_photo', resolvedPhoto);
      } catch (e) {}
    } catch (error) {
      console.error('Failed to load employer header data:', error);
      updateHeader(user.user_metadata?.name || user.email || 'Employer');
    }
  });
})();
