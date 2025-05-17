// task-card.js
export function createTaskCard(project, task, onDelete, onMoveUp, onMoveDown, onClickCheckbox) {
    const tasks = project.getTasks();
    const taskIndex = project.getTaskIndex(task.id);

    const taskCard = document.createElement('div');
    taskCard.classList.add('task-card');

    // Task Info
    const taskContent = document.createElement('div');

    const taskName = document.createElement('h2');
    taskName.textContent = task.name;
    // Set initial style based on completion status
    if (task.completionStatus) {
        taskName.style.textDecoration = 'line-through';
    } else {
        taskName.style.textDecoration = 'none';
    }

    const taskDescription = document.createElement('span');
    taskDescription.textContent = task.description;

    const taskDueDate = document.createElement('span');
    taskDueDate.textContent = 'Due: ' + task.dueDate.toString();

    taskContent.appendChild(taskName);
    taskContent.appendChild(taskDescription);
    taskContent.appendChild(document.createElement('br'));
    taskContent.appendChild(taskDueDate);

    // Delete Button
    const deleteButton = document.createElement('button');
    deleteButton.classList.add('delete-task');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', () => onDelete(task.id));

    // Move Up/Down Buttons
    const moveUp = document.createElement('button');
    moveUp.classList.add('move-up');
    moveUp.textContent = 'Move Up';
    moveUp.addEventListener('click', () => onMoveUp(task.id));

    const moveDown = document.createElement('button');
    moveDown.classList.add('move-down');
    moveDown.textContent = 'Move Down';
    moveDown.addEventListener('click', () => onMoveDown(task.id));
    
    // Checkbox
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = task.completionStatus;

    checkbox.addEventListener('click', () => onClickCheckbox(task.id));

    taskCard.appendChild(checkbox);
    taskCard.appendChild(taskContent);
    taskCard.appendChild(deleteButton);

    if (taskIndex > 0) {      
        taskCard.appendChild(moveUp);
    }

    if (taskIndex < tasks.length - 1) {      
        taskCard.appendChild(moveDown);
    }

    return taskCard;
}