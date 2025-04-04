// DOM Elements
document.addEventListener('DOMContentLoaded', function() {
    // Calendar functionality
    const calendarGrid = document.getElementById('calendar-grid');
    const prevMonthBtn = document.getElementById('prev-month');
    const nextMonthBtn = document.getElementById('next-month');
    const currentMonthLabel = document.getElementById('current-month');
    
    // Filter buttons
    const filterButtons = document.querySelectorAll('.filter-btn');
    const tournamentItems = document.querySelectorAll('.tournament-item');
    
    // Current date
    let currentDate = new Date();
    let currentMonth = currentDate.getMonth();
    let currentYear = currentDate.getFullYear();
    
    // Sample events data - in a real application, this would come from a database
    const events = [
        {
            title: "Basketball Tournament",
            date: new Date(2025, 3, 5),
            type: "basketball",
            location: "City Arena"
        },
        {
            title: "Tennis Open",
            date: new Date(2025, 3, 12),
            type: "tennis",
            location: "Tennis Stadium"
        },
        {
            title: "Swimming Competition",
            date: new Date(2025, 3, 18),
            type: "swimming",
            location: "Aquatic Center"
        },
        {
            title: "Soccer League Opener",
            date: new Date(2025, 3, 22),
            type: "soccer",
            location: "Main Stadium"
        },
        {
            title: "Volleyball Tournament",
            date: new Date(2025, 3, 25),
            type: "volleyball",
            location: "Sports Complex"
        },
        {
            title: "Track & Field Meet",
            date: new Date(2025, 3, 28),
            type: "track",
            location: "Olympic Stadium"
        },
        {
            title: "Regional Basketball Finals",
            date: new Date(2025, 4, 10),
            type: "basketball",
            location: "City Arena"
        }
    ];
    
    // Initialize the page
    initCalendar();
    initEventListeners();
    
    // Initialize calendar with current month
    function initCalendar() {
        updateCalendar();
    }
    
    // Set up event listeners
    function initEventListeners() {
        // Calendar navigation
        prevMonthBtn.addEventListener('click', () => {
            currentMonth--;
            if (currentMonth < 0) {
                currentMonth = 11;
                currentYear--;
            }
            updateCalendar();
        });
        
        nextMonthBtn.addEventListener('click', () => {
            currentMonth++;
            if (currentMonth > 11) {
                currentMonth = 0;
                currentYear++;
            }
            updateCalendar();
        });
        
        // Filter buttons
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                const filter = button.getAttribute('data-filter');
                
                // Update active button
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                
                // Filter tournaments
                filterTournaments(filter);
            });
        });
        
        // Event card hover effects
        const eventCards = document.querySelectorAll('.event-card');
        eventCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-10px)';
                card.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.1)';
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0)';
                card.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.1)';
            });
        });
        
        // Register buttons
        const registerButtons = document.querySelectorAll('.register-event-btn, .register-btn');
        registerButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                alert('Registration form would open here.');
            });
        });
        
        // Search functionality
        const searchInput = document.querySelector('.search-container input');
        const searchButton = document.querySelector('.search-btn');
        
        searchButton.addEventListener('click', () => {
            const searchTerm = searchInput.value.toLowerCase().trim();
            if (searchTerm) {
                alert(`Searching for: ${searchTerm}`);
                // In a real application, this would trigger a search
            } else {
                alert('Please enter a search term');
            }
        });
    }
    
    // Update calendar with events
    function updateCalendar() {
        // Update month/year display
        const monthNames = ["January", "February", "March", "April", "May", "June",
                           "July", "August", "September", "October", "November", "December"];
        currentMonthLabel.textContent = `${monthNames[currentMonth]} ${currentYear}`;
        
        // Clear existing calendar
        calendarGrid.innerHTML = '';
        
        // Get the first day of the month
        const firstDay = new Date(currentYear, currentMonth, 1).getDay();
        // Get the number of days in the month
        const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
        
        // Create empty cells for days before the first day of the month
        for (let i = 0; i < firstDay; i++) {
            const emptyDay = document.createElement('div');
            emptyDay.className = 'calendar-day empty';
            calendarGrid.appendChild(emptyDay);
        }
        
        // Create cells for each day in the month
        for (let day = 1; day <= daysInMonth; day++) {
            const dayCell = document.createElement('div');
            dayCell.className = 'calendar-day';
            
            // Add day number
            const dayNumber = document.createElement('div');
            dayNumber.className = 'day-number';
            dayNumber.textContent = day;
            dayCell.appendChild(dayNumber);
            
            // Check if there are events on this day
            const dayEvents = events.filter(event => {
                return event.date.getDate() === day && 
                       event.date.getMonth() === currentMonth && 
                       event.date.getFullYear() === currentYear;
            });
            
            // Add events to the day cell
            dayEvents.forEach(event => {
                const eventElement = document.createElement('div');
                eventElement.className = `day-event event-${event.type}`;
                eventElement.textContent = event.title;
                
                // Add tooltip with event details
                eventElement.title = `${event.title} - ${event.location}`;
                
                dayCell.appendChild(eventElement);
            });
            
            // Highlight current day
            const today = new Date();
            if (day === today.getDate() && 
                currentMonth === today.getMonth() && 
                currentYear === today.getFullYear()) {
                dayCell.style.backgroundColor = '#f0f8ff';
                dayNumber.style.fontWeight = 'bold';
                dayNumber.style.color = '#0066cc';
            }
            
            // Add day cell to grid
            calendarGrid.appendChild(dayCell);
        }
    }
    
    // Filter tournaments by type
    function filterTournaments(filter) {
        tournamentItems.forEach(item => {
            const itemType = item.getAttribute('data-type');
            
            if (filter === 'all' || itemType === filter) {
                item.style.display = 'flex';
            } else {
                item.style.display = 'none';
            }
        });
    }
    
    // Add smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Get the target section
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Add animations for elements when they come into view
    const animateOnScroll = () => {
        const sections = document.querySelectorAll('section');
        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (sectionTop < windowHeight - 100) {
                section.style.opacity = '1';
                section.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Initialize section animations
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    // Add scroll event listener for animations
    window.addEventListener('scroll', animateOnScroll);
    
    // Initial check for animations
    animateOnScroll();
    
    // Add sticky navigation effect
    const navbar = document.querySelector('.navbar');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            navbar.style.boxShadow = '0 4px 10px rgba(0, 0, 0, 0.1)';
            navbar.style.padding = '0.8rem 5%';
        } else {
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
            navbar.style.padding = '1rem 5%';
        }
        
        lastScrollTop = scrollTop;
    });
    
    // Add responsive menu toggle for mobile
    const createMobileMenu = () => {
        const navbar = document.querySelector('.navbar');
        const menuButton = document.createElement('button');
        menuButton.className = 'menu-toggle';
        menuButton.innerHTML = '<i class="fas fa-bars"></i>';
        navbar.appendChild(menuButton);
        
        menuButton.addEventListener('click', () => {
            document.querySelector('.nav-links').classList.toggle('active');
        });
    };
    
    // Check if we need mobile menu
    if (window.innerWidth < 768) {
        createMobileMenu();
    }
    
    // Add resize listener for responsive design
    window.addEventListener('resize', () => {
        if (window.innerWidth < 768) {
            if (!document.querySelector('.menu-toggle')) {
                createMobileMenu();
            }
        } else {
            const menuButton = document.querySelector('.menu-toggle');
            if (menuButton) {
                menuButton.remove();
                document.querySelector('.nav-links').classList.remove('active');
            }
        }
    });
    
    // Add CSS for mobile menu
    const addMobileStyles = () => {
        const style = document.createElement('style');
        style.innerHTML = `
            @media (max-width: 768px) {
                .navbar {
                    flex-wrap: wrap;
                }
                
                .nav-links {
                    display: none;
                    width: 100%;
                    flex-direction: column;
                    gap: 1rem;
                    padding: 1rem 0;
                }
                
                .nav-links.active {
                    display: flex;
                }
                
                .menu-toggle {
                    background: none;
                    border: none;
                    font-size: 1.5rem;
                    cursor: pointer;
                }
                
                .events-grid {
                    grid-template-columns: 1fr;
                }
                
                .tournament-item {
                    flex-direction: column;
                    align-items: flex-start;
                    gap: 1rem;
                }
                
                .tournament-meta {
                    flex-direction: column;
                    gap: 0.5rem;
                }
                
                .footer-content {
                    flex-direction: column;
                    gap: 2rem;
                }
            }
        `;
        document.head.appendChild(style);
    };
    
    addMobileStyles();
});