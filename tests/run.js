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
['i18n/strings.js','js/contenu.js','cours/thai-a1.js','cours/thai-a2.js','cours/thai-b1.js',
 'cours/revision-thai.js']
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
      frWords=g('frWords'), romDe=g('romDe'), I18N=g('I18N'), glose=g('glose'), txt=g('txt'),
      REVISION=g('REVISION'), idParThai=g('idParThai'), partComposition=g('partComposition'),
      SEUIL_COMPOSITION=g('SEUIL_COMPOSITION');
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
  ['window.ThaiLingo = {', '\nwindow.ThaiLingo.pret = demarrer();'].forEach(marqueur=>{
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

console.log('\n── Les trois cours : chinois et vietnamien au même niveau d’exigence ──');

/* Charge un cours dans son propre contexte et rend ses tables. */
function monterCours(fichiers, idCours){
  const st = {};
  const c = {
    console,
    localStorage:{ getItem:k=>k in st?st[k]:null, setItem:(k,v)=>st[k]=String(v),
                   removeItem:k=>delete st[k], clear:()=>Object.keys(st).forEach(k=>delete st[k]) },
    Audio_:{ hasThaiVoice:()=>true, canListen:()=>true, speak(){}, good(){}, bad(){}, tap(){}, win(){}, unlock(){} },
    Date, Math, JSON, Object, Array, String, Number, RegExp, Error, isNaN, parseInt, parseFloat,
    btoa, atob, escape, unescape, Promise, Set, Map
  };
  c.window = c; c.globalThis = c;
  vm.createContext(c);
  ['i18n/strings.js','js/contenu.js','cours/registre.js'].concat(fichiers)
    .forEach(f=>vm.runInContext(fs.readFileSync(path.join(root,f),'utf8'), c, {filename:f}));
  /* le cours actif porte la voix, l'écriture et le séparateur : sans lui,
     on testerait le chinois avec les réglages du thaï */
  if(idCours) vm.runInContext(`COURS_ACTIF = COURS[${JSON.stringify(idCours)}]`, c);
  vm.runInContext('finaliserContenu()', c);
  ['js/state.js','js/engine.js'].forEach(f=>vm.runInContext(fs.readFileSync(path.join(root,f),'utf8'), c, {filename:f}));
  return e => vm.runInContext(e, c);
}

t('les cours engendrés sont bien ceux que produit le générateur', ()=>{
  /* chinois-*.js et vietnamien-*.js sont engendrés : une correction faite à la
     main sur eux serait perdue à la régénération suivante. On vérifie qu'ils
     n'ont pas dérivé de leurs tables. */
  const chantier = path.join(root, '..', 'chantier-zh-vi');
  if(!fs.existsSync(path.join(chantier,'generer.js'))){ ok(true, 'chantier absent'); return; }
  const avant = {};
  const engendres = fs.readdirSync(path.join(root,'cours'))
    .filter(f=>/^(chinois|vietnamien|revision-chinois|revision-vietnamien)/.test(f));
  engendres.forEach(f=> avant[f] = fs.readFileSync(path.join(root,'cours',f),'utf8'));
  require('child_process').execSync('node generer.js && node generer-revision.js',
    { cwd: chantier, stdio:'pipe' });
  const derive = engendres.filter(f=> fs.readFileSync(path.join(root,'cours',f),'utf8') !== avant[f]);
  eq(derive.length, 0, 'fichiers modifiés à la main : '+derive.join(', ')+' — ');
});

t('changer de cours remplace le contenu, il ne s’y ajoute pas', ()=>{
  /* Deux cours qui lisent des fichiers différents se cumulaient : le parcours
     passait de 107 à 213 leçons. Le thaï seul ne pouvait pas le révéler,
     ses deux cours partageant les mêmes fichiers. */
  const st = {};
  const c = {
    console,
    localStorage:{ getItem:k=>k in st?st[k]:null, setItem:(k,v)=>st[k]=String(v),
                   removeItem:k=>delete st[k], clear:()=>Object.keys(st).forEach(k=>delete st[k]) },
    Audio_:{ hasThaiVoice:()=>true, canListen:()=>true, speak(){}, good(){}, bad(){}, tap(){}, win(){}, unlock(){} },
    Date, Math, JSON, Object, Array, String, Number, RegExp, Error, isNaN, parseInt, parseFloat,
    btoa, atob, escape, unescape, Promise, Set, Map
  };
  c.window = c; c.globalThis = c;
  vm.createContext(c);
  ['i18n/strings.js','js/contenu.js','cours/registre.js']
    .forEach(f=>vm.runInContext(fs.readFileSync(path.join(root,f),'utf8'), c, {filename:f}));

  const mesurer = fichiers => {
    vm.runInContext('viderContenu()', c);
    fichiers.forEach(f=>vm.runInContext(fs.readFileSync(path.join(root,f),'utf8'), c, {filename:f}));
    return vm.runInContext('finaliserContenu()', c);
  };
  const TH = ['cours/thai-a1.js','cours/thai-a2.js','cours/thai-b1.js','cours/revision-thai.js'];
  const ZH = ['cours/chinois-a1.js','cours/chinois-a2.js','cours/chinois-b1.js','cours/revision-chinois.js'];

  const a = mesurer(TH);
  const b = mesurer(ZH);
  const c2 = mesurer(TH);
  eq(JSON.stringify(c2), JSON.stringify(a), 'le thaï revient différent après un détour par le chinois — ');
  ok(b.lecons < a.lecons + 10, 'le chinois a hérité des leçons thaïes : '+b.lecons);
  ok(b.mots > 400 && b.lecons > 90, 'le chinois n’a pas chargé : '+JSON.stringify(b));
});

const COURS_A_TESTER = [
  ['chinois',    'fr-zh', ['cours/chinois-a1.js','cours/chinois-a2.js','cours/chinois-b1.js','cours/revision-chinois.js']],
  ['vietnamien', 'fr-vi', ['cours/vietnamien-a1.js','cours/vietnamien-a2.js','cours/vietnamien-b1.js','cours/revision-vietnamien.js']]
];

COURS_A_TESTER.forEach(([nom, idCours, fichiers])=>{
  const g2 = monterCours(fichiers, idCours);
  const L = g2('LEX'), S = g2('SENT'), R = g2('REVISION'), SC = g2('SCRIPT'), TR = g2('TONE_RULES'),
        UL = g2('UNITES_LANGUE'), UE = g2('UNITES_ECRITURE'), SEC = g2('SECTIONS'), CUR = g2('CURRICULUM');

  t(`${nom} : chaque mot est complet`, ()=>{
    ok(Object.keys(L).length > 400, 'lexique trop maigre : '+Object.keys(L).length);
    Object.entries(L).forEach(([id,w])=>{
      ['th','rom','fr','en','emoji'].forEach(k=> ok(w[k], `${id} : ${k} manquant`));
    });
  });

  t(`${nom} : aucune graphie n’est employée deux fois`, ()=>{
    const par = {};
    Object.entries(L).forEach(([id,w])=>{ (par[w.th]=par[w.th]||[]).push(id); });
    const dbl = Object.entries(par).filter(([,v])=>v.length>1).map(([k,v])=>k+' ('+v.join(',')+')');
    eq(dbl.length, 0, 'graphies partagées : '+dbl.join(', ')+' — ');
  });

  t(`${nom} : chaque phrase de leçon est complète et romanisée`, ()=>{
    eq(Object.keys(S).length, 143, 'parité du nombre de phrases — ');
    Object.entries(S).forEach(([id,s])=>{
      ok(Array.isArray(s.chunks) && s.chunks.length, id+' : chunks manquants');
      ok(s.rom && s.fr && s.en, id+' : rom ou glose manquante');
      s.chunks.forEach(c=> ok(!!g2(`romDe(${JSON.stringify(c)})`), `${id} : « ${c} » sans romanisation`));
    });
  });

  t(`${nom} : toute leçon référence du contenu existant`, ()=>{
    CUR.forEach(u=>u.lessons.forEach(l=>{
      (l.words||[]).forEach(id=> ok(L[id], `${l.id} : mot inconnu ${id}`));
      (l.sentences||[]).forEach(id=> ok(S[id], `${l.id} : phrase inconnue ${id}`));
      (l.script||[]).forEach(i=> ok(SC[i], `${l.id} : lettre ${i} hors alphabet`));
      (l.tones||[]).forEach(i=> ok(TR[i], `${l.id} : règle de ton ${i} absente`));
    }));
  });

  t(`${nom} : aucun mot n’est enseigné nulle part`, ()=>{
    const vus = new Set(CUR.flatMap(u=>u.lessons.flatMap(l=>l.words||[])));
    const orphelins = Object.keys(L).filter(id=>!vus.has(id));
    eq(orphelins.length, 0, 'jamais enseignés : '+orphelins.slice(0,8).join(', ')+' — ');
  });

  t(`${nom} : aucune leçon de langue n’est vide`, ()=>{
    UL.forEach(u=>u.lessons.forEach(l=>{
      ok(!l.script && !l.tones, `${l.id} : leçon d’écriture dans le parcours de langue`);
      ok((l.words||[]).length >= 3, `${l.id} : ${(l.words||[]).length} mot(s) seulement`);
    }));
  });

  t(`${nom} : les sections couvrent le parcours, sans doublon`, ()=>{
    const couv = SEC.flatMap(s=>s.unites);
    eq(couv.length, new Set(couv).size, 'unité citée deux fois — ');
    UL.forEach(u=> ok(couv.includes(u.id), `${u.id} hors section`));
    eq(UL.length + UE.length, CUR.length, 'langue et écriture doivent être disjointes — ');
  });

  t(`${nom} : l’écriture est propre à la langue`, ()=>{
    ok(SC.length >= 25, 'alphabet trop court : '+SC.length);
    ok(TR.length >= 10, 'trop peu de règles de ton : '+TR.length);
    const th = SC.map(x=>x.th), rom = SC.map(x=>x.rom);
    eq(th.length, new Set(th).size, 'lettre répétée — ');
    eq(rom.length, new Set(rom).size, 'deux lettres pour le même son : l’exercice n’aurait pas de réponse unique — ');
    const cles = g2('clesDesTons()');
    TR.forEach(r=> ok(cles.includes(r.ton), `ton inconnu : ${r.ton}`));
  });

  t(`${nom} : les phrases de révision tiennent la règle du lexique`, ()=>{
    ok(Object.keys(R).length >= 150, 'banque trop maigre : '+Object.keys(R).length);
    const desLecons = new Set(Object.values(S).map(s=>s.chunks.join('')));
    const vues = {};
    Object.entries(R).forEach(([id,p])=>{
      p.chunks.forEach(c=> ok(!!g2(`idParThai(${JSON.stringify(c)})`), `${id} : « ${c} » hors lexique`));
      eq(p.rom, p.chunks.map(c=>g2(`romDe(${JSON.stringify(c)})`)).join(' '), id+' : romanisation déduite — ');
      ok(!desLecons.has(p.chunks.join('')), `${id} : reprend une phrase de leçon`);
      const k = p.chunks.join(''); ok(!vues[k], `${id} : doublon de ${vues[k]}`); vues[k] = id;
    });
  });

  t(`${nom} : les mots sont séparés comme l’exige la langue`, ()=>{
    /* « raukhôngcay » n'est pas du vietnamien ; « rau không cay » en est.
       Le thaï et le chinois, eux, s'écrivent sans espace. */
    const sep = g2(`coursActif().separateur`);
    const attendu = nom === 'vietnamien' ? ' ' : '';
    eq(sep, attendu, `séparateur du cours ${nom} — `);
    const s3 = Object.values(S).find(x=>x.chunks.length >= 3);
    eq(g2(`joindreMots(${JSON.stringify(s3.chunks)})`), s3.chunks.join(attendu),
       'assemblage d’une phrase — ');
  });

  t(`${nom} : une leçon produit des exercices jouables`, ()=>{
    const u = UL[0], l = u.lessons[0];
    const ex = g2(`buildExercises(${JSON.stringify(l)}, ${JSON.stringify(u)}, 0)`);
    ok(ex.length > 0 && ex.length <= 15, 'nombre d’exercices : '+ex.length);
    ex.forEach(e=>{
      ok(e.prompt, e.type+' : pas de consigne');
      if(e.options){
        ok(e.options.some(o=>o.correct), e.type+' : aucune bonne réponse');
        const bonnes = e.options.filter(o=>o.correct).map(o=>o.label);
        eq(new Set(bonnes).size, bonnes.length, e.type+' : bonne réponse en double — ');
      }
      if(e.solution) ok(e.bank && e.solution.every(x=>e.bank.includes(x)), e.type+' : solution hors banque');
    });
  });
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

t('la romanisation d’une phrase de leçon suit celle du lexique', ()=>{
  /* les phrases de leçon écrivent leur romanisation à la main : si l'on corrige
     un mot au lexique sans corriger les phrases, les deux divergent en silence */
  const ecarts = [];
  Object.entries(SENT).forEach(([id,s])=>{
    const t = s.rom.split(' ');
    if(t.length !== s.chunks.length) return;      // découpage libre : on ne juge pas
    s.chunks.forEach((c,i)=>{
      const attendu = (LEX[idParThai(c)] || {}).rom;
      if(attendu && attendu !== t[i]) ecarts.push(`${id} ${c} : « ${t[i]} » ≠ « ${attendu} »`);
    });
  });
  eq(ecarts.length, 0, ecarts.slice(0,4).join(' ; ')+' — ');
});

t('une même graphie thaïe ne porte qu’une entrée, homographes compris', ()=>{
  /* ตา (œil / grand-père maternel) est un vrai homographe : une seule entrée
     portant les deux sens, sinon romDe() et la correction mot à mot devraient
     choisir l'un des deux au hasard */
  const parTh = {};
  Object.entries(LEX).forEach(([id,w])=>{ (parTh[w.th] = parTh[w.th] || []).push(id); });
  const dbl = Object.entries(parTh).filter(([,ids])=>ids.length>1).map(([th,ids])=>th+' ('+ids.join(',')+')');
  eq(dbl.length, 0, 'graphies partagées : '+dbl.join(', ')+' — ');
  ok(/œil/.test(glose(LEX.ta)) && /grand-père/.test(glose(LEX.ta)), 'ตา a perdu un de ses deux sens');
});

t('aucune clé du lexique n’est déclarée deux fois dans le source', ()=>{
  /* JavaScript écrase silencieusement la première : un mot disparaît de
     l'app sans qu'aucun autre test ne s'en aperçoive. C'est arrivé à ยาย. */
  const vues = {}, dbl = [];
  ['cours/thai-a1.js','cours/thai-a2.js','cours/thai-b1.js'].forEach(f=>{
    const src = fs.readFileSync(path.join(root,f),'utf8');
    const re = /^  ([A-Za-z0-9_]+):\{ th:'([^']+)'/gm; let m;
    while((m = re.exec(src))){
      if(vues[m[1]]) dbl.push(`${m[1]} (${vues[m[1]]} puis ${m[2]})`);
      vues[m[1]] = m[2];
    }
  });
  eq(dbl.length, 0, 'clés dupliquées : '+dbl.join(', ')+' — ');
});

console.log('\n── Phrases de révision ──');

t('chaque phrase de révision est bien formée', ()=>{
  ok(Object.keys(REVISION).length >= 300, 'banque trop maigre : '+Object.keys(REVISION).length);
  Object.entries(REVISION).forEach(([id,p])=>{
    ok(Array.isArray(p.chunks) && p.chunks.length >= 2, id+' : chunks manquants');
    ok(p.fr && p.en, id+' : glose manquante');
  });
});

t('tout mot d’une phrase de révision existe au lexique', ()=>{
  /* c'est ce qui garantit la correction mot à mot cliquable */
  const fautifs = [];
  Object.entries(REVISION).forEach(([id,p])=>{
    p.chunks.forEach(c=>{ if(!idParThai(c)) fautifs.push(id+' : '+c); });
  });
  eq(fautifs.length, 0, 'mots hors lexique : '+fautifs.slice(0,5).join(', ')+' — ');
});

t('la romanisation se déduit mot à mot, jamais à la main', ()=>{
  Object.entries(REVISION).forEach(([id,p])=>{
    eq(p.rom, p.chunks.map(c=>romDe(c)).join(' '), id+' : ');
    eq(p.mots.length, p.chunks.length, id+' : mots requis incomplets — ');
  });
});

t('une phrase de révision n’est jamais une phrase de leçon', ()=>{
  const desLecons = new Set(Object.values(SENT).map(s=>s.chunks.join('')));
  const repetees = Object.entries(REVISION)
    .filter(([,p])=>desLecons.has(p.chunks.join('')))
    .map(([id])=>id);
  eq(repetees.length, 0, 'déjà enseignées : '+repetees.join(', ')+' — ');
});

t('aucune phrase de révision n’est écrite deux fois', ()=>{
  const vues = {}, dbl = [];
  Object.entries(REVISION).forEach(([id,p])=>{
    const k = p.chunks.join(''); if(vues[k]) dbl.push(id+'≡'+vues[k]); vues[k]=id;
  });
  eq(dbl.length, 0, 'doublons : '+dbl.join(', ')+' — ');
});

t('une phrase n’entre en révision que si tous ses mots sont acquis', ()=>{
  const jouables = g('phrasesRevisionJouables()');
  const acquis = new Set(g('[...motsAppris()]'));
  jouables.forEach(p=> p.mots.forEach(id=>
    ok(acquis.has(id), 'mot non acquis proposé : '+id)));
});

console.log('\n── Séance de révision ──');

/* aide : terminer n leçons de langue, dans l'ordre du parcours */
function terminer(n){
  Store.reset && Store.reset();
  const lecons = UNITES_LANGUE.flatMap(u=>u.lessons).filter(l=>!l.script && !l.tones).slice(0, n);
  lecons.forEach(l=> Store.completeLesson(l.id, 10, false));
  return lecons;
}

t('en deçà du seuil, la séance reste un entraînement au vocabulaire', ()=>{
  g('localStorage.clear()'); g('Store.recharger ? Store.recharger() : 0');
  terminer(4);
  const ex = buildPractice();
  ok(ex.length > 0, 'séance vide');
  ok(partComposition(ex) < 0.5, 'trop de composition trop tôt : '+partComposition(ex).toFixed(2));
});

t('au-delà du seuil, la composition de phrases domine', ()=>{
  terminer(SEUIL_COMPOSITION + 8);
  const ex = buildPractice();
  const part = partComposition(ex);
  ok(part >= 0.66 && part <= 0.74, 'part de composition hors cible : '+part.toFixed(2));
});

t('à la bascule, la banque évite de tourner en rond', ()=>{
  /* juste après le seuil, il doit y avoir assez de phrases jouables pour que
     la séance n'en repasse pas trois ou quatre fois les mêmes */
  terminer(SEUIL_COMPOSITION + 1);
  const jouables = g('phrasesRevisionJouables()').length;
  const ex = buildPractice();
  const compo = ex.filter(e=>e.type==='trans'||e.type==='listen_build'||e.type==='blank').length;
  ok(jouables >= 35, 'trop peu de phrases jouables à la bascule : '+jouables);
  ok(compo / jouables <= 1.2, 'chaque phrase repasse '+(compo/jouables).toFixed(1)+' fois');
});

t('la séance n’a pas de plafond : elle grandit avec les leçons', ()=>{
  terminer(12); const a = buildPractice().length;
  terminer(24); const b = buildPractice().length;
  ok(b > a, `la séance n'a pas grandi (${a} puis ${b})`);
  eq(b, 15 + 5*(24-1), 'taille attendue — ');
});

t('les rappels de vocabulaire précèdent les phrases qu’ils préparent', ()=>{
  terminer(SEUIL_COMPOSITION + 8);
  const ex = buildPractice();
  const compo = e => e.type==='trans' || e.type==='listen_build' || e.type==='blank';
  ok(!compo(ex[0]), 'la séance s’ouvre sur une composition');
  /* premier bloc : trois rappels avant la première phrase */
  const premiere = ex.findIndex(compo);
  ok(premiere >= 3, 'pas de rappel avant la première phrase (index '+premiere+')');
});

t('une phrase ratée peut être corrigée mot à mot', ()=>{
  terminer(SEUIL_COMPOSITION + 8);
  const ex = buildPractice().filter(e=>e.type==='trans' || e.type==='listen_build' || e.type==='blank');
  ok(ex.length, 'aucune composition produite');
  ex.forEach(e=>{
    ok(Array.isArray(e.chunks) && e.chunks.length, e.type+' : pas de découpage pour la correction');
    e.chunks.forEach(c=> ok(!!romDe(c), e.type+' : « '+c+' » sans romanisation'));
  });
});

t('la révision donne sept vies, la leçon trois', ()=>{
  const source = fs.readFileSync(path.join(root,'js/app.js'),'utf8');
  ok(/const VIES_REVISION = 7;/.test(source), 'VIES_REVISION absent');
  ok(/startPractice\(\)\{\s*\n?\s*Store\.resetHearts\(VIES_REVISION\)/.test(source),
     'la révision ne demande pas ses vies');
  Store.resetHearts(); eq(Store.get().hearts, 3, 'leçon : ');
  Store.resetHearts(7); eq(Store.get().hearts, 7, 'révision : ');
  Store.resetHearts(); eq(Store.get().hearts, 3, 'retour en leçon : ');
});

console.log('\n── Progression, cours et sauvegarde ──');
t('la révision ne pioche que dans les leçons terminées', ()=>{
  Store.reset();
  eq(buildPractice().length, 0, 'sans leçon terminée il n’y a rien à réviser : ');

  const lecon = UNITES_LANGUE[0].lessons[0];
  Store.completeLesson(lecon.id, 10, true);
  const ex = buildPractice();
  ok(ex.length > 0, 'une leçon terminée doit suffire');

  /* aucun mot ne peut venir d'ailleurs que des leçons terminées */
  const permis = new Set(lecon.words);
  ex.forEach(e=>{
    if(e.wordId) ok(permis.has(e.wordId), `${e.wordId} n'appartient à aucune leçon terminée`);
    if(e.type === 'pairs') e.items.forEach(it=>{
      const id = Object.keys(LEX).find(k=>LEX[k].th === it.th);
      ok(permis.has(id), `${id} n'appartient à aucune leçon terminée`);
    });
  });
});
t('une séance fait la taille d’une leçon, plus cinq par leçon terminée', ()=>{
  Store.reset();
  const lecons = UNITES_LANGUE.flatMap(u=>u.lessons).filter(l=>!l.script && !l.tones);
  Store.completeLesson(lecons[0].id, 10, true);
  eq(buildPractice().length, 15, 'une leçon terminée : ');
  Store.completeLesson(lecons[1].id, 10, true);
  eq(buildPractice().length, 20, 'deux leçons terminées : ');
  Store.completeLesson(lecons[2].id, 10, true);
  eq(buildPractice().length, 25, 'trois leçons terminées : ');
  for(let i=3; i<12; i++) Store.completeLesson(lecons[i].id, 10, true);
  eq(buildPractice().length, 70, 'douze leçons terminées : ');
});
t('la séance mélange bien les leçons anciennes et récentes', ()=>{
  Store.reset();
  const lecons = UNITES_LANGUE.flatMap(u=>u.lessons).filter(l=>!l.script && !l.tones).slice(0, 6);
  lecons.forEach(l=>Store.completeLesson(l.id, 10, true));
  const vus = new Set();
  buildPractice().forEach(e=>{
    if(e.wordId) vus.add(e.wordId);
    if(e.type === 'pairs') e.items.forEach(it=>{
      const id = Object.keys(LEX).find(k=>LEX[k].th === it.th); if(id) vus.add(id);
    });
  });
  const touchees = lecons.filter(l => (l.words||[]).some(w => vus.has(w)));
  ok(touchees.length >= 4, `seules ${touchees.length} leçons sur 6 sont représentées`);
  ok(vus.has(lecons[0].words[0]) || touchees.includes(lecons[0]),
     'la première leçon n’est jamais revue');
});
t('une séance de révision varie les types d’exercices', ()=>{
  Store.reset();
  UNITES_LANGUE.flatMap(u=>u.lessons).filter(l=>!l.script && !l.tones).slice(0,12)
    .forEach(l=>Store.completeLesson(l.id, 10, true));
  const compte = {};
  buildPractice().forEach(e=>compte[e.type] = (compte[e.type]||0)+1);
  const types = Object.keys(compte);
  ok(types.length >= 4, 'trop peu de types : '+JSON.stringify(compte));
  const total = Object.values(compte).reduce((a,b)=>a+b,0);
  Object.entries(compte).forEach(([t,n])=>
    ok(n <= total * 0.6, `le type ${t} occupe ${Math.round(100*n/total)}% de la séance`));
});
t('une révision reste jouable : consignes, réponses et banques valides', ()=>{
  Store.reset();
  UNITES_LANGUE.flatMap(u=>u.lessons).filter(l=>!l.script && !l.tones).slice(0,8)
    .forEach(l=>Store.completeLesson(l.id, 10, true));
  buildPractice().forEach(e=>{
    ok(e.type && e.prompt, 'exercice sans type ou sans consigne');
    if(e.options) eq(e.options.filter(o=>o.correct).length, 1, `${e.type} : `);
    if(e.solution && e.bank) e.solution.forEach(x=>ok(e.bank.includes(x), `${e.type} : solution hors banque`));
  });
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
