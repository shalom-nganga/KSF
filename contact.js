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
    headline: 'Tungependa kusikia kutoka kwako.',
    intro: 'Wasiliana nasi kwa swali, ombi la maombi, au kujua jinsi ya kushiriki katika huduma zetu.',
    messageUs: 'Tutumie ujumbe', visitUs: 'Tembelea', directions: 'Pata maelekezo',
    callUs: 'Tupigie simu', connect: 'Tuungane.',
    connectCopy: 'Timu yetu itafurahi kusikia kutoka kwako na kukusaidia kupata hatua inayofuata.',
    exploreMinistries: 'Gundua huduma zetu', getInTouch: 'Wasiliana nasi',
    formIntro: 'Tunaweza kukusaidiaje?',
    formCopy: 'Tutumie swali lako, ombi la maombi, au utuambie jinsi ungependa kushiriki.',
    fullName: 'Jina kamili', phone: 'Simu', email: 'Barua pepe', message: 'Ujumbe',
    formNote: 'Kutuma hufungua rasimu katika programu yako ya barua pepe; tovuti haitumi wala kuhifadhi ujumbe wako.',
    submit: 'Andaa rasimu ya barua pepe', emailReady: 'Ujumbe wako uko tayari kama barua pepe. Ukague na uutume kupitia programu yako ya barua pepe.',
    openDraft: 'Fungua rasimu ya barua pepe', emailFallback: 'Huna programu ya barua pepe?',
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


$('#contact-form').addEventListener('submit', event => {
  event.preventDefault();
  const form = event.currentTarget;
  if (!form.reportValidity()) return;

  const fields = new FormData(form);
  const name = fields.get('name').trim();
  const subject = `Website message from ${name}`;
  const body = [
    `Name: ${name}`,
    `Phone: ${fields.get('phone').trim() || 'Not provided'}`,
    `Email: ${fields.get('email').trim()}`,
    '',
    fields.get('message').trim()
  ].join('\n');
  const mailto = `mailto:info@ksfchurch.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  $('#email-draft').href = mailto;
  $('#form-status').hidden = false;
});

const observer = new IntersectionObserver(entries => entries.forEach(entry => {
  if (entry.isIntersecting) {
    entry.target.classList.add('in');
    observer.unobserve(entry.target);
  }
}), { threshold: .12 });
$$('.rv').forEach(element => observer.observe(element));
