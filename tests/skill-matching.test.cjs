const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const source = fs.readFileSync(path.join(__dirname, '../js/jobseeker-jobs.js'), 'utf8');
const matching = source.slice(source.indexOf('  function normalizeSkillKey('), source.indexOf('  function buildSkillTags('));
const scoring = source.slice(source.indexOf('  function calculateMatchScore('), source.indexOf('  function populateFilters('));
const api = { normalizeArray: (value) => Array.isArray(value) ? value : [] };
vm.createContext(api);
vm.runInContext(matching + scoring, api);

test('POS and ordinary skills do not imply a typhoid certificate', () => {
  const skills = ['Friendly communication', 'Good in time management', 'Familiarity with POS system'];
  const job = { skills: ['POS systems', 'Cash handling', 'Friendly communication', 'Punctuality', 'Typhoid Injection Certificate'] };
  assert.equal(api.getMatchedJobSkills(job, skills).length, 4);
  assert.equal(api.getMissingJobSkills(job, skills)[0], 'Typhoid Injection Certificate');
  assert.equal(api.calculateMatchPercent(job, skills), 80);
  for (const skill of skills) assert.equal(api.skillsMatch(skill, 'Typhoid Injection Certificate'), false);
});

test('credentials match only explicit names or a narrow equivalent name', () => {
  assert.equal(api.skillsMatch('TYPHOID INJECTION CERTIFICATE', 'Typhoid Injection Certificate'), true);
  assert.equal(api.skillsMatch('Typhoid vaccination certificate', 'Typhoid Injection Certificate'), true);
  for (const skill of ['Food handling certificate', 'Typhoid', 'Injection', 'Certificate', 'No typhoid injection certificate']) {
    assert.equal(api.skillsMatch(skill, 'Typhoid Injection Certificate'), false, skill);
  }
  assert.equal(api.skillsMatch('Driving licence', 'Driving'), false);
  assert.equal(api.skillsMatch('Food handling', 'Food handling certificate'), false);
  assert.equal(api.skillsMatch('', 'Certificate'), false);
});

test('required skill breakdown and score do not infer credentials from job text', () => {
  const job = { title: 'Cash handling', skills: ['Typhoid Injection Certificate'] };
  assert.equal(api.getMatchedSkills(job, ['Cash handling']).length, 0);
  assert.equal(api.calculateMatchScore(job, ['Cash handling']), 0);
  assert.equal(api.skillMatchesText('Typhoid Injection Certificate', 'Cash handling experience'), false);
});

test('two of three ordinary skills still gives 67 percent without distance bonus', () => {
  const job = { skills: ['Cashier', 'English', 'Mandarin'] };
  assert.equal(api.getMatchedJobSkills(job, ['Cashier', 'English']).length, 2);
  assert.equal(api.calculateMatchPercent(job, ['Cashier', 'English']), 67);
});
