// project-card.js

export function createProjectCard(project, onClickCard, onClickEdit) {
    const projectCard = document.createElement('div');
    projectCard.classList.add('project-card');
    projectCard.addEventListener('click', onClickCard);

    // Project Name
    const projectName = document.createElement('div');
    projectName.textContent = project.name;
    projectCard.appendChild(projectName)

    // Edit Button
    const editButton = document.createElement('i');
    editButton.classList.add('edit-button', 'fas', 'fa-pencil');
    editButton.addEventListener('click', onClickEdit);
    projectCard.appendChild(editButton);

    return projectCard;
}