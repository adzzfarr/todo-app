// sidebar.js
import { renderContent } from "./content.js";
import { showProjectModal } from "./project-modal.js";

export function renderSidebar(projects) {
    const sidebar = document.getElementById('sidebar');

    // Cleat existing html
    sidebar.innerHTML = '';

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

    const addProject = document.createElement('button');
    addProject.id = 'add-project';
    addProject.textContent = 'Add Project';
    addProject.addEventListener('click', () => showProjectModal(projects, () => renderSidebar(projects)))

    sidebar.appendChild(sidebarHeader);
    sidebar.appendChild(projectList);
    sidebar.appendChild(addProject);    
}