// Loading Screen
window.addEventListener('load', function() {
    const loadingScreen = document.getElementById('loading-screen');
    setTimeout(() => {
        loadingScreen.style.opacity = '1';
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 500);
    }, 3000);
});

// Header Scroll Effect
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', function() {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = target.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Hero Slider
let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');
const totalSlides = slides.length;

function showSlide(index) {
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    slides[index].classList.add('active');
    dots[index].classList.add('active');
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    showSlide(currentSlide);
}

function prevSlide() {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    showSlide(currentSlide);
}

// Auto slide
setInterval(nextSlide, 5000);

// Manual controls
document.querySelector('.next-btn').addEventListener('click', nextSlide);
document.querySelector('.prev-btn').addEventListener('click', prevSlide);

// Dot navigation
dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        currentSlide = index;
        showSlide(currentSlide);
    });
});

// Animated Counter
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-count'));
        const duration = 2000; // 2 seconds
        const increment = target / (duration / 16); // 60fps
        let current = 0;
        
        const updateCounter = () => {
            if (current < target) {
                current += increment;
                counter.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        };
        
        updateCounter();
    });
}

// Intersection Observer for Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            
            // Trigger counter animation when stats section is visible
            if (entry.target.classList.contains('hero-stats')) {
                animateCounters();
            }
        }
    });
}, observerOptions);

// Add animation classes and observe elements
document.addEventListener('DOMContentLoaded', function() {
    // Add animation classes to elements
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach((card, index) => {
        card.classList.add('fade-in');
        card.style.transitionDelay = `${index * 0.1}s`;
    });
    
    const valueCards = document.querySelectorAll('.value-card');
    valueCards.forEach((card, index) => {
        card.classList.add('scale-in');
        card.style.transitionDelay = `${index * 0.1}s`;
    });
    
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach((card, index) => {
        card.classList.add('slide-in-left');
        card.style.transitionDelay = `${index * 0.1}s`;
    });
    
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach((card, index) => {
        card.classList.add('fade-in');
        card.style.transitionDelay = `${index * 0.1}s`;
    });
    
    const contactCards = document.querySelectorAll('.contact-card');
    contactCards.forEach((card, index) => {
        card.classList.add('fade-in');
        card.style.transitionDelay = `${index * 0.1}s`;
    });
    
    // Observe elements for animation
    const elementsToObserve = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right, .scale-in, .hero-stats');
    elementsToObserve.forEach(element => {
        observer.observe(element);
    });
});

// Contact Form Handling
const contactForm = document.getElementById('contact-form');

contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const service = document.getElementById('service').value;
    const message = document.getElementById('message').value;
    
    // Basic validation
    if (!name || !email || !phone || !service) {
        alert('Please fill in all required fields.');
        return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Please enter a valid email address.');
        return;
    }
    
    // Phone validation
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    if (!phoneRegex.test(phone.replace(/\s/g, ''))) {
        alert('Please enter a valid phone number.');
        return;
    }
    
    // Success message
    alert('Thank you for your inquiry! We will contact you soon to discuss your project requirements.');
    
    // Reset form
    this.reset();
    
    // Remove focus from form elements
    document.querySelectorAll('.form-group input, .form-group select, .form-group textarea').forEach(element => {
        element.blur();
    });
});

// Scroll to Top Button
const scrollToTopBtn = document.getElementById('scrollToTop');

window.addEventListener('scroll', function() {
    if (window.pageYOffset > 300) {
        scrollToTopBtn.classList.add('show');
    } else {
        scrollToTopBtn.classList.remove('show');
    }
});

scrollToTopBtn.addEventListener('click', function() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Form Label Animation
document.querySelectorAll('.form-group input, .form-group select, .form-group textarea').forEach(element => {
    element.addEventListener('blur', function() {
        if (this.value !== '') {
            this.classList.add('has-value');
        } else {
            this.classList.remove('has-value');
        }
    });
});

// Button Click Handlers
document.querySelectorAll('.contact-btn, .btn-primary').forEach(button => {
    button.addEventListener('click', function(e) {
        if (this.textContent.includes('Contact') || this.textContent.includes('Get Quote')) {
            e.preventDefault();
            const contactSection = document.getElementById('contact');
            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = contactSection.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
            
            // Focus on the name input after scrolling
            setTimeout(() => {
                document.getElementById('name').focus();
            }, 1000);
        }
    });
});

// View Services/Projects Button Functionality
document.querySelectorAll('.btn-secondary').forEach(button => {
    button.addEventListener('click', function(e) {
        if (this.textContent.includes('View Projects')) {
            e.preventDefault();
            const projectsSection = document.getElementById('ongoing');
            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = projectsSection.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        } else if (this.textContent.includes('View Services')) {
            e.preventDefault();
            const servicesSection = document.getElementById('services');
            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = servicesSection.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Add hover effects to cards
document.querySelectorAll('.service-card, .value-card, .feature-card, .project-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Parallax Effect for Hero Section
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const heroBackground = document.querySelector('.slide.active .slide-bg');
    const rate = scrolled * -0.5;
    
    if (heroBackground) {
        heroBackground.style.transform = `translateY(${rate}px)`;
    }
});

// Add progress bar animation for ongoing projects
function animateProgressBars() {
    const progressBars = document.querySelectorAll('.project-progress .progress');
    
    progressBars.forEach(bar => {
        const width = bar.style.width;
        bar.style.width = '0%';
        setTimeout(() => {
            bar.style.width = width;
        }, 500);
    });
}

// Trigger progress bar animation when projects section is visible
const projectsObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateProgressBars();
        }
    });
}, { threshold: 0.5 });

const ongoingProjectsSection = document.querySelector('.ongoing-projects');
if (ongoingProjectsSection) {
    projectsObserver.observe(ongoingProjectsSection);
}

// Add typing effect to hero titles
function typeWriter(element, text, speed = 100) {
    element.innerHTML = '';
    let i = 0;
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Add floating animation to value cards
document.querySelectorAll('.value-card').forEach((card, index) => {
    card.style.animationDelay = `${index * 0.2}s`;
    card.classList.add('float-animation');
});

// CSS for floating animation (added via JavaScript)
const style = document.createElement('style');
style.textContent = `
    @keyframes floatCard {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-5px); }
    }
    
    .float-animation {
        animation: floatCard 4s ease-in-out infinite;
    }
`;
document.head.appendChild(style);

// Add progress indicator for page scroll
const progressBar = document.createElement('div');
progressBar.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 0%;
    height: 3px;
    background: linear-gradient(135deg, #1e3c72, #2a5298);
    z-index: 10001;
    transition: width 0.1s ease;
`;
document.body.appendChild(progressBar);

window.addEventListener('scroll', function() {
    const scrollTop = window.pageYOffset;
    const docHeight = document.body.offsetHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    progressBar.style.width = scrollPercent + '%';
});

// Add mouse move parallax effect for floating elements
document.addEventListener('mousemove', function(e) {
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;
    
    const floatingElements = document.querySelectorAll('.value-icon, .service-icon, .feature-icon');
    floatingElements.forEach((element, index) => {
        const speed = (index + 1) * 0.02;
        const x = (mouseX - 0.5) * 10 * speed;
        const y = (mouseY - 0.5) * 10 * speed;
        
        element.style.transform = `translate(${x}px, ${y}px)`;
    });
});

// Initialize AOS-like animations
function initAnimations() {
    const animatedElements = document.querySelectorAll('[data-animate]');
    
    const animationObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const animationType = entry.target.getAttribute('data-animate');
                entry.target.classList.add(`animate-${animationType}`);
            }
        });
    }, { threshold: 0.1 });
    
    animatedElements.forEach(element => {
        animationObserver.observe(element);
    });
}

// Call initialization functions
document.addEventListener('DOMContentLoaded', function() {
    initAnimations();
});