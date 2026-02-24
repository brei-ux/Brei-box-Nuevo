// ============================================
// CARRUSEL AUTOMÁTICO DE IMÁGENES
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    const track = document.querySelector('.carousel-track');
    const slides = document.querySelectorAll('.carousel-slide');
    const prevBtn = document.querySelector('.carousel-btn-prev');
    const nextBtn = document.querySelector('.carousel-btn-next');
    const indicators = document.querySelectorAll('.carousel-indicator');
    
    let currentIndex = 0;
    let autoplayInterval;
    const AUTOPLAY_DELAY = 4000; // 4 segundos
    
    // Función para actualizar la posición del carrusel
    function updateCarousel(index) {
        // Asegurar que el índice esté en el rango válido
        if (index < 0) {
            index = slides.length - 1;
        } else if (index >= slides.length) {
            index = 0;
        }
        
        currentIndex = index;
        
        // Mover el track
        const offset = -currentIndex * 100;
        track.style.transform = `translateX(${offset}%)`;
        
        // Actualizar indicadores
        indicators.forEach((indicator, i) => {
            if (i === currentIndex) {
                indicator.classList.add('active');
            } else {
                indicator.classList.remove('active');
            }
        });
    }
    
    // Función para ir a la siguiente diapositiva
    function nextSlide() {
        updateCarousel(currentIndex + 1);
    }
    
    // Función para ir a la diapositiva anterior
    function prevSlide() {
        updateCarousel(currentIndex - 1);
    }
    
    // Función para iniciar la reproducción automática
    function startAutoplay() {
        autoplayInterval = setInterval(nextSlide, AUTOPLAY_DELAY);
    }
    
    // Función para detener la reproducción automática
    function stopAutoplay() {
        clearInterval(autoplayInterval);
    }
    
    // Función para reiniciar el autoplay
    function resetAutoplay() {
        stopAutoplay();
        startAutoplay();
    }
    
    // Event listeners para los botones
    prevBtn.addEventListener('click', function() {
        prevSlide();
        resetAutoplay();
    });
    
    nextBtn.addEventListener('click', function() {
        nextSlide();
        resetAutoplay();
    });
    
    // Event listeners para los indicadores
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', function() {
            updateCarousel(index);
            resetAutoplay();
        });
    });
    
    // Pausar autoplay cuando el ratón está sobre el carrusel
    const carouselContainer = document.querySelector('.carousel-container');
    
    carouselContainer.addEventListener('mouseenter', stopAutoplay);
    carouselContainer.addEventListener('mouseleave', startAutoplay);
    
    // Soporte para gestos táctiles en móviles
    let touchStartX = 0;
    let touchEndX = 0;
    
    carouselContainer.addEventListener('touchstart', function(e) {
        touchStartX = e.changedTouches[0].screenX;
        stopAutoplay();
    });
    
    carouselContainer.addEventListener('touchend', function(e) {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
        startAutoplay();
    });
    
    function handleSwipe() {
        const swipeThreshold = 50; // mínimo de píxeles para considerar un swipe
        
        if (touchStartX - touchEndX > swipeThreshold) {
            // Swipe a la izquierda - siguiente
            nextSlide();
        } else if (touchEndX - touchStartX > swipeThreshold) {
            // Swipe a la derecha - anterior
            prevSlide();
        }
    }
    
    // Soporte para navegación con teclado
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowLeft') {
            prevSlide();
            resetAutoplay();
        } else if (e.key === 'ArrowRight') {
            nextSlide();
            resetAutoplay();
        }
    });
    
    // Iniciar el autoplay cuando se carga la página
    startAutoplay();
    
    // Pausar cuando la pestaña no está visible
    document.addEventListener('visibilitychange', function() {
        if (document.hidden) {
            stopAutoplay();
        } else {
            startAutoplay();
        }
    });
});