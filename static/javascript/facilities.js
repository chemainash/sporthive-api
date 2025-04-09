 // Dashboard Functionality
 document.addEventListener('DOMContentLoaded', function() {
    // Sample data - would normally come from an API
    const facilityData = [
        { id: 1, name: 'Central Indoor Court', type: 'Basketball', utilization: 89, rating: 4.8 },
        { id: 2, name: 'Eastside Tennis Complex', type: 'Tennis', utilization: 76, rating: 4.6 },
        { id: 3, name: 'Olympic Indoor Pool', type: 'Swimming', utilization: 92, rating: 4.9 },
        { id: 4, name: 'Westfield Soccer Grounds', type: 'Soccer', utilization: 81, rating: 4.5 }
    ];
    
    // Facility card click event
    const facilityCards = document.querySelectorAll('.facility-card');
    facilityCards.forEach(card => {
        card.addEventListener('click', function() {
            // Would normally navigate to facility detail page
            console.log('Facility card clicked');
        });
    });
    
    // Action buttons event
    const actionButtons = document.querySelectorAll('.action-btn');
    actionButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation(); // Prevent triggering card click
            // Would normally open a modal or navigate to booking details
            alert('Booking details would open here');
        });
    });
    
    // Simulate data updates (in a real app, this would use WebSockets or polling)
    setInterval(() => {
        // Update random stats to simulate live data
        const statValues = document.querySelectorAll('.stat-value');
        const randomStat = Math.floor(Math.random() * statValues.length);
        
        if (randomStat === 0) {
            // Active facilities - don't change too much
            const current = parseInt(statValues[0].textContent);
            statValues[0].textContent = Math.max(20, Math.min(30, current + (Math.random() > 0.5 ? 1 : -1)));
        } else if (randomStat === 1) {
            // Bookings this week
            const current = parseInt(statValues[1].textContent);
            statValues[1].textContent = Math.max(100, Math.min(200, current + Math.floor(Math.random() * 10) - 4));
        } else if (randomStat === 2) {
            // Capacity utilization
            const current = parseInt(statValues[2].textContent);
            statValues[2].textContent = Math.max(70, Math.min(95, current + Math.floor(Math.random() * 3) - 1)) + '%';
        }
    }, 10000); // Update every 10 seconds
});