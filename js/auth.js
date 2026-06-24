import { supabase } from './supabase-config.js';

const ADMIN_CODE = 'EASYEARN-ADMIN-2026';
const EMPLOYER_CODE = 'EASYEARN-EMPLOYER-2026';
const PROFILE_TABLE = 'users';

let selectedRole = 'seeker';

function showError(msg) {
  const el = document.getElementById('error-msg');
  if (el) {
    el.textContent = msg;
    el.style.display = 'block';
  }
}

function setupPasswordToggles() {
  const SHOW_EMOJI = String.fromCodePoint(0x1f440);
  const HIDE_EMOJI = String.fromCodePoint(0x1f648);

  document.querySelectorAll('.password-toggle').forEach((button) => {
    if (button.dataset.bound === 'true') return;
    button.dataset.bound = 'true';
    button.textContent = SHOW_EMOJI;

    button.addEventListener('click', () => {
      const targetId = button.getAttribute('data-toggle-target');
      const input = targetId ? document.getElementById(targetId) : null;
      if (!input) return;

      const shouldShow = input.type === 'password';
      input.type = shouldShow ? 'text' : 'password';
      button.textContent = shouldShow ? HIDE_EMOJI : SHOW_EMOJI;
      button.setAttribute('aria-label', shouldShow ? 'Hide password' : 'Show password');
    });
  });
}

function clearError() {
  const el = document.getElementById('error-msg');
  if (el) {
    el.textContent = '';
    el.style.display = 'none';
  }
}

function normalizeRole(role) {
  if (!role) return 'seeker';
  return role === 'jobseeker' ? 'seeker' : role;
}

function mapSupabaseAuthError(error, context = 'login') {
  const message = String(error?.message || '').toLowerCase();

  if (message.includes('invalid login credentials')) {
    return 'Invalid email or password.';
  }

  if (message.includes('email not confirmed')) {
    return 'Your email is not confirmed yet. Please check your inbox.';
  }

  if (message.includes('user already registered')) {
    return 'This email is already registered. Please login instead.';
  }

  if (message.includes('password should be at least')) {
    return 'Password must be at least 6 characters.';
  }

  if (context === 'register') {
    return 'Registration failed. Please try again.';
  }

  return 'Login failed. Please try again.';
}

async function upsertProfile(user, overrides = {}) {
  if (!user?.id) return null;

  const role = normalizeRole(
    overrides.role ||
    user.user_metadata?.role ||
    selectedRole ||
    'seeker'
  );

  const payload = {
    id: user.id,
    email: user.email || '',
    full_name:
      overrides.name ||
      user.user_metadata?.name ||
      user.user_metadata?.full_name ||
      user.user_metadata?.display_name ||
      user.email?.split('@')[0] ||
      'EasyEarn User',
    role,
    updated_at: new Date().toISOString()
  };

  if (overrides.created_at) {
    payload.created_at = overrides.created_at;
  }

  const { data, error } = await supabase
    .from(PROFILE_TABLE)
    .upsert(payload, { onConflict: 'id' })
    .select()
    .maybeSingle();

  if (error) {
    console.warn('Profile upsert failed:', error);
    return null;
  }

  return data;
}

async function getRoleForUser(user) {
  if (!user?.id) return 'seeker';

  const rawMetaRole = user.user_metadata?.role;
  if (rawMetaRole && rawMetaRole !== 'seeker' && rawMetaRole !== 'jobseeker') {
    return normalizeRole(rawMetaRole);
  }

  try {
    const { data, error } = await supabase
      .from(PROFILE_TABLE)
      .select('role')
      .eq('id', user.id)
      .maybeSingle();

    if (!error && data?.role) {
      return normalizeRole(data.role);
    }
  } catch (lookupError) {
    console.warn('Role lookup skipped:', lookupError);
  }

  return 'seeker';
}

async function redirectByRole(user) {
  const role = await getRoleForUser(user);

  if (role === 'employer') {
    window.location.href = 'pages/employer/dashboard.html';
    return;
  }

  if (role === 'admin') {
    window.location.href = 'pages/admin/dashboard.html';
    return;
  }

  window.location.href = 'pages/jobseeker/dashboard.html';
}

async function handleLogin() {
  clearError();
  // support both combined page (login-email) and old standalone (email)
  const email = (document.getElementById('login-email') || document.getElementById('email'))?.value.trim();
  const password = (document.getElementById('login-password') || document.getElementById('password'))?.value.trim();

  if (!email || !password) {
    showError('Please enter your email and password.');
    return;
  }

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  });

  if (error) {
    console.error('Email login failed:', error);
    showError(mapSupabaseAuthError(error, 'login'));
    return;
  }

  await upsertProfile(data.user);
  await redirectByRole(data.user);
}

async function handleRegister() {
  clearError();

  const name = document.getElementById('name')?.value.trim();
  const email = document.getElementById('email')?.value.trim();
  const password = document.getElementById('password')?.value.trim();
  const confirmPassword = document.getElementById('confirm-password')?.value.trim();
  const adminCode = document.getElementById('admin-code')?.value.trim() || '';
  const employerCode = document.getElementById('employer-code')?.value.trim() || '';

  if (!name || !email || !password) {
    showError('Please fill in all fields.');
    return;
  }

  if (password.length < 6) {
    showError('Password must be at least 6 characters.');
    return;
  }

  if (!/[!@#$%^]/.test(password)) {
    showError('Password must contain at least one of !@#$%^.');
    return;
  }

  if (confirmPassword !== password) {
    showError('Confirm password does not match.');
    return;
  }

  if (selectedRole === 'admin' && adminCode !== ADMIN_CODE) {
    showError('Invalid admin secure code.');
    return;
  }

  if (selectedRole === 'employer' && employerCode !== EMPLOYER_CODE) {
    showError('Invalid employer secure code.');
    return;
  }

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        name,
        full_name: name,
        role: selectedRole
      }
    }
  });

  if (error) {
    console.error('Registration failed:', error);
    showError(mapSupabaseAuthError(error, 'register'));
    return;
  }

  if (data.user) {
    await upsertProfile(data.user, {
      name,
      role: selectedRole,
      created_at: new Date().toISOString()
    });
  }

  if (!data.session) {
    showError('Account created. Please check your email to confirm your account before logging in.');
    return;
  }

  await redirectByRole(data.user);
}

window.selectRole = function selectRole(role) {
  selectedRole = normalizeRole(role);
  document.querySelectorAll('.role-card').forEach((card) => card.classList.remove('selected'));
  document.getElementById(`role-${selectedRole}`)?.classList.add('selected');

  const adminGroup = document.getElementById('admin-code-group');
  const employerGroup = document.getElementById('employer-code-group');

  if (adminGroup) {
    adminGroup.classList.toggle('active', selectedRole === 'admin');
  }

  if (employerGroup) {
    employerGroup.classList.toggle('active', selectedRole === 'employer');
  }
};

const loginBtn = document.getElementById('login-btn');
if (loginBtn) {
  loginBtn.addEventListener('click', handleLogin);
}

const registerBtn = document.getElementById('register-btn');
if (registerBtn) {
  registerBtn.addEventListener('click', handleRegister);
}

setupPasswordToggles();
