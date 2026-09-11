/* ============================================================
   Agrégateur de contenu.
   Chaque fichier de cours (cours/*.js) appelle ajouterPalier().
   finaliserContenu() assemble le tout dans les tables que le
   moteur et l'interface consomment.
   ============================================================ */
let LEX = {}, SENT = {}, SCRIPT = [], TONE_RULES = [], TONES = [];
let REVISION = {};   /* phrases réservées à la révision : voir §4 du README */
let CURRICULUM = [], SECTIONS = [], UNITES_LANGUE = [], UNITES_ECRITURE = [];
let ROM_PAR_THAI = {}, ID_PAR_THAI = {};

const PALIERS = [];
/* Ordre des paliers dans le parcours : du plus simple au plus exigeant. */
const ORDRE_PALIERS = ['a1','a2','b1','b2','c1'];

function ajouterPalier(bloc){ PALIERS.push(bloc); }

/* glose d'une entrée dans la langue de l'interface ; le français sert de repli */
function glose(o){
  if(!o) return '';
  return o[LANGUE] !== undefined ? o[LANGUE] : (o.fr !== undefined ? o.fr : '');
}
/* texte d'un libellé de contenu ({fr:'…', en:'…'}) ou chaîne simple */
function txt(v){ return (v && typeof v === 'object') ? glose(v) : (v || ''); }

function finaliserContenu(){
  LEX = {}; SENT = {}; SCRIPT = []; TONE_RULES = []; CURRICULUM = []; SECTIONS = []; REVISION = {};

  const paliers = PALIERS.slice().sort(
    (a,b)=> ORDRE_PALIERS.indexOf(a.palier) - ORDRE_PALIERS.indexOf(b.palier));

  paliers.forEach(p=>{
    Object.assign(LEX, p.lexique || {});
    Object.assign(SENT, p.phrases || {});
    Object.assign(REVISION, p.revision || {});
    if(p.alphabet)   SCRIPT.push(...p.alphabet);
    if(p.tons)       TONE_RULES.push(...p.tons);
    if(p.tonsNoms)   TONES = p.tonsNoms;
    if(p.unites)     CURRICULUM.push(...p.unites);
    if(p.sections)   SECTIONS.push(...p.sections);
  });

  UNITES_LANGUE   = CURRICULUM.filter(u => !u.ecriture);
  UNITES_ECRITURE = CURRICULUM.filter(u =>  u.ecriture);

  ROM_PAR_THAI = {}; ID_PAR_THAI = {};
  Object.entries(LEX).forEach(([id,w])=>{ if(w.th) ID_PAR_THAI[w.th] = id; });
  paliers.forEach(p=>{ if(p.romanisations) Object.assign(ROM_PAR_THAI, p.romanisations); });
  Object.values(LEX).forEach(w=>{ if(w.th && !ROM_PAR_THAI[w.th]) ROM_PAR_THAI[w.th] = w.rom; });
  SCRIPT.forEach(l=>{ if(!ROM_PAR_THAI[l.th]) ROM_PAR_THAI[l.th] = txt(l.rom); });
  TONE_RULES.forEach(r=>{ if(!ROM_PAR_THAI[r.th]) ROM_PAR_THAI[r.th] = r.rom; });

  /* Les phrases de révision n'écrivent que leurs mots : la romanisation de
     l'ensemble se déduit mot à mot, donc elle ne peut jamais diverger de
     celle du lexique. Les mots requis s'en déduisent aussi. */
  Object.values(REVISION).forEach(p=>{
    p.mots = p.chunks.map(c=>ID_PAR_THAI[c]).filter(Boolean);
    if(!p.rom) p.rom = p.chunks.map(c=>romDe(c)).filter(Boolean).join(' ');
  });

  return { mots:Object.keys(LEX).length, phrases:Object.keys(SENT).length,
           revision:Object.keys(REVISION).length,
           unites:CURRICULUM.length, lecons:CURRICULUM.reduce((a,u)=>a+u.lessons.length,0) };
}

function romDe(th){ return (th && ROM_PAR_THAI[th]) || ''; }
/* identifiant du mot à partir de son écriture thaïe */
function idParThai(th){ return ID_PAR_THAI[th] || ''; }
