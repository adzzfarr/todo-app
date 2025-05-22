// task-modal.js
import { createTask } from "../modules/task.js";

export function showTaskModal(project, onSubmitForm) {
    // Add the task modal to the DOM
    let taskModal = document.getElementById('task-modal');

    if (!taskModal) {   
        taskModal = renderTaskModal(project, onSubmitForm);
        document.body.appendChild(taskModal);
    }

    const dateInput = document.getElementById('input-task-duedate');
    const today = new Date().toISOString().split('T')[0];
    dateInput.min = today;
}

function renderTaskModal(project, onSubmitForm) {
    const taskModal = document.createElement('div');
    taskModal.id = 'task-modal';
    taskModal.classList.add('modal');

    const modalContent = document.createElement('div');
    modalContent.classList.add('modal-content')

    const taskForm = document.createElement('form');
    taskForm.id = 'task-form';
    taskForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const taskName = document.getElementById('input-task-name').value;
        const taskDesc = document.getElementById('input-task-desc').value;
        const taskDueDate = document.getElementById('input-task-duedate').value;

        if (!taskName || !taskDueDate) {
            alert('Please fill in all required fields.');
            return;
        }

        const taskPriority = project.getTasks().length + 1;
        const createdTask = createTask(taskName, taskDesc, new Date(taskDueDate), taskPriority);

        project.addTask(createdTask);
        taskForm.reset();
        taskModal.remove();
        onSubmitForm(project);
        return;
    });

    const inputNameLabel = document.createElement('label');
    inputNameLabel.setAttribute('for', 'input-task-name');
    inputNameLabel.textContent = 'Task Name';

    const inputName = document.createElement('input');
    inputName.id = 'input-task-name';
    inputName.placeholder = 'Task Name';
    inputName.required = true;

    const inputDescLabel = document.createElement('label');
    inputDescLabel.setAttribute('for', 'input-task-desc');
    inputDescLabel.textContent = 'Task Description';

    const inputDesc = document.createElement('textarea');
    inputDesc.id = 'input-task-desc';
    inputDesc.placeholder = 'Description';

    const inputDueDateLabel = document.createElement('label');
    inputDueDateLabel.setAttribute('for', 'input-task-duedate');
    inputDueDateLabel.textContent = 'Due Date';

    const inputDueDate = document.createElement('input');
    inputDueDate.id = 'input-task-duedate';
    inputDueDate.type = 'date';
    inputDueDate.required = true;

    const submitButton = document.createElement('button');
    submitButton.classList.add('submit-modal');
    submitButton.textContent = 'Submit';
    submitButton.type = 'submit';
    

    const cancelButton = document.createElement('button');
    cancelButton.id = 'cancel-modal';
    cancelButton.textContent = 'Cancel';
    cancelButton.type = 'button';
    cancelButton.addEventListener('click', () => {
        taskModal.remove();
        return;
    });

    taskForm.appendChild(inputNameLabel);
    taskForm.appendChild(inputName);
    taskForm.appendChild(inputDescLabel);
    taskForm.appendChild(inputDesc);
    taskForm.appendChild(inputDueDateLabel);
    taskForm.appendChild(inputDueDate);
    taskForm.appendChild(submitButton);
    taskForm.appendChild(cancelButton);
    
    modalContent.appendChild(taskForm);

    taskModal.appendChild(modalContent);
    
    return taskModal;
}