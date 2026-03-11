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

        // Pago validado → ir a la página de dirección de envío
        window.location.href = 'Envio.html';
    });
});