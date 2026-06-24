function loadPartial(id, path) {
  const target = document.getElementById(id);
  if (!target) return Promise.resolve(false);

  return fetch(path)
    .then((res) => res.text())
    .then((html) => {
      target.innerHTML = html;
      return true;
    })
    .catch(() => {
      target.innerHTML = '';
      return false;
    });
}

function highlightCurrentNav() {
  const navLinks = document.querySelectorAll('#site-header .nav-links a[href]');
  if (!navLinks.length) return;

  const currentPath = window.location.pathname.replace(/\\/g, '/').toLowerCase();
  let bestMatch = null;
  let bestLength = -1;

  navLinks.forEach((link) => {
    link.classList.remove('is-active');
    link.removeAttribute('aria-current');

    try {
      const linkUrl = new URL(link.getAttribute('href'), window.location.href);
      const linkPath = linkUrl.pathname.replace(/\\/g, '/').toLowerCase();
      if (currentPath.endsWith(linkPath) && linkPath.length > bestLength) {
        bestMatch = link;
        bestLength = linkPath.length;
      }
    } catch {
      // Ignore malformed link targets.
    }
  });

  if (bestMatch) {
    bestMatch.classList.add('is-active');
    bestMatch.setAttribute('aria-current', 'page');
  }
}

function normalizeFooterLinks(basePath) {
  const footerLinks = document.querySelectorAll('#site-footer a[href]');
  if (!footerLinks.length) return;

  footerLinks.forEach((link) => {
    const publicPage = link.dataset.footerPage;
    if (publicPage) {
      link.setAttribute('href', `${basePath}${publicPage}`);
      return;
    }

    const href = link.getAttribute('href') || '';
    if (!href || href.startsWith('#') || href.includes(':') || href.startsWith('/')) return;
    link.setAttribute('href', `${basePath}${href.replace(/^(\.\/)+/, '')}`);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  const basePath = window.EASYEARN_BASE_PATH || '';
  const headerPath = window.EASYEARN_HEADER_PATH || `${basePath}partials/header.html`;
  const footerPath = window.EASYEARN_FOOTER_PATH || `${basePath}partials/footer.html`;
  const isJobSeekerHeader = String(headerPath).includes('header-jobseeker.html');
  const isEmployerHeader = String(headerPath).includes('header-employer.html');
  const isAdminHeader = String(headerPath).includes('header-admin.html');
  Promise.all([
    loadPartial('site-header', headerPath),
    loadPartial('site-footer', footerPath)
  ]).then(() => {
    normalizeFooterLinks(basePath);
    highlightCurrentNav();

    if (typeof window.initEasyEarnTranslate === 'function') {
      window.initEasyEarnTranslate();
    }
    if (typeof window.initEasyEarnTheme === 'function') {
      window.initEasyEarnTheme();
    } else {
      if (!document.getElementById('easyearn-theme-script')) {
        const script = document.createElement('script');
        script.id = 'easyearn-theme-script';
        script.src = `${basePath}js/theme.js`;
        script.defer = true;
        script.onload = function () {
          if (typeof window.initEasyEarnTheme === 'function') {
            window.initEasyEarnTheme();
          }
        };
        document.head.appendChild(script);
      }
    }

    if (!document.getElementById('easyearn-floating-chatbot')) {
      const script = document.createElement('script');
      script.id = 'easyearn-floating-chatbot';
      script.type = 'module';
      script.src = `${basePath}js/floating-chatbot.js?v=20260522a`;
      document.body.appendChild(script);
    }

    if (!document.getElementById('easyearn-enhancements')) {
      const script = document.createElement('script');
      script.id = 'easyearn-enhancements';
      script.src = `${basePath}js/enhancements.js`;
      script.defer = true;
      document.body.appendChild(script);
    }

    if (isJobSeekerHeader && !document.getElementById('easyearn-jobseeker-header')) {
      const script = document.createElement('script');
      script.id = 'easyearn-jobseeker-header';
      script.type = 'module';
      script.src = `${basePath}js/jobseeker-header.js?v=20260409b`;
      document.body.appendChild(script);
    }

    if ((isJobSeekerHeader || isEmployerHeader) && !document.getElementById('easyearn-notif-bell')) {
      const bellScript = document.createElement('script');
      bellScript.id = 'easyearn-notif-bell';
      bellScript.type = 'module';
      bellScript.src = `${basePath}js/notifications-bell.js`;
      document.body.appendChild(bellScript);
    }

    if (isEmployerHeader && !document.getElementById('easyearn-employer-header')) {
      const script = document.createElement('script');
      script.id = 'easyearn-employer-header';
      script.type = 'module';
      script.src = `${basePath}js/employer-header.js?v=20260611b`;
      document.body.appendChild(script);
    }

    if (isAdminHeader && !document.getElementById('easyearn-admin-header')) {
      const script = document.createElement('script');
      script.id = 'easyearn-admin-header';
      script.type = 'module';
      script.src = `${basePath}js/admin-header.js?v=20260409b`;
      document.body.appendChild(script);
    }
  });
});
