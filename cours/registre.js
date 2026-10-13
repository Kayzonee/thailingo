/* ============================================================
   Les cours proposés. Un cours = une langue d'interface, une
   langue enseignée, et les fichiers de contenu à charger.
   La progression est rangée séparément pour chacun.
   ============================================================ */
/* `voix`   : étiquette BCP-47 pour la synthèse et la reconnaissance vocales.
   `script` : expression régulière reconnaissant l'écriture enseignée, ou null
              quand elle est latine et donc indiscernable du français.
   `clavier`: lettres proposées par l'exercice « épeler » ; null le désactive.
   `separateur` : ce qui sépare deux mots à l'écrit. Le thaï et le chinois
              s'écrivent sans espace ; le vietnamien en met entre chaque mot. */
const COURS = {
  'fr-th': { id:'fr-th', interface:'fr', cible:'th', drapeau:'🇹🇭', voix:'th-TH', separateur:'',
             script:/[\u0E00-\u0E7F]/,
             clavier:'ก ข ค ง จ ช ด ต ท น บ ป ผ พ ม ย ร ล ว ส ห อ า ิ ี ุ ู เ แ โ ไ ่ ้ ั ำ'.split(' '),
             nom:{fr:'Thaï — depuis le français', en:'Thai — from French'},
             fichiers:['cours/thai-a1.js','cours/thai-a2.js','cours/thai-b1.js','cours/revision-thai.js'] },
  'en-th': { id:'en-th', interface:'en', cible:'th', drapeau:'🇹🇭', voix:'th-TH', separateur:'',
             script:/[\u0E00-\u0E7F]/,
             clavier:'ก ข ค ง จ ช ด ต ท น บ ป ผ พ ม ย ร ล ว ส ห อ า ิ ี ุ ู เ แ โ ไ ่ ้ ั ำ'.split(' '),
             nom:{fr:'Thaï — depuis l’anglais', en:'Thai — from English'},
             fichiers:['cours/thai-a1.js','cours/thai-a2.js','cours/thai-b1.js','cours/revision-thai.js'] },
  'fr-zh': { id:'fr-zh', interface:'fr', cible:'zh', drapeau:'🇨🇳', voix:'zh-CN', separateur:'',
             script:/[\u4E00-\u9FFF]/,
             clavier:null,          /* on n'épelle pas un caractère chinois au clavier */
             nom:{fr:'Chinois — depuis le français', en:'Chinese — from French'},
             fichiers:['cours/chinois-a1.js','cours/chinois-a2.js','cours/chinois-b1.js','cours/revision-chinois.js'] },
  'fr-vi': { id:'fr-vi', interface:'fr', cible:'vi', drapeau:'🇻🇳', voix:'vi-VN', separateur:' ',
             script:null,           /* écriture latine : indiscernable du français */
             clavier:'a ă â b c d đ e ê g h i k l m n o ô ơ p q r s t u ư v x y'.split(' '),
             nom:{fr:'Vietnamien — depuis le français', en:'Vietnamese — from French'},
             fichiers:['cours/vietnamien-a1.js','cours/vietnamien-a2.js','cours/vietnamien-b1.js','cours/revision-vietnamien.js'] }
};
const COURS_DEFAUT = 'fr-th';
let COURS_ACTIF = COURS[COURS_DEFAUT];
function coursActif(){ return COURS_ACTIF; }

/* charge les fichiers d'un cours, dans l'ordre, une seule fois chacun */
let DEJA_CHARGE = {};
let CONTENU_CHARGE = null;        /* quel jeu de fichiers est actuellement en mémoire */
function chargerCours(idCours){
  const c = COURS[idCours] || COURS[COURS_DEFAUT];
  COURS_ACTIF = c;
  definirLangue(c.interface);
  /* deux cours qui ne lisent pas les mêmes fichiers ne doivent pas se superposer */
  const signature = c.fichiers.join('|');
  if(CONTENU_CHARGE !== signature){
    viderContenu();
    DEJA_CHARGE = {};
    CONTENU_CHARGE = signature;
  }
  /* un palier absent ne doit pas empêcher les autres de se charger */
  return c.fichiers.reduce(
      (chaine, f)=> chaine.then(()=> charger1(f).catch(e=>console.warn(e.message))),
      Promise.resolve())
    .then(()=> finaliserContenu());
}
/* la version apposée sur index.html sert aussi aux fichiers de cours,
   pour qu'un cache ne serve jamais un contenu périmé */
function versionCourante(){
  const m = /[?&]v=([^"&]+)/.exec(document.querySelector('script[src*="registre.js"]')?.src || '');
  return m ? m[1] : '';
}
function charger1(fichier){
  if(DEJA_CHARGE[fichier]) return Promise.resolve();
  return new Promise((ok, ko)=>{
    const s = document.createElement('script');
    const v = versionCourante();
    s.src = fichier + (v ? '?v='+v : '');
    s.onload = ()=>{ DEJA_CHARGE[fichier] = true; ok(); };
    s.onerror = ()=> ko(new Error('contenu introuvable : '+fichier));
    document.head.appendChild(s);
  });
}
