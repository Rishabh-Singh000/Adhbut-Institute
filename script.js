/* ============================================
   ADBHUT INSTITUTE - Interactive Scripts
   ============================================ */

// Initialize AOS (Animate On Scroll)
document.addEventListener('DOMContentLoaded', function() {
    AOS.init({
        duration: 800,
        easing: 'ease-out-cubic',
        once: true,
        offset: 100
    });
});

// ============================================
// NAVBAR SCROLL EFFECT
// ============================================
const navbar = document.getElementById('navbar');
let lastScrollY = window.scrollY;

window.addEventListener('scroll', function() {
    const currentScrollY = window.scrollY;
    
    // Add scrolled class for visual effect
    if (currentScrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    lastScrollY = currentScrollY;
});

// ============================================
// MOBILE NAVIGATION TOGGLE
// ============================================
const mobileToggle = document.getElementById('mobileToggle');
const navLinks = document.getElementById('navLinks');

mobileToggle.addEventListener('click', function() {
    this.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(function(link) {
    link.addEventListener('click', function() {
        mobileToggle.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', function(e) {
    if (!navbar.contains(e.target)) {
        mobileToggle.classList.remove('active');
        navLinks.classList.remove('active');
    }
});

// ============================================
// FAQ ACCORDION
// ============================================
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(function(item) {
    const question = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');
    
    question.addEventListener('click', function() {
        // Close all other items
        faqItems.forEach(function(otherItem) {
            if (otherItem !== item) {
                otherItem.classList.remove('active');
                otherItem.querySelector('.faq-answer').style.maxHeight = '0';
            }
        });
        
        // Toggle current item
        item.classList.toggle('active');
        
        if (item.classList.contains('active')) {
            answer.style.maxHeight = answer.scrollHeight + 'px';
        } else {
            answer.style.maxHeight = '0';
        }
    });
});

// ============================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        
        if (href === '#') return;
        
        e.preventDefault();
        
        const target = document.querySelector(href);
        
        if (target) {
            const offsetTop = target.offsetTop - 80;
            
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ============================================
// STICKY CTA VISIBILITY
// ============================================
const stickyCta = document.getElementById('stickyCta');

window.addEventListener('scroll', function() {
    if (window.innerWidth <= 768) {
        if (window.scrollY > 400) {
            stickyCta.style.display = 'flex';
        } else {
            stickyCta.style.display = 'none';
        }
    }
});

// ============================================
// COUNTER ANIMATION FOR STATS
// ============================================
function animateCounter(element, target, duration) {
    let start = 0;
    const increment = target / (duration / 16);
    
    function updateCounter() {
        start += increment;
        
        if (start < target) {
            element.textContent = Math.floor(start);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    }
    
    updateCounter();
}

// Observe result numbers for counter animation
const resultNumbers = document.querySelectorAll('.result-number');

const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px'
};

const counterObserver = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
        if (entry.isIntersecting) {
            const element = entry.target;
            const text = element.textContent;
            
            // Extract number from text
            const match = text.match(/(\d+)/);
            
            if (match) {
                const number = parseInt(match[1]);
                const suffix = text.replace(match[1], '');
                
                let current = 0;
                const duration = 2000;
                const increment = number / (duration / 16);
                
                function update() {
                    current += increment;
                    
                    if (current < number) {
                        element.textContent = Math.floor(current) + suffix;
                        requestAnimationFrame(update);
                    } else {
                        element.textContent = text;
                    }
                }
                
                update();
            }
            
            counterObserver.unobserve(element);
        }
    });
}, observerOptions);

resultNumbers.forEach(function(num) {
    counterObserver.observe(num);
});

// ============================================
// ACTIVE NAV LINK HIGHLIGHTING
// ============================================
const sections = document.querySelectorAll('section[id]');
const navLinksAll = document.querySelectorAll('.nav-links a:not(.nav-cta)');

window.addEventListener('scroll', function() {
    let current = '';
    
    sections.forEach(function(section) {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.scrollY >= (sectionTop - 150)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinksAll.forEach(function(link) {
        link.classList.remove('active');
        
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
        }
    });
});

// ============================================
// PERFORMANCE: Debounce scroll events
// ============================================
function debounce(func, wait) {
    let timeout;
    
    return function executedFunction() {
        const context = this;
        const args = arguments;
        
        clearTimeout(timeout);
        timeout = setTimeout(function() {
            func.apply(context, args);
        }, wait);
    };
}

// Apply debounce to scroll-heavy functions
window.addEventListener('scroll', debounce(function() {
    // Additional scroll-based logic if needed
}, 10));

// ============================================
// PRELOADER (Optional)
// ============================================
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
    
    // Trigger AOS refresh after load
    AOS.refresh();
});

// ============================================
// CONSOLE MESSAGE
// ============================================
console.log('%c Adbhut Institute ', 'background: #C61F28; color: #fff; font-size: 20px; font-weight: bold; padding: 10px 20px; border-radius: 5px;');
console.log('%c Premium Website - Built with ❤️ for IIT-JEE Excellence ', 'color: #F2B632; font-size: 12px;');
