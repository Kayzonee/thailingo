/* ============================================================
   Générateur d'exercices V2
   8 types : pick · meaning · listen · listen_build · pairs
             trans(t2f/f2t) · blank · script
   Distracteurs pris en priorité dans la même unité (plausibles),
   priorité de révision donnée aux mots « dus » (Leitner).
   ============================================================ */
/* noms des tons dans la langue de l'interface */
function nomsDesTons(){ return (TONES && TONES[LANGUE]) || (TONES && TONES.fr) || ['moyen','bas','descendant','haut','montant']; }

function shuffle(a){ a=a.slice(); for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];} return a; }
function sample(a,n){ return shuffle(a).slice(0,Math.max(0,n)); }

function tousLesMots(){ return Object.keys(LEX); }
function tousLesChunks(){ return [...new Set(Object.values(SENT).flatMap(s=>s.chunks))]; }
/* mots de la langue d'interface, pour les banques de mots */
function motsCible(){ return [...new Set(Object.values(SENT).flatMap(s=>frWords(glose(s))))]; }
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
    options: shuffle([w,...d]).map(o=>({label:o.th, sub:o.rom, emoji:o.emoji, correct:o.th===w.th})) };
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
    options: shuffle([w,...d]).map(o=>({label:o.th, sub:o.rom, correct:o.th===w.th})) };
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
  return { type:'trans', dir:'t2f', speak:s.chunks.join(''), chunks:s.chunks,
    prompt:T('c_traduis'), shown:s.chunks.join(''), rom:s.rom,
    solution:sol, bank:shuffle([...sol,...dis]) };
}
function exTransF2T(s){
  const sol = s.chunks;
  const dis = sample(tousLesChunks().filter(c=>!sol.includes(c)), Math.min(4, Math.max(2, 8-sol.length)));
  return { type:'trans', dir:'f2t', prompt:T('c_ecris_thai'),
    shown:glose(s), solution:sol, bank:shuffle([...sol,...dis]), speakAfter:s.chunks.join('') };
}
function exListenBuild(s){
  const sol = s.chunks;
  const dis = sample(tousLesChunks().filter(c=>!sol.includes(c)), 3);
  return { type:'listen_build', prompt:T('c_ecris_entends'), speak:s.chunks.join(''),
    solution:sol, bank:shuffle([...sol,...dis]), rom:s.rom, fr:glose(s) };
}
function exBlank(s){
  if(s.chunks.length < 2) return null;
  const i = 1 + Math.floor(Math.random()*(s.chunks.length-1));
  const missing = s.chunks[i];
  const dis = sample(tousLesChunks().filter(c=>c!==missing && !s.chunks.includes(c)), 3);
  return { type:'blank', prompt:T('c_complete'), fr:glose(s), rom:s.rom, romPhrase:s.rom,
    before:s.chunks.slice(0,i).join(''), after:s.chunks.slice(i+1).join(''),
    speak:s.chunks.join(''),
    options: shuffle([missing,...dis]).map(c=>({label:c, correct:c===missing})) };
}
/* épeler : reconstruire le mot lettre par lettre (clavier thaï) */
function exSpell(w){
  const letters = Array.from(w.th);
  const pool = ['ก','ข','ค','ง','จ','ช','ด','ต','ท','น','บ','ป','ผ','พ','ม','ย','ร','ล','ว','ส','ห','อ','า','ิ','ี','ุ','ู','เ','แ','โ','ไ','่','้','ั','ำ'];
  const dis = sample(pool.filter(c=>!letters.includes(c)), 5);
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
  const nomTon = r => noms[['moyen','bas','descendant','haut','montant'].indexOf(r.ton)] || r.ton;
  const a = { type:'tone', syll:r, speak:r.th, prompt:T('c_ton_syllabe'),
    explain:glose(r.regle),
    options: shuffle(noms).map(t=>({label:T('ton_prefixe',{nom:t}), correct:t===nomTon(r)})) };
  const others = sample(TONE_RULES.filter(x=>x.ton!==r.ton), 3);
  const b = { type:'tone', thai:true, prompt:T('c_syllabe_ton',{ton:nomTon(r)}),
    explain:glose(r.regle),
    options: shuffle([r,...others]).map(o=>({label:o.th, sub:o.rom, correct:o.th===r.th})) };
  return [a,b];
}

function exScript(L){
  const a = { type:'script', prompt:T('c_son_lettre',{lettre:L.th}),
    options: shuffle([L, ...sample(SCRIPT.filter(x=>x.rom!==L.rom),3)])
      .map(o=>({label:o.rom, sub:glose(o), correct:o.rom===L.rom})) };
  const b = { type:'script', thai:true, prompt:T('c_lettre_son',{son:L.rom}),
    options: shuffle([L, ...sample(SCRIPT.filter(x=>x.th!==L.th),3)])
      .map(o=>({label:o.th, correct:o.th===L.th})) };
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
    if(Array.from(LEX[id].th).length <= 6) ex.push(exSpell(LEX[id]));
  });
  if(level >= 3 && Audio_.canListen()) sample(concrets, 1).forEach(id=> ex.push(exSpeak(LEX[id])) );

  // on démarre par une reconnaissance simple ; les exercices avancés (écriture,
  // prononciation) sont garantis dans la sélection finale, jamais tronqués
  const head  = ex.filter(e=>e.type==='pick').slice(0, level>=1?1:2);
  const bonus = ex.filter(e=>e.type==='spell' || e.type==='speak');
  const rest  = shuffle(ex.filter(e=>!head.includes(e) && !bonus.includes(e)))
                  .slice(0, Math.max(0, 15 - head.length - bonus.length));
  return [...head, ...shuffle([...bonus, ...rest])];
}

/* ---------- session de pratique (révision espacée) ---------- */
function buildPractice(){
  const connus = Object.keys(Store.Words.tous()).filter(id=>LEX[id]);
  let ids = Store.Words.weakest(8).filter(id=>connus.includes(id));
  if(ids.length < 8) ids = [...new Set([...ids, ...sample(connus, 8-ids.length)])];
  if(!ids.length) return [];          // rien de rencontré : rien à réviser
  const ex = [];
  ids.forEach(id=>{
    const w = LEX[id]; if(!w) return;
    ex.push(exPick(w, null));
    ex.push(Math.random()<0.5 ? exMeaning(w, null) : exListen(w, null));
  });
  if(ids.length>=4) ex.push({ type:'pairs', prompt:T('c_paires'), items: ids.slice(0,5).map(id=>LEX[id]) });
  // seules les phrases dont tous les mots ont déjà été vus entrent en révision
  const vus = new Set(ids.concat(connus).map(id=>LEX[id].th));
  const phrases = Object.values(SENT).filter(p=>p.chunks.some(c=>vus.has(c)));
  sample(phrases, 2).forEach(p=> ex.push(exTransT2F(p)) );
  return shuffle(ex).slice(0, 14);
}
