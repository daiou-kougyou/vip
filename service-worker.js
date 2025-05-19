const CACHE_NAME = 'rebar-app-cache-v1';
const urlsToCache = [
  '/vip/',
  '/vip/index.html',
  '/vip/manifest.json',
  '/vip/icon-192.png',
  '/vip/icon-512.png',
  // thêm file CSS, JS, fonts nếu cần
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request))
  );
});

self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.map(key => {
          if (!cacheWhitelist.includes(key)) return caches.delete(key);
        })
      )
    )
  );
});
