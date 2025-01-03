document.addEventListener('DOMContentLoaded', function() {
    // Sample user data - In real app, this would come from Firebase
    const userData = {
        name: "John Doe",
        email: "john.doe@example.com",
        role: "Employee"
    };

    // Populate form with user data
    document.getElementById('name').value = userData.name;
    document.getElementById('email').value = userData.email;
    document.getElementById('role').value = userData.role;

    // Handle profile form submission
    document.getElementById('profile-form').addEventListener('submit', function(e) {
        e.preventDefault();
        const updatedData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            role: document.getElementById('role').value
        };
        console.log('Profile updated:', updatedData);
        // In real app, update Firebase here
        alert('Profile updated successfully!');
    });

    // Handle change password form submission
    document.getElementById('change-password-form').addEventListener('submit', function(e) {
        e.preventDefault();
        const currentPassword = document.getElementById('current-password').value;
        const newPassword = document.getElementById('new-password').value;
        const confirmPassword = document.getElementById('confirm-password').value;

        if (newPassword !== confirmPassword) {
            alert('New passwords do not match!');
            return;
        }

        console.log('Password changed:', { currentPassword, newPassword });
        // In real app, change password in Firebase here
        alert('Password changed successfully!');
    });
});
