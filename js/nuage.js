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
  let enCours = null;               // promesse d'authentification partagée

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
  async function rafraichir(){
    const r = await fetch(JETON+cle, { method:'POST',
      headers:{'Content-Type':'application/x-www-form-urlencoded'},
      body:'grant_type=refresh_token&refresh_token=' + encodeURIComponent(session.refreshToken) });
    const d = await r.json();
    if(d.error){ oublier(); return creerAnonyme(); }
    retenir(Object.assign({}, session, { idToken:d.id_token, refreshToken:d.refresh_token,
      uid:d.user_id, expire: Date.now() + (+d.expires_in - 60)*1000 }));
    return session;
  }
  /* garantit une session valide ; une seule demande à la fois */
  function auth(){
    if(enCours) return enCours;
    enCours = (async ()=>{
      try{
        if(!session || !session.refreshToken) return await creerAnonyme();
        if(Date.now() >= (session.expire||0)) return await rafraichir();
        return session;
      } finally { enCours = null; }
    })();
    return enCours;
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
    return true;
  }
  function totalXp(etat){
    if(!etat || !etat.cours) return etat && etat.xp || 0;
    return Object.values(etat.cours).reduce((a,c)=>a+(c.xp||0), 0);
  }

  /* --- rattacher une adresse e-mail --- */
  async function envoyerLien(email){
    const s = await auth();
    await poster(IDENT+':sendOobCode'+cle, {
      requestType:'EMAIL_SIGNIN', email,
      continueUrl: location.origin + location.pathname,
      canHandleCodeInApp:true
    });
    try{ localStorage.setItem('thailingo.email', email); }catch(e){}
    return true;
  }
  /* au retour du lien reçu par courriel : on rattache l'identité anonyme au compte */
  async function terminerConnexion(email, oobCode){
    const s = session;
    const corps = { email, oobCode };
    if(s && s.idToken && !s.email) corps.idToken = s.idToken;   // rattachement du compte anonyme
    let d;
    try{ d = await poster(IDENT+':signInWithEmailLink'+cle, corps); }
    catch(e){
      if(!corps.idToken) throw e;
      delete corps.idToken;                       // déjà rattaché ailleurs : simple connexion
      d = await poster(IDENT+':signInWithEmailLink'+cle, corps);
    }
    retenir({ idToken:d.idToken, refreshToken:d.refreshToken, uid:d.localId, email:d.email,
              expire: Date.now() + (+d.expiresIn - 60)*1000 });
    try{ localStorage.removeItem('thailingo.email'); }catch(e){}
    return session;
  }

  /* efface le document en ligne (réinitialisation demandée par l'utilisateur) */
  async function effacer(){
    const s = await auth();
    await fetch(`${DOCS}/sauvegardes/${s.uid}`, { method:'DELETE',
      headers:{Authorization:'Bearer '+s.idToken} });
    return true;
  }
  /* supprime l'identité elle-même — utilisé par les tests */
  async function supprimerCompte(){
    const s = session;
    if(!s || !s.idToken) return false;
    await poster(IDENT+':delete'+cle, {idToken:s.idToken});
    oublier();
    return true;
  }

  return {
    auth, lire, ecrire, envoyerLien, terminerConnexion, oublier, effacer, supprimerCompte,
    session(){ return session; },
    email(){ return session && session.email; },
    uid(){ return session && session.uid; },
    /* un lien de connexion est-il présent dans l'adresse ? */
    lienDansUrl(){
      const p = new URLSearchParams(location.search);
      return (p.get('mode') === 'signIn' && p.get('oobCode')) ? p.get('oobCode') : null;
    },
    emailEnAttente(){ try{ return localStorage.getItem('thailingo.email'); }catch(e){ return null; } }
  };
})();
