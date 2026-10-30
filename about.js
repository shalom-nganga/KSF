/* about.js : self-contained script for about.html (menu, language, reveal, "coming soon") */
const $ = s => document.querySelector(s), $$ = s => [...document.querySelectorAll(s)];

/* menu */
$('#mn').onclick = () => { const o = $('#nav').classList.toggle('open'); $('#mn').setAttribute('aria-expanded', o); };
$$('#nav a').forEach(a => a.addEventListener('click', () => { $('#nav').classList.remove('open'); $('#mn').setAttribute('aria-expanded', 'false'); }));

/* pages that are not built yet */
let tt;
document.addEventListener('click', e => {
  const a = e.target.closest('[data-soon]'); if (!a) return;
  e.preventDefault();
  const t = $('#toast'); t.textContent = 'This page comes in the full build'; t.classList.add('on');
  clearTimeout(tt); tt = setTimeout(() => t.classList.remove('on'), 2200);
});

/* language: same EN / SW switch as the homepage, remembered between pages */
const SW = {
  home: 'Mwanzo', about: 'Kuhusu Sisi', section: 'Ushirika wa Sehemu', kev: 'Matukio ya KSF', min: 'Huduma', gift: 'Duka la Zawadi',
  contact: 'Wasiliana', careers: 'Nafasi za Kazi', give: 'Toa', plan: 'Panga ziara yako', plan2: 'Tembelea', wl: 'Tazama moja kwa moja',
  abt: 'Kuhusu sisi',
  ah1: 'Kanisa linalompenda Mungu na watu.',
  alede: 'Kingdom Seekers Fellowship ni familia ya waamini walioko Nakuru na kote nchini Kenya, wanaoutafuta kwanza ufalme wa Mungu.',
  hh: 'Historia ya KSF',
  hhp1: 'Kingdom Seekers Fellowship, kanisa la Kitume (Apostolic), limejikita katika hekima ya kudumu ya mafundisho ya Kristo yanayopatikana katika Mathayo 6:33:',
  hhq: '“Bali utafuteni kwanza ufalme wa Mungu na haki yake, na hayo yote mtazidishiwa.”',
  hhp2: 'Kingdom Seekers Fellowship ina makao makuu yake katika Mji wa Nakuru, ikiwa na mtandao wa matawi zaidi ya 20 kote nchini. Dhamira yetu kuu ni kubadilisha maisha kwa kumtafuta Mungu na kumfanya Yeye ajulikane.',
  aj: 'Safari Yetu',
  ajp: 'Kingdom Seekers Fellowship ilianza wakati Mtume John Kimani William na mke wake, Rev. Naomi Kimani, walipoanzisha huduma hii. Makao makuu yake yako katika Mji wa Nakuru, ikiwa na matawi zaidi ya 20 yaliyoenea kote nchini.',
  am: 'Dhamira Yetu',
  amp: 'Katika Kingdom Seekers Fellowship, dhamira yetu kuu ni kubadilisha maisha kwa kumtafuta Mungu na kumfanya Yeye ajulikane. Tunaamini katika nguvu za Injili kubadilisha mioyo na kuathiri jamii.',
  ami: 'Misheni kwa Mwili wa Kristo Kimataifa (MBCI)',
  amip: 'Mwaka wa 2008, chini ya uongozi wa Mwangalizi Mtume John Kimani William, tulizindua Missions to the Body of Christ International (MBCI). Maono na dhamira ya MBCI iko wazi: “Kuwafikia watu kwa injili ya Yesu Kristo, hivyo kubadilisha maisha, kuwawezesha waamini, kuinua na kuwafunza wahudumu, na kuwaongoza watu, familia, miji na mataifa kuingia katika hatima yao ya kimungu.” MBCI imesafiri hadi kila jiji kuu na mji nchini Kenya, ikiendesha mikutano ya Maombi na Breakthrough inayobadilisha maisha.',
  at: 'Hema Kuu la MBCI',
  atp: 'Mwaka wa 2011, MBCI ilipata hema kuu na viti, na kulipanua mara mbili ili kuwatosha umati unaoongezeka wakati wa misheni. Leo, kwa neema ya Mungu, MBCI ina malori mawili ya futi 40, mabasi 4, magari kadhaa madogo, na vifaa bora vya sauti vinavyowezesha kazi yetu ya kimisionari. Mwaka wa 2023, wakati wa maadhimisho yetu ya miaka 10, MBCI ilizindua kazi ya kimisionari ya kimataifa, na mikutano ya kwanza ikifanyika Burundi na Nigeria.',
  ac: 'Karibu uabudu nasi',
  acp: 'Chagua ibada, ona unachoweza kutarajia, nasi tutakuwa na kiti tayari kwa ajili yako.'
}, EN = {};
$$('[data-t]').forEach(e => EN[e.dataset.t] = EN[e.dataset.t] || e.textContent);
$$('[data-l]').forEach(b => b.onclick = () => {
  $$('[data-l]').forEach(x => x.setAttribute('aria-pressed', x === b));
  const sw = b.dataset.l === 'sw';
  document.documentElement.lang = b.dataset.l;
  $$('[data-t]').forEach(e => e.textContent = (sw ? SW : EN)[e.dataset.t] || e.textContent);
  try { localStorage.setItem('ksf-lang', b.dataset.l); } catch (_) {}
});
/* reveal on scroll */
const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { threshold: .12 });
$$('.rv').forEach(r => io.observe(r));