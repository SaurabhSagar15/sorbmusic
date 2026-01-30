/*
  Updated carousel logic:
  - Shows `visibleCount` slides (3) at once
  - Uses cloned slides at start/end for seamless infinite loop
  - Advances by one slide on a timer
*/
document.addEventListener('DOMContentLoaded', init);

function init() {
    const carousel = document.querySelector('.carousel');
    if (!carousel) return;
    const track = carousel.querySelector('.carousel-track');
    if (!track) return;

    const visibleCount = 3;
    let autoTimer = null;
    let slideWidth = 0;
    let currentIndex = visibleCount; // start at first real slide after prepended clones

    // Clean previous clones if re-initialized
    track.querySelectorAll('.clone').forEach(n => n.remove());

    const originalSlides = Array.from(track.querySelectorAll('.slide'));
    const originalCount = originalSlides.length;
    if (originalCount === 0) return;

    // Clone last visibleCount slides to the start (in reverse order), and first visibleCount to the end
    for (let i = 0; i < visibleCount; i++) {
        const cloneStart = originalSlides[originalCount - 1 - i].cloneNode(true);
        cloneStart.classList.add('clone');
        track.insertBefore(cloneStart, track.firstChild);
    }
    for (let i = 0; i < visibleCount; i++) {
        const cloneEnd = originalSlides[i].cloneNode(true);
        cloneEnd.classList.add('clone');
        track.appendChild(cloneEnd);
    }

    const allSlides = Array.from(track.children);
    const realCount = originalCount;

    // Set sizes
    function setSlideSizes() {
        slideWidth = carousel.clientWidth / visibleCount;
        allSlides.forEach(s => {
            s.style.width = `${slideWidth}px`;
        });
        // Position at the currentIndex without transition
        track.style.transition = 'none';
        updatePosition();
        // Force reflow then restore transition
        void track.offsetWidth;
        track.style.transition = 'transform 0.5s ease';
    }

    function updatePosition() {
        track.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
    }

    function nextSlide() {
        currentIndex++;
        track.style.transition = 'transform 0.5s ease';
        updatePosition();
    }

    // Handle loop reset after transition when we moved into cloned area
    track.addEventListener('transitionend', () => {
        // if we've moved past the last real slide, jump back to the equivalent real index
        if (currentIndex >= realCount + visibleCount) {
            // disable transition for the jump
            track.style.transition = 'none';
            currentIndex = visibleCount;
            updatePosition();
            // allow transitions again
            void track.offsetWidth;
            track.style.transition = 'transform 0.5s ease';
        }
    });

    // Auto rotate
    function startAutoRotate(interval = 3000) {
        stopAutoRotate();
        autoTimer = setInterval(nextSlide, interval);
    }
    function stopAutoRotate() {
        if (autoTimer) {
            clearInterval(autoTimer);
            autoTimer = null;
        }
    }

    // Recompute sizes on resize
    window.addEventListener('resize', setSlideSizes);

    // Initialize sizes and start
    setSlideSizes();
    startAutoRotate(2500);

    // Optional: pause on hover
    carousel.addEventListener('mouseenter', stopAutoRotate);
    carousel.addEventListener('mouseleave', () => startAutoRotate(2500));
}
