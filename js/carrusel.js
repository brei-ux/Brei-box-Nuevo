// ============================================================
// BREI-BOX — js/carrusel.js
// Carrusel automático de imágenes
// ============================================================

document.addEventListener('DOMContentLoaded', function () {
    var track      = document.querySelector('.carousel-track');
    var slides     = document.querySelectorAll('.carousel-slide');
    var prevBtn    = document.querySelector('.carousel-btn-prev');
    var nextBtn    = document.querySelector('.carousel-btn-next');
    var indicators = document.querySelectorAll('.carousel-indicator');
    var container  = document.querySelector('.carousel-container');

    var currentIndex    = 0;
    var autoplayInterval;
    var AUTOPLAY_DELAY  = 4000;

    // ── Mover el carrusel a un índice concreto ────────────────

    function updateCarousel(index) {
        if (index < 0) {
            index = slides.length - 1;
        } else if (index >= slides.length) {
            index = 0;
        }

        currentIndex = index;
        track.style.transform = 'translateX(' + (-currentIndex * 100) + '%)';

        indicators.forEach(function (dot, i) {
            dot.classList.toggle('active', i === currentIndex);
        });
    }

    function nextSlide() { updateCarousel(currentIndex + 1); }
    function prevSlide() { updateCarousel(currentIndex - 1); }

    // ── Autoplay ──────────────────────────────────────────────

    function startAutoplay()  { autoplayInterval = setInterval(nextSlide, AUTOPLAY_DELAY); }
    function stopAutoplay()   { clearInterval(autoplayInterval); }
    function resetAutoplay()  { stopAutoplay(); startAutoplay(); }

    // ── Controles ─────────────────────────────────────────────

    prevBtn.addEventListener('click', function () { prevSlide(); resetAutoplay(); });
    nextBtn.addEventListener('click', function () { nextSlide(); resetAutoplay(); });

    indicators.forEach(function (dot, i) {
        dot.addEventListener('click', function () { updateCarousel(i); resetAutoplay(); });
    });

    // Pausa al pasar el ratón
    container.addEventListener('mouseenter', stopAutoplay);
    container.addEventListener('mouseleave', startAutoplay);

    // ── Gestos táctiles ───────────────────────────────────────

    var touchStartX = 0;

    container.addEventListener('touchstart', function (e) {
        touchStartX = e.changedTouches[0].screenX;
        stopAutoplay();
    });

    container.addEventListener('touchend', function (e) {
        var diff = touchStartX - e.changedTouches[0].screenX;
        if (diff > 50)       nextSlide();
        else if (diff < -50) prevSlide();
        startAutoplay();
    });

    // ── Teclado ───────────────────────────────────────────────

    document.addEventListener('keydown', function (e) {
        if (e.key === 'ArrowLeft')  { prevSlide(); resetAutoplay(); }
        if (e.key === 'ArrowRight') { nextSlide(); resetAutoplay(); }
    });

    // ── Visibilidad de la pestaña ─────────────────────────────

    document.addEventListener('visibilitychange', function () {
        document.hidden ? stopAutoplay() : startAutoplay();
    });

    // ── Arranque ──────────────────────────────────────────────
    startAutoplay();
});