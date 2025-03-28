document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Form submission handling
    const signupForm = document.querySelector('.signup-form');
    if (signupForm) {
        signupForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const emailInput = signupForm.querySelector('input[type="email"]');
            
            // Basic email validation
            if (validateEmail(emailInput.value)) {
                // Simulate form submission
                showNotification('Thank you for joining PlayNexus!', 'success');
                emailInput.value = ''; // Clear input
            } else {
                showNotification('Please enter a valid email address.', 'error');
            }
        });
    }

    // Email validation function
    function validateEmail(email) {
        const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return re.test(String(email).toLowerCase());
    }

    // Notification system
    function showNotification(message, type) {
        // Remove existing notifications
        const existingNotifications = document.querySelectorAll('.notification');
        existingNotifications.forEach(notification => notification.remove());

        // Create notification element
        const notification = document.createElement('div');
        notification.classList.add('notification', `notification-${type}`);
        notification.textContent = message;

        // Style the notification
        notification.style.position = 'fixed';
        notification.style.top = '20px';
        notification.style.left = '50%';
        notification.style.transform = 'translateX(-50%)';
        notification.style.padding = '15px';
        notification.style.backgroundColor = type === 'success' ? '#4CAF50' : '#F44336';
        notification.style.color = 'white';
        notification.style.borderRadius = '5px';
        notification.style.zIndex = '1000';
        notification.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';

        // Add to body
        document.body.appendChild(notification);

        // Remove notification after 3 seconds
        setTimeout(() => {
            notification.remove();
        }, 3000);
    }

    // Animate sports cards on hover
    const sportCards = document.querySelectorAll('.sport-card');
    sportCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'scale(1.05)';
            card.style.transition = 'transform 0.3s ease';
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'scale(1)';
        });
    });

    // Dynamic event card hover effect
    const eventCards = document.querySelectorAll('.event-card');
    eventCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.boxShadow = '0 8px 16px rgba(0,0,0,0.2)';
            card.style.transition = 'box-shadow 0.3s ease';
        });

        card.addEventListener('mouseleave', () => {
            card.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
        });
    });

    // Navigation menu toggle for mobile (optional, if needed)
    const menuToggle = document.createElement('div');
    menuToggle.innerHTML = '☰';
    menuToggle.classList.add('menu-toggle');
    menuToggle.style.display = 'none';

    // Style for mobile menu toggle
    menuToggle.style.position = 'fixed';
    menuToggle.style.top = '20px';
    menuToggle.style.right = '20px';
    menuToggle.style.fontSize = '24px';
    menuToggle.style.cursor = 'pointer';
    menuToggle.style.zIndex = '1100';

    // Add mobile responsiveness for navigation
    function handleMobileNavigation() {
        const navLinks = document.querySelector('.nav-links');
        
        if (window.innerWidth <= 768) {
            menuToggle.style.display = 'block';
            navLinks.style.display = 'none';

            menuToggle.addEventListener('click', () => {
                if (navLinks.style.display === 'none' || navLinks.style.display === '') {
                    navLinks.style.display = 'flex';
                    navLinks.style.flexDirection = 'column';
                    navLinks.style.position = 'fixed';
                    navLinks.style.top = '0';
                    navLinks.style.left = '0';
                    navLinks.style.width = '100%';
                    navLinks.style.backgroundColor = 'white';
                    navLinks.style.padding = '20px';
                    navLinks.style.zIndex = '1000';
                } else {
                    navLinks.style.display = 'none';
                }
            });
        } else {
            menuToggle.style.display = 'none';
            navLinks.style.display = 'flex';
        }
    }

    // Initial mobile navigation setup
    handleMobileNavigation();

    // Responsive navigation on window resize
    window.addEventListener('resize', handleMobileNavigation);

    // Append menu toggle to body
    document.body.appendChild(menuToggle);
});