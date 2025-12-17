// Register GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Hero Animation
// Hero Animation (Vintage Projector)
const initHeroAnimation = () => {
    // Navbar entrance
    gsap.from(".navbar", {
        y: -10,
        opacity: 0,
        duration: 2,
        delay: 1.5 // Wait for TV turn on
    });

    // Projector Beam Effect for Title
    const title = document.querySelector('.hero-title');
    const subtitle = document.querySelector('.hero-subtitle');

    // Add class to trigger CSS animation
    setTimeout(() => {
        if (title) title.classList.add('projector-active');
    }, 500); // Slight delay for drama

    // Subtitle fade in slowly after title
    gsap.to(subtitle, {
        opacity: 1,
        duration: 2,
        delay: 2.5,
        ease: "power2.out"
    });
};

// Scroll Animations
// Scroll Animations (Cinematic Parallax)
const initScrollAnimations = () => {
    // Parallax Effect for About Text (Floating/Anti-Gravity)
    gsap.to(".parallax-text", {
        scrollTrigger: {
            trigger: ".about-section",
            start: "top bottom",
            end: "bottom top",
            scrub: 1.2
        },
        y: -150, // Floating Up significantly
        opacity: 0.8, // Fade out slightly at top for depth
        ease: "none",
        overwrite: 'auto'
    });

    // About Visual Entrance (Keep as is, but improved easing)
    gsap.from(".about-visual", {
        scrollTrigger: {
            trigger: ".about-section",
            start: "top 75%", // Trigger slightly earlier
        },
        y: 100,
        opacity: 0,
        duration: 2,
        ease: "power2.out"
    });

    // Skills
    gsap.from(".skill-item", {
        scrollTrigger: {
            trigger: ".skills-section",
            start: "top 85%",
        },
        y: 50,
        opacity: 0,
        duration: 0.6,
        stagger: 0.05,
        ease: "back.out(1.7)"
    });

    // Projects
    gsap.from(".project-card", {
        scrollTrigger: {
            trigger: ".projects-section",
            start: "top 80%",
        },
        y: 100,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power4.out"
    });
};

// Image Upload Logic (Click Box)
const initImageUpload = () => {
    const input = document.getElementById('imageUpload');
    const visualBox = document.getElementById('visual-box');

    if (input && visualBox) {
        // Trigger file input when box is clicked
        visualBox.addEventListener('click', () => {
            input.click();
        });

        // Handle file selection
        input.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (event) => {
                    visualBox.style.backgroundImage = `url(${event.target.result})`;
                    const hint = visualBox.querySelector('.upload-hint');
                    if (hint) hint.style.display = 'none'; // Hide text
                    visualBox.style.border = 'none'; // Clean look
                };
                reader.readAsDataURL(file);
            }
        });
    }
};



// Custom Cursor Logic
const initCursor = () => {
    const cursor = document.querySelector('.cursor');
    const follower = document.querySelector('.cursor-follower');
    const links = document.querySelectorAll('a, button, .project-card, .skill-item');

    document.addEventListener('mousemove', (e) => {
        gsap.to(cursor, {
            x: e.clientX,
            y: e.clientY,
            duration: 0.1
        });
        gsap.to(follower, {
            x: e.clientX,
            y: e.clientY,
            duration: 0.3
        });
    });

    links.forEach(link => {
        link.addEventListener('mouseenter', () => {
            follower.classList.add('active');
            gsap.to(cursor, { scale: 0.5 });
        });
        link.addEventListener('mouseleave', () => {
            follower.classList.remove('active');
            gsap.to(cursor, { scale: 1 });
        });
    });
};

// Hero Parallax Effect
const initParallax = () => {
    document.addEventListener('mousemove', (e) => {
        const x = (window.innerWidth - e.pageX * 2) / 100;
        const y = (window.innerHeight - e.pageY * 2) / 100;

        gsap.to(".hero-title", {
            x: x,
            y: y,
            duration: 1,
            ease: "power2.out"
        });

        gsap.to(".hero-background", {
            x: -x * 2,
            y: -y * 2,
            duration: 1,
            ease: "power2.out"
        });
    });
};

// Text Scatter Effect
// Text Scatter Effect (Smoke/Disappear)
const initScatterText = () => {
    const heroTitleContainer = document.querySelector('.hero-title');
    if (!heroTitleContainer) return;

    // Split text into characters
    const originalContent = Array.from(heroTitleContainer.childNodes);
    heroTitleContainer.innerHTML = '';

    originalContent.forEach(node => {
        if (node.nodeType === Node.TEXT_NODE) {
            const text = node.textContent.trim();
            if (text) {
                [...text].forEach(char => {
                    const span = document.createElement('span');
                    span.innerText = char;
                    span.classList.add('char');
                    span.style.display = 'inline-block'; // Required for transform
                    span.style.willChange = 'transform, opacity, filter';
                    if (char === ' ') span.style.width = '0.3em';
                    heroTitleContainer.appendChild(span);
                });
            }
        } else if (node.nodeName === 'BR') {
            heroTitleContainer.appendChild(document.createElement('br'));
        } else {
            heroTitleContainer.appendChild(node.cloneNode(true));
        }
    });

    const chars = heroTitleContainer.querySelectorAll('.char');

    // Hover Interaction
    heroTitleContainer.addEventListener('mouseenter', () => {
        gsap.to(chars, {
            duration: 1.5,
            x: () => (Math.random() - 0.5) * 80, // Horizontal drift
            y: () => -150 - Math.random() * 100, // Move Up (Smoke rises)
            rotation: () => (Math.random() - 0.5) * 90,
            scale: () => 1.5 + Math.random(), // Expand like smoke
            opacity: 0,
            filter: "blur(15px)", // Blur out
            ease: "power2.out",
            stagger: {
                amount: 0.5,
                from: "random"
            },
            overwrite: true
        });
    });

    heroTitleContainer.addEventListener('mouseleave', () => {
        gsap.to(chars, {
            duration: 1,
            x: 0,
            y: 0,
            rotation: 0,
            scale: 1,
            opacity: 1,
            filter: "blur(0px)",
            ease: "back.out(1.7)", // Fun snap back
            stagger: {
                amount: 0.3,
                from: "start"
            },
            overwrite: true
        });
    });
};

// Project Card Image Upload Logic
// Project Card Image Upload Logic with Persistence
const initProjectCardUpload = () => {
    const projectCards = document.querySelectorAll('.project-card');

    // Load saved images from localStorage
    projectCards.forEach((card, index) => {
        const projectImage = card.querySelector('.project-image');
        const savedImage = localStorage.getItem(`project_image_${index}`);

        if (savedImage && projectImage) {
            projectImage.style.backgroundImage = `url('${savedImage}')`;
            projectImage.style.backgroundColor = 'transparent';
        }

        const fileInput = card.querySelector('.project-upload');
        if (fileInput && projectImage) {
            card.addEventListener('click', () => fileInput.click());

            fileInput.addEventListener('change', (e) => {
                const file = e.target.files[0];
                if (file) {
                    const reader = new FileReader();
                    reader.onload = (event) => {
                        const imageData = event.target.result;
                        projectImage.style.backgroundImage = `url('${imageData}')`;
                        projectImage.style.backgroundColor = 'transparent';

                        // Save to localStorage
                        try {
                            localStorage.setItem(`project_image_${index}`, imageData);
                        } catch (err) {
                            console.warn("Storage limit might be exceeded for high-res images.");
                        }
                    };
                    reader.readAsDataURL(file);
                }
            });

            fileInput.addEventListener('click', (e) => e.stopPropagation());
        }
    });
};

// Initialize
window.addEventListener('load', () => {
    initHeroAnimation();
    initScrollAnimations();

    initCursor();
    initParallax();
    initScatterText(); // Enabled smoke effect
    initImageUpload();
    initProjectCardUpload(); // Init Project Uploads
});
