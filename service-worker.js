const CACHE_NAME = 'golozo-v1';
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/menu.html',
  '/manifest.json',
  // Adicione aqui os caminhos das suas imagens e CSS principal
  // Ex: '/style.css', '/assets/logo.png'
];

// Instalação do Service Worker
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

// Interceptar requisições e servir do cache
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});

// Limpar caches antigos
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      );
    })
  );
});