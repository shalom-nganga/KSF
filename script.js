const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
/* plan your visit: Nakuru only. Times come from the November festival flyer; Sunday time still to confirm */
const SV=[{n:'Morning Devotion',t:'5:30 AM',w:'Prayer and worship to start your day.'},{n:'Lunch Hour Service',t:'12:30 PM',w:'A midday service made for the workday.'},{n:'Friday Night Vigil (Kesha)',t:'Friday, 9:30 PM',w:'An evening of overnight prayer and worship.'},{n:'Sunday Service',t:'Sundays · time to confirm',w:'Worship, prayer and the message from the Apostle.'}];
let ps=0;const o1=$('#o1');o1.innerHTML=SV.map((v,i)=>'<button class="opt" data-i="'+i+'">'+v.n+'</button>').join('');
function plan(){$$('#o1 .opt').forEach((b,i)=>b.setAttribute('aria-pressed',i===ps));const v=SV[ps];
  $('#res').innerHTML='<h3>'+v.n+'</h3><p>'+v.t+' · Kingdom Seekers Fellowship, Nakuru</p><ul><li>'+v.w+'</li><li>Come as you are. Everyone is welcome.</li><li>Our team will greet you and help you find a seat.</li></ul><a class="btn" target="_blank" rel="noopener" href="https://www.google.com/maps/search/?api=1&query='+encodeURIComponent('Kingdom Seekers Fellowship Nakuru')+'">Get directions</a><p style="margin:14px 0 0;font-size:.8rem">Please confirm times on 0111 012200.</p>'}
o1.onclick=e=>{const b=e.target.closest('.opt');if(b){ps=+b.dataset.i;plan()}};plan();
/* festival: countdown in Nairobi time, hides itself once it is over */
(function(){const st=Date.UTC(2026,10,2)-3*36e5,en=Date.UTC(2026,10,7)-3*36e5,now=Date.now(),cd=$('#cd');
  if(now>=en){$('#fest').style.display='none';$('#noev').style.display='block'}
  else if(now>=st)cd.textContent='Happening now · 2nd – 6th November 2026';
  else{const d=Math.ceil((st-now)/864e5);cd.textContent=(d===1?'Starts tomorrow':'Starts in '+d+' days')+' · 2nd – 6th November 2026'}
  const msg='Join us for the November Word & Prayer Festival: Divine Strategies for Wealth.\n2nd–6th November 2026, Heaven’s Gate Prayer Mountain – Church Without Walls.\nMorning Devotion 5:30 AM · Lunch Hour 12:30 PM · Kesha Friday 9:30 PM.\nBring your family, friends and business associates!';
  $('#wa').href='https://wa.me/?text='+encodeURIComponent(msg);
  $('#gc2').href='https://calendar.google.com/calendar/render?action=TEMPLATE&text='+encodeURIComponent('November Word & Prayer Festival: Divine Strategies for Wealth')+'&dates=20261102/20261107&location='+encodeURIComponent('Heaven’s Gate Prayer Mountain – Church Without Walls')+'&details='+encodeURIComponent('Morning Devotion 5:30 AM, Lunch Hour 12:30 PM, Kesha Friday 9:30 PM. Other sessions 9:30 AM & 3:30 PM.')})();
const fd=$('#fd');$('#flb').onclick=()=>fd.showModal();$('#fx').onclick=()=>fd.close();fd.addEventListener('click',e=>{if(e.target===fd)fd.close()});
/* sermons */
const SM=[['Dealing with Bitterness','Apostle John Kimani William','Sunday'],['Crossing Unknown Boundaries','Apostle John Kimani William','Vigil'],['What Weakens the Men Most','Pastor John Kamau','Lunch Hour'],['Thanksgiving: A Key to Restoration','Pastor David Kamau','Devotion'],['When Men Return, Families Arise','Pastor Paul Mwangi','Devotion'],['Common Factors That Affect the Boy Child','Pastor Eliud Mwangi','Lunch Hour']];
let sf='All';const FL=['All','Sunday','Lunch Hour','Devotion','Vigil'];
$('#sf').innerHTML=FL.map(f=>'<button class="ch" data-f="'+f+'">'+f+'</button>').join('');
function sermons(){$$('#sf .ch').forEach(b=>b.setAttribute('aria-pressed',b.dataset.f===sf));$('#sg').innerHTML=SM.filter(s=>sf==='All'||s[2]===sf).map((s,i)=>'<a class="sm" href="#" data-soon><div class="th c'+(i%4)+'"><i>'+s[2]+'</i></div><div class="t"><h3>'+s[0]+'</h3><span>'+s[1]+'</span></div></a>').join('')}
$('#sf').onclick=e=>{const b=e.target.closest('.ch');if(b){sf=b.dataset.f;sermons()}};sermons();
/* giving */
const GV=[['Tithe','Tithe'],['Offering','Offering'],['Missions','Missions']];let gi=1;
$('#gc').innerHTML=GV.map((g,i)=>'<button class="ch" data-i="'+i+'">'+g[0]+'</button>').join('');
function giv(){$$('#gc .ch').forEach((b,i)=>b.setAttribute('aria-pressed',i===gi));const mission=GV[gi][0]==='Missions';$('#giving-details').hidden=mission;$('#mission-note').hidden=!mission;$('#cp').hidden=mission;if(!mission)$('#ac').textContent=GV[gi][1]}
$('#gc').onclick=e=>{const b=e.target.closest('.ch');if(b){gi=+b.dataset.i;giv()}};giv();
$('#cp').onclick=()=>{const t='Paybill: '+$('#pb').textContent+'\nAccount: '+$('#ac').textContent+'\nM-Pesa: 0706 26 26 26 / 0711 112 112';(navigator.clipboard?navigator.clipboard.writeText(t):Promise.reject()).then(()=>$('#cp').textContent='Copied ✓',()=>$('#cp').textContent='Copy not available').finally(()=>setTimeout(()=>$('#cp').textContent='Copy details',1800))};
/* pages that are not built yet */
let tt;document.addEventListener('click',e=>{const a=e.target.closest('[data-soon]');if(!a)return;e.preventDefault();const t=$('#toast');t.textContent='This page comes in the full build';t.classList.add('on');clearTimeout(tt);tt=setTimeout(()=>t.classList.remove('on'),2200)});
/* menu, language, reveal */
$('#mn').onclick=()=>{const o=$('#nav').classList.toggle('open');$('#mn').setAttribute('aria-expanded',o)};$$('#nav a').forEach(a=>a.addEventListener('click',()=>$('#nav').classList.remove('open')));
const SW={home:'Mwanzo',about:'Kuhusu Sisi',section:'Ushirika wa Sehemu',kev:'Matukio ya KSF',min:'Huduma',gift:'Duka la Zawadi',contact:'Wasiliana',careers:'Nafasi za Kazi',give:'Toa',h1a:'Utafuteni',h1b:'Kwanza.',plan:'Panga ziara yako',plan2:'Tembelea',wl:'Tazama moja kwa moja',pv:'Panga ziara yako ya kwanza',visit:'Tembelea',watch:'Tazama',wel:'Karibu Kingdom Seekers Fellowship',wt1:'Kanisa linalompenda',wt2:'Mungu na watu.',wlp1:'Kingdom Seekers Fellowship ilianzishwa na Mtume John Kimani William na Rev. Naomi Kimani, ambao wameendelea kuhudumia neno la Mungu kwa kusanyiko linalozidi kukua. Huduma hii ina makao makuu yake katika Mji wa Nakuru, ikiwa na matawi zaidi ya 20 yaliyoenea kote nchini.',wlp2:'Ili kuwaleta watu wengi zaidi kwa ufalme wa Mungu, Kingdom Seekers Fellowship kupitia Mwangalizi wake, Mtume John Kimani William, ilizindua mwaka wa 2008 huduma iitwayo Missions to the Body of Christ International (MBCI). MBCI imesafiri hadi kila jiji kuu na mji nchini Kenya ikiendesha mikutano ya Maombi na Breakthrough inayobadilisha maisha.',wlk:'Jua zaidi'},EN={};
$$('[data-t]').forEach(e=>EN[e.dataset.t]=EN[e.dataset.t]||e.textContent);
$$('[data-l]').forEach(b=>b.onclick=()=>{$$('[data-l]').forEach(x=>x.setAttribute('aria-pressed',x===b));const sw=b.dataset.l==='sw';document.documentElement.lang=b.dataset.l;$$('[data-t]').forEach(e=>e.textContent=(sw?SW:EN)[e.dataset.t]||e.textContent);try{localStorage.setItem('ksf-lang',b.dataset.l)}catch(_){}});
try{if(localStorage.getItem('ksf-lang')==='sw')$('[data-l="sw"]').click()}catch(_){}
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.12});$$('.rv').forEach(r=>io.observe(r));