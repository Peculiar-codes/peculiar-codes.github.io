const cacheName = 'Quiz-app';
self.addEventListener('install', (e) => {
    e.waitUntil((async () => {
        const contentToCache=[
        'Quiz-App/index.html',
      'Quiz-App/scripts/script.js',
      'Quiz-App/styles/style.css',
      'Quiz-App/img5.jpg',
      'Quiz-App/favecon.ico',
      'Quiz-App/scripts/peculiar.js',
      'Quiz-App/scripts/questions.js',
      'Quiz-App/scripts/quiz.js',
   
        ]
    const cache = await caches.open(cacheName);
   // console.log('[Service Worker] Caching all: app shell and content');
    await cache.addAll(contentToCache);
  })());

      
});

self.addEventListener('fetch', (e) => {
  e.respondWith((async () => {
    const r = await caches.match(e.request);
    //console.log(`[Service Worker] Fetching resource: ${e.request.url}`);
    if (r) return r;
    const response = await fetch(e.request);
    const cache = await caches.open(cacheName);
   // console.log(`[Service Worker] Caching new resource: ${e.request.url}`);
    cache.put(e.request, response.clone());
    return response;
  })());
});
