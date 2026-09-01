/* ============================================================
   Sauvegarde — versionnée, et rangée par cours.
   Ce qui est global : réglages, série, objectif, historique.
   Ce qui est par cours : XP, couronnes, mots mémorisés, reprise.
   ============================================================ */
const KEY = 'thailingo.save';
const LEGACY_KEY = 'thailingo.v1';
const SCHEMA = 6;

const COURS_VIDE = () => ({ xp:0, progress:{}, words:{}, resume:null });

const DEFAULT = {
  schema:SCHEMA,
  profil:'Moi',
  hearts:3, maxHearts:3,
  streak:0, lastDay:null,
  dailyGoal:30, dailyXp:0, lessonsToday:0, perfectToday:0,
  history:{},
  soundOn:true, slowAudio:false, clavierComplet:false, toutDebloque:true,
  theme:'auto',
  derniereSauvegarde:null,
  derniereEnLigne:null,     // horodatage de la dernière écriture en ligne réussie
  sauvegardeEnLigne:null,
  coursActif:'fr-th',
  cours:{ 'fr-th': COURS_VIDE() }
};

let S = load();

function load(){
  try{
    const brut = localStorage.getItem(KEY) || localStorage.getItem(LEGACY_KEY);
    if(brut) return migrer(Object.assign(JSON.parse(JSON.stringify(DEFAULT)), JSON.parse(brut)));
  }catch(e){ console.warn('Sauvegarde illisible, remise à zéro', e); }
  return JSON.parse(JSON.stringify(DEFAULT));
}

function migrer(s){
  if(s.schema < 5){                       // vies : de cinq à trois, par leçon
    s.maxHearts = 3; s.hearts = 3;
    s.profil = s.profil || 'Moi';
    delete s.gems; delete s.freezes; delete s.league;
  }
  if(s.schema < 6){                       // la progression passe sous un cours
    s.cours = { 'fr-th': {
      xp: s.xp || 0,
      progress: s.progress || {},
      words: s.words || {},
      resume: s.resume || null
    }};
    s.coursActif = 'fr-th';
    delete s.progress; delete s.words; delete s.resume; delete s.xp;
  }
  if(s.toutDebloque === undefined) s.toutDebloque = true;
  if(!s.cours) s.cours = { 'fr-th': COURS_VIDE() };
  s.schema = SCHEMA;
  return s;
}

function save(){ try{ localStorage.setItem(KEY, JSON.stringify(S)); }catch(e){} }
function dayNum(d=new Date()){ return Math.floor(d.getTime()/86400000); }
function todayStr(){ return new Date().toISOString().slice(0,10); }

/* le bloc du cours actif, créé à la volée la première fois */
function C(){
  const id = S.coursActif || 'fr-th';
  if(!S.cours[id]) S.cours[id] = COURS_VIDE();
  return S.cours[id];
}

function touchDay(){
  const d = todayStr();
  if(S.lastDay === d) return;
  if(S.lastDay) S.history[S.lastDay] = S.dailyXp;
  const hier = new Date(Date.now()-86400000).toISOString().slice(0,10);
  S.streak = (S.lastDay === hier) ? S.streak + 1 : 1;
  S.lastDay = d; S.dailyXp = 0; S.lessonsToday = 0; S.perfectToday = 0;
  S.hearts = S.maxHearts;
  save();
}

/* ---- répétition espacée (boîtes de Leitner : 1,1,2,4,7,15 jours) ---- */
const BOX_DAYS = [1,1,2,4,7,15];
const Words = {
  seen(id, ok){
    const w = C().words[id] || (C().words[id] = {seen:0, wrong:0, right:0, box:0, due:dayNum()});
    w.seen++;
    if(ok){ w.right++; w.box = Math.min(5, w.box+1); }
    else  { w.wrong++; w.box = 0; }
    w.due = dayNum() + BOX_DAYS[w.box];
    save();
  },
  isDue(id){ const w = C().words[id]; return !w || w.due <= dayNum(); },
  weakest(n){
    return Object.entries(C().words)
      .filter(([id])=>LEX[id])
      .sort((a,b)=> (b[1].wrong - a[1].wrong) || (a[1].due - b[1].due))
      .filter(([,w])=>w.wrong>0 || w.due<=dayNum())
      .slice(0,n).map(([id])=>id);
  },
  dueCount(){ return Object.keys(C().words).filter(id=>LEX[id] && Words.isDue(id)).length; },
  known(){ return Object.keys(C().words).filter(id=>LEX[id]).length; },
  tous(){ return C().words; }
};

function questsToday(){
  return [
    { id:'xp',      icon:'⚡', label:T('quete_xp',{n:S.dailyGoal}), cur:Math.min(S.dailyXp,S.dailyGoal), goal:S.dailyGoal, reward:20 },
    { id:'lessons', icon:'📚', label:T('quete_lecons'),             cur:Math.min(S.lessonsToday,2), goal:2, reward:15 },
    { id:'perfect', icon:'💯', label:T('quete_parfait'),            cur:Math.min(S.perfectToday,1), goal:1, reward:25 }
  ];
}

const Store = {
  get(){ return S; }, save, touchDay, Words, questsToday,
  coursActif(){ return S.coursActif || 'fr-th'; },
  changerCours(id){ S.coursActif = id; if(!S.cours[id]) S.cours[id] = COURS_VIDE(); save(); },
  xp(){ return C().xp; },
  crowns(id){ return (C().progress[id]||{}).crowns || 0; },
  totalCrowns(){ return Object.values(C().progress).reduce((a,p)=>a+(p.crowns||0),0); },
  loseHeart(){ S.hearts = Math.max(0, S.hearts-1); save(); return S.hearts; },
  resetHearts(){ S.hearts = S.maxHearts; save(); },
  addXp(n){ C().xp += n; S.dailyXp += n; save(); },
  completeLesson(lessonId, xp, perfect){
    if(lessonId){
      const p = C().progress[lessonId] || {crowns:0};
      p.crowns = Math.min(5, p.crowns+1);
      C().progress[lessonId] = p;
    }
    S.lessonsToday++; if(perfect) S.perfectToday++;
    Store.addXp(xp); S.hearts = S.maxHearts; C().resume = null; save();
  },
  setResume(id){ C().resume = id; save(); },
  marquerEnLigne(){ S.derniereEnLigne = new Date().toISOString(); save(); },
  quandEnLigne(){ return S.derniereEnLigne; },
  clearResume(){ C().resume = null; save(); },
  resume(){ return C().resume; },
  /* --- sauvegarde exportable --- */
  codeSauvegarde(){
    const code = btoa(unescape(encodeURIComponent(JSON.stringify(S))));
    S.derniereSauvegarde = todayStr(); save();
    return code;
  },
  restaurer(code){
    const d = JSON.parse(decodeURIComponent(escape(atob(String(code).trim()))));
    return Store.adopter(d, true);
  },
  adopter(objet, ecrire){
    if(!objet || typeof objet !== 'object' || !(objet.cours || objet.progress)) return false;
    S = migrer(Object.assign(JSON.parse(JSON.stringify(DEFAULT)), objet));
    save(); return true;
  },
  joursDepuisSauvegarde(){
    if(!S.derniereSauvegarde) return Object.keys(C().progress).length ? 999 : 0;
    return Math.round((Date.now() - new Date(S.derniereSauvegarde+'T12:00:00').getTime())/86400000);
  },
  last7(){
    const out = [];
    for(let i=6;i>=0;i--){
      const d = new Date(Date.now()-i*86400000).toISOString().slice(0,10);
      out.push({ d, xp: (d===todayStr() ? S.dailyXp : (S.history[d]||0)) });
    }
    return out;
  },
  boxes(){
    const b = [0,0,0,0,0,0];
    Object.entries(C().words).forEach(([id,w])=>{ if(LEX[id]) b[w.box]++; });
    return b;
  },
  reset(){
    const garde = { profil:S.profil, theme:S.theme, soundOn:S.soundOn, coursActif:S.coursActif };
    S = Object.assign(JSON.parse(JSON.stringify(DEFAULT)), garde);
    S.cours = {}; C(); save();
  }
};
