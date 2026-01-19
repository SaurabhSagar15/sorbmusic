document.addEventListener('DOMContentLoaded', () => {
    const images = [
        'images/sorb-0.jpeg',
        'images/sorb-1.jpeg',
        'images/sorb-2.jpeg',
        'images/sorb-3.jpeg',
        'images/sorb-4.jpeg',
        'images/sorb-5.jpeg',
        'images/sorb-6.jpeg',
        'images/sorb-8.jpeg',
        'images/sorb-9.jpeg',
        'images/sorb-10.jpeg',
        'images/sorb-11.jpeg',
        'images/sorb-12.jpeg'
    ];

    const gallery = document.querySelector('.photo-gallery');
    const leftBtn = document.querySelector('.left-btn');
    const rightBtn = document.querySelector('.right-btn');

    if (!gallery || !leftBtn || !rightBtn) return;

    let currentIndex = 0; // Index of the first image currently displayed
    let isTransitioning = false;

    function createPhotoNode(index) {
        const newPhoto = document.createElement('img');
        newPhoto.src = images[index];
        newPhoto.alt = 'SØRB Performance';
        newPhoto.classList.add('gallery-photo');
        return newPhoto;
    }

    function shiftRight() {
        if (isTransitioning) return;
        isTransitioning = true;

        // "When the right button is clicked, the right most picture goes away
        // and the other 2 pictures shift to right and a new picture comes to left."

        currentIndex = (currentIndex - 1 + images.length) % images.length;
        const newPhoto = createPhotoNode(currentIndex);

        // Initial state for prepended photo
        newPhoto.style.flex = '0 0 0';
        newPhoto.style.opacity = '0';
        newPhoto.style.margin = '0';
        newPhoto.style.padding = '0';

        gallery.insertBefore(newPhoto, gallery.firstChild);

        // Trigger entrance animation
        setTimeout(() => {
            newPhoto.style.flex = ''; // Revert to CSS defined flex-basis
            newPhoto.style.opacity = '1';
            newPhoto.style.margin = '';
            newPhoto.style.padding = '';
        }, 50);

        const photos = gallery.querySelectorAll('.gallery-photo');
        const numVisible = window.innerWidth <= 768 ? 1 : 3;

        if (photos.length > numVisible) {
            const lastPhoto = photos[photos.length - 1];
            lastPhoto.style.flex = '0 0 0';
            lastPhoto.style.opacity = '0';
            lastPhoto.style.margin = '0';
            lastPhoto.style.padding = '0';

            setTimeout(() => {
                lastPhoto.remove();
                isTransitioning = false;
            }, 850);
        } else {
            setTimeout(() => {
                isTransitioning = false;
            }, 850);
        }
    }

    function shiftLeft() {
        if (isTransitioning) return;
        isTransitioning = true;

        // "When the left button is clicked, the left most picture goes away
        // and the other 2 pictures shift to left and a new picture comes to right."

        const numVisible = window.innerWidth <= 768 ? 1 : 3;
        const nextImageIndex = (currentIndex + numVisible) % images.length;
        const newPhoto = createPhotoNode(nextImageIndex);

        // Initial state for appended photo
        newPhoto.style.flex = '0 0 0';
        newPhoto.style.opacity = '0';
        newPhoto.style.margin = '0';
        newPhoto.style.padding = '0';

        gallery.appendChild(newPhoto);

        // Trigger entrance animation
        setTimeout(() => {
            newPhoto.style.flex = '';
            newPhoto.style.opacity = '1';
            newPhoto.style.margin = '';
            newPhoto.style.padding = '';
        }, 50);

        const photos = gallery.querySelectorAll('.gallery-photo');

        if (photos.length > numVisible) {
            const firstPhoto = photos[0];
            firstPhoto.style.flex = '0 0 0';
            firstPhoto.style.opacity = '0';
            firstPhoto.style.margin = '0';
            firstPhoto.style.padding = '0';

            setTimeout(() => {
                firstPhoto.remove();
                currentIndex = (currentIndex + 1) % images.length;
                isTransitioning = false;
            }, 850);
        } else {
            setTimeout(() => {
                currentIndex = (currentIndex + 1) % images.length;
                isTransitioning = false;
            }, 850);
        }
    }

    rightBtn.addEventListener('click', shiftRight);
    leftBtn.addEventListener('click', shiftLeft);
});
