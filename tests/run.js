/* Suite de tests — node tests/run.js
   Monte l'application dans un contexte qui simule le navigateur. */
const fs = require('fs'), vm = require('vm'), path = require('path');
const root = path.join(__dirname, '..');

const store = {};
const ctx = {
  console,
  localStorage:{ getItem:k=>k in store?store[k]:null, setItem:(k,v)=>store[k]=String(v),
                 removeItem:k=>delete store[k], clear:()=>Object.keys(store).forEach(k=>delete store[k]) },
  Audio_:{ hasThaiVoice:()=>true, canListen:()=>true, speak(){}, good(){}, bad(){}, tap(){}, win(){}, unlock(){} },
  Date, Math, JSON, Object, Array, String, Number, RegExp, Error, isNaN, parseInt, parseFloat,
  btoa, atob, escape, unescape, Promise, Set, Map
};
ctx.window = ctx; ctx.globalThis = ctx;
vm.createContext(ctx);

const charger = f => vm.runInContext(fs.readFileSync(path.join(root,f),'utf8'), ctx, {filename:f});
['i18n/strings.js','js/contenu.js','cours/thai-a1.js','cours/thai-a2.js','cours/thai-b1.js']
  .forEach(charger);
vm.runInContext('finaliserContenu()', ctx);
['js/state.js','js/engine.js'].forEach(charger);

let pass=0, fail=0;
const enAttente = [];
const t = (nom, fn)=>{
  try{
    const r = fn();
    if(r && typeof r.then === 'function'){
      enAttente.push(r.then(()=>{ pass++; console.log('  ✓', nom); },
                            e=>{ fail++; console.log('  ✗', nom, '\n     →', e.message); }));
      return;
    }
    pass++; console.log('  ✓', nom);
  }catch(e){ fail++; console.log('  ✗', nom, '\n     →', e.message); }
};
const eq = (a,b,m)=>{ if(a!==b) throw new Error((m||'')+` attendu ${JSON.stringify(b)}, reçu ${JSON.stringify(a)}`); };
const ok = (c,m)=>{ if(!c) throw new Error(m||'condition fausse'); };
const g = expr => vm.runInContext(expr, ctx);

const LEX=g('LEX'), SENT=g('SENT'), SCRIPT=g('SCRIPT'), CURRICULUM=g('CURRICULUM'), SECTIONS=g('SECTIONS'),
      TONE_RULES=g('TONE_RULES'), UNITES_LANGUE=g('UNITES_LANGUE'), UNITES_ECRITURE=g('UNITES_ECRITURE'),
      Store=g('Store'), buildExercises=g('buildExercises'), buildPractice=g('buildPractice'),
      frWords=g('frWords'), romDe=g('romDe'), I18N=g('I18N'), glose=g('glose'), txt=g('txt');
const setLangue = l => vm.runInContext(`definirLangue('${l}')`, ctx);

console.log('\n── Intégrité du source ──');
const sourceApp = fs.readFileSync(path.join(root,'js/app.js'),'utf8');
t('aucune déclaration de haut niveau n’est dupliquée', ()=>{
  const noms = {};
  sourceApp.split('\n').forEach(l=>{
    const m = /^(?:async )?function ([A-Za-z_$][\w$]*)\s*\(/.exec(l) || /^const ([A-Za-z_$][\w$]*) =/.exec(l);
    if(m) noms[m[1]] = (noms[m[1]]||0) + 1;
  });
  const doublons = Object.entries(noms).filter(([,n])=>n>1).map(([k,n])=>`${k}×${n}`);
  eq(doublons.length, 0, 'déclarations en double : '+doublons.join(', ')+' — ');
});
t('le code d’amorçage ne s’exécute qu’une fois', ()=>{
  ['window.ThaiLingo = {', '\ndemarrer();'].forEach(marqueur=>{
    eq(sourceApp.split(marqueur).length - 1, 1, `« ${marqueur.trim()} » : `);
  });
});

t('les fichiers appelés par la page portent un numéro de version', ()=>{
  const html = fs.readFileSync(path.join(root,'index.html'),'utf8');
  const appels = html.match(/(?:src|href)="(?:js|css|i18n|cours)\/[^"]+"/g) || [];
  ok(appels.length >= 8, 'trop peu de fichiers appelés : '+appels.length);
  appels.forEach(a=>ok(/\?v=/.test(a), `sans version : ${a}`));
});
t('l’état de la sauvegarde en ligne est affiché', ()=>{
  ok(/quandEnLigne/.test(sourceApp), 'aucun indicateur de dernière sauvegarde');
  ok(/marquerEnLigne/.test(fs.readFileSync(path.join(root,'js/nuage.js'),'utf8')),
     'l’écriture en ligne ne date pas la sauvegarde');
});

console.log('\n── Traductions ──');
t('les deux langues ont exactement les mêmes clés', ()=>{
  const fr = Object.keys(I18N.fr), en = Object.keys(I18N.en);
  eq(fr.filter(k=>!en.includes(k)).join(','), '', 'manquantes en anglais : ');
  eq(en.filter(k=>!fr.includes(k)).join(','), '', 'en trop en anglais : ');
});
/* Interfaces retirées à la demande de l'utilisateur : le mécanisme reste dans le
   code et les textes sont conservés, pour pouvoir les réafficher sans les réécrire. */
const EN_RESERVE = ['sauvegarde','sauvegarde_jamais','sauvegarde_le','sauvegarder',
  'sauvegarde_explication','restaurer','restaurer_titre','restaurer_detail','copier',
  'code_illisible','code_illisible_detail','progression_restauree',
  'nuage_transfert','nuage_transfert_titre','nuage_transfert_detail',
  'nuage_reprendre','nuage_reprendre_titre','nuage_reprendre_detail','nuage_reprise_ok',
  'nuage_code_illisible','nuage_code_refuse'];
t('aucune clé de traduction n’est restée orpheline', ()=>{
  const code = ['js/app.js','js/state.js','js/engine.js','js/nuage.js','js/contenu.js']
    .map(f=>fs.readFileSync(path.join(root,f),'utf8')).join('\n');
  const mortes = Object.keys(I18N.fr)
    .filter(k=>!EN_RESERVE.includes(k))
    .filter(k=>!new RegExp("['\"`]"+k+"['\"`]").test(code));
  eq(mortes.length, 0, 'clés inutilisées : '+mortes.join(', ')+' — ');
});
t('le profil ne montre plus qu’une carte de sauvegarde', ()=>{
  ['id="exp"','id="imp"','id="transfert"','id="reprendre"','id="securiser"','id="coller-lien"','id="fichier"']
    .forEach(m=>ok(!sourceApp.includes(m), `bouton retiré encore présent : ${m}`));
  ok(sourceApp.includes('id="carte-nuage"'), 'la carte de sauvegarde en ligne a disparu');
});
t('aucune traduction anglaise n’est laissée en français', ()=>{
  const suspects = Object.entries(I18N.en)
    .filter(([k,v])=> v === I18N.fr[k] && /[éèêàùôîç]/.test(v));
  eq(suspects.length, 0, 'non traduites : '+suspects.map(([k])=>k).join(', ')+' — ');
});
t('la glose suit la langue choisie', ()=>{
  const mot = LEX.sawatdee;
  setLangue('fr'); eq(glose(mot), 'bonjour');
  setLangue('en'); eq(glose(mot), 'hello');
  setLangue('fr');
});
t('chaque unité et chaque leçon a un titre dans les deux langues', ()=>{
  CURRICULUM.forEach(u=>{
    ok(u.title && u.title.fr && u.title.en, `${u.id} : titre incomplet`);
    u.lessons.forEach(l=>ok(l.title && l.title.fr && l.title.en, `${l.id} : titre incomplet`));
  });
});

console.log('\n── Contenu ──');
t('le contenu couvre les trois paliers', ()=>{
  ok(Object.keys(LEX).length >= 450, 'trop peu de mots : '+Object.keys(LEX).length);
  ok(Object.keys(SENT).length >= 140, 'trop peu de phrases');
  ok(CURRICULUM.reduce((a,u)=>a+u.lessons.length,0) >= 100, 'trop peu de leçons');
  eq(SECTIONS.length, 3, 'trois sections attendues : ');
});
t('chaque mot est complet dans les deux langues', ()=>{
  Object.entries(LEX).forEach(([id,w])=>{
    ok(w.th && w.rom && w.fr && w.en && w.emoji, `champ manquant sur ${id}`);
    ok(/[฀-๿]/.test(w.th), `${id} : le champ th n'est pas en thaï`);
  });
});
t('chaque phrase est complète dans les deux langues', ()=>{
  Object.entries(SENT).forEach(([id,p])=>{
    ok(Array.isArray(p.chunks) && p.chunks.length, `${id} sans chunks`);
    ok(p.rom && p.fr && p.en, `${id} incomplet`);
  });
});
t('aucun doublon d’écriture thaïe', ()=>{
  const vus = {};
  Object.entries(LEX).forEach(([id,w])=>{ ok(!vus[w.th], `${w.th} en double (${vus[w.th]} / ${id})`); vus[w.th]=id; });
});
t('tout le thaï affiché a sa romanisation', ()=>{
  Object.values(SENT).forEach(p=>p.chunks.forEach(c=>ok(romDe(c), `pas de romanisation pour ${c}`)));
  Object.values(LEX).forEach(w=>ok(romDe(w.th), `pas de romanisation pour ${w.th}`));
});
t('toutes les leçons référencent du contenu existant', ()=>{
  CURRICULUM.forEach(u=>u.lessons.forEach(l=>{
    (l.words||[]).forEach(w=>ok(LEX[w], `${l.id} : mot inconnu ${w}`));
    (l.sentences||[]).forEach(x=>ok(SENT[x], `${l.id} : phrase inconnue ${x}`));
    (l.script||[]).forEach(i=>ok(SCRIPT[i], `${l.id} : index d'alphabet ${i} invalide`));
  }));
});
t('aucun mot n’est enseigné nulle part', ()=>{
  const vus = new Set();
  CURRICULUM.forEach(u=>u.lessons.forEach(l=>(l.words||[]).forEach(w=>vus.add(w))));
  const orphelins = Object.keys(LEX).filter(id=>!vus.has(id));
  eq(orphelins.length, 0, 'mots jamais enseignés : '+orphelins.slice(0,8).join(', ')+' — ');
});
t('l’alphabet contient les 44 consonnes classées', ()=>{
  eq(SCRIPT.filter(x=>x.cls).length, 44);
  ['haute','moyenne','basse'].forEach(c=>ok(SCRIPT.some(x=>x.cls===c), 'classe '+c+' absente'));
});
t('les règles de ton sont complètes', ()=>{
  ok(TONE_RULES.length >= 10);
  TONE_RULES.forEach(r=>ok(r.th && r.rom && r.regle && r.regle.fr && r.regle.en, 'règle incomplète'));
});
t('les sections couvrent tout le parcours de langue', ()=>{
  const couv = SECTIONS.flatMap(x=>x.unites);
  eq(new Set(couv).size, couv.length, 'unité dans deux sections : ');
  UNITES_LANGUE.forEach(u=>ok(couv.includes(u.id), `${u.id} hors section`));
});
t('langue et écriture restent deux parcours disjoints', ()=>{
  eq(UNITES_LANGUE.length + UNITES_ECRITURE.length, CURRICULUM.length);
  UNITES_ECRITURE.forEach(u=>ok(u.lessons.every(l=>l.script||l.tones), `${u.id} : leçon de langue dans l'écriture`));
  UNITES_LANGUE.forEach(u=>ok(u.lessons.every(l=>!l.script&&!l.tones), `${u.id} : leçon d'écriture dans la langue`));
});
t('les gloses entre parenthèses sortent des banques de mots', ()=>{
  eq(frWords('Bonjour (dit par un homme)').join(' '), 'Bonjour');
});

console.log('\n── Sauvegarde en ligne ──');
const sourceNuage = fs.readFileSync(path.join(root,'js/nuage.js'),'utf8');
t('la configuration Firebase est présente et complète', ()=>{
  ['apiKey','projectId','authDomain'].forEach(k=>ok(new RegExp(k+":'[^']+'").test(sourceNuage), `${k} manquant`));
  ok(/thailingo-/.test(sourceNuage), 'identifiant de projet inattendu');
});
t('aucun secret privé ne traîne dans le code', ()=>{
  ok(!/private_key|BEGIN PRIVATE KEY|service_account/.test(sourceNuage), 'clé privée dans le source !');
  const tout = ['js/app.js','js/nuage.js','js/state.js'].map(f=>fs.readFileSync(path.join(root,f),'utf8')).join('');
  ok(!/BEGIN [A-Z ]*PRIVATE KEY/.test(tout), 'clé privée trouvée');
});
t('le module expose ce dont l’application a besoin', ()=>{
  ['auth','lire','ecrire','oublier','effacer','codeRecuperation','reprendreAvecCode']
    .forEach(f=>ok(new RegExp('\\b'+f+'\\b').test(sourceNuage), `${f} absent`));
});
t('le code de récupération se relit, et un code abîmé est refusé', ()=>{
  const ctx2 = { localStorage:ctx.localStorage, fetch:async()=>({json:async()=>({error:{message:'hors ligne'}})}),
                 console, location:{origin:'https://exemple.fr', pathname:'/', href:'https://exemple.fr/'},
                 JSON, Date, Object, String, Math, Promise, btoa, atob, escape, unescape,
                 decodeURIComponent, encodeURIComponent };
  ctx2.window = ctx2;
  vm.createContext(ctx2);
  vm.runInContext(sourceNuage, ctx2, {filename:'js/nuage.js'});
  const lu = expr => vm.runInContext(expr, ctx2);
  const code = lu(`btoa(unescape(encodeURIComponent(JSON.stringify({v:2, rt:null, sv:{cours:{'fr-th':{xp:9,progress:{a:{crowns:1}}}}}}))))`);
  return lu(`Nuage.reprendreAvecCode(${JSON.stringify(code)})`).then(r=>{
    eq(r.etat.cours['fr-th'].xp, 9, 'la copie du code n’a pas été reprise : ');
    eq(r.identite, false, 'aucune identité ne devait être reprise hors ligne : ');
    return lu(`Nuage.reprendreAvecCode('nimportequoi')`).then(
      ()=>{ throw new Error('un code illisible a été accepté'); },
      e => eq(String(e.message), 'CODE_ILLISIBLE'));
  });
});
t('le code de récupération est signalé comme sensible', ()=>{
  ok(/vaut mot de passe/.test(sourceNuage), 'nature sensible non signalée dans le source');
  ok(/Garde-le pour toi|Keep it to yourself/.test(fs.readFileSync(path.join(root,'i18n/strings.js'),'utf8')),
     'aucun avertissement affiché à l’utilisateur');
});
t('l’écran de sauvegarde tient en deux boutons', ()=>{
  const profil = sourceApp.slice(sourceApp.indexOf('function renderProfile'), sourceApp.indexOf('function quandEnLigne'));
  const boutons = (profil.match(/<button[^>]*id="[^"]+"/g) || []).map(b=>/id="([^"]+)"/.exec(b)[1]);
  const sauvegarde = boutons.filter(id=>/recup|code|nuage|transfert|securiser|coller|fichier|exp|imp/.test(id));
  eq(sauvegarde.sort().join(','), 'code-recup,code-restaurer', 'boutons de sauvegarde inattendus : ');
});
t('l’application sauvegarde en ligne après chaque leçon', ()=>{
  ok(/Nuage\.ecrire\(Store\.get\(\)\)/.test(sourceApp), 'pas d’écriture en fin de leçon');
  ok(/Nuage\.lire\(\)/.test(sourceApp), 'pas de lecture au démarrage');
});

console.log('\n── Générateur d’exercices ──');
const unite = UNITES_LANGUE[0], lecon = unite.lessons[0];
t('une leçon produit des exercices valides', ()=>{
  const ex = buildExercises(lecon, unite, 0);
  ok(ex.length >= 8, 'trop peu d’exercices : '+ex.length);
  ex.forEach(e=>{
    ok(e.type && e.prompt, 'exercice sans type ou sans consigne');
    if(e.options) eq(e.options.filter(o=>o.correct).length, 1, `${e.type} : `);
    if(e.solution && e.bank) e.solution.forEach(x=>ok(e.bank.includes(x), `${e.type} : solution absente de la banque`));
  });
});
t('les consignes suivent la langue de l’interface', ()=>{
  setLangue('en');
  const ex = buildExercises(lecon, unite, 0);
  ok(ex.some(e=>/Which one means|What does this word/.test(e.prompt)), 'consignes restées en français');
  setLangue('fr');
});
t('aucun QCM ne montre la réponse dans sa consigne', ()=>{
  for(let i=0;i<30;i++) buildExercises(lecon, unite, 0).forEach(e=>{
    if(!e.options) return;
    const bonne = e.options.find(o=>o.correct).label;
    ok(!e.prompt.includes(bonne), `consigne « ${e.prompt} » contient la réponse`);
  });
});
t('les distracteurs ne dupliquent jamais la bonne réponse', ()=>{
  for(let i=0;i<30;i++) buildExercises(lecon, unite, 0).forEach(e=>{
    if(!e.options) return;
    const labels = e.options.map(o=>o.label);
    eq(new Set(labels).size, labels.length, `${e.type} : options en double`);
  });
});
t('la romanisation accompagne le thaï à tous les niveaux', ()=>{
  for(let lv=0; lv<=5; lv++)
    buildExercises(lecon, unite, lv).filter(e=>e.type==='pick').forEach(e=>
      e.options.forEach(o=>ok(o.sub, `niveau ${lv} : « ${o.label} » sans romanisation`)));
});
t('niveau ≥ 3 : l’exercice de prononciation survit à la troncature', ()=>{
  for(let i=0;i<15;i++)
    ok(buildExercises(lecon, unite, 3).some(e=>e.type==='speak'), 'exercice « speak » perdu au tirage '+i);
});
t('une leçon ne dépasse jamais 15 exercices', ()=>{
  for(let lv=0; lv<=5; lv++) ok(buildExercises(lecon, unite, lv).length <= 15, 'niveau '+lv);
});
t('une leçon d’écriture ne produit que des exercices d’alphabet', ()=>{
  const u = UNITES_ECRITURE.find(u=>u.lessons.some(l=>l.script));
  buildExercises(u.lessons.find(l=>l.script), u, 0).forEach(e=>eq(e.type,'script'));
});
t('une leçon de tons ne produit que des exercices de ton, avec la règle', ()=>{
  const u = UNITES_ECRITURE.find(u=>u.lessons.some(l=>l.tones));
  buildExercises(u.lessons.find(l=>l.tones), u, 0).forEach(e=>{
    eq(e.type,'tone'); ok(e.explain, 'règle pédagogique manquante');
    eq(e.options.filter(o=>o.correct).length, 1);
  });
});

console.log('\n── Progression, cours et sauvegarde ──');
t('la révision ne porte que sur ce qui a été rencontré', ()=>{
  Store.reset();
  eq(buildPractice().length, 0, 'sans historique il n’y a rien à réviser : ');
  Store.Words.seen(Object.keys(LEX)[5], false);
  ok(buildPractice().length >= 2, 'un mot connu doit suffire à bâtir une révision');
});
t('la répétition espacée avance et recule', ()=>{
  Store.reset();
  const id = Object.keys(LEX)[0];
  Store.Words.seen(id, true); Store.Words.seen(id, true);
  eq(Store.get().cours[Store.coursActif()].words[id].box, 2);
  Store.Words.seen(id, false);
  eq(Store.get().cours[Store.coursActif()].words[id].box, 0, 'une erreur ramène en boîte 0 : ');
});
t('les vies sont trois, et se rechargent à chaque leçon', ()=>{
  const s = Store.get();
  eq(s.maxHearts, 3);
  Store.loseHeart(); Store.loseHeart(); eq(s.hearts, 1);
  Store.completeLesson(lecon.id, 5, false);
  eq(s.hearts, 3, 'les vies repartent à trois après une leçon : ');
});
t('les couronnes plafonnent à 5', ()=>{
  for(let i=0;i<9;i++) Store.completeLesson('x1', 1, false);
  eq(Store.crowns('x1'), 5);
});
t('chaque cours garde sa propre progression', ()=>{
  Store.reset();
  Store.completeLesson('a1u1l1', 10, true);
  eq(Store.crowns('a1u1l1'), 1);
  Store.changerCours('en-th');
  eq(Store.crowns('a1u1l1'), 0, 'le nouveau cours démarre vierge : ');
  eq(Store.xp(), 0);
  Store.changerCours('fr-th');
  eq(Store.crowns('a1u1l1'), 1, 'la progression du premier cours est retrouvée : ');
});
t('la sauvegarde est versionnée et relue', ()=>{
  eq(JSON.parse(store['thailingo.save']).schema, 6);
});
t('le code de sauvegarde se relit à l’identique', ()=>{
  Store.completeLesson('a2u1l1', 7, false);
  const avant = Store.crowns('a2u1l1');
  const code = Store.codeSauvegarde();
  Store.reset();
  eq(Store.crowns('a2u1l1'), 0);
  Store.restaurer(code);
  eq(Store.crowns('a2u1l1'), avant);
});
t('un code abîmé est refusé sans casser la sauvegarde', ()=>{
  let leve = false;
  try{ Store.restaurer('nimportequoi!!'); }catch(e){ leve = true; }
  ok(leve, 'aucune erreur levée sur un code invalide');
});
t('une sauvegarde de l’ancien format est reprise', ()=>{
  const ancienne = { schema:5, xp:42, progress:{'a1u1l1':{crowns:2}}, words:{}, hearts:3, maxHearts:3 };
  ok(Store.adopter(ancienne));
  eq(Store.crowns('a1u1l1'), 2, 'progression migrée sous le cours : ');
  eq(Store.xp(), 42);
  eq(Store.get().schema, 6);
});

Promise.all(enAttente).then(()=>{
  console.log(`\n${pass} test(s) OK, ${fail} échec(s)\n`);
  process.exit(fail ? 1 : 0);
});
