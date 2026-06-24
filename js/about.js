// about page scripts
(function () {
  'use strict';

  const container = document.getElementById('stacking-cards');
  if (!container) return;

  let cards = Array.from(container.querySelectorAll('.stacking-card'));
  if (cards.length < 2) return;

  function applyOrder() {
    cards.forEach((card) => {
      card.classList.remove('is-front', 'is-middle', 'is-back');
    });
    if (cards[0]) cards[0].classList.add('is-front');
    if (cards[1]) cards[1].classList.add('is-middle');
    if (cards[2]) cards[2].classList.add('is-back');
  }

  function rotateCards() {
    cards.push(cards.shift());
    applyOrder();
  }

  applyOrder();
  container.addEventListener('click', rotateCards);
})();

// About hero background slideshow
(function () {
  'use strict';
  const slides = document.querySelectorAll('.about-hero-slide');
  if (!slides.length) return;

  let idx = 0;
  setInterval(() => {
    slides[idx].classList.remove('is-active');
    idx = (idx + 1) % slides.length;
    slides[idx].classList.add('is-active');
  }, 5000);
})();
