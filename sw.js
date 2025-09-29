// sw.js

var cacheName = 'pwa3-v1';
var filesToCache = [
  './index.html',
  './manifest.json',
  './lib1.js',
  './lib2.js',
  './hola.jpg',
  './unicorn.jpg',
  './utp.png',
  './bootstrap-5.0.2-dist/css/bootstrap.min.css',
  './bootstrap-5.0.2-dist/js/bootstrap.bundle.min.js'
];

self.addEventListener('install', function(evento) {
  console.log('[ServiceWorker] Instalando...');
  evento.waitUntil(
    caches.open(cacheName).then(function(cache) {
      console.log('[ServiceWorker] Guardando recursos de la aplicación.');
      return cache.addAll(filesToCache);
    })
  );
});

self.addEventListener('fetch', function(evento) {
  console.log('[ServiceWorker] Solicitando:', evento.request.url);
  evento.respondWith(
    caches.match(evento.request).then(function(response) {
      if (response) {
        console.log('[ServiceWorker] Recurso encontrado en caché:', evento.request.url);
        return response;
      }
      return fetch(evento.request);
    })
  );
});