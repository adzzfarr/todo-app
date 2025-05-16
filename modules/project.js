// project.js
export function createProject(name) {
    const tasks = [];

    function orderTasks() {
        tasks.sort((a, b) => a.priority - b.priority)
    }

    function getTaskIndex(taskId) {
        return tasks.findIndex(task => task.id === taskId);
    }

    return { 
        name,
        
        id: crypto.randomUUID(),

        getTaskIndex,

        getTasks() {
            return tasks;
        },

        addTask(task) {
            tasks.push(task);
            orderTasks();
        },

        removeTask(taskId) {
            const index = getTaskIndex(taskId);
            if (index != -1) {
                tasks.splice(index, 1);
            }
            orderTasks();
        },

        swapTasks(taskOneId, taskTwoId) {
            const indexOne = getTaskIndex(taskOneId);
            const indexTwo = getTaskIndex(taskTwoId);

            if (indexOne != -1 && indexTwo != -1) {
                [tasks[indexOne].priority, tasks[indexTwo].priority] = [tasks[indexTwo].priority, tasks[indexOne].priority];
                orderTasks();
            }
        }
    }
}