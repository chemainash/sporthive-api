// Toggle sidebar functionality
document.addEventListener('DOMContentLoaded', function() {
    const toggleBtn = document.getElementById('toggle-sidebar');
    const sidebar = document.querySelector('.sidebar');
    
    if (toggleBtn && sidebar) {
        toggleBtn.addEventListener('click', function() {
            sidebar.classList.toggle('collapsed');
        });
    }
    
    // Simulated chart data for user activity
    renderActivityChart();
    
    // Simulated chart data for sport distribution
    renderSportDistribution();
});

// Render Activity Chart (simple placeholder)
function renderActivityChart() {
    const activityChart = document.getElementById('activity-chart');
    
    if (activityChart) {
        // In a real application, you would use a charting library like Chart.js
        // This is a placeholder to represent what the chart would look like
        activityChart.innerHTML = `
            <div style="width: 100%; height: 100%; display: flex; flex-direction: column; justify-content: center; align-items: center;">
                <svg width="80%" height="80%" viewBox="0 0 300 200">
                    <!-- Chart grid lines -->
                    <line x1="50" y1="180" x2="280" y2="180" stroke="#e1e4e8" stroke-width="1" />
                    <line x1="50" y1="140" x2="280" y2="140" stroke="#e1e4e8" stroke-width="1" />
                    <line x1="50" y1="100" x2="280" y2="100" stroke="#e1e4e8" stroke-width="1" />
                    <line x1="50" y1="60" x2="280" y2="60" stroke="#e1e4e8" stroke-width="1" />
                    <line x1="50" y1="20" x2="280" y2="20" stroke="#e1e4e8" stroke-width="1" />
                    
                    <!-- Y-axis labels -->
                    <text x="40" y="180" text-anchor="end" font-size="10" fill="#6c757d">0</text>
                    <text x="40" y="140" text-anchor="end" font-size="10" fill="#6c757d">100</text>
                    <text x="40" y="100" text-anchor="end" font-size="10" fill="#6c757d">200</text>
                    <text x="40" y="60" text-anchor="end" font-size="10" fill="#6c757d">300</text>
                    <text x="40" y="20" text-anchor="end" font-size="10" fill="#6c757d">400</text>
                    
                    <!-- X-axis labels -->
                    <text x="50" y="195" text-anchor="middle" font-size="10" fill="#6c757d">Mon</text>
                    <text x="88" y="195" text-anchor="middle" font-size="10" fill="#6c757d">Tue</text>
                    <text x="126" y="195" text-anchor="middle" font-size="10" fill="#6c757d">Wed</text>
                    <text x="164" y="195" text-anchor="middle" font-size="10" fill="#6c757d">Thu</text>
                    <text x="202" y="195" text-anchor="middle" font-size="10" fill="#6c757d">Fri</text>
                    <text x="240" y="195" text-anchor="middle" font-size="10" fill="#6c757d">Sat</text>
                    <text x="278" y="195" text-anchor="middle" font-size="10" fill="#6c757d">Sun</text>
                    
                    <!-- Line chart for users -->
                    <polyline 
                        points="50,120 88,100 126,150 164,80 202,60 240,90 278,30" 
                        fill="none" 
                        stroke="#4a90e2" 
                        stroke-width="2"
                    />
                    
                    <!-- Data points -->
                    <circle cx="50" cy="120" r="4" fill="#4a90e2" />
                    <circle cx="88" cy="100" r="4" fill="#4a90e2" />
                    <circle cx="126" cy="150" r="4" fill="#4a90e2" />
                    <circle cx="164" cy="80" r="4" fill="#4a90e2" />
                    <circle cx="202" cy="60" r="4" fill="#4a90e2" />
                    <circle cx="240" cy="90" r="4" fill="#4a90e2" />
                    <circle cx="278" cy="30" r="4" fill="#4a90e2" />
                </svg>
                <div style="font-size: 12px; color: #6c757d; margin-top: 10px;">Daily User Activity (Past Week)</div>
            </div>
        `;
    }
}

// Render Sport Distribution Chart (simple placeholder)
function renderSportDistribution() {
    const sportDistribution = document.getElementById('sport-distribution');
    
    if (sportDistribution) {
        // In a real application, you would use a charting library like Chart.js
        // This is a placeholder to represent what the chart would look like
        sportDistribution.innerHTML = `
            <div style="width: 100%; height: 100%; display: flex; justify-content: center; align-items: center;">
                <svg width="80%" height="80%" viewBox="0 0 200 200">
                    <!-- Pie chart -->
                    <circle cx="100" cy="100" r="80" fill="#f5f7fa" />
                    
                    <!-- Chart segments -->
                    <!-- Basketball 28% -->
                    <path d="M100,100 L100,20 A80,80 0 0,1 162.4,129.6 Z" fill="#4a90e2" />
                    
                    <!-- Swimming 22% -->
                    <path d="M100,100 L162.4,129.6 A80,80 0 0,1 114.4,176.8 Z" fill="#50e3c2" />
                    
                    <!-- Tennis 18% -->
                    <path d="M100,100 L114.4,176.8 A80,80 0 0,1 40.8,156 Z" fill="#f5a623" />
                    
                    <!-- Running 14% -->
                    <path d="M100,100 L40.8,156 A80,80 0 0,1 22,86.4 Z" fill="#ff5252" />
                    
                    <!-- Others 18% -->
                    <path d="M100,100 L22,86.4 A80,80 0 0,1 100,20 Z" fill="#9013fe" />
                    
                    <!-- Center circle -->
                    <circle cx="100" cy="100" r="40" fill="white" />
                </svg>
            </div>
        `;
    }
}

// Function to handle tab switching in widgets
function switchTab(tabContainer, activeTabIndex) {
    const tabs = tabContainer.querySelectorAll('.btn-text');
    tabs.forEach((tab, index) => {
        if (index === activeTabIndex) {
            tab.classList.add('active');
        } else {
            tab.classList.remove('active');
        }
    });
}

// Handle notifications dropdown (simplified)
function toggleDropdown(element) {
    const dropdown = element.nextElementSibling;
    if (dropdown) {
        dropdown.classList.toggle('show');
    }
}

// Close dropdowns when clicking outside
document.addEventListener('click', function(event) {
    const dropdowns = document.querySelectorAll('.dropdown-menu.show');
    dropdowns.forEach(dropdown => {
        if (!dropdown.previousElementSibling.contains(event.target)) {
            dropdown.classList.remove('show');
        }
    });
});

// Simple data refresh animation
function refreshData(element) {
    element.classList.add('rotating');
    setTimeout(() => {
        element.classList.remove('rotating');
        showToast('Data refreshed successfully!');
    }, 1000);
}

// Toast notification system
function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `
        <div class="toast-content">
            <i class="fas fa-check-circle"></i>
            <span>${message}</span>
        </div>
    `;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.classList.add('show');
    }, 10);
    
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(toast);
        }, 300);
    }, 3000);
}