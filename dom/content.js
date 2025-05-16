// content.js
import { createTaskCard } from "./task-card.js";

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
        const taskCard = createTaskCard(project, task);
        taskList.appendChild(taskCard);
    }

    content.appendChild(projectHeader);
    content.appendChild(taskList);
}