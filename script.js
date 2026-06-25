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