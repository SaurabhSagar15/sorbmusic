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
    if (!gallery) return;

    // Initial setup: find which images are already in the DOM to avoid immediate duplication
    const existingPhotos = gallery.querySelectorAll('.gallery-photo');
    const existingSrcs = Array.from(existingPhotos).map(img => {
        // Extract filename from src
        const src = img.getAttribute('src');
        return src;
    });

    let nextIndex = 0;
    // Find the first image in the array that isn't currently displayed
    for (let i = 0; i < images.length; i++) {
        if (!existingSrcs.includes(images[i])) {
            nextIndex = i;
            break;
        }
    }

    function rotateGallery() {
        const nextImgSrc = images[nextIndex];
        const newPhoto = document.createElement('img');
        newPhoto.src = nextImgSrc;
        newPhoto.alt = 'SØRB Performance';
        newPhoto.classList.add('gallery-photo');

        // Set initial state for transition
        newPhoto.style.flex = '0 0 0';
        newPhoto.style.opacity = '0';
        newPhoto.style.margin = '0';

        // Prepend to gallery
        gallery.insertBefore(newPhoto, gallery.firstChild);

        // Trigger entrance animation
        setTimeout(() => {
            newPhoto.style.flex = ''; // Revert to CSS defined flex-basis
            newPhoto.style.opacity = '1';
        }, 50);

        // Identify all photos and animate out the last one
        const photos = gallery.querySelectorAll('.gallery-photo');
        // We expect photos.length to be 4 now (3 original + 1 prepended)
        if (photos.length > (window.innerWidth <= 768 ? 1 : 3)) {
            const lastPhoto = photos[photos.length - 1];
            lastPhoto.style.flex = '0 0 0';
            lastPhoto.style.opacity = '0';
            lastPhoto.style.margin = '0';

            setTimeout(() => {
                lastPhoto.remove();
            }, 850); // Match CSS transition time
        }

        // Increment index for next time
        nextIndex = (nextIndex + 1) % images.length;
    }

    // Rotate every 3 seconds
    setInterval(rotateGallery, 3000);
});
