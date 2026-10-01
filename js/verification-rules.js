// Platform review requirements, shared by submission and admin approval.
export function verificationRequirements(businessType) {
  const individual = businessType === 'Freelancer / Individual Employer';
  return {
    individual,
    requiresRegistrationNumber: !individual,
    registrationLabel: individual ? 'Proof of address' : 'Business / organisation registration document',
    contactLabel: individual ? 'Identity proof' : 'Contact person proof',
    addressLabel: individual ? 'Contact address' : 'Registered business / organisation address'
  };
}

export function verificationPackageError(payload) {
  if (!payload.businessType) return 'Please select the employer / business type.';
  const rules = verificationRequirements(payload.businessType);
  if (rules.requiresRegistrationNumber && String(payload.ssmNumber || '').trim().length < 6) {
    return 'Please enter a valid registration number (at least 6 characters).';
  }
  if (String(payload.businessAddress || '').trim().length < 10) {
    return 'Please enter the full address (at least 10 characters).';
  }
  if (!payload.registration?.content || !payload.contact?.content) {
    return `Please upload ${rules.registrationLabel.toLowerCase()} and ${rules.contactLabel.toLowerCase()}.`;
  }
  return '';
}
