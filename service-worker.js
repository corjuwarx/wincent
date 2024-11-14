const CACHE_NAME = 'my-cache-v2';

const staticAssets = [
  '/',
  '/index.html',
];

const dynamicAssets = [
  '/api/data', 
];

self.addEventListener('install', (event) => {
  // ...
});

self.addEventListener('activate', (event) => {
  // ...
});

self.addEventListener('fetch', (event) => {
  const request = event.request;
  const url = new URL(request.url);

  if (staticAssets.includes(url.pathname)) {
    event.respondWith(
      caches.match(request)
        .then(response => response || fetch(request))
        .catch(error => console.error('Fetch error:', error))
    );
  } else if (dynamicAssets.includes(url.pathname)) {
    event.respondWith(
      fetch(request)
        .then(response => {
          const responseClone = response.clone();
          caches.open(CACHE_NAME).then(
            cache => cache.put(request, responseClone)
          );
          return response;
        })
        .catch(error => caches.match(request))
    );
  }
});
