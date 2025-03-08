// Mobile Navigation
const burger = document.querySelector('.burger');
const nav = document.querySelector('.nav-links');
const navLinks = document.querySelectorAll('.nav-links li');

// Toggle navigation
burger.addEventListener('click', () => {
    // Toggle nav
    nav.classList.toggle('nav-active');
    
    // Animate links
    navLinks.forEach((link, index) => {
        if (link.style.animation) {
            link.style.animation = '';
        } else {
            link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
        }
    });
    
    // Burger animation
    burger.classList.toggle('toggle');
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (nav.classList.contains('nav-active') && 
        e.target !== burger && 
        !burger.contains(e.target) && 
        e.target !== nav && 
        !nav.contains(e.target)) {
        nav.classList.remove('nav-active');
        burger.classList.remove('toggle');
        
        navLinks.forEach((link) => {
            link.style.animation = '';
        });
    }
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
            
            // Close mobile menu if open
            if (nav.classList.contains('nav-active')) {
                nav.classList.remove('nav-active');
                burger.classList.remove('toggle');
                
                navLinks.forEach((link) => {
                    link.style.animation = '';
                });
            }
        }
    });
});

// Highlight active navigation based on scroll position
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-links a');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navItems.forEach(item => {
        item.classList.remove('active');
        if (current && item.getAttribute('href') === `#${current}`) {
            item.classList.add('active');
        } else if (item.getAttribute('href') === window.location.pathname) {
            item.classList.add('active');
        }
    });
});

// Scroll to top button
const scrollTopBtn = document.querySelector('.scroll-top');

if (scrollTopBtn) {
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollTopBtn.classList.add('show');
        } else {
            scrollTopBtn.classList.remove('show');
        }
    });
    
    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Add animation for project cards
const projectCards = document.querySelectorAll('.project-card');

if (projectCards.length > 0) {
    const observerOptions = {
        threshold: 0.25,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const projectObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    projectCards.forEach(card => {
        projectObserver.observe(card);
    });
}

// Form validation for contact page
const contactForm = document.querySelector('.contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        // Basic validation
        let isValid = true;
        const nameInput = contactForm.querySelector('#name');
        const emailInput = contactForm.querySelector('#email');
        const messageInput = contactForm.querySelector('#message');
        
        // Clear previous error messages
        document.querySelectorAll('.error-message').forEach(error => {
            error.remove();
        });
        
        // Validate name
        if (nameInput.value.trim() === '') {
            e.preventDefault(); // Prevent form submission
            showError(nameInput, 'Name is required');
            isValid = false;
        }
        
        // Validate email
        if (emailInput.value.trim() === '') {
            e.preventDefault(); // Prevent form submission
            showError(emailInput, 'Email is required');
            isValid = false;
        } else if (!isValidEmail(emailInput.value)) {
            e.preventDefault(); // Prevent form submission
            showError(emailInput, 'Please enter a valid email');
            isValid = false;
        }
        
        // Validate message
        if (messageInput.value.trim() === '') {
            e.preventDefault(); // Prevent form submission
            showError(messageInput, 'Message is required');
            isValid = false;
        }
        
        // If form is valid, it will submit to Formspree
        // The preventDefault() calls above will stop submission only if validation fails
    });
}

// Helper function to display form errors
function showError(input, message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.innerText = message;
    
    input.parentElement.appendChild(errorDiv);
    input.classList.add('input-error');
}

// Helper function to validate email format
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}
