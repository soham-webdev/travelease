// DOM Elements
const loginContainer = document.getElementById('login-container');
const dashboardContainer = document.getElementById('dashboard-container');
const loginForm = document.getElementById('login-form');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const loginError = document.getElementById('login-error');
const logoutBtn = document.getElementById('logout-btn');
const domesticFlightLink = document.getElementById('domestic-flight-link');
const domesticContent = document.querySelector('.domestic-content');
const internationalFlightLink = document.getElementById('international-flight-link');
const internationalContent = document.querySelector('.international-content');

// Credentials
const VALID_USERNAME = 'admin';
const VALID_PASSWORD = 'admin';

// Event Listeners
loginForm.addEventListener('submit', handleLogin);
logoutBtn.addEventListener('click', handleLogout);
domesticFlightLink.addEventListener('click', toggleDomesticContent);
internationalFlightLink.addEventListener('click', toggleInternationalContent);

// Initialize the app
function initApp() {
  // Check if user is already logged in
  const isLoggedIn = sessionStorage.getItem('isLoggedIn') === 'true';
  
  if (isLoggedIn) {
    showDashboard();
  } else {
    showLogin();
  }

  // Add animation classes to category cards
  const categoryCards = document.querySelectorAll('.category-card');
  categoryCards.forEach((card, index) => {
    card.style.animationDelay = `${index * 0.1}s`;
    card.style.animation = 'fadeIn 0.5s ease forwards';
  });
}

// Handle login form submission
function handleLogin(e) {
  e.preventDefault();
  
  const username = usernameInput.value.trim();
  const password = passwordInput.value.trim();
  
  if (username === VALID_USERNAME && password === VALID_PASSWORD) {
    // Login successful
    sessionStorage.setItem('isLoggedIn', 'true');
    sessionStorage.setItem('username', username);
    
    // Show loading animation
    const loginBtn = document.querySelector('.btn-login');
    loginBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Logging in...';
    loginBtn.disabled = true;
    
    // Simulate loading
    setTimeout(() => {
      showDashboard();
      loginError.textContent = '';
      loginBtn.innerHTML = 'Login <i class="fas fa-arrow-right"></i>';
      loginBtn.disabled = false;
    }, 1000);
  } else {
    // Login failed
    loginError.textContent = 'Invalid username or password. Please try again.';
    passwordInput.value = '';
    passwordInput.focus();
    
    // Shake animation for error
    loginForm.classList.add('shake');
    setTimeout(() => {
      loginForm.classList.remove('shake');
    }, 500);
  }
}

// Handle logout
function handleLogout() {
  // Add logout animation
  logoutBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Logging out...';
  
  setTimeout(() => {
    sessionStorage.removeItem('isLoggedIn');
    sessionStorage.removeItem('username');
    showLogin();
    logoutBtn.innerHTML = '<i class="fas fa-sign-out-alt"></i> Logout';
  }, 800);
}

// Show login page
function showLogin() {
  loginContainer.classList.remove('hidden');
  dashboardContainer.classList.add('hidden');
  
  // Clear form fields
  loginForm.reset();
  
  // Focus on username input
  setTimeout(() => {
    usernameInput.focus();
  }, 100);
}

// Show dashboard
function showDashboard() {
  loginContainer.classList.add('hidden');
  dashboardContainer.classList.remove('hidden');
  
  // Update welcome message
  const username = sessionStorage.getItem('username') || 'User';
  document.getElementById('welcome-user').innerHTML = `<i class="fas fa-user-circle"></i> Welcome, ${username}`;
  
  // Animate the category cards
  const categoryCards = document.querySelectorAll('.category-card');
  categoryCards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    
    setTimeout(() => {
      card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
      card.style.opacity = '1';
      card.style.transform = 'translateY(0)';
    }, 100 + (index * 100));
  });
}

// Toggle domestic flight content
function toggleDomesticContent(e) {
  e.preventDefault();
  
  // Toggle the content
  if (domesticContent.classList.contains('hidden')) {
    // Close international content if open
    internationalContent.classList.add('hidden');
    
    // Open domestic content
    domesticContent.classList.remove('hidden');
    
    // Add active class to link
    domesticFlightLink.classList.add('active');
    internationalFlightLink.classList.remove('active');
    
    // Scroll to the content
    setTimeout(() => {
      domesticContent.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 100);
  } else {
    // Close domestic content
    domesticContent.classList.add('hidden');
    
    // Remove active class from link
    domesticFlightLink.classList.remove('active');
  }
}

// Toggle international flight content
function toggleInternationalContent(e) {
  e.preventDefault();
  
  // Toggle the content
  if (internationalContent.classList.contains('hidden')) {
    // Close domestic content if open
    domesticContent.classList.add('hidden');
    
    // Open international content
    internationalContent.classList.remove('hidden');
    
    // Add active class to link
    internationalFlightLink.classList.add('active');
    domesticFlightLink.classList.remove('active');
    
    // Scroll to the content
    setTimeout(() => {
      internationalContent.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 100);
  } else {
    // Close international content
    internationalContent.classList.add('hidden');
    
    // Remove active class from link
    internationalFlightLink.classList.remove('active');
  }
}

// Add hover effects to category cards
const categoryLinks = document.querySelectorAll('.category-link');
categoryLinks.forEach(link => {
  link.addEventListener('mouseenter', () => {
    const icon = link.querySelector('i');
    icon.style.transform = 'translateX(5px)';
  });
  
  link.addEventListener('mouseleave', () => {
    const icon = link.querySelector('i');
    icon.style.transform = 'translateX(0)';
  });
});

// Add hover effects to airline cards
const airlineCards = document.querySelectorAll('.airline-card');
airlineCards.forEach(card => {
  card.addEventListener('mouseenter', () => {
    card.classList.add('active');
  });
  
  card.addEventListener('mouseleave', () => {
    card.classList.remove('active');
  });
});

// Add shake animation for login error
document.head.insertAdjacentHTML('beforeend', `
  <style>
    @keyframes shake {
      0%, 100% { transform: translateX(0); }
      10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
      20%, 40%, 60%, 80% { transform: translateX(5px); }
    }
    
    .shake {
      animation: shake 0.5s cubic-bezier(.36,.07,.19,.97) both;
    }
  </style>
`);

// Initialize the application
document.addEventListener('DOMContentLoaded', initApp);
