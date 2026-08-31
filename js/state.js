/* ============================================================
   Persistance V2 — sauvegarde versionnée + migration depuis V1
   Gère : économie (cœurs/XP/gemmes/série), progression, stats
   par mot (répétition espacée), quêtes du jour, ligue, reprise
   ============================================================ */
const KEY = 'thailingo.save';
const LEGACY_KEY = 'thailingo.v1';
const SCHEMA = 5;

const DEFAULT = {
  schema:SCHEMA, xp:0, hearts:3, maxHearts:3, streak:0, lastDay:null,
  profil:'Moi',       // nom du profil, propre à cet appareil
  dailyGoal:30, dailyXp:0, lessonsToday:0, perfectToday:0,
  progress:{},        // lessonId -> {crowns}
  words:{},           // wordId  -> {seen, wrong, right, due(jour), box(0..5)}
  resume:null,        // leçon interrompue
  soundOn:true, slowAudio:false,
  history:{},         // 'AAAA-MM-JJ' -> XP du jour
  theme:'auto',       // auto | clair | sombre
  clavierComplet:false,
  toutDebloque:true,  // toutes les leçons ouvertes (mode découverte)
  derniereSauvegarde:null,  // date ISO du dernier code de sauvegarde exporté
  sauvegardeEnLigne:null    // 'fichier' | 'page' une fois la sauvegarde en ligne éprouvée
};

let S = load();

function load(){
  try{
    const raw = localStorage.getItem(KEY);
    if(raw){
      const d = JSON.parse(raw);
      return migrate(Object.assign(JSON.parse(JSON.stringify(DEFAULT)), d));
    }
    const legacy = localStorage.getItem(LEGACY_KEY);
    if(legacy){
      const d = JSON.parse(legacy);
      const s = Object.assign(JSON.parse(JSON.stringify(DEFAULT)), d, {schema:SCHEMA});
      localStorage.setItem(KEY, JSON.stringify(s));
      return s;
    }
  }catch(e){ console.warn('Sauvegarde illisible, remise à zéro', e); }
  return JSON.parse(JSON.stringify(DEFAULT));
}
function migrate(s){
  if(s.schema < 2){ s.words = s.words||{}; s.resume = null; s.schema = 2; }
  if(s.schema < 3){ s.freezes = s.freezes||0; s.history = s.history||{}; s.theme = s.theme||'auto'; s.schema = 3; }
  if(s.schema < 4){ s.derniereSauvegarde = s.derniereSauvegarde||null; s.schema = 4; }
  if(s.toutDebloque === undefined) s.toutDebloque = true;
  if(s.schema < 5){                       // les vies passent de 5 à 3, par leçon
    s.maxHearts = 3; s.hearts = 3;
    s.profil = s.profil || 'Moi';
    delete s.gems; delete s.freezes;
    s.schema = 5;
  }
  return s;
}
function save(){ try{ localStorage.setItem(KEY, JSON.stringify(S)); }catch(e){} }
function dayNum(d=new Date()){ return Math.floor(d.getTime()/86400000); }
function todayStr(){ return new Date().toISOString().slice(0,10); }

function touchDay(){
  const d = todayStr();
  if(S.lastDay === d) return;
  if(S.lastDay) S.history[S.lastDay] = S.dailyXp;      // on archive la veille
  const y = new Date(Date.now()-86400000).toISOString().slice(0,10);
  if(S.lastDay === y){ S.streak += 1; }
  else { S.streak = 1; }
  S.lastDay = d; S.dailyXp = 0; S.lessonsToday = 0; S.perfectToday = 0;
  S.hearts = S.maxHearts;
  save();
}

/* ---- répétition espacée (boîtes de Leitner : 1,2,4,7,15 jours) ---- */
const BOX_DAYS = [1,1,2,4,7,15];
const Words = {
  seen(id, ok){
    const w = S.words[id] || (S.words[id] = {seen:0, wrong:0, right:0, box:0, due:dayNum()});
    w.seen++;
    if(ok){ w.right++; w.box = Math.min(5, w.box+1); }
    else  { w.wrong++; w.box = 0; }
    w.due = dayNum() + BOX_DAYS[w.box];
    save();
  },
  isDue(id){ const w = S.words[id]; return !w || w.due <= dayNum(); },
  weakest(n){
    return Object.entries(S.words)
      .filter(([id])=>LEX[id])
      .sort((a,b)=> (b[1].wrong - a[1].wrong) || (a[1].due - b[1].due))
      .filter(([,w])=>w.wrong>0 || w.due<=dayNum())
      .slice(0,n).map(([id])=>id);
  },
  dueCount(){ return Object.keys(S.words).filter(id=>LEX[id] && Words.isDue(id)).length; },
  known(){ return Object.keys(S.words).filter(id=>LEX[id]).length; }
};

/* ---- quêtes du jour (déterministes par date) ---- */
function questsToday(){
  return [
    { id:'xp',      icon:'⚡', label:`Gagner ${S.dailyGoal} XP`, cur:Math.min(S.dailyXp,S.dailyGoal), goal:S.dailyGoal, reward:20 },
    { id:'lessons', icon:'📚', label:'Terminer 2 leçons',        cur:Math.min(S.lessonsToday,2), goal:2, reward:15 },
    { id:'perfect', icon:'💯', label:'1 leçon sans faute',        cur:Math.min(S.perfectToday,1), goal:1, reward:25 }
  ];
}

const Store = {
  get(){ return S; }, save, touchDay, Words, questsToday,
  crowns(id){ return (S.progress[id]||{}).crowns || 0; },
  totalCrowns(){ return Object.values(S.progress).reduce((a,p)=>a+(p.crowns||0),0); },
  loseHeart(){ S.hearts = Math.max(0, S.hearts-1); save(); return S.hearts; },
  /* les vies sont une ressource par leçon : on repart toujours de trois */
  resetHearts(){ S.hearts = S.maxHearts; save(); },
  addXp(n){ S.xp+=n; S.dailyXp+=n; save(); },
  completeLesson(lessonId, xp, perfect){
    if(lessonId){
      const p = S.progress[lessonId] || {crowns:0};
      p.crowns = Math.min(5, p.crowns+1);
      S.progress[lessonId] = p;
    }
    S.lessonsToday++; if(perfect) S.perfectToday++;
    Store.addXp(xp); S.hearts = S.maxHearts; S.resume = null; save();
  },
  setResume(r){ S.resume = r; save(); },
  /* --- sauvegarde exportable --- */
  codeSauvegarde(){
    const code = btoa(unescape(encodeURIComponent(JSON.stringify(S))));
    S.derniereSauvegarde = todayStr(); save();
    return code;
  },
  /* remplace l'état courant par un objet de sauvegarde déjà décodé */
  adopter(objet){
    if(!objet || typeof objet !== 'object' || !('progress' in objet)) return false;
    S = migrate(Object.assign(JSON.parse(JSON.stringify(DEFAULT)), objet));
    save(); return true;
  },
  restaurer(code){
    const d = JSON.parse(decodeURIComponent(escape(atob(String(code).trim()))));
    if(!d || typeof d !== 'object' || !('progress' in d)) throw new Error('format inattendu');
    localStorage.setItem(KEY, JSON.stringify(d));
    return true;
  },
  joursDepuisSauvegarde(){
    if(!S.derniereSauvegarde) return Object.keys(S.progress).length ? 999 : 0;
    return Math.round((Date.now() - new Date(S.derniereSauvegarde+'T12:00:00').getTime())/86400000);
  },
  /* 7 derniers jours : [{jour, xp}] — le jour courant vient du compteur vivant */
  last7(){
    const out=[];
    for(let i=6;i>=0;i--){
      const d = new Date(Date.now()-i*86400000).toISOString().slice(0,10);
      out.push({ d, xp: (d===todayStr() ? S.dailyXp : (S.history[d]||0)) });
    }
    return out;
  },
  boxes(){
    const b=[0,0,0,0,0,0];
    Object.entries(S.words).forEach(([id,w])=>{ if(LEX[id]) b[w.box]++; });
    return b;
  },
  clearResume(){ S.resume = null; save(); },
  reset(){ S = JSON.parse(JSON.stringify(DEFAULT)); save(); }
};
