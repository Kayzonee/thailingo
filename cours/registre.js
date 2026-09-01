/* ============================================================
   Les cours proposés. Un cours = une langue d'interface, une
   langue enseignée, et les fichiers de contenu à charger.
   La progression est rangée séparément pour chacun.
   ============================================================ */
const COURS = {
  'fr-th': { id:'fr-th', interface:'fr', cible:'th', drapeau:'🇹🇭',
             nom:{fr:'Thaï — depuis le français', en:'Thai — from French'},
             fichiers:['cours/thai-a1.js','cours/thai-a2.js','cours/thai-b1.js'] },
  'en-th': { id:'en-th', interface:'en', cible:'th', drapeau:'🇹🇭',
             nom:{fr:'Thaï — depuis l’anglais', en:'Thai — from English'},
             fichiers:['cours/thai-a1.js','cours/thai-a2.js','cours/thai-b1.js'] }
};
const COURS_DEFAUT = 'fr-th';

/* charge les fichiers d'un cours, dans l'ordre, une seule fois chacun */
const DEJA_CHARGE = {};
function chargerCours(idCours){
  const c = COURS[idCours] || COURS[COURS_DEFAUT];
  definirLangue(c.interface);
  /* un palier absent ne doit pas empêcher les autres de se charger */
  return c.fichiers.reduce(
      (chaine, f)=> chaine.then(()=> charger1(f).catch(e=>console.warn(e.message))),
      Promise.resolve())
    .then(()=> finaliserContenu());
}
function charger1(fichier){
  if(DEJA_CHARGE[fichier]) return Promise.resolve();
  return new Promise((ok, ko)=>{
    const s = document.createElement('script');
    s.src = fichier;
    s.onload = ()=>{ DEJA_CHARGE[fichier] = true; ok(); };
    s.onerror = ()=> ko(new Error('contenu introuvable : '+fichier));
    document.head.appendChild(s);
  });
}
