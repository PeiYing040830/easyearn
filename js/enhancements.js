// UI enhancements: reveal on scroll
(function () {
  'use strict';

  const selectors = [
    '.section-title',
    '.hero-inner',
    '.feat-card',
    '.job-card',
    '.support-card',
    '.split-card',
    '.role-card',
    '.coverage-card',
    '.module-card',
    '.policy-card',
    '.security-card',
    '.step-card',
    '.report-info-card',
    '.report-form',
    '.faq-item'
  ];

  function applyReveal() {
    const elements = document.querySelectorAll(selectors.join(','));
    elements.forEach((el) => el.classList.add('reveal'));

    if (!('IntersectionObserver' in window)) {
      elements.forEach((el) => el.classList.add('is-visible'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    elements.forEach((el) => observer.observe(el));
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', applyReveal);
  } else {
    applyReveal();
  }
})();
