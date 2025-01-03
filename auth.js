// Firebase configuration
const firebaseConfig = {
    // Your Firebase config here
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

let currentRole = 'employee';

function loginAs(role) {
    currentRole = role;
    document.querySelectorAll('.login-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector(`.login-btn.${role}`).classList.add('active');
}

document.addEventListener('DOMContentLoaded', function() {
    // Tab switching functionality
    const tabs = document.querySelectorAll('.tab-btn');
    const signInBtn = document.querySelector('.sign-in-btn');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove active class from all tabs
            tabs.forEach(t => t.classList.remove('active'));
            // Add active class to clicked tab
            tab.classList.add('active');
            // Update sign in button text
            signInBtn.textContent = `Sign in as ${tab.textContent.toLowerCase()}`;
        });
    });

    // Form submission
    const form = document.querySelector('.login-form');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        
        // Add your authentication logic here
        console.log('Login attempt:', {
            email,
            password,
            role: document.querySelector('.tab-btn.active').textContent.toLowerCase()
        });
    });
});
