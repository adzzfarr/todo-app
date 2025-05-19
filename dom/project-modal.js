    // project-modal.js
    import { createProject } from "../modules/project.js";

    export function showProjectModal(projects, onSubmitForm) {
        // Add the project modal to the DOM
        let projectModal = document.getElementById('project-modal');

        if (!projectModal) {   
            projectModal = renderProjectModal(projects, onSubmitForm);
            document.body.appendChild(projectModal);
        }
    }

    function renderProjectModal(projects, onSubmitForm) {
        const projectModal = document.createElement('div');
        projectModal.id = 'project-modal';
        projectModal.classList.add('modal');

        const modalContent = document.createElement('div');
        modalContent.classList.add('modal-content')

        const projectForm = document.createElement('form');
        projectForm.id = 'project-form';
        projectForm.addEventListener('submit', (event) => {
            event.preventDefault();

            const projectName = document.getElementById('input-project-name').value;

            if (!projectName) {
                alert('Please fill in all required fields.');
                return;
            }
            const createdProject = createProject(projectName);

            projects.push(createdProject)
            projectForm.reset();
            projectModal.remove();
            onSubmitForm(projects);
            return;
        });

        const inputNameLabel = document.createElement('label');
        inputNameLabel.setAttribute('for', 'input-project-name');
        inputNameLabel.textContent = 'Project Name';

        const inputName = document.createElement('input');
        inputName.id = 'input-project-name';
        inputName.placeholder = 'Project Name';
        inputName.required = true;

        const submitButton = document.createElement('button');
        submitButton.classList.add('submit-modal');
        submitButton.textContent = 'Submit';
        submitButton.type = 'submit';

        const cancelButton = document.createElement('button');
        cancelButton.id = 'cancel-modal';
        cancelButton.textContent = 'Cancel';
        cancelButton.type = 'button';
        cancelButton.addEventListener('click', () => {
            projectModal.remove();
            return;
        });

        projectForm.appendChild(inputNameLabel);
        projectForm.appendChild(inputName);
        projectForm.appendChild(submitButton);
        projectForm.appendChild(cancelButton);
        
        modalContent.appendChild(projectForm);

        projectModal.appendChild(modalContent);
        
        return projectModal;
    }