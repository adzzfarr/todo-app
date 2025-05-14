// sidebar.js
import { renderContent } from "./content.js";

export function renderSidebar(projects) {
    const sidebar = document.getElementById('sidebar');

    const sidebarHeader = document.createElement('h1');
    sidebarHeader.textContent = 'Your Projects';

    const projectList = document.createElement('div');

    for (let project of projects) {
        const projectCard = document.createElement('div');
        projectCard.classList.add('project-card');
        projectCard.textContent = project.name;

        projectCard.addEventListener('click', () => renderContent(project));

        projectList.appendChild(projectCard);
    }

    sidebar.appendChild(sidebarHeader);
    sidebar.appendChild(projectList);
}