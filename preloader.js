(() => {
  const preloader = document.querySelector('#site-preloader');
  if (!preloader || matchMedia('(prefers-reduced-motion: reduce)').matches) {
    preloader?.remove();
    return;
  }

  document.body.classList.add('is-loading');

  const hidePreloader = () => {
    if (preloader.classList.contains('is-leaving')) return;
    preloader.classList.add('is-leaving');
    document.body.classList.remove('is-loading');
    document.body.classList.add('is-loaded');
    setTimeout(() => preloader.remove(), 1700);
  };

  const pageLoaded = document.readyState === 'complete'
    ? Promise.resolve()
    : new Promise(resolve => window.addEventListener('load', resolve, { once: true }));

  Promise.all([
    pageLoaded,
    new Promise(resolve => setTimeout(resolve, 1500))
  ]).then(hidePreloader);

  setTimeout(hidePreloader, 6000);
})();
