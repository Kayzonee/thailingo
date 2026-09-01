/* Cache hors-ligne — stratégie « réseau d'abord, cache en repli ».
   Garantit qu'une mise à jour de l'app est toujours vue, tout en
   restant utilisable sans connexion. */
const CACHE = 'thailingo-pages-3';
const FILES = ['./','index.html','manifest.json','css/styles.css',
               'i18n/strings.js','js/contenu.js','cours/registre.js',
               'js/nuage.js','js/state.js','js/audio.js','js/engine.js','js/app.js',
               'cours/thai-a1.js','cours/thai-a2.js','cours/thai-b1.js'];

self.addEventListener('install', e=>{
  e.waitUntil(caches.open(CACHE).then(c=>c.addAll(FILES)).then(()=>self.skipWaiting()));
});
self.addEventListener('activate', e=>{
  e.waitUntil(caches.keys()
    .then(ks=>Promise.all(ks.filter(k=>k!==CACHE).map(k=>caches.delete(k))))
    .then(()=>self.clients.claim()));
});
self.addEventListener('fetch', e=>{
  if(e.request.method !== 'GET') return;
  e.respondWith(
    fetch(e.request)
      .then(res=>{
        const copie = res.clone();
        caches.open(CACHE).then(c=>c.put(e.request, copie)).catch(()=>{});
        return res;
      })
      .catch(()=> caches.match(e.request).then(r=> r || caches.match('index.html')))
  );
});
