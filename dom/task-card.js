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

    const taskDetails = document.createElement('div');
    taskDetails.id = 'task-details';

    const taskDescription = document.createElement('span');
    taskDescription.textContent = task.description;

    const taskDueDate = document.createElement('span');
    taskDueDate.textContent = 'Due: ' + task.dueDate.toString();

    // Toggle Details Button
    const toggleDetailsButton = document.createElement('button');
    toggleDetailsButton.textContent = 'Show details';
    toggleDetailsButton.addEventListener('click', () => {
        const isVisible = taskDetails.style.display === 'block';
        taskDetails.style.display = isVisible ? 'none' : 'block';
        toggleDetailsButton.textContent = isVisible ? 'Show Details' : 'Hide Details';
    });

    taskDetails.appendChild(taskDescription);
    taskDetails.appendChild(document.createElement('br'));
    taskDetails.appendChild(taskDueDate);

    taskContent.appendChild(taskName);

    // Delete Button
    const deleteButton = document.createElement('button');
    deleteButton.classList.add('delete-task');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', onDelete);

    // Move Up/Down Buttons
    const moveUp = document.createElement('button');
    moveUp.classList.add('move-up');
    moveUp.textContent = 'Move Up';
    moveUp.addEventListener('click', onMoveUp);

    const moveDown = document.createElement('button');
    moveDown.classList.add('move-down');
    moveDown.textContent = 'Move Down';
    moveDown.addEventListener('click', onMoveDown);
    
    // Checkbox
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = task.completionStatus;

    checkbox.addEventListener('click', onClickCheckbox);

    taskCard.appendChild(checkbox);
    taskCard.appendChild(taskContent);
    taskCard.appendChild(toggleDetailsButton);
    taskCard.appendChild(taskDetails);
    taskCard.appendChild(deleteButton);

    if (taskIndex > 0) {      
        taskCard.appendChild(moveUp);
    }

    if (taskIndex < tasks.length - 1) {      
        taskCard.appendChild(moveDown);
    }

    return taskCard;
}