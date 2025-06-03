document.addEventListener('DOMContentLoaded', function() {
    const btn = document.getElementById('helloBtn');
    if (btn) {
        btn.addEventListener('click', function() {
            alert('Hello! Welcome to the homepage.');
        });
    }

    // Side nav click handler for single page navigation
    const navLinks = document.querySelectorAll('.side-nav a');
    const sections = document.querySelectorAll('.right-column .about-me');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            // Remove active from all links
            navLinks.forEach(l => l.classList.remove('active'));
            // Add active to clicked link
            this.classList.add('active');
            // Hide all sections
            sections.forEach(section => section.style.display = 'none');
            // Show the selected section
            const targetId = this.getAttribute('href').replace('#', '');
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                targetSection.style.display = '';
            }
        });
    });
    // Show home by default
    document.getElementById('home').style.display = '';
});
