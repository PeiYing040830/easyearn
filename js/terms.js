// terms page scripts
(function () {
  'use strict';

  function initTermsHeroSlides() {
    const slides = document.querySelectorAll('.terms-hero-slide');
    if (!slides.length) return;
    let index = 0;
    setInterval(() => {
      slides[index].classList.remove('is-active');
      index = (index + 1) % slides.length;
      slides[index].classList.add('is-active');
    }, 5000);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTermsHeroSlides);
  } else {
    initTermsHeroSlides();
  }
})();
