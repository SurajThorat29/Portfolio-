document.addEventListener('DOMContentLoaded', () => {

    // --- TYPING ANIMATION ---
    gsap.registerPlugin(TextPlugin);
    const typingText = document.querySelector('.typing-text');
    if (typingText) {
        const words = ["Modern Website.", "Digital Experiences.", "UI/UX Design."];
        
        // Calculate max width to prevent layout shift
        let maxWidth = 0;
        words.forEach(word => {
            typingText.textContent = word;
            const width = typingText.offsetWidth;
            if (width > maxWidth) maxWidth = width;
        });
        typingText.style.width = `${maxWidth + 10}px`;
        typingText.textContent = "";

        let masterTl = gsap.timeline({repeat: -1});

        words.forEach(word => {
            let tl = gsap.timeline({repeat: 1, yoyo: true, repeatDelay: 1.2});
            tl.to(typingText, {
                duration: 1.5, 
                text: word,
                ease: "none"
            });
            masterTl.add(tl);
        });
    }

    // --- MAGNETIC CURSOR ---
    const cursor = document.querySelector('.cursor');
    const magneticLinks = document.querySelectorAll('.magnetic-link');
    const isTouchDevice = 'ontouchstart' in window;

    if (!isTouchDevice) {
        gsap.set(cursor, { xPercent: -50, yPercent: -50 });

        let xTo = gsap.quickTo(cursor, "x", { duration: 0.6, ease: "power3" });
        let yTo = gsap.quickTo(cursor, "y", { duration: 0.6, ease: "power3" });

        window.addEventListener("mousemove", e => {
            xTo(e.clientX);
            yTo(e.clientY);
        });

        magneticLinks.forEach(link => {
            const linkRect = link.getBoundingClientRect();

            link.addEventListener('mouseenter', () => {
                gsap.to(cursor, {
                    width: 60,
                    height: 60,
                    duration: 0.3,
                    ease: 'power3'
                });
            });

            link.addEventListener('mouseleave', () => {
                gsap.to(cursor, {
                    width: 30,
                    height: 30,
                    duration: 0.3,
                    ease: 'power3'
                });
            });
        });
    } else {
        if (cursor) cursor.style.display = 'none';
    }


    // --- SCROLL-BASED FADE-IN ANIMATIONS ---
    const animatedElements = document.querySelectorAll('.section-title, .bento-item, .project-card, .testimonial-item, .contact-info, .contact-form, .timeline-item');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    animatedElements.forEach(el => {
        observer.observe(el);
    });

    // --- TESTIMONIALS & SKILLS SCROLLER PAUSE ON HOVER ---
    const scrollers = document.querySelectorAll('.marquee, .testimonial-scroller');
    scrollers.forEach(scroller => {
        scroller.addEventListener('mouseenter', () => {
            const inner = scroller.querySelector('.marquee-content, .testimonial-list');
            if (inner) inner.style.animationPlayState = 'paused';
        });
        scroller.addEventListener('mouseleave', () => {
            const inner = scroller.querySelector('.marquee-content, .testimonial-list');
            if (inner) inner.style.animationPlayState = 'running';
        });
    });


});
