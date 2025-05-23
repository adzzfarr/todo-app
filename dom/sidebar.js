// sidebar.js
import { renderContent } from "./content.js";
import { createProjectCard } from "./project-card.js";
import { showEditProjectModal, showProjectModal } from "./project-modal.js";

export function renderSidebar(projects) {
    const sidebar = document.getElementById('sidebar');

    // Clear existing html
    sidebar.innerHTML = '';

    const sidebarContent = document.createElement('div');
    sidebarContent.id = 'sidebar-content';

    const sidebarHeader = document.createElement('h1');
    sidebarHeader.textContent = 'Your Projects';

    const projectList = document.createElement('div');

    for (let project of projects) {
        function onClickCard() {
            renderContent(project);
        }

        function onClickEdit() {
            function onClickSubmit() {
                renderSidebar(projects);
                
                // If the content is already showing, reflect the updated name
                if (document.getElementById('content')) {
                    renderContent(project);
                }
            }
            showProjectModal(projects, onClickSubmit, project);
        }

        const projectCard = createProjectCard(project, onClickCard, onClickEdit);
        projectList.appendChild(projectCard);
    }

    sidebarContent.appendChild(sidebarHeader);
    sidebarContent.appendChild(projectList);

    const addProject = document.createElement('button');
    addProject.id = 'add-project';
    addProject.textContent = 'Add Project';
    addProject.addEventListener('click', () => showProjectModal(projects, () => renderSidebar(projects)))

    sidebar.appendChild(sidebarContent);
    sidebar.appendChild(addProject);    
}