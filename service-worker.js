const CACHE_NAME = 'fliegerrechner-v1';
const FILES = [
    './',
    './index.html',
    './styles.css',
    './manifest.json',
    './icon-192.png',
    './icon-512.png',
    './Wind_Rechner/index.html',
    './Wind_Rechner/app.js',
    './Wind_Rechner/styles.css',
    './Druck_Rechner/index.html',
    './Druck_Rechner/app.js',
    './Druck_Rechner/styles.css',
    './Wolkenrechner/index.html',
    './Wolkenrechner/script.js',
    './Wolkenrechner/styles.css',
];

// Installation — alle Dateien cachen
self.addEventListener('install', e => {
    e.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(FILES))
    );
});

// Aktivierung — alten Cache löschen
self.addEventListener('activate', e => {
    e.waitUntil(
        caches.keys().then(keys =>
            Promise.all(keys
                .filter(key => key !== CACHE_NAME)
                .map(key => caches.delete(key))
            )
        )
    );
});

// Fetch — erst Cache, dann Netzwerk
self.addEventListener('fetch', e => {
    e.respondWith(
        caches.match(e.request)
            .then(cached => cached || fetch(e.request))
    );
});
