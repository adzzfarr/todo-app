// content.js
import { saveProjects } from "../storage.js";
import { createTaskCard } from "./task-card.js";
import { showTaskModal } from "./task-modal.js";

export function renderContent(project, projects) {
    const content = document.getElementById('content');

    // Clear previous html
    content.innerHTML = '';

    // Project Header
    const projectHeader = document.createElement('h1');
    projectHeader.id = 'project-header';
    projectHeader.textContent = project.name;

    // Tasks
    const tasks = project.getTasks();
    const taskList = document.createElement('div');

    if (tasks.length === 0) {
        const noTasks = document.createElement('span');
        noTasks.id = 'no-tasks';
        noTasks.textContent = 'Nothing to be done yet!';
        taskList.appendChild(noTasks);
    } else {
        for (let task of tasks) {
            const taskIndex = project.getTaskIndex(task.id);
            
            function onClickCheckbox() {
                task.toggleCompletion();
                renderContent(project, projects);
                saveProjects(projects);
            }

            function onMoveUp() {
                if (taskIndex > 0) {
                    // Task of immediately higher priority comes immediately before the intended task in tasks
                    const higherPriorityIndex = taskIndex - 1;
                    project.swapTasks(task.id, tasks[higherPriorityIndex].id);
                    renderContent(project, projects);
                    saveProjects(projects);
                }    
            }

            function onMoveDown() {
                if (taskIndex < tasks.length - 1) {
                    // Task of immediately lower priority comes immediately after the intended task in tasks
                    const lowerPriorityIndex = taskIndex + 1;
                    project.swapTasks(task.id, tasks[lowerPriorityIndex].id);
                    renderContent(project, projects);
                    saveProjects(projects);
                }
            }

            function onClickEdit() {
                function onSubmitForm() {
                    renderContent(project, projects);
                    saveProjects(projects);
                }

                showTaskModal(project, onSubmitForm, task)
            }
            
            function onDelete() {
                project.removeTask(task.id);
                renderContent(project, projects);
                saveProjects(projects);
            }

            const taskCard = createTaskCard(project, task, onClickCheckbox, onMoveUp, onMoveDown, onClickEdit, onDelete);
            taskList.appendChild(taskCard);
        }
    }

    // Add a Task
    const addTask = document.createElement('button');
    addTask.id = 'add-task';
    addTask.textContent = 'Add Task';
    addTask.addEventListener('click', () => showTaskModal(
        project,
        // onSubmitForm
        () => {
            renderContent(project, projects);
            saveProjects(projects);
        },
    )); 

    content.appendChild(projectHeader);
    content.appendChild(taskList);
    content.appendChild(addTask);
}
