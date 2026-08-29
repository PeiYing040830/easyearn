import {
  deleteKnowledgeEntry,
  fetchKnowledgeBase,
  seedKnowledgeBase,
  updateKnowledgeEntry
} from './supabase-data.js';

const searchInput = document.getElementById('knowledge-search');
const refreshBtn = document.getElementById('knowledge-refresh-btn');
const countEl = document.getElementById('knowledge-count');
const listEl = document.getElementById('knowledge-list');
const insertForm = document.getElementById('knowledge-insert-form');
const questionInput = document.getElementById('knowledge-question');
const categoryInput = document.getElementById('knowledge-category');
const keywordsInput = document.getElementById('knowledge-keywords');
const answerInput = document.getElementById('knowledge-answer');
const saveBtn = document.getElementById('knowledge-save-btn');
const clearBtn = document.getElementById('knowledge-clear-btn');
const insertStatusEl = document.getElementById('knowledge-insert-status');

let knowledgeEntries = [];
let editingEntryId = '';

function formatDate(value) {
  if (!value) return 'No date';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return 'No date';
  return date.toLocaleString('en-MY', { dateStyle: 'medium', timeStyle: 'short' });
}

function matchesSearch(entry, term) {
  if (!term) return true;
  return [
    entry.question,
    entry.answer,
    entry.category,
    ...(entry.keywords || [])
  ].some((value) => String(value || '').toLowerCase().includes(term));
}

function appendText(parent, tagName, className, text) {
  const element = document.createElement(tagName);
  if (className) element.className = className;
  element.textContent = text;
  parent.appendChild(element);
  return element;
}

function setInsertStatus(message, type = '') {
  if (!insertStatusEl) return;
  insertStatusEl.textContent = message;
  insertStatusEl.classList.toggle('is-success', type === 'success');
  insertStatusEl.classList.toggle('is-error', type === 'error');
}

function clearInsertForm() {
  if (insertForm) insertForm.reset();
  editingEntryId = '';
  if (saveBtn) saveBtn.textContent = 'Save Q&A';
  setInsertStatus('Ready to add a new entry.');
}

function renderKnowledgeList() {
  if (!listEl) return;

  const term = String(searchInput?.value || '').trim().toLowerCase();
  const visible = knowledgeEntries.filter((entry) => matchesSearch(entry, term));

  listEl.textContent = '';
  if (countEl) {
    countEl.textContent = term
      ? `${visible.length}/${knowledgeEntries.length} entries`
      : `${knowledgeEntries.length} entries`;
  }

  if (!visible.length) {
    const empty = document.createElement('article');
    empty.className = 'admin-item chatbot-knowledge-empty';
    appendText(empty, 'strong', '', term ? 'No matching Q&A found' : 'No chatbot Q&A yet');
    appendText(empty, 'p', '', term ? 'Try another search term.' : 'Use the seed button to add prepared entries.');
    listEl.appendChild(empty);
    return;
  }

  visible.forEach((entry) => {
    const card = document.createElement('article');
    card.className = 'admin-item chatbot-knowledge-item';

    const head = document.createElement('div');
    head.className = 'chatbot-knowledge-item-head';
    appendText(head, 'strong', '', entry.question || 'General question');
    appendText(head, 'span', 'admin-status-pill', entry.category || 'General');
    card.appendChild(head);

    appendText(card, 'p', 'chatbot-knowledge-answer', entry.answer || 'No answer saved.');

    const meta = document.createElement('div');
    meta.className = 'admin-item-meta chatbot-knowledge-meta';
    appendText(meta, 'span', '', `${(entry.keywords || []).length} keyword(s)`);
    appendText(meta, 'span', '', `Used ${entry.usageCount || 0} time(s)`);
    appendText(meta, 'span', '', formatDate(entry.createdAt));
    card.appendChild(meta);

    if (entry.keywords?.length) {
      const keywords = document.createElement('div');
      keywords.className = 'chatbot-knowledge-keywords';
      entry.keywords.forEach((keyword) => appendText(keywords, 'span', '', keyword));
      card.appendChild(keywords);
    }

    const actions = document.createElement('div');
    actions.className = 'admin-action-row chatbot-knowledge-actions';

    const editBtn = document.createElement('button');
    editBtn.className = 'btn-outline';
    editBtn.type = 'button';
    editBtn.textContent = 'Edit';
    editBtn.dataset.entryId = entry.id;
    actions.appendChild(editBtn);

    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'btn-outline chatbot-knowledge-delete';
    deleteBtn.type = 'button';
    deleteBtn.textContent = 'Delete';
    deleteBtn.dataset.entryId = entry.id;
    actions.appendChild(deleteBtn);

    card.appendChild(actions);

    listEl.appendChild(card);
  });
}

async function loadKnowledgeBase() {
  if (refreshBtn) refreshBtn.disabled = true;
  if (countEl) countEl.textContent = 'Loading...';

  try {
    knowledgeEntries = await fetchKnowledgeBase();
    renderKnowledgeList();
  } catch (error) {
    knowledgeEntries = [];
    if (countEl) countEl.textContent = 'Unable to load';
    if (listEl) {
      listEl.textContent = '';
      const item = document.createElement('article');
      item.className = 'admin-item chatbot-knowledge-empty';
      appendText(item, 'strong', '', 'Unable to load chatbot Q&A');
      appendText(item, 'p', '', error.message || 'Please check the database policy and connection.');
      listEl.appendChild(item);
    }
  } finally {
    if (refreshBtn) refreshBtn.disabled = false;
  }
}

async function insertKnowledgeEntry(event) {
  event.preventDefault();

  const question = String(questionInput?.value || '').trim();
  const keywords = String(keywordsInput?.value || '')
    .split(',')
    .map((keyword) => keyword.trim())
    .filter(Boolean);
  const answer = String(answerInput?.value || '').trim();
  const category = String(categoryInput?.value || '').trim();

  if (!question || !keywords.length || !answer) {
    setInsertStatus('Question, keywords, and answer are required.', 'error');
    return;
  }

  if (saveBtn) saveBtn.disabled = true;
  setInsertStatus('Saving Q&A...');

  try {
    if (editingEntryId) {
      await updateKnowledgeEntry(editingEntryId, { question, keywords, answer, category });
      clearInsertForm();
      setInsertStatus('Q&A updated successfully.', 'success');
    } else {
      await seedKnowledgeBase([{ question, keywords, answer, category }]);
      clearInsertForm();
      setInsertStatus('Q&A saved successfully.', 'success');
    }
    await loadKnowledgeBase();
  } catch (error) {
    setInsertStatus(`Failed to save Q&A: ${error.message}`, 'error');
  } finally {
    if (saveBtn) saveBtn.disabled = false;
  }
}

function startEditEntry(entryId) {
  const entry = knowledgeEntries.find((item) => item.id === entryId);
  if (!entry) return;

  editingEntryId = entry.id;
  if (questionInput) questionInput.value = entry.question || '';
  if (categoryInput) categoryInput.value = entry.category || '';
  if (keywordsInput) keywordsInput.value = (entry.keywords || []).join(', ');
  if (answerInput) answerInput.value = entry.answer || '';
  if (saveBtn) saveBtn.textContent = 'Update Q&A';
  setInsertStatus('Editing selected Q&A.');
  insertForm?.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

async function removeEntry(entryId) {
  const entry = knowledgeEntries.find((item) => item.id === entryId);
  if (!entry) return;

  const confirmed = window.confirm(`Delete "${entry.question || 'this Q&A'}"?`);
  if (!confirmed) return;

  setInsertStatus('Deleting Q&A...');

  try {
    await deleteKnowledgeEntry(entryId);
    if (editingEntryId === entryId) clearInsertForm();
    setInsertStatus('Q&A deleted successfully.', 'success');
    await loadKnowledgeBase();
  } catch (error) {
    setInsertStatus(`Failed to delete Q&A: ${error.message}`, 'error');
  }
}

if (searchInput) {
  searchInput.addEventListener('input', renderKnowledgeList);
}

if (refreshBtn) {
  refreshBtn.addEventListener('click', loadKnowledgeBase);
}

if (insertForm) {
  insertForm.addEventListener('submit', insertKnowledgeEntry);
}

if (clearBtn) {
  clearBtn.addEventListener('click', clearInsertForm);
}

if (listEl) {
  listEl.addEventListener('click', (event) => {
    const button = event.target.closest('button[data-entry-id]');
    if (!button) return;

    if (button.classList.contains('chatbot-knowledge-delete')) {
      removeEntry(button.dataset.entryId);
      return;
    }

    startEditEntry(button.dataset.entryId);
  });
}

loadKnowledgeBase();
