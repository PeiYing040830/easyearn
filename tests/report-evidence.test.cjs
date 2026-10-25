const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const source = fs.readFileSync(require('node:path').join(__dirname, '../js/report-evidence.js'));
const modulePromise = import('data:text/javascript;base64,' + source.toString('base64'));

test('evidence bytes survive encoding for persistence and download', async () => {
  const { readReportEvidence, evidenceBytes } = await modulePromise;
  const file = new File(['%PDF-1.4\nQA attachment'], 'qa.pdf', { type: 'application/pdf' });
  const evidence = await readReportEvidence(file);
  assert.equal(evidence.name, 'qa.pdf');
  assert.equal(evidence.type, 'application/pdf');
  assert.equal(Buffer.from(evidenceBytes(evidence)).toString(), '%PDF-1.4\nQA attachment');
});

test('optional evidence and unsafe or oversized attachments are handled', async () => {
  const { readReportEvidence, evidenceBytes } = await modulePromise;
  assert.equal(await readReportEvidence(null), null);
  await assert.rejects(readReportEvidence(new File(['<svg/>'], 'unsafe.svg', { type: 'image/svg+xml' })), /PDF/);
  await assert.rejects(readReportEvidence(new File([new Uint8Array(3 * 1024 * 1024 + 1)], 'big.png', { type: 'image/png' })), /3MB/);
  assert.throws(() => evidenceBytes({ name: 'qa.pdf', type: 'application/pdf', base64: '<script>' }), /Invalid/);
});
