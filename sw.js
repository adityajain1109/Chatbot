const GHPATH = '/Chatbot/';
const APP_PREFIX = 'botnext_';
const VERSION = 'version_01';
const CACHE_NAME = APP_PREFIX + VERSION;

const URLS = [
  `${GHPATH}BotNext2.html`,
  `${GHPATH}manifest.webmanifest`,
  `${GHPATH}icons/icon-192.png`,
  `${GHPATH}icons/icon-512.png`,
  // Add these only if you actually use them:
  // `${GHPATH}css/styles.css`,
  // `${GHPATH}js/app.js`
];

// Install: Cache core files
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(URLS);
    })
  );
  self.skipWaiting();
});

// Activate: Remove old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys
          .filter(key => key.startsWith(APP_PREFIX) && key !== CACHE_NAME)
          .map(key => caches.delete(key))
      );
    })
  );
  self.clients.claim();
});

// Fetch: Serve from cache first
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
