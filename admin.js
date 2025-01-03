document.addEventListener('DOMContentLoaded', function() {
    // Sample data for demonstration
    const employees = [
        { name: "John Doe", task: "Website Redesign", status: "Completed", lastUpdated: "2024-03-10" },
        { name: "Jane Smith", task: "Client Meeting", status: "Pending", lastUpdated: "2024-03-05" },
        { name: "Alice Johnson", task: "Database Migration", status: "Completed", lastUpdated: "2024-02-28" },
        // Add more employees as needed
    ];

    // Populate employee table
    function renderEmployeeTable() {
        const tbody = document.getElementById('employee-table-body');
        tbody.innerHTML = employees.map(emp => `
            <tr>
                <td>${emp.name}</td>
                <td>${emp.task}</td>
                <td>${emp.status}</td>
                <td>${emp.lastUpdated}</td>
            </tr>
        `).join('');
    }

    // Update statistics
    function updateStatistics() {
        const completedTasks = employees.filter(emp => emp.status === "Completed").length;
        const pendingTasks = employees.filter(emp => emp.status === "Pending").length;
        const totalEmployees = employees.length;

        document.getElementById('completed-tasks').innerText = completedTasks;
        document.getElementById('pending-tasks').innerText = pendingTasks;
        document.getElementById('total-employees').innerText = totalEmployees;
    }

    // Handle task assignment
    document.getElementById('task-assignment-form').addEventListener('submit', function(e) {
        e.preventDefault();
        const taskDescription = document.getElementById('task-description').value;
        const dueDate = document.getElementById('due-date').value;
        const assignedTo = document.getElementById('employee-select').value;

        // In real app, save to Firebase Firestore here
        console.log(`Assigned Task: ${taskDescription} to ${assignedTo} with due date ${dueDate}`);
        alert('Task assigned successfully!');

        // Reset form
        this.reset();
    });

    // Initial render
    renderEmployeeTable();
    updateStatistics();
});
