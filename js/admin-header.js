import { fetchProfile, getInitials, observeAuth, signOutUser } from './supabase-data.js';

(function () {
  'use strict';

  function updateHeader(name, photoSrc = '') {
    const navName = document.getElementById('nav-user-name');
    const navBadge = document.getElementById('nav-user-badge');

    if (navName) navName.textContent = name || 'Admin';
    if (!navBadge) return;

    if (photoSrc) {
      navBadge.classList.add('has-image');
      navBadge.style.backgroundImage = `url("${photoSrc}")`;
      navBadge.textContent = '';
      return;
    }

    navBadge.classList.remove('has-image');
    navBadge.style.backgroundImage = '';
    navBadge.textContent = getInitials(name || 'Admin', 'AD');
  }

  function bindLogout() {
    const logoutBtn = document.getElementById('nav-logout-btn');
    if (!logoutBtn || logoutBtn.dataset.bound === 'true') return;

    logoutBtn.dataset.bound = 'true';
    logoutBtn.addEventListener('click', async () => {
      await signOutUser();
      window.location.href = '../../logout.html';
    });
  }

  observeAuth(async (user) => {
    bindLogout();

    if (!user) {
      updateHeader('Admin');
      return;
    }

    try {
      const profile = await fetchProfile(user.id, user);
      const resolvedName = profile.name || user.user_metadata?.name || user.email || 'Admin';
      const resolvedPhoto = profile.photoData || profile.photoUrl || '';
      updateHeader(resolvedName, resolvedPhoto);
      try {
        sessionStorage.setItem('ee_logout_name', resolvedName);
        sessionStorage.setItem('ee_logout_photo', resolvedPhoto);
      } catch (e) {}
    } catch (error) {
      console.error('Failed to load admin header data:', error);
      updateHeader(user.user_metadata?.name || user.email || 'Admin');
    }
  });
})();
