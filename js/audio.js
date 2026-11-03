/* Audio : voix de la langue enseignée (Web Speech) + effets sonores générés
   (Web Audio, zéro fichier). L'étiquette de langue vient du cours actif. */
const Audio_ = (()=>{
  let voice = null, ctx = null;
  /* étiquette BCP-47 du cours actif ; le thaï reste le repli */
  function etiquette(){
    try{ return (coursActif().voix) || 'th-TH'; }catch(e){ return 'th-TH'; }
  }
  /* Voix fantaisie d'Apple : elles répondent à la bonne langue mais sonnent
     comme un dessin animé. Sans ce filtre, le chinois tombait sur « Eddy ». */
  const FANTAISIE = /^(eddy|flo|grandma|grandpa|reed|rocko|sandy|shelley|bubbles|jester|superstar|trinoids|bells|boing|bad news|good news|wobble|whisper|organ|cellos|zarvox|albert|bahh|junior|ralph|kathy|fred|princess|deranged|hysterical|alice|bruce)\b/i;
  const SOIGNEE  = /(siri|premium|enhanced|neural|natural|amélior)/i;

  function noteVoix(v, tag){
    let n = 0;
    if(v.lang.toLowerCase() === tag.toLowerCase()) n += 10;        // zh-CN, pas zh-TW
    if(SOIGNEE.test(v.name)) n += 4;
    if(FANTAISIE.test(v.name)) n -= 20;
    if(v.default) n += 1;
    return n;
  }
  /* liste des voix utilisables pour la langue du cours, la meilleure d'abord */
  function voixDisponibles(){
    if(!('speechSynthesis' in window)) return [];
    const tag = etiquette(), racine = tag.split('-')[0];
    const toutes = speechSynthesis.getVoices()
      .filter(v => new RegExp('^'+racine+'(-|_|$)','i').test(v.lang));
    /* cours sans choixVoix (le thaï) : règle d'origine, la première voix de la
       langue, sans tri ni filtre — rien ne doit changer pour lui */
    let avance = false;
    try{ avance = !!coursActif().choixVoix; }catch(e){}
    if(!avance) return toutes;
    /* les voix fantaisie ne sont jamais un bon choix pour apprendre : on ne les
       propose pas du tout, sauf s'il ne restait rien d'autre */
    const serieuses = toutes.filter(v => !FANTAISIE.test(v.name));
    return (serieuses.length ? serieuses : toutes)
      .sort((a,b) => noteVoix(b,tag) - noteVoix(a,tag));
  }
  function voixChoisie(){
    try{
      if(!coursActif().choixVoix) return null;
      return (Store.get().voix || {})[etiquette()] || null;
    }catch(e){ return null; }
  }
  function pickVoice(){
    if(!('speechSynthesis' in window)) return;
    const dispo = voixDisponibles();
    const voulue = voixChoisie();
    const found = (voulue && dispo.find(v=>v.name === voulue)) || dispo[0] || null;
    const changed = !!found !== !!voice;
    voice = found;
    if(changed && typeof window.onThaiVoiceChange === 'function') window.onThaiVoiceChange();
  }
  if('speechSynthesis' in window){
    pickVoice();
    speechSynthesis.onvoiceschanged = pickVoice;
  }
  function speak(text, rate){
    if(!('speechSynthesis' in window)) return false;
    if(rate===undefined) rate = (typeof Store!=='undefined' && Store.get().slowAudio) ? 0.5 : 0.85;
    try{
      speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(text);
      u.lang=etiquette(); u.rate=rate; if(voice) u.voice=voice;
      speechSynthesis.speak(u);
      return true;
    }catch(e){ return false; }
  }
  function tone(freq, dur, type='sine', gain=0.06, delay=0, freqFin){
    if(typeof Store!=='undefined' && !Store.get().soundOn) return;
    try{
      ctx = ctx || new (window.AudioContext||window.webkitAudioContext)();
      if(ctx.state === 'suspended') ctx.resume();     // iOS suspend le son hors interaction
      const o = ctx.createOscillator(), g = ctx.createGain();
      o.type = type; o.connect(g); g.connect(ctx.destination);
      const t = ctx.currentTime + delay;
      o.frequency.setValueAtTime(freq, t);
      if(freqFin) o.frequency.exponentialRampToValueAtTime(freqFin, t+dur);
      g.gain.setValueAtTime(0.0001, t);
      g.gain.exponentialRampToValueAtTime(gain, t+0.012);   // petite attaque, pas de clic
      g.gain.exponentialRampToValueAtTime(0.0001, t+dur);
      o.start(t); o.stop(t+dur+0.02);
    }catch(e){}
  }
  /* --- reconnaissance vocale (prononciation) --- */
  const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  function canListen(){ return !!SR; }
  function listen(onResult, onEnd){
    if(!SR) return null;
    let rec;
    try{ rec = new SR(); }catch(e){ return null; }
    rec.lang=etiquette(); rec.interimResults=false; rec.maxAlternatives=3;
    rec.onresult = ev=>{
      const alts = [...ev.results[0]].map(r=>r.transcript);
      onResult(alts);
    };
    rec.onerror = ()=> onEnd && onEnd('error');
    rec.onend   = ()=> onEnd && onEnd('end');
    try{ rec.start(); }catch(e){ return null; }
    return rec;
  }

  /* iOS n'autorise le son qu'après un geste de l'utilisateur : on débloque
     la synthèse vocale et le contexte audio au tout premier appui. */
  function unlock(){
    try{
      ctx = ctx || new (window.AudioContext||window.webkitAudioContext)();
      if(ctx.state === 'suspended') ctx.resume();
    }catch(e){}
    try{
      if('speechSynthesis' in window){
        const u = new SpeechSynthesisUtterance(' ');
        u.volume = 0; speechSynthesis.speak(u);
      }
    }catch(e){}
    document.removeEventListener('touchend', unlock);
    document.removeEventListener('click', unlock);
  }
  document.addEventListener('touchend', unlock, {once:false});
  document.addEventListener('click', unlock, {once:false});

  return {
    speak, canListen, listen, unlock,
    hasThaiVoice(){ return !!voice; },
    voixDisponibles, rafraichirVoix:pickVoice,
    voixActuelle(){ return voice ? voice.name : null; },
    /* validation : deux notes qui montent, timbre doux */
    good(){ unlock(); tone(784,.11,'triangle',.16); tone(1175,.20,'triangle',.14,.09); },
    /* erreur : note grave qui retombe */
    bad(){ unlock(); tone(311,.14,'square',.10); tone(233,.26,'square',.09,.10,175); },
    win(){ unlock(); [523,659,784,1046].forEach((f,i)=>tone(f,.24,'triangle',.13,i*.10)); },
    tap(){ tone(880,.04,'sine',.05); }
  };
})();
