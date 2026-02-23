// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const navMenu = document.getElementById('navMenu');

    if (mobileMenuToggle && navMenu) {
        mobileMenuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });
    }

    // Notification Carousel
    const notifications = [
        "Paper Submission Deadline for Conference 2026 is now extended to 28 February. Please go to submission guidelines for more Information. Click Submit Paper for directly submitting your paper",
        "Springer CCIS Registration is now closed, if a paper accepted for Springer CCIS and is registered after 10 February, will be automatically transferred to AIP. Only AIP regular registration is open from 11 February",
        "Regular registrations for the conference are now open only for AIP from 11 February 2026 to the last date (to be announced)",
        "Conference 2026 papers will be published in AIP Conference Proceedings and Springer CCIS – Scopus and WoS Indexed"
    ];

    let currentNotification = 0;
    const notificationText = document.getElementById('notificationText');
    const prevBtn = document.getElementById('prevNotification');
    const nextBtn = document.getElementById('nextNotification');

    function updateNotification() {
        if (notificationText) {
            notificationText.textContent = notifications[currentNotification];
        }
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', function() {
            currentNotification = (currentNotification - 1 + notifications.length) % notifications.length;
            updateNotification();
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', function() {
            currentNotification = (currentNotification + 1) % notifications.length;
            updateNotification();
        });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                // Close mobile menu if open
                if (navMenu && navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                }
            }
        });
    });

    // Active navigation link on scroll
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-menu a[href^="#"]');

    function updateActiveNav() {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', updateActiveNav);
    updateActiveNav();

    // Flags Horizontal Scrolling
    const flagsContainer = document.getElementById('flagsContainer');
    const scrollLeftBtn = document.getElementById('scrollLeft');
    const scrollRightBtn = document.getElementById('scrollRight');

    if (flagsContainer && scrollLeftBtn && scrollRightBtn) {
        const scrollAmount = 300; // pixels to scroll per click

        // Arrow button scrolling
        scrollLeftBtn.addEventListener('click', function() {
            flagsContainer.scrollBy({
                left: -scrollAmount,
                behavior: 'smooth'
            });
        });

        scrollRightBtn.addEventListener('click', function() {
            flagsContainer.scrollBy({
                left: scrollAmount,
                behavior: 'smooth'
            });
        });

        // Mouse wheel horizontal scrolling
        flagsContainer.addEventListener('wheel', function(e) {
            if (e.deltaY !== 0) {
                e.preventDefault();
                flagsContainer.scrollLeft += e.deltaY;
            }
        }, { passive: false });

        // Update arrow button visibility based on scroll position
        function updateArrowButtons() {
            const { scrollLeft, scrollWidth, clientWidth } = flagsContainer;
            
            // Show/hide left arrow
            if (scrollLeft <= 0) {
                scrollLeftBtn.style.opacity = '0.5';
                scrollLeftBtn.style.pointerEvents = 'none';
            } else {
                scrollLeftBtn.style.opacity = '1';
                scrollLeftBtn.style.pointerEvents = 'auto';
            }

            // Show/hide right arrow
            if (scrollLeft >= scrollWidth - clientWidth - 10) {
                scrollRightBtn.style.opacity = '0.5';
                scrollRightBtn.style.pointerEvents = 'none';
            } else {
                scrollRightBtn.style.opacity = '1';
                scrollRightBtn.style.pointerEvents = 'auto';
            }
        }

        // Initial check
        updateArrowButtons();

        // Update on scroll
        flagsContainer.addEventListener('scroll', updateArrowButtons);

        // Update on resize
        window.addEventListener('resize', updateArrowButtons);
    }

    // Hero Background Image Slider
    const heroSlides = document.querySelectorAll('.hero-slide');
    let currentSlide = 0;
    const slideInterval = 2000; // 2 seconds

    function nextSlide() {
        if (heroSlides.length === 0) return;

        // Remove active class from current slide
        heroSlides[currentSlide].classList.remove('active');
        heroSlides[currentSlide].classList.add('prev');

        // Move to next slide
        currentSlide = (currentSlide + 1) % heroSlides.length;

        // Add active class to new slide
        setTimeout(() => {
            heroSlides.forEach(slide => slide.classList.remove('prev'));
            heroSlides[currentSlide].classList.add('active');
        }, 50);
    }

    // Start the slider if slides exist
    if (heroSlides.length > 0) {
        setInterval(nextSlide, slideInterval);
    }
});
