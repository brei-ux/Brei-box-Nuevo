// ============================================================
// BREI-BOX — js/carrito.js
// Sistema de carrito de compra
//
// Uso: añadir <script src="../js/carrito.js"></script>
// justo antes de </body> en index.html, Pagina-Producto.html
// y CreditCard.html. El script inyecta automáticamente el
// icono y el panel desplegable en el <header> existente.
// ============================================================

(function () {
    'use strict';

    // ── CLAVE DE ALMACENAMIENTO ──────────────────────────────
    var STORAGE_KEY = 'breibox_carrito';

    // ── LEER / ESCRIBIR CARRITO (localStorage) ───────────────

    function leerCarrito() {
        try {
            return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
        } catch (e) {
            return [];
        }
    }

    function guardarCarrito(items) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    }

    // ── API PÚBLICA (usada por producto.js) ──────────────────

    window.BreiBoxCarrito = {

        /** Añade un producto o incrementa su cantidad si ya existe */
        añadir: function (producto) {
            var items = leerCarrito();
            var existente = items.find(function (i) { return i.id === producto.id; });
            if (existente) {
                existente.cantidad += 1;
            } else {
                items.push({
                    id:       producto.id,
                    nombre:   producto.nombre,
                    precio:   producto.precio,
                    imagen:   producto.imagen,
                    cantidad: 1
                });
            }
            guardarCarrito(items);
            renderizar();
            abrirPanel();
            mostrarToast(producto.nombre);
        },

        /** Elimina un producto por su id */
        eliminar: function (id) {
            var items = leerCarrito().filter(function (i) { return i.id !== id; });
            guardarCarrito(items);
            renderizar();
        },

        /** Cambia la cantidad de un producto (mínimo 1) */
        cambiarCantidad: function (id, delta) {
            var items = leerCarrito();
            var item  = items.find(function (i) { return i.id === id; });
            if (!item) return;
            item.cantidad = Math.max(1, item.cantidad + delta);
            guardarCarrito(items);
            renderizar();
        },

        /** Vacía el carrito */
        vaciar: function () {
            guardarCarrito([]);
            renderizar();
        }
    };

    // ── INYECTAR HTML EN EL HEADER ───────────────────────────

    function inyectarHeader() {
        var header = document.querySelector('header');
        if (!header) return;

        // Botón del carrito
        var btn = document.createElement('button');
        btn.id            = 'carrito-btn';
        btn.className     = 'carrito-btn';
        btn.setAttribute('aria-label', 'Carrito de compra');
        btn.setAttribute('aria-expanded', 'false');
        btn.innerHTML =
            '<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' +
                '<path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>' +
                '<line x1="3" y1="6" x2="21" y2="6"/>' +
                '<path d="M16 10a4 4 0 0 1-8 0"/>' +
            '</svg>' +
            '<span id="carrito-badge" class="carrito-badge" aria-hidden="true">0</span>';

        header.appendChild(btn);

        // Panel desplegable
        var panel = document.createElement('div');
        panel.id        = 'carrito-panel';
        panel.className = 'carrito-panel';
        panel.setAttribute('role', 'dialog');
        panel.setAttribute('aria-label', 'Carrito de compra');
        panel.innerHTML =
            '<div class="carrito-panel-header">' +
                '<h2 class="carrito-panel-titulo">' +
                    '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' +
                        '<path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>' +
                        '<line x1="3" y1="6" x2="21" y2="6"/>' +
                        '<path d="M16 10a4 4 0 0 1-8 0"/>' +
                    '</svg>' +
                    'Mi carrito' +
                '</h2>' +
                '<button id="carrito-cerrar" class="carrito-cerrar" aria-label="Cerrar carrito">' +
                    '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round">' +
                        '<line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>' +
                    '</svg>' +
                '</button>' +
            '</div>' +
            '<div id="carrito-lista" class="carrito-lista"></div>' +
            '<div id="carrito-vacio" class="carrito-vacio">' +
                '<svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="#cbd5e1" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">' +
                    '<path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>' +
                    '<line x1="3" y1="6" x2="21" y2="6"/>' +
                    '<path d="M16 10a4 4 0 0 1-8 0"/>' +
                '</svg>' +
                '<p>Tu carrito está vacío</p>' +
                '<span>Añade productos desde el catálogo</span>' +
            '</div>' +
            '<div id="carrito-footer" class="carrito-footer">' +
                '<div class="carrito-total-row">' +
                    '<span class="carrito-total-label">Total</span>' +
                    '<span id="carrito-total" class="carrito-total-precio">0,00 €</span>' +
                '</div>' +
                '<a id="carrito-pagar-btn" href="CreditCard.html" class="carrito-pagar-btn">' +
                    '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round">' +
                        '<rect x="2" y="5" width="20" height="14" rx="2"/>' +
                        '<path d="M2 10h20"/>' +
                    '</svg>' +
                    'Proceder al pago' +
                '</a>' +
                '<button class="carrito-vaciar-btn" onclick="BreiBoxCarrito.vaciar()">' +
                    'Vaciar carrito' +
                '</button>' +
            '</div>';

        document.body.appendChild(panel);

        // Overlay para cerrar al hacer clic fuera
        var overlay = document.createElement('div');
        overlay.id        = 'carrito-overlay';
        overlay.className = 'carrito-overlay';
        document.body.appendChild(overlay);

        // Toast de confirmación
        var toast = document.createElement('div');
        toast.id        = 'carrito-toast';
        toast.className = 'carrito-toast';
        document.body.appendChild(toast);

        // ── Eventos ──────────────────────────────────────────
        btn.addEventListener('click', togglePanel);
        document.getElementById('carrito-cerrar').addEventListener('click', cerrarPanel);
        overlay.addEventListener('click', cerrarPanel);

        // Cerrar con Escape
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape') cerrarPanel();
        });
    }

    // ── ABRIR / CERRAR PANEL ─────────────────────────────────

    function abrirPanel() {
        var panel   = document.getElementById('carrito-panel');
        var overlay = document.getElementById('carrito-overlay');
        var btn     = document.getElementById('carrito-btn');
        if (!panel) return;
        panel.classList.add('abierto');
        overlay.classList.add('visible');
        btn.setAttribute('aria-expanded', 'true');
        document.body.style.overflow = 'hidden';
    }

    function cerrarPanel() {
        var panel   = document.getElementById('carrito-panel');
        var overlay = document.getElementById('carrito-overlay');
        var btn     = document.getElementById('carrito-btn');
        if (!panel) return;
        panel.classList.remove('abierto');
        overlay.classList.remove('visible');
        btn.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
    }

    function togglePanel() {
        var panel = document.getElementById('carrito-panel');
        if (!panel) return;
        if (panel.classList.contains('abierto')) {
            cerrarPanel();
        } else {
            abrirPanel();
        }
    }

    // ── RENDERIZAR CONTENIDO DEL PANEL ───────────────────────

    function formatearPrecio(precio) {
        return precio.toLocaleString('es-ES', {
            style: 'currency',
            currency: 'EUR',
            minimumFractionDigits: 2
        });
    }

    function renderizar() {
        var items  = leerCarrito();
        var badge  = document.getElementById('carrito-badge');
        var lista  = document.getElementById('carrito-lista');
        var vacio  = document.getElementById('carrito-vacio');
        var footer = document.getElementById('carrito-footer');
        var total  = document.getElementById('carrito-total');
        var pagarBtn = document.getElementById('carrito-pagar-btn');

        if (!badge || !lista) return;

        // Badge: suma de cantidades
        var totalItems = items.reduce(function (acc, i) { return acc + i.cantidad; }, 0);
        badge.textContent = totalItems;
        badge.classList.toggle('visible', totalItems > 0);

        // Estado vacío
        var hayItems = items.length > 0;
        lista.style.display  = hayItems ? 'block' : 'none';
        vacio.style.display  = hayItems ? 'none'  : 'flex';
        footer.style.display = hayItems ? 'flex'  : 'none';

        if (!hayItems) return;

        // Generar items
        lista.innerHTML = items.map(function (item) {
            return (
                '<div class="carrito-item" data-id="' + item.id + '">' +
                    '<img class="carrito-item-img" src="' + item.imagen + '" alt="' + item.nombre + '" onerror="this.style.display=\'none\'">' +
                    '<div class="carrito-item-info">' +
                        '<p class="carrito-item-nombre">' + item.nombre + '</p>' +
                        '<p class="carrito-item-precio">' + formatearPrecio(item.precio) + '</p>' +
                        '<div class="carrito-item-controles">' +
                            '<button class="qty-btn" onclick="BreiBoxCarrito.cambiarCantidad(\'' + item.id + '\', -1)" aria-label="Restar uno">−</button>' +
                            '<span class="qty-valor">' + item.cantidad + '</span>' +
                            '<button class="qty-btn" onclick="BreiBoxCarrito.cambiarCantidad(\'' + item.id + '\', 1)" aria-label="Sumar uno">+</button>' +
                        '</div>' +
                    '</div>' +
                    '<button class="carrito-item-eliminar" onclick="BreiBoxCarrito.eliminar(\'' + item.id + '\')" aria-label="Eliminar ' + item.nombre + '">' +
                        '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round">' +
                            '<line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>' +
                        '</svg>' +
                    '</button>' +
                '</div>'
            );
        }).join('');

        // Total
        var suma = items.reduce(function (acc, i) { return acc + (i.precio * i.cantidad); }, 0);
        total.textContent = formatearPrecio(suma);

        // Ajustar ruta del botón de pago según la página actual
        var estaEnHtml = window.location.pathname.indexOf('/html/') !== -1;
        pagarBtn.href  = estaEnHtml ? 'CreditCard.html' : 'html/CreditCard.html';
    }

    // ── TOAST DE CONFIRMACIÓN ────────────────────────────────

    function mostrarToast(nombreProducto) {
        var toast = document.getElementById('carrito-toast');
        if (!toast) return;
        var nombre = nombreProducto.length > 30
            ? nombreProducto.substring(0, 30) + '…'
            : nombreProducto;
        toast.innerHTML =
            '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">' +
                '<polyline points="20 6 9 17 4 12"/>' +
            '</svg>' +
            '<span><strong>' + nombre + '</strong> añadido al carrito</span>';
        toast.classList.add('visible');
        clearTimeout(toast._timer);
        toast._timer = setTimeout(function () {
            toast.classList.remove('visible');
        }, 2800);
    }

    // ── INICIALIZACIÓN ───────────────────────────────────────

    document.addEventListener('DOMContentLoaded', function () {
        inyectarHeader();
        renderizar();
    });

})();