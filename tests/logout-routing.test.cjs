const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const source = fs.readFileSync(path.join(__dirname, '../js/supabase-data.js'), 'utf8');
const authSource = source.slice(source.indexOf('const signOutStateKey'), source.indexOf('export function normalizeProfileRow'))
  .replace(/export /g, '')
  .replace(/import\.meta\.url/g, "'https://example.test/easyearn/js/supabase-data.js'");

function setup() {
  const listeners = [];
  const tasks = new Map();
  let nextTask = 0;
  let finishSignOut;
  const window = { location: { href: '' } };
  const supabase = { auth: {
    signOut: () => new Promise(resolve => { finishSignOut = resolve; }),
    onAuthStateChange: fn => {
      listeners.push(fn);
      return { data: { subscription: { unsubscribe() {} } } };
    }
  } };
  function instance() {
    const context = vm.createContext({ window, supabase, URL, console,
      setTimeout: fn => { tasks.set(++nextTask, fn); return nextTask; },
      clearTimeout: id => tasks.delete(id)
    });
    vm.runInContext(authSource, context);
    return context;
  }
  return { window, instance,
    finish: value => finishSignOut(value),
    async emit(event, session) {
      listeners.forEach(fn => fn(event, session));
      for (const [id, fn] of tasks) { tasks.delete(id); fn(); }
      await Promise.resolve();
    }
  };
}

test('separate module instances cannot redirect voluntary logout to login', async () => {
  const env = setup();
  const header = env.instance();
  const guard = env.instance();
  guard.observeAuth(user => { if (!user) env.window.location.href = 'login.html'; });
  const pending = header.signOutUser();
  await env.emit('SIGNED_OUT', null);
  assert.equal(env.window.location.href, '');
  env.finish({ error: null });
  await pending;
  assert.equal(env.window.location.href, 'https://example.test/easyearn/logout.html');
});

test('ordinary unauthenticated visits still reach the auth callback', async () => {
  const env = setup();
  env.instance().observeAuth(user => { if (!user) env.window.location.href = 'login.html'; });
  await env.emit('INITIAL_SESSION', null);
  assert.equal(env.window.location.href, 'login.html');
});

test('failed logout clears intent without displaying a successful goodbye', async () => {
  const env = setup();
  const api = env.instance();
  api.observeAuth(user => { if (!user) env.window.location.href = 'login.html'; });
  const pending = api.signOutUser();
  env.finish({ error: new Error('offline') });
  await assert.rejects(pending, /offline/);
  assert.equal(env.window.location.href, '');
  await env.emit('SIGNED_OUT', null);
  assert.equal(env.window.location.href, 'login.html');
});
