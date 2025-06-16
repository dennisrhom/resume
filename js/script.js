
// --- START OF FILE script.js ---

document.addEventListener('DOMContentLoaded', function() {
    const modalOverlay = document.getElementById('modal-overlay');
    const modalClose = document.getElementById('modal-close');
    const modalBody = document.getElementById('modal-body');
    const buttons = document.querySelectorAll('.homepage-btn'); // These are the buttons on index.html

    // Section content for each button on index.html
    const sectionContent = {
        
        'ABOUT ME': `
            <h2 class="modal-header-common">ABOUT ME</h2>
            <p>Hello :D</p>
                <a href="../pages/temp.html" class="back-link">temp.html</a>
            
        `,
 

        'EDUCATION': `
        
            <h2 class="modal-header-common">EDUCATION</h2>
            <div class="education-modal-content">
                <div class="education-text">
                    <div class="school-name">The University of Texas at Austin</div>
                    <div class="degree-name">Bachelors of Science in Aerospace Engineering</div>
                    <div class="degree-name">MAY 2025</div>
                    <div class="degree-name">GPA: 3.6</div>
                </div>
                <div class="education-image-container">
                    <img src='images/horn.svg' alt="UT Tower" class="education-image">
                </div>
            </div>
        `,
        'CONTACT': `
            <h2 class="modal-header-common">CONTACT</h2>
            <div class="contact-modal-info">
                <div class="modal-label-common1">EMAIL: <a href='mailto:dryanhom@gmail.com'>DRYANHOM@GMAIL.COM</a></div>

            </div>
            <div class="contact-modal-socials">
                <a href='https://www.linkedin.com/in/dennis-hom-134017237/' target='_blank' class='contact-social-btn' title='LinkedIn'>
                    <img src='https://img.icons8.com/ios-filled/28/ffffff/linkedin.png' alt='LinkedIn'/>
                </a>
                <a href='https://twitter.com/' target='_blank' class='contact-social-btn' title='Twitter'>
                    <img src='https://img.icons8.com/ios-filled/28/ffffff/twitter.png' alt='Twitter'/>
                </a>
                <a href='https://instagram.com/dennishom' target='_blank' class='contact-social-btn' title='Instagram'>
                    <img src='https://img.icons8.com/ios-filled/28/ffffff/instagram-new.png' alt='Instagram'/>
                </a>
                <a href='https://github.com/dennisrhom' target='_blank' class='contact-social-btn' title='GitHub'>
                    <img src='https://img.icons8.com/ios-glyphs/28/ffffff/github.png' alt='GitHub'/>
                </a>
            </div>
        `
    };

    if (buttons.length > 0 && modalOverlay && modalBody && modalClose) {
        buttons.forEach(btn => {
            btn.addEventListener('click', () => {
                const sectionKey = btn.textContent.trim().toUpperCase();

                if (sectionKey === 'PROJECTS') {
                    window.location.href = 'pages/projects.html'; // Navigate to projects.html
                } else if (sectionContent[sectionKey]) {
                    modalBody.innerHTML = sectionContent[sectionKey];
                    modalOverlay.style.display = 'flex';
                    document.body.classList.add('modal-open');
                }
            });
        });
        modalClose.addEventListener('click', () => {
            modalOverlay.style.display = 'none';
            document.body.classList.remove('modal-open');
        });

        modalOverlay.addEventListener('click', (e) => {
            if (e.target === modalOverlay) { // Clicked on the overlay itself, not the content
                modalOverlay.style.display = 'none';
                document.body.classList.remove('modal-open');
            }
        });
    } else {
        // console.error("Modal elements or homepage buttons not found on this page.");
        // This is expected on projects.html, so no error needed if we only expect this script on index.html
    }
    

// HORIZONTAL SCROLLING FOR PROJECTS TIMELINE

    const timelineWrapper = document.querySelector('.timeline-wrapper');

    timelineWrapper.addEventListener('wheel', function (e) {
        if (e.deltaY !== 0) {
            e.preventDefault(); // Prevent default vertical scroll
            timelineWrapper.scrollLeft += e.deltaY;
        }
    }, { passive: false });
    }
);



// --- END OF FILE script.js ---
