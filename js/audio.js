/* Audio : voix thaïe (Web Speech) + effets sonores générés (Web Audio, zéro fichier) */
const Audio_ = (()=>{
  let voice = null, ctx = null;
  function pickVoice(){
    if(!('speechSynthesis' in window)) return;
    const vs = speechSynthesis.getVoices();
    const found = vs.find(v=>/^th(-|_)?/i.test(v.lang)) || null;
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
      u.lang='th-TH'; u.rate=rate; if(voice) u.voice=voice;
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
    rec.lang='th-TH'; rec.interimResults=false; rec.maxAlternatives=3;
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
    /* validation : deux notes qui montent, timbre doux */
    good(){ unlock(); tone(784,.11,'triangle',.16); tone(1175,.20,'triangle',.14,.09); },
    /* erreur : note grave qui retombe */
    bad(){ unlock(); tone(311,.14,'square',.10); tone(233,.26,'square',.09,.10,175); },
    win(){ unlock(); [523,659,784,1046].forEach((f,i)=>tone(f,.24,'triangle',.13,i*.10)); },
    tap(){ tone(880,.04,'sine',.05); }
  };
})();
