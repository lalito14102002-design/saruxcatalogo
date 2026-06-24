// SARUX — Worker Open Graph Dinámico v3

const SITE_URL     = 'https://saruxcatalogo.pages.dev';
const SITE_NAME    = 'SARUX';
const DEFAULT_IMG  = 'https://saruxcatalogo.pages.dev/og-default.jpg';
const SUPABASE_URL = 'https://ngavbeiochxdvgzcywuh.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5nYXZiZWlvY2h4ZHZnemN5d3VoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzgxODU5NDMsImV4cCI6MjA5Mzc2MTk0M30.Cu0qst-ff8ZKLTvJoauCOssCFdrp1csmilbqWByCM0E';

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request));
});

async function handleRequest(request) {
  const url = new URL(request.url);
  const prodNombre = url.searchParams.get('prod');
  const imgIdx = parseInt(url.searchParams.get('img') || '0');

  if (!prodNombre) {
    return Response.redirect(SITE_URL, 302);
  }

  let imagen = DEFAULT_IMG;
  let precio = '';
  let descripcion = '';
  let catNombre = '';

  try {
    // Tabla correcta: site_config, columna: config_data, id=1
    const resp = await fetch(
      SUPABASE_URL + '/rest/v1/site_config?select=config_data&id=eq.1&limit=1',
      {
        headers: {
          'apikey': SUPABASE_KEY,
          'Authorization': 'Bearer ' + SUPABASE_KEY,
        }
      }
    );

    if (resp.ok) {
      const rows = await resp.json();
      if (rows && rows[0] && rows[0].config_data) {
        const data = rows[0].config_data;
        const catalogo = data.CATALOGO || [];
        loop: for (const cat of catalogo) {
          for (const p of (cat.productos || [])) {
            if (p.nombre === prodNombre) {
              catNombre = cat.nombre || '';
              precio = p.precio ? '$' + Number(p.precio).toLocaleString('es-MX') + ' MXN' : '';
              descripcion = p.descripcion || (p.nombre + ' en SARUX — Personalización en Puebla');
              if (p.imagen) {
                imagen = p.imagen;
              } else if (p.disenos && p.disenos[imgIdx] && p.disenos[imgIdx].imagen) {
                imagen = p.disenos[imgIdx].imagen;
              } else if (p.disenos && p.disenos[0] && p.disenos[0].imagen) {
                imagen = p.disenos[0].imagen;
              }
              break loop;
            }
          }
        }
      }
    }
  } catch(e) {}

  const titulo    = prodNombre + (catNombre ? ' — ' + catNombre : '') + ' | ' + SITE_NAME;
  const descFinal = descripcion + (precio ? ' Desde ' + precio + '.' : '');
  const pageUrl   = SITE_URL + '/?prod=' + encodeURIComponent(prodNombre) + (imgIdx ? '&img=' + imgIdx : '') + '#catalogo';

  const html = `<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<title>${esc(titulo)}</title>
<meta property="og:type"             content="product">
<meta property="og:site_name"        content="${SITE_NAME}">
<meta property="og:title"            content="${esc(titulo)}">
<meta property="og:description"      content="${esc(descFinal)}">
<meta property="og:url"              content="${pageUrl}">
<meta property="og:image"            content="${imagen}">
<meta property="og:image:secure_url" content="${imagen}">
<meta property="og:image:width"      content="1200">
<meta property="og:image:height"     content="630">
<meta property="og:image:type"       content="image/jpeg">
<meta name="twitter:card"            content="summary_large_image">
<meta name="twitter:title"           content="${esc(titulo)}">
<meta name="twitter:description"     content="${esc(descFinal)}">
<meta name="twitter:image"           content="${imagen}">
<meta name="description"             content="${esc(descFinal)}">
<link rel="canonical"                href="${pageUrl}">
<meta http-equiv="refresh"           content="0; url=${pageUrl}">
</head>
<body>
<script>window.location.replace("${pageUrl}");<\/script>
<p><a href="${pageUrl}">Ver ${esc(prodNombre)} en SARUX</a></p>
</body>
</html>`;

  return new Response(html, {
    status: 200,
    headers: {
      'Content-Type': 'text/html;charset=UTF-8',
      'Cache-Control': 'no-cache, no-store, must-revalidate',
    }
  });
}

function esc(s) {
  return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}
