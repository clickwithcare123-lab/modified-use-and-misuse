// Modern PhoneGuard Website - Enhanced JavaScript
class PhoneGuardApp {
    constructor() {
        this.init();
        this.setupEventListeners();
        this.initializeAnimations();
        this.setupParticles();
        this.initializeTools();
    }

    init() {
        this.currentSection = 0;
        this.isScrolling = false;
        this.notificationQueue = [];
        this.isProcessingNotification = false;
        
        // Initialize components
        this.navbar = document.querySelector('.navbar');
        this.hamburger = document.querySelector('.hamburger');
        this.navMenu = document.querySelector('.nav-menu');
        this.sections = document.querySelectorAll('section');
        
        // Setup smooth scrolling
        this.setupSmoothScrolling();
        
        // Initialize typing effect
        this.initTypingEffect();
        
        // Setup parallax effects
        this.setupParallax();
        
        // Initialize counters
        this.initCounters();
        
        // Setup floating elements
        this.setupFloatingElements();
    }

    setupEventListeners() {
        // Mobile menu toggle
        if (this.hamburger) {
            this.hamburger.addEventListener('click', () => this.toggleMobileMenu());
        }

        // Navigation links
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href').substring(1);
                this.smoothScrollTo(targetId);
                this.closeMobileMenu();
            });
        });

        // Navbar scroll effect
        window.addEventListener('scroll', () => this.handleScroll());

        // Button ripple effects
        document.querySelectorAll('.btn').forEach(btn => {
            btn.addEventListener('click', (e) => this.createRippleEffect(e));
        });

        // Form submissions
        this.setupFormHandlers();

        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => this.handleKeyboardShortcuts(e));

        // Intersection Observer for animations
        this.setupIntersectionObserver();
    }

    setupSmoothScrolling() {
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

    smoothScrollTo(targetId) {
        const target = document.getElementById(targetId);
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }

    toggleMobileMenu() {
        this.navMenu.classList.toggle('active');
        this.hamburger.classList.toggle('active');
        
        // Animate hamburger
        const spans = this.hamburger.querySelectorAll('span');
        if (this.navMenu.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    }

    closeMobileMenu() {
        this.navMenu.classList.remove('active');
        this.hamburger.classList.remove('active');
        const spans = this.hamburger.querySelectorAll('span');
        spans.forEach(span => {
            span.style.transform = 'none';
            span.style.opacity = '1';
        });
    }

    handleScroll() {
        // Navbar background change
        if (window.scrollY > 50) {
            this.navbar.classList.add('scrolled');
        } else {
            this.navbar.classList.remove('scrolled');
        }

        // Parallax effects
        this.updateParallax();

        // Section highlighting
        this.updateActiveSection();
    }

    updateParallax() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.floating-element');
        
        parallaxElements.forEach((element, index) => {
            const speed = 0.5 + (index * 0.1);
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });

        // Phone mockup parallax
        const phoneFrame = document.querySelector('.phone-frame');
        if (phoneFrame) {
            const phoneY = scrolled * 0.1;
            phoneFrame.style.transform = `perspective(1000px) rotateY(-15deg) rotateX(5deg) translateY(${phoneY}px)`;
        }
    }

    updateActiveSection() {
        const scrollPosition = window.scrollY + 100;
        
        this.sections.forEach((section, index) => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                this.currentSection = index;
                this.updateNavigationHighlight();
            }
        });
    }

    updateNavigationHighlight() {
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
        });
        
        const activeLink = document.querySelector(`.nav-link[href="#${this.sections[this.currentSection].id}"]`);
        if (activeLink) {
            activeLink.classList.add('active');
        }
    }

    createRippleEffect(event) {
        const button = event.currentTarget;
        const ripple = document.createElement('span');
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        button.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }

    initTypingEffect() {
        const heroTitle = document.querySelector('.hero-title');
        if (!heroTitle) return;
        
        const text = heroTitle.textContent;
        heroTitle.textContent = '';
        heroTitle.style.borderRight = '2px solid white';
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                heroTitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            } else {
                setTimeout(() => {
                    heroTitle.style.borderRight = 'none';
                }, 1000);
            }
        };
        
        // Start typing effect after a short delay
        setTimeout(typeWriter, 500);
    }

    setupParticles() {
        const hero = document.querySelector('.hero');
        if (!hero) return;
        
        // Create floating particles
        for (let i = 0; i < 20; i++) {
            this.createParticle(hero);
        }
    }

    createParticle(container) {
        const particle = document.createElement('div');
        particle.className = 'floating-element';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 6 + 's';
        particle.style.animationDuration = (Math.random() * 3 + 3) + 's';
        
        container.appendChild(particle);
    }

    setupIntersectionObserver() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                    
                    // Trigger counter animations
                    if (entry.target.classList.contains('stat-card')) {
                        this.animateCounter(entry.target);
                    }
                }
            });
        }, observerOptions);

        // Observe elements for animation
        document.querySelectorAll('.risk-card, .solution-card, .tool-card, .stat-card').forEach(el => {
            observer.observe(el);
        });
    }

    initCounters() {
        this.counters = document.querySelectorAll('.stat-number');
        this.counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target') || counter.textContent);
            counter.setAttribute('data-target', target);
            counter.textContent = '0';
        });
    }

    animateCounter(element) {
        const counter = element.querySelector('.stat-number');
        if (!counter || counter.classList.contains('animated')) return;
        
        counter.classList.add('animated');
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;
        
        const updateCounter = () => {
            current += step;
            if (current < target) {
                counter.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        };
        
        updateCounter();
    }

    setupFormHandlers() {
        // Newsletter form
        const newsletterForm = document.querySelector('.newsletter-form');
        if (newsletterForm) {
            newsletterForm.addEventListener('submit', (e) => this.handleNewsletterSubmit(e));
        }

        // Tool forms
        const permissionForm = document.querySelector('#permissionForm');
        if (permissionForm) {
            permissionForm.addEventListener('submit', (e) => this.handlePermissionCheck(e));
        }

        const securityForm = document.querySelector('#securityForm');
        if (securityForm) {
            securityForm.addEventListener('submit', (e) => this.handleSecurityCheck(e));
        }
    }

    handleNewsletterSubmit(e) {
        e.preventDefault();
        const email = e.target.querySelector('input[type="email"]').value;
        
        if (this.validateEmail(email)) {
            this.showNotification('Successfully subscribed to newsletter!', 'success');
            e.target.reset();
            
            // Simulate API call
            this.simulateApiCall(() => {
                this.updateCommunityStats();
            });
        } else {
            this.showNotification('Please enter a valid email address.', 'error');
        }
    }

    handlePermissionCheck(e) {
        e.preventDefault();
        const appName = e.target.querySelector('#appName').value.toLowerCase();
        const resultDiv = document.getElementById('permissionResult');
        
        if (!appName) {
            this.showNotification('Please enter an app name.', 'error');
            return;
        }

        // Show loading state
        resultDiv.innerHTML = '<div class="loading"></div> Checking permissions...';
        resultDiv.classList.add('show');

        // Simulate API delay
        setTimeout(() => {
            this.checkAppPermissions(appName, resultDiv);
        }, 1500);
    }

    handleSecurityCheck(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        const answers = {};
        
        for (let [key, value] of formData.entries()) {
            answers[key] = parseInt(value);
        }

        const resultDiv = document.getElementById('securityResult');
        resultDiv.innerHTML = '<div class="loading"></div> Calculating security score...';
        resultDiv.classList.add('show');

        setTimeout(() => {
            this.calculateSecurityScore(answers, resultDiv);
        }, 1500);
    }

    checkAppPermissions(appName, resultDiv) {
        const appDatabase = {
            'facebook': {
                risk: 'high',
                permissions: ['Location', 'Camera', 'Microphone', 'Contacts', 'Storage', 'Phone'],
                description: 'High risk - collects extensive personal data and tracks user behavior',
                recommendations: ['Limit location sharing', 'Review privacy settings', 'Consider alternative apps']
            },
            'instagram': {
                risk: 'medium',
                permissions: ['Location', 'Camera', 'Microphone', 'Storage', 'Contacts'],
                description: 'Medium risk - collects location and media data',
                recommendations: ['Disable location services', 'Review photo permissions', 'Use private account']
            },
            'tiktok': {
                risk: 'high',
                permissions: ['Location', 'Camera', 'Microphone', 'Storage', 'Contacts', 'Phone', 'Device Info'],
                description: 'High risk - extensive data collection and tracking',
                recommendations: ['Use in private browsing', 'Limit permissions', 'Consider privacy concerns']
            },
            'whatsapp': {
                risk: 'medium',
                permissions: ['Camera', 'Microphone', 'Storage', 'Contacts', 'Phone'],
                description: 'Medium risk - necessary permissions for messaging functionality',
                recommendations: ['Keep app updated', 'Use end-to-end encryption', 'Review contact sharing']
            },
            'uber': {
                risk: 'medium',
                permissions: ['Location', 'Camera', 'Storage', 'Contacts', 'Phone'],
                description: 'Medium risk - location tracking for ride services',
                recommendations: ['Only enable location when needed', 'Review trip history', 'Use payment protection']
            },
            'google maps': {
                risk: 'low',
                permissions: ['Location', 'Storage', 'Camera'],
                description: 'Low risk - location services for navigation',
                recommendations: ['Use offline maps', 'Review location history', 'Limit background location']
            }
        };

        const app = appDatabase[appName];
        
        if (app) {
            const riskClass = `risk-${app.risk}`;
            const riskText = app.risk.charAt(0).toUpperCase() + app.risk.slice(1);
            
            resultDiv.innerHTML = `
                <div class="risk-level ${riskClass}">${riskText} Risk</div>
                <p><strong>${app.description}</strong></p>
                <h4>Permissions Requested:</h4>
                <ul class="permissions-list">
                    ${app.permissions.map(perm => `
                        <li>
                            <span class="permission-name">${perm}</span>
                            <span class="permission-risk ${riskClass}">${app.risk}</span>
                        </li>
                    `).join('')}
                </ul>
                <h4>Recommendations:</h4>
                <ul>
                    ${app.recommendations.map(rec => `<li>${rec}</li>`).join('')}
                </ul>
            `;
        } else {
            resultDiv.innerHTML = `
                <div class="risk-level risk-medium">Unknown App</div>
                <p><strong>App not found in database</strong></p>
                <h4>General Security Tips:</h4>
                <ul>
                    <li>Review all requested permissions carefully</li>
                    <li>Only grant permissions that are necessary for app functionality</li>
                    <li>Check app reviews and developer reputation</li>
                    <li>Keep your device and apps updated</li>
                    <li>Use app store security features</li>
                </ul>
            `;
        }
    }

    calculateSecurityScore(answers, resultDiv) {
        const maxScore = 100;
        let score = maxScore;
        const deductions = [];
        
        // Calculate deductions based on answers
        if (answers.passwordStrength < 3) {
            score -= 15;
            deductions.push('Weak password (-15 points)');
        }
        
        if (answers.twoFactor === 1) {
            score -= 20;
            deductions.push('No two-factor authentication (-20 points)');
        }
        
        if (answers.appPermissions > 2) {
            score -= 10;
            deductions.push('Too many app permissions (-10 points)');
        }
        
        if (answers.locationSharing > 2) {
            score -= 10;
            deductions.push('Excessive location sharing (-10 points)');
        }
        
        if (answers.deviceUpdates === 1) {
            score -= 15;
            deductions.push('Outdated device software (-15 points)');
        }
        
        if (answers.antivirus === 1) {
            score -= 10;
            deductions.push('No antivirus protection (-10 points)');
        }
        
        if (answers.publicWifi > 2) {
            score -= 10;
            deductions.push('Frequent public WiFi use (-10 points)');
        }
        
        if (answers.dataBackup === 1) {
            score -= 10;
            deductions.push('No regular data backup (-10 points)');
        }
        
        score = Math.max(0, score);
        
        // Determine security level
        let securityLevel, levelClass, recommendations;
        if (score >= 80) {
            securityLevel = 'Excellent';
            levelClass = 'risk-low';
            recommendations = [
                'Keep up the great security practices!',
                'Consider enabling advanced security features',
                'Regularly review your security settings'
            ];
        } else if (score >= 60) {
            securityLevel = 'Good';
            levelClass = 'risk-medium';
            recommendations = [
                'Enable two-factor authentication',
                'Review and limit app permissions',
                'Update your device regularly'
            ];
        } else if (score >= 40) {
            securityLevel = 'Fair';
            levelClass = 'risk-medium';
            recommendations = [
                'Change to a stronger password',
                'Enable two-factor authentication immediately',
                'Review all app permissions',
                'Install antivirus software'
            ];
        } else {
            securityLevel = 'Poor';
            levelClass = 'risk-high';
            recommendations = [
                'Change all passwords immediately',
                'Enable two-factor authentication on all accounts',
                'Review and revoke unnecessary app permissions',
                'Install and update antivirus software',
                'Avoid public WiFi networks',
                'Set up regular data backups'
            ];
        }
        
        resultDiv.innerHTML = `
            <div class="risk-level ${levelClass}">${securityLevel} Security</div>
            <div style="text-align: center; margin: 1rem 0;">
                <div style="font-size: 3rem; font-weight: bold; color: white;">${score}/100</div>
                <div style="font-size: 1.2rem; margin-bottom: 1rem;">Security Score</div>
                <div style="width: 100%; height: 10px; background: rgba(255,255,255,0.2); border-radius: 5px; overflow: hidden;">
                    <div style="width: ${score}%; height: 100%; background: var(--accent-gradient); transition: width 1s ease;"></div>
                </div>
            </div>
            ${deductions.length > 0 ? `
                <h4>Areas for Improvement:</h4>
                <ul>
                    ${deductions.map(deduction => `<li>${deduction}</li>`).join('')}
                </ul>
            ` : ''}
            <h4>Recommendations:</h4>
            <ul>
                ${recommendations.map(rec => `<li>${rec}</li>`).join('')}
            </ul>
        `;
    }

    validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    showNotification(message, type = 'success') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="notification-icon fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
                <span class="notification-text">${message}</span>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.classList.add('show');
        }, 100);
        
        // Remove after 5 seconds
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 5000);
    }

    simulateApiCall(callback) {
        // Simulate API call delay
        setTimeout(callback, 1000);
    }

    updateCommunityStats() {
        // Simulate updating community statistics
        const stats = document.querySelectorAll('.stat-number');
        stats.forEach(stat => {
            const currentValue = parseInt(stat.textContent);
            const newValue = currentValue + Math.floor(Math.random() * 10) + 1;
            stat.textContent = newValue;
        });
    }

    handleKeyboardShortcuts(e) {
        // Ctrl/Cmd + K to focus search
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            const searchInput = document.querySelector('#appName');
            if (searchInput) {
                searchInput.focus();
            }
        }
        
        // Escape to close mobile menu
        if (e.key === 'Escape') {
            this.closeMobileMenu();
        }
    }

    initializeAnimations() {
        // Add CSS animations
        const style = document.createElement('style');
        style.textContent = `
            .animate-in {
                animation: slideInUp 0.6s ease-out forwards;
            }
            
            @keyframes slideInUp {
                from {
                    opacity: 0;
                    transform: translateY(30px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
            
            .ripple {
                position: absolute;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.6);
                transform: scale(0);
                animation: ripple-animation 0.6s linear;
                pointer-events: none;
            }
            
            @keyframes ripple-animation {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }

    initializeTools() {
        // Initialize any additional tool functionality
        this.setupRealTimeUpdates();
    }

    setupRealTimeUpdates() {
        // Simulate real-time security updates
        setInterval(() => {
            const securityAlerts = [
                'New security threat detected in popular apps',
                'Update available for enhanced protection',
                'Community reports new phishing attempts',
                'Security best practices updated'
            ];
            
            const randomAlert = securityAlerts[Math.floor(Math.random() * securityAlerts.length)];
            
            // Only show occasional alerts
            if (Math.random() < 0.1) {
                this.showNotification(randomAlert, 'success');
            }
        }, 30000); // Every 30 seconds
    }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new PhoneGuardApp();
});

// Add some additional utility functions
window.PhoneGuardUtils = {
    // Generate random security tips
    getRandomSecurityTip() {
        const tips = [
            'Always use strong, unique passwords for each account',
            'Enable two-factor authentication whenever possible',
            'Keep your device and apps updated regularly',
            'Be cautious when downloading apps from unknown sources',
            'Review app permissions before installing',
            'Use a VPN when connecting to public WiFi',
            'Regularly backup your important data',
            'Monitor your accounts for suspicious activity'
        ];
        return tips[Math.floor(Math.random() * tips.length)];
    },

    // Format numbers with commas
    formatNumber(num) {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    },

    // Debounce function for performance
    debounce(func, wait) {
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
};

// Add global error handling
window.addEventListener('error', (e) => {
    console.error('PhoneGuard Error:', e.error);
});

// Add service worker for offline functionality (if needed)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}
