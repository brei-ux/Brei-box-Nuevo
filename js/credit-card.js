// ============================================================
// BREI-BOX — js/credit-card.js
// Formulario de tarjeta de crédito con preview interactivo
// ============================================================

document.addEventListener('DOMContentLoaded', function () {

    // ── Elementos del formulario ─────────────────────────────
    var cardNumberInput = document.getElementById('cardNumber');
    var cardHolderInput = document.getElementById('cardHolder');
    var cardExpiryInput = document.getElementById('cardExpiry');
    var cardCVVInput    = document.getElementById('cardCVV');
    var paymentForm     = document.getElementById('paymentForm');

    // ── Elementos de la vista previa de la tarjeta ───────────
    var displayCardNumber = document.getElementById('displayCardNumber');
    var displayCardHolder = document.getElementById('displayCardHolder');
    var displayCardExpiry = document.getElementById('displayCardExpiry');

    // Comprobación de seguridad: si algún elemento no existe, salir
    if (!cardNumberInput || !cardHolderInput || !cardExpiryInput || !cardCVVInput) {
        console.warn('credit-card.js: no se encontraron los campos del formulario.');
        return;
    }
    if (!displayCardNumber || !displayCardHolder || !displayCardExpiry) {
        console.warn('credit-card.js: no se encontraron los elementos de la vista previa.');
        return;
    }

    // ── NÚMERO DE TARJETA ────────────────────────────────────

    cardNumberInput.addEventListener('input', function () {
        var raw       = this.value.replace(/\D/g, '').substring(0, 16);
        var formatted = raw.match(/.{1,4}/g) ? raw.match(/.{1,4}/g).join(' ') : raw;
        this.value    = formatted;

        if (raw.length === 0) {
            displayCardNumber.textContent = '•••• •••• •••• ••••';
        } else {
            // Rellena los dígitos restantes con puntos
            var padded = formatted;
            var missing = 19 - formatted.length;
            if (missing > 0) {
                padded += '•'.repeat(missing);
            }
            displayCardNumber.textContent = padded;
        }
    });

    cardNumberInput.addEventListener('keypress', function (e) {
        if (!/[0-9]/.test(e.key)) e.preventDefault();
    });


    // ── NOMBRE DEL TITULAR ───────────────────────────────────

    cardHolderInput.addEventListener('input', function () {
        var val = this.value.toUpperCase().trim();
        displayCardHolder.textContent = val.length > 0 ? val : 'NOMBRE APELLIDOS';
    });

    // Actualizar también al salir del campo (por si el usuario pegó texto con Ctrl+V)
    cardHolderInput.addEventListener('change', function () {
        var val = this.value.toUpperCase().trim();
        displayCardHolder.textContent = val.length > 0 ? val : 'NOMBRE APELLIDOS';
    });

    cardHolderInput.addEventListener('keypress', function (e) {
        if (!/[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s]/.test(e.key)) e.preventDefault();
    });


    // ── FECHA DE EXPIRACIÓN ──────────────────────────────────

    cardExpiryInput.addEventListener('input', function () {
        var raw = this.value.replace(/\D/g, '').substring(0, 4);
        var formatted = raw.length >= 3 ? raw.substring(0, 2) + '/' + raw.substring(2) : raw;
        this.value = formatted;
        displayCardExpiry.textContent = formatted.length > 0 ? formatted : 'MM/AA';
    });

    cardExpiryInput.addEventListener('change', function () {
        var val = this.value;
        displayCardExpiry.textContent = val.length > 0 ? val : 'MM/AA';
    });

    cardExpiryInput.addEventListener('blur', function () {
        var val = this.value;
        if (val.length === 5) {
            var month = parseInt(val.substring(0, 2), 10);
            if (month < 1 || month > 12) {
                alert('Mes inválido. Debe estar entre 01 y 12.');
                this.value = '';
                displayCardExpiry.textContent = 'MM/AA';
            }
        }
    });


    // ── CVV ──────────────────────────────────────────────────

    cardCVVInput.addEventListener('input', function () {
        this.value = this.value.replace(/\D/g, '').substring(0, 3);
    });

    cardCVVInput.addEventListener('keypress', function (e) {
        if (!/[0-9]/.test(e.key)) e.preventDefault();
    });


    // ── ENVÍO DEL FORMULARIO ─────────────────────────────────

    paymentForm.addEventListener('submit', function (e) {
        e.preventDefault();

        var cardNumber = cardNumberInput.value.replace(/\s/g, '');
        var cardHolder = cardHolderInput.value.trim();
        var cardExpiry = cardExpiryInput.value;
        var cardCVV    = cardCVVInput.value;
        var terms      = document.getElementById('termsAccept');

        if (cardNumber.length < 13) {
            alert('Por favor, introduce un número de tarjeta válido (mínimo 13 dígitos).');
            cardNumberInput.focus();
            return;
        }
        if (cardHolder.length < 3) {
            alert('Por favor, introduce el nombre del titular.');
            cardHolderInput.focus();
            return;
        }
        if (cardExpiry.length !== 5 || !cardExpiry.includes('/')) {
            alert('Fecha de expiración inválida. Formato: MM/AA');
            cardExpiryInput.focus();
            return;
        }
        if (cardCVV.length < 3) {
            alert('CVV inválido. Debe tener 3 dígitos.');
            cardCVVInput.focus();
            return;
        }
        if (terms && !terms.checked) {
            alert('Debes aceptar los términos y condiciones.');
            return;
        }

        mostrarExito();
    });


    // ── MODAL DE ÉXITO ───────────────────────────────────────

    function mostrarExito() {
        var overlay = document.createElement('div');
        overlay.style.cssText = [
            'position:fixed', 'inset:0',
            'background:rgba(0,0,0,.55)',
            'display:flex', 'align-items:center', 'justify-content:center',
            'z-index:9999', 'animation:ccFadeIn .3s ease'
        ].join(';');

        var card = document.createElement('div');
        card.style.cssText = [
            'background:#fff', 'padding:48px 40px',
            'border-radius:20px', 'text-align:center',
            'max-width:400px', 'width:90%',
            'box-shadow:0 20px 40px rgba(0,0,0,.15)',
            'animation:ccScaleIn .3s ease'
        ].join(';');

        card.innerHTML =
            '<svg width="72" height="72" viewBox="0 0 24 24" fill="none" style="margin:0 auto 20px;">' +
                '<circle cx="12" cy="12" r="10" fill="#10b981"/>' +
                '<path d="M8 12l2 2 4-4" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>' +
            '</svg>' +
            '<h2 style="color:#1e293b;margin:0 0 10px;font-size:1.5rem;font-weight:700;">¡Pago realizado!</h2>' +
            '<p style="color:#64748b;margin:0 0 28px;line-height:1.5;">Tu pedido ha sido procesado correctamente.<br>Recibirás un email de confirmación.</p>' +
            '<button onclick="window.location.href=\'index.html\'" style="' +
                'background:#2563eb;color:#fff;border:none;' +
                'padding:13px 32px;border-radius:10px;' +
                'font-size:1rem;font-weight:600;cursor:pointer;' +
                'transition:background .2s' +
            '">Volver a la tienda</button>';

        overlay.appendChild(card);
        document.body.appendChild(overlay);

        var style = document.createElement('style');
        style.textContent =
            '@keyframes ccFadeIn  { from{opacity:0} to{opacity:1} }' +
            '@keyframes ccScaleIn { from{transform:scale(.9);opacity:0} to{transform:scale(1);opacity:1} }';
        document.head.appendChild(style);
    }
});