self.addEventListener('install', (event) => {
    console.log('Service Worker yüklendi');
    event.waitUntil(
        caches.open('wincent-cache').then((cache) => {
            return cache.addAll([
                '/', 
                '/index.html',
                '/style.css',
                '/images/favicon.jpg',
            ]);
        })
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((cachedResponse) => {
            return cachedResponse || fetch(event.request);
        })
    );
});
