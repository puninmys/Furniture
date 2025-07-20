// Advanced animations and interactions
document.addEventListener('DOMContentLoaded', function() {
    initializeAdvancedAnimations();
});

function initializeAdvancedAnimations() {
    initializeStaggerAnimations();
    initializeParallaxEffects();
    initializeHoverEffects();
    initializeScrollTriggerAnimations();
    initializeLoadingAnimations();
    initializeTypewriterEffect();
    initializeParticleBackground();
}

// Stagger Animations
function initializeStaggerAnimations() {
    const staggerContainers = document.querySelectorAll('.stagger-animation');
    
    const staggerObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const children = entry.target.children;
                Array.from(children).forEach((child, index) => {
                    setTimeout(() => {
                        child.classList.add('animate-fade-in-up');
                    }, index * 100);
                });
                staggerObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    staggerContainers.forEach(container => {
        staggerObserver.observe(container);
    });
}

// Parallax Effects
function initializeParallaxEffects() {
    const parallaxElements = document.querySelectorAll('[data-parallax]');
    
    if (parallaxElements.length === 0) return;
    
    let ticking = false;
    
    function updateParallax() {
        const scrolled = window.pageYOffset;
        
        parallaxElements.forEach(element => {
            const speed = element.dataset.parallax || 0.5;
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
        
        ticking = false;
    }
    
    function requestParallaxUpdate() {
        if (!ticking) {
            requestAnimationFrame(updateParallax);
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', requestParallaxUpdate);
}

// Advanced Hover Effects
function initializeHoverEffects() {
    // Magnetic effect for buttons
    const magneticElements = document.querySelectorAll('.btn, .trade-btn');
    
    magneticElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            this.style.transition = 'transform 0.3s ease';
        });
        
        element.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            this.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px) scale(1.05)`;
        });
        
        element.addEventListener('mouseleave', function() {
            this.style.transform = 'translate(0px, 0px) scale(1)';
            this.style.transition = 'transform 0.5s ease';
        });
    });
    
    // Tilt effect for cards
    const tiltCards = document.querySelectorAll('.feature-card, .testimonial-card, .service-card');
    
    tiltCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transition = 'transform 0.1s ease';
        });
        
        card.addEventListener('mousemove', function(e) {
            if (window.innerWidth < 768) return; // Disable on mobile
            
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
            this.style.transition = 'transform 0.5s ease';
        });
    });
}

// Scroll Trigger Animations
function initializeScrollTriggerAnimations() {
    const animationElements = [
        { selector: '.features-grid .feature-card', animation: 'animate-zoom-in', delay: 0 },
        { selector: '.testimonials-grid .testimonial-card', animation: 'animate-fade-in-up', delay: 100 },
        { selector: '.services-list .service-card', animation: 'animate-fade-in', delay: 50 },
        { selector: '.market-stats .stat-card', animation: 'animate-bounce', delay: 200 }
    ];
    
    animationElements.forEach(({ selector, animation, delay }) => {
        const elements = document.querySelectorAll(selector);
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.classList.add(animation);
                    }, index * delay);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        
        elements.forEach(element => {
            observer.observe(element);
        });
    });
}

// Loading Animations
function initializeLoadingAnimations() {
    // Page load animation
    window.addEventListener('load', function() {
        const loadingScreen = document.createElement('div');
        loadingScreen.className = 'loading-screen';
        loadingScreen.innerHTML = `
            <div class="loading-content">
                <div class="loading-logo">
                    <img src="public/WhatsApp_Image_2025-07-20_at_12.27.41_AM-removebg-preview.png" alt="AGS Logo">
                </div>
                <div class="loading-spinner"></div>
                <p>Loading your trading dashboard...</p>
            </div>
        `;
        
        loadingScreen.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: var(--bg-primary);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 9999;
            transition: opacity 0.5s ease;
        `;
        
        const style = document.createElement('style');
        style.textContent = `
            .loading-content {
                text-align: center;
                animation: fadeInUp 0.6s ease-out;
            }
            .loading-logo {
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 1rem;
                margin-bottom: 2rem;
            }
            .loading-logo img {
                width: 148px;
                height: 148px;
                animation: bounce 2s infinite;
            }
            .loading-logo h2 {
                color: var(--primary-color);
                margin: 0;
                font-size: 2rem;
            }
            .loading-spinner {
                width: 40px;
                height: 40px;
                border: 4px solid var(--gray-200);
                border-top: 4px solid var(--primary-color);
                border-radius: 50%;
                animation: rotate 1s linear infinite;
                margin: 0 auto 1rem;
            }
        `;
        
        document.head.appendChild(style);
        document.body.appendChild(loadingScreen);
        
        // Remove loading screen after content is loaded
        setTimeout(() => {
            loadingScreen.style.opacity = '0';
            setTimeout(() => {
                loadingScreen.remove();
                style.remove();
                
                // Trigger entrance animations
                triggerEntranceAnimations();
            }, 500);
        }, 1500);
    });
}

function triggerEntranceAnimations() {
    const heroTitle = document.querySelector('.hero-title');
    const heroSubtitle = document.querySelector('.hero-subtitle');
    const heroButtons = document.querySelector('.hero-buttons');
    const stockTicker = document.querySelector('.stock-ticker');
    
    setTimeout(() => heroTitle?.classList.add('animate-fade-in-up'), 100);
    setTimeout(() => heroSubtitle?.classList.add('animate-fade-in-up'), 300);
    setTimeout(() => heroButtons?.classList.add('animate-fade-in-up'), 500);
    setTimeout(() => stockTicker?.classList.add('animate-slide-in-down'), 700);
}

// Typewriter Effect
function initializeTypewriterEffect() {
    const typewriterElements = document.querySelectorAll('[data-typewriter]');
    
    typewriterElements.forEach(element => {
        const text = element.dataset.typewriter;
        const speed = parseInt(element.dataset.speed) || 100;
        
        element.textContent = '';
        element.style.borderRight = '2px solid var(--primary-color)';
        element.style.animation = 'blink 1s infinite';
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    typeWriter(element, text, speed);
                    observer.unobserve(entry.target);
                }
            });
        });
        
        observer.observe(element);
    });
}

function typeWriter(element, text, speed) {
    let i = 0;
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        } else {
            // Remove cursor after typing is complete
            setTimeout(() => {
                element.style.borderRight = 'none';
                element.style.animation = 'none';
            }, 1000);
        }
    }
    
    type();
}

// Particle Background
function initializeParticleBackground() {
    const heroSection = document.querySelector('.hero');
    if (!heroSection) return;
    
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    canvas.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        opacity: 0.1;
        z-index: 1;
    `;
    
    heroSection.style.position = 'relative';
    heroSection.appendChild(canvas);
    
    // Particle system
    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.vx = (Math.random() - 0.5) * 0.5;
            this.vy = (Math.random() - 0.5) * 0.5;
            this.size = Math.random() * 2 + 1;
            this.opacity = Math.random() * 0.5 + 0.5;
        }
        
        update() {
            this.x += this.vx;
            this.y += this.vy;
            
            if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
            if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
        }
        
        draw() {
            ctx.save();
            ctx.globalAlpha = this.opacity;
            ctx.fillStyle = '#3b82f6';
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
        }
    }
    
    let particles = [];
    let animationId;
    
    function resizeCanvas() {
        canvas.width = heroSection.offsetWidth;
        canvas.height = heroSection.offsetHeight;
        
        // Recreate particles
        particles = [];
        for (let i = 0; i < 50; i++) {
            particles.push(new Particle());
        }
    }
    
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });
        
        // Draw connections
        particles.forEach((particle, i) => {
            for (let j = i + 1; j < particles.length; j++) {
                const other = particles[j];
                const distance = Math.sqrt(
                    Math.pow(particle.x - other.x, 2) + 
                    Math.pow(particle.y - other.y, 2)
                );
                
                if (distance < 100) {
                    ctx.save();
                    ctx.globalAlpha = (100 - distance) / 100 * 0.2;
                    ctx.strokeStyle = '#3b82f6';
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.moveTo(particle.x, particle.y);
                    ctx.lineTo(other.x, other.y);
                    ctx.stroke();
                    ctx.restore();
                }
            }
        });
        
        animationId = requestAnimationFrame(animate);
    }
    
    // Initialize
    resizeCanvas();
    animate();
    
    // Handle resize
    window.addEventListener('resize', resizeCanvas);
    
    // Cleanup on page unload
    window.addEventListener('beforeunload', () => {
        if (animationId) {
            cancelAnimationFrame(animationId);
        }
    });
}

// Mouse follower effect
function initializeMouseFollower() {
    if (window.innerWidth < 768) return; // Disable on mobile
    
    const follower = document.createElement('div');
    follower.className = 'mouse-follower';
    follower.style.cssText = `
        position: fixed;
        width: 20px;
        height: 20px;
        background: radial-gradient(circle, var(--primary-color), transparent);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        transition: transform 0.1s ease;
        opacity: 0;
    `;
    
    document.body.appendChild(follower);
    
    document.addEventListener('mousemove', (e) => {
        follower.style.left = e.clientX - 10 + 'px';
        follower.style.top = e.clientY - 10 + 'px';
        follower.style.opacity = '0.6';
    });
    
    document.addEventListener('mouseenter', () => {
        follower.style.opacity = '0.6';
    });
    
    document.addEventListener('mouseleave', () => {
        follower.style.opacity = '0';
    });
    
    // Scale up on hover over interactive elements
    const interactiveElements = document.querySelectorAll('button, a, input, .trade-btn');
    
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            follower.style.transform = 'scale(2)';
            follower.style.background = 'radial-gradient(circle, var(--accent-color), transparent)';
        });
        
        element.addEventListener('mouseleave', () => {
            follower.style.transform = 'scale(1)';
            follower.style.background = 'radial-gradient(circle, var(--primary-color), transparent)';
        });
    });
}

// Initialize mouse follower
initializeMouseFollower();

// Smooth reveal animations for sections
function initializeSectionReveals() {
    const sections = document.querySelectorAll('section');
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('section-revealed');
                
                // Add stagger animation to section content
                const children = entry.target.querySelectorAll('h2, h3, p, .btn');
                children.forEach((child, index) => {
                    setTimeout(() => {
                        child.style.opacity = '1';
                        child.style.transform = 'translateY(0)';
                    }, index * 100);
                });
                
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(50px)';
        section.style.transition = 'all 0.6s ease';
        
        // Hide section content initially
        const children = section.querySelectorAll('h2, h3, p, .btn');
        children.forEach(child => {
            child.style.opacity = '0';
            child.style.transform = 'translateY(20px)';
            child.style.transition = 'all 0.4s ease';
        });
        
        revealObserver.observe(section);
    });
    
    // Add CSS for revealed sections
    const style = document.createElement('style');
    style.textContent = `
        .section-revealed {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);
}

// Initialize section reveals
initializeSectionReveals();

// Export for testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initializeAdvancedAnimations,
        initializeStaggerAnimations,
        initializeParallaxEffects
    };
}