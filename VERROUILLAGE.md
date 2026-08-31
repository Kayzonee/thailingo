# Version française — verrouillée le 2026-08-31

La version française validée est figée à trois endroits indépendants. Aucun
travail ultérieur ne peut la faire disparaître.

| Où | Quoi | Comment y revenir |
|---|---|---|
| GitHub, tag `fr-1.0` | l'arbre exact publié | `git checkout fr-1.0` dans `pages/` |
| GitHub, release `fr-1.0` | archive .zip téléchargeable | https://github.com/Kayzonee/thailingo/releases/tag/fr-1.0 |
| Disque, `fr-1.0-fige/` | copie complète, jamais modifiée | copier le dossier |

**Remise en ligne de la version française, si jamais une évolution déplaît :**

```bash
cd ~/claude-worklog/thai-duolingo/pages && git checkout fr-1.0 -- . && git commit -m "Retour à la version française 1.0" && git push
```

La progression enregistrée sur le téléphone n'est **jamais** touchée par un
changement de version : elle vit dans le navigateur, pas dans le code.
