// task-card.js
import { renderContent } from "./content.js";

export function createTaskCard(project, task) {
    const tasks = project.getTasks();
    const taskIndex = project.getTaskIndex(task.id);

    const taskCard = document.createElement('div');
    taskCard.classList.add('task-card');

    // Task Info
    const taskContent = document.createElement('div');

    const taskName = document.createElement('h2');
    taskName.textContent = task.name;

    const taskDescription = document.createElement('span');
    taskDescription.textContent = task.description;

    const taskDueDate = document.createElement('span');
    taskDueDate.textContent = 'Due: ' + task.dueDate.toString();

    taskContent.appendChild(taskName);
    taskContent.appendChild(taskDescription);
    taskContent.appendChild(taskDueDate);

    // Delete Button
    const deleteButton = document.createElement('button');
    deleteButton.classList.add('delete-task');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', () => {
        project.removeTask(task.id);
        renderContent(project);
    });

    // Move Up/Down Buttons
    const moveUp = document.createElement('button');
    moveUp.classList.add('move-up');
    moveUp.textContent = 'Move Up';
    moveUp.addEventListener('click', () => {
        if (taskIndex > 0) {
            // Task of immediately higher priority comes immediately before the intended task in tasks
            const higherPriorityIndex = taskIndex - 1;
            project.swapTasks(task.id, tasks[higherPriorityIndex].id);
            renderContent(project);
        }
    });

    const moveDown = document.createElement('button');
    moveDown.classList.add('move-down');
    moveDown.textContent = 'Move Down';
    moveDown.addEventListener('click', () => {
        if (taskIndex < tasks.length - 1) {
            // Task of immediately lower priority comes immediately after the intended task in tasks
            const lowerPriorityIndex = taskIndex + 1;
            project.swapTasks(task.id, tasks[lowerPriorityIndex].id);
            renderContent(project);
        }
    });
    
    // Hide Description and Due Date in a Dropdown

    // Checkbox
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = task.completionStatus;

    checkbox.addEventListener('click', () => {
        task.toggleCompletion();

        if (task.completionStatus) {
            taskName.style.textDecoration = 'line-through';
        } else {
            taskName.style.textDecoration = 'none';
        }
    });

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