document.addEventListener('DOMContentLoaded', () => {
    // Sample data for dashboard
    const athleteData = [
        { id: 1, name: "Alex Johnson", sport: "Basketball", sessions: 24, progress: 85, lastActive: "Yesterday" },
        { id: 2, name: "Maria Garcia", sport: "Soccer", sessions: 18, progress: 72, lastActive: "Today" },
        { id: 3, name: "Jamal Williams", sport: "Swimming", sessions: 30, progress: 92, lastActive: "Today" },
        { id: 4, name: "Sarah Miller", sport: "Tennis", sessions: 12, progress: 65, lastActive: "3 days ago" },
        { id: 5, name: "David Chen", sport: "Rock Climbing", sessions: 15, progress: 70, lastActive: "Yesterday" }
    ];

    const upcomingEvents = [
        { id: 1, title: "Team Practice", date: "2025-04-02", time: "15:00", location: "Main Court", attendees: 12 },
        { id: 2, title: "Training Session", date: "2025-04-05", time: "10:00", location: "Field B", attendees: 8 },
        { id: 3, title: "One-on-One Coaching", date: "2025-04-03", time: "14:30", location: "Training Room", attendees: 1 }
    ];

    const performanceMetrics = {
        teamAttendance: 87,
        avgProgress: 76,
        sessionsCompleted: 38,
        upcomingGoals: 5
    };

    // Initialize Charts
    function initCharts() {
        // Team Progress Chart
        const progressCtx = document.getElementById('teamProgressChart').getContext('2d');
        const progressChart = new Chart(progressCtx, {
            type: 'line',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                datasets: [{
                    label: 'Team Progress',
                    data: [65, 72, 74, 80, 82, 85],
                    backgroundColor: 'rgba(0, 123, 255, 0.2)',
                    borderColor: 'rgba(0, 123, 255, 1)',
                    borderWidth: 2,
                    tension: 0.3
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: false,
                        min: 60,
                        max: 100
                    }
                },
                responsive: true,
                maintainAspectRatio: false
            }
        });

        // Attendance Chart
        const attendanceCtx = document.getElementById('attendanceChart').getContext('2d');
        const attendanceChart = new Chart(attendanceCtx, {
            type: 'bar',
            data: {
                labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
                datasets: [{
                    label: 'Attendance Rate (%)',
                    data: [82, 88, 85, 92],
                    backgroundColor: 'rgba(40, 167, 69, 0.5)',
                    borderColor: 'rgba(40, 167, 69, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: false,
                        min: 70,
                        max: 100
                    }
                },
                responsive: true,
                maintainAspectRatio: false
            }
        });

        // Skills Distribution Chart
        const skillsCtx = document.getElementById('skillsChart').getContext('2d');
        const skillsChart = new Chart(skillsCtx, {
            type: 'radar',
            data: {
                labels: ['Technique', 'Endurance', 'Strength', 'Agility', 'Teamwork', 'Strategy'],
                datasets: [{
                    label: 'Team Average',
                    data: [75, 68, 82, 70, 85, 72],
                    backgroundColor: 'rgba(0, 123, 255, 0.2)',
                    borderColor: 'rgba(0, 123, 255, 1)',
                    borderWidth: 2,
                    pointBackgroundColor: 'rgba(0, 123, 255, 1)'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    r: {
                        angleLines: {
                            display: true
                        },
                        suggestedMin: 50,
                        suggestedMax: 100
                    }
                }
            }
        });
    }

    // Populate athlete table
    function populateAthleteTable() {
        const tableBody = document.getElementById('athleteTableBody');
        if (!tableBody) return;

        tableBody.innerHTML = '';

        athleteData.forEach(athlete => {
            const row = document.createElement('tr');
            
            row.innerHTML = `
                <td>${athlete.name}</td>
                <td>${athlete.sport}</td>
                <td>${athlete.sessions}</td>
                <td>
                    <div class="progress">
                        <div class="progress-bar" role="progressbar" style="width: ${athlete.progress}%" 
                             aria-valuenow="${athlete.progress}" aria-valuemin="0" aria-valuemax="100">${athlete.progress}%</div>
                    </div>
                </td>
                <td>${athlete.lastActive}</td>
                <td>
                    <button class="action-btn view-btn" data-id="${athlete.id}">View</button>
                    <button class="action-btn message-btn" data-id="${athlete.id}">Message</button>
                </td>
            `;
            
            tableBody.appendChild(row);
        });

        // Add event listeners for action buttons
        document.querySelectorAll('.view-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const athleteId = e.target.dataset.id;
                showAthleteProfile(athleteId);
            });
        });

        document.querySelectorAll('.message-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const athleteId = e.target.dataset.id;
                openMessageDialog(athleteId);
            });
        });
    }

    // Populate upcoming events
    function populateEvents() {
        const eventsContainer = document.getElementById('upcomingEventsList');
        if (!eventsContainer) return;

        eventsContainer.innerHTML = '';

        upcomingEvents.forEach(event => {
            const eventCard = document.createElement('div');
            eventCard.className = 'event-card';
            
            // Format date
            const dateObj = new Date(event.date);
            const formattedDate = dateObj.toLocaleDateString('en-US', { 
                weekday: 'short', 
                month: 'short', 
                day: 'numeric' 
            });
            
            eventCard.innerHTML = `
                <div class="event-date">${formattedDate}</div>
                <div class="event-details">
                    <h4>${event.title}</h4>
                    <p><i class="icon-clock"></i> ${event.time}</p>
                    <p><i class="icon-location"></i> ${event.location}</p>
                    <p><i class="icon-users"></i> ${event.attendees} attendee${event.attendees !== 1 ? 's' : ''}</p>
                </div>
                <div class="event-actions">
                    <button class="btn-small btn-edit" data-id="${event.id}">Edit</button>
                    <button class="btn-small btn-cancel" data-id="${event.id}">Cancel</button>
                </div>
            `;
            
            eventsContainer.appendChild(eventCard);
        });
        
        // Add "Add New Event" button
        const addEventBtn = document.createElement('button');
        addEventBtn.className = 'add-event-btn';
        addEventBtn.innerHTML = '+ Add New Event';
        addEventBtn.addEventListener('click', openAddEventDialog);
        eventsContainer.appendChild(addEventBtn);

        // Add event listeners for event buttons
        document.querySelectorAll('.btn-edit').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const eventId = e.target.dataset.id;
                editEvent(eventId);
            });
        });

        document.querySelectorAll('.btn-cancel').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const eventId = e.target.dataset.id;
                cancelEvent(eventId);
            });
        });
    }

    // Update Performance Metrics
    function updatePerformanceMetrics() {
        document.getElementById('teamAttendance').textContent = `${performanceMetrics.teamAttendance}%`;
        document.getElementById('avgProgress').textContent = `${performanceMetrics.avgProgress}%`;
        document.getElementById('sessionsCompleted').textContent = performanceMetrics.sessionsCompleted;
        document.getElementById('upcomingGoals').textContent = performanceMetrics.upcomingGoals;
    }

    // Initialize notifications
    function initNotifications() {
        const notificationsList = document.getElementById('notificationsList');
        if (!notificationsList) return;

        const notifications = [
            { id: 1, message: "Maria Garcia completed her training goal", time: "1 hour ago" },
            { id: 2, message: "New team analytics report is available", time: "3 hours ago" },
            { id: 3, message: "Team meeting scheduled for Friday", time: "Yesterday" }
        ];

        notificationsList.innerHTML = '';
        
        notifications.forEach(notification => {
            const notificationItem = document.createElement('div');
            notificationItem.className = 'notification-item';
            
            notificationItem.innerHTML = `
                <div class="notification-content">
                    <p>${notification.message}</p>
                    <span class="notification-time">${notification.time}</span>
                </div>
                <button class="notification-dismiss" data-id="${notification.id}">×</button>
            `;
            
            notificationsList.appendChild(notificationItem);
        });

        // Add event listeners for dismiss buttons
        document.querySelectorAll('.notification-dismiss').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const notificationId = e.target.dataset.id;
                dismissNotification(notificationId, e.target.parentNode);
            });
        });
    }

    // Placeholder functions for actions
    function showAthleteProfile(athleteId) {
        alert(`Viewing profile for athlete ID: ${athleteId}`);
    }

    function openMessageDialog(athleteId) {
        const athlete = athleteData.find(a => a.id == athleteId);
        alert(`Opening message dialog for ${athlete.name}`);
    }

    function openAddEventDialog() {
        alert("Opening dialog to add a new event");
    }

    function editEvent(eventId) {
        alert(`Editing event ID: ${eventId}`);
    }

    function cancelEvent(eventId) {
        alert(`Cancelling event ID: ${eventId}`);
    }

    function dismissNotification(notificationId, element) {
        element.remove();
    }

    // Initialize sidebar toggle functionality
    function initSidebar() {
        const sidebarToggle = document.getElementById('sidebarToggle');
        const sidebar = document.querySelector('.sidebar');
        const mainContent = document.querySelector('.main-content');
        
        if (sidebarToggle && sidebar && mainContent) {
            sidebarToggle.addEventListener('click', () => {
                sidebar.classList.toggle('collapsed');
                mainContent.classList.toggle('expanded');
            });
        }
    }

    // Initialize dashboard search
    function initSearch() {
        const searchInput = document.getElementById('dashboardSearch');
        if (!searchInput) return;

        searchInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            
            // Filter athletes based on search term
            const filteredAthletes = athleteData.filter(athlete => 
                athlete.name.toLowerCase().includes(searchTerm) || 
                athlete.sport.toLowerCase().includes(searchTerm)
            );
            
            // Update table with filtered results
            updateAthleteTable(filteredAthletes);
        });
    }

    function updateAthleteTable(athletes) {
        const tableBody = document.getElementById('athleteTableBody');
        if (!tableBody) return;

        tableBody.innerHTML = '';

        if (athletes.length === 0) {
            const row = document.createElement('tr');
            row.innerHTML = '<td colspan="6">No athletes found</td>';
            tableBody.appendChild(row);
            return;
        }

        athletes.forEach(athlete => {
            const row = document.createElement('tr');
            
            row.innerHTML = `
                <td>${athlete.name}</td>
                <td>${athlete.sport}</td>
                <td>${athlete.sessions}</td>
                <td>
                    <div class="progress">
                        <div class="progress-bar" role="progressbar" style="width: ${athlete.progress}%" 
                             aria-valuenow="${athlete.progress}" aria-valuemin="0" aria-valuemax="100">${athlete.progress}%</div>
                    </div>
                </td>
                <td>${athlete.lastActive}</td>
                <td>
                    <button class="action-btn view-btn" data-id="${athlete.id}">View</button>
                    <button class="action-btn message-btn" data-id="${athlete.id}">Message</button>
                </td>
            `;
            
            tableBody.appendChild(row);
        });
    }

    // Initialize all dashboard components
    function initDashboard() {
        try {
            populateAthleteTable();
            populateEvents();
            updatePerformanceMetrics();
            initNotifications();
            initSidebar();
            initSearch();
            
            // Only initialize charts if Chart.js is available
            if (typeof Chart !== 'undefined') {
                initCharts();
            } else {
                console.log('Chart.js not loaded. Charts will not be displayed.');
            }
        } catch (error) {
            console.error('Error initializing dashboard:', error);
        }
    }

    // Call the initialization function
    initDashboard();
});