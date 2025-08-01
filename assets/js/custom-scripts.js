/**
 * assets/js/custom-scripts.js
 */
document.addEventListener('DOMContentLoaded', function() {

    // --- Mobile Menu ---
    const menuToggle = document.getElementById('mobile-menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuIcon = document.getElementById('menu-icon');
    const closeIcon = document.getElementById('close-icon');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener('click', () => {
            const isMenuOpen = mobileMenu.classList.contains('flex');
            if (isMenuOpen) {
                mobileMenu.classList.remove('flex');
                mobileMenu.classList.add('hidden');
                menuIcon.classList.remove('hidden');
                closeIcon.classList.add('hidden');
            } else {
                mobileMenu.classList.remove('hidden');
                mobileMenu.classList.add('flex');
                menuIcon.classList.add('hidden');
                closeIcon.classList.remove('hidden');
            }
        });

        // Close menu when a link is clicked
        mobileNavLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('flex');
                mobileMenu.classList.add('hidden');
                menuIcon.classList.remove('hidden');
                closeIcon.classList.add('hidden');
            });
        });
    }

    // --- Sticky Header ---
    const header = document.getElementById('header');
    if (header) {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                header.style.backgroundColor = '#3d3a38';
            } else {
                header.style.backgroundColor = 'transparent';
            }
        };
        window.addEventListener('scroll', handleScroll);
    }

    // --- Scroll-in Animations ---
    const animatedElements = document.querySelectorAll('.content-card');
    if (animatedElements.length > 0) {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('is-visible');
                    }
                });
            }, {
                threshold: 0.1
            }
        );

        animatedElements.forEach((section) => {
            observer.observe(section);
        });
    }

    // --- Gallery Slider ---
    const gallerySlider = document.getElementById('gallery-slider');
    if (gallerySlider) {
        const galleryImages = [
            "https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=1925&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1770&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1571896349842-33c89424de2d?q=80&w=1780&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1625244724120-130a0e574935?q=80&w=1770&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1590447158039-654452c97ba3?q=80&w=1770&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1445019980597-93e87ba0a6a0?q=80&w=1776&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1540541338287-41700207dee6?q=80&w=1770&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1535827841776-24e39e513459?q=80&w=1770&auto=format&fit=crop",
        ];

        let currentImageIndex = 0;
        let isGalleryPaused = false;
        let autoPlayInterval;

        const imageContainer = document.getElementById('gallery-image-container');
        const dotsContainer = document.getElementById('gallery-dots');
        const prevButton = document.getElementById('gallery-prev');
        const nextButton = document.getElementById('gallery-next');

        // Create image and dot elements
        galleryImages.forEach((src, index) => {
            const img = document.createElement('img');
            img.src = src;
            img.alt = `Gallery Image ${index + 1}`;
            img.className = `w-full h-full object-cover absolute top-0 left-0 transition-opacity duration-700 ease-in-out`;
            img.style.opacity = index === 0 ? '1' : '0';
            imageContainer.appendChild(img);

            const dot = document.createElement('button');
            dot.addEventListener('click', () => {
                isGalleryPaused = true;
                setCurrentImage(index);
            });
            dotsContainer.appendChild(dot);
        });

        const imageElements = imageContainer.querySelectorAll('img');
        const dotElements = dotsContainer.querySelectorAll('button');

        function setCurrentImage(index) {
            currentImageIndex = index;
            imageElements.forEach((img, i) => {
                img.style.opacity = i === index ? '1' : '0';
            });
            dotElements.forEach((dot, i) => {
                dot.className = `w-3 h-3 rounded-full transition-all ${i === index ? 'bg-[#3d3a38] scale-125' : 'bg-white/70 hover:bg-white'}`;
            });
        }

        function nextImage() {
            const newIndex = (currentImageIndex + 1) % galleryImages.length;
            setCurrentImage(newIndex);
        }

        function prevImage() {
            const newIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
            setCurrentImage(newIndex);
        }

        nextButton.addEventListener('click', () => {
            isGalleryPaused = true;
            nextImage();
        });
        prevButton.addEventListener('click', () => {
            isGalleryPaused = true;
            prevImage();
        });

        function startAutoplay() {
            autoPlayInterval = setInterval(() => {
                if (!isGalleryPaused) {
                    nextImage();
                }
            }, 5000);
        }
        
        gallerySlider.addEventListener('mouseenter', () => isGalleryPaused = true);
        gallerySlider.addEventListener('mouseleave', () => isGalleryPaused = false);

        setCurrentImage(0);
        startAutoplay();
    }
});
