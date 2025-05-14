// content.js
export function renderContent(project) {
    const content = document.getElementById('content');

    // clear previous html
    content.innerHTML = '';

    const projectHeader = document.createElement('h1');
    projectHeader.classList.add('project-header');
    projectHeader.textContent = project.name;

    const tasks = project.getTasks();
    const taskList = document.createElement('div');

    for (let task of tasks) {
        const taskCard = document.createElement('div');
        taskCard.classList.add('task-card');

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
        // make the list of tasks reorder-able by dragging and dropping the cards? update the task priority accordingly
        // make a dropdown to reveal desc and due date?

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

        taskList.appendChild(taskCard);
    }

    content.appendChild(projectHeader);
    content.appendChild(taskList);
}