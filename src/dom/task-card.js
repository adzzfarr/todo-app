// task-card.js
import { format } from 'date-fns';

export function createTaskCard(project, task, onClickCheckbox, onMoveUp, onMoveDown, onClickEdit, onDelete) {
    const tasks = project.getTasks();
    const taskIndex = project.getTaskIndex(task.id);

    const taskCard = document.createElement('div');
    taskCard.classList.add('task-card');

    // Checkbox, Task Name, Toggle Details button, Move Up/Down buttons, Edit Button, Delete button
    const topRow = document.createElement('div');
    topRow.classList.add('task-top-row');

    // Checkbox
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = task.completionStatus;
    checkbox.addEventListener('change', onClickCheckbox);

    // Task Name and toggleDetailsButton
    const taskNameAndToggleDetails = document.createElement('div');
    taskNameAndToggleDetails.classList.add('task-name-toggle');

    // Task Name
    const taskName = document.createElement('h2');
    taskName.textContent = task.name;
    // Set initial style based on completion status
    if (task.completionStatus) {
        taskName.style.textDecoration = 'line-through';
    } else {
        taskName.style.textDecoration = 'none';
    }
    taskNameAndToggleDetails.appendChild(taskName);

    // Details container
    const taskDetails = document.createElement('div');
    taskDetails.classList.add('task-details');
    taskDetails.style.display = task.showDetails ? 'flex' : 'none';

    const taskDescription = document.createElement('div');
    taskDescription.textContent = task.description;

    const taskDueDate = document.createElement('div');
    taskDueDate.textContent = `Due: ${format(task.dueDate, 'PPP')}`;

    taskDetails.appendChild(taskDescription);
    taskDetails.appendChild(taskDueDate);

    // Show/Hide details button 
    const toggleDetailsButton = document.createElement('i');
    toggleDetailsButton.classList.add('toggle-details', 'fas', task.showDetails ? 'fa-eye-slash' : 'fa-eye');
    toggleDetailsButton.addEventListener('click', () => {
        task.showDetails = !task.showDetails;
        taskDetails.style.display = task.showDetails ? 'flex' : 'none';
        toggleDetailsButton.classList.toggle('fa-eye-slash', task.showDetails);
        toggleDetailsButton.classList.toggle('fa-eye', !task.showDetails);
    });
    taskNameAndToggleDetails.appendChild(toggleDetailsButton);

    // Task Control buttons
    const taskControls = document.createElement('div');
    taskControls.classList.add('controls');

    // Move Up Button
    if (taskIndex > 0) {
        const moveUp = document.createElement('i');
        moveUp.classList.add('move-up', 'fas', 'fa-arrow-up');
        moveUp.addEventListener('click', onMoveUp);
        taskControls.appendChild(moveUp);
    }

    // Move Down Button
    if (taskIndex < tasks.length - 1) {
        const moveDown = document.createElement('i');
        moveDown.classList.add('move-down', 'fas', 'fa-arrow-down');
        moveDown.addEventListener('click', onMoveDown);
        taskControls.appendChild(moveDown);
    }

    // Edit Button
    const editButton = document.createElement('i');
    editButton.classList.add('edit-button', 'fas', 'fa-pencil');
    editButton.addEventListener('click', onClickEdit);
    taskControls.appendChild(editButton);

    // Delete Button
    const deleteButton = document.createElement('i');
    deleteButton.classList.add('task-delete', 'fas', 'fa-trash');
    deleteButton.addEventListener('click', onDelete);
    taskControls.appendChild(deleteButton);

    // Append to topRow
    topRow.appendChild(checkbox);
    topRow.appendChild(taskNameAndToggleDetails);
    topRow.appendChild(taskControls);

    taskCard.appendChild(topRow);
    taskCard.appendChild(taskDetails);

    return taskCard;
}