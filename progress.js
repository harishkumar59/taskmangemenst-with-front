document.addEventListener('DOMContentLoaded', function() {
    // Task Completion Chart
    const taskCompletionCtx = document.getElementById('taskCompletionChart').getContext('2d');
    new Chart(taskCompletionCtx, {
        type: 'doughnut',
        data: {
            labels: ['Completed', 'In Progress', 'Pending'],
            datasets: [{
                data: [65, 20, 15],
                backgroundColor: [
                    '#22c55e',  // success color
                    '#1a47eb',  // primary color
                    '#f59e0b'   // warning color
                ],
                borderWidth: 0
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'bottom'
                },
                title: {
                    display: true,
                    text: 'Task Completion Status'
                }
            }
        }
    });

    // Weekly Progress Chart
    const weeklyProgressCtx = document.getElementById('weeklyProgressChart').getContext('2d');
    new Chart(weeklyProgressCtx, {
        type: 'line',
        data: {
            labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            datasets: [{
                label: 'Tasks Completed',
                data: [5, 8, 6, 9, 7, 4, 5],
                borderColor: '#1a47eb',
                tension: 0.4,
                fill: true,
                backgroundColor: 'rgba(26, 71, 235, 0.1)'
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'bottom'
                },
                title: {
                    display: true,
                    text: 'Weekly Task Completion'
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        stepSize: 1
                    }
                }
            }
        }
    });
});
