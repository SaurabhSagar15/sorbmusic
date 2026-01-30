document.addEventListener('DOMContentLoaded', () => {
    const track = document.querySelector('.slider-track');
    const gallery = document.querySelector('.photo-gallery');

    if (!track || !gallery) return;

    const slides = Array.from(track.children);
    if (slides.length === 0) return;

    const originalCount = slides.length;
    // Number of clones should be at least the maximum number of visible slides
    const clonesCount = 4;

    // Clone first and last slides
    const firstClones = slides.slice(0, clonesCount).map(slide => slide.cloneNode(true));
    const lastClones = slides.slice(-clonesCount).map(slide => slide.cloneNode(true));

    // Prepend last clones and append first clones
    [...lastClones].reverse().forEach(clone => track.prepend(clone));
    firstClones.forEach(clone => track.append(clone));

    const allSlides = Array.from(track.children);
    let currentIndex = clonesCount;
    let isTransitioning = false;

    // Helper to get current slide width including gap
    const getStepWidth = () => {
        const firstSlide = allSlides[0];
        const style = window.getComputedStyle(track);
        const gap = parseFloat(style.gap) || 0;
        return firstSlide.offsetWidth + gap;
    };

    // Update track position
    const updatePosition = (transition = true) => {
        const stepWidth = getStepWidth();
        if (stepWidth === 0) return;

        track.style.transition = transition ? 'transform 0.5s ease-in-out, opacity 0.5s ease' : 'none';
        track.style.transform = `translateX(-${currentIndex * stepWidth}px)`;
    };

    // Main rotation function
    const nextSlide = () => {
        if (isTransitioning) return;
        currentIndex++;
        isTransitioning = true;
        updatePosition();
    };

    // Handle transition end for infinite loop jump
    track.addEventListener('transitionend', (e) => {
        // Only handle transform transition
        if (e.propertyName !== 'transform') return;

        isTransitioning = false;

        // If we reached the end clones
        if (currentIndex >= originalCount + clonesCount) {
            currentIndex -= originalCount;
            updatePosition(false);
        }
        // If we reached the start clones
        else if (currentIndex < clonesCount) {
            currentIndex += originalCount;
            updatePosition(false);
        }
    });

    // Auto-rotation setup
    let rotationInterval = setInterval(nextSlide, 3000);

    // Pause on hover
    gallery.addEventListener('mouseenter', () => {
        clearInterval(rotationInterval);
    });

    // Resume on mouse leave
    gallery.addEventListener('mouseleave', () => {
        clearInterval(rotationInterval);
        rotationInterval = setInterval(nextSlide, 3000);
    });

    // Handle window resize
    window.addEventListener('resize', () => {
        updatePosition(false);
    });

    // Initial position set and reveal
    const init = () => {
        const stepWidth = getStepWidth();
        if (stepWidth === 0) {
            requestAnimationFrame(init);
            return;
        }
        updatePosition(false);
        // Small delay to ensure transform is applied before showing
        setTimeout(() => {
            track.style.opacity = '1';
        }, 50);
    };

    init();
});
