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

Elle est écrite sur le téléphone, jamais envoyée ailleurs. Trois filets, du plus
simple au plus sûr :

1. **Ouvrir l'app régulièrement.** Safari purge le stockage d'un site resté 7 jours
   sans visite ; chaque ouverture remet ce compteur à zéro, et une app installée sur
   l'écran d'accueil n'est pas traitée comme un site visité en passant.
2. **Profil → Sauvegarder → Enregistrer dans Fichiers** : un fichier `.json` rangé
   dans iCloud Drive. C'est la sauvegarde durable ; « Ouvrir un fichier » la recharge.
3. **Le code de sauvegarde** : un texte de ~450 caractères à coller dans une note,
   avec un lien de restauration partageable. L'app le réclame au bout de 7 jours.

### Un profil par appareil

La progression est propre au navigateur qui l'a créée. Si tu partages le lien, la
personne qui l'ouvre démarre à zéro sur son propre téléphone — sans jamais voir ni
toucher la tienne. Le code de sauvegarde ne vaut donc que pour le profil qui l'a
produit (Profil → le nom du profil apparaît dans le fichier exporté).

### Pourquoi pas le repo comme espace de sauvegarde

Écrire dans un dépôt GitHub depuis la page demanderait d'y placer un jeton d'accès —
donc de publier un secret qui donne les pleins droits sur le compte. C'est exclu.
Un vrai stockage en ligne synchronisé entre appareils demanderait un service tiers
(Firebase, Supabase…) avec un compte et des règles d'accès : faisable si tu veux
un jour jouer sur plusieurs appareils, inutile pour un seul iPhone.

## Mettre à jour

```bash
cd ~/claude-worklog/thai-duolingo/pages && git push
```

GitHub met ses fichiers en cache 10 minutes : une mise à jour peut mettre ce
temps-là à apparaître. La progression n'est jamais touchée par une mise à jour.
