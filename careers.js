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

const translations = {
  en: {},
  sw: {
    home: 'Mwanzo', about: 'Kuhusu Sisi', section: 'Ushirika wa Sehemu',
    kev: 'Matukio ya KSF', min: 'Huduma', gift: 'Duka la Zawadi',
    contact: 'Wasiliana', careers: 'Nafasi za Kazi', give: 'Toa',
    headline: 'Tumia karama zako. Leta mabadiliko.',
    intro: 'Nafasi za kuhudumu pamoja na timu ya KSF zitakapopatikana, utazipata hapa.',
    openings: 'Nafasi za sasa', joinTeam: 'Jiunge na timu ya KSF.',
    noOpenings: 'Hakuna nafasi kwa sasa',
    checkBack: 'Kwa sasa hakuna nafasi zilizotangazwa.',
    checkBackCopy: 'Nafasi mpya zitawekwa hapa zitakapopatikana. Tafadhali tembelea tena kwa fursa zijazo.',
    careersInquiry: 'Uliza kuhusu nafasi zijazo',
    applyNote: 'Wasiliana nasi kuuliza kuhusu nafasi zijazo tu; kwa sasa hakuna nafasi zilizo wazi za kuomba.',
    plan2: 'Tembelea', wl: 'Tazama moja kwa moja'
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


const observer = new IntersectionObserver(entries => entries.forEach(entry => {
  if (entry.isIntersecting) {
    entry.target.classList.add('in');
    observer.unobserve(entry.target);
  }
}), { threshold: .12 });
$$('.rv').forEach(element => observer.observe(element));
