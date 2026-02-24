// ============================================
// CREDIT CARD FORM - INTERACTIVE PREVIEW
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    // Get form elements
    const cardNumberInput = document.getElementById('cardNumber');
    const cardHolderInput = document.getElementById('cardHolder');
    const cardExpiryInput = document.getElementById('cardExpiry');
    const cardCVVInput = document.getElementById('cardCVV');

    // Get display elements
    const displayCardNumber = document.getElementById('displayCardNumber');
    const displayCardHolder = document.getElementById('displayCardHolder');
    const displayCardExpiry = document.getElementById('displayCardExpiry');

    // Get form
    const paymentForm = document.getElementById('paymentForm');

    // ============================================
    // FORMAT AND UPDATE CARD NUMBER
    // ============================================
    cardNumberInput.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\s/g, ''); // Remove spaces
        let formattedValue = value.match(/.{1,4}/g)?.join(' ') || value; // Add space every 4 digits
        
        e.target.value = formattedValue;
        
        // Update display
        if (value.length === 0) {
            displayCardNumber.textContent = '•••• •••• •••• ••••';
        } else {
            // Show entered numbers and fill rest with dots
            let displayValue = formattedValue;
            let remaining = 19 - formattedValue.length; // 16 digits + 3 spaces = 19 chars
            
            if (remaining > 0) {
                displayValue += ' ' + '•'.repeat(Math.min(remaining, 4));
            }
            
            displayCardNumber.textContent = displayValue;
        }
    });

    // Only allow numbers in card number
    cardNumberInput.addEventListener('keypress', function(e) {
        if (!/[0-9]/.test(e.key) && e.key !== 'Backspace' && e.key !== 'Delete') {
            e.preventDefault();
        }
    });

    // ============================================
    // UPDATE CARD HOLDER NAME
    // ============================================
    cardHolderInput.addEventListener('input', function(e) {
        let value = e.target.value.toUpperCase();
        
        if (value.length === 0) {
            displayCardHolder.textContent = 'NOMBRE APELLIDOS';
        } else {
            displayCardHolder.textContent = value;
        }
    });

    // Only allow letters and spaces in cardholder name
    cardHolderInput.addEventListener('keypress', function(e) {
        if (!/[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/.test(e.key)) {
            e.preventDefault();
        }
    });

    // ============================================
    // FORMAT AND UPDATE EXPIRY DATE
    // ============================================
    cardExpiryInput.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, ''); // Remove non-digits
        
        if (value.length >= 2) {
            value = value.substring(0, 2) + '/' + value.substring(2, 4);
        }
        
        e.target.value = value;
        
        // Update display
        if (value.length === 0) {
            displayCardExpiry.textContent = 'MM/AA';
        } else {
            displayCardExpiry.textContent = value;
        }
    });

    // Simplified validation for school project
    cardExpiryInput.addEventListener('blur', function(e) {
        let value = e.target.value;
        
        if (value.length === 5) {
            let month = parseInt(value.substring(0, 2));
            
            // Just check if month is valid (1-12)
            if (month < 1 || month > 12) {
                alert('Mes inválido. Debe estar entre 01 y 12.');
                e.target.value = '';
                displayCardExpiry.textContent = 'MM/AA';
            }
        }
    });

    // ============================================
    // FORMAT CVV
    // ============================================
    cardCVVInput.addEventListener('input', function(e) {
        e.target.value = e.target.value.replace(/\D/g, '').substring(0, 3);
    });

    // Only allow numbers in CVV
    cardCVVInput.addEventListener('keypress', function(e) {
        if (!/[0-9]/.test(e.key)) {
            e.preventDefault();
        }
    });

    // ============================================
    // FORM SUBMISSION (SIMPLIFIED FOR SCHOOL PROJECT)
    // ============================================
    paymentForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Basic validation - accepts any card for demo purposes
        const cardNumber = cardNumberInput.value.replace(/\s/g, '');
        const cardHolder = cardHolderInput.value.trim();
        const cardExpiry = cardExpiryInput.value;
        const cardCVV = cardCVVInput.value;
        const termsAccept = document.getElementById('termsAccept').checked;
        
        // Simple validation - just check if fields are filled
        if (cardNumber.length < 13) {
            alert('Por favor, ingresa un número de tarjeta (mínimo 13 dígitos).');
            cardNumberInput.focus();
            return;
        }
        
        // Validate cardholder name
        if (cardHolder.length < 3) {
            alert('Por favor, ingresa el nombre del titular.');
            cardHolderInput.focus();
            return;
        }
        
        // Validate expiry format
        if (cardExpiry.length !== 5 || !cardExpiry.includes('/')) {
            alert('Fecha de expiración inválida. Usa el formato MM/AA.');
            cardExpiryInput.focus();
            return;
        }
        
        // Validate CVV
        if (cardCVV.length < 3) {
            alert('CVV inválido. Debe tener al menos 3 dígitos.');
            cardCVVInput.focus();
            return;
        }
        
        // Validate terms
        if (!termsAccept) {
            alert('Debes aceptar los términos y condiciones.');
            return;
        }
        
        // Show success message - accepts any card for demo
        showSuccessMessage();
    });

    // ============================================
    // SUCCESS MESSAGE
    // ============================================
    function showSuccessMessage() {
        // Create overlay
        const overlay = document.createElement('div');
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 10000;
            animation: fadeIn 0.3s ease;
        `;
        
        // Create success card
        const successCard = document.createElement('div');
        successCard.style.cssText = `
            background: white;
            padding: 40px;
            border-radius: 20px;
            text-align: center;
            max-width: 400px;
            box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
            animation: scaleIn 0.3s ease;
        `;
        
        successCard.innerHTML = `
            <svg width="80" height="80" viewBox="0 0 24 24" fill="none" style="margin: 0 auto 20px;">
                <circle cx="12" cy="12" r="10" fill="#10b981"/>
                <path d="M8 12l2 2 4-4" stroke="white" stroke-width="2" stroke-linecap="round"/>
            </svg>
            <h2 style="color: #1e293b; margin-bottom: 12px; font-size: 24px;">¡Pago Exitoso!</h2>
            <p style="color: #64748b; margin-bottom: 24px;">Tu pedido ha sido procesado correctamente.</p>
            <button onclick="window.location.href='1 index.html'" style="
                background: #2563eb;
                color: white;
                border: none;
                padding: 12px 32px;
                border-radius: 10px;
                font-size: 16px;
                font-weight: 600;
                cursor: pointer;
            ">Volver a la Tienda</button>
        `;
        
        overlay.appendChild(successCard);
        document.body.appendChild(overlay);
        
        // Add CSS animations
        const style = document.createElement('style');
        style.textContent = `
            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
            @keyframes scaleIn {
                from { transform: scale(0.9); opacity: 0; }
                to { transform: scale(1); opacity: 1; }
            }
        `;
        document.head.appendChild(style);
    }
});