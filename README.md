# ThaiLingo

Application web d'apprentissage du thaï, dans l'esprit de Duolingo. En français ou en
anglais, sans compte, sans installation, sans dépendance : tout tient dans des fichiers
statiques et l'API du navigateur.

**En ligne :** <https://kayzonee.github.io/thailingo/>
**Dépôt :** <https://github.com/Kayzonee/thailingo> (branche `main`, GitHub Pages sert la racine)

> Ce dépôt est la **source de vérité**. Tout se modifie ici, se teste ici, se déploie d'ici.

---

## 1. État actuel

| | |
|---|---|
| Cours | `fr-th` (thaï depuis le français), `en-th` (thaï depuis l'anglais) |
| Contenu | 463 mots, 143 phrases, 32 unités, 106 leçons |
| Paliers | A1 Débutant, A2 Élémentaire, B1 Intermédiaire |
| Écriture | alphabet complet (44 consonnes avec classe de ton, 10 voyelles, 4 signes) + 11 règles de ton |
| Sauvegarde | locale + en ligne (Firebase), avec un code de récupération |
| Tests | 51 tests Node + 23 tests d'interface, tous verts |

**Il reste deux chantiers**, décrits en §7 : les cours `th-fr` / `th-en`, et les paliers B2 / C1.

---

## 2. Lancer et tester

```bash
python3 -m http.server 8777        # depuis la racine du dépôt
```

- l'app : <http://localhost:8777/index.html>
- tests d'interface : <http://localhost:8777/tests/ui.html> (ils jouent des scénarios dans l'app réelle, dans une iframe)

```bash
node tests/run.js                  # 47 tests : contenu, traductions, exercices, progression, sauvegarde
```

**Les deux suites doivent passer avant tout déploiement.** Celle de Node contient des
tests d'intégrité du source qui ont déjà rattrapé de vraies casses (voir §8).

---

## 3. Organisation des fichiers

| Fichier | Rôle |
|---|---|
| `index.html` | page unique ; l'ordre de chargement des scripts compte |
| `i18n/strings.js` | **toute** l'interface, en `fr` et `en` (~170 clés). `T('cle', {valeurs})` |
| `js/contenu.js` | agrège les paliers ; expose `LEX`, `SENT`, `SCRIPT`, `TONE_RULES`, `CURRICULUM`, `SECTIONS`, `UNITES_LANGUE`, `UNITES_ECRITURE`, `romDe()`, `glose()`, `txt()` |
| `cours/registre.js` | définition des cours et chargement à la demande de leurs fichiers |
| `cours/thai-a1.js`, `-a2.js`, `-b1.js` | le contenu, un fichier par palier |
| `js/state.js` | sauvegarde versionnée (schéma 6) : réglages globaux, progression **par cours** |
| `js/nuage.js` | sauvegarde en ligne Firebase, **par API REST, sans SDK** |
| `js/audio.js` | synthèse vocale th-TH, effets sonores générés, reconnaissance vocale |
| `js/engine.js` | génération des exercices (12 types), distracteurs, difficulté par niveau |
| `js/app.js` | écrans, exercices, navigation |
| `css/styles.css` | tout le style, thème clair/sombre |
| `sw.js` | cache hors-ligne, **réseau d'abord** |
| `versionner.js` | appose un numéro de version sur les fichiers appelés par `index.html` |

### Trois fonctions à connaître avant de toucher au code

- `T('cle', {n:3})` — une chaîne d'**interface**. Jamais de texte en dur dans `app.js`.
- `glose(mot)` — le sens d'un mot ou d'une phrase **dans la langue du cours** (`mot.fr` ou `mot.en`).
- `txt(libelle)` — un libellé de **contenu** (`{fr:'…', en:'…'}`), pour les titres d'unités et de leçons.

Un test échoue si une clé de traduction est orpheline, si une clé manque dans une des
deux langues, ou si une traduction anglaise est restée en français.

---

## 4. Le contenu, format exact

Chaque fichier de palier appelle `ajouterPalier({...})`, plusieurs fois si besoin.
`finaliserContenu()` fusionne le tout dans l'ordre `a1, a2, b1, b2, c1`.

```js
ajouterPalier({
  palier:'a2',
  lexique:{
    // identifiant : écriture thaïe, romanisation AVEC TONS, glose fr, glose en, emoji
    mae:{ th:'แม่', rom:'mɛ̂ɛ', fr:'mère', en:'mother', emoji:'👩' }
  },
  phrases:{
    // chunks = découpage en mots (le thaï s'écrit sans espaces) : sert aux banques de mots
    a2_sick:{ chunks:['ผม','ป่วย','ครับ'], rom:'phǒm pùai khráp',
              fr:'Je suis malade', en:'I am sick' }
  },
  romanisations:{ 'ของ':'khɔ̌ɔng' },     // pour les mots de phrases absents du lexique
  sections:[{ id:'sec-a2', titre:{fr:'Élémentaire', en:'Elementary'},
              sousTitre:{fr:'…', en:'…'}, unites:['a2u1','a2u2'], couleur:'#1CB0F6' }],
  unites:[{
    id:'a2u1', title:{fr:'Le corps', en:'The body'}, subtitle:{fr:'…', en:'…'},
    color:'#FF4B4B', icon:'🩺',
    lessons:[
      { id:'a2u1l1', title:{fr:'Le corps', en:'Body parts'},
        words:['hua','ta_eye'], sentences:['a2_headache'] }
    ]
  }]
});
```

Une unité d'**écriture** porte `ecriture:true`, et ses leçons utilisent `script:[index…]`
(indices dans `SCRIPT`) ou `tones:[index…]` (indices dans `TONE_RULES`) au lieu de
`words`/`sentences`.

### Règles que les tests font respecter

- chaque mot a `th`, `rom`, `fr`, `en`, `emoji`, et `th` est bien en caractères thaïs ;
- **aucun doublon d'écriture thaïe** dans tout le lexique ;
- chaque phrase a `chunks`, `rom`, `fr`, `en` ;
- tout mot thaï affiché a une romanisation (`romDe()` ne doit jamais rendre vide) ;
- toute leçon référence du contenu existant ;
- **aucun mot n'est enseigné nulle part** : chaque entrée du lexique apparaît dans au moins une leçon ;
- les sections couvrent tout le parcours de langue, sans doublon ;
- langue et écriture restent deux parcours disjoints.

---

## 5. Sauvegarde

**Localement** — `localStorage`, clé `thailingo.save`, schéma 6. Les réglages (thème, son,
objectif, série, historique) sont globaux ; la progression (XP, couronnes, mots mémorisés,
reprise) est rangée **par cours** sous `cours['fr-th']`. `migrer()` reprend les schémas
antérieurs : ne jamais casser cette chaîne.

**En ligne** — projet Firebase `thailingo-44a2b`, appelé en REST (aucun SDK chargé).

- chaque visiteur reçoit une **identité anonyme** à la première ouverture ;
- sa progression est écrite dans `sauvegardes/{uid}` après chaque leçon et à l'ouverture du profil ;
- les règles Firestore interdisent l'accès au document d'autrui :

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /sauvegardes/{uid} {
      allow read, write: if request.auth != null && request.auth.uid == uid;
    }
  }
}
```

Vérifié en conditions réelles : écriture et relecture par le propriétaire ✅ ; lecture du
document d'un autre ✋ `PERMISSION_DENIED` ; accès non authentifié ✋ `PERMISSION_DENIED`.

La configuration dans `js/nuage.js` est **publique par construction** — c'est le cas de
toute application web Firebase, la protection vient des règles. **Ne jamais ajouter au
dépôt une clé de compte de service** (`private_key`) : un test échoue si l'on en trouve une.

**Code de récupération** — un seul code, obtenu depuis le Profil, qui porte à la fois le
jeton d'identité (donc l'accès à la sauvegarde en ligne, toujours à jour) et une copie de
la progression (repli si le serveur ne répond pas). Il couvre les deux cas réels :
nouveau téléphone, et effacement des données par Safari. **Il vaut mot de passe.**

Le rattachement par lien e-mail a été retiré : Firebase envoie bien le message, mais il
n'arrive pas chez iCloud (filtrage silencieux d'un expéditeur `firebaseapp.com` sans
réputation). Ne pas le réintroduire sans configurer un serveur d'envoi dédié.

---

## 6. Déployer

```bash
node tests/run.js                  # doit être vert
# puis les tests d'interface dans le navigateur : tests/ui.html
node versionner.js "$(date +%Y%m%d-%H%M)"   # indispensable, voir §8
git add -A && git commit -m "…" && git push
```

GitHub Pages met **jusqu'à dix minutes** à servir la nouvelle version. Le service worker
travaille en réseau d'abord, mais le cache HTTP du navigateur, lui, ne se laisse pas
convaincre : c'est le rôle de `versionner.js`.

**Point de retour sûr** : la version française validée par l'utilisateur est figée sous le
tag `fr-1.0` (et publiée en release). `git checkout fr-1.0 -- .` la restaure.

---

## 7. Ce qui reste à faire

### 7.1 Les cours `th-fr` et `th-en`

Enseigner le **français** (puis l'anglais) à un thaïlandais, interface en thaï.
L'architecture est prête ; c'est le contenu qui manque.

À faire, dans l'ordre :

1. **Interface en thaï** — ajouter un bloc `th:{…}` dans `i18n/strings.js`, avec exactement
   les mêmes clés que `fr` et `en` (un test le vérifie).
2. **Lexique de la langue enseignée** — nouveaux fichiers `cours/francais-a1.js`, etc.
   Le format est le même, mais les rôles s'inversent : le mot enseigné est français, et sa
   glose est en thaï. Prévoir un champ de prononciation destiné à un lecteur thaïlandais
   (le français ne s'écrit pas comme il se prononce), là où le thaï utilisait `rom`.
3. **Déclarer les cours** dans `cours/registre.js` :
   ```js
   'th-fr': { id:'th-fr', interface:'th', cible:'fr', drapeau:'🇫🇷',
              nom:{fr:'Français — depuis le thaï', en:'French — from Thai', th:'ภาษาฝรั่งเศส'},
              fichiers:['cours/francais-a1.js', …] }
   ```
4. **Adapter le moteur là où il suppose du thaï** : `js/engine.js` traite `th`/`rom` comme
   la langue cible, et `js/app.js` affiche la romanisation sous les caractères thaïs
   (`thaiAvecRom`). Généraliser ces deux points — c'est le seul vrai travail de code.
   Les exercices d'alphabet et de tons n'ont pas de sens dans ce sens-là : l'onglet
   Écriture doit rester vide ou être masqué pour ces cours.

### 7.2 Les paliers B2 (Avancé) et C1 (Expert)

Créer `cours/thai-b2.js` et `cours/thai-c1.js` sur le modèle de `thai-b1.js`, les déclarer
dans `cours/registre.js`, et les ajouter à `ORDRE_PALIERS` s'ils n'y sont pas.

Cibles indicatives, fixées avec l'utilisateur : ~2 400 mots cumulés en B2, ~3 200 en C1.
**Sans idiomes ni registres soutenus** — c'était une demande explicite.

Livrer **un palier à la fois**, testé, plutôt qu'un gros bloc.

Un avertissement à reprendre à son compte : le vocabulaire courant, la romanisation avec
tons et la grammaire de base sont fiables ; plus le niveau monte, plus une relecture par un
locuteur natif devient souhaitable — pour le naturel des tournures, que les tests ne
vérifient pas. Les tests contrôlent la forme, jamais le naturel.

---

## 8. Choix verrouillés par l'utilisateur — ne pas les défaire

Ces points ont été décidés après essai sur son téléphone. Les remettre en cause sans le
lui demander serait une régression :

- **trois vies par leçon**, remises à neuf à chaque tentative et à chaque leçon réussie ;
  à zéro, la leçon est perdue et se recommence en entier ;
- **la romanisation est toujours affichée** sous les caractères thaïs, à tous les niveaux ;
- **l'écriture thaïe a son propre onglet**, séparé des leçons de langue ;
- **pas de ligue, pas de boutique, pas de gemmes, pas de notifications** — supprimés parce
  que fictifs ou inopérants ;
- **l'écran de sauvegarde tient en trois éléments** : la date de la dernière sauvegarde en
  ligne, « Mon code de récupération », « Restaurer avec un code ». Un test échoue si
  d'autres boutons de sauvegarde réapparaissent ;
- **toutes les leçons sont déverrouillées** par défaut (réglage dans le Profil) ;
- **la séance de révision ne pioche que dans les leçons terminées** (au moins une
  couronne), toutes confondues, et sa longueur suit l'avancement : une leçon ordinaire
  (15 exercices) plus 5 par leçon terminée supplémentaire, sans plafond. Voir
  `buildPractice()` et `tailleSeanceRevision()` dans `js/engine.js`.

## 9. Pièges déjà rencontrés — ne pas les redécouvrir

- **Les fenêtres natives (`confirm`, `alert`, `prompt`) sont bloquées** dans une page
  affichée en cadre : la croix de sortie ne répondait plus. Tout passe par les modales
  maison `dialogue()`, `info()`, `saisie()`. Ne jamais réintroduire les natives.
- **Les remplacements de texte trop gourmands** ont déjà dupliqué un bloc entier au milieu
  d'une fonction : le code restait valide et les tests passaient. D'où les tests
  d'intégrité du source (déclarations uniques, amorçage unique). Les garder.
- **Le cache** peut servir une version périmée pendant des heures, en silence, et rendre
  tout diagnostic faux. D'où `versionner.js`, à lancer avant chaque déploiement.
- **Deux opérations concurrentes sur la session** en ligne pouvaient s'annuler. Tous les
  accès passent par une file (`serialiser()` dans `js/nuage.js`).
- **`</script>` dans un littéral JavaScript** ferme la balise du fichier : l'échapper en
  `<\/script>`.
- **Les gloses entre parenthèses** (« (politesse, homme) ») polluaient les banques de mots :
  `frWords()` les retire.

## 10. Méthode attendue

L'utilisateur travaille par vérifications, pas par affirmations. Ce qui a été tenu jusqu'ici,
et qu'il vaut mieux continuer :

- **vérifier avant d'affirmer** — lancer les deux suites, ouvrir l'app, regarder l'écran ;
- **dire ce qui n'a pas pu être testé**, plutôt que de le passer sous silence ;
- **ne jamais pousser sur `main` sans son accord** ;
- **signaler les défauts trouvés en chemin**, même dans son propre travail livré plus tôt.
