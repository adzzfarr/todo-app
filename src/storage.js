// storage.js
import { createTask } from "./modules/task";
import { createProject } from "./modules/project";

export function saveProjects(projects) {
    const projectsData = projects.map(project => {
        return {
            ...project,
            tasks: project.getTasks().map(task => {
                return {
                    ...task
                };
            }),
        };
    });

    localStorage.setItem('projects', JSON.stringify(projectsData));
}

export function loadProjects() {
    const projectsData = localStorage.getItem('projects');

    if (!projectsData) {
        const defaultProject = createProject('My First Project');

        const taskName = 'Try out this cool to-do app!';
        const taskDescription = 'Play around with the different buttons, and try adding/removing/editing projects and tasks.';
        const taskDueDate = new Date();
        const taskPriority = 1;

        defaultProject.addTask(createTask(taskName, taskDescription, taskDueDate, taskPriority));

        return [defaultProject];
    }

    const rawProjects = JSON.parse(projectsData);

    return rawProjects.map((rawProject) => {
        const project = createProject(rawProject.name, rawProject.id);  

        rawProject.tasks.forEach(rawTask => {
            const task = createTask(
                rawTask.name,
                rawTask.description,
                new Date(rawTask.dueDate),
                rawTask.priority,
                rawTask.completionStatus,
                rawTask.id,
            );

            project.addTask(task);
        });

        return project;
    });
}   