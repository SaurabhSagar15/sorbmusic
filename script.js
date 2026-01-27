document.addEventListener('DOMContentLoaded', () => {
    const wrapper = document.querySelector('.gallery-wrapper');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const items = document.querySelectorAll('.gallery-photo-container');

    let currentIndex = 0;
    const totalItems = items.length;

    function getVisibleItems() {
        return window.innerWidth <= 768 ? 1 : 3;
    }

    function updateCarousel() {
        const visibleItems = getVisibleItems();
        const maxIndex = Math.max(0, totalItems - visibleItems);

        if (currentIndex > maxIndex) currentIndex = maxIndex;
        if (currentIndex < 0) currentIndex = 0;

        const offset = currentIndex * (100 / visibleItems);
        wrapper.style.transform = `translateX(-${offset}%)`;

        // Update button states (optional)
        prevBtn.style.opacity = currentIndex === 0 ? '0.5' : '1';
        nextBtn.style.opacity = currentIndex === maxIndex ? '0.5' : '1';
    }

    nextBtn.addEventListener('click', () => {
        const visibleItems = getVisibleItems();
        const maxIndex = Math.max(0, totalItems - visibleItems);
        if (currentIndex < maxIndex) {
            currentIndex++;
            updateCarousel();
        } else {
            // Loop to start
            currentIndex = 0;
            updateCarousel();
        }
    });

    prevBtn.addEventListener('click', () => {
        const visibleItems = getVisibleItems();
        const maxIndex = Math.max(0, totalItems - visibleItems);
        if (currentIndex > 0) {
            currentIndex--;
            updateCarousel();
        } else {
            // Loop to end
            currentIndex = maxIndex;
            updateCarousel();
        }
    });

    window.addEventListener('resize', updateCarousel);

    // Initial setup
    updateCarousel();
});
