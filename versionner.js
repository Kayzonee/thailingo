/* Ajoute un numéro de version aux fichiers appelés par index.html.
   Sans cela, un navigateur peut servir une version périmée pendant des heures
   et l'on ne sait plus ce qui tourne réellement sur l'appareil. */
const fs = require('fs');
const version = process.argv[2] || String(Date.now());
let html = fs.readFileSync('index.html', 'utf8');
html = html.replace(/(src|href)="((?:js|css|i18n|cours)\/[^"?]+)(\?v=[^"]*)?"/g,
                    (_, attr, chemin) => `${attr}="${chemin}?v=${version}"`);
fs.writeFileSync('index.html', html);
const n = (html.match(/\?v=/g) || []).length;
console.log(`version ${version} apposée sur ${n} fichier(s)`);
