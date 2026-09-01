# ThaiLingo sur iPhone

## L'adresse à utiliser

**https://kayzonee.github.io/thailingo/**

Hébergée sur ton propre compte GitHub, indépendante de Claude. Je n'y touche que
pour publier une mise à jour.

1. Ouvrir le lien dans **Safari**.
2. **Partager → Sur l'écran d'accueil**.
3. Lancer l'app par l'icône 🐘 (une app installée a son propre stockage, séparé
   de celui de Safari : ce qui est joué dans l'un ne se retrouve pas dans l'autre).

L'app fonctionne ensuite **hors connexion** : tout est mis en cache au premier
chargement.

## Pourquoi c'est plus solide que la page Claude

| | page Claude | GitHub Pages |
|---|---|---|
| Dépend d'un compte | oui | non |
| Contexte | cadre sur une autre origine → **stockage tiers**, restreint par Safari | page à part entière → **stockage first-party** |
| Hors-ligne | non | oui (service worker) |
| Sauvegarde en fichier (iCloud) | interdite par le bac à sable | oui |

L'ancienne page Claude reste en ligne et à jour, mais c'est un **stockage distinct** :
la progression de l'une n'est pas celle de l'autre. Choisis-en une, et transfère avec
le code de sauvegarde si besoin.

## Conserver sa progression

Elle est écrite sur le téléphone après chaque leçon, et **enregistrée en ligne** dans la
foulée : chaque personne qui ouvre le lien reçoit sa propre identité et son propre
document, invisible des autres.

Le Profil indique la date de la dernière sauvegarde en ligne. Deux boutons suffisent :

- **Mon code de récupération** — un code à garder dans une note. Il rétablit la
  progression sur un nouveau téléphone, ou après un effacement des données de Safari.
  Il vaut mot de passe : à ne transmettre à personne.
- **Restaurer avec un code** — sur le nouvel appareil, coller le code.

Sur iPhone, mieux vaut lancer l'app par son icône : une app installée sur l'écran
d'accueil a son propre stockage, distinct de celui de Safari.

## Mettre à jour

```bash
cd ~/claude-worklog/thai-duolingo/pages && git push
```

GitHub met ses fichiers en cache 10 minutes : une mise à jour peut mettre ce
temps-là à apparaître. La progression n'est jamais touchée par une mise à jour.
