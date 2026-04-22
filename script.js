document.addEventListener('DOMContentLoaded', () => {
    
    // Sticky Navbar
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('sticky');
        } else {
            navbar.classList.remove('sticky');
        }
    });

    // Mobile Menu Toggle
    const mobileToggle = document.getElementById('mobile-toggle');
    const navLinks = document.getElementById('nav-links');
    
    mobileToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        mobileToggle.querySelector('i').classList.toggle('fa-bars');
        mobileToggle.querySelector('i').classList.toggle('fa-times');
    });

    // Close menu when clicking a link
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            mobileToggle.querySelector('i').classList.add('fa-bars');
            mobileToggle.querySelector('i').classList.remove('fa-times');
        });
    });

    // Intersection Observer for Reveal Animations
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                
                // Trigger counter if this is a stat item
                if (entry.target.classList.contains('stat-item')) {
                    startCounter(entry.target.querySelector('.counter'));
                }
            }
        });
    }, observerOptions);

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

    // Animated Counters
    function startCounter(el) {
        if (!el || el.dataset.started) return;
        el.dataset.started = true;
        
        const target = +el.dataset.target;
        const speed = 200; // Lower is faster
        const inc = target / speed;

        const updateCount = () => {
            const count = +el.innerText;
            if (count < target) {
                el.innerText = Math.ceil(count + inc);
                setTimeout(updateCount, 1);
            } else {
                el.innerText = target + '+';
            }
        };
        updateCount();
    }

    // FAQ Accordion
    document.querySelectorAll('.faq-header').forEach(header => {
        header.addEventListener('click', () => {
            const item = header.parentElement;
            item.classList.toggle('active');
            
            // Close other items
            document.querySelectorAll('.faq-item').forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
        });
    });

    // Before/After Slider
    const slider = document.querySelector('.ba-slider');
    if (slider) {
        const afterImg = slider.querySelector('.after');
        const handle = slider.querySelector('.slider-handle');
        
        const moveSlider = (e) => {
            const rect = slider.getBoundingClientRect();
            let x = (e.pageX || e.touches[0].pageX) - rect.left - window.scrollX;
            
            if (x < 0) x = 0;
            if (x > rect.width) x = rect.width;
            
            const percent = (x / rect.width) * 100;
            afterImg.style.width = `${percent}%`;
            handle.style.left = `${percent}%`;
        };

        slider.addEventListener('mousemove', moveSlider);
        slider.addEventListener('touchmove', moveSlider);
    }

    // Smooth Scroll for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
});
