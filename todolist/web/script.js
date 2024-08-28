document.addEventListener('DOMContentLoaded', function() {
    loadTasks();
});

function addTask() {
    const name = document.getElementById('task-name').value.trim();
    const date = document.getElementById('task-date').value;

    if (name === '' || date === '') {
        alert('Please enter both task name and date');
        return;
    }

    const task = { name, date, completed: false };
    eel.add_task(task);
    document.getElementById('task-name').value = '';
    document.getElementById('task-date').value = '';
}

function removeTask(index) {
    eel.remove_task(index);
}

function toggleTask(index) {
    eel.toggle_task(index);
}

eel.expose(loadTasks);
function loadTasks() {
    eel.get_tasks()(tasks => {
        const list = document.getElementById('to-do-list');
        list.innerHTML = '';
        tasks.forEach(task => {
            const itemDiv = document.createElement('div');
            itemDiv.className = 'todo-item';
            itemDiv.innerHTML = `
                <div class="flex mb-4 items-center gap-3">
                    <div class="flex-auto w-[90px]">
                        <input type="checkbox" ${task.completed ? 'checked' : ''} class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" onclick="toggleTask('${task.id}')">
                    </div>
                    <p class="w-full text-grey-darkest ${task.completed ? 'line-through':''}">${task.name}</p>
                    <p class="w-full text-grey-darkest ${task.completed ? 'line-through':''}">${task.date}</p>
                    <button class="flex-no-shrink p-2 ml-2 border-2 rounded" onclick="removeTask('${task.id}')" ${!task.completed ? 'disabled' : ''}>Remove</button>
                </div>
            `;
            list.appendChild(itemDiv);
        });
    });
}
