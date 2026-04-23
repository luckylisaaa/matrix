// ICS Matrix · Service Worker v1
// 讓網頁第一次打開後，下次沒網路也能用

const CACHE_NAME = 'ics-matrix-v1';
const urlsToCache = [
  './',
  './index.html',
  './icon-matrix-192.png',
  './icon-matrix-512.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(names =>
      Promise.all(
        names.filter(n => n !== CACHE_NAME).map(n => caches.delete(n))
      )
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request))
  );
});
