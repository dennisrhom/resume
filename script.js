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

    // Resume link logic
    const showResumeLink = document.getElementById('show-resume-link');
    const backToHomeLink = document.getElementById('back-to-home-link');
    const homeSection = document.getElementById('home');
    const resumeSection = document.getElementById('resume-section');
    if (showResumeLink && resumeSection && homeSection) {
        showResumeLink.addEventListener('click', function(e) {
            e.preventDefault();
            homeSection.style.display = 'none';
            resumeSection.style.display = '';
        });
    }
    if (backToHomeLink && resumeSection && homeSection) {
        backToHomeLink.addEventListener('click', function(e) {
            e.preventDefault();
            resumeSection.style.display = 'none';
            homeSection.style.display = '';
        });
    }
});
