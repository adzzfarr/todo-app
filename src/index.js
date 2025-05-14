// index.js
import './styles.css';
import { renderSidebar } from '../modules/sidebar.js';
import { createTask } from '../modules/task.js';
import { createProject } from '../modules/project.js';

const testProject1 = createProject('Test Project 1');

for (let i = 0; i < 3; i++) {
    const taskNumber = i + 1;

    const taskName = 'Task ' + taskNumber;
    const taskDescription = 'Description for Task ' + taskNumber;
    const taskDueDate = new Date();
    const taskPriority = i;

    testProject1.addTask(createTask(taskName, taskDescription, taskDueDate, taskPriority));
}

renderSidebar([testProject1]);