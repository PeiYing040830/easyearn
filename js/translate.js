/**
 * EasyEarn file note: Handles the translate page behavior and related user interactions.
 */
(function () {
  'use strict';

  const googleChromeSelector = [
    '.goog-te-banner-frame',
    '.VIpgJd-ZVi9od-ORHb',
    '.VIpgJd-ZVi9od-ORHb-OEVmcd',
    'iframe.goog-te-banner-frame',
    'iframe.skiptranslate',
    'body > .skiptranslate',
    'body > .VIpgJd-ZVi9od-ORHb',
    'body > .VIpgJd-ZVi9od-ORHb-OEVmcd'
  ].join(', ');

  function setImportantStyle(node, property, value) {
    node.style.setProperty(property, value, 'important');
  }

  function hideGoogleTranslateChrome() {
    setImportantStyle(document.documentElement, 'margin-top', '0');
    setImportantStyle(document.body, 'top', '0');
    setImportantStyle(document.body, 'position', 'static');

    document
      .querySelectorAll(googleChromeSelector)
      .forEach(function (node) {
        setImportantStyle(node, 'display', 'none');
        setImportantStyle(node, 'visibility', 'hidden');
        setImportantStyle(node, 'height', '0');
        setImportantStyle(node, 'min-height', '0');
        setImportantStyle(node, 'max-height', '0');
        setImportantStyle(node, 'opacity', '0');
        setImportantStyle(node, 'pointer-events', 'none');
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
