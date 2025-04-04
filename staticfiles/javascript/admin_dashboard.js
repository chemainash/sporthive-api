// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize charts
    initUserGrowthChart();
    initSportDistributionChart();
    
    // Initialize event listeners
    initEventListeners();
});

// Function to initialize user growth chart
function initUserGrowthChart() {
    const ctx = document.getElementById('userGrowthChart').getContext('2d');
    
    // Sample data for user growth
    const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const data = {
        labels: labels,
        datasets: [{
            label: 'New Users',
            data: [1250, 1450, 1320, 1850, 2100, 2400, 2300, 2600, 2850, 3100, 3400, 3620],
            backgroundColor: 'rgba(52, 152, 219, 0.2)',
            borderColor: 'rgba(52, 152, 219, 1)',
            borderWidth: 2,
            tension: 0.4,
            fill: true,
            pointBackgroundColor: '#fff',
            pointBorderColor: 'rgba(52, 152, 219, 1)',
            pointRadius: 4
        }, {
            label: 'Active Users',
            data: [5200, 5800, 6100, 6700, 7200, 7800, 8300, 9000, 9500, 10200, 11000, 12000],
            backgroundColor: 'rgba(46, 204, 113, 0.2)',
            borderColor: 'rgba(46, 204, 113, 1)',
            borderWidth: 2,
            tension: 0.4,
            fill: true,
            pointBackgroundColor: '#fff',
            pointBorderColor: 'rgba(46, 204, 113, 1)',
            pointRadius: 4
        }]
    };

    const config = {
        type: 'line',
        data: data,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top',
                },
                tooltip: {
                    backgroundColor: 'rgba(0, 0, 0, 0.7)',
                    padding: 10,
                    cornerRadius: 6,
                    titleFont: {
                        size: 14,
                        weight: 'bold'
                    },
                    bodyFont: {
                        size: 13
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        color: 'rgba(0, 0, 0, 0.05)'
                    }
                },
                x: {
                    grid: {
                        display: false
                    }
                }
            }
        }
    };

    const userGrowthChart = new Chart(ctx, config);

    // Handle chart period buttons
    const chartButtons = document.querySelectorAll('.chart-container:first-child .btn-chart');
    chartButtons.forEach(button => {
        button.addEventListener('click', function() {
            chartButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Here you would update the chart data based on the selected period
            // For demonstration, we'll just simulate a data update
            if (this.textContent === 'Weekly') {
                userGrowthChart.data.datasets[0].data = [320, 420, 510, 790, 940, 1050, 980, 1120, 1250, 1380, 1520, 1620];
                userGrowthChart.data.datasets[1].data = [1250, 1380, 1520, 1700, 1900, 2050, 2180, 2300, 2450, 2600, 2750, 2900];
            } else if (this.textContent === 'Monthly') {
                userGrowthChart.data.datasets[0].data = [1250, 1450, 1320, 1850, 2100, 2400, 2300, 2600, 2850, 3100, 3400, 3620];
                userGrowthChart.data.datasets[1].data = [5200, 5800, 6100, 6700, 7200, 7800, 8300, 9000, 9500, 10200, 11000, 12000];
            } else if (this.textContent === 'Yearly') {
                userGrowthChart.data.datasets[0].data = [8520, 10450, 12800, 15400, 18700, 22500, 26300, 31000, 35500, 39200, 42500, 45800];
                userGrowthChart.data.datasets[1].data = [32000, 38000, 45000, 52000, 60000, 68000, 75000, 82000, 88000, 94000, 100000, 112000];
            }
            userGrowthChart.update();
        });
    });
}

// Function to initialize sport distribution chart
function initSportDistributionChart() {
    const ctx = document.getElementById('sportDistributionChart').getContext('2d');
    
    // Sample data for sport distribution
    const data = {
        labels: ['Basketball', 'Soccer', 'Tennis', 'Swimming', 'Volleyball', 'Cricket', 'Baseball'],
        datasets: [{
            label: 'Number of Players',
            data: [3245, 2876, 1987, 1542, 1285, 1120, 940],
            backgroundColor: [
                'rgba(231, 76, 60, 0.8)',
                'rgba(52, 152, 219, 0.8)',
                'rgba(46, 204, 113, 0.8)',
                'rgba(155, 89, 182, 0.8)',
                'rgba(241, 196, 15, 0.8)',
                'rgba(230, 126, 34, 0.8)',
                'rgba(149, 165, 166, 0.8)'
            ],
            borderColor: '#fff',
            borderWidth: 2
        }]
    };

    const config = {
        type: 'doughnut',
        data: data,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'right',
                    labels: {
                        padding: 20,
                        boxWidth: 15,
                        font: {
                            size: 12
                        }
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(0, 0, 0, 0.7)',
                    padding: 10,
                    cornerRadius: 6,
                    callbacks: {
                        label: function(context) {
                            const label = context.label || '';
                            const value = context.formattedValue;
                            const dataset = context.dataset;
                            const total = dataset.data.reduce((acc, data) => acc + data, 0);
                            const percentage = Math.round((context.raw / total) * 100);
                            return `${label}: ${value} (${percentage}%)`;
                        }
                    }
                }
            },
            cutout: '65%'
        }
    };

    const sportDistributionChart = new Chart(ctx, config);

    // Handle chart filter buttons
    const chartButtons = document.querySelectorAll('.chart-container:nth-child(2) .btn-chart');
    chartButtons.forEach(button => {
        button.addEventListener('click', function() {
            chartButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Here you would update the chart data based on the selected filter
            // For demonstration, we'll just simulate a data update
            if (this.textContent === 'All Sports') {
                sportDistributionChart.data.labels = ['Basketball', 'Soccer', 'Tennis', 'Swimming', 'Volleyball', 'Cricket', 'Baseball'];
                sportDistributionChart.data.datasets[0].data = [3245, 2876, 1987, 1542, 1285, 1120, 940];
            } else if (this.textContent === 'Top 5') {
                sportDistributionChart.data.labels = ['Basketball', 'Soccer', 'Tennis', 'Swimming', 'Volleyball'];
                sportDistributionChart.data.datasets[0].data = [3245, 2876, 1987, 1542, 1285];
            }
            sportDistributionChart.update();
        });
    });
}

// Function to initialize event listeners
function initEventListeners() {
    // Notifications dropdown
    const notifications = document.querySelector('.notifications');
    notifications && notifications.addEventListener('click', function() {
        // Toggle notifications dropdown
        console.log('Notifications clicked');
        // Implement dropdown functionality here
    });
    
    // Messages dropdown
    const messages = document.querySelector('.messages');
    messages && messages.addEventListener('click', function() {
        // Toggle messages dropdown
        console.log('Messages clicked');
        // Implement dropdown functionality here
    });
    
    // Admin dropdown
    const adminDropdown = document.querySelector('.admin-dropdown');
    adminDropdown && adminDropdown.addEventListener('click', function() {
        // Toggle admin dropdown
        console.log('Admin dropdown clicked');
        // Implement dropdown functionality here
    });
    
    // Filter button
    const filterBtn = document.querySelector('.btn-filter');
    filterBtn && filterBtn.addEventListener('click', function() {
        // Show date filter picker
        console.log('Filter button clicked');
        // Implement date picker functionality here
    });
    
    // View all buttons
    const viewAllButtons = document.querySelectorAll('.view-all');
    viewAllButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const section = this.closest('.section-header').querySelector('h2').textContent;
            console.log(`View all clicked for ${section}`);
            // Implement view all functionality here
        });
    });
    
    // Responsive sidebar toggle for mobile
    const sidebarToggle = document.createElement('button');
    sidebarToggle.classList.add('sidebar-toggle');
    sidebarToggle.innerHTML = '<i class="fas fa-bars"></i>';
    document.querySelector('.main-header').prepend(sidebarToggle);
    
    sidebarToggle.addEventListener('click', function() {
        const sidebar = document.querySelector('.sidebar');
        sidebar.classList.toggle('show-sidebar');
    });
    
    // Add mobile styles
    const style = document.createElement('style');
    style.textContent = `
        @media (max-width: 768px) {
            .sidebar-toggle {
                display: block;
                background: none;
                border: none;
                font-size: 1.2rem;
                cursor: pointer;
                margin-right: 15px;
            }
            
            .sidebar {
                transform: translateX(-100%);
                transition: transform 0.3s ease;
            }
            
            .sidebar.show-sidebar {
                transform: translateX(0);
            }
        }
        
        @media (min-width: 769px) {
            .sidebar-toggle {
                display: none;
            }
        }
    `;
    document.head.appendChild(style);
    
    // Handle window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            const sidebar = document.querySelector('.sidebar');
            sidebar.classList.remove('show-sidebar');
        }
    });
}

// Simulating real-time data updates
function simulateRealTimeUpdates() {
    // Update random stats every 30 seconds
    setInterval(function() {
        const statValues = document.querySelectorAll('.stat-info h3');
        const randomIndex = Math.floor(Math.random() * statValues.length);
        const statValue = statValues[randomIndex];
        const currentValue = parseInt(statValue.textContent.replace(/,/g, '').replace('$', ''));
        
        // Generate a random increase
        const increase = Math.floor(Math.random() * 50) + 1;
        const newValue = currentValue + increase;
        
        // Format the value properly
        if (statValue.textContent.includes('$')) {
            statValue.textContent = '$' + newValue.toLocaleString();
        } else {
            statValue.textContent = newValue.toLocaleString();
        }
        
        // Flash animation to indicate update
        statValue.style.animation = 'flash 1s';
        setTimeout(() => {
            statValue.style.animation = '';
        }, 1000);
    }, 30000);
    
    // Add new activity every 45 seconds
    setInterval(function() {
        const activityList = document.querySelector('.activity-list');
        if (!activityList) return;
        
        const activities = [
            {
                icon: 'user-plus',
                text: '<strong>Emma Wilson</strong> registered for <strong>Swimming Competition</strong>',
                time: 'Just now'
            },
            {
                icon: 'comment',
                text: '<strong>Michael Brown</strong> left a review on <strong>Soccer League</strong>',
                time: 'Just now'
            },
            {
                icon: 'trophy',
                text: '<strong>Boston Eagles</strong> won the <strong>Regional Basketball Tournament</strong>',
                time: 'Just now'
            }
        ];
        
        const randomActivity = activities[Math.floor(Math.random() * activities.length)];
        
        // Create new activity element
        const newActivity = document.createElement('div');
        newActivity.className = 'activity-item';
        newActivity.innerHTML = `
            <div class="activity-icon">
                <i class="fas fa-${randomActivity.icon}"></i>
            </div>
            <div class="activity-details">
                <p class="activity-text">${randomActivity.text}</p>
                <p class="activity-time">${randomActivity.time}</p>
            </div>
        `;
        
        // Add to the list and remove the last item if more than 4
        newActivity.style.opacity = '0';
        activityList.prepend(newActivity);
        setTimeout(() => {
            newActivity.style.transition = 'opacity 0.5s';
            newActivity.style.opacity = '1';
        }, 100);
        
        if (activityList.childElementCount > 4) {
            activityList.lastElementChild.remove();
        }
    }, 45000);
}

// Start simulating real-time updates
simulateRealTimeUpdates();