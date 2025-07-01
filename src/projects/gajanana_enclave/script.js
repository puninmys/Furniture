// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize animations
    initScrollAnimations();
    
    // Initialize form handling
    initContactForm();
    
    // Initialize smooth scrolling for any navigation links
    initSmoothScrolling();
});

// Scroll Animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Add fade-in class to sections and observe them
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.classList.add('fade-in');
        observer.observe(section);
    });

    // Add fade-in to cards
    const cards = document.querySelectorAll('.location-card, .amenity-card, .plot-card, .approval-card');
    cards.forEach((card, index) => {
        card.classList.add('fade-in');
        card.style.transitionDelay = `${index * 0.1}s`;
        observer.observe(card);
    });
}

// Contact Form Handling
function initContactForm() {
    const form = document.getElementById('contactForm');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            handleFormSubmission(this);
        });
    }
}

function handleFormSubmission(form) {
    const submitBtn = form.querySelector('.submit-btn');
    const originalText = submitBtn.textContent;
    
    // Show loading state
    submitBtn.innerHTML = '<span class="loading"></span> Sending...';
    submitBtn.disabled = true;
    
    // Get form data
    const formData = new FormData(form);
    const data = {
        name: formData.get('name'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        message: formData.get('message')
    };
    
    // Simulate form submission (replace with actual API call)
    setTimeout(() => {
        // Reset button
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        
        // Show success message
        showNotification('Thank you for your interest! We will contact you soon.', 'success');
        
        // Reset form
        form.reset();
        
        // In a real application, you would send the data to your server:
        // fetch('/api/contact', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify(data)
        // })
        // .then(response => response.json())
        // .then(result => {
        //     showNotification('Thank you for your interest! We will contact you soon.', 'success');
        //     form.reset();
        // })
        // .catch(error => {
        //     showNotification('Sorry, there was an error sending your message. Please try again.', 'error');
        // })
        // .finally(() => {
        //     submitBtn.textContent = originalText;
        //     submitBtn.disabled = false;
        // });
        
    }, 2000);
}

// Notification System
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
            <span>${message}</span>
            <button class="notification-close" onclick="this.parentElement.parentElement.remove()">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 1000;
        max-width: 400px;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#2563eb'};
        color: white;
        padding: 1rem;
        border-radius: 0.5rem;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    
    notification.querySelector('.notification-content').style.cssText = `
        display: flex;
        align-items: center;
        gap: 0.75rem;
    `;
    
    notification.querySelector('.notification-close').style.cssText = `
        background: none;
        border: none;
        color: white;
        cursor: pointer;
        padding: 0.25rem;
        margin-left: auto;
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentElement) {
                notification.remove();
            }
        }, 300);
    }, 5000);
}

// Brochure Download
function downloadBrochure() {
    // Show loading state
    const btn = event.target;
    const originalText = btn.innerHTML;
    btn.innerHTML = '<span class="loading"></span> Preparing Download...';
    btn.disabled = true;
    
    // Simulate download preparation
    setTimeout(() => {
        // Reset button
        btn.innerHTML = originalText;
        btn.disabled = false;
        
        // Show notification
        showNotification('Brochure download will be available soon. Please contact us for detailed information.', 'info');
        //C:\Users\DELL\Desktop\T3_infra\projects\gajanana_enclave\script.js
        // In a real application, you would trigger the actual download:
        const link = document.createElement('a');
        link.href = 'projects\gajanana_enclave\images\brochure.jpeg';
        link.download = 'gajanana_enclave-Brochure.jpeg';
        link.click();
    }, 2000);
}

// Smooth Scrolling
function initSmoothScrolling() {
    // Add smooth scrolling to any anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Utility Functions
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

// Add scroll-based animations for better performance
window.addEventListener('scroll', debounce(() => {
    const scrolled = window.pageYOffset;
    const parallax = document.querySelector('.hero-bg');
    if (parallax) {
        const speed = scrolled * 0.5;
        parallax.style.transform = `translateY(${speed}px)`;
    }
}, 10));

// Add loading animation for images
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('load', function() {
            this.style.opacity = '1';
        });
        
        // Set initial opacity
        img.style.opacity = '1';
        img.style.transition = 'opacity 0.3s ease';
    });
});

// Add click tracking for analytics (placeholder)
function trackClick(element, action) {
    // In a real application, you would send this data to your analytics service
    console.log('Click tracked:', {
        element: element,
        action: action,
        timestamp: new Date().toISOString()
    });
    
    // Example: Google Analytics event tracking
    // gtag('event', action, {
    //     event_category: 'engagement',
    //     event_label: element
    // });
}

// Add click tracking to important elements
document.addEventListener('DOMContentLoaded', function() {
    // Track brochure download clicks
    const downloadBtn = document.querySelector('.download-btn');
    if (downloadBtn) {
        downloadBtn.addEventListener('click', () => trackClick('brochure_download', 'download'));
    }
    
    // Track form submissions
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', () => trackClick('contact_form', 'submit'));
    }
    
    // Track phone/email clicks in footer
    const footerIcons = document.querySelectorAll('.footer-icons i');
    footerIcons.forEach(icon => {
        icon.addEventListener('click', () => trackClick('footer_contact', 'click'));
    });
});

// Add keyboard navigation support
document.addEventListener('keydown', function(e) {
    // Add keyboard shortcuts for better accessibility
    if (e.ctrlKey || e.metaKey) {
        switch(e.key) {
            case 'k':
                e.preventDefault();
                // Focus on contact form
                const nameInput = document.querySelector('input[name="name"]');
                if (nameInput) {
                    nameInput.focus();
                    nameInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
                break;
        }
    }
});

// Add print styles support
function preparePrintView() {
    // Add print-specific styles when printing
    window.addEventListener('beforeprint', function() {
        document.body.classList.add('printing');
    });
    
    window.addEventListener('afterprint', function() {
        document.body.classList.remove('printing');
    });
}

// Initialize print support
document.addEventListener('DOMContentLoaded', preparePrintView);