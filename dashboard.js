// Firebase configuration
const firebaseConfig = {
    // Your Firebase config here
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Sample user data - In real app, this would come from Firebase
const userId = "user-id"; // Replace with actual user ID

// Fetch tasks from Firestore
async function fetchTasks() {
    const tasksSnapshot = await db.collection('tasks').where('assignedTo', '==', userId).get();
    const tasks = tasksSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    renderTasks(tasks);
}

// Render tasks
function renderTasks(tasks) {
    const tasksGrid = document.querySelector('.tasks-grid');
    tasksGrid.innerHTML = tasks.map(task => `
        <div class="task-card ${task.status}">
            <div class="task-header" onclick="openTaskModal('${task.id}')">
                <h3>${task.title}</h3>
                <span class="priority ${task.priority.toLowerCase()}">${task.priority}</span>
            </div>
            <p class="task-description">${task.description}</p>
            <div class="task-footer">
                <div class="due-date">
                    <i class="fas fa-calendar"></i>
                    ${task.dueDate}
                </div>
                <button class="status-btn" data-task-id="${task.id}">
                    ${task.status === 'completed' ? 
                        '<i class="fas fa-check-circle"></i> Completed' : 
                        '<i class="fas fa-clock"></i> Mark Complete'}
                </button>
            </div>
        </div>
    `).join('');

    // Add event listeners to status buttons
    document.querySelectorAll('.status-btn').forEach(btn => {
        btn.addEventListener('click', handleStatusChange);
    });
}

// Open task modal
function openTaskModal(taskId) {
    const task = tasks.find(t => t.id === taskId);
    document.getElementById('task-description-modal').innerText = task.description;
    document.getElementById('due-date-modal').innerText = task.dueDate;
    document.getElementById('status-modal').innerText = task.status;
    document.getElementById('mark-completed-btn').dataset.taskId = taskId;
    document.getElementById('mark-pending-btn').dataset.taskId = taskId;
    document.getElementById('task-modal').style.display = 'block';
}

// Handle task status change
async function handleStatusChange(e) {
    const taskId = e.currentTarget.dataset.taskId;
    const taskRef = db.collection('tasks').doc(taskId);
    const taskDoc = await taskRef.get();
    const newStatus = taskDoc.data().status === 'completed' ? 'pending' : 'completed';

    await taskRef.update({ status: newStatus });
    fetchTasks(); // Refresh tasks
}

// Close modal
document.querySelector('.close').onclick = function() {
    document.getElementById('task-modal').style.display = 'none';
};

// Mark task as completed
document.getElementById('mark-completed-btn').addEventListener('click', async function() {
    const taskId = this.dataset.taskId;
    await db.collection('tasks').doc(taskId).update({ status: 'completed' });
    fetchTasks(); // Refresh tasks
    document.getElementById('task-modal').style.display = 'none';
});

// Mark task as pending
document.getElementById('mark-pending-btn').addEventListener('click', async function() {
    const taskId = this.dataset.taskId;
    await db.collection('tasks').doc(taskId).update({ status: 'pending' });
    fetchTasks(); // Refresh tasks
    document.getElementById('task-modal').style.display = 'none';
});

// Initial fetch
fetchTasks();
