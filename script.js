document.addEventListener("DOMContentLoaded", () => {
    console.log("Selvanayaki Electricals Website Loaded Successfully");

    // ==========================================
    // 1. NUMBER COUNTER ANIMATION
    // ==========================================
    const counters = document.querySelectorAll('.counter');
    const speed = 100; // Adjust this to make the animation faster or slower

    // Function to animate numbers
    const animateCounters = () => {
        counters.forEach(counter => {
            const updateCount = () => {
                const target = +counter.getAttribute('data-target');
                const count = +counter.innerText;
                const increment = target / speed;

                if (count < target) {
                    counter.innerText = Math.ceil(count + increment);
                    setTimeout(updateCount, 20); // updates every 20ms
                } else {
                    counter.innerText = target;
                }
            };
            updateCount();
        });
    }

    // ==========================================
    // 4. TRANSPARENT NAVBAR SCROLL EFFECT
    // ==========================================
    const navbar = document.querySelector('.navbar');

    if (navbar) {
        window.addEventListener('scroll', () => {
            // When the user scrolls down more than 50 pixels
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                // When they scroll back to the very top
                navbar.classList.remove('scrolled');
            }
        });
    }

    // Observer to trigger animation on scroll
    const observerOptions = {
        root: null,
        threshold: 0.5 // Triggers when 50% of the section is visible
    };

    const counterObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                observer.unobserve(entry.target); // Runs only once
            }
        });
    }, observerOptions);

    // Start observing the section
    const achievementsSection = document.querySelector('.achievements-wrapper');
    if (achievementsSection) {
        counterObserver.observe(achievementsSection);
    }

    // ==========================================
    // 2. MOBILE MENU LOGIC
    // ==========================================
    const mobileMenu = document.getElementById('mobile-menu');
    const navMenu = document.getElementById('nav-menu');

    if (mobileMenu && navMenu) {
        mobileMenu.addEventListener('click', () => {
            // Toggle the menu open/closed
            navMenu.classList.toggle('active');

            // Switch the icon between 'bars' and 'X'
            const icon = mobileMenu.querySelector('i');

            // Safety check: ensure the <i> tag exists before modifying it
            if (icon) {
                if (navMenu.classList.contains('active')) {
                    icon.classList.remove('fa-bars');
                    icon.classList.add('fa-xmark'); // Ensure FontAwesome is linked in your HTML
                } else {
                    icon.classList.remove('fa-xmark');
                    icon.classList.add('fa-bars');
                }
            }
        });
    }
}); // Everything safely closes here!

// ==========================================
// 3. SECTOR SLIDER LOGIC (WITH AUTO-SLIDE)
// ==========================================
const track = document.getElementById('sectorTrack');
const prevBtn = document.getElementById('prevSector');
const nextBtn = document.getElementById('nextSector');

if (track && prevBtn && nextBtn) {
    const slides = Array.from(track.children);
    let currentIndex = 0;
    let autoSlideInterval;

    // Function to move the track
    const updateSliderPosition = () => {
        track.style.transform = `translateX(-${currentIndex * 100}%)`;
    };

    // Logic to go to the next slide
    const moveToNextSlide = () => {
        if (currentIndex < slides.length - 1) {
            currentIndex++;
        } else {
            currentIndex = 0; // Loop to beginning
        }
        updateSliderPosition();
    };

    // Logic to go to the previous slide
    const moveToPrevSlide = () => {
        if (currentIndex > 0) {
            currentIndex--;
        } else {
            currentIndex = slides.length - 1; // Loop to end
        }
        updateSliderPosition();
    };

    // Auto-Slide Timer Management
    const startAutoSlide = () => {
        autoSlideInterval = setInterval(moveToNextSlide, 5000); // Changes slide every 5 seconds
    };

    const resetAutoSlide = () => {
        clearInterval(autoSlideInterval);
        startAutoSlide(); // Restart timer after manual click
    };

    // Button Event Listeners
    nextBtn.addEventListener('click', () => {
        moveToNextSlide();
        resetAutoSlide();
    });

    prevBtn.addEventListener('click', () => {
        moveToPrevSlide();
        resetAutoSlide();
    });

    // Pause auto-slide when hovering over the slider (so users can read)
    track.addEventListener('mouseenter', () => clearInterval(autoSlideInterval));

    // Resume auto-slide when mouse leaves
    track.addEventListener('mouseleave', startAutoSlide);

    // Start the automated sliding on page load
    startAutoSlide();
}