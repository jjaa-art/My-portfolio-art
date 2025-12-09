// Register GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Hero Animation
const initHeroAnimation = () => {
    const tl = gsap.timeline();

    tl.from(".hero-title .line", {
        y: 100,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power4.out"
    })
        .from(".hero-subtitle", {
            y: 20,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out"
        }, "-=0.5")
        .from(".navbar", {
            y: -50,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out"
        }, "-=0.8");
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

// Initialize
window.addEventListener('load', () => {
    initHeroAnimation();
    initScrollAnimations();
    initModal();
    initCursor();
    initParallax();
});
