import { fetchProfile, observeAuth } from './supabase-data.js';

(function () {
  'use strict';

  function normalizeRole(role) {
    const value = String(role || '').trim().toLowerCase();
    if (value === 'jobseeker' || value === 'job seeker') return 'seeker';
    return value;
  }

  function requiredRoleForCurrentPath() {
    const path = window.location.pathname.replace(/\\/g, '/').toLowerCase();
    if (path.includes('/pages/admin/')) return 'admin';
    if (path.includes('/pages/employer/')) return 'employer';
    if (path.includes('/pages/jobseeker/')) return 'seeker';
    return '';
  }

  function dashboardForRole(role) {
    const basePath = window.EASYEARN_BASE_PATH || '../../';
    if (role === 'admin') return `${basePath}pages/admin/dashboard.html`;
    if (role === 'employer') return `${basePath}pages/employer/dashboard.html`;
    if (role === 'seeker') return `${basePath}pages/jobseeker/dashboard.html`;
    return `${basePath}login.html`;
  }

  function roleMatches(requiredRole, actualRole) {
    return requiredRole && actualRole && requiredRole === actualRole;
  }

  const requiredRole = requiredRoleForCurrentPath();
  if (!requiredRole) return;

  observeAuth(async (user) => {
    if (!user) {
      window.location.href = dashboardForRole('');
      return;
    }

    let actualRole = normalizeRole(user.user_metadata?.role);

    try {
      const profile = await fetchProfile(user.id, user);
      actualRole = normalizeRole(profile.role || actualRole);
    } catch (error) {
      console.warn('Route role guard used auth metadata fallback:', error);
    }

    if (!roleMatches(requiredRole, actualRole)) {
      window.location.href = dashboardForRole(actualRole);
    }
  });
})();
