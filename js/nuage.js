/* ============================================================
   Sauvegarde en ligne (Firebase) — sans SDK, par appels REST.
   Chacun reçoit une identité anonyme à la première ouverture ;
   sa progression est écrite dans un document qui lui appartient.
   Rattacher une adresse e-mail permet de la retrouver ailleurs.
   Les règles Firestore interdisent l'accès au document d'autrui.
   ============================================================ */
const FIREBASE = {
  apiKey:'AIzaSyDDUB8qXeFhVRo_cfEtBrPhZCVDdaRpiQw',
  projectId:'thailingo-44a2b',
  authDomain:'thailingo-44a2b.firebaseapp.com'
};
const CLE_AUTH = 'thailingo.auth';

const Nuage = (()=>{
  const IDENT = 'https://identitytoolkit.googleapis.com/v1/accounts';
  const JETON = 'https://securetoken.googleapis.com/v1/token';
  const DOCS  = `https://firestore.googleapis.com/v1/projects/${FIREBASE.projectId}/databases/(default)/documents`;
  const cle = '?key=' + FIREBASE.apiKey;

  let session = charger();          // {idToken, refreshToken, uid, email, expire}
  /* Toutes les opérations qui touchent la session passent par cette file :
     sans elle, une sauvegarde de fond peut annuler une reprise en cours. */
  let file = Promise.resolve();
  function serialiser(fn){
    const suite = file.then(fn, fn);
    file = suite.then(()=>{}, ()=>{});
    return suite;
  }

  function charger(){
    try{ return JSON.parse(localStorage.getItem(CLE_AUTH)) || null; }catch(e){ return null; }
  }
  function retenir(s){
    session = s;
    try{ localStorage.setItem(CLE_AUTH, JSON.stringify(s)); }catch(e){}
  }
  function oublier(){
    session = null;
    try{ localStorage.removeItem(CLE_AUTH); }catch(e){}
  }
  async function poster(url, corps){
    const r = await fetch(url, { method:'POST', headers:{'Content-Type':'application/json'},
                                body:JSON.stringify(corps) });
    const d = await r.json();
    if(d.error) throw Object.assign(new Error(d.error.message || 'erreur'), {code:d.error.message});
    return d;
  }

  /* --- identité --- */
  async function creerAnonyme(){
    const d = await poster(IDENT+':signUp'+cle, {returnSecureToken:true});
    retenir({ idToken:d.idToken, refreshToken:d.refreshToken, uid:d.localId, email:null,
              expire: Date.now() + (+d.expiresIn - 60)*1000 });
    return session;
  }
  async function rafraichir(strict){
    const r = await fetch(JETON+cle, { method:'POST',
      headers:{'Content-Type':'application/x-www-form-urlencoded'},
      body:'grant_type=refresh_token&refresh_token=' + encodeURIComponent(session.refreshToken) });
    const d = await r.json();
    if(d.error){
      if(strict) throw new Error(d.error.message || 'jeton refusé');
      oublier(); return creerAnonyme();
    }
    retenir(Object.assign({}, session, { idToken:d.id_token, refreshToken:d.refresh_token,
      uid:d.user_id, expire: Date.now() + (+d.expires_in - 60)*1000 }));
    return session;
  }
  /* garantit une session valide, une opération à la fois */
  function auth(){
    return serialiser(async ()=>{
      if(!session || !session.refreshToken) return await creerAnonyme();
      if(Date.now() >= (session.expire||0)) return await rafraichir();
      return session;
    });
  }

  /* --- document de sauvegarde --- */
  async function lire(){
    const s = await auth();
    const r = await fetch(`${DOCS}/sauvegardes/${s.uid}`, {headers:{Authorization:'Bearer '+s.idToken}});
    if(r.status === 404) return null;              // rien encore enregistré
    const d = await r.json();
    if(d.error) throw new Error(d.error.message);
    const brut = d.fields && d.fields.donnees && d.fields.donnees.stringValue;
    if(!brut) return null;
    try{ return JSON.parse(brut); }catch(e){ return null; }
  }
  async function ecrire(etat){
    const s = await auth();
    const corps = { fields:{
      donnees:{ stringValue: JSON.stringify(etat) },
      xp:{ integerValue: String(totalXp(etat)) },
      maj:{ timestampValue: new Date().toISOString() },
      profil:{ stringValue: String(etat.profil || '') }
    }};
    const r = await fetch(`${DOCS}/sauvegardes/${s.uid}`, { method:'PATCH',
      headers:{Authorization:'Bearer '+s.idToken, 'Content-Type':'application/json'},
      body:JSON.stringify(corps) });
    const d = await r.json();
    if(d.error) throw new Error(d.error.message);
    if(typeof Store !== 'undefined' && Store.marquerEnLigne) Store.marquerEnLigne();
    return true;
  }
  function totalXp(etat){
    if(!etat || !etat.cours) return etat && etat.xp || 0;
    return Object.values(etat.cours).reduce((a,c)=>a+(c.xp||0), 0);
  }


  /* efface le document en ligne (réinitialisation demandée par l'utilisateur) */
  async function effacer(){
    const s = await auth();
    await fetch(`${DOCS}/sauvegardes/${s.uid}`, { method:'DELETE',
      headers:{Authorization:'Bearer '+s.idToken} });
    return true;
  }
  /* supprime l'identité elle-même — utilisé par les tests */
  function supprimerCompte(){
    return serialiser(async ()=>{
      const s = session;
      if(!s || !s.idToken) return false;
      await poster(IDENT+':delete'+cle, {idToken:s.idToken});
      oublier();
      return true;
    });
  }

  /* --- code de récupération ---
     Un seul code pour les deux situations : nouveau téléphone, ou données
     effacées par le navigateur. Il porte le jeton d'identité — qui permet de
     retrouver la sauvegarde en ligne, toujours à jour — ET une copie de la
     progression, qui sert de repli si le serveur ne répond pas.
     Ce code vaut mot de passe : qui l'a, a la progression. */
  async function codeRecuperation(etat){
    let rt = null;
    try{ const s = await auth(); rt = s && s.refreshToken; }catch(e){}
    return btoa(unescape(encodeURIComponent(JSON.stringify({ v:2, rt, sv:etat || null }))));
  }
  function lireCode(code){
    try{ return JSON.parse(decodeURIComponent(escape(atob(String(code).trim())))); }
    catch(e){ return null; }
  }
  /* rend {etat, identite} : l'état à adopter, et si l'identité a été reprise */
  async function reprendreAvecCode(code){
    const d = lireCode(code);
    if(!d) throw new Error('CODE_ILLISIBLE');
    /* ancien format : le code contenait directement la sauvegarde */
    if(!d.rt && !d.sv){
      if(d.cours || d.progress) return { etat:d, identite:false };
      throw new Error('CODE_ILLISIBLE');
    }
    let identite = false;
    if(d.rt){
      identite = await serialiser(async ()=>{
        const precedente = session;
        session = { idToken:null, refreshToken:d.rt, uid:null, email:null, expire:0 };
        try{ await rafraichir(true); return true; }
        catch(e){ if(precedente) retenir(precedente); else oublier(); return false; }
      });
    }
    let etat = d.sv || null;
    if(identite){
      try{ const distant = await lire(); if(distant) etat = distant; }catch(e){}
    }
    if(!etat) throw new Error('CODE_REFUSE');
    return { etat, identite };
  }

  return {
    auth, lire, ecrire, oublier, effacer, supprimerCompte,
    codeRecuperation, reprendreAvecCode,
    session(){ return session; },
    uid(){ return session && session.uid; },
    email(){ return session && session.email; }
  };
})();
