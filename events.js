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
    home: 'Mwanzo', about: 'Kuhusu Sisi', section: 'Ushirika wa Sehemu', kev: 'Matukio ya KSF', min: 'Huduma',
    gift: 'Duka la Zawadi', contact: 'Wasiliana', careers: 'Nafasi za Kazi',
    give: 'Toa', headline: 'Kusanyika, abudu na kukua pamoja.',
    intro: 'Jiunge nasi katika ibada na mikusanyiko maalum ya Kingdom Seekers Fellowship.',
    upcoming: 'Yanayokuja', coming: 'Yanayofuata', viewFlyer: 'Tazama tangazo',
    join: 'Tungefurahi kukuona.', visitCopy: 'Unapanga kutembelea kwa mara ya kwanza? Angalia ibada na ujue cha kutarajia.',
    plan: 'Panga ziara yako', plan2: 'Tembelea', wl: 'Tazama moja kwa moja'
  }
};
const englishText = new Map($$('[data-t]').map(element => [element.dataset.t, element.textContent]));
$$('[data-l]').forEach(button => button.addEventListener('click', () => {
  $$('[data-l]').forEach(item => item.setAttribute('aria-pressed', item === button));
  const language = button.dataset.l;
  document.documentElement.lang = language;
  $$('[data-t]').forEach(element => {
    element.textContent = (translations[language][element.dataset.t] || englishText.get(element.dataset.t));
  });
  try { localStorage.setItem('ksf-lang', language); } catch (_) {}
}));


const start = Date.UTC(2026, 10, 2) - 3 * 60 * 60 * 1000;
const end = Date.UTC(2026, 10, 7) - 3 * 60 * 60 * 1000;
const now = Date.now();
if (now >= end) {
  $('#festival').hidden = true;
  $('#no-events').hidden = false;
} else if (now >= start) {
  $('#countdown').textContent = 'Happening now · 2nd – 6th November 2026';
} else {
  const days = Math.ceil((start - now) / 864e5);
  $('#countdown').textContent = `${days === 1 ? 'Starts tomorrow' : `Starts in ${days} days`} · 2nd – 6th November 2026`;
}

const invitation = 'Join us for the November Word & Prayer Festival: Divine Strategies for Wealth.\n2nd–6th November 2026, Heaven’s Gate Prayer Mountain – Church Without Walls.\nMorning Devotion 5:30 AM · Lunch Hour 12:30 PM · Kesha Friday 9:30 PM.\nBring your family, friends and business associates!';
$('#invite').href = `https://wa.me/?text=${encodeURIComponent(invitation)}`;
$('#calendar').href = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent('November Word & Prayer Festival: Divine Strategies for Wealth')}&dates=20261102/20261107&location=${encodeURIComponent('Heaven’s Gate Prayer Mountain – Church Without Walls')}&details=${encodeURIComponent('Morning Devotion 5:30 AM, Lunch Hour 12:30 PM, Kesha Friday 9:30 PM. Other sessions 9:30 AM & 3:30 PM.')}`;

const flyerDialog = $('#flyer-dialog');
$('#flyer-open').onclick = () => flyerDialog.showModal();
$('#flyer-close').onclick = () => flyerDialog.close();
flyerDialog.addEventListener('click', event => {
  if (event.target === flyerDialog) flyerDialog.close();
});

const observer = new IntersectionObserver(entries => entries.forEach(entry => {
  if (entry.isIntersecting) {
    entry.target.classList.add('in');
    observer.unobserve(entry.target);
  }
}), { threshold: .12 });
$$('.rv').forEach(element => observer.observe(element));
