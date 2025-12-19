document.addEventListener('DOMContentLoaded', function () {
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

    /* =========================================================
       SMOOTH HEIGHT ANIMATION HELPERS
       (critical for non-choppy closing)
    ========================================================= */
    function openSection(element) {
        element.style.maxHeight = element.scrollHeight + 'px';
        element.style.opacity = '1';
    }

    function closeSection(element) {
        element.style.maxHeight = element.scrollHeight + 'px';
        requestAnimationFrame(() => {
            element.style.maxHeight = '0px';
            element.style.opacity = '0';
        });
    }

    /* =========================================================
       ACCORDIONS (Education + Leadership)
    ========================================================= */
    document.querySelectorAll('.accordion-header').forEach(header => {
        header.addEventListener('click', () => {
            const item = header.closest('.accordion-item');
            const content = item.querySelector('.accordion-content');

            if (!content) return;

            if (item.classList.contains('active')) {
                closeSection(content);
                item.classList.remove('active');
            } else {
                item.classList.add('active');
                openSection(content);
            }
        });
    });

    /* =========================================================
       OTHER PROJECTS DROPDOWN
    ========================================================= */
    window.toggleOtherProjects = function () {
        const container = document.querySelector('.other-projects-container');
        if (!container) return;

        const content = container.querySelector('.other-projects-content');
        if (!content) return;

        if (container.classList.contains('active')) {
            closeSection(content);
            container.classList.remove('active');
        } else {
            container.classList.add('active');
            openSection(content);
        }
    };
    

    /* =========================================================
       EXPERIENCE TIMELINE DROPDOWN
    ========================================================= */
    window.toggleExperience = function (element) {
        if (!element) return;

        const details = element.querySelector('.timeline-details');
        if (!details) return;

        if (element.classList.contains('active')) {
            closeSection(details);
            element.classList.remove('active');
        } else {
            element.classList.add('active');
            openSection(details);
        }
    };
    

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