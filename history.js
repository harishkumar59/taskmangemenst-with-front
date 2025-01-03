document.addEventListener('DOMContentLoaded', function() {
    // Sample task history data - In real app, this would come from Firebase
    const taskHistory = [
        {
            description: "Website Redesign",
            assignedTo: "John Doe",
            status: "completed",
            assignedDate: "2024-03-01",
            completionDate: "2024-03-10"
        },
        {
            description: "Client Meeting",
            assignedTo: "Jane Smith",
            status: "pending",
            assignedDate: "2024-03-05",
            completionDate: ""
        },
        {
            description: "Database Migration",
            assignedTo: "Alice Johnson",
            status: "completed",
            assignedDate: "2024-02-20",
            completionDate: "2024-02-28"
        },
        // Add more task history as needed
    ];

    // Render task history
    function renderTaskHistory(history) {
        const tbody = document.getElementById('task-history-body');
        tbody.innerHTML = history.map(task => `
            <tr>
                <td>${task.description}</td>
                <td>${task.assignedTo}</td>
                <td class="${task.status}">${task.status}</td>
                <td>${task.assignedDate}</td>
                <td>${task.completionDate || 'N/A'}</td>
            </tr>
        `).join('');
    }

    // Sort table function
    function sortTable(columnIndex) {
        const rows = Array.from(document.querySelectorAll('.task-history-table tbody tr'));
        const isAscending = rows[0].cells[columnIndex].innerText > rows[rows.length - 1].cells[columnIndex].innerText;

        rows.sort((a, b) => {
            const aText = a.cells[columnIndex].innerText;
            const bText = b.cells[columnIndex].innerText;
            return isAscending ? aText.localeCompare(bText) : bText.localeCompare(aText);
        });

        const tbody = document.getElementById('task-history-body');
        tbody.innerHTML = '';
        rows.forEach(row => tbody.appendChild(row));
    }

    // Search functionality
    document.getElementById('search-input').addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const filteredHistory = taskHistory.filter(task => 
            task.description.toLowerCase().includes(searchTerm) || 
            task.assignedTo.toLowerCase().includes(searchTerm
        ));
        renderTaskHistory(filteredHistory);
    });

    // Initial render
    renderTaskHistory(taskHistory);
});
