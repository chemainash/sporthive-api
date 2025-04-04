document.addEventListener('DOMContentLoaded', () => {
    const signupForm = document.getElementById('signup-form');
    const fullNameInput = document.getElementById('fullname');
    const emailInput = document.getElementById('email');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirm-password');
    const togglePasswordBtn = document.querySelector('.toggle-password');
    const toggleConfirmPasswordBtn = document.querySelector('.toggle-confirm-password');
    const sportSelects = document.getElementById('sport-interests');
    const termsCheckbox = document.getElementById('terms');
    
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
    
    // Confirm Password visibility toggle
    toggleConfirmPasswordBtn.addEventListener('click', () => {
        if (confirmPasswordInput.type === 'password') {
            confirmPasswordInput.type = 'text';
            toggleConfirmPasswordBtn.textContent = '🙈';
        } else {
            confirmPasswordInput.type = 'password';
            toggleConfirmPasswordBtn.textContent = '👁️';
        }
    });
    
    // Form validation
    function validateForm() {
        let isValid = true;
        
        // Full Name validation
        if (fullNameInput.value.trim().length < 3) {
            showFieldError(fullNameInput, 'Please enter your full name');
            isValid = false;
        } else {
            clearFieldError(fullNameInput);
        }
        
        // Email validation
        if (!validateEmail(emailInput.value.trim())) {
            showFieldError(emailInput, 'Please enter a valid email address');
            isValid = false;
        } else {
            clearFieldError(emailInput);
        }
        
        // Username validation
        if (usernameInput.value.trim().length < 5) {
            showFieldError(usernameInput, 'Username must be at least 5 characters');
            isValid = false;
        } else {
            clearFieldError(usernameInput);
        }
        
        // Password validation
        if (passwordInput.value.length < 8) {
            showFieldError(passwordInput, 'Password must be at least 8 characters');
            isValid = false;
        } else {
            clearFieldError(passwordInput);
        }
        
        // Confirm Password validation
        if (confirmPasswordInput.value !== passwordInput.value) {
            showFieldError(confirmPasswordInput, 'Passwords do not match');
            isValid = false;
        } else {
            clearFieldError(confirmPasswordInput);
        }
        
        // Terms checkbox validation
        if (!termsCheckbox.checked) {
            showNotification('Please agree to the Terms and Conditions', 'error');
            isValid = false;
        }
        
        return isValid;
    }
    
    // Show field error
    function showFieldError(field, message) {
        // Remove any existing error
        clearFieldError(field);
        
        // Create error message
        const errorElement = document.createElement('div');
        errorElement.className = 'field-error';
        errorElement.textContent = message;
        errorElement.style.color = '#F44336';
        errorElement.style.fontSize = '0.8rem';
        errorElement.style.marginTop = '5px';
        
        // Add error message after the field
        field.parentNode.appendChild(errorElement);
        
        // Add error class to input
        field.classList.add('error-input');
        field.style.borderColor = '#F44336';
    }
    
    // Clear field error
    function clearFieldError(field) {
        const errorElement = field.parentNode.querySelector('.field-error');
        if (errorElement) {
            errorElement.remove();
        }
        field.classList.remove('error-input');
        field.style.borderColor = '';
    }
    
    // Email validation function
    function validateEmail(email) {
        const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return re.test(String(email).toLowerCase());
    }
    
    // Signup form submission
    signupForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        if (validateForm()) {
            // Gather form data
            const userData = {
                fullName: fullNameInput.value.trim(),
                email: emailInput.value.trim(),
                username: usernameInput.value.trim(),
                password: passwordInput.value,
                sportInterests: Array.from(sportSelects.selectedOptions).map(option => option.value)
            };
            
            // Simulate signup process
            simulateSignup(userData);
        }
    });
    
    // Simulate signup function
    function simulateSignup(userData) {
        showNotification('Creating your account...', 'info');
        
        // Simulate API call with timeout
        setTimeout(() => {
            // Successful signup simulation
            showNotification('Account created successfully!', 'success');
            
            // Store username in sessionStorage for welcome message
            sessionStorage.setItem('newUser', userData.username);
            
            // Redirect to login page (after displaying success message)
            setTimeout(() => {
                window.location.href = 'login.html';
            }, 2000);
        }, 1500);
    }
    
    // Password strength meter
    passwordInput.addEventListener('input', () => {
        const password = passwordInput.value;
        const strengthMeter = document.getElementById('password-strength');
        
        // Check password strength
        let strength = 0;
        let strengthText = '';
        
        if (password.length >= 8) strength += 1;
        if (password.match(/[a-z]/) && password.match(/[A-Z]/)) strength += 1;
        if (password.match(/[0-9]/)) strength += 1;
        if (password.match(/[^a-zA-Z0-9]/)) strength += 1;
        
        // Set strength text and color
        switch (strength) {
            case 0:
            case 1:
                strengthText = 'Weak';
                strengthMeter.style.width = '25%';
                strengthMeter.style.backgroundColor = '#F44336';
                break;
            case 2:
                strengthText = 'Medium';
                strengthMeter.style.width = '50%';
                strengthMeter.style.backgroundColor = '#FFC107';
                break;
            case 3:
                strengthText = 'Strong';
                strengthMeter.style.width = '75%';
                strengthMeter.style.backgroundColor = '#2196F3';
                break;
            case 4:
                strengthText = 'Very Strong';
                strengthMeter.style.width = '100%';
                strengthMeter.style.backgroundColor = '#4CAF50';
                break;
        }
        
        document.getElementById('strength-text').textContent = strengthText;
    });
    
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
    
    // Social Signup Buttons
    const googleSignupBtn = document.querySelector('.google-signup');
    const facebookSignupBtn = document.querySelector('.facebook-signup');
    
    if (googleSignupBtn) {
        googleSignupBtn.addEventListener('click', () => {
            showNotification('Google Signup coming soon!', 'info');
        });
    }
    
    if (facebookSignupBtn) {
        facebookSignupBtn.addEventListener('click', () => {
            showNotification('Facebook Signup coming soon!', 'info');
        });
    }
});