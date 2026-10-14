/* ============================================================
   Générateur d'exercices V2
   8 types : pick · meaning · listen · listen_build · pairs
             trans(t2f/f2t) · blank · script
   Distracteurs pris en priorité dans la même unité (plausibles),
   priorité de révision donnée aux mots « dus » (Leitner).
   ============================================================ */
/* noms des tons dans la langue de l'interface */
function nomsDesTons(){ return (TONES && TONES[LANGUE]) || (TONES && TONES.fr) || ['moyen','bas','descendant','haut','montant']; }
/* clés internes des tons, dans l'ordre des noms : le thaï en a cinq, le chinois
   quatre plus le neutre, le vietnamien six — la liste vient donc du contenu */
function clesDesTons(){ return (TONES && TONES.cles) || ['moyen','bas','descendant','haut','montant']; }

function shuffle(a){ a=a.slice(); for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];} return a; }
function sample(a,n){ return shuffle(a).slice(0,Math.max(0,n)); }

function tousLesMots(){ return Object.keys(LEX); }
function tousLesChunks(){ return [...new Set([...Object.values(SENT), ...Object.values(REVISION)]
                                     .flatMap(s=>s.chunks))]; }
/* mots de la langue d'interface, pour les banques de mots */
function motsCible(){ return [...new Set([...Object.values(SENT), ...Object.values(REVISION)]
                                     .flatMap(s=>frWords(glose(s))))]; }
/* mots français utilisables dans une banque : on retire les gloses entre
   parenthèses (« (dit par un homme) ») et la ponctuation */
function frWords(fr){
  return fr.replace(/\([^)]*\)/g,' ').replace(/[,.;:!?«»"]/g,' ')
           .replace(/\s+/g,' ').trim().split(' ').filter(Boolean);
}

/* voisins sémantiques : mots de la même unité, complétés au besoin */
function neighbours(unit, exceptId, n, keyFn){
  const pool = unit ? [...new Set(unit.lessons.flatMap(l=>l.words||[]))] : [];
  const same = pool.filter(id=>id!==exceptId && keyFn(LEX[id])!==keyFn(LEX[exceptId]));
  const out = sample(same, n);
  if(out.length < n){
    const rest = tousLesMots().filter(id=>id!==exceptId && !out.includes(id) && keyFn(LEX[id])!==keyFn(LEX[exceptId]));
    out.push(...sample(rest, n-out.length));
  }
  return out.map(id=>LEX[id]);
}

function exPick(w, unit){
  const d = neighbours(unit, idOf(w), 3, o=>o.emoji);
  return { type:'pick', word:w, wordId:idOf(w),
    prompt:T('c_lequel',{mot:glose(w)}),
    options: shuffle([w,...d]).map(o=>({label:o.th, sub:o.rom, emoji:o.emoji, cible:true, correct:o.th===w.th})) };
}
function exMeaning(w, unit){
  const d = neighbours(unit, idOf(w), 3, o=>glose(o));
  return { type:'meaning', word:w, wordId:idOf(w), speak:w.th,
    prompt:T('c_sens'),
    options: shuffle([w,...d]).map(o=>({label:glose(o), emoji:o.emoji, correct:glose(o)===glose(w)})) };
}
function exListen(w, unit){
  const d = neighbours(unit, idOf(w), 3, o=>o.th);
  return { type:'listen', wordId:idOf(w), speak:w.th,
    prompt:T('c_entends'),
    options: shuffle([w,...d]).map(o=>({label:o.th, sub:o.rom, cible:true, correct:o.th===w.th})) };
}
/* l'index thaï → identifiant se reconstruit quand le contenu change de cours */
let ID_BY_TH = null, ID_BY_TH_TAILLE = -1;
function idOf(w){
  const ids = tousLesMots();
  if(!ID_BY_TH || ID_BY_TH_TAILLE !== ids.length){
    ID_BY_TH = Object.fromEntries(ids.map(id=>[LEX[id].th, id]));
    ID_BY_TH_TAILLE = ids.length;
  }
  return ID_BY_TH[w.th];
}

function exTransT2F(s){
  const sol = frWords(glose(s));
  const dis = sample(motsCible().filter(w=>!sol.includes(w)), Math.min(4, Math.max(2, 8-sol.length)));
  return { type:'trans', dir:'t2f', speak:joindreMots(s.chunks), chunks:s.chunks,
    prompt:T('c_traduis'), shown:joindreMots(s.chunks), rom:s.rom, fr:glose(s),
    solution:sol, bank:shuffle([...sol,...dis]) };
}
function exTransF2T(s){
  const sol = s.chunks;
  const dis = sample(tousLesChunks().filter(c=>!sol.includes(c)), Math.min(4, Math.max(2, 8-sol.length)));
  return { type:'trans', dir:'f2t', prompt:T('c_ecris_thai'), chunks:s.chunks, fr:glose(s),
    shown:glose(s), solution:sol, bank:shuffle([...sol,...dis]), speakAfter:joindreMots(s.chunks) };
}
function exListenBuild(s){
  const sol = s.chunks;
  const dis = sample(tousLesChunks().filter(c=>!sol.includes(c)), 3);
  return { type:'listen_build', prompt:T('c_ecris_entends'), speak:joindreMots(s.chunks), chunks:s.chunks,
    solution:sol, bank:shuffle([...sol,...dis]), rom:s.rom, fr:glose(s) };
}
function exBlank(s){
  if(s.chunks.length < 2) return null;
  const i = 1 + Math.floor(Math.random()*(s.chunks.length-1));
  const missing = s.chunks[i];
  const dis = sample(tousLesChunks().filter(c=>c!==missing && !s.chunks.includes(c)), 3);
  return { type:'blank', prompt:T('c_complete'), fr:glose(s), rom:s.rom, romPhrase:s.rom, chunks:s.chunks,
    before:joindreMots(s.chunks.slice(0,i)), after:joindreMots(s.chunks.slice(i+1)),
    speak:joindreMots(s.chunks),
    options: shuffle([missing,...dis]).map(c=>({label:c, cible:true, correct:c===missing})) };
}
/* épeler : reconstruire le mot lettre par lettre (clavier thaï) */
function exSpell(w){
  const clavier = (typeof coursActif === 'function' && coursActif().clavier) || null;
  if(!clavier) return null;                 /* épeler n'a pas de sens en chinois */
  const letters = Array.from(w.th);
  const dis = sample(clavier.filter(c=>!letters.includes(c)), 5);
  return { type:'spell', wordId:idOf(w), word:w, speak:w.th,
    prompt:T('c_ecris_mot'), hint:`${glose(w)} · ${w.rom}`,
    solution:letters, keys: shuffle([...letters, ...dis]) };
}
/* prononciation : l'apprenant répète le mot (reconnaissance vocale) */
function exSpeak(w){
  return { type:'speak', wordId:idOf(w), word:w, speak:w.th,
    prompt:T('c_prononce'), target:w.th, hint:`${w.rom} — ${glose(w)}` };
}

/* règles de ton : reconnaître le ton d'une syllabe, et l'inverse */
function exTone(r){
  const noms = nomsDesTons();
  const cles = clesDesTons();
  const nomTon = r => noms[cles.indexOf(r.ton)] || r.ton;
  const a = { type:'tone', syll:r, speak:r.th, prompt:T('c_ton_syllabe'),
    explain:glose(r.regle),
    options: shuffle(noms).map(t=>({label:T('ton_prefixe',{nom:t}), correct:t===nomTon(r)})) };
  const others = sample(TONE_RULES.filter(x=>x.ton!==r.ton), 3);
  const b = { type:'tone', thai:true, prompt:T('c_syllabe_ton',{ton:nomTon(r)}),
    explain:glose(r.regle),
    options: shuffle([r,...others]).map(o=>({label:o.th, sub:o.rom, cible:true, correct:o.th===r.th})) };
  return [a,b];
}

function exScript(L){
  /* on tire les distracteurs dans la même famille que la lettre (consonne,
     voyelle, clé, digramme…) : comparer une initiale de pinyin à une clé de
     caractère ne demande aucune connaissance, seulement de la reconnaissance */
  const memeFamille = SCRIPT.filter(x => x.cls === L.cls);
  const vivier = memeFamille.length >= 4 ? memeFamille : SCRIPT;
  const a = { type:'script', prompt:T('c_son_lettre',{lettre:L.th}),
    options: shuffle([L, ...sample(vivier.filter(x=>x.rom!==L.rom),3)])
      .map(o=>({label:o.rom, sub:glose(o), correct:o.rom===L.rom})) };
  const b = { type:'script', thai:true, prompt:T('c_lettre_son',{son:L.rom}),
    options: shuffle([L, ...sample(vivier.filter(x=>x.th!==L.th),3)])
      .map(o=>({label:o.th, cible:true, correct:o.th===L.th})) };
  return [a,b];
}

/* ---------- construction d'une leçon ---------- */
function buildExercises(lesson, unit, level=0){
  if(lesson.script){
    const ex = lesson.script.map(i=>SCRIPT[i]).flatMap(exScript);
    return shuffle(ex).slice(0, 12);
  }
  if(lesson.tones){
    const ex = lesson.tones.map(i=>TONE_RULES[i]).flatMap(exTone);
    return shuffle(ex).slice(0, 12);
  }
  const words = lesson.words || [];
  const sents = (lesson.sentences||[]).map(id=>SENT[id]).filter(Boolean);
  const ex = [];

  // priorité de révision : les mots « dus » repassent d'abord
  const due = words.filter(id=>Store.Words.isDue(id));
  const order = [...due, ...words.filter(id=>!due.includes(id))];

  order.forEach(id=> ex.push(exPick(LEX[id], unit)) );
  sample(order, Math.min(3, order.length)).forEach(id=> ex.push(exMeaning(LEX[id], unit)) );
  sample(order, Math.min(3, order.length)).forEach(id=> ex.push(exListen(LEX[id], unit)) );
  if(words.length>=4) ex.push({ type:'pairs', prompt:T('c_paires'),
    items: sample(words, Math.min(5, words.length)).map(id=>LEX[id]) });

  sents.forEach(s=> ex.push(exTransT2F(s)) );
  sents.forEach(s=> ex.push(exTransF2T(s)) );
  if(sents.length){
    const b = exBlank(sents[Math.floor(Math.random()*sents.length)]);
    if(b) ex.push(b);
    ex.push(exListenBuild(sents[Math.floor(Math.random()*sents.length)]));
  }

  // niveau 2+ : épeler en thaï ; niveau 3+ : prononcer à voix haute
  // entrelacement : deux mots déjà rencontrés ailleurs reviennent dans chaque leçon,
  // pour que les acquis ne s'effritent pas
  const ailleurs = Object.keys(Store.Words.tous())
    .filter(id => LEX[id] && !words.includes(id) && Store.Words.isDue(id));
  sample(ailleurs, 2).forEach(id=>{
    ex.push(Math.random() < 0.5 ? exPick(LEX[id], null) : exMeaning(LEX[id], null));
  });

  // on épelle / prononce des mots au sens concret (pas les gloses grammaticales)
  const concrets = order.filter(id=>!/^\(/.test(glose(LEX[id])));
  if(level >= 2) sample(concrets, 2).forEach(id=>{
    if(Array.from(LEX[id].th).length <= 6){ const e = exSpell(LEX[id]); if(e) ex.push(e); }
  });
  /* répéter à voix haute : seulement si le cours le demande */
  const avecPrononciation = (()=>{ try{ return coursActif().prononciation !== false; }catch(e){ return true; } })();
  if(level >= 3 && avecPrononciation && Audio_.canListen())
    sample(concrets, 1).forEach(id=> ex.push(exSpeak(LEX[id])) );

  // on démarre par une reconnaissance simple ; les exercices avancés (écriture,
  // prononciation) sont garantis dans la sélection finale, jamais tronqués
  const head  = ex.filter(e=>e.type==='pick').slice(0, level>=1?1:2);
  const bonus = ex.filter(e=>e.type==='spell' || e.type==='speak');
  const rest  = shuffle(ex.filter(e=>!head.includes(e) && !bonus.includes(e)))
                  .slice(0, Math.max(0, 15 - head.length - bonus.length));
  return [...head, ...shuffle([...bonus, ...rest])];
}

/* ---------- session de pratique (révision espacée) ---------- */
/* ============================================================
   Séance de révision
   Ne pioche que dans les leçons terminées (au moins une couronne),
   toutes confondues : la première comme la douzième. Sa longueur
   suit l'avancement — une leçon normale, plus cinq exercices par
   leçon terminée supplémentaire, sans plafond.
   ============================================================ */
const EX_PAR_SEANCE_BASE = 15;      // taille d'une leçon ordinaire
const EX_PAR_LECON_TERMINEE = 5;

/* les leçons de langue terminées ; l'écriture a son propre parcours */
function leconsTerminees(){
  const out = [];
  UNITES_LANGUE.forEach(u => u.lessons.forEach(l => {
    if(!l.script && !l.tones && Store.crowns(l.id) > 0) out.push(l);
  }));
  return out;
}
function tailleSeanceRevision(){
  const n = leconsTerminees().length;
  return n ? EX_PAR_SEANCE_BASE + EX_PAR_LECON_TERMINEE * (n - 1) : 0;
}

/* ============================================================
   Séance de révision
   Jusqu'à SEUIL_COMPOSITION leçons terminées, la séance reste un
   entraînement au vocabulaire. Au-delà, elle bascule : 70 % de
   composition de phrases, 30 % de rappels de vocabulaire, servis
   par blocs — les rappels arrivent AVANT les phrases qui les
   emploient. Les phrases viennent de REVISION : des tournures
   qu'aucune leçon n'a enseignées, bâties sur les mots appris.
   ============================================================ */
const SEUIL_COMPOSITION = 10;      // leçons terminées
const PART_VOCABULAIRE  = 3;       // 3 rappels…
const PART_COMPOSITION  = 7;       // …pour 7 compositions

/* les mots que l'apprenant a effectivement rencontrés */
function motsAppris(){
  return new Set(leconsTerminees().flatMap(l => l.words || []).filter(id => LEX[id]));
}
/* une phrase de révision n'est jouable que si TOUS ses mots sont acquis */
function phrasesRevisionJouables(){
  const appris = motsAppris();
  return Object.values(REVISION).filter(p => p.mots.length && p.mots.every(id => appris.has(id)));
}

/* les quatre façons de faire composer une phrase ; l'ordre tourne pour
   qu'une même phrase ne repose jamais deux fois la même question */
const FABRIQUES_PHRASE = [
  s => exTransT2F(s),
  s => exTransF2T(s),
  s => exTransT2F(s),
  s => Audio_.hasThaiVoice() ? exListenBuild(s) : exTransF2T(s),
  s => exBlank(s) || exTransT2F(s),
  s => exTransT2F(s),
  s => exTransF2T(s)
];

/* un rappel de vocabulaire, type variable */
function exRappel(id, tour){
  const w = LEX[id];
  if(!w) return null;
  const fab = [
    () => exPick(w, null),
    () => exMeaning(w, null),
    () => Audio_.hasThaiVoice() ? exListen(w, null) : exPick(w, null)
  ];
  return fab[tour % fab.length]();
}

/* mode « composition » : blocs de 3 rappels puis 7 phrases */
function seanceComposition(phrases, mots, cible){
  const ex = [];
  const ordreP = shuffle(phrases);
  let ip = 0, tour = 0;

  while(ex.length < cible){
    const bloc = [];
    for(let k = 0; k < PART_COMPOSITION; k++) bloc.push(ordreP[(ip + k) % ordreP.length]);

    /* les rappels portent sur les mots des phrases du bloc : on révise
       juste avant de s'en servir. Les mots les plus fragiles passent devant. */
    const motsDuBloc = [...new Set(bloc.flatMap(p => p.mots))].filter(id => mots.includes(id));
    const fragiles = Store.Words.weakest(mots.length).filter(id => motsDuBloc.includes(id));
    const choix = [...fragiles, ...shuffle(motsDuBloc.filter(id => !fragiles.includes(id)))];
    /* une paire prend la place d'un rappel de temps en temps, pour aérer :
       elle ne s'ajoute pas, sinon la part de vocabulaire dépasserait 30 % */
    const paire = tour % 3 === 2 && mots.length >= 4;
    for(let k = 0; k < PART_VOCABULAIRE && ex.length < cible; k++){
      if(paire && k === 0){
        ex.push({ type:'pairs', prompt:T('c_paires'), items: sample(mots, 5).map(id => LEX[id]) });
        continue;
      }
      const id = choix[k % Math.max(1, choix.length)] || mots[k % mots.length];
      const e = exRappel(id, tour + k);
      if(e) ex.push(e);
    }

    bloc.forEach((p, k) => {
      if(ex.length >= cible) return;
      const e = FABRIQUES_PHRASE[(tour + k) % FABRIQUES_PHRASE.length](p);
      if(e) ex.push(e);
    });

    ip = (ip + PART_COMPOSITION) % ordreP.length;
    tour++;
    if(tour > cible) break;                 // garde-fou : jamais de boucle sans fin
  }
  return ex.slice(0, cible);
}

/* mode « vocabulaire » : la séance des premières leçons, inchangée */
function seanceVocabulaire(mots, phrases, cible){
  const ex = [];
  const fragiles = Store.Words.weakest(mots.length).filter(id => mots.includes(id));
  const ordre = [...fragiles, ...shuffle(mots.filter(id => !fragiles.includes(id)))];

  const nbPaires = mots.length >= 4 ? Math.max(1, Math.floor(cible / 10)) : 0;
  const nbPhrases = phrases.length ? Math.min(phrases.length * 2, Math.floor(cible / 5)) : 0;

  for(let i = 0; i < nbPaires; i++)
    ex.push({ type:'pairs', prompt:T('c_paires'), items: sample(mots, 5).map(id => LEX[id]) });

  const listeP = [];
  while(listeP.length < nbPhrases) listeP.push(...shuffle(phrases));
  listeP.slice(0, nbPhrases).forEach((p, i) => ex.push(i % 2 ? exTransF2T(p) : exTransT2F(p)));

  const fabriques = [
    w => exPick(w, null),
    w => exMeaning(w, null),
    w => Audio_.hasThaiVoice() ? exListen(w, null) : exPick(w, null)
  ];
  let i = 0;
  while(ex.length < cible && ordre.length){
    const id = ordre[i % ordre.length];
    const tour = Math.floor(i / ordre.length);
    ex.push(fabriques[(i + tour) % fabriques.length](LEX[id]));
    i++;
    if(i > cible * 4) break;
  }
  return shuffle(ex).slice(0, cible);
}

function buildPractice(){
  const lecons = leconsTerminees();
  if(!lecons.length) return [];

  const mots = [...new Set(lecons.flatMap(l => l.words || []))].filter(id => LEX[id]);
  const phrases = [...new Set(lecons.flatMap(l => l.sentences || []))]
                    .map(id => SENT[id]).filter(Boolean);
  if(!mots.length) return [];

  const cible = tailleSeanceRevision();
  const composables = phrasesRevisionJouables();

  /* la bascule demande DEUX conditions : assez de leçons derrière soi,
     et assez de phrases jouables pour ne pas tourner en rond */
  if(lecons.length > SEUIL_COMPOSITION && composables.length >= PART_COMPOSITION)
    return seanceComposition(composables, mots, cible);

  return seanceVocabulaire(mots, phrases, cible);
}

/* proportion réelle de composition dans une séance : sert à l'affichage et aux tests */
function partComposition(ex){
  if(!ex.length) return 0;
  const n = ex.filter(e => e.type === 'trans' || e.type === 'listen_build' || e.type === 'blank').length;
  return n / ex.length;
}
