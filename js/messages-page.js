import {
  createChatMessage,
  fetchChatMessages,
  fetchProfilesByIds,
  fetchChatThreads,
  fetchProfile,
  fetchRatingsForReviewees,
  markChatThreadAsRead,
  observeAuth,
  uploadChatImage
} from './supabase-data.js';

(function () {
  'use strict';

  const body = document.body;
  const threadListEl = document.getElementById('messages-thread-list');
  const threadBodyEl = document.getElementById('messages-thread-body');
  const threadTitleEl = document.getElementById('messages-thread-title');
  const threadSubtitleEl = document.getElementById('messages-thread-subtitle');
  const formEl = document.getElementById('messages-form');
  const inputEl = document.getElementById('messages-input');
  const sendBtn = document.getElementById('messages-send-btn');
  const statusEl = document.getElementById('messages-status');
  const role = body?.dataset?.messagesRole || 'jobseeker';
  const search = new URLSearchParams(window.location.search);

  let currentUser = null;
  let currentProfile = null;
  let threads = [];
  let activeThread = null;
  let pendingImageFile = null;
  let fileInput = null;
  let imagePreviewEl = null;
  let counterpartRatingsById = new Map();

  if (inputEl) inputEl.disabled = true;
  if (sendBtn) sendBtn.disabled = true;

  function escapeHtml(value) {
    return String(value ?? '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function setStatus(message, type = '') {
    if (!statusEl) return;
    statusEl.textContent = message;
    statusEl.className = 'messages-status ' + type;
  }

  function getCurrentDisplayName() {
    return currentProfile?.name
      || currentUser?.user_metadata?.name
      || currentUser?.user_metadata?.full_name
      || currentUser?.email
      || (role === 'employer' ? 'Employer' : role === 'admin' ? 'Admin' : 'Job Seeker');
  }

  function getCounterpartRating(counterpartId) {
    const ratingSummary = counterpartRatingsById.get(counterpartId) || null;
    if (!ratingSummary || !ratingSummary.count) {
      if (role === 'employer') return 'New job seeker';
      if (role === 'admin') return 'EasyEarn user';
      return 'New employer';
    }

    const averageText = Number(ratingSummary.average).toFixed(1);
    const reviewLabel = ratingSummary.count === 1 ? 'review' : 'reviews';
    return `★ ${averageText} · ${ratingSummary.count} ${reviewLabel}`;
  }

  function emptyStateClass() {
    if (role === 'jobseeker') return 'jobseeker-item';
    if (role === 'admin') return 'admin-item';
    return 'employer-item';
  }

  function getThreadFromQuery() {
    const counterpartId = search.get('user') || '';
    if (!counterpartId) return null;
    return {
      counterpartId,
      counterpartName: search.get('name') || (role === 'employer' ? 'Job Seeker' : 'Employer'),
      jobId: search.get('jobId') || '',
      jobTitle: search.get('job') || 'Job conversation'
    };
  }

  // ── Inject toolbar + image preview into form ──────────────────────────────

  function buildChatExtras() {
    if (!formEl) return;
    if (formEl.dataset.extrasBuilt) return;   // ← already built, skip
    formEl.dataset.extrasBuilt = '1';

    // Hidden file input
    fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*';
    fileInput.style.display = 'none';
    formEl.appendChild(fileInput);

    // Image preview strip (above textarea label)
    imagePreviewEl = document.createElement('div');
    imagePreviewEl.className = 'messages-image-preview';
    imagePreviewEl.hidden = true;
    imagePreviewEl.innerHTML = '<img id="messages-preview-img" src="" alt="Preview" /><button type="button" id="messages-clear-image" class="messages-clear-img" title="Remove">✕</button>';

    const labelEl = formEl.querySelector('label[for="messages-input"]');
    if (labelEl) formEl.insertBefore(imagePreviewEl, labelEl);
    else formEl.insertBefore(imagePreviewEl, formEl.firstChild);

    // Toolbar
    const toolbar = document.createElement('div');
    toolbar.className = 'messages-toolbar';
    toolbar.innerHTML =
      '<button type="button" id="messages-attach-btn" class="messages-tool-btn">📎 Attach Image</button>';
    formEl.insertBefore(toolbar, imagePreviewEl);

    // Events
    document.getElementById('messages-attach-btn').addEventListener('click', () => fileInput.click());

    fileInput.addEventListener('change', () => {
      const file = fileInput.files[0];
      if (!file) return;
      pendingImageFile = file;
      const reader = new FileReader();
      reader.onload = function(e) {
        document.getElementById('messages-preview-img').src = e.target.result;
        imagePreviewEl.hidden = false;
        setStatus('Image ready to send.');
      };
      reader.readAsDataURL(file);
      fileInput.value = '';
    });

    document.getElementById('messages-clear-image').addEventListener('click', () => {
      pendingImageFile = null;
      imagePreviewEl.hidden = true;
      document.getElementById('messages-preview-img').src = '';
      setStatus(activeThread ? 'Image removed.' : 'Open a thread to start chatting.');
    });

  }


  // ── Render thread list ─────────────────────────────────────────────────────

  function renderThreadList() {
    if (!threadListEl) return;
    if (!threads.length) {
      threadListEl.innerHTML = '<article class="' + emptyStateClass() + '"><strong>No messages yet</strong><p class="application-company">' + (role === 'admin' ? 'Start from Reports to contact an employer.' : 'Start from Applicants or Applications to open your first conversation.') + '</p></article>';
      return;
    }
    threadListEl.innerHTML = threads.map(function(thread) {
      const isActive = activeThread && activeThread.counterpartId === thread.counterpartId && String(activeThread.jobId || '') === String(thread.jobId || '');
      const ratingText = getCounterpartRating(thread.counterpartId);
      return '<button type="button" class="messages-thread-btn ' + (isActive ? 'is-active' : '') + '" data-user="' + escapeHtml(thread.counterpartId) + '" data-name="' + escapeHtml(thread.counterpartName) + '" data-job-id="' + escapeHtml(thread.jobId || '') + '" data-job-title="' + escapeHtml(thread.jobTitle || 'Job conversation') + '">' +
        '<strong>' + escapeHtml(thread.counterpartName || 'EasyEarn User') + '</strong>' +
        (ratingText ? '<span class="messages-thread-rating">' + escapeHtml(ratingText) + '</span>' : '') +
        '<span>' + escapeHtml(thread.jobTitle || 'Job conversation') + '</span>' +
        '<small>' + escapeHtml(thread.latestBody || 'Open to continue the chat.') + '</small>' +
        (thread.unreadCount ? '<em>' + escapeHtml(String(thread.unreadCount)) + ' new</em>' : '') +
        '</button>';
    }).join('');
  }

  // ── Render messages ────────────────────────────────────────────────────────

  function renderMessages(messages) {
    if (!threadBodyEl) return;
    if (!messages || !messages.length) {
      threadBodyEl.innerHTML = '<article class="' + emptyStateClass() + '"><strong>No messages in this thread yet</strong><p class="application-company">Send the first message below to start the conversation.</p></article>';
      return;
    }

    threadBodyEl.innerHTML = messages.map(function(message) {
      const mine = message.senderId === currentUser?.id;
      const isDuitNow = message.messageType === 'duitnow';
      const hasImage = !!message.imageUrl;

      const imageHtml = hasImage
        ? '<a href="' + escapeHtml(message.imageUrl) + '" target="_blank" rel="noopener" class="messages-bubble-image-link">' +
            '<img src="' + escapeHtml(message.imageUrl) + '" alt="' + (isDuitNow ? 'DuitNow QR' : 'Image') + '" class="messages-bubble-image" />' +
            (isDuitNow ? '<span class="messages-duitnow-label">💳 Tap to enlarge &amp; scan</span>' : '') +
          '</a>'
        : '';

      const bodyHtml = message.body ? '<p>' + escapeHtml(message.body) + '</p>' : '';

      return '<article class="messages-bubble ' + (mine ? 'is-mine' : 'is-theirs') + (isDuitNow ? ' is-duitnow' : '') + '">' +
        '<strong>' + escapeHtml(mine ? 'You' : (message.senderName || activeThread?.counterpartName || 'EasyEarn User')) + '</strong>' +
        imageHtml + bodyHtml +
        '<small>' + escapeHtml(new Date(message.createdAt || Date.now()).toLocaleString('en-MY', { dateStyle: 'medium', timeStyle: 'short' })) + '</small>' +
        '</article>';
    }).join('');

    threadBodyEl.scrollTop = threadBodyEl.scrollHeight;
  }

  async function openThread(thread) {
    activeThread = thread;
    renderThreadList();
    if (threadTitleEl) threadTitleEl.textContent = thread.counterpartName || 'Conversation';
    if (threadSubtitleEl) {
      const ratingText = getCounterpartRating(thread.counterpartId);
      const pieces = [
        thread.jobTitle ? 'Talking about ' + thread.jobTitle : 'Direct chat thread',
        ratingText
      ].filter(Boolean);
      threadSubtitleEl.textContent = pieces.join(' • ');
    }
    if (inputEl) inputEl.disabled = false;
    if (sendBtn) sendBtn.disabled = false;
    setStatus('Chatting with ' + (thread.counterpartName || 'EasyEarn User') + '.');
    try {
      await markChatThreadAsRead(currentUser.id, thread.counterpartId, thread.jobId || '');
      const messages = await fetchChatMessages(currentUser.id, thread.counterpartId, thread.jobId || '');
      renderMessages(messages);
      threads = await fetchChatThreads(currentUser.id);
      renderThreadList();
    } catch (error) {
      console.error('Failed to open messages thread:', error);
      renderMessages([]);
      setStatus('Unable to load this conversation right now.', 'is-error');
    }
  }

  async function loadThreads() {
    threads = await fetchChatThreads(currentUser.id);
    const counterpartIds = Array.from(new Set(threads.map(function(thread) {
      return thread.counterpartId;
    }).filter(Boolean)));

    try {
      const counterpartProfiles = await fetchProfilesByIds(counterpartIds);
      const namesById = new Map(counterpartProfiles.map(function(profile) {
        return [profile.id, profile.name || profile.full_name || ''];
      }));

      threads = threads.map(function(thread) {
        const resolvedName = namesById.get(thread.counterpartId) || '';
        const currentName = String(thread.counterpartName || '').trim();
        const shouldReplace = !currentName
          || ['applicant', 'job seeker', 'seeker', 'easyearn user'].includes(currentName.toLowerCase());

        return shouldReplace && resolvedName
          ? Object.assign({}, thread, { counterpartName: resolvedName })
          : thread;
      });
    } catch (error) {
      console.warn('Counterpart profile names load failed:', error);
    }

    try {
      const ratings = await fetchRatingsForReviewees(counterpartIds);
      counterpartRatingsById = ratings.reduce(function(map, rating) {
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
      counterpartRatingsById = new Map();
      console.warn('Counterpart ratings load failed:', error);
    }

    const queryThread = getThreadFromQuery();
    if (queryThread) {
      const exists = threads.find(function(item) { return item.counterpartId === queryThread.counterpartId && String(item.jobId || '') === String(queryThread.jobId || ''); });
      if (!exists) threads.unshift(Object.assign({}, queryThread, { latestBody: '', latestAt: '', unreadCount: 0 }));
    }
    renderThreadList();
    const initial = queryThread || threads[0] || null;
    if (initial) openThread(initial);
  }

  threadListEl?.addEventListener('click', function(event) {
    const button = event.target.closest('.messages-thread-btn');
    if (!button) return;
    openThread({ counterpartId: button.dataset.user || '', counterpartName: button.dataset.name || 'EasyEarn User', jobId: button.dataset.jobId || '', jobTitle: button.dataset.jobTitle || 'Job conversation' });
  });

  formEl?.addEventListener('submit', async function(event) {
    event.preventDefault();
    if (!activeThread || !currentUser) {
      if (inputEl) inputEl.disabled = true;
      if (sendBtn) sendBtn.disabled = true;
      setStatus('Choose a conversation first before sending a message.', 'is-error');
      return;
    }
    const bodyText = (inputEl?.value || '').trim();
    if (!bodyText && !pendingImageFile) {
      setStatus('Type a message or attach an image before sending.', 'is-error');
      return;
    }

    sendBtn.disabled = true;
    setStatus('Sending…');

    try {
      let imageUrl = '';
      let messageType = 'text';

      if (pendingImageFile) {
        setStatus('Uploading image…');
        imageUrl = await uploadChatImage(pendingImageFile);
        messageType = 'image';
        pendingImageFile = null;
        if (imagePreviewEl) imagePreviewEl.hidden = true;
        const previewImg = document.getElementById('messages-preview-img');
        if (previewImg) previewImg.src = '';
      }

      await createChatMessage({
        sender_id: currentUser.id,
        sender_name: getCurrentDisplayName(),
        recipient_id: activeThread.counterpartId,
        recipient_name: activeThread.counterpartName || 'EasyEarn User',
        job_id: activeThread.jobId || '',
        job_title: activeThread.jobTitle || 'Job conversation',
        body: bodyText,
        image_url: imageUrl,
        message_type: messageType
      });

      if (inputEl) inputEl.value = '';
      await loadThreads();
      setStatus('Message sent.', 'is-success');
    } catch (error) {
      console.error('Failed to send chat message:', error);
      const fallback = pendingImageFile
        ? 'Failed to send image. Please try a smaller file (max 3MB).'
        : 'Failed to send message. Please try again.';
      setStatus(error?.message || fallback, 'is-error');
    } finally {
      sendBtn.disabled = !activeThread;
    }
  });

  observeAuth(async function(user) {
    currentUser = user;
    if (!user) { window.location.href = '../../login.html'; return; }
    buildChatExtras();
    try {
      currentProfile = await fetchProfile(user.id, user);
      await loadThreads();
    } catch (error) {
      console.error('Failed to load messages page:', error);
      setStatus('Unable to load messages right now.', 'is-error');
      renderThreadList();
    }
  });
})();
