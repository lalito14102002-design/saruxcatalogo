/**
 * SARUX — Cloudflare Worker para Open Graph dinámico
 * 
 * INSTRUCCIONES DE INSTALACIÓN:
 * 1. Ve a https://dash.cloudflare.com → Workers & Pages → Create Worker
 * 2. Pega todo este código y dale nombre: sarux-og
 * 3. En "Settings" → Variables de entorno agrega:
 *    SUPABASE_URL  = https://ngavbeiochxdvgzcywuh.supabase.co
 *    SUPABASE_KEY  = (tu anon key de Supabase)
 * 4. Despliega el Worker
 * 5. En tu proyecto de Cloudflare Pages → Settings → Functions → Route rules
 *    Agrega ruta: saruxcatalogo.pages.dev/?prod=* → Worker: sarux-og
 */

const SITE_URL   = 'https://saruxcatalogo.pages.dev';
const SITE_NAME  = 'SARUX';
const DEFAULT_IMG = `${SITE_URL}/og-default.jpg`;

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const prodNombre = url.searchParams.get('prod');
    const imgIdx     = parseInt(url.searchParams.get('img') || '0');

    // Si no hay ?prod= o es un bot/crawler, manejar aquí
    // Si es una petición normal del navegador (no bot), dejar pasar al sitio original
    const ua = request.headers.get('user-agent') || '';
    const isBot = /facebookexternalhit|Twitterbot|WhatsApp|LinkedInBot|Slackbot|TelegramBot|Discordbot|bot|crawler|spider/i.test(ua);

    if (!prodNombre || !isBot) {
      // Dejar pasar al sitio estático normal
      return fetch(request);
    }

    // Es un bot scrapeando el link — generar HTML con OG correcto
    try {
      const supabaseUrl = env.SUPABASE_URL || 'https://ngavbeiochxdvgzcywuh.supabase.co';
      const supabaseKey = env.SUPABASE_KEY || '';

      // Buscar el producto en Supabase
      const resp = await fetch(
        `${supabaseUrl}/rest/v1/app_data?select=data&limit=1`,
        {
          headers: {
            'apikey': supabaseKey,
            'Authorization': `Bearer ${supabaseKey}`,
          }
        }
      );

      let imagen = DEFAULT_IMG;
      let precio = '';
      let descripcion = '';
      let catNombre = '';

      if (resp.ok) {
        const rows = await resp.json();
        if (rows && rows[0] && rows[0].data) {
          const data = rows[0].data;
          const catalogo = data.CATALOGO || [];

          // Buscar el producto por nombre
          outer: for (const cat of catalogo) {
            for (const p of (cat.productos || [])) {
              if (p.nombre === prodNombre) {
                catNombre = cat.nombre || '';
                precio = p.precio ? `$${Number(p.precio).toLocaleString('es-MX')} MXN` : '';
                descripcion = p.descripcion || `${p.nombre} en SARUX — Personalización en Puebla`;
                // Imagen: directa o del diseño según idx
                if (p.imagen) {
                  imagen = p.imagen;
                } else if (p.disenos && p.disenos[imgIdx] && p.disenos[imgIdx].imagen) {
                  imagen = p.disenos[imgIdx].imagen;
                } else if (p.disenos && p.disenos[0] && p.disenos[0].imagen) {
                  imagen = p.disenos[0].imagen;
                }
                break outer;
              }
            }
          }
        }
      }

      const titulo = prodNombre + (catNombre ? ` — ${catNombre}` : '') + ` | ${SITE_NAME}`;
      const descFinal = descripcion + (precio ? ` Desde ${precio}.` : '');
      const pageUrl = `${SITE_URL}/?prod=${encodeURIComponent(prodNombre)}${imgIdx ? `&img=${imgIdx}` : ''}#catalogo`;

      const html = `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>${escHtml(titulo)}</title>

  <!-- Open Graph -->
  <meta property="og:type"        content="product">
  <meta property="og:site_name"   content="${SITE_NAME}">
  <meta property="og:title"       content="${escHtml(titulo)}">
  <meta property="og:description" content="${escHtml(descFinal)}">
  <meta property="og:url"         content="${pageUrl}">
  <meta property="og:image"       content="${imagen}">
  <meta property="og:image:width"  content="1200">
  <meta property="og:image:height" content="630">
  <meta property="og:locale"      content="es_MX">

  <!-- Twitter Card -->
  <meta name="twitter:card"        content="summary_large_image">
  <meta name="twitter:title"       content="${escHtml(titulo)}">
  <meta name="twitter:description" content="${escHtml(descFinal)}">
  <meta name="twitter:image"       content="${imagen}">

  <!-- WhatsApp (usa og:image) -->
  <meta name="description" content="${escHtml(descFinal)}">

  <!-- Redirigir al sitio real inmediatamente -->
  <meta http-equiv="refresh" content="0; url=${pageUrl}">
  <link rel="canonical" href="${pageUrl}">
</head>
<body>
  <script>window.location.replace("${pageUrl}");</script>
  <p><a href="${pageUrl}">Ver ${escHtml(prodNombre)} en SARUX →</a></p>
</body>
</html>`;

      return new Response(html, {
        headers: {
          'Content-Type': 'text/html;charset=UTF-8',
          'Cache-Control': 'public, max-age=300', // Cache 5 min
        }
      });

    } catch (e) {
      // Fallback — dejar pasar al sitio original
      return fetch(request);
    }
  }
};

function escHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
