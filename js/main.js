// Register GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Hero Animation
// Hero Animation (Vintage Projector)
const initHeroAnimation = () => {
    // Navbar entrance
    gsap.from(".navbar", {
        y: -20,
        opacity: 0,
        duration: 1.5,
        ease: "power2.out",
        delay: 0.5
    });

    // Projector Beam Effect for Title
    const title = document.querySelector('.hero-title');
    const subtitle = document.querySelector('.hero-subtitle');

    // Add class to trigger CSS animation
    setTimeout(() => {
        if (title) title.classList.add('projector-active');
    }, 500); // Slight delay for dramatic effect

    // Subtitle fade in slowly after title
    gsap.to(subtitle, {
        opacity: 1,
        duration: 2,
        delay: 2.5, // Wait for title beam to stabilize
        ease: "power2.out"
    });
};

// Scroll Animations
const initScrollAnimations = () => {
    // About Section
    gsap.from(".about-text", {
        scrollTrigger: {
            trigger: ".about-section",
            start: "top 80%",
            toggleActions: "play none none reverse"
        },
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out"
    });

    gsap.from(".visual-box", {
        scrollTrigger: {
            trigger: ".about-section",
            start: "top 80%",
        },
        scale: 0.9,
        opacity: 0,
        duration: 1.2,
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
    const targets = document.querySelectorAll('.scatter-text');

    targets.forEach(target => {
        // Split text into characters
        const text = target.innerText;
        target.innerHTML = '';

        // Wrap each character in a span
        [...text].forEach(char => {
            const span = document.createElement('span');
            span.innerText = char;
            span.classList.add('char');
            if (char === ' ') span.style.width = '0.3em'; // Preserve space width
            target.appendChild(span);

            // Add random scatter effect on hover
            // We use JS to set random values to CSS variables or direct styles for the 'hover' state logic
            // But since CSS :hover can't easily use random numbers per element without JS pre-calculation,
            // we'll add event listeners to the PARENT (target) to trigger the children.
        });

        target.addEventListener('mouseenter', () => {
            const chars = target.querySelectorAll('.char');
            chars.forEach(char => {
                // Random values for scatter
                // x: -10 to 10px, y: -10 to 10px, rotate: -20 to 20deg
                const x = (Math.random() - 0.5) * 30;
                const y = (Math.random() - 0.5) * 30;
                const r = (Math.random() - 0.5) * 40;

                char.style.transform = `translate(${x}px, ${y}px) rotate(${r}deg)`;
                // Optional: Random color/opacity change
                // char.style.opacity = 0.7 + Math.random() * 0.3;
            });
        });

        target.addEventListener('mouseleave', () => {
            const chars = target.querySelectorAll('.char');
            chars.forEach(char => {
                char.style.transform = 'translate(0, 0) rotate(0)';
            });
        });
    });
};

// Image Upload Logic
const initImageUpload = () => {
    const input = document.getElementById('imageUpload');
    const visualBox = document.getElementById('visual-box');

    if (input && visualBox) {
        input.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (event) => {
                    visualBox.style.backgroundImage = `url(${event.target.result})`;
                    // Remove placeholder background color if needed, or let bg-image cover it
                    visualBox.style.backgroundColor = 'transparent';
                };
                reader.readAsDataURL(file);
            }
        });
    }
};

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
