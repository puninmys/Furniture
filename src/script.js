// Main JavaScript functionality
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    // Initialize all components
    initializeTheme();
    initializeNavigation();
    initializeStickyElements();
    initializeScrollAnimations();
    initializeCounters();
    initializeTradingSignals();
    initializeContactForm();
    initializeSmoothScroll();
    initializeIntersectionObserver();
}

// Theme Management
function initializeTheme() {
    const themeToggle = document.getElementById('theme-toggle');
    const html = document.documentElement;
    
    // Check for saved theme or default to light
    const savedTheme = localStorage.getItem('theme') || 'light';
    html.setAttribute('data-theme', savedTheme);
    
    themeToggle.addEventListener('click', function() {
        const currentTheme = html.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        html.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        
        // Add animation class
        themeToggle.style.transform = 'scale(0.8)';
        setTimeout(() => {
            themeToggle.style.transform = 'scale(1)';
        }, 150);
    });
}

// Navigation
function initializeNavigation() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const header = document.querySelector('.header');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Mobile menu toggle
    navToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        
        // Animate hamburger menu
        const spans = navToggle.querySelectorAll('span');
        spans.forEach((span, index) => {
            span.style.transform = navMenu.classList.contains('active') 
                ? `rotate(${index === 0 ? '45deg' : index === 1 ? '0deg' : '-45deg'}) translate(${index === 1 ? '10px' : '0'}, ${index === 0 ? '7px' : index === 2 ? '-7px' : '0'})`
                : 'none';
            span.style.opacity = index === 1 && navMenu.classList.contains('active') ? '0' : '1';
        });
    });
    
    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            const spans = navToggle.querySelectorAll('span');
            spans.forEach(span => {
                span.style.transform = 'none';
                span.style.opacity = '1';
            });
        });
    });
    
    // Header scroll effect
    let lastScrollTop = 0;
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        lastScrollTop = scrollTop;
    });
    
    // Active navigation link
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPos = window.pageYOffset + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });
}

// Sticky Elements
function initializeStickyElements() {
    const stickyCta = document.getElementById('sticky-cta');
    
    window.addEventListener('scroll', function() {
        const scrollPercentage = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
        
        if (scrollPercentage > 20) {
            stickyCta.classList.add('visible');
        } else {
            stickyCta.classList.remove('visible');
        }
    });
}

// Scroll Animations
function initializeScrollAnimations() {
    const animatedElements = document.querySelectorAll('.fade-in-on-scroll, .slide-in-left-on-scroll, .slide-in-right-on-scroll, .zoom-in-on-scroll');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    animatedElements.forEach(element => {
        observer.observe(element);
    });
}

// Animated Counters
function initializeCounters() {
    const counters = document.querySelectorAll('.stat-number[data-target]');
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-target'));
                animateCounter(counter, target);
                counterObserver.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
}

function animateCounter(element, target) {
    let current = 0;
    const increment = target / 50;
    const isPercentage = element.textContent.includes('%');
    const isFraction = element.textContent.includes('/');
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        
        if (isPercentage) {
            element.textContent = Math.floor(current) + '%';
        } else if (isFraction) {
            element.textContent = Math.floor(current) + '/7';
        } else {
            element.textContent = Math.floor(current).toLocaleString();
        }
    }, 40);
}

// Trading Signals
function initializeTradingSignals() {
    const signalList = document.getElementById('signal-list');
    
    if (signalList) {
        generateSignals();
        setInterval(updateSignals, 30000); // Update every 30 seconds
    }
}

function generateSignals() {
    const stocks = ['RELIANCE', 'TCS', 'INFY', 'HDFC', 'ICICIBANK', 'BAJFINANCE', 'ADANIPORTS', 'TATASTEEL', 'MARUTI', 'ASIANPAINT'];
    const actions = ['BUY', 'SELL', 'HOLD'];
    const signalList = document.getElementById('signal-list');
    
    signalList.innerHTML = '';
    
    for (let i = 0; i < 8; i++) {
        const stock = stocks[Math.floor(Math.random() * stocks.length)];
        const action = actions[Math.floor(Math.random() * actions.length)];
        const price = (Math.random() * 3000 + 500).toFixed(2);
        const change = (Math.random() * 10 - 5).toFixed(2);
        const time = new Date(Date.now() - Math.random() * 3600000).toLocaleTimeString('en-IN', {
            hour: '2-digit',
            minute: '2-digit'
        });
        
        const signalItem = document.createElement('div');
        signalItem.className = 'signal-item animate-fade-in-left';
        signalItem.innerHTML = `
            <div>
                <strong>${stock}</strong>
                <span class="badge badge-${action === 'BUY' ? 'success' : action === 'SELL' ? 'error' : 'info'}">${action}</span>
            </div>
            <div>
                <div>₹${price}</div>
                <div class="${change >= 0 ? 'green' : 'red'}">${change >= 0 ? '+' : ''}${change}%</div>
            </div>
            <div class="signal-time">${time}</div>
        `;
        
        signalList.appendChild(signalItem);
    }
}

function updateSignals() {
    const signalItems = document.querySelectorAll('.signal-item');
    signalItems.forEach((item, index) => {
        setTimeout(() => {
            item.style.opacity = '0';
            item.style.transform = 'translateX(-20px)';
            
            setTimeout(() => {
                // Update with new data
                const stocks = ['RELIANCE', 'TCS', 'INFY', 'HDFC', 'ICICIBANK', 'BAJFINANCE', 'ADANIPORTS', 'TATASTEEL', 'MARUTI', 'ASIANPAINT'];
                const actions = ['BUY', 'SELL', 'HOLD'];
                const stock = stocks[Math.floor(Math.random() * stocks.length)];
                const action = actions[Math.floor(Math.random() * actions.length)];
                const price = (Math.random() * 3000 + 500).toFixed(2);
                const change = (Math.random() * 10 - 5).toFixed(2);
                const time = new Date().toLocaleTimeString('en-IN', {
                    hour: '2-digit',
                    minute: '2-digit'
                });
                
                item.innerHTML = `
                    <div>
                        <strong>${stock}</strong>
                        <span class="badge badge-${action === 'BUY' ? 'success' : action === 'SELL' ? 'error' : 'info'}">${action}</span>
                    </div>
                    <div>
                        <div>₹${price}</div>
                        <div class="${change >= 0 ? 'green' : 'red'}">${change >= 0 ? '+' : ''}${change}%</div>
                    </div>
                    <div class="signal-time">${time}</div>
                `;
                
                item.style.opacity = '1';
                item.style.transform = 'translateX(0)';
            }, 300);
        }, index * 100);
    });
}

// Contact Form
function initializeContactForm() {
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData);
            
            // Show loading state
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.innerHTML = '<div class="loading-spinner"></div> Sending...';
            submitBtn.disabled = true;
            
            // Simulate form submission
            setTimeout(() => {
                // Show success message
                showAlert('Success! Your message has been sent. We\'ll get back to you soon.', 'success');
                
                // Reset form
                contactForm.reset();
                
                // Reset button
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 2000);
        });
    }
}

function showAlert(message, type = 'info') {
    const alert = document.createElement('div');
    alert.className = `alert alert-${type} animate-fade-in-down`;
    alert.innerHTML = `
        <span>${message}</span>
        <button onclick="this.parentElement.remove()" style="background: none; border: none; color: inherit; font-size: 1.2rem; cursor: pointer; margin-left: auto;">&times;</button>
    `;
    alert.style.position = 'fixed';
    alert.style.top = '20px';
    alert.style.right = '20px';
    alert.style.zIndex = '1000';
    alert.style.display = 'flex';
    alert.style.alignItems = 'center';
    alert.style.gap = '1rem';
    alert.style.maxWidth = '400px';
    
    document.body.appendChild(alert);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (alert.parentElement) {
            alert.style.opacity = '0';
            alert.style.transform = 'translateX(100%)';
            setTimeout(() => alert.remove(), 300);
        }
    }, 5000);
}

// Smooth Scroll
function initializeSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Intersection Observer for better performance
function initializeIntersectionObserver() {
    // Lazy load heavy content
    const lazyElements = document.querySelectorAll('[data-lazy]');
    
    const lazyObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const src = element.getAttribute('data-lazy');
                
                if (element.tagName === 'IMG') {
                    element.src = src;
                } else {
                    element.style.backgroundImage = `url(${src})`;
                }
                
                element.removeAttribute('data-lazy');
                lazyObserver.unobserve(element);
            }
        });
    });
    
    lazyElements.forEach(element => {
        lazyObserver.observe(element);
    });
    
    // Parallax effect for hero section
    const parallaxElements = document.querySelectorAll('.parallax');
    
    if (parallaxElements.length > 0) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            
            parallaxElements.forEach(element => {
                element.style.transform = `translateY(${rate}px)`;
            });
        });
    }
}

// Real-time clock
function updateClock() {
    const now = new Date();
    const timeString = now.toLocaleTimeString('en-IN', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    });
    
    const clockElements = document.querySelectorAll('.real-time-clock');
    clockElements.forEach(element => {
        element.textContent = timeString;
    });
}

// Update clock every second
setInterval(updateClock, 1000);

// Market status
function updateMarketStatus() {
    const now = new Date();
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();
    const currentTime = currentHour * 60 + currentMinute;
    
    // Market hours: 9:15 AM to 3:30 PM (IST)
    const marketOpen = 9 * 60 + 15; // 9:15 AM
    const marketClose = 15 * 60 + 30; // 3:30 PM
    
    const isMarketOpen = currentTime >= marketOpen && currentTime <= marketClose;
    const statusElements = document.querySelectorAll('.market-status');
    
    statusElements.forEach(element => {
        element.textContent = isMarketOpen ? 'Market Open' : 'Market Closed';
        element.className = `market-status badge ${isMarketOpen ? 'badge-success' : 'badge-error'}`;
    });
}

// Update market status every minute
updateMarketStatus();
setInterval(updateMarketStatus, 60000);

// Performance optimization
function optimizePerformance() {
    // Debounce scroll events
    let scrollTimeout;
    const originalScrollHandlers = [];
    
    window.addEventListener('scroll', function() {
        if (scrollTimeout) {
            clearTimeout(scrollTimeout);
        }
        
        scrollTimeout = setTimeout(() => {
            // Execute scroll handlers
            originalScrollHandlers.forEach(handler => handler());
        }, 16); // ~60fps
    });
    
    // Preload critical resources
    const criticalImages = [
        'https://images.pexels.com/photos/6801648/pexels-photo-6801648.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop'
    ];
    
    criticalImages.forEach(src => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.href = src;
        link.as = 'image';
        document.head.appendChild(link);
    });
}

// Initialize performance optimizations
optimizePerformance();

// Error handling
window.addEventListener('error', function(e) {
    console.error('Application error:', e.error);
    // Could send error reports to analytics service
});

// Accessibility improvements
function initializeAccessibility() {
    // Skip to main content link
    const skipLink = document.createElement('a');
    skipLink.href = '#main';
    skipLink.textContent = 'Skip to main content';
    skipLink.className = 'sr-only';
    skipLink.addEventListener('focus', function() {
        this.classList.remove('sr-only');
    });
    skipLink.addEventListener('blur', function() {
        this.classList.add('sr-only');
    });
    
    document.body.insertBefore(skipLink, document.body.firstChild);
    
    // Enhanced keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            // Close mobile menu if open
            const navMenu = document.querySelector('.nav-menu');
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
            }
            
            // Close any open modals
            const activeModals = document.querySelectorAll('.modal-overlay.active');
            activeModals.forEach(modal => modal.classList.remove('active'));
        }
    });
    
    // Announce page changes for screen readers
    const announcer = document.createElement('div');
    announcer.setAttribute('aria-live', 'polite');
    announcer.setAttribute('aria-atomic', 'true');
    announcer.className = 'sr-only';
    document.body.appendChild(announcer);
    
    // Focus management
    const focusableElements = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
    
    function trapFocus(element) {
        const focusableContent = element.querySelectorAll(focusableElements);
        const firstFocusableElement = focusableContent[0];
        const lastFocusableElement = focusableContent[focusableContent.length - 1];
        
        element.addEventListener('keydown', function(e) {
            if (e.key === 'Tab') {
                if (e.shiftKey) {
                    if (document.activeElement === firstFocusableElement) {
                        lastFocusableElement.focus();
                        e.preventDefault();
                    }
                } else {
                    if (document.activeElement === lastFocusableElement) {
                        firstFocusableElement.focus();
                        e.preventDefault();
                    }
                }
            }
        });
    }
    
    // Apply focus trap to modals when they open
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        const observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                if (mutation.attributeName === 'class') {
                    if (modal.parentElement.classList.contains('active')) {
                        trapFocus(modal);
                        modal.querySelector(focusableElements)?.focus();
                    }
                }
            });
        });
        
        observer.observe(modal.parentElement, { attributes: true });
    });
}

// Initialize accessibility features
initializeAccessibility();

// PWA Service Worker registration
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js')
            .then(function(registration) {
                console.log('SW registered: ', registration);
            })
            .catch(function(registrationError) {
                console.log('SW registration failed: ', registrationError);
            });
    });
}

// Export functions for testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initializeApp,
        animateCounter,
        showAlert,
        updateMarketStatus
    };
}