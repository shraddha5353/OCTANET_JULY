let tasks = [];

function addTask() {
    const taskInput = document.getElementById('new-task');
    const taskText = taskInput.value.trim();
    
    if (taskText !== "") {
        const newTask = {
            id: Date.now(),
            text: taskText,
            completed: false
        };
        
        tasks.push(newTask);
        taskInput.value = "";
        renderTasks();
    }
}

function renderTasks() {
    const taskList = document.getElementById('task-list');
    taskList.innerHTML = "";

    tasks.forEach(task => {
        const taskItem = document.createElement('li');
        taskItem.className = task.completed ? 'completed' : '';
        
        const taskText = document.createElement('span');
        taskText.innerText = task.text;
        taskText.onclick = () => toggleTaskCompletion(task.id);

        const editInput = document.createElement('input');
        editInput.type = 'text';
        editInput.className = 'edit-input';
        editInput.value = task.text;
        
        const editButton = document.createElement('button');
        editButton.innerText = 'Edit';
        editButton.onclick = () => toggleEditTask(taskItem, editInput, task.id);

        const saveButton = document.createElement('button');
        saveButton.innerText = 'Save';
        saveButton.onclick = () => saveTask(taskItem, editInput, task.id);
        saveButton.style.display = 'none';

        const deleteButton = document.createElement('button');
        deleteButton.innerText = 'Delete';
        deleteButton.onclick = () => deleteTask(task.id);

        taskItem.appendChild(taskText);
        taskItem.appendChild(editInput);
        taskItem.appendChild(editButton);
        taskItem.appendChild(saveButton);
        taskItem.appendChild(deleteButton);

        taskList.appendChild(taskItem);
    });
}

function toggleTaskCompletion(taskId) {
    tasks = tasks.map(task => 
        task.id === taskId ? {...task, completed: !task.completed} : task
    );
    renderTasks();
}

function deleteTask(taskId) {
    tasks = tasks.filter(task => task.id !== taskId);
    renderTasks();
}

function toggleEditTask(taskItem, editInput, taskId) {
    const taskText = taskItem.querySelector('span');
    const editButton = taskItem.querySelector('button:nth-child(3)');
    const saveButton = taskItem.querySelector('button:nth-child(4)');
    
    taskText.style.display = 'none';
    editInput.style.display = 'inline';
    editButton.style.display = 'none';
    saveButton.style.display = 'inline';
}

function saveTask(taskItem, editInput, taskId) {
    const newText = editInput.value.trim();
    
    if (newText !== "") {
        tasks = tasks.map(task => 
            task.id === taskId ? {...task, text: newText} : task
        );
        renderTasks();
    }
}
