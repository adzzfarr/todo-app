// project-card.js
export function createProjectCard(project, onClickCard, onClickEdit, onDelete) {
    const projectCard = document.createElement('div');
    projectCard.classList.add('project-card');
    projectCard.addEventListener('click', onClickCard);

    // Project Name
    const projectName = document.createElement('div');
    projectName.textContent = project.name;
    projectCard.appendChild(projectName);

    // Buttons
    const projectControls = document.createElement('div');
    projectControls.classList.add('controls');

    // Edit Button
    const editButton = document.createElement('i');
    editButton.classList.add('edit-button', 'fas', 'fa-pencil');
    editButton.addEventListener('click', (event) => {
        event.stopPropagation();
        onClickEdit();
    });
    projectControls.appendChild(editButton);

    // Delete Button
    const deleteButton = document.createElement('i');
    deleteButton.classList.add('task-delete', 'fas', 'fa-trash');
    deleteButton.addEventListener('click', (event) => {
        event.stopPropagation();
        onDelete();
    });
    projectControls.appendChild(deleteButton);

    projectCard.appendChild(projectControls);

    return projectCard;
}