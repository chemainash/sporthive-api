document.addEventListener('DOMContentLoaded', function() {
    // Community card join buttons
    const joinButtons = document.querySelectorAll('.join-btn');
    joinButtons.forEach(button => {
        button.addEventListener('click', function() {
            const currentText = this.textContent;
            if (currentText === 'Join Community') {
                this.textContent = 'Joined ✓';
                this.style.backgroundColor = '#1e88e5';
                this.style.color = 'white';
            } else {
                this.textContent = 'Join Community';
                this.style.backgroundColor = 'transparent';
                this.style.color = '#1e88e5';
            }
        });
    });

// Pagination
const pageButtons = document.querySelectorAll('.page-btn');
pageButtons.forEach(button => {
    button.addEventListener('click', function() {
        // Remove active class from all buttons
        pageButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button if it's not the navigation arrow
        if (!this.querySelector('svg')) {
            this.classList.add('active');
        }
        // In a real application, this would trigger loading of the next page of content
        // For demo purposes, we'll just scroll back to the top of the communities section
        document.querySelector('.communities-section').scrollIntoView({ behavior: 'smooth' });
    });
});

// Search functionality
const searchInput = document.querySelector('.search-bar input');
const communityCards = document.querySelectorAll('.community-card');

searchInput.addEventListener('input', function() {
    const searchTerm = this.value.toLowerCase();
    
    communityCards.forEach(card => {
        const communityName = card.querySelector('h3').textContent.toLowerCase();
        const tags = Array.from(card.querySelectorAll('.tag')).map(tag => tag.textContent.toLowerCase());
        
        // Check if search term is in community name or tags
        const matchesSearch = communityName.includes(searchTerm) || 
                             tags.some(tag => tag.includes(searchTerm));
        
        // Show or hide card based on search match
        card.style.display = matchesSearch ? 'block' : 'none';
    });
});

// Filter functionality
const sortBySelect = document.getElementById('sort-by');
const sportTypeSelect = document.getElementById('sport-type');

// Function to handle sorting and filtering
function applyFilters() {
    const sortBy = sortBySelect.value;
    const sportType = sportTypeSelect.value;
    
    // In a real application, this would re-fetch or re-render the data
    // For demo purposes, we'll just simulate different sorting
    
    // Get all cards as an array for sorting
    const cardsArray = Array.from(communityCards);
    
    // Apply sport type filtering
    cardsArray.forEach(card => {
        const tags = Array.from(card.querySelectorAll('.tag')).map(tag => tag.textContent.toLowerCase());
        
        if (sportType === 'all') {
            card.style.display = 'block';
        } else if (sportType === 'team' && tags.some(tag => tag.includes('team'))) {
            card.style.display = 'block';
        } else if (sportType === 'individual' && tags.some(tag => tag.includes('individual'))) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
    
    // Apply sorting
    const visibleCards = cardsArray.filter(card => card.style.display !== 'none');
    
    // Sort based on selected option
    if (sortBy === 'popular') {
        // Sort by member count (descending)
        visibleCards.sort((a, b) => {
            const membersA = parseInt(a.querySelector('.card-stat').textContent.match(/\d+(\.\d+)?/)[0]);
            const membersB = parseInt(b.querySelector('.card-stat').textContent.match(/\d+(\.\d+)?/)[0]);
            return membersB - membersA;
        });
    } else if (sortBy === 'newest') {
        // For demo, we'll just shuffle the cards
        for (let i = visibleCards.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [visibleCards[i], visibleCards[j]] = [visibleCards[j], visibleCards[i]];
        }
    } else if (sortBy === 'activity') {
        // In a real app, this would sort by activity level
        // For demo, we'll keep them in the same order
    }
    
    // Re-append cards in the new order
    const container = document.querySelector('.communities-grid');
    visibleCards.forEach(card => container.appendChild(card));
}

// Add event listeners to select elements
sortBySelect.addEventListener('change', applyFilters);
sportTypeSelect.addEventListener('change', applyFilters);

// Mobile menu toggle (if we had a mobile menu button)
const registerButton = document.querySelector('.register-btn');
registerButton.addEventListener('click', function() {
    alert('Registration form would open here!');
});

// Add hover effects for better UX
const allCards = document.querySelectorAll('.community-card');
allCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px)';
        this.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.15)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
        this.style.boxShadow = '0 3px 10px rgba(0, 0, 0, 0.1)';
    });
});

// Featured community CTA buttons
const createAccountBtn = document.querySelector('.primary-btn');
createAccountBtn.addEventListener('click', function() {
    alert('Registration form would open here!');
});

const learnMoreBtn = document.querySelector('.secondary-btn');
learnMoreBtn.addEventListener('click', function() {
    alert('Learn more about PlayNexus communities!');
});

// Initialize the page with default sorting
window.addEventListener('load', function() {
    applyFilters();
});

}); 