/**
 * notifications-bell.js
 * Handles the notification bell UI injected into header-jobseeker and header-employer.
 * Polls for unread notifications and shows a dropdown list.
 */
import { observeAuth, fetchNotifications, markNotificationRead, markAllNotificationsRead } from './supabase-data.js';

(function () {
  'use strict';

  const bellBtn     = document.getElementById('nav-notif-btn');
  const badge       = document.getElementById('nav-notif-badge');
  const dropdown    = document.getElementById('nav-notif-dropdown');

  if (!bellBtn || !dropdown) return;   // header not present on this page

  let currentUserId = null;
  let notifications = [];
  let isOpen = false;
  let pollTimer = null;

  // ── Helpers ────────────────────────────────────────────────────────────

  function timeAgo(isoString) {
    if (!isoString) return '';
    const diff = Date.now() - new Date(isoString).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 1)  return 'just now';
    if (mins < 60) return `${mins}m ago`;
    const hrs = Math.floor(mins / 60);
    if (hrs < 24)  return `${hrs}h ago`;
    return `${Math.floor(hrs / 24)}d ago`;
  }

  function typeIcon(type) {
    if (type === 'new_job')            return '📋';
    if (type === 'application_update') return '🔔';
    if (type === 'interview')          return '📅';
    if (type === 'new_message')        return '💬';
    return '📢';
  }

  function getChatLink(n) {
    const isEmployer = window.location.href.includes('/employer/');
    const base = (window.EASYEARN_BASE_PATH || '../../').replace(/\/$/, '');
    const folder = isEmployer ? 'employer' : 'jobseeker';
    const params = new URLSearchParams({
      user: n._chatSenderId || '',
      name: n._chatSenderName || '',
      jobId: n._chatJobId || '',
      job: n._chatJobTitle || ''
    });
    return `${base}/pages/${folder}/messages.html?${params.toString()}`;
  }

  // ── Render dropdown ────────────────────────────────────────────────────

  function renderDropdown() {
    if (!notifications.length) {
      dropdown.innerHTML = `
        <div style="padding:1.2rem;text-align:center;color:var(--text-muted,#888);font-size:.875rem;">
          No notifications yet
        </div>`;
      return;
    }

    const items = notifications.map((n) => `
      <div class="notif-item" data-id="${n.id}" style="
        display:flex;gap:.75rem;align-items:flex-start;
        padding:.75rem 1rem;border-bottom:1px solid var(--border-color,#f0f0f0);
        cursor:pointer;transition:background .15s;
        background:${n.is_read ? 'transparent' : 'var(--notif-unread-bg,#fefce8)'};
      ">
        <span style="font-size:1.2rem;flex-shrink:0;margin-top:.1rem">${typeIcon(n.type)}</span>
        <div style="flex:1;min-width:0;">
          <p style="margin:0;font-size:.875rem;color:var(--text-primary,#1a1a1a);line-height:1.4;
            font-weight:${n.is_read ? '400' : '600'};">${escHtml(n.message || '')}</p>
          <span style="font-size:.75rem;color:var(--text-muted,#888)">${timeAgo(n.created_at)}</span>
        </div>
        ${n.is_read ? '' : '<span style="width:8px;height:8px;border-radius:50%;background:#ef4444;flex-shrink:0;margin-top:.35rem"></span>'}
      </div>`).join('');

    const header = `
      <div style="display:flex;align-items:center;justify-content:space-between;padding:.7rem 1rem .6rem;border-bottom:1px solid var(--border-color,#e5e7eb);">
        <strong style="font-size:.9rem">Notifications</strong>
        <button id="notif-mark-all" type="button" style="background:none;border:none;font-size:.78rem;color:#16a34a;cursor:pointer;font-weight:600;">
          Mark all read
        </button>
      </div>`;

    dropdown.innerHTML = header + items;

    dropdown.querySelector('#notif-mark-all')?.addEventListener('click', async (e) => {
      e.stopPropagation();
      if (!currentUserId) return;
      try {
        await markAllNotificationsRead(currentUserId);
        await refresh();
      } catch (err) {
        console.warn('Mark all read failed:', err);
      }
    });

    dropdown.querySelectorAll('.notif-item').forEach((el) => {
      el.addEventListener('mouseenter', () => { el.style.background = 'var(--hover-bg,#f9fafb)'; });
      el.addEventListener('mouseleave', () => {
        const n = notifications.find((x) => x.id === el.dataset.id);
        el.style.background = n && !n.is_read ? 'var(--notif-unread-bg,#fefce8)' : 'transparent';
      });
      el.addEventListener('click', async () => {
        const n = notifications.find((x) => x.id === el.dataset.id);
        if (n && !n.is_read) {
          try { await markNotificationRead(n.id); } catch (_) {}
          n.is_read = true;
          updateBadge();
          el.style.fontWeight = '400';
          el.style.background = 'transparent';
          el.querySelector('span[style*="border-radius:50%"]')?.remove();
        }
        if (n && n.type === 'new_message') {
          window.location.href = getChatLink(n);
        }
      });
    });
  }

  function escHtml(str) {
    return String(str).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
  }

  // ── Badge ──────────────────────────────────────────────────────────────

  function updateBadge() {
    const unread = notifications.filter((n) => !n.is_read).length;
    if (!badge) return;
    if (unread > 0) {
      badge.style.display = 'block';
      badge.textContent = unread > 99 ? '99+' : String(unread);
    } else {
      badge.style.display = 'none';
      badge.textContent = '';
    }
  }

  // ── Fetch + poll ───────────────────────────────────────────────────────

  async function refresh() {
    if (!currentUserId) return;
    try {
      notifications = await fetchNotifications(currentUserId, { limit: 25 });
      updateBadge();
      if (isOpen) renderDropdown();
    } catch (err) {
      console.warn('Notification fetch failed (non-fatal):', err);
    }
  }

  function startPolling() {
    clearInterval(pollTimer);
    pollTimer = setInterval(refresh, 30000);   // poll every 30 s
  }

  // ── Toggle dropdown ────────────────────────────────────────────────────

  bellBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    isOpen = !isOpen;
    dropdown.style.display = isOpen ? 'block' : 'none';
    if (isOpen) renderDropdown();
  });

  document.addEventListener('click', (e) => {
    if (!dropdown.contains(e.target) && e.target !== bellBtn) {
      isOpen = false;
      dropdown.style.display = 'none';
    }
  });

  // ── Auth ───────────────────────────────────────────────────────────────

  observeAuth(async (user) => {
    currentUserId = user?.id || null;
    if (currentUserId) {
      await refresh();
      startPolling();
    } else {
      notifications = [];
      updateBadge();
      clearInterval(pollTimer);
    }
  });
})();
