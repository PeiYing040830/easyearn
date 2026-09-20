/**
 * EasyEarn file note: Handles the translate page behavior and related user interactions.
 */
(function () {
  'use strict';

  function hideGoogleTranslateChrome() {
    document.documentElement.style.marginTop = '0';
    document.body.style.top = '0';
    document.body.style.position = 'static';

    document
      .querySelectorAll('.goog-te-banner-frame, iframe.skiptranslate, body > .skiptranslate')
      .forEach(function (node) {
        node.style.display = 'none';
        node.style.visibility = 'hidden';
        node.style.height = '0';
      });
  }

  function watchGoogleTranslateChrome() {
    hideGoogleTranslateChrome();

    if (window.easyEarnTranslateObserver) return;

    window.easyEarnTranslateObserver = new MutationObserver(hideGoogleTranslateChrome);
    window.easyEarnTranslateObserver.observe(document.documentElement, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['style', 'class']
    });

    window.setInterval(hideGoogleTranslateChrome, 800);
  }

  // Sets up init when this script is loaded.
  function init() {
    const el = document.getElementById('google_translate_element');
    if (!el) return;

    watchGoogleTranslateChrome();

    window.googleTranslateElementInit = function () {
      if (typeof google !== 'undefined' && google.translate) {
        new google.translate.TranslateElement(
          {
            pageLanguage: 'en',
            includedLanguages:
              'en,ms,zh-CN,zh-TW,ta,hi,bn,th,vi,id,ja,ko,ar,es,fr,de,pt,ru,it,nl,pl,tr,sv,no,da,fi,el,he,cs,ro',
            layout: google.translate.TranslateElement.InlineLayout.SIMPLE,
            autoDisplay: false
          },
          'google_translate_element'
        );
        hideGoogleTranslateChrome();
      }
    };

    if (document.getElementById('google-translate-script')) {
      if (window.googleTranslateElementInit) {
        window.googleTranslateElementInit();
      }
      return;
    }

    const script = document.createElement('script');
    script.id = 'google-translate-script';
    script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
    script.async = true;
    script.defer = true;
    script.onerror = function () {
      el.innerHTML = '<span class="translate-fallback">Select Language</span>';
    };
    document.head.appendChild(script);
  }

  window.initEasyEarnTranslate = init;
})();
