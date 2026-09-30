import { supabase } from './supabase-config.js';

export function isAccountLocked(status) {
  return ['suspended', 'locked'].includes(String(status || '').trim().toLowerCase());
}

export async function fetchAccountAccess(userId) {
  const { data, error } = await supabase.from('users')
    .select('role, account_status').eq('id', userId).maybeSingle();
  if (error) throw error;
  if (!data) throw new Error('Account profile could not be verified.');
  return data;
}

export async function signOutLockedAccount() {
  const { error } = await supabase.auth.signOut({ scope: 'local' });
  if (error) throw error;
}
