document.addEventListener('DOMContentLoaded', function() {
    
    // --- Dark Mode Logic ---
    const toggleBtn = document.getElementById('theme-toggle');
    const body = document.body;
    const currentTheme = localStorage.getItem('theme');
    
    if (currentTheme) {
        body.classList.add(currentTheme);
    }

    if (toggleBtn) {
        toggleBtn.addEventListener('click', () => {
            body.classList.toggle('dark-mode');
            if (body.classList.contains('dark-mode')) {
                localStorage.setItem('theme', 'dark-mode');
            } else {
                localStorage.removeItem('theme');
            }
        });
    }

    // --- Mobile Menu ---
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navLinksItems = document.querySelectorAll('.nav-links li a');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('nav-active');
        });
    }

    if (navLinksItems) {
        navLinksItems.forEach(link => {
            link.addEventListener('click', () => {
                if(navLinks) navLinks.classList.remove('nav-active');
            });
        });
    }

    // --- Accordion Logic (Coursework & Orgs) ---
    const accordions = document.querySelectorAll('.accordion-header');

    accordions.forEach(acc => {
        acc.addEventListener('click', function() {
            // Toggle active class on parent item
            const item = this.parentElement;
            item.classList.toggle('active');

            // Handle height animation
            const content = this.nextElementSibling;
            if (item.classList.contains('active')) {
                content.style.maxHeight = content.scrollHeight + "px";
            } else {
                content.style.maxHeight = 0;
            }
        });
    });

    // --- Active Nav Link on Scroll ---
    const sections = document.querySelectorAll('section, header');
    const navItems = document.querySelectorAll('.nav-item');

    const observerOptions = {
        root: null,
        threshold: 0.3,
        rootMargin: "-50px"
    };

    const navObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                navItems.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href').substring(1) === entry.target.id) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, observerOptions);

    if (sections.length > 0) {
        sections.forEach(section => {
            if(section.classList.contains('section-scroll') || section.id === 'home') {
                navObserver.observe(section);
            }
        });
    }

    // --- Fade Animations ---
    const fadeObserverOptions = { threshold: 0.1, rootMargin: "0px 0px -50px 0px" };
    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
                fadeObserver.unobserve(entry.target);
            }
        });
    }, fadeObserverOptions);

    const hiddenElements = document.querySelectorAll('.hidden-fade, .hidden-fade-up');
    hiddenElements.forEach((el) => fadeObserver.observe(el));
});