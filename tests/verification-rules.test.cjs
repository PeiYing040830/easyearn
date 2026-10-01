const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const rules = import('data:text/javascript;base64,' + fs.readFileSync(path.join(__dirname, '../js/verification-rules.js')).toString('base64'));
const complete = { businessAddress: '123 Example Street', registration: { content: 'address-or-registration-proof' }, contact: { content: 'identity-or-contact-proof' } };
test('individual hiring can be reviewed without SSM but needs both proofs', async () => {
  const { verificationPackageError } = await rules;
  const payload = { ...complete, businessType: 'Individual Hirer' };
  assert.equal(verificationPackageError(payload), '');
  assert.match(verificationPackageError({ ...payload, contact: null }), /identity proof/);
  assert.match(verificationPackageError({ ...payload, registration: null }), /proof of address/);
});
test('companies and online sellers require registration details', async () => {
  const { verificationPackageError } = await rules;
  for (const businessType of ['Company / Business', 'Online Seller / E-commerce', 'Private Limited Company (Sdn. Bhd.)', 'Online Business / E-commerce', 'Non-Profit / NGO', 'Other']) {
    assert.match(verificationPackageError({ ...complete, businessType }), /registration number/);
    assert.equal(verificationPackageError({ ...complete, businessType, ssmNumber: '202401012345' }), '');
  }
});
test('missing type and address cannot be approved', async () => {
  const { verificationPackageError } = await rules;
  assert.match(verificationPackageError(complete), /select/);
  assert.match(verificationPackageError({ ...complete, businessType: 'Individual Hirer', businessAddress: '' }), /address/);
});

test('legacy types map to the three categories and unknown types are rejected', async () => {
  const { normalizeEmployerType, verificationPackageError } = await rules;
  assert.equal(normalizeEmployerType('Freelancer / Individual Employer'), 'Individual Hirer');
  assert.equal(normalizeEmployerType('Sole Proprietorship'), 'Company / Business');
  assert.equal(normalizeEmployerType('Online Business / E-commerce'), 'Online Seller / E-commerce');
  assert.match(verificationPackageError({ ...complete, businessType: 'unregistered', ssmNumber: '123456' }), /valid employer type/);
});
