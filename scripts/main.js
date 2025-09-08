// Soleia Experience - JavaScript principal
document.addEventListener('DOMContentLoaded', function() {
    
    // Navigation entre les pages
    initNavigation();
    
    // Animations au scroll
    initScrollAnimations();
    
    // Effets de parallaxe
    initParallaxEffects();
    
    // Animations des éléments interactifs
    initInteractiveElements();
    
    // Gestion du CTA button
    initCTAButton();
    
    console.log('🌟 Soleia Experience loaded with good vibes! ☀️');
});

/**
 * Initialise la navigation entre les pages
 */
function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const pages = document.querySelectorAll('.page');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            
            // Mise à jour des liens actifs
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
            
            // Changement de page avec animation
            pages.forEach(page => {
                page.classList.remove('active');
                if (page.id === targetId) {
                    setTimeout(() => {
                        page.classList.add('active');
                        // Réinitialiser les animations pour la nouvelle page
                        resetPageAnimations(page);
                    }, 150);
                }
            });
            
            // Scroll vers le haut
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    });
}

/**
 * Réinitialise les animations d'une page
 */
function resetPageAnimations(page) {
    const animatedElements = page.querySelectorAll('[class*="fadeIn"], [class*="bounce"], [class*="pulse"]');
    
    animatedElements.forEach(element => {
        element.style.animation = 'none';
        element.offsetHeight; // Force reflow
        element.style.animation = null;
    });
}

/**
 * Initialise les animations au scroll
 */
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Animation spéciale pour les listes
                if (entry.target.classList.contains('features-list')) {
                    animateListItems(entry.target);
                }
                
                if (entry.target.classList.contains('event-logistics')) {
                    animateLogisticsItems(entry.target);
                }
            }
        });
    }, observerOptions);
    
    // Observer tous les éléments à animer
    const elementsToAnimate = document.querySelectorAll(`
        .event-details,
        .features-list,
        .event-logistics,
        .story-text,
        .social-links
    `);
    
    elementsToAnimate.forEach(element => {
        element.classList.add('fade-in-on-scroll');
        observer.observe(element);
    });
}

/**
 * Anime les éléments d'une liste
 */
function animateListItems(listElement) {
    const items = listElement.querySelectorAll('li');
    
    items.forEach((item, index) => {
        setTimeout(() => {
            item.style.animation = `fadeInUp 0.6s ease-out forwards`;
            item.style.animationDelay = `${index * 0.1}s`;
        }, index * 100);
    });
}

/**
 * Anime les éléments logistiques
 */
function animateLogisticsItems(container) {
    const items = container.querySelectorAll('.logistics-item');
    
    items.forEach((item, index) => {
        setTimeout(() => {
            item.style.animation = `fadeInUp 0.6s ease-out forwards`;
            item.style.transform = 'translateY(0)';
        }, index * 150);
    });
}

/**
 * Initialise les effets de parallaxe
 */
function initParallaxEffects() {
    let ticking = false;
    
    function updateParallax() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.sun-icon, .sun-logo, .profile-image');
        
        parallaxElements.forEach(element => {
            const speed = element.dataset.speed || 0.5;
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
        
        ticking = false;
    }
    
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateParallax);
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', requestTick);
}

/**
 * Initialise les éléments interactifs
 */
function initInteractiveElements() {
    // Animation hover pour les features
    const featureItems = document.querySelectorAll('.features-list li');
    
    featureItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.02)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Animation pour les logistics items
    const logisticsItems = document.querySelectorAll('.logistics-item');
    
    logisticsItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(15px) scale(1.02)';
            this.style.boxShadow = '0 8px 24px rgba(249, 116, 47, 0.3)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0) scale(1)';
            this.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)';
        });
    });
    
    // Animation pour les liens sociaux
    const socialLinks = document.querySelectorAll('.social-link');
    
    socialLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.05)';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Animation pour les liens de navigation
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            if (!this.classList.contains('active')) {
                this.style.transform = 'translateY(-3px)';
                this.style.boxShadow = '0 4px 12px rgba(251, 107, 165, 0.3)';
            }
        });
        
        link.addEventListener('mouseleave', function() {
            if (!this.classList.contains('active')) {
                this.style.transform = 'translateY(0)';
                this.style.boxShadow = 'none';
            }
        });
    });
}

/**
 * Gestion du bouton CTA
 */
function initCTAButton() {
    const ctaButton = document.querySelector('.cta-button');
    
    if (ctaButton) {
        ctaButton.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Animation de feedback
            this.style.transform = 'scale(0.95)';
            this.style.boxShadow = '0 4px 12px rgba(251, 107, 165, 0.4)';
            
            setTimeout(() => {
                this.style.transform = 'scale(1)';
                this.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.2)';
                
                // Ici, tu peux ajouter la logique de réservation
                showBookingModal();
            }, 150);
        });
        
        // Animation de pulsation périodique
        setInterval(() => {
            if (!ctaButton.matches(':hover')) {
                ctaButton.style.animation = 'pulse 0.6s ease-in-out';
                setTimeout(() => {
                    ctaButton.style.animation = '';
                }, 600);
            }
        }, 5000);
    }
}

/**
 * Affiche une modal de réservation (placeholder)
 */
function showBookingModal() {
    // Animation de confirmation
    const confirmation = document.createElement('div');
    confirmation.innerHTML = `
        <div style="
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: linear-gradient(135deg, #FB6BA5 0%, #F9742F 100%);
            color: white;
            padding: 2rem;
            border-radius: 1rem;
            box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
            z-index: 10000;
            text-align: center;
            animation: fadeInScale 0.5s ease-out;
        ">
            <h3 style="margin-bottom: 1rem;">✨ Merci pour ton intérêt ! ✨</h3>
            <p style="margin-bottom: 1.5rem;">Contacte-nous sur soleiaexperience@gmail.com<br>pour réserver ta place ! 🌟</p>
            <button onclick="this.parentElement.parentElement.remove()" style="
                background: white;
                color: #FB6BA5;
                border: none;
                padding: 0.5rem 1.5rem;
                border-radius: 0.5rem;
                font-weight: 600;
                cursor: pointer;
            ">Fermer</button>
        </div>
        <div style="
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.5);
            z-index: 9999;
        " onclick="this.parentElement.remove()"></div>
    `;
    
    document.body.appendChild(confirmation);
    
    // Auto-fermeture après 5 secondes
    setTimeout(() => {
        if (confirmation.parentElement) {
            confirmation.remove();
        }
    }, 5000);
}

/**
 * Gestion responsive de la navigation
 */
function initResponsiveNavigation() {
    // Ici on peut ajouter un menu burger pour mobile si nécessaire
    const navbar = document.querySelector('.navbar');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // Scroll vers le bas - cacher la navbar
            navbar.style.transform = 'translateY(-100%)';
        } else {
            // Scroll vers le haut - montrer la navbar
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    });
}

/**
 * Initialise les animations de chargement
 */
function initLoadingAnimations() {
    // Animation des éléments au chargement de la page
    const heroElements = document.querySelectorAll('.hero-content > *');
    
    heroElements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            element.style.transition = 'all 0.8s ease-out';
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, index * 200);
    });
}

/**
 * Gestionnaire d'erreurs pour les images
 */
function initImageErrorHandling() {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        img.addEventListener('error', function() {
            // Remplacer par une image placeholder ou un emoji
            this.style.display = 'none';
            const placeholder = document.createElement('div');
            placeholder.innerHTML = '👤';
            placeholder.style.fontSize = '4rem';
            placeholder.style.display = 'flex';
            placeholder.style.alignItems = 'center';
            placeholder.style.justifyContent = 'center';
            placeholder.style.width = '100%';
            placeholder.style.height = '100%';
            placeholder.style.backgroundColor = 'var(--light-pink)';
            placeholder.style.borderRadius = '50%';
            
            this.parentElement.appendChild(placeholder);
        });
    });
}

// Initialisation au chargement complet
window.addEventListener('load', function() {
    initLoadingAnimations();
    initImageErrorHandling();
    initResponsiveNavigation();
});

// Gestion du redimensionnement
window.addEventListener('resize', function() {
    // Réajuster les animations si nécessaire
    const animatedElements = document.querySelectorAll('.fade-in-on-scroll.visible');
    animatedElements.forEach(element => {
        element.style.transform = 'translateY(0)';
    });
});

// Export des fonctions pour usage externe si nécessaire
window.SoleiaExperience = {
    showBookingModal,
    resetPageAnimations
};
