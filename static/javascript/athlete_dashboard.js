// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.style.padding = '10px 50px';
            navbar.style.boxShadow = '0 2px 15px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.padding = '15px 50px';
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        }
    });

    // Testimonial carousel functionality
    const slides = document.querySelectorAll('.testimonial-slide');
    const indicators = document.querySelectorAll('.indicator');
    const prevBtn = document.querySelector('.carousel-prev');
    const nextBtn = document.querySelector('.carousel-next');
    
    let currentSlide = 0;
    const totalSlides = slides.length;
    
    // Initialize carousel
    updateCarousel();
    
    // Next button click
    nextBtn.addEventListener('click', function() {
        currentSlide = (currentSlide + 1) % totalSlides;
        updateCarousel();
    });
    
    // Previous button click
    prevBtn.addEventListener('click', function() {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        updateCarousel();
    });
    
    // Indicator clicks
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', function() {
            currentSlide = index;
            updateCarousel();
        });
    });
    
    function updateCarousel() {
        // Hide all slides
        slides.forEach(slide => {
            slide.classList.remove('active');
            slide.style.display = 'none';
        });
        
        // Show current slide
        slides[currentSlide].classList.add('active');
        slides[currentSlide].style.display = 'block';
        
        // Update indicators
        indicators.forEach((indicator, index) => {
            if (index === currentSlide) {
                indicator.classList.add('active');
            } else {
                indicator.classList.remove('active');
            }
        });
    }
    
    // Auto rotate carousel
    setInterval(() => {
        currentSlide = (currentSlide + 1) % totalSlides;
        updateCarousel();
    }, 5000);

    // Search functionality
    const searchInput = document.querySelector('.search-bar input');
    const categoryCards = document.querySelectorAll('.category-card');
    
    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        
        categoryCards.forEach(card => {
            const sportName = card.querySelector('h3').textContent.toLowerCase();
            if (sportName.includes(searchTerm)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });

    // Button hover effects
    const buttons = document.querySelectorAll('button');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Feature cards animation on scroll
    const featureCards = document.querySelectorAll('.feature-card');
    
    window.addEventListener('scroll', function() {
        featureCards.forEach(card => {
            const cardPosition = card.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (cardPosition < screenPosition) {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }
        });
    });

    // Initialize feature cards
    featureCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });

    // Mobile navigation toggle
    const registerBtn = document.querySelector('.register-btn');
    
    // Simulate mobile menu for demo purposes
    if (window.innerWidth <= 768) {
        const mobileMenuBtn = document.createElement('button');
        mobileMenuBtn.classList.add('mobile-menu-btn');
        mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
        
        navbar.insertBefore(mobileMenuBtn, registerBtn);
        
        mobileMenuBtn.addEventListener('click', function() {
            alert('Mobile menu would open here');
        });
    }

    // Event registration functionality
    const registerEventBtns = document.querySelectorAll('.register-event-btn, .join-btn');
    
    registerEventBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            alert('Registration form would open here');
        });
    });

    // Add smooth scrolling for all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add current date to the events
    const eventDates = document.querySelectorAll('.date-time p:first-of-type');
    
    eventDates.forEach(date => {
        if (date.textContent.includes('2024')) {
            // Keep the existing date
        } else {
            const currentDate = new Date();
            const options = { year: 'numeric', month: 'long', day: 'numeric' };
            date.textContent = currentDate.toLocaleDateString('en-US', options);
        }
    });

    // Analytics tracking (simulated)
    function trackEvent(eventName, eventData) {
        console.log(`Event tracked: ${eventName}`, eventData);
        // In a real application, this would send data to an analytics service
    }

    // Track page view
    trackEvent('page_view', { page: 'home' });

    // Track button clicks
    document.querySelectorAll('button').forEach(button => {
        button.addEventListener('click', function() {
            const buttonText = this.textContent.trim();
            trackEvent('button_click', { button: buttonText });
        });
    });

    // Load more sports functionality (simulated)
    const seeAllLink = document.querySelector('.see-all');
    
    seeAllLink.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Simulate loading more sports categories
        const newCategories = [
            { name: 'Football', coaches: 32 },
            { name: 'Golf', coaches: 15 },
            { name: 'Cycling', coaches: 19 },
            { name: 'Boxing', coaches: 24 }
        ];
        
        const categoriesGrid = document.querySelector('.categories-grid');
        
        newCategories.forEach(category => {
            const card = document.createElement('div');
            card.classList.add('category-card');
            card.style.backgroundColor = getRandomColor();
            
            card.innerHTML = `
                <div class="category-info">
                    <h3>${category.name}</h3>
                    <p>${category.coaches} Coaches</p>
                </div>
            `;
            
            categoriesGrid.appendChild(card);
        });
        
        // Hide the "See All" link after loading more
        this.style.display = 'none';
        
        trackEvent('load_more', { section: 'sports_categories' });
    });
    
    function getRandomColor() {
        const colors = ['#f57c00', '#039be5', '#8d6e63', '#9ccc65', '#7b1fa2', '#d32f2f', '#00897b'];
        return colors[Math.floor(Math.random() * colors.length)];
    }
});