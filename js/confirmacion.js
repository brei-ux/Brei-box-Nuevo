// ============================================================
// BREI-BOX — js/confirmacion.js
// Lee el carrito y los datos de envío de localStorage y
// renderiza el resumen completo del pedido.
// ============================================================

document.addEventListener('DOMContentLoaded', function () {

    var contenedor = document.getElementById('confirm-contenido');
    if (!contenedor) return;

    // ── Leer datos ────────────────────────────────────────────

    var carrito   = leerJSON('breibox_carrito') || [];
    var envio     = leerJSON('breibox_envio')   || null;

    // Si no hay datos de envío: alguien llegó directamente a esta página
    if (!envio && carrito.length === 0) {
        contenedor.innerHTML = vistaSinDatos();
        return;
    }

    // ── Calcular totales ──────────────────────────────────────

    var subtotal    = carrito.reduce(function (s, i) { return s + i.precio * i.cantidad; }, 0);
    var costoEnvio  = (envio && envio.precioEnvio === '9,99 €') ? 9.99 : 0;
    var total       = subtotal + costoEnvio;

    // ── Renderizar ────────────────────────────────────────────

    contenedor.innerHTML =
        heroHTML(envio) +
        '<div class="confirm-grid">' +
            productosHTML(carrito, subtotal, costoEnvio, total) +
            envioHTML(envio) +
        '</div>' +
        accionesHTML();

    // ── Limpiar localStorage después de mostrar ───────────────
    // (lo hacemos con un pequeño delay para que el render sea visible)
    setTimeout(function () {
        try {
            localStorage.removeItem('breibox_envio');
            localStorage.removeItem('breibox_carrito');
        } catch (e) { /* silencioso */ }
    }, 500);
});


// ── Helpers de lectura ────────────────────────────────────────

function leerJSON(clave) {
    try {
        return JSON.parse(localStorage.getItem(clave));
    } catch (e) {
        return null;
    }
}

function formatearPrecio(n) {
    return n.toLocaleString('es-ES', {
        style: 'currency', currency: 'EUR', minimumFractionDigits: 2
    });
}


// ── Bloques HTML ──────────────────────────────────────────────

function heroHTML(envio) {
    var numeroPedido = envio ? envio.numeroPedido : 'BB-' + Date.now().toString(36).toUpperCase();
    return (
        '<div class="confirm-hero">' +
            '<div class="confirm-check">' +
                '<svg width="44" height="44" viewBox="0 0 24 24" fill="none">' +
                    '<polyline points="20 6 9 17 4 12" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>' +
                '</svg>' +
            '</div>' +
            '<h1 class="confirm-titulo">¡Pedido completado!</h1>' +
            '<p class="confirm-subtitulo">' +
                'Gracias por tu compra. Hemos recibido tu pedido y lo procesaremos lo antes posible.<br>' +
                'Recibirás un email de confirmación con el seguimiento de tu envío.' +
            '</p>' +
            '<span class="confirm-numero">' +
                '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>' +
                'Nº de pedido: <strong>' + numeroPedido + '</strong>' +
            '</span>' +
        '</div>'
    );
}

function productosHTML(carrito, subtotal, costoEnvio, total) {
    if (carrito.length === 0) {
        return (
            '<div class="confirm-card confirm-card-full">' +
                '<div class="confirm-card-title">' +
                    iconoSVG('box') + 'Productos adquiridos' +
                '</div>' +
                '<p style="color:#94a3b8;text-align:center;padding:20px 0;">No hay productos en este pedido.</p>' +
            '</div>'
        );
    }

    var itemsHTML = carrito.map(function (item) {
        return (
            '<div class="producto-confirm-item">' +
                '<img class="producto-confirm-img" src="' + item.imagen + '" alt="' + item.nombre + '" onerror="this.style.display=\'none\'">' +
                '<div class="producto-confirm-info">' +
                    '<p class="producto-confirm-nombre">' + item.nombre + '</p>' +
                    '<span class="producto-confirm-cantidad">Cantidad: ' + item.cantidad + '</span>' +
                '</div>' +
                '<div class="producto-confirm-precio">' +
                    formatearPrecio(item.precio * item.cantidad) +
                '</div>' +
            '</div>'
        );
    }).join('');

    var envioFila = costoEnvio > 0
        ? '<div style="display:flex;justify-content:space-between;font-size:.875rem;color:#64748b;padding:8px 0;">' +
              '<span>Gastos de envío</span><span>' + formatearPrecio(costoEnvio) + '</span>' +
          '</div>'
        : '<div style="display:flex;justify-content:space-between;font-size:.875rem;color:#16a34a;padding:8px 0;">' +
              '<span>Gastos de envío</span><span style="font-weight:600;">Gratis</span>' +
          '</div>';

    return (
        '<div class="confirm-card confirm-card-full">' +
            '<div class="confirm-card-title">' +
                iconoSVG('box') + 'Productos adquiridos' +
            '</div>' +
            itemsHTML +
            envioFila +
            '<div class="total-row">' +
                '<span class="total-row-label">Total pagado</span>' +
                '<span class="total-row-precio">' + formatearPrecio(total) + '</span>' +
            '</div>' +
        '</div>'
    );
}

function envioHTML(envio) {
    if (!envio) {
        return (
            '<div class="confirm-card">' +
                '<div class="confirm-card-title">' + iconoSVG('pin') + 'Datos de envío</div>' +
                '<p style="color:#94a3b8;">No se encontraron datos de envío.</p>' +
            '</div>'
        );
    }

    var linea1 = envio.direccion + ', ' + envio.postal;
    var linea2 = envio.ciudad + ', ' + envio.provincia;

    var notasHTML = envio.notas
        ? '<div class="envio-dato">' +
              '<div class="envio-dato-icono">' + iconoSVG('nota') + '</div>' +
              '<div class="envio-dato-contenido">' +
                  '<div class="envio-dato-label">Instrucciones</div>' +
                  '<div class="envio-dato-valor">' + envio.notas + '</div>' +
              '</div>' +
          '</div>'
        : '';

    return (
        '<div class="confirm-card">' +
            '<div class="confirm-card-title">' + iconoSVG('pin') + 'Datos de envío</div>' +

            dato('persona', 'Destinatario',  envio.nombre) +
            datoMultilinea('home', 'Dirección', linea1, linea2 + ', ' + envio.pais) +
            dato('phone', 'Teléfono', envio.telefono) +
            datoMetodo(envio) +
            notasHTML +

        '</div>'
    );
}

function accionesHTML() {
    return (
        '<div class="confirm-actions">' +
            '<a href="index.html" class="btn-volver-tienda">' +
                '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">' +
                    '<path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>' +
                    '<polyline points="9 22 9 12 15 12 15 22"/>' +
                '</svg>' +
                'Volver a la tienda' +
            '</a>' +
        '</div>'
    );
}


// ── Sub-helpers de renderizado ────────────────────────────────

function dato(icono, label, valor) {
    return (
        '<div class="envio-dato">' +
            '<div class="envio-dato-icono">' + iconoSVG(icono) + '</div>' +
            '<div class="envio-dato-contenido">' +
                '<div class="envio-dato-label">' + label + '</div>' +
                '<div class="envio-dato-valor">' + valor + '</div>' +
            '</div>' +
        '</div>'
    );
}

function datoMultilinea(icono, label, linea1, linea2) {
    return (
        '<div class="envio-dato">' +
            '<div class="envio-dato-icono">' + iconoSVG(icono) + '</div>' +
            '<div class="envio-dato-contenido">' +
                '<div class="envio-dato-label">' + label + '</div>' +
                '<div class="envio-dato-valor">' + linea1 + '<br>' + linea2 + '</div>' +
            '</div>' +
        '</div>'
    );
}

function datoMetodo(envio) {
    return (
        '<div class="envio-dato">' +
            '<div class="envio-dato-icono">' + iconoSVG('truck') + '</div>' +
            '<div class="envio-dato-contenido">' +
                '<div class="envio-dato-label">Método de envío</div>' +
                '<div class="envio-dato-valor">' + envio.metodo + '</div>' +
                '<div class="metodo-badge">' +
                    '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>' +
                    envio.plazo + ' · ' + envio.precioEnvio +
                '</div>' +
            '</div>' +
        '</div>'
    );
}

function vistaSinDatos() {
    return (
        '<div class="confirm-vacio">' +
            '<svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#cbd5e1" stroke-width="1.5"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>' +
            '<p>No hay ningún pedido que mostrar.</p>' +
            '<a href="index.html" class="btn-volver-tienda">Ir a la tienda</a>' +
        '</div>'
    );
}

// Iconos SVG reutilizables
function iconoSVG(tipo) {
    var iconos = {
        box:     '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>',
        pin:     '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>',
        persona: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="8" r="4"/><path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"/></svg>',
        home:    '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>',
        phone:   '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.41 2 2 0 0 1 3.61 1.24h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 8.96a16 16 0 0 0 6.13 6.13l.96-.96a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 21.92 16.92z"/></svg>',
        truck:   '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>',
        nota:    '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>'
    };
    return iconos[tipo] || '';
}
