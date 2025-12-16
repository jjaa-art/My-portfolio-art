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
    // Parallax Effect for About Text (Anti-Gravity floating feel)
    gsap.to(".parallax-text", {
        scrollTrigger: {
            trigger: ".about-section",
            start: "top bottom",
            end: "bottom top",
            scrub: 1.5 // Smooth catch-up
        },
        y: -100, // Moves up while scrolling (floating up)
        ease: "none"
    });

    // About Visual Entrance
    gsap.from(".about-visual", {
        scrollTrigger: {
            trigger: ".about-section",
            start: "top 70%",
        },
        y: 100,
        opacity: 0,
        duration: 1.5,
        ease: "power3.out"
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

// Modal Logic
const initModal = () => {
    const modal = document.getElementById('projectModal');
    const closeBtn = document.querySelector('.close-modal');
    const projectCards = document.querySelectorAll('.project-card');

    // Elements to update in modal
    const modalTitle = modal.querySelector('.modal-title');
    const modalDesc = modal.querySelector('.modal-description');
    const modalImg = modal.querySelector('.modal-image');

    // Mock Data (In a real app, this could be an array of objects)
    const projectDetails = {
        "Immersive Gallery": {
            desc: "A WebGL-powered 3D gallery experience allowing users to navigate through a virtual art space. Built with Three.js and GSAP.",
            imgColor: "#FF9A9E" // Placeholder color
        },
        "Brand Identity": {
            desc: "Complete digital rebranding for a fashion tech startup. Focused on interactive storytelling and micro-interactions to convey luxury.",
            imgColor: "#FECFEF"
        },
        "E-Commerce Motion": {
            desc: "High-conversion e-commerce landing page featuring scroll-triggered product reveals and seamless page transitions.",
            imgColor: "#E0C097"
        }
    };

    projectCards.forEach(card => {
        card.addEventListener('click', () => {
            const title = card.querySelector('h3').innerText;
            const details = projectDetails[title] || { desc: "Detailed project description coming soon.", imgColor: "#ddd" };

            modalTitle.innerText = title;
            modalDesc.innerText = details.desc;
            modalImg.style.backgroundColor = details.imgColor; // Using color as placeholder

            modal.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent background scrolling
        });
    });

    closeBtn.addEventListener('click', () => {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    });

    // Close on outside click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
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
const initScatterText = () => {
    // 1. General Scatter (About, Skills, etc.) - Existing Logic
    const generalTargets = document.querySelectorAll('.scatter-text');
    generalTargets.forEach(target => {
        const text = target.innerText;
        target.innerHTML = '';
        [...text].forEach(char => {
            const span = document.createElement('span');
            span.innerText = char;
            span.classList.add('char');
            if (char === ' ') span.style.width = '0.3em';
            target.appendChild(span);
        });
        target.addEventListener('mouseenter', () => {
            target.querySelectorAll('.char').forEach(char => {
                const x = (Math.random() - 0.5) * 30;
                const y = (Math.random() - 0.5) * 30;
                const r = (Math.random() - 0.5) * 40;
                char.style.transform = `translate(${x}px, ${y}px) rotate(${r}deg)`;
            });
        });
        target.addEventListener('mouseleave', () => {
            target.querySelectorAll('.char').forEach(char => {
                char.style.transform = 'translate(0, 0) rotate(0)';
            });
        });
    });

    // 2. Burning Text Effect (Hero Title)
    const heroTitleContainer = document.querySelector('.hero-title');
    if (heroTitleContainer) {
        // Prepare text
        const lines = heroTitleContainer.querySelectorAll('.line');
        lines.forEach(line => {
            const text = line.innerText;
            line.innerHTML = '';
            [...text].forEach(char => {
                const span = document.createElement('span');
                span.innerText = char;
                span.classList.add('char');
                if (char === ' ') span.style.width = '0.3em';
                line.appendChild(span);
            });
        });

        // Hover Effect - Fire/Smoke Simulation
        heroTitleContainer.addEventListener('mouseenter', () => {
            heroTitleContainer.classList.add('scatter-active');
            const chars = heroTitleContainer.querySelectorAll('.char');
            chars.forEach(char => {
                // Smoke logic: Strong upward movement, slight drift
                const x = (Math.random() - 0.5) * 60; // Narrower horizontal drift
                const y = -100 - Math.random() * 100; // Move UP (-100 to -200px)
                const r = (Math.random() - 0.5) * 45; // Slight rotation
                const scale = 1 + Math.random() * 0.5; // Expand slightly like gas

                char.style.transform = `translate(${x}px, ${y}px) rotate(${r}deg) scale(${scale})`;
            });
        });

        heroTitleContainer.addEventListener('mouseleave', () => {
            heroTitleContainer.classList.remove('scatter-active');
            const chars = heroTitleContainer.querySelectorAll('.char');
            chars.forEach(char => {
                char.style.transform = 'translate(0, 0) rotate(0) scale(1)';
            });
        });
    }
};

// Image Upload Logic removed (Duplicate)

// Initialize
window.addEventListener('load', () => {
    initHeroAnimation();
    initScrollAnimations();
    initModal();
    initCursor();
    initParallax();
    initScatterText();
    initImageUpload();
});
