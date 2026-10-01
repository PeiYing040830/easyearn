import { createClient } from 'npm:@supabase/supabase-js@2';

const supabaseUrl = Deno.env.get('SUPABASE_URL') || '';
const serviceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || '';
const expectedCode = Deno.env.get('ADMIN_REGISTRATION_CODE') || '';
const allowedOrigins = new Set([
  'https://peiying040830.github.io',
  'http://localhost:5500',
  'http://127.0.0.1:5500'
]);

function responseHeaders(origin: string | null) {
  const headers = new Headers({
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'application/json'
  });
  if (origin && allowedOrigins.has(origin)) {
    headers.set('Access-Control-Allow-Origin', origin);
    headers.set('Vary', 'Origin');
  }
  return headers;
}

function sameSecret(value: string, expected: string) {
  if (!value || !expected || value.length !== expected.length) return false;
  let difference = 0;
  for (let index = 0; index < value.length; index += 1) {
    difference |= value.charCodeAt(index) ^ expected.charCodeAt(index);
  }
  return difference === 0;
}

Deno.serve(async (request) => {
  const origin = request.headers.get('origin');
  const headers = responseHeaders(origin);

  if (request.method === 'OPTIONS') {
    if (origin && !allowedOrigins.has(origin)) return new Response('Origin not allowed', { status: 403 });
    return new Response('ok', { headers });
  }
  if (request.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed.' }), { status: 405, headers });
  }
  if (origin && !allowedOrigins.has(origin)) {
    return new Response(JSON.stringify({ error: 'Origin not allowed.' }), { status: 403, headers });
  }
  if (!supabaseUrl || !serviceRoleKey || !expectedCode) {
    return new Response(JSON.stringify({ error: 'Admin registration is not configured.' }), { status: 500, headers });
  }

  let payload: { userId?: string; adminCode?: string };
  try {
    payload = await request.json();
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid request.' }), { status: 400, headers });
  }

  if (!sameSecret(String(payload.adminCode || ''), expectedCode)) {
    return new Response(JSON.stringify({ error: 'Invalid Admin Secure Code.' }), { status: 403, headers });
  }
  if (!/^[0-9a-f-]{36}$/i.test(String(payload.userId || ''))) {
    return new Response(JSON.stringify({ error: 'Invalid account.' }), { status: 400, headers });
  }

  const adminClient = createClient(supabaseUrl, serviceRoleKey, {
    auth: { autoRefreshToken: false, persistSession: false }
  });
  const { data: userResult, error: lookupError } = await adminClient.auth.admin.getUserById(payload.userId);
  if (lookupError || !userResult.user) {
    return new Response(JSON.stringify({ error: 'Account not found.' }), { status: 404, headers });
  }
  if (userResult.user.user_metadata?.role !== 'admin') {
    return new Response(JSON.stringify({ error: 'This account did not register as an Admin.' }), { status: 403, headers });
  }

  const { error: updateError } = await adminClient.auth.admin.updateUserById(payload.userId, {
    app_metadata: { ...userResult.user.app_metadata, role: 'admin' }
  });
  if (updateError) {
    console.error('Admin role update failed:', updateError);
    return new Response(JSON.stringify({ error: 'Could not authorize this Admin account.' }), { status: 500, headers });
  }

  return new Response(JSON.stringify({ ok: true }), { status: 200, headers });
});
