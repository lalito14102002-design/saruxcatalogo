//  CONFIGURACIÓN DE SUPABASE (cargada desde config.js)
const SUPABASE_URL = window.SUPABASE_URL || 'https://ngavbeiochxdvgzcywuh.supabase.co';
const SUPABASE_ANON_KEY = window.SUPABASE_ANON_KEY || '';
const sb = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// ── Abrir enlaces externos (WhatsApp, Instagram, etc.) de forma robusta ──
// En PWAs instaladas (display:"standalone"), muchos navegadores/WebViews de Android
// bloquean o ignoran silenciosamente window.open(url,'_blank'), dejando los botones
// sin respuesta. Esta función detecta ese caso y hace fallback a location.href,
// que el sistema operativo intercepta correctamente para abrir WhatsApp/Instagram.

// Detecta si la página se está ejecutando como app instalada (PWA), no como
// pestaña normal del navegador. Se usa, por ejemplo, para exigir que el cupón
// de bienvenida solo se otorgue a quien instaló la app Y se registró.
function esAppInstalada(){
  try{
    return (window.matchMedia && window.matchMedia('(display-mode: standalone)').matches)
      || window.navigator.standalone === true
      || localStorage.getItem('sarux_pwa_instalada') === '1';
  }catch(e){
    return false;
  }
}

function abrirEnlaceExterno(url){
  if(!url) return;
  try{
    const esStandalone = window.matchMedia && window.matchMedia('(display-mode: standalone)').matches
      || window.navigator.standalone === true;
    if(esStandalone){
      window.location.href = url;
      return;
    }
    const ventana = window.open(url, '_blank');
    if(!ventana){
      // window.open fue bloqueado por el navegador: usamos fallback
      window.location.href = url;
    }
  }catch(e){
    window.location.href = url;
  }
}
window.abrirEnlaceExterno = abrirEnlaceExterno;

// ── STUBS: funciones del sistema de referidos (pendientes de implementar) ──
// Estas funciones se definen aquí para evitar errores si se llaman antes de estar listas.
function detectarRefEnURL(){
  try {
    const params = new URLSearchParams(window.location.search);
    const ref = params.get('ref');
    if(ref) { try{ localStorage.setItem('sarux_ref', ref); }catch(e){} }
  } catch(e){}
}
var REFERIDOS_CFG = null;
function cargarConfigReferidos(){
  return sb.from('referidos_config').select('*').limit(1).single()
    .then(function(res){ if(res && res.data) REFERIDOS_CFG = res.data; })
    .catch(function(){ REFERIDOS_CFG = null; });
}
function aplicarDescuentoReferidoSiAplica(){
  // Lógica de descuento por referido — implementar según necesidad
}
function registrarUsoReferido(){
  // Registra que se usó un cupón de referido — implementar según necesidad
}
// ── FIN STUBS ──

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
  MAS_VENDIDOS_CONFIG:{cantidad:4,horas:24},
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
  FOTOS_CLIENTES_CFG:{activo:true,titulo:"FOTOS REALES",subtitulo:"Clientes reales, resultados reales"},
  PWA_BANNER:{activo:false,titulo:"📲 DESCARGA LA APP",mensaje:"Instala SARUX y obtén 10% de descuento en tu primera compra 🎁"},
  CUPONES_CFG:{
    bienvenida_porcentaje: 10,
    cumpleanos_porcentaje: 20,
    cumpleanos_mensaje: "¡Feliz cumpleaños, {nombre}! 🎂 Aquí tienes un regalo de SARUX."
  },
  MANTENIMIENTO_CFG:{
    activo: false,
    titulo: "🔧 ACTUALIZACIÓN EN CURSO",
    mensaje: "Estamos mejorando SARUX para ti. Vuelve en unos minutos.",
    termina_en: null
  },
  FIDELIDAD_PRECIO:30,
  FIDELIDAD_TERMINOS:"TÉRMINOS Y CONDICIONES — TARJETA DE FIDELIDAD SARUX\n\nAdquisición y Reposición de la Tarjeta\n1. La tarjeta de fidelidad Sarux tiene un costo de $30 MXN.\n2. Es obligatorio presentar la tarjeta física en cada compra para acumular y hacer válidos los beneficios. Sin tarjeta no se registra la compra.\n3. En caso de pérdida o daño, la reposición tiene un costo de $50 MXN.\n4. La tarjeta es personal e intransferible.\n5. Cada cliente puede tener únicamente una cuenta activa vinculada a su correo electrónico.\n\nAcumulación de Compras\n6. Las compras se registran únicamente al presentar la tarjeta física al momento del pedido. No se aplican compras anteriores de forma retroactiva.\n7. Los pedidos realizados sin tarjeta o como invitado no acumulan compras.\n8. Las compras canceladas o con devolución no cuentan para acumular.\n9. Los errores en el registro de compras deben reportarse en un máximo de 7 días posteriores al pedido.\n\nVigencia\n10. Los puntos acumulados tienen una vigencia de 6 meses a partir de la entrega de la tarjeta. Al vencer este plazo, el contador regresa a cero.\n11. Los beneficios de cada nivel aplican únicamente mientras el cliente mantenga el nivel activo.\n\nBeneficios y Descuentos\n12. Los descuentos no son acumulables entre sí ni con otras promociones, salvo aviso expreso de Sarux.\n13. El cupón de cumpleaños tiene validez de 30 días a partir de la fecha de cumpleaños y aplica solo durante ese mes.\n14. La fecha de cumpleaños solo puede modificarse una vez y debe coincidir con una identificación oficial.\n15. Los beneficios no tienen valor en efectivo ni pueden canjearse por dinero.\n16. El nivel alcanzado no garantiza disponibilidad de productos exclusivos si están agotados.\n17. La atención prioritaria por WhatsApp del nivel Diamante tiene un horario de respuesta de 24 horas hábiles.\n\nProtección contra Mal Uso\n18. Queda prohibido crear cuentas falsas o múltiples para acumular compras artificialmente.\n19. En caso de detectar fraude o mal uso, Sarux cancelará la cuenta sin previo aviso.\n20. Sarux se reserva el derecho de verificar la identidad del cliente antes de aplicar cualquier beneficio.\n\nDatos Personales\n21. Los datos registrados se usan exclusivamente para la gestión del programa de fidelidad. Sarux no los comparte con terceros.\n22. Sarux no se hace responsable si el cliente no recibe notificaciones por tener el correo incorrecto registrado.\n\nModificaciones al Programa\n23. Sarux puede modificar, suspender o cancelar el programa en cualquier momento, notificando con anticipación por redes sociales o sitio web."
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
  window.PWA_BANNER_CFG = APP_DATA.PWA_BANNER || DEFAULTS.PWA_BANNER;
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
    const popupEmojiHtml = (POPUP_D.emoji && POPUP_D.emoji.trim()) ? `<div style="font-size:2rem;margin-bottom:.5rem">${POPUP_D.emoji}</div>` : '';
    document.getElementById('popup').innerHTML=`<div class="popup-overlay"><div class="popup-box"><button class="popup-close" onclick="cerrarPopup()">✕</button>${popupEmojiHtml}${logoTag(50)}<div class="popup-title" style="margin-top:1rem">${POPUP_D.titulo}</div><p class="popup-desc">${POPUP_D.descripcion}</p><button class="popup-btn" onclick="cerrarPopup()">${POPUP_D.boton}</button></div></div>`;
    // El popup solo se cierra cuando el usuario lo cierra manualmente
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
  mv.innerHTML=getMasVendidosAutomaticos().map(({p,catNombre,catEmoji})=>mkCard(p,catNombre,catEmoji)).join('');

  renderTabs();renderMayoreo();

  const lg=document.getElementById('launchGrid');
  lg.setAttribute('data-cols',GRID_CONFIG.lanzamientos);
  lg.innerHTML=LANZAMIENTOS_D.filter(l=>l.activo).map(l=>{const imgHTML=l.imagen?`<div class="launch-img-wrap"><img src="${l.imagen}" alt="${l.nombre}"></div>`:`<span class="launch-emoji">${l.emoji||'🚀'}</span>`;return`<div class="launch-card">${imgHTML}<div class="launch-name">${l.nombre}</div><div class="launch-desc">${l.descripcion}</div><div class="launch-date">📅 ${l.fecha}</div></div>`;}).join('');

  const rg=document.getElementById('reviewsGrid');if(rg)rg.innerHTML=RESENAS_D.filter(r=>r.activa).map(r=>`<div class="review-card"><div class="review-stars">${'⭐'.repeat(r.estrellas)}</div><div class="review-text">"${r.texto}"</div><div class="review-author">— ${r.autor}</div></div>`).join('');

  document.getElementById('tiktokBtn').href=NEGOCIO.tiktok||'#';
  document.getElementById('tiktok-user-display').textContent=NEGOCIO.tiktok_user||'@sarux.oficial';
  const ttg=document.getElementById('tiktokGrid');ttg.innerHTML='';
  (window.TIKTOK_POSTS_D||[]).forEach(p=>{
    const imgTag = p.imagen
      ? `<img src="${p.imagen}" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;opacity:.85" onerror="this.style.display='none'">`
      : '';
    const icon = p.imagen ? '▶️' : '🎵';
    ttg.innerHTML+=`<a href="${p.url||NEGOCIO.tiktok||'#'}" target="_blank" class="tiktok-item">${imgTag}<span class="tk-icon" style="position:relative;z-index:2">${icon}</span><span style="z-index:2;position:relative;font-size:.55rem;text-align:center;padding:0 .4rem;line-height:1.3">${p.titulo||'Ver video'}</span></a>`;
  });
  if(!(window.TIKTOK_POSTS_D||[]).length)for(let i=0;i<6;i++)ttg.innerHTML+=`<a href="${NEGOCIO.tiktok||'#'}" target="_blank" class="tiktok-item"><span class="tk-icon">🎵</span><span style="font-size:.5rem;color:var(--gray)">Ver video</span></a>`;

  const ig=document.getElementById('igGrid');ig.innerHTML='';
  (window.IG_POSTS_D||[]).forEach(p=>{
    if(p.imagen){
      ig.innerHTML+=`<div class="ig-item" style="padding:0;overflow:hidden;position:relative" onclick="abrirEnlaceExterno('${p.url||NEGOCIO.instagram||'#'}')">
        <img src="${p.imagen}" style="width:100%;height:100%;object-fit:cover;display:block" onerror="this.parentElement.innerHTML='<span class=\\'ig-icon\\'>📸</span><span style=\\'font-size:.5rem;color:var(--gray)\\'>Ver post</span>'">
        <div style="position:absolute;bottom:0;left:0;right:0;background:linear-gradient(transparent,rgba(0,0,0,.6));padding:.4rem .3rem;font-size:.45rem;color:#fff;font-family:var(--font-mono);letter-spacing:1px;line-height:1.3;overflow:hidden;max-height:2.5rem">${p.titulo||''}</div>
      </div>`;
    } else {
      ig.innerHTML+=`<div class="ig-item" onclick="abrirEnlaceExterno('${p.url||NEGOCIO.instagram||'#'}')"><span class="ig-icon">📸</span><span style="font-size:.5rem">${p.titulo||'Ver post'}</span></div>`;
    }
  });
  if(!(window.IG_POSTS_D||[]).length)for(let i=0;i<6;i++)ig.innerHTML+=`<div class="ig-item" onclick="abrirEnlaceExterno('${NEGOCIO.instagram||'#'}')"><span class="ig-icon">📸</span><span style="font-size:.5rem">Ver post</span></div>`;
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
  cargarCreaciones();

  document.getElementById('footerIg').href=NEGOCIO.instagram||'#';
  document.getElementById('footerTt').href=NEGOCIO.tiktok||'#';
  const _fWa1=document.getElementById('footerWa'); if(_fWa1) _fWa1.href=`https://wa.me/${NEGOCIO.whatsapp||''}`;
  const _fFb1=document.getElementById('footerFb'); if(_fFb1) _fFb1.href=NEGOCIO.facebook||'#';
  document.getElementById('footerCopy').textContent=`© ${new Date().getFullYear()} ${NEGOCIO.nombre} — Todos los derechos reservados`;
  document.getElementById('floatWa').href=`https://wa.me/${NEGOCIO.whatsapp}?text=${encodeURIComponent('Hola! Vi el catálogo de Sarux 🛍️')}`;
  document.getElementById('footerIg').href=NEGOCIO.instagram||'#';
  document.getElementById('footerTt').href=NEGOCIO.tiktok||'#';
  const _fWa2=document.getElementById('footerWa'); if(_fWa2) _fWa2.href=`https://wa.me/${NEGOCIO.whatsapp||''}`;
  const _fFb2=document.getElementById('footerFb'); if(_fFb2) _fFb2.href=NEGOCIO.facebook||'#';
  window.dispatchEvent(new Event('renderDone'));
  // Activar lazy loading para todas las imágenes recién renderizadas
  setTimeout(initLazyImages, 50);
  // Refrescar estado de botones de favoritos
  setTimeout(_refreshFavBtns, 60);
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
  history.pushState({ saruxCatPanel: true }, '', window.location.href);
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
    const q = document.getElementById('catPanelSearch')?.value?.trim() || '';
    panelGrid.innerHTML=`
      <div style="grid-column:1/-1;padding:2.5rem 1rem;text-align:center">
        <div style="font-size:2.5rem;margin-bottom:.8rem">🔍</div>
        <div style="font-family:var(--font-display);font-size:1.1rem;color:var(--white);letter-spacing:2px;margin-bottom:.5rem">SIN RESULTADOS</div>
        <div style="color:var(--gray);font-size:.8rem;font-weight:300;margin-bottom:1.2rem">
          No encontramos <span style="color:var(--neon)">"${q}"</span> en esta categoría.
        </div>
        <div style="display:flex;gap:.7rem;justify-content:center;flex-wrap:wrap">
          <button onclick="clearCatPanelSearch()" style="background:rgba(232,25,44,.12);border:1px solid rgba(232,25,44,.35);color:var(--neon);font-family:var(--font-mono);font-size:.58rem;letter-spacing:2px;padding:.65rem 1rem;cursor:pointer">← VER TODOS</button>
          <a href="https://wa.me/${(typeof NEGOCIO!=='undefined'?NEGOCIO.whatsapp:'')}" target="_blank" style="background:rgba(37,211,102,.1);border:1px solid rgba(37,211,102,.3);color:#25d366;font-family:var(--font-mono);font-size:.58rem;letter-spacing:2px;padding:.65rem 1rem;cursor:pointer;text-decoration:none;display:inline-flex;align-items:center;gap:.4rem">📱 PREGUNTAR</a>
        </div>
      </div>`;
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

// ── MÁS VENDIDOS AUTOMÁTICOS ─────────────────────────────────────────
// Selecciona productos aleatorios del catálogo real, usando el día actual
// como semilla. Así todos los visitantes ven los mismos productos ese día,
// y la selección cambia automáticamente cada 24 horas sin intervención manual.
function _seedRandom(seed){
  let s = seed % 2147483647;
  if(s <= 0) s += 2147483646;
  return function(){
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

function getMasVendidosAutomaticos(){
  const cfg = (typeof APP_DATA!=='undefined' && APP_DATA.MAS_VENDIDOS_CONFIG) || {};
  const CANTIDAD = cfg.cantidad || 4;
  const HORAS = cfg.horas || 24;

  // Reunir todos los productos del catálogo con su categoría
  const todos = [];
  (CATALOGO_D||[]).forEach(cat=>{
    if(!cat.activa) return;
    (cat.productos||[]).forEach(p=>{
      todos.push({ p, catNombre: cat.nombre, catEmoji: cat.emoji });
    });
  });

  if(!todos.length) return [];
  if(todos.length <= CANTIDAD) return todos;

  // Semilla = bloque de tiempo actual según las horas configuradas
  // (cambia automáticamente cada X horas, igual para todos los visitantes)
  const ahoraMs = Date.now();
  const bloqueMs = HORAS * 60 * 60 * 1000;
  const seed = Math.floor(ahoraMs / bloqueMs);
  const rand = _seedRandom(seed);

  // Fisher-Yates shuffle determinista con la semilla del bloque de tiempo
  const arr = [...todos];
  for(let i=arr.length-1; i>0; i--){
    const j = Math.floor(rand() * (i+1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }

  return arr.slice(0, CANTIDAD);
}

function mkCard(p,catNombre,catEmoji){
  const BLANK = 'data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=';
  const img=p.imagen?`<img data-src="${p.imagen}" src="${BLANK}" class="card-img-real lazy" alt="${p.nombre}" loading="lazy">`:`<span class="card-img">${catEmoji||p.emoji||'📦'}</span>`;
  const badgeClass=p.badge==='Nuevo'?'badge-new':p.badge==='Más vendido'?'badge-sell':'badge-pop';
  const badgeHTML=p.badge?`<span class="badge ${badgeClass}">${p.badge}</span>`:'';
  // Badge de stock urgente en card
  const stockNum = p.stock || 0;
  const stockBadge = stockNum === 0
    ? `<span style="position:absolute;bottom:.5rem;left:.5rem;background:rgba(255,59,48,.85);color:#fff;font-family:var(--font-mono);font-size:.5rem;letter-spacing:1.5px;padding:.25rem .55rem;z-index:3;pointer-events:none">AGOTADO</span>`
    : stockNum <= 3
    ? `<span style="position:absolute;bottom:.5rem;left:.5rem;background:rgba(255,149,0,.9);color:#fff;font-family:var(--font-mono);font-size:.5rem;letter-spacing:1.5px;padding:.25rem .55rem;z-index:3;pointer-events:none;animation:stockPulse 1.2s ease-in-out infinite">🔥 ${stockNum} PZS</span>`
    : stockNum <= 10
    ? `<span style="position:absolute;bottom:.5rem;left:.5rem;background:rgba(255,204,0,.85);color:#000;font-family:var(--font-mono);font-size:.5rem;letter-spacing:1.5px;padding:.25rem .55rem;z-index:3;pointer-events:none">⚡ POCAS</span>`
    : '';  const tallasTag=(p.tallas&&p.tallas.length)?`<span class="card-tag">📏 ${p.tallas.join(' · ')}</span>`:'';
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
  const esFav = _esFavorito(p.nombre);
  const favBtn = `<button class="card-fav-btn${esFav?' active':''}" data-pid="${pid}" onclick="toggleFavorito('${pid}',event)" title="${esFav?'Quitar de favoritos':'Guardar en favoritos'}">${esFav?'❤️':'🤍'}</button>`;
  const shareBtn=`<button class="card-share-btn" onclick="event.stopPropagation();compartirProducto('${nomSafe}','${catSafe}')" title="Compartir">🔗</button>`;
  const cartBtn=tienePersonajes?'':`<button style="background:none;border:none;color:var(--gray);cursor:pointer;font-size:.95rem;padding:.2rem .4rem;transition:color .2s" onclick="event.stopPropagation();agregarAlCarritoById('${pid}')" title="Agregar al carrito" onmouseover="this.style.color='var(--neon)'" onmouseout="this.style.color='var(--gray)'">🛒</button>`;
  return`<div class="product-card" onclick="${onclick}"><div class="card-img-wrap">${img}${extraBadge}${stockBadge}${favBtn}${shareBtn}<div class="card-overlay"><button class="card-overlay-btn">${btnLabel}</button></div></div><div class="card-body"><div class="card-cat">${catNombre||p.categoria||''}</div><div class="card-name">${p.nombre}</div><div class="card-tags">${temasTag}${tallasTag}${coloresTag}</div><div class="card-footer"><div class="card-price">$${(p.precio||0).toLocaleString()}<small>MXN</small></div><div style="display:flex;align-items:center;gap:.3rem">${badgeHTML}${cartBtn}</div></div></div></div>`;
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
function buscarProdEnCatalogo(nombre){
  if(!CATALOGO_D) return null;
  for(const cat of CATALOGO_D){
    for(const p of (cat.productos||[])){
      if(p.nombre === nombre) return {p, catNombre: cat.nombre, catEmoji: cat.emoji};
    }
  }
  return null;
}

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
  if(res.length){
    cg.innerHTML = res.map(({ p, cat }) => mkCard(p, cat.nombre, cat.emoji)).join('');
  } else {
    // Sugerencias: primeros 4 productos de categorías activas
    const sugeridos = [];
    (getCatsFilt()||[]).forEach(cat=>{
      (cat.productos||[]).slice(0,2).forEach(p=>{ if(sugeridos.length<4) sugeridos.push({p,cat}); });
    });
    const sugsHTML = sugeridos.length ? `
      <div style="margin-top:2rem;grid-column:1/-1">
        <div style="font-family:var(--font-mono);font-size:.55rem;letter-spacing:3px;color:var(--gray);margin-bottom:1rem;text-align:center">TAL VEZ TE INTERESE</div>
        <div class="product-grid" style="margin:0">${sugeridos.map(({p,cat})=>mkCard(p,cat.nombre,cat.emoji)).join('')}</div>
      </div>` : '';
    cg.innerHTML = `
      <div style="grid-column:1/-1;padding:3rem 1.5rem;text-align:center">
        <div style="font-size:3rem;margin-bottom:1rem">🔍</div>
        <div style="font-family:var(--font-display);font-size:1.2rem;color:var(--white);letter-spacing:2px;margin-bottom:.6rem">SIN RESULTADOS</div>
        <div style="color:var(--gray);font-family:var(--font-mono);font-size:.7rem;letter-spacing:1px;margin-bottom:1.2rem">
          No encontramos nada para <span style="color:var(--neon)">"${q.trim()}"</span>
        </div>
        <div style="color:rgba(255,255,255,.45);font-size:.82rem;font-weight:300;line-height:1.7;margin-bottom:1.5rem">
          Intenta con otro término o escríbenos directamente<br>y con gusto te ayudamos.
        </div>
        <div style="display:flex;gap:.8rem;justify-content:center;flex-wrap:wrap">
          <button onclick="limpiarBusqueda()" style="background:rgba(232,25,44,.12);border:1px solid rgba(232,25,44,.35);color:var(--neon);font-family:var(--font-mono);font-size:.6rem;letter-spacing:2px;padding:.7rem 1.2rem;cursor:pointer">← VER TODO EL CATÁLOGO</button>
          <a href="https://wa.me/${(typeof NEGOCIO!=='undefined'?NEGOCIO.whatsapp:'')}" target="_blank" style="background:rgba(37,211,102,.1);border:1px solid rgba(37,211,102,.3);color:#25d366;font-family:var(--font-mono);font-size:.6rem;letter-spacing:2px;padding:.7rem 1.2rem;cursor:pointer;text-decoration:none;display:inline-flex;align-items:center;gap:.4rem">📱 PREGUNTAR POR WHATSAPP</a>
        </div>
        ${sugsHTML}
      </div>`;
  }

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
// ── "VIENDO AHORA" — contador en tiempo real vía Supabase Presence ──────────
let _presenceChannel = null;
let _presenceClientId = Math.random().toString(36).slice(2);

function salirCanalPresencia(){
  if(_presenceChannel){
    try { sb.removeChannel(_presenceChannel); } catch(e){}
    _presenceChannel = null;
  }
  const wrap = document.getElementById('modalViendoAhora');
  if(wrap) wrap.style.display = 'none';
}

function entrarCanalPresencia(prodNombre){
  salirCanalPresencia();
  if(!prodNombre) return;

  const canalId = 'viendo:' + prodNombre.replace(/[^a-zA-Z0-9]/g,'_').slice(0,80);
  const channel = sb.channel(canalId, { config: { presence: { key: _presenceClientId } } });

  channel.on('presence', { event: 'sync' }, () => {
    const state = channel.presenceState();
    const count = Object.keys(state).length;
    const wrap = document.getElementById('modalViendoAhora');
    const texto = document.getElementById('modalViendoAhoraTexto');
    if(!wrap || !texto) return;
    if(count >= 2){
      wrap.style.display = 'flex';
      texto.textContent = `${count} personas viendo esto ahora`;
    } else {
      wrap.style.display = 'none';
    }
  });

  channel.subscribe(async (status) => {
    if(status === 'SUBSCRIBED'){
      await channel.track({ online_at: new Date().toISOString() });
    }
  });

  _presenceChannel = channel;
}

function abrirModal(p,catNombre,catEmoji){
  trackView(p.nombre);
  entrarCanalPresencia(p.nombre);
  window._modalProdActivo = {p, catNombre, catEmoji};
  window._modalDisenoIdx = 0;
  // Actualizar OG metas para compartir con imagen correcta
  actualizarOGMetas(p, catNombre);
  const imgEl=document.getElementById('modalImg');
  _lightboxSrc = p.imagen || (p.disenos&&p.disenos[0]&&p.disenos[0].imagen) || '';
  const zoomBtn = document.getElementById('zoom-btn');
  imgEl.innerHTML=p.imagen?`<img src="${p.imagen}" style="width:100%;max-height:70vw;object-fit:contain;display:block;cursor:zoom-in" onclick="abrirLightbox()">`:catEmoji||'📦';
  if(zoomBtn) zoomBtn.style.display = p.imagen ? 'block' : 'none';
  const prevGal=document.getElementById('modalDisenosGal');if(prevGal)prevGal.remove();
  if(p.disenos&&p.disenos.length>0){
    const wrap=document.createElement('div');wrap.id='modalDisenosGal';wrap.className='modal-disenos';

    // Función para navegar al diseño por índice
    function irADiseno(idx){
      const total = p.disenos.length;
      idx = ((idx % total) + total) % total; // circular
      window._modalDisenoIdx = idx;
      const d = p.disenos[idx];
      _lightboxSrc = d.imagen||'';
      imgEl.innerHTML = d.imagen ? `<img src="${d.imagen}" style="width:100%;max-height:70vw;object-fit:contain;display:block;cursor:zoom-in" onclick="abrirLightbox()">` : (catEmoji||'📦');
      if(zoomBtn) zoomBtn.style.display = d.imagen?'block':'none';
      // Actualizar thumbs activos
      document.querySelectorAll('.diseno-thumb').forEach((t,i)=>t.classList.toggle('active', i===idx));
      // Scroll del thumb al centro
      const thumbEl = wrap.querySelector('.diseno-thumb-scroll');
      if(thumbEl){
        const active = thumbEl.querySelectorAll('.diseno-thumb')[idx];
        if(active) active.scrollIntoView({behavior:'smooth',block:'nearest',inline:'center'});
      }
      // Actualizar contador
      const counter = document.getElementById('disenoCounter');
      if(counter) counter.textContent = `${idx+1} / ${total}`;
    }

    // Botones de flecha (solo si hay más de 1 diseño)
    if(p.disenos.length > 1){
      const arrowsWrap = document.createElement('div');
      arrowsWrap.style.cssText='display:flex;align-items:center;justify-content:space-between;margin-bottom:.5rem;gap:.5rem';
      arrowsWrap.innerHTML=`
        <button onclick="(function(){const idx=window._modalDisenoIdx||0;window._irADiseno(idx-1);})()" style="background:rgba(232,25,44,.12);border:1px solid rgba(232,25,44,.3);color:var(--neon);width:38px;height:38px;font-size:1.1rem;cursor:pointer;flex-shrink:0;display:flex;align-items:center;justify-content:center">←</button>
        <span id="disenoCounter" style="font-family:var(--font-mono);font-size:.6rem;letter-spacing:2px;color:var(--gray);flex:1;text-align:center">1 / ${p.disenos.length}</span>
        <button onclick="(function(){const idx=window._modalDisenoIdx||0;window._irADiseno(idx+1);})()" style="background:rgba(232,25,44,.12);border:1px solid rgba(232,25,44,.3);color:var(--neon);width:38px;height:38px;font-size:1.1rem;cursor:pointer;flex-shrink:0;display:flex;align-items:center;justify-content:center">→</button>
      `;
      wrap.appendChild(arrowsWrap);
    }

    // Guardar referencia global para los botones de flecha
    window._irADiseno = irADiseno;

    // Scroll container para thumbnails
    const thumbScroll = document.createElement('div');
    thumbScroll.className='diseno-thumb-scroll';
    thumbScroll.style.cssText='display:flex;gap:.5rem;overflow-x:auto;padding:.25rem 0;scrollbar-width:none;-webkit-overflow-scrolling:touch';

    p.disenos.forEach((d,i)=>{
      const thumb=document.createElement('div');
      thumb.className='diseno-thumb'+(i===0?' active':'');
      thumb.innerHTML=`<img src="${d.imagen||''}" alt="${d.nombre||''}"><div class="diseno-thumb-label">${d.nombre||''}</div>`;
      thumb.onclick=()=>{ irADiseno(i); };
      thumbScroll.appendChild(thumb);
    });

    wrap.appendChild(thumbScroll);
    imgEl.insertAdjacentElement('afterend',wrap);

    if(p.disenos[0].imagen){
      _lightboxSrc=p.disenos[0].imagen;
      imgEl.innerHTML=`<img src="${p.disenos[0].imagen}" style="width:100%;max-height:70vw;object-fit:contain;display:block;cursor:zoom-in" onclick="abrirLightbox()">`;
    }

    // Swipe en imagen principal para navegar diseños
    let _swipeStartX = null;
    imgEl.addEventListener('touchstart', e=>{ _swipeStartX = e.touches[0].clientX; }, {passive:true});
    imgEl.addEventListener('touchend', e=>{
      if(_swipeStartX === null) return;
      const dx = e.changedTouches[0].clientX - _swipeStartX;
      if(Math.abs(dx) > 40){ irADiseno((window._modalDisenoIdx||0) + (dx < 0 ? 1 : -1)); }
      _swipeStartX = null;
    }, {passive:true});
  }
  document.getElementById('modalCat').textContent=catNombre||'';
  document.getElementById('modalName').textContent=p.nombre;
  document.getElementById('modalDesc').textContent=p.descripcion||'';
  document.getElementById('modalPrice').innerHTML=`$${(p.precio||0).toLocaleString()} <small>MXN</small>`;
  window._modalPrecioActual = p.precio || 0;
  // Stock con urgencia visual
  const stockEl = document.getElementById('modalStock');
  const stockNum = p.stock || 0;
  if (stockNum === 0) {
    stockEl.innerHTML = `<span style="color:#ff3b30;font-family:var(--font-mono);font-size:.65rem;letter-spacing:2px;background:rgba(255,59,48,.1);border:1px solid rgba(255,59,48,.3);padding:.35rem .8rem;display:inline-block">❌ AGOTADO</span>`;
    document.getElementById('modalBuyBtn').disabled = true;
    document.getElementById('modalBuyBtn').style.opacity = '0.4';
    document.getElementById('modalBuyBtn').style.cursor = 'not-allowed';
  } else if (stockNum <= 3) {
    stockEl.innerHTML = `<span style="color:#ff9500;font-family:var(--font-mono);font-size:.65rem;letter-spacing:2px;background:rgba(255,149,0,.12);border:1px solid rgba(255,149,0,.4);padding:.35rem .8rem;display:inline-block;animation:stockPulse 1.2s ease-in-out infinite">🔥 ¡SOLO QUEDAN ${stockNum} PIEZAS!</span>`;
    document.getElementById('modalBuyBtn').disabled = false;
    document.getElementById('modalBuyBtn').style.opacity = '';
    document.getElementById('modalBuyBtn').style.cursor = '';
  } else if (stockNum <= 10) {
    stockEl.innerHTML = `<span style="color:#ffcc00;font-family:var(--font-mono);font-size:.65rem;letter-spacing:2px;background:rgba(255,204,0,.08);border:1px solid rgba(255,204,0,.25);padding:.35rem .8rem;display:inline-block">⚡ POCAS PIEZAS: ${stockNum} disponibles</span>`;
    document.getElementById('modalBuyBtn').disabled = false;
    document.getElementById('modalBuyBtn').style.opacity = '';
    document.getElementById('modalBuyBtn').style.cursor = '';
  } else {
    stockEl.innerHTML = `<span style="color:var(--gray);font-family:var(--font-mono);font-size:.6rem;letter-spacing:2px">✦ STOCK: ${stockNum} piezas disponibles</span>`;
    document.getElementById('modalBuyBtn').disabled = false;
    document.getElementById('modalBuyBtn').style.opacity = '';
    document.getElementById('modalBuyBtn').style.cursor = '';
  }
  const tw=document.getElementById('modalTallasWrap');
  if(p.tallas&&p.tallas.length){tw.style.display='block';document.getElementById('modalTallas').innerHTML=p.tallas.map(t=>`<button class="size-btn" onclick="selBtn(this,'.sizes-wrap')">${t}</button>`).join('');}else{tw.style.display='none';}
  const cw=document.getElementById('modalColoresWrap');
  if(p.colores&&p.colores.length){cw.style.display='block';document.getElementById('modalColores').innerHTML=p.colores.map(c=>`<button class="color-btn" onclick="selBtn(this,'.colors-wrap')">${c}</button>`).join('');}else{cw.style.display='none';}
  // Cantidad
  const cantWrap = document.getElementById('modalCantidadWrap');
  if(cantWrap){ cantWrap.style.display='flex'; document.getElementById('modalCantidad').value=1; }

  // Botón WA inteligente
  document.getElementById('modalBuyBtn').onclick = () => {
    const talla   = document.querySelector('.sizes-wrap .size-btn.active')?.textContent.trim() || '';
    const color   = document.querySelector('.colors-wrap .color-btn.active')?.textContent.trim() || '';
    const diseno  = document.querySelector('.diseno-thumb.active .diseno-thumb-label')?.textContent.trim() || '';
    const cant    = parseInt(document.getElementById('modalCantidad')?.value) || 1;

    // Validar talla si el producto tiene tallas
    if(p.tallas && p.tallas.length && !talla){
      // Resaltar visualmente que falta talla
      const tallasEl = document.getElementById('modalTallas');
      if(tallasEl){ tallasEl.style.animation='none'; setTimeout(()=>{ tallasEl.style.animation='shake .3s ease'; },10); }
      showToast('⚠️ Selecciona una talla antes de continuar');
      return;
    }

    // Construir mensaje detallado
    let msg = `Hola! Me interesa este producto de Sarux 🛍️\n\n`;
    msg += `📦 *Producto:* ${p.nombre}\n`;
    msg += `📂 *Categoría:* ${catNombre||p.categoria||''}\n`;
    if(diseno)  msg += `🎨 *Diseño:* ${diseno}\n`;
    if(talla)   msg += `📏 *Talla:* ${talla}\n`;
    if(color)   msg += `🖌️ *Color:* ${color}\n`;
    msg += `🔢 *Cantidad:* ${cant}\n`;
    msg += `💵 *Precio unitario:* $${(p.precio||0).toLocaleString()} MXN\n`;
    if(cant > 1) msg += `💰 *Total estimado:* $${((p.precio||0)*cant).toLocaleString()} MXN\n`;
    msg += `\n¿Pueden confirmar disponibilidad? ¡Gracias! 🙏`;

    trackWA(p.nombre);
    abrirEnlaceExterno(`https://wa.me/${NEGOCIO.whatsapp}?text=${encodeURIComponent(msg)}`);
  };

  document.getElementById('modalOverlay').classList.add('open');
  document.body.style.overflow='hidden';
  history.pushState({ saruxModal: true }, '', window.location.href);
  cargarResenasModal(p.nombre);
}
function cerrarModal(){
  document.getElementById('modalOverlay').classList.remove('open');
  salirCanalPresencia();
  // Si el panel de categoría sigue abierto, mantener overflow hidden
  const panel=document.getElementById('catPanel');
  if(panel && panel.classList.contains('open')) return;
  document.body.style.overflow='';
}

async function cargarResenasModal(prodNombre){
  const el = document.getElementById('modalReviewsList');
  if(!el) return;
  if(!prodNombre){
    el.innerHTML = '<span style="font-family:var(--font-mono);font-size:.6rem;letter-spacing:2px;opacity:.5">S\xe9 el primero en dejar tu rese\xf1a \u2728</span>';
    return;
  }
  el.innerHTML = '<span style="font-family:var(--font-mono);font-size:.6rem;letter-spacing:2px;opacity:.5">Cargando rese\xf1as...</span>';
  try {
    const { data, error } = await sb.from('fotos_clientes')
      .select('nombre, producto, resena, estrellas')
      .eq('producto', prodNombre)
      .order('created_at', { ascending: false })
      .limit(8);
    if(error) throw error;
    if(!data || !data.length){
      el.innerHTML = '<span style="font-family:var(--font-mono);font-size:.6rem;letter-spacing:2px;opacity:.5">S\xe9 el primero en dejar tu rese\xf1a \u2728</span>';
      return;
    }
    el.innerHTML = data.map(function(r){
      const estrellas = '\u2B50'.repeat(Math.min(5, Math.max(1, r.estrellas || 5)));
      const texto = r.resena || '';
      return estrellas + ' \u2014 "' + texto + '" \u2014 <span style="color:var(--neon);font-family:var(--font-mono);font-size:.6rem">' + (r.nombre||'CLIENTE').toUpperCase() + '</span>';
    }).join('<br><br>');
  } catch(e){
    el.innerHTML = '<span style="opacity:.4;font-size:.75rem">No se pudieron cargar las rese\xf1as.</span>';
  }
}
function selBtn(btn,wrap){btn.closest(wrap).querySelectorAll('button').forEach(b=>b.classList.remove('active'));btn.classList.add('active');actualizarTotalModal();}

function cambiarCantModal(delta){
  const inp = document.getElementById('modalCantidad');
  if(!inp) return;
  const nueva = Math.max(1, Math.min(99, (parseInt(inp.value)||1) + delta));
  inp.value = nueva;
  actualizarTotalModal();
}

function actualizarTotalModal(){
  const inp = document.getElementById('modalCantidad');
  const tot = document.getElementById('modalTotalEst');
  const precio = window._modalPrecioActual || 0;
  if(!inp||!tot||!precio) return;
  const cant = parseInt(inp.value)||1;
  tot.textContent = cant > 1 ? `Total: $${(precio*cant).toLocaleString()} MXN` : '';
}
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
  document.getElementById('promoModalBuyBtn').onclick = ()=>abrirEnlaceExterno(`https://wa.me/${NEGOCIO.whatsapp}?text=${encodeURIComponent(msg)}`);
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
  document.getElementById('paqueteModalBuyBtn').onclick = ()=>abrirEnlaceExterno(`https://wa.me/${NEGOCIO.whatsapp}?text=${encodeURIComponent(msg)}`);
  document.getElementById('paqueteModalOverlay').classList.add('open');
  document.body.style.overflow='hidden';
}
function cerrarPaqueteModal(){
  document.getElementById('paqueteModalOverlay').classList.remove('open');
  document.body.style.overflow='';
}

function renderMayoreo(){
  if(!MAYOREO_D.activo){document.getElementById('mayoreo').innerHTML='';return;}

  document.getElementById('mayoreo').innerHTML=`
    <div class="mayoreo-hero">
      <div class="mayoreo-titulo">VENTA AL <span>MAYOREO</span></div>
      <div class="mayoreo-subtitulo">${MAYOREO_D.subtitulo}</div>
      <p class="mayoreo-desc">${MAYOREO_D.descripcion}</p>
      <div class="mayoreo-badges">
        <span class="mayoreo-badge-item">✦ ${MAYOREO_D.minimo}</span>
        <span class="mayoreo-badge-item">✦ ${MAYOREO_D.descuento}</span>
        <span class="mayoreo-badge-item">✦ ${MAYOREO_D.entrega}</span>
      </div>
      <div style="display:flex;gap:1rem;justify-content:center;flex-wrap:wrap;padding-bottom:3rem">
        <a href="https://wa.me/${NEGOCIO.whatsapp}?text=${encodeURIComponent(MAYOREO_D.whatsapp_msg)}" target="_blank" class="btn-neon">📱 Cotizar ahora</a>
        <a href="mayoreo-catalogo.html" class="btn-outline" style="border-color:var(--neon);color:var(--neon)">📦 Ver catálogo mayoreo</a>
      </div>
    </div>`;
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
        img.onload = function(){
          img.classList.add('loaded');
          // Quitar shimmer del wrapper cuando carga
          const wrap = img.closest('.card-img-wrap');
          if(wrap) wrap.classList.add('img-loaded');
        };
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

function guardarCarrito(){
  localStorage.setItem('sarux_carrito', JSON.stringify(carrito));
}


// ── CUPONES DE DESCUENTO ──────────────────────────────────────────────────────
let cuponAplicado = null; // { codigo, porcentaje, aplica_a, categorias, id }

function calcularSubtotalCarrito(){
  return carrito.reduce((s,i)=>s+(i.precio*i.qty),0);
}

function calcularDescuentoCupon(){
  if(!cuponAplicado) return 0;
  let base = 0;
  if(cuponAplicado.aplica_a === 'todo' || cuponAplicado.esPersonalizado){
    base = calcularSubtotalCarrito();
  } else if(cuponAplicado.aplica_a === 'categorias'){
    base = carrito.reduce((s,i)=>{
      if((cuponAplicado.categorias||[]).includes(i.cat)) return s + (i.precio*i.qty);
      return s;
    }, 0);
  } else if(cuponAplicado.aplica_a === 'tipos'){
    base = carrito.reduce((s,i)=>{
      if((cuponAplicado.tipos_producto||[]).includes(i.tipo)) return s + (i.precio*i.qty);
      return s;
    }, 0);
  }
  return Math.round(base * (cuponAplicado.porcentaje/100));
}

function calcularTotalCarrito(){
  return Math.max(0, calcularSubtotalCarrito() - calcularDescuentoCupon());
}

// Clave localStorage donde guardamos los cupones ya usados en este dispositivo
const CUPONES_USADOS_KEY = 'sarux_cupones_usados';

function getCuponesUsadosLocal(){
  try { return JSON.parse(localStorage.getItem(CUPONES_USADOS_KEY) || '[]'); } catch(e){ return []; }
}

function marcarCuponUsadoLocal(codigo){
  try {
    const usados = getCuponesUsadosLocal();
    if(!usados.includes(codigo)){
      usados.push(codigo);
      localStorage.setItem(CUPONES_USADOS_KEY, JSON.stringify(usados));
    }
  } catch(e){}
}

function cuponYaUsadoEnEsteDispositivo(codigo){
  return getCuponesUsadosLocal().includes(codigo);
}

async function aplicarCuponCarrito(){
  const input = document.getElementById('carritoCuponInput');
  const msgEl = document.getElementById('carritoCuponMsg');
  const codigo = (input.value||'').trim().toUpperCase();

  if(!codigo){ return; }
  if(!carrito.length){
    msgEl.className = 'carrito-cupon-msg error';
    msgEl.textContent = 'Agrega productos antes de usar un cupón';
    return;
  }

  // Verificar si el usuario tiene sesión iniciada
  if(!_perfilActual){
    msgEl.className = 'carrito-cupon-msg error';
    msgEl.textContent = '⚠️ Inicia sesión para aplicar cupones';
    setTimeout(()=>{ cerrarCarrito(); abrirPerfilModal(); }, 1200);
    return;
  }

  msgEl.className = 'carrito-cupon-msg';
  msgEl.textContent = 'Verificando código...';

  // Verificar si ya fue usado en este dispositivo
  if(cuponYaUsadoEnEsteDispositivo(codigo)){
    msgEl.className = 'carrito-cupon-msg error';
    msgEl.textContent = '❌ Ya usaste este código en este dispositivo';
    return;
  }

  try {
    // 1. Buscar primero en cupones_usuario (cupones personalizados y de cumpleaños)
    const { data: dataU } = await sb.from('cupones_usuario').select('*').eq('codigo', codigo).single();

    if(dataU){
      // Validar cupón de usuario
      if(dataU.usado){
        msgEl.className = 'carrito-cupon-msg error';
        msgEl.textContent = '❌ Este cupón ya fue utilizado';
        return;
      }
      if(dataU.fecha_expira && new Date(dataU.fecha_expira) < new Date()){
        msgEl.className = 'carrito-cupon-msg error';
        msgEl.textContent = '❌ Este cupón ha expirado';
        return;
      }
      cuponAplicado = {
        id: dataU.id, codigo: dataU.codigo, porcentaje: dataU.porcentaje,
        aplica_a: 'todo', categorias: [], esPersonalizado: true
      };
      msgEl.textContent = '';
      input.value = '';
      renderCarrito();
      showToast('🎟️ Cupón ' + dataU.codigo + ' aplicado — ' + dataU.porcentaje + '% de descuento');
      return;
    }

    // 2. Buscar en cupones generales
    const { data, error } = await sb.from('cupones').select('*').eq('codigo', codigo).single();

    if(error || !data){
      msgEl.className = 'carrito-cupon-msg error';
      msgEl.textContent = '❌ Código no válido';
      return;
    }

    if(!data.activo){
      msgEl.className = 'carrito-cupon-msg error';
      msgEl.textContent = '❌ Este código ya no está disponible';
      return;
    }
    if(data.fecha_expira && new Date(data.fecha_expira) < new Date()){
      msgEl.className = 'carrito-cupon-msg error';
      msgEl.textContent = '❌ Este código ha expirado';
      return;
    }
    if(data.limite_usos !== null && data.usos_actuales >= data.limite_usos){
      msgEl.className = 'carrito-cupon-msg error';
      msgEl.textContent = '❌ Código agotado — ya alcanzó su límite de usos';
      return;
    }

    if(data.aplica_a === 'categorias'){
      const aplica = carrito.some(i => (data.categorias||[]).includes(i.cat));
      if(!aplica){
        msgEl.className = 'carrito-cupon-msg error';
        msgEl.textContent = '❌ Este código solo aplica a: ' + (data.categorias||[]).join(', ');
        return;
      }
    }
    if(data.aplica_a === 'tipos'){
      const aplica = carrito.some(i => (data.tipos_producto||[]).includes(i.tipo));
      if(!aplica){
        msgEl.className = 'carrito-cupon-msg error';
        msgEl.textContent = '❌ Este código solo aplica a: ' + (data.tipos_producto||[]).join(', ');
        return;
      }
    }

    cuponAplicado = {
      id: data.id, codigo: data.codigo, porcentaje: data.porcentaje,
      aplica_a: data.aplica_a, categorias: data.categorias||[],
      tipos_producto: data.tipos_producto||[]
    };
    msgEl.textContent = '';
    input.value = '';
    renderCarrito();
    showToast('🎟️ Cupón ' + data.codigo + ' aplicado — ' + data.porcentaje + '% de descuento');

  } catch(e){
    msgEl.className = 'carrito-cupon-msg error';
    msgEl.textContent = '❌ Error al verificar el código';
  }
}

function quitarCuponCarrito(){
  cuponAplicado = null;
  renderCarrito();
  showToast('Cupón removido');
}

// Incrementa el contador de usos en Supabase y marca como usado en este dispositivo
async function registrarUsoCupon(){
  if(!cuponAplicado) return;
  try {
    if(cuponAplicado.esPersonalizado){
      // Cupón personalizado/cumpleaños: marcar como usado en cupones_usuario
      await sb.from('cupones_usuario').update({ usado: true }).eq('id', cuponAplicado.id);
    } else {
      const { data } = await sb.from('cupones').select('usos_actuales').eq('id', cuponAplicado.id).single();
      if(data){
        await sb.from('cupones').update({ usos_actuales: (data.usos_actuales||0) + 1 }).eq('id', cuponAplicado.id);
      }
    }
    // Marcar en este dispositivo para que no pueda reusarse
    marcarCuponUsadoLocal(cuponAplicado.codigo);
  } catch(e){}
}

// ── FAVORITOS ─────────────────────────────────────────────────────────────────
var _favoritos = [];
function _cargarFavs(){ try{ _favoritos=JSON.parse(localStorage.getItem('sarux_favs')||'[]'); }catch(e){ _favoritos=[]; } }
function _guardarFavs(){ try{ localStorage.setItem('sarux_favs', JSON.stringify(_favoritos)); }catch(e){} }
function _esFavorito(nombre){ return _favoritos.some(function(f){ return f.nombre===nombre; }); }

function toggleFavorito(pid, e){
  if(e){ e.stopPropagation(); }
  var r = window._prodRegistry&&window._prodRegistry[pid]; if(!r) return;
  var p = r.p;
  if(_esFavorito(p.nombre)){
    _favoritos = _favoritos.filter(function(f){ return f.nombre!==p.nombre; });
    showToast('Eliminado de favoritos');
  } else {
    _favoritos.push({ nombre:p.nombre, precio:p.precio||0, imagen:p.imagen||'', cat:r.catNombre||'', pid:pid });
    showToast('❤️ Guardado en favoritos');
  }
  _guardarFavs();
  _actualizarFavBadge();
  _refreshFavBtns();
  if(document.getElementById('favPanel').classList.contains('open')) renderFavoritos();
}

function _actualizarFavBadge(){
  var badge = document.getElementById('favBadge');
  if(badge) badge.textContent = _favoritos.length;
  var btn = document.getElementById('favBtn');
  if(btn) btn.style.color = _favoritos.length ? 'var(--neon)' : '';
}

function _refreshFavBtns(){
  document.querySelectorAll('.card-fav-btn').forEach(function(btn){
    var pid = btn.dataset.pid;
    var r = window._prodRegistry&&window._prodRegistry[pid];
    if(!r) return;
    var activo = _esFavorito(r.p.nombre);
    btn.classList.toggle('active', activo);
    btn.textContent = activo ? '❤️' : '🤍';
    btn.title = activo ? 'Quitar de favoritos' : 'Guardar en favoritos';
  });
}

function toggleFavoritos(){
  var panel = document.getElementById('favPanel');
  var overlay = document.getElementById('favOverlay');
  var abierto = panel.classList.contains('open');
  if(abierto){
    panel.classList.remove('open');
    overlay.classList.remove('open');
    document.body.style.overflow = '';
  } else {
    renderFavoritos();
    panel.classList.add('open');
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
}

function renderFavoritos(){
  var cont = document.getElementById('favItems');
  var footer = document.getElementById('favFooter');
  if(!cont) return;
  _cargarFavs();
  if(!_favoritos.length){
    cont.innerHTML = '<div class="fav-empty"><div class="fav-empty-icon">🤍</div><div>Aún no tienes favoritos</div><div style="opacity:.5;font-size:.5rem;margin-top:.3rem">Toca ❤️ en cualquier producto para guardarlo aquí</div></div>';
    if(footer) footer.style.display = 'none';
    return;
  }
  if(footer) footer.style.display = '';
  cont.innerHTML = _favoritos.map(function(f, i){
    var imgEl = f.imagen
      ? '<img src="'+f.imagen+'" style="width:100%;height:100%;object-fit:cover">'
      : '<span style="font-size:1.5rem">📦</span>';
    return '<div class="fav-item">'+
      '<div class="fav-item-img">'+imgEl+'</div>'+
      '<div class="fav-item-info">'+
        '<div class="fav-item-name">'+f.nombre+'</div>'+
        '<div class="fav-item-cat">'+f.cat+'</div>'+
        '<div class="fav-item-price">$'+(f.precio||0).toLocaleString()+' MXN</div>'+
      '</div>'+
      '<div class="fav-item-actions">'+
        '<button class="fav-item-cart" onclick="agregarFavAlCarrito('+i+')" title="Agregar al carrito">🛒</button>'+
        '<button class="fav-item-del" onclick="quitarFavorito('+i+')" title="Quitar">✕</button>'+
      '</div>'+
    '</div>';
  }).join('');
}

function quitarFavorito(i){
  _favoritos.splice(i, 1);
  _guardarFavs();
  _actualizarFavBadge();
  _refreshFavBtns();
  renderFavoritos();
}

function vaciarFavoritos(){
  _favoritos = [];
  _guardarFavs();
  _actualizarFavBadge();
  _refreshFavBtns();
  renderFavoritos();
}

function agregarFavAlCarrito(i){
  var f = _favoritos[i]; if(!f) return;
  // Buscar en registry por nombre
  var found = null;
  Object.keys(window._prodRegistry||{}).forEach(function(pid){
    var r = window._prodRegistry[pid];
    if(r && r.p && r.p.nombre === f.nombre) found = r;
  });
  if(found) agregarAlCarrito(found.p, found.catNombre);
  else agregarAlCarrito({nombre:f.nombre,precio:f.precio,imagen:f.imagen}, f.cat);
  showToast('🛒 Agregado al carrito');
}

function enviarFavoritosWA(){
  if(!_favoritos.length) return;
  var lista = _favoritos.map(function(f){ return '• '+f.nombre+' ($'+f.precio+' MXN)'; }).join('\n');
  var msg = 'Hola! Me interesan estos productos de Sarux:\n\n'+lista+'\n\n¿Me pueden dar más información?';
  abrirEnlaceExterno('https://wa.me/'+NEGOCIO.whatsapp+'?text='+encodeURIComponent(msg));
}
// ── FIN FAVORITOS ─────────────────────────────────────────────────────────────

function agregarAlCarrito(p, catNombre){
  const idx = carrito.findIndex(i => i.id === (p.id||p.nombre));
  if(idx >= 0){ carrito[idx].qty++; }
  else { carrito.push({ id: p.id||p.nombre, nombre: p.nombre, precio: p.precio||0, imagen: p.imagen||'', cat: catNombre||'', qty: 1 }); }
  guardarCarrito();
  actualizarBadge();
  renderCarrito();
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
  carrito = []; cuponAplicado = null; guardarCarrito(); actualizarBadge(); renderCarrito();
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

function cerrarCarrito(){
  const panel = document.getElementById('carritoPanel');
  const overlay = document.getElementById('carritoOverlay');
  panel.classList.remove('open');
  overlay.classList.remove('open');
  document.body.style.overflow='';
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
  const subtotal = calcularSubtotalCarrito();
  const descuento = calcularDescuentoCupon();
  const total = calcularTotalCarrito();
  if(totalEl){
    if(cuponAplicado && descuento > 0){
      totalEl.innerHTML = `<span style="text-decoration:line-through;color:var(--gray);font-size:.75em;margin-right:.4rem">$${subtotal.toLocaleString()}</span>$${total.toLocaleString()} MXN`;
    } else {
      totalEl.textContent = '$' + total.toLocaleString() + ' MXN';
    }
  }

  // Mostrar/ocultar UI de cupón aplicado
  const inputRow = document.getElementById('carritoCuponInputRow');
  const aplicadoWrap = document.getElementById('carritoCuponAplicado');
  if(cuponAplicado){
    if(inputRow) inputRow.style.display = 'none';
    if(aplicadoWrap){
      aplicadoWrap.style.display = 'block';
      const label = cuponAplicado.esReferido
        ? `🎁 Descuento de bienvenida (-${cuponAplicado.porcentaje}% · -$${descuento.toLocaleString()})`
        : `🎟️ ${cuponAplicado.codigo} aplicado (-${cuponAplicado.porcentaje}% · -$${descuento.toLocaleString()})`;
      aplicadoWrap.innerHTML = `<div class="carrito-cupon-aplicado">
        <span class="carrito-cupon-aplicado-info">${label}</span>
        <button onclick="quitarCuponCarrito()" title="Quitar cupón">✕</button>
      </div>`;
    }
  } else {
    if(inputRow) inputRow.style.display = 'flex';
    if(aplicadoWrap){ aplicadoWrap.style.display = 'none'; aplicadoWrap.innerHTML = ''; }
  }

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
  const lineas = carrito.map(i=>{
    const linkProd = SHARE_BASE + '/?prod=' + encodeURIComponent(i.nombre);
    return `• *${i.nombre}* x${i.qty} — $${(i.precio*i.qty).toLocaleString()} MXN%0A   🔗 ${linkProd}`;
  }).join('%0A%0A');
  const subtotal = calcularSubtotalCarrito();
  const descuento = calcularDescuentoCupon();
  const total = calcularTotalCarrito();

  let resumenTotal;
  if(cuponAplicado && descuento > 0){
    resumenTotal = `Subtotal: $${subtotal.toLocaleString()} MXN%0ACupón *${cuponAplicado.codigo}* (-${cuponAplicado.porcentaje}%25): -$${descuento.toLocaleString()} MXN%0A*TOTAL: $${total.toLocaleString()} MXN*`;
  } else {
    resumenTotal = `*TOTAL: $${total.toLocaleString()} MXN*`;
  }

  const msg = `Hola! Quiero hacer el siguiente pedido en SARUX 🛍️%0A%0A${lineas}%0A%0A${resumenTotal}%0A%0A¿Me pueden confirmar disponibilidad?`;
  abrirEnlaceExterno(`https://wa.me/${NEGOCIO.whatsapp}?text=${msg}`);

  if(cuponAplicado){
    if(cuponAplicado.esReferido){ try{ if(typeof registrarUsoReferido==='function') registrarUsoReferido(); }catch(e){} }
    else registrarUsoCupon();
  }

  setTimeout(()=>{ mostrarConfirmacionPedido(carrito, total); }, 400);
}

function mostrarConfirmacionPedido(items, total){
  // Cerrar carrito panel
  const carritoPanel = document.getElementById('carritoPanel');
  const carritoOverlay = document.getElementById('carritoOverlay');
  if(carritoPanel) carritoPanel.classList.remove('open');
  if(carritoOverlay) carritoOverlay.classList.remove('open');

  // Crear overlay de confirmación
  const existing = document.getElementById('pedidoConfirmOverlay');
  if(existing) existing.remove();

  const lineasHTML = items.map(i=>`
    <div style="display:flex;justify-content:space-between;align-items:center;padding:.55rem 0;border-bottom:1px solid rgba(255,255,255,.06)">
      <span style="color:var(--light);font-size:.85rem;font-weight:300">${i.nombre} <span style="color:var(--gray);font-size:.75rem">x${i.qty}</span></span>
      <span style="color:var(--neon);font-family:var(--font-mono);font-size:.8rem">$${(i.precio*i.qty).toLocaleString()}</span>
    </div>`).join('');

  const overlay = document.createElement('div');
  overlay.id = 'pedidoConfirmOverlay';
  overlay.style.cssText = `
    position:fixed;inset:0;background:rgba(0,0,0,.92);z-index:9999;
    display:flex;align-items:center;justify-content:center;padding:1.5rem;
    animation:fadeInConf .3s ease;
  `;
  overlay.innerHTML = `
    <div style="
      background:var(--card);border:1px solid rgba(232,25,44,.25);
      max-width:420px;width:100%;padding:2rem 1.5rem;position:relative;
      animation:slideUpConf .35s ease;
    ">
      <div style="text-align:center;margin-bottom:1.5rem">
        <div style="font-size:3rem;margin-bottom:.6rem">✅</div>
        <div style="font-family:var(--font-display);font-size:1.4rem;color:var(--white);letter-spacing:2px">¡PEDIDO ENVIADO!</div>
        <div style="color:var(--gray);font-size:.85rem;font-weight:300;margin-top:.4rem;line-height:1.6">
          Tu pedido fue enviado por WhatsApp.<br>Espera la confirmación de disponibilidad.
        </div>
      </div>

      <div style="background:rgba(255,255,255,.03);border:1px solid var(--border);padding:1rem;margin-bottom:1.2rem">
        <div style="font-family:var(--font-mono);font-size:.55rem;letter-spacing:3px;color:var(--gray);margin-bottom:.8rem">RESUMEN DE TU PEDIDO</div>
        ${lineasHTML}
        <div style="display:flex;justify-content:space-between;align-items:center;padding-top:.8rem;margin-top:.2rem">
          <span style="font-family:var(--font-mono);font-size:.6rem;letter-spacing:2px;color:var(--gray)">TOTAL ESTIMADO</span>
          <span style="font-family:var(--font-mono);font-size:1.1rem;color:var(--neon);font-weight:700">$${total.toLocaleString()} MXN</span>
        </div>
      </div>

      <div style="background:rgba(37,211,102,.06);border:1px solid rgba(37,211,102,.2);padding:.8rem 1rem;margin-bottom:1.2rem;display:flex;gap:.7rem;align-items:flex-start">
        <span style="font-size:1.1rem">📱</span>
        <div style="color:rgba(255,255,255,.7);font-size:.8rem;font-weight:300;line-height:1.6">
          Revisa WhatsApp — el equipo SARUX te responderá para confirmar tu pedido y coordinar el pago.
        </div>
      </div>

      <button onclick="cerrarConfirmacionPedido()" style="
        width:100%;background:var(--neon);color:#000;border:none;
        padding:1rem;font-family:var(--font-display);font-size:.9rem;
        letter-spacing:3px;cursor:pointer;
      ">ENTENDIDO</button>
    </div>
  `;
  document.body.appendChild(overlay);
  document.body.style.overflow = 'hidden';

  // Cerrar tocando fuera
  overlay.addEventListener('click', e=>{ if(e.target===overlay) cerrarConfirmacionPedido(); });
}

function cerrarConfirmacionPedido(){
  const overlay = document.getElementById('pedidoConfirmOverlay');
  if(overlay){ 
    overlay.style.animation='fadeOutConf .25s ease forwards';
    overlay.style.pointerEvents = 'none';
    setTimeout(()=>{ 
      if(overlay.parentNode) overlay.parentNode.removeChild(overlay);
      // Limpiar cualquier estilo residual del body
      document.body.style.overflow = '';
      document.body.style.pointerEvents = '';
      document.body.style.userSelect = '';
      document.documentElement.style.overflow = '';
      // Vaciar carrito
      carrito = [];
      guardarCarrito();
      actualizarBadge();
      renderCarrito();
    }, 260); 
  }
}

// ─── COMPARTIR ────────────────────────────────────────────────────────────────
// URL del Worker para compartir (genera preview con imagen en WhatsApp)
const SHARE_BASE = 'https://purple-sky-0d90sarux-og.lalito14102002.workers.dev';

function compartirSeccion(seccion){
  const base = window.location.href.split('?')[0].split('#')[0];
  const urls = {
    creaciones: base + 'creaciones.html',
    resenas: base + 'resenas.html'
  };
  const titulos = {
    creaciones: '✨ Nuestras Creaciones | SARUX — Diseño y Sublimación en Puebla',
    resenas: '⭐ Reseñas de Clientes | SARUX — Diseño y Sublimación en Puebla'
  };
  const url = urls[seccion] || base;
  const titulo = titulos[seccion] || 'SARUX';
  if(navigator.share){
    navigator.share({ title: titulo, url }).catch(()=>{});
  } else {
    navigator.clipboard.writeText(url).then(()=>showToast('🔗 Link copiado al portapapeles')).catch(()=>showToast('🔗 ' + url));
  }
}

// ── NUESTRAS CREACIONES ────────────────────────────────────────────────────
async function cargarCreaciones(){
  const grid = document.getElementById('creacionesGrid');
  if(!grid) return;
  try {
    const { data, error } = await sb.from('creaciones').select('*').order('orden',{ascending:true}).order('created_at',{ascending:false});
    if(error || !data || !data.length){
      grid.innerHTML = '';
      return;
    }
    const visibles = data.slice(0,4);
    grid.innerHTML = visibles.map(c => mkCreacionCard(c)).join('');
    const wrap = document.getElementById('verMasCreacionesWrap');
    if(wrap) wrap.style.display = data.length > 4 ? 'flex' : 'none';
    initLazyImages();
  } catch(e){
    grid.innerHTML = '';
  }
}

function mkCreacionCard(c){
  const esVideo = c.media_url && /\.(mp4|mov|webm|ogg)(\?|$)/i.test(c.media_url);
  let mediaEl = '';
  if(c.media_url){
    mediaEl = esVideo
      ? `<div class="resena-media"><video src="${c.media_url}" muted playsinline controls loop style="width:100%;height:100%;object-fit:cover;display:block"></video></div>`
      : `<div class="resena-media"><img data-src="${c.media_url}" src="" alt="${c.titulo||''}" class="lazy" loading="lazy" style="width:100%;height:100%;object-fit:cover;display:block" onclick="abrirLightboxMedia('${c.media_url}','img');event.stopPropagation()"></div>`;
  }
  return `<div class="resena-card">${mediaEl}
    <div class="resena-body">
      ${c.titulo ? `<div style="font-family:var(--font-mono);font-size:.6rem;letter-spacing:2px;color:var(--white);font-weight:700;text-transform:uppercase">${c.titulo}</div>` : ''}
      ${c.descripcion ? `<div class="resena-texto" style="font-style:normal">${c.descripcion}</div>` : ''}
    </div>
  </div>`;
}

function compartirProducto(nombre, catNombre){
  let imgUrl = '';
  const found = buscarProdEnCatalogo(nombre);
  if(found){
    const p = found.p;
    imgUrl = p.imagen || (p.disenos && p.disenos[0] && p.disenos[0].imagen) || '';
  }
  // Sin #catalogo — WhatsApp ignora URLs con fragmento #
  const url = SHARE_BASE + '/?prod=' + encodeURIComponent(nombre);
  if(navigator.share){
    navigator.share({ title: nombre + ' | SARUX', text: 'Mira este producto en SARUX', url }).catch(()=>{});
  } else {
    navigator.clipboard.writeText(url).then(()=>showToast('🔗 Link copiado al portapapeles')).catch(()=>showToast('🔗 ' + url));
  }
}

// ─── OG IMAGE DINÁMICO ────────────────────────────────────────────────────────
function actualizarOGMetas(p, catNombre){
  const titulo = (p.nombre || 'SARUX') + ' — ' + (catNombre || 'Diseños originales');
  const desc   = p.descripcion || `${p.nombre} desde $${(p.precio||0).toLocaleString()} MXN. Personalización en Puebla.`;
  const img    = p.imagen || (p.disenos && p.disenos[0] && p.disenos[0].imagen) || '';
  const url    = window.location.origin + window.location.pathname + '?prod=' + encodeURIComponent(p.nombre) + '#catalogo';

  function setMeta(sel, attr, val){ const el = document.querySelector(sel); if(el && val) el.setAttribute(attr, val); }
  setMeta('meta[property="og:title"]',       'content', titulo);
  setMeta('meta[property="og:description"]', 'content', desc);
  setMeta('meta[property="og:url"]',         'content', url);
  if(img){
    let ogImg = document.querySelector('meta[property="og:image"]');
    if(!ogImg){ ogImg = document.createElement('meta'); ogImg.setAttribute('property','og:image'); document.head.appendChild(ogImg); }
    ogImg.setAttribute('content', img);
    // og:image:width / og:image:height opcionales
    let ogImgW = document.querySelector('meta[property="og:image:width"]');
    if(!ogImgW){ ogImgW = document.createElement('meta'); ogImgW.setAttribute('property','og:image:width'); document.head.appendChild(ogImgW); }
    ogImgW.setAttribute('content','1200');
    // Twitter card
    let twImg = document.querySelector('meta[name="twitter:image"]');
    if(!twImg){ twImg = document.createElement('meta'); twImg.setAttribute('name','twitter:image'); document.head.appendChild(twImg); }
    twImg.setAttribute('content', img);
  }
  setMeta('meta[name="twitter:title"]',       'content', titulo);
  setMeta('meta[name="twitter:description"]', 'content', desc);
  // Actualizar title del tab también
  document.title = titulo + ' | SARUX';
}


function compartirImagenActiva(){
  const ref = window._modalProdActivo;
  if(!ref) return;
  const idx = window._modalDisenoIdx || 0;
  // Sin #catalogo — WhatsApp ignora URLs con fragmento #
  const url = SHARE_BASE + '/?prod=' + encodeURIComponent(ref.p.nombre) + (idx ? '&img=' + idx : '');
  if(navigator.share){
    navigator.share({ title: ref.p.nombre + ' | SARUX', text: 'Mira este diseño en SARUX', url }).catch(()=>{});
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
document.addEventListener('DOMContentLoaded', ()=>{ actualizarBadge(); _cargarFavs(); _actualizarFavBadge(); });
window.addEventListener('renderDone', checkDeepLink);

// LIGHTBOX
let _lightboxSrc = '';

// ── ZOOM STATE ────────────────────────────────────────────────────────────────
var _lbZoom = { scale:1, tx:0, ty:0, dragging:false, lastX:0, lastY:0,
                pinching:false, pinchDist0:0, scale0:1,
                lastTap:0, hintTimer:null };

function _lbApplyTransform(img){
  img.style.transform = 'translate('+_lbZoom.tx+'px,'+_lbZoom.ty+'px) scale('+_lbZoom.scale+')';
}
function _lbReset(){
  _lbZoom.scale=1; _lbZoom.tx=0; _lbZoom.ty=0;
  var img=document.getElementById('lightbox-img');
  if(img){ img.style.transform=''; img.style.animation='lightboxIn .25s ease'; }
}
function _lbClamp(){
  // Limitar pan para no salirse demasiado de la pantalla
  var maxPan = Math.max(0, ((_lbZoom.scale-1)*window.innerWidth*0.5));
  var maxPanY = Math.max(0, ((_lbZoom.scale-1)*window.innerHeight*0.5));
  _lbZoom.tx = Math.min(maxPan, Math.max(-maxPan, _lbZoom.tx));
  _lbZoom.ty = Math.min(maxPanY, Math.max(-maxPanY, _lbZoom.ty));
}

function _lbDist(touches){
  var dx=touches[0].clientX-touches[1].clientX;
  var dy=touches[0].clientY-touches[1].clientY;
  return Math.sqrt(dx*dx+dy*dy);
}

function _initLightboxZoom(){
  var wrap = document.getElementById('lightbox-zoom-wrap');
  var img  = document.getElementById('lightbox-img');
  var lb   = document.getElementById('lightbox');
  var hint = document.getElementById('lightbox-hint');
  if(!wrap||!img) return;

  // Ocultar hint después de 2.5s
  if(_lbZoom.hintTimer) clearTimeout(_lbZoom.hintTimer);
  if(hint){ hint.classList.remove('hidden');
    _lbZoom.hintTimer = setTimeout(function(){ hint.classList.add('hidden'); }, 2500); }

  // ── TOUCH: pinch zoom + drag ──────────────────────────────────────────────
  wrap.ontouchstart = function(e){
    if(e.touches.length===2){
      _lbZoom.pinching=true;
      _lbZoom.pinchDist0=_lbDist(e.touches);
      _lbZoom.scale0=_lbZoom.scale;
      e.preventDefault();
    } else if(e.touches.length===1){
      // Doble tap para zoom 2.5x / reset
      var now=Date.now();
      if(now-_lbZoom.lastTap<300){
        if(_lbZoom.scale>1){ _lbReset(); }
        else {
          var t=e.touches[0];
          var rect=img.getBoundingClientRect();
          _lbZoom.scale=2.5;
          _lbZoom.tx=(window.innerWidth/2-t.clientX)*1.5;
          _lbZoom.ty=(window.innerHeight/2-t.clientY)*1.5;
          _lbClamp();
          img.style.transition='transform .2s ease';
          _lbApplyTransform(img);
          setTimeout(function(){ img.style.transition=''; },200);
        }
        _lbZoom.lastTap=0; return;
      }
      _lbZoom.lastTap=now;
      if(_lbZoom.scale>1){
        _lbZoom.dragging=true;
        _lbZoom.lastX=e.touches[0].clientX;
        _lbZoom.lastY=e.touches[0].clientY;
        img.classList.add('grabbing');
        e.preventDefault();
      }
    }
  };
  wrap.ontouchmove = function(e){
    if(_lbZoom.pinching && e.touches.length===2){
      var dist=_lbDist(e.touches);
      _lbZoom.scale=Math.min(5, Math.max(1, _lbZoom.scale0*(dist/_lbZoom.pinchDist0)));
      _lbClamp();
      img.style.transition='none';
      _lbApplyTransform(img);
      e.preventDefault();
    } else if(_lbZoom.dragging && e.touches.length===1){
      var dx=e.touches[0].clientX-_lbZoom.lastX;
      var dy=e.touches[0].clientY-_lbZoom.lastY;
      _lbZoom.tx+=dx; _lbZoom.ty+=dy;
      _lbZoom.lastX=e.touches[0].clientX;
      _lbZoom.lastY=e.touches[0].clientY;
      _lbClamp();
      img.style.transition='none';
      _lbApplyTransform(img);
      e.preventDefault();
    }
  };
  wrap.ontouchend = function(e){
    if(e.touches.length<2) _lbZoom.pinching=false;
    if(e.touches.length===0){
      _lbZoom.dragging=false;
      img.classList.remove('grabbing');
      // Si quedó en scale<1 por error, reset
      if(_lbZoom.scale<1){ _lbReset(); }
    }
  };

  // ── MOUSE: rueda para zoom + drag ────────────────────────────────────────
  wrap.onwheel = function(e){
    e.preventDefault();
    var delta = e.deltaY > 0 ? 0.9 : 1.1;
    _lbZoom.scale = Math.min(5, Math.max(1, _lbZoom.scale*delta));
    _lbClamp();
    if(_lbZoom.scale===1){ _lbReset(); return; }
    img.style.transition='none';
    _lbApplyTransform(img);
  };
  wrap.onmousedown = function(e){
    if(_lbZoom.scale>1){ _lbZoom.dragging=true; _lbZoom.lastX=e.clientX; _lbZoom.lastY=e.clientY; img.classList.add('grabbing'); }
  };
  wrap.onmousemove = function(e){
    if(!_lbZoom.dragging) return;
    _lbZoom.tx+=e.clientX-_lbZoom.lastX; _lbZoom.ty+=e.clientY-_lbZoom.lastY;
    _lbZoom.lastX=e.clientX; _lbZoom.lastY=e.clientY;
    _lbClamp(); img.style.transition='none'; _lbApplyTransform(img);
  };
  wrap.onmouseup = function(){ _lbZoom.dragging=false; img.classList.remove('grabbing'); };

  // Click en fondo (no imagen) cierra el lightbox
  lb.onclick = function(e){ if(e.target===lb || e.target===wrap) cerrarLightbox(); };
}

function abrirLightbox() {
  if(!_lightboxSrc) return;
  _lbReset();
  var img = document.getElementById('lightbox-img');
  img.src = _lightboxSrc;
  document.getElementById('lightbox').classList.add('open');
  document.body.style.overflow = 'hidden';
  history.pushState({ saruxLightbox: true }, '', window.location.href);
  setTimeout(_initLightboxZoom, 50);
}
function abrirLightboxMedia(src, tipo) {
  var lb  = document.getElementById('lightbox');
  var img = document.getElementById('lightbox-img');
  var vid = document.getElementById('lightbox-vid');
  _lbReset();
  if(tipo === 'video'){
    img.style.display = 'none';
    if(!vid){
      vid = document.createElement('video');
      vid.id = 'lightbox-vid';
      vid.controls = true; vid.autoplay = true;
      vid.style.cssText = 'max-width:95vw;max-height:95vh;object-fit:contain;border-radius:2px;animation:lightboxIn .25s ease';
      document.getElementById('lightbox-zoom-wrap').appendChild(vid);
    }
    vid.src = src; vid.style.display = 'block';
  } else {
    if(vid){ vid.pause(); vid.style.display='none'; vid.src=''; }
    img.style.display = 'block'; img.src = src;
    setTimeout(_initLightboxZoom, 50);
  }
  lb.classList.add('open');
  document.body.style.overflow = 'hidden';
  history.pushState({ saruxLightbox: true }, '', window.location.href);
}
function cerrarLightbox() {
  var lb = document.getElementById('lightbox');
  lb.classList.remove('open');
  document.body.style.overflow = '';
  _lbReset();
  var vid = document.getElementById('lightbox-vid');
  if(vid){ vid.pause(); vid.src=''; }
}
document.addEventListener('keydown', function(e){ if(e.key==='Escape'){ cerrarLightbox(); cerrarCatPanel(); } });
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
  let loaderCfg   = getLoaderCfg();
  let LOADER_MIN_MS = Math.min(30, Math.max(1, loaderCfg.segundos || 3)) * 1000;
  let LOADER_MSGS = loaderCfg.mensajes && loaderCfg.mensajes.length
    ? loaderCfg.mensajes
    : ['Cargando productos...','Preparando catálogo...','Cargando imágenes...','Casi listo...','¡Ya mero!'];

  const tiempoInicio = Date.now();
  const loader = document.getElementById('sarux-loader');
  const barra  = loader ? loader.querySelector('.loader-barra') : null;
  const texto  = loader ? loader.querySelector('.loader-texto') : null;

  // Animar barra y mensajes durante el tiempo configurado.
  // LOADER_MIN_MS puede actualizarse en caliente (ver PASO 0 más abajo) si llega
  // un valor más reciente desde Supabase antes de que la barra haya terminado.
  function animarBarra(){
    if(!barra) return;
    const startTime = Date.now();
    const TICK = 50; // actualizar cada 50ms
    let paso = 0;
    if(texto) texto.textContent = LOADER_MSGS[0];
    barra.style.transition = 'none';
    barra.style.width = '0%';

    const tick = setInterval(function(){
      const elapsed = Date.now() - startTime;
      const intervaloMsg = LOADER_MIN_MS / LOADER_MSGS.length;
      const pct = Math.min(100, (elapsed / LOADER_MIN_MS) * 100);
      barra.style.width = pct + '%';

      // Cambiar mensaje
      const pasoActual = Math.floor(elapsed / intervaloMsg);
      if(pasoActual > paso && pasoActual < LOADER_MSGS.length){
        paso = pasoActual;
        if(texto) texto.textContent = LOADER_MSGS[paso];
      }

      if(elapsed >= LOADER_MIN_MS) clearInterval(tick);
    }, TICK);
  }
  animarBarra();

  const ocultarLoader = function(){
    if(loader) loader.classList.add('oculto');
  };

  // PASO 0: pedir la config más reciente de Supabase de inmediato (solo el tiempo del loader),
  // por si la caché local del navegador tiene un valor viejo. Esto corrige el caso en que
  // el dueño cambió los segundos en el admin pero el visitante todavía tiene caché vieja.
  sb.from('site_config').select('config_data').eq('id',1).single().then(function(res){
    const cfgFresca = res && res.data && res.data.config_data && res.data.config_data.LOADER_CONFIG;
    if(cfgFresca && typeof cfgFresca.segundos === 'number'){
      const nuevoMs = Math.min(15, Math.max(1, cfgFresca.segundos)) * 1000;
      // FIX: Solo aplicar si la respuesta llegó ANTES de que el tiempo original ya pasara.
      // Así evitamos que una respuesta lenta de Supabase extienda el loader y deje la página colgada.
      const transcurridoAhora = Date.now() - tiempoInicio;
      if(nuevoMs !== LOADER_MIN_MS && transcurridoAhora < LOADER_MIN_MS){
        LOADER_MIN_MS = nuevoMs;
        if(cfgFresca.mensajes && cfgFresca.mensajes.length) LOADER_MSGS = cfgFresca.mensajes;
      }
    }
  }).catch(function(){});

  // PASO 1: preparar página en background con DEFAULTS
  try { detectarRefEnURL(); } catch(e){} // FIX: protegido por si la función no existe
  APP_DATA = JSON.parse(JSON.stringify(DEFAULTS));
  try { syncGlobalsFromAppData(); } catch(e){}
  try { applyStyles(); } catch(e){}
  try { renderPage(); } catch(e){}

  // Cargar config de referidos y aplicar descuento de bienvenida si aplica (no bloqueante)
  // FIX: protegido por si cargarConfigReferidos no está definida
  try {
    if(typeof cargarConfigReferidos === 'function'){
      cargarConfigReferidos().then(()=>{ try{ if(typeof aplicarDescuentoReferidoSiAplica==='function') aplicarDescuentoReferidoSiAplica(); }catch(e){} }).catch(()=>{});
    }
  } catch(e){}

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

  // FALLBACK ABSOLUTO: sin importar qué pase, el loader se oculta a los 12 segundos máximo.
  setTimeout(function(){
    try { if(loader) loader.classList.add('oculto'); } catch(e){}
  }, 12000);

  // PASO 3: esperar el tiempo configurado, luego quitar loader.
  // Se revisa cada 100ms en vez de un solo setTimeout fijo, así si LOADER_MIN_MS
  // se actualizó (PASO 0, valor fresco de Supabase) el cierre respeta el tiempo correcto.
  const checkCierre = setInterval(function(){
    const transcurrido = Date.now() - tiempoInicio;
    if(transcurrido >= LOADER_MIN_MS){
      clearInterval(checkCierre);
      ocultarLoader();
      try { iniciarLluviaImagen(); } catch(e){}
      try { iniciarSusPopup(); } catch(e){}
    }
  }, 100);
})();

// ─── SUSCRIPCIÓN DE CORREO ────────────────────────────────────────────────────
const SUS_KEY = 'sarux_suscrito'; // localStorage key

function iniciarSusPopup(){
  // No mostrar si ya se suscribió, ya inició sesión, o ya cerró el popup antes en esta sesión
  if(localStorage.getItem(SUS_KEY)) return;
  if(localStorage.getItem(PERFIL_KEY) && localStorage.getItem(PERFIL_CORREO)) return;
  if(sessionStorage.getItem('sarux_sus_cerrado')) return;
  // Mostrar después de 12 segundos navegando en la página
  setTimeout(()=>{
    const overlay = document.getElementById('susPopupOverlay');
    if(overlay) overlay.style.display = 'flex';
  }, 12000);
}

function cerrarSusPopup(){
  const overlay = document.getElementById('susPopupOverlay');
  if(overlay) overlay.style.display = 'none';
  // Guardar que ya se cerró para no volver a mostrar en esta sesión
  sessionStorage.setItem('sarux_sus_cerrado', '1');
}

async function enviarSuscripcion(){
  const nombre = (document.getElementById('sus-nombre').value||'').trim();
  const correo = (document.getElementById('sus-correo').value||'').trim().toLowerCase();
  const msg    = document.getElementById('sus-msg');

  if(!correo || !correo.includes('@')){
    msg.style.color = 'var(--neon)';
    msg.textContent = '⚠️ Escribe un correo válido';
    return;
  }

  msg.style.color = 'var(--gray)';
  msg.textContent = 'Guardando...';

  try {
    // upsert: si el correo ya existe lo actualiza (nombre, activo=true),
    // si no existe lo crea. Así funciona en cualquier dispositivo.
    const { error } = await sb.from('suscriptores')
      .upsert(
        [{ correo, nombre: nombre||null, activo: true }],
        { onConflict: 'correo' }
      );

    if(error){
      msg.style.color = 'var(--neon)';
      msg.textContent = '❌ Error al guardar. Intenta de nuevo.';
      return;
    }

    // Guardar en este dispositivo para no volver a mostrar el popup
    localStorage.setItem(SUS_KEY, '1');
    mostrarExitoSuscripcion();

  } catch(e){
    msg.style.color = 'var(--neon)';
    msg.textContent = '❌ Error de conexión. Intenta de nuevo.';
  }
}

function mostrarExitoSuscripcion(){
  const form  = document.getElementById('sus-form');
  const exito = document.getElementById('sus-exito');
  if(form)  form.style.display  = 'none';
  if(exito) exito.style.display = 'block';
  // El usuario cierra manualmente con el botón ✕ o 'VER CATÁLOGO'
}

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
    if(_fotosClientesCache && (ahora - _fotosClientesCacheTs) < FOTOS_CACHE_TTL){
      renderFotosClientes(_fotosClientesCache);
      return;
    }
    const { data, error } = await sb
      .from('fotos_clientes')
      .select('id, nombre, producto, imagen_url, resena, estrellas, aprobada, destacada, created_at')
      .eq('aprobada', true)
      .order('created_at', { ascending: false })
      .limit(20);
    if(error) throw error;
    _fotosClientesCache = data || [];
    _fotosClientesCacheTs = ahora;
    renderFotosClientes(_fotosClientesCache);
  } catch(e){
    console.warn('fotos_clientes:', e);
    if(grid) grid.innerHTML = '<div class="foto-real-nueva">📷<span>Sin reseñas aún</span></div>';
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
    grid.innerHTML = '<div class="foto-real-nueva">📷<span>¡Sé el primero en dejar tu reseña!</span></div>';
    return;
  }

  // Mostrar solo las 4 destacadas (orden por campo "destacada" o simplemente las primeras 4)
  const destacadas = rows.filter(r => r.destacada).slice(0,4);
  const visibles = destacadas.length >= 4 ? destacadas : rows.slice(0,4);

  function mkCard(r){
    const esVideo = r.imagen_url && /\.(mp4|mov|webm|ogg)(\?|$)/i.test(r.imagen_url);
    const estrellas = '⭐'.repeat(Math.min(5, Math.max(1, r.estrellas || 5)));
    let mediaEl = '';
    if(r.imagen_url){
      const imgSrc = esVideo ? r.imagen_url : supabaseImgOpt(r.imagen_url, 400);
      const imgFull = r.imagen_url;
      mediaEl = esVideo
        ? '<div class="resena-media resena-media-video" onclick="reproducirVideoResena(this,\'' + imgFull.replace(/'/g,"\\'") + '\');event.stopPropagation()" style="cursor:pointer;position:relative">' +
            '<video muted playsinline preload="none" class="resena-vid-thumb" style="width:100%;height:100%;object-fit:cover;display:block"></video>' +
            '<div class="resena-play-overlay"><span class="resena-play-btn">▶</span></div>' +
            '<div class="resena-media-badge">▶ VIDEO</div>' +
           '</div>'
        : '<div class="resena-media"><img data-src="' + imgSrc + '" src="" alt="' + r.nombre + '" class="lazy" loading="lazy" style="width:100%;height:100%;object-fit:cover" onclick="abrirLightboxMedia(\'' + imgFull + '\',\'img\');event.stopPropagation()"></div>';
    }
    const resenaTxt = r.resena
      ? '<div class="resena-texto">"' + r.resena + '"</div>'
      : '<div class="resena-texto">"' + r.producto + '"</div>';
    if(!r.imagen_url){
      return '<div class="resena-card resena-card-texto"><div class="resena-body">' + resenaTxt +
        '<div class="resena-estrellas">' + estrellas + '</div>' +
        '<div class="resena-nombre">— ' + r.nombre + '</div></div></div>';
    }
    return '<div class="resena-card">' + mediaEl + '<div class="resena-body">' + resenaTxt +
      '<div class="resena-estrellas">' + estrellas + '</div>' +
      '<div class="resena-nombre">— ' + r.nombre + '</div></div></div>';
  }

  grid.innerHTML = visibles.map(mkCard).join('');

  // Botón "Ver más reseñas"
  const verMasWrap = document.getElementById('verMasResenasWrap');
  if(verMasWrap){
    verMasWrap.style.display = rows.length > 4 ? 'flex' : 'none';
  }

  initLazyImages();

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
    // Pre-rellenar el nombre del producto si está disponible y bloquear el campo
    // (así la reseña siempre queda ligada exactamente al producto correcto)
    const prod = window._modalProdActivo;
    const frProd = document.getElementById('frProducto');
    if(prod && prod.p && prod.p.nombre && frProd){
      frProd.value = prod.p.nombre;
      frProd.readOnly = true;
      frProd.style.opacity = '.7';
      frProd.style.cursor = 'not-allowed';
    }
  }, 200);
}

// ── Modal subir foto ──────────────────────────────────────────────────────────
function abrirFrModal(){
  document.getElementById('frModalOverlay').classList.add('open');
  document.body.style.overflow = 'hidden';
  // Asegurar que el campo producto esté editable (por si quedó bloqueado de una reseña anterior)
  const frProd = document.getElementById('frProducto');
  if(frProd){ frProd.readOnly = false; frProd.style.opacity = ''; frProd.style.cursor = ''; }
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
      abrirEnlaceExterno(`https://wa.me/${wa}?text=${msg}`);
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
        history.replaceState(null, null, '#'+target);
        scrollToSection(target);
      }
    });
  });

  // Botón atrás del celular — un solo listener
  window.addEventListener('popstate', function(e){
    // NUNCA ignorar el botón atrás por scrollManual
    // 0. Lightbox abierto → cerrarlo
    const lb = document.getElementById('lightbox');
    if(lb && lb.classList.contains('open')){ cerrarLightbox(); return; }
    // 1. Modal de producto abierto → cerrarlo
    const modalOverlay = document.getElementById('modalOverlay');
    if(modalOverlay && modalOverlay.classList.contains('open')){ cerrarModal(); return; }
    // 2. Panel de categoría → cerrarlo
    const panel = document.getElementById('catPanel');
    if(panel && panel.classList.contains('open')){ cerrarCatPanel(); return; }
    // 3. Overlay confirmación pedido → cerrarlo
    const confirmOverlay = document.getElementById('pedidoConfirmOverlay');
    if(confirmOverlay){ cerrarConfirmacionPedido(); return; }
    // 4. Nada abierto → dejar que el navegador salga normalmente
  });

  // IntersectionObserver para actualizar hash al hacer scroll
  if('IntersectionObserver' in window){
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if(entry.isIntersecting){
          const id = entry.target.id;
          if(id && secciones.includes(id) && id !== ultimaSeccion){
            // No actualizar hash si hay un panel/modal abierto
            const catPanel = document.getElementById('catPanel');
            const modalOv  = document.getElementById('modalOverlay');
            const lb       = document.getElementById('lightbox');
            if((catPanel && catPanel.classList.contains('open')) ||
               (modalOv  && modalOv.classList.contains('open'))  ||
               (lb       && lb.classList.contains('open'))) return;
            history.replaceState({ seccion: id }, '', '#' + id);
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

// ═══════════════════════════════════════════════════════════════
// SISTEMA DE PERFIL DE USUARIO — SARUX
// Login sin contraseña: correo → código de 6 dígitos
// ═══════════════════════════════════════════════════════════════

const PERFIL_KEY    = 'sarux_perfil_token';  // token en localStorage
const PERFIL_CORREO = 'sarux_perfil_correo'; // correo en localStorage
let   _perfilActual = null;                  // objeto del usuario en memoria

// ── Abrir / cerrar modal ─────────────────────────────────────
function abrirPerfilModal(){
  const overlay = document.getElementById('perfilOverlay');
  overlay.style.display = 'flex';
  // Si hay sesión guardada, intentar cargar directo el perfil
  const token  = localStorage.getItem(PERFIL_KEY);
  const correo = localStorage.getItem(PERFIL_CORREO);
  if(token && correo){
    cargarPerfilConToken(correo, token);
  } else {
    mostrarPaso1Perfil();
  }
}
function cerrarPerfilModal(){
  document.getElementById('perfilOverlay').style.display = 'none';
}

// ── Navegación entre pasos ───────────────────────────────────
function mostrarPaso1Perfil(){
  document.getElementById('perfil-paso1').style.display = 'block';
  document.getElementById('perfil-paso2').style.display = 'none';
  document.getElementById('perfil-paso3').style.display = 'none';
  document.getElementById('perfil-msg1').textContent = '';
}

// ── PASO 1: Solicitar código ─────────────────────────────────
async function solicitarCodigoPerfil(){
  const correo = (document.getElementById('perfil-correo-input').value||'').trim().toLowerCase();
  const msg    = document.getElementById('perfil-msg1');
  if(!correo || !correo.includes('@')){
    msg.textContent = '⚠️ Escribe un correo válido';
    return;
  }
  msg.textContent = 'Enviando código...';

  // Generar código de 6 dígitos y guardarlo en Supabase
  const codigo   = String(Math.floor(100000 + Math.random() * 900000));
  const expira   = new Date(Date.now() + 15 * 60 * 1000).toISOString(); // 15 min

  // Generar UID personal único de 6 dígitos
  const uidPersonal = 'S' + String(Math.floor(100000 + Math.random() * 900000));

  // Upsert del suscriptor (crea si no existe)
  // uid_sarux solo se asigna en la inserción; el ON CONFLICT no lo sobreescribe
  const { error: errUpsert } = await sb.from('suscriptores')
    .upsert([{ correo, activo: true, token_sesion: codigo, token_expira: expira, uid_sarux: uidPersonal }],
            { onConflict: 'correo', ignoreDuplicates: false });

  if(errUpsert){
    msg.textContent = '❌ Error. Intenta de nuevo.';
    return;
  }

  // Mandar el código por correo usando EmailJS (gratis hasta 200/mes)
  const enviado = await enviarCodigoPorCorreo(correo, codigo);
  if(!enviado){
    msg.textContent = '❌ No se pudo enviar el correo. Intenta de nuevo.';
    return;
  }

  // Pasar al paso 2
  document.getElementById('perfil-correo-hint').textContent =
    `Te mandamos un código a ${correo}. Revisa tu bandeja (y spam).`;
  document.getElementById('perfil-paso1').style.display = 'none';
  document.getElementById('perfil-paso2').style.display = 'block';
  document.getElementById('perfil-msg2').textContent    = '';
  document.getElementById('perfil-codigo-input').value  = '';
  // Guardar correo temporalmente
  localStorage.setItem(PERFIL_CORREO, correo);
}

// ── Enviar correo con EmailJS ────────────────────────────────
async function enviarCodigoPorCorreo(correo, codigo){
  try {
    // Usa el servicio público de EmailJS — configura tus IDs en config.js
    const serviceId  = window.EMAILJS_SERVICE  || '';
    const templateId = window.EMAILJS_TEMPLATE || '';
    const publicKey  = window.EMAILJS_KEY      || '';
    if(!serviceId || !templateId || !publicKey) return false;

    const res = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        service_id:  serviceId,
        template_id: templateId,
        user_id:     publicKey,
        template_params: {
          email:    correo,
          passcode: codigo,
          time:     '15 minutos'
        }
      })
    });
    return res.ok;
  } catch(e){ return false; }
}

// ── PASO 2: Verificar código ─────────────────────────────────
async function verificarCodigoPerfil(){
  const correo = localStorage.getItem(PERFIL_CORREO)||'';
  const codigo = (document.getElementById('perfil-codigo-input').value||'').trim();
  const msg    = document.getElementById('perfil-msg2');
  if(codigo.length !== 6){ msg.textContent = '⚠️ El código tiene 6 dígitos'; return; }
  msg.textContent = 'Verificando...';

  const { data, error } = await sb.from('suscriptores')
    .select('*')
    .eq('correo', correo)
    .eq('token_sesion', codigo)
    .gt('token_expira', new Date().toISOString())
    .single();

  if(error || !data){
    msg.textContent = '❌ Código incorrecto o expirado.';
    return;
  }

  // Detectar si es primera vez (visitas === 0 o null = registro nuevo)
  const esPrimeraVez = !data.visitas || data.visitas === 0;

  // Generar token de sesión largo y guardarlo
  const tokenSesion = crypto.randomUUID();
  await sb.from('suscriptores')
    .update({ token_sesion: tokenSesion, token_expira: null,
              visitas: (data.visitas||0) + 1 })
    .eq('id', data.id);

  localStorage.setItem(PERFIL_KEY, tokenSesion);
  try{ localStorage.setItem(SUS_KEY, '1'); }catch(e){}
  _perfilActual = { ...data, token_sesion: tokenSesion };

  // Revisamos el cupón de bienvenida en cada inicio de sesión (no solo la
  // primera vez), porque otorgarCuponBienvenida ya evita duplicados por su
  // cuenta. Así, si la persona se registró primero y instala la app después
  // (o al revés), en cuanto cumpla ambas condiciones recibe su cupón —
  // sin importar el orden en que pasen esas dos cosas.
  if(esAppInstalada()){
    try{
      const cupon = await otorgarCuponBienvenida(data);
      if(cupon && cupon.recienCreado){
        mostrarPopupCupon('bienvenida', cupon, data.nombre);
      }
    }catch(e){}
  } else if(esPrimeraVez){
    // No tiene la app instalada todavía: le avisamos del incentivo,
    // solo la primera vez, para no ser repetitivos en cada visita.
    try{
      showToast('📲 Instala la app SARUX para obtener tu cupón de bienvenida del 10%', 5000);
    }catch(e){}
  }

  mostrarPaso3Perfil(_perfilActual);
}

// ── Cargar perfil con token guardado ────────────────────────
async function cargarPerfilConToken(correo, token){
  const { data, error } = await sb.from('suscriptores')
    .select('*')
    .eq('correo', correo)
    .eq('token_sesion', token)
    .single();
  if(error || !data){ mostrarPaso1Perfil(); return; }
  _perfilActual = data;
  mostrarPaso3Perfil(data);
}

// ── PASO 3: Mostrar perfil ───────────────────────────────────
async function mostrarPaso3Perfil(datos){
  document.getElementById('perfil-paso1').style.display = 'none';
  document.getElementById('perfil-paso2').style.display = 'none';
  document.getElementById('perfil-paso3').style.display = 'block';
  document.getElementById('perfil-bienvenida').textContent =
    'HOLA ' + (datos.nombre || datos.correo.split('@')[0]).toUpperCase() + ' 👋';
  const uidEl = document.getElementById('perfil-uid-display');
  if(uidEl) uidEl.textContent = datos.uid_sarux ? 'ID: ' + datos.uid_sarux : '';
  document.getElementById('perfil-nombre-edit').value = datos.nombre  || '';
  document.getElementById('perfil-tel-edit').value    = datos.telefono || '';
  const cumpleInput = document.getElementById('perfil-cumple-edit');
  const cumpleAviso = document.getElementById('perfil-cumple-aviso');
  const cumpleAvisoLibre = document.getElementById('perfil-cumple-aviso-libre');
  cumpleInput.value = datos.cumpleanos || '';
  if(datos.cumpleanos){
    cumpleInput.disabled = true;
    cumpleInput.style.opacity = '0.5';
    cumpleInput.style.cursor = 'not-allowed';
    if(cumpleAviso) cumpleAviso.style.display = 'block';
    if(cumpleAvisoLibre) cumpleAvisoLibre.style.display = 'none';
  } else {
    cumpleInput.disabled = false;
    cumpleInput.style.opacity = '1';
    cumpleInput.style.cursor = '';
    if(cumpleAviso) cumpleAviso.style.display = 'none';
    if(cumpleAvisoLibre) cumpleAvisoLibre.style.display = 'block';
  }

  // Verificar cupón de cumpleaños
  try { await verificarCuponCumpleanos(datos); } catch(e){}
  // Cargar cupones del usuario
  try { await cargarCuponesUsuario(datos.correo); } catch(e){}
  // Mostrar carta de fidelidad
  try { await mostrarCartaFidelidad(datos); } catch(e){
    // Si falla, mostrar tarjeta básica sin nivel
    const card = document.getElementById('perfil-fidelidad-card');
    if(card){ card.style.display='block'; }
  }
}

// ── Guardar cambios del perfil ───────────────────────────────
async function guardarPerfil(){
  const msg     = document.getElementById('perfil-msg3');
  const nombre  = (document.getElementById('perfil-nombre-edit').value||'').trim();
  const tel     = (document.getElementById('perfil-tel-edit').value||'').trim();
  // Si ya tenía cumpleaños guardado, no permitir cambiarlo
  const cumple  = _perfilActual.cumpleanos || (document.getElementById('perfil-cumple-edit').value || null);
  msg.textContent = 'Guardando...';

  const { error } = await sb.from('suscriptores')
    .update({ nombre: nombre||null, telefono: tel||null, cumpleanos: cumple })
    .eq('correo', _perfilActual.correo);

  if(error){ msg.textContent = '❌ Error al guardar.'; return; }
  _perfilActual.nombre    = nombre;
  _perfilActual.telefono  = tel;
  _perfilActual.cumpleanos= cumple;
  msg.style.color = 'var(--white)';
  msg.textContent = '✅ ¡Guardado!';
  setTimeout(()=>{ msg.textContent=''; msg.style.color='var(--neon)'; }, 2500);
}

// ── Popup de cupón (bienvenida app / cumpleaños) ──────────────
function mostrarPopupCupon(tipo, cupon, nombre){
  const overlay = document.getElementById('cuponPopupOverlay');
  if(!overlay || !cupon) return;
  const emoji  = document.getElementById('cuponPopupEmoji');
  const titulo = document.getElementById('cuponPopupTitulo');
  const texto  = document.getElementById('cuponPopupTexto');
  const codigo = document.getElementById('cuponPopupCodigo');

  if(tipo === 'cumpleanos'){
    const plantilla = (APP_DATA.CUPONES_CFG && APP_DATA.CUPONES_CFG.cumpleanos_mensaje)
      || '¡Feliz cumpleaños, {nombre}! 🎂 Aquí tienes un regalo de SARUX.';
    emoji.textContent  = '🎂';
    titulo.textContent = '¡FELIZ CUMPLEAÑOS!';
    texto.textContent  = plantilla.replace('{nombre}', nombre || '');
  } else {
    emoji.textContent  = '🎁';
    titulo.textContent = '¡BIENVENIDO AL CLUB SARUX!';
    texto.textContent  = 'Gracias por registrarte. Aquí tienes tu cupón de bienvenida para tu primera compra.';
  }
  codigo.textContent = `${cupon.codigo} · ${cupon.porcentaje}% OFF`;
  overlay.style.display = 'flex';
}
function cerrarCuponPopup(){
  const overlay = document.getElementById('cuponPopupOverlay');
  if(overlay) overlay.style.display = 'none';
}

// ── Cupón automático de bienvenida (primera vez que se registra) ──
async function otorgarCuponBienvenida(datos){
  // Evitar duplicados: si ya tiene un cupón de bienvenida, no crear otro
  const { data: existente } = await sb.from('cupones_usuario')
    .select('id, codigo, porcentaje')
    .eq('correo', datos.correo)
    .eq('motivo', 'bienvenida')
    .single();

  if(existente) return { ...existente, recienCreado: false };

  const pctBienvenida = (APP_DATA.CUPONES_CFG && APP_DATA.CUPONES_CFG.bienvenida_porcentaje) || 10;
  const codigo = 'BIENVENIDO' + Math.floor(1000 + Math.random() * 9000);

  const { data: creado } = await sb.from('cupones_usuario').insert([{
    suscriptor_id: datos.id,
    correo:        datos.correo,
    codigo,
    porcentaje:    pctBienvenida,
    motivo:        'bienvenida'
  }]).select().single();

  return creado ? { ...creado, recienCreado: true } : { codigo, porcentaje: pctBienvenida, recienCreado: true };
}

// ── Cupón automático de cumpleaños ───────────────────────────
async function verificarCuponCumpleanos(datos){
  if(!datos.cumpleanos) return null;
  const hoy   = new Date();
  const cumple = new Date(datos.cumpleanos);
  const esCumple = (hoy.getMonth() === cumple.getMonth() &&
                    hoy.getDate()  === cumple.getDate());
  if(!esCumple) return null;

  // Verificar si ya tiene cupón de cumpleaños activo este año
  const { data: existente } = await sb.from('cupones_usuario')
    .select('id, codigo, porcentaje')
    .eq('correo', datos.correo)
    .eq('motivo', 'cumpleanos')
    .eq('usado', false)
    .gte('created_at', `${hoy.getFullYear()}-01-01`)
    .single();

  if(existente) return null; // ya tiene uno y ya se le mostró en un ingreso anterior

  // Crear cupón de cumpleaños
  const codigo = 'CUMPLE' + datos.correo.split('@')[0].toUpperCase().slice(0,6)
                           + hoy.getFullYear();
  const expira = new Date(hoy.getFullYear(), hoy.getMonth(), hoy.getDate(), 23, 59, 59).toISOString();

  const pctCumple = (APP_DATA.CUPONES_CFG && APP_DATA.CUPONES_CFG.cumpleanos_porcentaje) || 20;
  const { data: creado } = await sb.from('cupones_usuario').insert([{
    suscriptor_id: datos.id,
    correo:        datos.correo,
    codigo,
    porcentaje:    pctCumple,
    motivo:        'cumpleanos',
    fecha_expira:  expira
  }]).select().single();

  return creado || { codigo, porcentaje: pctCumple };
}

// ── Cargar cupones del usuario ────────────────────────────────
async function cargarCuponesUsuario(correo){
  const lista = document.getElementById('perfil-cupones-lista');
  const { data, error } = await sb.from('cupones_usuario')
    .select('*')
    .eq('correo', correo)
    .eq('usado', false)
    .order('created_at', { ascending: false });

  if(error || !data || data.length === 0){
    lista.innerHTML = '<span style="color:var(--gray)">No tienes cupones activos por ahora.</span>';
    return;
  }

  lista.innerHTML = data.map(c => {
    const expira = c.fecha_expira
      ? `<br><span style="color:rgba(255,255,255,.35);font-size:.6rem">Vence: ${new Date(c.fecha_expira).toLocaleDateString('es-MX')}</span>`
      : '';
    const icono = c.motivo === 'cumpleanos' ? '🎂' : '🎁';
    return `<div style="background:var(--bg);border:1px solid rgba(232,25,44,.3);border-radius:3px;padding:.7rem;margin-bottom:.5rem">
      <span style="color:var(--neon);font-size:.8rem">${icono} ${c.codigo}</span>
      <span style="color:var(--white);margin-left:.5rem">${c.porcentaje}% OFF</span>
      ${c.motivo === 'cumpleanos' ? '<br><span style="color:var(--gray);font-size:.65rem">¡Feliz cumpleaños! Solo válido hoy 🎉</span>' : ''}
      ${expira}
    </div>`;
  }).join('');
}

// ── Cerrar sesión ─────────────────────────────────────────────
function cerrarSesionPerfil(){
  localStorage.removeItem(PERFIL_KEY);
  localStorage.removeItem(PERFIL_CORREO);
  _perfilActual = null;
  mostrarPaso1Perfil();
}

// ── Sumar visita al cargar la página + revisar cupón de cumpleaños ──
(async function registrarVisita(){
  const token  = localStorage.getItem(PERFIL_KEY);
  const correo = localStorage.getItem(PERFIL_CORREO);
  if(!token || !correo) return;
  try {
    const { data } = await sb.from('suscriptores')
      .select('id, correo, nombre, cumpleanos, visitas').eq('correo', correo).eq('token_sesion', token).single();
    if(data){
      await sb.from('suscriptores')
        .update({ visitas: (data.visitas||0) + 1 }).eq('id', data.id);
      try{
        const cupon = await verificarCuponCumpleanos(data);
        if(cupon) mostrarPopupCupon('cumpleanos', cupon, data.nombre);
      }catch(e){}
    }
  } catch(e){}
})();



// ═══════════════════════════════════════════════════════════════
// PUSH NOTIFICATIONS REALES — llegan aunque la app esté CERRADA
// ═══════════════════════════════════════════════════════════════
// Requiere: 1) llave pública VAPID configurada abajo,
//           2) tabla 'push_suscripciones' en Supabase,
//           3) la Edge Function 'enviar-push' desplegada en Supabase.
// Mientras esos 3 puntos no estén listos, este bloque simplemente
// no hace nada (falla en silencio) y el resto de la página sigue normal.

// Pega aquí tu llave pública VAPID (la generas con el comando que te dejamos
// en las instrucciones). Mientras esté vacía, no se pedirá suscripción push.
const VAPID_PUBLIC_KEY = '';

function _urlBase64ToUint8Array(base64String){
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64  = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  for(let i = 0; i < rawData.length; ++i) outputArray[i] = rawData.charCodeAt(i);
  return outputArray;
}

// Da de alta (o actualiza) la suscripción push del dispositivo actual en Supabase,
// ligada al correo del perfil si hay sesión iniciada (para poder notificar por cumpleaños/cupones
// personales), o sin correo si es un visitante anónimo (para avisos generales de catálogo).
async function suscribirsePush(){
  try{
    if(!VAPID_PUBLIC_KEY) return false; // aún no configurada, no hacer nada
    if(!('serviceWorker' in navigator) || !('PushManager' in window)) return false;
    if(Notification.permission !== 'granted') return false;

    const reg = await navigator.serviceWorker.ready;
    let sub = await reg.pushManager.getSubscription();
    if(!sub){
      sub = await reg.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: _urlBase64ToUint8Array(VAPID_PUBLIC_KEY)
      });
    }

    const correo = localStorage.getItem(PERFIL_CORREO) || null;

    await sb.from('push_suscripciones').upsert({
      endpoint: sub.endpoint,
      correo,
      suscripcion_json: JSON.stringify(sub.toJSON()),
      user_agent: navigator.userAgent.substring(0,200),
      actualizado_en: new Date().toISOString()
    }, { onConflict: 'endpoint' });

    return true;
  }catch(e){
    console.warn('[SARUX Push] No se pudo suscribir:', e);
    return false;
  }
}

// Cancela las notificaciones en este dispositivo. Por seguridad, la tabla no
// permite borrar filas desde el navegador (solo la Edge Function puede), así
// que aquí simplemente se cancela la suscripción del navegador — el endpoint
// quedará "muerto" en Supabase y la función de envío lo limpiará sola la
// próxima vez que intente notificar y reciba un error 404/410.
async function desuscribirsePush(){
  try{
    if(!('serviceWorker' in navigator)) return;
    const reg = await navigator.serviceWorker.ready;
    const sub = await reg.pushManager.getSubscription();
    if(sub) await sub.unsubscribe();
  }catch(e){}
}
window.suscribirsePush   = suscribirsePush;
window.desuscribirsePush = desuscribirsePush;

// ═══════════════════════════════════════════════════════════════
// SISTEMA DE NOTIFICACIONES DEL NAVEGADOR — SARUX
// ═══════════════════════════════════════════════════════════════

async function pedirPermisoNotificaciones(){
  if(!('Notification' in window)) return false;
  if(Notification.permission === 'granted') return true;
  if(Notification.permission === 'denied') return false;
  const result = await Notification.requestPermission();
  return result === 'granted';
}

function mostrarNotificacionNavegador(titulo, mensaje, icono){
  if(!('Notification' in window)) return;
  if(Notification.permission !== 'granted') return;
  const n = new Notification(titulo, {
    body:  mensaje,
    icon:  icono || 'https://res.cloudinary.com/dpoxv0hbi/image/upload/v1/sarux_preset/logo',
    badge: icono || 'https://res.cloudinary.com/dpoxv0hbi/image/upload/v1/sarux_preset/logo',
    vibrate: [200, 100, 200]
  });
  n.onclick = () => { window.focus(); n.close(); };
  setTimeout(() => n.close(), 8000);
}

// Pedir permiso cuando el usuario ya está logueado en su perfil
// (no molestar a los que no tienen cuenta)
async function pedirPermisoSiLogueado(){
  const token  = localStorage.getItem('sarux_perfil_token');
  const correo = localStorage.getItem('sarux_perfil_correo');
  if(!token || !correo) return;
  if(Notification.permission === 'default'){
    // Esperar 5 segundos antes de pedir para no abrumar
    setTimeout(async () => {
      const granted = await pedirPermisoNotificaciones();
      if(granted){
        mostrarNotificacionNavegador(
          '🔔 SARUX — Notificaciones activadas',
          'Te avisaremos cuando tengas cupones o novedades.',
        );
        // Activar también las notificaciones push reales (llegan con la app cerrada)
        try{ if(typeof window.suscribirsePush === 'function') await window.suscribirsePush(); }catch(e){}
      }
    }, 5000);
  } else if(Notification.permission === 'granted'){
    // Ya tenía permiso de antes: asegurar que la suscripción push siga activa y ligada a este correo
    try{ if(typeof window.suscribirsePush === 'function') await window.suscribirsePush(); }catch(e){}
  }
}

// Revisar si hay cupones nuevos para el usuario logueado
async function revisarCuponesNuevos(){
  const token  = localStorage.getItem('sarux_perfil_token');
  const correo = localStorage.getItem('sarux_perfil_correo');
  if(!token || !correo) return;
  if(Notification.permission !== 'granted') return;

  const visto_key = 'sarux_cupones_vistos';
  const vistos = JSON.parse(localStorage.getItem(visto_key) || '[]');

  const { data } = await sb.from('cupones_usuario')
    .select('id, codigo, porcentaje, motivo')
    .eq('correo', correo)
    .eq('usado', false)
    .order('created_at', { ascending: false });

  if(!data || !data.length) return;

  // Notificar solo los cupones que no hemos visto antes
  for(const c of data){
    if(vistos.includes(c.id)) continue;
    vistos.push(c.id);
    const icono = c.motivo === 'cumpleanos' ? '🎂' : '🎁';
    mostrarNotificacionNavegador(
      `${icono} ¡Tienes un cupón de SARUX!`,
      `Tu código: ${c.codigo} — ${c.porcentaje}% de descuento`
    );
    break; // Solo una notificación a la vez
  }

  localStorage.setItem(visto_key, JSON.stringify(vistos));
}

// Pedir permiso a CUALQUIER visitante (con o sin cuenta) para avisos generales
// como "nuevo producto en el catálogo" o "cupón de regalo para todos".
// Se pide una sola vez por dispositivo; si ya se le preguntó, no se vuelve a insistir.
async function pedirPermisoGeneral(){
  if(!('Notification' in window)) return;
  if(Notification.permission === 'granted'){
    try{ if(typeof window.suscribirsePush === 'function') await window.suscribirsePush(); }catch(e){}
    return;
  }
  if(Notification.permission !== 'default') return; // ya dijo que no, no insistir
  const yaPreguntado = localStorage.getItem('sarux_push_preguntado');
  if(yaPreguntado) return;

  setTimeout(async () => {
    localStorage.setItem('sarux_push_preguntado', '1');
    const granted = await pedirPermisoNotificaciones();
    if(granted){
      mostrarNotificacionNavegador(
        '🔔 SARUX — Notificaciones activadas',
        'Te avisaremos de nuevos productos y cupones de regalo.'
      );
      try{ if(typeof window.suscribirsePush === 'function') await window.suscribirsePush(); }catch(e){}
    }
  }, 6000); // un poco después del popup de bienvenida, para no saturar al visitante
}

// Inicializar al cargar la página
window.addEventListener('load', () => {
  pedirPermisoSiLogueado();
  pedirPermisoGeneral();
  setTimeout(revisarCuponesNuevos, 3000);
});


// ═══════════════════════════════════════════════════════════════
// COMPRESIÓN DE IMÁGENES ANTES DE SUBIR — SARUX
// ═══════════════════════════════════════════════════════════════
function comprimirImagen(file, maxWidth=800, quality=0.75){
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = e => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let w = img.width, h = img.height;
        if(w > maxWidth){ h = Math.round(h * maxWidth / w); w = maxWidth; }
        canvas.width = w; canvas.height = h;
        canvas.getContext('2d').drawImage(img, 0, 0, w, h);
        canvas.toBlob(blob => resolve(new File([blob], file.name, { type: 'image/jpeg' })),
          'image/jpeg', quality);
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  });
}

// ═══════════════════════════════════════════════════════════════
// SISTEMA DE FIDELIDAD — SARUX
// ═══════════════════════════════════════════════════════════════

let _nivelesCache = [];

async function cargarNivelesFidelidad(){
  const { data } = await sb.from('fidelidad_niveles')
    .select('*').order('orden', { ascending: true });
  _nivelesCache = data || [];
  return _nivelesCache;
}

async function mostrarCartaFidelidad(datos){
  let niveles = [];
  try {
    niveles = _nivelesCache.length ? _nivelesCache : await cargarNivelesFidelidad();
  } catch(e){ niveles = []; }
  const cardFidelidad = document.getElementById('perfil-fidelidad-card');
  if(!niveles.length){
    // Tabla vacía o error — mostrar igualmente la tarjeta básica
    if(cardFidelidad) cardFidelidad.style.display = 'block';
    const bg = document.getElementById('perfil-fidelidad-bg');
    if(bg) bg.style.background = 'linear-gradient(135deg, #2a2a2a, #1a1a1a)';
    const elNombre = document.getElementById('perfil-nivel-nombre');
    if(elNombre) elNombre.textContent = 'MIEMBRO';
    const elEmoji = document.getElementById('perfil-nivel-emoji');
    if(elEmoji) elEmoji.textContent = '⭐';
    const elTitular = document.getElementById('perfil-nivel-titular');
    if(elTitular) elTitular.textContent = datos.nombre || datos.correo.split('@')[0];
    const elCompras = document.getElementById('perfil-nivel-compras');
    if(elCompras) elCompras.textContent = datos.compras || 0;
    const elSiguiente = document.getElementById('perfil-nivel-siguiente');
    if(elSiguiente) elSiguiente.textContent = 'Sigue comprando para subir de nivel 🚀';
    const elBarra = document.getElementById('perfil-nivel-barra');
    if(elBarra) elBarra.style.width = '0%';
    const elBeneficios = document.getElementById('perfil-nivel-beneficios');
    if(elBeneficios) elBeneficios.innerHTML = '<span style="color:var(--gray)">¡Gracias por ser parte de SARUX!</span>';
    return;
  }

  const compras = datos.compras || 0;
  const montoTotal = datos.monto_total || 0;

  // Valor de progreso de cada nivel: si es tipo 'monto' se compara el gasto acumulado, si no, el número de compras
  const valorNivel = (n) => n.tipo_requisito === 'monto' ? n.min_monto : n.min_compras;
  const valorCliente = (n) => n.tipo_requisito === 'monto' ? montoTotal : compras;

  // Encontrar nivel actual y siguiente
  let nivelActual = null;
  let nivelSiguiente = null;
  for(let i = 0; i < niveles.length; i++){
    if(valorCliente(niveles[i]) >= valorNivel(niveles[i])){
      nivelActual = niveles[i];
      nivelSiguiente = niveles[i+1] || null;
    }
  }

  if(!nivelActual){
    // Aún no tiene ningún nivel — mostrar cuánto falta para el primero
    const primero = niveles[0];
    const metaP = valorNivel(primero);
    const valP  = valorCliente(primero);
    const cardEl = document.getElementById('perfil-fidelidad-card');
    if(cardEl) cardEl.style.display = 'block';
    document.getElementById('perfil-fidelidad-bg').style.background = 'linear-gradient(135deg, #2a2a2a, #1a1a1a)';
    document.getElementById('perfil-nivel-nombre').textContent = 'SIN NIVEL';
    document.getElementById('perfil-nivel-emoji').textContent = '🎯';
    document.getElementById('perfil-nivel-titular').textContent = datos.nombre || datos.correo.split('@')[0];
    document.getElementById('perfil-nivel-compras').textContent = compras;
    document.getElementById('perfil-nivel-siguiente').textContent = primero.tipo_requisito === 'monto'
      ? `Gasta $${(metaP - valP).toFixed(0)} más para ${primero.emoji} ${primero.nombre}`
      : `${metaP - valP} compras para ${primero.emoji} ${primero.nombre}`;
    document.getElementById('perfil-nivel-barra').style.width = (valP / metaP * 100) + '%';
    document.getElementById('perfil-nivel-beneficios').innerHTML = `<span style="color:var(--gray)">Realiza tu primera compra y desbloquea beneficios exclusivos 🚀</span>`;
    try{ renderRoadmapFidelidad(niveles, nivelActual); }catch(e){}
    return;
  }

  // Calcular progreso al siguiente nivel
  let progreso = 100;
  let siguienteTexto = '¡Nivel máximo alcanzado! 🏆';
  if(nivelSiguiente){
    const base = valorNivel(nivelActual);
    const meta = valorNivel(nivelSiguiente);
    const val  = valorCliente(nivelSiguiente);
    progreso = Math.min(((val - base) / (meta - base)) * 100, 100);
    const faltan = meta - val;
    siguienteTexto = nivelSiguiente.tipo_requisito === 'monto'
      ? `Gasta $${faltan.toFixed(0)} más para ${nivelSiguiente.emoji} ${nivelSiguiente.nombre}`
      : `${faltan} compra${faltan!==1?'s':''} para ${nivelSiguiente.emoji} ${nivelSiguiente.nombre}`;
  }

  // Colores por nivel
  const gradientes = {
    '#cd7f32': 'linear-gradient(135deg, #8B4513, #cd7f32)',
    '#a8a9ad': 'linear-gradient(135deg, #666, #a8a9ad)',
    '#ffd700': 'linear-gradient(135deg, #b8860b, #ffd700)',
    '#b9f2ff': 'linear-gradient(135deg, #006994, #00bcd4)'
  };

  const card = document.getElementById('perfil-fidelidad-card');
  if(card) card.style.display = 'block';
  document.getElementById('perfil-fidelidad-bg').style.background =
    gradientes[nivelActual.color] || `linear-gradient(135deg, ${nivelActual.color}88, ${nivelActual.color})`;
  document.getElementById('perfil-nivel-nombre').textContent = nivelActual.nombre.toUpperCase();
  document.getElementById('perfil-nivel-emoji').textContent = nivelActual.emoji;
  document.getElementById('perfil-nivel-titular').textContent = datos.nombre || datos.correo.split('@')[0];
  document.getElementById('perfil-nivel-compras').textContent = compras;
  document.getElementById('perfil-nivel-siguiente').textContent = siguienteTexto;
  document.getElementById('perfil-nivel-barra').style.width = progreso + '%';

  // Beneficios
  const beneficios = Array.isArray(nivelActual.beneficios) ? nivelActual.beneficios : JSON.parse(nivelActual.beneficios || '[]');
  document.getElementById('perfil-nivel-beneficios').innerHTML =
    beneficios.map(b => {
      const texto = typeof b === 'string' ? b : b.texto;
      const img   = typeof b === 'object' && b.imagen ? `<img src="${b.imagen}" style="width:100%;max-height:120px;object-fit:cover;border-radius:3px;margin:.3rem 0">` : '';
      return `<div style="padding:.3rem 0;border-bottom:1px solid rgba(255,255,255,.06)">✅ ${texto}${img}</div>`;
    }).join('');

  try{ renderRoadmapFidelidad(niveles, nivelActual); }catch(e){}
}

// ── Términos y condiciones de la tarjeta de fidelidad ─────────
function abrirTerminosFidelidad(){
  const texto = (typeof APP_DATA!=='undefined' && APP_DATA.FIDELIDAD_TERMINOS) || DEFAULTS.FIDELIDAD_TERMINOS || 'No hay términos y condiciones disponibles por el momento.';
  const el = document.getElementById('terminosFidelidadTexto');
  if(el) el.textContent = texto;
  const overlay = document.getElementById('terminosFidelidadOverlay');
  if(overlay) overlay.style.display = 'flex';
}
window.abrirTerminosFidelidad = abrirTerminosFidelidad;

function cerrarTerminosFidelidad(){
  const overlay = document.getElementById('terminosFidelidadOverlay');
  if(overlay) overlay.style.display = 'none';
}
window.cerrarTerminosFidelidad = cerrarTerminosFidelidad;

// ── Solicitar tarjeta física de fidelidad por WhatsApp ─────────
function solicitarTarjetaFisica(){
  const precio = (typeof APP_DATA!=="undefined" && APP_DATA.FIDELIDAD_PRECIO) || DEFAULTS.FIDELIDAD_PRECIO || 30;
  const perfil = _perfilActual;
  if(!perfil){
    const msg = "Hola! Solicito mi tarjeta de fidelidad SARUX \n\nPrecio de la tarjeta: $" + precio + " MXN";
    abrirEnlaceExterno("https://wa.me/"+NEGOCIO.whatsapp+"?text="+encodeURIComponent(msg));
    return;
  }
  const nombre = perfil.nombre || perfil.correo.split("@")[0];
  const idCliente = perfil.uid_sarux || "-";
  const msg = "Hola! Solicito mi tarjeta de fidelidad SARUX \n\nNombre: " + nombre + "\nID de cliente: " + idCliente + "\n\nPrecio de la tarjeta: $" + precio + " MXN";
  abrirEnlaceExterno("https://wa.me/"+NEGOCIO.whatsapp+"?text="+encodeURIComponent(msg));
}
window.solicitarTarjetaFisica = solicitarTarjetaFisica;

// ── Ruta completa de niveles (todos los premios, desbloqueados y por desbloquear) ──
function renderRoadmapFidelidad(niveles, nivelActual){
  const cont = document.getElementById('perfil-niveles-roadmap');
  if(!cont) return;
  const idxActual = nivelActual ? niveles.findIndex(n => n.id === nivelActual.id) : -1;

  cont.innerHTML = niveles.map((n, i) => {
    const desbloqueado = i <= idxActual;
    const esActual = i === idxActual;
    const beneficios = Array.isArray(n.beneficios) ? n.beneficios : JSON.parse(n.beneficios || '[]');
    const requisito = n.tipo_requisito === 'monto' ? `Desde $${n.min_monto}` : `Desde ${n.min_compras} compra${n.min_compras!==1?'s':''}`;
    const benefHtml = beneficios.map(b => {
      const texto = typeof b === 'string' ? b : b.texto;
      return `<div style="padding:.2rem 0">${desbloqueado ? '✅' : '🔒'} ${texto}</div>`;
    }).join('');

    return `<div style="background:${esActual ? 'rgba(255,255,255,.05)' : 'var(--bg)'};border:1px solid ${esActual ? n.color : 'rgba(255,255,255,.08)'};border-radius:4px;padding:.8rem;margin-bottom:.6rem;opacity:${desbloqueado ? '1' : '.55'}">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:.3rem">
        <div style="font-family:var(--font-display);font-size:.95rem;letter-spacing:2px;color:${desbloqueado ? n.color : 'var(--gray)'}">${n.emoji} ${n.nombre.toUpperCase()}</div>
        ${esActual ? '<span style="font-family:var(--font-mono);font-size:.45rem;letter-spacing:1px;color:var(--neon)">★ TU NIVEL</span>' : ''}
      </div>
      <div style="font-family:var(--font-mono);font-size:.55rem;color:var(--gray);margin-bottom:.4rem">${requisito}</div>
      <div style="font-family:var(--font-mono);font-size:.65rem;color:var(--white);line-height:1.6">${benefHtml}</div>
    </div>`;
  }).join('');
}




// ── Botones de fidelidad: listeners robustos para móvil y PWA ───
function _bindBotonFidelidad(id, fn){
  var btn = document.getElementById(id);
  if(!btn) return;
  var _ultimoToque = 0;
  function _ejecutar(e){
    var ahora = Date.now();
    if(ahora - _ultimoToque < 500) return; // evita doble-disparo touch+click
    _ultimoToque = ahora;
    fn();
  }
  btn.addEventListener('touchend', _ejecutar, {passive:true});
  btn.addEventListener('click', _ejecutar);
}

document.addEventListener('DOMContentLoaded', function(){
  _bindBotonFidelidad('btn-terminos-fidelidad', function(){ abrirTerminosFidelidad(); });
  _bindBotonFidelidad('btn-solicitar-tarjeta', function(){ solicitarTarjetaFisica(); });
});
