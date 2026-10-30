const $ = selector => document.querySelector(selector);
const $$ = selector => [...document.querySelectorAll(selector)];

$('#mn').onclick = () => {
  const open = $('#nav').classList.toggle('open');
  $('#mn').setAttribute('aria-expanded', open);
};
$$('#nav a').forEach(link => link.addEventListener('click', () => {
  $('#nav').classList.remove('open');
  $('#mn').setAttribute('aria-expanded', 'false');
}));

let toastTimer;
document.addEventListener('click', event => {
  const link = event.target.closest('[data-soon]');
  if (!link) return;
  event.preventDefault();
  const toast = $('#toast');
  toast.textContent = 'This page comes in the full build';
  toast.classList.add('on');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('on'), 2200);
});

const translations = {
  en: {},
  sw: {
    home: 'Mwanzo', about: 'Kuhusu Sisi', section: 'Ushirika wa Sehemu',
    kev: 'Matukio ya KSF', min: 'Huduma', gift: 'Duka la Zawadi',
    contact: 'Wasiliana', careers: 'Nafasi za Kazi', give: 'Toa',
    headline: 'Kuna nafasi yako ya kukua na kuhudumu.',
    intro: 'Kutoka maombi na ibada hadi vyombo vya habari, huduma kwa jamii na malezi ya kila kizazi, gundua huduma zinazounda familia yetu ya KSF.',
    explore: 'Gundua huduma zetu', ourMinistries: 'Huduma zetu',
    findPlace: 'Pata nafasi yako katika familia.',
    ready: 'Uko tayari kupata nafasi yako?',
    readyCopy: 'Njoo uabudu nasi na ugundue jinsi karama zako zinavyoweza kuhudumia familia ya KSF.',
    plan: 'Panga ziara yako', plan2: 'Tembelea', wl: 'Tazama moja kwa moja'
  }
};
const englishText = new Map($$('[data-t]').map(element => [element.dataset.t, element.textContent]));
$$('[data-l]').forEach(button => button.addEventListener('click', () => {
  $$('[data-l]').forEach(item => item.setAttribute('aria-pressed', item === button));
  const language = button.dataset.l;
  document.documentElement.lang = language;
  $$('[data-t]').forEach(element => {
    element.textContent = translations[language][element.dataset.t] || englishText.get(element.dataset.t);
  });
  try { localStorage.setItem('ksf-lang', language); } catch (_) {}
}));


function openLinkedMinistry() {
  if (!location.hash) return;
  const ministry = document.getElementById(location.hash.slice(1));
  if (ministry instanceof HTMLDetailsElement) ministry.open = true;
}
openLinkedMinistry();
window.addEventListener('hashchange', openLinkedMinistry);

const observer = new IntersectionObserver(entries => entries.forEach(entry => {
  if (entry.isIntersecting) {
    entry.target.classList.add('in');
    observer.unobserve(entry.target);
  }
}), { threshold: .12 });
$$('.rv').forEach(element => observer.observe(element));
