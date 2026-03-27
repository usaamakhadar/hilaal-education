document.addEventListener('DOMContentLoaded', () => {
    // --- LANGUAGE SWITCHER LOGIC ---
    const langSelect = document.getElementById('lang-select');
    let currentLang = localStorage.getItem('hilaal_lang') || 'so'; // Default language
    
    // Set initial value in dropdown
    langSelect.value = currentLang;
    
    // Apply translation on load
    applyTranslation(currentLang);

    // Event listener for dropdown changes
    langSelect.addEventListener('change', (e) => {
        const newLang = e.target.value;
        currentLang = newLang;
        localStorage.setItem('hilaal_lang', newLang);
        applyTranslation(newLang);
    });

    function applyTranslation(lang) {
        document.documentElement.lang = lang;
        
        // Setup RTL or LTR
        if (lang === 'ar') {
            document.documentElement.dir = 'rtl';
            document.body.classList.add('rtl-mode');
        } else {
            document.documentElement.dir = 'ltr';
            document.body.classList.remove('rtl-mode');
        }

        // Apply text to data-i18n elements
        const elements = document.querySelectorAll('[data-i18n]');
        elements.forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (translations[lang] && translations[lang][key]) {
                el.innerHTML = translations[lang][key];
            }
        });

        // Apply placeholders
        const placeholderElements = document.querySelectorAll('[data-i18n-placeholder]');
        placeholderElements.forEach(el => {
            const key = el.getAttribute('data-i18n-placeholder');
            if (translations[lang] && translations[lang][key]) {
                el.setAttribute('placeholder', translations[lang][key]);
            }
        });
    }

    // --- MOBILE MENU LOGIC ---
    const mobileToggle = document.getElementById('mobile-toggle');
    const navLinks = document.querySelector('.nav-links');
    const mobileToggleIcon = mobileToggle.querySelector('i');

    mobileToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        if (navLinks.classList.contains('active')) {
            mobileToggleIcon.classList.remove('fa-bars');
            mobileToggleIcon.classList.add('fa-times');
        } else {
            mobileToggleIcon.classList.remove('fa-times');
            mobileToggleIcon.classList.add('fa-bars');
        }
    });

    // Close mobile menu when a link is clicked
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            mobileToggleIcon.classList.remove('fa-times');
            mobileToggleIcon.classList.add('fa-bars');
        });
    });

    // --- STICKY HEADER LOGIC ---
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // --- SCROLL SPY LOGIC ---
    // Make the first section active initially
    window.dispatchEvent(new Event('scroll'));

    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - sectionHeight / 3)) {
                current = section.getAttribute('id');
            }
        });

        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${current}`) {
                item.classList.add('active');
            }
        });
    });

    // --- SCROLL REVEAL ANIMATIONS ---
    const revealElements = document.querySelectorAll('.service-card, .about-content, .contact-item');
    
    // Initial hide
    revealElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s cubic-bezier(0.25, 0.8, 0.25, 1)';
    });

    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        const revealPoint = 100;

        revealElements.forEach(el => {
            const revealTop = el.getBoundingClientRect().top;
            if (revealTop < windowHeight - revealPoint) {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }
        });
    };

    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // trigger once on load

    // --- WHATSAPP FORM SUBMISSION ---
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const phone = document.getElementById('phone').value;
            const message = document.getElementById('message').value;
            
            const text = `New Inquiry from Web:\n\nName: ${name}\nEmail: ${email}\nPhone: ${phone}\n\nMessage: ${message}`;
            
            const encodedText = encodeURIComponent(text);
            const whatsappNumber = "601162355194"; // WhatsApp number
            window.open(`https://wa.me/${whatsappNumber}?text=${encodedText}`, '_blank');
        });
    }
});
