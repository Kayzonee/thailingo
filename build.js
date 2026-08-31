/* Assemble l'application en un seul fichier HTML autonome (pour publication web). */
const fs = require('fs');
const lire = f => fs.readFileSync(f, 'utf8');

let html = lire('index.html');
const css = lire('css/styles.css');
const js  = ['js/data.js','js/state.js','js/audio.js','js/engine.js','js/app.js'].map(lire).join('\n');

html = html
  .replace('<link rel="stylesheet" href="css/styles.css">', `<style id="thailingo-style">\n${css}\n</style>`)
  .replace(/\n<script src="js\/[a-z]+\.js"><\/script>/g, '')
  .replace('<script id="thailingo-etat" type="application/json"></script>\n', '')
  .replace('</body>', `<script id="thailingo-etat" type="application/json"></script>\n<script id="thailingo-app">\n${js}\n</script>\n</body>`)
  .replace('<link rel="manifest" href="manifest.json">\n', '');   // pas de fichier annexe

fs.writeFileSync('thailingo.html', html);
console.log('thailingo.html écrit —', Math.round(html.length/1024), 'Ko');

/* Variante « page hébergée » : le squelette HTML est fourni par l'hôte,
   on ne livre donc que le contenu (titre, styles, markup, script). */
let art = html
  .replace(/^[\s\S]*?<title>/, '<title>')                     // on repart du titre
  .replace('</head>\n<body>\n', '\n')
  .replace(/<\/body>\s*<\/html>\s*$/, '')
  .replace(/<meta[^>]*>\n?/g, '')                              // les meta iront dans le head via JS
  .replace('<title>', '<meta charset="utf-8">\n<title>')       // filet de sécurité sur l'encodage
  .replace(/<link rel="apple-touch-icon"[^>]*>\n?/g, '')
  .replace(/if\('serviceWorker' in navigator[\s\S]*?\n}\n/, '');   // pas de fichier annexe ici

const metasIOS = `
/* La page est servie dans un squelette fourni par l'hôte : on installe nous-mêmes
   les métadonnées iOS pour que « Sur l'écran d'accueil » ouvre l'app en plein écran. */
(function(){
  const head = document.head;
  const meta = (n,c,prop='name')=>{ const m=document.createElement('meta'); m.setAttribute(prop,n); m.content=c; head.appendChild(m); };
  const vp = head.querySelector('meta[name="viewport"]');
  const contenu = 'width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no,viewport-fit=cover';
  if(vp) vp.content = contenu; else meta('viewport', contenu);
  meta('apple-mobile-web-app-capable','yes');
  meta('mobile-web-app-capable','yes');
  meta('apple-mobile-web-app-status-bar-style','default');
  meta('apple-mobile-web-app-title','ThaiLingo');
  meta('format-detection','telephone=no');
  const icone = document.createElement('link');
  icone.rel = 'apple-touch-icon';
  icone.href = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 180 180'%3E%3Crect width='180' height='180' fill='%2358CC02'/%3E%3Ctext x='90' y='126' font-size='100' text-anchor='middle'%3E%F0%9F%90%98%3C/text%3E%3C/svg%3E";
  head.appendChild(icone);
})();
`;
art = art.replace('<script id="thailingo-app">', '<script id="thailingo-app">\n' + metasIOS);
fs.writeFileSync('thailingo-artifact.html', art);
console.log('thailingo-artifact.html écrit —', Math.round(art.length/1024), 'Ko');
