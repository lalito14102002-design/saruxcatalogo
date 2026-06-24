// SARUX Service Worker v1.0
// Estrategia: Network-first para HTML/API, Cache-first para assets estáticos

const CACHE_NAME = 'sarux-v1';

// Assets que se cachean inmediatamente al instalar
const PRECACHE = [
  '/',
  '/index.html',
  '/styles.css',
  '/main.js',
  '/config.js',
  '/manifest.json',
  '/offline.html'
];

// Páginas secundarias — se cachean cuando el usuario las visita
// (no en precache para no bloquear la instalación)

// ── Instalación: precachear assets clave ──────────────────
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(PRECACHE))
  );
  self.skipWaiting();
});

// ── Activación: limpiar caches viejos ────────────────────
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))
      )
    )
  );
  self.clients.claim();
});

// ── Fetch: estrategia por tipo de recurso ────────────────
self.addEventListener('fetch', event => {
  const { request } = event;
  const url = new URL(request.url);

  // Ignorar peticiones a Supabase, EmailJS, Cloudinary (siempre network)
  if (
    url.hostname.includes('supabase.co') ||
    url.hostname.includes('emailjs.com') ||
    url.hostname.includes('cloudinary.com') ||
    url.hostname.includes('res.cloudinary.com')
  ) {
    return; // dejar pasar sin interceptar
  }

  // Solo manejar GET del mismo origen
  if (request.method !== 'GET' || !url.origin.includes(self.location.origin)) {
    return;
  }

  // Para HTML: Network-first (siempre intenta la red, cache de respaldo)
  if (request.headers.get('accept')?.includes('text/html')) {
    event.respondWith(
      fetch(request)
        .then(response => {
          const clone = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(request, clone));
          return response;
        })
        .catch(() =>
          caches.match(request).then(cached => cached || caches.match('/offline.html'))
        )
    );
    return;
  }

  // Para CSS, JS, fuentes, imágenes locales: Cache-first (más rápido)
  event.respondWith(
    caches.match(request).then(cached => {
      if (cached) return cached;
      return fetch(request).then(response => {
        if (!response || response.status !== 200) return response;
        const clone = response.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(request, clone));
        return response;
      });
    })
  );
});
