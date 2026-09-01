# ThaiLingo — plan de la version 2 (cadrage, à valider)

Décisions déjà prises par l'utilisateur : backend multi-utilisateur, quatre cours
(FR→TH, TH→FR, EN→TH, TH→EN) choisis dans les réglages, extension du contenu jusqu'à
un niveau avancé — sans idiomes ni registres soutenus. La version française actuelle
est verrouillée (tag `fr-1.0`) et ne bouge pas.

## 1. Identification des utilisateurs

**L'adresse IP est à exclure**, sans hésitation : elle change à chaque bascule
Wi-Fi/4G, elle est partagée entre tous les abonnés derrière une même box ou un même
relais mobile, et c'est une donnée personnelle qu'il faudrait justifier de traiter.
Elle n'identifie ni une personne ni un appareil.

Modèle retenu — le même que Duolingo :

| Qui | Identité | Ce qui se passe |
|---|---|---|
| Un testeur | anonyme, créée toute seule à l'ouverture | sauvegarde côté serveur, zéro friction, zéro compte. S'il efface Safari, il repart de zéro — sans importance |
| L'utilisateur | compte rattaché à son e-mail | progression récupérable sur n'importe quel appareil, indéfiniment |

Le rattachement se fait depuis le profil (« Sécuriser ma progression »), par **lien de
connexion envoyé par e-mail** : pas de mot de passe à retenir, pas de mot de passe à
perdre. L'identité anonyme déjà en place est convertie, la progression est conservée.

## 2. Quel service

| | Firebase (Firestore + Auth) | Supabase |
|---|---|---|
| Coût | 0 | 0 |
| Quotas gratuits | 50 000 lectures et 20 000 écritures par jour, 1 Gio | 500 Mo de base, 50 000 utilisateurs actifs/mois |
| Mise en veille | **aucune** | **projet mis en pause après 1 semaine d'inactivité** |
| Authentification | anonyme + lien e-mail, incluse | anonyme + lien e-mail, incluse |

→ **Firebase**, pour une seule raison décisive : Supabase met un projet gratuit en
pause après une semaine sans activité. Une app d'apprentissage laissée de côté
pendant les vacances se réveillerait avec un backend éteint, et les testeurs qui
ouvrent le lien après une accalmie tomberaient sur un service muet.

Notre usage : quelques écritures par personne et par jour. Les quotas gratuits sont
deux ordres de grandeur au-dessus.

### Ce que je ne peux pas faire à ta place

Créer le compte et le projet Firebase — je ne crée jamais de compte ni ne saisis
d'identifiants. Les étapes, une fois :

1. console.firebase.google.com → **Créer un projet** (nom : `thailingo`), sans Analytics.
2. **Build → Firestore Database → Créer** (mode production, région `eur3`).
3. **Build → Authentication → Commencer** → activer **Anonyme** et **E-mail/Mot de passe**
   (dans ce dernier, cocher *Lien de connexion par e-mail*).
4. **Paramètres du projet → Vos applications → Web (`</>`)** → enregistrer l'app,
   puis me transmettre le bloc `firebaseConfig`.

Ce bloc est **public par construction** : il ne donne aucun droit par lui-même.
La protection vient des règles de sécurité, que j'écris et que tu colles :
chaque personne ne peut lire et écrire que son propre document, rien d'autre.

## 3. Sauvegarde automatique

Une fois le backend en place : écriture silencieuse à chaque fin de leçon, lecture au
démarrage, et fusion prudente si l'appareil et le serveur divergent (le plus avancé
gagne, jamais d'écrasement silencieux vers le bas). Le code de sauvegarde et le
fichier iCloud restent, en secours hors ligne.

## 4. Quatre cours

Un cours = une langue d'interface + une langue enseignée + son contenu.
Progression séparée par cours, comme chez Duolingo.

- `fr-th` — français → thaï (l'existant, intact)
- `en-th` — anglais → thaï
- `th-fr` — thaï → français (pour un thaïlandais)
- `th-en` — thaï → anglais

Conséquences sur le code : sortir le contenu du moteur (un fichier par cours, chargé
à la demande), traduire l'interface (une table de chaînes par langue), et ranger la
progression par cours dans la sauvegarde. Le moteur d'exercices ne change pas.

## 5. Contenu, jusqu'où et comment

Cinq paliers, sans idiomes ni registres soutenus :

| Palier | Cible | Vocabulaire cumulé | Ce qui s'y joue |
|---|---|---|---|
| Débutant | A1 | ~400 mots | salutations, nombres, nourriture, déplacements, alphabet |
| Élémentaire | A2 | ~900 mots | passé/futur, classificateurs, quantités, santé, achats |
| Intermédiaire | B1 | ~1 600 mots | subordination, opinions, récits, travail, administratif |
| Avancé | B2 | ~2 400 mots | argumentation, nuances, actualité, textes suivis |
| Expert | C1 | ~3 200 mots | lecture courante sans romanisation, sujets techniques |

**Livraison par tranches** : un palier livré, testé, puis le suivant. Chaque tranche
est jouable et n'attend pas les autres.

**Ce que je dois annoncer honnêtement** : je réponds du vocabulaire courant, de la
romanisation avec tons, des règles d'écriture et de la grammaire de base. Plus le
niveau monte, plus une relecture par un locuteur natif devient souhaitable —
non pour corriger des fautes grossières, mais pour le naturel des tournures.
Les tests automatiques vérifient la forme (romanisation présente, références valides,
pas de doublon), jamais le naturel.

## 6. Hébergement

GitHub Pages reste le bon choix, y compris pour ce volume : 1 Go de site publié et
100 Go de bande passante par mois, là où l'app entière avec 3 000 mots pèsera
quelques mégaoctets. Rien à changer, rien à payer.

## 7. Ordre proposé

1. Architecture multi-cours + interface traduisible (aucun contenu nouveau) — ne dépend de personne.
2. Cours `en-th` (l'existant, en anglais).
3. Backend Firebase + sauvegarde automatique — **dépend de ta configuration**.
4. Cours `th-fr` puis `th-en`.
5. Extension du contenu, un palier à la fois.

Les étapes 1 et 2 peuvent commencer immédiatement ; la 3 attend ton `firebaseConfig`.
