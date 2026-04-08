/**
 * Portfolio Website - JavaScript
 * Author: Dark Prince Samim
 * Description: Smooth animations, form validation, and interactive features
 */

// ============================================
// DOM Elements
// ============================================
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');
const contactForm = document.getElementById('contactForm');
const sections = document.querySelectorAll('section[id]');

// ============================================
// Navbar Scroll Effect
// ============================================
function handleNavbarScroll() {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
}

// ============================================
// Mobile Navigation Toggle
// ============================================
function toggleMobileMenu() {
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
    document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
}

function closeMobileMenu() {
    navToggle.classList.remove('active');
    navMenu.classList.remove('active');
    document.body.style.overflow = '';
}

// ============================================
// Smooth Scroll Navigation
// ============================================
function handleNavClick(e) {
    const link = e.target.closest('.nav-link');
    if (!link) return;

    e.preventDefault();
    const targetId = link.getAttribute('href');
    const targetSection = document.querySelector(targetId);

    if (targetSection) {
        const navbarHeight = navbar.offsetHeight;
        const targetPosition = targetSection.offsetTop - navbarHeight;

        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });

        // Close mobile menu if open
        closeMobileMenu();

        // Update active link
        updateActiveNavLink();
    }
}

// ============================================
// Active Navigation Link on Scroll
// ============================================
function updateActiveNavLink() {
    const scrollPosition = window.scrollY + navbar.offsetHeight + 100;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

// ============================================
// Scroll Reveal Animation
// ============================================
function initScrollReveal() {
    const revealElements = document.querySelectorAll(
        '.skill-card, .project-card, .testimonial-card, .timeline-item, .contact-item'
    );

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal', 'active');
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach((el, index) => {
        el.style.transitionDelay = `${index * 0.1}s`;
        revealObserver.observe(el);
    });
}

// ============================================
// Contact Form Validation & Submission
// ============================================
const formValidation = {
    name: {
        required: true,
        minLength: 2,
        pattern: /^[a-zA-Z\s]+$/,
        message: 'Please enter a valid name (at least 2 characters)'
    },
    email: {
        required: true,
        pattern: /^[^\s@]+@gmail\.com$/,
        message: 'Please enter a valid Gmail address (e.g., yourname@gmail.com)'
    },
    subject: {
        required: true,
        minLength: 3,
        message: 'Please enter a subject (at least 3 characters)'
    },
    message: {
        required: true,
        minLength: 10,
        message: 'Please enter a message (at least 10 characters)'
    }
};

function validateField(field, rules) {
    const value = field.value.trim();
    const formGroup = field.closest('.form-group');
    const errorElement = formGroup.querySelector('.error-message');

    // Reset error state
    formGroup.classList.remove('error');
    errorElement.classList.remove('show');

    // Check required
    if (rules.required && !value) {
        showError(formGroup, errorElement, 'This field is required');
        return false;
    }

    // Check min length
    if (rules.minLength && value.length < rules.minLength) {
        showError(formGroup, errorElement, rules.message);
        return false;
    }

    // Check pattern
    if (rules.pattern && !rules.pattern.test(value)) {
        showError(formGroup, errorElement, rules.message);
        return false;
    }

    return true;
}

function showError(formGroup, errorElement, message) {
    formGroup.classList.add('error');
    errorElement.textContent = message;
    errorElement.classList.add('show');
}

function handleFormSubmit(e) {
    e.preventDefault();

    const formData = new FormData(contactForm);
    let isValid = true;

    // Validate all fields
    Object.keys(formValidation).forEach(fieldName => {
        const field = document.getElementById(fieldName);
        const rules = formValidation[fieldName];

        if (!validateField(field, rules)) {
            isValid = false;
        }
    });

    if (isValid) {
        submitForm();
    }
}

function submitForm() {
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const formSuccess = document.getElementById('formSuccess');

    // Show loading state
    submitBtn.classList.add('loading');
    submitBtn.disabled = true;

    // Simulate form submission (replace with actual API call)
    setTimeout(() => {
        // Hide loading state
        submitBtn.classList.remove('loading');
        submitBtn.disabled = false;

        // Show success message
        formSuccess.classList.add('show');

        // Reset form
        contactForm.reset();

        // Hide success message after 5 seconds
        setTimeout(() => {
            formSuccess.classList.remove('show');
        }, 5000);
    }, 1500);
}

// Real-time validation
function initRealTimeValidation() {
    Object.keys(formValidation).forEach(fieldName => {
        const field = document.getElementById(fieldName);
        const rules = formValidation[fieldName];

        field.addEventListener('blur', () => {
            validateField(field, rules);
        });

        field.addEventListener('input', () => {
            const formGroup = field.closest('.form-group');
            if (formGroup.classList.contains('error')) {
                validateField(field, rules);
            }
        });
    });
}

// ============================================
// Stats Counter Animation
// ============================================
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = counter.textContent;
                const numericValue = parseInt(target);
                const suffix = target.replace(/[0-9]/g, '');

                animateCounter(counter, numericValue, suffix);
                counterObserver.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => counterObserver.observe(counter));
}

function animateCounter(element, target, suffix) {
    const duration = 2000;
    const start = 0;
    const startTime = performance.now();

    function updateCounter(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Easing function (ease-out)
        const easeOut = 1 - Math.pow(1 - progress, 3);
        const current = Math.floor(easeOut * target);

        element.textContent = current + suffix;

        if (progress < 1) {
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target + suffix;
        }
    }

    requestAnimationFrame(updateCounter);
}

// ============================================
// Parallax Effect for Hero Section
// ============================================
function initParallax() {
    const hero = document.querySelector('.hero');
    const heroContent = document.querySelector('.hero-content');

    if (!hero || !heroContent) return;

    // Skip parallax on touch devices
    if (window.matchMedia('(pointer: coarse)').matches) return;

    let ticking = false;

    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                const scrolled = window.pageYOffset;
                const rate = scrolled * 0.3;

                if (scrolled < hero.offsetHeight) {
                    heroContent.style.transform = `translateY(${rate}px)`;
                }

                ticking = false;
            });

            ticking = true;
        }
    }, { passive: true });
}

// ============================================
// Typing Effect for Hero Subtitle (Optional)
// ============================================
function initTypingEffect() {
    const subtitle = document.querySelector('.hero-subtitle');
    if (!subtitle) return;

    const text = subtitle.textContent;
    subtitle.textContent = '';
    subtitle.style.opacity = '1';

    let i = 0;
    const speed = 50;

    function typeWriter() {
        if (i < text.length) {
            subtitle.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, speed);
        }
    }

    // Start typing after a short delay
    setTimeout(typeWriter, 500);
}

// ============================================
// Back to Top Button (Optional Enhancement)
// ============================================
function initBackToTop() {
    const backToTopBtn = document.createElement('button');
    backToTopBtn.className = 'back-to-top';
    backToTopBtn.innerHTML = `
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M18 15l-6-6-6 6"/>
        </svg>
    `;
    backToTopBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 48px;
        height: 48px;
        background: linear-gradient(135deg, var(--primary-color) 0%, var(--primary-dark) 100%);
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: 0;
        visibility: hidden;
        transform: translateY(20px);
        transition: all 0.3s ease;
        box-shadow: 0 4px 14px rgba(99, 102, 241, 0.4);
        z-index: 999;
    `;

    backToTopBtn.querySelector('svg').style.cssText = `
        width: 24px;
        height: 24px;
    `;

    document.body.appendChild(backToTopBtn);

    // Show/hide button based on scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            backToTopBtn.style.opacity = '1';
            backToTopBtn.style.visibility = 'visible';
            backToTopBtn.style.transform = 'translateY(0)';
        } else {
            backToTopBtn.style.opacity = '0';
            backToTopBtn.style.visibility = 'hidden';
            backToTopBtn.style.transform = 'translateY(20px)';
        }
    }, { passive: true });

    // Scroll to top on click
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ============================================
// Performance: Debounce Function
// ============================================
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// ============================================
// Event Listeners
// ============================================
function initEventListeners() {
    // Navbar scroll
    window.addEventListener('scroll', debounce(() => {
        handleNavbarScroll();
        updateActiveNavLink();
    }, 10), { passive: true });

    // Mobile menu toggle
    navToggle.addEventListener('click', toggleMobileMenu);

    // Navigation links
    navMenu.addEventListener('click', handleNavClick);

    // Close mobile menu on resize
    window.addEventListener('resize', debounce(() => {
        if (window.innerWidth > 768) {
            closeMobileMenu();
        }
    }, 100));

    // Contact form
    if (contactForm) {
        contactForm.addEventListener('submit', handleFormSubmit);
        initRealTimeValidation();
    }

    // Smooth scroll for all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    const navbarHeight = navbar.offsetHeight;
                    const targetPosition = target.offsetTop - navbarHeight;
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
}

// ============================================
// Initialize Everything
// ============================================
function init() {
    // Initial navbar state
    handleNavbarScroll();

    // Initialize all features
    initEventListeners();
    initScrollReveal();
    animateCounters();
    initParallax();
    initBackToTop();
    initSecurityProtections();

    // Optional: Typing effect (uncomment if desired)
    // initTypingEffect();

    console.log('Portfolio website initialized successfully!');
}

// ============================================
// Security: Prevent Screenshots and Image Downloads
// ============================================
function initSecurityProtections() {
    // Disable right-click context menu
    document.addEventListener('contextmenu', (e) => {
        e.preventDefault();
        return false;
    });

    // Prevent image dragging
    document.addEventListener('dragstart', (e) => {
        if (e.target.tagName === 'IMG') {
            e.preventDefault();
            return false;
        }
    });

    // Disable keyboard shortcuts for screenshots and developer tools
    document.addEventListener('keydown', (e) => {
        // Prevent Print Screen
        if (e.key === 'PrintScreen') {
            e.preventDefault();
            return false;
        }

        // Prevent Ctrl+Shift+I (Dev Tools)
        if (e.ctrlKey && e.shiftKey && e.key === 'I') {
            e.preventDefault();
            return false;
        }

        // Prevent Ctrl+U (View Source)
        if (e.ctrlKey && e.key === 'u') {
            e.preventDefault();
            return false;
        }

        // Prevent F12 (Dev Tools)
        if (e.key === 'F12') {
            e.preventDefault();
            return false;
        }
    });

    // Prevent selection of images and text (makes screenshot harder)
    document.addEventListener('selectstart', (e) => {
        if (e.target.tagName === 'IMG' || e.target.closest('img')) {
            e.preventDefault();
            return false;
        }
    });

    // Add CSS class to body for additional styling
    document.body.classList.add('protected-content');

    // Detect developer tools
    let devtoolsOpen = false;
    const threshold = 160;

    const detectDevTools = () => {
        if (window.outerHeight - window.innerHeight > threshold || window.outerWidth - window.innerWidth > threshold) {
            if (!devtoolsOpen) {
                devtoolsOpen = true;
                alert('Developer tools detected. This action is not allowed on this website.');
                // Optional: redirect or disable functionality
                // window.location.href = 'about:blank';
            }
        } else {
            devtoolsOpen = false;
        }
    };

    // Check for dev tools periodically
    setInterval(detectDevTools, 500);

    // Prevent copying images to clipboard
    document.addEventListener('copy', (e) => {
        const selection = window.getSelection();
        if (selection.rangeCount > 0) {
            const range = selection.getRangeAt(0);
            const container = range.commonAncestorContainer;

            // Check if the selection contains images
            if (container.nodeType === Node.TEXT_NODE) {
                const parentElement = container.parentElement;
                if (parentElement && parentElement.querySelector('img')) {
                    e.preventDefault();
                    return false;
                }
            } else if (container.nodeType === Node.ELEMENT_NODE) {
                if (container.querySelector('img') || container.tagName === 'IMG') {
                    e.preventDefault();
                    return false;
                }
            }
        }
    });

    // Prevent saving images via drag and drop
    document.addEventListener('drop', (e) => {
        e.preventDefault();
        return false;
    });
}

// Run initialization when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}