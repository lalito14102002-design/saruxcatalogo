//  CONFIGURACIÓN DE SUPABASE (cargada desde config.js)
const SUPABASE_URL = window.SUPABASE_URL || 'https://ngavbeiochxdvgzcywuh.supabase.co';
const SUPABASE_ANON_KEY = window.SUPABASE_ANON_KEY || '';
const sb = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

//  DATOS POR DEFECTO
const DEFAULTS = {
  NEGOCIO:{nombre:"SARUX",descripcion:"Diseños 100% originales en playeras, tazas, termos y más.",whatsapp:"522229250603",instagram:"https://instagram.com/sarux.oficial",facebook:"https://facebook.com/sarux",tiktok:"https://tiktok.com/@sarux.oficial",tiktok_user:"@sarux.oficial",hero_frase1:"DISEÑO",hero_frase2:"QUE",hero_frase3:"HABLA"},
  COLORES:{fondo:"#060606",tarjetas:"#141414",acento:"#e8192c",acento2:"#ff6b35",texto:"#e0e0e0",gris:"#777777"},
  FUENTES:{display:"'Bebas Neue',sans-serif",mono:"'Space Mono',monospace",body:"'Rajdhani',sans-serif"},
  POPUP:{activo:true,emoji:"🎁",titulo:"BIENVENIDO A SARUX",descripcion:"Diseños originales que te hacen destacar.",boton:"Ver catálogo →"},
  TICKER:["PLAYERAS","TAZAS","TERMOS","CILINDROS","SUDADERAS","DISEÑOS ORIGINALES","SARUX","MAYOREO","ENVÍOS A TODO MÉXICO"],
  LOGO:"",
  PROMOCIONES:[],
  MAS_VENDIDOS:[{nombre:"Playera Eclipse",categoria:"Playeras",precio:350,emoji:"👕",imagen:"",badge:"Popular",tallas:["S","M","L","XL","XXL"],colores:["Negro","Blanco","Gris"]},{nombre:"Taza Mágica",categoria:"Tazas",precio:180,emoji:"☕",imagen:"",badge:"Más vendido",tallas:[],colores:["Negro","Blanco","Rojo"]},{nombre:"Termo Eclipse",categoria:"Termos",precio:280,emoji:"🧊",imagen:"",badge:"Popular",tallas:[],colores:["Negro","Plata"]},{nombre:"Sudadera Nebula",categoria:"Sudaderas",precio:550,emoji:"🧥",imagen:"",badge:"Nuevo",tallas:["S","M","L","XL","XXL"],colores:["Negro","Gris oscuro"]}],
  CATALOGO:[{nombre:"Tazas",emoji:"☕",activa:true,imagen_portada:"",productos:[{nombre:"Taza Clásica",precio:150,colores:["Negro","Blanco"],tallas:[],stock:20,imagen:"",descripcion:"Taza clásica con diseño Sarux",temas:[],subtema:"",disenos:[]}]},{nombre:"Playeras",emoji:"👕",activa:true,imagen_portada:"",productos:[{nombre:"Playera Clásica",precio:350,colores:["Negro"],tallas:["S","M","L","XL","XXL"],stock:25,imagen:"",descripcion:"Playera básica Sarux",temas:[],subtema:"",disenos:[]}]}],
  MAYOREO:{activo:true,titulo:"VENTA AL MAYOREO",subtitulo:"Bodas · XV Años · Graduaciones · Empresas",descripcion:"¿Necesitas piezas personalizadas para un evento especial?",minimo:"Mínimo 10 piezas",descuento:"Hasta 30% de descuento",entrega:"Entrega en 7-15 días hábiles",whatsapp_msg:"Hola! Me interesa una cotización de MAYOREO para un evento 🎊",eventos:[{nombre:"Bodas",emoji:"💍",descripcion:"Recuerdos personalizados con los nombres de los novios"},{nombre:"XV Años",emoji:"👑",descripcion:"Diseños exclusivos con el nombre de la quinceañera"},{nombre:"Graduaciones",emoji:"🎓",descripcion:"Playeras y termos con el logo de tu escuela"}],paquetes:[{nombre:"Pack Básico",piezas:"10-24 piezas",precio:"Desde $300 c/u",emoji:"📦",incluye:"Playera + Diseño personalizado"}],proceso:[{paso:"01",titulo:"Contáctanos",desc:"Escríbenos con la cantidad y tipo de evento"},{paso:"02",titulo:"Cotización",desc:"Te enviamos cotización en menos de 24 horas"},{paso:"03",titulo:"Producción",desc:"Producimos con la mayor calidad"}]},
  LANZAMIENTOS:[{nombre:"Colección Verano 2026",fecha:"Mayo 2026",descripcion:"Nueva línea de playeras y tazas",emoji:"🔥",imagen:"",activo:true}],
  FAQS:[{pregunta:"¿Hacen envíos?",respuesta:"Sí, hacemos envíos a toda la República Mexicana."},{pregunta:"¿Cuánto tarda mi pedido?",respuesta:"Entre 3 a 7 días hábiles dependiendo de tu ciudad."},{pregunta:"¿Puedo personalizar?",respuesta:"¡Sí! Contáctanos por WhatsApp y te ayudamos."}],
  RESENAS:[{texto:"La playera llegó perfecta, el diseño es increíble.",autor:"Cliente Sarux",estrellas:5,activa:true},{texto:"La taza mágica quedó hermosa, fue un regalo perfecto.",autor:"Cliente Sarux",estrellas:5,activa:true}],
  NOSOTROS:{titulo:"SOMOS SARUX",parrafo1:"Somos una marca de diseños originales creada con pasión.",parrafo2:"Trabajamos con materiales de calidad.",parrafo3:"Nuestro objetivo: que uses algo que te haga sentir diferente."},
  CHAT_RESPUESTAS:{precios:"Nuestros precios van desde $80 hasta $1,200 MXN 💚",envios:"Sí hacemos envíos a toda la República 📦",pedido:"1) Elige tu producto 2) Da clic en Comprar 3) Te redirige a WhatsApp 🛍️",mayoreo:"¡Sí hacemos mayoreo! Bodas, XV años, graduaciones y más 🎊"},
  PASOS:[{emoji:"🔍",titulo:"Explora el catálogo",desc:"Navega por nuestras categorías."},{emoji:"👆",titulo:"Elige tu producto",desc:"Selecciona talla, color y diseño."},{emoji:"📱",titulo:"WhatsApp directo",desc:"¡Te redirigimos directo a WhatsApp!"}],
  PASOS_TITULO:"CÓMO PEDIR",PASOS_LABEL:"Es muy fácil",
  FOTOS_NOSOTROS:[{emoji:"📸",texto:"Tus fotos aquí",imagen:""},{emoji:"🎥",texto:"Video del negocio",imagen:""},{emoji:"👕",texto:"Foto producto",imagen:""},{emoji:"✨",texto:"Foto diseño",imagen:""}],
  IG_POSTS:[{titulo:"Post 1",imagen:"",url:""},{titulo:"Post 2",imagen:"",url:""},{titulo:"Post 3",imagen:"",url:""},{titulo:"Post 4",imagen:"",url:""},{titulo:"Post 5",imagen:"",url:""},{titulo:"Post 6",imagen:"",url:""}],
  TIKTOK_POSTS:[{titulo:"Video 1",imagen:"",url:""},{titulo:"Video 2",imagen:"",url:""},{titulo:"Video 3",imagen:"",url:""},{titulo:"Video 4",imagen:"",url:""},{titulo:"Video 5",imagen:"",url:""},{titulo:"Video 6",imagen:"",url:""}],
  IMAGENES_PERSONALIZACION:[], 
  IMAGEN_LLUVIA:"",
  LLUVIA_CONFIG:{activa:false,cantidad:20,velocidad:2,espera:0},
  FOTOS_CLIENTES_CFG:{activo:true,titulo:"FOTOS REALES",subtitulo:"Clientes reales, resultados reales"}
};

// Variables globales
let APP_DATA = {};
let NEGOCIO,COLORES,FUENTES,POPUP_D,TICKER_D,LOGO_D,PROMOCIONES_D,MAS_VENDIDOS_D,CATALOGO_D,MAYOREO_D,LANZAMIENTOS_D,FAQS_D,RESENAS_D,NOSOTROS_D,CHAT_RESP_D;
let GRID_CONFIG = {productos:3,masVendidos:4,promos:2,lanzamientos:3};
let CARD_RATIO = '4/5';
let CARD_FIT = 'contain';
let IMAGENES_PERSONALIZACION = [];
let IMAGEN_LLUVIA = "";
let LLUVIA_CONFIG = {activa:false,cantidad:20,velocidad:2,espera:0};

function syncGlobalsFromAppData(){
  NEGOCIO = APP_DATA.NEGOCIO;
  COLORES = APP_DATA.COLORES;
  FUENTES = APP_DATA.FUENTES;
  POPUP_D = APP_DATA.POPUP;
  TICKER_D = APP_DATA.TICKER;
  LOGO_D = APP_DATA.LOGO;
  PROMOCIONES_D = APP_DATA.PROMOCIONES;
  MAS_VENDIDOS_D = APP_DATA.MAS_VENDIDOS;
  CATALOGO_D = APP_DATA.CATALOGO;
  MAYOREO_D = APP_DATA.MAYOREO;
  LANZAMIENTOS_D = APP_DATA.LANZAMIENTOS;
  FAQS_D = APP_DATA.FAQS;
  RESENAS_D = APP_DATA.RESENAS;
  NOSOTROS_D = APP_DATA.NOSOTROS;
  CHAT_RESP_D = APP_DATA.CHAT_RESPUESTAS;
  window.PASOS_D = APP_DATA.PASOS;
  window.PASOS_TITULO_D = APP_DATA.PASOS_TITULO || DEFAULTS.PASOS_TITULO;
  window.PASOS_LABEL_D = APP_DATA.PASOS_LABEL || DEFAULTS.PASOS_LABEL;
  window.FOTOS_NOSOTROS_D = APP_DATA.FOTOS_NOSOTROS;
  window.IG_POSTS_D = APP_DATA.IG_POSTS;
  window.TIKTOK_POSTS_D = APP_DATA.TIKTOK_POSTS;
  GRID_CONFIG = APP_DATA.GRID_CONFIG || DEFAULTS.GRID_CONFIG;
  CARD_RATIO = APP_DATA.CARD_RATIO || DEFAULTS.CARD_RATIO;
  CARD_FIT = APP_DATA.CARD_FIT || DEFAULTS.CARD_FIT;
  IMAGENES_PERSONALIZACION = APP_DATA.IMAGENES_PERSONALIZACION || [];
  IMAGEN_LLUVIA = APP_DATA.IMAGEN_LLUVIA || "";
  LLUVIA_CONFIG = APP_DATA.LLUVIA_CONFIG || {activa:true,cantidad:20,velocidad:2,espera:0};
  window.FILTROS_GLOBALES_D = APP_DATA.FILTROS_GLOBALES || {tipos:[],categorias:[],disenos:[]};
  window.FOTOS_CLIENTES_CFG = APP_DATA.FOTOS_CLIENTES_CFG || DEFAULTS.FOTOS_CLIENTES_CFG;
}

async function cargarConfigDesdeSupabase(){
  // Cargar cache primero si existe (instantáneo)
  try {
    const cached = localStorage.getItem('sarux_cfg');
    if(cached){
      const parsed = JSON.parse(cached);
      APP_DATA = { ...DEFAULTS, ...parsed };
      if(!APP_DATA.IMAGENES_PERSONALIZACION) APP_DATA.IMAGENES_PERSONALIZACION = [];
      if(!APP_DATA.IMAGEN_LLUVIA) APP_DATA.IMAGEN_LLUVIA = "";
      syncGlobalsFromAppData();
      // Actualizar en segundo plano sin bloquear
      sb.from('site_config').select('config_data').eq('id',1).single().then(({data,error})=>{
        if(!error && data) try{ localStorage.setItem('sarux_cfg', JSON.stringify(data.config_data)); }catch(e){}
      });
      return;
    }
  } catch(e){}
  // Sin cache: cargar de Supabase
  const { data, error } = await sb
    .from('site_config')
    .select('config_data')
    .eq('id', 1)
    .single();
  if (error || !data) {
    console.warn('Error Supabase:', error);
    APP_DATA = JSON.parse(JSON.stringify(DEFAULTS));
  } else {
    APP_DATA = { ...DEFAULTS, ...data.config_data };
    if (!APP_DATA.IMAGENES_PERSONALIZACION) APP_DATA.IMAGENES_PERSONALIZACION = [];
    if (!APP_DATA.IMAGEN_LLUVIA) APP_DATA.IMAGEN_LLUVIA = "";
    try{ localStorage.setItem('sarux_cfg', JSON.stringify(data.config_data)); }catch(e){}
  }
  syncGlobalsFromAppData();
}

// ESTILOS
function adjustBrightness(hex,amt){try{let r=parseInt(hex.slice(1,3),16)+amt,g=parseInt(hex.slice(3,5),16)+amt,b=parseInt(hex.slice(5,7),16)+amt;return'#'+[r,g,b].map(x=>Math.min(255,Math.max(0,x)).toString(16).padStart(2,'0')).join('');}catch(e){return hex;}}

function applyStyles(){
  const r=document.documentElement.style;
  r.setProperty('--black',COLORES.fondo);r.setProperty('--dark',adjustBrightness(COLORES.fondo,8));
  r.setProperty('--card',COLORES.tarjetas);r.setProperty('--card2',adjustBrightness(COLORES.tarjetas,6));
  r.setProperty('--neon',COLORES.acento);r.setProperty('--neon2',COLORES.acento);r.setProperty('--neon3',COLORES.acento2);
  r.setProperty('--light',COLORES.texto);r.setProperty('--gray',COLORES.gris);
  r.setProperty('--font-display',FUENTES.display);r.setProperty('--font-mono',FUENTES.mono);r.setProperty('--font-body',FUENTES.body);
  let s=document.getElementById('dyn-card-style');
  if(!s){s=document.createElement('style');s.id='dyn-card-style';document.head.appendChild(s);}
  s.textContent=`.card-img-wrap{aspect-ratio:${CARD_RATIO}!important}.card-img-real{object-fit:${CARD_FIT}!important}`;
}

// LOGO
const LOGO_FALLBACK="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='60' viewBox='0 0 200 60'%3E%3Crect width='200' height='60' fill='%23060606'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%23e8192c' font-family='Arial Black' font-size='28' font-weight='900' letter-spacing='8'%3ESARUX%3C/text%3E%3C/svg%3E";
function getLogoSrc(){return LOGO_D&&LOGO_D.length>10?LOGO_D:LOGO_FALLBACK;}
function logoTag(h){return`<img src="${getLogoSrc()}" alt="${NEGOCIO.nombre}" style="height:${h}px;width:auto;filter:drop-shadow(0 0 8px rgba(232,25,44,.5))">`;}

// Funciones para la vista previa de personalización
function previewCustomImage(url) {
  const previewDiv = document.querySelector('.custom-preview');
  if (!previewDiv) return;
  previewDiv.innerHTML = `<img src="${url}" style="width:100%;height:100%;object-fit:contain;"><div class="custom-preview-text">Vista previa</div>`;
}

function cambiarPreview(emoji, btn) {
  const previewDiv = document.querySelector('.custom-preview');
  if (!previewDiv) return;
  previewDiv.innerHTML = `<span id="customEmoji">${emoji}</span><div class="custom-preview-text">Vista previa</div>`;
  document.querySelectorAll('.custom-opt').forEach(b=>b.classList.remove('active'));
  btn.classList.add('active');
}

// (filtros globales reemplazados por nuevo buscador de catálogo)

// RENDER PÁGINA PRINCIPAL
function renderPage(){
  document.getElementById('page-title').textContent=NEGOCIO.nombre+' — Diseños Originales';
  document.getElementById('page-desc').content=NEGOCIO.descripcion;
  document.getElementById('navLogo').innerHTML=`<img src="${getLogoSrc()}" alt="${NEGOCIO.nombre}" class="logo-img">`;
  document.getElementById('footerLogo').innerHTML=logoTag(35);

  const mkIcon=(red,url,icono,svg)=>`<a href="${url||'#'}" target="_blank" class="topbar-red">${icono?`<img src="${icono}" class="topbar-red-img">`:`<svg viewBox="0 0 24 24" class="topbar-red-svg" fill="currentColor">${svg}</svg>`}${red}</a>`;
  const igSvg=`<path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>`;
  const waSvg=`<path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>`;
  const fbSvg=`<path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>`;
  const ttSvg=`<path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>`;
  document.getElementById('topbar').innerHTML=mkIcon('Instagram',NEGOCIO.instagram,NEGOCIO.icono_instagram,igSvg)+mkIcon('WhatsApp',`https://wa.me/${NEGOCIO.whatsapp}`,NEGOCIO.icono_whatsapp,waSvg)+mkIcon('Facebook',NEGOCIO.facebook,NEGOCIO.icono_facebook,fbSvg)+mkIcon('TikTok',NEGOCIO.tiktok,NEGOCIO.icono_tiktok,ttSvg);

  document.getElementById('heroContent').innerHTML=`<div class="hero-logo-wrap"><img src="${getLogoSrc()}" alt="${NEGOCIO.nombre}" class="hero-logo-img"></div><div class="eyebrow">Diseños 100% originales</div><h1>${NEGOCIO.hero_frase1||'DISEÑO'}<br><span class="outline">${NEGOCIO.hero_frase2||'QUE'}</span><br>${NEGOCIO.hero_frase3||'HABLA'}</h1><p>${NEGOCIO.descripcion}</p><div class="hero-btns"><a href="#catalogo" class="btn-neon">Ver catálogo</a><a href="#mayoreo" class="btn-outline">Mayoreo 🎊</a></div>`;

  if(POPUP_D.activo){
    document.getElementById('popup').innerHTML=`<div class="popup-overlay"><div class="popup-box"><button class="popup-close" onclick="cerrarPopup()">✕</button><div style="font-size:2rem;margin-bottom:.5rem">${POPUP_D.emoji||'🎁'}</div>${logoTag(50)}<div class="popup-title" style="margin-top:1rem">${POPUP_D.titulo}</div><p class="popup-desc">${POPUP_D.descripcion}</p><button class="popup-btn" onclick="cerrarPopup()">${POPUP_D.boton}</button></div></div>`;
    setTimeout(cerrarPopup,8000);
  }

  const t2=[...TICKER_D,...TICKER_D].map(t=>`<span>${t}</span><span>✦</span>`).join('');
  document.getElementById('tickerTrack').innerHTML=t2;

  const pg=document.getElementById('promoGrid');
  pg.setAttribute('data-cols',GRID_CONFIG.promos);
  pg.innerHTML='';
  // Usar índice REAL del array para que PROMOCIONES_D[idx] siempre apunte a la promo correcta
  PROMOCIONES_D.forEach((p,realIdx)=>{
    if(!p.activa) return;
    const imgHTML=p.imagen?`<div class="promo-img-wrap" style="cursor:pointer" onclick="abrirPromoModal(${realIdx})"><img src="${p.imagen}" alt="${p.nombre}"></div>`:`<div class="promo-img-wrap" style="cursor:pointer;font-size:4rem" onclick="abrirPromoModal(${realIdx})">${p.emoji||'🔥'}</div>`;
    pg.innerHTML+=`<div class="promo-card" data-promo-idx="${realIdx}">${imgHTML}<div class="promo-badge">${p.descuento}</div><div class="promo-name" style="cursor:pointer" onclick="abrirPromoModal(${realIdx})">${p.nombre}</div><div class="promo-price">Precio: ${p.precio}</div><div class="countdown"><div class="countdown-item"><span class="countdown-num" id="h-${realIdx}">00</span><span class="countdown-label">Horas</span></div><div class="countdown-item"><span class="countdown-num" id="m-${realIdx}">00</span><span class="countdown-label">Min</span></div><div class="countdown-item"><span class="countdown-num" id="s-${realIdx}">00</span><span class="countdown-label">Seg</span></div></div><button class="btn-neon" style="font-size:.6rem;padding:.7rem 1.5rem" onclick="abrirPromoModal(${realIdx})">Ver promo →</button></div>`;
    if(p.duracion_horas>0) iniciarCD(p.duracion_horas*3600, realIdx, p.inicio_ts||null);
  });

  const mv=document.getElementById('masVendidosGrid');
  mv.setAttribute('data-cols',GRID_CONFIG.masVendidos);
  mv.innerHTML=MAS_VENDIDOS_D.map(p=>mkCard(p,p.categoria,p.emoji)).join('');

  renderTabs();renderMayoreo();

  const lg=document.getElementById('launchGrid');
  lg.setAttribute('data-cols',GRID_CONFIG.lanzamientos);
  lg.innerHTML=LANZAMIENTOS_D.filter(l=>l.activo).map(l=>{const imgHTML=l.imagen?`<div class="launch-img-wrap"><img src="${l.imagen}" alt="${l.nombre}"></div>`:`<span class="launch-emoji">${l.emoji||'🚀'}</span>`;return`<div class="launch-card">${imgHTML}<div class="launch-name">${l.nombre}</div><div class="launch-desc">${l.descripcion}</div><div class="launch-date">📅 ${l.fecha}</div></div>`;}).join('');

  const rg=document.getElementById('reviewsGrid');if(rg)rg.innerHTML=RESENAS_D.filter(r=>r.activa).map(r=>`<div class="review-card"><div class="review-stars">${'⭐'.repeat(r.estrellas)}</div><div class="review-text">"${r.texto}"</div><div class="review-author">— ${r.autor}</div></div>`).join('');

  document.getElementById('tiktokBtn').href=NEGOCIO.tiktok||'#';
  document.getElementById('tiktok-user-display').textContent=NEGOCIO.tiktok_user||'@sarux.oficial';
  const ttg=document.getElementById('tiktokGrid');ttg.innerHTML='';
  (window.TIKTOK_POSTS_D||[]).forEach(p=>{const img=p.imagen?`<img src="${p.imagen}" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;opacity:.7">`:'';ttg.innerHTML+=`<a href="${p.url||NEGOCIO.tiktok||'#'}" target="_blank" class="tiktok-item">${img}<span class="tk-icon" style="position:relative;z-index:2">${p.imagen?'▶️':'🎵'}</span><span style="z-index:2;position:relative;font-size:.6rem;text-align:center;padding:0 .5rem">${p.titulo||'Ver video'}</span></a>`;});
  if(!(window.TIKTOK_POSTS_D||[]).length)for(let i=0;i<6;i++)ttg.innerHTML+=`<a href="${NEGOCIO.tiktok||'#'}" target="_blank" class="tiktok-item"><span class="tk-icon">🎵</span></a>`;

  const ig=document.getElementById('igGrid');ig.innerHTML='';
  (window.IG_POSTS_D||[]).forEach(p=>{if(p.imagen){ig.innerHTML+=`<div class="ig-item" style="padding:0;overflow:hidden" onclick="window.open('${p.url||NEGOCIO.instagram||'#'}','_blank')"><img src="${p.imagen}" style="width:100%;height:100%;object-fit:cover"></div>`;}else{ig.innerHTML+=`<div class="ig-item" onclick="window.open('${p.url||NEGOCIO.instagram||'#'}','_blank')"><span class="ig-icon">📸</span><span>${p.titulo||'Ver post'}</span></div>`;}});
  if(!(window.IG_POSTS_D||[]).length)for(let i=0;i<6;i++)ig.innerHTML+=`<div class="ig-item" onclick="window.open('${NEGOCIO.instagram||'#'}','_blank')"><span class="ig-icon">📸</span>Ver post</div>`;
  document.getElementById('igBtn').href=NEGOCIO.instagram||'#';

  document.getElementById('faqList').innerHTML=FAQS_D.map((f,i)=>`<div class="faq-item" id="faq-${i}"><div class="faq-q" onclick="toggleFaq(${i})"><span class="faq-q-text">${f.pregunta}</span><i class="faq-icon">+</i></div><div class="faq-a">${f.respuesta}</div></div>`).join('');

  document.getElementById('aboutText').innerHTML=`<div class="neon-line"></div><h3>${NOSOTROS_D.titulo}</h3><p>${NOSOTROS_D.parrafo1}</p><p>${NOSOTROS_D.parrafo2}</p><p>${NOSOTROS_D.parrafo3}</p><a href="https://wa.me/${NEGOCIO.whatsapp}" target="_blank" class="btn-neon" style="display:inline-block;margin-top:1.5rem">Contáctanos</a>`;
  const fm=document.getElementById('aboutMedia');
  if(fm)fm.innerHTML=(window.FOTOS_NOSOTROS_D||[]).map(f=>f.imagen?`<div class="media-box" style="overflow:hidden;padding:0"><img src="${f.imagen}" style="width:100%;height:100%;object-fit:cover"></div>`:`<div class="media-box"><span class="media-icon">${f.emoji}</span>${f.texto}</div>`).join('');

  const pl=document.getElementById('pasos-label'),pt=document.getElementById('pasos-titulo'),sg=document.getElementById('stepsGrid');
  if(pl)pl.textContent=window.PASOS_LABEL_D||'Es muy fácil';
  if(pt)pt.textContent=window.PASOS_TITULO_D||'CÓMO PEDIR';
  if(sg)sg.innerHTML=(window.PASOS_D||[]).map((p,i)=>`<div class="step-card"><div class="step-num">${String(i+1).padStart(2,'0')}</div><span class="step-icon">${p.emoji||'📌'}</span><div class="step-title">${p.titulo}</div><div class="step-desc">${p.desc}</div></div>`).join('');

  document.getElementById('contactBtns').innerHTML=`<a href="https://wa.me/${NEGOCIO.whatsapp}?text=${encodeURIComponent('Hola! Quiero hacer un pedido en Sarux 🛍️')}" target="_blank" class="btn-wa">📱 WhatsApp</a><a href="${NEGOCIO.instagram||'#'}" target="_blank" class="btn-ig">📸 Instagram</a><a href="${NEGOCIO.tiktok||'#'}" target="_blank" class="btn-tt">🎵 TikTok</a>`;

  // Fotos reales (reseñas): siempre visible
  const frSec = document.getElementById('fotos-reales-sec');
  if(frSec) frSec.style.display = '';
  const frTit = document.getElementById('frSecTitulo');
  if(frTit) frTit.textContent = 'RESEÑAS';
  cargarFotosClientes();

  document.getElementById('footerIg').href=NEGOCIO.instagram||'#';
  document.getElementById('footerTt').href=NEGOCIO.tiktok||'#';
  document.getElementById('footerCopy').textContent=`© ${new Date().getFullYear()} ${NEGOCIO.nombre} — Todos los derechos reservados`;
  document.getElementById('floatWa').href=`https://wa.me/${NEGOCIO.whatsapp}?text=${encodeURIComponent('Hola! Vi el catálogo de Sarux 🛍️')}`;
  document.getElementById('footerIg').href=NEGOCIO.instagram||'#';
  document.getElementById('footerTt').href=NEGOCIO.tiktok||'#';
  window.dispatchEvent(new Event('renderDone'));
}

// CATÁLOGO — buscador simple: tab de categoría + búsqueda + subfiltros
let catActiva=0;
let _catSearchQ='', _sfTipo='Todos', _sfTema='Todos', _sfDiseno='Todos';

function getCatsFilt(){return CATALOGO_D.filter(c=>c.activa);}

function renderTabs(){
  // Renderiza el grid de portadas (nueva UI) + mantiene catTabs para compatibilidad interna
  const cf=getCatsFilt();
  // catTabs oculto pero funcional para subfiltros
  const catTabsEl=document.getElementById('catTabs');
  if(catTabsEl) catTabsEl.innerHTML=cf.map((c,i)=>`<button class="cat-tab ${i===0?'active':''}" onclick="cambiarCat(${i},this)">${c.emoji} ${c.nombre}</button>`).join('');
  catActiva=0;
  resetCatSearch();
  renderPortadas();
}

function renderPortadas(){
  const cf=getCatsFilt();
  const grid=document.getElementById('catPortadasGrid');
  if(!grid) return;
  grid.innerHTML=cf.map((c,i)=>{
    const total=(c.productos||[]).length;
    const mediaEl=c.imagen_portada
      ?`<img src="${c.imagen_portada}" alt="${c.nombre}" class="cat-portada-img" loading="lazy">`
      :`<div class="cat-portada-emoji">${c.emoji||'📦'}</div>`;
    return `<div class="cat-portada-card" onclick="abrirCatPanel(${i})">
      ${mediaEl}
      <div class="cat-portada-overlay"></div>
      <div class="cat-portada-info">
        <div class="cat-portada-name">${c.nombre}</div>
        ${total?`<div class="cat-portada-count">${total} producto${total!==1?'s':''}</div>`:''}
      </div>
      <div class="cat-portada-arrow">›</div>
    </div>`;
  }).join('');
}

// ─── PANEL FULLSCREEN DE CATEGORÍA ─────────────────────────────────────────
let _panelCatIdx = 0;
let _panelSearchQ = '';

// ─── LINKS COMPARTIBLES DE CATEGORÍA ─────────────────────────────────────────
function slugCat(nombre){ return nombre.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,''); }

function compartirCategoria(){
  const cf=getCatsFilt();
  const c=cf[_panelCatIdx];
  if(!c) return;
  const slug=slugCat(c.nombre);
  const url=`${location.origin}${location.pathname}?cat=${encodeURIComponent(slug)}#catalogo`;
  if(navigator.clipboard && navigator.clipboard.writeText){
    navigator.clipboard.writeText(url).then(()=>showToast('🔗 Enlace copiado: '+c.nombre));
  } else {
    // Fallback para navegadores sin clipboard API
    const ta=document.createElement('textarea'); ta.value=url;
    ta.style.cssText='position:fixed;opacity:0'; document.body.appendChild(ta);
    ta.select(); document.execCommand('copy'); document.body.removeChild(ta);
    showToast('🔗 Enlace copiado: '+c.nombre);
  }
}

// Al cargar la página, leer ?cat= y abrir esa categoría automáticamente
function checkCatParam(){
  const params = new URLSearchParams(location.search);
  const catParam = params.get('cat');
  if(!catParam) return;
  const cf=getCatsFilt();
  const idx=cf.findIndex(c=>slugCat(c.nombre)===catParam.toLowerCase());
  if(idx>=0){
    setTimeout(()=>{
      abrirCatPanel(idx);
      // Scroll a la sección catálogo
      const sec=document.getElementById('catalogo');
      if(sec) sec.scrollIntoView({behavior:'smooth',block:'start'});
    }, 400);
  }
}

function abrirCatPanel(idx){
  _panelCatIdx = idx;
  _panelSearchQ = '';
  const cf=getCatsFilt();
  const c=cf[idx];
  if(!c) return;
  document.getElementById('catPanelTitle').textContent = c.nombre;
  document.getElementById('catPanelSearch').value = '';
  const clr=document.getElementById('catPanelSearchClear');
  if(clr) clr.style.display='none';
  // Sync catActiva para que los subfiltros funcionen
  catActiva=idx;
  resetCatSearch();
  renderSubFiltros();
  renderCatPanel();
  document.getElementById('catPanel').classList.add('open');
  document.body.style.overflow='hidden';
}

function cerrarCatPanel(){
  document.getElementById('catPanel').classList.remove('open');
  document.body.style.overflow='';
}

function onCatPanelSearch(val){
  _panelSearchQ=val;
  const clr=document.getElementById('catPanelSearchClear');
  if(clr) clr.style.display=val?'block':'none';
  renderSubFiltros();
  renderCatPanel();
}
function clearCatPanelSearch(){
  _panelSearchQ='';
  const inp=document.getElementById('catPanelSearch');
  if(inp) inp.value='';
  const clr=document.getElementById('catPanelSearchClear');
  if(clr) clr.style.display='none';
  resetCatSearch();
  renderSubFiltros();
  renderCatPanel();
}

function renderCatPanel(){
  const cf=getCatsFilt();
  const c=cf[_panelCatIdx];
  if(!c) return;
  let prods=c.productos||[];

  if(_sfTipo!=='Todos') prods=prods.filter(p=>(p.tipo||'').trim()===_sfTipo);
  if(_sfTema!=='Todos') prods=prods.filter(p=>(p.temas||[]).includes(_sfTema));
  if(_sfDiseno!=='Todos') prods=prods.filter(p=>(p.subtema||'').trim()===_sfDiseno);
  if(_panelSearchQ.trim()){
    const q=_panelSearchQ.trim().toLowerCase();
    prods=prods.filter(p=>
      p.nombre.toLowerCase().includes(q)||
      (p.tipo||'').toLowerCase().includes(q)||
      (p.temas||[]).some(t=>t.toLowerCase().includes(q))||
      (p.subtema||'').toLowerCase().includes(q)||
      (p.descripcion||'').toLowerCase().includes(q)
    );
  }
  prods=sortProductos(prods);

  const countEl=document.getElementById('catPanelCount');
  if(countEl){
    let parts=[];
    if(_sfTipo!=='Todos') parts.push(_sfTipo);
    if(_sfTema!=='Todos') parts.push(_sfTema);
    if(_sfDiseno!=='Todos') parts.push(_sfDiseno);
    if(_panelSearchQ.trim()) parts.push(`"${_panelSearchQ.trim()}"`);
    countEl.textContent=prods.length>0?`${prods.length} producto${prods.length!==1?'s':''}${parts.length?' · '+parts.join(' · '):''}`:'';
  }

  const panelGrid=document.getElementById('catPanelGrid');
  panelGrid.setAttribute('data-cols',GRID_CONFIG.productos||2);
  if(prods.length){
    panelGrid.innerHTML=mkSkeletons(Math.min(prods.length,6));
    requestAnimationFrame(()=>{
      panelGrid.innerHTML=prods.map(p=>mkCard(p,c.nombre,c.emoji)).join('');
      initLazyImages();
      // Mover subfiltros al panel
      const sf=document.getElementById('cat-sub-filters');
      const sfContainer=document.querySelector('.cat-panel-body');
      if(sf && sfContainer){
        const searchBar=sfContainer.querySelector('.cat-search-bar');
        if(searchBar && searchBar.nextSibling !== sf){
          sfContainer.insertBefore(sf, searchBar.nextSibling);
        }
      }
    });
  } else {
    panelGrid.innerHTML=`<div style="padding:3rem;color:var(--gray);font-family:var(--font-mono);font-size:.7rem;letter-spacing:2px;text-align:center">Sin resultados</div>`;
  }
}

function cambiarCat(idx,btn){
  catActiva=idx;
  document.querySelectorAll('.cat-tab').forEach(t=>t.classList.remove('active'));
  if(btn) btn.classList.add('active');
  limpiarBusqueda();
  resetCatSearch();
  renderSubFiltros();
  renderCat();

}

function resetCatSearch(){
  _catSearchQ=''; _sfTipo='Todos'; _sfTema='Todos'; _sfDiseno='Todos';
  const inp=document.getElementById('catSearchInput');
  const clr=document.getElementById('catSearchClear');
  if(inp) inp.value='';
  if(clr) clr.style.display='none';
}

// SUB-FILTROS: Tipo → Tema → Diseño
// Filtros exclusivos de la categoría activa
function renderSubFiltros(){
  const cf=getCatsFilt(); if(!cf.length) return;
  const c=cf[catActiva]||cf[0];
  const prods=c.productos||[];

  // Solo los valores que existen en los productos de ESTA categoría
  const tipos=Array.from(new Set(prods.map(p=>(p.tipo||'').trim()).filter(Boolean))).sort();

  let filtrados=prods;
  if(_sfTipo!=='Todos') filtrados=filtrados.filter(p=>(p.tipo||'').trim()===_sfTipo);

  const temas=Array.from(new Set(filtrados.flatMap(p=>p.temas||[]).filter(Boolean))).sort();

  if(_sfTema!=='Todos') filtrados=filtrados.filter(p=>(p.temas||[]).includes(_sfTema));

  const disenos=Array.from(new Set(filtrados.map(p=>(p.subtema||'').trim()).filter(Boolean))).sort();

  const wrap=document.getElementById('cat-sub-filters');
  if(!tipos.length && !temas.length){wrap.style.display='none';return;}
  wrap.style.display='flex';
  wrap.innerHTML='';

  const mkChip=(label,active,onclick,delay=0)=>{
    const btn=document.createElement('button');
    btn.className='csf-chip'+(active?' active':'');
    btn.style.animationDelay=delay+'ms';
    btn.textContent=label;
    btn.onclick=onclick;
    return btn;
  };
  const mkSep=()=>{
    const s=document.createElement('span');
    s.style.cssText='font-family:var(--font-mono);font-size:.5rem;color:rgba(255,255,255,.15);align-self:center;padding:0 .3rem';
    s.textContent='›'; return s;
  };

  // Nivel 1: Tipos (solo si existen)
  if(tipos.length){
    ['Todos',...tipos].forEach((t,i)=>{
      wrap.appendChild(mkChip(t,t===_sfTipo,()=>{_sfTipo=t;_sfTema='Todos';_sfDiseno='Todos';renderSubFiltros();_renderCatActual();},i*30));
    });
  }

  // Nivel 2: Temáticas — mostrar SIEMPRE que haya temas,
  // ya sea porque se eligió un Tipo o porque no hay Tipos en esta categoría
  const mostrarTemas = temas.length && (_sfTipo!=='Todos' || !tipos.length);
  if(mostrarTemas){
    if(tipos.length) wrap.appendChild(mkSep());
    ['Todos',...temas].forEach((t,i)=>{
      wrap.appendChild(mkChip(t,t===_sfTema,()=>{_sfTema=t;_sfDiseno='Todos';renderSubFiltros();_renderCatActual();},i*25));
    });
  }

  // Nivel 3: Diseños — mostrar cuando hay temática seleccionada
  const mostrarDisenos = disenos.length && (_sfTema!=='Todos');
  if(mostrarDisenos){
    wrap.appendChild(mkSep());
    ['Todos',...disenos].forEach((t,i)=>{
      wrap.appendChild(mkChip(t,t===_sfDiseno,()=>{_sfDiseno=t;renderSubFiltros();_renderCatActual();},i*20));
    });
  }
}

// Decide si re-renderizar el panel o la búsqueda global
function _renderCatActual(){
  const panel=document.getElementById('catPanel');
  if(panel && panel.classList.contains('open')) renderCatPanel();
  else renderCat();
}

function onCatSearch(val){
  _catSearchQ=val;
  const clr=document.getElementById('catSearchClear');
  if(clr) clr.style.display=val?'block':'none';
  if(val.length>2) trackSearch(val.toLowerCase().trim());
  // Mostrar/ocultar panel de búsqueda global vs portadas
  const portadasGrid=document.getElementById('catPortadasGrid');
  const busquedaPanel=document.getElementById('catalogoBusquedaPanel');
  if(val.trim()){
    if(portadasGrid) portadasGrid.style.display='none';
    if(busquedaPanel) busquedaPanel.style.display='';
    renderCat(); // búsqueda global en todos los productos
  } else {
    if(portadasGrid) portadasGrid.style.display='';
    if(busquedaPanel) busquedaPanel.style.display='none';
  }
}
function onCatSearchClear(){
  resetCatSearch();
  const portadasGrid=document.getElementById('catPortadasGrid');
  const busquedaPanel=document.getElementById('catalogoBusquedaPanel');
  if(portadasGrid) portadasGrid.style.display='';
  if(busquedaPanel) busquedaPanel.style.display='none';
  renderSubFiltros();
}

function renderCat(){
  // Búsqueda global en TODOS los productos de todas las categorías
  const cg=document.getElementById('catalogGrid');
  if(!cg) return;
  const cf=getCatsFilt();
  if(!cf.length){ cg.innerHTML=''; return; }

  let allProds=[];
  if(_catSearchQ.trim()){
    const q=_catSearchQ.trim().toLowerCase();
    cf.forEach(c=>{
      (c.productos||[]).filter(p=>
        p.nombre.toLowerCase().includes(q)||
        (p.tipo||'').toLowerCase().includes(q)||
        (p.temas||[]).some(t=>t.toLowerCase().includes(q))||
        (p.subtema||'').toLowerCase().includes(q)||
        (p.descripcion||'').toLowerCase().includes(q)||
        c.nombre.toLowerCase().includes(q)
      ).forEach(p=>allProds.push({p, catNombre:c.nombre, catEmoji:c.emoji}));
    });
  }

  const countEl=document.getElementById('catalogoCount');
  if(countEl) countEl.textContent=allProds.length>0?`${allProds.length} resultado${allProds.length!==1?'s':''} para "${_catSearchQ.trim()}"`:_catSearchQ.trim()?'Sin resultados':'';

  cg.setAttribute('data-cols',GRID_CONFIG.productos||2);
  if(allProds.length){
    cg.innerHTML=mkSkeletons(Math.min(allProds.length,6));
    requestAnimationFrame(()=>{
      cg.innerHTML=allProds.map(({p,catNombre,catEmoji})=>mkCard(p,catNombre,catEmoji)).join('');
      initLazyImages();
    });
  } else {
    cg.innerHTML=_catSearchQ.trim()?`<div style="padding:3rem;color:var(--gray);font-family:var(--font-mono);font-size:.7rem;letter-spacing:2px;text-align:center">Sin resultados para "${_catSearchQ}"</div>`:'';
  }
}

function mkCard(p,catNombre,catEmoji){
  const img=p.imagen?`<img data-src="${p.imagen}" src="" class="card-img-real lazy" alt="${p.nombre}" loading="lazy">`:`<span class="card-img">${catEmoji||p.emoji||'📦'}</span>`;
  const badgeClass=p.badge==='Nuevo'?'badge-new':p.badge==='Más vendido'?'badge-sell':'badge-pop';
  const badgeHTML=p.badge?`<span class="badge ${badgeClass}">${p.badge}</span>`:'';
  const tallasTag=(p.tallas&&p.tallas.length)?`<span class="card-tag">📏 ${p.tallas.join(' · ')}</span>`:'';
  const coloresTag=(p.colores&&p.colores.length)?`<span class="card-tag">🎨 ${p.colores.join(' · ')}</span>`:'';
  const temasTag=(p.temas&&p.temas.length)?`<span class="card-tag" style="color:var(--neon2);border-color:rgba(255,0,60,.2)">🏷️ ${p.temas.join(' · ')}</span>`:'';
  const tienePersonajes=(p.personajes&&p.personajes.length>0);
  const pid = '_p' + Math.random().toString(36).slice(2);
  window._prodRegistry = window._prodRegistry || {};
  window._prodRegistry[pid] = {p, catNombre, catEmoji: catEmoji||'📦'};
  const onclick = tienePersonajes
    ? `abrirPersonajesById('${pid}')`
    : `abrirModalById('${pid}')`;
  const btnLabel=tienePersonajes?'Ver diseños':'Ver producto';
  const extraBadge=tienePersonajes?`<span class="badge badge-new" style="position:absolute;top:.5rem;left:.5rem">GALERÍA</span>`:'';
  const nomSafe=(p.nombre||'').replace(/'/g,'&#39;');
  const catSafe=(catNombre||'').replace(/'/g,'&#39;');
  const shareBtn=`<button class="card-share-btn" onclick="event.stopPropagation();compartirProducto('${nomSafe}','${catSafe}')" title="Compartir">🔗</button>`;
  const cartBtn=tienePersonajes?'':`<button style="background:none;border:none;color:var(--gray);cursor:pointer;font-size:.95rem;padding:.2rem .4rem;transition:color .2s" onclick="event.stopPropagation();agregarAlCarritoById('${pid}')" title="Agregar al carrito" onmouseover="this.style.color='var(--neon)'" onmouseout="this.style.color='var(--gray)'">🛒</button>`;
  return`<div class="product-card" onclick="${onclick}"><div class="card-img-wrap">${img}${extraBadge}${shareBtn}<div class="card-overlay"><button class="card-overlay-btn">${btnLabel}</button></div></div><div class="card-body"><div class="card-cat">${catNombre||p.categoria||''}</div><div class="card-name">${p.nombre}</div><div class="card-tags">${temasTag}${tallasTag}${coloresTag}</div><div class="card-footer"><div class="card-price">$${(p.precio||0).toLocaleString()}<small>MXN</small></div><div style="display:flex;align-items:center;gap:.3rem">${badgeHTML}${cartBtn}</div></div></div></div>`;
}

// GALERÍA DE PERSONAJES
function abrirPersonajesById(pid){
  const r = window._prodRegistry&&window._prodRegistry[pid]; if(!r) return;
  abrirPersonajes(r.p, r.catNombre);
}
function abrirModalById(pid){
  const r = window._prodRegistry&&window._prodRegistry[pid]; if(!r) return;
  abrirModal(r.p, r.catNombre, r.catEmoji);
}
function agregarAlCarritoById(pid){
  const r = window._prodRegistry&&window._prodRegistry[pid]; if(!r) return;
  agregarAlCarrito(r.p, r.catNombre);
}

function abrirPersonajes(p, catNombre){
  document.getElementById('pjTitle').textContent = p.nombre;
  document.getElementById('pjSubtitle').textContent = catNombre + ' · ' + (p.personajes.length) + ' personajes';
  const grid = document.getElementById('pjGrid');
  grid.innerHTML = p.personajes.map(pj => {
    const img = pj.imagen
      ? `<div class="pj-img"><img src="${pj.imagen}" alt="${pj.nombre}"></div>`
      : `<div class="pj-img">${pj.emoji||'🎨'}</div>`;
    const ndis = (pj.disenos||[]).length;
    return `<div class="pj-card" onclick='abrirPersonajeModal(${JSON.stringify(pj)},${JSON.stringify(p)},"${catNombre}")'>
      ${img}
      <div class="pj-overlay"><span>Ver diseños</span></div>
      <div class="pj-name">${pj.nombre}</div>
      ${ndis?`<div class="pj-count">${ndis} diseño${ndis!==1?'s':''}</div>`:''}
    </div>`;
  }).join('');
  document.getElementById('personajesOverlay').classList.add('open');
  document.body.style.overflow='hidden';
}
function cerrarPersonajes(){
  document.getElementById('personajesOverlay').classList.remove('open');
  document.body.style.overflow='';
}
function abrirPersonajeModal(pj, prodPadre, catNombre){
  // Construir un objeto producto temporal con los diseños del personaje
  const prodTmp = {
    ...prodPadre,
    nombre: pj.nombre + ' — ' + prodPadre.nombre,
    imagen: pj.imagen || prodPadre.imagen || '',
    descripcion: pj.descripcion || prodPadre.descripcion || '',
    disenos: pj.disenos || [],
    personajes: [] // no recursivo
  };
  cerrarPersonajes();
  setTimeout(()=>abrirModal(prodTmp, catNombre, prodPadre.emoji||'📦'), 200);
}

// BÚSQUEDA
function buscarProducto(q) {
  if (!CATALOGO_D) return;

  const clearBtn = document.getElementById('searchClearBtn');
  if (clearBtn) clearBtn.style.display = q && q.trim() ? 'block' : 'none';

  if (!q || !q.trim()) {
    ocultarBannerBusqueda();
    renderCat();
    return;
  }

  const termino = q.trim().toLowerCase();
  const cf = getCatsFilt();
  if (!cf.length) return;

  let res = [];
  cf.forEach(cat => {
    (cat.productos || [])
      .filter(p =>
        p.nombre.toLowerCase().includes(termino) ||
        (p.descripcion || '').toLowerCase().includes(termino) ||
        (p.temas || []).some(t => t.toLowerCase().includes(termino)) ||
        (p.colores || []).some(c => c.toLowerCase().includes(termino)) ||
        (p.categoria || '').toLowerCase().includes(termino) ||
        cat.nombre.toLowerCase().includes(termino)
      )
      .forEach(p => res.push({ p, cat }));
  });

  const countEl = document.getElementById('catalogoCount');
  if (countEl) countEl.textContent = '';

  mostrarBannerBusqueda(q.trim(), res.length);

  const cg = document.getElementById('catalogGrid');
  cg.setAttribute('data-cols', GRID_CONFIG.productos);
  cg.innerHTML = res.length
    ? res.map(({ p, cat }) => mkCard(p, cat.nombre, cat.emoji)).join('')
    : `<div style="padding:3rem;color:var(--gray);font-family:var(--font-mono);font-size:.7rem;letter-spacing:2px;grid-column:1/-1">Sin resultados para "<span style="color:var(--neon)">${q.trim()}</span>"</div>`;

  document.getElementById('catalogo').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function mostrarBannerBusqueda(query, total) {
  const banner = document.getElementById('searchResultsBanner');
  const info = document.getElementById('searchResultsInfo');
  if (!banner || !info) return;
  info.textContent = total > 0
    ? `${total} resultado${total !== 1 ? 's' : ''} para "${query}"`
    : `Sin resultados para "${query}"`;
  banner.classList.add('visible');
}

function ocultarBannerBusqueda() {
  const banner = document.getElementById('searchResultsBanner');
  if (banner) banner.classList.remove('visible');
}

function limpiarBusqueda() {
  const inp = document.getElementById('searchInput');
  const clearBtn = document.getElementById('searchClearBtn');
  if (inp) inp.value = '';
  if (clearBtn) clearBtn.style.display = 'none';
  ocultarBannerBusqueda();
  resetCatSearch();
  renderCat();
}

// MODAL PRODUCTO
function abrirModal(p,catNombre,catEmoji){
  trackView(p.nombre);
  window._modalProdActivo = {p, catNombre, catEmoji};
  window._modalDisenoIdx = 0;
  const imgEl=document.getElementById('modalImg');
  _lightboxSrc = p.imagen || (p.disenos&&p.disenos[0]&&p.disenos[0].imagen) || '';
  const zoomBtn = document.getElementById('zoom-btn');
  imgEl.innerHTML=p.imagen?`<img src="${p.imagen}" style="width:100%;max-height:70vw;object-fit:contain;display:block;cursor:zoom-in" onclick="abrirLightbox()">`:catEmoji||'📦';
  if(zoomBtn) zoomBtn.style.display = p.imagen ? 'block' : 'none';
  const prevGal=document.getElementById('modalDisenosGal');if(prevGal)prevGal.remove();
  if(p.disenos&&p.disenos.length>0){
    const wrap=document.createElement('div');wrap.id='modalDisenosGal';wrap.className='modal-disenos';
    p.disenos.forEach((d,i)=>{const thumb=document.createElement('div');thumb.className='diseno-thumb'+(i===0?' active':'');thumb.innerHTML=`<img src="${d.imagen||''}" alt="${d.nombre||''}"><div class="diseno-thumb-label">${d.nombre||''}</div>`;thumb.onclick=()=>{document.querySelectorAll('.diseno-thumb').forEach(t=>t.classList.remove('active'));thumb.classList.add('active');_lightboxSrc=d.imagen||'';window._modalDisenoIdx=i;imgEl.innerHTML=`<img src="${d.imagen}" style="width:100%;max-height:70vw;object-fit:contain;display:block;cursor:zoom-in" onclick="abrirLightbox()">`;if(zoomBtn)zoomBtn.style.display=d.imagen?'block':'none';};wrap.appendChild(thumb);});
    imgEl.insertAdjacentElement('afterend',wrap);
    if(p.disenos[0].imagen){_lightboxSrc=p.disenos[0].imagen;imgEl.innerHTML=`<img src="${p.disenos[0].imagen}" style="width:100%;max-height:70vw;object-fit:contain;display:block;cursor:zoom-in" onclick="abrirLightbox()">`;}
  }
  document.getElementById('modalCat').textContent=catNombre||'';
  document.getElementById('modalName').textContent=p.nombre;
  document.getElementById('modalDesc').textContent=p.descripcion||'';
  document.getElementById('modalPrice').innerHTML=`$${(p.precio||0).toLocaleString()} <small>MXN</small>`;
  document.getElementById('modalStock').textContent=`✦ STOCK DISPONIBLE: ${p.stock||0} piezas`;
  const tw=document.getElementById('modalTallasWrap');
  if(p.tallas&&p.tallas.length){tw.style.display='block';document.getElementById('modalTallas').innerHTML=p.tallas.map(t=>`<button class="size-btn" onclick="selBtn(this,'.sizes-wrap')">${t}</button>`).join('');}else{tw.style.display='none';}
  const cw=document.getElementById('modalColoresWrap');
  if(p.colores&&p.colores.length){cw.style.display='block';document.getElementById('modalColores').innerHTML=p.colores.map(c=>`<button class="color-btn" onclick="selBtn(this,'.colors-wrap')">${c}</button>`).join('');}else{cw.style.display='none';}
  document.getElementById('modalBuyBtn').onclick=()=>{ trackWA(p.nombre); window.open(`https://wa.me/${NEGOCIO.whatsapp}?text=${encodeURIComponent('Hola! Me interesa: '+p.nombre+' - $'+p.precio+' MXN 🛍️')}`,'_blank'); };
  document.getElementById('modalOverlay').classList.add('open');
  document.body.style.overflow='hidden';
  // Cargar reseñas de clientes desde Supabase
  cargarResenasModal();
}
function cerrarModal(){
  document.getElementById('modalOverlay').classList.remove('open');
  // Si el panel de categoría sigue abierto, mantener overflow hidden
  const panel=document.getElementById('catPanel');
  if(panel && panel.classList.contains('open')) return;
  document.body.style.overflow='';
}

async function cargarResenasModal(){
  const el = document.getElementById('modalReviewsList');
  if(!el) return;
  // Reusar caché de fotos si ya existe, evita query extra
  if(_fotosClientesCache && _fotosClientesCache.length){
    const data = _fotosClientesCache.slice(0,8);
    el.innerHTML = data.map(function(r){
      const estrellas = '\u2B50'.repeat(Math.min(5, Math.max(1, r.estrellas || 5)));
      const texto = r.resena || r.producto || '';
      return estrellas + ' \u2014 "' + texto + '" \u2014 <span style="color:var(--neon);font-family:var(--font-mono);font-size:.6rem">' + (r.nombre||'CLIENTE').toUpperCase() + '</span>';
    }).join('<br><br>');
    return;
  }
  el.innerHTML = '<span style="font-family:var(--font-mono);font-size:.6rem;letter-spacing:2px;opacity:.5">Cargando rese\xf1as...</span>';
  try {
    const { data, error } = await sb.from('fotos_clientes')
      .select('nombre, producto, resena, estrellas')
      .order('created_at', { ascending: false })
      .limit(8);
    if(error) throw error;
    if(!data || !data.length){
      el.innerHTML = '<span style="font-family:var(--font-mono);font-size:.6rem;letter-spacing:2px;opacity:.5">S\xe9 el primero en dejar tu rese\xf1a \u2728</span>';
      return;
    }
    el.innerHTML = data.map(function(r){
      const estrellas = '\u2B50'.repeat(Math.min(5, Math.max(1, r.estrellas || 5)));
      const texto = r.resena || r.producto || '';
      return estrellas + ' \u2014 "' + texto + '" \u2014 <span style="color:var(--neon);font-family:var(--font-mono);font-size:.6rem">' + (r.nombre||'CLIENTE').toUpperCase() + '</span>';
    }).join('<br><br>');
  } catch(e){
    el.innerHTML = '<span style="opacity:.4;font-size:.75rem">No se pudieron cargar las rese\xf1as.</span>';
  }
}
function selBtn(btn,wrap){btn.closest(wrap).querySelectorAll('button').forEach(b=>b.classList.remove('active'));btn.classList.add('active');}
document.getElementById('modalOverlay').addEventListener('click',e=>{if(e.target===document.getElementById('modalOverlay'))cerrarModal();});

// MODAL PROMOS
function abrirPromoModal(realIdx){
  const p = PROMOCIONES_D[realIdx];
  if(!p) return;
  // Imagen o emoji
  const imgEl = document.getElementById('promoModalImg');
  if(p.imagen){
    imgEl.innerHTML = `<img src="${p.imagen}" style="width:100%;max-height:70vw;object-fit:contain;display:block">`;
  } else {
    imgEl.textContent = p.emoji || '🔥';
    imgEl.style.fontSize = '6rem';
  }
  document.getElementById('promoModalBadge').textContent = p.descuento;
  document.getElementById('promoModalNombre').textContent = p.nombre;
  document.getElementById('promoModalPrecio').innerHTML = p.precio + ' <small>MXN</small>';
  // Descripcion si existe
  const descWrap = document.getElementById('promoModalDescWrap');
  if(p.descripcion && p.descripcion.trim()){
    descWrap.style.display='block';
    document.getElementById('promoModalDesc').textContent = p.descripcion;
  } else {
    descWrap.style.display='none';
  }
  // Mostrar tiempo restante en el modal
  const cdEl = document.getElementById('promoModalCountdown');
  const h = document.getElementById(`h-${realIdx}`);
  const m = document.getElementById(`m-${realIdx}`);
  const s = document.getElementById(`s-${realIdx}`);
  if(h) cdEl.textContent = `⏱ Tiempo restante: ${h.textContent}:${m.textContent}:${s.textContent}`;
  else cdEl.textContent = '';
  // Botón WA
  const msg = `Hola! Me interesa la promo: ${p.nombre} — ${p.descuento} — ${p.precio} 🔥`;
  document.getElementById('promoModalBuyBtn').onclick = ()=>window.open(`https://wa.me/${NEGOCIO.whatsapp}?text=${encodeURIComponent(msg)}`,'_blank');
  document.getElementById('promoModalOverlay').classList.add('open');
  document.body.style.overflow='hidden';
}
function cerrarPromoModal(){
  document.getElementById('promoModalOverlay').classList.remove('open');
  document.body.style.overflow='';
}

// MODAL MAYOREO
function abrirPaqueteModal(idx){
  const p = MAYOREO_D.paquetes[idx];
  if(!p) return;
  document.getElementById('paqueteModalEmoji').textContent = p.emoji || '📦';
  document.getElementById('paqueteModalNombre').textContent = p.nombre;
  document.getElementById('paqueteModalPrecio').innerHTML = p.precio + ' <small>MXN</small>';
  document.getElementById('paqueteModalPiezas').textContent = p.piezas;
  document.getElementById('paqueteModalIncluye').textContent = p.incluye;
  const msg = `Hola! Me interesa el paquete de mayoreo: ${p.nombre} (${p.piezas}) - ${p.precio} 🎊`;
  document.getElementById('paqueteModalBuyBtn').onclick = ()=>window.open(`https://wa.me/${NEGOCIO.whatsapp}?text=${encodeURIComponent(msg)}`,'_blank');
  document.getElementById('paqueteModalOverlay').classList.add('open');
  document.body.style.overflow='hidden';
}
function cerrarPaqueteModal(){
  document.getElementById('paqueteModalOverlay').classList.remove('open');
  document.body.style.overflow='';
}

function renderMayoreo(){
  if(!MAYOREO_D.activo){document.getElementById('mayoreo').innerHTML='';return;}
  const paquetesHTML=(MAYOREO_D.paquetes||[]).map((p,i)=>`<div class="paquete-card" style="cursor:pointer" onclick="abrirPaqueteModal(${i})"><span class="paquete-emoji">${p.emoji}</span><div class="paquete-nombre">${p.nombre}</div><div class="paquete-piezas">${p.piezas}</div><div class="paquete-precio">${p.precio}</div><div class="paquete-incluye">${p.incluye}</div><div style="margin-top:.8rem;font-family:var(--font-mono);font-size:.5rem;letter-spacing:2px;color:var(--neon);border:1px solid rgba(232,25,44,.3);padding:.3rem .8rem;display:inline-block">VER DETALLES →</div></div>`).join('');
  document.getElementById('mayoreo').innerHTML=`<div class="mayoreo-hero"><div class="mayoreo-titulo">VENTA AL <span>MAYOREO</span></div><div class="mayoreo-subtitulo">${MAYOREO_D.subtitulo}</div><p class="mayoreo-desc">${MAYOREO_D.descripcion}</p><div class="mayoreo-badges"><span class="mayoreo-badge-item">✦ ${MAYOREO_D.minimo}</span><span class="mayoreo-badge-item">✦ ${MAYOREO_D.descuento}</span><span class="mayoreo-badge-item">✦ ${MAYOREO_D.entrega}</span></div><div style="display:flex;gap:1rem;justify-content:center;flex-wrap:wrap;position:relative"><a href="https://wa.me/${NEGOCIO.whatsapp}?text=${encodeURIComponent(MAYOREO_D.whatsapp_msg)}" target="_blank" class="btn-neon">📱 Cotizar ahora</a><a href="#catalogo" class="btn-outline">Ver productos</a></div></div><div style="padding:4rem 3rem 0"><div class="sec-header"><div><div class="sec-label">Para cada ocasión</div><h2 class="sec-title">TIPOS DE EVENTOS</h2></div></div><div class="eventos-grid">${(MAYOREO_D.eventos||[]).map(e=>`<div class="evento-card"><span class="evento-emoji">${e.emoji}</span><div class="evento-nombre">${e.nombre}</div><div class="evento-desc">${e.descripcion}</div></div>`).join('')}</div></div><div style="padding:3rem 3rem 0"><div class="sec-header"><div><div class="sec-label">Elige tu volumen</div><h2 class="sec-title">PAQUETES MAYOREO</h2></div></div><div class="paquetes-mayoreo">${paquetesHTML}</div></div><div style="padding:3rem 3rem 0"><div class="sec-header"><div><div class="sec-label">Así funciona</div><h2 class="sec-title">PROCESO</h2></div></div><div class="proceso-grid">${(MAYOREO_D.proceso||[]).map(p=>`<div class="proceso-card"><div class="proceso-paso">${p.paso}</div><div class="proceso-titulo">${p.titulo}</div><div class="proceso-desc">${p.desc}</div></div>`).join('')}</div></div><div style="padding:2rem 3rem 5rem"><div class="mayoreo-cta"><h3>¿LISTO PARA COTIZAR?</h3><p>Escríbenos por WhatsApp y te enviamos una cotización personalizada en menos de 24 horas.</p><a href="https://wa.me/${NEGOCIO.whatsapp}?text=${encodeURIComponent(MAYOREO_D.whatsapp_msg)}" target="_blank" class="btn-neon">📱 Solicitar cotización gratis</a></div></div>`;
}

// COUNTDOWN — persiste usando timestamp de inicio guardado en Supabase
const cdIntervals={};
function iniciarCD(totalSeg, idx, inicio_ts){
  if(cdIntervals[idx]) clearInterval(cdIntervals[idx]);

  let restante;
  if(inicio_ts){
    // Calcular cuánto tiempo real queda desde que se activó la promo
    const finMs = inicio_ts + totalSeg * 1000;
    restante = Math.max(0, Math.floor((finMs - Date.now()) / 1000));
  } else {
    restante = totalSeg;
  }

  // Si ya expiró, ocultar tarjeta inmediatamente
  if(restante <= 0){
    const card = document.querySelector(`.promo-card[data-promo-idx="${idx}"]`);
    if(card) card.style.display = 'none';
    return;
  }

  // Pintar valor inicial en pantalla de inmediato
  function pintar(){
    const h=document.getElementById(`h-${idx}`);
    const m=document.getElementById(`m-${idx}`);
    const s=document.getElementById(`s-${idx}`);
    if(!h) return;
    h.textContent=String(Math.floor(restante/3600)).padStart(2,'0');
    m.textContent=String(Math.floor((restante%3600)/60)).padStart(2,'0');
    s.textContent=String(restante%60).padStart(2,'0');
  }
  pintar();

  cdIntervals[idx]=setInterval(()=>{
    restante--;
    pintar();
    if(restante<=0){
      clearInterval(cdIntervals[idx]);
      const card=document.querySelector(`.promo-card[data-promo-idx="${idx}"]`);
      if(card) card.style.display='none';
    }
  },1000);
}

// UTILS
function cerrarPopup(){document.getElementById('popup').style.display='none';}
function toggleFaq(i){document.getElementById(`faq-${i}`).classList.toggle('open');}

// CHAT
function chatReply(tipo){const m=document.getElementById('chatMessages');m.innerHTML+=`<div class="chat-msg bot">${CHAT_RESP_D[tipo]||'Escríbenos por WhatsApp 😊'}</div>`;m.scrollTop=m.scrollHeight;}
function toggleChat(){document.getElementById('chatWidget').classList.toggle('open');}
function enviarChat(){const inp=document.getElementById('chatInput');const msg=inp.value.trim();if(!msg)return;const m=document.getElementById('chatMessages');m.innerHTML+=`<div class="chat-msg user">${msg}</div>`;inp.value='';setTimeout(()=>{m.innerHTML+=`<div class="chat-msg bot">Para más info escríbenos por <a href="https://wa.me/${NEGOCIO.whatsapp}" target="_blank" style="color:var(--neon)">WhatsApp</a> 😊</div>`;m.scrollTop=m.scrollHeight;},800);m.scrollTop=m.scrollHeight;}
function chatEnter(e){if(e.key==='Enter')enviarChat();}

//  LLUVIA DE IMÁGENES 
function iniciarLluviaImagen() {
  const canvas = document.getElementById('rainCanvas');
  if (!canvas) return;

  // Si la lluvia está desactivada, limpiar el canvas y salir
  if (!LLUVIA_CONFIG.activa) {
    const ctx2 = canvas.getContext('2d');
    if (ctx2) ctx2.clearRect(0, 0, canvas.width, canvas.height);
    canvas.style.display = 'none';
    return;
  }
  canvas.style.display = 'block';

  const ctx = canvas.getContext('2d');
  let ancho, alto;
  let particulas = [];
  // Usar parámetros del config
  const NUM_PARTICULAS = Math.max(1, Math.min(200, LLUVIA_CONFIG.cantidad || 20));
  const VEL_BASE = Math.max(0.2, LLUVIA_CONFIG.velocidad || 2);
  // espera en segundos que tarda una partícula en reaparecer tras salir
  const ESPERA_MS = Math.max(0, (LLUVIA_CONFIG.espera || 0)) * 1000;

  let imagenCargada = false;
  let imagenObj = new Image();

  const srcImagen = IMAGEN_LLUVIA && IMAGEN_LLUVIA.trim() !== "" ? IMAGEN_LLUVIA : getLogoSrc();
  imagenObj.crossOrigin = "Anonymous";
  imagenObj.onload = () => { imagenCargada = true; };
  imagenObj.onerror = () => { imagenCargada = false; };
  imagenObj.src = srcImagen;

  function redimensionarCanvas() {
    ancho = window.innerWidth;
    alto = window.innerHeight;
    canvas.width = ancho;
    canvas.height = alto;
  }

  function crearParticula(inicializar) {
    const size = Math.floor(Math.random() * 35) + 20;
    return {
      x: Math.random() * ancho,
      // Si es inicialización, distribuir en pantalla; si no, empezar arriba con espera
      y: inicializar ? Math.random() * alto : -size,
      size: size,
      speed: Math.random() * VEL_BASE + VEL_BASE * 0.5,
      rotacion: Math.random() * Math.PI * 2,
      velocidadRotacion: (Math.random() - 0.5) * 0.02,
      opacidad: Math.random() * 0.5 + 0.2,
      esperando: false,
      esperaHasta: 0
    };
  }

  function inicializarParticulas() {
    particulas = [];
    for (let i = 0; i < NUM_PARTICULAS; i++) {
      particulas.push(crearParticula(true));
    }
  }

  function actualizarParticulas() {
    const ahora = Date.now();
    for (let p of particulas) {
      if (p.esperando) {
        if (ahora >= p.esperaHasta) {
          // Reaparecer arriba
          p.esperando = false;
          p.y = -p.size;
          p.x = Math.random() * ancho;
          p.speed = Math.random() * VEL_BASE + VEL_BASE * 0.5;
          p.size = Math.floor(Math.random() * 35) + 20;
          p.opacidad = Math.random() * 0.5 + 0.2;
        }
        continue;
      }
      p.y += p.speed;
      p.rotacion += p.velocidadRotacion;
      if (p.y > alto + p.size) {
        if (ESPERA_MS > 0) {
          // Ocultar y esperar
          p.esperando = true;
          p.esperaHasta = ahora + ESPERA_MS + Math.random() * 1000; // variación de ±1s
          p.y = alto + p.size + 100; // fuera de pantalla mientras espera
        } else {
          p.y = -p.size;
          p.x = Math.random() * ancho;
          p.speed = Math.random() * VEL_BASE + VEL_BASE * 0.5;
          p.size = Math.floor(Math.random() * 35) + 20;
          p.opacidad = Math.random() * 0.5 + 0.2;
        }
      }
      if (p.x < -p.size) p.x = ancho + p.size;
      if (p.x > ancho + p.size) p.x = -p.size;
    }
  }

  function dibujar() {
    if (!ctx) return;
    ctx.clearRect(0, 0, ancho, alto);
    const visibles = particulas.filter(p => !p.esperando);
    if (imagenCargada && imagenObj.complete && imagenObj.naturalWidth > 0) {
      for (let p of visibles) {
        ctx.save();
        ctx.globalAlpha = p.opacidad;
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotacion);
        ctx.drawImage(imagenObj, -p.size/2, -p.size/2, p.size, p.size);
        ctx.restore();
      }
    } else {
      ctx.font = '30px "Segoe UI Emoji"';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      for (let p of visibles) {
        ctx.save();
        ctx.globalAlpha = p.opacidad;
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotacion);
        ctx.fillStyle = COLORES.acento || '#e8192c';
        ctx.fillText('✨', 0, 0);
        ctx.restore();
      }
    }
  }

  function animar() {
    actualizarParticulas();
    dibujar();
    requestAnimationFrame(animar);
  }

  window.addEventListener('resize', () => {
    redimensionarCanvas();
    inicializarParticulas();
  });

  redimensionarCanvas();
  inicializarParticulas();
  animar();
}

// ─── SKELETONS & LAZY LOADING ────────────────────────────────────────────────
function mkSkeletons(n=6){
  return Array(n).fill(0).map(()=>`
    <div class="skeleton-card">
      <div class="skeleton skeleton-img"></div>
      <div class="skeleton-body">
        <div class="skeleton skeleton-line sm"></div>
        <div class="skeleton skeleton-line lg"></div>
        <div class="skeleton skeleton-line sm"></div>
        <div class="skeleton skeleton-price skeleton"></div>
      </div>
    </div>`).join('');
}

function initLazyImages(){
  if(!('IntersectionObserver' in window)){
    // Fallback: cargar todas si no hay IntersectionObserver
    document.querySelectorAll('img.lazy').forEach(function(img){ if(img.dataset.src){ img.src=img.dataset.src; } });
    return;
  }
  const obs = new IntersectionObserver(function(entries){
    entries.forEach(function(e){
      if(e.isIntersecting){
        const img = e.target;
        if(img.dataset.src){ img.src = img.dataset.src; }
        img.onload = function(){ img.classList.add('loaded'); };
        img.onerror = function(){ img.classList.add('loaded'); };
        obs.unobserve(img);
      }
    });
  },{rootMargin:'300px'}); // 300px de anticipación
  document.querySelectorAll('img.lazy').forEach(function(img){ obs.observe(img); });
}

// ─── TOAST ────────────────────────────────────────────────────────────────────
function showToast(msg, duration=2500){
  const wrap = document.getElementById('toastWrap');
  const t = document.createElement('div');
  t.className = 'toast';
  t.textContent = msg;
  wrap.appendChild(t);
  setTimeout(()=>{ t.style.opacity='0'; t.style.transition='opacity .3s'; setTimeout(()=>t.remove(), 300); }, duration);
}

// ─── CARRITO ──────────────────────────────────────────────────────────────────
let carrito = JSON.parse(localStorage.getItem('sarux_carrito')||'[]');

function guardarCarrito(){ localStorage.setItem('sarux_carrito', JSON.stringify(carrito)); }

function agregarAlCarrito(p, catNombre){
  const idx = carrito.findIndex(i => i.id === (p.id||p.nombre));
  if(idx >= 0){ carrito[idx].qty++; }
  else { carrito.push({ id: p.id||p.nombre, nombre: p.nombre, precio: p.precio||0, imagen: p.imagen||'', cat: catNombre||'', qty: 1 }); }
  guardarCarrito();
  actualizarBadge();
  showToast('🛒 ' + p.nombre + ' agregado al carrito');
}

function quitarDelCarrito(id){
  carrito = carrito.filter(i => i.id !== id);
  guardarCarrito(); actualizarBadge(); renderCarrito();
}

function cambiarQty(id, delta){
  const idx = carrito.findIndex(i => i.id === id);
  if(idx < 0) return;
  carrito[idx].qty = Math.max(1, carrito[idx].qty + delta);
  guardarCarrito(); actualizarBadge(); renderCarrito();
}

function vaciarCarrito(){
  carrito = []; guardarCarrito(); actualizarBadge(); renderCarrito();
  showToast('Carrito vaciado');
}

function actualizarBadge(){
  const total = carrito.reduce((s,i)=>s+i.qty,0);
  const badge = document.getElementById('carritoBadge');
  if(badge){ badge.textContent = total; badge.style.display = total > 0 ? 'inline-block' : 'none'; }
  const panelBadge = document.getElementById('catPanelCarritoBadge');
  if(panelBadge){ panelBadge.textContent = total; }
}

function toggleCarrito(){
  const panel = document.getElementById('carritoPanel');
  const overlay = document.getElementById('carritoOverlay');
  const open = panel.classList.toggle('open');
  overlay.classList.toggle('open', open);
  if(open){ renderCarrito(); document.body.style.overflow='hidden'; }
  else { document.body.style.overflow=''; }
}

function renderCarrito(){
  const el = document.getElementById('carritoItems');
  const totalEl = document.getElementById('carritoTotal');
  if(!el) return;
  if(!carrito.length){
    el.innerHTML = '<div class="carrito-empty"><div>🛒</div><p>Tu carrito está vacío</p></div>';
    if(totalEl) totalEl.textContent = '$0';
    return;
  }
  el.innerHTML = carrito.map(item => {
    const imgHtml = item.imagen
      ? `<div class="carrito-item-img"><img src="${item.imagen}" alt="${item.nombre}"></div>`
      : `<div class="carrito-item-img">${item.cat?'📦':'🛍️'}</div>`;
    return `<div class="carrito-item">
      ${imgHtml}
      <div class="carrito-item-info">
        <div class="carrito-item-name">${item.nombre}</div>
        <div class="carrito-item-cat">${item.cat}</div>
        <div class="carrito-item-price">$${(item.precio*item.qty).toLocaleString()} MXN</div>
        <div class="carrito-item-controls">
          <button class="qty-btn" onclick="cambiarQty('${item.id}',-1)">−</button>
          <span class="qty-num">${item.qty}</span>
          <button class="qty-btn" onclick="cambiarQty('${item.id}',1)">+</button>
          <button class="carrito-del" onclick="quitarDelCarrito('${item.id}')" title="Eliminar">🗑️</button>
        </div>
      </div>
    </div>`;
  }).join('');
  const total = carrito.reduce((s,i)=>s+(i.precio*i.qty),0);
  if(totalEl) totalEl.textContent = '$' + total.toLocaleString() + ' MXN';
  // Historial "También te interesó"
  try {
    const hw = document.getElementById('carritoHistorial');
    const hi = document.getElementById('carritoHistorialItems');
    const hist = JSON.parse(localStorage.getItem('sarux_vistos')||'[]');
    const vistos = hist.filter(h => !carrito.find(c=>c.id===h.id));
    if(hi && vistos.length){
      hi.innerHTML = vistos.map(h=>{
        const img = h.imagen ? `<div class="hist-item-img"><img src="${h.imagen}"></div>` : `<div class="hist-item-img">${h.emoji||'📦'}</div>`;
        return `<div class="hist-item" onclick="toggleCarrito();setTimeout(()=>abrirModalById('${h.id}'),250)" title="${h.nombre}">${img}<div class="hist-item-name">${h.nombre}</div></div>`;
      }).join('');
      if(hw) hw.style.display='block';
    } else {
      if(hw) hw.style.display='none';
    }
  } catch(e){}
}

function pedirPorWhatsApp(){
  if(!carrito.length){ showToast('Tu carrito está vacío'); return; }
  const lineas = carrito.map(i=>`• ${i.nombre} x${i.qty} — $${(i.precio*i.qty).toLocaleString()} MXN`).join('%0A');
  const total = carrito.reduce((s,i)=>s+(i.precio*i.qty),0);
  const msg = `Hola! Quiero hacer el siguiente pedido en SARUX 🛍️%0A%0A${lineas}%0A%0A*TOTAL: $${total.toLocaleString()} MXN*%0A%0A¿Me pueden confirmar disponibilidad?`;
  window.open(`https://wa.me/${NEGOCIO.whatsapp}?text=${msg}`, '_blank');
}

// ─── COMPARTIR ────────────────────────────────────────────────────────────────
function compartirProducto(nombre, catNombre){
  const url = window.location.href.split('#')[0] + '#catalogo';
  const texto = `${nombre} — ${catNombre} | SARUX: ${url}`;
  if(navigator.share){
    navigator.share({ title: nombre, text: `Mira este producto en SARUX: ${nombre}`, url }).catch(()=>{});
  } else {
    navigator.clipboard.writeText(texto).then(()=>showToast('🔗 Link copiado al portapapeles')).catch(()=>showToast('🔗 ' + texto));
  }
}

// ─── COMPARTIR IMAGEN ESPECÍFICA ─────────────────────────────────────────────
function compartirImagenActiva(){
  const ref = window._modalProdActivo;
  if(!ref) return;
  const idx = window._modalDisenoIdx || 0;
  const base = window.location.href.split('?')[0].split('#')[0];
  const url = base + '?prod=' + encodeURIComponent(ref.p.nombre) + '&img=' + idx + '#catalogo';
  if(navigator.share){
    navigator.share({ title: ref.p.nombre, text: 'Mira este diseño en SARUX', url }).catch(()=>{});
  } else {
    navigator.clipboard.writeText(url).then(()=>showToast('🔗 Link copiado al portapapeles')).catch(()=>showToast('🔗 Link: ' + url));
  }
}

// Al cargar la página, si hay ?prod= y ?img= en la URL, abre ese producto en esa imagen
function checkDeepLink(){
  // Checa ?cat= para abrir categoría directa
  checkCatParam();
  const params = new URLSearchParams(window.location.search);
  const prodNombre = params.get('prod');
  const imgIdx = parseInt(params.get('img')||'0');
  if(!prodNombre) return;
  // Buscar el producto en el catálogo
  let found = null, foundCat = null;
  (CATALOGO_D||[]).forEach(cat => {
    (cat.productos||[]).forEach(p => {
      if(p.nombre === prodNombre){ found = p; foundCat = cat; }
    });
  });
  if(!found) return;
  // Abrir modal
  setTimeout(()=>{
    abrirModal(found, foundCat.nombre, foundCat.emoji);
    // Seleccionar la imagen correcta
    if(imgIdx > 0 && found.disenos && found.disenos[imgIdx]){
      setTimeout(()=>{
        const thumbs = document.querySelectorAll('.diseno-thumb');
        if(thumbs[imgIdx]) thumbs[imgIdx].click();
      }, 150);
    }
    document.getElementById('catalogo').scrollIntoView({behavior:'smooth'});
  }, 800);
}

function sortProductos(prods){ return [...prods]; }

// ─── ESTADÍSTICAS (localStorage) ─────────────────────────────────────────────
const STATS_KEY = 'sarux_stats';
function getStats(){
  try { return JSON.parse(localStorage.getItem(STATS_KEY)||'{}'); } catch(e){ return {}; }
}
function saveStats(s){ localStorage.setItem(STATS_KEY, JSON.stringify(s)); }

function trackView(prodNombre){
  const s = getStats();
  s.vistas = s.vistas||{};
  s.vistas[prodNombre] = (s.vistas[prodNombre]||0) + 1;
  saveStats(s);
  // Guardar en historial "También te interesó" (últimos 5)
  try {
    const ref = window._modalProdActivo;
    if(ref){
      const hist = JSON.parse(localStorage.getItem('sarux_vistos')||'[]');
      const entry = { id: ref.p.id||ref.p.nombre, nombre: ref.p.nombre, precio: ref.p.precio||0, imagen: ref.p.imagen||'', cat: ref.catNombre||'', emoji: ref.catEmoji||'📦' };
      const filtered = hist.filter(h => h.id !== entry.id);
      filtered.unshift(entry);
      localStorage.setItem('sarux_vistos', JSON.stringify(filtered.slice(0,5)));
    }
  } catch(e){}
}
function trackSearch(q){
  if(!q||q.length<2) return;
  const s = getStats();
  s.busquedas = s.busquedas||{};
  s.busquedas[q] = (s.busquedas[q]||0) + 1;
  saveStats(s);
}
function trackWA(prodNombre){
  const s = getStats();
  s.whatsapp = s.whatsapp||{};
  s.whatsapp[prodNombre] = (s.whatsapp[prodNombre]||0) + 1;
  saveStats(s);
}

// ─── AGREGAR AL CARRITO DESDE MODAL (usa imagen activa) ──────────────────────
function agregarDesdeModal(){
  const ref = window._modalProdActivo;
  if(!ref) return;
  const {p, catNombre} = ref;
  const imagenActiva = _lightboxSrc || p.imagen || '';
  agregarAlCarrito({...p, imagen: imagenActiva}, catNombre);
}

// ─── INIT CARRITO ─────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', ()=>{ actualizarBadge(); });
window.addEventListener('renderDone', checkDeepLink);

// LIGHTBOX
let _lightboxSrc = '';
function abrirLightbox() {
  if(!_lightboxSrc) return;
  document.getElementById('lightbox-img').src = _lightboxSrc;
  document.getElementById('lightbox').classList.add('open');
  document.body.style.overflow = 'hidden';
}
function abrirLightboxMedia(src, tipo) {
  const lb = document.getElementById('lightbox');
  const img = document.getElementById('lightbox-img');
  // Remove existing video if any
  let vid = document.getElementById('lightbox-vid');
  if(tipo === 'video'){
    img.style.display = 'none';
    if(!vid){
      vid = document.createElement('video');
      vid.id = 'lightbox-vid';
      vid.controls = true;
      vid.autoplay = true;
      vid.style.cssText = 'max-width:95vw;max-height:95vh;object-fit:contain;border-radius:2px;animation:lightboxIn .25s ease';
      lb.appendChild(vid);
    }
    vid.src = src;
    vid.style.display = 'block';
  } else {
    if(vid){ vid.pause(); vid.style.display='none'; vid.src=''; }
    img.style.display = 'block';
    img.src = src;
  }
  lb.classList.add('open');
  document.body.style.overflow = 'hidden';
}
function cerrarLightbox() {
  const lb = document.getElementById('lightbox');
  lb.classList.remove('open');
  document.body.style.overflow = '';
  const vid = document.getElementById('lightbox-vid');
  if(vid){ vid.pause(); vid.src=''; }
}
document.addEventListener('keydown', e => { if(e.key==='Escape'){ cerrarLightbox(); cerrarCatPanel(); } });
function reproducirVideoResena(wrapper, url){
  abrirLightboxMedia(url, 'video');
}

// INIT — loader configurable desde el admin, página carga en segundo plano
(async function(){
  // Leer config del loader (desde caché local si existe, si no defaults)
  function getLoaderCfg(){
    try {
      const cached = localStorage.getItem('sarux_cfg');
      if(cached){
        const parsed = JSON.parse(cached);
        return parsed.LOADER_CONFIG || {};
      }
    } catch(e){}
    return {};
  }
  const loaderCfg   = getLoaderCfg();
  const LOADER_MIN_MS = Math.min(15, Math.max(1, loaderCfg.segundos || 5)) * 1000;
  const LOADER_MSGS = loaderCfg.mensajes && loaderCfg.mensajes.length
    ? loaderCfg.mensajes
    : ['Cargando productos...','Preparando catálogo...','Cargando imágenes...','Casi listo...','¡Ya mero!'];

  const tiempoInicio = Date.now();
  const loader = document.getElementById('sarux-loader');
  const barra  = loader ? loader.querySelector('.loader-barra') : null;
  const texto  = loader ? loader.querySelector('.loader-texto') : null;

  // Animar barra y mensajes durante el tiempo configurado
  function animarBarra(){
    if(!barra) return;
    let paso = 0;
    const intervaloMsg = LOADER_MIN_MS / LOADER_MSGS.length;
    if(texto) texto.textContent = LOADER_MSGS[0];
    const intervalMsg = setInterval(function(){
      paso++;
      if(texto && LOADER_MSGS[paso]) texto.textContent = LOADER_MSGS[paso];
      if(paso >= LOADER_MSGS.length - 1) clearInterval(intervalMsg);
    }, intervaloMsg);
    barra.style.transition = 'width ' + LOADER_MIN_MS + 'ms linear';
    barra.style.animationName = 'none';
    requestAnimationFrame(function(){
      requestAnimationFrame(function(){ barra.style.width = '100%'; });
    });
  }
  animarBarra();

  const ocultarLoader = function(){
    if(loader) loader.classList.add('oculto');
  };

  // PASO 1: preparar página en background con DEFAULTS
  APP_DATA = JSON.parse(JSON.stringify(DEFAULTS));
  syncGlobalsFromAppData();
  try { applyStyles(); } catch(e){}
  try { renderPage(); } catch(e){}

  // PASO 2: cargar caché local y Supabase en paralelo, en segundo plano
  try {
    const cached = localStorage.getItem('sarux_cfg');
    if(cached){
      const parsed = JSON.parse(cached);
      APP_DATA = { ...DEFAULTS, ...parsed };
      syncGlobalsFromAppData();
      try { applyStyles(); } catch(e){}
      try { renderPage(); } catch(e){}
    }
    sb.from('site_config').select('config_data').eq('id',1).single().then(function(res){
      const data = res.data, error = res.error;
      if(!error && data){
        try{ localStorage.setItem('sarux_cfg', JSON.stringify(data.config_data)); }catch(e){}
        APP_DATA = { ...DEFAULTS, ...data.config_data };
        syncGlobalsFromAppData();
        try { applyStyles(); } catch(e){}
        try { renderPage(); } catch(e){}
      }
    });
  } catch(e){}

  // PASO 3: esperar el tiempo configurado, luego quitar loader
  const transcurrido = Date.now() - tiempoInicio;
  const espera = Math.max(0, LOADER_MIN_MS - transcurrido);
  setTimeout(function(){
    ocultarLoader();
    try { iniciarLluviaImagen(); } catch(e){}
  }, espera);
})();

// ─── FOTOS REALES (Supabase) ──────────────────────────────────────────────────

// Caché en memoria para fotos de clientes (evita re-fetch en la misma sesión)
let _fotosClientesCache = null;
let _fotosClientesCacheTs = 0;
const FOTOS_CACHE_TTL = 5 * 60 * 1000; // 5 minutos

async function cargarFotosClientes(){
  const grid = document.getElementById('fotosRealesGrid');
  if(!grid) return;
  try {
    const ahora = Date.now();
    // Usar caché si es reciente
    if(_fotosClientesCache && (ahora - _fotosClientesCacheTs) < FOTOS_CACHE_TTL){
      renderFotosClientes(_fotosClientesCache);
      return;
    }
    const { data, error } = await sb
      .from('fotos_clientes')
      .select('id, nombre, producto, imagen_url, resena, estrellas, created_at')
      .order('created_at', { ascending: false })
      .limit(20); // Máximo 20 fotos para no sobrecargar
    if(error) throw error;
    _fotosClientesCache = data || [];
    _fotosClientesCacheTs = ahora;
    renderFotosClientes(_fotosClientesCache);
  } catch(e){
    console.warn('fotos_clientes:', e);
    grid.innerHTML = '<div class="foto-real-nueva">📷<span>Sin fotos aún</span></div>';
  }
}

function supabaseImgOpt(url, w){
  w = w || 400;
  if(!url || url.indexOf('/storage/v1/object/public/') === -1) return url;
  return url + '?width=' + w + '&quality=75&resize=cover';
}

function renderFotosClientes(rows){
  const grid = document.getElementById('fotosRealesGrid');
  if(!grid) return;
  if(!rows.length){
    grid.innerHTML = '<div class="foto-real-nueva">\uD83D\uDCF7<span>\xA1S\xe9 el primero en dejar tu rese\xf1a!</span></div>';
    return;
  }
  grid.innerHTML = rows.map(function(r){
    const esVideo = r.imagen_url && /\.(mp4|mov|webm|ogg)(\?|$)/i.test(r.imagen_url);
    const estrellas = '\u2B50'.repeat(Math.min(5, Math.max(1, r.estrellas || 5)));
    let mediaEl = '';
    if(r.imagen_url){
      const imgSrc = esVideo ? r.imagen_url : supabaseImgOpt(r.imagen_url, 400);
      const imgFull = r.imagen_url;
      mediaEl = esVideo
        ? '<div class="resena-media resena-media-video" onclick="reproducirVideoResena(this,\'' + imgFull.replace(/'/g,"\\'") + '\');event.stopPropagation()" style="cursor:pointer;position:relative">' +
            '<video muted playsinline preload="none" class="resena-vid-thumb" style="width:100%;height:100%;object-fit:cover;display:block"></video>' +
            '<div class="resena-play-overlay"><span class="resena-play-btn">\u25B6</span></div>' +
            '<div class="resena-media-badge">\u25B6 VIDEO</div>' +
           '</div>'
        : '<div class="resena-media"><img data-src="' + imgSrc + '" src="" alt="' + r.nombre + '" class="lazy" loading="lazy" style="width:100%;height:100%;object-fit:cover" onclick="abrirLightboxMedia(\'' + imgFull + '\',\'img\');event.stopPropagation()"></div>';
    }
    const resenaTxt = r.resena
      ? '<div class="resena-texto">"' + r.resena + '"</div>'
      : '<div class="resena-texto">"' + r.producto + '"</div>';
    if(!r.imagen_url){
      return '<div class="resena-card resena-card-texto"><div class="resena-body">' + resenaTxt +
        '<div class="resena-estrellas">' + estrellas + '</div>' +
        '<div class="resena-nombre">\u2014 ' + r.nombre + '</div></div></div>';
    }
    return '<div class="resena-card">' + mediaEl + '<div class="resena-body">' + resenaTxt +
      '<div class="resena-estrellas">' + estrellas + '</div>' +
      '<div class="resena-nombre">\u2014 ' + r.nombre + '</div></div></div>';
  }).join('');

  // Lazy loading para imágenes
  initLazyImages();

  // Videos: cargar solo cuando entren en viewport
  if('IntersectionObserver' in window){
    const vidObs = new IntersectionObserver(function(entries){
      entries.forEach(function(e){
        if(e.isIntersecting){
          const vid = e.target;
          const card = vid.closest('.resena-media-video');
          if(card){
            const srcFull = card.getAttribute('onclick').match(/reproducirVideoResena\(this,'([^']+)'\)/);
            if(srcFull && srcFull[1]){ vid.src = srcFull[1] + '#t=0.5'; }
          }
          vid.addEventListener('loadedmetadata',function(){ try{ vid.currentTime=0.5; }catch(er){} },{once:true});
          vidObs.unobserve(vid);
        }
      });
    },{rootMargin:'200px'});
    grid.querySelectorAll('.resena-vid-thumb').forEach(function(vid){ vidObs.observe(vid); });
  }
}

// ── Abrir modal de reseña desde modal de producto ────────────────────────────
function abrirFrModalDesdeProducto(){
  // Cerrar modal de producto primero
  cerrarModal();
  // Pequeño delay para que se vea la transición
  setTimeout(()=>{
    abrirFrModal();
    // Pre-rellenar el nombre del producto si está disponible
    const prod = window._modalProdActivo;
    if(prod && prod.p && prod.p.nombre){
      const frProd = document.getElementById('frProducto');
      if(frProd) frProd.value = prod.p.nombre;
    }
  }, 200);
}

// ── Modal subir foto ──────────────────────────────────────────────────────────
function abrirFrModal(){
  document.getElementById('frModalOverlay').classList.add('open');
  document.body.style.overflow = 'hidden';
  // Init stars
  window._frStars = 0;
  const stars = document.querySelectorAll('.star-opt');
  stars.forEach(s => {
    s.onclick = function(){
      window._frStars = parseInt(this.dataset.val);
      stars.forEach((st,i)=>st.textContent = i < window._frStars ? '⭐' : '☆');
    };
  });
}
function cerrarFrModal(){
  document.getElementById('frModalOverlay').classList.remove('open');
  document.body.style.overflow = '';
  document.getElementById('frNombre').value = '';
  document.getElementById('frProducto').value = '';
  const resena = document.getElementById('frResena');
  if(resena) resena.value = '';
  document.getElementById('frFile').value = '';
  document.getElementById('frPreviewImg').style.display = 'none';
  document.getElementById('frPreviewImg').src = '';
  const vid = document.getElementById('frPreviewVid');
  if(vid){ vid.style.display='none'; vid.src=''; }
  document.getElementById('frUploadLabel').style.display = 'block';
  document.getElementById('frProgress').style.display = 'none';
  document.getElementById('frProgressBar').style.width = '0';
  document.getElementById('frSubmitBtn').disabled = false;
  document.getElementById('frSubmitBtn').textContent = '📤 PUBLICAR MI RESEÑA';
  // Reset stars
  document.querySelectorAll('.star-opt').forEach(s=>s.textContent='☆');
  window._frStars = 0;
}

function prevFrFoto(input){
  const f = input.files[0];
  if(!f) return;
  const esVideo = f.type.startsWith('video/');
  const reader = new FileReader();
  reader.onload = e => {
    const prev = document.getElementById('frPreviewImg');
    const prevVid = document.getElementById('frPreviewVid');
    if(esVideo){
      prev.style.display = 'none'; prev.src = '';
      prevVid.src = e.target.result;
      prevVid.style.display = 'block';
    } else {
      prevVid.style.display = 'none'; prevVid.src = '';
      prev.src = e.target.result;
      prev.style.display = 'block';
    }
    document.getElementById('frUploadLabel').style.display = 'none';
  };
  reader.readAsDataURL(f);
}

async function subirFotoCliente(){
  const nombre  = document.getElementById('frNombre').value.trim();
  const producto = document.getElementById('frProducto').value.trim();
  const resena   = (document.getElementById('frResena')||{}).value?.trim() || '';
  const estrellas = window._frStars || 5;
  const file    = document.getElementById('frFile').files[0];

  if(!nombre)  { showToast('Escribe tu nombre'); return; }
  if(!producto){ showToast('Escribe el producto'); return; }
  if(!file)    { showToast('Elige una foto o video'); return; }

  const btn = document.getElementById('frSubmitBtn');
  const prog = document.getElementById('frProgress');
  const bar  = document.getElementById('frProgressBar');
  btn.disabled = true;
  btn.innerHTML = '⏳ Subiendo...';
  prog.style.display = 'block';
  bar.style.width = '30%';

  try {
    const ext = file.name.split('.').pop();
    const fileName = `${Date.now()}_${Math.random().toString(36).substr(2,7)}.${ext}`;
    const filePath = `fotos-clientes/${fileName}`;

    const { data: upData, error: upError } = await sb.storage
      .from('images')
      .upload(filePath, file, { cacheControl: '3600', upsert: false });
    if(upError) throw upError;
    bar.style.width = '65%';

    const { data: urlData } = sb.storage.from('images').getPublicUrl(filePath);
    const imagen_url = urlData.publicUrl;
    bar.style.width = '80%';

    const { error: dbError } = await sb
      .from('fotos_clientes')
      .insert([{ nombre, producto, imagen_url, resena, estrellas }]);
    if(dbError) throw dbError;
    bar.style.width = '100%';

    await cargarFotosClientes();
    _fotosClientesCache = null; // invalidar caché para mostrar la nueva reseña
    cerrarFrModal();
    showToast('✅ ¡Tu reseña ya está publicada!', 3500);

    // Notificar al dueño por WhatsApp
    try {
      const wa = window.APP_DATA?.NEGOCIO?.whatsapp || window.NEGOCIO?.whatsapp || '522229250603';
      const msg = `🔔 *Nueva reseña en SARUX*%0A%0A👤 *Cliente:* ${encodeURIComponent(nombre)}%0A🛍️ *Producto:* ${encodeURIComponent(producto)}%0A⭐ *Estrellas:* ${estrellas}/5%0A💬 *Reseña:* ${encodeURIComponent(resena || 'Sin texto')}`;
      window.open(`https://wa.me/${wa}?text=${msg}`, '_blank');
    } catch(e){}

  } catch(e){
    console.error('Error reseña:', e);
    btn.disabled = false;
    btn.innerHTML = '📤 PUBLICAR MI RESEÑA';
    prog.style.display = 'none';
    const msg = e.message || e.error_description || JSON.stringify(e);
    showToast('Error: ' + msg, 5000);
  }
}

// ─── NAVEGACIÓN CON HASH + BOTÓN ATRÁS DEL CELULAR ────────────────────────────
(function(){
  const secciones = ['inicio','promociones','catalogo','mayoreo','nosotros','contacto','tiktok-section'];
  let scrollManual = false;
  let ultimaSeccion = '';

  function scrollToSection(id){
    scrollManual = true;
    const el = document.getElementById(id);
    if(el) el.scrollIntoView({behavior:'smooth', block:'start'});
    setTimeout(()=>{ scrollManual = false; }, 800);
  }

  // Clicks en links del menú
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', function(e){
      const target = this.getAttribute('href').replace('#','');
      if(secciones.includes(target)){
        e.preventDefault();
        history.pushState(null, null, '#'+target);
        scrollToSection(target);
      }
    });
  });

  // Botón atrás del celular — un solo listener
  window.addEventListener('popstate', function(){
    if(scrollManual) return;
    // Si el panel de categoría está abierto, cerrarlo primero
    const panel=document.getElementById('catPanel');
    if(panel && panel.classList.contains('open')){ cerrarCatPanel(); return; }
    const hash = window.location.hash.replace('#','');
    if(hash && secciones.includes(hash)){
      const el = document.getElementById(hash);
      if(el) el.scrollIntoView({behavior:'smooth', block:'start'});
    } else {
      window.scrollTo({top:0, behavior:'smooth'});
    }
  });

  // IntersectionObserver para actualizar hash al hacer scroll
  if('IntersectionObserver' in window){
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if(entry.isIntersecting){
          const id = entry.target.id;
          if(id && secciones.includes(id) && id !== ultimaSeccion){
            ultimaSeccion !== ''
              ? history.pushState({ seccion: id }, '', '#' + id)
              : history.replaceState({ seccion: id }, '', '#' + id);
            ultimaSeccion = id;
          }
        }
      });
    }, { threshold: 0.4, rootMargin: '-10% 0px -10% 0px' });

    const iniciar = () => secciones.forEach(id => { const el=document.getElementById(id); if(el) obs.observe(el); });
    document.readyState === 'loading'
      ? document.addEventListener('DOMContentLoaded', iniciar)
      : iniciar();
  }
})();
