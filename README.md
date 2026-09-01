# ThaiLingo

Application web pour apprendre le thaï, dans l'esprit de Duolingo. En français,
sans compte, sans serveur : tout tourne dans le navigateur.

**Ouvrir :** https://kayzonee.github.io/thailingo/

Sur iPhone : ouvrir le lien dans Safari, puis **Partager → Sur l'écran d'accueil**,
et lancer l'app par son icône (une app installée a son propre stockage).

## Ce qu'elle contient

- **Deux cours** au choix dans le profil : thaï depuis le français, thaï depuis l'anglais.
  Chacun garde sa propre progression.
- **Trois paliers** — Débutant, Élémentaire, Intermédiaire : 463 mots, 143 phrases,
  30 unités de langue et un parcours d'écriture séparé (alphabet complet — 44 consonnes
  avec leur classe de ton, voyelles, signes de ton — puis les règles de ton) ;
- 12 types d'exercices : reconnaissance, sens inverse, écoute, dictée, paires,
  traduction avec banque de mots dans les deux sens, texte à trous, alphabet,
  épellation au clavier thaï, prononciation au micro, règles de ton ;
- romanisation systématique sous chaque mot thaï ;
- trois vies par leçon, XP, série, quêtes du jour, couronnes, mode légendaire ;
- révision espacée (boîtes de Leitner) alimentée par les leçons terminées,
  et entrelacement des acquis dans chaque nouvelle leçon.

## Progression

Trois filets, du plus automatique au plus manuel :

1. **Sauvegarde en ligne**, active dès la première ouverture. Chaque personne reçoit une
   identité anonyme et son propre document ; la progression y est écrite après chaque
   leçon et relue au démarrage. Les règles du serveur interdisent l'accès au document
   d'autrui. Profil → **Rattacher mon adresse** lie cette identité à une adresse e-mail
   (lien de connexion, sans mot de passe) : la progression se retrouve alors sur
   n'importe quel appareil.
2. **Stockage du navigateur**, instantané, utilisé hors connexion.
3. **Code de sauvegarde** (Profil → *Sauvegarder*) : un texte à coller dans une note,
   un lien de restauration partageable, et un fichier à ranger dans iCloud Drive.

## Tests

```bash
node tests/run.js     # contenu, exercices, progression, sauvegarde
```

et `tests/ui.html` servi en HTTP pour les tests d'interface.
