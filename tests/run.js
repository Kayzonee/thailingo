/* Suite de tests — node tests/run.js
   Charge data.js / state.js / engine.js dans un contexte simulant le navigateur. */
const fs = require('fs'), vm = require('vm'), path = require('path');
const root = path.join(__dirname, '..');

const store = {};
const ctx = {
  console,
  localStorage:{ getItem:k=>k in store?store[k]:null, setItem:(k,v)=>store[k]=String(v), removeItem:k=>delete store[k], clear:()=>Object.keys(store).forEach(k=>delete store[k]) },
  Audio_:{ hasThaiVoice:()=>true, canListen:()=>true, speak(){}, good(){}, bad(){}, tap(){}, win(){} },
  Date, Math, JSON, Object, Array, String, Number, RegExp, Error, isNaN, parseInt, parseFloat,
  btoa, atob, escape, unescape
};
ctx.window = ctx; ctx.globalThis = ctx;
vm.createContext(ctx);
for(const f of ['js/data.js','js/state.js','js/engine.js'])
  vm.runInContext(fs.readFileSync(path.join(root,f),'utf8'), ctx, {filename:f});

let pass=0, fail=0;
const t = (name, fn)=>{ try{ fn(); pass++; console.log('  ✓', name); }
  catch(e){ fail++; console.log('  ✗', name, '\n     →', e.message); } };
const eq = (a,b,m)=>{ if(a!==b) throw new Error((m||'')+` attendu ${JSON.stringify(b)}, reçu ${JSON.stringify(a)}`); };
const ok = (c,m)=>{ if(!c) throw new Error(m||'condition fausse'); };

/* les déclarations `const` d'un script vm vivent dans la portée lexicale du
   contexte, pas sur l'objet global : on les récupère en les évaluant */
const g = expr => vm.runInContext(expr, ctx);
const LEX=g('LEX'), SENT=g('SENT'), SCRIPT=g('SCRIPT'), CURRICULUM=g('CURRICULUM'),
      Store=g('Store'), buildExercises=g('buildExercises'), buildPractice=g('buildPractice'),
      frWords=g('frWords'), TONE_RULES=g('TONE_RULES'), TONES=g('TONES'), SECTIONS=g('SECTIONS'),
      UNITES_LANGUE=g('UNITES_LANGUE'), UNITES_ECRITURE=g('UNITES_ECRITURE'), romDe=g('romDe');

console.log('\n── Intégrité du source ──');
/* un patch trop gourmand peut recopier un bloc entier au milieu d'une fonction :
   le code reste valide mais s'exécute deux fois. On l'attrape ici. */
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
  ['window.ThaiLingo = {', '\nrender();', '\napplyTheme();', '\nStore.touchDay();', '\nsynchroniserDepuisLeCloud();']
    .forEach(marqueur=>{
      const n = sourceApp.split(marqueur).length - 1;
      eq(n, 1, `« ${marqueur.trim()} » présent ${n} fois : `);
    });
});

console.log('\n── Contenu ──');
t('toutes les leçons référencent des entrées existantes', ()=>{
  CURRICULUM.forEach(u=>u.lessons.forEach(l=>{
    (l.words||[]).forEach(w=>ok(LEX[w], `mot inconnu ${w} dans ${l.id}`));
    (l.sentences||[]).forEach(x=>ok(SENT[x], `phrase inconnue ${x} dans ${l.id}`));
    (l.script||[]).forEach(i=>ok(SCRIPT[i], `index script ${i} invalide dans ${l.id}`));
  }));
});
t('chaque mot a th / rom / fr / emoji', ()=>{
  Object.entries(LEX).forEach(([id,w])=>{
    ok(w.th && w.rom && w.fr && w.emoji, `champ manquant sur ${id}`);
    ok(/[฀-๿]/.test(w.th), `${id} : le champ th n'est pas en thaï`);
  });
});
t('aucun doublon d’écriture thaïe', ()=>{
  const seen = {};
  Object.entries(LEX).forEach(([id,w])=>{ ok(!seen[w.th], `${w.th} en double (${seen[w.th]} / ${id})`); seen[w.th]=id; });
});
t('chaque phrase a des chunks, une romanisation et une traduction', ()=>{
  Object.entries(SENT).forEach(([id,s])=>{
    ok(Array.isArray(s.chunks) && s.chunks.length, `${id} sans chunks`);
    ok(s.rom && s.fr, `${id} incomplet`);
  });
});
t('l’alphabet contient les 44 consonnes classées', ()=>{
  eq(SCRIPT.filter(x=>x.cls).length, 44);
  ['haute','moyenne','basse'].forEach(c=>ok(SCRIPT.some(x=>x.cls===c), 'classe '+c+' absente'));
});
t('les gloses entre parenthèses sortent des banques de mots', ()=>{
  const w = frWords('Bonjour (dit par un homme)');
  eq(w.join(' '), 'Bonjour');
});

t('les règles de ton sont complètes et cohérentes', ()=>{
  ok(TONE_RULES.length >= 10, 'trop peu de règles');
  TONE_RULES.forEach(r=>{
    ok(r.th && r.rom && r.regle, 'règle incomplète');
    ok(TONES.includes(r.ton), `ton inconnu : ${r.ton}`);
  });
  ['moyen','bas','descendant','haut','montant'].forEach(x=>ok(TONE_RULES.some(r=>r.ton===x), 'ton '+x+' jamais illustré'));
});
t('les classificateurs sont enseignés', ()=>{
  const u = CURRICULUM.find(u=>u.id==='u11');
  ok(u, 'unité 11 absente');
  ok(u.lessons.some(l=>(l.words||[]).some(w=>/classif/.test(LEX[w].fr))), 'aucun classificateur');
});

t('les sections couvrent tout le parcours de langue, sans doublon', ()=>{
  const couv = SECTIONS.flatMap(x=>x.unites);
  eq(new Set(couv).size, couv.length, 'unité présente dans deux sections : ');
  UNITES_LANGUE.forEach(u=>ok(couv.includes(u.id), `${u.id} n'appartient à aucune section`));
  couv.forEach(id=>ok(UNITES_LANGUE.some(u=>u.id===id), `section : unité inconnue ${id}`));
});
t('langue et écriture sont deux parcours disjoints', ()=>{
  eq(UNITES_LANGUE.length + UNITES_ECRITURE.length, CURRICULUM.length);
  UNITES_ECRITURE.forEach(u=>ok(u.lessons.every(l=>l.script||l.tones), `${u.id} : leçon de langue dans l'écriture`));
  UNITES_LANGUE.forEach(u=>ok(u.lessons.every(l=>!l.script&&!l.tones), `${u.id} : leçon d'écriture dans la langue`));
});
t('tout le thaï affiché a sa romanisation', ()=>{
  Object.values(SENT).forEach(p=>p.chunks.forEach(c=>ok(romDe(c), `pas de romanisation pour ${c}`)));
  Object.values(LEX).forEach(w=>ok(romDe(w.th), `pas de romanisation pour ${w.th}`));
});

console.log('\n── Générateur d’exercices ──');
const unit = CURRICULUM[0], lesson = unit.lessons[0];
t('une leçon produit des exercices valides', ()=>{
  const ex = buildExercises(lesson, unit, 0);
  ok(ex.length >= 8, 'trop peu d’exercices : '+ex.length);
  ex.forEach(e=>{
    ok(e.type && e.prompt, 'exercice sans type/consigne');
    if(e.options) eq(e.options.filter(o=>o.correct).length, 1, `${e.type} : `);
    if(e.solution && e.bank) e.solution.forEach(x=>ok(e.bank.includes(x), `${e.type} : solution absente de la banque`));
  });
});
t('aucun QCM ne montre la réponse dans sa consigne', ()=>{
  for(let i=0;i<40;i++) buildExercises(lesson, unit, 0).forEach(e=>{
    if(!e.options) return;
    const good = e.options.find(o=>o.correct).label;
    ok(!e.prompt.includes(good), `consigne « ${e.prompt} » contient la réponse`);
  });
});
t('les distracteurs ne dupliquent jamais la bonne réponse', ()=>{
  for(let i=0;i<40;i++) buildExercises(lesson, unit, 0).forEach(e=>{
    if(!e.options) return;
    const labels = e.options.map(o=>o.label);
    eq(new Set(labels).size, labels.length, `${e.type} : options en double`);
  });
});
t('niveau ≥ 2 : des exercices d’écriture apparaissent', ()=>{
  let found=false;
  for(let i=0;i<30 && !found;i++) found = buildExercises(lesson, unit, 2).some(e=>e.type==='spell');
  ok(found, 'aucun exercice « spell » généré au niveau 2');
});
t('niveau ≥ 3 : l’exercice de prononciation survit à la troncature', ()=>{
  for(let i=0;i<20;i++)
    ok(buildExercises(lesson, unit, 3).some(e=>e.type==='speak'), 'exercice « speak » perdu au tirage '+i);
});
t('une leçon ne dépasse jamais 15 exercices', ()=>{
  for(let lv=0; lv<=5; lv++) ok(buildExercises(lesson, unit, lv).length <= 15, 'niveau '+lv);
});
t('la romanisation accompagne le thaï à tous les niveaux', ()=>{
  for(let lv=0; lv<=5; lv++)
    buildExercises(lesson, unit, lv).filter(e=>e.type==='pick').forEach(e=>
      e.options.forEach(o=>ok(o.sub, `niveau ${lv} : option « ${o.label} » sans romanisation`)));
});
t('une leçon d’écriture ne produit que des exercices d’alphabet', ()=>{
  const u3 = CURRICULUM.find(u=>u.id==='u3');
  buildExercises(u3.lessons[0], u3, 0).forEach(e=>eq(e.type,'script'));
});
t('une leçon de tons ne produit que des exercices de ton, avec la règle', ()=>{
  const u = UNITES_ECRITURE.find(u=>u.lessons.some(x=>x.tones));
  const l = u.lessons.find(x=>x.tones);
  buildExercises(l, u, 0).forEach(e=>{
    eq(e.type,'tone');
    ok(e.explain, 'règle pédagogique manquante');
    eq(e.options.filter(o=>o.correct).length, 1);
  });
});
t('la révision ne porte que sur ce qui a été rencontré', ()=>{
  Store.reset();
  eq(buildPractice().length, 0, 'sans historique il n’y a rien à réviser : ');
  const id = Object.keys(LEX)[5];
  Store.Words.seen(id, false);
  const ex = buildPractice();
  ok(ex.length >= 2, 'un mot connu doit suffire à bâtir une révision');
  const th = new Set();
  ex.forEach(e=>{ if(e.wordId) th.add(e.wordId); });
  th.forEach(w=>ok(Store.get().words[w], `${w} n'a jamais été rencontré`));
});

console.log('\n── Progression & mémoire ──');
t('la répétition espacée avance et recule', ()=>{
  const id = Object.keys(LEX)[0];
  Store.Words.seen(id, true); Store.Words.seen(id, true);
  eq(Store.get().words[id].box, 2);
  Store.Words.seen(id, false);
  eq(Store.get().words[id].box, 0, 'une erreur doit ramener en boîte 0 : ');
});
t('un mot juste n’est plus dû aujourd’hui', ()=>{
  const id = Object.keys(LEX)[1];
  Store.Words.seen(id, true);
  eq(Store.Words.isDue(id), false);
});
t('terminer une leçon donne une couronne et des XP', ()=>{
  const avant = Store.get().xp;
  Store.completeLesson('u1l1', 12, true);
  eq(Store.crowns('u1l1'), 1);
  eq(Store.get().xp, avant + 12);
});
t('les couronnes plafonnent à 5', ()=>{
  for(let i=0;i<9;i++) Store.completeLesson('u1l2', 1, false);
  eq(Store.crowns('u1l2'), 5);
});
t('les vies sont trois, et se rechargent à chaque leçon', ()=>{
  const s = Store.get();
  eq(s.maxHearts, 3);
  Store.loseHeart(); Store.loseHeart();
  eq(s.hearts, 1);
  Store.completeLesson('u2l2', 5, false);
  eq(s.hearts, 3, 'les vies doivent repartir à trois après une leçon : ');
  Store.loseHeart(); Store.resetHearts();
  eq(s.hearts, 3);
});
t('trois erreurs vident les vies', ()=>{
  Store.resetHearts();
  eq(Store.loseHeart(), 2); eq(Store.loseHeart(), 1); eq(Store.loseHeart(), 0);
  eq(Store.loseHeart(), 0, 'le compteur ne passe jamais sous zéro : ');
});
t('la sauvegarde est versionnée et relue', ()=>{
  eq(JSON.parse(store['thailingo.save']).schema, 5);
});
t('le code de sauvegarde se relit à l’identique', ()=>{
  Store.completeLesson('u2l1', 7, false);
  const avant = JSON.stringify(Store.get());
  const code = Store.codeSauvegarde();
  ok(code.length > 50, 'code trop court');
  Store.reset();
  eq(Store.crowns('u2l1'), 0, 'remise à zéro : ');
  Store.restaurer(code);
  const relu = JSON.parse(store['thailingo.save']);
  eq(relu.progress.u2l1.crowns, JSON.parse(avant).progress.u2l1.crowns);
});
t('adopter reprend une sauvegarde venue d’ailleurs', ()=>{
  Store.reset();
  const ok = Store.adopter({schema:4, xp:120, progress:{u3l1:{crowns:2}}, words:{}, gems:200});
  eq(ok, true);
  eq(Store.crowns('u3l1'), 2);
  eq(Store.get().xp, 120);
  eq(Store.get().maxHearts, 3, 'les réglages absents reprennent leur valeur par défaut : ');
});
t('adopter refuse un objet qui n’est pas une sauvegarde', ()=>{
  eq(Store.adopter({bidon:true}), false);
  eq(Store.adopter(null), false);
});
t('un code abîmé est refusé sans casser la sauvegarde', ()=>{
  let leve = false;
  try{ Store.restaurer('nimportequoi!!'); }catch(e){ leve = true; }
  ok(leve, 'aucune erreur levée sur un code invalide');
});

console.log(`\n${pass} test(s) OK, ${fail} échec(s)\n`);
process.exit(fail ? 1 : 0);
