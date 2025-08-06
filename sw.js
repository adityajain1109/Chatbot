const GHPATH = '/Chatbot/';
const APP_PREFIX = 'botnext_';
const VERSION = 'version_01';
const URLS = [
  `${GHPATH}`,
  `${GHPATH}index.html`,
  `${GHPATH}BotNext2.html`,
  `${GHPATH}css/styles.css`, // Add actual stylesheet if you have one
  `${GHPATH}js/app.js`       // Add actual JS file if applicable
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(APP_PREFIX + VERSION).then(cache => cache.addAll(URLS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys
          .filter(key => key.startsWith(APP_PREFIX) && key !== APP_PREFIX + VERSION)
          .map(key => caches.delete(key))
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
