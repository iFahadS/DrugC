/* Service worker - Clinical Dosing Suite
   Strategy:
   - Install: precache the app shell so it works fully offline.
   - Fetch: cache-first for static assets, network-first with cache fallback for navigation.
   - Activate: clean up old caches, take control immediately.
*/
const CACHE = 'dosingsuite-v6';
const APP_SHELL = [
  './',
  './index.html',
  './manifest.webmanifest',
  './icon-192.png',
  './icon-512.png'
];

/* INSTALL: precache the app shell */
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE)
      .then(c => c.addAll(APP_SHELL))
      .then(() => self.skipWaiting())
  );
});

/* ACTIVATE: delete old caches and take control of clients */
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

/* FETCH: serve from cache when offline, refresh in background */
self.addEventListener('fetch', e => {
  // Only handle GET requests from our own origin
  if (e.request.method !== 'GET' || new URL(e.request.url).origin !== self.location.origin) return;

  // Navigation (page loads): network first, fall back to cached index.html offline
  if (e.request.mode === 'navigate') {
    e.respondWith(
      fetch(e.request)
        .then(res => {
          const copy = res.clone();
          caches.open(CACHE).then(c => c.put(e.request, copy));
          return res;
        })
        .catch(() =>
          caches.match(e.request)
            .then(hit => hit || caches.match('./index.html'))
        )
    );
    return;
  }

  // Static assets: cache first, then network (update cache for next time)
  e.respondWith(
    caches.match(e.request).then(hit => {
      if (hit) {
        // Refresh in the background (stale-while-revalidate)
        fetch(e.request).then(res => {
          if (res && res.ok) caches.open(CACHE).then(c => c.put(e.request, res));
        }).catch(() => {});
        return hit;
      }
      return fetch(e.request).then(res => {
        if (res && res.ok) {
          const copy = res.clone();
          caches.open(CACHE).then(c => c.put(e.request, copy));
        }
        return res;
      });
    })
  );
});
