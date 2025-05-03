// Smooth scroll with progress indicator
const progressIndicator = document.createElement('div');
progressIndicator.className = 'scroll-progress';
document.body.appendChild(progressIndicator);

window.addEventListener('scroll', () => {
    // Update navbar
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    // Update progress bar
    const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (window.scrollY / windowHeight) * 100;
    progressIndicator.style.width = `${scrolled}%`;
});

// Enhanced smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        const headerOffset = 80;
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    });
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            if (entry.target.classList.contains('feature-card')) {
                entry.target.classList.add('feature-animate');
            }
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Elements to animate
document.querySelectorAll('.feature-card, .stat-item, .pricing-card, .hero-content > *, .cta-content > *')
    .forEach(element => {
        element.classList.add('animate');
        observer.observe(element);
    });

// Enhanced stats counter animation
function animateValue(element, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const current = Math.floor(progress * (end - start) + start);
        element.textContent = current.toLocaleString();
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

// Improved stats animation
const statsSection = document.querySelector('.stats');
const statNumbers = document.querySelectorAll('.stat-number');
let animated = false;

function animateNumbers() {
    if (animated) return;
    
    statNumbers.forEach(stat => {
        const target = parseInt(stat.textContent.replace(/,/g, ''));
        animateValue(stat, 0, target, 2000); // 2 second animation
    });
    
    animated = true;
}

const statsObserver = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
        animateNumbers();
    }
});

statsObserver.observe(statsSection);

// Mobile menu toggle
const menuButton = document.createElement('button');
menuButton.className = 'mobile-menu-toggle';
menuButton.innerHTML = '<i class="fas fa-bars"></i>';
menuButton.setAttribute('aria-label', 'Toggle navigation menu');

const navbar = document.querySelector('.navbar');
navbar.appendChild(menuButton);

menuButton.addEventListener('click', () => {
    document.querySelector('.nav-links').classList.toggle('active');
    menuButton.classList.toggle('active');
});

// Add hover effect for cards
document.querySelectorAll('.feature-card, .pricing-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Scroll indicator animation
const scrollIndicator = document.querySelector('.scroll-indicator');
let scrollTimeout;

function hideScrollIndicator() {
    scrollIndicator.style.opacity = '0';
}

window.addEventListener('scroll', () => {
    scrollIndicator.style.opacity = '1';
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(hideScrollIndicator, 1500);
    
    if (window.scrollY > 100) {
        hideScrollIndicator();
    }
});

// Hero features stagger animation
const heroFeatures = document.querySelectorAll('.hero-feature');
heroFeatures.forEach((feature, index) => {
    feature.style.transitionDelay = `${index * 0.2}s`;
});

// Workflow section animations
const workflowSteps = document.querySelectorAll('.workflow-step');
const workflowObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            entry.target.style.transitionDelay = `${index * 0.2}s`;
            entry.target.classList.add('fade-in');
            workflowObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.2,
    rootMargin: '-50px'
});

workflowSteps.forEach(step => {
    step.classList.add('animate');
    workflowObserver.observe(step);
});

// Preview card hover effect
const previewCard = document.querySelector('.preview-card');
if (previewCard) {
    previewCard.addEventListener('mousemove', (e) => {
        const rect = previewCard.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;
        
        previewCard.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });
    
    previewCard.addEventListener('mouseleave', () => {
        previewCard.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
    });
}