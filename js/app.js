/* ============================================================
   ThaiLingo V2 — application
   ============================================================ */
const app = document.getElementById('app');
let route = 'path';
let L = null;                 // état de la leçon en cours

const h = (html)=>{ const d=document.createElement('div'); d.innerHTML=html.trim(); return d.firstElementChild; };
const esc = s => String(s).replace(/[&<>"]/g, c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const isThaiText = s => /[\u0E00-\u0E7F]/.test(s);   // plage thaïe, en échappements pour ne dépendre d'aucun encodage


/* ============================================================
   Sauvegarde en ligne — la page enregistre la progression dans
   l'artifact lui-même. Elle survit alors à un effacement des
   données de Safari et suit d'un appareil à l'autre.
   Indisponible ailleurs (fichier local, serveur perso) : tout
   retombe alors proprement sur le stockage du navigateur.
   ============================================================ */
const CHEMIN_SAUVEGARDE = 'data/progression.json';
/* Dans la page hébergée par Claude, la page est en cadre et aucun téléchargement
   ne lui est accordé : on n'y propose pas la sauvegarde en fichier. */
const TELECHARGEMENT_POSSIBLE = !(window.claude && window.claude.use);
const NAV_HTML = `<nav class="nav" id="nav">
  <button data-r="path" class="on" title="Apprendre" aria-label="Apprendre">🏠</button>
  <button data-r="ecriture" title="Écriture" aria-label="Écriture">✍️</button>
  <button data-r="revision" title="Révision" aria-label="Révision">🔁</button>
  <button data-r="profile" title="Profil" aria-label="Profil">👤</button>
</nav>`;

const Cloud = (()=>{
  let ns, demande = null;
  async function api(){
    if(!demande) demande = (async ()=>{
      try{ return (window.claude && window.claude.use) ? await window.claude.use('artifact') : null; }
      catch(e){ return null; }
    })();
    ns = await demande; return ns;
  }

  /* document complet régénéré depuis la source de la page, jamais depuis le DOM affiché */
  function documentComplet(etat){
    const style = document.getElementById('thailingo-style');
    const source = document.getElementById('thailingo-app');
    if(!style || !source) return null;
    const sansBalise = t => String(t).replace(/<\/(script)/gi, '<\\/$1');
    return `<!doctype html>
<html lang="fr"><head>
<meta charset="utf-8">
<title>ThaiLingo</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Nunito:wght@700;800;900&family=Noto+Sans+Thai:wght@500;700&display=swap" rel="stylesheet">
<style id="thailingo-style">${style.textContent}</style>
</head><body>
<div id="app"></div>
${NAV_HTML}
<script id="thailingo-etat" type="application/json">${sansBalise(JSON.stringify(etat))}<\/script>
<script id="thailingo-app">${sansBalise(source.textContent)}<\/script>
</body></html>`;
  }

  return {
    /* progression déposée dans la page publiée (repli quand il n'y a pas de fichier) */
    etatEmbarque(){
      const el = document.getElementById('thailingo-etat');
      if(!el || !el.textContent.trim()) return null;
      try{ const d = JSON.parse(el.textContent); return (d && d.progress) ? d : null; }
      catch(e){ return null; }
    },
    async lire(){
      if(!(window.claude && window.claude.use)) return null;   // pas de sauvegarde en ligne ici
      try{
        const r = await fetch(CHEMIN_SAUVEGARDE, {cache:'no-store'});
        if(!r.ok) return null;
        const d = await r.json();
        return (d && d.progress) ? d : null;
      }catch(e){ return null; }
    },
    async disponible(){ return !!(await api()); },
    async ecrire(){
      const a = await api();
      if(!a) return 'indisponible';
      const etat = Store.get();
      try{
        await a.publish({ [CHEMIN_SAUVEGARDE]: JSON.stringify(etat) });
        Store.get().sauvegardeEnLigne = 'fichier'; Store.save();
        return 'ok';
      }catch(e){
        const code = e && e.code;
        if(code === 'conflict')      return 'conflit';
        if(code === 'rate_limited')  return 'trop-souvent';
        if(code === 'not_writer' || code === 'not_granted' || code === 'not_declared') return 'lecture-seule';
        // la forme « fichier » n'existe pas ici : on republie la page entière, état compris
        const doc = documentComplet(etat);
        if(!doc) return 'erreur';
        try{
          await a.publish(doc);
          Store.get().sauvegardeEnLigne = 'page'; Store.save();
          return 'ok-page';
        }catch(e2){ return (e2 && e2.code === 'conflict') ? 'conflit' : 'erreur'; }
      }
    }
  };
})();

/* au démarrage : récupérer la progression en ligne si celle de l'appareil est vide
   ou visiblement en retard — jamais d'écrasement silencieux dans l'autre sens */
async function synchroniserDepuisLeCloud(){
  let distant = null;
  try{ distant = await Nuage.lire(); }catch(e){ /* hors ligne : on garde l'appareil */ }
  if(!distant) distant = (await Cloud.lire()) || Cloud.etatEmbarque();
  if(!distant) return;
  const local = Store.get();
  const vide = !Object.keys(local.progress || {}).length && !local.xp;
  if(vide){
    Store.adopter(distant); render();
    toast(T('en_ligne_recuperee'));
  } else if((distant.xp||0) > (local.xp||0)){
    const oui = await dialogue({ titre:T('en_ligne_titre'),
      texte:T('en_ligne_detail',{distant:distant.xp||0, local:local.xp||0}),
      ok:T('en_ligne_oui'), annuler:T('en_ligne_non') });
    if(oui){
      Store.adopter(distant); render();
    }
  }
}

/* ---------------- barre du haut ---------------- */
function topbar(){
  const s = Store.get();
  const pct = Math.min(100, Math.round(100*s.dailyXp/s.dailyGoal));
  return `<div class="topbar">
    <div class="stat streak" title="Série"><span class="ic">🔥</span>${s.streak}</div>
    <div class="goal" title="Objectif du jour"><i style="width:${pct}%"></i><b>${s.dailyXp}/${s.dailyGoal} XP</b></div>
    <div class="spacer"></div>
    <div class="stat heart" title="Vies"><span class="ic">❤️</span>${s.hearts}</div>
  </div>`;
}

/* ---------------- parcours (langue et écriture) ---------------- */
function etatLecon(liste, ui, li){
  const lecon = liste[ui].lessons[li];
  if(Store.crowns(lecon.id) > 0) return 'done';
  if(Store.get().toutDebloque) return 'active';
  for(let u=0; u<=ui; u++){
    const max = (u===ui) ? li : liste[u].lessons.length;
    for(let l=0; l<max; l++) if(Store.crowns(liste[u].lessons[l].id)===0) return 'locked';
  }
  return 'active';
}
function uniteFinie(liste, ui){ return liste[ui].lessons.every(l=>Store.crowns(l.id)>0); }

function parcoursHTML(liste, avecSections){
  let html = '';
  let bulleMise = false;      // « Commencer » ne marque que la prochaine leçon à faire
  liste.forEach((u,ui)=>{
    if(avecSections){
      const sec = SECTIONS.find(x=>x.unites && x.unites[0]===u.id);
      if(sec){
        const faites = sec.unites.filter(id=>{
          const k = liste.findIndex(z=>z.id===id); return k>=0 && uniteFinie(liste,k);
        }).length;
        html += `<div class="section-head" style="color:${sec.couleur};border-color:${sec.couleur}">
          <b>${esc(txt(sec.titre))}</b><small>${T('unites_terminees',{a:faites,b:sec.unites.length})}</small></div>`;
      }
    }
    html += `<div class="unit-header" style="background:${u.color}">
      <div class="ic">${u.icon}</div><div><h2>${esc(txt(u.title))} · ${esc(txt(u.subtitle))}</h2>
      <p>${T('lecons_n',{n:u.lessons.length})}</p></div></div><div class="path">`;
    u.lessons.forEach((l,li)=>{
      const st = etatLecon(liste,ui,li), c = Store.crowns(l.id);
      const bulle = st==='active' && !bulleMise;
      if(bulle) bulleMise = true;
      html += `<div class="node-wrap ${bulle?'has-bubble':''}" style="margin-left:${[0,60,-60,40,-40][li%5]}px">
        ${bulle?`<div class="start-bubble">${T('commencer')}</div>`:''}
        <button class="node ${st}" data-lecon="${l.id}" ${st==='locked'?'disabled':''} aria-label="${esc(txt(l.title))}"
          style="${st==='locked'?'':(c>=5?'background:#FFC800;box-shadow:0 7px 0 #E0A800':`background:${u.color};box-shadow:0 7px 0 ${shade(u.color)}`)}">
          ${st==='locked'?'🔒':(c>=5?'🏅':c>=3?'👑':'⭐')}${c?`<span class="crowns">👑${c}</span>`:''}
        </button><div class="node-label">${esc(txt(l.title))}</div></div>`;
    });
    const chestId = 'chest_'+u.id, got = Store.crowns(chestId)>0;
    if(uniteFinie(liste,ui)) html += `<div class="node-wrap"><button class="node ${got?'done':'active'}" data-chest="${u.id}"
        style="background:${got?'#DDD':'#FFC800'};box-shadow:0 7px 0 ${got?'#BBB':'#E0A800'}">${got?'📭':'🎁'}</button>
      <div class="node-label">${got?T('coffre_ouvert'):T('coffre')}</div></div>`;
    html += '</div>';
  });
  return html;
}
function brancherParcours(){
  app.querySelectorAll('.node[data-lecon]:not([disabled])').forEach(b=>b.onclick=()=>{
    Audio_.unlock(); Audio_.tap(); startLeconId(b.dataset.lecon);
  });
  const ch = app.querySelector('.node[data-chest]');
  if(ch) ch.onclick = ()=>{
    const id = 'chest_'+ch.dataset.chest;
    if(Store.crowns(id)>0) return;
    Store.completeLesson(id, 15); Audio_.win();
    toast(T('coffre_gagne')); render();
  };
}

function renderPath(){
  const s = Store.get();
  let html = topbar() + '<div class="screen">';
  if(s.resume){
    html += `<div class="banner blue"><div><b>${T('lecon_en_cours')}</b><small>${T('reprendre_ou')}</small></div>
      <button class="btn blue" id="resume">${T('reprendre')}</button></div>`;
  }
  if(!Audio_.hasThaiVoice()){
    html += `<div class="banner grey"><div><b>${T('pas_de_voix')}</b>
      <small>${T('pas_de_voix_detail')}</small></div></div>`;
  }
  html += `<div class="quests"><h3>${T('quetes_du_jour')}</h3>` +
    Store.questsToday().map(q=>{
      const pct = Math.round(100*q.cur/q.goal);
      return `<div class="quest"><span class="qi">${q.icon}</span>
        <div style="flex:1"><b>${esc(q.label)}</b><div class="qbar"><i style="width:${pct}%"></i></div></div>
        <span class="qr">${q.cur>=q.goal?'✅':'+'+q.reward+' XP'}</span></div>`;
    }).join('') + `</div>`;
  html += parcoursHTML(UNITES_LANGUE, true) + mascotSVG() + '</div>';
  app.innerHTML = html;
  brancherParcours();
  const rs = document.getElementById('resume'); if(rs) rs.onclick = ()=>resumeLesson();
}

function renderEcriture(){
  app.innerHTML = topbar() + `<div class="screen">
    <h2 class="h-page">✍️ ${T('titre_ecriture')}</h2>
    <p class="sub">${T('sous_titre_ecriture')}</p>
    ${parcoursHTML(UNITES_ECRITURE, false)}</div>`;
  brancherParcours();
}

function shade(hex){
  const n = parseInt(hex.slice(1),16);
  return `rgb(${Math.max(0,(n>>16)-30)},${Math.max(0,((n>>8)&255)-30)},${Math.max(0,(n&255)-30)})`;
}
function mascotSVG(mood='content'){
  const bouche = mood==='content' ? 'M52 88 q13 9 26 0'
               : mood==='triste'  ? 'M52 94 q13 -9 26 0'
               : 'M52 90 h26';
  return `<svg class="mascot mascot-${mood}" viewBox="0 0 130 120" role="img" aria-label="Nong Chang, l’éléphanteau">
    <ellipse cx="65" cy="72" rx="44" ry="38" fill="#9BD1F5"/>
    <ellipse cx="22" cy="62" rx="17" ry="23" fill="#7FC1EC"/><ellipse cx="108" cy="62" rx="17" ry="23" fill="#7FC1EC"/>
    <path d="M65 100 q-9 18 3 18 q12 0 9-18z" fill="#9BD1F5"/>
    <circle cx="50" cy="64" r="8" fill="#fff"/><circle cx="80" cy="64" r="8" fill="#fff"/>
    <circle cx="52" cy="65" r="4" fill="#333"/><circle cx="82" cy="65" r="4" fill="#333"/>
    <path d="M44 28 q21-20 42 0" stroke="#FFC800" stroke-width="7" fill="none" stroke-linecap="round"/>
    <path d="${bouche}" stroke="#5AA6D6" stroke-width="4" fill="none" stroke-linecap="round"/>
  </svg>`;
}
function copierCode(code){
  const zone = document.getElementById('code');
  if(zone){ zone.focus(); zone.setSelectionRange(0, code.length); }
  if(navigator.clipboard && navigator.clipboard.writeText){
    navigator.clipboard.writeText(code)
      .then(()=>toast(T('code_copie')))
      .catch(()=>toast(T('code_selection')));
  } else toast(T('code_selection'));
}

/* Les fenêtres natives (confirm / prompt / alert) sont bloquées dans une page
   hébergée en cadre : la croix de sortie ne répondait plus. Tout passe par nos
   propres modales. */
function dialogue({titre, texte='', ok, annuler, danger=false}){
  ok = ok || T('confirmer'); annuler = annuler || T('annuler');
  return new Promise(res=>{
    const ov = h(`<div class="overlay"><div class="modal">
      <h3>${esc(titre)}</h3>${texte?`<p>${esc(texte)}</p>`:''}
      <button class="btn ${danger?'red':''}" id="d-ok">${esc(ok)}</button>
      <button class="btn ghost" id="d-non">${esc(annuler)}</button></div></div>`);
    document.body.appendChild(ov);
    ov.querySelector('#d-ok').onclick  = ()=>{ ov.remove(); res(true); };
    ov.querySelector('#d-non').onclick = ()=>{ ov.remove(); res(false); };
  });
}
function info(titre, texte=''){
  return new Promise(res=>{
    const ov = h(`<div class="overlay"><div class="modal">
      <h3>${esc(titre)}</h3>${texte?`<p>${esc(texte)}</p>`:''}
      <button class="btn" id="d-ok">${T('compris')}</button></div></div>`);
    document.body.appendChild(ov);
    ov.querySelector('#d-ok').onclick = ()=>{ ov.remove(); res(); };
  });
}
function saisie({titre, texte='', valeur='', ok}){
  ok = ok || T('valider');
  return new Promise(res=>{
    const ov = h(`<div class="overlay"><div class="modal">
      <h3>${esc(titre)}</h3>${texte?`<p>${esc(texte)}</p>`:''}
      <textarea class="save-code" id="d-val" rows="4" autocapitalize="off" spellcheck="false">${esc(valeur)}</textarea>
      <button class="btn" id="d-ok">${esc(ok)}</button>
      <button class="btn ghost" id="d-non">${T('annuler')}</button></div></div>`);
    document.body.appendChild(ov);
    ov.querySelector('#d-ok').onclick  = ()=>{ const v = ov.querySelector('#d-val').value; ov.remove(); res(v); };
    ov.querySelector('#d-non').onclick = ()=>{ ov.remove(); res(null); };
    setTimeout(()=>{ const t = ov.querySelector('#d-val'); if(t) t.focus(); }, 60);
  });
}

/* tout mot thaï affiché est accompagné de sa romanisation */
function thaiAvecRom(th, taille){
  const r = romDe(th);
  return `<span class="thai" style="${taille?`font-size:${taille}`:''}">${esc(th)}</span>` +
         (r ? `<span class="rom">${esc(r)}</span>` : '');
}

function toast(msg){
  const t = h(`<div class="toast">${esc(msg)}</div>`);
  document.body.appendChild(t); setTimeout(()=>t.remove(), 2200);
}

/* ---------------- ligue ---------------- */
/* ---------------- profil ---------------- */
function renderProfile(){
  const s = Store.get();
  const known = Store.Words.known(), due = Store.Words.dueCount();
  const totalLessons = CURRICULUM.reduce((a,u)=>a+u.lessons.length,0);
  app.innerHTML = topbar() + `<div class="screen">
    <h2 class="h-page">${T('titre_profil')}</h2>
    <div class="card"><div class="ic">🎓</div><div style="flex:1"><h4>${T('langue_cours')}</h4>
      <small>${esc(txt((COURS[Store.coursActif()]||{}).nom))}</small></div>
      <button class="btn ghost" id="cours">${T('changer')}</button></div>
    <div class="card"><div class="ic">⚡</div><div><h4>${T('xp_total',{n:Store.xp()})}</h4><small>${T('xp_aujourdhui',{a:s.dailyXp,b:s.dailyGoal})}</small></div></div>
    <div class="card"><div class="ic">🔥</div><div><h4>${T('serie_jours',{n:s.streak})}</h4><small>${T('serie_detail')}</small></div></div>
    <div class="card"><div class="ic">👑</div><div><h4>${T('couronnes_n',{n:Store.totalCrowns()})}</h4><small>${T('couronnes_detail',{max:totalLessons*5, lecons:totalLessons})}</small></div></div>
    <div class="card"><div class="ic">🧠</div><div><h4>${T('mots_rencontres',{n:known})}</h4><small>${T('mots_a_revoir',{n:due})}</small></div></div>
    <div class="card"><div class="ic">🔊</div><div><h4>${T('voix_thaie',{etat:Audio_.hasThaiVoice()?T('voix_dispo'):T('voix_absente')})}</h4>
      <small>${Audio_.hasThaiVoice()?T('voix_detail_ok'):T('voix_detail_ko')}</small></div></div>
    <div class="card"><div class="ic">🐢</div><div style="flex:1"><h4>${T('audio_lent')}</h4><small>${T('audio_lent_detail')}</small></div>
      <button class="btn ${s.slowAudio?'':'ghost'}" id="slow">${s.slowAudio?T('active'):T('desactive')}</button></div>
    <div class="card"><div class="ic">🔔</div><div style="flex:1"><h4>${T('effets_sonores')}</h4><small>${T('effets_detail')}</small></div>
      <button class="btn ${s.soundOn?'':'ghost'}" id="snd">${s.soundOn?T('active'):T('desactive')}</button></div>
    <div class="card"><div class="ic">🎨</div><div style="flex:1"><h4>${T('theme')}</h4><small>${T('theme_detail')}</small></div>
      <button class="btn ghost" id="theme">${s.theme==='auto'?T('theme_auto'):s.theme==='sombre'?T('theme_sombre'):T('theme_clair')}</button></div>
    <div class="card"><div class="ic">🎯</div><div style="flex:1"><h4>${T('objectif_du_jour')}</h4><small>${T('objectif_detail',{n:s.dailyGoal})}</small></div>
      <button class="btn ghost" id="objectif">${T('modifier')}</button></div>
    <div class="card"><div class="ic">🔓</div><div style="flex:1"><h4>${T('tout_ouvert')}</h4>
      <small>${s.toutDebloque?T('tout_ouvert_oui'):T('tout_ouvert_non')}</small></div>
      <button class="btn ${s.toutDebloque?'':'ghost'}" id="debloc">${s.toutDebloque?T('active'):T('desactive')}</button></div>

    <div class="card"><div class="ic">☁️</div><div style="flex:1"><h4>${T('nuage_titre')}</h4>
      <small id="etat-nuage">${Nuage.email() ? T('nuage_liee',{email:Nuage.email()}) : T('nuage_anonyme')}</small></div>
      ${Nuage.email() ? `<button class="btn ghost" id="detacher">${T('nuage_detacher')}</button>`
                      : `<button class="btn blue" id="securiser">${T('nuage_securiser')}</button>`}</div>
    ${Nuage.email() ? '' : `<button class="btn ghost" id="coller-lien" style="width:100%;margin-bottom:14px">${T('nuage_coller')}</button>`}
    <p class="sub">${Nuage.email() ? T('nuage_liee_detail') : T('nuage_anonyme_detail')}</p>

    <div class="card"><div class="ic">💾</div><div style="flex:1"><h4>${T('sauvegarde')}</h4>
      <small>${s.derniereSauvegarde ? T('sauvegarde_le',{date:s.derniereSauvegarde}) : T('sauvegarde_jamais')}</small></div></div>
    <div style="display:flex;gap:10px;margin-bottom:14px;flex-wrap:wrap">
      <button class="btn" id="exp" style="flex:1">${T('sauvegarder')}</button>
      <button class="btn ghost" id="imp" style="flex:1">${T('restaurer')}</button>
    </div>
    <button class="btn blue hidden" id="cloud" style="width:100%;margin-bottom:14px">${T('sauver_en_ligne')}</button>
    <div id="zone-code" class="hidden">
      <textarea id="code" class="save-code" readonly rows="3"></textarea>
      <div style="display:flex;gap:10px;margin-bottom:14px;flex-wrap:wrap">
        <button class="btn ghost" id="partage" style="flex:1">${T('envoyer_note')}</button>
        <button class="btn ghost" id="copier" style="flex:1">${T('copier')}</button>
      </div>
      ${TELECHARGEMENT_POSSIBLE ? `<div style="display:flex;gap:10px;margin-bottom:14px;flex-wrap:wrap">
        <button class="btn ghost" id="fichier" style="flex:1">${T('enregistrer_fichier')}</button>
        <label class="btn ghost" style="flex:1;cursor:pointer">${T('ouvrir_fichier')}
          <input type="file" id="depuis-fichier" accept=".json,application/json" hidden></label>
      </div>` : ''}
      <p class="sub">${T('sauvegarde_explication')}</p>
    </div>

    <h3 style="margin:22px 0 10px">${T('sept_jours')}</h3>
    ${chart7()}
    <h3 style="margin:22px 0 10px">${T('memorisation')}</h3>
    ${boxesView()}
    <h3 style="margin:22px 0 10px">${T('mots_fragiles')}</h3>
    ${weakList()}
    <button class="btn red" id="reset" style="width:100%;margin-top:18px">${T('reinitialiser')}</button>
  </div>`;
  document.getElementById('cours').onclick = async ()=>{
    const ids = Object.keys(COURS);
    const ov = h(`<div class="overlay"><div class="modal">
      <h3>${T('choisir_cours')}</h3>
      ${ids.map(id=>`<button class="btn ${id===Store.coursActif()?'':'ghost'}" data-c="${id}"
          style="width:100%;margin-bottom:10px">${COURS[id].drapeau} ${esc(txt(COURS[id].nom))}</button>`).join('')}
      <button class="btn ghost" id="d-non" style="width:100%">${T('annuler')}</button></div></div>`);
    document.body.appendChild(ov);
    ov.querySelector('#d-non').onclick = ()=>ov.remove();
    ov.querySelectorAll('[data-c]').forEach(b=> b.onclick = async ()=>{
      const id = b.dataset.c;
      ov.remove();
      if(id === Store.coursActif()) return;
      Store.changerCours(id);
      await chargerCours(id);
      render();
    });
  };
  document.getElementById('debloc').onclick = ()=>{
    s.toutDebloque = !s.toutDebloque; Store.save(); renderProfile();
  };
  document.getElementById('objectif').onclick = async ()=>{
    const v = await saisie({ titre:T('objectif_du_jour'), texte:T('objectif_question'),
      valeur:String(s.dailyGoal), ok:T('valider') });
    const n = parseInt(v, 10);
    if(n > 0){ s.dailyGoal = Math.min(200, n); Store.save(); renderProfile(); }
  };
  document.getElementById('theme').onclick = ()=>{
    const order=['auto','clair','sombre']; s.theme = order[(order.indexOf(s.theme)+1)%3];
    Store.save(); applyTheme(); renderProfile();
  };
  document.getElementById('slow').onclick = ()=>{ s.slowAudio=!s.slowAudio; Store.save(); renderProfile(); };
  document.getElementById('snd').onclick  = ()=>{ s.soundOn=!s.soundOn; Store.save(); renderProfile(); };
  const bSecu = document.getElementById('securiser');
  if(bSecu) bSecu.onclick = async ()=>{
    const email = await saisie({ titre:T('nuage_email_titre'), texte:T('nuage_email_detail'),
                                 valeur:'', ok:T('valider') });
    if(!email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email.trim())) return;
    bSecu.disabled = true;
    try{
      await Nuage.envoyerLien(email.trim());
      info(T('nuage_email_titre'), T('nuage_email_envoye',{email:email.trim()}));
    }catch(e){
      info(T('nuage_titre'), T('nuage_email_erreur',{raison:String(e.message||e)}));
    }
    bSecu.disabled = false;
  };
  const bColler = document.getElementById('coller-lien');
  if(bColler) bColler.onclick = async ()=>{
    const lien = await saisie({ titre:T('nuage_coller_titre'), texte:T('nuage_coller_detail'), ok:T('valider') });
    if(!lien) return;
    const code = Nuage.codeDansLien(lien);
    if(!code){ info(T('nuage_titre'), T('nuage_coller_invalide')); return; }
    let email = Nuage.emailEnAttente();
    if(!email){
      email = await saisie({ titre:T('nuage_email_titre'), texte:T('nuage_email_detail'), ok:T('valider') });
      if(!email) return;
    }
    try{
      const s = await Nuage.terminerConnexion(email.trim(), code);
      toast(T('nuage_connexion_ok',{email:s.email}));
      await synchroniserDepuisLeCloud();
      renderProfile();
    }catch(e){ info(T('nuage_titre'), T('nuage_connexion_erreur')); }
  };
  const bDet = document.getElementById('detacher');
  if(bDet) bDet.onclick = async ()=>{
    if(await dialogue({ titre:T('nuage_detacher_titre'), texte:T('nuage_detacher_detail'),
                        ok:T('nuage_detacher'), annuler:T('annuler'), danger:true })){
      Nuage.oublier(); renderProfile();
    }
  };

  Cloud.disponible().then(oui=>{
    const b = document.getElementById('cloud');
    if(!oui || !b) return;
    b.classList.remove('hidden');
    b.onclick = async ()=>{
      b.disabled = true; b.textContent = T('sauvegarde_en_cours');
      const issue = await Cloud.ecrire();
      b.disabled = false; b.textContent = T('sauver_en_ligne');
      toast({ 'ok':T('en_ligne_ok'), 'ok-page':T('en_ligne_ok_page'), 'conflit':T('en_ligne_conflit'),
              'trop-souvent':T('en_ligne_souvent'), 'lecture-seule':T('en_ligne_lecture'),
              'indisponible':T('en_ligne_indispo'), 'erreur':T('en_ligne_erreur') }[issue] || T('en_ligne_erreur'));
    };
  });

  document.getElementById('exp').onclick = ()=>{
    const code = Store.codeSauvegarde();
    document.getElementById('zone-code').classList.remove('hidden');
    const zone = document.getElementById('code');
    zone.value = code;
    copierCode(code);
    document.getElementById('copier').onclick = ()=>copierCode(code);
    document.getElementById('partage').onclick = ()=>{
      const lien = location.origin + location.pathname + '#sauvegarde=' + code;
      const donnees = { title:'Sauvegarde ThaiLingo',
        text:'Sauvegarde ThaiLingo du ' + Store.get().derniereSauvegarde + '\n\n' + code,
        url:lien };
      if(navigator.share) navigator.share(donnees).catch(()=>{});
      else copierCode(code);
    };
    if(TELECHARGEMENT_POSSIBLE){
    document.getElementById('fichier').onclick = ()=>{
      const nom = `thailingo-${Store.get().profil||'moi'}-${Store.get().derniereSauvegarde}.json`;
      const blob = new Blob([JSON.stringify(Store.get(), null, 2)], {type:'application/json'});
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob); a.download = nom;
      document.body.appendChild(a); a.click();
      setTimeout(()=>{ URL.revokeObjectURL(a.href); a.remove(); }, 1000);
      toast(T('choisis_fichiers'));
    };
    document.getElementById('depuis-fichier').onchange = ev=>{
      const f = ev.target.files && ev.target.files[0];
      if(!f) return;
      const lecteur = new FileReader();
      lecteur.onload = ()=>{
        try{
          if(!Store.adopter(JSON.parse(lecteur.result))) throw new Error('format');
          toast(T('progression_restauree')); setTimeout(()=>location.reload(), 900);
        }catch(e){ info(T('fichier_illisible'), T('fichier_illisible_detail')); }
      };
      lecteur.readAsText(f);
    };
    }
    zone.scrollIntoView({behavior:'smooth', block:'center'});
  };
  document.getElementById('imp').onclick = async ()=>{
    const code = await saisie({ titre:T('restaurer_titre'), texte:T('restaurer_detail'), ok:T('restaurer') });
    if(!code) return;
    try{ Store.restaurer(code); toast(T('progression_restauree')); setTimeout(()=>location.reload(), 900); }
    catch(e){ info(T('code_illisible'), T('code_illisible_detail')); }
  };
  document.getElementById('reset').onclick = async ()=>{
    if(await dialogue({ titre:T('tout_effacer'), texte:T('tout_effacer_detail'),
      ok:T('effacer'), annuler:T('annuler'), danger:true })){
      Store.reset();
      Nuage.effacer().catch(()=>{});     // sinon la progression reviendrait du serveur
      go('path');
    }
  };
}
function chart7(){
  const d = Store.last7(), max = Math.max(10, ...d.map(x=>x.xp));
  const J = ['dim','lun','mar','mer','jeu','ven','sam'];
  return `<div class="chart">` + d.map(x=>{
    const day = J[new Date(x.d+'T12:00:00').getDay()];
    return `<div class="bar"><span class="v">${x.xp||''}</span>
      <i style="height:${Math.round(90*x.xp/max)||2}px"></i><b>${day}</b></div>`;
  }).join('') + `</div>`;
}
function boxesView(){
  const b = Store.boxes(), tot = b.reduce((a,c)=>a+c,0);
  if(!tot) return `<p class="sub">${T('aucun_mot_memorise')}</p>`;
  const noms = [T('boite_nouveau'),T('boite_1j'),T('boite_2j'),T('boite_4j'),T('boite_1s'),T('boite_2s')];
  return `<div class="boxes">` + b.map((n,i)=>`<div class="box"><b>${n}</b><small>${noms[i]}</small></div>`).join('') + `</div>`;
}
function weakList(){
  const ids = Store.Words.weakest(5);
  if(!ids.length) return `<p class="sub">${T('aucun_mot_difficile')}</p>`;
  return ids.map(id=>{ const w=LEX[id], st=Store.Words.tous()[id] || {wrong:0,seen:0};
    return `<div class="card"><div class="ic thai">${w.th}</div><div style="flex:1"><h4>${esc(glose(w))}</h4>
      <small>${T('erreurs_vues',{rom:w.rom, erreurs:st.wrong, vues:st.seen})}</small></div></div>`; }).join('');
}

/* ---------------- révision ---------------- */
function renderRevision(){
  const dus = Store.Words.dueCount(), connus = Store.Words.known();
  const faites = CURRICULUM.reduce((a,u)=>a+u.lessons.filter(l=>Store.crowns(l.id)>0).length, 0);
  app.innerHTML = topbar() + `<div class="screen">
    <h2 class="h-page">🔁 ${T('titre_revision')}</h2>
    <p class="sub">${T('revision_portee',{mots:connus, lecons:faites})}</p>
    ${connus ? `
      <div class="banner green"><div><b>${T('seance_revision')}</b>
        <small>${dus ? T('mots_echeance',{n:dus}) : T('rien_urgent')}</small></div>
        <button class="btn" id="practice">${T('reviser')}</button></div>
      <div class="banner blue"><div><b>${T('defi_60')}</b>
        <small>${T('defi_60_detail')}</small></div>
        <button class="btn blue" id="timed">${T('lancer')}</button></div>
      <h3 style="margin:22px 0 10px">${T('memorisation')}</h3>
      ${boxesView()}
      <h3 style="margin:22px 0 10px">${T('mots_fragiles')}</h3>
      ${weakList()}`
    : `<div class="banner grey"><div><b>${T('rien_a_reviser')}</b>
        <small>${T('rien_a_reviser_detail')}</small></div></div>`}
  </div>`;
  const pr = document.getElementById('practice'); if(pr) pr.onclick = ()=>startPractice();
  const td = document.getElementById('timed');    if(td) td.onclick = ()=>startTimed();
}

/* ---------------- leçon ---------------- */
function trouverLecon(id){
  for(const u of CURRICULUM){ const l = u.lessons.find(x=>x.id===id); if(l) return {unit:u, lesson:l}; }
  return null;
}
function startLeconId(id){ const t = trouverLecon(id); if(t) startLesson(t.unit, t.lesson); }

function startLesson(unit, lesson){
  if(typeof unit === 'number'){ const u = CURRICULUM[unit]; lesson = u.lessons[lesson]; unit = u; }
  Store.resetHearts();                    // trois vies neuves à chaque tentative
  const level = Store.crowns(lesson.id);          // 0..5 : la leçon durcit à chaque couronne
  const legendaire = level === 4;                 // dernière couronne : 3 vies, aucun indice
  let ex = buildExercises(lesson, unit, legendaire ? 5 : level);
  if(!Audio_.hasThaiVoice()) ex = ex.filter(e=>e.type!=='listen' && e.type!=='listen_build');
  if(!Audio_.canListen())    ex = ex.filter(e=>e.type!=='speak');
  L = { unit, lesson, level, legendaire,
        title:lesson.title, ex, idx:0, correct:0, answered:0,
        combo:0, bestCombo:0, t0:Date.now(), state:'ask', sel:null, built:[], requeue:[], practice:false };
  if(legendaire) toast(T('legendaire'));
  Store.setResume(lesson.id);
  go('lesson');
}
function resumeLesson(){ const r = Store.get().resume; if(r) startLeconId(r); }
function startTimed(){
  Store.resetHearts();
  let ex = buildPractice().concat(buildPractice());
  if(!Audio_.hasThaiVoice()) ex = ex.filter(e=>e.type!=='listen' && e.type!=='listen_build');
  ex = ex.filter(e=>e.type!=='speak' && e.type!=='pairs');
  L = { unit:null, lesson:null, title:'Défi 60 s', ex, idx:0, correct:0, answered:0,
        combo:0, bestCombo:0, t0:Date.now(), state:'ask', sel:null, built:[], requeue:[],
        practice:true, timed:true, deadline:Date.now()+60000 };
  clearInterval(window.__timer);
  window.__timer = setInterval(()=>{
    if(!L || !L.timed){ clearInterval(window.__timer); return; }
    const left = Math.max(0, Math.round((L.deadline-Date.now())/1000));
    const el = document.getElementById('clock'); if(el) el.textContent = left+' s';
    if(left<=0){ clearInterval(window.__timer); finish(); }
  }, 250);
  go('lesson');
}

function startPractice(){
  Store.resetHearts();
  let ex = buildPractice();
  if(!Audio_.hasThaiVoice()) ex = ex.filter(e=>e.type!=='listen' && e.type!=='listen_build');
  L = { unit:null, lesson:null, title:'Révision', ex, idx:0, correct:0, answered:0,
        combo:0, bestCombo:0, t0:Date.now(), state:'ask', sel:null, built:[], requeue:[], practice:true };
  go('lesson');
}

function renderLesson(){
  if(!L || !L.ex.length){ go('path'); return; }
  if(L.idx >= L.ex.length){ finish(); return; }   // garde-fou : jamais d'écran vide
  const e = L.ex[L.idx];
  const pct = (L.answered / (L.answered + (L.ex.length - L.idx))) * 100;
  const s = Store.get();
  app.innerHTML = `
    <div class="lesson-top">
      <button class="close" id="quit" aria-label="Quitter">✕</button>
      <div class="progress"><i style="width:${Math.max(2,pct)}%"></i></div>
      ${L.combo>=3?`<div class="combo">🔥 ${L.combo}</div>`:''}
      ${L.timed ? `<div class="clock" id="clock">60 s</div>`
                : `<div class="stat heart"><span class="ic">${L.legendaire?'🏅':'❤️'}</span>${s.hearts}</div>`}
    </div>
    <div class="lesson" id="body"></div>
    <div class="footer" id="footer"><div class="inner">
      <div class="spacer"></div><button class="btn" id="check" disabled>${T('verifier')}</button>
    </div></div>`;
  document.getElementById('quit').onclick = quitLesson;
  document.getElementById('check').onclick = check;
  L.sel=null; L.built=[]; L.state='ask'; L.pairMiss=false;
  const body = document.getElementById('body');
  ({ pick:exChoiceUI, meaning:exChoiceUI, listen:exChoiceUI, script:exChoiceUI, blank:exBlankUI,
     trans:exTransUI, listen_build:exBuildUI, pairs:exPairsUI, spell:exSpellUI, speak:exSpeakUI,
     tone:exChoiceUI })[e.type](body, e);
  body.classList.add('fade-in');
}
async function quitLesson(){
  if(await dialogue({ titre:T('quitter_lecon'), texte:T('quitter_detail'),
    ok:T('quitter'), annuler:T('continuer_lecon'), danger:true })) go('path');
}
function setCheck(on){ const c=document.getElementById('check'); if(c) c.disabled=!on; }

/* --- QCM --- */
function exChoiceUI(body, e){
  let head = '';
  if(e.type==='meaning'){
    head = `<div class="head-row"><button class="speaker" id="sp" aria-label="Écouter">🔊</button>
      <div><div class="thai big-thai">${e.word.th}</div><div class="rom">${e.word.rom}</div></div></div>`;
  } else if(e.type==='listen'){
    head = `<div class="head-row"><button class="speaker" id="sp" aria-label="Écouter">🔊</button>
      <button class="speaker small" id="spslow" aria-label="Écouter lentement">🐢</button></div>`;
  } else if(e.type==='tone' && e.syll){
    head = `<div class="head-row"><button class="speaker" id="sp" aria-label="Écouter">🔊</button>
      <div><div class="thai big-thai">${e.syll.th}</div><div class="rom">${e.syll.rom}</div></div></div>`;
  }
  body.innerHTML = `<div class="prompt">${esc(e.prompt)}</div>${head}<div class="choices" id="ch"></div>
    <div class="kbd-hint">${T('astuce_clavier',{n:e.options.length})}</div>`;
  const wrap = document.getElementById('ch');
  e.options.forEach((o,i)=>{
    const thaiCls = (e.thai || isThaiText(o.label)) ? 'thai' : '';
    const el = h(`<button class="choice">
      <span class="num">${i+1}</span>
      ${o.emoji?`<span class="emoji">${o.emoji}</span>`:''}
      <span class="${thaiCls}" style="font-size:${e.type==='script'?'26px':'18px'}">${esc(o.label)}</span>
      ${o.sub?`<span class="rom">${esc(o.sub)}</span>`:''}</button>`);
    el.onclick = ()=>{
      if(L.state!=='ask') return;
      wrap.querySelectorAll('.choice').forEach(c=>c.classList.remove('sel'));
      el.classList.add('sel'); L.sel=i; setCheck(true); Audio_.tap();
      if(e.type!=='listen' && isThaiText(o.label)) Audio_.speak(o.label);
    };
    wrap.appendChild(el);
  });
  const sp=document.getElementById('sp');
  if(sp){ sp.onclick=()=>Audio_.speak(e.speak); setTimeout(()=>Audio_.speak(e.speak), 300); }
  const ss=document.getElementById('spslow'); if(ss) ss.onclick=()=>Audio_.speak(e.speak, 0.45);
}

/* --- texte à trous --- */
function exBlankUI(body, e){
  body.innerHTML = `<div class="prompt">${esc(e.prompt)}</div>
    <div class="head-row"><button class="speaker small" id="sp" aria-label="Écouter">🔊</button>
      <div><div class="thai big-thai">${esc(e.before)}<span class="blank">?</span>${esc(e.after)}</div>
      <div class="rom">${esc(e.romPhrase || '')}</div>
      <div class="rom">${esc(e.fr)}</div></div></div>
    <div class="choices" id="ch"></div>`;
  const wrap = document.getElementById('ch');
  e.options.forEach((o,i)=>{
    const el = h(`<button class="choice"><span class="num">${i+1}</span>${thaiAvecRom(o.label,'22px')}</button>`);
    el.onclick=()=>{ if(L.state!=='ask') return;
      wrap.querySelectorAll('.choice').forEach(c=>c.classList.remove('sel'));
      el.classList.add('sel'); L.sel=i; setCheck(true); Audio_.speak(o.label); };
    wrap.appendChild(el);
  });
  document.getElementById('sp').onclick = ()=>Audio_.speak(e.speak);
}

/* --- traduction (banque de mots) --- */
function exTransUI(body, e){
  const t2f = e.dir==='t2f';
  body.innerHTML = `<div class="prompt">${esc(e.prompt)}</div>
    <div class="head-row">
      ${t2f?'<button class="speaker small" id="sp" aria-label="Écouter">🔊</button>':''}
      <div id="shown">${t2f ? hintable(e.chunks) : `<div class="fr-shown">${esc(e.shown)}</div>`}</div>
    </div>
    <div class="zone-reponse"><span class="etiquette">${T('ta_reponse')}</span>
      <div class="answer-area" id="ans"></div></div>
    <div class="bank" id="bank"></div>
    <div class="kbd-hint">${t2f?T('astuce_mot'):T('astuce_clavier',{n:9})}</div>`;
  wireBank(e, !t2f);
  const sp=document.getElementById('sp');
  if(sp){ sp.onclick=()=>Audio_.speak(e.speak); setTimeout(()=>Audio_.speak(e.speak),250); }
  wireHints();
}
/* --- dictée --- */
function exBuildUI(body, e){
  body.innerHTML = `<div class="prompt">${esc(e.prompt)}</div>
    <div class="head-row"><button class="speaker" id="sp" aria-label="Écouter">🔊</button>
      <button class="speaker small" id="spslow" aria-label="Écouter lentement">🐢</button></div>
    <div class="zone-reponse"><span class="etiquette">${T('ta_reponse')}</span>
      <div class="answer-area" id="ans"></div></div>
    <div class="bank" id="bank"></div>`;
  wireBank(e, true);
  document.getElementById('sp').onclick=()=>Audio_.speak(e.speak);
  document.getElementById('spslow').onclick=()=>Audio_.speak(e.speak,0.45);
  setTimeout(()=>Audio_.speak(e.speak), 300);
}
function wireBank(e, thaiBank){
  const ans=document.getElementById('ans'), bank=document.getElementById('bank');
  const contenu = w => thaiBank ? thaiAvecRom(w) : esc(w);
  e.bank.forEach(w=>{
    const t = h(`<button class="tile ${thaiBank?'empile':''}">${contenu(w)}</button>`);
    t.onclick = ()=>{
      if(L.state!=='ask' || t.classList.contains('used')) return;
      t.classList.add('used');
      const chip = h(`<button class="tile ${thaiBank?'empile':''}">${contenu(w)}</button>`);
      chip.onclick = ()=>{ if(L.state!=='ask') return;
        t.classList.remove('used'); chip.remove();
        L.built = L.built.filter(x=>x.tile!==t); setCheck(L.built.length>0); };
      L.built.push({w, tile:t}); ans.appendChild(chip);
      setCheck(true); Audio_.tap(); if(thaiBank) Audio_.speak(w);
    };
    bank.appendChild(t);
  });
}
function hintable(chunks){
  return `<div class="thai big-thai">` + chunks.map(c=>{
    const id = Object.keys(LEX).find(k=>LEX[k].th===c);
    const info = id ? `${LEX[id].rom} — ${glose(LEX[id])}` : '';
    return `<span class="hintable" data-info="${esc(info)}" data-th="${esc(c)}">${esc(c)}</span>`;
  }).join('') + `</div>`;
}
function wireHints(){
  document.querySelectorAll('.hintable').forEach(el=>{
    el.onclick = (ev)=>{
      ev.stopPropagation();
      document.querySelectorAll('.hint').forEach(x=>x.remove());
      Audio_.speak(el.dataset.th);
      if(!el.dataset.info) return;
      const b = h(`<div class="hint">${esc(el.dataset.info)}</div>`);
      el.appendChild(b);
      setTimeout(()=>b.remove(), 2600);
    };
  });
}

/* --- épeler avec le clavier thaï --- */
function exSpellUI(body, e){
  body.innerHTML = `<div class="prompt">${esc(e.prompt)}</div>
    <div class="head-row"><button class="speaker" id="sp" aria-label="Écouter">🔊</button>
      <div><div class="fr-shown">${esc(e.hint)}</div></div></div>
    <div class="spell-line thai" id="line"><span class="caret"></span></div>
    <div class="keys" id="keys"></div>
    <button class="btn ghost" id="full" style="margin-top:16px">
      ${Store.get().clavierComplet ? T('clavier_propose') : T('clavier_complet')}</button>
    <div class="kbd-hint">${T('astuce_epeler')}</div>`;
  const line = document.getElementById('line'), keys = document.getElementById('keys');
  const draw = ()=>{ line.innerHTML = L.built.map(x=>`<span>${esc(x.w)}</span>`).join('') + '<span class="caret"></span>'; };
  document.getElementById('full').onclick = ()=>{
    const st = Store.get(); st.clavierComplet = !st.clavierComplet; Store.save();
    L.built = []; exSpellUI(body, e); setCheck(false);
  };
  const touches = Store.get().clavierComplet ? CLAVIER_THAI : e.keys;
  if(Store.get().clavierComplet) keys.classList.add('full');
  // les signes qui se posent au-dessus/en dessous d'une consonne sont montrés
  // sur un cercle pointillé (◌) pour rester lisibles isolément
  const combinant = c => /[\u0E31\u0E34-\u0E3A\u0E47-\u0E4E]/.test(c);
  touches.forEach(k=>{
    const b = h(`<button class="key thai">${esc(combinant(k) ? '◌'+k : k)}</button>`);
    b.onclick = ()=>{ if(L.state!=='ask') return; L.built.push({w:k}); draw(); setCheck(true); Audio_.tap(); };
    keys.appendChild(b);
  });
  const del = h(`<button class="key del">⌫</button>`);
  del.onclick = ()=>{ if(L.state!=='ask') return; L.built.pop(); draw(); setCheck(L.built.length>0); };
  keys.appendChild(del);
  document.getElementById('sp').onclick = ()=>Audio_.speak(e.speak);
  setTimeout(()=>Audio_.speak(e.speak), 300);
}

/* clavier thaï complet (disposition simplifiée, consonnes puis voyelles et tons) */
const CLAVIER_THAI = [
  'ก','ข','ค','ง','จ','ฉ','ช','ซ','ญ','ด','ต','ถ','ท','ธ','น',
  'บ','ป','ผ','ฝ','พ','ฟ','ภ','ม','ย','ร','ล','ว','ศ','ษ','ส',
  'ห','ฬ','อ','ฮ','ะ','า','ิ','ี','ึ','ื','ุ','ู','เ','แ','โ',
  'ใ','ไ','ำ','ั','็','่','้','๊','๋','์','ๆ'
];

/* --- prononcer (reconnaissance vocale) --- */
function exSpeakUI(body, e){
  body.innerHTML = `<div class="prompt">${esc(e.prompt)}</div>
    <div class="head-row"><button class="speaker" id="sp" aria-label="Écouter le modèle">🔊</button>
      <div><div class="thai big-thai">${esc(e.target)}</div><div class="rom">${esc(e.hint)}</div></div></div>
    <div class="mic-zone"><button class="mic" id="mic" aria-label="Parler">🎤</button>
      <div class="mic-status" id="st">${T('micro_invite')}</div></div>
    <button class="btn ghost" id="skip" style="margin-top:18px">${T('micro_passer')}</button>`;
  document.getElementById('sp').onclick = ()=>Audio_.speak(e.speak);
  const mic = document.getElementById('mic'), st = document.getElementById('st');
  L.heard = null;
  mic.onclick = ()=>{
    if(L.state!=='ask') return;
    mic.classList.add('rec'); st.textContent = T('micro_ecoute');
    const rec = Audio_.listen(alts=>{
      L.heard = alts;
      st.textContent = T('micro_entendu',{texte:alts[0]});
      setCheck(true);
    }, why=>{
      mic.classList.remove('rec');
      if(!L.heard) st.textContent = (why==='error') ? T('micro_indispo') : T('micro_rien');
    });
    if(!rec){ mic.classList.remove('rec'); st.textContent = T('micro_absent'); }
  };
  document.getElementById('skip').onclick = ()=>{ L.skipped = true; L.state='ask'; setCheck(true); check(); };
}

/* --- paires --- */
function exPairsUI(body, e){
  body.innerHTML = `<div class="prompt">${esc(e.prompt)}</div><div class="pairs" id="pw"></div>`;
  const pw=document.getElementById('pw');
  const colL=document.createElement('div'), colR=document.createElement('div');
  colL.style.cssText = colR.style.cssText = 'display:flex;flex-direction:column;gap:12px';
  pw.append(colL,colR);
  let sel=null, left=e.items.length;
  const mk=(item,side)=>{
    const el=h(`<button class="pair ${side==='l'?'empile':''}">${side==='l'?thaiAvecRom(item.th):esc(glose(item))}</button>`);
    el.onclick=()=>{
      if(el.classList.contains('gone')||L.state!=='ask') return;
      side==='l' ? Audio_.speak(item.th) : Audio_.tap();
      if(!sel){ sel={el,item,side}; el.classList.add('sel'); return; }
      if(sel.el===el){ el.classList.remove('sel'); sel=null; return; }
      if(sel.side===side){ sel.el.classList.remove('sel'); sel={el,item,side}; el.classList.add('sel'); return; }
      if(sel.item===item){
        sel.el.classList.add('gone'); el.classList.add('gone'); sel=null; Audio_.good();
        if(--left===0){ L.sel=1; setCheck(true); check(); }
      } else {
        const a=sel.el; a.classList.remove('sel'); a.classList.add('wrong'); el.classList.add('wrong');
        Audio_.bad(); L.pairMiss=true;
        setTimeout(()=>{a.classList.remove('wrong'); el.classList.remove('wrong');},350); sel=null;
      }
    };
    return el;
  };
  shuffle(e.items).forEach(i=>colL.appendChild(mk(i,'l')));
  shuffle(e.items).forEach(i=>colR.appendChild(mk(i,'r')));
  document.getElementById('check').classList.add('hidden');
}

/* ---------------- vérification ---------------- */
function check(){
  if(L.state!=='ask'){ next(); return; }
  const e = L.ex[L.idx];
  let ok=false, expected='', expectedRom='', donnee='';
  if(e.type==='pairs'){ ok = !L.pairMiss; }
  else if(e.type==='spell'){
    ok = L.built.map(x=>x.w).join('') === e.solution.join('');
    expected = e.solution.join('') + ' — ' + e.hint;
  }
  else if(e.type==='speak'){
    if(L.skipped){ L.skipped=false; L.state='shown'; L.answered++; skipSpeak(e); return; }
    const norm = t => (t||'').replace(/[\s.,!?ๆฯ]/g,'');
    ok = (L.heard||[]).some(t=>norm(t) === norm(e.target) || norm(t).includes(norm(e.target)));
    expected = e.target + ' — ' + e.hint;
  }
  else if(e.type==='trans' || e.type==='listen_build'){
    const mots = L.built.map(x=>x.w);
    ok = mots.join(' ') === e.solution.join(' ');
    if(!ok) donnee = e.dir === 't2f' ? mots.join(' ') : mots.join('');
    if(e.dir === 't2f'){ expected = e.solution.join(' '); }
    else {
      expected = e.solution.join('');
      expectedRom = e.solution.map(c=>romDe(c)).filter(Boolean).join(' ');
      if(e.type==='listen_build') expectedRom += ' — ' + e.fr;
    }
  } else {
    const o = e.options[L.sel]; ok = !!(o && o.correct);
    const c = e.options.find(x=>x.correct);
    expected = c ? c.label : '';
    expectedRom = c ? (c.sub || romDe(c.label) || '') : '';
  }
  L.state='shown'; L.answered++;
  if(e.wordId) Store.Words.seen(e.wordId, ok);
  if(e.type==='pairs' && e.items) e.items.forEach(it=>{ const id=Object.keys(LEX).find(k=>LEX[k].th===it.th); if(id) Store.Words.seen(id, ok); });

  if(ok){ L.correct++; L.combo++; L.bestCombo=Math.max(L.bestCombo,L.combo); Audio_.good(); }
  else {
    L.combo=0; Audio_.bad();
    if(!L.timed) Store.loseHeart();
    L.requeue.push(JSON.parse(JSON.stringify(e)));   // Duolingo : l'exercice raté revient
  }
  if((e.type==='trans' && e.dir==='f2t') || e.type==='listen_build') Audio_.speak(e.solution.join(''));

  if(['pick','meaning','listen','script','blank','tone'].includes(e.type)){
    const wrap=document.getElementById('ch');
    if(wrap) wrap.querySelectorAll('.choice').forEach((c,i)=>{
      if(e.options[i].correct) c.classList.add('ok'); else if(i===L.sel) c.classList.add('ko');
    });
  }
  const f=document.getElementById('footer');
  f.className='footer '+(ok?'ok':'ko');
  f.innerHTML=`<div class="inner">
    <div class="fb-mascot">${mascotSVG(ok?'content':'triste')}</div>
    <div style="flex:1">
      <div class="fb-title">${ok?(L.combo>=3?T('combo',{n:L.combo}):T('excellent')):T('bonne_reponse')}</div>
      ${ok?'':`<div class="fb-sub">
        <span class="${isThaiText(expected)?'thai':''}">${esc(expected)}</span>
        ${expectedRom?`<span class="rom">${esc(expectedRom)}</span>`:''}
        ${donnee?`<span class="rom donnee">${T('ta_reponse')} : <span class="${isThaiText(donnee)?'thai':''}">${esc(donnee)}</span></span>`:''}
      </div>`}
      ${e.explain?`<div class="fb-rule">📘 ${esc(e.explain)}</div>`:''}
    </div>
    <button class="btn ${ok?'':'red'}" id="cont">${T('continuer')}</button></div>`;
  document.getElementById('cont').onclick=next;
  if(!L.timed && Store.get().hearts<=0 && !ok) setTimeout(echecLecon, 700);
}

function skipSpeak(e){
  const f=document.getElementById('footer');
  f.className='footer';
  f.innerHTML=`<div class="inner"><div style="flex:1"><div class="fb-title">${T('exercice_passe')}</div>
    <div class="fb-sub">${T('exercice_passe_detail')}</div></div>
    <button class="btn" id="cont">${T('continuer')}</button></div>`;
  document.getElementById('cont').onclick = next;
  L.correct++;   // non pénalisé
}

function next(){
  L.idx++;
  if(L.timed && Date.now() >= L.deadline){ finish(); return; }
  if(!L.timed && Store.get().hearts<=0){ echecLecon(); return; }
  if(L.idx >= L.ex.length){
    if(L.requeue.length){                    // rejouer les exercices ratés
      L.ex = L.ex.concat(shuffle(L.requeue)); L.requeue = [];
      toast(T('on_revoit'));
    } else return finish();
  }
  renderLesson();
}

function finish(){
  clearInterval(window.__timer);
  const secs=Math.round((Date.now()-L.t0)/1000);
  const acc=Math.round(100*L.correct/Math.max(1,L.answered));
  const perfect = L.correct===L.answered;
  const xp = L.timed ? Math.max(5, L.correct*2)
                     : 10 + (perfect?5:0) + Math.min(5, Math.floor(L.bestCombo/3));
  Store.completeLesson(L.practice ? null : L.lesson.id, xp, perfect);
  Store.touchDay();
  if(Store.get().soundOn) Audio_.win();
  route='end'; document.getElementById('nav').classList.add('hidden');
  const goalDone = Store.get().dailyXp >= Store.get().dailyGoal;
  app.innerHTML=`<div class="screen end">
    <h1>${perfect?T('sans_faute'):(L.timed?T('defi_termine'):T('lecon_terminee'))}</h1>
    ${mascotSVG(acc>=60?'content':'neutre')}
    <div class="end-stats">
      <div class="end-stat"><div class="h">${T('xp_gagnes')}</div><div class="v">${xp}</div></div>
      <div class="end-stat blue"><div class="h">${T('temps')}</div><div class="v">${Math.floor(secs/60)}:${String(secs%60).padStart(2,'0')}</div></div>
      <div class="end-stat green"><div class="h">${T('precision')}</div><div class="v">${acc}%</div></div>
    </div>
    ${goalDone?`<p class="sub">${T('objectif_atteint')}</p>`:''}
    <button class="btn" id="cont" style="width:100%;max-width:340px">${T('continuer')}</button>
  </div>`;
  document.getElementById('cont').onclick=()=>go('path');
  if(perfect || acc>=80) confettis();
  if(Store.get().sauvegardeEnLigne === 'fichier') Cloud.ecrire();   // page hébergée : sans rechargement
  Nuage.ecrire(Store.get()).catch(()=>{});                          // silencieux : hors ligne, on réessaiera
}

/* petite pluie de confettis sur l'écran de fin */
function confettis(){
  const c = document.createElement('canvas');
  c.className='confettis'; c.width=innerWidth; c.height=innerHeight;
  document.body.appendChild(c);
  const g = c.getContext('2d');
  const cols = ['#58CC02','#1CB0F6','#FFC800','#FF4B4B','#CE82FF'];
  const P = Array.from({length:70}, ()=>({
    x:Math.random()*c.width, y:-20-Math.random()*c.height/2,
    r:4+Math.random()*5, vy:2+Math.random()*3, vx:-1+Math.random()*2,
    col:cols[Math.floor(Math.random()*cols.length)], a:Math.random()*6
  }));
  let t=0;
  (function frame(){
    g.clearRect(0,0,c.width,c.height);
    P.forEach(p=>{ p.y+=p.vy; p.x+=p.vx; p.a+=0.1;
      g.save(); g.translate(p.x,p.y); g.rotate(p.a);
      g.fillStyle=p.col; g.fillRect(-p.r,-p.r/2,p.r*2,p.r); g.restore(); });
    if(++t < 160) requestAnimationFrame(frame); else c.remove();
  })();
}

/* plus de vies : la leçon est perdue et se recommence en entier, vies neuves */
function echecLecon(){
  clearInterval(window.__timer);
  document.querySelectorAll('.overlay').forEach(o=>o.remove());
  const relance = L.practice ? null : L.lesson.id;
  route='end'; document.getElementById('nav').classList.add('hidden');
  app.innerHTML = `<div class="screen end">
    <h1 style="color:var(--red)">${T('lecon_echouee')}</h1>${mascotSVG('triste')}
    <p class="sub">${T('lecon_echouee_detail')}</p>
    <button class="btn" id="retry" style="width:100%;max-width:340px">${T('recommencer')}</button>
    <button class="btn ghost" id="back" style="width:100%;max-width:340px;margin-top:10px">${T('plus_tard')}</button>
  </div>`;
  document.getElementById('retry').onclick = ()=> relance ? startLeconId(relance) : startPractice();
  document.getElementById('back').onclick  = ()=>{ Store.resetHearts(); go('path'); };
}

/* ---------------- clavier ---------------- */
document.addEventListener('keydown', ev=>{
  if(route!=='lesson') return;
  if(ev.key==='Escape'){ quitLesson(); return; }
  if(ev.key==='Enter'){
    const c=document.getElementById('cont'); if(c){ c.click(); return; }
    const k=document.getElementById('check'); if(k && !k.disabled) k.click();
    return;
  }
  if(/^[1-9]$/.test(ev.key)){
    const list=document.querySelectorAll('#ch .choice, #bank .tile:not(.used)');
    const el=list[+ev.key-1]; if(el) el.click();
  }
});

/* ---------------- navigation ---------------- */
function applyTheme(){
  const t = Store.get().theme;
  let sombre;
  if(t === 'auto'){
    // en mode auto on suit l'hôte s'il impose un thème, sinon le réglage du système
    const hote = document.documentElement.getAttribute('data-theme');
    sombre = hote === 'dark' ? true
           : hote === 'light' ? false
           : matchMedia('(prefers-color-scheme: dark)').matches;
  } else sombre = (t === 'sombre');
  document.documentElement.dataset.appTheme = sombre ? 'sombre' : 'clair';
}
function go(r){ route=r; render(); }
function render(){
  ({path:renderPath, ecriture:renderEcriture, revision:renderRevision, profile:renderProfile, lesson:renderLesson})[route]?.();
  app.classList.remove('screen-in'); void app.offsetWidth; app.classList.add('screen-in');
  /* les libellés de la barre de navigation suivent la langue du cours */
  const libelles = { path:T('nav_apprendre'), ecriture:T('nav_ecriture'),
                     revision:T('nav_revision'), profile:T('nav_profil') };
  document.querySelectorAll('#nav button').forEach(b=>{
    const l = libelles[b.dataset.r];
    if(l){ b.title = l; b.setAttribute('aria-label', l); }
  });
  const nav=document.getElementById('nav');
  nav.classList.toggle('hidden', route==='lesson'||route==='end');
  document.querySelectorAll('#nav button').forEach(b=>b.classList.toggle('on', b.dataset.r===route));
  window.scrollTo(0,0);
}
document.querySelectorAll('#nav button').forEach(b=> b.onclick=()=>go(b.dataset.r));
/* la liste des voix arrive de façon asynchrone : on rafraîchit l'écran quand elle change */
window.onThaiVoiceChange = ()=>{ if(route==='path'||route==='profile') render(); };
/* un lien « #sauvegarde=… » propose de rétablir la progression qu'il transporte */
function restaurerDepuisLien(hash, demander, prevenir){
  const m = /[#&]sauvegarde=([^&]+)/.exec(hash || '');
  if(!m) return 'aucun';
  if(!demander(T('lien_sauvegarde'))) return 'refusé';
  try{ Store.restaurer(decodeURIComponent(m[1])); return 'restauré'; }
  catch(e){ prevenir(T('lien_illisible')); return 'illisible'; }
}

/* surface exposée pour les tests d'interface (tests/ui.html) */
window.ThaiLingo = {
  Store, romDe, glose, txt, COURS, chargerCours,
  /* le contenu est rechargé à chaque changement de cours : des accesseurs, pas des copies */
  get LEX(){ return LEX; }, get SENT(){ return SENT; }, get SCRIPT(){ return SCRIPT; },
  get CURRICULUM(){ return CURRICULUM; }, get SECTIONS(){ return SECTIONS; },
  get UNITES_LANGUE(){ return UNITES_LANGUE; }, get UNITES_ECRITURE(){ return UNITES_ECRITURE; },
  get LANGUE(){ return LANGUE; },
  get L(){ return L; }, set L(v){ L = v; },
  get route(){ return route; },
  startLesson, startLeconId, startPractice, startTimed, finish, renderLesson, render, go, applyTheme, check, next,
  restaurerDepuisLien, Cloud, Nuage, synchroniserDepuisLeCloud, traiterLienDeConnexion
};

(async ()=>{
  if(!/[#&]sauvegarde=/.test(location.hash)) return;
  const hash = location.hash;
  history.replaceState(null, '', location.pathname + location.search);
  const issue = restaurerDepuisLien(hash,
    ()=>true,                                   // la confirmation est demandée juste après
    m=>info('Sauvegarde illisible', m));
  if(issue === 'restauré'){
    if(await dialogue({ titre:T('sauvegarde_retablie'), texte:T('sauvegarde_retablie_detail'),
                        ok:T('recharger'), annuler:T('rester') })) location.reload();
    else render();
  }
})();

/* Retour du lien reçu par courriel : on rattache l'identité de cet appareil
   au compte, puis on récupère la progression qui y est enregistrée. */
async function traiterLienDeConnexion(){
  const code = Nuage.lienDansUrl();
  if(!code) return false;
  let email = Nuage.emailEnAttente();
  if(!email){
    email = await saisie({ titre:T('nuage_email_titre'), texte:T('nuage_email_detail'), ok:T('valider') });
    if(!email) return false;
  }
  try{
    const s = await Nuage.terminerConnexion(email.trim(), code);
    history.replaceState(null, '', location.pathname);
    toast(T('nuage_connexion_ok',{email:s.email}));
    return true;
  }catch(e){
    history.replaceState(null, '', location.pathname);
    info(T('nuage_titre'), T('nuage_connexion_erreur'));
    return false;
  }
}

/* ---------------- amorçage ---------------- */
matchMedia('(prefers-color-scheme: dark)').addEventListener('change', applyTheme);
new MutationObserver(applyTheme).observe(document.documentElement, {attributes:true, attributeFilter:['data-theme']});

async function demarrer(){
  applyTheme();
  try{ await chargerCours(Store.coursActif()); }
  catch(e){ console.warn('contenu du cours indisponible', e); }
  Store.touchDay();
  render();
  await traiterLienDeConnexion();
  synchroniserDepuisLeCloud();
}
demarrer();
