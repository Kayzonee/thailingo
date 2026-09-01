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

Elle est écrite dans le navigateur, sur l'appareil. Rien n'est envoyé nulle part.
Profil → **Sauvegarder** produit un code de sauvegarde (à coller dans une note),
un lien de restauration partageable, et un fichier à ranger dans iCloud Drive.

## Tests

```bash
node tests/run.js     # contenu, exercices, progression, sauvegarde
```

et `tests/ui.html` servi en HTTP pour les tests d'interface.
