// ============================================================
// BREI-BOX — js/envio.js
// Maneja el formulario de dirección de envío:
//   1. Recoge los datos del formulario
//   2. Los guarda en localStorage como 'breibox_envio'
//   3. Redirige a Confirmacion.html
// ============================================================

document.addEventListener('DOMContentLoaded', function () {

    var form = document.getElementById('shippingForm');
    if (!form) return;

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        // ── Leer campos del formulario ────────────────────────
        var nombre    = document.getElementById('shipName').value.trim();
        var direccion = document.getElementById('shipAddress').value.trim();
        var postal    = document.getElementById('shipPostal').value.trim();
        var ciudad    = document.getElementById('shipCity').value.trim();
        var provincia = document.getElementById('shipProvince').value.trim();
        var pais      = document.getElementById('shipCountry').value;
        var telefono  = document.getElementById('shipPhone').value.trim();
        var notas     = document.getElementById('shipNotes').value.trim();

        // ── Método de envío seleccionado ──────────────────────
        var metodoRadio = form.querySelector('input[name="shipMethod"]:checked');
        var metodoValor = metodoRadio ? metodoRadio.value : 'standard';

        var metodoInfo = {
            standard: { metodo: 'Envío estándar',    plazo: '3–5 días laborables', precioEnvio: 'Gratis' },
            express:  { metodo: 'Envío express',      plazo: '1–2 días laborables', precioEnvio: '9,99 €' },
            pickup:   { metodo: 'Recogida en tienda', plazo: 'Disponible en 24 h',  precioEnvio: 'Gratis' }
        };
        var envioSeleccionado = metodoInfo[metodoValor] || metodoInfo['standard'];

        // ── Generar número de pedido ──────────────────────────
        var numeroPedido = 'BB-' + Date.now().toString(36).toUpperCase();

        // ── Construir objeto envío ────────────────────────────
        var datosEnvio = {
            nombre:       nombre,
            direccion:    direccion,
            postal:       postal,
            ciudad:       ciudad,
            provincia:    provincia,
            pais:         pais,
            telefono:     telefono,
            notas:        notas,
            metodo:       envioSeleccionado.metodo,
            plazo:        envioSeleccionado.plazo,
            precioEnvio:  envioSeleccionado.precioEnvio,
            numeroPedido: numeroPedido
        };

        // ── Guardar en localStorage ───────────────────────────
        try {
            localStorage.setItem('breibox_envio', JSON.stringify(datosEnvio));
        } catch (err) {
            console.error('No se pudieron guardar los datos de envío:', err);
        }

        // ── Redirigir a la página de confirmación ─────────────
        window.location.href = 'Confirmacion.html';
    });

});