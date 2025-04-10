// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.style.padding = '10px 30px';
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.padding = '15px 30px';
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.05)';
        }
    });
    
    // Testimonial slider functionality
    const dots = document.querySelectorAll('.dot');
    const testimonials = [
        {
            img: '/api/placeholder/300/200',
            text: '"AthleteNexus has completely transformed my training routine. The personalized programs and coaching have taken my performance to new heights."',
            author: 'Michael Johnson',
            authorImg: '/api/placeholder/40/40',
            rating: 5
        },
        {
            img: '/api/placeholder/300/200',
            text: '"The community aspect of AthleteNexus is incredible. I\'ve connected with other athletes who share my passion and push me to improve every day."',
            author: 'Sarah Williams',
            authorImg: '/api/placeholder/40/40',
            rating: 5
        },
        {
            img: '/api/placeholder/300/200',
            text: '"My coach on AthleteNexus helped me optimize my training schedule and nutrition. I\'ve seen remarkable improvements in just three months!"',
            author: 'David Chen',
            authorImg: '/api/placeholder/40/40',
            rating: 4
        }
    ];
    
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            // Update active dot
            document.querySelector('.dot.active').classList.remove('active');
            dot.classList.add('active');
            
            // Update testimonial content
            updateTestimonial(index);
        });
    });
    
    function updateTestimonial(index) {
        const testimonial = testimonials[index];
        const testimonialCard = document.querySelector('.testimonial-card');
        
        // Create testimonial HTML
        const testimonialHTML = `
            <img src="${testimonial.img}" alt="Testimonial Athlete" class="testimonial-img">
            <div class="testimonial-content">
                <div class="testimonial-text">
                    <p>${testimonial.text}</p>
                    <div class="rating">
                        ${Array(testimonial.rating).fill('<i class="fas fa-star"></i>').join('')}
                    </div>
                </div>
                <div class="testimonial-author">
                    <img src="${testimonial.authorImg}" alt="Author" class="author-img">
                    <p>${testimonial.author}</p>
                </div>
            </div>
        `;
        
        // Add fade-out effect
        testimonialCard.style.opacity = '0';
        
        // Update content after fade-out
        setTimeout(() => {
            testimonialCard.innerHTML = testimonialHTML;
            testimonialCard.style.opacity = '1';
        }, 300);
    }
    
    // Auto-rotate testimonials
    let currentTestimonial = 0;
    setInterval(() => {
        currentTestimonial = (currentTestimonial + 1) % testimonials.length;
        
        // Update active dot
        document.querySelector('.dot.active').classList.remove('active');
        dots[currentTestimonial].classList.add('active');
        
        // Update testimonial content
        updateTestimonial(currentTestimonial);
    }, 5000);
    
    // Feature cards hover effect
    const featureCards = document.querySelectorAll('.feature-card');
    
    featureCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px)';
            card.style.boxShadow = '0 12px 20px rgba(0, 0, 0, 0.1)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
            card.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
        });
    });
    
    // Sport cards hover effect
    const sportCards = document.querySelectorAll('.sport-card');
    
    sportCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'scale(1.05)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'scale(1)';
        });
    });
    
    // Smooth scrolling for navigation
    const navLinks = document.querySelectorAll('.nav-item');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Prevent default anchor behavior
            e.preventDefault();
            
            // Get section id from href
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                // Scroll to section
                window.scrollTo({
                    top: targetSection.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // CTA button animations
    const ctaButtons = document.querySelectorAll('.cta-button, .join-button, .register-button, .outline-button, .solid-button');
    
    ctaButtons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            button.style.transform = 'translateY(-3px)';
        });
        
        button.addEventListener('mouseleave', () => {
            button.style.transform = 'translateY(0)';
        });
        
        button.addEventListener('mousedown', () => {
            button.style.transform = 'translateY(1px)';
        });
        
        button.addEventListener('mouseup', () => {
            button.style.transform = 'translateY(-3px)';
        });
    });
    
    // Add counter animation for statistics
    const animateCounter = (element, start, end, duration) => {
        let startTime = null;
        
        const animation = (currentTime) => {
            if (!startTime) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const progress = Math.min(timeElapsed / duration, 1);
            const value = Math.floor(progress * (end - start) + start);
            
            element.textContent = value.toLocaleString();
            
            if (progress < 1) {
                requestAnimationFrame(animation);
            }
        };
        
        requestAnimationFrame(animation);
    };
    
    // Animated stats when they come into view
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add animation for any statistics elements
                const statsElements = entry.target.querySelectorAll('.stat-number');
                statsElements.forEach(stat => {
                    const endValue = parseInt(stat.getAttribute('data-value'));
                    animateCounter(stat, 0, endValue, 2000);
                });
                
                // Unobserve after animation
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe sections with statistics
    document.querySelectorAll('.stats-section').forEach(section => {
        observer.observe(section);
    });
    
    // Mobile menu toggle
    const menuToggle = document.createElement('button');
    menuToggle.classList.add('menu-toggle');
    menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
    navbar.appendChild(menuToggle);
    
    menuToggle.addEventListener('click', () => {
        const navLinks = document.querySelector('.nav-links');
        navLinks.classList.toggle('active');
        
        if (navLinks.classList.contains('active')) {
            menuToggle.innerHTML = '<i class="fas fa-times"></i>';
        } else {
            menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
        }
    });
    
    // Handle mobile menu display
    const handleResize = () => {
        const navLinks = document.querySelector('.nav-links');
        if (window.innerWidth > 768) {
            navLinks.style.display = 'flex';
            menuToggle.style.display = 'none';
        } else {
            navLinks.style.display = navLinks.classList.contains('active') ? 'flex' : 'none';
            menuToggle.style.display = 'block';
        }
    };
    
    window.addEventListener('resize', handleResize);
    handleResize();
    
    // Add lazy loading for images
    if ('loading' in HTMLImageElement.prototype) {
        // Browser supports native lazy loading
        document.querySelectorAll('img').forEach(img => {
            img.setAttribute('loading', 'lazy');
        });
    } else {
        // Fallback for browsers that don't support native lazy loading
        // This could be enhanced with a full lazy loading library
        const lazyImages = document.querySelectorAll('img:not([src])');
        
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        imageObserver.unobserve(img);
                    }
                });
            });
            
            lazyImages.forEach(img => {
                imageObserver.observe(img);
            });
        }
    }
});

// WebSocket connection for real-time updates
document.addEventListener('DOMContentLoaded', function() {
    const athleteId = "{{ user.id }}"; // Get from Django template
    const socket = new WebSocket(
        `ws://${window.location.host}/ws/athlete-dashboard/${athleteId}/`
    );

    // Connection opened
    socket.addEventListener('open', function(event) {
        console.log('WebSocket connection established');
    });

    // Listen for messages
    socket.addEventListener('message', function(event) {
        const data = JSON.parse(event.data);
        handleRealTimeUpdate(data);
    });

    // Connection closed
    socket.addEventListener('close', function(event) {
        console.log('WebSocket connection closed');
        // Implement reconnection logic
        setTimeout(connectWebSocket, 5000);
    });

    function handleRealTimeUpdate(data) {
        // Update specific dashboard components based on message type
        switch(data.type) {
            case 'activity_update':
                updateActivityFeed(data.activities);
                break;
            case 'performance_update':
                updatePerformanceChart(data.metrics);
                break;
            case 'event_update':
                updateUpcomingEvents(data.events);
                break;
            // Add more cases as needed
        }
    }

    function updateActivityFeed(activities) {
        // Implement DOM updates for activity feed
        const activityList = document.querySelector('.activity-list');
        activityList.innerHTML = ''; // Clear existing
        
        activities.forEach(activity => {
            const activityItem = document.createElement('div');
            activityItem.className = 'activity-item';
            activityItem.innerHTML = `
                <div class="activity-icon">
                    <i class="${getActivityIcon(activity.type)}"></i>
                </div>
                <div class="activity-details">
                    <h4>${activity.title}</h4>
                    <p>${activity.description}</p>
                    <span class="activity-time">${formatTime(activity.timestamp)}</span>
                </div>
            `;
            activityList.prepend(activityItem);
        });
    }
});