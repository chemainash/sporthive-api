document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const togglePasswordBtn = document.querySelector('.toggle-password');
    const rememberCheckbox = document.getElementById('remember');

    // Password visibility toggle
    togglePasswordBtn.addEventListener('click', () => {
        if (passwordInput.type === 'password') {
            passwordInput.type = 'text';
            togglePasswordBtn.textContent = '🙈';
        } else {
            passwordInput.type = 'password';
            togglePasswordBtn.textContent = '👁️';
        }
    });

    // Form validation
    function validateForm() {
        const username = usernameInput.value.trim();
        const password = passwordInput.value.trim();

        // Basic validation
        if (username.length < 3) {
            showNotification('Username must be at least 3 characters long', 'error');
            return false;
        }

        if (password.length < 6) {
            showNotification('Password must be at least 6 characters long', 'error');
            return false;
        }

        return true;
    }

    // Login form submission
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();

        if (validateForm()) {
            // Simulate login process
            const username = usernameInput.value.trim();
            const password = passwordInput.value.trim();
            const rememberMe = rememberCheckbox.checked;

            // In a real application, this would be an API call
            simulateLogin(username, password, rememberMe);
        }
    });

    // Simulated login function
    function simulateLogin(username, password, rememberMe) {
        // Simulate an API call with a timeout
        showNotification('Logging in...', 'info');

        setTimeout(() => {
            // Simulated authentication logic
            if (username === 'player' && password === 'playnexus123') {
                // Successful login
                if (rememberMe) {
                    // Store username in localStorage if "Remember me" is checked
                    localStorage.setItem('rememberedUsername', username);
                } else {
                    // Remove any stored username
                    localStorage.removeItem('rememberedUsername');
                }

                showNotification('Login Successful!', 'success');
                
                // Redirect to dashboard (simulated)
                setTimeout(() => {
                    window.location.href = 'dashboard.html';
                }, 1500);
            } else {
                // Failed login
                showNotification('Invalid username or password', 'error');
            }
        }, 1500);
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
        notification.style.backgroundColor = 
            type === 'success' ? '#4CAF50' : 
            type === 'error' ? '#F44336' : 
            '#2196F3';
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

    // Load remembered username if exists
    const rememberedUsername = localStorage.getItem('rememberedUsername');
    if (rememberedUsername) {
        usernameInput.value = rememberedUsername;
        rememberCheckbox.checked = true;
    }

    // Social Login Buttons
    const googleLoginBtn = document.querySelector('.google-login');
    const facebookLoginBtn = document.querySelector('.facebook-login');

    googleLoginBtn.addEventListener('click', () => {
        showNotification('Google Login coming soon!', 'info');
    });

    facebookLoginBtn.addEventListener('click', () => {
        showNotification('Facebook Login coming soon!', 'info');
    });

    // Forgot Password Link
    const forgotPasswordLink = document.querySelector('.forgot-password');
    forgotPasswordLink.addEventListener('click', (e) => {
        e.preventDefault();
        showNotification('Password reset link sent to your email', 'info');
    });
});