// SARUX Service Worker v2.0
// Estrategia: Network-first para TODO lo que pueda cambiar (HTML, JS, CSS, config)
// Cache-first solo para imágenes/iconos (no cambian seguido y pesan más).
// Esto hace que las actualizaciones del sitio lleguen de inmediato a los usuarios,
// incluso dentro de la app instalada, sin esperar días a que el caché expire.

const CACHE_NAME = 'sarux-v2';

// Assets que se cachean al instalar (solo como respaldo offline)
const PRECACHE = [
  '/',
  '/index.html',
  '/styles.css',
  '/main.js',
  '/config.js',
  '/manifest.json',
  '/offline.html'
];

// Extensiones que sí pueden ir cache-first (rara vez cambian, pesan más)
const CACHE_FIRST_EXT = ['.png', '.jpg', '.jpeg', '.webp', '.gif', '.svg', '.woff', '.woff2', '.ttf'];

// ── Instalación: precachear assets clave + activar de inmediato ──────────
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(PRECACHE))
  );
  self.skipWaiting(); // no esperar a que se cierren las pestañas viejas
});

// ── Activación: limpiar caches viejos + tomar control inmediato ──────────
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))
      )
    ).then(() => self.clients.claim())
  );
});

// Permite que la página le pida al SW que se active ya, sin esperar
self.addEventListener('message', event => {
  if (event.data === 'SKIP_WAITING') self.skipWaiting();
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

  const esImagenOFuente = CACHE_FIRST_EXT.some(ext => url.pathname.toLowerCase().endsWith(ext));

  // Imágenes/fuentes locales: Cache-first (no cambian seguido, da igual)
  if (esImagenOFuente) {
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
    return;
  }

  // TODO LO DEMÁS (HTML, JS, CSS, JSON): Network-first.
  // Siempre intenta traer la versión más reciente del servidor.
  // Solo usa el caché si no hay internet (modo offline).
  event.respondWith(
    fetch(request, { cache: 'no-store' })
      .then(response => {
        const clone = response.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(request, clone));
        return response;
      })
      .catch(() =>
        caches.match(request).then(cached => {
          if (cached) return cached;
          if (request.headers.get('accept')?.includes('text/html')) {
            return caches.match('/offline.html');
          }
        })
      )
  );
});
